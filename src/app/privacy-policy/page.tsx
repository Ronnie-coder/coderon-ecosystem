// CORRECTED: src/app/privacy-policy/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Coderon",
  description: "Coderon's Privacy Policy explains how we collect, use, and protect your data in compliance with South Africa's POPIA.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 19, 2025";

  return (
    <main className="l-legal-page">
      <div className="l-legal-page__container">
        <h1>Privacy Policy</h1>
        <p><strong>Last Updated:</strong> {lastUpdated}</p>
        <p>Coderon (Pty) Ltd (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you visit coderon.co.za (the &quot;Site&quot;), in compliance with South Africa&apos;s Protection of Personal Information Act (POPIA).</p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect information you voluntarily provide to us, such as your name, email address, and project details when you use our contact form. We also collect anonymous data (e.g., IP address, browser type) via standard server logs and analytics tools to improve our Site.</p>
        
        <h2>2. How We Use Your Information</h2>
        <p>Your information is used solely to:</p>
        <ul>
          <li>Respond to your inquiries and service requests.</li>
          <li>Analyze website usage to enhance user experience.</li>
          <li>Maintain the security and integrity of our Site.</li>
        </ul>

        <h2>3. Data Sharing and Disclosure</h2>
        <p>We do not sell your personal information. We may share it with trusted third-party service providers (like our email service, Resend) only as necessary to deliver our services. These parties are contractually obligated to keep your information confidential.</p>

        <h2>4. Data Security</h2>
        <p>We implement appropriate technical measures to protect your data. However, no system is 100% secure, and we cannot guarantee absolute security.</p>
        
        <h2>5. Your Rights Under POPIA</h2>
        <p>You have the right to access, correct, or request the deletion of your personal data held by us. To exercise these rights, please contact our Information Officer at the address below.</p>
        
        <h2>6. Contact Us</h2>
        <p>For any questions regarding this policy, please contact us:</p>
        <ul>
            <li><strong>Email:</strong> <a href="mailto:info@coderon.co.za">info@coderon.co.za</a></li>
            <li><strong>Phone:</strong> <a href="tel:+27678184898">+27 67 818 4898</a></li>
        </ul>
      </div>
    </main>
  );
}