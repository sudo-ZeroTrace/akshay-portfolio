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
import Footer from './components/Footer';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [theme, setTheme] = useState('emerald');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Global keyboard shortcut to launch Dark-Net CLI (` or ~)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        sounds.playAlert();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020408] text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* 3D QUANTUM CYBER DEFENSE CORE & MATRIX RAIN BACKGROUND */}
      <BackgroundScene3D theme={theme} intensity={0.85} />

      {/* TACTICAL CRT SCANLINES OVERLAY */}
      <div className="fixed inset-0 scanlines pointer-events-none z-20 opacity-35" />

      {/* TOP HACKER NAVIGATION BAR */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        activeTheme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
      />

      {/* MAIN SECTIONS CONTAINER */}
      <main className="relative z-10 flex flex-col">
        {/* HERO SECTION WITH FUTURISTIC GLITCH & DECRYPTION NAME */}
        <HeroSection onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* 3D PROJECTS SECTION (INTERACTIVE 3D CYBER BLADES) */}
        <Projects3DSection theme={theme} />

        {/* ENTERPRISE INCIDENT & SUPPORT LOG (EXPERIENCE) */}
        <ExperienceSection />

        {/* CYBER DEFENSE ARSENAL (SKILLS) */}
        <SkillsSection />

        {/* ACADEMIC FOUNDATION & CREDENTIALS (EDUCATION) */}
        <EducationSection />

        {/* ENCRYPTED UPLINK & COMMS (CONTACT ME) */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* INTERACTIVE DARK-NET TERMINAL MODAL */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
