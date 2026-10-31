import { business } from "@/lib/business";
import { routes } from "@/lib/site";
import { ButtonLink } from "../ui/Button";
import { Icon, type IconName } from "../ui/Icon";
import { PhotoCard } from "../ui/PhotoCard";
import { Container } from "../ui/Section";

const reqIcons: IconName[] = ["idcard", "licence", "home"];

export function RentalBand() {
  const r = business.rental;
  return (
    <section aria-labelledby="rental-band-title" className="on-dark relative overflow-hidden bg-brand-green-dark py-16 text-white sm:py-20">
      <div aria-hidden="true" className="absolute inset-y-0 -left-24 hidden w-40 -skew-x-12 bg-brand-green xl:block" />
      <Container className="relative grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold tracking-[0.14em] text-brand-yellow uppercase">Scooter rental</p>
          <h2 id="rental-band-title" className="text-4xl font-extrabold uppercase sm:text-5xl">
            Rent a {r.model}. <span className="text-brand-yellow">{r.priceDisplay}/week.</span>
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Maintenance included, insured. Built for delivery riders and commuters who need wheels this week.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="What you need">
            {r.requirements.map((req, i) => (
              <li key={req} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-3 font-semibold">
                <Icon name={reqIcons[i] ?? "check"} className="h-6 w-6 shrink-0 text-brand-yellow" />
                {req}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-semibold text-brand-yellow">{r.scarcity}</p>
          <ButtonLink href={routes.rental} tone="yellow" className="mt-6 text-lg">
            Check Availability
          </ButtonLink>
        </div>
        <PhotoCard photo="sym-jet14-front" stripe sizes="(min-width: 768px) 480px, 92vw" className="mx-auto w-full max-w-md" />
      </Container>
    </section>
  );
}
