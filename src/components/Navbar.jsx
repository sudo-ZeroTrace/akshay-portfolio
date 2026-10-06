import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import {
  Terminal, Shield, Volume2, VolumeX, Menu, X,
  Palette, Cpu, Activity, Lock, KeyRound
} from 'lucide-react';

export default function Navbar({ onOpenTerminal, activeTheme = 'emerald', onThemeChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.isMuted());
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HERO', href: '#hero' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: '3D CYBER ARMORY', href: '#projects' },
    { name: 'DEFENSE SKILLS', href: '#skills' },
    { name: 'EDUCATION', href: '#education' },
    { name: 'ENCRYPTED COMMS', href: '#contact' }
  ];

  const themeOptions = [
    { id: 'emerald', name: 'Matrix Emerald', color: 'bg-emerald-400' },
    { id: 'cyan', name: 'Quantum Cyan', color: 'bg-cyan-400' },
    { id: 'crimson', name: 'Zero-Day Crimson', color: 'bg-rose-500' },
    { id: 'amber', name: 'Cyberpunk Amber', color: 'bg-amber-400' }
  ];

  const handleAudioToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playBeep(1000, 0.05);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-emerald-500/25 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* HACKER BRAND LOGO */}
        <a
          href="#hero"
          onClick={() => sounds.playBeep(900, 0.04)}
          className="flex items-center gap-3 group"
        >
          {/* Cyber Terminal Icon */}
          <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 group-hover:border-emerald-400 transition glow-green flex items-center justify-center">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black font-tactical tracking-wider text-white group-hover:text-emerald-300 transition">
                0xAKSHAY
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                ROOT_SEC
              </span>
            </div>
            <div className="text-[10px] font-mono text-gray-500 -mt-1 hidden sm:block">
              INFRASTRUCTURE DEFENSE GRID
            </div>
          </div>
        </a>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => sounds.playBeep(850, 0.03)}
              className="text-gray-400 hover:text-emerald-300 transition tracking-wider hover:scale-105"
            >
              // {link.name}
            </a>
          ))}
        </nav>

        {/* TACTICAL UTILITIES & ACTIONS */}
        <div className="flex items-center gap-2.5">
          {/* THEME PICKER */}
          <div className="relative">
            <button
              onClick={() => {
                sounds.playBeep(1000, 0.04);
                setShowThemeMenu(!showThemeMenu);
              }}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-300 transition"
              title="Change Hacker Theme"
              aria-label="Theme selection"
            >
              <Palette className="w-4 h-4" />
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-950 border border-emerald-500/40 p-2 shadow-2xl backdrop-blur-md z-50 animate-fadeIn">
                <div className="text-[10px] font-mono text-gray-500 px-2 py-1 border-b border-slate-900 mb-1">
                  HACKER COLORWAYS
                </div>
                {themeOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      sounds.playBeep(1100, 0.05);
                      onThemeChange(t.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition ${
                      activeTheme === t.id
                        ? 'bg-emerald-500/20 text-white font-bold'
                        : 'text-gray-400 hover:bg-slate-900 hover:text-gray-200'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AUDIO SFX TOGGLE */}
          <button
            onClick={handleAudioToggle}
            className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-300 transition"
            title={isMuted ? 'Unmute Cyber SFX' : 'Mute Cyber SFX'}
            aria-label="Toggle audio effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* LAUNCH CLI BUTTON */}
          <button
            onClick={() => {
              sounds.playAlert();
              onOpenTerminal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs hover:bg-emerald-500/20 transition glow-green"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI [~]</span>
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => {
              sounds.playBeep(900, 0.04);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg bg-slate-950 border border-slate-800 text-gray-400 hover:text-emerald-300 transition"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-emerald-500/30 px-4 py-6 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col space-y-3 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sounds.playBeep(850, 0.03);
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-300 hover:text-emerald-300 py-1 border-b border-slate-900"
              >
                // {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                sounds.playAlert();
                setIsMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="mt-3 w-full py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-tactical font-bold text-sm flex items-center justify-center gap-2 glow-green"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Dark-Net CLI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
