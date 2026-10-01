import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react';
import { portfolioData } from '../data';
import './signal.css';

const selectedProjects = ['OrbitLab', 'SIEM Home Lab'].map((title) => portfolioData.projects.find((project) => project.title === title)!);
const resumeUrl = '/NicholasPerezResume.pdf';
const linkedInUrl = 'https://www.linkedin.com/in/nicholas-perez-47748773/';
const skills = [
  { title: 'Endpoints', items: 'macOS, Windows, Jamf, Intune' },
  { title: 'Identity', items: 'Entra ID, Okta, Microsoft 365, Google Workspace' },
  { title: 'Automation', items: 'Bash, PowerShell, provisioning, workflows' },
  { title: 'Security', items: 'Endpoint telemetry, Elastic Stack, incident response' },
];

export default function SignalHome() {
  const [copyStatus, setCopyStatus] = useState('');
  const copyReset = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (copyReset.current) clearTimeout(copyReset.current); }, []);
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
    <div className="signal-site" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <div className="signal-front">
          <header className="signal-header">
            <a className="signal-brand" href="#top"><span className="signal-nav-monogram" aria-hidden="true">NP</span> Nicholas Perez</a>
            <nav aria-label="Primary navigation">
              <a href="#work">Work</a><a href="#experience">Experience</a>
              <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a href="#contact">Contact</a>
            </nav>
            <span className="signal-location">Sacramento, CA <span aria-hidden="true" /></span>
          </header>
          <section className="signal-hero" aria-labelledby="home-title">
            <h1 id="home-title">I make complex<br />systems work<span>.</span></h1>
            <p><strong>IT Systems Engineer.</strong> A decade of hands-on work in systems, automation, and security.</p>
            <div className="signal-actions">
              <a className="signal-button signal-button-orange" href="#work">Explore my work <ArrowRight size={19} aria-hidden="true" /></a>
              <a className="signal-text-link signal-resume-link" href={resumeUrl} target="_blank" rel="noreferrer">View résumé</a>
            </div>
            <p className="signal-hero-experience">County of El Dorado <span aria-hidden="true">·</span> Plug and Play Tech Center</p>
            <a className="signal-work-cue" href="#work">Selected work <ArrowRight size={16} aria-hidden="true" /></a>
          </section>
          <section className="signal-feature" id="work" aria-labelledby="featured-title">
            <a className="signal-feature-image" href="/work#mactrace" aria-label="Explore MacTrace project details">
              <img src={portfolioData.featuredProject.image} alt={portfolioData.featuredProject.imageAlt} width="1536" height="1024" loading="lazy" decoding="async" />
            </a>
            <div className="signal-feature-copy">
              <p className="signal-feature-label">Featured project</p>
              <h2 id="featured-title">MacTrace</h2>
              <h3>macOS endpoint security</h3>
              <p>A local macOS security tool that connects process, file, and network activity—and explains why an event was flagged.</p>
              <a className="signal-button signal-button-black" href="/work#mactrace">View project <ArrowRight size={17} aria-hidden="true" /></a>
              <p className="signal-feature-stack">macOS <span>|</span> Python <span>|</span> FastAPI</p>
            </div>
          </section>
          <section className="signal-projects" aria-label="More selected work">
            {selectedProjects.map((project) => (
              <article className="signal-project" key={project.title}>
                <a href={`/work#${project.title.toLowerCase().replaceAll(' ', '-')}`} aria-label={`Explore ${project.title} project details`}>
                  <img src={project.image} alt={project.imageAlt} width="800" height="600" decoding="async" />
                </a>
                <div>
                  <h2>{project.title}</h2>
                  <h3>{project.title === 'OrbitLab' ? 'C++ simulation' : 'Detection engineering'}</h3>
                  <p>{project.title === 'OrbitLab' ? 'A C++20 desktop simulator for exploring N-body systems, physics solvers, and numerical performance.' : 'A hands-on Elastic Stack lab for event collection, detection, triage, and documented investigation.'}</p>
                  <a className="signal-text-link" href={`/work#${project.title.toLowerCase().replaceAll(' ', '-')}`}>View project <ArrowRight size={16} aria-hidden="true" /></a>
                  <p className="signal-project-stack">{project.title === 'OrbitLab' ? 'C++20 · SDL3 · Numerical systems' : 'Elastic Stack · Docker · Python'}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
        <section className="signal-experience signal-section" id="experience">
          <div className="signal-section-heading"><h2>Built on experience.</h2><p>From public-sector operations to fast-moving startups. A decade of making technology work for the people who depend on it.</p></div>
          <article className="signal-response" aria-labelledby="wildfire-title">
            <div className="signal-response-heading">
              <p>County of El Dorado · Wildfire response</p>
              <h3 id="wildfire-title">Keeping essential services within reach.</h3>
            </div>
            <div className="signal-response-story">
              <p>During one of the most difficult periods in the county’s history, I worked day in and day out in wildfire smoke to keep essential technology working for firefighters, support personnel, and people displaced from their homes.</p>
              <p>I supported access to the systems they depended on, helped county staff keep printing EBT cards for their clients, and kept clinicians connected to the systems they needed to prescribe medications.</p>
              <p>That work made the purpose of IT very concrete for me. A working connection or printer meant someone could keep doing their job, access benefits, or get the care they needed while their lives were disrupted.</p>
            </div>
          </article>
          <div className="signal-career">
            {portfolioData.experience.slice(0, 3).map((role) => (
              <article className="signal-role" key={`${role.company}-${role.period}`}>
                <div><p className="signal-role-period">{role.period}</p><h3>{role.company}</h3></div>
                <div><h4>{role.role}</h4><p>{role.highlights[0]}</p><details><summary>More about this role <span aria-hidden="true">+</span></summary><ul>{role.highlights.slice(1).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></details></div>
              </article>
            ))}
            <details className="signal-earlier"><summary>Earlier experience · SBM Management Services &amp; Geek Squad <span aria-hidden="true">+</span></summary>{portfolioData.experience.slice(3).map((role) => <article className="signal-role" key={`${role.company}-${role.period}`}><div><p className="signal-role-period">{role.period}</p><h3>{role.company}</h3></div><div><h4>{role.role}</h4><ul>{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></article>)}</details>
          </div>
        </section>
        <section className="signal-capabilities signal-section" id="capabilities">
          <div className="signal-section-heading"><h2>The systems.<br />The people.<br />The whole picture.</h2><div><p>Practical administration, thoughtful automation, and security work grounded in real service experience.</p><a className="signal-text-link" href="/work">Explore the project archive <ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
          <div className="signal-skills">{skills.map((skill) => <div key={skill.title}><h3>{skill.title}</h3><p>{skill.items}</p></div>)}</div>
          <div className="signal-education"><p><strong>Associate of Science, Computer Science</strong><br />Cosumnes River College · Web Publishing &amp; Web Programming certificates</p><p><strong>CompTIA Security+</strong><br />Currently pursuing certification</p></div>
        </section>
        <section className="signal-contact signal-section" id="contact">
          <h2>Let’s get<br />to work<span>.</span></h2>
          <div><p>I’m a Sacramento-based IT Systems Engineer open to Bay Area hybrid and remote opportunities.</p><a className="signal-contact-email" href={`mailto:${portfolioData.email}`}>{portfolioData.email} <ArrowUpRight size={24} aria-hidden="true" /></a><div className="signal-contact-links"><a href={linkedInUrl} target="_blank" rel="me noreferrer">LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a><button type="button" onClick={copyEmail}>{copyStatus === 'Email copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />} Copy email</button></div><p className="signal-copy-status" role="status">{copyStatus}</p></div>
        </section>
      </main>
      <footer className="signal-footer"><a href="#top">Nicholas Perez <span>↑</span></a><p>IT Systems Engineer · Sacramento, CA</p><a href={portfolioData.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a><p>© {new Date().getFullYear()}</p></footer>
    </div>
  );
}
