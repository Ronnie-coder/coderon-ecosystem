// src/app/terms-of-service/page.tsx
import { Metadata } from 'next';
import Link from 'next/link'; // Import Link for mailto and tel links

export const metadata: Metadata = {
  title: "Terms of Service | Coderon",
  description: "The terms and conditions for using the Coderon website and its services.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "November 19, 2025"; // Updated to a realistic date


  return (
    <main className="l-legal-page">
      <div className="l-legal-page__container">
        <h1>Terms of Service</h1>
        <p><strong>Last Updated:</strong> {lastUpdated}</p>
        
        <h2>1. Agreement to Terms</h2>
        <p>By accessing our website, coderon.co.za (the "Site"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.</p>
        
        <h2>2. Intellectual Property</h2>
        <p>The Site and its original content, features, and functionality are the exclusive property of Coderon (Pty) Ltd and are protected by copyright and trademark laws. Our content may not be used in connection with any product or service without our prior written consent.</p>
        
        <h2>3. Limitation of Liability</h2>
        <p>The Site is provided on an "as is" basis. Coderon will not be liable for any damages of any kind arising from the use of this site. Your use of the Site is at your sole risk.</p>

        <h2>4. Governing Law</h2>
        <p>These Terms shall be governed by the laws of the Republic of South Africa, without regard to its conflict of law provisions.</p>
        
        {/* --- REFINED: Contact Information --- */}
        <h2>5. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:info@coderon.co.za">info@coderon.co.za</a></li>
          <li><strong>Phone:</strong> <a href="tel:+27678184898">+27 67 818 4898</a></li>
        </ul>
      </div>
    </main>
  );
}