import Link from "next/link";
import type { PhotoKey } from "@/lib/photos";
import { routes } from "@/lib/site";
import { Icon } from "../ui/Icon";
import { PhotoCard } from "../ui/PhotoCard";

const cards: { href: string; title: string; cta: string; text: string; photo: PhotoKey }[] = [
  { href: routes.motorcycle, title: "Motorcycles", cta: "Motorcycle repairs", text: "Commuters, delivery bikes, cruisers and big adventure bikes.", photo: "carburettor-rebuild" },
  { href: routes.scooter, title: "Scooters", cta: "Scooter repairs", text: "Won't start, cutting out or due for a service? Sorted.", photo: "honda-scooter-finished" },
  { href: routes.quad, title: "Quad bikes", cta: "Quad bike repairs", text: "Sport and utility quads: brakes, winches and engines.", photo: "quad-front-teardown" },
];

/** Three big tappable cards linking to the vehicle repair pages. */
export function VehicleCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {cards.map((c, i) => (
        <li key={c.href} data-reveal data-reveal-delay={i * 90}>
          <Link
            href={c.href}
            className="lift group flex h-full flex-col rounded-[var(--radius-photo)] border border-ink/10 bg-white p-3 shadow-sm"
          >
            <PhotoCard photo={c.photo} aspect="4/3" sizes="(min-width: 768px) 340px, 92vw" />
            <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
              <H className="text-3xl font-extrabold uppercase">{c.title}</H>
              <p className="mt-1 flex-1 text-ink-soft">{c.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-brand-green-dark">
                {c.cta}
                <Icon name="chevronRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
