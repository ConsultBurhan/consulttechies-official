import { NextResponse } from "next/server";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Validates the enquiry and forwards it to CONTACT_WEBHOOK_URL (e.g. a Slack/Zapier/HubSpot hook).
 * With no webhook configured it answers 503 and the form falls back to the visitor's email app.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 160),
    message: clean(body.message, 4000),
    receivedAt: new Date().toISOString(),
  };
  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email) || !lead.message) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  }).catch(() => null);
  return res?.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Upstream failed" }, { status: 502 });
}
