import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

// 1. GET: Fetch leads from Supabase for your dashboard
export async function GET() {
  try {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase DB Error:', error);
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }

    return NextResponse.json({ leads }, { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}

// 2. POST: Ingest leads into Supabase
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      name, 
      company_name, 
      email, 
      website, 
      source = 'Website', 
      notes, 
      lead_score, 
      ai_pitch_draft 
    } = body;

    if (!email && !company_name && !name) {
      return NextResponse.json({ error: 'Lead details (name, company, or email) required.' }, { status: 400 });
    }

    const { data: leadData, error: dbError } = await supabase
      .from('leads')
      .insert([
        { 
          name, 
          company_name, 
          email, 
          website, 
          source, 
          notes, 
          lead_score: lead_score || 0, 
          ai_pitch_draft,
          status: 'new' 
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase DB Error:', dbError);
      return NextResponse.json({ error: 'Could not save lead to the database.' }, { status: 500 });
    }

    // Optional notification email via Resend
    if (process.env.RESEND_API_KEY && email) {
      await resend.emails.send({
        from: 'Coderon AI Assistant <onboarding@resend.dev>',
        to: ['ronnie@coderon.co.za'],
        subject: `🚀 New Lead Captured via ${source}!`,
        html: `
          <h1>New Lead Captured</h1>
          <p><strong>Company/Name:</strong> ${company_name || name || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Website:</strong> ${website || 'N/A'}</p>
          <p><strong>Source:</strong> ${source}</p>
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
        `,
      }).catch((err) => console.error('Resend Error:', err));
    }

    return NextResponse.json({ message: 'Lead captured successfully.', leadId: leadData.id });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}