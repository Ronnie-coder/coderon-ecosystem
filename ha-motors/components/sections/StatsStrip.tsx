import { business } from "@/lib/business";
import { Icon, type IconName } from "../ui/Icon";
import { Container } from "../ui/Section";

const stats: { icon: IconName; value: string; label: string }[] = [
  { icon: "clock", value: `Since ${business.experience.since}`, label: "Working on bikes" },
  { icon: "wrench", value: "All brands", label: "Motorcycles, scooters, quads" },
  { icon: "van", value: "We come to you", label: "Call-outs anywhere in Bloem" },
  { icon: "calendar", value: "Open weekends", label: "Sat & Sun, 08:00 to 17:00" },
];

/** Quick trust facts directly under the hero. */
export function StatsStrip() {
  return (
    <section aria-label="Why riders choose H A Motors" className="relative z-10 -mt-8 pb-4 sm:-mt-10">
      <Container>
        <ul data-reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 shadow-[0_20px_50px_-25px_rgb(22_24_27/0.5)] lg:grid-cols-4">
          {stats.map((s) => (
            <li key={s.value} className="flex items-center gap-3 bg-white p-4 sm:p-5">
              <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-yellow text-ink sm:grid">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-heading text-xl leading-tight font-extrabold uppercase sm:text-2xl">{s.value}</span>
                <span className="block text-sm text-ink-soft">{s.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
