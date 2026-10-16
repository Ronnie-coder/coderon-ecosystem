"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';

// Homepage entry to the free website check: sends the visitor to /website-check with their URL.
export default function CheckBand() {
  const router = useRouter();
  const [url, setUrl] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(url.trim() ? `/website-check/?url=${encodeURIComponent(url.trim())}` : '/website-check/');
  };

  return (
    <section aria-labelledby="check-band-title" className="border-y-2 border-line bg-[#16130E] text-[#F2EBDD]">
      <div className="container grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1.1fr]">
        <div data-reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#F2C230]">Free website check</p>
          <h2 id="check-band-title" className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Is your website losing you <span className="font-serif font-normal italic text-[#F2C230]">customers?</span>
          </h2>
          <p className="mt-4 max-w-lg text-lg text-[#F2EBDD]/75">
            Paste your link. In under a minute you&apos;ll see your real Google speed score, whether the site is secure, and what
            Google shows in search.
          </p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3 rounded-2xl border-2 border-[#F2EBDD] bg-[#1D1A14] p-3 shadow-[6px_6px_0_#F2C230] sm:flex-row" data-reveal>
          <label htmlFor="band-url" className="sr-only">Your website address</label>
          <input
            id="band-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            placeholder="yourbusiness.co.za"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-lg font-semibold text-[#F2EBDD] outline-none placeholder:text-[#F2EBDD]/40"
          />
          <button type="submit" className="btn border-[#F2C230] bg-[#F2C230] px-6 text-lg text-[#16130E]">
            Check it free <FiArrowRight aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
