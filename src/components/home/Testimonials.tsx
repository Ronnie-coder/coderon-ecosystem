import Image from 'next/image';
import { testimonials } from '@/data/testimonialsData';

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="section border-t-2 border-line/15">
      <div className="container">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Client words</p>
          <h2 id="testimonials-title" className="h-section mt-3">
            Don&apos;t take <span className="accent">our</span> word for it.
          </h2>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.id} data-reveal>
              <figure className="card-pop flex h-full flex-col p-7 md:p-9">
                <span aria-hidden="true" className="font-serif text-7xl leading-none text-gold-text">“</span>
                <blockquote className="-mt-4 font-serif text-2xl leading-snug md:text-[1.7rem]">{t.quote}</blockquote>
                <figcaption className="mt-auto flex items-center gap-4 border-t-2 border-line/15 pt-6">
                  <span className="grid h-14 w-20 shrink-0 place-items-center rounded-xl border-2 border-line bg-white p-2">
                    <Image src={t.logoUrl} alt={t.logoAlt} width={t.logoWidth} height={t.logoHeight} className="h-auto max-h-10 w-auto" />
                  </span>
                  <span>
                    <span className="block font-bold">{t.authorName}</span>
                    <span className="block text-sm text-ink/65">{t.authorRole}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
