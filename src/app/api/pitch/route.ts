import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { buildPitch, renderEmail } from './pitch-templates';

const resend = new Resend(process.env.RESEND_OUTREACH_API_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { leadId, companyName, email, notes, firstName } = await req.json();

    if (!email || email === 'N/A') {
      return NextResponse.json({ error: 'No valid email to send to.' }, { status: 400 });
    }

    // Build pitch based on audit notes
    const pitch = buildPitch({ companyName, notes: notes || '' });

    if (!pitch) {
      return NextResponse.json({ message: `Skipped ${companyName}: No verified critical flaw detected.` });
    }

    // Render plain text AND HTML version for open/click webhook tracking
    const emailContent = renderEmail(pitch.body, firstName);

    // Send email via Resend with tracking enabled
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Ronnie <ronnie@coderon.co.za>',
      to: [email],
      subject: pitch.subject,
      text: emailContent.text,
      html: emailContent.html,
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
      return NextResponse.json({ error: 'Failed to send email. Check Resend dashboard.' }, { status: 500 });
    }

    // Update Supabase with initial pitch state and timestamp
    const { error: dbError } = await supabase
      .from('leads')
      .update({ 
        status: 'pitched',
        pitched_at: new Date().toISOString(),
        followup_stage: 0,
        replied: false,
        initial_trigger: pitch.trigger,
        initial_subject: pitch.subject
      })
      .eq('id', leadId);

    if (dbError) {
      console.error('Supabase Update Error:', dbError);
      return NextResponse.json({ error: 'Email sent, but database update failed.' }, { status: 500 });
    }

    return NextResponse.json({ message: `Successfully pitched ${companyName} via ${pitch.trigger} trigger!` });

  } catch (error: any) {
    console.error('Pitch Error:', error);
    return NextResponse.json({ error: 'Fatal error during pitching', details: error.message }, { status: 500 });
  }
}