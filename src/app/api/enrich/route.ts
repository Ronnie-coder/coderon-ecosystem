import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 🚀 VERCEL CONFIGURATION: FORCE 60 SECOND MAX DURATION
export const maxDuration = 60;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const extractDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch (e) {
    return null;
  }
};

export async function GET() {
  try {
    // ⚙️ BATCH REDUCTION: Process 5 at a time to ensure we beat the 60s timeout
    const { data: leads, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .not('website', 'is', null)
      .eq('status', 'new')
      .limit(5); 

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
      const domain = extractDomain(targetUrl);

      // 1. SSL CHECK
      if (targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        auditNotes.push('⚠️ No SSL');
        penalty += 10;
        criticalFlawsFound++;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); 
        const res = await fetch(targetUrl, {
          signal: controller.signal,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        clearTimeout(timeoutId);
        const html = await res.text();
        
        // 2. BASIC SEO
        if (!html.match(/<title[^>]*>([^<]+)<\/title>/i)) { auditNotes.push('❌ No Title'); penalty += 5; }
        if (!html.match(/<meta[^>]*name=["']description["'][^>]*>/i)) { auditNotes.push('❌ No Meta Desc'); penalty += 5; }
        if (!html.match(/<h1[^>]*>([^<]+)<\/h1>/i)) { auditNotes.push('❌ No H1'); penalty += 5; }
        
        // 3. DEEP VALUE TELEMETRY
        if (!html.includes('application/ld+json')) { auditNotes.push('❌ No Local Schema'); penalty += 10; }
        if (html.includes('fbevents.js') || html.includes('connect.facebook.net')) auditNotes.push('⚡ Meta Pixel Active');
        if (html.includes('googletagmanager.com/gtag') || html.includes('gtm.js')) auditNotes.push('⚡ Google Ads Active');

        // 4. WEBSITE EMAIL SCRAPE
        const foundEmails = html.match(EMAIL_REGEX) || [];
        const cleanEmails = Array.from(new Set(foundEmails)).filter(
          (email) => !email.endsWith('.png') && !email.endsWith('.jpg') && !email.endsWith('.webp')
        );
        if (cleanEmails.length > 0) extractedEmails = cleanEmails;

      } catch (err: any) {
        auditNotes.push('⚠️ Fetch Blocked/Timeout');
      }

      // 5. HUNTER.IO API INTEGRATIONS
      if (domain && process.env.HUNTER_API_KEY) {
        
        // A. COMPANY ENRICHMENT
        try {
          const companyRes = await fetch(`https://api.hunter.io/v2/companies/find?domain=${domain}&api_key=${process.env.HUNTER_API_KEY}`);
          const companyData = await companyRes.json();
          if (companyData.data) {
            const industry = companyData.data.industry;
            const year = companyData.data.founded_year;
            if (industry || year) {
              auditNotes.push(`🏢 ${industry || 'Corp'} (Est. ${year || 'N/A'})`);
            }
          }
        } catch (e) { console.log('Company Enrichment failed'); }

        // B. DOMAIN SEARCH
        if (extractedEmails.length === 0) {
          try {
            const hunterRes = await fetch(`https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${process.env.HUNTER_API_KEY}`);
            const hunterData = await hunterRes.json();
            if (hunterData.data?.emails?.length > 0) {
              extractedEmails = [hunterData.data.emails[0].value];
              auditNotes.push('🎯 Hunter Sniper');
            }
          } catch (e) { console.log('Domain Search failed'); }
        }

        // C. EMAIL VERIFIER
        if (extractedEmails.length > 0) {
          try {
            const verifyRes = await fetch(`https://api.hunter.io/v2/email-verifier?email=${extractedEmails[0]}&api_key=${process.env.HUNTER_API_KEY}`);
            const verifyData = await verifyRes.json();
            if (verifyData.data?.status === 'invalid') {
              extractedEmails = []; // Destroy the email if it's dead
              auditNotes.push('🗑️ Dead Email Blocked');
            } else {
              auditNotes.push('✅ Email Verified');
            }
          } catch (e) { console.log('Verifier failed'); }
        }
      }

      const primaryEmail = extractedEmails.length > 0 ? extractedEmails[0] : null;
      const updatedNotes = `${lead.notes || ''} | Audit: ${auditNotes.join(', ')}`;
      const finalScore = Math.max(0, lead.lead_score - penalty); 

      // 6. UPDATE SUPABASE VAULT
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
        errors.push({ id: lead.id, error: updateError.message });
      } else {
        enrichedCount++;
      }
    }

    // 7. BLUE ICE CEO REPORT (Resend Integration)
    if (enrichedCount > 0 && process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'CodeRun System <onboarding@resend.dev>',
          to: 'ronnie@coderon.co.za',
          subject: `🟢 CodeRun Operations: ${enrichedCount} Leads Audited`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; padding: 30px; background-color: #020617; color: #e2e8f0; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #1e293b;">
              <h2 style="color: #38bdf8; margin-top: 0; font-size: 24px; border-bottom: 1px solid #1e293b; padding-bottom: 15px;">
                CodeRun Autonomous Engine
              </h2>
              <h3 style="color: #f8fafc; font-size: 14px; text-transform: uppercase; margin-top: 25px;">Executive Summary</h3>
              <p style="color: #94a3b8; font-size: 15px; line-height: 1.6;">Your automated lead generation and deep technical auditing cycle has completed successfully.</p>
              
              <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #1e293b;">
                <h3 style="color: #f8fafc; font-size: 14px; text-transform: uppercase; margin-top: 0;">System Telemetry</h3>
                <ul style="list-style-type: none; padding: 0; margin: 0; color: #cbd5e1; font-size: 15px;">
                  <li style="padding-bottom: 8px;"><strong>Total Targets Audited:</strong> <span style="color: #38bdf8;">${enrichedCount}</span></li>
                  <li><strong>Critical Vulnerabilities Detected:</strong> <span style="color: #f87171;">${criticalFlawsFound}</span></li>
                </ul>
              </div>
              <a href="https://www.coderon.co.za/admin/leads" style="display: inline-block; padding: 12px 24px; background-color: #0284c7; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-bottom: 30px;">
                Access Command Center
              </a>
              <div style="border-top: 1px solid #1e293b; padding-top: 20px; font-size: 12px; color: #64748b; line-height: 1.5;">
                <strong>🔒 SECURE AUTOMATED TRANSMISSION</strong><br>
                CODERON (PTY) LTD | REG: 2025/482790/07<br>
                www.coderon.co.za<br><br>
              </div>
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