import type { ReactNode } from "react";
import { business, type VehicleType } from "@/lib/business";
import type { Faq as FaqItem } from "@/lib/content/faqs";
import type { PhotoKey } from "@/lib/photos";
import { QuoteForm } from "../forms/QuoteForm";
import { CallButton, WhatsAppButton } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { PhotoCard } from "../ui/PhotoCard";
import { Container, Eyebrow } from "../ui/Section";
import { routes } from "@/lib/site";
import { PageHero } from "./PageHero";
import { CtaBand } from "./CtaBand";
import { Faq } from "./Faq";
import { OtherServices } from "./OtherServices";

export function ServicePage({
  vehicle,
  path,
  crumb,
  h1,
  intro,
  heroPhoto,
  children,
  faqs,
  faqTitle,
  ctaTitle,
}: {
  vehicle: VehicleType;
  path: string;
  crumb: string;
  h1: ReactNode;
  intro: string;
  heroPhoto: PhotoKey;
  children: ReactNode;
  faqs: FaqItem[];
  faqTitle: string;
  ctaTitle: string;
}) {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Repairs", path: routes.repairs }, { name: crumb, path }]}
        eyebrow="All brands · Call-outs anywhere in Bloem"
        title={h1}
        intro={<p>{intro}</p>}
        actions={
          <>
            <WhatsAppButton vehicle={vehicle} tone="yellow" className="text-lg">Get a Quote on WhatsApp</WhatsAppButton>
            <CallButton tone="whiteOutline" />
          </>
        }
        footnote={
          <span className="flex items-start gap-2">
            <Icon name="tag" className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" /> {business.callOutFee}
          </span>
        }
        photo={heroPhoto}
      />

      <section className="bg-paper py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="prose-ha max-w-3xl text-lg">{children}</div>
          <aside aria-label="Quick quote" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-ink p-6 text-white on-dark">
              <p className="font-heading text-2xl font-extrabold uppercase">Quick quote</p>
              <p className="mt-2 text-white/85">Send the make, model and problem. A photo helps.</p>
              <div className="mt-4 grid gap-2">
                <WhatsAppButton vehicle={vehicle} tone="yellow">WhatsApp a photo</WhatsAppButton>
                <CallButton tone="whiteOutline" />
                <a href="#quote" className="mt-1 text-center text-sm font-semibold text-white underline underline-offset-4 hover:text-brand-yellow">
                  Or fill in the quote form
                </a>
              </div>
            </div>
            <ul className="mt-4 space-y-2 rounded-2xl border-2 border-ink/10 p-5 text-sm">
              {[`Working on bikes since ${business.experience.since}`, "All brands", "Call-out included in your quote", "Weekends 08:00 to 17:00, weekdays by appointment"].map((t) => (
                <li key={t} className="flex gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-dark" />
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section id="quote" aria-labelledby="quote-title" className="scroll-mt-20 bg-muted py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>Get a quote</Eyebrow>
            <h2 id="quote-title" className="text-4xl font-extrabold uppercase sm:text-5xl">Tell us about your {vehicle === "quad" ? "quad" : vehicle}</h2>
            <p className="mt-4 text-lg">
              Quotes only, no guesswork. Give us the make, model and what&apos;s wrong, and we&apos;ll come back with a price that
              includes the call-out.
            </p>
            <p className="mt-4 text-ink-soft">
              Faster on WhatsApp? Send a photo of your {vehicle === "quad" ? "quad" : vehicle} and a quick voice note.
            </p>
            <WhatsAppButton vehicle={vehicle} tone="green" className="mt-5">WhatsApp a photo</WhatsAppButton>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <QuoteForm vehicle={vehicle} />
          </div>
        </Container>
      </section>

      <Faq faqs={faqs} title={faqTitle} />
      <OtherServices current={path} />
      <CtaBand vehicle={vehicle} title={ctaTitle} />
    </>
  );
}

/** Inline photo figure for long-form copy (framed, captioned, never upscaled). */
export function InlinePhotos({ photos, label }: { photos: PhotoKey[]; label?: string }) {
  return (
    <div className={`not-prose my-8 grid gap-4 ${photos.length > 1 ? "sm:grid-cols-2" : ""}`} aria-label={label} role={label ? "group" : undefined}>
      {photos.map((p) => (
        <div key={p} data-reveal="zoom"><PhotoCard photo={p} caption sizes="(min-width: 640px) 360px, 92vw" className="w-full" /></div>
      ))}
    </div>
  );
}
