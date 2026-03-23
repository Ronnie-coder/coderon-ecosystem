import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import FleetTrackerClientWrapper from '@/components/playroom/FleetTrackerClientWrapper';

// This page is now a pure Server Component. Its function is layout and delegation.
const FleetTrackerPage = () => {
  return (
    <div className="c-page-container">
      <Link href="/playroom" className="c-dashboard-back-link">
        <FaArrowLeft />
        Back to Playroom
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