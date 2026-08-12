import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 🚀 VERCEL CONFIGURATION: FORCE 60 SECOND MAX DURATION
export const maxDuration = 60;

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const apiKey = process.env.SERPER_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'SERPER_API_KEY is missing from .env.local' });
    }

    // 🌍 1. THE GLOBAL MATRIX
    const niches = [
      'Solar Installers', 'Commercial Roofing', 'HVAC Contractors', 
      'Luxury Landscaping', 'Dental Clinics', 'Business Law Firms', 'High-End Auto Detailing'
    ];
    const cities = [
      'London, UK', 'Manchester, UK', 'New York, NY', 'Los Angeles, CA', 
      'Toronto, Canada', 'Sydney, Australia', 'Melbourne, Australia', 
      'Dubai, UAE', 'Johannesburg, South Africa', 'Cape Town, South Africa'
    ];

    const randomNiche = niches[Math.floor(Math.random() * niches.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const query = `${randomNiche} in ${randomCity}`;

    console.log(`🐺 CodeRun Hunter activated: Hunting for ${query}`);

    // 2. Call Serper.dev Places API
    const response = await fetch('https://google.serper.dev/places', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: query,
        location: randomCity,
      }),
    });

    const data = await response.json();

    if (response.status !== 200 || !data.places || data.places.length === 0) {
      return NextResponse.json({
        message: `No leads found for ${query}.`,
        serper_response: data,
      });
    }

    // 3. Format raw leads for your Supabase "leads" table
    const leadsToInsert = data.places.map((place: any) => ({
      company_name: place.title || 'Unnamed Business',
      website: place.website || null,
      email: null, 
      source: `Serper (${randomCity})`,
      lead_score: place.rating ? Math.round(place.rating * 20) : 50, 
      status: 'new',
      notes: `Niche: ${randomNiche} | Phone: ${place.phoneNumber || 'N/A'} | Rating: ${place.rating || 'N/A'}★`
    }));

    // 4. Insert directly into Supabase DB
    const { data: dbData, error: dbError } = await supabase
      .from('leads')
      .insert(leadsToInsert)
      .select();

    if (dbError) {
      console.error('Supabase DB Insert Error:', dbError);
      return NextResponse.json({
        message: 'Hunted leads successfully, but failed to save to Supabase.',
        db_error: dbError.message,
      });
    }

    return NextResponse.json({
      message: `Successfully hunted and saved ${dbData.length} leads in ${randomCity} straight to Supabase!`,
      leads_saved: dbData.length,
    });
  } catch (error: any) {
    console.error('Hunter Error:', error);
    return NextResponse.json({
      error: 'Failed to run hunter script',
      details: error.message,
    });
  }
}