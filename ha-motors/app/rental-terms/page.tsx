import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { business } from "@/lib/business";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scooter Rental Terms",
  description:
    "Plain-language summary of the H A Motors scooter rental terms in Bloemfontein: R550 per week, maintenance and servicing included, insured, rider negligence, and the documents you need.",
  alternates: { canonical: routes.rentalTerms },
};

export default function RentalTermsPage() {
  const b = business;
  const r = b.rental;
  return (
    <LegalPage title="Rental terms" path={routes.rentalTerms} updated="4 November 2026">
      <p>
        This page explains our scooter rentals in plain language so you know what to expect before you enquire.{" "}
        <strong>
          When you rent, you sign a written rental agreement with {b.name}. That signed agreement is what governs your
          rental.
        </strong>{" "}
        If anything on this page differs from the signed agreement, the signed agreement applies.
      </p>

      <h2>1. The scooter and the rate</h2>
      <ul>
        <li>Scooter: {r.model} ({r.colour}).</li>
        <li>
          Rate: <strong>{r.priceDisplay} per week</strong>.
        </li>
        <li>
          We have {r.fleetSize} scooters, so availability is limited and works on a first-come basis. Enquiring doesn&apos;t
          reserve a scooter. It&apos;s yours once the agreement is signed.
        </li>
      </ul>

      <h2>2. What&apos;s included in the weekly rate</h2>
      <ul>
        <li>Use of the scooter for the rental period.</li>
        <li>Maintenance and servicing, done by {b.owner}.</li>
        <li>Insurance. The scooters are insured.</li>
      </ul>

      <h2>3. The rider&apos;s responsibility</h2>
      <ul>
        <li>
          <strong>Damage caused by rider negligence</strong> is for the rider&apos;s account.
        </li>
        <li>
          <strong>Repairs needed because of rider negligence</strong> are for the rider&apos;s account.
        </li>
        <li>
          You must hold a valid driver&apos;s licence for the whole rental and ride within the law, like any road user.
        </li>
      </ul>
      <p>
        Ride it like it&apos;s your own, and the weekly rate is all you pay. Normal wear and tear from everyday riding is
        covered by the included maintenance and servicing.
      </p>

      <h2>4. Who can rent and what to bring</h2>
      <p>To rent a scooter you need:</p>
      <ul>
        {r.requirements.map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>
      <p>
        We check these documents <strong>in person</strong> when you collect the scooter. We never ask for ID numbers or
        document uploads on this website. How we handle your information is explained in our{" "}
        <Link href={routes.privacy}>privacy policy</Link>.
      </p>

      <h2>5. What the signed agreement covers</h2>
      <p>The agreement you sign sets out the practical details of your rental, including:</p>
      <ul>
        <li>the start date and rental period;</li>
        <li>when and how the weekly payment is made;</li>
        <li>how to report a breakdown, an accident or damage, and what happens next;</li>
        <li>when and how the scooter is serviced; and</li>
        <li>how and where the scooter is returned at the end of the rental.</li>
      </ul>
      <p>
        Read it before you sign, ask {b.owner} about anything that isn&apos;t clear, and keep a copy for yourself.
      </p>

      <h2>6. Questions</h2>
      <p>
        WhatsApp or call {b.owner} on <a href={b.phone.tel}>{b.phone.display}</a>, or email{" "}
        <a href={`mailto:${b.email}`}>{b.email}</a>. Ready to rent? Go to the{" "}
        <Link href={routes.rental}>scooter rental page</Link> to check availability.
      </p>
    </LegalPage>
  );
}
