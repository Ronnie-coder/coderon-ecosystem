// src/components/ConsultationForm.tsx
"use client";

// The quote form: short, one screen, and it pre-selects what the visitor clicked on
// (links like /contact/?topic=business). Sends to /api/send, which emails Ronnie.
import { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

const NEEDS = [
  { value: 'New website', label: 'A new website' },
  { value: 'Website fix', label: 'Fix my website' },
  { value: 'Website care plan', label: 'Monthly care' },
  { value: 'Custom software', label: 'Custom software' },
  { value: 'Not sure yet', label: 'Not sure yet' },
];

const TOPIC_TO_NEED: Record<string, { need: string; note?: string }> = {
  new: { need: 'New website' },
  website: { need: 'New website' },
  starter: { need: 'New website', note: 'Starter package (1 page)' },
  business: { need: 'New website', note: 'Business package (up to 5 pages)' },
  growth: { need: 'New website', note: 'Growth package (up to 10 pages)' },
  fix: { need: 'Website fix' },
  care: { need: 'Website care plan' },
  careBasic: { need: 'Website care plan', note: 'Care Basic' },
  carePlus: { need: 'Website care plan', note: 'Care Plus' },
  software: { need: 'Custom software' },
};

const EMPTY = { need: 'New website', name: '', email: '', phone: '', website: '', message: '' };
const input =
  'w-full rounded-xl border-2 border-line bg-paper px-4 py-3 outline-none transition focus:border-ink disabled:opacity-60';

export const ConsultationForm = () => {
  const [form, setForm] = useState(EMPTY);
  const [packageNote, setPackageNote] = useState<string | undefined>();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get('topic');
    const match = topic ? TOPIC_TO_NEED[topic] : undefined;
    if (match) {
      setForm((f) => ({ ...f, need: match.need }));
      setPackageNote(match.note);
    }
  }, []);

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || !form.message.trim()) {
      setError('Please add your name, a valid email and a few words about what you need.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');
    const lines = [
      form.message.trim(),
      '',
      packageNote ? `Package: ${packageNote}` : null,
      form.phone ? `Phone / WhatsApp: ${form.phone}` : null,
      form.website ? `Website: ${form.website}` : null,
    ].filter((l) => l !== null);
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, service: form.need, message: lines.join('\n') }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(
        (err instanceof Error && err.message) ||
          'That did not send. Please try again, or WhatsApp us on +27 67 818 4898.'
      );
    }
  };

  if (status === 'sent') {
    return (
      <div className="card flex h-fit flex-col items-start gap-3 border-ink bg-gold p-8 text-[#16130E] dark:border-gold" role="status">
        <FiCheckCircle aria-hidden="true" className="text-4xl" />
        <h2 className="text-2xl font-extrabold">Thanks, {form.name.split(' ')[0]}!</h2>
        <p>
          We&apos;ve got your request. Ronnie will reply within one working day with questions or a fixed quote. If it&apos;s
          urgent, WhatsApp us on +27 67 818 4898.
        </p>
      </div>
    );
  }

  const busy = status === 'sending';

  return (
    <form onSubmit={submit} className="card-pop h-fit space-y-6 p-6 md:p-8" aria-label="Get a free quote" noValidate>
      <fieldset>
        <legend className="text-sm font-bold">What do you need?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <label key={n.value} className="cursor-pointer">
              <input
                type="radio"
                name="need"
                value={n.value}
                checked={form.need === n.value}
                onChange={() => {
                  setForm((f) => ({ ...f, need: n.value }));
                  setPackageNote(undefined);
                }}
                className="peer sr-only"
                disabled={busy}
              />
              <span className="inline-block rounded-full border-2 border-line px-4 py-2 font-semibold transition peer-checked:border-ink peer-checked:bg-gold peer-checked:text-[#16130E] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 dark:peer-checked:border-gold">
                {n.label}
              </span>
            </label>
          ))}
        </div>
        {packageNote && <p className="mt-3 text-sm font-semibold text-gold-text">You picked: {packageNote}</p>}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="q-name" className="block text-sm font-bold">Your name <span className="text-bad" aria-hidden="true">*</span></label>
          <input id="q-name" autoComplete="name" required value={form.name} onChange={set('name')} disabled={busy} className={input} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="q-email" className="block text-sm font-bold">Email <span className="text-bad" aria-hidden="true">*</span></label>
          <input id="q-email" type="email" autoComplete="email" required value={form.email} onChange={set('email')} disabled={busy} className={input} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="q-phone" className="block text-sm font-bold">WhatsApp or phone</label>
          <input id="q-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} disabled={busy} className={input} placeholder="Optional" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="q-site" className="block text-sm font-bold">Your website</label>
          <input id="q-site" type="text" inputMode="url" autoComplete="url" value={form.website} onChange={set('website')} disabled={busy} className={input} placeholder="If you have one" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="q-message" className="block text-sm font-bold">Tell us about your business <span className="text-bad" aria-hidden="true">*</span></label>
        <textarea
          id="q-message"
          required
          value={form.message}
          onChange={set('message')}
          disabled={busy}
          aria-describedby="q-hint"
          className={`${input} min-h-[130px]`}
          placeholder="e.g. We're a plumbing company in Bellville. We need a website so people can find us on Google and call us."
        />
        <p id="q-hint" className="text-sm text-ink/60">A few sentences is enough.</p>
      </div>

      {status === 'error' && error && (
        <p role="alert" className="flex items-start gap-2 rounded-xl border-2 border-bad p-4 font-semibold text-bad">
          <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0" /> {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn-primary w-full text-lg disabled:opacity-70">
        {busy ? (
          <>
            <FiLoader aria-hidden="true" className="animate-spin" /> Sending…
          </>
        ) : (
          'Get my free quote'
        )}
      </button>
      <p className="text-center text-sm text-ink/60">Free and no obligation. We reply within one working day.</p>
    </form>
  );
};
