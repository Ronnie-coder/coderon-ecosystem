import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { leadId, companyName, email, notes } = await req.json();

    if (!email || email === 'N/A') {
      return NextResponse.json({ error: 'No valid email to send to.' }, { status: 400 });
    }

    // 🎨 YOUR PROFESSIONAL TABLE-BASED SIGNATURE (Untouched)
    const signature = `
      <br><br>
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; max-width: 600px; margin-top: 20px; background-color: #fcfcfc; border: 1px solid #eaeaea; border-radius: 8px; padding: 20px;">
        <tr>
          <td style="border-left: 4px solid #dca646; padding-left: 15px; vertical-align: middle;">
            <h2 style="margin: 0 0 4px; font-size: 18px; color: #111;">Ronnie Nyamhute</h2>
            <p style="margin: 0 0 16px; font-size: 12px; font-weight: bold; color: #dca646; text-transform: uppercase; letter-spacing: 0.5px;">Founder & Lead Developer</p>
            <p style="margin: 4px 0; font-size: 13px; color: #444;">
              <span style="color: #999; margin-right: 5px;">✉</span> ronnie@coderon.co.za
            </p>
            <p style="margin: 4px 0; font-size: 13px; color: #444;">
              <span style="color: #999; margin-right: 5px;">📞</span> +27 (0) 67 818 4898
            </p>
            <p style="margin: 4px 0; font-size: 13px; color: #444;">
              <span style="color: #3b82f6; margin-right: 5px;">🌐</span> <a href="https://www.coderon.co.za" style="color: #444; text-decoration: none;">www.coderon.co.za</a>
            </p>
          </td>
          <td width="30" style="border-right: 1px solid #eaeaea; padding: 0 15px;"></td>
          <td width="30"></td>
          <td style="vertical-align: middle; text-align: center;">
            <img src="https://www.coderon.co.za/images/coderon-logo.png" alt="Coderon Logo" width="80" style="display: block; margin: 0 auto 12px;" />
            <p style="margin: 0; font-size: 10px; font-weight: bold; color: #999; text-transform: uppercase; letter-spacing: 0.5px;">Coderon (Pty) Ltd</p>
            <p style="margin: 2px 0 12px; font-size: 10px; color: #aaa;">REG: 2025/482790/07</p>
            <p style="margin: 0; font-size: 12px; font-weight: bold; letter-spacing: 2px;">
              <a href="https://www.linkedin.com/in/ronnie-nyamhute-8b302b360" style="color: #dca646; text-decoration: none;">IN</a> &nbsp;
              <a href="https://github.com/Ronnie-coder" style="color: #dca646; text-decoration: none;">GH</a> &nbsp;
              <a href="https://x.com/Coderon28" style="color: #dca646; text-decoration: none;">X</a> &nbsp;
              <a href="https://www.facebook.com/profile.php?id=61586558918279" style="color: #dca646; text-decoration: none;">FB</a>
            </p>
          </td>
        </tr>
      </table>
    `;

    // 🧠 THE SMART DECISION ENGINE (100% Free Logic)
    let subject = '';
    let emailBodyText = '';
    const auditNotes = notes || '';

    // PRIORITY 1: The "Burning Ad Spend" Pitch
    if (auditNotes.includes('Google Ads Active') || auditNotes.includes('Meta Pixel Active')) {
      subject = `Quick question about ${companyName}'s ads`;
      emailBodyText = `
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Hi team at ${companyName},</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">I was doing some local research and noticed you guys are actively running paid ads. I also took a quick look at your website's backend and spotted a few technical blockers that are likely causing you to leak expensive clicks before the page even loads properly for the customer.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">My team builds the infrastructure that plugs these leaks so your ad spend actually turns into phone calls.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Mind if I shoot over a quick 60-second video showing you exactly where the drop-off is happening?</p>
      `;
    } 
    // PRIORITY 2: The "Security & Trust" Pitch
    else if (auditNotes.includes('No SSL')) {
      subject = `Security warning on ${companyName}'s website`;
      emailBodyText = `
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Hi team at ${companyName},</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">I was searching for local businesses today and tried to click on your website, but Google Chrome threw a red "Not Secure" warning on my screen.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Usually, when potential clients see this, they instantly click the back button before ever requesting a quote. It's a relatively straightforward fix on the backend to get it secured.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Are you guys currently working with anyone to manage your web infrastructure? I'd be happy to send over the exact steps to fix it.</p>
      `;
    } 
    // PRIORITY 3: The "Local Maps Ghost" Pitch
    else if (auditNotes.includes('No Local Schema')) {
      subject = `Google Maps visibility for ${companyName}`;
      emailBodyText = `
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Hi team at ${companyName},</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">I was doing some local market research and noticed your business isn't utilizing local structured data on your website.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Without this specific code snippet, Google Maps essentially struggles to understand your service area, which pushes you down the list when locals are searching for your services.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Mind if I send over a 60-second Loom video showing you how we can inject this data and boost your local rankings?</p>
      `;
    } 
    // FALLBACK: The Universal Optimization Pitch
    else {
      subject = `Quick question for ${companyName}`;
      emailBodyText = `
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Hi team at ${companyName},</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">I was researching businesses in your area, and while your company looks great, I noticed a few hidden technical bottlenecks on your website that are likely costing you quote requests.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">At CodeRun, we specialize in turning basic websites into high-converting lead engines for service businesses.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">If you're currently looking to take on more clients this quarter, mind if I send over a quick breakdown of what I found?</p>
      `;
    }

    const finalHtmlBody = `${emailBodyText}\n<p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Best regards,</p>\n${signature}`;

    // 🚀 SEND VIA RESEND
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Ronnie at Coderon <ronnie@coderon.co.za>', 
      to: [email],
      subject: subject,
      html: finalHtmlBody,
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
      return NextResponse.json({ error: 'Failed to send email. Check Resend dashboard.' }, { status: 500 });
    }

    // 🗄️ UPDATE SUPABASE
    const { error: dbError } = await supabase
      .from('leads')
      .update({ status: 'pitched' })
      .eq('id', leadId);

    if (dbError) {
      console.error('Supabase Update Error:', dbError);
      return NextResponse.json({ error: 'Email sent, but database update failed.' }, { status: 500 });
    }

    return NextResponse.json({ message: `Successfully pitched ${companyName} using Smart Templates!` });

  } catch (error: any) {
    console.error('Pitch Error:', error);
    return NextResponse.json({ error: 'Fatal error during pitching', details: error.message }, { status: 500 });
  }
}