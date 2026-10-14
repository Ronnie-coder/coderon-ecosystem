// Signed admin session token, shared by middleware (edge) and API routes (node).
// Token format: "<expiresAtMs>.<hex hmac-sha256(expiresAtMs)>"

export const AUTH_COOKIE = 'coderon_auth';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function secret(): string {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || '';
}

async function hmacHex(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createSessionToken(): Promise<string> {
  const expires = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  return `${expires}.${await hmacHex(expires)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !secret()) return false;
  const [expires, sig] = token.split('.');
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  const expected = await hmacHex(expires);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

// Cron routes are called by cron-job.org. When CRON_SECRET is set, require it as
// ?key=<secret> or "Authorization: Bearer <secret>". Unset = open (keeps existing crons working).
export function isCronAuthorized(req: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true;
  const url = new URL(req.url);
  if (url.searchParams.get('key') === cronSecret) return true;
  return req.headers.get('authorization') === `Bearer ${cronSecret}`;
}
