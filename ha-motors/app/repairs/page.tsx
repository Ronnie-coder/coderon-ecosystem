import type { Metadata } from "next";
import Link from "next/link";
import { CallOutExplainer } from "@/components/sections/CallOutExplainer";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PageHero } from "@/components/sections/PageHero";
import { VehicleCards } from "@/components/sections/VehicleCards";
import { CallButton, WhatsAppButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/lib/business";
import { homeFaqs } from "@/lib/content/faqs";
import { serviceDetails } from "@/lib/content/services";
import { serviceSchema } from "@/lib/schema";
import { routes } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: { absolute: "Bike Repairs Bloemfontein | Motorcycle, Scooter & Quad | H A Motors" },
  description:
    "Mobile bike repairs in Bloemfontein: services, electrical faults, engine and carburettor repairs, and tyres for motorcycles, scooters and quads. All brands. We come to you.",
  alternates: { canonical: routes.repairs },
  openGraph: { url: routes.repairs, title: "Bike Repairs in Bloemfontein | H A Motors" },
};

const repairFaqs = homeFaqs.filter((f) => !/rent|scooters insured|R550/i.test(f.q));

export default function RepairsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Repairs", path: routes.repairs }]}
        eyebrow="Mobile mechanic · Bloemfontein"
        title={
          <>
            Bike repairs in <span className="text-brand-yellow">Bloemfontein</span>, done where you are
          </>
        }
        intro={
          <p>
            Motorcycles, scooters and quad bikes, all brands. Services, electrical faults, engine work and tyres.{" "}
            {business.owner} comes to you, and the call-out fee is in your quote upfront.
          </p>
        }
        actions={
          <>
            <WhatsAppButton tone="yellow" className="text-lg">Get a Quote on WhatsApp</WhatsAppButton>
            <CallButton tone="whiteOutline" />
          </>
        }
        photo="cylinder-head-removed"
      />

      <Section bg="paper" labelledBy="vehicles-title">
        <SectionHeading
          id="vehicles-title"
          eyebrow="Step 1"
          title="What do you ride?"
          intro="Pick your vehicle to see common problems, what a service covers and photos of real jobs."
        />
        <div className="mt-10">
          <VehicleCards />
        </div>
      </Section>

      <Section bg="muted" labelledBy="services-title">
        <SectionHeading
          id="services-title"
          eyebrow="What we fix"
          title="Four things we do really well"
          intro="No jargon, no guessing. Here's what each job covers and the signs your bike needs it."
        />
        <ul className="mt-10 grid gap-5 lg:grid-cols-2">
          {serviceDetails.map((s, i) => (
            <li key={s.key} id={s.key} data-reveal data-reveal-delay={(i % 2) * 100} className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-yellow text-ink">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-2xl font-extrabold uppercase sm:text-3xl">{s.title}</h3>
                  <p className="mt-1 text-ink-soft">{s.summary}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-brand-green-dark uppercase">What it covers</h4>
                  <ul className="mt-2 space-y-1.5">
                    {s.covers.map((c) => (
                      <li key={c} className="flex gap-2">
                        <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand-green-dark" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-ink-soft uppercase">Signs you need it</h4>
                  <ul className="mt-2 space-y-1.5">
                    {s.signs.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-3 shrink-0 -skew-x-12 bg-brand-yellow" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-8 rounded-2xl border-l-4 border-brand-yellow bg-white p-5 text-ink-soft">
          <strong className="text-ink">Good to know:</strong> we fix bikes, we don&apos;t sell them or sell parts. If your repair
          needs parts, we explain exactly what&apos;s needed in your quote before any work starts.
        </p>
      </Section>

      <section aria-labelledby="dead-title" className="on-dark relative overflow-hidden bg-brand-green-dark py-16 text-white sm:py-20">
        <div aria-hidden="true" data-parallax="0.12" className="stripe-bg absolute -right-24 -bottom-20 h-56 w-[30rem] -rotate-6 opacity-30" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr]">
          <div data-reveal="left">
            <p className="mb-3 text-sm font-bold tracking-[0.14em] text-brand-yellow uppercase">Adrich&apos;s favourite job</p>
            <h2 id="dead-title" className="text-4xl font-extrabold uppercase sm:text-5xl">
              Dead bike? Let&apos;s bring it back to life.
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Been standing for months? Someone said it&apos;s not worth fixing? Getting dead bikes running again is what Adrich
              enjoys most. Send a photo and we&apos;ll tell you what it&apos;s likely to need before you spend a cent.
            </p>
            <WhatsAppButton tone="yellow" className="mt-6">Send a photo on WhatsApp</WhatsAppButton>
          </div>
          <div data-reveal="right" className="grid grid-cols-2 gap-3">
            <PhotoCard photo="scooter-stripped" aspect="3/4" caption sizes="(min-width: 768px) 220px, 45vw" />
            <PhotoCard photo="scooter-reassembly" aspect="3/4" caption sizes="(min-width: 768px) 220px, 45vw" className="mt-8" />
          </div>
        </div>
      </section>

      <HowItWorks />

      <Section bg="muted" labelledBy="callout-title">
        <SectionHeading id="callout-title" eyebrow="Call-out or drop-off" title="Your choice, your convenience" />
        <div className="mt-8">
          <CallOutExplainer />
        </div>
        <p data-reveal className="mt-8 text-center text-ink-soft">
          Need wheels while yours is being fixed?{" "}
          <Link href={routes.rental} className="font-semibold text-brand-green-dark underline underline-offset-2">
            Rent a scooter for {business.rental.priceDisplay} a week
          </Link>
          .
        </p>
      </Section>

      <Faq faqs={repairFaqs} title="Repair questions" />
      <CtaBand />
      <JsonLd data={serviceSchema({ name: "Motorcycle, scooter and quad bike repairs", path: routes.repairs, description: "Mobile repairs in Bloemfontein: services, electrical fault finding, engine and carburettor repairs, and tyres. All brands." })} />
    </>
  );
}
