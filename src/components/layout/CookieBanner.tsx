// src/components/layout/CookieBanner.tsx
"use client"; // <-- This is the most important line!

import React from 'react';
import CookieConsent from "react-cookie-consent";
import Link from 'next/link';

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="I understand"
      cookieName="coderonCookieConsent"
      style={{
        background: "#181818", // A dark, but not pure black background
        color: "#E0E0E0",
        borderTop: "1px solid #333",
        zIndex: "1000" // Ensure it's on top of other elements
      }}
      buttonStyle={{
        color: "#121212",
        backgroundColor: "#D4AF37", // Your gold/ochre accent
        fontSize: "14px",
        fontWeight: "bold",
        borderRadius: "4px",
        padding: "10px 15px"
      }}
      expires={150}
    >
      This website uses cookies to enhance the user experience. See our{" "}
      <Link href="/privacy-policy" style={{ color: "#D4AF37", textDecoration: 'underline' }}>
        Privacy Policy
      </Link>
      {" "}for more details.
    </CookieConsent>
  );
};

export default CookieBanner;