import { Container } from "../ui/Section";

// Brands Adrich named, plus makes shown in the work photos. Text only (no trademarked logos).
const brands = ["Honda", "Big Boy", "Suzuki", "Lifan", "Yamaha", "Kawasaki", "SYM", "BMW"];

/** Slow-scrolling brand strip. Screen readers get one plain sentence instead of the moving list. */
export function BrandMarquee() {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {brands.map((b) => (
        <li key={b} className="flex items-center">
          <span className="px-6 font-heading text-3xl font-extrabold text-white/90 uppercase italic sm:text-4xl">{b}</span>
          <span className="h-2 w-6 -skew-x-12 bg-brand-yellow" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-labelledby="brands-title" className="on-dark overflow-hidden bg-ink py-8 text-white">
      <Container>
        <h2 id="brands-title" className="mb-4 text-center text-sm font-bold tracking-[0.2em] text-brand-yellow uppercase">
          All brands welcome
        </h2>
        <p className="sr-only">
          We work on all brands, including {brands.slice(0, -1).join(", ")} and {brands.at(-1)}.
        </p>
      </Container>
      <div className="marquee">
        <div className="marquee-track">
          {row}
          {row}
        </div>
      </div>
    </section>
  );
}
