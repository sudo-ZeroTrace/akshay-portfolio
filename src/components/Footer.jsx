import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { Shield, ArrowUp, Terminal, Radio, Cpu, Lock, FileText } from 'lucide-react';

export default function Footer({ onOpenTerminal, onOpenResume }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sounds.playBeep(900, 0.04);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-emerald-500/20 bg-slate-950/98 py-12 px-4 sm:px-6 lg:px-8 z-10 font-mono text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* LEFT LOGO & PROTOCOL */}
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2.5 text-emerald-400 font-bold">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>DARK-NET SEC_OPS // DISTRIBUTED DEFENSE GRID</span>
          </div>
          <p className="text-gray-400 text-[11px] max-w-md">
            Architected and maintained by D R Akshay. Safeguarding enterprise branches, firewalls, and 3,500+ endpoint fleets pan-India.
          </p>
        </div>

        {/* CENTER LIVE TELEMETRY */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300">KOCHI-HQ TIME:</span>
            <span className="text-emerald-400 font-bold">{currentTime || '11:34:49'} IST</span>
          </div>
          <div className="text-[10px] text-gray-500">
            SYSTEM TELEMETRY: 100% OPERATIONAL // ALL THREAT VECTORS ZEROIZED
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {onOpenResume && (
            <button
              onClick={() => {
                sounds.playBeep(1100, 0.04);
                onOpenResume();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-gray-300 hover:text-emerald-300 transition"
              title="Inspect Verified Resume [R]"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resume [R]</span>
            </button>
          )}

          <button
            onClick={() => {
              sounds.playAlert();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 transition glow-green"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open CLI</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-300 transition"
            title="Return to Orbit / Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-600">
        <div>
          © {new Date().getFullYear()} D R Akshay. All Rights Reserved. Futuristic Dark Hacker Theme.
        </div>
        <div className="mt-2 sm:mt-0 flex gap-4">
          <a href="#hero" className="hover:text-emerald-400 transition">Base</a>
          <a href="#projects" className="hover:text-emerald-400 transition">Cyber Armory</a>
          <a href="#experience" className="hover:text-emerald-400 transition">Incident Log</a>
          <a href="#contact" className="hover:text-emerald-400 transition">Encrypted Uplink</a>
        </div>
      </div>
    </footer>
  );
}
