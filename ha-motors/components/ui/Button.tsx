import Link from "next/link";
import type { ReactNode } from "react";
import { business } from "@/lib/business";
import { rentalLink, repairLink } from "@/lib/whatsapp";
import type { VehicleType } from "@/lib/business";
import { Icon, type IconName } from "./Icon";
import { TrackedLink } from "./TrackedLink";

export type Tone = "yellow" | "green" | "greenOutline" | "ink" | "white" | "whiteOutline";

const tones: Record<Tone, string> = {
  yellow: "bg-brand-yellow text-ink hover:bg-[#ffd21f] shadow-[0_3px_0_#14612a]",
  green: "bg-brand-green-dark text-white hover:bg-[#0f4a20]",
  greenOutline: "border-2 border-brand-green-dark text-brand-green-dark hover:bg-brand-green-dark hover:text-white",
  ink: "bg-ink text-white hover:bg-black",
  white: "bg-white text-ink hover:bg-muted",
  whiteOutline: "border-2 border-white text-white hover:bg-white hover:text-ink",
};

export const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold transition-colors duration-150 text-center sm:whitespace-nowrap";

export function btnClass(tone: Tone, extra = "") {
  return `${btnBase} ${tones[tone]} ${extra}`;
}

export function ButtonLink({
  href,
  tone = "yellow",
  icon,
  children,
  className = "",
}: {
  href: string;
  tone?: Tone;
  icon?: IconName;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={btnClass(tone, className)}>
      {icon && <Icon name={icon} className="h-5 w-5" />}
      {children}
    </Link>
  );
}

export function WhatsAppButton({
  intent = "repair",
  vehicle,
  tone = "yellow",
  children,
  className = "",
  href,
}: {
  intent?: "repair" | "rental";
  vehicle?: VehicleType;
  tone?: Tone;
  children?: ReactNode;
  className?: string;
  href?: string;
}) {
  const link = href ?? (intent === "rental" ? rentalLink : repairLink(vehicle));
  return (
    <TrackedLink event="whatsapp_click" intent={intent} href={link} className={btnClass(tone, className)}>
      <Icon name="whatsapp" className="h-5 w-5" />
      {children ?? "WhatsApp Adrich"}
      <span className="sr-only"> (opens WhatsApp)</span>
    </TrackedLink>
  );
}

export function CallButton({
  intent = "repair",
  tone = "ink",
  className = "",
  children,
}: {
  intent?: "repair" | "rental";
  tone?: Tone;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <TrackedLink event="phone_click" intent={intent} href={business.phone.tel} className={btnClass(tone, className)}>
      <Icon name="phone" className="h-5 w-5" />
      {children ?? `Call ${business.phone.local}`}
    </TrackedLink>
  );
}
