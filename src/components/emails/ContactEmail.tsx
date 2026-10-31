// src/components/emails/ContactEmail.tsx
// The email Ronnie gets for each quote request: who it is, what they need, one-tap buttons
// to answer them (their preferred way first), the details in a table and their message.
// Light, plain layout with inline styles, so it reads well in Gmail, Outlook and on phones.
import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text, Heading, Button, Link, Hr } from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  service: string;
  message: string;
  business?: string;
  website?: string;
  phone?: string;
  prefer?: string;
  plan?: string;
  receivedAt?: Date;
}

// South African numbers (0XX…) become international (27XX…) for WhatsApp and phone links.
function intlDigits(phone: string) {
  const d = phone.replace(/\D/g, '');
  if (d.startsWith('0') && d.length === 10) return `27${d.slice(1)}`;
  return d;
}

function websiteHref(site: string) {
  const url = /^https?:\/\//i.test(site) ? site : `https://${site}`;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch {
    return null;
  }
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
  name,
  email,
  service,
  message,
  business = '',
  website = '',
  phone = '',
  prefer = '',
  plan = '',
  receivedAt = new Date(),
}) => {
  const first = name.split(' ')[0];
  const digits = phone ? intlDigits(phone) : '';
  const siteHref = website ? websiteHref(website) : null;
  const when = new Intl.DateTimeFormat('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Johannesburg',
  }).format(receivedAt);
  const greeting = encodeURIComponent(`Hi ${first}, thanks for your quote request on coderon.co.za. `);

  // Answer buttons; the visitor's preferred way is first and gold.
  const actions = [
    {
      key: 'Email',
      label: 'Reply by email',
      href: `mailto:${email}?subject=${encodeURIComponent('Your Coderon quote request')}&body=${greeting}`,
    },
    digits && { key: 'WhatsApp', label: `WhatsApp ${first}`, href: `https://wa.me/${digits}?text=${greeting}` },
    digits && { key: 'Call', label: `Call ${first}`, href: `tel:+${digits}` },
  ]
    .filter((a): a is { key: string; label: string; href: string } => Boolean(a))
    .sort((a, b) => Number(b.key === prefer) - Number(a.key === prefer));

  const rows: [string, React.ReactNode][] = [
    ['Name', name],
    ['Business', business || '—'],
    ['Website', siteHref ? <Link href={siteHref} style={link}>{website}</Link> : website || '—'],
    ['Email', <Link href={`mailto:${email}`} style={link}>{email}</Link>],
    ['Phone / WhatsApp', phone ? <Link href={`tel:+${digits}`} style={link}>{phone}</Link> : '—'],
    ['Prefers', prefer || '—'],
    ['Service', service],
    ...(plan ? ([['Package', plan]] as [string, React.ReactNode][]) : []),
  ];

  return (
    <Html>
      <Head />
      <Preview>{`${name}${business ? ` (${business})` : ''} wants: ${service}. Prefers ${prefer || 'email'}.`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>CODERON</Text>
          <Section style={card}>
            <Text style={kicker}>New quote request · {when}</Text>
            <Heading style={heading}>
              {name}
              {business ? <span style={headingMuted}> · {business}</span> : null}
            </Heading>
            <Text style={badge}>{service}{plan ? ` · ${plan}` : ''}</Text>

            <Text style={label}>Answer {first}{prefer ? ` (prefers ${prefer})` : ''}</Text>
            <Section>
              {actions.map((a, i) => (
                <Button key={a.key} href={a.href} style={i === 0 ? buttonPrimary : buttonSecondary}>
                  {a.label}
                </Button>
              ))}
            </Section>

            <Hr style={hr} />

            <Text style={label}>Their message</Text>
            <Text style={messageBox}>{message}</Text>

            <Hr style={hr} />

            <Text style={label}>Details</Text>
            <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={table}>
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k}>
                    <td style={cellKey}>{k}</td>
                    <td style={cellValue}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
          <Text style={footer}>
            Sent from the quote form on coderon.co.za. Hit Reply to answer {first} by email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles: light and high-contrast, inline for email clients.
const main = { backgroundColor: '#F4F2EE', fontFamily: 'Helvetica, Arial, sans-serif', color: '#141413', margin: 0, padding: '24px 0' };
const container = { margin: '0 auto', maxWidth: '600px', padding: '0 16px' };
const brand = { fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', color: '#8A6508', margin: '0 0 12px' };
const card = { backgroundColor: '#FFFFFF', border: '1px solid #E5E2DA', borderRadius: '16px', padding: '28px' };
const kicker = { fontSize: '13px', color: '#6B6A66', margin: '0 0 6px' };
const heading = { fontSize: '26px', lineHeight: '1.2', fontWeight: 700, color: '#141413', margin: '0 0 12px' };
const headingMuted = { fontWeight: 400, color: '#6B6A66' };
const badge = {
  display: 'inline-block',
  backgroundColor: '#FDF3D0',
  color: '#5C4405',
  border: '1px solid #F2C230',
  borderRadius: '999px',
  padding: '4px 12px',
  fontSize: '14px',
  fontWeight: 600,
  margin: '0 0 22px',
};
const label = { fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#6B6A66', margin: '0 0 10px' };
const buttonBase = { display: 'inline-block', borderRadius: '999px', padding: '12px 20px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', margin: '0 8px 8px 0' };
const buttonPrimary = { ...buttonBase, backgroundColor: '#F2C230', color: '#16130E', border: '1px solid #F2C230' };
const buttonSecondary = { ...buttonBase, backgroundColor: '#FFFFFF', color: '#141413', border: '1px solid #C9C5BC' };
const hr = { borderColor: '#E5E2DA', margin: '22px 0' };
const messageBox = {
  backgroundColor: '#F8F6F1',
  border: '1px solid #E5E2DA',
  borderRadius: '12px',
  padding: '16px',
  fontSize: '16px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
  margin: 0,
};
const table = { borderCollapse: 'collapse' as const, fontSize: '15px' };
const cellKey = { padding: '8px 12px 8px 0', color: '#6B6A66', width: '38%', verticalAlign: 'top' as const, borderBottom: '1px solid #F0EEE8' };
const cellValue = { padding: '8px 0', color: '#141413', fontWeight: 600, verticalAlign: 'top' as const, borderBottom: '1px solid #F0EEE8', wordBreak: 'break-word' as const };
const link = { color: '#8A6508', textDecoration: 'underline' };
const footer = { fontSize: '12px', color: '#6B6A66', textAlign: 'center' as const, margin: '16px 0 0' };

export default ContactEmail;
