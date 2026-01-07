import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Shield,
  Key,
  Lock,
  Eye,
  Terminal as TerminalIcon,
  Network,
  Activity,
  Mail,
  Phone,
  MapPin,
  Cpu,
  Globe,
  ShieldCheck,
  Search,
  Database,
  ExternalLink
} from 'lucide-react';
import { portfolioData } from './data';

const iconMap: Record<string, any> = {
  Monitor, Shield, Key, Lock, Eye, Terminal: TerminalIcon, Network, Activity
};

import SpriteCharacter from './components/SpriteCharacter';
import type { CharacterState } from './components/SpriteCharacter';
import EncryptedDownloadButton from './components/EncryptedDownloadButton';
import HexBadge from './components/HexBadge';
import IncidentModal from './components/IncidentModal';
import ThemeToggle from './components/ThemeToggle';
import ContactForm from './components/ContactForm';
import ThreatMap from './components/ThreatMap';

const KonamiHackerOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [catState, setCatState] = useState<CharacterState>('run');
  const [showBowl, setShowBowl] = useState(false);
  const [showMeow, setShowMeow] = useState(false);

  const hackerLines = [
    "INITIALIZING SYSTEM BYPASS...",
    "ACCESSING KERNEL_MEMORY_0x4F...",
    "DECRYPTING PORTFOLIO_ASSETS...",
    "FLAG FOUND: SECURITY_IS_A_PROCESS",
    "BYPASSING FIREWALL... [SUCCESS]",
    "NIK_PEREZ_OS v4.0.0 ACCESS GRANTED",
    "DEPLOYING PIXEL_CAT_UNIT..."
  ];

  useEffect(() => {
    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx < hackerLines.length) {
        setTypedLines(prev => [...prev, hackerLines[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(interval);
        // Start Interaction Sequence
        startCatSequence();
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const startCatSequence = () => {
    // 1. Bowl appears
    setTimeout(() => {
      setTypedLines(prev => [...prev, "DOWNLOADING: digital_kibble.pkg [100%]"]);
      setShowBowl(true);
    }, 1000);

    // 2. Cat stops running and sits to eat
    setTimeout(() => {
      setCatState('eat'); // Switched to 'eat' state which uses the eating sprite
    }, 2500);

    // 3. Cat Meows
    setTimeout(() => {
      setShowMeow(true);
      setCatState('idle'); // Stop eating to meow
      console.log("MEOW");
    }, 4500);

    // 4. Cat resumes run and leaves
    setTimeout(() => {
      setShowMeow(false);
      setCatState('run');
      setTypedLines(prev => [...prev, "SESSION TERMINATED."]);
      setTimeout(onComplete, 2000);
    }, 7000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center font-mono overflow-hidden"
    >
      <div className="w-full max-w-2xl p-8 border border-primary/40 bg-card/50 relative">
        <div className="mb-4 text-xs text-primary/40 uppercase tracking-widest">{" >> "} Security Override Detected</div>
        <div className="space-y-2 mb-12 h-64 overflow-y-auto">
          {typedLines.map((line, i) => (
            <div key={i} className="text-primary text-sm font-bold flex gap-2">
              <span className="opacity-50">#</span> {line}
            </div>
          ))}
          <div className="w-2 h-4 bg-primary animate-pulse inline-block ml-6" />
        </div>

        <div className="h-32 relative flex items-end justify-center border-b border-primary/20">

          {/* Digital Food Bowl */}
          <AnimatePresence>
            {showBowl && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute bottom-0 left-[45%]"
              >
                <img
                  src="/food_bowl.png"
                  className="w-16 h-16 blend-screen image-pixelated"
                  alt="Digital Food"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hacker Cat Character */}
          <motion.div
            initial={{ x: "-150%" }}
            animate={
              catState === 'run'
                ? { x: "150%" }
                : { x: "0%" }
            }
            transition={
              catState === 'run'
                ? { duration: 4, ease: "linear" }
                : { duration: 0 }
            }
            className="absolute bottom-0"
          >
            {/* Speech Bubble */}
            <AnimatePresence>
              {showMeow && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -20 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 left-12 bg-primary text-black text-xs font-bold px-3 py-1 rounded-t-lg rounded-br-lg"
                >
                  console.log("MEOW");
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Character Engine */}
            <SpriteCharacter state={catState} />
          </motion.div>

        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-primary/5 select-none pointer-events-none uppercase">
        Breached
      </div>
    </motion.div>
  );
};

const MatrixStatusLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const logPool = [
      "SOC_ALERT: Bruteforce detected on 192.168.1.45",
      "SYS_MON: Process spawned 'powershell.exe' with suspicious flags",
      "ELASTIC_INGEST: 450 eps - Indexing [winlogbeat-*]",
      "THREAT_INTEL: Known IOC match found - 8.8.8.8",
      "IAM_UPDATE: User 'nperez' privileged escalation attempt",
      "KIBANA_SYNC: Dashboard refresh complete [v8.12.0]",
      "PORT_SCAN: Connection attempt dropped on 0.0.0.0:445",
      "SYSTEM_HEALTH: All sensors operational",
      "AUTH_LOG: Successful SSO login for admin@domain.com",
      "NETWORK_FLOW: High latency detected on VLAN 20"
    ];

    const interval = setInterval(() => {
      setLogs(prev => [logPool[Math.floor(Math.random() * logPool.length)], ...prev.slice(0, 8)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 p-4 font-mono text-[9px] text-primary/20 z-0 pointer-events-none space-y-0.5">
      {logs.map((log, i) => (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          key={i}
          className="flex gap-2"
        >
          <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
          <span>{log}</span>
        </motion.div>
      ))}
    </div>
  );
};

const TerminalWindow = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`terminal-window ${className}`}>
    <div className="terminal-header">
      <div className="flex gap-1.5 mr-4">
        <div className="dot bg-red-500/50" />
        <div className="dot bg-yellow-500/50" />
        <div className="dot bg-green-500/50" />
      </div>
      <span className="text-[10px] uppercase tracking-widest font-black text-primary/50">{title}</span>
    </div>
    <div className="p-6 md:p-8">
      {children}
    </div>
  </div>
);

const App = () => {
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIdx]) {
        if (konamiIdx === konamiCode.length - 1) {
          setShowEasterEgg(true);
          setKonamiIdx(0);
        } else {
          setKonamiIdx(prev => prev + 1);
        }
      } else {
        setKonamiIdx(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIdx]);

  useEffect(() => {
    // Programmer Easter Egg in Console
    console.log("%c ACCESS GRANTED: Flag{n1ck_p3r3z_s3cur1ty_pr0}", "color: #22c55e; font-size: 20px; font-weight: bold;");
    console.log("%c Searching for threats... [DONE] System secure.", "color: #22c55e;");
    console.log("%c Hint: ↑ ↑ ↓ ↓ ← → ← → B A", "color: #22c55e; opacity: 0.5;");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono selection:bg-primary/20 relative">
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="scanline" />
      </div>

      <ThemeToggle />

      {/* Background Matrix Logs - Behind Content */}
      <MatrixStatusLogs />

      {/* Incident Modal */}
      <IncidentModal
        isOpen={showIncidentModal}
        onClose={() => setShowIncidentModal(false)}
        project={portfolioData.securityProject}
      />

      <AnimatePresence>
        {showEasterEgg && <KonamiHackerOverlay onComplete={() => setShowEasterEgg(false)} />}
      </AnimatePresence>

      {/* Live Threat Map Background */}
      <ThreatMap />

      {/* Easter Egg: Hidden Flag in HTML comment */}
      {/* <!-- FLAG: 53 45 43 55 52 49 54 59 5f 4d 49 4e 44 53 45 54 (Hex for SECURITY_MINDSET) --> */}

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 relative z-10">
        {/* Header / Hero */}
        <header className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs mb-6 px-2 py-1 border border-primary/20 bg-primary/5 uppercase">
                <ShieldCheck size={14} className="animate-pulse" />
                Security Operations Active
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-none glow-text">
                {portfolioData.name.toUpperCase()}
              </h1>

              <div className="mb-10 space-y-4">
                <p className="text-lg text-primary/70 leading-relaxed max-w-2xl border-l-2 border-primary/20 pl-6">
                  {portfolioData.summary}
                </p>

                {/* Critical Hybrid Info Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/30 rounded shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                >
                  <Globe size={20} className="text-primary animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-primary/50 font-black">Availability_Matrix</span>
                    <span className="text-sm font-bold text-primary">{portfolioData.hybridStatus}</span>
                  </div>
                </motion.div>

                {/* Resume Download */}
                <EncryptedDownloadButton href="/NicholasPerezResume.pdf" fileName="NicholasPerezResume.pdf" />
              </div>

              <div className="flex flex-wrap gap-8 text-[11px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Mail size={14} className="text-primary group-hover:scale-110 transition-transform" />
                  <a href={`mailto:${portfolioData.email}`} className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">
                    {portfolioData.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  <span>{portfolioData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  <span>{portfolioData.location}</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-1 gap-4">
              <div className="terminal-window p-6 flex flex-col items-center justify-center text-center group cursor-help transition-all hover:bg-primary/5">
                <span className="text-3xl font-black glow-text group-hover:scale-110 transition-transform">10+</span>
                <span className="text-[9px] uppercase tracking-tighter text-primary/50">Years_Exp</span>
              </div>
              <div className="terminal-window p-6 flex flex-col items-center justify-center text-center group transition-all hover:bg-primary/5">
                <span className="text-3xl font-black glow-text group-hover:scale-110 transition-transform">3K+</span>
                <span className="text-[9px] uppercase tracking-tighter text-primary/50">Ticket_Resolve</span>
              </div>
            </div>
          </div>
        </header>

        {/* Security Lab Section */}
        <section className="mb-24 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              <Search className="text-primary" size={20} />
            </motion.div>
            <h2 className="text-xl font-black tracking-widest uppercase glow-text">Security_Operations_Lab</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center cursor-pointer group" onClick={() => setShowIncidentModal(true)}>
            <div className="relative aspect-video bg-black rounded-lg border border-primary/20 overflow-hidden group-hover:border-primary/60 transition-all">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(34,197,94,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                <Shield className="text-primary/20 group-hover:text-primary/40 transition-colors" size={64} />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs font-bold text-primary bg-black/80 px-3 py-1 border border-primary/30 rounded">
                  <Eye size={12} className="animate-pulse" />
                  <span>VIEW_CLASSIFIED_REPORT</span>
                </div>
              </div>

              {/* Mini Terminal Content */}
              <div className="p-4 font-mono text-[10px] text-primary/60 space-y-1 opacity-50">
                <div>{">"} INITIALIZING SIEM PROTOCOLS...</div>
                <div>{">"} LOADING ELASTIC_AGENTS...</div>
                <div className="text-primary">{">"} THREAT_DETECTED: BRUTE_FORCE</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black uppercase text-text-primary leading-none group-hover:glow-text transition-all">
                    {portfolioData.securityProject.title}
                  </h3>
                  <ExternalLink size={16} className="text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded">
                    {portfolioData.securityProject.status}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded">
                    Elastic Stack
                  </span>
                </div>
                <p className="text-sm text-primary/80 leading-relaxed border-l-2 border-primary/20 pl-4">
                  {portfolioData.securityProject.description}
                </p>
              </div>

              <ul className="space-y-2">
                {portfolioData.securityProject.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3 text-xs text-primary/70">
                    <span className="text-primary/40 font-mono">{`0${i + 1}`}</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Registry (Skills) */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <Database className="text-primary" size={20} />
            <h2 className="text-xl font-black tracking-widest uppercase glow-text">Technical_Registry</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioData.skills.map((skill) => {
              const Icon = iconMap[skill.icon as string] || Activity;
              return (
                <TerminalWindow key={skill.name} title="tool_module" className="!p-0 group hover:border-primary transition-all">
                  <div className="p-6 flex flex-col items-center text-center">
                    <Icon className="w-6 h-6 mb-4 text-primary opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                    <span className="text-[10px] font-black uppercase leading-tight tracking-tighter">{skill.name}</span>
                  </div>
                </TerminalWindow>
              );
            })}
          </div>
        </section>

        {/* System Logs (Experience) */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <Activity className="text-primary" size={20} />
            <h2 className="text-xl font-black tracking-widest uppercase glow-text">System_Deployment_Logs</h2>
          </div>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                key={index}
              >
                <TerminalWindow title={`${exp.company.toLowerCase().replace(/[^a-z0-9]/g, '_')}.log`}>
                  <div className="grid md:grid-cols-[150px_1fr] gap-8">
                    <div className="text-[11px] font-black text-primary/40 uppercase sticky top-0">
                      [{exp.period}]
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-4 uppercase flex items-center gap-2">
                        <TerminalIcon size={16} className="text-primary/30" />
                        {exp.role}
                      </h3>
                      <ul className="space-y-3">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-xs flex gap-3 text-primary/70 leading-relaxed">
                            <span className="text-primary opacity-30 select-none">root@nik_core:~#</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TerminalWindow>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Authentication Summary (Education) */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <Key className="text-primary" size={20} />
            <h2 className="text-xl font-black tracking-widest uppercase glow-text">Auth_Credentials</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-12">
            {portfolioData.education.map((edu, i) => (
              <HexBadge
                key={i}
                title={(edu as any).degree.replace("Associate of Science in ", "AS: ").replace(" Certification", "")}
                subtitle={edu.school}
                status={(edu as any).status}
                extras={(edu as any).extras}
                delay={i * 0.2}
              />
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm />

        {/* Footer */}
        <footer className="mt-40 pt-16 border-t border-primary/20 flex flex-col items-center gap-8 opacity-60 text-center">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] glow-text animate-pulse">
            // CONNECTION SECURED // ENCRYPTION: AES-256 //
          </div>
          <div className="flex gap-12 text-[10px] uppercase tracking-widest font-black">
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-primary" />
              SYSTEM_STABLE
            </div>
            <div className="flex items-center gap-2">
              <Cpu size={12} className="text-primary" />
              LOAD_BALANCED
            </div>
          </div>
          <div className="text-[9px] font-mono opacity-50">
            © {new Date().getFullYear()} NIK_PEREZ_OS v4.0.0-final
          </div>
          <div className="text-[8px] opacity-20 uppercase tracking-[.5em] mt-4">
            Easter Egg Protocol: Active
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
