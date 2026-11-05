// Runs an outreach job (hunter, enrich or followup) outside the website, e.g. from GitHub
// Actions on a schedule. It calls the same code as the /api/<job> routes, so the logic lives
// in one place, but the work no longer uses the website host's CPU allowance.
//
//   npx tsx scripts/outreach-job.ts hunter
//   npx tsx scripts/outreach-job.ts enrich 8   (repeat enrich up to 8 times, 4 leads each)
//   npx tsx scripts/outreach-job.ts followup
//
// Needs the same env vars as the site (Supabase, Serper, PageSpeed, Resend, Notion).

const JOBS = {
  hunter: () => import('../src/app/api/hunter/route'),
  enrich: () => import('../src/app/api/enrich/route'),
  followup: () => import('../src/app/api/followup/route'),
} as const;

type Job = keyof typeof JOBS;

async function runOnce(job: Job): Promise<{ ok: boolean; body: Record<string, unknown> }> {
  const { GET } = await JOBS[job]();
  // The routes check CRON_SECRET when it is set; pass it the way cron-job.org did.
  const headers = process.env.CRON_SECRET ? { authorization: `Bearer ${process.env.CRON_SECRET}` } : undefined;
  const res = await GET(new Request(`https://jobs.local/api/${job}`, { headers }));
  const body = (await res.json()) as Record<string, unknown>;
  // Some routes report failure in the body with a 200, so check for an error field too.
  return { ok: res.ok && !body.error, body };
}

async function main() {
  const job = process.argv[2] as Job;
  if (!(job in JOBS)) {
    console.error(`Usage: tsx scripts/outreach-job.ts <${Object.keys(JOBS).join('|')}> [repeats]`);
    process.exit(2);
  }
  const repeats = Math.max(1, Math.min(25, Number(process.argv[3]) || 1));

  for (let i = 1; i <= repeats; i++) {
    const t0 = Date.now();
    const { ok, body } = await runOnce(job);
    console.log(`[${job} ${i}/${repeats}] ${((Date.now() - t0) / 1000).toFixed(1)}s`, JSON.stringify(body));
    if (!ok) process.exit(1);
    // enrich says this when the backlog is empty; no point repeating.
    if (typeof body.message === 'string' && body.message.startsWith('Nothing left')) break;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
