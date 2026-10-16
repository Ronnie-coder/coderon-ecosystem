"use client";

// The free website check: paste a link, see real results from Google PageSpeed and our own
// checks, then ask for the full fix-it video. Results are honest: "could not test" is never a fail.
import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiAlertTriangle, FiX, FiHelpCircle, FiLoader, FiRefreshCw } from 'react-icons/fi';
import type { CheckStatus, SiteCheckResult } from '@/lib/siteCheck';

const STEPS = ['Opening your website', 'Checking the secure connection', 'Reading what Google sees', 'Running Google PageSpeed on a phone'];

const statusStyle: Record<CheckStatus, { icon: JSX.Element; label: string; cls: string }> = {
  good: { icon: <FiCheck />, label: 'Good', cls: 'bg-good text-paper' },
  warn: { icon: <FiAlertTriangle />, label: 'Could be better', cls: 'bg-gold text-[#16130E]' },
  bad: { icon: <FiX />, label: 'Needs fixing', cls: 'bg-bad text-paper' },
  unknown: { icon: <FiHelpCircle />, label: 'Could not test', cls: 'bg-ink/15 text-ink' },
};

function ScoreRing({ score }: { score: number | null }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const value = score ?? 0;
  const color = score == null ? 'rgb(var(--ink) / .3)' : score >= 90 ? 'rgb(var(--good))' : score >= 50 ? 'rgb(var(--gold))' : 'rgb(var(--bad))';
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(var(--ink) / .12)" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-4xl font-extrabold leading-none">{score ?? '–'}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink/60">out of 100</p>
        </div>
      </div>
    </div>
  );
}

export default function SiteCheck({ initialUrl = '' }: { initialUrl?: string }) {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SiteCheckResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const run = async (target: string) => {
    if (!target.trim()) {
      setError('Please enter your website address, like yourbusiness.co.za');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    setStep(0);
    const timers = STEPS.map((_, i) => setTimeout(() => setStep(i), i * 2200));
    try {
      const res = await fetch('/api/site-check/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setResult(data);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      timers.forEach(clearTimeout);
      setLoading(false);
    }
  };

  // Auto-run when arriving from the homepage form (?url=...)
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const fromQuery = new URLSearchParams(window.location.search).get('url');
    if (fromQuery) {
      setUrl(fromQuery);
      void run(fromQuery);
    }
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void run(url);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="card-pop flex flex-col gap-3 p-3 sm:flex-row sm:items-center" noValidate>
        <label htmlFor="check-url" className="sr-only">
          Your website address
        </label>
        <div className="flex flex-1 items-center gap-1 px-3">
          <span aria-hidden="true" className="font-mono text-sm text-ink/50">https://</span>
          <input
            id="check-url"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            placeholder="yourbusiness.co.za"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            aria-invalid={!!error}
            aria-describedby={error ? 'check-error' : undefined}
            className="w-full bg-transparent py-3 text-lg font-semibold outline-none placeholder:text-ink/35"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary px-6 py-3.5 text-lg disabled:opacity-70">
          {loading ? (
            <>
              <FiLoader aria-hidden="true" className="animate-spin" /> Checking…
            </>
          ) : (
            <>
              Check my website <FiArrowRight aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      {error && (
        <p id="check-error" role="alert" className="mt-4 font-semibold text-bad">
          {error}
        </p>
      )}

      {loading && (
        <div className="card mt-8 p-6" role="status" aria-live="polite">
          <p className="font-bold">This takes about 20 to 40 seconds. Google is loading your site on a test phone.</p>
          <ol className="mt-5 space-y-3">
            {STEPS.map((s, i) => (
              <li key={s} className={`flex items-center gap-3 ${i > step ? 'text-ink/40' : ''}`}>
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border-2 border-ink text-sm ${i < step ? 'bg-ink text-paper' : i === step ? 'bg-gold text-[#16130E]' : ''}`}
                  aria-hidden="true"
                >
                  {i < step ? <FiCheck /> : i === step ? <FiLoader className="animate-spin" /> : i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
            <div className="h-full origin-left rounded-full bg-gold" style={{ animation: 'progress 35s cubic-bezier(.1,.6,.3,1) both' }} />
          </div>
        </div>
      )}

      {result && (
        <div ref={resultRef} tabIndex={-1} className="mt-10 outline-none" aria-live="polite">
          <Results result={result} onRetry={() => run(url)} />
        </div>
      )}
    </div>
  );
}

function Results({ result, onRetry }: { result: SiteCheckResult; onRetry: () => void }) {
  const host = new URL(result.url).hostname.replace(/^www\./, '');
  const problems = result.summary.bad + result.summary.warn;

  if (!result.reachable) {
    return (
      <div className="card p-7">
        <h2 className="text-2xl font-extrabold">We could not open {host}</h2>
        <p className="mt-3 text-ink/75">
          The site did not load for us. It may be down, or it may block automatic checks. That alone can cost you customers, so
          it is worth a closer look.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={onRetry} className="btn-ghost">
            <FiRefreshCw aria-hidden="true" /> Try again
          </button>
          <Link href={`/contact/?topic=website`} className="btn-primary">
            Ask us to look <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <div className="card flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center md:p-7">
          <ScoreRing score={result.scores.performance} />
          <div>
            <p className="eyebrow">Results for {host}</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
              {problems === 0 ? 'Your website is in good shape.' : `We found ${problems} thing${problems === 1 ? '' : 's'} to fix.`}
            </h2>
            <p className="mt-2 text-ink/70">Mobile speed score from Google PageSpeed, the same test Google uses.</p>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {result.items.map((item) => {
            const s = statusStyle[item.status];
            return (
              <li key={item.key} className="card flex gap-4 p-5">
                <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg ${s.cls}`} aria-hidden="true">
                  {s.icon}
                </span>
                <div>
                  <p className="font-bold">
                    {item.label} <span className="ml-1 text-sm font-semibold text-ink/60">· {s.label}</span>
                  </p>
                  <p className="mt-1 text-ink/75">{item.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm text-ink/60">
          Scores can change a little between tests. Checked {new Date(result.checkedAt).toLocaleString('en-ZA')}.
        </p>
      </div>

      <LeadForm result={result} host={host} />
    </div>
  );
}

function LeadForm({ result, host }: { result: SiteCheckResult; host: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please add your name and a valid email address.');
      return;
    }
    setState('sending');
    setError('');
    const lines = result.items.map((i) => `- ${i.label}: ${i.status.toUpperCase()}. ${i.detail}`).join('\n');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service: 'Free website check (instant)',
          message: `Website: ${result.url}\nMobile PageSpeed: ${result.scores.performance ?? 'n/a'}/100, SEO: ${result.scores.seo ?? 'n/a'}, Accessibility: ${result.scores.accessibility ?? 'n/a'}\n\n${lines}`,
        }),
      });
      if (!res.ok) throw new Error();
      setState('sent');
    } catch {
      setState('error');
      setError('That did not send. Please try again, or WhatsApp us on +27 67 818 4898.');
    }
  };

  if (state === 'sent') {
    return (
      <aside className="card h-fit border-ink bg-gold p-7 text-[#16130E] dark:border-gold" role="status">
        <h2 className="text-2xl font-extrabold">Thanks, {name.split(' ')[0]}!</h2>
        <p className="mt-3">
          Ronnie will record a short video walking through {host} and how to fix what we found. It lands in your inbox within
          one working day. No obligation.
        </p>
      </aside>
    );
  }

  return (
    <aside className="card-pop h-fit p-7" aria-labelledby="lead-title">
      <p className="eyebrow">Free, no obligation</p>
      <h2 id="lead-title" className="mt-2 text-2xl font-extrabold tracking-tight">
        Want the full fix-it video?
      </h2>
      <p className="mt-3 text-ink/75">
        We&apos;ll record a 2-minute video of {host}: what is slowing it down, what Google sees, and exactly how to fix it, with
        a fixed price if you want us to do it.
      </p>
      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="lead-name" className="text-sm font-bold">Your name</label>
          <input
            id="lead-name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border-2 border-line bg-paper px-4 py-3 outline-none focus:border-ink"
          />
        </div>
        <div>
          <label htmlFor="lead-email" className="text-sm font-bold">Email</label>
          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border-2 border-line bg-paper px-4 py-3 outline-none focus:border-ink"
          />
        </div>
        {error && <p role="alert" className="text-sm font-semibold text-bad">{error}</p>}
        <button type="submit" disabled={state === 'sending'} className="btn-primary w-full disabled:opacity-70">
          {state === 'sending' ? 'Sending…' : 'Send me the video'}
        </button>
        <p className="text-xs text-ink/60">We only use your email to send the video. No mailing list.</p>
      </form>
    </aside>
  );
}
