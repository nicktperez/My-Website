import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy } from 'lucide-react';
import { portfolioData } from '../data';
import './signal.css';

const selectedProjects = [portfolioData.featuredProject, ...portfolioData.projects];
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
            <a className="signal-brand" href="#top"><span className="signal-nav-monogram" aria-hidden="true">NP</span> Nick Perez</a>
            <nav aria-label="Primary navigation">
              <a href="#about">About</a><a href="/work">Work</a><a href="#contact">Contact</a>
            </nav>

          </header>
          <section className="signal-hero" aria-labelledby="home-title">
            <h1 id="home-title">Hi, I’m Nick.</h1>
            <p>I’m an IT Systems Engineer in Sacramento.<br className="signal-desktop-break" /> I help people make sense of technology and keep the systems they depend on working.</p>
            <p className="signal-personal-line">Curious by nature. Practical when it counts.</p>
            <div className="signal-actions">
              <a className="signal-button signal-button-orange" href="#about">A little about me <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="signal-text-link" href="#contact">Get in touch <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </section>
        </div>
        <section className="signal-about signal-section" id="about" aria-labelledby="about-title">
          <h2 id="about-title">A little about me.</h2>
          <p className="signal-about-lead">A decade of hands-on work, from public-sector services to fast-moving startups. I care about making technology useful for the people who rely on it.</p>
          <div className="signal-about-details"><p>My work brings together systems administration, endpoint management, identity, and automation. I like understanding how things fit together, then finding a practical way to make them work better.</p><p>That curiosity also shows up in the things I build: tools for understanding security events, experiments in simulation, and hands-on projects that help me keep learning.</p></div>
          <div className="signal-about-links"><a className="signal-text-link" href="#experience">My experience <ArrowRight size={17} aria-hidden="true" /></a><a className="signal-text-link" href="#work">Things I’ve built <ArrowRight size={17} aria-hidden="true" /></a><a className="signal-text-link" href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        </section>
        <section className="signal-projects signal-section" id="work" aria-labelledby="work-title">
          <div className="signal-section-heading"><h2 id="work-title">Things I’ve built.</h2><p>A few places my curiosity has taken me. Each project starts with a question and gives me something new to learn.</p></div>
          <div className="signal-project-list">{selectedProjects.map((project) => <article className="signal-project" key={project.title}><h3>{project.title}</h3><p>{project.description}</p><a className="signal-text-link" href={`/work#${project.title.toLowerCase().replaceAll(' ', '-')}`}>Explore {project.title} <ArrowUpRight size={17} aria-hidden="true" /></a></article>)}</div>
          <a className="signal-text-link" href="/work">See all my work <ArrowRight size={18} aria-hidden="true" /></a>
        </section>
        <section className="signal-experience signal-section" id="experience">
          <div className="signal-section-heading"><h2>The work along the way.</h2><p>From public-sector operations to fast-moving startups. A decade of making technology work for the people who depend on it.</p></div>
          <article className="signal-response" aria-labelledby="wildfire-title">
            <div className="signal-response-heading">
              <p>County of El Dorado · Wildfire response</p>
              <h3 id="wildfire-title">Keeping essential services within reach.</h3>
            </div>
            <div className="signal-response-story">
              <p>During one of the most difficult periods in the county’s history, I worked day in and day out in wildfire smoke to keep essential technology working for firefighters, support personnel, and people displaced from their homes.</p>
              <p>I supported access to the systems they depended on, helped county staff keep printing EBT cards for their clients, and kept clinicians connected to the systems they needed to prescribe medications.</p>
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
          <div className="signal-section-heading"><h2>What I bring to the table.</h2><div><p>macOS and Windows administration, account lifecycle management, Bash and PowerShell automation, and hands-on security projects.</p><a className="signal-text-link" href="/work">Explore the project archive <ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
          <div className="signal-skills">{skills.map((skill) => <div key={skill.title}><h3>{skill.title}</h3><p>{skill.items}</p></div>)}</div>
          <div className="signal-education"><p><strong>Associate of Science, Computer Science</strong><br />Cosumnes River College · Web Publishing &amp; Web Programming certificates</p><p><strong>CompTIA Security+</strong><br />Currently pursuing certification</p></div>
        </section>
        <section className="signal-contact signal-section" id="contact">
          <h2>Let’s talk.</h2>
          <div><p>I’m a Sacramento-based IT Systems Engineer open to Bay Area hybrid and remote opportunities.</p><a className="signal-contact-email" href={`mailto:${portfolioData.email}`}>{portfolioData.email} <ArrowUpRight size={24} aria-hidden="true" /></a><div className="signal-contact-links"><a href={linkedInUrl} target="_blank" rel="me noreferrer">LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a><button type="button" onClick={copyEmail}>{copyStatus === 'Email copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />} Copy email</button></div><p className="signal-copy-status" role="status">{copyStatus}</p></div>
        </section>
      </main>
      <footer className="signal-footer"><a href="#top">Nicholas Perez <span>↑</span></a><p>IT Systems Engineer · Sacramento, CA</p><a href={portfolioData.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a><p>© {new Date().getFullYear()}</p></footer>
    </div>
  );
}
