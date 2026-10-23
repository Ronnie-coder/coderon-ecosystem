import { NextResponse } from 'next/server';
import { supabase } from '@/lib/outreach/db';
import { isCronAuthorized } from '@/lib/adminAuth';
import { domainOf } from '@/lib/outreach/names';

export const maxDuration = 60;

const MODIFIERS = ['', 'Best', 'Commercial', 'Top-rated', 'Affordable', 'Emergency', 'Luxury', 'Custom', 'Local', 'Corporate'];
const NICHES = ['Solar Installers', 'Commercial Roofing', 'HVAC Contractors', 'Luxury Landscaping', 'Custom Home Builders', 'Pool Builders', 'Plumbing Contractors', 'Electrical Contractors', 'Kitchen Remodeling', 'Custom Cabinetry', 'Paving Contractors', 'Tree Removal Services', 'High-End Auto Detailing', 'Paint Protection Film', 'Marine Electronics', 'Boat Repair', 'Dental Clinics', 'Orthodontists', 'Med Spas', 'Plastic Surgeons', 'Chiropractors', 'Veterinary Clinics', 'Concierge Medicine', 'Fertility Clinics', 'Business Law Firms', 'Family Law Attorneys', 'Personal Injury Lawyers', 'CPA Firms', 'Commercial Cleaning', 'IT Managed Services', 'Security Guard Companies', 'Logistics Companies', 'Event Planners', 'Wedding Photographers', 'High-End Real Estate Brokerages', 'Property Management'];
const CITIES = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Miami, FL', 'Atlanta, GA', 'Dallas, TX', 'Seattle, WA', 'Denver, CO', 'Austin, TX', 'Boston, MA', 'Nashville, TN', 'Las Vegas, NV', 'San Diego, CA', 'London, UK', 'Manchester, UK', 'Birmingham, UK', 'Leeds, UK', 'Glasgow, UK', 'Liverpool, UK', 'Edinburgh, UK', 'Bristol, UK', 'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia', 'Perth, Australia', 'Adelaide, Australia', 'Auckland, New Zealand', 'Johannesburg, South Africa', 'Cape Town, South Africa', 'Pretoria, South Africa', 'Durban, South Africa', 'Port Elizabeth, South Africa', 'Dubai, UAE', 'Abu Dhabi, UAE', 'Toronto, Canada', 'Vancouver, Canada', 'Singapore'];

// Directory / platform listings are not the business's own website.
const SKIP_DOMAINS = /(^|\.)(facebook|instagram|linkedin|yelp|yell|linktr|linktree|google|business\.site|wa\.me|twitter|x|tiktok|youtube|houzz|angi|homeadvisor|thumbtack|bark|checkatrade|nextdoor|tripadvisor|booksy|fresha|squareup|carrd|wixsite|godaddysites)\.[a-z.]+$/i;

function countryOf(city: string): string | null {
  if (/, UK$/.test(city)) return 'United Kingdom';
  for (const c of ['South Africa', 'Australia', 'New Zealand', 'UAE', 'Canada']) if (city.endsWith(c)) return c;
  if (city === 'Singapore') return 'Singapore';
  if (/, [A-Z]{2}$/.test(city)) return 'United States';
  return null;
}

// Explore broadly, exploit what works: once a niche or country has enough sends, its
// weight follows its open+reply rate, so the hunter drifts toward markets that respond.
async function learnedWeights() {
  const { data } = await supabase.from('leads').select('niche, country, opened_at, replied_at').not('pitched_at', 'is', null).limit(5000);
  const agg = (key: 'niche' | 'country') => {
    const m = new Map<string, { sent: number; score: number }>();
    for (const r of data || []) {
      const k = r[key];
      if (!k) continue;
      const e = m.get(k) || { sent: 0, score: 0 };
      e.sent++;
      e.score += (r.opened_at ? 1 : 0) + (r.replied_at ? 5 : 0);
      m.set(k, e);
    }
    return m;
  };
  return { niche: agg('niche'), country: agg('country') };
}

function weightedPick<T>(items: T[], weight: (t: T) => number): T {
  const ws = items.map(weight);
  let r = Math.random() * ws.reduce((a, b) => a + b, 0);
  for (let i = 0; i < items.length; i++) if ((r -= ws[i]) <= 0) return items[i];
  return items[items.length - 1];
}

export async function GET(req: Request) {
  if (!isCronAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'SERPER_API_KEY missing' });

    const learned = await learnedWeights();
    // Neutral weight 1 until 15 sends; then 0.3 (dead market) up to ~3 (hot market).
    const w = (m: Map<string, { sent: number; score: number }>, k: string | null) => {
      const e = k ? m.get(k) : undefined;
      if (!e || e.sent < 15) return 1;
      return Math.min(3, 0.3 + (e.score / e.sent) * 4);
    };

    const searches = Array.from({ length: 5 }, () => {
      const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
      const niche = weightedPick(NICHES, (n) => w(learned.niche, n));
      const city = weightedPick(CITIES, (c) => w(learned.country, countryOf(c)));
      return { query: `${mod} ${niche} in ${city}`.trim(), niche, city };
    });

    const results = await Promise.all(
      searches.map((s) =>
        fetch('https://google.serper.dev/places', {
          method: 'POST',
          headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: s.query, location: s.city }),
        })
          .then((r) => r.json())
          .then((data) => ({ ...s, data }))
      )
    );

    let totalInserted = 0;
    for (const result of results) {
      if (result.data.error || !result.data.places?.length) continue;
      const validLeads = result.data.places
        .filter((place: any) => place.website && !SKIP_DOMAINS.test(domainOf(place.website) || ''))
        .map((place: any) => ({
          company_name: place.title || 'Unnamed Business',
          website: place.website,
          email: null,
          source: `Serper (${result.query})`,
          niche: result.niche,
          city: result.city,
          country: countryOf(result.city),
          lead_score: place.rating ? Math.round(place.rating * 20) : 50,
          status: 'new',
          notes: `Phone: ${place.phoneNumber || 'N/A'} | Rating: ${place.rating || 'N/A'}★${place.address ? ` | Address: ${place.address}` : ''}`,
        }));

      if (validLeads.length > 0) {
        const { data: dbData, error } = await supabase
          .from('leads')
          .upsert(validLeads, { onConflict: 'website', ignoreDuplicates: true })
          .select('id');
        if (!error && dbData) totalInserted += dbData.length;
      }
    }

    return NextResponse.json({ message: `Hunted ${totalInserted} new leads.`, searches: searches.map((s) => s.query) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to run hunter script', details: (error as Error).message });
  }
}
