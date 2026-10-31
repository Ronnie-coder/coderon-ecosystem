"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { business } from "@/lib/business";
import { formToWhatsApp, rentalLink, repairLink } from "@/lib/whatsapp";
import { Icon } from "../ui/Icon";
import { btnClass } from "../ui/Button";
import { Honeypot } from "./Fields";

const ENDPOINT = "https://api.web3forms.com/submit";
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() || "";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Posts straight from the browser to Web3Forms (no backend). If the key is missing or the request
 * fails, the visitor gets a WhatsApp button carrying everything they typed, so a lead is never lost.
 */
export function EnquiryForm({
  intent,
  subject,
  labels,
  whatsappIntro,
  submitLabel,
  children,
}: {
  intent: "repair" | "rental";
  subject: string;
  /** form field name -> human label, in the order they should appear in the email/WhatsApp */
  labels: Record<string, string>;
  whatsappIntro: string;
  submitLabel: string;
  children: ReactNode;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [fallbackHref, setFallbackHref] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const headingId = useId();

  const chatHref = intent === "rental" ? rentalLink : repairLink();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot ticked: silently drop

    const readable: Record<string, string> = {};
    for (const [name, label] of Object.entries(labels)) {
      const v = data.get(name);
      if (typeof v === "string" && v.trim()) readable[label] = v.trim();
    }
    setFallbackHref(formToWhatsApp(whatsappIntro, readable));
    setStatus("sending");

    try {
      if (!KEY) throw new Error("Form key not configured");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: KEY,
          subject,
          from_name: "H A Motors Website",
          botcheck: false,
          page: window.location.pathname,
          ...readable,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("Send failed");
      setStatus("success");
      track("generate_lead", intent);
      form.reset();
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl border-2 border-brand-green-dark bg-brand-green-dark/5 p-6 outline-none">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-green-dark text-white">
            <Icon name="check" className="h-6 w-6" />
          </span>
          <p className="font-heading text-2xl font-bold uppercase">Thanks, it&apos;s sent!</p>
        </div>
        <p className="mt-3">
          {business.owner} will get back to you soon. Weekends are quickest; weekdays are by appointment.
        </p>
        <p className="mt-4 font-semibold">Prefer WhatsApp?</p>
        <a href={chatHref} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", intent)} className={btnClass("green", "mt-2")}>
          <Icon name="whatsapp" className="h-5 w-5" /> Chat now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} aria-labelledby={headingId} className="space-y-5">
      <h3 id={headingId} className="sr-only">{submitLabel}</h3>
      <Honeypot />
      {children}

      {status === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-2xl border-2 border-brand-yellow bg-brand-yellow/15 p-5 outline-none">
          <p className="font-bold">Sorry, the form didn&apos;t go through.</p>
          <p className="mt-1 text-sm">No stress. Send the same details on WhatsApp instead, they&apos;re already filled in for you.</p>
          <a
            href={fallbackHref || chatHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", intent)}
            className={btnClass("green", "mt-3 w-full text-lg")}
          >
            <Icon name="whatsapp" className="h-6 w-6" /> Send on WhatsApp instead
          </a>
        </div>
      )}

      <button type="submit" disabled={status === "sending"} className={btnClass("yellow", "w-full text-lg disabled:opacity-70")}>
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
      <p className="text-center text-sm text-ink-soft">
        Or WhatsApp{" "}
        <a href={chatHref} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", intent)} className="font-semibold text-brand-green-dark underline underline-offset-2">
          {business.phone.local}
        </a>
      </p>
    </form>
  );
}
