// Nyx Knowledge Base - Comprehensive Tactical Dossier for D R Akshay
import { personalInfo, experiences, projects, skillsData, educationData } from './portfolioData';

export const nyxProfile = {
  name: "D R AKSHAY",
  role: "IT Support & Security Engineer",
  tagline: "Windows & Linux Infrastructure Specialist // Cyber Defense Operations",
  location: "Kochi, Kerala, India",
  email: "dr.akxhay@gmail.com",
  phone: "+91 9778585563",
  linkedin: "https://www.linkedin.com/in/drakshay",
  github: "https://github.com/sudo-ZeroTrace",
  clearance: "LEVEL 5 // ENTERPRISE SEC_OPS",
  node: "WAYNE-SEC-NODE-KOCHI-01",
  stats: {
    branches: "1,000+ branches pan-India",
    endpoints: "3,500+ endpoints",
    uptime: "99.9% enterprise SLA",
    containment: "Sub-second threat isolation"
  }
};

export const resumeDetails = {
  fileName: "D_R_Akshay_Resume.pdf",
  downloadUrl: "/akshay-resume.html",
  title: "D R Akshay - IT Support & Security Engineer Resume",
  sections: [
    {
      title: "Executive Summary",
      content:
        "Security & IT Support Engineer with hands-on experience supporting enterprise infrastructure across 1,000+ branches pan-India. Practical exposure to endpoint security, EDR/XDR (K7, Seqrite, Sophos), Active Directory, Fortinet firewalls, IPsec VPNs, network security, and incident response. Experienced in investigating security alerts, malware incidents, analyzing endpoint/log telemetry, performing containment and remediation, and safeguarding distributed enterprise environments."
    },
    {
      title: "Core Enterprise Competencies",
      items: [
        "Enterprise IT Support & Fleet Operations (1,000+ pan-India branches)",
        "Endpoint Detection & Response (EDR/XDR: Sophos XDR, Seqrite, K7 Security)",
        "Network Defense & Firewalls (Fortinet FortiGate, IPsec Site-to-Site VPN, Traffic Logs)",
        "Identity & Access Management (Active Directory Domain Services, Group Policy Objects - GPO)",
        "Incident Triage & Containment (Host Isolation, Malware Forensics, Process Detonation)",
        "Systems Administration (Windows Server, Windows 10/11 Pro, Linux Ubuntu/CentOS/Kali)",
        "Log Analysis & Monitoring (Splunk SIEM, Event ID 4625 brute force queries, Syslog)",
        "Security Tooling (Burp Suite, Nmap, Wireshark, OSINT, Bash Automation, Docker)"
      ]
    },
    {
      title: "Professional Work Experience",
      roles: [
        {
          role: "IT SUPPORT ENGINEER",
          company: "Muthoot Mcred Limited",
          location: "Kochi, Kerala",
          period: "March 2026 – Present",
          summary: "Support enterprise IT infrastructure across 1,000+ branches pan-India from a centralized support environment.",
          keyAccomplishments: [
            "Administer and troubleshoot EDR/XDR fleet (K7 Security, Seqrite Endpoint, Sophos XDR) across 3,500+ endpoints.",
            "Rapidly isolate compromised systems, examine telemetry logs, neutralize malware outbreaks, and confirm remediation.",
            "Maintain Fortinet firewalls, debug IPsec VPN tunnels, analyze traffic logs, and optimize branch WAN/LAN routing.",
            "Govern Active Directory & GPO: manage OUs, user/computer lifecycles, access control lists, credential hygiene, and automated onboarding/offboarding.",
            "Resolve TCP/IP, DHCP, DNS, LAN switch, and router bottlenecks; conduct scheduled server backups and health telemetry."
          ]
        },
        {
          role: "IT SUPPORT EXECUTIVE",
          company: "Maijo Moto – Maruti Suzuki Arena",
          location: "Kochi, Kerala",
          period: "March 2025 – Present",
          summary: "Managed IT operations across 8 branches and 300+ end-user devices for automotive dealership network.",
          keyAccomplishments: [
            "Acted as primary IT point of contact for 300+ workstations, network printers, biometric attendance, and CCTV network.",
            "Diagnosed and resolved LAN bottlenecks, IP conflicts, DNS misconfigurations, gateway errors, and VPN drops.",
            "Provided swift remote desktop support via AnyDesk and UltraViewer for mission-critical showroom and workshop ERP systems.",
            "Supervised Active Directory user provisioning, corporate hardware asset registers, and ISP vendor SLAs."
          ]
        }
      ]
    },
    {
      title: "Key Projects & Security Labs",
      projects: [
        "Splunk SIEM Incident Response Lab (BATCAVE-TELEMETRY-OMEGA) - Telemetry ingestion & brute-force correlation",
        "Fortinet IPsec VPN Multi-Branch Mesh (GOTHAM-SHIELD-FORTINET) - AES-256 IKEv2 hub-and-spoke failover",
        "Active Directory & GPO Hardening Suite (WAYNE-CORP-IDENTITY-DEFENSE) - CIS benchmarks & PowerShell automation",
        "EDR/XDR Threat Containment Rig (DARK-KNIGHT-QUARANTINE) - MITRE ATT&CK simulation & host isolation",
        "Web App Security & Pentest Rig (ORACLE-VULN-SCANNER) - Burp Suite & OWASP Top 10 auditing",
        "Hardened Linux Micro-Infrastructure (BATCOMPUTER-CORE-DAEMON) - Docker, Caddy TLS 1.3, Bash cron daemons"
      ]
    },
    {
      title: "Academic Background",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Acharya's Bangalore Business School",
      university: "Bangalore University",
      period: "2021 – 2024",
      location: "Bangalore, Karnataka"
    }
  ]
};

export const quickSuggestions = [
  { label: "📄 Resume Summary & PDF", query: "Give me Akshay's resume summary and PDF download" },
  { label: "🏢 Enterprise Experience", query: "Summarize Akshay's experience at Muthoot Mcred" },
  { label: "🛡️ Cybersecurity & EDR Skills", query: "What are his cybersecurity and EDR skills?" },
  { label: "🚀 Top Security Projects", query: "Tell me about his key security projects and labs" },
  { label: "🎓 Education & Degree", query: "Where did Akshay complete his education?" },
  { label: "📞 Contact & Comms", query: "How do I contact Akshay for an opportunity?" }
];
