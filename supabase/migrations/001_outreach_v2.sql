-- Coderon Outreach Engine v2
-- Run this once in the Supabase SQL editor BEFORE deploying the v2 code.
-- Safe to re-run: every statement is idempotent.

-- 1. Tracking + audit columns on leads -------------------------------------
alter table leads add column if not exists niche text;
alter table leads add column if not exists city text;
alter table leads add column if not exists country text;
alter table leads add column if not exists first_name text;

alter table leads add column if not exists audit jsonb;              -- structured, verified audit evidence (v2)
alter table leads add column if not exists audit_version int;        -- 2 = verified auditor
alter table leads add column if not exists pitch_trigger text;       -- ssl | speed | mobile | snippet | null (no verified issue)
alter table leads add column if not exists email_ok boolean;         -- passed junk filter + MX check
alter table leads add column if not exists opportunity_score int;    -- higher = better lead (more verified issues + good reviews)

alter table leads add column if not exists pitched_at timestamptz;
alter table leads add column if not exists followup_stage int default 0;
alter table leads add column if not exists replied boolean default false;
alter table leads add column if not exists initial_trigger text;
alter table leads add column if not exists initial_subject text;
alter table leads add column if not exists resend_email_id text;
alter table leads add column if not exists message_id text;
alter table leads add column if not exists last_followup_at timestamptz;

alter table leads add column if not exists delivered_at timestamptz;
alter table leads add column if not exists opened_at timestamptz;
alter table leads add column if not exists open_count int default 0;
alter table leads add column if not exists clicked_at timestamptz;
alter table leads add column if not exists click_count int default 0;
alter table leads add column if not exists bounced_at timestamptz;
alter table leads add column if not exists replied_at timestamptz;
alter table leads add column if not exists call_booked_at timestamptz;
alter table leads add column if not exists won_at timestamptz;
alter table leads add column if not exists lost_at timestamptz;
alter table leads add column if not exists deal_value numeric;
alter table leads add column if not exists unsubscribed boolean default false;
alter table leads add column if not exists skipped_at timestamptz;
alter table leads add column if not exists skip_reason text;         -- skip | bad_email | not_fit
alter table leads add column if not exists notion_page_id text;

create index if not exists leads_pitched_at_idx on leads (pitched_at);
create index if not exists leads_queue_idx on leads (status, pitch_trigger, opportunity_score desc);
create index if not exists leads_email_idx on leads (email);
create index if not exists leads_resend_email_id_idx on leads (resend_email_id);

-- 2. Every outbound email and every webhook event ---------------------------
create table if not exists email_events (
  id bigserial primary key,
  lead_id text,
  type text not null,              -- sent_pitch | sent_followup | delivered | opened | clicked | bounced | complained
  resend_email_id text,
  meta jsonb,
  created_at timestamptz not null default now()
);
create index if not exists email_events_created_idx on email_events (created_at);
create index if not exists email_events_type_idx on email_events (type, created_at);


-- 3. Backfill niche / city / country from "Serper (<modifier> <niche> in <City, Region>)" ----
update leads
set
  city = trim(substring(source from 'Serper \(.* in (.*)\)$')),
  niche = trim(regexp_replace(
    substring(source from 'Serper \((.*) in .*\)$'),
    '^(Best|Commercial|Top-rated|Affordable|Emergency|Luxury|Custom|Local|Corporate)\s+', ''
  ))
where source like 'Serper (%' and (city is null or niche is null);

update leads
set country = case
  when city ~ ', UK$' then 'United Kingdom'
  when city ~ 'South Africa$' then 'South Africa'
  when city ~ 'Australia$' then 'Australia'
  when city ~ 'New Zealand$' then 'New Zealand'
  when city ~ 'UAE$' then 'UAE'
  when city ~ 'Canada$' then 'Canada'
  when city = 'Singapore' then 'Singapore'
  when city ~ ', [A-Z]{2}$' then 'United States'
  else null
end
where country is null and city is not null;

-- 4. Repair the two real leads whose audit notes were wiped by the old webhook ----
-- (notes restored from the Notion Outreach CRM; status back to 'pitched' so follow-ups include them)
update leads
set notes = 'Phone: +44 7480 156010 | Rating: 5★ | Audit: ⚠️ No SSL, ❌ No Meta Desc, ❌ No H1, ❌ No Local Schema',
    opened_at = coalesce(opened_at, '2026-10-12T10:00:00Z'),
    open_count = greatest(coalesce(open_count, 0), 1),
    status = 'pitched'
where email = 'deltaroofingrepairs@gmail.com' and pitched_at is not null;

update leads
set notes = 'Phone: 1800 887 297 | Rating: 4.9★ | Audit: ⚠️ No SSL, ❌ No Meta Desc',
    opened_at = coalesce(opened_at, '2026-10-12T10:00:00Z'),
    open_count = greatest(coalesce(open_count, 0), 1),
    status = 'pitched'
where email = 'ultravoltservices@gmail.com' and pitched_at is not null;

-- Any other pitched lead the old webhook moved to opened/clicked: keep the signal as timestamps
update leads set opened_at = coalesce(opened_at, pitched_at), open_count = greatest(coalesce(open_count,0),1)
where status in ('opened', 'clicked') and pitched_at is not null;
update leads set clicked_at = coalesce(clicked_at, pitched_at), click_count = greatest(coalesce(click_count,0),1)
where status = 'clicked' and pitched_at is not null;
update leads set status = 'pitched'
where status in ('opened', 'clicked') and pitched_at is not null;

-- 5. Sanity check (run after): should show 1040-ish total and 5 pitched
-- select count(*) total, count(pitched_at) pitched, count(opened_at) opened from leads;
