import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { HoursArea } from "@/components/sections/HoursArea";
import { CallButton, WhatsAppButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Eyebrow } from "@/components/ui/Section";
import { business } from "@/lib/business";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact | Mobile Motorcycle Mechanic Bloemfontein | H A Motors" },
  description:
    "Contact H A Motors, the mobile motorcycle mechanic in Bloemfontein. WhatsApp or call 061 104 3739 for a repair quote or scooter rental. Weekends 08:00 to 17:00.",
  alternates: { canonical: routes.contact },
  openGraph: { url: routes.contact, title: "Contact H A Motors | Mobile Motorcycle Mechanic Bloemfontein" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-paper pb-14 sm:pb-20">
        <Container className="pt-6">
          <Breadcrumbs items={[{ name: "Contact", path: routes.contact }]} />
        </Container>
        <Container className="pt-8 sm:pt-12">
          <Eyebrow>Mobile motorcycle mechanic · Bloemfontein</Eyebrow>
          <h1 className="text-[2.5rem] font-extrabold uppercase sm:text-6xl">Contact {business.name}</h1>
          <p className="mt-4 max-w-2xl text-lg">
            WhatsApp is the quickest way to reach {business.owner}. Send a photo of your bike and what&apos;s wrong, and
            you&apos;ll get a quote with the call-out included.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
            <WhatsAppButton tone="green" className="min-h-16 text-xl">WhatsApp {business.phone.local}</WhatsAppButton>
            <CallButton tone="ink" className="min-h-16 text-xl" />
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-2 text-lg">
            <Icon name="mail" className="h-5 w-5 text-brand-green-dark" />
            <span>Email:</span>
            <a href={`mailto:${business.email}`} className="font-semibold break-all text-brand-green-dark underline underline-offset-2">
              {business.email}
            </a>
          </p>
        </Container>
      </section>

      <section id="quote" aria-labelledby="quote-title" className="bg-muted py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>Repair quote</Eyebrow>
            <h2 id="quote-title" className="text-4xl font-extrabold uppercase sm:text-5xl">Get a quote</h2>
            <p className="mt-4 text-lg">Motorcycle, scooter or quad, all brands. Fill this in and we&apos;ll get back to you with a price.</p>
            <p className="mt-4 text-ink-soft">{business.callOutFee}</p>
            <p className="mt-4 text-ink-soft">
              Looking to rent a scooter instead?{" "}
              <a href={`${routes.rental}#enquire`} className="font-semibold text-brand-green-dark underline underline-offset-2">Use the rental form</a>.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <QuoteForm idPrefix="c" />
          </div>
        </Container>
      </section>

      <HoursArea bg="paper" />
    </>
  );
}
