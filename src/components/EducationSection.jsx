import React from 'react';
import { educationData } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen, CheckCircle, ShieldCheck, Cpu } from 'lucide-react';

export default function EducationSection() {
  const edu = educationData[0];

  const certifications = [
    {
      name: "Enterprise Incident Response & Malware Forensics",
      provider: "Practical Field Telemetry (K7 / Sophos / Seqrite)",
      status: "VERIFIED",
      year: "2025 – 2026"
    },
    {
      name: "Fortinet Firewalls & IPsec VPN Network Mesh",
      provider: "FortiGate Administration & Traffic Security",
      status: "VERIFIED",
      year: "2025 – 2026"
    },
    {
      name: "Web Application Security & Burp Suite Auditing",
      provider: "OWASP Top 10 & API Vulnerability Assessment",
      status: "IN PROGRESS",
      year: "2026"
    },
    {
      name: "Linux Systems Administration & Hardening",
      provider: "Ubuntu / CentOS / Kali CLI & Bash Automation",
      status: "ACTIVE",
      year: "2024 – 2026"
    }
  ];

  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* SECTION HEADER */}
      <div className="mb-12 pb-4 border-b border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>Academic Foundation & Certifications // Knowledge Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-tactical text-white tracking-wide">
          EDUCATION & CREDENTIALS
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-1 font-mono max-w-2xl">
          Formal Computer Applications degree grounded with rigorous field training in distributed infrastructure and cyber operations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* DEGREE CARD (2 SPANS) */}
        <div className="lg:col-span-2 rounded-xl bg-slate-950/85 border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-md glow-green flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {edu.badge}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {edu.period}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-tactical text-white mb-2">
              {edu.degree}
            </h3>

            <div className="text-sm font-mono text-emerald-300 mb-1">
              {edu.institution}
            </div>
            <div className="text-xs font-mono text-gray-400 mb-6">
              AFFILIATED WITH {edu.university} • {edu.location}
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                [ CORE COMPUTER SCIENCE & NETWORKING DISCIPLINES ]
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {edu.focus.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5 text-xs text-gray-300"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-mono text-gray-500">
            <span>VERIFIED DEGREE CREDENTIAL</span>
            <span className="text-emerald-400 font-bold">AUTHENTICATED</span>
          </div>
        </div>

        {/* CERTIFICATIONS & UPSKILLING CARD (1 SPAN) */}
        <div className="rounded-xl bg-slate-950/85 border border-emerald-500/20 p-6 backdrop-blur-md glow-green flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4 pb-2 border-b border-slate-900">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>TACTICAL SPECIALIZATION TRACKS</span>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-gray-400">{cert.year}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold ${
                        cert.status === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : cert.status === 'IN PROGRESS'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold font-mono text-white mb-1">
                    {cert.name}
                  </div>
                  <div className="text-[11px] font-sans text-gray-400">
                    {cert.provider}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-900 text-center font-mono text-[11px] text-gray-500">
            CONTINUOUS BLUE-TEAM RECONNAISSANCE
          </div>
        </div>
      </div>
    </section>
  );
}
