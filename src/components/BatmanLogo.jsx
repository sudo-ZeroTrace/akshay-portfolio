import React from 'react';

/**
 * High-fidelity Batman Arkham / Dark Knight Insignia SVG
 * Modeled accurately from reference with dual-bevel metallic rim & optional backlit halo
 */
export default function BatmanLogo({
  className = "w-12 h-8",
  glow = true,
  variant = "metallic", // 'metallic', 'backlit', 'silhouette', 'wireframe'
  glowColor = "#f59e0b",
  coreColor = "#0f131a"
}) {
  // Exact path coordinates for Arkham Batman logo
  const pathD = "M 0 1.95 L 0.38 1.95 L 0.48 2.85 L 0.88 1.45 C 2.4 1.1 4.8 1.6 7.6 2.8 C 7.8 2.88 7.85 2.82 7.78 2.65 C 7.3 1.6 6.8 0.6 6.6 0.15 C 5.6 -0.8 4.7 -0.75 4.6 -0.6 C 3.6 -1.7 2.6 -1.4 2.2 -1.25 C 1.4 -2.1 0.6 -2.6 0 -3.4 C -0.6 -2.6 -1.4 -2.1 -2.2 -1.25 C -2.6 -1.4 -3.6 -1.7 -4.6 -0.6 C -4.7 -0.75 -5.6 -0.8 -6.6 0.15 C -6.8 0.6 -7.3 1.6 -7.78 2.65 C -7.85 2.82 -7.8 2.88 -7.6 2.8 C -4.8 1.6 -2.4 1.1 -0.88 1.45 L -0.48 2.85 L -0.38 1.95 Z";

  // Normalized viewBox coordinates from -8.5 to +8.5 (width 17), -3.8 to +3.2 (height 7)
  const normalizedPath = "M 50 26.5 L 53.6 26.5 L 54.8 17.5 L 58.5 31.5 C 72 34 88 29.5 98.5 18 C 98.8 18.2 98.2 20 96 29 C 94 37 88 47 79 50 C 73 45 67 47 64 54 C 58 56 54 62 50 70 C 46 62 42 56 36 54 C 33 47 27 45 21 50 C 12 47 6 37 4 29 C 1.8 20 1.2 18.2 1.5 18 C 12 29.5 28 34 41.5 31.5 L 45.2 17.5 L 46.4 26.5 Z";

  return (
    <svg
      viewBox="0 0 100 80"
      className={`${className} transition-all duration-300`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow Filter for Backlit Style */}
        <filter id="bat-backlight" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.96  0 0 0 0 0.62  0 0 0 0 0.04  0 0 0 0.9 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Metallic Linear Gradient */}
        <linearGradient id="metal-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="35%" stopColor="#334155" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="70%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Inner Plate Dark Brushed Gradient */}
        <linearGradient id="dark-plate" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e2430" />
          <stop offset="60%" stopColor="#0d1117" />
          <stop offset="100%" stopColor="#05070a" />
        </linearGradient>
      </defs>

      {/* Backlit Halo Glow Layer (As seen in Reference Image 1) */}
      {glow && (
        <path
          d={normalizedPath}
          fill={glowColor}
          filter="url(#bat-backlight)"
          opacity="0.85"
          transform="scale(1.04) translate(-2, -1.5)"
        />
      )}

      {/* Outer Metallic Bevel Rim (Reference Image 2) */}
      <path
        d={normalizedPath}
        fill="url(#metal-bevel)"
        stroke="#cbd5e1"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Inset Cyber Accent Groove (Image 2 thin neon contour) */}
      <path
        d={normalizedPath}
        fill="none"
        stroke={glowColor}
        strokeWidth="0.8"
        strokeOpacity="0.85"
        transform="scale(0.96) translate(2, 2.5)"
      />

      {/* Inner Stealth Titanium Body */}
      <path
        d={normalizedPath}
        fill="url(#dark-plate)"
        transform="scale(0.93) translate(3.5, 4)"
      />
    </svg>
  );
}
