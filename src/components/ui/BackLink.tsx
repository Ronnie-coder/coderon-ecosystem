import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

/** "← Back to …" pill at the top of inner pages. */
export default function BackLink({ href, label, className = '' }: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border border-line bg-card py-1.5 pl-2.5 pr-3.5 text-sm font-medium text-ink/75 shadow-soft transition-colors hover:border-ink/25 hover:text-ink ${className}`}
    >
      <FiArrowLeft aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
      {label}
    </Link>
  );
}

/** End of an inner page: back to its section, or on to the next page in it. No dead ends. */
export function PageEndNav({
  back,
  next,
}: {
  back: { href: string; label: string };
  next?: { href: string; label: string; title: string };
}) {
  return (
    <nav aria-label="Keep exploring" className="container flex flex-wrap items-center justify-between gap-6 border-t border-line py-10">
      <BackLink href={back.href} label={back.label} />
      {next && (
        <Link href={next.href} className="group ml-auto flex items-center gap-4 text-right">
          <span>
            <span className="block text-sm text-ink/60">{next.label}</span>
            <span className="block text-xl font-semibold tracking-tight transition-colors group-hover:text-gold-text">{next.title}</span>
          </span>
          <span aria-hidden="true" className="btn-icon transition-transform group-hover:translate-x-0.5">
            <FiArrowRight />
          </span>
        </Link>
      )}
    </nav>
  );
}
