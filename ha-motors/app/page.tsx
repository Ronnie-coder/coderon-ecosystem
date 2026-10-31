import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { HoursArea } from "@/components/sections/HoursArea";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RentalBand } from "@/components/sections/RentalBand";
import { Reviews } from "@/components/sections/Reviews";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Container, Eyebrow, H2, Section } from "@/components/ui/Section";
import { business } from "@/lib/business";
import { homeFaqs } from "@/lib/content/faqs";
import { getPhoto, workPhotoKeys, type PhotoKey } from "@/lib/photos";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Motorcycle Repairs Bloemfontein | Mobile Mechanic | H A Motors" },
  description:
    "Mobile motorcycle, scooter and quad bike repairs anywhere in Bloemfontein. All brands, call-outs, open weekends. Delivery scooter rental R550/week. WhatsApp for a quote.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "H A Motors | Mobile Bike Mechanic in Bloemfontein" },
};

const serviceIcons: Record<string, IconName> = { service: "wrench", electrical: "bolt", engine: "engine", tyres: "tyre" };

const vehicleCards: { href: string; title: string; text: string; photo: PhotoKey }[] = [
  { href: routes.motorcycle, title: "Motorcycles", text: "Commuters, delivery bikes, cruisers and big adventure bikes.", photo: "carburettor-rebuild" },
  { href: routes.scooter, title: "Scooters", text: "Won't start, cutting out or due for a service? Sorted.", photo: "honda-scooter-finished" },
  { href: routes.quad, title: "Quad bikes", text: "Sport and utility quads, brakes, winches and engines.", photo: "quad-front-teardown" },
];

const why: { icon: IconName; title: string; text: string }[] = [
  { icon: "wrench", title: "All brands", text: "Motorcycles, scooters and quads, whatever the badge." },
  { icon: "van", title: "Mobile service", text: "We come to you anywhere in Bloem." },
  { icon: "calendar", title: "Weekend hours", text: "Open Saturday and Sunday, weekdays by appointment." },
  { icon: "tag", title: "Upfront quotes", text: "Call-out included in the quote before we start." },
  { icon: "shield", title: "Insured rental fleet", text: "Rental scooters are insured and maintained." },
];

const featuredWork: PhotoKey[] = [
  "carburettor-rebuild",
  "motorcycle-wiring-repair",
  "cylinder-head-removed",
  "piston-new-gasket",
  "scooter-stripped",
  "scooter-reassembly",
  "quad-front-teardown",
  "honda-delivery-bike-teardown",
];

export default function HomePage() {
  // Featured 8 first, then the rest behind "See more".
  const galleryKeys = [...featuredWork, ...workPhotoKeys.filter((k) => !featuredWork.includes(k))];
  const gallery = galleryKeys.map(getPhoto);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div aria-hidden="true" className="absolute top-0 right-0 hidden h-full w-1/3 bg-muted lg:block" />
        <Container className="relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.15fr_1fr] lg:py-20">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-3 py-1 text-sm font-bold text-ink uppercase">
              <Icon name="van" className="h-4 w-4" /> Mobile mechanic · {business.area.city}
            </p>
            <h1 className="text-[2.6rem] font-extrabold uppercase sm:text-6xl lg:text-7xl">
              Mobile Motorcycle, Scooter &amp; Quad Repairs in <span className="text-brand-green-dark">Bloemfontein</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg sm:text-xl">
              All brands. We come to you anywhere in Bloem. Get a quote on WhatsApp.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WhatsAppButton tone="yellow" className="text-lg">Get a Quote on WhatsApp</WhatsAppButton>
              <ButtonLink href={routes.rental} tone="greenOutline" className="text-lg">
                Rent a Scooter, {business.rental.priceDisplay}/week
              </ButtonLink>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Why riders call us">
              {["All brands", "Call-outs anywhere in Bloem", "Open weekends"].map((chip) => (
                <li key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-sm font-semibold">
                  <Icon name="check" className="h-4 w-4 text-brand-green-dark" /> {chip}
                </li>
              ))}
            </ul>
          </div>
          <PhotoCard
            photo="adrich-bmw-workshop"
            priority
            stripe
            sizes="(min-width: 1024px) 460px, 92vw"
            className="mx-auto w-full max-w-md lg:max-w-none"
          />
        </Container>
        <div aria-hidden="true" className="stripe-bar" />
      </section>

      {/* 2. Services */}
      <Section bg="paper" labelledBy="services-title">
        <Eyebrow>What we fix</Eyebrow>
        <H2 id="services-title">Repairs for every kind of bike</H2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {business.repairs.services.map((s) => (
            <li key={s.key} className="rounded-2xl border-2 border-ink/10 p-5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-yellow text-ink">
                <Icon name={serviceIcons[s.key] ?? "wrench"} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-2xl font-bold uppercase">{s.short}</h3>
              <p className="mt-1 text-ink-soft">{s.blurb}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {vehicleCards.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group block rounded-[var(--radius-photo)] bg-muted p-3 transition-shadow hover:shadow-lg">
                <PhotoCard photo={c.photo} aspect="4/3" sizes="(min-width: 768px) 340px, 92vw" />
                <div className="px-2 pt-4 pb-2">
                  <h3 className="text-3xl font-extrabold uppercase">{c.title}</h3>
                  <p className="mt-1 text-ink-soft">{c.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-bold text-brand-green-dark">
                    Get a Quote <Icon name="chevronRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. We come to you */}
      <section aria-labelledby="callout-title" className="bg-brand-yellow py-14 text-ink">
        <Container className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
          <span className="hidden h-20 w-20 place-items-center rounded-2xl bg-ink text-brand-yellow md:grid">
            <Icon name="van" className="h-10 w-10" />
          </span>
          <div>
            <h2 id="callout-title" className="text-4xl font-extrabold uppercase sm:text-5xl">We come to you</h2>
            <p className="mt-2 max-w-2xl text-lg">
              Breakdown at home, at work or on a delivery shift? {business.owner} comes to you anywhere in {business.area.city}. The
              call-out fee depends on distance and is included in your quote.
            </p>
          </div>
          <WhatsAppButton tone="ink" className="text-lg">Get a Quote</WhatsAppButton>
        </Container>
      </section>

      {/* 4. Rental band */}
      <RentalBand />

      {/* 5. How it works */}
      <HowItWorks />

      {/* 6. Why H A Motors */}
      <Section bg="muted" labelledBy="why-title">
        <Eyebrow>Why H A Motors</Eyebrow>
        <H2 id="why-title">A mechanic you can just WhatsApp</H2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {why.map((w) => (
            <li key={w.title} className="rounded-2xl bg-white p-5 shadow-sm">
              <Icon name={w.icon} className="h-8 w-8 text-brand-green-dark" />
              <h3 className="mt-3 text-xl font-bold uppercase">{w.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Recent work gallery */}
      <Section bg="paper" id="gallery" labelledBy="gallery-title">
        <Eyebrow>Recent work</Eyebrow>
        <H2 id="gallery-title">Real bikes, real repairs</H2>
        <p className="mt-3 max-w-2xl text-ink-soft">Every photo is from an actual job. Tap a photo to see it bigger.</p>
        <div className="mt-8">
          <GalleryGrid photos={gallery} initial={8} />
        </div>
      </Section>

      <Reviews />

      {/* 8. About Adrich */}
      <Section bg="muted" id="about" labelledBy="about-title">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <PhotoCard photo="adrich-kawasaki-ninja" stripe sizes="(min-width: 768px) 420px, 92vw" className="mx-auto w-full max-w-sm" />
          <div>
            <Eyebrow>About</Eyebrow>
            <H2 id="about-title">Meet {business.owner}</H2>
            <div className="mt-4 space-y-4 text-lg">
              {business.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <WhatsAppButton tone="green" className="mt-6">WhatsApp {business.owner}</WhatsAppButton>
          </div>
        </div>
      </Section>

      {/* 9. Hours and service area */}
      <HoursArea bg="paper" />

      {/* 10. FAQ */}
      <Faq faqs={homeFaqs} bg="muted" />

      {/* 11. Final CTA */}
      <CtaBand />
    </>
  );
}
