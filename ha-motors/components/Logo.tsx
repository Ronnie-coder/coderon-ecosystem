import Image from "next/image";
import brandFiles from "@/lib/brand-manifest.json";
import { business } from "@/lib/business";

type Variant = "horizontal" | "stacked" | "icon";
type Tone = "light" | "dark";

const files: Record<Variant, Record<Tone, string>> = {
  horizontal: { light: "logo-horizontal.svg", dark: "logo-horizontal-white.svg" },
  stacked: { light: "logo-stacked.svg", dark: "logo-stacked-white.svg" },
  icon: { light: "logo-icon.svg", dark: "logo-icon-yellow.svg" },
};

// Intrinsic aspect ratios used to reserve space (no layout shift). Adjust if the kit differs.
// TODO: confirm the horizontal ratio once logo-horizontal.svg arrives (read it from its viewBox).
const ratio: Record<Variant, number> = { horizontal: 4.2, stacked: 520 / 380, icon: 1 };

const available = new Set<string>(brandFiles as string[]);

/**
 * Renders the supplied brand-kit logo files from /public/brand. Never redraw the logo here.
 * TODO: logo-horizontal.svg and logo-horizontal-white.svg haven't been supplied yet. Until they are,
 * the header shows the supplied HA icon next to a plain text name, and the footer uses the stacked
 * logo (`stackedFallbackHeight`). Drop the files in public/brand, add them to lib/brand-manifest.json
 * (or run `npm run brand` with the kit), and the real lockups are used automatically.
 */
export function Logo({
  variant: requestedVariant = "horizontal",
  tone = "light",
  height: requestedHeight = 40,
  priority = false,
  className = "",
  stackedFallbackHeight,
}: {
  variant?: Variant;
  tone?: Tone;
  height?: number;
  priority?: boolean;
  className?: string;
  /** If the horizontal lockup is missing, render the stacked one at this height instead. */
  stackedFallbackHeight?: number;
}) {
  const useStacked =
    requestedVariant === "horizontal" &&
    !available.has(files.horizontal[tone]) &&
    stackedFallbackHeight !== undefined &&
    available.has(files.stacked[tone]);
  const variant: Variant = useStacked ? "stacked" : requestedVariant;
  const height = useStacked && stackedFallbackHeight ? stackedFallbackHeight : requestedHeight;
  const file = files[variant][tone];

  if (available.has(file)) {
    return (
      <Image
        src={`/brand/${file}`}
        alt={business.name}
        width={Math.round(height * ratio[variant])}
        height={height}
        priority={priority}
        unoptimized
        className={className}
        style={{ height, width: "auto" }}
      />
    );
  }

  // Interim: supplied icon + text name.
  const icon = (
    <Image
      src={tone === "dark" && available.has(files.icon.dark) ? `/brand/${files.icon.dark}` : "/brand/logo-icon.svg"}
      alt=""
      width={height}
      height={height}
      priority={priority}
      unoptimized
      style={{ height, width: height }}
    />
  );
  if (variant === "icon") {
    return <span className={className} role="img" aria-label={business.name}>{icon}</span>;
  }
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {icon}
      <span
        className="font-heading font-extrabold uppercase italic leading-none tracking-wide"
        style={{ fontSize: height * 0.62 }}
      >
        <span className={tone === "dark" ? "text-white" : "text-ink"}>H A </span>
        <span className={tone === "dark" ? "text-brand-yellow" : "text-brand-green-dark"}>Motors</span>
      </span>
    </span>
  );
}
