import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy, Monitor, UserRound, Settings, ShieldCheck, Trees, Mail, Linkedin, FileText, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data';
import './signal.css';

const selectedProjects = [portfolioData.featuredProject, ...portfolioData.projects];
const resumeUrl = '/NicholasPerezResume.pdf';
const linkedInUrl = 'https://www.linkedin.com/in/nicholas-perez-47748773/';
const skills = [
  { title: 'Endpoints', icon: Monitor, items: 'macOS, Windows, Jamf, Intune' },
  { title: 'Identity', icon: UserRound, items: 'Entra ID, Okta, Microsoft 365, Google Workspace' },
  { title: 'Automation', icon: Settings, items: 'Bash, PowerShell, provisioning, workflows' },
  { title: 'Security', icon: ShieldCheck, items: 'Endpoint telemetry, Elastic Stack, incident response' },
];

export default function SignalHome() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const [storyOpen, setStoryOpen] = useState(false);
  const copyReset = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (copyReset.current) clearTimeout(copyReset.current); }, []);
  useEffect(() => {
    const buttons = pageRef.current?.querySelectorAll<HTMLAnchorElement>('.signal-button');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      buttons?.forEach(button => {
        button.style.removeProperty('--shadow-x');
        button.style.removeProperty('--shadow-y');
        button.style.removeProperty('--shadow-alpha');
      });
    };
    const follow = (event: PointerEvent) => {
      if (motion.matches || !pointer.matches || event.pointerType === 'touch') return;
      const button = event.currentTarget as HTMLAnchorElement;
      const bounds = button.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10 + 4;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        button.style.setProperty('--shadow-x', `${x.toFixed(2)}px`);
        button.style.setProperty('--shadow-y', `${y.toFixed(2)}px`);
        button.style.setProperty('--shadow-alpha', '.28');
      });
    };
    buttons?.forEach(button => {
      button.addEventListener('pointermove', follow, { passive: true });
      button.addEventListener('pointerleave', reset);
      button.addEventListener('pointercancel', reset);
    });
    motion.addEventListener('change', reset);
    pointer.addEventListener('change', reset);
    return () => {
      reset();
      buttons?.forEach(button => {
        button.removeEventListener('pointermove', follow);
        button.removeEventListener('pointerleave', reset);
        button.removeEventListener('pointercancel', reset);
      });
      motion.removeEventListener('change', reset);
      pointer.removeEventListener('change', reset);
    };
  }, []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.email);
      setCopyStatus('Email copied');
      if (copyReset.current) clearTimeout(copyReset.current);
      copyReset.current = setTimeout(() => setCopyStatus(''), 2500);
    } catch {
      setCopyStatus(`Email me at ${portfolioData.email}`);
    }
  };

  return (
    <div className="signal-site" id="top" ref={pageRef}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <div className="signal-front">
          <img className="signal-server-backdrop" src="/media/server-room-warm.webp" width="1920" height="1080" alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
          <header className="signal-header">
            <a className="signal-brand" href="#top"><span className="signal-nav-monogram" aria-hidden="true">NP</span> Nick Perez</a>
            <nav aria-label="Primary navigation">
              <a href="#about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a href="#contact">Contact</a>
            </nav>

          </header>
          <section className="signal-hero" aria-labelledby="home-title">
            <h1 id="home-title">Hi, I’m Nick.</h1>
            <p>I’m an IT Systems Engineer in Sacramento.<br className="signal-desktop-break" /> I work on the systems people need to do their jobs, and help keep things running when something goes wrong.</p>
            <div className="signal-actions">
              <a className="signal-button signal-button-orange" href="#about">A little about me <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="signal-button signal-button-glass" href="#contact">Get in touch <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
            <a className="signal-text-link signal-hero-resume" href={resumeUrl} target="_blank" rel="noreferrer">View my résumé <FileText size={17} aria-hidden="true" /></a>
          </section>
        </div>
        <section className="signal-fire signal-section" id="caldor-fire" aria-labelledby="fire-title">
          <Trees className="signal-fire-icon" size={64} strokeWidth={1.3} aria-hidden="true" /><div className="signal-fire-heading"><h2 id="fire-title">Keeping things working through the Caldor Fire.</h2><p>When coworkers had to evacuate, I stayed and worked with our team to keep county systems running.</p></div>
          <div className="signal-fire-details" data-open={storyOpen}>
              <button className="signal-story-toggle" type="button" aria-expanded={storyOpen} aria-controls="caldor-story" onClick={() => setStoryOpen(open => !open)}>Read the story <span aria-hidden="true">+</span></button>
              <div className="signal-fire-story" id="caldor-story" hidden={!storyOpen}>
            <p>When the Caldor Fire started, I was working in El Dorado County’s central IT department. A lot of county employees lived nearby, in little country homes out in the woods. They were at work when the evacuation orders started coming in.</p>
            <p>Almost immediately, half the staff around us had to leave. They raced home on back roads to get their loved ones, their pets, and whatever valuables they could grab. These were our coworkers and friends, suddenly trying to get their families away from a rapidly growing fire.</p>
            <p>I didn’t live in the county, so my home wasn’t under evacuation. I stayed and worked.</p>
            <p>People still needed emergency services. They still needed their SNAP benefits. The animal shelter was working overtime. The county staff keeping those services running needed to log in, access their files, and use their systems.</p>
            <p>As roads closed and South Lake Tahoe evacuated, people scattered to hotels, relatives’ homes, and places outside the county. But many still had to work. Our team built temporary office spaces where displaced staff could connect to the county network, print, and keep doing their jobs. We also set up Wi-Fi and printing at shelters so evacuated residents could take care of basic things while they were away from home.</p>
            <p>For seven or eight weeks, I went into the office with smoke hanging in the hallways. Some days meant keeping existing systems running. Other days meant setting up another temporary environment because the situation had changed again.</p>
            <p>Then, partway through the fire, a bulldozer working on a firebreak cut the network connection to South Lake Tahoe. The servers and files there became unreachable.</p>
            <p>Once it was safe enough to travel, we got a special permit to drive into the evacuated area. With fire conditions still around us, we worked to restore a connection back to Placerville so staff could access those files again.</p>
            <p>Eventually, people started going home. They picked up their pets from the shelters and returned to their communities. Some had lost their homes.</p>
            <p>I was one person on a team, surrounded by people working hard to take care of each other. I’m glad I could be part of that. I helped keep things working while a community held itself together.</p>
              </div>
          </div>
        </section>
        <section className="signal-about signal-section" id="about" aria-labelledby="about-title">
          <img className="signal-mobile-scene signal-about-scene" src="/media/about-hobbies.webp" alt="" aria-hidden="true" width="1600" height="900" loading="lazy" decoding="async" />
          <h2 id="about-title">A little about me.</h2>
          <p className="signal-about-lead">I’ve worked in IT for over ten years, in county offices, with startups, and helping people with their everyday tech problems. A lot of the work comes down to making sure someone can do what they need to do.</p>
          <div className="signal-about-details"><p>Sometimes that’s helping someone get back into their account. Other times it’s setting up a whole office so people have somewhere to work. I also build things on my own, from security tools to a physics simulator. I like getting into something and figuring out how it works.</p></div>
          <div className="signal-about-links"><a className="signal-text-link" href="#experience">My experience <ArrowRight size={17} aria-hidden="true" /></a><a className="signal-text-link" href="#work">Things I’ve built <ArrowRight size={17} aria-hidden="true" /></a><a className="signal-text-link" href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        </section>
        <section className="signal-projects signal-section" id="work" aria-labelledby="work-title">
          <h2 id="work-title">Things I’ve built.</h2>
          <svg className="signal-cables" viewBox="0 0 120 600" fill="none" aria-hidden="true"><path d="M30 0v120c0 35-20 35-20 70v410"/><path d="M60 0v260c0 40-25 40-25 80v260"/><path d="M90 0v330c0 45-25 45-25 90v180"/><circle cx="35" cy="470" r="3"/><circle cx="90" cy="190" r="3"/></svg>
          <div className="signal-project-list">{selectedProjects.map((project) => <article className="signal-project" key={project.title}><h3>{project.title}</h3><p>{project.title === 'MacTrace' ? 'macOS security tools' : project.title === 'OrbitLab' ? 'Physics simulation' : 'Security events and detection'}</p><a className="signal-project-arrow" aria-label={`Explore ${project.title}`} href={project.github} target="_blank" rel="noreferrer"><ArrowRight size={24} aria-hidden="true" /></a></article>)}</div>
          <a className="signal-text-link" href={portfolioData.github} target="_blank" rel="noreferrer">More on GitHub <ArrowRight size={18} aria-hidden="true" /></a>
        </section>
        <section className="signal-experience signal-section" id="experience">
          <h2>The work along the way.</h2>
          <div className="signal-career">
            {portfolioData.experience.slice(0, 3).map((role) => (
              <details className="signal-timeline-role" key={`${role.company}-${role.period}`}>
                <summary><span><span className="signal-timeline-company">{role.company}</span><span className="signal-timeline-title">{role.role}</span></span><ChevronDown size={20} aria-hidden="true" /></summary>
                <div className="signal-timeline-description"><p className="signal-role-period">{role.period}</p><ul>{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>
              </details>
            ))}
            <details className="signal-earlier"><summary>Earlier experience · SBM Management Services &amp; Geek Squad <span aria-hidden="true">+</span></summary>{portfolioData.experience.slice(3).map((role) => <article className="signal-role" key={`${role.company}-${role.period}`}><div><p className="signal-role-period">{role.period}</p><h3>{role.company}</h3></div><div><h4>{role.role}</h4><ul>{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></article>)}</details>
          </div>
        </section>
        <section className="signal-capabilities signal-section" id="capabilities">
          <h2>What I work with.</h2>
          <div className="signal-skills">{skills.map((skill) => <div key={skill.title}><skill.icon size={28} strokeWidth={1.3} aria-hidden="true" /><div><h3>{skill.title}</h3><p>{skill.items}</p></div></div>)}</div>
          <div className="signal-education"><p><strong>Associate of Science, Computer Science</strong><br />Cosumnes River College · Web Publishing &amp; Web Programming certificates</p><p><strong>CompTIA Security+</strong><br />Currently pursuing certification</p></div>
        </section>
        <section className="signal-contact signal-section" id="contact">
          <img className="signal-mobile-scene signal-contact-scene" src="/media/contact-workbench.webp" alt="" aria-hidden="true" width="1600" height="900" loading="lazy" decoding="async" />
          <div className="signal-contact-intro"><h2>Let’s talk.</h2><p>If you want to talk about a role, something I’ve built, or just say hello, send me an email.</p><a className="signal-button signal-button-orange signal-contact-action" href={`mailto:${portfolioData.email}`}>Send me an email <ArrowUpRight size={18} aria-hidden="true" /></a></div>
          <div className="signal-contact-directory"><a href={`mailto:${portfolioData.email}`}><Mail size={20} aria-hidden="true" />{portfolioData.email}</a><a href={linkedInUrl} target="_blank" rel="me noreferrer"><Linkedin size={20} aria-hidden="true" />LinkedIn</a><a href={resumeUrl} target="_blank" rel="noreferrer"><FileText size={20} aria-hidden="true" />Résumé</a><button type="button" onClick={copyEmail}>{copyStatus === 'Email copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />} Copy email</button><p className="signal-copy-status" role="status">{copyStatus}</p></div>
        </section>
      </main>
      <footer className="signal-footer"><a href="#top">Nicholas Perez <span>↑</span></a><p>IT Systems Engineer · Sacramento, CA</p><a href={portfolioData.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a><p>© {new Date().getFullYear()}</p></footer>
    </div>
  );
}
