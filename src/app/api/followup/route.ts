import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { buildPitch, renderEmail } from '../pitch/pitch-templates';

export const maxDuration = 60;

const resend = new Resend(process.env.RESEND_OUTREACH_API_KEY);
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const now = new Date();
    
    // Dates for 3-day and 7-day follow-up checks
    const threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000)).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString();

    // Query leads for Stage 1 Follow-up (3+ days since initial pitch)
    const { data: leadsForFU1 } = await supabase
      .from('leads')
      .select('*')
      .eq('status', 'pitched')
      .eq('replied', false)
      .eq('followup_stage', 0)
      .lte('pitched_at', threeDaysAgo)
      .limit(10);

    // Query leads for Stage 2 Follow-up (7+ days since initial pitch)
    const { data: leadsForFU2 } = await supabase
      .from('leads')
      .select('*')
      .eq('status', 'pitched')
      .eq('replied', false)
      .eq('followup_stage', 1)
      .lte('pitched_at', sevenDaysAgo)
      .limit(10);

    let processedCount = 0;

    // Process Stage 1 Follow-ups
    if (leadsForFU1 && leadsForFU1.length > 0) {
      for (const lead of leadsForFU1) {
        const pitch = buildPitch({ companyName: lead.company_name, notes: lead.notes || '' });
        if (pitch) {
          const emailContent = renderEmail(pitch.followUp1, lead.first_name);

          await resend.emails.send({
            from: 'Ronnie <ronnie@coderon.co.za>',
            to: [lead.email],
            subject: `Re: ${pitch.subject}`,
            text: emailContent.text,
            html: emailContent.html,
          });

          await supabase
            .from('leads')
            .update({ followup_stage: 1 })
            .eq('id', lead.id);

          processedCount++;
        }
      }
    }

    // Process Stage 2 Follow-ups (Breakup Email)
    if (leadsForFU2 && leadsForFU2.length > 0) {
      for (const lead of leadsForFU2) {
        const pitch = buildPitch({ companyName: lead.company_name, notes: lead.notes || '' });
        if (pitch) {
          const emailContent = renderEmail(pitch.followUp2, lead.first_name);

          await resend.emails.send({
            from: 'Ronnie <ronnie@coderon.co.za>',
            to: [lead.email],
            subject: `Re: ${pitch.subject}`,
            text: emailContent.text,
            html: emailContent.html,
          });

          await supabase
            .from('leads')
            .update({ followup_stage: 2, status: 'completed_no_reply' })
            .eq('id', lead.id);

          processedCount++;
        }
      }
    }

    return NextResponse.json({ message: `Automated follow-up engine processed ${processedCount} leads.` });

  } catch (error: any) {
    console.error('Follow-up Engine Error:', error);
    return NextResponse.json({ error: 'Follow-up engine failed', details: error.message }, { status: 500 });
  }
}