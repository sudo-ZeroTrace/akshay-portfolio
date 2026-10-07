import React from 'react';
import { sounds } from '../utils/soundEffects';
import { Command, X, Zap, Terminal, Volume2, Palette, Shield } from 'lucide-react';

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'N', desc: 'Toggle Nyx AI Cyber Intelligence Assistant (Voice & Chat)', tag: 'AI CHAT' },
    { key: 'R', desc: 'Inspect Verified Official Resume Dossier (PDF View)', tag: 'RESUME' },
    { key: '~ / `', desc: 'Toggle Dark-Net Interactive CLI Terminal', tag: 'TERMINAL' },
    { key: 'ESC', desc: 'Close open terminal window or tactical modals', tag: 'EXIT' },
    { key: 'T', desc: 'Cycle Cyber Themes (Emerald, Cyan, Crimson, Amber)', tag: 'COLORWAYS' },
    { key: 'M', desc: 'Toggle audio sound effects on/off', tag: 'AUDIO' },
    { key: 'P', desc: 'Jump to Classified 3D Cyber Armory', tag: 'NAV' },
    { key: 'S', desc: 'Jump to Cyber & IT Defense Arsenal', tag: 'NAV' },
    { key: 'E', desc: 'Jump to Enterprise Incident & Support Log', tag: 'NAV' },
    { key: 'C', desc: 'Jump to Encrypted Communications Uplink', tag: 'NAV' },
    { key: '?', desc: 'Toggle this Tactical Hotkeys Reference Guide', tag: 'HELP' }
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sounds.playBeep(700, 0.05);
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-lg rounded-xl bg-slate-950 border border-emerald-500/60 glow-green-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
            <Command className="w-4 h-4" />
            <span>TACTICAL KEYBOARD PROTOCOLS</span>
          </div>
          <button
            onClick={() => {
              sounds.playBeep(700, 0.05);
              onClose();
            }}
            className="p-1 rounded text-gray-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-gray-400 font-mono text-xs mb-4 leading-relaxed">
          The terminal and interface support keyboard hotkeys for rapid navigation and interaction.
        </p>

        <div className="space-y-2">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80 font-mono text-xs"
            >
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-black border border-emerald-500/40 text-emerald-300 font-bold shadow-sm">
                  {sc.key}
                </kbd>
                <span className="text-gray-300">{sc.desc}</span>
              </div>
              <span className="text-[10px] text-gray-500 font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 shrink-0">
                {sc.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-900 text-center">
          <button
            onClick={() => {
              sounds.playBeep(700, 0.05);
              onClose();
            }}
            className="w-full py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-tactical font-bold text-xs transition glow-green"
          >
            ACKNOWLEDGE & RETURN
          </button>
        </div>
      </div>
    </div>
  );
}
