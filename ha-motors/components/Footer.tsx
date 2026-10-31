import Link from "next/link";
import { business } from "@/lib/business";
import { routes } from "@/lib/site";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "./consent/CookieSettingsLink";
import { Icon } from "./ui/Icon";
import { TrackedLink } from "./ui/TrackedLink";
import { repairLink } from "@/lib/whatsapp";

const quick = [
  { href: routes.motorcycle, label: "Motorcycle repairs" },
  { href: routes.scooter, label: "Scooter repairs" },
  { href: routes.quad, label: "Quad bike repairs" },
  { href: routes.rental, label: "Scooter rental" },
  { href: routes.gallery, label: "Gallery" },
  { href: routes.contact, label: "Contact" },
];
const legal = [
  { href: routes.rentalTerms, label: "Rental terms" },
  { href: routes.privacy, label: "Privacy policy" },
  { href: routes.cookies, label: "Cookie policy" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const link = "inline-flex min-h-11 items-center hover:text-brand-yellow";
  return (
    <footer className="on-dark bg-ink text-white">
      <div aria-hidden="true" className="stripe-bar" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-14 pb-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo variant="horizontal" tone="dark" height={40} />
          <p className="mt-4 text-white/85">
            {business.name} · {business.tagline} · Serving all of {business.area.city}
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold uppercase text-brand-yellow">Get in touch</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <TrackedLink event="whatsapp_click" intent="repair" href={repairLink()} className={`${link} gap-2`}>
                <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp {business.phone.local}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink event="phone_click" intent="repair" href={business.phone.tel} className={`${link} gap-2`}>
                <Icon name="phone" className="h-5 w-5" /> {business.phone.display}
              </TrackedLink>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className={`${link} gap-2 break-all`}>
                <Icon name="mail" className="h-5 w-5 shrink-0" /> {business.email}
              </a>
            </li>
          </ul>
          <h2 className="mt-6 font-heading text-xl font-bold uppercase text-brand-yellow">Hours</h2>
          <p className="mt-2 text-white/85">
            {business.hours.weekend}
            <br />
            {business.hours.weekdays}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-xl font-bold uppercase text-brand-yellow">Quick links</h2>
          <ul className="mt-3">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="font-heading text-xl font-bold uppercase text-brand-yellow">Legal</h2>
          <ul className="mt-3">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
            <li>
              <CookieSettingsLink className={`${link} text-left`} />
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 pb-24 text-sm text-white/75 sm:flex-row sm:justify-between sm:px-6 sm:pb-5">
          <p>© {year} {business.name}. All rights reserved.</p>
          <p>
            Website by{" "}
            <a href={business.credit.url} className="font-semibold text-white underline underline-offset-2 hover:text-brand-yellow" target="_blank" rel="noopener">
              {business.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
