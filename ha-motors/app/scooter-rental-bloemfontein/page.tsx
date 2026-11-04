import type { Metadata } from "next";
import Link from "next/link";
import { RentalForm } from "@/components/forms/RentalForm";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { OtherServices } from "@/components/sections/OtherServices";
import { CallButton, WhatsAppButton } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Container, Eyebrow, H2, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/lib/business";
import { rentalFaqs } from "@/lib/content/faqs";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Scooter Rental Bloemfontein | R550/Week | H A Motors" },
  description:
    "Delivery scooter rental in Bloemfontein: SYM Jet 14 200 for R550 per week. Maintenance and servicing included, insured. Only 3 scooters, enquire early.",
  alternates: { canonical: routes.rental },
  openGraph: { url: routes.rental, title: "Scooter Rental in Bloemfontein: R550 per Week | H A Motors" },
};

const reqIcons: IconName[] = ["idcard", "licence", "home"];

export default function ScooterRentalPage() {
  const r = business.rental;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Scooter rental", path: routes.rental }]}
        eyebrow="Delivery riders and commuters"
        title={
          <>
            Scooter Rental in Bloemfontein: <span className="text-brand-yellow">R550 per Week</span>
          </>
        }
        intro={
          <p>
            Start earning this week. A reliable {r.model} with maintenance and servicing included, and it&apos;s insured. Made for
            food and grocery delivery riders, couriers and anyone who needs to get to work.
          </p>
        }
        actions={
          <>
            <WhatsAppButton intent="rental" tone="yellow" className="text-lg">Check Availability on WhatsApp</WhatsAppButton>
            <CallButton intent="rental" tone="whiteOutline" />
          </>
        }
        footnote={
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-2 font-bold text-ink">
            <Icon name="bolt" className="h-4 w-4" /> {r.scarcity}
          </span>
        }
        aside={
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <PhotoCard photo="sym-jet14-front" priority aspect="3/4" sizes="(min-width: 1024px) 230px, 46vw" />
            <PhotoCard photo="sym-jet14-side" aspect="3/4" sizes="(min-width: 1024px) 230px, 46vw" className="mt-8" />
          </div>
        }
      />

      <Section bg="paper" labelledBy="included-title">
        <Eyebrow>What you get</Eyebrow>
        <H2 id="included-title">{r.priceDisplay} a week, sorted</H2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-brand-green-dark p-6">
            <h3 className="flex items-center gap-2 text-2xl font-bold uppercase text-brand-green-dark">
              <Icon name="check" className="h-7 w-7" /> What&apos;s included
            </h3>
            <ul className="mt-4 space-y-3">
              {r.included.map((i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-green-dark text-white">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-ink/15 bg-muted p-6">
            <h3 className="flex items-center gap-2 text-2xl font-bold uppercase">
              <Icon name="shield" className="h-7 w-7" /> Rider&apos;s responsibility
            </h3>
            <ul className="mt-4 space-y-3">
              {r.riderResponsibility.map((i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-white">
                    <Icon name="x" className="h-4 w-4" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-soft">
              Ride it like it&apos;s yours and you only pay the weekly rate. Full details in the{" "}
              <Link href={routes.rentalTerms} className="font-semibold text-brand-green-dark underline underline-offset-2">rental terms</Link>.
            </p>
          </div>
        </div>
      </Section>

      <section aria-labelledby="steps-title" className="on-dark bg-ink py-14 text-white sm:py-20">
        <Container>
          <SectionHeading id="steps-title" eyebrow="How renting works" title="On the road in 3 steps" dark />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { t: "Enquire", d: "Send the form below or WhatsApp us. We'll tell you when a scooter is free." },
              { t: "Bring your documents", d: "Valid ID, driver's licence and proof of address. We check them in person and you sign the rental agreement." },
              { t: "Ride and earn", d: `Pay ${r.priceDisplay} a week as set out in your agreement. Servicing and maintenance are on us.` },
            ].map((step, i) => (
              <li key={step.t} data-reveal data-reveal-delay={i * 120} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <span aria-hidden="true" className="font-heading text-6xl leading-none font-extrabold text-brand-yellow italic">{i + 1}</span>
                <h3 className="mt-2 text-2xl font-bold uppercase"><span className="sr-only">Step {i + 1}: </span>{step.t}</h3>
                <p className="mt-2 text-white/85">{step.d}</p>
              </li>
            ))}
          </ol>
          <p data-reveal className="mt-8 text-center text-lg text-white/90">
            That&apos;s <strong className="text-brand-yellow">under R{Math.ceil(r.priceWeekly / 7 / 10) * 10} a day</strong> for a maintained, insured scooter.
          </p>
        </Container>
      </section>

      <Section bg="muted" labelledBy="specs-title">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>The scooter</Eyebrow>
            <H2 id="specs-title">{r.model}</H2>
            <dl className="mt-6 divide-y divide-ink/10 rounded-2xl bg-white shadow-sm">
              {r.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 px-5 py-3">
                  <dt className="font-semibold">{s.label}</dt>
                  <dd className="text-right text-ink-soft">{s.value ?? "To be confirmed"}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-ink-soft">
              Manufacturer figures. They can vary slightly between model years. The &quot;200&quot; is SYM&apos;s model name.
            </p>
          </div>
          <div>
            <Eyebrow>What you need</Eyebrow>
            <H2>Requirements</H2>
            <ul className="mt-6 space-y-3">
              {r.requirements.map((req, i) => (
                <li key={req} className="flex items-center gap-4 rounded-2xl bg-white p-4 text-lg font-semibold shadow-sm">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-yellow text-ink">
                    <Icon name={reqIcons[i] ?? "check"} className="h-6 w-6" />
                  </span>
                  {req}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-ink-soft">
              We check your documents in person when you collect. We never ask for ID numbers or document uploads online.
            </p>
          </div>
        </div>
      </Section>

      <Section bg="paper" labelledBy="delivery-title">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <PhotoCard photo="honda-delivery-bike-teardown" stripe sizes="(min-width: 768px) 420px, 92vw" className="mx-auto w-full max-w-sm" />
          <div>
            <Eyebrow>Rent from a mechanic</Eyebrow>
            <H2 id="delivery-title">We keep delivery bikes running</H2>
            <p className="mt-4 text-lg">
              {business.name} is a bike repair business first. We fix{" "}
              <Link href={routes.scooter} className="font-semibold text-brand-green-dark underline underline-offset-2">scooters</Link> and{" "}
              <Link href={routes.motorcycle} className="font-semibold text-brand-green-dark underline underline-offset-2">delivery motorcycles</Link>{" "}
              every week, so our rental scooters are looked after by the same hands. Servicing and maintenance are part of your weekly rate.
            </p>
            <p className="mt-4 text-lg">
              {business.owner} has been fixing bikes since {business.experience.since} and rides a {business.experience.rides} too, so
              you&apos;re renting from someone who knows these scooters inside out.
            </p>
          </div>
        </div>
      </Section>

      <section id="enquire" aria-labelledby="enquire-title" className="scroll-mt-20 bg-muted py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>Enquire</Eyebrow>
            <h2 id="enquire-title" className="text-4xl font-extrabold uppercase sm:text-5xl">Check availability</h2>
            <p className="mt-4 text-lg">{r.scarcity} Send your details and we&apos;ll let you know when a scooter is free.</p>
            <p className="mt-4 text-ink-soft">
              By renting, you agree to our{" "}
              <Link href={routes.rentalTerms} className="font-semibold text-brand-green-dark underline underline-offset-2">rental terms</Link>
              . The signed rental agreement is what counts.
            </p>
            <WhatsAppButton intent="rental" tone="green" className="mt-5">Rather WhatsApp us</WhatsAppButton>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <RentalForm />
          </div>
        </Container>
      </section>

      <Faq faqs={rentalFaqs} title="Scooter rental questions" />
      <OtherServices current={routes.rental} />
      <CtaBand
        intent="rental"
        title="Need a scooter this week? WhatsApp Adrich now."
        text={`${r.priceDisplay} per week, maintenance included, insured. ${r.scarcity}`}
      />
    </>
  );
}
