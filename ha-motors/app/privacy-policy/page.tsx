import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { business } from "@/lib/business";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy (POPIA)",
  description: "How H A Motors collects, uses and protects your personal information under POPIA.",
  alternates: { canonical: routes.privacy },
};

// TODO: owner to review this privacy policy.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy policy" path={routes.privacy} updated="31 October 2026">
      <p>
        {business.name} respects your privacy. This policy explains what personal information we collect through this website,
        why, and your rights under the Protection of Personal Information Act, 2013 (POPIA).
      </p>

      <h2>Who is responsible</h2>
      <p>
        The responsible party is {business.name}, a mobile motorcycle, scooter and quad bike mechanic and scooter rental business
        serving {business.area.city}, {business.area.region}. Contact: {business.owner}, phone{" "}
        <a href={business.phone.tel}>{business.phone.display}</a>, email <a href={`mailto:${business.email}`}>{business.email}</a>.
      </p>

      <h2>What we collect</h2>
      <p>We only collect what you type into our forms:</p>
      <ul>
        <li><strong>Repair quote form:</strong> your name, phone number, vehicle type, make and model, the problem, your suburb, and whether you want a call-out or drop-off.</li>
        <li><strong>Scooter rental form:</strong> your name, WhatsApp number, preferred start date, what you&apos;ll use the scooter for, and whether you have a valid driver&apos;s licence.</li>
      </ul>
      <p>
        We do <strong>not</strong> collect ID numbers or document uploads online. Rental documents (ID, driver&apos;s licence,
        proof of address) are checked in person. If you contact us on WhatsApp, phone or email, we receive whatever you choose to
        send us there.
      </p>

      <h2>Why we use it</h2>
      <p>
        Only to respond to your enquiry: to give you a quote, arrange a repair or call-out, or discuss a scooter rental. We contact
        you only if you tick the consent box on the form, or if you contacted us first.
      </p>

      <h2>How it reaches us</h2>
      <ul>
        <li>
          Form submissions are passed through <strong>Web3Forms</strong>, a third-party form service, which delivers them to our
          email inbox. Web3Forms processes the submission only to deliver it.
        </li>
        <li>This website is hosted on <strong>Vercel</strong>, which processes standard technical data (such as IP addresses in server logs) to serve and protect the site.</li>
        <li>Our email is provided by Google (Gmail).</li>
      </ul>
      <p>Some of these providers may store data outside South Africa, with protections required by law.</p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry details only as long as needed to deal with your enquiry and any work or rental that follows, and for any
        record-keeping the law requires. After that we delete them.
      </p>

      <h2>We never sell your information</h2>
      <p>We don&apos;t sell, rent or trade your personal information, and we don&apos;t use it for marketing lists.</p>

      <h2>Your rights</h2>
      <p>Under POPIA you can ask us to:</p>
      <ul>
        <li>tell you what personal information we hold about you (access);</li>
        <li>correct information that is wrong or out of date (correction);</li>
        <li>delete your information (deletion);</li>
        <li>stop using your information (objection).</li>
      </ul>
      <p>Contact {business.owner} using the details above and we&apos;ll respond as soon as reasonably possible.</p>

      <h2>Complaints</h2>
      <p>
        If you&apos;re unhappy with how we handle your information, please tell us first so we can fix it. You also have the right to
        complain to the <strong>Information Regulator (South Africa)</strong>:{" "}
        <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        We use one strictly necessary cookie to remember your cookie choice. Analytics cookies (Google Analytics) are only used if
        you accept them. Marketing cookies are not used. Read the <Link href={routes.cookies}>cookie policy</Link> for details.
      </p>
    </LegalPage>
  );
}
