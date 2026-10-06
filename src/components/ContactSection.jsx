import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import {
  Mail, Phone, MapPin, Send, Check, Copy,
  Shield, Radio, Lock, Terminal, MessageSquare, ExternalLink,
  Cpu, Zap
} from 'lucide-react';

export default function ContactSection() {
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyToClipboard = (text, fieldName) => {
    sounds.playBeep(1200, 0.05);
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playAlert();
    setIsSubmitted(true);

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      `[SECURITY TRANSMISSION] ${formData.subject || 'Portfolio Inquiry'}`
    )}&body=${encodeURIComponent(
      `From: ${formData.senderName} (${formData.senderEmail})\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* SECTION HEADER */}
      <div className="mb-12 pb-4 border-b border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Encrypted Uplink // Quantum Secure Channel</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-tactical text-white tracking-wide">
          INITIATE SECURE COMMS
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-1 font-mono max-w-2xl">
          Direct communication frequencies to D R Akshay for enterprise infrastructure defense, security engineering, and incident triage roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* DIRECT CHANNELS CARD (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl bg-slate-950/85 border border-emerald-500/35 p-6 sm:p-8 backdrop-blur-md glow-green">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-6 pb-2 border-b border-slate-900">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>DIRECT CONTACT MATRIX</span>
            </div>

            <div className="space-y-6">
              {/* EMAIL */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mt-1">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-gray-500">PRIMARY TRANSMISSION</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-mono font-bold text-white hover:text-emerald-300 transition"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  className="p-2 rounded bg-slate-900 border border-slate-800 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 transition"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* PHONE */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mt-1">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-gray-500">VOICE / SECURE COMMS</div>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm font-mono font-bold text-white hover:text-emerald-300 transition"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                  className="p-2 rounded bg-slate-900 border border-slate-800 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 transition"
                  title="Copy Phone"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-gray-500">TACTICAL BASE OF OPERATIONS</div>
                  <div className="text-sm font-mono font-bold text-white">
                    {personalInfo.location}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400/80 mt-0.5">
                    COORDINATES: 9.9312° N, 76.2673° E
                  </div>
                </div>
              </div>
            </div>

            {/* VERIFIED PROFILES */}
            <div className="mt-8 pt-6 border-t border-slate-900">
              <div className="text-xs font-mono text-gray-400 mb-3">
                [ VERIFIED NETWORK PROFILES ]
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {/* LINKEDIN */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-300 text-gray-300 font-mono text-xs transition"
                >
                  <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>

                {/* GITHUB */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-300 text-gray-300 font-mono text-xs transition"
                >
                  <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>

                {/* X (TWITTER) */}
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-300 text-gray-300 font-mono text-xs transition"
                >
                  <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X (Twitter)</span>
                </a>

                {/* INSTAGRAM */}
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-300 text-gray-300 font-mono text-xs transition"
                >
                  <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* TRANSMISSION FORM (7 COLS) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-slate-950/85 border border-emerald-500/35 p-6 sm:p-8 backdrop-blur-md glow-green space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-900">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <MessageSquare className="w-4 h-4" />
                <span>DISPATCH ENCRYPTED PACKET</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>QUANTUM TLS 1.3 SECURED</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">
                  CALLSIGN / SENDER NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise SecOps Lead"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1">
                  RETURN FREQUENCY / EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@enterprise.com"
                  value={formData.senderEmail}
                  onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                TRANSMISSION SUBJECT *
              </label>
              <input
                type="text"
                required
                placeholder="Enterprise Security Role / Infrastructure Consultation"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                MESSAGE PAYLOAD *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Enter telemetry specifications, job requirements, or project scope..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-emerald-400 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-tactical font-bold text-base transition flex items-center justify-center gap-2 glow-green hover:shadow-[0_0_25px_rgba(0,255,102,0.6)]"
            >
              <Send className="w-4 h-4" />
              <span>Transmit Encrypted Packet</span>
            </button>

            {isSubmitted && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 font-mono text-xs text-center animate-fadeIn glow-green">
                ✓ Transmission dispatched to mail client! Alternatively, reach out directly at dr.akxhay@gmail.com
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
