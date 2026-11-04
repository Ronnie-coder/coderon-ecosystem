# Google Business Profile setup pack: H A Motors

Everything to paste in when creating the profile at https://business.google.com.
Sign in with **haringwiadrich@gmail.com** (Adrich's Gmail) so Adrich owns the profile. You can then add yourself
(Coderon) as a **Manager** under *Business Profile settings → People and access*.

Keep every detail **identical** to the website (name, phone, hours). Google cross-checks them.

## 1. Basics

| Field | Enter |
|---|---|
| Business name | `H A Motors` (exactly this, no extra keywords) |
| Primary category | `Motorcycle repair shop` |
| Additional categories | `Scooter repair shop`, `Motorcycle rental agency` |
| Do you have a location customers can visit? | **No**. It's a service-area business, so the address stays hidden. Google still asks for an address privately for verification; it isn't shown publicly. |
| Service area | `Bloemfontein` (add `Mangaung` too if offered) |
| Phone | `061 104 3739` |
| Website | Live site URL + tracking, e.g. `https://ha-motors-eight.vercel.app/?utm_source=google&utm_medium=organic&utm_campaign=gbp` (change it to `https://hamotors.co.za/?utm_source=google&utm_medium=organic&utm_campaign=gbp` after the domain switch) |

## 2. Hours

| Day | Hours |
|---|---|
| Saturday | 08:00 to 17:00 |
| Sunday | 08:00 to 17:00 |
| Monday to Friday | Closed (the description says "weekdays by appointment") |

## 3. Business description (under 750 characters, no links)

> H A Motors is a mobile motorcycle, scooter and quad bike mechanic in Bloemfontein. Adrich has been fixing bikes since 2017 and comes to you anywhere in Bloem for services, electrical fault finding, engine repairs (top-end and carburettor rebuilds, seals and gaskets) and tyres. All brands, including Honda, Big Boy, Suzuki and Lifan, and dead bikes brought back to life. Quotes upfront, with the call-out fee included. Open Saturday and Sunday 08:00 to 17:00, weekdays by appointment. We also rent SYM Jet 14 200 delivery scooters for R550 per week, with maintenance and servicing included and insured. WhatsApp us a photo of your bike for a quote.

## 4. Services (Edit profile → Services)

Add each one under the matching category. Leave price blank for repairs (quote only).

**Motorcycle repair shop**
- **Services and maintenance:** oil, filters, plugs, chains, brakes and a full check. All brands.
- **Electrical fault finding and repairs:** won't start, flat battery, no lights, charging faults.
- **Engine repairs:** top-end rebuilds, carburettor rebuilds, seals and gaskets.
- **Tyres:** tyre changes and checks.
- **Mobile call-outs:** anywhere in Bloemfontein. The call-out fee depends on distance and is included in the quote.

**Scooter repair shop**
- **Scooter repairs and services:** all brands, commuter and delivery scooters.

**Motorcycle rental agency**
- **Scooter rental, SYM Jet 14 200:** R550 per week. Maintenance and servicing included, insured. Needs a valid ID, driver's licence and proof of address.

## 5. Photos (upload in this order)

1. **Logo:** `public/icon-512.png` from the site
2. **Cover:** Adrich on a bike (`adrich-bmw-workshop`)
3. Work photos: carburettor rebuild, wiring repair, cylinder head off, new head gasket, oil seal, scooter strip-down and reassembly, quad front end, delivery bike
4. Rental scooters: SYM Jet 14 front and side

Use the same edited photos as the website, with plates removed.

## 6. Verification

Google will ask Adrich to verify, usually with a short video showing the tools, a bike being worked on, and something that proves the business, such as the branded flyer. Follow the prompts in the app. Verification can take a few days.

## 7. After verification

1. In the profile, tap **Ask for reviews** and copy the link.
2. Paste it into `googleReviewUrl` in `lib/business.ts`, and paste the profile's public URL into `sameAs`. Redeploy. The site then shows "Worked with us? Leave us a Google review".
3. Send the review link to every happy customer. A WhatsApp message Adrich can copy:

> Thanks for choosing H A Motors! 🏍️ If you're happy with the job, a quick Google review would really help me grow: [review link]. Takes 30 seconds. Thanks!

4. Post an update every couple of weeks (a finished job photo, or "2 rental scooters available this week").
