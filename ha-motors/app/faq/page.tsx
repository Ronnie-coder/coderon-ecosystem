import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { CallButton, WhatsAppButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { faqGroups } from "@/lib/content/faqs";
import { faqSchema } from "@/lib/schema";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "FAQ | Bike Repairs & Scooter Rental Bloemfontein | H A Motors" },
  description:
    "Answers about H A Motors in Bloemfontein: call-outs and fees, quotes, hours, motorcycle, scooter and quad repairs, and renting a SYM scooter for R550 a week.",
  alternates: { canonical: routes.faq },
  openGraph: { url: routes.faq, title: "Frequently asked questions | H A Motors" },
};

export default function FaqPage() {
  const all = faqGroups.flatMap((g) => g.faqs);
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", path: routes.faq }]}
        eyebrow="Questions & answers"
        title={
          <>
            Got a <span className="text-brand-yellow">question?</span>
          </>
        }
        intro={<p>Quick, straight answers about repairs, call-outs, quotes and scooter rental. Can&apos;t find yours? Just WhatsApp us.</p>}
        actions={
          <>
            <WhatsAppButton tone="yellow" className="text-lg">Ask on WhatsApp</WhatsAppButton>
            <CallButton tone="whiteOutline" />
          </>
        }
      />

      <section className="bg-paper py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-2 text-sm font-bold tracking-wider text-ink-soft uppercase">Jump to</p>
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="inline-flex min-h-11 items-center rounded-full border-2 border-ink/15 px-4 font-semibold hover:border-ink lg:w-full lg:rounded-xl">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-12">
            {faqGroups.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
                <h2 id={`${g.id}-title`} className="flex items-center gap-3 text-3xl font-extrabold uppercase sm:text-4xl">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-yellow text-ink">
                    <Icon name={g.icon} className="h-6 w-6" />
                  </span>
                  {g.title}
                </h2>
                <div className="mt-5 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
                  {g.faqs.map((f) => (
                    <details key={f.q} className="group">
                      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                        <h3 className="font-sans text-lg font-semibold normal-case tracking-normal">{f.q}</h3>
                        <Icon name="chevronDown" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="px-5 pb-5 text-ink-soft">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
            <p className="rounded-2xl bg-muted p-5">
              Still unsure? <Link href={routes.contact} className="font-semibold text-brand-green-dark underline underline-offset-2">Contact us</Link> or
              read the <Link href={routes.rentalTerms} className="font-semibold text-brand-green-dark underline underline-offset-2">rental terms</Link>.
            </p>
          </div>
        </Container>
      </section>
      <CtaBand />
      <JsonLd data={faqSchema(all)} />
    </>
  );
}
