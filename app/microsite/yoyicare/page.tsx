'use client';

import { useEffect } from 'react';

export default function YoyicareMicrosite() {
  useEffect(() => {
    // Redirect to the HTML file in public directory
    if (typeof window !== 'undefined') {
      window.location.href = '/microsite-yoyicare.html';
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h1>Loading YoyiCare Microsite...</h1>
      <p>Redirecting...</p>
    </div>
  );
}

