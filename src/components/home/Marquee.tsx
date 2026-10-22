import Link from 'next/link';
import type { ReactNode } from 'react';
import { Price } from '@/components/ui/Price';
import { websitePlans, monthlyPlan } from '@/data/pricingData';
import type { IconType } from 'react-icons';
import { FiGlobe, FiTool, FiShield, FiCode, FiSearch, FiCalendar, FiSmartphone, FiRepeat } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

// Endless ribbon of what we offer, each linking to its page (internal links help SEO too).
// The first copy is the real, linked list; the repeats are decorative (hidden from screen
// readers, not focusable) so the loop is seamless. Pauses on hover; stops when animations are off.
const items: { key: string; label: ReactNode; href: string; Icon: IconType }[] = [
  { key: 'from', label: <>Websites from <Price price={websitePlans[0].price} /></>, href: '/services/web-development/', Icon: FiGlobe },
  { key: 'monthly', label: <>Or <Price price={monthlyPlan.price} /> a month</>, href: '/pricing/#monthly', Icon: FiRepeat },
  { key: 'One-tap WhatsApp & call', label: 'One-tap WhatsApp & call', href: '/industries/local-service-businesses/', Icon: FaWhatsapp },
  { key: 'Set up for Google', label: 'Set up for Google', href: '/web-design-cape-town/', Icon: FiSearch },
  { key: 'Fast on every phone', label: 'Fast on every phone', href: '/services/website-fix/', Icon: FiSmartphone },
  { key: 'Booking inside your site', label: 'Booking inside your site', href: '/playroom/eddies-cut/', Icon: FiCalendar },
  { key: 'Website fixes', label: 'Website fixes', href: '/services/website-fix/', Icon: FiTool },
  { key: 'Monthly care', label: 'Monthly care', href: '/services/website-care-plan/', Icon: FiShield },
  { key: 'Custom software', label: 'Custom software', href: '/services/custom-software/', Icon: FiCode },
];

export default function Marquee() {
  const row = (copy: number) => {
    const decorative = copy > 0;
    return (
      <ul key={copy} aria-hidden={decorative || undefined} className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10">
        {items.map(({ key, label, href, Icon }) => (
          <li key={key} className="flex items-center gap-6 md:gap-10">
            <Link
              href={href}
              tabIndex={decorative ? -1 : undefined}
              className="group/item flex items-center gap-3 whitespace-nowrap rounded-full py-1 pl-1 pr-4 transition-colors hover:bg-white/10"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[#F2C230] text-lg text-[#F2C230] transition-transform duration-300 group-hover/item:rotate-[-8deg] group-hover/item:scale-110">
                <Icon aria-hidden="true" />
              </span>
              <span className="font-serif text-2xl italic md:text-3xl">{label}</span>
            </Link>
            <span aria-hidden="true" className="text-2xl text-[#F2C230]">✦</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section aria-label="What we offer" className="group overflow-hidden border-y-2 border-line bg-[#16130E] py-3 text-[#F2EBDD]">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">{[0, 1].map(row)}</div>
    </section>
  );
}
