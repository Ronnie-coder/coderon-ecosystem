import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // 1. Check if the event is specifically an "email.opened" event
    if (payload.type === 'email.opened') {
      const openedEmail = payload.data.to[0]; // The exact email address that opened it

      if (openedEmail) {
        // 2. Find the lead with this email and update their status
        const { error } = await supabase
          .from('leads')
          .update({ status: 'opened' })
          .eq('email', openedEmail);

        if (error) {
          console.error('Webhook DB Update Error:', error);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

        console.log(`✅ FIRE! Lead with email ${openedEmail} just opened your pitch!`);
      }
    }

    // Always return a 200 OK so Resend knows the webhook was received successfully
    return NextResponse.json({ message: 'Webhook received & processed' }, { status: 200 });

  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}