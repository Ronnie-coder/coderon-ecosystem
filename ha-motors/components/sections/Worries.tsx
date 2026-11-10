import { business } from "@/lib/business";
import { Icon, type IconName } from "../ui/Icon";
import { Eyebrow, H2, Section } from "../ui/Section";

/**
 * Answers the worries riders have before they message a mechanic they haven't used before.
 * Every answer restates something the business already promises elsewhere on the site.
 */
const worries: { icon: IconName; q: string; a: string }[] = [
  { icon: "tag", q: "Will I get a surprise bill?", a: "No. You get the price before any work starts, with the call-out fee already included." },
  { icon: "van", q: "My bike won't start. How do I get it to you?", a: "You don't. We come to you anywhere in Bloemfontein, at home, at work or on a delivery shift." },
  { icon: "clock", q: "My bike is my income. How long will I be off the road?", a: `${business.owner} knows a parked delivery bike earns nothing, so the aim is to get you riding again fast.` },
  { icon: "check", q: "Will I understand what was wrong?", a: "Yes. You get the problem and the fix explained in plain language, not workshop talk." },
];

export function Worries() {
  return (
    <Section bg="muted" labelledBy="worries-title">
      <Eyebrow>No surprises</Eyebrow>
      <H2 id="worries-title">Worried about calling a mechanic?</H2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {worries.map((w, i) => (
          <li key={w.q} data-reveal data-reveal-delay={i * 80} className="flex gap-4 rounded-2xl border-2 border-ink/10 bg-white p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-green-dark text-white">
              <Icon name={w.icon} className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-xl font-bold uppercase sm:text-2xl">{w.q}</h3>
              <p className="mt-1 text-ink-soft">{w.a}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
