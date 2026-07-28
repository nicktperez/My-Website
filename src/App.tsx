import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clipboard,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
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

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileNavOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

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
              <a key={item.href} href={item.href}>{item.label}</a>
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
              <a key={item.href} href={item.href} onClick={() => setMobileNavOpen(false)}>
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
            <p className="availability">
              <span aria-hidden="true" />
              Open to hybrid roles in the San Francisco Bay Area
            </p>
            <h1>IT systems that help people do their best work.</h1>
            <p className="hero-summary">
              I’m Nicholas Perez, an IT systems professional with 10+ years of experience
              supporting people, endpoints, identity, and workplace technology. I combine
              high-trust support with automation and practical security operations.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#experience">
                View experience
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
              <a href={`tel:${portfolioData.phone.replace(/\D/g, '')}`}>
                <Phone size={16} aria-hidden="true" />
                {portfolioData.phone}
              </a>
              <span>
                <MapPin size={16} aria-hidden="true" />
                {portfolioData.location}
              </span>
            </div>
          </div>

          <aside className="profile-brief" aria-label="Professional overview">
            <div className="brief-heading">
              <span>Professional overview</span>
              <span className="brief-status">Available</span>
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
                <dd>Endpoint management, identity, automation, and SIEM operations</dd>
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

        <section className="section page-width" id="work">
          <div className="section-heading">
            <div>
              <p className="section-label">Selected work</p>
              <h2>Security monitoring, made operational.</h2>
            </div>
            <p>
              A hands-on lab connecting endpoint telemetry, detection engineering,
              and documented incident workflows.
            </p>
          </div>

          <article className="case-study">
            <figure className="case-visual">
              <img
                src="/siem-kibana-dashboard.png"
                alt="Kibana visualization showing counts of simulated failed SSH authentication events"
                width="2644"
                height="1392"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>Real project evidence</span>
                Kibana visualization built from simulated SSH authentication failures
              </figcaption>
            </figure>

            <div className="case-copy">
              <div>
                <p className="section-label">Elastic Stack · Filebeat · Logstash</p>
                <h3>SIEM Home Lab</h3>
                <p>
                  Built a reproducible monitoring environment to collect and parse logs,
                  generate realistic security events, and validate detection workflows.
                </p>
              </div>
              <ul>
                {portfolioData.securityProject.highlights.map((highlight) => (
                  <li key={highlight}>
                    <Check size={17} aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <a className="text-link" href={portfolioData.securityProject.github} target="_blank" rel="noreferrer">
                <Github size={18} aria-hidden="true" />
                View project on GitHub
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </article>
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
              {portfolioData.experience.map((experience) => (
                <article className="timeline-item" key={`${experience.company}-${experience.period}`}>
                  <div className="timeline-meta">
                    <p>{experience.period}</p>
                    <h3>{experience.company}</h3>
                  </div>
                  <div className="timeline-content">
                    <h4>{experience.role}</h4>
                    <ul>
                      {experience.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
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
            <a href={portfolioData.securityProject.github} target="_blank" rel="noreferrer">GitHub</a>
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
