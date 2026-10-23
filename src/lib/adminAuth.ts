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
  return safeEqual(sig, await hmacHex(expires));
}

/** Constant-time string compare, so response timing doesn't leak how much matched. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Second check inside admin API routes, on top of middleware. Next.js has had
 * middleware-bypass bugs, so routes that read leads or send email verify the
 * session themselves. Returns a 401 response, or null when signed in.
 */
export async function requireAdmin(req: Request): Promise<Response | null> {
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${AUTH_COOKIE}=`))
    ?.slice(AUTH_COOKIE.length + 1);
  if (await verifySessionToken(token ? decodeURIComponent(token) : null)) return null;
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}

// Cron routes are called by cron-job.org. When CRON_SECRET is set, require it as
// ?key=<secret> or "Authorization: Bearer <secret>". Unset = open (keeps existing crons working).
export function isCronAuthorized(req: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true;
  const url = new URL(req.url);
  if (safeEqual(url.searchParams.get('key') || '', cronSecret)) return true;
  return safeEqual(req.headers.get('authorization') || '', `Bearer ${cronSecret}`);
}
