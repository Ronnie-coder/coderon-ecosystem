"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Logo } from '@/components/Logo';
import { MotionSwitch, ThemeButton, QUOTE_HREF, WHATSAPP_HREF } from '@/components/Navbar';
import { services } from '@/data/servicesData';
import { CookieSettingsButton } from '@/components/analytics/Consent';
import LogoMascot from '@/components/motion/LogoMascot';

const socials = [
  { href: 'https://github.com/Ronnie-coder', label: 'GitHub', Icon: FaGithub },
  { href: 'https://www.linkedin.com/in/ronnie-nyamhute-8b302b360', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://x.com/Coderon28', label: 'X (Twitter)', Icon: FaXTwitter },
  { href: 'https://www.facebook.com/profile.php?id=61586558918279', label: 'Facebook', Icon: FaFacebookF },
];

const company = [
  { href: '/industries/', label: 'Who we help' },
  { href: '/web-design-cape-town/', label: 'Web design Cape Town' },
  { href: '/playroom/', label: 'Our work' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/about/', label: 'About' },
  { href: '/journal/', label: 'Journal' },
  { href: '/contact/', label: 'Contact' },
];

function CapeTownClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-ZA', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Johannesburg' }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-xs text-ink/60">
      Cape Town · <span suppressHydrationWarning>{time ?? '--:--'}</span> SAST
    </span>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="mt-10">
      {/* Closing call to action: the C rises from the bottom edge and watches the pointer. */}
      <section aria-labelledby="footer-cta" className="band-dark overflow-hidden">
        <div className="container flex flex-col items-center pt-16 text-center md:pt-24">
          <h2 id="footer-cta" className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Not sure what your website needs? <span className="font-serif font-normal italic text-[#F2C230]">Ask us.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-[#F2F2F2]/70">A free, straight answer within one working day. No obligation.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={QUOTE_HREF} className="btn-primary px-6">
              Get a free quote
            </Link>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white/10 px-6 text-[#F2F2F2] hover:bg-white/[0.16]"
            >
              <FaWhatsapp aria-hidden="true" /> WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div aria-hidden="true" className="relative mt-12 h-[158px] w-full overflow-hidden sm:h-[196px] md:h-[240px]">
            <LogoMascot className="absolute left-1/2 top-0 w-[250px] -translate-x-1/2 text-white/20 sm:w-[310px] md:w-[380px]" />
          </div>
        </div>
      </section>

      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Coderon home" className="inline-block text-ink">
            <Logo height={28} animated />
          </Link>
          <p className="mt-4 max-w-xs text-ink/70">
            Fast websites set up properly for Google, and custom software that saves your team time. Based in Cape Town,
            working worldwide.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Coderon on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-gold hover:bg-gold hover:text-[#16130E]"
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="eyebrow">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="font-medium hover:text-gold-text">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="eyebrow">Company</h2>
          <ul className="mt-4 space-y-2.5">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-medium hover:text-gold-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Talk to us</h2>
          <ul className="mt-4 space-y-2.5 font-medium">
            <li>
              <a href="mailto:info@coderon.co.za" className="hover:text-gold-text">info@coderon.co.za</a>
            </li>
            <li>
              <a href="tel:+27678184898" className="hover:text-gold-text">+27 67 818 4898</a>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-3">
            <MotionSwitch />
            <ThemeButton className="border-line" />
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col gap-3 py-6 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Coderon (Pty) Ltd.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/privacy-policy/" className="hover:text-ink">Privacy</Link>
            <Link href="/terms-of-service/" className="hover:text-ink">Terms</Link>
            <CookieSettingsButton className="hover:text-ink" />
            <CapeTownClock />
          </div>
        </div>
      </div>
    </footer>
  );
}
