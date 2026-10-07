import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import {
  ShieldAlert, Server, Lock, Terminal, Search,
  Cpu, CheckCircle2, ChevronRight, Sparkles, Filter, Zap,
  Activity, Shield, Check, X
} from 'lucide-react';

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedSkill, setInspectedSkill] = useState(null);

  const iconMap = {
    Server: Server,
    ShieldAlert: ShieldAlert,
    Lock: Lock,
    Terminal: Terminal
  };

  const filteredCategories = skillsData.categories.map((cat) => {
    const isCatMatch = activeTab === 'all' || activeTab === cat.id;
    if (!isCatMatch) return { ...cat, skills: [] };

    const matchingSkills = cat.skills.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.scope && s.scope.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.tier && s.tier.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return { ...cat, skills: matchingSkills };
  }).filter((cat) => cat.skills.length > 0);

  const handleSkillClick = (skill, catName) => {
    sounds.playBeep(1100, 0.05);
    setInspectedSkill({ ...skill, categoryName: catName });
  };

  // Helper for tier color themes
  const getTierBadgeStyle = (tier) => {
    switch (tier) {
      case 'CORE EXPERTISE':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(0,255,102,0.2)]';
      case 'SPECIALIST':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]';
      case 'HARDENED':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'PRACTITIONER':
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.15)]';
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* SECTION HEADER */}
      <div className="mb-10 pb-4 border-b border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Arsenal & Competencies // Defense Grid</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-tactical text-white tracking-wide">
          CYBER & IT DEFENSE ARSENAL
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-1 font-mono max-w-2xl">
          Multi-domain enterprise capabilities categorized by operational readiness, practical deployment scope, and tier specializations across 1,000+ branches.
        </p>
      </div>

      {/* FILTER CONTROLS & SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              sounds.playBeep(900, 0.04);
              setActiveTab('all');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition ${
              activeTab === 'all'
                ? 'bg-emerald-500 text-slate-950 glow-green'
                : 'bg-slate-950/80 text-gray-400 border border-slate-800 hover:text-emerald-300 hover:border-emerald-500/30'
            }`}
          >
            [ALL ARSENAL]
          </button>
          {skillsData.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playBeep(900, 0.04);
                setActiveTab(cat.id);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition ${
                activeTab === cat.id
                  ? 'bg-emerald-500 text-slate-950 glow-green'
                  : 'bg-slate-950/80 text-gray-400 border border-slate-800 hover:text-emerald-300 hover:border-emerald-500/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search defense competencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950/90 border border-emerald-500/30 text-white font-mono text-xs focus:outline-none focus:border-emerald-400 placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* SKILLS CATEGORIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCategories.map((cat) => {
          const IconComp = iconMap[cat.icon] || ShieldAlert;
          return (
            <div
              key={cat.id}
              className="rounded-xl bg-slate-950/85 border border-emerald-500/20 p-6 backdrop-blur-md glow-green hover:border-emerald-500/40 transition duration-300"
            >
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-900">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-tactical text-white">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-mono text-gray-400">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* SKILLS LIST WITHOUT PERCENTAGES */}
              <div className="grid grid-cols-1 gap-3">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => handleSkillClick(skill, cat.name)}
                    className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/50 hover:bg-slate-900 transition cursor-pointer group flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Tactical status beacon dot */}
                      <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:shadow-[0_0_8px_#00ff66] shrink-0" />
                      <div className="truncate">
                        <div className="text-xs font-mono font-bold text-gray-200 group-hover:text-emerald-300 transition truncate">
                          {skill.name}
                        </div>
                        <div className="text-[11px] font-mono text-gray-500 truncate mt-0.5">
                          Scope: <span className="text-gray-400">{skill.scope || 'Enterprise Deployment'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Operational Tier Badge */}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getTierBadgeStyle(skill.tier)}`}>
                        {skill.tier || 'OPERATIONAL'}
                      </span>

                      {/* Tactical 4-segment telemetry strength LED indicator */}
                      <div className="hidden sm:flex items-center gap-0.5" title="Deployment Status: Full Operational Capability">
                        <span className="w-1 h-3 rounded-xs bg-emerald-400 shadow-[0_0_4px_#00ff66]" />
                        <span className="w-1 h-3 rounded-xs bg-emerald-400 shadow-[0_0_4px_#00ff66]" />
                        <span className="w-1 h-3 rounded-xs bg-emerald-400 shadow-[0_0_4px_#00ff66]" />
                        <span className="w-1 h-3 rounded-xs bg-emerald-400 shadow-[0_0_4px_#00ff66]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* INSPECTION MODAL / LIVE DOSSIER POPUP */}
      {inspectedSkill && (
        <div className="mt-8 p-4 sm:p-5 rounded-xl bg-slate-950/95 border border-emerald-500/60 glow-green-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs backdrop-blur-md animate-fadeIn">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shrink-0">
              <Zap className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-gray-400 font-bold uppercase">[COMPETENCY DOSSIER]</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getTierBadgeStyle(inspectedSkill.tier)}`}>
                  {inspectedSkill.tier}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 border border-slate-700 text-gray-300">
                  STATUS: {inspectedSkill.status || 'PRODUCTION READY'}
                </span>
              </div>
              <div className="text-white font-bold text-sm">
                {inspectedSkill.name}
              </div>
              <div className="text-gray-400 text-[11px] mt-0.5">
                Domain: <span className="text-emerald-300">{inspectedSkill.categoryName}</span> | Field Application: <span className="text-cyan-300 font-bold">{inspectedSkill.scope}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playBeep(700, 0.05);
              setInspectedSkill(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-gray-300 hover:text-white hover:border-emerald-500/50 transition self-end md:self-center"
          >
            <X className="w-3.5 h-3.5" />
            <span>DISMISS</span>
          </button>
        </div>
      )}
    </section>
  );
}
