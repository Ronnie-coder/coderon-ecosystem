'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './leads.module.scss';

// ---------- Types ---------------------------------------------------------------------------

type Issue = { key: string; severity: number; label: string; evidence: string };

type QueueLead = {
  id: string;
  name: string;
  rawName: string;
  website: string | null;
  email: string;
  emailSource: string | null;
  firstName: string | null;
  niche: string | null;
  city: string | null;
  country: string | null;
  notes: string | null;
  score: number | null;
  issues: Issue[];
  loomNotes: string[];
  psi: number | null;
  checkedAt: string | null;
  subject: string;
  preview: string;
  trigger: string;
};

type Group = { name: string; sent: number; opened: number; clicked: number; replied: number };

type Stats = {
  total: number;
  verified: number;
  queue: number;
  noIssue: number;
  unverifiedBacklog: number;
  streak: number;
  budget: {
    pitchesToday: number;
    followupsToday: number;
    emailsToday: number;
    emailsMonth: number;
    target: number;
    dailyCap: number;
    monthlyCap: number;
    emailsLeftToday: number;
  };
  funnel: {
    pitched: number;
    delivered: number;
    opened: number;
    clicked: number;
    replied: number;
    calls: number;
    won: number;
    bounced: number;
    followups: number;
    revenue: number;
  };
  activity: { day: string; pitches: number }[];
  byNiche: Group[];
  byCountry: Group[];
  byTrigger: Group[];
};

type SentLead = {
  id: string;
  name: string;
  website: string | null;
  email: string;
  niche: string | null;
  country: string | null;
  initial_trigger: string | null;
  initial_subject: string | null;
  pitched_at: string;
  delivered_at: string | null;
  opened_at: string | null;
  open_count: number | null;
  clicked_at: string | null;
  replied_at: string | null;
  bounced_at: string | null;
  call_booked_at: string | null;
  won_at: string | null;
  lost_at: string | null;
  deal_value: number | null;
  followup_stage: number | null;
};

type Tab = 'queue' | 'sent' | 'insights' | 'leads';

// ---------- Helpers -------------------------------------------------------------------------

const TRIGGER_LABEL: Record<string, string> = {
  ssl: 'Not secure',
  speed: 'Slow on mobile',
  mobile: 'Not mobile-friendly',
  snippet: 'Google snippet',
  pixel: 'Pixel (v1)',
  analytics: 'Analytics (v1)',
  schema: 'Schema (v1)',
  seo: 'SEO (v1)',
  ads: 'Ads (v1)',
};

const FLAGS: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  Australia: '🇦🇺',
  'New Zealand': '🇳🇿',
  'South Africa': '🇿🇦',
  UAE: '🇦🇪',
  Canada: '🇨🇦',
  Singapore: '🇸🇬',
};

function ago(iso: string | null | undefined): string {
  if (!iso) return '';
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

function pct(n: number, d: number) {
  return d ? `${Math.round((n / d) * 100)}%` : '–';
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
}

function hostOf(url: string | null) {
  return (url || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

async function api<T>(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await fetch(url, init);
  if (res.status === 401) {
    window.location.href = '/admin/login/';
  }
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

// ---------- Small components ----------------------------------------------------------------

function GoalRing({ done, target }: { done: number; target: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const progress = Math.min(1, target ? done / target : 0);
  const hit = done >= target && target > 0;
  return (
    <div className={`${styles.goalRing} ${hit ? styles.goalHit : ''}`} title={`${done} of ${target} pitches today`}>
      <svg viewBox="0 0 80 80" aria-hidden>
        <circle cx="40" cy="40" r={r} className={styles.ringTrack} />
        <circle
          cx="40"
          cy="40"
          r={r}
          className={styles.ringFill}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          transform="rotate(-90 40 40)"
        />
      </svg>
      <div className={styles.ringLabel}>
        <strong>{done}</strong>
        <span>/ {target}</span>
      </div>
    </div>
  );
}

function Confetti({ burst }: { burst: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: burst ? 60 : 0 }, (_, i) => ({
        id: `${burst}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.25,
        duration: 1.1 + Math.random() * 0.9,
        rotate: Math.random() * 360,
        color: ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa'][i % 5],
      })),
    [burst]
  );
  if (!burst) return null;
  return (
    <div className={styles.confetti} aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className={styles.kbd}>{children}</kbd>;
}

// ---------- Queue ---------------------------------------------------------------------------

function QueueView({
  stats,
  onSent,
  refreshStats,
}: {
  stats: Stats | null;
  onSent: (pitchesToday: number) => void;
  refreshStats: () => void;
}) {
  const [leads, setLeads] = useState<QueueLead[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [leaving, setLeaving] = useState<'send' | 'skip' | null>(null);
  const handled = useRef<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    const exclude = [...handled.current].join(',');
    const { data } = await api<{ leads: QueueLead[] }>(`/api/outreach/queue/?limit=20${exclude ? `&exclude=${exclude}` : ''}`);
    setLeads(data.leads || []);
    setIndex(0);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const lead = leads[index];

  const removeCurrent = useCallback(
    (kind: 'send' | 'skip') => {
      if (!lead) return;
      handled.current.add(lead.id);
      setLeaving(kind);
      setTimeout(() => {
        setLeaving(null);
        setLeads((prev) => {
          const next = prev.filter((l) => l.id !== lead.id);
          if (next.length < 4) setTimeout(load, 0);
          return next;
        });
        setIndex((i) => Math.max(0, Math.min(i, leads.length - 2)));
      }, 260);
    },
    [lead, leads.length, load]
  );

  const send = useCallback(async () => {
    if (!lead || busy) return;
    setBusy('send');
    const { ok, data } = await api<{ sent?: boolean; skipped?: boolean; reason?: string; error?: string; pitchesToday?: number }>(
      '/api/pitch/',
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ leadId: lead.id }) }
    );
    setBusy(null);
    if (ok && data.sent) {
      toast.success(`Pitch sent to ${lead.name}`, { icon: '🚀' });
      onSent(data.pitchesToday || 0);
      removeCurrent('send');
    } else if (data.skipped) {
      toast(`${lead.name}: ${data.reason}`, { icon: '⚠️' });
      if (data.reason?.includes('budget')) return;
      removeCurrent('skip');
      refreshStats();
    } else {
      toast.error(data.error || 'Send failed');
    }
  }, [lead, busy, onSent, removeCurrent, refreshStats]);

  const act = useCallback(
    async (action: 'skip' | 'bad_email' | 'not_fit') => {
      if (!lead || busy) return;
      setBusy(action);
      const { ok, data } = await api<{ error?: string }>('/api/outreach/action/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, action }),
      });
      setBusy(null);
      if (!ok) return toast.error(data.error || 'Action failed');
      removeCurrent('skip');
      refreshStats();
    },
    [lead, busy, removeCurrent, refreshStats]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === 's') send();
      else if (k === 'k') act('skip');
      else if (k === 'b') act('bad_email');
      else if (k === 'n') act('not_fit');
      else if (k === 'arrowright' || k === 'j') setIndex((i) => Math.min(i + 1, leads.length - 1));
      else if (k === 'arrowleft') setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [send, act, leads.length]);

  if (loading && !leads.length) {
    return (
      <div className={styles.queueLayout}>
        <div className={`${styles.pitchCard} ${styles.skeleton}`} />
        <div className={`${styles.emailCard} ${styles.skeleton}`} />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyEmoji}>🏁</div>
        <h3>Queue is empty</h3>
        <p>
          {stats?.unverifiedBacklog
            ? `${stats.unverifiedBacklog} leads are still being verified. New pitch-ready leads appear here every 15 minutes.`
            : 'The hunter adds new leads daily. Check back soon.'}
        </p>
        <button className={styles.ghostBtn} onClick={load}>
          Refresh queue
        </button>
      </div>
    );
  }

  const upNext = leads.slice(index + 1, index + 6);

  return (
    <>
      <div className={styles.queueLayout}>
        <section
          className={`${styles.pitchCard} ${leaving === 'send' ? styles.flyUp : ''} ${leaving === 'skip' ? styles.flyLeft : ''}`}
          key={lead.id}
        >
          <div className={styles.cardTop}>
            <span className={styles.position}>
              #{index + 1} of {stats?.queue ?? leads.length}
            </span>
            {lead.score != null && (
              <span className={styles.scorePill} title="Opportunity score: verified issues + good reviews">
                ⚡ {lead.score}
              </span>
            )}
          </div>

          <h2 className={styles.leadName}>{lead.name}</h2>
          {lead.rawName !== lead.name && <div className={styles.rawName}>{lead.rawName}</div>}

          <div className={styles.metaRow}>
            {lead.website && (
              <a href={lead.website} target="_blank" rel="noreferrer" className={styles.siteLink}>
                ↗ {hostOf(lead.website)}
              </a>
            )}
            {lead.niche && <span className={styles.tag}>{lead.niche}</span>}
            {lead.city && (
              <span className={styles.tag}>
                {FLAGS[lead.country || ''] || '📍'} {lead.city}
              </span>
            )}
          </div>

          <h4 className={styles.sectionLabel}>Verified issues</h4>
          <ul className={styles.issueList}>
            {lead.issues.map((issue) => (
              <li key={issue.key} className={issue.key === lead.trigger ? styles.issuePrimary : ''}>
                <span className={styles.issueLabel}>{issue.label}</span>
                <span className={styles.issueEvidence}>{issue.evidence}</span>
                {issue.key === 'speed' && lead.website && (
                  <a
                    className={styles.verifyLink}
                    href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(lead.website)}&form_factor=mobile`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Check it yourself ↗
                  </a>
                )}
                {issue.key === 'ssl' && lead.website && (
                  <a className={styles.verifyLink} href={`https://${hostOf(lead.website)}`} target="_blank" rel="noreferrer">
                    Try https ↗
                  </a>
                )}
              </li>
            ))}
          </ul>

          {lead.loomNotes.length > 0 && (
            <details className={styles.loomNotes}>
              <summary>🎥 Extra notes for your Loom ({lead.loomNotes.length})</summary>
              <ul>
                {lead.loomNotes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </details>
          )}

          {lead.notes && <div className={styles.contactNotes}>{lead.notes.split(' | Audit:')[0]}</div>}
        </section>

        <section className={`${styles.emailCard} ${leaving ? styles.fadeOut : ''}`}>
          <div className={styles.emailHeader}>
            <div>
              <span className={styles.emailKey}>To</span>
              <span className={styles.emailTo}>{lead.email}</span>
              {lead.emailSource && (
                <span className={styles.emailBadge} title="Email passed the junk filter and its domain accepts mail (MX check)">
                  ✓ {lead.emailSource === 'site-domain' ? 'on-domain' : lead.emailSource}
                </span>
              )}
            </div>
            <div>
              <span className={styles.emailKey}>Subject</span>
              <span className={styles.emailSubject}>{lead.subject}</span>
            </div>
          </div>
          <pre className={styles.emailBody}>{lead.preview}</pre>

          <div className={styles.actionBar}>
            <button className={styles.secondaryBtn} onClick={() => act('skip')} disabled={!!busy}>
              Skip <Kbd>K</Kbd>
            </button>
            <button className={styles.secondaryBtn} onClick={() => act('bad_email')} disabled={!!busy}>
              Bad email <Kbd>B</Kbd>
            </button>
            <button className={styles.secondaryBtn} onClick={() => act('not_fit')} disabled={!!busy}>
              Not a fit <Kbd>N</Kbd>
            </button>
            <button className={styles.sendBtn} onClick={send} disabled={!!busy}>
              {busy === 'send' ? 'Sending…' : 'Send pitch'} <Kbd>S</Kbd>
            </button>
          </div>
        </section>
      </div>

      {upNext.length > 0 && (
        <div className={styles.upNext}>
          <h4 className={styles.sectionLabel}>Up next</h4>
          <div className={styles.upNextRow}>
            {upNext.map((l, i) => (
              <button key={l.id} className={styles.upNextCard} onClick={() => setIndex(index + 1 + i)}>
                <strong>{l.name}</strong>
                <span>{TRIGGER_LABEL[l.trigger] || l.trigger}</span>
                <span className={styles.upNextMeta}>
                  {FLAGS[l.country || ''] || ''} ⚡ {l.score ?? '–'}
                </span>
              </button>
            ))}
          </div>
          <p className={styles.hint}>
            <Kbd>S</Kbd> send · <Kbd>K</Kbd> skip · <Kbd>←</Kbd>
            <Kbd>→</Kbd> browse
          </p>
        </div>
      )}
    </>
  );
}

// ---------- Sent ----------------------------------------------------------------------------

function SentView({ refreshStats }: { refreshStats: () => void }) {
  const [leads, setLeads] = useState<SentLead[] | null>(null);

  const load = useCallback(async () => {
    const { data } = await api<{ leads: SentLead[] }>('/api/outreach/sent/');
    setLeads(data.leads || []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (lead: SentLead, action: string) => {
    let dealValue: number | undefined;
    if (action === 'won') {
      const v = window.prompt(`Deal value for ${lead.name} (USD)?`, '500');
      if (v === null) return;
      dealValue = Number(v) || 0;
    }
    const { ok, data } = await api<{ error?: string }>('/api/outreach/action/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: lead.id, action, dealValue }),
    });
    if (!ok) return toast.error(data.error || 'Failed');
    if (action === 'won') toast.success(`Deal won with ${lead.name}! 🏆`);
    else toast.success('Updated');
    load();
    refreshStats();
  };

  if (!leads) return <div className={`${styles.panel} ${styles.skeleton}`} style={{ height: 320 }} />;
  if (!leads.length)
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyEmoji}>📭</div>
        <h3>No pitches yet</h3>
        <p>Send your first pitch from the queue.</p>
      </div>
    );

  return (
    <div className={styles.sentList}>
      {leads.map((l) => {
        const steps = [
          { label: 'Sent', at: l.pitched_at, done: true },
          { label: 'Delivered', at: l.delivered_at, done: !!(l.delivered_at || l.opened_at) },
          { label: l.open_count && l.open_count > 1 ? `Opened ×${l.open_count}` : 'Opened', at: l.opened_at, done: !!l.opened_at },
          { label: 'Clicked', at: l.clicked_at, done: !!l.clicked_at },
          { label: 'Replied', at: l.replied_at, done: !!l.replied_at },
        ];
        const outcome = l.won_at ? 'won' : l.lost_at ? 'lost' : l.call_booked_at ? 'call' : l.bounced_at ? 'bounced' : null;
        return (
          <div key={l.id} className={styles.sentRow}>
            <div className={styles.sentMain}>
              <div className={styles.sentTitle}>
                <strong>{l.name}</strong>
                {outcome && <span className={`${styles.outcome} ${styles[`outcome_${outcome}`]}`}>{outcome === 'call' ? 'Call booked' : outcome}</span>}
              </div>
              <div className={styles.sentSubject}>{l.initial_subject || '(v1 pitch)'}</div>
              <div className={styles.sentMeta}>
                {l.email} · {TRIGGER_LABEL[l.initial_trigger || ''] || l.initial_trigger || '–'} · sent {ago(l.pitched_at)}
                {l.followup_stage ? ` · follow-up ${l.followup_stage}/2 sent` : ''}
              </div>
            </div>
            <div className={styles.timeline}>
              {steps.map((s) => (
                <div key={s.label} className={`${styles.step} ${s.done ? styles.stepDone : ''}`} title={s.at ? new Date(s.at).toLocaleString() : ''}>
                  <span className={styles.dot} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.sentActions}>
              {!l.replied_at && <button onClick={() => act(l, 'replied')}>💬 Replied</button>}
              {!l.call_booked_at && <button onClick={() => act(l, 'call_booked')}>📞 Call</button>}
              {!l.won_at && <button onClick={() => act(l, 'won')}>🏆 Won</button>}
              {!l.lost_at && !l.won_at && <button onClick={() => act(l, 'lost')}>✕ Lost</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Insights ------------------------------------------------------------------------

function RateTable({ title, rows }: { title: string; rows: Group[] }) {
  return (
    <div className={styles.panel}>
      <h3 className={styles.panelTitle}>{title}</h3>
      {rows.length === 0 ? (
        <p className={styles.muted}>No pitches yet.</p>
      ) : (
        <table className={styles.rateTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Sent</th>
              <th>Opened</th>
              <th>Clicked</th>
              <th>Replied</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 12).map((r) => (
              <tr key={r.name}>
                <td>{TRIGGER_LABEL[r.name] || r.name}</td>
                <td>{r.sent}</td>
                <td>{pct(r.opened, r.sent)}</td>
                <td>{pct(r.clicked, r.sent)}</td>
                <td className={r.replied ? styles.goodText : ''}>{pct(r.replied, r.sent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function InsightsView({ stats }: { stats: Stats | null }) {
  if (!stats) return <div className={`${styles.panel} ${styles.skeleton}`} style={{ height: 320 }} />;
  const f = stats.funnel;
  const funnel = [
    { label: 'Pitched', value: f.pitched },
    { label: 'Delivered', value: f.delivered },
    { label: 'Opened', value: f.opened },
    { label: 'Clicked', value: f.clicked },
    { label: 'Replied', value: f.replied },
    { label: 'Call booked', value: f.calls },
    { label: 'Won', value: f.won },
  ];
  const max = Math.max(1, f.pitched);
  const peak = Math.max(1, ...stats.activity.map((a) => a.pitches));

  return (
    <div className={styles.insights}>
      <div className={styles.kpiGrid}>
        <div className={styles.kpi}>
          <span>Total leads</span>
          <strong>{stats.total.toLocaleString()}</strong>
        </div>
        <div className={styles.kpi}>
          <span>Verified (v2 audit)</span>
          <strong>{stats.verified.toLocaleString()}</strong>
        </div>
        <div className={styles.kpi}>
          <span>Waiting for verification</span>
          <strong>{stats.unverifiedBacklog.toLocaleString()}</strong>
        </div>
        <div className={styles.kpi}>
          <span>No verified issue (not pitched)</span>
          <strong>{stats.noIssue.toLocaleString()}</strong>
        </div>
        <div className={styles.kpi}>
          <span>Emails this month</span>
          <strong>
            {stats.budget.emailsMonth}
            <small> / {stats.budget.monthlyCap}</small>
          </strong>
        </div>
        <div className={styles.kpi}>
          <span>Revenue won</span>
          <strong>${f.revenue.toLocaleString()}</strong>
        </div>
      </div>

      <div className={styles.insightGrid}>
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Funnel</h3>
          <div className={styles.funnel}>
            {funnel.map((s) => (
              <div key={s.label} className={styles.funnelRow} title={`${s.label}: ${s.value} (${pct(s.value, f.pitched)} of pitched)`}>
                <span className={styles.funnelLabel}>{s.label}</span>
                <div className={styles.funnelTrack}>
                  <div className={styles.funnelBar} style={{ width: `${(s.value / max) * 100}%` }} />
                </div>
                <span className={styles.funnelValue}>
                  {s.value} <small>{s.label === 'Pitched' ? '' : pct(s.value, f.pitched)}</small>
                </span>
              </div>
            ))}
          </div>
          <p className={styles.muted}>
            Opens are a rough signal (Apple Mail auto-opens). Replies and calls are what count. Bounced: {f.bounced} · Follow-ups sent: {f.followups}
          </p>
        </div>

        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Pitches per day (last 14 days)</h3>
          <div className={styles.activity}>
            {stats.activity.map((a) => (
              <div key={a.day} className={styles.activityCol} title={`${a.day}: ${a.pitches} pitches`}>
                <span className={styles.activityValue}>{a.pitches || ''}</span>
                <div className={styles.activityBar} style={{ height: `${(a.pitches / peak) * 100}%` }} />
                <span className={styles.activityDay}>{a.day.slice(8)}</span>
              </div>
            ))}
          </div>
          <p className={styles.muted}>
            Daily target ramps 10 → 15 → 20 → 25 to protect your domain and stay inside Resend&apos;s free plan.
          </p>
        </div>
      </div>

      <div className={styles.insightGrid3}>
        <RateTable title="By issue pitched" rows={stats.byTrigger} />
        <RateTable title="By niche" rows={stats.byNiche} />
        <RateTable title="By country" rows={stats.byCountry} />
      </div>
    </div>
  );
}

// ---------- All leads -----------------------------------------------------------------------

type LeadRow = {
  id: string;
  company_name: string;
  website: string | null;
  email: string | null;
  email_ok: boolean | null;
  niche: string | null;
  city: string | null;
  country: string | null;
  status: string;
  pitch_trigger: string | null;
  opportunity_score: number | null;
  pitched_at: string | null;
  opened_at: string | null;
  replied_at: string | null;
  skipped_at: string | null;
  skip_reason: string | null;
  audit_version: number | null;
};

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'ready', label: 'Ready' },
  { key: 'pitched', label: 'Pitched' },
  { key: 'skipped', label: 'Skipped' },
  { key: 'no_issue', label: 'No issue' },
  { key: 'unverified', label: 'Unverified' },
];

function rowState(l: LeadRow): { label: string; cls: string } {
  if (l.replied_at) return { label: 'Replied', cls: styles.st_replied };
  if (l.opened_at) return { label: 'Opened', cls: styles.st_opened };
  if (l.pitched_at) return { label: 'Pitched', cls: styles.st_pitched };
  if (l.skipped_at) return { label: l.skip_reason === 'bad_email' ? 'Bad email' : 'Skipped', cls: styles.st_muted };
  if (l.audit_version !== 2) return { label: 'Verifying', cls: styles.st_muted };
  if (l.pitch_trigger && l.email_ok) return { label: 'Ready', cls: styles.st_ready };
  if (l.pitch_trigger) return { label: 'No email', cls: styles.st_muted };
  return { label: 'No issue', cls: styles.st_muted };
}

function LeadsView() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), size: '50', filter, q });
      const { data } = await api<{ leads: LeadRow[]; count: number }>(`/api/leads/?${params}`);
      setRows(data.leads || []);
      setCount(data.count || 0);
      setLoading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [page, q, filter]);

  const restore = async (id: string) => {
    await api('/api/outreach/action/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: id, action: 'undo_skip' }),
    });
    setRows((r) => r.map((x) => (x.id === id ? { ...x, skipped_at: null, skip_reason: null } : x)));
    toast.success('Back in the queue');
  };

  const pages = Math.max(1, Math.ceil(count / 50));

  return (
    <div className={styles.panel}>
      <div className={styles.leadsToolbar}>
        <input
          className={styles.searchInput}
          placeholder="Search company, email or website…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
        />
        <div className={styles.filterChips}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={filter === f.key ? styles.chipActive : styles.chip}
              onClick={() => {
                setFilter(f.key);
                setPage(0);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.leadsTable}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Email</th>
              <th>Market</th>
              <th>Issue</th>
              <th>Score</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody className={loading ? styles.dim : ''}>
            {rows.map((l) => {
              const st = rowState(l);
              return (
                <tr key={l.id}>
                  <td>
                    <div className={styles.cellStrong}>{l.company_name}</div>
                    {l.website && (
                      <a href={l.website} target="_blank" rel="noreferrer" className={styles.cellLink}>
                        {hostOf(l.website)}
                      </a>
                    )}
                  </td>
                  <td className={styles.cellMono}>{l.email || <span className={styles.muted}>–</span>}</td>
                  <td>
                    <div>{l.niche || '–'}</div>
                    <div className={styles.muted}>
                      {FLAGS[l.country || ''] || ''} {l.city || ''}
                    </div>
                  </td>
                  <td>{l.pitch_trigger ? TRIGGER_LABEL[l.pitch_trigger] || l.pitch_trigger : <span className={styles.muted}>–</span>}</td>
                  <td>{l.opportunity_score ?? '–'}</td>
                  <td>
                    <span className={`${styles.stateBadge} ${st.cls}`}>{st.label}</span>
                    {l.skipped_at && (
                      <button className={styles.linkBtn} onClick={() => restore(l.id)}>
                        restore
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pager}>
        <span className={styles.muted}>
          {count.toLocaleString()} leads · page {page + 1} of {pages}
        </span>
        <div>
          <button className={styles.ghostBtn} disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            ← Prev
          </button>
          <button className={styles.ghostBtn} disabled={page + 1 >= pages} onClick={() => setPage((p) => p + 1)}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Page ----------------------------------------------------------------------------

export default function PitchHQ() {
  const [tab, setTab] = useState<Tab>('queue');
  const [stats, setStats] = useState<Stats | null>(null);
  const [burst, setBurst] = useState(0);
  const [goalBanner, setGoalBanner] = useState(false);

  const refreshStats = useCallback(async () => {
    const { ok, data } = await api<Stats & { error?: string }>('/api/outreach/stats/');
    if (ok) setStats(data);
    else toast.error(`Stats failed: ${data.error || 'unknown'} (did you run the v2 SQL migration?)`);
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  const onSent = useCallback(
    (pitchesToday: number) => {
      setBurst(Date.now());
      setStats((s) => {
        if (!s) return s;
        const target = s.budget.target;
        if (pitchesToday === target) setGoalBanner(true);
        return {
          ...s,
          queue: Math.max(0, s.queue - 1),
          budget: {
            ...s.budget,
            pitchesToday,
            emailsToday: s.budget.emailsToday + 1,
            emailsMonth: s.budget.emailsMonth + 1,
            emailsLeftToday: Math.max(0, s.budget.emailsLeftToday - 1),
          },
        };
      });
      setTimeout(refreshStats, 1500);
    },
    [refreshStats]
  );

  const b = stats?.budget;
  const remaining = b ? Math.max(0, b.target - b.pitchesToday) : 0;

  return (
    <div className={styles.dashboard}>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { background: '#121a2b', color: '#e6edf7', border: '1px solid #24324d', fontSize: '14px' },
        }}
      />
      <Confetti burst={burst} />

      <header className={styles.topBar}>
        <div className={styles.brand}>
          <span className={styles.logo}>CODERON</span>
          <span className={styles.brandSub}>Pitch HQ</span>
        </div>

        <div className={styles.hello}>
          <h1>
            {greeting()}, Ron.{' '}
            {b ? (remaining > 0 ? `${remaining} pitch${remaining === 1 ? '' : 'es'} to go today.` : 'Daily goal done. 🎉') : ''}
          </h1>
          <p>Every pitch below is backed by a verified, checkable issue.</p>
        </div>

        <div className={styles.topStats}>
          <GoalRing done={b?.pitchesToday ?? 0} target={b?.target ?? 10} />
          <div className={styles.miniStats}>
            <div title="Days in a row with at least one pitch">
              <span>🔥 Streak</span>
              <strong>{stats?.streak ?? 0}d</strong>
            </div>
            <div title="Resend free plan: pitches + follow-ups today">
              <span>✉️ Emails today</span>
              <strong>
                {b?.emailsToday ?? 0}
                <small>/{b?.dailyCap ?? 80}</small>
              </strong>
            </div>
            <div>
              <span>💬 Replies</span>
              <strong>{stats?.funnel.replied ?? 0}</strong>
            </div>
          </div>
        </div>
      </header>

      {goalBanner && (
        <div className={styles.goalBanner} onClick={() => setGoalBanner(false)}>
          🏆 Daily goal smashed: {b?.target} pitches sent. Anything extra today is bonus.
        </div>
      )}

      <nav className={styles.tabs}>
        {(
          [
            ['queue', 'Pitch queue', stats?.queue],
            ['sent', 'Sent', stats?.funnel.pitched],
            ['insights', 'Insights', null],
            ['leads', 'All leads', stats?.total],
          ] as [Tab, string, number | null | undefined][]
        ).map(([key, label, n]) => (
          <button key={key} className={tab === key ? styles.tabActive : styles.tab} onClick={() => setTab(key)}>
            {label}
            {n != null && <span className={styles.tabCount}>{n.toLocaleString()}</span>}
          </button>
        ))}
      </nav>

      <main className={styles.main}>
        {tab === 'queue' && <QueueView stats={stats} onSent={onSent} refreshStats={refreshStats} />}
        {tab === 'sent' && <SentView refreshStats={refreshStats} />}
        {tab === 'insights' && <InsightsView stats={stats} />}
        {tab === 'leads' && <LeadsView />}
      </main>
    </div>
  );
}
