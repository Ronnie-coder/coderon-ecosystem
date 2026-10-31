"use client";

import { usePathname } from "next/navigation";
import { routes } from "@/lib/site";
import { rentalLink, repairLink } from "@/lib/whatsapp";
import type { VehicleType } from "@/lib/business";
import { Icon } from "./ui/Icon";
import { TrackedLink } from "./ui/TrackedLink";

const vehicleByPath: Record<string, VehicleType> = {
  [routes.motorcycle]: "motorcycle",
  [routes.scooter]: "scooter",
  [routes.quad]: "quad",
};

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const rental = pathname === routes.rental || pathname === routes.rentalTerms;
  const href = rental ? rentalLink : repairLink(vehicleByPath[pathname]);

  return (
    <TrackedLink
      event="whatsapp_click"
      intent={rental ? "rental" : "repair"}
      href={href}
      className="fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-ink shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] ring-4 ring-white transition-[bottom,transform] duration-200 hover:scale-105 sm:right-6"
      style={{ bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + var(--banner-h, 0px))" }}
      aria-label={rental ? "WhatsApp Adrich about renting a scooter" : "WhatsApp Adrich for a quote"}
    >
      <Icon name="whatsapp" className="h-8 w-8" />
    </TrackedLink>
  );
}
