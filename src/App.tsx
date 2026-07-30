import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clipboard,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
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
    description: 'Reliable, well-documented support for the devices and tools people use every day.',
    items: ['macOS & Windows', 'Jamf & Intune', 'Hardware lifecycle', 'Executive support'],
  },
  {
    title: 'Identity & collaboration',
    description: 'Practical access management that supports both security and a smooth employee experience.',
    items: ['Azure AD / Entra ID', 'Okta SSO', 'Microsoft 365', 'Google Workspace'],
  },
  {
    title: 'Security operations',
    description: 'Hands-on security foundations informed by years of endpoint and support experience.',
    items: ['Elastic Stack', 'Sysmon telemetry', 'Incident response', 'Network security'],
  },
  {
    title: 'Automation & service',
    description: 'Repeatable processes that reduce friction, improve consistency, and make teams more effective.',
    items: ['Bash & PowerShell', 'Onboarding workflows', 'Knowledge management', 'Ticket operations'],
  },
];

const SystemsMotif = () => (
  <div className="systems-motif" aria-hidden="true">
    <svg viewBox="0 0 420 96" role="presentation">
      <path
        className="systems-flow systems-flow-muted"
        d="M8 69C71 13 132 20 184 49s99 38 154 4c26-16 49-22 74-18"
      />
      <path
        className="systems-flow systems-flow-active"
        d="M8 27c63 48 126 52 185 17s123-35 219 23"
      />
      <circle className="systems-node" cx="48" cy="50" r="4" />
      <circle className="systems-node" cx="116" cy="27" r="4" />
      <circle className="systems-node systems-node-accent" cx="184" cy="49" r="5" />
      <circle className="systems-node" cx="258" cy="65" r="4" />
      <circle className="systems-node" cx="337" cy="53" r="4" />
      <circle className="systems-node systems-node-accent systems-node-delayed" cx="389" cy="54" r="4" />
    </svg>
  </div>
);

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
            <span>NP</span>
            <span className="brand-copy">
              <strong>Nicholas Perez</strong>
              <small>IT Systems &amp; Security Engineer</small>
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
            <ThemeToggle />
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
            <h1>I help teams get more from the technology they rely on.</h1>
            <p className="hero-summary">
              For more than a decade, I’ve supported the people, devices, and systems that
              keep organizations moving. I bring that operational experience to endpoint
              security, automation, and hands-on software projects.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore selected work
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer">
                <FileText size={17} aria-hidden="true" />
                View résumé
              </a>
            </div>

            <div className="contact-links" aria-label="Contact details">
              <a href={`mailto:${portfolioData.email}`}>
                <Mail size={16} aria-hidden="true" />
                {portfolioData.email}
              </a>
              <a href={linkedInUrl} target="_blank" rel="me noreferrer">
                <Linkedin size={16} aria-hidden="true" />
                LinkedIn
              </a>
              <span>
                <MapPin size={16} aria-hidden="true" />
                {portfolioData.location}
              </span>
            </div>
          </div>

          <aside className="profile-brief" aria-label="Professional overview">
            <SystemsMotif />
            <div className="brief-heading">
              <span>Professional overview</span>
            </div>
            <dl>
              <div>
                <dt>Experience</dt>
                <dd>10+ years across internal IT, executive support, and service operations</dd>
              </div>
              <div>
                <dt>Scale</dt>
                <dd>3,000+ tickets resolved annually and 1,000+ devices migrated</dd>
              </div>
              <div>
                <dt>Current focus</dt>
                <dd>Endpoint visibility, identity, automation, and security operations</dd>
              </div>
            </dl>
            <a href="#contact">
              Start a conversation
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </aside>
        </section>

        <section className="impact-band" aria-label="Areas of impact">
          <div className="page-width impact-grid">
            <p><strong>Support with context.</strong> Clear communication for everyone from frontline staff to executives.</p>
            <p><strong>Systems that scale.</strong> Automation, documentation, and repeatable onboarding workflows.</p>
            <p><strong>Security that works.</strong> Practical controls built around real people and real operations.</p>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="page-width">
            <div className="work-heading">
              <p className="work-kicker">Selected work</p>
              <h2>I build to understand how systems behave.</h2>
              <p>
                These projects let me explore endpoint security, detection engineering,
                and systems design—then turn what I learn into tools other people can
                inspect and use.
              </p>
            </div>

            <article className="featured-project">
              <div className="project-window">
                <div className="window-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <p>localhost · synthetic investigation</p>
                </div>
                <img
                  src={portfolioData.featuredProject.image}
                  alt={portfolioData.featuredProject.imageAlt}
                  width="1440"
                  height="1100"
                  loading="lazy"
                  decoding="async"
                />
                <span className="project-status">{portfolioData.featuredProject.status}</span>
              </div>

              <div className="featured-project-copy">
                <div className="project-title-row">
                  <div>
                    <p>{portfolioData.featuredProject.category}</p>
                    <h3>{portfolioData.featuredProject.title}</h3>
                  </div>
                  <a
                    className="project-link"
                    href={portfolioData.featuredProject.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${portfolioData.featuredProject.title} on GitHub`}
                  >
                    <Github size={19} aria-hidden="true" />
                    GitHub
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
                <p className="featured-description">{portfolioData.featuredProject.description}</p>
                <ul className="project-highlights">
                  {portfolioData.featuredProject.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Check size={16} aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <ul className="project-stack" aria-label={`${portfolioData.featuredProject.title} technology`}>
                  {portfolioData.featuredProject.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>

            <div className="project-pair">
              {portfolioData.projects.map((project) => (
                <article className="project-story" key={project.title}>
                  <a
                    className="project-story-visual"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>
                      Open repository
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </a>
                  <div className="project-story-copy">
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <strong>{project.outcome}</strong>
                    <ul className="project-stack" aria-label={`${project.title} technology`}>
                      {project.stack.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <div className="more-work">
              <div className="more-work-heading">
                <h3>More builds, same curiosity.</h3>
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

        <section className="section section-tinted" id="experience">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <p className="section-label">Experience</p>
                <h2>A decade of dependable IT delivery.</h2>
              </div>
              <p>
                Progressively broader responsibility across public service, startups,
                managed environments, and customer-facing operations.
              </p>
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
                    <div className="timeline-marker" aria-hidden="true" />
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

        <section className="section page-width" id="capabilities">
          <div className="section-heading">
            <div>
              <p className="section-label">Capabilities</p>
              <h2>Broad technical range, grounded in service.</h2>
            </div>
            <p>
              Tools change. The durable skills are diagnosis, communication,
              documentation, and thoughtful execution.
            </p>
          </div>

          <div className="capability-list">
            {capabilityGroups.map((group) => (
              <article key={group.title}>
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
              <p className="section-label">Education</p>
              <h3>Associate of Science, Computer Science</h3>
              <p>Cosumnes River College · Certificates in Web Publishing &amp; Web Programming</p>
            </div>
            <div>
              <p className="section-label">Certification</p>
              <h3>CompTIA Security+</h3>
              <p>In progress · Expected 2026</p>
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
          <p className="copyright">© {new Date().getFullYear()} Nicholas Perez</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
