// src/app/api/send/route.ts
// Quote form → email to Ronnie.
import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';
import { NextResponse } from 'next/server';

// Created inside the handler so `next build` works without RESEND_API_KEY.
const getResend = () => new Resend(process.env.RESEND_API_KEY);

const LIMITS = { name: 120, email: 200, service: 80, message: 5000, business: 120, website: 200, phone: 30, prefer: 20, package: 80 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// One line, trimmed and capped: stops header tricks via newlines in the subject.
const oneLine = (v: string, max: number) => v.replace(/[\r\n]+/g, ' ').trim().slice(0, max);
// Optional fields: a trimmed one-line string, or '' when missing or not text.
const optional = (v: unknown, max: number) => (typeof v === 'string' ? oneLine(v, max) : '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body ?? {};
    // Spam trap (company_url: pages cached before it was renamed). Never drop the enquiry: a
    // browser's autofill can fill it by mistake, so it is still sent, just marked.
    const flagged = Boolean(body?.leave_empty || body?.company_url);

    if ([name, email, service, message].some((v) => typeof v !== 'string' || !v.trim())) {
      return NextResponse.json({ error: 'Please fill in all the fields.' }, { status: 400 });
    }
    if (!EMAIL.test(email.trim()) || email.length > LIMITS.email) {
      return NextResponse.json({ error: 'Please add a valid email address.' }, { status: 400 });
    }
    if (message.length > LIMITS.message) {
      return NextResponse.json({ error: 'That message is a bit long. Please shorten it, or WhatsApp us.' }, { status: 400 });
    }

    const clean = {
      name: oneLine(name, LIMITS.name),
      email: oneLine(email, LIMITS.email),
      service: oneLine(service, LIMITS.service),
      message: message.trim(),
      business: optional(body.business, LIMITS.business),
      website: optional(body.website, LIMITS.website),
      phone: optional(body.phone, LIMITS.phone),
      prefer: optional(body.prefer, LIMITS.prefer),
      plan: optional(body.package, LIMITS.package),
      receivedAt: new Date(),
    };
    const emailComponent = await ContactEmail(clean);
    const who = clean.business ? `${clean.name} (${clean.business})` : clean.name;

    const { data, error } = await getResend().emails.send({
      from: 'Coderon Website <onboarding@resend.dev>',
      to: ['ronnie@coderon.co.za'],
      subject: `${flagged ? '[Possible spam] ' : ''}New quote request: ${clean.service} · ${who}`,
      reply_to: clean.email,
      react: emailComponent,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    // One line per enquiry (no personal details), so the Vercel logs show every send.
    console.log(`Quote form: email sent${flagged ? ' (marked possible spam)' : ''}`, data?.id);
    return NextResponse.json({ data });
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
