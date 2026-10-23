import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import LogoMascot from '@/components/motion/LogoMascot';

const reasons = [
  { n: '01', title: 'Prices on the page', text: 'Websites from R3,500 once-off. One fixed quote before we start, no hidden costs.' },
  { n: '02', title: 'Work you can visit', text: 'Every project on this site is live. Click through and judge for yourself.' },
  { n: '03', title: 'Fast on any phone', text: 'Light, modern builds instead of heavy templates. Eddie\'s Cut went from 47 to 92 on Google PageSpeed.' },
  { n: '04', title: 'Websites and software', text: 'One studio for your website today and the system behind it tomorrow.' },
];

// Dark band: why Coderon over the alternatives, with the main call to action.
export default function WhyCoderon() {
  return (
    <section aria-labelledby="why-title" className="band-dark relative overflow-hidden" data-snap>
      {/* The C peeks up from the bottom edge under the heading and watches the pointer. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden lg:block">
        <div className="container relative h-[190px] overflow-hidden">
          <LogoMascot className="absolute left-8 top-0 w-[300px] text-white/20" />
        </div>
      </div>
      <div className="container relative py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <p className="eyebrow text-[#F2F2F2]/60">Why Coderon</p>
            <h2 id="why-title" className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              A small studio that does <span className="font-serif font-normal italic text-[#F2C230]">big-studio</span> work.
            </h2>
            <p className="mt-4 max-w-md text-lg text-[#F2F2F2]/70">
              No account managers, no templates sold as custom, no surprises on the invoice. Just good work, done properly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact/" className="btn-primary">
                Get a free quote <FiArrowRight aria-hidden="true" />
              </Link>
              <a href="https://wa.me/27678184898" target="_blank" rel="noopener noreferrer" className="btn bg-white/10 text-[#F2F2F2] hover:bg-white/[0.16]">
                <FaWhatsapp aria-hidden="true" /> WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r.n} className="rounded-2xl border border-white/10 p-6 transition-colors hover:border-[#F2C230]" data-reveal>
                <span className="font-mono text-sm text-[#F2C230]">{r.n}</span>
                <h3 className="mt-3 text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-[#F2F2F2]/70">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
