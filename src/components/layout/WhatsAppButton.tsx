import { FaWhatsapp } from 'react-icons/fa';

/** Always-visible WhatsApp button: most South African small-business owners prefer it to forms. */
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/27678184898?text=Hi%20Coderon%2C%20I%27d%20like%20a%20quote%20for%20"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Coderon on WhatsApp (opens in a new tab)"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-[#075E54] text-3xl text-white shadow-hard transition-transform hover:-translate-y-0.5 hover:scale-105"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
