// CORRECTED: src/components/emails/ContactEmail.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Heading, Text, Section, Hr } from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  service: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({ name, email, service, message }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Project Inquiry from Coderon Website</Heading>
        <Text style={paragraph}>You&apos;ve received a new message from your contact form.</Text>
        <Hr style={hr} />
        <Section>
          <Text><strong>From:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          <Text><strong>Service of Interest:</strong> {service}</Text>
        </Section>
        <Hr style={hr} />
        <Heading as="h2" style={subHeading}>Message:</Heading>
        <Text style={messageBox}>{message}</Text>
        <Hr style={hr} />
        <Text style={footer}>This email was sent from the Coderon website contact form.</Text>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = { backgroundColor: '#111111', fontFamily: 'Arial, sans-serif', color: '#F0F0F0' };
const container = { margin: '0 auto', padding: '20px', backgroundColor: '#1A1A1A', border: '1px solid #333333', borderRadius: '8px' };
const heading = { fontSize: '24px', color: '#D4AF37' };
const subHeading = { fontSize: '20px', color: '#D4AF37' };
const paragraph = { fontSize: '16px', color: '#A0A0A0' };
const messageBox = { padding: '15px', backgroundColor: '#111111', borderRadius: '4px', border: '1px solid #333333', fontSize: '16px', lineHeight: '1.5' };
const hr = { borderColor: '#333333', margin: '20px 0' };
const footer = { color: '#A0A0A0', fontSize: '12px' };

export default ContactEmail;