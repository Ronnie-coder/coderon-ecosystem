import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import Link from "next/link";
import { routes } from "@/lib/site";

const input =
  "mt-1.5 block w-full min-h-12 rounded-xl border-2 border-ink/20 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/70 focus:border-brand-green-dark focus:outline-none focus-visible:outline-3 focus-visible:outline-brand-green-dark user-invalid:border-red-700";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block font-semibold">
      {children}
      {optional ? <span className="font-normal text-ink-soft"> (optional)</span> : null}
    </label>
  );
}

export function TextField({ label, id, optional, hint, ...rest }: { label: string; id: string; optional?: boolean; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label htmlFor={id} optional={optional}>{label}</Label>
      {hint && <p id={`${id}-hint`} className="text-sm text-ink-soft">{hint}</p>}
      <input id={id} name={id} required={!optional} aria-describedby={hint ? `${id}-hint` : undefined} className={input} {...rest} />
    </div>
  );
}

export function TextArea({ label, id, optional, ...rest }: { label: string; id: string; optional?: boolean } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <Label htmlFor={id} optional={optional}>{label}</Label>
      <textarea id={id} name={id} required={!optional} rows={4} className={`${input} resize-y`} {...rest} />
    </div>
  );
}

export function Select({ label, id, options, optional, ...rest }: { label: string; id: string; options: { value: string; label: string }[]; optional?: boolean } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <Label htmlFor={id} optional={optional}>{label}</Label>
      <select id={id} name={id} required={!optional} className={`${input} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2316181B%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-10`} {...rest}>
        <option value="">Choose one</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function RadioGroup({ legend, name, options, defaultValue }: { legend: string; name: string; options: { value: string; label: string }[]; defaultValue?: string }) {
  return (
    <fieldset>
      <legend className="font-semibold">{legend}</legend>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o.value} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border-2 border-ink/20 px-4 has-[:checked]:border-brand-green-dark has-[:checked]:bg-brand-green-dark/5 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-brand-green-dark">
            <input type="radio" name={name} value={o.value} required={i === 0} defaultChecked={defaultValue === o.value} className="h-5 w-5 accent-[#14612A]" />
            <span className="font-medium">{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ConsentCheckbox({ id }: { id: string }) {
  return (
    <div className="flex items-start gap-3">
      <input id={id} name={id} type="checkbox" required value="Yes" className="mt-0.5 h-6 w-6 shrink-0 accent-[#14612A]" />
      <label htmlFor={id} className="text-sm">
        I agree that H A Motors may contact me about my enquiry, per the{" "}
        <Link href={routes.privacy} className="font-semibold text-brand-green-dark underline underline-offset-2">Privacy Policy</Link>.
      </label>
    </div>
  );
}

/** Web3Forms honeypot. Hidden from people and screen readers; bots tick it. */
export function Honeypot() {
  return (
    <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" style={{ display: "none" }} />
  );
}
