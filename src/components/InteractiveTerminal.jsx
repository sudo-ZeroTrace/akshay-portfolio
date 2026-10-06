import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, experiences, projects, skillsData, educationData, terminalCommandsHelp } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import {
  Terminal as TerminalIcon, X, Minus, Square,
  CornerDownLeft, Shield, Sparkles, AlertCircle, Zap
} from 'lucide-react';

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: "=== DARK-NET CYBER DEFENSE TERMINAL v5.8 [NODE-KOCHI-01] ===\nType 'help' to inspect system commands, or 'matrix' for live cyber stream.\nOperator: D R AKSHAY // Infrastructure Security & IT Defense Engineer\nClearance: LEVEL 5 ROOT // 1,000+ Enterprise Branches Protected"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      sounds.playKeypress();

      if (!trimmed) {
        setHistory((prev) => [...prev, { type: 'cmd', text: '' }]);
        return;
      }

      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.split(' ');
      const mainCmd = parts[0].toLowerCase();

      let response = '';

      switch (mainCmd) {
        case 'help':
          response =
            "DARK-NET TERMINAL COMMANDS:\n" +
            terminalCommandsHelp.map((c) => `  ${c.cmd.padEnd(14)} - ${c.desc}`).join('\n') +
            "\n  matrix         - Stream matrix cyber rain & hacker ASCII core\n  exploit        - Run zero-day intrusion defense simulation";
          break;

        case 'whoami':
          response =
            `OPERATOR DOSSIER:\n` +
            `  Callsign:    0xAKSHAY\n` +
            `  Name:        ${personalInfo.name}\n` +
            `  Title:       ${personalInfo.title}\n` +
            `  Domain:      ${personalInfo.subtitle}\n` +
            `  Location:    ${personalInfo.location}\n` +
            `  Clearance:   ROOT // ENTERPRISE SEC_OPS\n` +
            `  Fleet Scale: 1,000+ Branches Pan-India | 3,500+ Guarded Endpoints`;
          break;

        case 'skills':
          response =
            "CYBER DEFENSE ARSENAL & VECTORS:\n" +
            skillsData.categories
              .map(
                (c) =>
                  `\n[${c.name.toUpperCase()}]\n` +
                  c.skills.map((s) => `  • ${s.name.padEnd(38)} [${s.level}%]`).join('\n')
              )
              .join('');
          break;

        case 'projects':
          response =
            "CLASSIFIED 3D CYBER ARMORY:\n" +
            projects
              .map(
                (p, idx) =>
                  `  [0${idx + 1}] ${p.codename.padEnd(28)} | ${p.title}\n      Blueprint: ${p.architecture}`
              )
              .join('\n\n');
          break;

        case 'exp':
        case 'experience':
          response =
            "INCIDENT RESPONSE & EMPLOYMENT LOG:\n" +
            experiences
              .map(
                (exp) =>
                  `  • ${exp.role} @ ${exp.company} (${exp.period})\n    Location: ${exp.location}\n    Operations: ${exp.summary}`
              )
              .join('\n\n');
          break;

        case 'edu':
        case 'education':
          const edu = educationData[0];
          response =
            `ACADEMIC CREDENTIALS:\n` +
            `  Degree:      ${edu.degree}\n` +
            `  Institution: ${edu.institution}\n` +
            `  University:  ${edu.university}\n` +
            `  Period:      ${edu.period} (${edu.location})`;
          break;

        case 'contact':
          response =
            `ENCRYPTED COMMS FREQUENCIES:\n` +
            `  Email:    ${personalInfo.email}\n` +
            `  Phone:    ${personalInfo.phone}\n` +
            `  LinkedIn: ${personalInfo.linkedin}\n` +
            `  GitHub:   ${personalInfo.github}`;
          break;

        case 'cat':
          if (parts[1] === 'resume' || parts[1] === 'resume.txt') {
            response =
              `=== D R AKSHAY // IT SUPPORT & SECURITY ENGINEER ===\n` +
              `Summary: ${personalInfo.summary}\n` +
              `Branches Supported: 1,000+ pan-India | Endpoints: 3,500+\n` +
              `Firewall & VPN: Fortinet IPsec | EDR/XDR: K7, Seqrite, Sophos\n` +
              `Active Directory & GPO | Linux CLI | Splunk Home Lab\n` +
              `Education: BCA (Acharya's Bangalore Business School / Bangalore University)`;
          } else {
            response = `cat: ${parts[1] || 'file'}: No such file or directory. Try 'cat resume'.`;
          }
          break;

        case 'matrix':
        case 'batman':
        case 'hacker':
          sounds.playAlert();
          response = `
         .---.
        /     \\
       | () () |       [CYBER CORE // ROOT GRANTED]
        \\  -  /        "Zero-day intrusion neutralized. Network fortified."
       .-'\`---'\`-.      
      / /       \\ \\    01000001 01001011 01010011 01001000 01000001 01011001
     / / |     | \\ \\   IPSEC_MESH: 1,000+ BRANCHES ENCRYPTED
    /_/  |     |  \\_\\  EDR_FLEET: K7 / SEQRITE / SOPHOS XDR ARMED
         |     |       FORTINET_RULES: ZERO PACKET LEAK
        /       \\
       /         \\

[CYBER RECONNAISSANCE PROTOCOL ENGAGED]
D R Akshay // Defending Distributed Enterprise Infrastructure Across India.`;
          break;

        case 'exploit':
          sounds.playAlert();
          response =
            `[SIMULATING ZERO-DAY BUFFER OVERFLOW ATTEMPT]...\n` +
            `• Target: 10.14.20.104:443 (Reverse Proxy)\n` +
            `• Payload: Shellcode injection attempt (T1055)\n` +
            `• Sophos XDR Detection: Intercepted in memory buffer\n` +
            `• Fortinet Firewall Action: Automated IP quarantine\n` +
            `• RESULT: ATTACK ZEROIZED IN 0.04s. ALL 1,000+ NODES SECURE.`;
          break;

        case 'ping':
          const host = parts[1] || '1.1.1.1';
          response =
            `PING ${host} (56 data bytes)\n` +
            `64 bytes from ${host}: icmp_seq=1 ttl=57 time=11.2 ms\n` +
            `64 bytes from ${host}: icmp_seq=2 ttl=57 time=10.8 ms\n` +
            `64 bytes from ${host}: icmp_seq=3 ttl=57 time=11.1 ms\n` +
            `--- ${host} ping statistics ---\n` +
            `3 packets transmitted, 3 received, 0% packet loss, rtt avg 11.0ms`;
          break;

        case 'clear':
          setHistory([]);
          setInputVal('');
          return;

        case 'sudo':
          sounds.playAlert();
          response = `[ROOT ACCESS GRANTED]: Welcome Operator Akshay. All cyber defense playbooks unlocked.`;
          break;

        default:
          response = `bash: command not found: '${trimmed}'. Type 'help' to view available operations.`;
      }

      setHistory((prev) => [
        ...prev,
        { type: 'cmd', text: trimmed },
        { type: 'output', text: response }
      ]);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* TERMINAL WINDOW */}
      <div className="relative w-full max-w-4xl h-[620px] rounded-xl bg-slate-950 border border-emerald-500/50 glow-green-lg flex flex-col overflow-hidden shadow-2xl">
        {/* WINDOW TITLE BAR */}
        <div className="h-10 bg-slate-900 border-b border-emerald-500/30 px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <div className="flex items-center gap-2 ml-2 text-xs font-mono text-emerald-400 font-bold">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>root@darknet-sec-ops:~# [BASH_CLI]</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-gray-500 hidden sm:inline">
              ESC TO CLOSE
            </span>
            <button
              onClick={() => {
                sounds.playBeep(700, 0.05);
                onClose();
              }}
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TERMINAL BUFFER */}
        <div
          onClick={() => inputRef.current && inputRef.current.focus()}
          className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 bg-black/95 scanlines text-gray-200"
        >
          {history.map((item, idx) => (
            <div key={idx}>
              {item.type === 'system' && (
                <div className="text-emerald-400/90 whitespace-pre-wrap leading-relaxed border-b border-emerald-500/20 pb-3">
                  {item.text}
                </div>
              )}
              {item.type === 'cmd' && (
                <div className="flex items-center gap-2 text-white">
                  <span className="text-cyan-400 font-bold">akshay@sec-ops:~$</span>
                  <span>{item.text}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
                  {item.text}
                </div>
              )}
            </div>
          ))}

          {/* ACTIVE COMMAND INPUT */}
          <div className="flex items-center gap-2 text-white pt-2">
            <span className="text-cyan-400 font-bold">akshay@sec-ops:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-emerald-300"
              autoFocus
              spellCheck={false}
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* TERMINAL FOOTER WITH QUICK COMMAND PILLS */}
        <div className="p-2.5 bg-slate-950 border-t border-emerald-500/20 flex items-center justify-between gap-2 overflow-x-auto text-[11px] font-mono">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-gray-500">QUICK:</span>
            {['help', 'whoami', 'skills', 'projects', 'matrix', 'exploit', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  sounds.playKeypress();
                  setInputVal(cmd);
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-bold transition"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="text-gray-500 shrink-0 hidden md:block">
            AUTHENTICATED: ROOT PRIVILEGES
          </div>
        </div>
      </div>
    </div>
  );
}
