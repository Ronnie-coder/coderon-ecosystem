// src/components/ConsultationForm.tsx
"use client";

// The quote form, in three short steps with a progress tracker:
//   1. What do you need?  2. About your business  3. How can we reach you?
// It pre-selects what the visitor clicked (/contact/?topic=business), keeps a draft in
// this browser if they leave, and sends to /api/send, which emails Ronnie.
// Accessibility: each step's heading takes focus when it appears, the tracker marks the
// current step with aria-current, and errors are announced and tied to their fields.
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/track';
import { FiCheck, FiCheckCircle, FiAlertCircle, FiLoader, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const NEEDS = [
  { value: 'New website', label: 'A new website', hint: 'Fast, mobile-first, set up for Google' },
  { value: 'Monthly website', label: 'A website, paid monthly', hint: 'No upfront cost' },
  { value: 'Website fix', label: 'Fix my website', hint: 'Slow, "not secure" or broken on phones' },
  { value: 'Website care plan', label: 'Monthly care', hint: 'Updates, fixes and changes' },
  { value: 'Custom software', label: 'Custom software', hint: 'Portals, dashboards, automation' },
  { value: 'Not sure yet', label: 'Not sure yet', hint: "We'll help you decide" },
];

const TOPIC_TO_NEED: Record<string, { need: string; note?: string }> = {
  new: { need: 'New website' },
  website: { need: 'New website' },
  starter: { need: 'New website', note: 'Starter package (1 page)' },
  business: { need: 'New website', note: 'Business package (up to 5 pages)' },
  growth: { need: 'New website', note: 'Growth package (up to 10 pages)' },
  monthly: { need: 'Monthly website', note: 'Monthly Website plan' },
  fix: { need: 'Website fix' },
  care: { need: 'Website care plan' },
  careBasic: { need: 'Website care plan', note: 'Care Basic' },
  carePlus: { need: 'Website care plan', note: 'Care Plus' },
  software: { need: 'Custom software' },
};

const STEPS = ['What you need', 'Your business', 'Your details'];
const CONTACT_WAYS = ['WhatsApp', 'Email', 'Phone call'];
const DRAFT_KEY = 'coderon-quote-draft';

type Form = {
  need: string;
  note: string;
  business: string;
  website: string;
  message: string;
  name: string;
  email: string;
  phone: string;
  prefer: string;
};
const EMPTY: Form = { need: '', note: '', business: '', website: '', message: '', name: '', email: '', phone: '', prefer: 'WhatsApp' };
type Errors = Partial<Record<keyof Form, string>>;

const inputCls = (bad?: string) =>
  `w-full rounded-xl border bg-paper px-4 py-3 outline-none transition focus:border-ink focus:ring-4 focus:ring-gold/25 disabled:opacity-60 ${bad ? 'border-bad' : 'border-field'}`;

export const ConsultationForm = () => {
  const [form, setForm] = useState<Form>(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [sendError, setSendError] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  // Restore a draft, then apply the topic from the link (the link wins).
  useEffect(() => {
    let next = { ...EMPTY };
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
      if (saved && typeof saved === 'object') next = { ...next, ...saved };
    } catch {}
    const topic = new URLSearchParams(window.location.search).get('topic');
    const match = topic ? TOPIC_TO_NEED[topic] : undefined;
    if (match) next = { ...next, need: match.need, note: match.note ?? '' };
    setForm(next);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  // Move focus to the new step's heading (not on first load).
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step, status]);

  // Errors stay put until the next "Next"/submit, so the layout never jumps while someone types.
  const update = (key: keyof Form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0 && !form.need) e.need = 'Please pick what you need.';
    if (s === 1 && form.message.trim().length < 10) e.message = 'Please tell us a little about your business (a sentence or two).';
    if (s === 2) {
      if (!form.name.trim()) e.name = 'Please add your name.';
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Please add a valid email address, like you@business.co.za.';
      if (form.prefer !== 'Email' && form.phone.replace(/\D/g, '').length < 9) e.phone = `Please add a number we can ${form.prefer === 'WhatsApp' ? 'WhatsApp' : 'call'}.`;
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      track('quote_step', { step: step + 1, step_name: STEPS[step], need: form.need });
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < STEPS.length - 1) return next();
    const e = validate(2);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('sending');
    setSendError('');
    const lines = [
      form.message.trim(),
      '',
      form.note ? `Package: ${form.note}` : null,
      form.business ? `Business: ${form.business}` : null,
      form.website ? `Website: ${form.website}` : null,
      form.phone ? `Phone / WhatsApp: ${form.phone}` : null,
      `Prefers: ${form.prefer}`,
    ].filter((l) => l !== null);
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.need,
          message: lines.join('\n'),
          leave_empty: new FormData(ev.currentTarget as HTMLFormElement).get('leave_empty') || '',
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error);
      setStatus('sent');
      track('generate_lead', { need: form.need, package: form.note || undefined, prefer: form.prefer });
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
    } catch (err) {
      setStatus('error');
      setSendError((err instanceof Error && err.message) || 'That did not send. Please try again, or WhatsApp us on +27 67 818 4898.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="card flex h-fit flex-col items-start gap-3 border-gold bg-gold p-8 text-[#16130E]" role="status">
        <FiCheckCircle aria-hidden="true" className="text-4xl" />
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold outline-none">
          Thanks, {form.name.split(' ')[0]}! Your request is in.
        </h2>
        <p>
          Ronnie will get back to you by {form.prefer === 'Email' ? 'email' : form.prefer === 'WhatsApp' ? 'WhatsApp' : 'phone'} within one
          working day, with questions or a fixed quote.
        </p>
      </div>
    );
  }

  const busy = status === 'sending';
  const pct = Math.round(((step + 1) / STEPS.length) * 100);
  const errorList = Object.entries(errors).filter(([, v]) => v);

  return (
    <form onSubmit={submit} className="card-pop h-fit p-6 md:p-8" aria-labelledby="quote-step-title" noValidate>
      {/* Progress tracker */}
      <div>
        <p className="text-sm font-bold text-ink/70">
          Step {step + 1} of {STEPS.length}
        </p>
        <div
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink/10"
          role="progressbar"
          aria-label="Form progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-valuetext={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}
        >
          <div className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <ol className="mt-4 grid grid-cols-3 gap-2 text-sm">
          {STEPS.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={label} aria-current={current ? 'step' : undefined}>
                <button
                  type="button"
                  onClick={() => done && setStep(i)}
                  disabled={!done || busy}
                  className={`flex w-full items-center gap-2 text-left font-semibold ${current ? 'text-ink' : done ? 'text-ink/80 hover:underline' : 'text-ink/65'}`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs ${
                      done ? 'border-ink bg-ink text-paper' : current ? 'border-gold bg-gold text-[#16130E]' : 'border-field'
                    }`}
                  >
                    {done ? <FiCheck /> : i + 1}
                  </span>
                  <span className="leading-tight">
                    {label}
                    {done && <span className="sr-only"> (done, go back)</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8">
        <h2 id="quote-step-title" ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none">
          {step === 0 && 'What do you need?'}
          {step === 1 && 'Tell us about your business'}
          {step === 2 && 'How can we reach you?'}
        </h2>

        {errorList.length > 0 && (
          <div role="alert" className="mt-4 rounded-xl border border-bad p-4 text-bad">
            <p className="flex items-center gap-2 font-bold">
              <FiAlertCircle aria-hidden="true" /> Please check {errorList.length === 1 ? 'this' : 'these'}:
            </p>
            <ul className="mt-1 list-disc pl-6 text-sm font-semibold">
              {errorList.map(([k, v]) => (
                <li key={k}>
                  <a href={`#q-${k}`} className="underline">{v}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 0 && (
          <fieldset className="mt-5" aria-describedby={errors.need ? 'q-need-error' : undefined}>
            <legend className="sr-only">What do you need?</legend>
            <div id="q-need" className="grid gap-3 sm:grid-cols-2">
              {NEEDS.map((n) => (
                <label key={n.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="need"
                    value={n.value}
                    checked={form.need === n.value}
                    onChange={() => {
                      update('need', n.value);
                      update('note', '');
                    }}
                    className="peer sr-only"
                  />
                  <span className="flex h-full flex-col rounded-xl border border-field p-4 transition peer-checked:border-gold peer-checked:bg-gold peer-checked:text-[#16130E] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 dark:peer-checked:border-gold">
                    <span className="font-semibold">{n.label}</span>
                    <span className="mt-0.5 text-sm opacity-75">{n.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            {errors.need && <p id="q-need-error" className="mt-2 text-sm font-semibold text-bad">{errors.need}</p>}
            {form.note && <p className="mt-4 text-sm font-semibold text-gold-text">You picked: {form.note}</p>}
          </fieldset>
        )}

        {step === 1 && (
          <div className="mt-5 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="q-business" className="block text-sm font-bold">Business name <span className="font-normal text-ink/60">(optional)</span></label>
                <input id="q-business" autoComplete="organization" value={form.business} onChange={(e) => update('business', e.target.value)} className={inputCls()} />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="q-website" className="block text-sm font-bold">Current website <span className="font-normal text-ink/60">(optional)</span></label>
                <input id="q-website" type="text" inputMode="url" autoComplete="url" value={form.website} onChange={(e) => update('website', e.target.value)} className={inputCls()} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="q-message" className="block text-sm font-bold">What does your business do, and what do you need?</label>
              <textarea
                id="q-message"
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={`q-message-hint${errors.message ? ' q-message-error' : ''}`}
                className={`${inputCls(errors.message)} min-h-[140px]`}
              />
              <p id="q-message-hint" className="text-sm text-ink/60">
                For example: &ldquo;We&apos;re a plumbing company in Bellville. We need a website so people can find us on Google and call us.&rdquo;
              </p>
              {errors.message && <p id="q-message-error" className="text-sm font-semibold text-bad">{errors.message}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-5 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="q-name" className="block text-sm font-bold">Your name</label>
                <input
                  id="q-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'q-name-error' : undefined}
                  className={inputCls(errors.name)}
                />
                {errors.name && <p id="q-name-error" className="text-sm font-semibold text-bad">{errors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="q-email" className="block text-sm font-bold">Email</label>
                <input
                  id="q-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'q-email-error' : undefined}
                  className={inputCls(errors.email)}
                />
                {errors.email && <p id="q-email-error" className="text-sm font-semibold text-bad">{errors.email}</p>}
              </div>
            </div>
            <fieldset>
              <legend className="text-sm font-bold">Best way to reach you</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CONTACT_WAYS.map((w) => (
                  <label key={w} className="cursor-pointer">
                    <input type="radio" name="prefer" value={w} checked={form.prefer === w} onChange={() => update('prefer', w)} className="peer sr-only" />
                    <span className="inline-block rounded-full border border-field px-4 py-2 font-semibold transition peer-checked:border-gold peer-checked:bg-gold peer-checked:text-[#16130E] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 dark:peer-checked:border-gold">
                      {w}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            {form.prefer !== 'Email' && (
              <div className="space-y-1.5">
                <label htmlFor="q-phone" className="block text-sm font-bold">{form.prefer === 'WhatsApp' ? 'WhatsApp number' : 'Phone number'}</label>
                <input
                  id="q-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'q-phone-error' : undefined}
                  className={inputCls(errors.phone)}
                />
                {errors.phone && <p id="q-phone-error" className="text-sm font-semibold text-bad">{errors.phone}</p>}
              </div>
            )}
          </div>
        )}
      </div>

      {status === 'error' && sendError && (
        <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl border border-bad p-4 font-semibold text-bad">
          <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0" /> {sendError}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} disabled={busy} className="btn-ghost">
            <FiArrowLeft aria-hidden="true" /> Back
          </button>
        ) : (
          <span />
        )}
        <button type="submit" disabled={busy} className="btn-primary px-6 text-lg disabled:opacity-70">
          {busy ? (
            <>
              <FiLoader aria-hidden="true" className="animate-spin" /> Sending…
            </>
          ) : step < STEPS.length - 1 ? (
            <>
              Next <FiArrowRight aria-hidden="true" />
            </>
          ) : (
            'Get my free quote'
          )}
        </button>
      </div>
      <p className="mt-4 text-sm text-ink/60">Free and no obligation. We reply within one working day.</p>
      {/* Spam trap for bots. display:none so browsers never autofill it, and a name autofill
          doesn't recognise. If it is ever filled, the email is still sent, marked as possible spam. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Leave this empty
          <input type="text" name="leave_empty" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </form>
  );
};
