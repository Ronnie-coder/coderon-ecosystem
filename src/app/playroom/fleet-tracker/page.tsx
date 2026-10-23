import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import FleetTrackerClientWrapper from '@/components/playroom/FleetTrackerClientWrapper';

// This page is now a pure Server Component. Its function is layout and delegation.
const FleetTrackerPage = () => {
  return (
    <div className="demo-scope container pb-20 pt-12 md:pt-16">
      <Link href="/playroom/" className="mb-8 inline-flex items-center gap-2 font-semibold text-ink/70 hover:text-ink">
        <FaArrowLeft />
        Back to our work
      </Link>
      
      <div className="c-tracker">
        <div className="c-tracker__header">
          <h1 className="c-tracker__title">Live Fleet Tracker</h1>
          <p className="c-tracker__subtitle">A real-time demo showcasing dynamic data on an interactive map with Leaflet.js.</p>
        </div>

        {/* The Client Component wrapper is rendered here, isolating the threat. */}
        <FleetTrackerClientWrapper />
      </div>
    </div>
  );
};

export default FleetTrackerPage;