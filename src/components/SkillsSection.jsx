import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import {
  ShieldAlert, Server, Lock, Terminal, Search,
  Cpu, CheckCircle2, ChevronRight, Sparkles, Filter, Zap
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
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, skills: matchingSkills };
  }).filter((cat) => cat.skills.length > 0);

  const handleSkillClick = (skill) => {
    sounds.playBeep(1100, 0.05);
    setInspectedSkill(skill);
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
          Multi-domain proficiencies across endpoint protection, network infrastructure, Linux CLI administration, and web security.
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
            placeholder="Search defense skills..."
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
              className="rounded-xl bg-slate-950/85 border border-emerald-500/20 p-6 backdrop-blur-md glow-green"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-900">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-tactical text-white">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-mono text-gray-500">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* SKILLS LIST */}
              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => handleSkillClick(skill)}
                    className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="text-gray-200 group-hover:text-emerald-300 font-bold transition">
                        {skill.name}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-400 rounded-full transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* INSPECTION MODAL */}
      {inspectedSkill && (
        <div className="mt-8 p-4 rounded-xl bg-slate-950/90 border border-emerald-500/50 glow-green flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-gray-400">OPERATIONAL CAPABILITY: </span>
              <span className="text-emerald-300 font-bold">{inspectedSkill.name}</span>
              <span className="text-gray-500 ml-2">({inspectedSkill.level}% Field Readiness)</span>
            </div>
          </div>
          <button
            onClick={() => setInspectedSkill(null)}
            className="px-3 py-1 rounded bg-slate-800 text-gray-300 hover:text-white"
          >
            [DISMISS]
          </button>
        </div>
      )}
    </section>
  );
}
