// Mirrors real outreach (not the whole lead list) into the Notion "Coderon — Outreach" CRM.
// No-op unless NOTION_TOKEN and NOTION_OUTREACH_DB are set. Failures never block sending.
import type { Lead } from './db';
import { cleanCompanyName } from './names';

const NOTION_VERSION = '2022-06-28';

export type NotionStage = 'Pitched' | 'Opened' | 'Replied' | 'Call Booked' | 'Won' | 'Lost' | 'No Response';

function enabled() {
  return Boolean(process.env.NOTION_TOKEN && process.env.NOTION_OUTREACH_DB);
}

async function notion(path: string, method: string, body: unknown) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || `Notion ${res.status}`);
  return json;
}

const text = (s: string | null | undefined) => ({ rich_text: s ? [{ text: { content: s.slice(0, 1900) } }] : [] });
const date = (iso: string | null | undefined) => ({ date: iso ? { start: iso } : null });

function evidenceSummary(lead: Lead): string {
  const issues = lead.audit?.issues?.map((i) => i.evidence).join(' · ');
  return issues || lead.notes || '';
}

export async function notionCreatePitch(lead: Lead, subject: string): Promise<string | null> {
  if (!enabled()) return null;
  try {
    const page = await notion('pages', 'POST', {
      parent: { database_id: process.env.NOTION_OUTREACH_DB },
      properties: {
        Name: { title: [{ text: { content: cleanCompanyName(lead.company_name) } }] },
        Company: text(lead.company_name),
        Stage: { select: { name: 'Pitched' } },
        'Signal Level': { select: { name: 'Cold' } },
        'Next Action': { select: { name: 'Wait' } },
        'Target Type': { select: { name: 'Service Business' } },
        Source: { select: { name: 'Engine' } },
        Email: { email: lead.email },
        Website: { url: lead.website },
        Niche: text(lead.niche),
        Country: text(lead.country),
        'Pitch Trigger': { select: { name: lead.pitch_trigger || 'other' } },
        'Pitched At': date(new Date().toISOString()),
        Date: date(new Date().toISOString().slice(0, 10)),
        'Supabase ID': text(String(lead.id)),
        Reason: text(subject),
        Notes: text(evidenceSummary(lead)),
      },
    });
    return page.id as string;
  } catch (e) {
    console.error('Notion create failed:', (e as Error).message);
    return null;
  }
}

export async function notionUpdateStage(
  pageId: string | null | undefined,
  stage: NotionStage,
  extra: { openedAt?: string; dealValue?: number | null } = {}
) {
  if (!enabled() || !pageId) return;
  const signal = stage === 'Pitched' ? 'Cold' : stage === 'Opened' ? 'Warm' : 'Strong';
  const properties: Record<string, unknown> = {
    Stage: { select: { name: stage } },
    'Signal Level': { select: { name: signal } },
  };
  if (stage === 'Replied' || stage === 'Opened') properties['Next Action'] = { select: { name: 'Send Question' } };
  if (stage === 'Won' || stage === 'Lost') properties['Next Action'] = { select: { name: 'Close Loop' } };
  if (extra.openedAt) properties['Opened At'] = date(extra.openedAt);
  if (extra.dealValue != null) properties['Deal Value'] = { number: extra.dealValue };
  try {
    await notion(`pages/${pageId}`, 'PATCH', { properties });
  } catch (e) {
    console.error('Notion update failed:', (e as Error).message);
  }
}
