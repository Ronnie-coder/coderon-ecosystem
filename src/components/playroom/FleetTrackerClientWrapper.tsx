'use client'; // Directive: Establish Client Boundary

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamic import is now correctly isolated within this client component.
const FleetTrackerMap = dynamic(
  () => import('@/components/playroom/FleetTrackerMap'),
  { 
    ssr: false, // Permitted within a 'use client' boundary.
    loading: () => <p style={{ textAlign: 'center', padding: '20px' }}>Loading Interactive Map...</p> 
  }
);

const FleetTrackerClientWrapper = () => {
  return <FleetTrackerMap />;
};

export default FleetTrackerClientWrapper;