// Nyx AI Tactical Intelligence Engine
// Zero-dependency, ultra-fast client-side natural language response system
import { personalInfo, experiences, projects, skillsData, educationData } from '../data/portfolioData';
import { resumeDetails } from '../data/nyxKnowledgeBase';

// Normalizes and cleans user text for intent matching
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Checks if any of the keywords or phrases exist in the input
function matchesAny(input, keywords) {
  return keywords.some((kw) => {
    if (kw.includes(' ')) {
      return input.includes(kw);
    }
    const regex = new RegExp(`\\b${kw}\\b`, 'i');
    return regex.test(input);
  });
}

// Formats Markdown-like text into structured HTML or clean markdown for chat display
export function generateNyxResponse(userQuery) {
  const query = normalizeText(userQuery);

  // 1. RESUME & PDF INTENT
  if (
    matchesAny(query, [
      'resume', 'cv', 'curriculum vitae', 'pdf', 'resume pdf', 'download resume',
      'view resume', 'print resume', 'biodata', 'resume summary', 'get resume',
      'send resume', 'show resume', 'profile pdf'
    ])
  ) {
    return {
      text:
        `📄 **D R AKSHAY — RESUME DOSSIER & PDF**\n\n` +
        `**Title:** ${personalInfo.title}\n` +
        `**Current Mission:** IT Support Engineer at **Muthoot Mcred Limited** (1,000+ branches pan-India)\n` +
        `**Endpoints Protected:** 3,500+ across EDR/XDR fleet (Sophos XDR, Seqrite, K7 Security)\n` +
        `**Infrastructure Core:** Fortinet IPsec VPN, Active Directory & GPO, Linux, TCP/IP, Splunk SIEM\n` +
        `**Education:** BCA from Acharya's Bangalore Business School / Bangalore University (2021–2024)\n\n` +
        `Akshay's verified resume is available for immediate interactive viewing or direct PDF printing/downloading. You can trigger the viewer modal below:`,
      actionButtons: [
        { label: '📄 View / Print Resume PDF', action: 'open_resume', icon: 'FileText' },
        { label: '📥 Download Resume', action: 'download_resume', icon: 'Download' },
        { label: '💼 Enterprise Experience', action: 'send_query', query: 'Tell me about his experience at Muthoot Mcred' }
      ],
      followUps: [
        'What are his key daily responsibilities?',
        'Which firewalls and EDR tools does he use?',
        'How can I contact Akshay directly?'
      ]
    };
  }

  // 2. EXPERIENCE INTENT (MUTHOOT & MAIJO)
  if (
    matchesAny(query, [
      'experience', 'work', 'job', 'jobs', 'career', 'employment', 'history',
      'muthoot', 'mcred', 'maijo', 'maruti', 'branches', 'current role',
      'company', 'companies', 'workplace', 'responsibilities'
    ])
  ) {
    const isMuthoot = matchesAny(query, ['muthoot', 'mcred', 'current', '1000', 'present']);
    const isMaijo = matchesAny(query, ['maijo', 'suzuki', 'arena', 'maruti', 'past', 'previous']);

    if (isMuthoot) {
      const muthoot = experiences[0];
      return {
        text:
          `🏢 **CURRENT ENTERPRISE MISSION: ${muthoot.company}**\n\n` +
          `**Role:** ${muthoot.role} (${muthoot.period})\n` +
          `**Location:** ${muthoot.location}\n` +
          `**Scale:** ${muthoot.summary}\n\n` +
          `**Key Operational Highlights:**\n` +
          `• **EDR/XDR Fleet:** Administering Sophos XDR, Seqrite Endpoint, and K7 Security across **3,500+ endpoints**.\n` +
          `• **Threat Containment:** Rapidly isolating compromised nodes, analyzing telemetry logs, neutralizing malware outbreaks, and validating remediation.\n` +
          `• **Fortinet Firewalls & IPsec VPN:** Managing FortiGate rule enforcement, monitoring encrypted branch traffic tunnels, and debugging WAN/LAN routing.\n` +
          `• **Identity Governance:** Active Directory Domain Services, Group Policy Objects (GPO) lockdown, OU structures, user lifecycle management, and credential hygiene.\n` +
          `• **Infrastructure Uptime:** 99.9% SLA maintenance across DNS, DHCP, switches, routers, and automated data backups.`,
        actionButtons: [
          { label: '📍 Jump to Experience Section', action: 'scroll_section', target: 'experience', icon: 'ExternalLink' },
          { label: '🛡️ View EDR/Security Skills', action: 'send_query', query: 'What are his EDR and security skills?' },
          { label: '📄 Resume Summary', action: 'open_resume', icon: 'FileText' }
        ],
        followUps: [
          'What was his role at Maijo Moto?',
          'What projects has he built?',
          'How does he handle malware incidents?'
        ]
      };
    }

    if (isMaijo) {
      const maijo = experiences[1];
      return {
        text:
          `🏢 **PRIOR MISSION: ${maijo.company}**\n\n` +
          `**Role:** ${maijo.role} (${maijo.period})\n` +
          `**Location:** ${maijo.location}\n` +
          `**Scale:** ${maijo.summary}\n\n` +
          `**Key Accomplishments:**\n` +
          `• **Single Point of IT Contact:** Supported 8 branches, 300+ end-user PCs, network printers, biometric attendance, and CCTV network.\n` +
          `• **Network Troubleshooting:** Diagnosed LAN congestion, IP address conflicts, DNS gateway errors, and VPN drops.\n` +
          `• **Remote Incident Triage:** Rapid remote support via AnyDesk & UltraViewer for critical showroom and workshop ERP applications.\n` +
          `• **Identity & Governance:** Managed Active Directory accounts, hardware asset registries, and vendor SLAs.`,
        actionButtons: [
          { label: '📍 View Incident Log', action: 'scroll_section', target: 'experience', icon: 'ExternalLink' },
          { label: '🏢 Tell me about Muthoot Mcred', action: 'send_query', query: 'What does he do at Muthoot Mcred?' }
        ],
        followUps: [
          'What is his current role at Muthoot?',
          'What are his core cybersecurity skills?',
          'Where did he study?'
        ]
      };
    }

    return {
      text:
        `💼 **ENTERPRISE INFRASTRUCTURE & DEFENSE EXPERIENCE**\n\n` +
        `Akshay brings proven hands-on experience supporting large-scale enterprise environments:\n\n` +
        `1. **${experiences[0].role} — ${experiences[0].company}** (${experiences[0].period})\n` +
        `   • Supporting **1,000+ branches pan-India** and **3,500+ endpoints**.\n` +
        `   • Operating **EDR/XDR (Sophos XDR, Seqrite, K7 Security)**, Fortinet Firewalls, IPsec VPNs, Active Directory & GPO.\n` +
        `   • Rapid host isolation, malware containment, and telemetry analysis.\n\n` +
        `2. **${experiences[1].role} — ${experiences[1].company}** (${experiences[1].period})\n` +
        `   • Managed IT across **8 branches & 300+ systems** for Maruti Suzuki Arena.\n` +
        `   • LAN diagnostics, AnyDesk/UltraViewer remote ops, AD user governance, and CCTV/asset infrastructure.`,
      actionButtons: [
        { label: '📍 View Experience Timeline', action: 'scroll_section', target: 'experience', icon: 'ExternalLink' },
        { label: '📄 Open Resume PDF', action: 'open_resume', icon: 'FileText' },
        { label: '🛡️ Explore Cyber Skills', action: 'scroll_section', target: 'skills', icon: 'Shield' }
      ],
      followUps: [
        'How does he handle threat containment?',
        'Tell me about his Fortinet VPN setup',
        'What certifications or degree does he have?'
      ]
    };
  }

  // 3. SKILLS INTENT
  if (
    matchesAny(query, [
      'skills', 'skill', 'arsenal', 'tech stack', 'technologies', 'tools',
      'competencies', 'edr', 'xdr', 'firewall', 'fortinet', 'active directory',
      'gpo', 'linux', 'windows', 'splunk', 'burp', 'nmap', 'wireshark', 'networking',
      'vpn', 'ipsec', 'sophos', 'seqrite', 'k7'
    ])
  ) {
    if (matchesAny(query, ['edr', 'xdr', 'sophos', 'seqrite', 'k7', 'malware', 'containment', 'threat'])) {
      return {
        text:
          `🛡️ **ENDPOINT SECURITY & EDR/XDR CAPABILITIES**\n\n` +
          `Akshay has direct operational experience safeguarding enterprise endpoints:\n` +
          `• **Fleet Coverage:** Protecting **3,500+ endpoints** across distributed branches.\n` +
          `• **EDR/XDR Solutions:** Sophos XDR, Seqrite Endpoint Security, and K7 Security.\n` +
          `• **Telemetry Investigation:** Inspecting process execution trees, anomalous PowerShell invocations, and malicious child processes.\n` +
          `• **Host Containment:** Instantly isolating infected workstations from the branch VLAN to stop lateral movement.\n` +
          `• **Remediation:** Purging persistence mechanisms, scheduled tasks, registry modifications, and running verified post-cleanup rescans.`,
        actionButtons: [
          { label: '🧪 View EDR Sandbox Project', action: 'scroll_section', target: 'projects', icon: 'Cpu' },
          { label: '📍 View All Skills', action: 'scroll_section', target: 'skills', icon: 'Shield' }
        ],
        followUps: [
          'What about his firewall and VPN skills?',
          'What Linux and automation tools does he know?',
          'View his resume summary'
        ]
      };
    }

    if (matchesAny(query, ['firewall', 'fortinet', 'vpn', 'ipsec', 'ikev2', 'network', 'routing', 'dns', 'dhcp'])) {
      return {
        text:
          `🔒 **NETWORK DEFENSE & FORTINET FIREWALLS**\n\n` +
          `Akshay's network defense capabilities include:\n` +
          `• **Fortinet FortiGate:** Configuring and inspecting security policies, SSL deep inspection, and application control.\n` +
          `• **IPsec VPN Meshes:** Establishing and troubleshooting IKEv2 site-to-site VPN tunnels with AES-256 encryption across multi-branch topologies.\n` +
          `• **Log Forensics:** Analyzing firewall traffic telemetry and packet drops to spot port scans and unauthorized ingress attempts.\n` +
          `• **Core Networking:** TCP/IP subnets, VLAN segmentation, DHCP scope management, DNS routing, switch port diagnostics, and failover gateways.`,
        actionButtons: [
          { label: '🌐 View Fortinet Mesh Project', action: 'scroll_section', target: 'projects', icon: 'Network' },
          { label: '📍 Skills Section', action: 'scroll_section', target: 'skills', icon: 'ExternalLink' }
        ],
        followUps: [
          'What are his Active Directory skills?',
          'Tell me about his Splunk lab',
          'Where is he currently working?'
        ]
      };
    }

    return {
      text:
        `⚡ **D R AKSHAY — TECHNICAL SKILLS SUMMARY**\n\n` +
        `**1. IT Support & Enterprise Operations:**\n` +
        `• 1,000+ branch pan-India support, AnyDesk/UltraViewer remote triage, Windows 10/11 Pro fleet rollout, hardware/peripherals maintenance.\n\n` +
        `**2. Cybersecurity & Incident Operations:**\n` +
        `• Sophos XDR, Seqrite, K7 Security, malware isolation, log analysis (Splunk Enterprise home lab), Burp Suite, Nmap, Wireshark, OSINT.\n\n` +
        `**3. Network & Identity Security:**\n` +
        `• Fortinet FortiGate Firewalls, IPsec VPN (IKEv2 AES-256), Active Directory Domain Services, Group Policy (GPO) hardening, TCP/IP, DNS, DHCP, L2/L3 switches.\n\n` +
        `**4. Linux, Cloud & Automation:**\n` +
        `• Linux CLI (Ubuntu, CentOS, Kali), Bash automation scripting, Docker containerization, Caddy & Nginx reverse proxies, AWS fundamentals, GPG encrypted backups.`,
      actionButtons: [
        { label: '📍 Inspect Skills Arsenal', action: 'scroll_section', target: 'skills', icon: 'Shield' },
        { label: '📄 Open Resume PDF', action: 'open_resume', icon: 'FileText' },
        { label: '🚀 Explore 3D Projects', action: 'scroll_section', target: 'projects', icon: 'Cpu' }
      ],
      followUps: [
        'Tell me about his Splunk SIEM lab',
        'What is his experience with Active Directory?',
        'How does he contain malware outbreaks?'
      ]
    };
  }

  // 4. PROJECTS INTENT
  if (
    matchesAny(query, [
      'project', 'projects', 'lab', 'labs', 'blueprints', 'armory', 'splunk',
      'fortinet vpn', 'active directory hardening', 'malware sandbox', 'owasp',
      'burp suite', 'docker', 'caddy', 'bash'
    ])
  ) {
    if (matchesAny(query, ['splunk', 'siem', 'telemetry', 'omega', 'eventcode', '4625'])) {
      const proj = projects[0];
      return {
        text:
          `🔍 **PROJECT: ${proj.title}**\n` +
          `*Codename: ${proj.codename}* | **Badge:** ${proj.badge}\n\n` +
          `**Architecture:** ${proj.architecture}\n\n` +
          `**Overview:** ${proj.description}\n\n` +
          `**Key Metrics:** ${proj.metrics}\n` +
          `**Tags:** ${proj.tags.join(', ')}`,
        actionButtons: [
          { label: '📍 View in 3D Armory', action: 'scroll_section', target: 'projects', icon: 'ExternalLink' },
          { label: '🚀 View Next Project', action: 'send_query', query: 'Tell me about the Fortinet IPsec VPN project' }
        ],
        followUps: [
          'What other projects has he built?',
          'What are his Fortinet firewall skills?',
          'Show me his resume'
        ]
      };
    }

    return {
      text:
        `🚀 **CLASSIFIED CYBER DEFENSE LABS & PROJECTS**\n\n` +
        `Akshay has engineered 6 production-grade security and infrastructure labs:\n\n` +
        `1. **Splunk SIEM Incident Response Lab** (*BATCAVE-TELEMETRY-OMEGA*)\n` +
        `   • Real-time brute force (Event ID 4625) detection, log correlation, and automated containment.\n\n` +
        `2. **Fortinet IPsec VPN & Multi-Branch Mesh** (*GOTHAM-SHIELD-FORTINET*)\n` +
        `   • Hub-and-spoke IKEv2 AES-256 encrypted VPN mesh with failover routing and firewall policies.\n\n` +
        `3. **Active Directory & GPO Hardening Suite** (*WAYNE-CORP-IDENTITY-DEFENSE*)\n` +
        `   • Automated PowerShell auditing, Tiered Admin Model, LAPS, and CIS Benchmark GPO lockdown.\n\n` +
        `4. **EDR/XDR Threat Containment & Sandbox** (*DARK-KNIGHT-QUARANTINE*)\n` +
        `   • MITRE ATT&CK attack simulation, process injection analysis, and host network isolation.\n\n` +
        `5. **Web App Security & Penetration Rig** (*ORACLE-VULN-SCANNER*)\n` +
        `   • Burp Suite, Nmap, Wireshark testing against OWASP Top 10 vulnerabilities.\n\n` +
        `6. **Hardened Linux Micro-Infrastructure** (*BATCOMPUTER-CORE-DAEMON*)\n` +
        `   • Docker containerization, Caddy TLS 1.3 reverse proxy, Bash cron watchdogs, and GPG backups.`,
      actionButtons: [
        { label: '📍 Enter 3D Cyber Armory', action: 'scroll_section', target: 'projects', icon: 'Shield' },
        { label: '📄 Resume Summary', action: 'open_resume', icon: 'FileText' },
        { label: '🏢 Enterprise Experience', action: 'scroll_section', target: 'experience', icon: 'Server' }
      ],
      followUps: [
        'Tell me about the Active Directory hardening project',
        'What is his experience with EDR and malware containment?',
        'How can I get in touch with Akshay?'
      ]
    };
  }

  // 5. EDUCATION INTENT
  if (
    matchesAny(query, [
      'education', 'college', 'university', 'degree', 'bca', 'study', 'academic',
      'acharya', 'bangalore', 'qualification', 'graduated', 'school'
    ])
  ) {
    const edu = educationData[0];
    return {
      text:
        `🎓 **ACADEMIC FOUNDATION & CREDENTIALS**\n\n` +
        `**Degree:** ${edu.degree}\n` +
        `**Institution:** ${edu.institution}\n` +
        `**Affiliated University:** ${edu.university}\n` +
        `**Duration:** ${edu.period}\n` +
        `**Location:** ${edu.location}\n\n` +
        `**Academic Specializations:**\n` +
        `${edu.focus.map((f) => `• ${f}`).join('\n')}\n\n` +
        `Akshay combines formal computer applications training with rigorous hands-on enterprise infrastructure experience.`,
      actionButtons: [
        { label: '📍 View Education Section', action: 'scroll_section', target: 'education', icon: 'ExternalLink' },
        { label: '📄 Open Resume PDF', action: 'open_resume', icon: 'FileText' },
        { label: '🏢 View Work Experience', action: 'scroll_section', target: 'experience', icon: 'Server' }
      ],
      followUps: [
        'What are his key skills?',
        'Where is he currently working?',
        'How do I hire or contact him?'
      ]
    };
  }

  // 6. CONTACT & AVAILABILITY INTENT
  if (
    matchesAny(query, [
      'contact', 'email', 'phone', 'call', 'reach', 'hire', 'interview',
      'location', 'where', 'city', 'kochi', 'kerala', 'linkedin', 'github',
      'connect', 'message', 'inquire', 'availability', 'relocate'
    ])
  ) {
    return {
      text:
        `📡 **ENCRYPTED COMMS & CONTACT FREQUENCIES**\n\n` +
        `You can establish direct contact with D R Akshay through the following verified channels:\n\n` +
        `• **Email:** [${personalInfo.email}](mailto:${personalInfo.email})\n` +
        `• **Phone / WhatsApp:** [${personalInfo.phone}](tel:${personalInfo.phone})\n` +
        `• **Location Base:** ${personalInfo.location}\n` +
        `• **LinkedIn:** [linkedin.com/in/drakshay](${personalInfo.linkedin})\n` +
        `• **GitHub:** [github.com/drakshay](${personalInfo.github})\n\n` +
        `**Operational Status:** Available for IT Support & Security Engineering opportunities. Response time is typically within a few hours.`,
      actionButtons: [
        { label: '📧 Send Email Transmission', action: 'email', target: personalInfo.email, icon: 'Mail' },
        { label: '📍 Open Comms Section', action: 'scroll_section', target: 'contact', icon: 'ExternalLink' },
        { label: '📄 View Resume PDF', action: 'open_resume', icon: 'FileText' }
      ],
      followUps: [
        'What is his current notice period / availability?',
        'Summarize his experience at Muthoot Mcred',
        'Download his resume'
      ]
    };
  }

  // 7. WHY HIRE AKSHAY / VALUE PROPOSITION
  if (
    matchesAny(query, [
      'why hire', 'hire akshay', 'why should we hire', 'strengths', 'fit',
      'why choose', 'unique', 'value', 'stand out', 'strong suit'
    ])
  ) {
    return {
      text:
        `⭐ **WHY HIRE D R AKSHAY?**\n\n` +
        `Here is what makes Akshay an outstanding asset for enterprise IT & security teams:\n\n` +
        `1. **Enterprise-Grade Scale:** Proven capability supporting **1,000+ branches pan-India** and managing **3,500+ endpoints**.\n` +
        `2. **Proactive Incident Containment:** Not just passive monitoring — hands-on experience detecting alerts, isolating compromised endpoints via EDR/XDR, and neutralizing malware.\n` +
        `3. **Dual Network & Identity Defense:** Skilled in Fortinet FortiGate firewalls, IPsec VPN meshes, Active Directory Domain Services, and hardened GPO enforcement.\n` +
        `4. **Linux & Automation Fluency:** Strong command of POSIX environments, Bash scripting, and containerization to automate repetitive support and security workflows.\n` +
        `5. **Vigilant Mindset:** Passionate about continuous upskilling, SOC home labs (Splunk), and staying ahead of modern threat vectors.`,
      actionButtons: [
        { label: '📄 Open Resume PDF', action: 'open_resume', icon: 'FileText' },
        { label: '📞 Initiate Comms to Hire', action: 'scroll_section', target: 'contact', icon: 'Mail' },
        { label: '💼 Review Experience', action: 'scroll_section', target: 'experience', icon: 'Server' }
      ],
      followUps: [
        'What firewalls and EDR tools does he use?',
        'Tell me about his key projects',
        'What is his education background?'
      ]
    };
  }

  // 8. INCIDENT TRIAGE & THREAT RESPONSE PROTOCOL
  if (
    matchesAny(query, [
      'malware', 'incident', 'ransomware', 'containment', 'contain', 'triage',
      'hacked', 'isolation', 'breach', 'threat response', 'virus', 'infection'
    ])
  ) {
    return {
      text:
        `🚨 **AKSHAY'S INCIDENT TRIAGE & CONTAINMENT PROTOCOL**\n\n` +
        `When an alert strikes in an enterprise branch environment, Akshay executes a systematic containment playbook:\n\n` +
        `1. **Triage & Threat Verification:** Cross-check telemetry logs from Sophos XDR/Seqrite/K7 to identify parent-child process chains and hashes.\n` +
        `2. **Host Network Isolation:** Immediately trigger network quarantine on the endpoint via EDR/firewall to sever lateral movement vectors.\n` +
        `3. **Forensic Acquisition & Termination:** Kill suspicious processes, capture memory/disk artifacts, and submit suspicious payloads for hash verification.\n` +
        `4. **Persistence Neutralization:** Clean malicious registry entries, scheduled tasks, and unauthorized startup items.\n` +
        `5. **Verification & Restoration:** Run deep signature and behavioral rescans, verify agent health, and safely restore network uplink once cleared.`,
      actionButtons: [
        { label: '🧪 View EDR Sandbox Lab', action: 'scroll_section', target: 'projects', icon: 'Cpu' },
        { label: '🛡️ Cyber Skills Arsenal', action: 'scroll_section', target: 'skills', icon: 'Shield' }
      ],
      followUps: [
        'What is his experience with Fortinet firewalls?',
        'Tell me about his experience at Muthoot Mcred',
        'View his resume PDF'
      ]
    };
  }

  // 9. PERSONA & CAPABILITIES OF NYX
  if (
    matchesAny(query, [
      'who are you', 'what is nyx', 'what can you do', 'nyx', 'introduce yourself',
      'about you', 'ai assistant', 'chatbot'
    ])
  ) {
    return {
      text:
        `🌌 **GREETINGS, OPERATOR. I AM NYX.**\n\n` +
        `I am the AI Tactical Operations Oracle and digital intelligence assistant for **D R Akshay**.\n\n` +
        `**What I can do for you:**\n` +
        `• **Resume Dossier:** Summarize Akshay's background and launch the interactive **Resume PDF viewer/download**.\n` +
        `• **Enterprise Experience:** Break down his work supporting **1,000+ branches** at Muthoot Mcred and 8 branches at Maijo Moto.\n` +
        `• **Skills Assessment:** Detail his EDR/XDR, Fortinet, Active Directory, Linux, and networking competencies.\n` +
        `• **Classified Projects:** Walk through his 6 security labs including Splunk SIEM, IPsec VPN meshes, and malware triage.\n` +
        `• **Two-Way Voice / Talk:** Click the 🎙️ microphone to speak your question, and enable the 🔊 voice toggle to hear my spoken answers!\n\n` +
        `What would you like to explore first?`,
      actionButtons: [
        { label: '📄 Resume PDF & Summary', action: 'open_resume', icon: 'FileText' },
        { label: '🏢 Enterprise Experience', action: 'send_query', query: 'Summarize his work experience' },
        { label: '🛡️ Skills Arsenal', action: 'send_query', query: 'What are his cybersecurity skills?' }
      ],
      followUps: [
        'Give me his resume summary',
        'What projects has he built?',
        'How can I get in touch with him?'
      ]
    };
  }

  // 10. GREETINGS & CASUAL
  if (matchesAny(query, ['hello', 'hi', 'hey', 'greetings', 'morning', 'evening', 'yo', 'sup'])) {
    return {
      text:
        `👋 **TRANSMISSION RECEIVED // SECURE UPLINK ESTABLISHED**\n\n` +
        `Hello! I'm **Nyx**, Akshay's AI Cyber Assistant. How can I assist your mission today?\n\n` +
        `Feel free to ask about his **resume PDF**, **work experience at Muthoot Mcred**, **EDR/XDR and cybersecurity skillset**, **classified projects**, or **contact information**.\n\n` +
        `💡 *Tip: You can also click the 🎙️ mic button below to talk to me via voice!*`,
      actionButtons: [
        { label: '📄 View Resume PDF', action: 'open_resume', icon: 'FileText' },
        { label: '🏢 Enterprise Experience', action: 'send_query', query: 'Summarize his work experience' },
        { label: '🚀 Key Projects', action: 'send_query', query: 'What security projects has he completed?' }
      ],
      followUps: [
        'What does he do at Muthoot Mcred?',
        'What are his core cybersecurity skills?',
        'How can I contact him?'
      ]
    };
  }

  // 11. EASTER EGGS (BATMAN / ARKHAM / CYBER HACKER)
  if (matchesAny(query, ['batman', 'dark knight', 'bruce wayne', 'arkham', 'gotham', 'joker', 'batcave'])) {
    return {
      text:
        `🦇 **ENCRYPTED FILE: PROTOCOL WAYNE // CLASSIFIED**\n\n` +
        `*"It's not who I am underneath, but what I do that defines me."*\n\n` +
        `Akshay's portfolio is inspired by the tactical dark-knight cyber aesthetic: relentless defense, disciplined vigilance, and zero downtime for the enterprise branches under his watch.\n\n` +
        `Node **${personalInfo.batcomputerNode}** is currently standing guard. What intel on Akshay do you require, detective?`,
      actionButtons: [
        { label: '🛡️ Explore Cyber Arsenal', action: 'scroll_section', target: 'skills', icon: 'Shield' },
        { label: '📄 Inspect Resume Dossier', action: 'open_resume', icon: 'FileText' }
      ],
      followUps: [
        'What is his real work experience?',
        'Show me his Splunk SIEM project',
        'How to contact him?'
      ]
    };
  }

  // 12. DEFAULT FALLBACK WITH HELPFUL GUIDANCE
  return {
    text:
      `🛰️ **INTEL QUERY PROCESSED: "${userQuery}"**\n\n` +
      `Here is a summary of what I can share regarding **D R Akshay**:\n\n` +
      `• **Current Role:** IT Support Engineer at **Muthoot Mcred Limited**, supporting **1,000+ branches pan-India** and **3,500+ endpoints**.\n` +
      `• **Key Strengths:** EDR/XDR incident triage (Sophos, Seqrite, K7), Fortinet IPsec VPNs, Active Directory & GPO hardening, Linux CLI, and Splunk SIEM.\n` +
      `• **Resume PDF:** Ready for instant preview and print/download.\n` +
      `• **Location & Base:** ${personalInfo.location}.\n\n` +
      `Which area would you like more detailed intelligence on?`,
    actionButtons: [
      { label: '📄 View / Print Resume PDF', action: 'open_resume', icon: 'FileText' },
      { label: '🏢 Enterprise Experience', action: 'send_query', query: 'Tell me about his work experience' },
      { label: '🛡️ Skills Arsenal', action: 'send_query', query: 'What are his technical skills?' },
      { label: '📞 Contact Channels', action: 'send_query', query: 'How can I contact Akshay?' }
    ],
    followUps: [
      'Tell me about his experience at Muthoot Mcred',
      'What are his key projects?',
      'Can I download his resume PDF?'
    ]
  };
}
