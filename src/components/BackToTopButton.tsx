"use client";

import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[88px] right-6 z-40 grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-gold text-xl text-[#16130E] shadow-hard transition-all duration-200 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <FiArrowUp aria-hidden="true" />
    </button>
  );
};
