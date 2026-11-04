# H A Motors website

Mobile motorcycle, scooter and quad bike mechanic + delivery scooter rental in Bloemfontein.
Next.js (App Router, TypeScript strict), Tailwind CSS v4, deployed on Vercel. No CMS, no database, no backend:
content lives in typed TS files and forms post straight to Web3Forms.

> Home repo: `Ronnie-coder/ha-motors` (this folder is the repo root). An earlier copy also lives in the
> `ha-motors/` folder of `coderon-ecosystem`; treat the `ha-motors` repo as the source of truth.
> Google Business Profile copy, ready to paste: [`docs/google-business-profile.md`](docs/google-business-profile.md).

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Runs the photo pipeline (`prebuild`), then the production build |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript checks |
| `npm run images` | Process photos in `images-src/` into `public/images/` (also runs automatically before every build) |
| `npm run brand` | Import the `ha-motors-brand/` kit (see "Logo" below) |

Requires Node 22.18+ (the scripts in `scripts/` are plain TypeScript run directly by Node).

## Environment variables

| Name | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | No, but forms only email once it's set | Free key from web3forms.com. It's public by design (it only allows sending to the inbox it was created for). Without it, forms show a "Send on WhatsApp instead" button carrying the visitor's details, so no lead is lost. |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | The live URL with no trailing slash. For now the production `*.vercel.app` URL, later `https://hamotors.co.za`. Every canonical, sitemap, robots, Open Graph and JSON-LD URL comes from this one value. If it's empty, Vercel's own production URL is used as a fallback. |
| `NEXT_PUBLIC_GA_ID` | No | GA4 measurement ID (`G-XXXXXXX`). Only loads after a visitor accepts analytics cookies. Leave empty to run with no analytics at all. |

Set them in Vercel under **Project → Settings → Environment Variables** (Production and Preview), then redeploy. `NEXT_PUBLIC_*` values are baked in at build time, so a change always needs a redeploy.

### Getting the free Web3Forms key

1. Go to https://web3forms.com and enter **haringwiadrich@gmail.com** under "Create your Access Key".
2. The key arrives in that Gmail inbox. Copy it.
3. Add it in Vercel as `NEXT_PUBLIC_WEB3FORMS_KEY` (Production + Preview) and redeploy.
4. Send a test enquiry from the live site. It lands in Gmail as "New repair quote request - H A Motors" or "New scooter rental enquiry - H A Motors", from "H A Motors Website". Mark the first one "Not spam" if Gmail filters it.

Spam protection is Web3Forms' built-in honeypot (`botcheck`). No CAPTCHA.

## Pages

| Route | What it's for |
|---|---|
| `/` | Home: overview, trust facts, services, rental, how it works, recent work, about teaser, FAQ |
| `/repairs` | All repairs: vehicle picker, the four services in plain language, call-out vs drop-off |
| `/motorcycle-repairs-bloemfontein`, `/scooter-repairs-bloemfontein`, `/quad-bike-repairs-bloemfontein` | One page per vehicle type (local SEO) with a quote form |
| `/scooter-rental-bloemfontein` | Rental: price, what's included, 3 steps, specs, requirements, enquiry form |
| `/gallery` | All work photos with filters (motorcycles, scooters, quads, rental) and a lightbox |
| `/about` | Adrich's story, how Adrich works, strengths |
| `/faq` | Every question, grouped by topic (also FAQPage schema) |
| `/contact` | WhatsApp, call, email, quote form, hours |
| `/rental-terms`, `/privacy-policy`, `/cookie-policy` | Legal |

## Motion and accessibility

- **Header scooter** (`components/ScrollRider.tsx`): rides along the bottom of the header as you scroll (a reading-progress bar).
- **Scroll reveals and parallax** (`components/motion/Motion.tsx`): add `data-reveal` (optionally `="left" | "right" | "zoom"` and `data-reveal-delay="120"`) to any element, or `data-parallax="0.15"` to a decorative layer.
- Everything respects **prefers-reduced-motion**: no reveals, no parallax, no marquee scrolling, no spinning wheels.
- Content is only hidden for reveal once JavaScript is running, so nothing disappears without JS.
- Checked with axe-core (WCAG 2.1 A/AA + best practice) on every page at desktop and mobile sizes: 0 violations. Keep it that way: contrast AA, labelled controls, one H1 per page, 44px tap targets.

## Editing business info

Everything (phone, email, hours, services, rental price, specs, the About text, reviews, Google review link) lives in **`lib/business.ts`**. Pages, footer, forms, WhatsApp messages and schema all read from it. Change it there and redeploy.

- **Email:** change `email` to `adrich@hamotors.co.za` once that mailbox exists.
- **About Adrich:** replace the `about` array with 2 to 4 short paragraphs in Adrich's own words.
- **Rental specs:** fill in the `null` values in `rental.specs` once confirmed. `null` shows as "To be confirmed".
- **FAQs:** `lib/content/faqs.ts`. Service-page copy lives in each page file under `app/`.

## Adding photos

1. Put the original photos in `ha-motors/images-src/` (create the folder), named exactly as in the table below (`.jpg`, `.jpeg`, `.png`, `.webp` or `.heic` are fine).
2. Run `npm run images` (or just `npm run build`).
3. Commit `public/images/*` and `lib/photo-manifest.json`. **Don't commit `images-src/`**: it's git-ignored because originals can carry GPS location data.

The pipeline (`scripts/optimize-images.ts`) auto-rotates from EXIF, **strips all EXIF/GPS/XMP metadata**, caps width at 1280px (never upscales), and writes a `.jpg` + `.webp` pair. It also re-checks every file already in `public/images/` on each build and strips any metadata it finds. Any photo not yet added shows a branded "Photo coming soon" frame, so the site never breaks.

| File name | Used on |
|---|---|
| `adrich-bmw-workshop` | Home hero |
| `adrich-kawasaki-ninja` | About |
| `carburettor-rebuild` | Motorcycle page hero, home card, gallery |
| `motorcycle-wiring-repair` | Motorcycle page (electrical), gallery |
| `cylinder-head-removed`, `piston-new-gasket`, `oil-seal-replacement` | Motorcycle page (engine), gallery |
| `honda-delivery-bike-teardown` | Motorcycle "Delivery riders" block, rental page, gallery |
| `scooter-stripped`, `scooter-reassembly` | Scooter page "Work in progress" pair, gallery |
| `honda-scooter-finished` | Scooter page hero, home card, gallery |
| `quad-front-teardown` | Quad page hero, home card, gallery |
| `utility-quad-workshop`, `yamaha-quad` | Quad page, gallery |
| `sym-jet14-front`, `sym-jet14-side` | Rental page, home rental band |

Alt text and captions are in `lib/photos.ts`.

## Logo

`components/Logo.tsx` renders the supplied brand-kit files from `public/brand/` and never redraws the logo. The web icons (favicon, `icon.svg`, apple icon, 192/512 icons, Open Graph image) are in place.

All six lockups are in `public/brand/` (horizontal, stacked and icon, each in a light and dark version) and listed in
`lib/brand-manifest.json`. To replace a logo, overwrite the SVG with the same file name and redeploy.

## Reviews

Add **real** reviews only to `reviews` in `lib/business.ts` (`name`, `text`, optional `rating`, `source`). While the list is empty, no testimonials are shown. Once `googleReviewUrl` is set, a small "Worked with us? Leave us a Google review" link appears. Never invent or paraphrase reviews, and don't add `aggregateRating` to the schema until real reviews exist.

## Cookies, analytics and privacy

- Custom consent banner (Accept all / Reject non-essential / Manage preferences, equal weight), stored in the first-party cookie `ha_consent` for 12 months with a policy version. Bump `CONSENT_POLICY_VERSION` in `components/consent/ConsentProvider.tsx` to ask everyone again after a policy change.
- Google Consent Mode v2 defaults to `denied`. GA4 is only requested after analytics consent. Events tracked: `whatsapp_click`, `phone_click`, `generate_lead` (params `page`, `intent` = `repair` | `rental`).
- `useConsent()` is exported from `components/consent/ConsentProvider.tsx` for any future script.
- The privacy policy (POPIA), cookie policy and rental terms are at `/privacy-policy`, `/cookie-policy` and `/rental-terms`. The owner should review them.

## Deploying on Vercel

The Vercel project deploys from this GitHub repo (`Ronnie-coder/ha-motors`). Framework Next.js, Node 24.x, Root Directory: repo root.

- **Live site:** https://ha-motors-eight.vercel.app (this is the `NEXT_PUBLIC_SITE_URL` and the link for Google Business Profile).
- **`main` = production.** Every push to `main` goes live on the production URL.
- **Any other branch = preview.** Push work to a branch (e.g. `develop`) to get a preview URL; merge to `main` when approved.
- Previews are behind Vercel login (Deployment Protection). Use **Share** on a deployment to send a time-limited link.
- `NEXT_PUBLIC_SITE_URL` must be the production URL (set under Settings → Environment Variables), then redeploy.

## Switching to hamotors.co.za later

1. Buy `hamotors.co.za`. In Vercel → Project → Settings → **Domains**, add `hamotors.co.za` and `www.hamotors.co.za`, and set `www` to **redirect** (308) to the apex.
2. At the registrar, set the DNS records Vercel shows (usually an `A` record for the apex pointing at Vercel's IP and a `CNAME` for `www` → `cname.vercel-dns.com`). Wait for Vercel to show "Valid Configuration".
3. Change `NEXT_PUBLIC_SITE_URL` to `https://hamotors.co.za` (Production) and **redeploy**.
4. Make the old `*.vercel.app` production URL **301-redirect** to the new domain: in Settings → Domains, edit the `….vercel.app` domain and set it to redirect to `hamotors.co.za` (permanent).
5. Update the website link on the Google Business Profile to `https://hamotors.co.za/?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
6. In Google Search Console, add `hamotors.co.za` as a property (DNS verification), submit `https://hamotors.co.za/sitemap.xml`, and use **Change of address** from the old property if it was verified.
7. Optional: create `adrich@hamotors.co.za` on Zoho Mail's free plan (add its MX/SPF/DKIM records at the registrar), then change `email` in `lib/business.ts`, re-create the Web3Forms key for the new address if wanted, and redeploy.

## Google Business Profile checklist

- [ ] Business name: **H A Motors** (exactly, no keywords added)
- [ ] Primary category: **Motorcycle repair shop**. Additional categories: **Scooter repair shop**, **Motorcycle rental agency**
- [ ] Set up as a **service-area business** and **hide the address** (Adrich works from home and does call-outs)
- [ ] Service area: **Bloemfontein**
- [ ] Phone: **061 104 3739** (same as the site)
- [ ] Hours: **Sat and Sun 08:00 to 17:00**. Mon to Fri: leave closed and say "by appointment" in the description (or use "Online service hours" / more hours if available)
- [ ] Website: the production `*.vercel.app` URL for now (the domain later), with `?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- [ ] Upload the same real photos as the website (cover: Adrich on the bike; then work photos and the SYM Jet 14 rental scooters)
- [ ] Add services: services and maintenance, electrical fault finding, engine repairs (top-end, carburettor, seals and gaskets), tyres, scooter rental R550/week
- [ ] Once verified: copy the "Ask for reviews" link into `googleReviewUrl` in `lib/business.ts`, add the profile URL to `sameAs`, redeploy, and share the review link with every happy customer

## Project structure

```
app/                     routes, metadata, sitemap.ts, robots.ts, manifest.ts, icons
components/
  sections/              page sections (FAQ, gallery, service page template, CTA bands, ...)
  ui/                    buttons, icons, photo card, layout primitives
  forms/                 Web3Forms enquiry form, quote + rental forms
  consent/               cookie banner, preferences dialog, consent provider + useConsent()
lib/
  business.ts            ALL business facts
  site.ts                site URL + routes
  schema.ts              JSON-LD (MotorcycleRepair, FAQPage, BreadcrumbList)
  photos.ts              photo registry (alt text, captions)
  content/faqs.ts        FAQ copy
scripts/                 optimize-images.ts, import-brand.ts
```
