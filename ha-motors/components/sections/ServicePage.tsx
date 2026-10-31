import type { ReactNode } from "react";
import { business, type VehicleType } from "@/lib/business";
import type { Faq as FaqItem } from "@/lib/content/faqs";
import type { PhotoKey } from "@/lib/photos";
import { QuoteForm } from "../forms/QuoteForm";
import { CallButton, WhatsAppButton } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { PhotoCard } from "../ui/PhotoCard";
import { Container, Eyebrow } from "../ui/Section";
import { Breadcrumbs } from "./Breadcrumbs";
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
      <section className="bg-paper">
        <Container className="pt-6">
          <Breadcrumbs items={[{ name: crumb, path }]} />
        </Container>
        <Container className="grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-fade-up">
            <Eyebrow>All brands · Call-outs anywhere in Bloem</Eyebrow>
            <h1 className="text-[2.5rem] font-extrabold uppercase sm:text-6xl">{h1}</h1>
            <p className="mt-5 max-w-xl text-lg">{intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WhatsAppButton vehicle={vehicle} tone="yellow" className="text-lg">Get a Quote on WhatsApp</WhatsAppButton>
              <CallButton />
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm text-ink-soft">
              <Icon name="tag" className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-dark" /> {business.callOutFee}
            </p>
          </div>
          <PhotoCard photo={heroPhoto} priority stripe sizes="(min-width: 1024px) 460px, 92vw" className="mx-auto w-full max-w-md lg:max-w-none" />
        </Container>
        <div aria-hidden="true" className="stripe-bar" />
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <Container>
          <div className="prose-ha mx-auto max-w-3xl text-lg">{children}</div>
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
        <PhotoCard key={p} photo={p} caption sizes="(min-width: 640px) 360px, 92vw" className="w-full" />
      ))}
    </div>
  );
}
