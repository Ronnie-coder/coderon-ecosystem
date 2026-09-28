import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const eventType = payload.type; // 'email.opened', 'email.clicked', 'email.bounced'
    
    // Extract target email from Resend payload array
    const recipient = payload.data?.to?.[0];

    if (!recipient) {
      return NextResponse.json({ message: 'No recipient email found in payload' }, { status: 200 });
    }

    if (eventType === 'email.opened') {
      await supabase
        .from('leads')
        .update({ 
          status: 'opened',
          notes: `[Opened at ${new Date().toLocaleTimeString('en-ZA')}]`
        })
        .eq('email', recipient);
    } else if (eventType === 'email.clicked') {
      await supabase
        .from('leads')
        .update({ 
          status: 'clicked'
        })
        .eq('email', recipient);
    } else if (eventType === 'email.bounced') {
      await supabase
        .from('leads')
        .update({ 
          status: 'bounced'
        })
        .eq('email', recipient);
    }

    return NextResponse.json({ message: `Webhook processed event: ${eventType}` }, { status: 200 });
  } catch (error: any) {
    console.error('Resend Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook execution failed', details: error.message }, { status: 500 });
  }
}