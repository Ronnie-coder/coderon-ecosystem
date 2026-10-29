import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBarChart2,
  FiCpu,
  FiLayers,
  FiMessageCircle,
  FiMonitor,
  FiShield,
  FiTool,
  FiUsers,
} from 'react-icons/fi';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'About Coderon',
  description:
    'Coderon is a Cape Town web and software studio. Our mission: websites and tools for growing businesses that are built properly, priced fairly and open to all.',
  alternates: { canonical: '/about/' },
};

// What Coderon does for a business, each linked to the page that explains it.
const offers = [
  {
    icon: FiMonitor,
    title: 'New websites',
    text: 'A fast, professional website that works on every phone, is set up properly for Google and lets customers call or WhatsApp you in one tap.',
    href: '/services/web-development/',
  },
  {
    icon: FiTool,
    title: 'Website fixes',
    text: 'Slow, broken on phones or showing “not secure”? We fix the website you already have, without starting over.',
    href: '/services/website-fix/',
  },
  {
    icon: FiShield,
    title: 'Website care',
    text: 'We keep your website updated, backed up and online, and make your changes, so you can focus on your business.',
    href: '/services/website-care-plan/',
  },
  {
    icon: FiLayers,
    title: 'Custom software',
    text: 'Internal tools, client portals and dashboards that take the admin and spreadsheets off your team.',
    href: '/services/custom-software/',
  },
  {
    icon: FiCpu,
    title: 'Chatbots and AI',
    text: 'Assistants that capture enquiries and answer your customers’ questions, day and night.',
    href: '/playroom/business-chatbot/',
  },
];

const principles = [
  {
    icon: FiLayers,
    title: 'Built to last',
    text: 'Semantic HTML, clean code and plain-English handover notes. You own everything, and you are never locked in.',
  },
  {
    icon: FiUsers,
    title: 'Accessible by default',
    text: 'Built to WCAG 2.2 AA, so people using a keyboard, a screen reader or an older phone can use your site too.',
  },
  {
    icon: FiMessageCircle,
    title: 'One point of contact',
    text: 'You work directly with the person designing and building your project, from the first call to launch and beyond.',
  },
  {
    icon: FiBarChart2,
    title: 'Honest results',
    text: 'We never promise “number one on Google”. We promise a fast, properly set-up website, and we show you the numbers.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Coderon"
        title={
          <>
            Built properly. Built for <span className="accent">everyone.</span>
          </>
        }
        intro="Coderon is a Cape Town web and software studio. We help small and growing businesses look professional online, get found by the right customers and spend less time on admin."
      />

      {/* Mission */}
      <section aria-labelledby="mission" className="band-dark">
        <div className="container grid gap-10 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div data-reveal>
            <p className="eyebrow text-[#F2F2F2]/60">Our mission</p>
            <h2 id="mission" className="mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-5xl">
              Websites and tools for growing businesses that are built properly, priced fairly and{' '}
              <span className="font-serif font-normal italic text-[#F2C230]">open to everyone.</span>
            </h2>
          </div>
          <div data-reveal>
            <p className="text-lg leading-relaxed text-[#F2F2F2]/75">
              Big brands have teams to build fast, accessible websites. Most small businesses don&apos;t, and their customers
              feel it: slow pages, sites that break on phones, businesses nobody can find on Google, and visitors who simply
              can&apos;t use the site. Coderon exists to close that gap.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section aria-labelledby="what-we-do" className="section">
        <div className="container">
          <div className="max-w-2xl" data-reveal>
            <p className="eyebrow">What we do</p>
            <h2 id="what-we-do" className="h-section mt-3">
              What Coderon does for <span className="accent">your business</span>
            </h2>
            <p className="mt-5 text-lg text-ink/75">
              From your first website to the systems that run your day, one studio that grows with you.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map(({ icon: Icon, title, text, href }) => (
              <li key={title} data-reveal>
                <Link href={href} className="card-pop group flex h-full flex-col p-6">
                  <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-lg text-gold-text">
                    <Icon />
                  </span>
                  <span className="mt-5 flex items-center gap-2 text-lg font-semibold">
                    {title}
                    <FiArrowUpRight aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-2 text-ink/75">{text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Coderon was started */}
      <section aria-labelledby="why-coderon" className="section border-t border-line">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-md" data-reveal>
            <div className="overflow-hidden rounded-2xl border border-line shadow-soft-lg">
              <Image
                src="/images/ronnie-nyamhute.jpg"
                alt="Ronnie Nyamhute, founder of Coderon"
                width={500}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="absolute -bottom-5 -right-3 rotate-[-3deg] rounded-full border border-gold bg-gold px-4 py-2 font-bold text-[#16130E] shadow-soft">
              Ronnie, founder
            </p>
          </div>

          <div data-reveal>
            <p className="eyebrow">Why Coderon</p>
            <h2 id="why-coderon" className="h-section mt-3">
              Why we <span className="accent">started</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Ronnie Nyamhute started Coderon after teaching himself full-stack development and noticing the same thing again
              and again: animation is the easy part. What makes a website good is underneath it. Semantic HTML that browsers,
              search engines and screen readers understand, speed on everyday phones, and accessibility built in from the
              first line of code.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Too many small businesses were paying for websites that looked fine but didn&apos;t do that job. Coderon was
              started to build them properly, at a fair price agreed upfront, and to stay with each business as it grows.
            </p>
            <figure className="mt-8 border-l-4 border-gold pl-5">
              <blockquote className="font-serif text-2xl italic leading-snug md:text-3xl">
                &ldquo;Anyone can make a website move. The real craft is making it work for everyone.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm font-medium text-ink/70">Ronnie Nyamhute, Founder</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="how-we-work" className="section border-t border-line">
        <div className="container">
          <p className="eyebrow" data-reveal>
            Our principles
          </p>
          <h2 id="how-we-work" className="h-section mt-3" data-reveal>
            How we <span className="accent">work</span>
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, text }) => (
              <li key={title} className="card p-6" data-reveal>
                <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-lg text-gold-text">
                  <Icon />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-ink/75">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3" data-reveal>
            <Link href="/contact/" className="btn-primary">
              Start your project <FiArrowRight aria-hidden="true" />
            </Link>
            <Link href="/services/" className="btn-ghost">
              See our services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
