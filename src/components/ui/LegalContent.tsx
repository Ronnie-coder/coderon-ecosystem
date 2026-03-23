// src/components/ui/LegalContent.tsx
import React from 'react';

const LegalContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="c-legal-content">
      {children}
    </div>
  );
};

export default LegalContent;