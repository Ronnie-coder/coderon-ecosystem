import type { Metadata } from "next";
import Link from "next/link";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { WhatsAppButton } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/lib/business";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "About Adrich | Motorbike Mechanic in Bloemfontein | H A Motors" },
  description:
    "Meet Adrich, the motorbike mechanic behind H A Motors in Bloemfontein. Working on bikes since 2017: engines, electrical faults and getting dead bikes running again.",
  alternates: { canonical: routes.about },
  openGraph: { url: routes.about, title: "About Adrich | H A Motors Bloemfontein" },
};

const xp = business.experience;

const timeline = [
  { when: String(xp.since), title: "Starts working on bikes", text: "Where it all started." },
  {
    when: "Shop years",
    title: "Learns the trade in a bike shop",
    text: `Hands-on, every day, with a lot of ${xp.brands.slice(0, -1).join(", ")} and ${xp.brands.at(-1)} bikes.`,
  },
  {
    when: "Today",
    title: "H A Motors",
    text: `Mobile repairs anywhere in ${business.area.city}, plus ${business.rental.fleetSize} ${business.rental.model} scooters for rent.`,
  },
];

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "tag", title: "Honest quotes", text: "You know the price before any work starts, with the call-out fee already included." },
  { icon: "bolt", title: "Plain explanations", text: "Adrich tells you what's wrong in plain language, so you understand what you're paying for." },
  { icon: "van", title: "Fast for delivery riders", text: "Your bike is your income. Adrich works to get you back on the road fast." },
];

const strengths: { icon: IconName; title: string }[] = [
  { icon: "engine", title: "Engines" },
  { icon: "bolt", title: "Electrical faults" },
  { icon: "wrench", title: "Dead bikes back to life" },
];

export default function AboutPage() {
  const [intro, ...rest] = business.about;
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: routes.about }]}
        eyebrow={`Working on bikes since ${xp.since}`}
        title={
          <>
            Meet <span className="text-brand-yellow">{business.owner}</span>, the mechanic behind H A Motors
          </>
        }
        intro={<p>{intro}</p>}
        actions={<WhatsAppButton tone="yellow" className="text-lg">WhatsApp {business.owner}</WhatsAppButton>}
        photo="adrich-kawasaki-ninja"
      />

      <Section bg="paper" labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading id="story-title" eyebrow="In Adrich's words" title="Why H A Motors" />
            <div className="mt-6 space-y-5 text-lg">
              {rest.map((p, i) => (
                <p key={p} data-reveal data-reveal-delay={i * 80}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <ol className="relative space-y-8 border-l-4 border-brand-yellow pl-8" aria-label="Adrich's journey">
            {timeline.map((t, i) => (
              <li key={t.title} data-reveal data-reveal-delay={i * 120} className="relative">
                <span aria-hidden="true" className="absolute top-1 -left-[2.65rem] h-5 w-5 rounded-full border-4 border-white bg-brand-green-dark shadow" />
                <p className="font-heading text-lg font-bold tracking-wider text-brand-green-dark uppercase">{t.when}</p>
                <h3 className="text-2xl font-extrabold uppercase">{t.title}</h3>
                <p className="mt-1 text-ink-soft">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section bg="muted" labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="How Adrich works" title="What you can expect" center />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.title} data-reveal data-reveal-delay={i * 100} className="lift rounded-2xl bg-white p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-green-dark text-white">
                <Icon name={v.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-2xl font-bold uppercase">{v.title}</h3>
              <p className="mt-2 text-ink-soft">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section bg="paper" labelledBy="best-title">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          <div data-reveal="left">
            <PhotoCard photo="adrich-bmw-workshop" stripe caption sizes="(min-width: 768px) 440px, 92vw" className="mx-auto w-full max-w-md" />
          </div>
          <div>
            <SectionHeading id="best-title" eyebrow="Best at" title="Where Adrich shines" />
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {strengths.map((s, i) => (
                <li key={s.title} data-reveal data-reveal-delay={i * 90} className="rounded-2xl border-2 border-ink/10 p-4 text-center">
                  <Icon name={s.icon} className="mx-auto h-8 w-8 text-brand-green-dark" />
                  <p className="mt-2 font-heading text-xl font-bold uppercase">{s.title}</p>
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-6 text-lg">
              And when the tools are packed away? Adrich rides a <strong>{xp.rides}</strong>, the same family as the{" "}
              <Link href={routes.rental} className="font-semibold text-brand-green-dark underline underline-offset-2">
                scooters we rent out
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <BrandMarquee />
      <CtaBand title="Got a bike that needs Adrich? WhatsApp now." />
    </>
  );
}
