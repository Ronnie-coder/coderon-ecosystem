import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsLink } from "@/components/consent/CookieSettingsLink";
import { LegalPage } from "@/components/sections/LegalPage";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Which cookies the H A Motors website uses, why, and how to change your choice.",
  alternates: { canonical: routes.cookies },
};

const th = "border-b-2 border-ink/20 px-3 py-2 text-left font-semibold";
const td = "border-b border-ink/10 px-3 py-2 align-top";

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie policy" path={routes.cookies} updated="31 October 2026">
      <p>
        Cookies are small text files a website stores in your browser. We keep them to a minimum, and nothing non-essential runs
        until you say yes.
      </p>

      <h2>Cookies we use</h2>
      <div className="not-prose mt-4 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          <caption className="sr-only">Cookies used on this website</caption>
          <thead>
            <tr>
              <th scope="col" className={th}>Cookie</th>
              <th scope="col" className={th}>Category</th>
              <th scope="col" className={th}>Purpose</th>
              <th scope="col" className={th}>Lasts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={td}><code>ha_consent</code></td>
              <td className={td}>Strictly necessary</td>
              <td className={td}>Remembers your cookie choice and the policy version you agreed to.</td>
              <td className={td}>12 months</td>
            </tr>
            <tr>
              <td className={td}><code>_ga</code>, <code>_ga_*</code></td>
              <td className={td}>Analytics (only with consent)</td>
              <td className={td}>Google Analytics 4: counts visits and which pages and buttons are used, so we can improve the site.</td>
              <td className={td}>Up to 2 years</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Marketing:</strong> we don&apos;t use marketing or advertising cookies. The option is in the settings in case
        that changes, and we&apos;d ask you again first.
      </p>

      <h2>Google Consent Mode</h2>
      <p>
        We use Google Consent Mode v2. Until you accept analytics, all Google storage is set to &quot;denied&quot; and the Google
        Analytics script is not loaded at all.
      </p>

      <h2>Changing your mind</h2>
      <p>
        You can change your choice at any time:{" "}
        <CookieSettingsLink className="font-semibold text-brand-green-dark underline underline-offset-2" />. You&apos;ll find the
        same link in the footer of every page. If we change this policy in a meaningful way, we&apos;ll ask you again.
      </p>
      <p>
        More about how we handle personal information is in our <Link href={routes.privacy}>privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
