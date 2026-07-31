import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clipboard,
  FileText,
  Github,
  Menu,
  X,
} from 'lucide-react';
import { portfolioData } from './data';
import ContactForm from './components/ContactForm';
import ThemeToggle from './components/ThemeToggle';

const homeNavigation = [
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
];

const workNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Work', href: '/work' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Contact', href: '/#contact' },
];

const linkedInUrl = 'https://www.linkedin.com/in/nicholas-perez-47748773/';
const projectId = (title: string) => title.toLowerCase().replaceAll(' ', '-');

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
    lead: undefined,
    description: undefined,
    problem: 'Endpoint activity is noisy. The useful signal is usually buried across processes, files, and network events.',
    action: portfolioData.featuredProject.description,
    outcome: 'Faster triage, clearer context, and a local-first investigation workflow that explains what deserves attention.',
    metrics: undefined,
    footnote: undefined,
    experiment: undefined,
    stack: portfolioData.featuredProject.stack,
    note: 'Signal over noise. Context before conclusions.',
    featured: true,
    isOrbitLab: false,
  },
  ...portfolioData.projects.map((project, index) => {
    const isOrbitLab = project.title === 'OrbitLab';

    return {
      number: `0${index + 2}`,
      title: project.title,
      category: isOrbitLab ? 'Numerical systems · experimental methods' : project.category,
      image: project.image,
      imageAlt: project.imageAlt,
      github: project.github,
      lead: isOrbitLab ? 'Can a simulator recognize when precision matters?' : undefined,
      description: isOrbitLab
        ? 'I built a native C++20 N-body workbench, then developed an experimental timestep controller that concentrates computation around the most demanding parts of an orbit.'
        : undefined,
      problem: isOrbitLab
        ? 'Fixed timesteps force a tradeoff: waste computation across an entire orbit or lose accuracy where the physics changes fastest.'
        : 'Detection ideas are hard to trust without a safe place to generate data and investigate the result.',
      action: isOrbitLab
        ? 'I developed the OrbitLab Adaptive Fidelity Method, combining acceleration, changing acceleration, and closing-encounter timescales into a deterministic timestep controller.'
        : project.description,
      outcome: isOrbitLab
        ? 'In a reproducible eccentric-orbit benchmark, it delivered 650× lower final-position error and 1,100× lower energy drift than coarse stepping while using 98% fewer steps than the fine baseline.'
        : project.outcome,
      metrics: isOrbitLab
        ? [
            { value: '650×', label: 'lower final-position error*' },
            { value: '1,100×', label: 'lower energy drift*' },
            { value: '98%', label: 'fewer steps than the fine baseline†' },
          ]
        : undefined,
      footnote: isOrbitLab
        ? 'A reproducible eccentric-orbit benchmark using RK4. * Compared with coarse fixed stepping. † Compared with fine fixed stepping.'
        : undefined,
      experiment: isOrbitLab
        ? 'https://github.com/nicktperez/OrbitLab/blob/main/docs/ORBITLAB_METHOD.md'
        : undefined,
      stack: project.stack,
      note: isOrbitLab
        ? 'Form a hypothesis. Run it. Keep the failure.'
        : 'Better questions make better detections.',
      featured: false,
      isOrbitLab,
    };
  }),
];

const demoReels = [
  {
    title: 'Runtime Atlas',
    category: 'JavaScript runtimes · deterministic replay',
    video: '/media/runtime-atlas-demo.mp4',
    poster: '/media/runtime-atlas-poster.jpg',
    description: 'An interactive execution laboratory that makes JavaScript order visible across source, runtime state, and an event timeline.',
    outcome: 'It turns stack frames, scopes, heap references, queues, console output, and scheduler decisions into one replayable story.',
    stack: ['React', 'TypeScript', 'Web Workers', 'Acorn', 'IndexedDB'],
    note: 'Step through the cause, not just the output.',
  },
  {
    title: 'NetScope',
    category: 'Network observability · incident simulation',
    video: '/media/netscope-demo.mp4',
    poster: '/media/netscope-poster.jpg',
    description: 'A local-first observability application that connects live health signals and service dependencies into an explainable incident.',
    outcome: 'It safely simulates failures, shows the downstream blast radius, and identifies probable root cause using dependency and timing evidence.',
    stack: ['Go', 'React', 'SQLite', 'SSE', 'React Flow'],
    note: 'A failure is more useful when the chain is visible.',
  },
  {
    title: 'OrbitLab',
    category: 'N-body simulation · numerical systems',
    video: '/media/orbitlab-demo.mp4',
    poster: '/media/orbitlab-poster.jpg',
    description: 'A native C++20 workbench that turns three-dimensional gravitational systems into controllable, inspectable experiments.',
    outcome: 'It compares integrators and gravity solvers while exposing orbital elements, numerical drift, performance, and the live state behind every body.',
    stack: ['C++20', 'SDL3', 'Dear ImGui', 'CMake', 'Catch2'],
    note: 'Change the model. Watch the system answer.',
  },
];

type DemoReelProps = (typeof demoReels)[number] & {
  featured?: boolean;
  number: string;
};

const DemoReel = ({ featured = false, number, title, category, video, poster, description, outcome, stack, note }: DemoReelProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);

    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const media = videoRef.current;
    if (!media) return;

    if (reducedMotion) {
      media.pause();
      media.currentTime = 0;
    } else {
      void media.play().catch(() => {
        // Browser autoplay policy can require the visitor to press play.
      });
    }
  }, [reducedMotion]);

  return (
    <article className={`demo-reel${featured ? ' demo-reel--featured' : ''}`}>
      <div className="demo-reel-heading">
        <span>{number}</span>
        <div>
          <p>{category}</p>
          <h4>{title}</h4>
        </div>
      </div>
      <figure className="demo-reel-visual">
        <div className="case-window-label">
          <span>Motion exhibit {number}</span>
          <span>{reducedMotion ? 'Press play to view' : 'Playing locally'}</span>
        </div>
        <video
          ref={videoRef}
          aria-label={`${title} product demonstration`}
          autoPlay={!reducedMotion}
          controls
          loop
          muted
          playsInline
          poster={poster}
          preload="metadata"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        <figcaption className="hand-note">{note}</figcaption>
      </figure>
      <div className="demo-reel-copy">
        <p>{description}</p>
        <strong>{outcome}</strong>
        <ul aria-label={`${title} technology`}>
          {stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </article>
  );
};

const ProjectCaseFiles = () => (
  <div className="case-files">
    {projectCases.map((project) => (
      <article
        className={`case-file${project.featured ? ' is-featured' : ''}${project.isOrbitLab ? ' is-orbitlab' : ''}`}
        id={projectId(project.title)}
        key={project.title}
      >
        <div className="case-index" aria-hidden="true">{project.number}</div>
        <div className="case-summary">
          <p className="case-category">{project.category}</p>
          <h3>{project.title}</h3>
          {project.lead && <p className="case-lead">{project.lead}</p>}
          {project.description && <p className="case-description">{project.description}</p>}
          {project.metrics && (
            <>
              <dl className="case-metrics" aria-label="OrbitLab benchmark results">
                {project.metrics.map((metric) => (
                  <div key={metric.value}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="case-benchmark-note">{project.footnote}</p>
            </>
          )}
          <dl className="case-details">
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
          <div className="project-links">
            <a
              aria-label={`View the ${project.title} project on GitHub`}
              className="project-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} aria-hidden="true" />
              View project
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            {project.experiment && (
              <a
                aria-label="View the OrbitLab Adaptive Fidelity Method experiment on GitHub"
                className="project-link"
                href={project.experiment}
                target="_blank"
                rel="noreferrer"
              >
                <FileText size={17} aria-hidden="true" />
                View experiment
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
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
);

const MotionEvidence = () => (
  <section className="motion-evidence" aria-labelledby="motion-evidence-title">
    <div className="motion-evidence-heading">
      <div>
        <span className="index-tab">Demo bench</span>
        <h2 id="motion-evidence-title">Systems in motion.</h2>
      </div>
      <p>
        Static screens show the interface. These short recordings show
        the systems changing state, explaining cause, and recovering.
      </p>
    </div>
    <div className="demo-reel-list">
      {demoReels.map((demo, index) => (
        <DemoReel
          {...demo}
          featured={index === demoReels.length - 1}
          key={demo.title}
          number={`M${String(index + 1).padStart(2, '0')}`}
        />
      ))}
    </div>
  </section>
);

const MoreWork = () => (
  <div className="more-work">
    <div className="more-work-heading">
      <div>
        <h2>More builds, same curiosity.</h2>
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
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <span>{project.stack}</span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      ))}
    </div>
  </div>
);

const SelectedWork = () => {
  const selectedProjects = projectCases.filter((project) => (
    project.title === 'MacTrace' || project.title === 'SIEM Home Lab'
  ));

  return (
    <section className="section selected-work-section manual-chapter" id="work">
      <div className="page-width">
        <div className="section-heading selected-work-heading">
          <div>
            <span className="chapter-kicker">Chapter 02 · Selected evidence</span>
            <h2>Selected work.</h2>
          </div>
          <div>
            <p>
              Two records of the same habit: solve the immediate problem, then leave
              the system clearer and easier to support.
            </p>
            <a className="text-link" href="/work">
              Explore all projects
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="selected-work-list">
          {selectedProjects.map((project) => (
            <article className="selected-record" key={project.title}>
              <figure>
                <div className="case-window-label">
                  <span>Selected record</span>
                  <span>{project.number}</span>
                </div>
                <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
                <figcaption className="hand-note">{project.note}</figcaption>
              </figure>
              <div className="selected-record-copy">
                <p className="case-category">{project.category}</p>
                <h3>{project.title}</h3>
                {project.lead ? <p className="selected-record-lead">{project.lead}</p> : null}
                <p>{project.description ?? project.outcome}</p>
                {project.metrics ? (
                  <p className="selected-record-results">
                    {project.metrics.map((metric) => (
                      <span key={metric.value}>
                        <strong>{metric.value}</strong> {metric.label}
                      </span>
                    ))}
                  </p>
                ) : null}
                <a className="project-link" href={`/work#${projectId(project.title)}`}>
                  Read case file
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
};

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

type ExperienceItemProps = {
  experience: (typeof portfolioData.experience)[number];
  index: number;
};

const ExperienceItem = ({ experience, index }: ExperienceItemProps) => {
  return (
    <article className={`timeline-item${index === 0 ? ' is-current' : ''}`}>
      <div className="timeline-meta">
        <span className="timeline-record-number">{String(index + 1).padStart(2, '0')}</span>
        <p>{experience.period}</p>
        <h3>{experience.company}</h3>
      </div>
      <div className="timeline-content">
        <h4>{experience.role}</h4>
        <ul>
          {experience.highlights.map((highlight) => (
            <li key={highlight}>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const PosterHero = () => (
  <section className="poster-hero" id="top" aria-labelledby="poster-title">
    <div className="poster-frame">
      <i className="registration-mark registration-mark--top-left" aria-hidden="true" />
      <i className="registration-mark registration-mark--top-right" aria-hidden="true" />
      <i className="registration-mark registration-mark--bottom-left" aria-hidden="true" />
      <i className="registration-mark registration-mark--bottom-right" aria-hidden="true" />

      <header className="poster-top-rail">
        <p>Field record <span>/</span> 24-05-19</p>
        <nav aria-label="Homepage sections">
          <a href="#experience">Systems</a>
          <span aria-hidden="true">•</span>
          <a href="#work">Security</a>
          <span aria-hidden="true">•</span>
          <a href="#contact">People</a>
        </nav>
      </header>

      <div className="poster-grid">
        <div className="poster-copy">
          <a className="poster-monogram" href="#top" aria-label="Nicholas Perez, top of page">NP</a>

          <h1 className="poster-title" id="poster-title">
            <span>Technology</span>
            <strong>Breaks.</strong>
          </h1>

          <div className="poster-callout">
            <p>I’m the one<br />people call.</p>
            <p className="poster-hand-note">Calm in the incident. Curious after it.</p>
          </div>

          <div className="poster-ledger">
            <div className="poster-identity">
              <p className="poster-ledger-label">Name <span aria-hidden="true">→</span></p>
              <a href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer">Nicholas Perez</a>
              <p className="poster-ledger-label">Role <span aria-hidden="true">→</span></p>
              <strong>IT Systems Engineer</strong>
              <a className="poster-resume-link" href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer">
                View résumé <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>

            <dl className="poster-methods">
              <div>
                <dt>Focus <span aria-hidden="true">→</span></dt>
                <dd>System reliability<br />Security operations<br />Incident response</dd>
              </div>
              <div>
                <dt>Approach <span aria-hidden="true">→</span></dt>
                <dd>Investigate<br />Understand<br />Resolve</dd>
              </div>
              <div>
                <dt>Method <span aria-hidden="true">→</span></dt>
                <dd>Data-driven<br />Human-first<br />Document everything</dd>
              </div>
            </dl>
          </div>
        </div>

        <aside className="poster-evidence" aria-label="Selected systems and security project evidence">
          <div className="poster-evidence-grid">
            <figure className="poster-shot poster-shot--mactrace">
              <img src="/mactrace-dashboard.png" alt="MacTrace endpoint posture dashboard" />
              <figcaption>Endpoint posture</figcaption>
            </figure>
            <figure className="poster-shot poster-shot--siem">
              <img src="/siem-kibana-dashboard.png" alt="Elastic security analytics dashboard" />
              <figcaption>Security analytics</figcaption>
            </figure>
            <div
              className="poster-signal-card"
              role="img"
              aria-label="Raspberry Pi honeypot record showing more than 1,000 unauthorized login attempts captured during the first week"
            >
              <div className="poster-signal-heading">
                <span>Field 04</span>
                <span>Honeypot telemetry</span>
              </div>
              <svg className="poster-signal-chart" viewBox="0 0 420 120" aria-hidden="true">
                <path d="M4 96 C28 91, 35 98, 57 85 S92 69, 112 82 S146 103, 169 69 S204 30, 230 54 S263 93, 285 64 S316 41, 337 56 S373 83, 416 18" />
                <circle cx="416" cy="18" r="4" />
              </svg>
              <div className="poster-signal-metric">
                <strong>1,000+</strong>
                <span>Unauthorized login attempts<br />captured in the first week</span>
              </div>
              <p>SSH / Telnet / Elastic Stack</p>
            </div>
            <figure className="poster-shot poster-shot--orbit">
              <img src="/orbitlab-screenshot.png" alt="OrbitLab simulation interface" />
              <figcaption>Systems thinking</figcaption>
            </figure>
          </div>
          <p className="poster-margin-note">Evidence first. Assumptions last.</p>
        </aside>
      </div>

      <footer className="poster-bottom-rail">
        <p>Observe <span>•</span> Analyze <span>•</span> Act</p>
        <a href="#experience">Scroll to record <ArrowDown size={13} aria-hidden="true" /></a>
        <p>Field notes. Not noise.</p>
      </footer>
    </div>
  </section>
);

const App = () => {
  const isWorkPage = window.location.pathname.replace(/\/+$/, '') === '/work';
  const navigation = isWorkPage ? workNavigation : homeNavigation;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(isWorkPage ? 'work' : '');
  const mobileNavTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileNavOpen) {
        setMobileNavOpen(false);
        window.requestAnimationFrame(() => mobileNavTriggerRef.current?.focus());
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;

    const menu = mobileNavRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    menu?.addEventListener('keydown', containFocus);
    return () => menu?.removeEventListener('keydown', containFocus);
  }, [mobileNavOpen]);

  useEffect(() => {
    document.title = isWorkPage
      ? 'Project Archive | Nicholas Perez'
      : 'Nicholas Perez | IT Systems Engineer';
  }, [isWorkPage]);

  useEffect(() => {
    if (isWorkPage) return;

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
  }, [isWorkPage, navigation]);

  const isNavigationActive = (label: string, href: string) => (
    isWorkPage ? label === 'Work' : activeSection === href.slice(1)
  );

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      {isWorkPage ? <header className="site-header">
        <div className="page-width header-inner">
          <a className="brand-mark" href={isWorkPage ? '/' : '#top'} aria-label="Nicholas Perez, home">
            <span className="brand-monogram">NP</span>
            <span className="brand-copy">
              <strong>Nicholas Perez</strong>
              <small>IT Systems Engineer · Sacramento, CA</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a
                className={isNavigationActive(item.label, item.href) ? 'is-active' : undefined}
                key={item.href}
                href={item.href}
                aria-current={isNavigationActive(item.label, item.href) ? 'location' : undefined}
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
              ref={mobileNavTriggerRef}
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
            ref={mobileNavRef}
            className={`mobile-nav${mobileNavOpen ? ' is-open' : ''}`}
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <a
                className={isNavigationActive(item.label, item.href) ? 'is-active' : undefined}
                key={item.href}
                href={item.href}
                aria-current={isNavigationActive(item.label, item.href) ? 'location' : undefined}
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
      </header> : null}

      <main id="main-content">
        {isWorkPage ? (
          <>
            <section className="work-archive-hero page-width" id="top">
              <div>
                <span className="index-tab">Field archive</span>
                <h1>Builds, experiments, and working evidence.</h1>
              </div>
              <div className="work-archive-intro">
                <p>
                  The deeper technical record: what I built, the problem behind it,
                  what changed, and the evidence that survived the experiment.
                </p>
                <a className="text-link" href="/#experience">
                  Start with experience
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <p className="hand-note">Open the case file. Check the assumptions.</p>
              </div>
            </section>

            <section className="work-section work-archive-section" id="work">
              <div className="page-width">
                <ProjectCaseFiles />
                <MotionEvidence />
                <MoreWork />
              </div>
            </section>
          </>
        ) : (
          <>
        <PosterHero />

        <section className="section experience-section manual-chapter" id="experience">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <span className="chapter-kicker">Chapter 01 · Complete work record</span>
                <h2>Experience.</h2>
              </div>
              <div>
                <p>
                  Ten years across public service, startups, managed environments,
                  and customer-facing operations. Every role stays open here because
                  the details are the evidence.
                </p>
              </div>
            </div>

            <div className="timeline">
              {portfolioData.experience.map((experience, index) => (
                <ExperienceItem
                  experience={experience}
                  index={index}
                  key={`${experience.company}-${experience.period}`}
                />
              ))}
            </div>
          </div>
        </section>

        <SelectedWork />

        <section className="section capabilities-section manual-chapter" id="capabilities">
          <div className="page-width">
            <div className="section-heading capabilities-heading">
              <div>
                <span className="chapter-kicker">Chapter 03 · Field kit</span>
                <h2>Capabilities.</h2>
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
                <p>Currently pursuing certification</p>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="page-width footer-inner">
          <div>
            <strong>Nicholas Perez</strong>
            <p>IT Systems Engineer · Sacramento, California</p>
          </div>
          <div className="footer-links">
            <a href={`mailto:${portfolioData.email}`}>Email</a>
            <a href={linkedInUrl} target="_blank" rel="me noreferrer">LinkedIn</a>
            <a href="/work">Project archive</a>
            <a href={portfolioData.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer">Résumé</a>
            <CopyEmailButton />
          </div>
          <p className="copyright">© {new Date().getFullYear()} Nicholas Perez · Built with care, not hype.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
