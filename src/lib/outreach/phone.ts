// Reads the phone number the hunter saved in lead.notes ("Phone: <number> | Rating: ...")
// and says whether it's a South African cellphone (WhatsApp likely) or a landline.
// Display only: nothing is ever sent from here.

export type PhoneInfo = {
  raw: string; // as saved, e.g. "011 403 3835"
  kind: 'mobile' | 'landline';
  label: 'WhatsApp likely' | 'Call only';
  intl: string; // 27XXXXXXXXX, for wa.me links
};

/** The phone text from the notes, or null when missing or "N/A". */
export function phoneFromNotes(notes: string | null | undefined): string | null {
  const m = notes?.match(/Phone:\s*([^|]+)/i);
  const raw = m?.[1].trim();
  return raw && !/^n\/?a$/i.test(raw) ? raw : null;
}

/**
 * South African numbers only. People keep their number when they change networks, so
 * the prefix says "likely", not "certainly".
 * - Cellphones: 06x, 07x, 081-084
 * - Landlines: 01x-05x (geographic area codes)
 * - Not labelled: 080 toll-free, 086 share-call/fax, 087 internet (VoIP), and anything else
 */
export function classifyPhone(raw: string | null | undefined): PhoneInfo | null {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0027')) digits = digits.slice(2);
  if (digits.startsWith('27') && digits.length === 11) digits = `0${digits.slice(2)}`;
  if (!/^0\d{9}$/.test(digits)) return null; // not a 10-digit South African number

  const intl = `27${digits.slice(1)}`;
  if (/^0[67]/.test(digits) || /^08[1-4]/.test(digits)) {
    return { raw, kind: 'mobile', label: 'WhatsApp likely', intl };
  }
  if (/^0[1-5]/.test(digits)) {
    return { raw, kind: 'landline', label: 'Call only', intl };
  }
  return null;
}

// The button only shows after a lead has replied, so this thanks them instead of pitching.
export const WHATSAPP_INTRO =
  "Hi, it's Ronnie from Coderon. Thanks for getting back to me about your website. I'll send the free report shortly. Is this the best number to reach you on?";

/** wa.me link with the intro pre-filled. It only opens WhatsApp; you press send yourself. */
export function whatsappLink(intl: string, text = WHATSAPP_INTRO): string {
  return `https://wa.me/${intl}?text=${encodeURIComponent(text)}`;
}
