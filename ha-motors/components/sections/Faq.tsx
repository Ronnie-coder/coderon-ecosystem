import type { Faq as FaqItem } from "@/lib/content/faqs";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "../JsonLd";
import { Icon } from "../ui/Icon";
import { Eyebrow, H2, Section } from "../ui/Section";

/** Accordion built on <details>: accessible and zero JS. Also emits FAQPage schema. */
export function Faq({ faqs, title = "Questions people ask", bg = "paper" as const }: { faqs: FaqItem[]; title?: string; bg?: "paper" | "muted" }) {
  return (
    <Section bg={bg} id="faq" labelledBy="faq-title">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>FAQ</Eyebrow>
        <H2 id="faq-title">{title}</H2>
        <div className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-semibold">
                <h3 className="font-sans text-lg font-semibold normal-case tracking-normal">{f.q}</h3>
                <Icon name="chevronDown" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </Section>
  );
}
