import React from 'react';

export const CircuitBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-white">
      {/* Exact EDSOLS ambient hero gradient */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-rose-50/70 via-pink-50/40 to-transparent blur-3xl opacity-80" />
      
      {/* Top right ambient glow */}
      <div className="absolute top-[10%] right-[-5%] w-[650px] h-[650px] bg-gradient-radial from-rose-100/60 via-pink-50/30 to-transparent blur-3xl opacity-70" />
      
      {/* Top left deep accent */}
      <div className="absolute top-[5%] left-[-5%] w-[600px] h-[600px] bg-gradient-radial from-slate-100/70 via-transparent to-transparent blur-3xl opacity-60" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid-bg opacity-75" />

      {/* Tech Circuit SVG Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="circuit-grad-edsols" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e11d48" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#be123c" stopOpacity="0.2" />
          </linearGradient>
          <pattern id="dot-pattern-edsols" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(225,29,72,0.06)" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#dot-pattern-edsols)" />

        {/* Diagonal Tech Traces */}
        <path
          d="M0 200 L300 200 L450 350 L900 350 L1100 550"
          fill="none"
          stroke="url(#circuit-grad-edsols)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <circle cx="450" cy="350" r="3" fill="#e11d48" />
        <circle cx="900" cy="350" r="3" fill="#be123c" />

        <path
          d="M1200 100 L950 100 L800 250 L400 250"
          fill="none"
          stroke="url(#circuit-grad-edsols)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx="800" cy="250" r="3" fill="#0f172a" />
      </svg>
    </div>
  );
};
