// CORRECTED: src/app/api/send/route.ts
import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, service, message } = await request.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const emailComponent = await ContactEmail({ name, email, service, message });

    const { data, error } = await resend.emails.send({
      from: 'Coderon Website <onboarding@resend.dev>',
      to: ['ronnie@coderon.co.za'],
      subject: `New Inquiry: ${service} for ${name}`,
      // FIX: Changed 'replyTo' to 'reply_to' to match Resend API specification.
      reply_to: email, 
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