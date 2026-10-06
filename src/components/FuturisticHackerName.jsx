import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../utils/soundEffects';
import { ShieldCheck, Cpu, Terminal, Zap, RefreshCw } from 'lucide-react';

const TARGET_NAME = "D R AKSHAY";
const GLYPHS = "0123456789ABCDEF!@#$%^&*()_+-=[]{}|;:,.<>?/アイウエオカキクケコサシスセソタチツテト";

export default function FuturisticHackerName() {
  const [displayText, setDisplayText] = useState(TARGET_NAME);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const iterationRef = useRef(0);
  const intervalRef = useRef(null);

  // Trigger decryption scramble effect
  const triggerDecryption = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    setGlitchActive(true);
    sounds.playAlert();

    iterationRef.current = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        TARGET_NAME.split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterationRef.current) {
              return TARGET_NAME[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      sounds.playKeypress();

      if (iterationRef.current >= TARGET_NAME.length) {
        clearInterval(intervalRef.current);
        setDisplayText(TARGET_NAME);
        setIsDecrypting(false);
        setTimeout(() => setGlitchActive(false), 300);
      }

      iterationRef.current += 1 / 3;
    }, 45);
  };

  // Run decryption on mount and periodically every 12 seconds
  useEffect(() => {
    triggerDecryption();
    const loopInterval = setInterval(() => {
      triggerDecryption();
    }, 12000);
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(loopInterval);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center my-4 group select-none">
      {/* TOP CALLSIGN HUD BADGE */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(0,255,102,0.2)]">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-bold tracking-widest text-[11px]">
          [ CALLSIGN: OPERATOR // 0xAKSHAY ]
        </span>
        {/* Animated equalizer waves */}
        <div className="flex items-center gap-0.5 ml-1">
          <span className="w-0.5 h-2 bg-emerald-400 animate-pulse" />
          <span className="w-0.5 h-3.5 bg-emerald-400 animate-pulse" style={{ animationDelay: '0.15s' }} />
          <span className="w-0.5 h-2.5 bg-emerald-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <span className="w-0.5 h-4 bg-emerald-400 animate-pulse" style={{ animationDelay: '0.45s' }} />
        </div>
      </div>

      {/* FUTURISTIC CORNER TACTICAL BRACKETS */}
      <div
        className="relative px-6 sm:px-12 py-3 cursor-pointer"
        onMouseEnter={triggerDecryption}
        onClick={triggerDecryption}
        title="Click to execute quantum decryption cycle"
      >
        {/* Top-Left Corner Bracket */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400 glow-green" />
        {/* Top-Right Corner Bracket */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400 glow-green" />
        {/* Bottom-Left Corner Bracket */}
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400 glow-green" />
        {/* Bottom-Right Corner Bracket */}
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400 glow-green" />

        {/* LASER SCANNING BEAM */}
        {isDecrypting && (
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-laser z-20 pointer-events-none" />
        )}

        {/* MAIN FUTURISTIC NAME */}
        <div className="relative">
          {/* Glitch Shadow Layer 1 (Cyan) */}
          <h1
            className={`absolute inset-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-tactical tracking-wider text-cyan-400 uppercase select-none pointer-events-none transition-opacity duration-200 ${
              glitchActive ? 'opacity-80 translate-x-[3px] -translate-y-[2px] glitch-layer-cyan' : 'opacity-0'
            }`}
          >
            {displayText}
          </h1>

          {/* Glitch Shadow Layer 2 (Magenta/Crimson) */}
          <h1
            className={`absolute inset-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-tactical tracking-wider text-rose-500 uppercase select-none pointer-events-none transition-opacity duration-200 ${
              glitchActive ? 'opacity-70 -translate-x-[3px] translate-y-[2px] glitch-layer-magenta' : 'opacity-0'
            }`}
          >
            {displayText}
          </h1>

          {/* Core Illuminated Name */}
          <h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-tactical tracking-wider uppercase drop-shadow-[0_0_25px_rgba(0,255,102,0.45)] bg-gradient-to-b from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
            {displayText}
          </h1>
        </div>
      </div>

      {/* TACTICAL SUB-BAR WITH STATUS CODE */}
      <div className="flex items-center gap-3 mt-2 text-[10px] sm:text-xs font-mono text-gray-400">
        <span className="text-emerald-400 font-bold">STATUS: ROOT_VERIFIED</span>
        <span>•</span>
        <span className="text-cyan-400">HASH: SHA-256[0x7A9B...40C1]</span>
        <span>•</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            triggerDecryption();
          }}
          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline font-bold"
        >
          <RefreshCw className={`w-3 h-3 ${isDecrypting ? 'animate-spin' : ''}`} />
          <span>RE-DECRYPT</span>
        </button>
      </div>

      {/* GRADIENT ACCENT DIVIDER */}
      <div className="h-[2px] w-48 sm:w-72 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mt-3 glow-green" />
    </div>
  );
}
