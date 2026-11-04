import type { ReactNode } from "react";
import { Eyebrow } from "./Section";

/** Eyebrow + H2 + optional intro, revealed on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  dark = false,
  center = false,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id: string;
  dark?: boolean;
  center?: boolean;
  action?: ReactNode;
}) {
  return (
    <div
      data-reveal
      className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${center ? "items-center text-center md:flex-col md:items-center" : ""}`}
    >
      <div className={center ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 id={id} className="text-4xl font-extrabold uppercase sm:text-5xl">
          {title}
        </h2>
        {intro && <p className={`mt-3 text-lg ${dark ? "text-white/85" : "text-ink-soft"}`}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
