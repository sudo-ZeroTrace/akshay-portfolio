import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import FuturisticHackerName from './FuturisticHackerName';
import {
  Shield, Terminal, ShieldAlert, Cpu, ArrowDown,
  Download, Send, Activity, Lock, Radio, Server,
  Sparkles, Key, Zap, Crosshair, ExternalLink, FileText
} from 'lucide-react';

export default function HeroSection({ onOpenTerminal, onOpenNyx, onOpenResume }) {
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const commandSnippets = [
    "whoami --privileges=ROOT_ADMIN",
    "nmap -sS -p- --min-rate 5000 10.0.0.0/8",
    "fortigate-cli# diagnose sys top 10",
    "sophos-xdr: threat contained PID 0x48FA",
    "iptables -L -n -v | grep 'DROPPED'",
    "ad-hardening.ps1: 1,000+ branches synced"
  ];

  useEffect(() => {
    let currentCmd = commandSnippets[textIndex];
    let charIndex = 0;
    let isDeleting = false;

    const timer = setInterval(() => {
      if (!isDeleting) {
        setTypedText(currentCmd.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentCmd.length) {
          isDeleting = true;
          clearInterval(timer);
          setTimeout(() => {
            const deleteTimer = setInterval(() => {
              if (charIndex > 0) {
                setTypedText(currentCmd.substring(0, charIndex - 1));
                charIndex--;
              } else {
                clearInterval(deleteTimer);
                setTextIndex((prev) => (prev + 1) % commandSnippets.length);
              }
            }, 25);
          }, 2200);
        }
      }
    }, 55);

    return () => clearInterval(timer);
  }, [textIndex]);

  return (
    <section id="hero" className="relative min-h-[94vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* BACKGROUND SUBTLE CYBER CIRCUIT WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <svg viewBox="0 0 100 100" className="w-[85vw] max-w-4xl text-emerald-400 stroke-current" fill="none">
          <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="35" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="22" strokeWidth="1" strokeDasharray="8 4" />
          <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="w-full flex flex-col items-center text-center">
        {/* TOP STATUS TELEMETRY CHIPS */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-emerald-500/40 text-emerald-400 font-mono text-xs shadow-lg glow-green">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">SYSTEM NODE: SEC_DEFENSE_01</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-400 font-mono text-xs shadow-lg glow-cyan">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>FORTINET IPSEC: ACTIVE // 1,000+ NODES</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-emerald-500/30 text-emerald-300 font-mono text-xs shadow-lg">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>EDR/XDR: ARMED // 0 COMPROMISES</span>
          </div>
        </div>

        {/* CYBER OPERATIVE AVATAR DOSSIER BADGE */}
        <div className="relative my-4 group">
          {/* Outer rotating tactical radar ring */}
          <div
            className="absolute -inset-3.5 rounded-full border border-emerald-500/25 border-dashed animate-spin-slow pointer-events-none"
            style={{ animationDuration: '30s' }}
          />
          {/* Concentric glowing ring */}
          <div className="absolute -inset-1.5 rounded-full border border-cyan-500/40 pointer-events-none group-hover:border-emerald-400/80 transition-colors duration-300" />
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Avatar Container with interactive tilt */}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playBeep(1200, 0.08)}
            title="D R Akshay - View Verified LinkedIn Profile"
            className="relative block w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-emerald-400 shadow-[0_0_25px_rgba(0,255,102,0.4)] group-hover:shadow-[0_0_45px_rgba(0,255,102,0.75)] group-hover:scale-105 transition-all duration-300 bg-slate-950"
          >
            <img
              src="/akshay-profile.jpg"
              alt="D R Akshay - IT Support & Security Engineer"
              className="w-full h-full object-cover object-top filter contrast-105 group-hover:contrast-115 transition duration-300"
              onError={(e) => {
                e.target.src = '/batman-backlit.jpg';
              }}
            />
            {/* Ambient cyber overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-slate-950/40 pointer-events-none" />
            {/* Dynamic laser scanline */}
            <div className="absolute inset-x-0 h-1 bg-emerald-400/70 shadow-[0_0_10px_#00ff66] animate-scan pointer-events-none" />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
              <svg className="w-5 h-5 text-emerald-400 fill-current mb-1" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="text-[10px] font-mono text-emerald-300 font-bold tracking-tight">LINKEDIN PROFILE</span>
              <span className="text-[9px] font-mono text-cyan-300 flex items-center gap-1">VERIFIED <ExternalLink className="w-2.5 h-2.5" /></span>
            </div>
          </a>

          {/* Status pill badge */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/95 border border-emerald-500/70 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-xl whitespace-nowrap glow-green">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>OPERATOR // ROOT</span>
          </div>
        </div>

        {/* FUTURISTIC ANIMATED HACKER NAME WITH DECRYPTION GLITCH */}
        <FuturisticHackerName />

        {/* SUBTITLE */}
        <p className="text-lg sm:text-2xl font-tactical font-semibold text-emerald-400 tracking-wide mb-3 max-w-3xl">
          {personalInfo.title}
        </p>
        <p className="text-sm sm:text-base font-mono text-gray-400 tracking-normal mb-8 max-w-2xl leading-relaxed">
          Specializing in distributed enterprise IT infrastructure defense, Active Directory governance, Fortinet IPsec mesh security, and autonomous EDR/XDR incident containment across Windows & Linux environments.
        </p>

        {/* INTERACTIVE HACKER TERMINAL PREVIEW */}
        <div className="w-full max-w-xl mb-10 text-left rounded-lg bg-slate-950/95 border border-emerald-500/40 p-4 font-mono text-xs text-emerald-300 shadow-2xl backdrop-blur-md glow-green">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="text-gray-400 ml-1">root@darknet-sec-ops:~#</span>
            </div>
            <button
              onClick={() => {
                sounds.playBeep(1100, 0.08);
                if (onOpenTerminal) onOpenTerminal();
              }}
              className="text-emerald-400 hover:text-emerald-300 underline font-bold"
            >
              [OPEN FULL CLI]
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">akshay@sec-ops:~$</span>
            <span className="text-white">{typedText}</span>
            <span className="w-2 h-4 bg-emerald-400 animate-cursor inline-block" />
          </div>
        </div>

        {/* QUICK STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-10">
          {personalInfo.stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 backdrop-blur-md text-center hover:border-emerald-500/60 transition group hover:shadow-[0_0_20px_rgba(0,255,102,0.15)]"
            >
              <div className="text-2xl sm:text-3xl font-black font-tactical text-white group-hover:text-emerald-400 transition">
                {stat.value}
              </div>
              <div className="text-xs font-mono font-bold text-emerald-300 mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-gray-500 mt-1 truncate">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

        {/* CALL TO ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl">
          {/* ASK NYX AI TRIGGER */}
          <button
            onClick={() => {
              sounds.playNyxOpen();
              if (onOpenNyx) onOpenNyx();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 text-slate-950 font-tactical font-bold text-sm sm:text-base hover:bg-emerald-400 transition shadow-lg glow-green hover:scale-105"
          >
            <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
            <span>Ask Nyx AI [Voice & Chat]</span>
          </button>

          {/* RESUME PDF DOSSIER */}
          <button
            onClick={() => {
              sounds.playBeep(1100, 0.05);
              if (onOpenResume) onOpenResume();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-950 border border-emerald-500/50 text-emerald-300 font-tactical font-bold text-sm sm:text-base hover:bg-emerald-500/20 transition hover:scale-105 glow-green"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Resume PDF Dossier</span>
          </button>

          <a
            href="#projects"
            onClick={() => sounds.playBeep(900, 0.05)}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-900/90 border border-slate-700 text-gray-300 font-tactical font-bold text-sm sm:text-base hover:border-emerald-500/40 hover:text-white transition hover:scale-105"
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>3D Cyber Armory</span>
          </a>

          <a
            href="#experience"
            onClick={() => sounds.playBeep(850, 0.05)}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-900/90 border border-slate-700 text-gray-300 font-tactical font-bold text-sm sm:text-base hover:border-emerald-500/40 hover:text-white transition hover:scale-105"
          >
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Incident Log</span>
          </a>

          <button
            onClick={() => {
              sounds.playAlert();
              if (onOpenTerminal) onOpenTerminal();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-950 border border-cyan-500/50 text-cyan-300 font-mono text-xs sm:text-sm hover:bg-cyan-500/10 transition glow-cyan"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>CLI [~]</span>
          </button>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="mt-14 flex flex-col items-center text-gray-500 text-xs font-mono animate-bounce">
          <span className="mb-1 text-[10px] tracking-widest text-emerald-400/80">SCROLL DOWN TO ACCESS TELEMETRY</span>
          <ArrowDown className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    </section>
  );
}
