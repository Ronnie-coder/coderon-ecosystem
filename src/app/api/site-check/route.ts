import { NextResponse } from 'next/server';
import { CheckInputError, normaliseTarget, runSiteCheck } from '@/lib/siteCheck';

// Public endpoint for the free website check. Google PageSpeed can take 20-40s.
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Light abuse protection: a few checks per visitor per 10 minutes (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 6;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'You have run a lot of checks. Please wait a few minutes and try again.' }, { status: 429 });
  }

  let body: { url?: string } = {};
  try {
    body = await request.json();
  } catch {}

  try {
    const target = await normaliseTarget(body.url ?? '');
    const result = await runSiteCheck(target);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof CheckInputError) return NextResponse.json({ error: err.message }, { status: 400 });
    console.error('site-check failed', err);
    return NextResponse.json({ error: 'Something went wrong on our side. Please try again.' }, { status: 500 });
  }
}
