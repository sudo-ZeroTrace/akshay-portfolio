import React, { useState } from 'react';
import { experiences } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import {
  Server, Shield, Radio, CheckCircle, ChevronDown,
  Building, Calendar, MapPin, Award, Terminal, Cpu, Zap
} from 'lucide-react';

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState(experiences[0].id);

  const toggleExpand = (id) => {
    sounds.playBeep(950, 0.04);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* SECTION HEADER */}
      <div className="mb-12 pb-4 border-b border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
          <Server className="w-4 h-4 text-emerald-400" />
          <span>Operational Incident Telemetry // Enterprise Infrastructure</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-tactical text-white tracking-wide">
          INCIDENT RESPONSE & EXPERIENCE
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-1 font-mono max-w-2xl">
          Centralized defense and IT support protecting 1,000+ branch endpoints across India.
        </p>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative border-l-2 border-emerald-500/30 ml-4 sm:ml-8 space-y-12">
        {experiences.map((exp, idx) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div key={exp.id} className="relative pl-6 sm:pl-10">
              {/* TIMELINE BLIP */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center glow-green">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* CARD CONTAINER */}
              <div
                className={`rounded-xl bg-slate-950/85 border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                  isExpanded
                    ? 'border-emerald-500/60 glow-green'
                    : 'border-slate-800 hover:border-emerald-500/30'
                }`}
              >
                {/* CARD HEADER (CLICKABLE) */}
                <div
                  onClick={() => toggleExpand(exp.id)}
                  className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-slate-900/40"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {exp.status}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-gray-400">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-gray-400">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-tactical text-white tracking-wide">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-mono text-emerald-400 font-semibold mt-0.5">
                      <Building className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-xs font-mono text-gray-500">
                      {isExpanded ? '[COLLAPSE DOSSIER]' : '[EXPAND TELEMETRY]'}
                    </span>
                    <div className={`p-2 rounded-lg bg-slate-900 border border-emerald-500/20 text-emerald-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* EXPANDED CONTENT */}
                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-slate-900 space-y-6 animate-fadeIn">
                    <p className="text-sm font-sans text-gray-300 leading-relaxed">
                      {exp.summary}
                    </p>

                    <div>
                      <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
                        [ CRITICAL INCIDENT RESPONSE & SUPPORT OPERATIONS ]
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                        [ APPLIED SECURITY TECHNOLOGIES ]
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/20 text-emerald-300 font-mono text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
