import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BackgroundScene3D from './components/3d/BackgroundScene3D';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import Projects3DSection from './components/3d/Projects3DSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import InteractiveTerminal from './components/InteractiveTerminal';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import NyxChatbot from './components/NyxChatbot';
import ResumeModal from './components/ResumeModal';
import CyberCursor from './components/CyberCursor';
import Footer from './components/Footer';
import { sounds } from './utils/soundEffects';

const THEMES = ['emerald', 'cyan', 'crimson', 'amber'];

export default function App() {
  const [theme, setTheme] = useState('emerald');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isHotkeysOpen, setIsHotkeysOpen] = useState(false);
  const [isNyxOpen, setIsNyxOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Terminal on ` or ~
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        sounds.playAlert();
        setIsTerminalOpen((prev) => !prev);
        return;
      }

      // Close open modals on ESC
      if (e.key === 'Escape') {
        if (isHotkeysOpen) setIsHotkeysOpen(false);
        if (isTerminalOpen) setIsTerminalOpen(false);
        if (isNyxOpen) setIsNyxOpen(false);
        if (isResumeOpen) setIsResumeOpen(false);
        return;
      }

      // Don't trigger letter hotkeys if user is currently typing in input or terminal is open
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea' || isTerminalOpen) {
        return;
      }

      // Toggle Nyx AI Assistant on N
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setIsNyxOpen((prev) => {
          if (!prev) sounds.playNyxOpen();
          else sounds.playNyxClose();
          return !prev;
        });
        return;
      }

      // Open Verified Resume Dossier on R
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        sounds.playAlert();
        setIsResumeOpen(true);
        return;
      }

      // Toggle hotkeys guide on ?
      if (e.key === '?') {
        e.preventDefault();
        sounds.playBeep(950, 0.04);
        setIsHotkeysOpen((prev) => !prev);
        return;
      }

      // Cycle themes on T
      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setTheme((prev) => {
          const nextIdx = (THEMES.indexOf(prev) + 1) % THEMES.length;
          sounds.playBeep(1100, 0.05);
          return THEMES[nextIdx];
        });
        return;
      }

      // Toggle Mute on M
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        sounds.toggleMute();
        return;
      }

      // Section jumps
      if (e.key === 'p' || e.key === 'P') {
        const el = document.getElementById('projects');
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); sounds.playBeep(850, 0.03); }
      } else if (e.key === 's' || e.key === 'S') {
        const el = document.getElementById('skills');
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); sounds.playBeep(850, 0.03); }
      } else if (e.key === 'e' || e.key === 'E') {
        const el = document.getElementById('experience');
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); sounds.playBeep(850, 0.03); }
      } else if (e.key === 'c' || e.key === 'C') {
        const el = document.getElementById('contact');
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); sounds.playBeep(850, 0.03); }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen, isHotkeysOpen, isNyxOpen, isResumeOpen]);

  return (
    <div className="relative min-h-screen bg-[#020408] text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* INTERACTIVE CUSTOM CYBER CURSOR */}
      <CyberCursor theme={theme} />

      {/* 3D DARK HACKER CYBER CONSTELLATION & MATRIX STREAM */}
      <BackgroundScene3D theme={theme} intensity={0.9} />

      {/* TACTICAL CRT SCANLINES OVERLAY */}
      <div className="fixed inset-0 scanlines pointer-events-none z-20 opacity-30" />

      {/* TOP HACKER NAVIGATION BAR */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenHotkeys={() => setIsHotkeysOpen(true)}
        onOpenNyx={() => {
          sounds.playNyxOpen();
          setIsNyxOpen(true);
        }}
        onOpenResume={() => setIsResumeOpen(true)}
        activeTheme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
      />

      {/* MAIN SECTIONS CONTAINER */}
      <main className="relative z-10 flex flex-col">
        {/* HERO SECTION WITH OPERATIVE DOSSIER PHOTO & DECRYPTION NAME */}
        <HeroSection
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenNyx={() => {
            sounds.playNyxOpen();
            setIsNyxOpen(true);
          }}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 3D PROJECTS SECTION (INTERACTIVE 3D HOLODECK) */}
        <Projects3DSection theme={theme} />

        {/* ENTERPRISE INCIDENT & SUPPORT LOG (EXPERIENCE) */}
        <ExperienceSection />

        {/* CYBER DEFENSE ARSENAL (SKILLS - NO HEADACHE PERCENTAGES) */}
        <SkillsSection />

        {/* ACADEMIC FOUNDATION & CREDENTIALS (EDUCATION) */}
        <EducationSection />

        {/* ENCRYPTED UPLINK & COMMS (CONTACT ME) */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* INTERACTIVE DARK-NET TERMINAL MODAL */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* TACTICAL KEYBOARD SHORTCUTS GUIDE MODAL */}
      <KeyboardShortcutsModal
        isOpen={isHotkeysOpen}
        onClose={() => setIsHotkeysOpen(false)}
      />

      {/* OFFICIAL VERIFIED RESUME DOSSIER MODAL */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* NYX AI TACTICAL ASSISTANT CHATBOT (VOICE + TEXT) */}
      <NyxChatbot
        isOpen={isNyxOpen}
        onToggle={() => setIsNyxOpen((prev) => !prev)}
        onOpenResume={() => setIsResumeOpen(true)}
        activeTheme={theme}
      />
    </div>
  );
}
