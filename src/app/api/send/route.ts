// src/app/api/send/route.ts
// Quote form → email to Ronnie.
import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';
import { NextResponse } from 'next/server';

// Created inside the handler so `next build` works without RESEND_API_KEY.
const getResend = () => new Resend(process.env.RESEND_API_KEY);

const LIMITS = { name: 120, email: 200, service: 80, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// One line, trimmed and capped: stops header tricks via newlines in the subject.
const oneLine = (v: string, max: number) => v.replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message, company_url } = body ?? {};

    // Spam trap filled in: pretend it worked so the bot moves on.
    if (company_url) return NextResponse.json({ data: { id: 'ok' } });

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
    };
    const emailComponent = await ContactEmail(clean);

    const { data, error } = await getResend().emails.send({
      from: 'Coderon Website <onboarding@resend.dev>',
      to: ['ronnie@coderon.co.za'],
      subject: `New Inquiry: ${clean.service} for ${clean.name}`,
      reply_to: clean.email,
      react: emailComponent,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
