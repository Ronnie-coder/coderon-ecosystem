import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const maxDuration = 60;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'SERPER_API_KEY missing' });

    const modifiers = ['', 'Best', 'Commercial', 'Top-rated', 'Affordable', 'Emergency', 'Luxury', 'Custom', 'Local', 'Corporate'];
    const niches = ['Solar Installers', 'Commercial Roofing', 'HVAC Contractors', 'Luxury Landscaping', 'Custom Home Builders', 'Pool Builders', 'Plumbing Contractors', 'Electrical Contractors', 'Kitchen Remodeling', 'Custom Cabinetry', 'Paving Contractors', 'Tree Removal Services', 'High-End Auto Detailing', 'Paint Protection Film', 'Marine Electronics', 'Boat Repair', 'Dental Clinics', 'Orthodontists', 'Med Spas', 'Plastic Surgeons', 'Chiropractors', 'Veterinary Clinics', 'Concierge Medicine', 'Fertility Clinics', 'Business Law Firms', 'Family Law Attorneys', 'Personal Injury Lawyers', 'CPA Firms', 'Commercial Cleaning', 'IT Managed Services', 'Security Guard Companies', 'Logistics Companies', 'Event Planners', 'Wedding Photographers', 'High-End Real Estate Brokerages', 'Property Management'];
    const cities = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Miami, FL', 'Atlanta, GA', 'Dallas, TX', 'Seattle, WA', 'Denver, CO', 'Austin, TX', 'Boston, MA', 'Nashville, TN', 'Las Vegas, NV', 'San Diego, CA', 'London, UK', 'Manchester, UK', 'Birmingham, UK', 'Leeds, UK', 'Glasgow, UK', 'Liverpool, UK', 'Edinburgh, UK', 'Bristol, UK', 'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia', 'Perth, Australia', 'Adelaide, Australia', 'Auckland, New Zealand', 'Johannesburg, South Africa', 'Cape Town, South Africa', 'Pretoria, South Africa', 'Durban, South Africa', 'Port Elizabeth, South Africa', 'Dubai, UAE', 'Abu Dhabi, UAE', 'Toronto, Canada', 'Vancouver, Canada', 'Singapore'];

    // Generate 5 unique search pairs for batching
    const searches = Array.from({ length: 5 }, () => {
      const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
      const niche = niches[Math.floor(Math.random() * niches.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      return { query: `${mod} ${niche} in ${city}`.trim(), location: city };
    });

    console.log(`🐺 Coderon Hunter: Executing batch search for 5 markets...`);

    const results = await Promise.all(searches.map(({ query, location }) =>
      fetch('https://google.serper.dev/places', {
        method: 'POST',
        headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: query, location }),
      }).then(r => r.json()).then(data => ({ query, data }))
    ));

    let totalInserted = 0;

    for (const result of results) {
      if (result.data.error || !result.data.places?.length) continue;

      // Filter out leads without websites immediately
      const validLeads = result.data.places
        .filter((place: any) => place.website)
        .map((place: any) => ({
          company_name: place.title || 'Unnamed Business',
          website: place.website,
          email: null,
          source: `Serper (${result.query})`,
          lead_score: place.rating ? Math.round(place.rating * 20) : 50,
          status: 'new',
          notes: `Phone: ${place.phoneNumber || 'N/A'} | Rating: ${place.rating || 'N/A'}★`
        }));

      if (validLeads.length > 0) {
        // Upsert prevents duplicate websites from entering the database
        const { data: dbData, error } = await supabase
          .from('leads')
          .upsert(validLeads, { onConflict: 'website', ignoreDuplicates: true })
          .select();
        
        if (!error && dbData) totalInserted += dbData.length;
      }
    }

    return NextResponse.json({ message: `Successfully hunted and saved ${totalInserted} new leads across 5 markets.` });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to run hunter script', details: error.message });
  }
}