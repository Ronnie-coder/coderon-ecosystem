import type { Metadata } from "next";
import Link from "next/link";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { HoursArea } from "@/components/sections/HoursArea";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RentalBand } from "@/components/sections/RentalBand";
import { Reviews } from "@/components/sections/Reviews";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { VehicleCards } from "@/components/sections/VehicleCards";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/lib/business";
import { homeFaqs } from "@/lib/content/faqs";
import { serviceDetails } from "@/lib/content/services";
import { getPhoto, type PhotoKey } from "@/lib/photos";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Motorcycle Repairs Bloemfontein | Mobile Mechanic | H A Motors" },
  description:
    "Mobile motorcycle, scooter and quad bike repairs anywhere in Bloemfontein. All brands, call-outs, open weekends, weekdays by appointment. Delivery scooter rental R550/week. WhatsApp for a quote.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "H A Motors | Mobile Bike Mechanic in Bloemfontein" },
};

const xp = business.experience;

const featuredWork: PhotoKey[] = [
  "carburettor-rebuild",
  "motorcycle-wiring-repair",
  "cylinder-head-removed",
  "scooter-stripped",
  "scooter-reassembly",
  "quad-front-teardown",
  "piston-new-gasket",
  "honda-delivery-bike-teardown",
];

export default function HomePage() {
  const gallery = featuredWork.map(getPhoto);
  const topFaqs = homeFaqs.slice(0, 5);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-paper pb-16 sm:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 hidden h-full w-[38%] bg-muted lg:block" />
          <div data-parallax="0.2" className="stripe-bg absolute top-24 -right-32 hidden h-80 w-[34rem] -rotate-12 opacity-20 lg:block" />
          <div data-parallax="-0.12" className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-brand-yellow/15 blur-3xl" />
        </div>
        <Container className="relative grid items-center gap-12 pt-10 sm:pt-14 lg:grid-cols-[1.15fr_1fr] lg:pt-16">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-3 py-1 text-sm font-bold text-ink uppercase">
              <Icon name="van" className="h-4 w-4" /> Mobile mechanic · {business.area.city}
            </p>
            <h1 className="text-[2.6rem] font-extrabold uppercase sm:text-6xl lg:text-[4.1rem]">
              Mobile Motorcycle, Scooter &amp; Quad Repairs in{" "}
              <span className="road-underline text-brand-green-dark">Bloemfontein</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg sm:text-xl">All brands. We come to you anywhere in Bloem. Get a quote on WhatsApp.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WhatsAppButton tone="yellow" className="text-lg">Get a Quote on WhatsApp</WhatsAppButton>
              <ButtonLink href={routes.rental} tone="greenOutline" className="text-lg">
                Rent a Scooter, {business.rental.priceDisplay}/week
              </ButtonLink>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Quick facts">
              {["All brands", "Call-outs anywhere in Bloem", "Open weekends, weekdays by appointment"].map((chip) => (
                <li key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-sm font-semibold">
                  <Icon name="check" className="h-4 w-4 text-brand-green-dark" /> {chip}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <PhotoCard photo="adrich-bmw-workshop" priority stripe sizes="(min-width: 1024px) 460px, 92vw" className="w-full" />
            <div className="float-y absolute -top-4 -right-2 rounded-2xl bg-ink px-4 py-3 text-white shadow-xl sm:-right-6">
              <p className="font-heading text-2xl leading-none font-extrabold text-brand-yellow uppercase">Since {xp.since}</p>
              <p className="text-xs text-white/80">Working on bikes</p>
            </div>
            <div className="absolute -bottom-5 -left-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-green-dark text-white">
                <Icon name="van" className="h-5 w-5" />
              </span>
              <p className="text-sm leading-tight font-semibold">
                We come to you
                <span className="block font-normal text-ink-soft">anywhere in Bloem</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <StatsStrip />

      {/* 2. Services */}
      <Section bg="paper" labelledBy="services-title">
        <SectionHeading
          id="services-title"
          eyebrow="What we fix"
          title="Repairs for every kind of bike"
          intro="Motorcycles, scooters and quad bikes, all brands. Here's what we do most."
          action={<ButtonLink href={routes.repairs} tone="greenOutline">All repairs</ButtonLink>}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceDetails.map((s, i) => (
            <li key={s.key} data-reveal data-reveal-delay={i * 80}>
              <Link
                href={`${routes.repairs}#${s.key}`}
                className="lift group flex h-full flex-col rounded-2xl border-2 border-ink/10 bg-white p-5 hover:border-brand-green-dark"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-yellow text-ink transition-transform group-hover:-rotate-6">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-2xl font-bold uppercase">{s.title}</h3>
                <p className="mt-1 flex-1 text-ink-soft">{s.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-green-dark">
                  Learn more <Icon name="chevronRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <VehicleCards />
        </div>
      </Section>

      {/* 3. We come to you */}
      <section aria-labelledby="callout-title" className="relative overflow-hidden bg-brand-yellow py-14 text-ink">
        <div aria-hidden="true" data-parallax="0.15" className="absolute -top-10 right-10 h-40 w-40 rounded-full border-[18px] border-ink/10" />
        <Container className="relative grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
          <span data-reveal="zoom" className="hidden h-20 w-20 place-items-center rounded-2xl bg-ink text-brand-yellow md:grid">
            <Icon name="van" className="h-10 w-10" />
          </span>
          <div data-reveal>
            <h2 id="callout-title" className="text-4xl font-extrabold uppercase sm:text-5xl">We come to you</h2>
            <p className="mt-2 max-w-2xl text-lg">
              Breakdown at home, at work or on a delivery shift? {business.owner} comes to you anywhere in {business.area.city}.
              The call-out fee depends on distance and is included in your quote.
            </p>
          </div>
          <WhatsAppButton tone="ink" className="text-lg">Get a Quote</WhatsAppButton>
        </Container>
      </section>

      {/* 4. Rental band */}
      <RentalBand />

      {/* 5. How it works */}
      <HowItWorks />

      <BrandMarquee />

      {/* 6. Recent work */}
      <Section bg="paper" id="gallery" labelledBy="gallery-title">
        <SectionHeading
          id="gallery-title"
          eyebrow="Recent work"
          title="Real bikes, real repairs"
          intro="Every photo is from an actual job. Tap a photo to see it bigger."
          action={<ButtonLink href={routes.gallery} tone="greenOutline">See the full gallery</ButtonLink>}
        />
        <div className="mt-8">
          <GalleryGrid photos={gallery} />
        </div>
      </Section>

      <Reviews />

      {/* 7. About teaser */}
      <Section bg="muted" id="about" labelledBy="about-title">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <div data-reveal="left">
            <PhotoCard photo="adrich-kawasaki-ninja" stripe sizes="(min-width: 768px) 420px, 92vw" className="mx-auto w-full max-w-sm" />
          </div>
          <div>
            <SectionHeading id="about-title" eyebrow={`About · Since ${xp.since}`} title={`Meet ${business.owner}`} />
            <p data-reveal className="mt-4 text-lg">{business.about[0]}</p>
            <p data-reveal className="mt-4 text-lg">{business.about[1]}</p>
            <div data-reveal className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={routes.about} tone="ink">More about Adrich</ButtonLink>
              <WhatsAppButton tone="green">WhatsApp {business.owner}</WhatsAppButton>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Hours and service area */}
      <HoursArea bg="paper" />

      {/* 9. FAQ */}
      <Faq faqs={topFaqs} bg="muted" />
      <div className="-mt-8 bg-muted pb-14 text-center">
        <ButtonLink href={routes.faq} tone="greenOutline">See all questions</ButtonLink>
      </div>

      {/* 10. Final CTA */}
      <CtaBand />
    </>
  );
}
