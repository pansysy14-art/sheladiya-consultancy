import React from 'react';

/**
 * OFFICIAL SHELADIYA CONSULTANCY LOGO
 * 
 * Standalone Legal Crest Emblem (Non-circular, organic Laurel Wreath insignia):
 * 1. Golden Laurel Wreath (Curving branches framing the legal insignia, ribbon knot at base)
 * 2. Scales of Justice (Central fluted pillar, balance beam, suspension chains, dual pans)
 * 3. Open Law Book (Lex / Codex with layered pages at the base)
 * 4. Judicial Gavel (Hardwood mallet with gold accent bands resting across book)
 * 5. SHELADIYA CONSULTANCY typography in Cinzel & Plus Jakarta Sans
 * 6. Official Credo: TRUTH • HONESTY • DISCIPLINE
 * 
 * Transparent background - renders with pristine sharpness on dark navy and warm ivory.
 */
export const OfficialLogo = ({ 
  size = 'md', 
  showText = true, 
  showTagline = false, 
  className = '', 
  lightText = true,
  layout = 'horizontal' // 'horizontal' | 'vertical' | 'crest-only'
}) => {
  const dimensions = {
    xs: { emblemW: 32, emblemH: 36, textTitle: 'text-sm', textSub: 'text-[8.5px]', textTag: 'text-[7.5px]', gap: 'gap-2' },
    sm: { emblemW: 40, emblemH: 45, textTitle: 'text-base', textSub: 'text-[9.5px]', textTag: 'text-[8.5px]', gap: 'gap-2.5' },
    md: { emblemW: 48, emblemH: 54, textTitle: 'text-lg sm:text-xl', textSub: 'text-[10px]', textTag: 'text-[9px]', gap: 'gap-3' },
    lg: { emblemW: 64, emblemH: 72, textTitle: 'text-xl sm:text-2xl', textSub: 'text-[11.5px]', textTag: 'text-[10px]', gap: 'gap-3.5' },
    xl: { emblemW: 84, emblemH: 94, textTitle: 'text-2xl sm:text-3xl', textSub: 'text-xs', textTag: 'text-[10.5px]', gap: 'gap-4' },
  };

  const dim = dimensions[size] || dimensions.md;

  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col items-center text-center' : 'items-center'} ${dim.gap} select-none ${className}`}>
      {/* Official Standalone Laurel Wreath & Justice Scale Crest (No circular coin background) */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{ width: `${dim.emblemW}px`, height: `${dim.emblemH}px` }}
      >
        <svg 
          viewBox="0 0 160 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)]"
          aria-label="Official Sheladiya Consultancy Emblem"
        >
          <defs>
            {/* Royal Gold Metallic Gradient */}
            <linearGradient id="scGoldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF2" />
              <stop offset="25%" stopColor="#F5D77F" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#BA8C1D" />
              <stop offset="100%" stopColor="#7A5809" />
            </linearGradient>

            {/* Rich Gold Foil Shimmer */}
            <linearGradient id="scGoldShine" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BA8C1D" />
              <stop offset="45%" stopColor="#FFEAA7" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8A6712" />
            </linearGradient>

            {/* Deep Navy Parchment Accent */}
            <linearGradient id="scNavyAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#102548" />
              <stop offset="100%" stopColor="#040914" />
            </linearGradient>

            {/* Ambient Gold Glow Filter */}
            <filter id="goldAura" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D4AF37" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* ======================================================== */}
          {/* 1. GOLDEN LAUREL WREATH (Natural framing branches) */}
          {/* ======================================================== */}
          <g id="laurel-wreath" fill="url(#scGoldPrimary)">
            {/* Left Branch Main Stem */}
            <path 
              d="M 80 162 C 50 156 22 130 18 90 C 16 68 25 46 38 28" 
              fill="none" 
              stroke="url(#scGoldPrimary)" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
            />
            {/* Left Branch Laurel Leaves Pairs */}
            <path d="M 74 160 C 67 158 59 160 55 154 C 62 152 70 155 74 160 Z" />
            <path d="M 60 152 C 52 147 45 150 39 142 C 47 140 55 146 60 152 Z" />
            <path d="M 45 138 C 36 130 30 134 24 125 C 33 123 41 130 45 138 Z" />
            <path d="M 32 120 C 24 111 20 115 14 106 C 23 104 30 112 32 120 Z" />
            <path d="M 23 99 C 16 89 14 94 9 84 C 18 83 23 91 23 99 Z" />
            <path d="M 18 78 C 13 68 14 73 11 63 C 20 63 22 71 18 78 Z" />
            <path d="M 18 57 C 16 46 19 50 19 40 C 27 42 27 50 18 57 Z" />
            <path d="M 26 38 C 26 27 31 31 33 22 C 39 26 37 34 26 38 Z" />
            <path d="M 38 24 C 40 14 46 19 50 11 C 54 16 51 24 38 24 Z" />

            {/* Right Branch Main Stem */}
            <path 
              d="M 80 162 C 110 156 138 130 142 90 C 144 68 135 46 122 28" 
              fill="none" 
              stroke="url(#scGoldPrimary)" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
            />
            {/* Right Branch Laurel Leaves Pairs */}
            <path d="M 86 160 C 93 158 101 160 105 154 C 98 152 90 155 86 160 Z" />
            <path d="M 100 152 C 108 147 115 150 121 142 C 113 140 105 146 100 152 Z" />
            <path d="M 115 138 C 124 130 130 134 136 125 C 127 123 119 130 115 138 Z" />
            <path d="M 128 120 C 136 111 140 115 146 106 C 137 104 130 112 128 120 Z" />
            <path d="M 137 99 C 144 89 146 94 151 84 C 142 83 137 91 137 99 Z" />
            <path d="M 142 78 C 147 68 146 73 149 63 C 140 63 138 71 142 78 Z" />
            <path d="M 142 57 C 144 46 141 50 141 40 C 133 42 133 50 142 57 Z" />
            <path d="M 134 38 C 134 27 129 31 127 22 C 121 26 123 34 134 38 Z" />
            <path d="M 122 24 C 120 14 114 19 110 11 C 106 16 109 24 122 24 Z" />

            {/* Bottom Laurel Knot & Ribbon Bow */}
            <circle cx="80" cy="164" r="3.5" fill="url(#scGoldShine)" />
            <path d="M 77 165 C 70 171 63 173 57 172 C 63 168 70 166 76 165 Z" fill="url(#scGoldPrimary)" />
            <path d="M 83 165 C 90 171 97 173 103 172 C 97 168 90 166 84 165 Z" fill="url(#scGoldPrimary)" />
          </g>

          {/* ======================================================== */}
          {/* 2. CENTRAL JUSTICE SCALE */}
          {/* ======================================================== */}
          <g id="justice-scale" filter="url(#goldAura)">
            {/* Top Finial Flame & Capital */}
            <polygon points="80,14 82,19 87,19 83,22 84.5,27 80,24 75.5,27 77,22 73,19 78,19" fill="url(#scGoldShine)" />
            <circle cx="80" cy="30" r="3" fill="url(#scGoldPrimary)" />
            
            {/* Central Pillar */}
            <rect x="78.5" y="34" width="3" height="74" rx="1.5" fill="url(#scGoldPrimary)" />
            <line x1="74" y1="36" x2="86" y2="36" stroke="url(#scGoldPrimary)" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="80" cy="56" r="2.2" fill="url(#scGoldShine)" />
            <line x1="75" y1="80" x2="85" y2="80" stroke="url(#scGoldPrimary)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Horizontal Balance Crossbeam */}
            <path 
              d="M 40 42 C 54 38 68 37 80 37 C 92 37 106 38 120 42" 
              stroke="url(#scGoldPrimary)" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
              fill="none" 
            />
            {/* Center Pivot Ring */}
            <circle cx="80" cy="37" r="3.2" fill="none" stroke="url(#scGoldPrimary)" strokeWidth="1.5" />

            {/* Left Balance Arm & Suspension Chains */}
            <circle cx="43" cy="43" r="2" fill="url(#scGoldPrimary)" />
            <line x1="43" y1="45" x2="33" y2="68" stroke="url(#scGoldPrimary)" strokeWidth="1" strokeDasharray="2 1.5" />
            <line x1="43" y1="45" x2="53" y2="68" stroke="url(#scGoldPrimary)" strokeWidth="1" strokeDasharray="2 1.5" />
            <line x1="43" y1="45" x2="43" y2="68" stroke="url(#scGoldPrimary)" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.8" />
            {/* Left Pan */}
            <path 
              d="M 29 68 C 33 80 53 80 57 68 Z" 
              fill="url(#scGoldShine)" 
              stroke="url(#scGoldPrimary)" 
              strokeWidth="1.4" 
              strokeLinejoin="round" 
            />
            <line x1="28" y1="68" x2="58" y2="68" stroke="url(#scGoldPrimary)" strokeWidth="1.8" strokeLinecap="round" />

            {/* Right Balance Arm & Suspension Chains */}
            <circle cx="117" cy="43" r="2" fill="url(#scGoldPrimary)" />
            <line x1="117" y1="45" x2="107" y2="68" stroke="url(#scGoldPrimary)" strokeWidth="1" strokeDasharray="2 1.5" />
            <line x1="117" y1="45" x2="127" y2="68" stroke="url(#scGoldPrimary)" strokeWidth="1" strokeDasharray="2 1.5" />
            <line x1="117" y1="45" x2="117" y2="68" stroke="url(#scGoldPrimary)" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.8" />
            {/* Right Pan */}
            <path 
              d="M 103 68 C 107 80 127 80 131 68 Z" 
              fill="url(#scGoldShine)" 
              stroke="url(#scGoldPrimary)" 
              strokeWidth="1.4" 
              strokeLinejoin="round" 
            />
            <line x1="102" y1="68" x2="132" y2="68" stroke="url(#scGoldPrimary)" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* ======================================================== */}
          {/* 3. OPEN LAW BOOK (LEX / CODEX) AT BASE */}
          {/* ======================================================== */}
          <g id="law-book">
            {/* Book Base Pedestal */}
            <path d="M 54 137 L 106 137 L 102 143 L 58 143 Z" fill="url(#scGoldPrimary)" opacity="0.85" />
            
            {/* Book Spine Center Divider */}
            <path d="M 80 110 L 80 134" stroke="url(#scGoldPrimary)" strokeWidth="2.2" strokeLinecap="round" />
            
            {/* Left Open Pages */}
            <path 
              d="M 80 112 C 68 108 52 110 44 115 L 44 133 C 53 128 68 127 80 130 Z" 
              fill="#FFFDF7" 
              stroke="url(#scGoldPrimary)" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
            />
            {/* Left page text lines */}
            <line x1="50" y1="118" x2="74" y2="115" stroke="url(#scGoldPrimary)" strokeWidth="0.8" opacity="0.7" />
            <line x1="50" y1="122" x2="74" y2="119" stroke="url(#scGoldPrimary)" strokeWidth="0.8" opacity="0.7" />
            <line x1="50" y1="126" x2="72" y2="123" stroke="url(#scGoldPrimary)" strokeWidth="0.8" opacity="0.7" />

            {/* Right Open Pages */}
            <path 
              d="M 80 112 C 92 108 108 110 116 115 L 116 133 C 107 128 92 127 80 130 Z" 
              fill="#FFFDF7" 
              stroke="url(#scGoldPrimary)" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
            />
            {/* Right page text lines */}
            <line x1="86" y1="115" x2="110" y2="118" stroke="url(#scGoldPrimary)" strokeWidth="0.8" opacity="0.7" />
            <line x1="86" y1="119" x2="110" y2="122" stroke="url(#scGoldPrimary)" strokeWidth="0.8" opacity="0.7" />
            <line x1="88" y1="123" x2="110" y2="126" stroke="url(#scGoldPrimary)" strokeWidth="0.8" opacity="0.7" />

            {/* Leather Cover Trim beneath pages */}
            <path d="M 42 133 C 54 129 68 129 79 133" stroke="url(#scGoldPrimary)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 81 133 C 92 129 106 129 118 133" stroke="url(#scGoldPrimary)" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* ======================================================== */}
          {/* 4. JUDICIAL GAVEL (MALLET RESTING ACROSS BASE) */}
          {/* ======================================================== */}
          <g id="gavel" filter="url(#goldAura)">
            {/* Gavel Handle angled gracefully */}
            <line 
              x1="72" y1="121" 
              x2="104" y2="102" 
              stroke="url(#scGoldPrimary)" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
            />
            <circle cx="103" cy="103" r="2.2" fill="url(#scGoldShine)" stroke="url(#scGoldPrimary)" strokeWidth="0.8" />
            <line x1="95" y1="106" x2="97" y2="110" stroke="#FFF7DC" strokeWidth="1" />

            {/* Gavel Mallet Head */}
            <g transform="translate(68, 122) rotate(-31)">
              <rect x="-5.5" y="-11" width="11" height="22" rx="2" fill="url(#scGoldPrimary)" stroke="#FFF7DC" strokeWidth="0.7" />
              <rect x="-6" y="-6.5" width="12" height="2.8" fill="url(#scNavyAccent)" stroke="url(#scGoldPrimary)" strokeWidth="0.6" />
              <rect x="-6" y="3.7" width="12" height="2.8" fill="url(#scNavyAccent)" stroke="url(#scGoldPrimary)" strokeWidth="0.6" />
              <ellipse cx="0" cy="-11" rx="5.5" ry="1.6" fill="#FFF7DC" />
              <ellipse cx="0" cy="11" rx="5.5" ry="1.6" fill="url(#scGoldPrimary)" />
            </g>
          </g>
        </svg>
      </div>

      {/* Typography: SHELADIYA CONSULTANCY & OFFICIAL CREDO */}
      {showText && (
        <div className={`flex flex-col ${layout === 'vertical' ? 'items-center text-center mt-2' : 'text-left'}`}>
          <div className="flex items-center gap-1.5">
            <span className={`font-cinzel font-bold tracking-[0.16em] ${lightText ? 'text-white' : 'text-navy-950'} ${dim.textTitle}`}>
              SHELADIYA
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-[-2px]">
            <span className={`font-sans font-semibold tracking-[0.24em] text-gold-400 uppercase ${dim.textSub}`}>
              CONSULTANCY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/80 inline-block"></span>
            <span className={`tracking-wider ${lightText ? 'text-slate-400' : 'text-slate-600'} ${dim.textSub} hidden sm:inline`}>
              LEGAL & CORPORATE
            </span>
          </div>
          {showTagline && (
            <p className={`font-cinzel font-semibold tracking-[0.22em] sm:tracking-[0.26em] text-gold-300 uppercase mt-1 ${dim.textTag}`}>
              TRUTH • HONESTY • DISCIPLINE
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Also export as default and SCLogo for seamless drop-in compatibility
export const SCLogo = OfficialLogo;
export default OfficialLogo;
