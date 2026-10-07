import React from 'react';
import { sounds } from '../utils/soundEffects';
import { personalInfo, experiences, educationData } from '../data/portfolioData';
import { resumeDetails } from '../data/nyxKnowledgeBase';
import {
  FileText, Download, Printer, X, ExternalLink,
  Shield, CheckCircle2, Building, GraduationCap,
  Mail, Phone, MapPin, Sparkles
} from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playBeep(1100, 0.05);
    const printWindow = window.open('/akshay-resume.html', '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  const handleDownload = () => {
    sounds.playAlert();
    const link = document.createElement('a');
    link.href = '/akshay-resume.html';
    link.target = '_blank';
    link.download = 'D_R_Akshay_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sounds.playBeep(700, 0.05);
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-950 border border-emerald-500/50 shadow-[0_0_50px_rgba(0,255,102,0.25)] overflow-hidden">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/30 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-tactical font-bold text-white tracking-wide">
                  OFFICIAL RESUME DOSSIER // D R AKSHAY
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs font-mono text-gray-400">
                IT Support & Security Engineer • Enterprise Operations (1,000+ Branches)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-mono text-xs font-bold hover:bg-emerald-400 transition shadow-sm glow-green"
              title="Print or Save to PDF via system dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                sounds.playBeep(700, 0.05);
                onClose();
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* RESUME SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans text-gray-200">
          {/* TOP PROFILE BANNER */}
          <div className="border-b border-emerald-500/20 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {personalInfo.name}
                </h1>
                <p className="text-emerald-400 font-tactical text-base font-semibold tracking-wide mt-1">
                  {personalInfo.title}
                </p>
                <p className="text-xs font-mono text-gray-400 mt-0.5">
                  {personalInfo.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 text-xs font-mono text-gray-300">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {personalInfo.location}
                </span>
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" /> {personalInfo.email}
                </a>
                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> {personalInfo.phone}
                </a>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" /> github.com/sudo-ZeroTrace
                </a>
              </div>
            </div>
          </div>

          {/* EXECUTIVE SUMMARY */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Executive Profile Summary</span>
            </h4>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-sm leading-relaxed text-gray-300">
              {personalInfo.summary}
            </div>
          </div>

          {/* WORK EXPERIENCE */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
              <Building className="w-4 h-4 text-emerald-400" />
              <span>Enterprise Work Experience</span>
            </h4>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <span className="text-base font-bold text-white font-tactical">
                        {exp.role}
                      </span>
                      <span className="text-emerald-400 font-semibold ml-2 text-sm">
                        @ {exp.company}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">
                      {exp.period} • {exp.location}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 italic">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-emerald-500/25 text-emerald-300 text-[11px] font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CORE TECHNICAL SKILLS MATRIX */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Technical Skills Matrix</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs font-mono font-bold text-white mb-2 uppercase">IT Support & Fleet Ops</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  1,000+ Branch Support, End-User Troubleshooting, AnyDesk / UltraViewer Remote Ops, Windows 10/11 Pro, Hardware Diagnostics, Asset Lifecycle Registers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs font-mono font-bold text-white mb-2 uppercase">Cyber Defense & Incident Triage</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Sophos XDR, Seqrite Endpoint, K7 Security, Host Network Isolation, Malware Forensics, Log Analysis, Splunk Home Lab, Burp Suite, Nmap, Wireshark.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs font-mono font-bold text-white mb-2 uppercase">Network & Identity Defense</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Fortinet FortiGate Firewalls, IPsec Site-to-Site VPN (IKEv2 AES-256), Active Directory Domain Services (AD DS), Group Policy (GPO), TCP/IP, DNS, DHCP.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs font-mono font-bold text-white mb-2 uppercase">Linux, Systems & Cloud</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Linux CLI (Ubuntu, CentOS, Kali), Bash Automation Scripting, Docker Containers, Caddy & Nginx Reverse Proxy, AWS Cloud Fundamentals, Encrypted Backups.
                </p>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Academic Foundation</span>
            </h4>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-sm font-bold text-white">
                  {educationData[0].degree}
                </div>
                <div className="text-xs text-emerald-400 font-mono">
                  {educationData[0].institution} • {educationData[0].university}
                </div>
              </div>
              <div className="text-xs font-mono text-gray-400">
                {educationData[0].period} • {educationData[0].location}
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3 border-t border-slate-900 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-400">
          <span>D R AKSHAY • VERIFIED RESUME DOSSIER</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="text-emerald-400 hover:text-emerald-300 underline font-bold flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Printable View</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
