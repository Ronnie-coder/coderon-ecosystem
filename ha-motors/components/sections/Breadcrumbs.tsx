import Link from "next/link";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "../JsonLd";

export function Breadcrumbs({ items, tone = "light" }: { items: { name: string; path: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className={`flex flex-wrap items-center gap-1 ${dark ? "text-white/75" : "text-ink-soft"}`}>
          <li>
            <Link href="/" className="underline-offset-2 hover:underline">Home</Link>
          </li>
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1">
              <span aria-hidden="true">/</span>
              {i === items.length - 1 ? (
                <span aria-current="page" className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{it.name}</span>
              ) : (
                <Link href={it.path} className="underline-offset-2 hover:underline">{it.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
