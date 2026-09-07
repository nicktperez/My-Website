import { useEffect, useRef, useState } from 'react';
import {
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
  { label: 'Projects', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
];

const workNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/work' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Contact', href: '/#contact' },
];

const linkedInUrl = 'https://www.linkedin.com/in/nicholas-perez-47748773/';
const projectId = (title: string) => title.toLowerCase().replaceAll(' ', '-');
let activeDemoVideo: HTMLVideoElement | null = null;

const capabilityGroups = [
  {
    title: 'Workplace technology',
    description: 'Support and administration for employee devices, hardware, and workplace tools.',
    items: ['macOS & Windows', 'Jamf & Intune', 'Hardware lifecycle', 'Executive support'],
  },
  {
    title: 'Identity & collaboration',
    description: 'Account lifecycle, single sign-on, Microsoft 365, and Google Workspace administration.',
    items: ['Azure AD / Entra ID', 'Okta SSO', 'Microsoft 365', 'Google Workspace'],
  },
  {
    title: 'Security operations',
    description: 'Endpoint telemetry, SIEM labs, incident response, and network security.',
    items: ['Elastic Stack', 'Sysmon telemetry', 'Incident response', 'Network security'],
  },
  {
    title: 'Automation & service',
    description: 'Bash and PowerShell automation, onboarding workflows, documentation, and ticket operations.',
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
    outcome: 'The dashboard groups related activity, records why an event was flagged, and keeps collected data on the Mac.',
    metrics: undefined,
    footnote: undefined,
    experiment: undefined,
    stack: portfolioData.featuredProject.stack,
    note: 'Process, file, network, signing, and quarantine activity in one dashboard.',
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
      lead: isOrbitLab ? 'An adaptive timestep experiment for eccentric orbits.' : undefined,
      description: isOrbitLab
        ? 'I built a native C++20 N-body workbench, then developed an experimental timestep controller that concentrates computation around the most demanding parts of an orbit.'
        : undefined,
      problem: isOrbitLab
        ? 'Fixed timesteps force a tradeoff: waste computation across an entire orbit or lose accuracy where the physics changes fastest.'
        : 'Detection rules need repeatable test data and a safe environment for reviewing the results.',
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
        ? 'Adaptive and fixed-step benchmark results from the same starting conditions.'
        : 'Synthetic events collected, parsed, detected, and reviewed in Elastic.',
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
    outcome: 'A recorded timeline shows stack frames, scopes, heap references, queues, console output, and scheduler decisions together.',
    stack: ['React', 'TypeScript', 'Web Workers', 'Acorn', 'IndexedDB'],
    note: 'Replay JavaScript execution one event at a time.',
  },
  {
    title: 'NetScope',
    category: 'Network observability · incident simulation',
    video: '/media/netscope-demo.mp4',
    poster: '/media/netscope-poster.jpg',
    description: 'A local observability application that combines service health, latency, dependencies, and event timing.',
    outcome: 'A repeatable DNS failure shows the affected services, likely root cause, and recovery sequence.',
    stack: ['Go', 'React', 'SQLite', 'SSE', 'React Flow'],
    note: 'Trace a simulated DNS failure through seven connected services.',
  },
  {
    title: 'OrbitLab',
    category: 'N-body simulation · numerical systems',
    video: '/media/orbitlab-demo.mp4',
    poster: '/media/orbitlab-poster.jpg',
    description: 'A native C++20 application for creating and running three-dimensional N-body simulations.',
    outcome: 'The interface compares integrators and gravity solvers and reports orbital elements, numerical drift, and performance.',
    stack: ['C++20', 'SDL3', 'Dear ImGui', 'CMake', 'Catch2'],
    note: 'Compare numerical methods from the same initial conditions.',
  },
];

type DemoReelProps = (typeof demoReels)[number] & {
  featured?: boolean;
  number: string;
};

const DemoReel = ({ featured = false, number, title, category, video, poster, description, outcome, stack, note }: DemoReelProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = videoRef.current;

    return () => {
      media?.pause();
      if (activeDemoVideo === media) activeDemoVideo = null;
    };
  }, []);

  const registerManualPlayback = () => {
    const media = videoRef.current;
    if (!media) return;

    if (activeDemoVideo && activeDemoVideo !== media) activeDemoVideo.pause();
    activeDemoVideo = media;
  };

  const registerPause = () => {
    if (activeDemoVideo === videoRef.current) activeDemoVideo = null;
  };

  return (
    <article className={`demo-reel${featured ? ' demo-reel--featured' : ''}`}>
      <div className="demo-reel-heading">
        <span>{number}</span>
        <div>
          <p>{category}</p>
          <h3>{title}</h3>
        </div>
      </div>
      <figure className="demo-reel-visual">
        <div className="case-window-label">
          <span>Demo {number}</span>
          <span>Press play to view</span>
        </div>
        <video
          ref={videoRef}
          aria-label={`${title} product demonstration`}
          controls
          loop
          muted
          onPause={registerPause}
          onPlay={registerManualPlayback}
          playsInline
          poster={poster}
          preload="none"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        <figcaption className="project-caption">{note}</figcaption>
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
            <span>{project.title}</span>
            <span>Captured locally</span>
          </div>
          <img
            src={project.image}
            alt={project.imageAlt}
            loading={project.featured ? 'eager' : 'lazy'}
            decoding="async"
          />
          <figcaption className="project-caption">{project.note}</figcaption>
        </figure>

        {project.isOrbitLab && <div className="inline-project-demo"><DemoReel {...demoReels[2]} number="03" /></div>}
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
        <span className="index-tab">Recorded demos</span>
        <h2 id="motion-evidence-title">Project demonstrations.</h2>
      </div>
      <p>
        These recordings show the main workflow of each project and the
        information available while it runs.
      </p>
    </div>
    <div className="demo-reel-list">
      {demoReels.filter((demo) => demo.title !== 'OrbitLab').map((demo, index) => (
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
        <h2>Additional projects.</h2>
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
            <span className="chapter-label">Projects</span>
            <h2>Selected work.</h2>
          </div>
          <div>
            <p>
              MacTrace is a local macOS activity monitor. The SIEM Home Lab runs
              synthetic security events through collection, detection, and review.
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
                  <span>Selected project</span>
                  <span>{project.number}</span>
                </div>
                <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
                <figcaption className="project-caption">{project.note}</figcaption>
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
                  Read project details
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
        <div>
        <ul>
          {experience.highlights.slice(0, 2).map((highlight) => (
            <li key={highlight}>
              {highlight}
            </li>
          ))}
        </ul>
        {experience.highlights.length > 2 && <details className="role-details"><summary>More about this role</summary><ul>{experience.highlights.slice(2).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></details>}
        </div>
      </div>
    </article>
  );
};

const PosterHero = () => (
  <section className="poster-hero intro-hero" id="top" aria-labelledby="poster-title">
    <div className="page-width">
      <header className="intro-nav">
        <a className="intro-brand" href="#top" aria-label="Nicholas Perez, top of page"><span className="brand-monogram">NP</span><span>Nicholas Perez</span></a>
        <nav aria-label="Homepage sections">
          <a href="#experience">Experience</a>
          <a href="#work">Projects</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </nav>
      </header>
      <div className="intro-grid">
        <div className="intro-copy">
          <p className="intro-location">Sacramento, California · Open to hybrid &amp; remote roles</p>
          <h1 id="poster-title">IT Systems<br /><span>Engineer.</span></h1>
          <p className="intro-summary">10+ years supporting endpoints, identity, and workplace technology across government and startup environments.</p>
          <div className="intro-actions">
            <a className="button button-primary" href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className="text-link" href="#contact">Contact <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <p className="intro-note">Calm in the incident. Curious after it.</p>
        </div>
        <figure className="intro-project">
          <a href="/work#mactrace" aria-label="Explore the MacTrace project">
            <img src={portfolioData.featuredProject.image} alt={portfolioData.featuredProject.imageAlt} fetchPriority="high" decoding="async" />
          </a>
          <figcaption><div><strong>MacTrace</strong><p>Local macOS monitoring that connects endpoint activity and explains flagged events.</p></div><a href="/work#mactrace" aria-label="Read about MacTrace"><ArrowUpRight size={22} aria-hidden="true" /></a></figcaption>
        </figure>
      </div>
      <div className="experience-highlights" aria-label="Experience highlights">
        <p><strong>Public service</strong>Supporting 180+ staff and contractors.</p>
        <p><strong>Startup operations</strong>IT support for 10+ startups.</p>
        <p><strong>Endpoint management</strong>Migrated 1,000+ devices to Intune.</p>
      </div>
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
    isWorkPage ? label === 'Projects' : activeSection === href.slice(1)
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
                <span className="index-tab">Work</span>
                <h1>Project archive.</h1>
              </div>
              <div className="work-archive-intro">
                <p>
                  Security, observability, simulation, and JavaScript projects with
                  screenshots, recorded demos, implementation details, and benchmarks.
                </p>
                <a className="text-link" href="/#experience">
                  Start with experience
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <p className="project-caption">Project source and technical notes are linked where available.</p>
              </div>
            </section>

            <section className="work-section work-archive-section" id="work">
              <div className="page-width">
                <h2 className="sr-only">Project details</h2>
                <ProjectCaseFiles />
                <MotionEvidence />
                <MoreWork />
              </div>
            </section>
          </>
        ) : (
          <>
        <PosterHero />
        <SelectedWork />

        <section className="section experience-section manual-chapter" id="experience">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <span className="chapter-label">Employment history</span>
                <h2>Experience.</h2>
              </div>
              <div>
                <p>
                  More than 10 years in public-sector IT, startup support, device
                  management, identity administration, and customer-facing operations.
                </p>
              </div>
            </div>

            <div className="timeline">
              {portfolioData.experience.slice(0, 3).map((experience, index) => (
                <ExperienceItem
                  experience={experience}
                  index={index}
                  key={`${experience.company}-${experience.period}`}
                />
              ))}
            </div>
            <details className="earlier-experience">
              <summary>Earlier experience · SBM Management Services &amp; Geek Squad</summary>
              {portfolioData.experience.slice(3).map((experience, index) => (
                <ExperienceItem experience={experience} index={index + 3} key={experience.company} />
              ))}
            </details>
          </div>
        </section>

        <section className="section capabilities-section manual-chapter" id="capabilities">
          <div className="page-width">
            <div className="section-heading capabilities-heading">
              <div>
                <span className="chapter-label">Tools and experience</span>
                <h2>Capabilities.</h2>
              </div>
              <p>
                Experience with endpoint management, identity platforms, collaboration
                suites, security operations, scripting, and technical support.
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
          <p className="copyright">© {new Date().getFullYear()} Nicholas Perez</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
