import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clipboard,
  FileText,
  Github,
  Menu,
  X,
} from 'lucide-react';
import { portfolioData } from './data';
import ContactForm from './components/ContactForm';
import ThemeToggle from './components/ThemeToggle';

const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
];

const linkedInUrl = 'https://www.linkedin.com/in/nicholas-perez-47748773/';

const capabilityGroups = [
  {
    title: 'Workplace technology',
    description: 'Reliable support for the devices and tools people count on every day.',
    items: ['macOS & Windows', 'Jamf & Intune', 'Hardware lifecycle', 'Executive support'],
  },
  {
    title: 'Identity & collaboration',
    description: 'Access management that protects the business without getting in people’s way.',
    items: ['Azure AD / Entra ID', 'Okta SSO', 'Microsoft 365', 'Google Workspace'],
  },
  {
    title: 'Security operations',
    description: 'Security foundations shaped by years of endpoint and support experience.',
    items: ['Elastic Stack', 'Sysmon telemetry', 'Incident response', 'Network security'],
  },
  {
    title: 'Automation & service',
    description: 'Repeatable processes that reduce friction and give teams time back.',
    items: ['Bash & PowerShell', 'Onboarding workflows', 'Knowledge management', 'Ticket operations'],
  },
];

const projectCases = [
  {
    number: '01',
    title: portfolioData.featuredProject.title,
    category: 'Endpoint visibility & response',
    image: portfolioData.featuredProject.image,
    imageAlt: portfolioData.featuredProject.imageAlt,
    github: portfolioData.featuredProject.github,
    problem: 'Endpoint activity is noisy. The useful signal is usually buried across processes, files, and network events.',
    action: portfolioData.featuredProject.description,
    outcome: 'Faster triage, clearer context, and a local-first investigation workflow that explains what deserves attention.',
    stack: portfolioData.featuredProject.stack,
    note: 'Signal over noise. Context before conclusions.',
    featured: true,
  },
  ...portfolioData.projects.map((project, index) => ({
    number: `0${index + 2}`,
    title: project.title,
    category: project.category,
    image: project.image,
    imageAlt: project.imageAlt,
    github: project.github,
    problem: index === 0
      ? 'Detection ideas are hard to trust without a safe place to generate data and investigate the result.'
      : 'Complex systems are easier to understand when you can change one variable and watch the system respond.',
    action: project.description,
    outcome: project.outcome,
    stack: project.stack,
    note: index === 0
      ? 'Better questions make better detections.'
      : 'Model it. Test it. Learn from it.',
    featured: false,
  })),
];

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${portfolioData.email}`;
    }
  };

  return (
    <button className="copy-button" type="button" onClick={copyEmail}>
      {copied ? <Check size={15} aria-hidden="true" /> : <Clipboard size={15} aria-hidden="true" />}
      <span>{copied ? 'Copied' : 'Copy email'}</span>
      <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
    </button>
  );
};

const App = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [expandedExperience, setExpandedExperience] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileNavOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection?.target.id) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: '-28% 0px -62%', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleExperience = (index: number) => {
    setExpandedExperience((current) => ({
      ...current,
      [index]: !current[index],
    }));
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <div className="page-width header-inner">
          <a className="brand-mark" href="#top" aria-label="Nicholas Perez, home">
            <span className="brand-monogram">NP</span>
            <span className="brand-copy">
              <strong>Nicholas Perez</strong>
              <small>IT systems · security · service</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a
                className={activeSection === item.href.slice(1) ? 'is-active' : undefined}
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-resume" href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer">
              Résumé
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <ThemeToggle />
            <button
              className="mobile-nav-trigger"
              type="button"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              {mobileNavOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>

          <nav
            className={`mobile-nav${mobileNavOpen ? ' is-open' : ''}`}
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <a
                className={activeSection === item.href.slice(1) ? 'is-active' : undefined}
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
                onClick={() => setMobileNavOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
            <a href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer" onClick={() => setMobileNavOpen(false)}>
              View résumé
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero page-width" id="top">
          <div className="hero-copy">
            <h1>
              <span>Technology breaks.</span>
              <em>I’m the one people call.</em>
            </h1>
            <p className="hero-summary">
              I solve the problem in front of me, then build systems that prevent the next one.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer">
                <FileText size={17} aria-hidden="true" />
                View résumé
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="text-link" href="#work">
                See the work
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>

            <p className="hand-note hero-note">
              Calm in the incident.<br />
              Curious after it.
            </p>
          </div>

          <aside className="evidence-board" aria-label="A contact sheet of selected projects">
            <div className="evidence-heading">
              <span>Field record · selected builds</span>
              <span>NP / 2026</span>
            </div>
            <div className="contact-sheet">
              <figure className="contact-frame frame-mactrace">
                <img src="/mactrace-dashboard.png" alt="" />
                <figcaption>Endpoint visibility</figcaption>
              </figure>
              <figure className="contact-frame frame-siem">
                <img src="/siem-kibana-dashboard.png" alt="" />
                <figcaption>Detection lab</figcaption>
              </figure>
              <figure className="contact-frame frame-orbit">
                <img src="/orbitlab-screenshot.png" alt="" />
                <figcaption>Systems thinking</figcaption>
              </figure>
            </div>
            <p className="hand-note evidence-note">Real systems. Real questions. Document everything.</p>
          </aside>
        </section>

        <section className="field-strip" aria-label="Professional summary">
          <div className="page-width field-strip-inner">
            <p><strong>10+ years</strong><span>supporting people and systems</span></p>
            <p><strong>3,000+</strong><span>tickets resolved annually</span></p>
            <p><strong>1,000+</strong><span>devices migrated</span></p>
            <p className="field-strip-note">Preparation is how I stay lucky.</p>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="page-width">
            <div className="work-heading">
              <div>
                <span className="index-tab">Case files</span>
                <h2>Evidence over noise.</h2>
              </div>
              <p>
                I build small, serious systems to understand how technology behaves,
                where it fails, and how to make the next response faster.
              </p>
            </div>

            <div className="case-files">
              {projectCases.map((project) => (
                <article className={`case-file${project.featured ? ' is-featured' : ''}`} key={project.title}>
                  <div className="case-index" aria-hidden="true">{project.number}</div>
                  <div className="case-summary">
                    <p className="case-category">{project.category}</p>
                    <h3>{project.title}</h3>
                    <dl>
                      <div>
                        <dt>Problem</dt>
                        <dd>{project.problem}</dd>
                      </div>
                      <div>
                        <dt>Action</dt>
                        <dd>{project.action}</dd>
                      </div>
                      <div>
                        <dt>Outcome</dt>
                        <dd>{project.outcome}</dd>
                      </div>
                    </dl>
                    <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
                      <Github size={17} aria-hidden="true" />
                      View project
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>

                  <figure className="case-visual">
                    <div className="case-window-label">
                      <span>Exhibit {project.number}</span>
                      <span>Captured locally</span>
                    </div>
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading={project.featured ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <figcaption className="hand-note">{project.note}</figcaption>
                  </figure>

                  <ul className="project-stack" aria-label={`${project.title} technology`}>
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>

            <div className="more-work">
              <div className="more-work-heading">
                <div>
                  <h3>More builds, same curiosity.</h3>
                </div>
                <a href={portfolioData.github} target="_blank" rel="noreferrer">
                  All repositories
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="more-work-list">
                {portfolioData.moreProjects.map((project) => (
                  <a href={project.github} target="_blank" rel="noreferrer" key={project.title}>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                    </div>
                    <span>{project.stack}</span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <span className="index-tab">Service record</span>
                <h2>Dependable is a practice.</h2>
              </div>
              <div>
                <p>
                  A decade of increasing responsibility across public service,
                  startups, managed environments, and customer-facing operations.
                </p>
                <p className="operator-principles">Take ownership. Stay clear. Follow through.</p>
              </div>
            </div>

            <div className="timeline">
              {portfolioData.experience.map((experience, index) => {
                const hasAdditionalDetails = index > 0 && experience.highlights.length > 2;
                const isExpanded = Boolean(expandedExperience[index]);
                const detailsId = `experience-details-${index}`;

                return (
                  <article
                    className={`timeline-item${index === 0 ? ' is-current' : ''}${isExpanded ? ' is-expanded' : ''}`}
                    key={`${experience.company}-${experience.period}`}
                  >
                    <div className="timeline-meta">
                      <p>{experience.period}</p>
                      <h3>{experience.company}</h3>
                    </div>
                    <div className="timeline-content">
                      <h4>{experience.role}</h4>
                      <ul id={detailsId}>
                        {experience.highlights.map((highlight, highlightIndex) => (
                          <li className={highlightIndex > 1 ? 'timeline-extra' : undefined} key={highlight}>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      {hasAdditionalDetails ? (
                        <button
                          className="timeline-toggle"
                          type="button"
                          aria-controls={detailsId}
                          aria-expanded={isExpanded}
                          onClick={() => toggleExperience(index)}
                        >
                          {isExpanded ? 'Hide details' : 'View details'}
                          <ChevronDown size={16} aria-hidden="true" />
                        </button>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section capabilities-section" id="capabilities">
          <div className="page-width">
            <div className="section-heading capabilities-heading">
              <div>
                <span className="index-tab">Field kit</span>
                <h2>Broad range. Human center.</h2>
              </div>
              <p>
                Tools change. Diagnosis, communication, documentation, and thoughtful
                execution are the skills that keep paying off.
              </p>
            </div>

            <div className="capability-list">
              {capabilityGroups.map((group, index) => (
                <article key={group.title}>
                  <span className="capability-number">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <ul aria-label={`${group.title} tools and skills`}>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>

            <div className="credentials">
              <div>
                <span>Education</span>
                <h3>Associate of Science, Computer Science</h3>
                <p>Cosumnes River College · Web Publishing &amp; Web Programming certificates</p>
              </div>
              <div>
                <span>In progress</span>
                <h3>CompTIA Security+</h3>
                <p>Expected 2026</p>
              </div>
              <p className="operator-principles credentials-note">Always learning. Always building.</p>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      <footer className="site-footer">
        <div className="page-width footer-inner">
          <div>
            <strong>Nicholas Perez</strong>
            <p>IT Systems &amp; Security Engineer · Sacramento, California</p>
          </div>
          <div className="footer-links">
            <a href={`mailto:${portfolioData.email}`}>Email</a>
            <a href={linkedInUrl} target="_blank" rel="me noreferrer">LinkedIn</a>
            <a href={portfolioData.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer">Résumé</a>
            <CopyEmailButton />
          </div>
          <p className="copyright">© {new Date().getFullYear()} Nicholas Perez · Built with care, not hype.</p>
        </div>
      </footer>

      <nav className="section-tabs" aria-label="Page sections">
        {navigation.map((item) => (
          <a
            className={activeSection === item.href.slice(1) ? 'is-active' : undefined}
            key={item.href}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default App;
