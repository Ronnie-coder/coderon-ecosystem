import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { business } from "@/lib/business";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy (POPIA)",
  description:
    "How H A Motors in Bloemfontein collects, uses, shares and protects your personal information under the Protection of Personal Information Act (POPIA).",
  alternates: { canonical: routes.privacy },
};

export default function PrivacyPolicyPage() {
  const b = business;
  return (
    <LegalPage title="Privacy policy" path={routes.privacy} updated="4 November 2026">
      <p>
        {b.name} respects your privacy. This policy explains what personal information we collect, why we collect it, who
        we share it with, how long we keep it, and your rights under the Protection of Personal Information Act 4 of 2013
        (POPIA). It applies to this website and to enquiries you send us by form, WhatsApp, phone or email.
      </p>

      <h2>1. Who we are</h2>
      <p>
        {b.name} is a mobile motorcycle, scooter and quad bike repair business that also rents out scooters, serving{" "}
        {b.area.city}, {b.area.region}, {b.area.countryName}. We are the <strong>responsible party</strong> for your
        personal information.
      </p>
      <ul>
        <li><strong>Information Officer:</strong> {b.owner} (owner)</li>
        <li>Phone / WhatsApp: <a href={b.phone.tel}>{b.phone.display}</a></li>
        <li>Email: <a href={`mailto:${b.email}`}>{b.email}</a></li>
      </ul>

      <h2>2. What we collect</h2>
      <h3>Repair quote form</h3>
      <p>
        Your name, phone number, vehicle type, make and model, a description of the problem, your suburb in{" "}
        {b.area.city}, and whether you want a call-out or a drop-off.
      </p>
      <h3>Scooter rental enquiry form</h3>
      <p>
        Your name, WhatsApp number, preferred start date, what you&apos;ll use the scooter for, and whether you have a valid
        driver&apos;s licence. We do <strong>not</strong> ask for ID numbers or document uploads on this website.
      </p>
      <h3>When you rent a scooter</h3>
      <p>
        We check your ID, driver&apos;s licence and proof of address <strong>in person</strong> when you collect the scooter.
        Any details recorded for the signed rental agreement are kept only for that agreement and for as long as the law
        requires.
      </p>
      <h3>When you contact us directly</h3>
      <p>
        If you WhatsApp, call or email us, we receive what you choose to send, such as your number, messages, voice notes
        and photos of your bike.
      </p>
      <h3>Technical information</h3>
      <p>
        Our hosting provider automatically processes basic technical data (such as your IP address and browser type) to
        deliver and secure the website. If you accept analytics cookies, Google Analytics collects information about how
        you use the site. See the <Link href={routes.cookies}>cookie policy</Link>.
      </p>

      <h2>3. Why we use it</h2>
      <ul>
        <li>To answer your enquiry and give you a quote, including the call-out fee.</li>
        <li>To arrange and carry out a repair, a call-out or a drop-off.</li>
        <li>To check that you qualify to rent a scooter, and to conclude and manage the rental agreement.</li>
        <li>To deal with insurance, damage or legal matters connected to a rental or repair, if they arise.</li>
        <li>To keep the website working and secure and, only with your consent, to understand how it&apos;s used.</li>
      </ul>
      <p>
        We process your information because you consented (the consent box on our forms), because it&apos;s needed to give
        you a quote or to conclude and perform an agreement with you, because the law requires it, or for our legitimate
        interest in running and protecting the business. You can withdraw consent at any time (see section 9).
      </p>

      <h2>4. Who we share it with</h2>
      <p>We <strong>never sell</strong>, rent or trade your personal information. We only share it where needed:</p>
      <ul>
        <li>
          <strong>Web3Forms</strong>, a third-party form service. When you send a form, Web3Forms passes it to our email
          inbox. It processes your submission only to deliver it.
        </li>
        <li><strong>Google</strong>, which provides our email (Gmail) and, only if you accept analytics cookies, Google Analytics.</li>
        <li><strong>Netlify</strong>, which hosts this website.</li>
        <li><strong>WhatsApp (Meta)</strong>, if you choose to contact us on WhatsApp.</li>
        <li>Our <strong>insurer</strong>, only if there is an insurance claim connected to a rental scooter.</li>
        <li>Authorities such as the police or a court, only when the law requires it.</li>
      </ul>
      <p>These service providers (operators) may only use your information for the service they provide to us.</p>

      <h2>5. Information sent outside South Africa</h2>
      <p>
        Some of the providers above store or process data outside South Africa (for example in the United States or the
        European Union). We only use well-established providers that are bound by data-protection laws or agreements that
        give your information a level of protection similar to POPIA.
      </p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li><strong>Enquiries that don&apos;t go ahead:</strong> deleted within 12 months.</li>
        <li>
          <strong>Repair and rental records:</strong> kept for as long as needed for the job or agreement, any warranty,
          insurance or dispute, and the record-keeping periods the law requires (for example tax records). Then deleted.
        </li>
      </ul>

      <h2>7. How we protect it</h2>
      <p>
        We take reasonable technical and organisational steps to keep your information safe. These include
        password-protected accounts, access limited to {b.owner}, encrypted (HTTPS) connections on this website, and no
        sensitive documents collected online. If we ever have reason to believe your information has been accessed without
        permission, we will tell you and the Information Regulator as POPIA requires.
      </p>

      <h2>8. Marketing</h2>
      <p>
        We don&apos;t send marketing messages or newsletters, and we don&apos;t add you to mailing lists. We only contact
        you about your enquiry, repair or rental.
      </p>

      <h2>9. Your rights</h2>
      <p>Under POPIA you may ask us, free of charge, to:</p>
      <ul>
        <li>confirm whether we hold personal information about you, and give you a copy (access);</li>
        <li>correct information that is wrong, incomplete or out of date (correction);</li>
        <li>delete information we no longer need or are not allowed to keep (deletion);</li>
        <li>stop using your information, or withdraw a consent you gave (objection and withdrawal).</li>
      </ul>
      <p>
        Send your request to {b.owner} by WhatsApp, phone or email using the details in section 1. We may ask you to confirm
        who you are before acting on it, and we&apos;ll respond within a reasonable time.
      </p>

      <h2>10. Children</h2>
      <p>
        Our repairs and rentals are for adults. Renting a scooter requires a valid driver&apos;s licence. We don&apos;t
        knowingly collect information from children through this website.
      </p>

      <h2>11. Cookies</h2>
      <p>
        We use one strictly necessary cookie to remember your cookie choice. Analytics cookies are only used if you accept
        them, and marketing cookies are not used. Details are in the <Link href={routes.cookies}>cookie policy</Link>, and
        you can change your choice any time with &quot;Cookie settings&quot; in the footer.
      </p>

      <h2>12. Complaints</h2>
      <p>
        If you&apos;re unhappy with how we handle your information, please tell us first so we can put it right. You also have
        the right to lodge a complaint with the <strong>Information Regulator (South Africa)</strong>:{" "}
        <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>.
      </p>

      <h2>13. Changes to this policy</h2>
      <p>
        We may update this policy when our services or the law change. The date at the top shows the latest version. If the
        changes affect how we use cookies, we&apos;ll ask for your cookie choice again.
      </p>
    </LegalPage>
  );
}
