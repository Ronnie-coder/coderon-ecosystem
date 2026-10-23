import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { requireAdmin } from '@/lib/adminAuth';

// Clients are created inside the handlers so `next build` works without the env vars.
const getSupabase = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const getResend = () => new Resend(process.env.RESEND_API_KEY);

// 1. GET: paginated, searchable lead list for the "All leads" tab (never the whole table:
// Supabase caps a plain select at 1,000 rows, which is what hid pitches on the old dashboard).
export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
  try {
    const url = new URL(req.url);
    const page = Math.max(0, Number(url.searchParams.get('page') || 0));
    const size = Math.min(100, Number(url.searchParams.get('size') || 50));
    const q = (url.searchParams.get('q') || '').trim().replace(/[,()%]/g, ' ');
    const filter = url.searchParams.get('filter') || 'all';

    let query = getSupabase()
      .from('leads')
      .select('id, company_name, website, email, email_ok, niche, city, country, status, pitch_trigger, opportunity_score, lead_score, notes, pitched_at, opened_at, replied_at, skipped_at, skip_reason, audit_version, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * size, page * size + size - 1);

    if (q) query = query.or(`company_name.ilike.%${q}%,email.ilike.%${q}%,website.ilike.%${q}%`);
    if (filter === 'ready') query = query.eq('status', 'audited').not('pitch_trigger', 'is', null).eq('email_ok', true).is('pitched_at', null).is('skipped_at', null);
    if (filter === 'pitched') query = query.not('pitched_at', 'is', null);
    if (filter === 'skipped') query = query.not('skipped_at', 'is', null);
    if (filter === 'no_issue') query = query.eq('audit_version', 2).is('pitch_trigger', null);
    if (filter === 'unverified') query = query.or('audit_version.is.null,audit_version.lt.2');

    const { data: leads, error, count } = await query;
    if (error) {
      console.error('Supabase DB Error:', error);
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
    return NextResponse.json({ leads, count, page, size }, { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}

// 2. POST: Ingest leads into Supabase
export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;
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

    const { data: leadData, error: dbError } = await getSupabase()
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
      await getResend().emails.send({
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