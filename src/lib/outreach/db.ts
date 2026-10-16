import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Created on first use, not at import: `next build` imports every route to collect page
// data, and builds without the env vars (e.g. Vercel previews) would crash otherwise.
let client: SupabaseClient | null = null;
function getClient(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
  }
  return client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get: (_target, prop) => {
    const c = getClient();
    const value = Reflect.get(c, prop, c);
    return typeof value === 'function' ? value.bind(c) : value;
  },
});

export type Lead = {
  id: string;
  created_at?: string;
  company_name: string;
  website: string | null;
  email: string | null;
  first_name: string | null;
  source: string | null;
  notes: string | null;
  lead_score: number | null;
  status: string;
  niche: string | null;
  city: string | null;
  country: string | null;
  audit: import('./audit').Audit | null;
  audit_version: number | null;
  pitch_trigger: string | null;
  email_ok: boolean | null;
  opportunity_score: number | null;
  pitched_at: string | null;
  followup_stage: number | null;
  initial_trigger: string | null;
  initial_subject: string | null;
  resend_email_id: string | null;
  message_id: string | null;
  last_followup_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  open_count: number | null;
  clicked_at: string | null;
  click_count: number | null;
  bounced_at: string | null;
  replied_at: string | null;
  call_booked_at: string | null;
  won_at: string | null;
  lost_at: string | null;
  deal_value: number | null;
  unsubscribed: boolean | null;
  skipped_at: string | null;
  skip_reason: string | null;
  notion_page_id: string | null;
};

export async function logEvent(
  type: string,
  leadId: string | null,
  resendEmailId?: string | null,
  meta?: Record<string, unknown>
) {
  const { error } = await supabase
    .from('email_events')
    .insert({ type, lead_id: leadId, resend_email_id: resendEmailId || null, meta: meta || null });
  if (error) console.error('email_events insert failed:', error.message);
}
