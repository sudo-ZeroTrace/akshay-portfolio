import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, experiences, projects, skillsData, educationData, terminalCommandsHelp } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { generateNyxResponse } from '../utils/nyxAI';
import {
  Terminal as TerminalIcon, X, CornerDownLeft, Shield, Sparkles,
  AlertCircle, Zap, Check, HelpCircle
} from 'lucide-react';

const AVAILABLE_COMMANDS = [
  'help', 'ls', 'dir', 'pwd', 'whoami', 'skills', 'projects', 'exp', 'experience',
  'edu', 'education', 'contact', 'cat', 'uname', 'uptime', 'date', 'echo',
  'ip', 'ifconfig', 'netstat', 'ss', 'top', 'htop', 'ps', 'df', 'free',
  'history', 'id', 'hostname', 'reboot', 'exit', 'matrix', 'exploit', 'ping', 'clear', 'sudo', 'nyx', 'ai'
];

export default function InteractiveTerminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: "=== DARK-NET CYBER DEFENSE TERMINAL v6.0 [NODE-KOCHI-01] ===\nType 'help' or 'ls' to inspect system commands, or 'matrix' for live cyber stream.\nOperator: D R AKSHAY // Infrastructure Security & IT Defense Engineer\nClearance: LEVEL 5 ROOT // 1,000+ Enterprise Branches Protected\n[TIP]: Press ESC or type 'exit' to close CLI. Tab key autocompletes commands."
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Global ESC key listener to reliably close terminal
  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        sounds.playBeep(700, 0.05);
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  // Auto-scroll on new output
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      sounds.playBeep(700, 0.05);
      onClose();
      return;
    }

    // TAB AUTO-COMPLETION
    if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = inputVal.trim().toLowerCase();
      if (!trimmed) return;

      const matches = AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(trimmed));
      if (matches.length === 1) {
        setInputVal(matches[0]);
        sounds.playKeypress();
      } else if (matches.length > 1) {
        sounds.playBeep(950, 0.04);
        setHistory((prev) => [
          ...prev,
          { type: 'cmd', text: inputVal },
          { type: 'output', text: `Suggested commands: ${matches.join('  ')}` }
        ]);
      }
      return;
    }

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
      const arg = parts.slice(1).join(' ').trim();

      let response = '';

      switch (mainCmd) {
        case 'help':
          response =
            "DARK-NET SYSTEM OPERATIONS & LINUX COMMANDS:\n" +
            terminalCommandsHelp.map((c) => `  ${c.cmd.padEnd(16)} - ${c.desc}`).join('\n') +
            "\n\nADDITIONAL SHORTCUTS:\n" +
            "  exit / esc     - Terminate interactive session\n" +
            "  Tab key        - Autocomplete command string";
          break;

        case 'exit':
        case 'quit':
        case 'q':
          sounds.playBeep(700, 0.05);
          onClose();
          return;

        case 'ls':
        case 'dir':
          response =
            "total 56\n" +
            "drwxr-xr-x 4 akshay sec-ops 4096 Oct 07 10:00 .\n" +
            "drwxr-xr-x 3 root   root    4096 Mar 15  2025 ..\n" +
            "-rwxr-xr-x 1 akshay sec-ops 2420 Oct 07 09:15 resume.txt\n" +
            "drwxr-xr-x 2 akshay sec-ops 4096 Oct 07 08:30 fortinet_mesh_configs/\n" +
            "-rw-r--r-- 1 akshay sec-ops 8412 Oct 07 07:45 edr_quarantine_logs.log\n" +
            "-rw-r--r-- 1 akshay sec-ops 3150 Oct 06 22:10 splunk_alerts.json\n" +
            "-rwxr-xr-x 1 akshay sec-ops 1044 Oct 06 18:20 auto_containment.sh\n" +
            "-rw-r--r-- 1 akshay sec-ops 4280 Oct 06 14:00 ad_gpo_hardening.xml\n" +
            "-rw-r--r-- 1 akshay sec-ops  512 Oct 06 11:00 contacts.pgp";
          break;

        case 'pwd':
          response = "/home/akshay/sec-ops";
          break;

        case 'whoami':
          response =
            `OPERATOR DOSSIER:\n` +
            `  Callsign:    0xAKSHAY\n` +
            `  Name:        ${personalInfo.name}\n` +
            `  Title:       ${personalInfo.title}\n` +
            `  Domain:      ${personalInfo.subtitle}\n` +
            `  Location:    ${personalInfo.location}\n` +
            `  Clearance:   LEVEL 5 ROOT // ENTERPRISE SEC_OPS\n` +
            `  Fleet Scale: 1,000+ Branches Pan-India | 3,500+ Guarded Endpoints`;
          break;

        case 'skills':
          response =
            "CYBER DEFENSE ARSENAL & VECTORS:\n" +
            skillsData.categories
              .map(
                (c) =>
                  `\n[${c.name.toUpperCase()}]\n` +
                  c.skills.map((s) => `  • ${s.name.padEnd(38)} [${s.tier || 'OPERATIONAL'}] (${s.scope || 'Enterprise'})`).join('\n')
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

        case 'uname':
          if (arg === '-a' || arg === '--all' || !arg) {
            response = "Linux sec-node-kochi 6.8.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux";
          } else if (arg === '-r') {
            response = "6.8.0-kali3-amd64";
          } else {
            response = "Linux";
          }
          break;

        case 'uptime':
          const nowStr = new Date().toLocaleTimeString();
          response =
            `${nowStr} up 142 days, 18:42,  1 user,  load average: 0.08, 0.04, 0.01\n` +
            `[ENTERPRISE UPTIME]: 1,000+ Branches Mesh Operational // SLA: 99.98%`;
          break;

        case 'date':
          response = new Date().toUTCString() + ` (${Intl.DateTimeFormat().resolvedOptions().timeZone})`;
          break;

        case 'echo':
          if (arg === '$USER') response = 'akshay';
          else if (arg === '$HOSTNAME') response = personalInfo.batcomputerNode;
          else if (arg === '$SHELL') response = '/bin/bash';
          else if (arg === '$PATH') response = '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin';
          else response = arg || '';
          break;

        case 'ip':
        case 'ifconfig':
          response =
            `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN\n` +
            `    inet 127.0.0.1/8 scope host lo\n` +
            `2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP\n` +
            `    inet 10.14.20.104/24 brd 10.14.20.255 scope global eth0\n` +
            `3: tun0 (FORTINET_IPSEC_HUB): <POINTOPOINT,UP,LOWER_UP> mtu 1420\n` +
            `    inet 172.16.0.1/16 scope global tun0\n` +
            `    tunnel state: UP // AES-256-GCM // 1,000+ Active Spoke Tunnels`;
          break;

        case 'netstat':
        case 'ss':
          response =
            `Active Internet connections (only servers & tunnels)\n` +
            `Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program\n` +
            `tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      892/sshd [PUBKEY]\n` +
            `tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      1044/caddy [TLS1.3]\n` +
            `tcp        0      0 0.0.0.0:8089            0.0.0.0:*               LISTEN      1420/splunkd\n` +
            `udp        0      0 0.0.0.0:514             0.0.0.0:*                           1102/syslog-ng\n` +
            `udp        0      0 0.0.0.0:500             0.0.0.0:*                           740/forti-ikev2`;
          break;

        case 'top':
        case 'htop':
          response =
            `top - ${new Date().toLocaleTimeString()} up 142 days, 1 user, load average: 0.08, 0.04, 0.01\n` +
            `Tasks: 148 total,   1 running, 147 sleeping,   0 stopped,   0 zombie\n` +
            `%Cpu(s):  1.2 us,  0.4 sy,  0.0 ni, 98.4 id,  0.0 wa,  0.0 hi,  0.0 si\n` +
            `MiB Mem :  16384.0 total,   6120.4 free,   7840.2 used,   2423.4 buff/cache\n\n` +
            `  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n` +
            ` 1420 akshay    20   0 1845.2M 512.4M 124.0M S   1.8   3.1  48:12.18 splunkd\n` +
            ` 1044 caddy     20   0  420.0M  68.2M  32.0M S   0.6   0.4  12:04.55 caddy\n` +
            ` 1102 syslog    20   0  210.4M  44.1M  18.2M S   0.4   0.3   8:19.40 syslog-ng\n` +
            `  892 root      20   0   45.2M  12.0M   8.4M S   0.0   0.1   0:42.11 sshd\n` +
            ` 2104 akshay    20   0  120.0M  28.4M  14.2M R   0.2   0.2   0:00.08 htop`;
          break;

        case 'ps':
          response =
            `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\n` +
            `root         1  0.0  0.1 168420 12540 ?        Ss   Mar01   2:14 /sbin/init\n` +
            `root       892  0.0  0.1  45200 12040 ?        Ss   Mar01   0:42 /usr/sbin/sshd -D\n` +
            `caddy     1044  0.6  0.4 420000 68200 ?        Ssl  Mar01  12:04 /usr/bin/caddy run\n` +
            `syslog    1102  0.4  0.3 210400 44100 ?        Ssl  Mar01   8:19 /usr/sbin/syslog-ng\n` +
            `akshay    1420  1.8  3.1 1845200 512400 ?      Sl   Mar01  48:12 splunkd -p 8089\n` +
            `akshay    2104  0.0  0.0  14500  4200 pts/0    Ss   11:26   0:00 -bash`;
          break;

        case 'df':
          response =
            `Filesystem      Size  Used Avail Use% Mounted on\n` +
            `/dev/nvme0n1p2  460G  128G  309G  30% /\n` +
            `/dev/nvme0n1p1  512M   48M  464M  10% /boot/efi\n` +
            `/dev/sda1       2.0T  640G  1.3T  33% /mnt/splunk_cold_storage\n` +
            `tmpfs           1.6G  4.2M  1.6G   1% /run`;
          break;

        case 'free':
          response =
            `               total        used        free      shared  buff/cache   available\n` +
            `Mem:           16384        7840        6120         180        2424        8364\n` +
            `Swap:           4096           0        4096`;
          break;

        case 'id':
          response = "uid=0(root) gid=0(root) groups=0(root),27(sudo),1000(akshay),1001(sec-ops)";
          break;

        case 'hostname':
          response = personalInfo.batcomputerNode;
          break;

        case 'history':
          response = cmdHistory.length > 0
            ? cmdHistory.map((cmd, i) => `  ${(i + 1).toString().padStart(3, ' ')}  ${cmd}`).join('\n')
            : "No commands in current history buffer.";
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
          const file = parts[1] ? parts[1].toLowerCase() : '';
          if (file === 'resume' || file === 'resume.txt' || file === 'resume.pdf') {
            response =
              `=== D R AKSHAY // IT SUPPORT & SECURITY ENGINEER ===\n` +
              `Summary: ${personalInfo.summary}\n` +
              `Branches Supported: 1,000+ pan-India | Endpoints: 3,500+\n` +
              `Firewall & VPN: Fortinet IPsec | EDR/XDR: K7, Seqrite, Sophos\n` +
              `Active Directory & GPO | Linux CLI | Splunk Home Lab\n` +
              `Education: BCA (Acharya's Bangalore Business School / Bangalore University)`;
          } else if (file === 'edr_quarantine_logs.log') {
            response =
              `[2026-10-07 07:45:12] [SOPHOS_XDR] Threat signature detected in mem: PID 0x48FA\n` +
              `[2026-10-07 07:45:13] [CONTAINMENT] Host isolated from VLAN 40\n` +
              `[2026-10-07 07:45:14] [ACTION] Registry keys cleaned -> quarantined hash 0x7E3F...`;
          } else if (file === 'splunk_alerts.json') {
            response =
              `{\n  "alert_id": "SEC-8092",\n  "type": "EventCode_4625_BruteForce",\n  "threshold": ">10 failures in 60s",\n  "status": "CONTAINED",\n  "quarantine_success": true\n}`;
          } else if (file === 'auto_containment.sh') {
            response =
              `#!/bin/bash\n# Enterprise automated host isolation script\nTARGET_IP=$1\necho "[*] Isolating $TARGET_IP on FortiGate mesh..."\nssh forti-admin@10.14.20.1 "diagnose endpoint isolate $TARGET_IP"\necho "[+] Host successfully quarantined."`;
          } else {
            response = `cat: ${parts[1] || 'file'}: No such file or directory. Try 'ls' to view files.`;
          }
          break;

        case 'reboot':
          sounds.playAlert();
          setHistory([
            { type: 'system', text: "[SYSTEM REBOOT INITIATED]...\nFlushing buffers...\nRestarting cyber defense daemons...\nNode WAYNE-SEC-NODE-KOCHI-01 back online in 0.02s." }
          ]);
          setInputVal('');
          return;

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

        case 'nyx':
        case 'ai':
        case 'ask':
          sounds.playNyxMessage();
          const queryParam = parts.slice(1).join(' ').trim();
          if (!queryParam) {
            response =
              `[NYX AI TACTICAL INTELLIGENCE ORACLE]\n` +
              `Status: ONLINE // LEVEL 5 ACCESS\n` +
              `Usage: nyx <your question>\n` +
              `Example: nyx tell me about resume and enterprise experience\n` +
              `[TIP]: Press 'N' key anytime to open the floating Nyx AI pop-up tab with voice talk!`;
          } else {
            const aiRes = generateNyxResponse(queryParam);
            response =
              `=== [NYX AI RESPONSE] ===\n` +
              aiRes.text.replace(/\*\*/g, '').replace(/### /g, '');
          }
          break;

        default:
          response = `bash: command not found: '${trimmed}'. Type 'help' or press Tab to view operations.`;
      }

      setHistory((prev) => [
        ...prev,
        { type: 'cmd', text: trimmed },
        { type: 'output', text: response }
      ]);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
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
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sounds.playBeep(700, 0.05);
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      {/* TERMINAL WINDOW */}
      <div className="relative w-full max-w-4xl h-[620px] max-h-[90vh] rounded-xl bg-slate-950 border border-emerald-500/50 glow-green-lg flex flex-col overflow-hidden shadow-2xl">
        {/* WINDOW TITLE BAR */}
        <div className="h-10 bg-slate-900 border-b border-emerald-500/30 px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span
              onClick={() => {
                sounds.playBeep(700, 0.05);
                onClose();
              }}
              title="Close terminal"
              className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer hover:bg-red-400"
            />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <div className="flex items-center gap-2 ml-2 text-xs font-mono text-emerald-400 font-bold">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>root@darknet-sec-ops:~# [BASH_CLI]</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-emerald-400/80 bg-slate-950 px-2 py-0.5 rounded border border-emerald-500/30">
              PRESS <strong className="text-white">ESC</strong> TO CLOSE
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
            <span className="text-cyan-400 font-bold shrink-0">akshay@sec-ops:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-emerald-300 min-w-0"
              autoFocus
              spellCheck={false}
              placeholder="type 'help', 'ls', 'whoami' or 'exit'..."
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* TERMINAL FOOTER WITH EXPANDED QUICK COMMAND PILLS */}
        <div className="p-2.5 bg-slate-950 border-t border-emerald-500/20 flex items-center justify-between gap-2 overflow-x-auto text-[11px] font-mono">
          <div className="flex items-center gap-1.5 shrink-0 flex-nowrap">
            <span className="text-gray-500">QUICK:</span>
            {['help', 'ls', 'whoami', 'skills', 'projects', 'cat resume', 'uptime', 'matrix', 'exploit', 'clear', 'exit'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  sounds.playKeypress();
                  setInputVal(cmd);
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 font-bold transition whitespace-nowrap"
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
