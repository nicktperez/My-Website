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
          <img className="signal-server-backdrop" src="/media/server-room-warm.webp" width="1920" height="1080" alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
          <header className="signal-header">
            <a className="signal-brand" href="#top"><span className="signal-nav-monogram" aria-hidden="true">NP</span> Nick Perez</a>
            <nav aria-label="Primary navigation">
              <a href="#about">About</a><a href="/work">Work</a><a href="#contact">Contact</a>
            </nav>

          </header>
          <section className="signal-hero" aria-labelledby="home-title">
            <h1 id="home-title">Hi, I’m Nick.</h1>
            <p>I’m an IT Systems Engineer in Sacramento.<br className="signal-desktop-break" /> I work on the systems people need to do their jobs, and help keep things running when something goes wrong.</p>
            <div className="signal-actions">
              <a className="signal-button signal-button-orange" href="#about">A little about me <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="signal-text-link" href="#contact">Get in touch <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </section>
        </div>
        <section className="signal-fire signal-section" id="caldor-fire" aria-labelledby="fire-title">
          <div className="signal-fire-heading"><p>El Dorado County · Caldor Fire</p><h2 id="fire-title">Keeping things working through the Caldor Fire.</h2></div>
          <div className="signal-fire-preview">
            <p>During the Caldor Fire, a lot of my coworkers had to leave to get their families and pets out. I stayed and worked with our team to keep county systems running and set up temporary offices and shelter Wi-Fi.</p>
            <details className="signal-fire-details">
              <summary>Read the story <span aria-hidden="true">+</span></summary>
              <div className="signal-fire-story">
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
            </details>
          </div>
        </section>
        <section className="signal-about signal-section" id="about" aria-labelledby="about-title">
          <h2 id="about-title">A little about me.</h2>
          <p className="signal-about-lead">I’ve worked in IT for over ten years, in county offices, with startups, and helping people with their everyday tech problems. A lot of the work comes down to making sure someone can do what they need to do.</p>
          <div className="signal-about-details"><p>Sometimes that’s getting someone back into their account or making sure they can access their files. Other times it’s setting up a whole office so people have somewhere to work. During the Caldor Fire, we had to do a lot of both.</p><p>I also build things on my own. I’ve put together a security lab, a tool for looking at what’s happening on a Mac, and a physics simulator. They’re different projects, but they all give me a chance to get into something and figure out how it works.</p></div>
          <div className="signal-about-links"><a className="signal-text-link" href="#experience">My experience <ArrowRight size={17} aria-hidden="true" /></a><a className="signal-text-link" href="#work">Things I’ve built <ArrowRight size={17} aria-hidden="true" /></a><a className="signal-text-link" href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        </section>
        <section className="signal-projects signal-section" id="work" aria-labelledby="work-title">
          <div className="signal-section-heading"><h2 id="work-title">Things I’ve built.</h2><p>These are some of the projects I’ve been working on. There’s more about what I built and how it works on each project’s page.</p></div>
          <div className="signal-project-list">{selectedProjects.map((project) => <article className="signal-project" key={project.title}><h3>{project.title}</h3><p>{project.description}</p><a className="signal-text-link" href={`/work#${project.title.toLowerCase().replaceAll(' ', '-')}`}>Explore {project.title} <ArrowUpRight size={17} aria-hidden="true" /></a></article>)}</div>
          <a className="signal-text-link" href="/work">See all my work <ArrowRight size={18} aria-hidden="true" /></a>
        </section>
        <section className="signal-experience signal-section" id="experience">
          <div className="signal-section-heading"><h2>The work along the way.</h2><p>I’ve supported county staff, startup teams, and people who just needed their computer working again. Here’s where I’ve worked and what I did there.</p></div>
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
          <div className="signal-section-heading"><h2>What I work with.</h2><div><p>Most of my work is with Macs and Windows computers, user accounts, and the systems behind them. I also use Bash and PowerShell to automate things we’d otherwise have to do by hand.</p><a className="signal-text-link" href="/work">Explore the project archive <ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
          <div className="signal-skills">{skills.map((skill) => <div key={skill.title}><h3>{skill.title}</h3><p>{skill.items}</p></div>)}</div>
          <div className="signal-education"><p><strong>Associate of Science, Computer Science</strong><br />Cosumnes River College · Web Publishing &amp; Web Programming certificates</p><p><strong>CompTIA Security+</strong><br />Currently pursuing certification</p></div>
        </section>
        <section className="signal-contact signal-section" id="contact">
          <h2>Let’s talk.</h2>
          <div><p>I’m based in Sacramento and open to remote work or a hybrid role in the Bay Area. If you want to talk about a role or something I’ve built, send me an email.</p><a className="signal-contact-email" href={`mailto:${portfolioData.email}`}>{portfolioData.email} <ArrowUpRight size={24} aria-hidden="true" /></a><div className="signal-contact-links"><a href={linkedInUrl} target="_blank" rel="me noreferrer">LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a><button type="button" onClick={copyEmail}>{copyStatus === 'Email copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />} Copy email</button></div><p className="signal-copy-status" role="status">{copyStatus}</p></div>
        </section>
      </main>
      <footer className="signal-footer"><a href="#top">Nicholas Perez <span>↑</span></a><p>IT Systems Engineer · Sacramento, CA</p><a href={portfolioData.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a><p>© {new Date().getFullYear()}</p></footer>
    </div>
  );
}
