// Portfolio data for D R Akshay - IT Support & Security Engineer

export const personalInfo = {
  name: "D R AKSHAY",
  avatar: "/akshay-profile.jpg",
  title: "IT Support & Security Engineer",
  subtitle: "Windows & Linux Infrastructure Specialist // Cyber Defense Operations",
  location: "Kochi, Kerala, India",
  email: "dr.akxhay@gmail.com",
  phone: "+91 9778585563",
  linkedin: "https://www.linkedin.com/in/drakshay",
  github: "https://github.com/sudo-ZeroTrace",
  twitter: "https://x.com",
  instagram: "https://instagram.com",
  batcomputerNode: "WAYNE-SEC-NODE-KOCHI-01",
  securityClearance: "LEVEL 5 // ENTERPRISE SEC_OPS",
  summary:
    "Security & IT Support Engineer with hands-on experience supporting enterprise infrastructure across 1,000+ branches pan-India. Practical exposure to endpoint security, EDR/XDR (K7, Seqrite, Sophos), Active Directory, Fortinet firewalls, IPsec VPNs, network security, and incident response. Experienced in investigating security alerts, malware incidents, analyzing endpoint/log telemetry, performing containment and remediation, and safeguarding distributed enterprise environments.",
  stats: [
    { label: "Branches Supported", value: "1,000+", detail: "Pan-India Centralized Infrastructure" },
    { label: "Endpoints Protected", value: "3,500+", detail: "EDR/XDR Agent Fleet" },
    { label: "Uptime & SLA", value: "99.9%", detail: "Enterprise Network & Systems" },
    { label: "Threat Incident Response", value: "Triage & Contain", detail: "Malware Isolation & Log Forensics" }
  ]
};

export const experiences = [
  {
    id: "muthoot-mcred",
    role: "IT SUPPORT ENGINEER",
    company: "MUTHOOT MCRED LIMITED",
    location: "Kochi, Kerala",
    period: "March 2026 – Present",
    status: "CURRENT MISSION",
    summary:
      "Support enterprise IT infrastructure across 1,000+ branches pan-India, covering branch endpoints, network devices, firewalls, printers, and remote users from a centralized support environment.",
    highlights: [
      "Enterprise Scale: Support IT infrastructure across 1,000+ branches pan-India, ensuring continuous operation of branch endpoints, firewalls, and network appliances.",
      "EDR/XDR Administration: Administer and troubleshoot K7 Security, Seqrite Endpoint, and Sophos XDR; investigate security alerts, malware outbreaks, agent health, and rule updates.",
      "Incident Containment & Remediation: Rapidly isolate compromised endpoints, analyze telemetry logs and threat behaviors, neutralize malware, rescan systems, and verify remediation.",
      "Network & Firewall Operations: Troubleshoot Fortinet firewalls and IPsec VPN tunnels, inspect traffic logs, and resolve branch WAN/LAN connectivity degradation.",
      "Active Directory & Identity: Administer AD & Group Policy (GPO), managing OUs, user/computer accounts, access controls, credential security, and automated onboarding/offboarding.",
      "Infrastructure Health: Troubleshoot TCP/IP, DHCP, DNS, LAN switches, and routers; execute server data backups and system health monitoring."
    ],
    tech: ["Fortinet Firewalls", "IPsec VPN", "Sophos XDR", "Seqrite Endpoint", "K7 Security", "Active Directory", "GPO", "Windows Server", "Linux", "TCP/IP", "DNS/DHCP"]
  },
  {
    id: "maijo-moto",
    role: "IT SUPPORT EXECUTIVE",
    company: "MAIJO MOTO – MARUTI SUZUKI ARENA",
    location: "Kochi, Kerala",
    period: "March 2025 – Present",
    status: "COMPLETED MISSION",
    summary:
      "Supported IT operations across 8 branches and 300+ devices, serving as the first point of contact for Windows, applications, printers, peripherals, CCTV, and general infrastructure issues.",
    highlights: [
      "Branch Ecosystem: Sole IT point of contact across 8 branches managing 300+ end-user devices, printers, biometric attendance, and CCTV network.",
      "Network Diagnostics: Resolved complex LAN bottlenecks, IP address conflicts, DNS failures, gateway routing errors, and VPN connectivity hiccups.",
      "Remote Support Operations: Delivered rapid remote desktop support via AnyDesk and UltraViewer for mission-critical showroom and workshop systems.",
      "Identity & Asset Governance: Managed Active Directory user lifecycles, password governance, onboarding/offboarding workflows, IT hardware asset registers, and corporate SIM cards.",
      "Vendor Coordination: Liaised with ISPs, hardware vendors, and application providers to ensure zero downtime for automotive dealership sales and service ERPs."
    ],
    tech: ["Windows 10/11 Pro", "Active Directory", "AnyDesk/UltraViewer", "LAN/Switching", "VPN Clients", "Asset Management", "Printer Networks", "CCTV Systems"]
  }
];

export const projects = [
  {
    id: "proj-1",
    title: "Splunk SIEM Incident Response & Log Telemetry Lab",
    codename: "BATCAVE-TELEMETRY-OMEGA",
    category: "Security Operations",
    badge: "SOC LAB",
    shortDesc:
      "Enterprise-grade SIEM home lab ingesting multi-endpoint Windows & Linux event telemetry with automated threat correlation.",
    description:
      "Architected a virtualized security operations center (SOC) home lab utilizing Splunk Enterprise. Configured universal forwarders across Windows Server and Kali/Ubuntu endpoints. Designed real-time search queries and alert thresholds for brute-force logon failures (Event ID 4625), unauthorized privilege escalations, suspicious PowerShell executions, and lateral movement attempts.",
    terminalOutput:
      "[SPLUNK_SEARCH]: index=win_sec EventCode=4625 | stats count by user, src_ip | where count > 10\n[ALERT]: Brute force threshold exceeded from src_ip=192.168.1.104\n[ACTION]: Automated containment script dispatched -> Host isolated from subnet.",
    architecture: "Windows Server 2022 AD DS -> Splunk Universal Forwarder -> Splunk Enterprise Indexer -> Automated Alert Dispatcher",
    tags: ["Splunk Enterprise", "Log Analysis", "Event ID 4625", "Threat Detection", "SOC Automation", "Incident Response"],
    metrics: "Sub-second alert ingestion | 15+ custom correlation rules | Automated containment"
  },
  {
    id: "proj-2",
    title: "Fortinet IPsec VPN & Multi-Branch Firewall Mesh",
    codename: "GOTHAM-SHIELD-FORTINET",
    category: "Network Defense",
    badge: "INFRASTRUCTURE",
    shortDesc:
      "Designed and simulated hub-and-spoke IPsec VPN mesh interconnecting distributed branch networks with centralized firewall policies.",
    description:
      "Engineered a resilient multi-branch VPN architecture replicating enterprise deployment across 1,000+ remote locations. Implemented IKEv2 Phase 1 & Phase 2 cryptographic proposals (AES-256-GCM, SHA-384, DH Group 14). Configured granular firewall security policies, application control, SSL deep packet inspection, and dead-peer detection (DPD) failover.",
    terminalOutput:
      "[FORTI_CLI]# diagnose vpn tunnel list\nname=BRANCH_042_IPSEC ver=2 type=static vpns=1\nstatus=UP SPI=0x4a91f032 alg=aes256gcm/null\nDPD=negotiated, peer=active, lifetime=28800s/left=24102s\n[STATUS]: Encrypted traffic flowing at 98.4 Mbps zero packet drop.",
    architecture: "HQ FortiGate 100F (Hub) <== IPsec IKEv2 Tunnels ==> Remote Branch FortiGates (Spokes) with OSPF failover",
    tags: ["Fortinet FortiGate", "IPsec VPN", "IKEv2", "Firewall Policies", "Traffic Inspection", "Routing & Failover"],
    metrics: "AES-256 encrypted tunnels | Zero downtime failover | Centralized policy enforcement"
  },
  {
    id: "proj-3",
    title: "Active Directory & Group Policy Hardening Suite",
    codename: "WAYNE-CORP-IDENTITY-DEFENSE",
    category: "Identity & Access",
    badge: "IDENTITY SECURITY",
    shortDesc:
      "Automated PowerShell suite for Active Directory auditing, Tiered Administrative Model enforcement, and CIS Benchmark GPO deployment.",
    description:
      "Designed and deployed comprehensive Active Directory Group Policy Objects (GPOs) adhering to CIS security benchmarks. Automated password complexity, account lockout thresholds, Kerberos ticket expiration, and LAPS (Local Administrator Password Solution) deployment. Built PowerShell automation scripts for auditing stale user/computer accounts, nested group memberships, and privileged access anomalies.",
    terminalOutput:
      "[PS_CLI]> .\\AD-Security-Audit.ps1 -TargetOU 'OU=Branches,DC=enterprise,DC=local'\n[AUDIT]: Scanning 1,420 user objects...\n[FINDING]: 12 inactive accounts (>90 days) detected.\n[ACTION]: Automatically moved to Quarantine OU and disabled.\n[REPORT]: Stig compliance score elevated from 71% to 96%.",
    architecture: "AD DS Domain Controllers -> Tier-0 / Tier-1 / Tier-2 OU Architecture -> LAPS -> Hardened GPO Baseline",
    tags: ["Active Directory", "Group Policy (GPO)", "PowerShell Scripting", "LAPS", "CIS Benchmarks", "Account Security"],
    metrics: "1,400+ Accounts Audited | 96% Security Baseline Score | Zero unmanaged local admins"
  },
  {
    id: "proj-4",
    title: "EDR/XDR Threat Containment & Malware Sandbox Rig",
    codename: "DARK-KNIGHT-QUARANTINE",
    category: "Endpoint Security",
    badge: "MALWARE ANALYSIS",
    shortDesc:
      "Simulated enterprise endpoint detection & response pipeline testing malware detonation, behavioral indicators, and host network isolation.",
    description:
      "Constructed an isolated malware analysis and EDR triage environment. Simulated attack techniques from the MITRE ATT&CK matrix (T1059 Command and Scripting Interpreter, T1055 Process Injection, T1078 Valid Accounts) against endpoints guarded by Sophos XDR, Seqrite, and K7 Security. Evaluated containment latency, memory process dump forensics, and remediation validation.",
    terminalOutput:
      "[XDR_AGENT]: Alert SEV_CRITICAL - Process 'powershell.exe' spawned by winword.exe\n[ANALYSIS]: Malicious base64 encoded download cradle detected\n[AUTO_CONTAIN]: Network isolation triggered via EDR API\n[FORENSIC]: Memory dump captured -> SHA256 hashed -> Artifact logged.",
    architecture: "Malware Detonation Sandbox -> Host Network Isolator -> EDR Telemetry Aggregator -> Forensic Dump Storage",
    tags: ["Sophos XDR", "Seqrite Endpoint", "K7 Security", "Malware Containment", "MITRE ATT&CK", "Forensics"],
    metrics: "Instant host quarantine | Memory triage automation | Full telemetry verification"
  },
  {
    id: "proj-5",
    title: "Web App Security Assessment & Penetration Rig",
    codename: "ORACLE-VULN-SCANNER",
    category: "Offensive Security",
    badge: "VULN ASSESSMENT",
    shortDesc:
      "Laboratory testing platform for web application security vulnerabilities, HTTP request tampering, and access control validation.",
    description:
      "Continuous upskilling project focusing on web application security auditing using Burp Suite Professional/Community, Nmap, and Wireshark. Systematically conducted vulnerability testing against OWASP Top 10 vectors including Broken Object Level Authorization (BOLA), SQL Injection, Cross-Site Scripting (XSS), and Broken Authentication mechanisms.",
    terminalOutput:
      "[BURP_REPEATER]: Testing endpoint /api/v1/user/account_details?id=1042\n[TEST]: Parameter tampering with IDOR payload id=1043\n[RESPONSE]: HTTP/1.1 403 Forbidden - Role check verified.\n[NMAP]: nmap -sC -sV -p 80,443,8080 target.corp -> 0 unpatched services.",
    architecture: "Kali Linux / Burp Suite -> Target Microservices -> OWASP Juice Shop / DVWA -> Remediation Benchmark",
    tags: ["Burp Suite", "Nmap", "Wireshark", "OWASP Top 10", "HTTP Analysis", "Authentication Testing", "OSINT"],
    metrics: "Hands-on OWASP labs | Protocol packet dissection | Automated scan validation"
  },
  {
    id: "proj-6",
    title: "Hardened Linux Micro-Infrastructure & Container Mesh",
    codename: "BATCOMPUTER-CORE-DAEMON",
    category: "Systems & Cloud",
    badge: "DEVOPS & CLOUD",
    shortDesc:
      "Hardened Linux server stack utilizing Docker containerization, reverse proxying with Caddy/Nginx, and automated Bash telemetry scripts.",
    description:
      "Configured robust Linux server environments (Ubuntu/CentOS/Kali) running containerized services via Docker. Implemented automatic HTTPS encryption and reverse proxy routing via Caddy and Nginx with rate limiting and strict TLS 1.3 ciphers. Created automated Bash scripts for hourly server backups, cron-driven disk usage alerts, and SSH key-only hardened authentication.",
    terminalOutput:
      "[BASH_MONITOR]# ./sys_health_watchdog.sh --all\n[OK]: CPU Load: 0.22, Memory Usage: 34.2%, Disk: 41% utilized\n[SECURITY]: Fail2ban active -> 8 malicious IP bans in last 24h\n[BACKUP]: Tarball encrypted with GPG -> synced to offsite S3 storage.",
    architecture: "Linux (Ubuntu Server) -> UFW / Iptables -> Docker Swarm/Compose -> Caddy TLS 1.3 Proxy -> AWS S3 Backup",
    tags: ["Linux (Ubuntu/CentOS/Kali)", "Docker", "Caddy", "Nginx", "Bash Scripting", "AWS", "Fail2ban"],
    metrics: "Automated GPG encrypted backups | TLS 1.3 strict security | Zero unauthorized SSH logins"
  }
];

export const skillsData = {
  categories: [
    {
      id: "it-support",
      name: "IT Support & Operations",
      icon: "Server",
      description: "Enterprise user & endpoint lifecycle operations across 1000+ branches",
      skills: [
        { name: "End-User Enterprise Support", tier: "CORE EXPERTISE", status: "PRODUCTION READY", scope: "1,000+ Branches", badge: "TIER 2/3" },
        { name: "LAN & Network Troubleshooting", tier: "CORE EXPERTISE", status: "PRODUCTION READY", scope: "WAN / LAN Meshes", badge: "ENTERPRISE" },
        { name: "VPN Connectivity & Gateways", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "IPsec & SSL VPN", badge: "HIGH UPTIME" },
        { name: "Remote Support (AnyDesk / UltraViewer)", tier: "CORE EXPERTISE", status: "PRODUCTION READY", scope: "Rapid Incident Dispatch", badge: "SLA 99.9%" },
        { name: "Windows OS Installation & Diagnostics", tier: "CORE EXPERTISE", status: "PRODUCTION READY", scope: "Fleet Deployment", badge: "SYS_HARDENED" },
        { name: "Active Directory Account Management", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "Domain Services & OUs", badge: "IAM" },
        { name: "Hardware, Printers & Peripheral Support", tier: "CORE EXPERTISE", status: "PRODUCTION READY", scope: "Multi-vendor Hardware", badge: "HARDWARE" },
        { name: "IT Asset Inventory & Lifecycle", tier: "PRACTITIONER", status: "OPERATIONAL", scope: "Asset Registers & Audit", badge: "GOVERNANCE" }
      ]
    },
    {
      id: "cyber-defense",
      name: "Cyber-Security Operations",
      icon: "ShieldAlert",
      description: "Threat detection, EDR/XDR investigation, log forensics, and containment",
      skills: [
        { name: "Endpoint Security (K7, Seqrite)", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "3,500+ Endpoints", badge: "EDR FLEET" },
        { name: "EDR/XDR Telemetry (K7, Sophos XDR)", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "Live Telemetry Analysis", badge: "THREAT_HUNT" },
        { name: "Malware Investigation & Containment", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "Rapid Host Isolation", badge: "INCIDENT_OPS" },
        { name: "Security Alerts & Incident Triage", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "Zero-Day & Threat Response", badge: "SOC TRIAGE" },
        { name: "Log Analysis (Splunk Home Lab)", tier: "PRACTITIONER", status: "FIELD TESTED", scope: "Windows & Linux Eventlogs", badge: "SIEM" },
        { name: "Burp Suite & HTTP Request Analysis", tier: "PRACTITIONER", status: "FIELD TESTED", scope: "Traffic Interception", badge: "APPSEC" },
        { name: "Network Recon (Nmap, Wireshark)", tier: "SPECIALIST", status: "FIELD TESTED", scope: "Deep Packet Inspection", badge: "NET_RECON" },
        { name: "OSINT Intelligence Gathering", tier: "PRACTITIONER", status: "OPERATIONAL", scope: "Target Surface Mapping", badge: "INTEL" }
      ]
    },
    {
      id: "network-identity",
      name: "Network & Identity Security",
      icon: "Lock",
      description: "Enterprise firewalls, site-to-site VPNs, and identity governance",
      skills: [
        { name: "Fortinet Firewalls & Policies", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "FortiGate Rule Enforcement", badge: "FIREWALL" },
        { name: "Firewall Log Analysis", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "Traffic & Threat Auditing", badge: "LOG_FORENSICS" },
        { name: "IPsec Site-to-Site VPN Tunnels", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "IKEv2 AES-256 Mesh", badge: "CRYPTO_VPN" },
        { name: "Active Directory Domain Services", tier: "CORE EXPERTISE", status: "PRODUCTION READY", scope: "Enterprise Forests & OUs", badge: "AD_DS" },
        { name: "Group Policy Objects (GPO)", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "Centralized Policy Lock", badge: "HARDENING" },
        { name: "TCP/IP, DNS, DHCP Routing", tier: "CORE EXPERTISE", status: "PRODUCTION READY", scope: "Enterprise Subnets & VLANs", badge: "NET_CORE" },
        { name: "Switches & Routers Troubleshooting", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "L2/L3 Infrastructure", badge: "SWITCHING" },
        { name: "Access & Authentication Testing", tier: "PRACTITIONER", status: "OPERATIONAL", scope: "Credential & ACL Auditing", badge: "AUTH_SEC" }
      ]
    },
    {
      id: "linux-cloud",
      name: "Linux, Cloud & Automation",
      icon: "Terminal",
      description: "CLI administration, server hardening, containers, and scripting",
      skills: [
        { name: "Linux CLI (Ubuntu, CentOS, Kali)", tier: "CORE EXPERTISE", status: "PRODUCTION READY", scope: "POSIX Systems & Shells", badge: "BASH_CORE" },
        { name: "System Monitoring & Disk Checks", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "Daemon Health & Telemetry", badge: "SYS_HEALTH" },
        { name: "User/Group & File Permissions", tier: "CORE EXPERTISE", status: "PRODUCTION READY", scope: "POSIX DAC / Sudoers", badge: "PRIV_ESC_SEC" },
        { name: "Bash Automation Scripting", tier: "SPECIALIST", status: "FIELD TESTED", scope: "Cron Tasks & Automation", badge: "SCRIPTING" },
        { name: "Docker Containerization", tier: "PRACTITIONER", status: "FIELD TESTED", scope: "Microservice Isolation", badge: "CONTAINERS" },
        { name: "Web Servers (Caddy, Nginx, Apache)", tier: "SPECIALIST", status: "FIELD TESTED", scope: "TLS 1.3 Reverse Proxies", badge: "WEB_PROXY" },
        { name: "AWS Cloud Fundamentals", tier: "PRACTITIONER", status: "OPERATIONAL", scope: "EC2, S3, IAM & VPC", badge: "CLOUD_SEC" },
        { name: "Server Backup & Health Telemetry", tier: "SPECIALIST", status: "PRODUCTION READY", scope: "Encrypted Offsite Sync", badge: "DISASTER_REC" }
      ]
    }
  ]
};

export const educationData = [
  {
    degree: "BACHELOR OF COMPUTER APPLICATIONS (BCA)",
    institution: "ACHARYA'S BANGALORE BUSINESS SCHOOL",
    university: "BANGALORE UNIVERSITY",
    period: "2021 – 2024",
    location: "Bangalore, Karnataka",
    badge: "GRADUATE DEGREE",
    focus: [
      "Computer Networks & Protocol Architectures (TCP/IP, Routing, Security)",
      "Operating Systems Concepts & Internals (Windows Kernel & Linux Systems)",
      "Database Management Systems & Structured Query Language",
      "Object-Oriented Programming, Web Technologies & System Administration"
    ]
  }
];

export const terminalCommandsHelp = [
  { cmd: "help", desc: "List all accessible system terminal commands" },
  { cmd: "ls [-l]", desc: "List directory contents and cyber logs" },
  { cmd: "pwd", desc: "Print current working directory" },
  { cmd: "whoami", desc: "Display current security credentials and operator dossier" },
  { cmd: "skills", desc: "Inspect cyber defense arsenal and operational readiness" },
  { cmd: "projects", desc: "Query classified 3D cyber projects and blueprints" },
  { cmd: "uname -a", desc: "Display operating system and kernel architecture" },
  { cmd: "uptime", desc: "Display system uptime and branch load statistics" },
  { cmd: "date", desc: "Display current mission date and synchronized timestamp" },
  { cmd: "ip a / ifconfig", desc: "Inspect network adapters, IPsec tunnels, and interfaces" },
  { cmd: "netstat / ss", desc: "Display active network sockets and listening ports" },
  { cmd: "top / ps aux", desc: "Display running defense daemons and processes" },
  { cmd: "df -h", desc: "Display disk filesystem usage" },
  { cmd: "free -m", desc: "Display system RAM and swap memory allocation" },
  { cmd: "echo <msg>", desc: "Print text or environment variables" },
  { cmd: "cat <file>", desc: "Display content of resume.txt, logs, or configs" },
  { cmd: "exp", desc: "Query incident response and enterprise employment log" },
  { cmd: "edu", desc: "Inspect academic credentials and degree dossier" },
  { cmd: "contact", desc: "Open encrypted communication channels to D R Akshay" },
  { cmd: "matrix", desc: "Engage real-time cyber defense matrix stream" },
  { cmd: "exploit", desc: "Run zero-day intrusion defense simulation" },
  { cmd: "ping <host>", desc: "Send ICMP packets to verify endpoint connectivity" },
  { cmd: "clear", desc: "Purge the terminal buffer and reset screen" },
  { cmd: "nyx <query>", desc: "Query Nyx AI tactical oracle directly in the terminal" },
  { cmd: "exit", desc: "Terminate terminal session and return to UI" }
];
