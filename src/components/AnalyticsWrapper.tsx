// src/components/AnalyticsWrapper.tsx
"use client";

import { Suspense } from 'react';
import GoogleAnalytics from '@/components/GoogleAnalytics';

// This component's only job is to wrap Google Analytics in a Suspense boundary
// to prevent build errors.
export function AnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics />
      )}
    </Suspense>
  );
}