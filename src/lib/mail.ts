/**
 * Microsoft Graph mail (client-credentials flow). Ported from server/email.mjs.
 * Needs an Azure app registration with the Mail.Send application permission.
 */
const DEFAULT_TOKEN_URI = "https://login.microsoftonline.com/{0}/oauth2/v2.0/token";
const DEFAULT_GRAPH = "https://graph.microsoft.com/v1.0";
const DEFAULT_SCOPE = "https://graph.microsoft.com/.default";

let token = "";
let expiresAt = 0;

type Env = Record<string, string | undefined>;

export function mailEnv() {
  const e: Env = process.env;
  const { MAIL_TO, MAIL_FROM, AZURE_TENANT, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET } = e;
  if (!MAIL_TO || !MAIL_FROM || !AZURE_TENANT || !AZURE_CLIENT_ID || !AZURE_CLIENT_SECRET) return null;
  return {
    to: MAIL_TO,
    from: MAIL_FROM,
    cc: e.CC_EMAIL || undefined,
    fromName: e.MAIL_FROM_NAME || "Babji Consult Techies",
    acknowledge: e.MAIL_ACKNOWLEDGE !== "false",
    tokenUri: e.AZURE_TOKEN_URI || DEFAULT_TOKEN_URI,
    graph: e.GRAPH_BASE_URL || DEFAULT_GRAPH,
    scope: e.GRAPH_SCOPE || DEFAULT_SCOPE,
    timeout: (Number(e.EMAIL_TIMEOUT_SECONDS) || 30) * 1000,
    tenant: AZURE_TENANT,
    clientId: AZURE_CLIENT_ID,
    clientSecret: AZURE_CLIENT_SECRET,
  };
}

type Cfg = NonNullable<ReturnType<typeof mailEnv>>;

async function getToken(cfg: Cfg) {
  if (token && Date.now() < expiresAt - 60_000) return token;
  const r = await fetch(cfg.tokenUri.replace("{0}", cfg.tenant), {
    method: "POST",
    body: new URLSearchParams({ grant_type: "client_credentials", client_id: cfg.clientId, client_secret: cfg.clientSecret, scope: cfg.scope }),
    signal: AbortSignal.timeout(cfg.timeout),
  });
  if (!r.ok) throw new Error(`token request failed (${r.status})`);
  const j = (await r.json()) as { access_token: string; expires_in?: number };
  token = j.access_token;
  expiresAt = Date.now() + Number(j.expires_in ?? 3600) * 1000;
  return token;
}

export type Mail = { to: string; subject: string; html: string; replyTo?: string; cc?: string };

/** Sends an HTML email from MAIL_FROM. Throws on failure. */
export async function sendMail(cfg: Cfg, m: Mail) {
  const message = {
    subject: m.subject,
    body: { contentType: "HTML", content: m.html },
    from: { emailAddress: { name: cfg.fromName, address: cfg.from } },
    toRecipients: [{ emailAddress: { address: m.to } }],
    ...(m.cc && { ccRecipients: [{ emailAddress: { address: m.cc } }] }),
    ...(m.replyTo && { replyTo: [{ emailAddress: { address: m.replyTo } }] }),
  };
  for (const attempt of [1, 2]) {
    const r = await fetch(`${cfg.graph}/users/${cfg.from}/sendMail`, {
      method: "POST",
      headers: { Authorization: `Bearer ${await getToken(cfg)}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message, saveToSentItems: true }),
      signal: AbortSignal.timeout(cfg.timeout),
    });
    if (r.status === 401 && attempt === 1) {
      token = ""; // cached token revoked: refresh once and retry
      continue;
    }
    if (r.status !== 200 && r.status !== 202) throw new Error(`Graph sendMail failed (${r.status}): ${await r.text()}`);
    return;
  }
}
