import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function NotFound() {
  return (
    <section className="container py-24 md:py-32">
      <p className="eyebrow">Error 404</p>
      <h1 className="h-display mt-4 max-w-[14ch]">
        This page took a <span className="accent">wrong turn.</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink/75">The link may be old, or the page has moved. These are a good place to start:</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Home <FiArrowRight aria-hidden="true" />
        </Link>
        <Link href="/services/" className="btn-ghost">Services</Link>
        <Link href="/contact/" className="btn-ghost">Get a free quote</Link>
      </div>
    </section>
  );
}
