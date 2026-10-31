"use client";

import type { AnchorHTMLAttributes } from "react";
import { track } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: "whatsapp_click" | "phone_click";
  intent: "repair" | "rental";
};

/** Plain <a> that reports a consent-gated GA4 event on click. */
export function TrackedLink({ event, intent, onClick, href, children, ...rest }: Props) {
  const external = href?.startsWith("https://");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        track(event, intent);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
