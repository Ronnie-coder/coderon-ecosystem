import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { business } from "@/lib/business";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scooter Rental Terms",
  description: "Plain-language summary of the H A Motors scooter rental terms in Bloemfontein: rate, what's included, insurance, negligence and documents.",
  alternates: { canonical: routes.rentalTerms },
};

// TODO: owner to review these rental terms.
export default function RentalTermsPage() {
  const r = business.rental;
  return (
    <LegalPage title="Rental terms" path={routes.rentalTerms} updated="31 October 2026">
      <p>
        This is a plain-language summary to help you decide. <strong>The signed rental agreement you sign when you collect the
        scooter is what governs the rental.</strong> If anything here differs from that agreement, the signed agreement wins.
      </p>

      <h2>The scooter and the rate</h2>
      <ul>
        <li>Scooter: {r.model} ({r.colour}).</li>
        <li>Rate: {r.priceDisplay} per week.</li>
        <li>We have {r.fleetSize} scooters, so availability is limited. Enquire early.</li>
      </ul>

      <h2>What&apos;s included</h2>
      <ul>
        <li>Maintenance and servicing are included in the weekly rate.</li>
        <li>The scooters are insured.</li>
      </ul>

      <h2>Rider&apos;s responsibility</h2>
      <ul>
        <li>Repairs caused by rider negligence are for the rider&apos;s account.</li>
        <li>Damage caused by rider negligence is for the rider&apos;s account.</li>
      </ul>

      <h2>Documents you need</h2>
      <ul>
        {r.requirements.map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>
      <p>
        We check these in person when you collect the scooter. We don&apos;t ask for ID numbers or document uploads on this
        website.
      </p>

      <h2>Questions</h2>
      <p>
        WhatsApp or call {business.owner} on <a href={business.phone.tel}>{business.phone.display}</a>, or email{" "}
        <a href={`mailto:${business.email}`}>{business.email}</a>. See also the{" "}
        <Link href={routes.rental}>scooter rental page</Link> and our <Link href={routes.privacy}>privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
