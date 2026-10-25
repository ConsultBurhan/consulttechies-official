import { NextResponse } from "next/server";
import { mailEnv, sendMail } from "@/lib/mail";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/** Very small per-IP limiter: 5 enquiries per 10 minutes per server instance. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

/**
 * Validates the enquiry, emails it to MAIL_TO through Microsoft Graph (reply-to is the visitor),
 * then sends the visitor a short confirmation. With mail unconfigured it answers 503 and the
 * form falls back to the visitor's own email app. See .env.example.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (clean(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 160),
    phone: clean(body.phone, 40),
    interest: Array.isArray(body.interest) ? body.interest.map((x) => clean(x, 60)).filter(Boolean).slice(0, 6).join(", ") : clean(body.interest, 200),
    message: clean(body.message, 4000),
  };
  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email) || !lead.message) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const cfg = mailEnv();
  if (!cfg) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const rows = [
    ["Name", lead.name],
    ["Company", lead.company],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Interested in", lead.interest],
  ].filter(([, v]) => v);

  try {
    await sendMail(cfg, {
      to: cfg.to,
      cc: cfg.cc,
      replyTo: lead.email,
      subject: `New enquiry: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      html: `<h2>New website enquiry</h2><table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`)
        .join("")}</table><p style="white-space:pre-wrap">${esc(lead.message)}</p>`,
    });
  } catch (e) {
    console.error("[contact]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  // Confirmation to the visitor. Best effort: the enquiry itself already went through.
  if (cfg.acknowledge) {
    sendMail(cfg, {
      to: lead.email,
      replyTo: cfg.to,
      subject: "We received your message",
      html: `<p>Hi ${esc(lead.name.split(" ")[0])},</p><p>Thanks for getting in touch. We have your message and will reply by email shortly.</p><p style="white-space:pre-wrap;color:#555;border-left:3px solid #ddd;padding-left:12px">${esc(lead.message)}</p><p>Babji Consult Techies</p>`,
    }).catch((e) => console.error("[contact:ack]", e instanceof Error ? e.message : e));
  }

  return NextResponse.json({ ok: true });
}
