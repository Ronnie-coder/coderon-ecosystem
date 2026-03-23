import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize clients from environment variables for security
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, source = 'Website', notes } = await req.json();

    // 1. Validate incoming data
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    // 2. Insert the lead into the Supabase database
    const { data: leadData, error: dbError } = await supabase
      .from('leads')
      .insert([{ name, email, source, notes }])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase DB Error:', dbError);
      return NextResponse.json({ error: 'Could not save lead to the database.' }, { status: 500 });
    }

    // 3. Send a notification email using Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Coderon AI Assistant <onboarding@resend.dev>',
      to: ['ronnie@coderon.co.za'],
      subject: `🚀 New Lead Captured via ${source}!`,
      html: `
        <h1>New Lead via Coderon AI Assistant</h1>
        <p>A new potential client has been captured by Kojo.</p>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${source}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
        <hr>
        <p>Lead has been successfully saved to the Supabase database with ID: ${leadData.id}.</p>
      `,
    });

    if (emailError) {
      // Log the error but don't fail the request. Saving the lead is the priority.
      console.error('Resend Email Error:', emailError);
    }

    // 4. Return a success response to Botpress
    return NextResponse.json({ message: 'Lead captured successfully.', leadId: leadData.id });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}