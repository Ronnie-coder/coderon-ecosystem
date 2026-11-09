import { Resend } from 'resend';
import { REPLY_TO, SENDER } from './config';

// Created per send, not at import, so builds without RESEND_OUTREACH_API_KEY still succeed.
function getResend(): Resend {
  return new Resend(process.env.RESEND_OUTREACH_API_KEY);
}

export function newMessageId(): string {
  return `<coderon-${crypto.randomUUID()}@coderon.co.za>`;
}

export async function sendOutreachEmail(args: {
  to: string;
  subject: string;
  text: string;
  html: string;
  messageId: string;
  inReplyTo?: string | null;
  /** ISO time for Resend to deliver it; omit to send now. */
  scheduledAt?: string | null;
}): Promise<{ id: string | null; error: string | null }> {
  const headers: Record<string, string> = {
    'Message-ID': args.messageId,
    'List-Unsubscribe': `<mailto:${REPLY_TO}?subject=unsubscribe>`,
  };
  if (args.inReplyTo) {
    headers['In-Reply-To'] = args.inReplyTo;
    headers['References'] = args.inReplyTo;
  }
  const { data, error } = await getResend().emails.send({
    from: SENDER,
    to: [args.to],
    replyTo: REPLY_TO,
    subject: args.subject,
    text: args.text,
    html: args.html,
    headers,
    ...(args.scheduledAt ? { scheduledAt: args.scheduledAt } : {}),
  });
  if (error) return { id: null, error: error.message || 'Resend error' };
  return { id: data?.id || null, error: null };
}

/** Cancel emails that Resend has scheduled but not sent yet (e.g. the lead just replied). */
export async function cancelScheduledEmails(ids: string[]): Promise<number> {
  let cancelled = 0;
  for (const id of ids) {
    const { error } = await getResend().emails.cancel(id);
    if (!error) cancelled++;
  }
  return cancelled;
}
