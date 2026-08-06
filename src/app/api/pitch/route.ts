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

    let subject = '';
    let htmlBody = '';

    // 🎨 YOUR PROFESSIONAL TABLE-BASED SIGNATURE
    const signature = `
      <br><br>
      <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; max-width: 600px; margin-top: 20px; background-color: #fcfcfc; border: 1px solid #eaeaea; border-radius: 8px; padding: 20px;">
        <tr>
          <!-- Left Side (Gold Border & Contact Info) -->
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
          
          <!-- Vertical Divider -->
          <td width="30" style="border-right: 1px solid #eaeaea; padding: 0 15px;"></td>
          <td width="30"></td>
          
          <!-- Right Side (Logo, Reg & Socials) -->
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

    // 🧠 DYNAMIC TEMPLATE LOGIC
    if (notes && notes.includes('Missing SSL')) {
      subject = `Quick question regarding ${companyName}'s website security`;
      htmlBody = `
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Hi team at ${companyName},</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">I was doing some research on local businesses and came across your website.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">I noticed that your site is currently missing an SSL certificate (it shows as "Not Secure" in Google Chrome). This can actually hurt your search rankings and scare away potential clients who think their data isn't safe.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">My team at Coderon specializes in fixing these exact security issues and upgrading web infrastructure. Would you be open to a quick 5-minute chat this week to see how we can secure your site?</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Best regards,</p>
        ${signature}
      `;
    } else if (notes && notes.includes('Rating: ') && parseFloat(notes.split('Rating: ')[1]) < 4.0) {
      subject = `Ideas for improving ${companyName}'s online reviews`;
      htmlBody = `
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Hi team at ${companyName},</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">I was looking for local services and found your profile. I noticed your Google rating is a bit lower than some of your competitors.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">At Coderon, we build automated systems that help businesses capture positive reviews from happy customers while filtering out negative feedback before it hits the web.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Would you be open to a quick chat about how we can boost your rating and get you more leads?</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Best regards,</p>
        ${signature}
      `;
    } else {
      subject = `Quick question for ${companyName}`;
      htmlBody = `
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Hi team at ${companyName},</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">I was doing some research in your area and was impressed by your business, but I noticed a few areas on your website that could be optimized to help capture more leads and improve your local search visibility.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">My team at Coderon helps businesses like yours turn their websites into high-converting lead engines. Are you currently taking on new clients?</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Let me know if you'd be open to a quick 5-minute chat this week.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.5;">Best regards,</p>
        ${signature}
      `;
    }

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Ronnie at Coderon <ronnie@coderon.co.za>',
      to: [email],
      subject: subject,
      html: htmlBody,
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
      return NextResponse.json({ error: 'Failed to send email. Check Resend dashboard.' }, { status: 500 });
    }

    const { error: dbError } = await supabase
      .from('leads')
      .update({ status: 'pitched' })
      .eq('id', leadId);

    if (dbError) {
      console.error('Supabase Update Error:', dbError);
      return NextResponse.json({ error: 'Email sent, but database update failed.' }, { status: 500 });
    }

    return NextResponse.json({ message: `Successfully pitched ${companyName}!` });

  } catch (error: any) {
    console.error('Pitch Error:', error);
    return NextResponse.json({ error: 'Fatal error during pitching', details: error.message }, { status: 500 });
  }
}