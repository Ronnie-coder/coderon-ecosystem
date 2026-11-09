# Coderon Outreach Engine

The outreach engine finds businesses whose websites have a **real, checkable problem**. It drafts an honest one-to-one email about that problem, delivers it in the business's **local morning**, follows up twice, and tracks every reply. Ronnie reviews and approves every pitch in the dashboard at **coderon.co.za/admin/leads**.

> One rule runs through the whole system: **never claim anything that isn't verified.**
> No rankings promised, no made-up problems, nothing generic.

---

## 1. How it works, end to end

```
 ┌───────────┐   ┌──────────────────┐   ┌──────────────┐   ┌──────────────────────┐
 │ 1. Hunter │ → │ 2. Verify        │ → │ 3. Queue     │ → │ 4. Ronnie reviews    │
 │ finds     │   │ checks each site │   │ only leads   │   │ and clicks Send      │
 │ businesses│   │ twice; no issue  │   │ with a fresh │   │ (or Skip / Not a fit │
 │ on Google │   │ = deleted        │   │ verified     │   │  / Bad email)        │
 └───────────┘   └──────────────────┘   │ issue + email│   └──────────┬───────────┘
                                        └──────────────┘              ↓
 ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────────┐
 │ 7. Daily digest      │ ← │ 6. Follow-ups        │ ← │ 5. Delivered in the      │
 │ email to Ronnie      │   │ day 3 and day 7,     │   │ lead's weekday morning,  │
 │ (queue, opens,       │   │ also in their        │   │ 08:00–10:00 their time   │
 │ replies, budget)     │   │ morning; cancelled   │   │ (Resend schedules it)    │
 └──────────────────────┘   │ when they reply      │   └──────────────────────────┘
                            └──────────────────────┘
        Opens, clicks, bounces → Resend webhook → shown on each lead in the dashboard
```

### Step by step

1. **Hunter**: `src/app/api/hunter/route.ts`
   - Searches Google Places (through Serper) for service businesses, combining a niche (roofers, dentists, law firms…) with a city (Cape Town, London, San Diego…).
   - Keeps only businesses with their own website. Directory listings like Facebook or Yelp are skipped, and so are businesses already saved under any form of their URL.
   - Learns over time: niches and countries that open and reply get searched more often.

2. **Verify**: `src/app/api/enrich/route.ts` and `src/lib/outreach/audit.ts`. Each website is checked for four issues the owner can verify themselves:

   | Issue | How it's confirmed before it can be claimed |
   |---|---|
   | **"Not secure" (no working HTTPS)** | The https version is tried **twice** and fails both times, while the http version works. |
   | **Slow on mobile** | Google PageSpeed (mobile) scores under 50 on **two separate runs**. The better score is quoted. |
   | **Not mobile-friendly** | The page has no mobile viewport tag, read from the real page HTML. |
   | **Missing in Google search** | No page title or meta description, read from the real page HTML. |

   - **Email:** taken from the business's own site (contact and about pages included), filtered for junk, and its domain must accept mail (an MX record check).
   - **Delete rule:** if a never-contacted lead has **no verified issue**, or its site won't load so nothing can be confirmed, **it is deleted.** Only leads with verified issues stay in the database.
   - **Freshness rule:** a check is trusted for **14 days**. Pitch-ready leads are re-checked 4 days before that, and if the business has since fixed the problem, the lead is deleted.
   - Observations that aren't strong enough to claim (no analytics, PageSpeed disagreeing between runs) become **Loom notes** only. They never appear in an email.

3. **Queue**: `/api/outreach/queue`
   - Holds only leads with a verified issue, a verified email and a check from the last 14 days.
   - **One card per business**: no repeat email (any letter case) and no repeat website domain.
   - Ordered by opportunity score: issue severity, plus good Google reviews, plus an on-domain email.

4. **Review and send**: `/admin/leads` and `/api/pitch`
   - The card shows the business, the verified issues with links to check them yourself, the exact email, and **when it will land**.
   - **Send** claims the lead first, so a double click can't send twice.
   - The email is refused if the check is older than 14 days, or if the email or website was pitched before.

5. **Local-morning delivery**: `src/lib/outreach/sendTime.ts`
   - The lead's city (or country) gives their time zone.
   - If it's a weekday 08:00–10:00 there, the email goes now. Otherwise Resend delivers it on the next weekday morning, at a random minute between 08:05 and 09:35.

6. **Follow-ups**: `src/app/api/followup/route.ts`
   - Follow-up 1 on day 3, follow-up 2 on day 7, counted from when the pitch landed.
   - Each is delivered in the lead's morning, as a reply in the same email thread.
   - Each has a one-week window, so nobody gets a follow-up weeks late.
   - Marking a lead *Replied, Call, Won, Lost, Bad email, Not a fit* or *Skip* cancels anything still scheduled for them.

7. **Tracking and digest**
   - Resend reports delivered, opened, clicked and bounced events to `/api/webhooks/resend/`, and they show on each lead's timeline in the **Sent** tab.
   - Replies arrive in ronnie@coderon.co.za. Mark them in the dashboard.
   - A daily digest email summarises the queue, checks, opens, replies and email budget.

---

## 2. Where everything runs

| Part | Where | Cost |
|---|---|---|
| Website and dashboard | Netlify (Next.js 16) | Free plan |
| Database | Supabase: `leads` and `email_events` tables | Free plan |
| Scheduled jobs (hunter, verify, follow-ups) | GitHub Actions: `.github/workflows/outreach-jobs.yml` | Free minutes |
| Email sending and scheduling | Resend: pitches from ronnie@coderon.co.za | Free: 100 a day, 3,000 a month |
| Lead search | Serper (Google Places) | Free credits |
| Speed checks | Google PageSpeed Insights API | Free |
| CRM mirror (optional) | Notion "Coderon — Outreach" database | Free |

**Job schedule** (South Africa time; GitHub may start runs a few hours late):

| Job | When | What it does |
|---|---|---|
| Hunter | 03:07 daily | Five searches, adds new businesses |
| Verify | 04:47 and 12:47 | Up to 48 leads per run: re-checks first, then new leads; deletes leads with no issue |
| Follow-ups and digest | 07:13 daily | Schedules follow-ups due in the next 24 hours, then emails the digest |

You can run any job by hand: **GitHub → Actions → Outreach jobs → Run workflow**. Each run's log shows exactly what it did, for example who was checked, deleted or followed up, and who is up next.

**Secrets:**
- GitHub repository secrets: Supabase URL and service key, Serper, PageSpeed, Resend (both keys), Notion.
- Netlify environment variables: the same, plus the admin password, the Resend webhook secret and the Supabase anon key.

---

## 3. Daily operation (Ronnie)

- **Sending days:** two cold-email sessions a week, for example Tuesday and Thursday.
- **Per session:** 15 pitches for the first two weeks, then up to 20–25 if bounces stay under 2% and nobody marks you as spam.
- Each pitch can trigger 2 follow-ups, so 15 pitches turns into about 45 emails over the following week, sent automatically.

**For each card (about 1 minute):**
1. Click the site link or **"Try https ↗"** and confirm the issue yourself.
2. Check the **To:** line. "on-domain" is the safest.
3. Send, or Skip / Not a fit / Bad email.

**When someone replies:**
1. Mark them **Replied**.
2. Record the free 60-second Loom using the card's Loom notes.
3. Book the call (**Call**), and mark **Won** with the amount when they pay.

**Leads that opened several times but never replied** (e.g. opened ×3) are warm. Call or WhatsApp them using the phone number on the card. Don't email them a fourth time.

---

## 4. How it was built (case study)

**Problem:** cold outreach tools blast generic emails. Small-business owners delete them, and sending domains get burned.

**Approach:** evidence-first outreach. Every email names one specific, verifiable problem on the business's own website, written so the owner can check it in ten seconds. A human approves every send.

**Engineering highlights:**
- **Verification pipeline:** double checks for HTTPS and speed, an MX-checked email, a 14-day freshness rule, and automatic deletion of anything unverifiable.
- **Deliverability by design:** plain-text-first emails, a real one-to-one sender, an opt-out line, a company registration footer, local-morning delivery, threaded follow-ups, a daily email cap, and cancellation on reply.
- **Cost engineering:** the site hit Vercel's free CPU limit. Profiling found an email-scanning pattern whose run time grew with the square of the page size (seconds of CPU per page). It was rewritten to run linearly (about 100× faster in testing), and all background work moved to GitHub Actions. The whole system runs on free tiers.
- **Safety:** one business, one pitch (an atomic claim plus email and domain checks), admin-only APIs with constant-time session checks, and secrets kept out of the repository.
- **Learning loop:** opens and replies by niche, country and issue feed back into what the hunter searches for next.

**Stack:** Next.js 16 (App Router), TypeScript, Supabase (Postgres), Resend, GitHub Actions, Netlify, Google PageSpeed API, Serper.

---

## 5. Can it be sold?

Yes, in three realistic ways, from easiest to hardest:

1. **As proof (now):** a case study on coderon.co.za showing how Coderon builds real systems, not just websites. It's the best evidence for custom-software clients.
2. **As a done-for-you service:** run it for other web designers or agencies. "We find 50 local businesses a month with verified website problems and send them honest pitches from your name." Charge monthly (for example R1,500–R3,000), using their domain and their review.
3. **As software (later):** a SaaS for freelancers and agencies. This market is crowded (Apollo, Instantly, Lemlist), so the angle would be "verified website issues", not "more emails". It needs per-user accounts, billing and each user's own sending domain first.

---

## 6. Ideas for later

- **A separate sending domain** for cold email (for example coderon-mail.co.za), so the main domain's reputation is never at risk as volume grows.
- **Reply detection:** read the inbox (Zoho or Gmail) and mark leads Replied automatically.
- **Auto-pause:** stop sending if bounces pass 3% in a day.
- **Loom helper:** a one-click checklist page per lead for recording the video.
- **A second offer:** a custom-software pitch for businesses with manual processes, measured separately.
- **Public holidays:** skip local holidays when scheduling (weekends are already skipped).
