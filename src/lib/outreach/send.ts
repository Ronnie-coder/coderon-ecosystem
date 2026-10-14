import { Resend } from 'resend';
import { REPLY_TO, SENDER } from './config';

const resend = new Resend(process.env.RESEND_OUTREACH_API_KEY);

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
}): Promise<{ id: string | null; error: string | null }> {
  const headers: Record<string, string> = {
    'Message-ID': args.messageId,
    'List-Unsubscribe': `<mailto:${REPLY_TO}?subject=unsubscribe>`,
  };
  if (args.inReplyTo) {
    headers['In-Reply-To'] = args.inReplyTo;
    headers['References'] = args.inReplyTo;
  }
  const { data, error } = await resend.emails.send({
    from: SENDER,
    to: [args.to],
    reply_to: REPLY_TO,
    subject: args.subject,
    text: args.text,
    html: args.html,
    headers,
  });
  if (error) return { id: null, error: error.message || 'Resend error' };
  return { id: data?.id || null, error: null };
}
