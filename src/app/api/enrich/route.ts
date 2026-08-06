import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// 🚀 VERCEL CRONS REQUIRE GET REQUESTS
export async function GET() {
  try {
    const { data: leads, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .not('website', 'is', null)
      .eq('status', 'new')
      .limit(10); // Process 10 leads per run

    if (fetchError || !leads || leads.length === 0) {
      return NextResponse.json({ message: 'No new leads to enrich.' });
    }

    let enrichedCount = 0;
    let criticalFlawsFound = 0;
    let errors = [];

    for (const lead of leads) {
      let targetUrl = lead.website;
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = `https://${targetUrl}`;
      }

      let auditNotes: string[] = [];
      let extractedEmails: string[] = [];
      let penalty = 0;

      // Check SSL
      if (targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        auditNotes.push('⚠️ No SSL');
        penalty += 10;
        criticalFlawsFound++;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout
        
        const res = await fetch(targetUrl, {
          signal: controller.signal,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        clearTimeout(timeoutId);

        const html = await res.text();
        
        // 🔎 DEEP AUDIT LOGIC
        if (!html.match(/<title[^>]*>([^<]+)<\/title>/i)) { auditNotes.push('❌ No Title'); penalty += 5; }
        if (!html.match(/<meta[^>]*name=["']description["'][^>]*>/i)) { auditNotes.push('❌ No Meta Desc'); penalty += 5; }
        if (!html.match(/<h1[^>]*>([^<]+)<\/h1>/i)) { auditNotes.push('❌ No H1'); penalty += 5; }
        if (!html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i)) { auditNotes.push('📱 Not Mobile Ready'); penalty += 10; criticalFlawsFound++; }

        // Email Scraper
        const foundEmails = html.match(EMAIL_REGEX) || [];
        const cleanEmails = Array.from(new Set(foundEmails)).filter(
          (email) => !email.endsWith('.png') && !email.endsWith('.jpg') && !email.endsWith('.webp')
        );

        if (cleanEmails.length > 0) {
          extractedEmails = cleanEmails;
          auditNotes.push(`✉️ ${cleanEmails[0]}`);
        }
      } catch (err: any) {
        auditNotes.push('⚠️ Fetch Blocked/Timeout');
      }

      const primaryEmail = extractedEmails.length > 0 ? extractedEmails[0] : null;
      const updatedNotes = `${lead.notes || ''} | Audit: ${auditNotes.join(', ')}`;
      const finalScore = Math.max(0, lead.lead_score - penalty); // Apply penalties but don't drop below 0

      // Update Supabase
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          email: primaryEmail || lead.email,
          notes: updatedNotes,
          status: 'audited',
          lead_score: finalScore
        })
        .eq('id', lead.id);

      if (updateError) {
        console.error('SUPABASE UPDATE ERROR:', updateError);
        errors.push({ id: lead.id, error: updateError.message });
      } else {
        enrichedCount++;
      }
    }

    // 🐺 SEND DAILY DIGEST TO YOUR INBOX
    if (enrichedCount > 0 && process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'CodeRun System <onboarding@resend.dev>', // Keep as onboarding for now unless you added a custom domain in Resend
          to: 'ronnie@coderon.co.za',
          subject: `🐺 CodeRun Engine Report: ${enrichedCount} Leads Audited`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; background: #0d1117; color: #c9d1d9; border-radius: 8px;">
              <h2 style="color: #ffffff;">CodeRun Command Center</h2>
              <p>Your morning lead generation cycle has completed successfully.</p>
              <ul>
                <li><strong>Leads Audited:</strong> ${enrichedCount}</li>
                <li><strong>Critical SEO/Security Flaws Found:</strong> ${criticalFlawsFound}</li>
              </ul>
              <p>Log in to your dashboard to review the targets and send pitches.</p>
              <a href="https://www.coderon.co.za/admin/leads" style="display: inline-block; padding: 10px 20px; background: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 15px;">Open Dashboard</a>
            </div>
          `
        })
      });
    }

    return NextResponse.json({
      message: `Audited ${enrichedCount} leads.`,
      errors: errors.length > 0 ? errors : 'None'
    });

  } catch (error: any) {
    return NextResponse.json({ error: 'Fatal error', details: error.message }, { status: 500 });
  }
}