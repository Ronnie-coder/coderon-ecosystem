import Link from "next/link";
import { routes } from "@/lib/site";
import { Icon } from "../ui/Icon";
import { Container } from "../ui/Section";

const all = [
  { href: routes.motorcycle, title: "Motorcycle repairs", text: "Services, electrics, engines and tyres. All brands." },
  { href: routes.scooter, title: "Scooter repairs", text: "Commuter and delivery scooters, fixed where you are." },
  { href: routes.quad, title: "Quad bike repairs", text: "Sport and utility quads, brakes, winches and more." },
  { href: routes.rental, title: "Scooter rental", text: "SYM Jet 14 200cc, R550 a week, maintenance included." },
];

export function OtherServices({ current }: { current: string }) {
  const links = all.filter((l) => l.href !== current);
  return (
    <section aria-labelledby="more-title" className="bg-muted py-14">
      <Container>
        <h2 id="more-title" className="text-3xl font-extrabold uppercase sm:text-4xl">More from H A Motors</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex h-full min-h-28 flex-col justify-between rounded-2xl border-2 border-transparent bg-white p-5 shadow-sm hover:border-brand-green-dark">
                <span>
                  <span className="block font-heading text-2xl font-bold uppercase">{l.title}</span>
                  <span className="mt-1 block text-ink-soft">{l.text}</span>
                </span>
                <span className="mt-3 inline-flex items-center gap-1 font-bold text-brand-green-dark">
                  Find out more <Icon name="chevronRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
