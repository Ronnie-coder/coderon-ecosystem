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

    // THE FIX: We must now await the component's rendering because Next.js 16
    // treats it as an async operation. This resolves the Promise<ReactNode> type error.
    const emailComponent = await ContactEmail({ name, email, service, message });

    const { data, error } = await resend.emails.send({
      from: 'Coderon Website <onboarding@resend.dev>',
      to: ['ronnie@coderon.co.za'],
      subject: `New Inquiry: ${service} for ${name}`,
      replyTo: email,
      // Pass the resolved component, not the promise of the component.
      react: emailComponent,
    });

    if (error) {
      // It's better to log the error on the server for debugging
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    // Catch potential errors from request.json() or other synchronous code
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}