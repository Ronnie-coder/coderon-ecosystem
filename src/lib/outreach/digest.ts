// One daily summary email to Ronnie (replaces the old per-run telemetry email, which could
// send up to 96 emails a day and eat the Resend free quota).
import { supabase } from './db';
import { getBudget } from './budget';

async function count(build: (q: any) => any): Promise<number> {
  const { count } = await build(supabase.from('leads').select('id', { count: 'exact', head: true }));
  return count || 0;
}

export async function sendDailyDigest() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const since = new Date(Date.now() - 864e5).toISOString();
  const [queue, verified24h, opened24h, replied, budget] = await Promise.all([
    count((q) => q.eq('status', 'audited').not('pitch_trigger', 'is', null).eq('email_ok', true).is('pitched_at', null).is('skipped_at', null)),
    count((q) => q.eq('audit_version', 2).gte('audit->>checked_at', since)),
    count((q) => q.gte('opened_at', since)),
    count((q) => q.not('replied_at', 'is', null)),
    getBudget(),
  ]);

  const row = (label: string, value: string | number, color = '#38bdf8') =>
    `<li style="padding:6px 0;"><strong>${label}:</strong> <span style="color:${color};">${value}</span></li>`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Coderon Engine <onboarding@resend.dev>',
      to: process.env.DIGEST_TO || 'ronnie@coderon.co.za',
      subject: `☀️ Coderon: ${queue} leads ready to pitch today (target ${budget.target})`,
      html: `<div style="font-family:system-ui,sans-serif;padding:28px;background:#0b1020;color:#e2e8f0;max-width:560px;border-radius:12px;">
        <h2 style="margin:0 0 6px;color:#fff;">Good morning, Ron 👋</h2>
        <p style="color:#94a3b8;margin:0 0 18px;">Today's target is <strong style="color:#fff;">${budget.target} pitches</strong>.</p>
        <ul style="list-style:none;padding:0;margin:0 0 22px;font-size:15px;">
          ${row('Ready to pitch', queue, '#34d399')}
          ${row('Sites verified (24h)', verified24h)}
          ${row('Opens (24h)', opened24h, '#c084fc')}
          ${row('Replies (all time)', replied, '#fbbf24')}
          ${row('Emails used this month', `${budget.emailsMonth} / ${budget.monthlyCap}`)}
        </ul>
        <a href="https://www.coderon.co.za/admin/leads/" style="display:inline-block;padding:12px 22px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Open the pitch queue →</a>
      </div>`,
    }),
  });
}
