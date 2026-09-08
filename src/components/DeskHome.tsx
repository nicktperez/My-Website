import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import DeskActivity from './DeskActivity';
import './desk.css';

type Panel = 'work' | 'experience' | 'capabilities' | 'orbitlab' | 'contact';
const titles: Record<Panel, string> = {
  work: 'Projects', experience: 'Experience', capabilities: 'Capabilities', orbitlab: 'OrbitLab', contact: 'Contact',
};
const panelFromHash = (): Panel | null => {
  const key = window.location.hash.slice(1);
  return Object.hasOwn(titles, key) ? key as Panel : null;
};

type Props = { projects: ReactNode; experience: ReactNode; capabilities: ReactNode; orbit: ReactNode; contact: ReactNode };

export default function DeskHome({ projects, experience, capabilities, orbit, contact }: Props) {
  const [active, setActive] = useState<Panel | null>(panelFromHash);
  const [paused, setPaused] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const animations = useRef<Animation[]>([]);
  const closing = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animations.current.forEach(animation => { animation.playbackRate = -1.3; animation.play(); });
      await Promise.all(animations.current.map(animation => animation.finished.catch(() => undefined)));
    }
    setActive(null);
    closing.current = false;
  }, []);

  useEffect(() => {
    const sync = () => { const next = panelFromHash(); if (next) setActive(next); else void close(); };
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [close]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active) {
      const previousOverflow = document.body.style.overflow;
      dialog.showModal();
      const box = screenRef.current?.getBoundingClientRect();
      const scene = sceneRef.current;
      if (box && scene && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const from = `translate(${box.left}px, ${box.top}px) scale(${box.width / width}, ${box.height / height})`;
        const sceneBox = scene.getBoundingClientRect();
        const scale = Math.max(width / box.width, height / box.height);
        const x = width / 2 - (box.left + box.width / 2);
        const y = height / 2 - (box.top + box.height / 2);
        scene.style.transformOrigin = `${box.left + box.width / 2 - sceneBox.left}px ${box.top + box.height / 2 - sceneBox.top}px`;
        const timing = { duration: 850, easing: 'cubic-bezier(.22,.8,.25,1)', fill: 'both' as const };
        animations.current = [
          scene.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${x}px, ${y}px) scale(${scale})` }], timing),
          dialog.animate([{ transform: from, opacity: 0 }, { opacity: 0, offset: .2 }, { transform: 'none', opacity: 1 }], timing),
        ];
      }
      dialog.scrollTop = 0;
      closeRef.current?.focus();
      document.body.style.overflow = 'hidden';
      return () => { animations.current.forEach(animation => animation.cancel()); animations.current = []; document.body.style.overflow = previousOverflow; dialog.close(); closing.current = false; };
    }
    triggerRef.current?.focus();
  }, [active]);

  const open = (panel: Panel) => {
    triggerRef.current = document.activeElement as HTMLElement;
    window.history.pushState(null, '', `#${panel}`);
    setActive(panel);
  };
  const panels: Record<Panel, ReactNode> = { work: projects, experience, capabilities, orbitlab: orbit, contact };

  return (
    <div className="desk-home" data-panel-open={Boolean(active)}>
      <header className="desk-nav">
        <a className="desk-name" href="/">Nicholas Perez</a>
        <nav aria-label="Homepage sections">
          <button onClick={() => open('work')}>Projects</button>
          <button onClick={() => open('experience')}>Experience</button>
          <a href="/NicholasPerezResume.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={14} aria-hidden="true" /></a>
          <button onClick={() => open('contact')}>Contact</button>
          <ThemeToggle />
        </nav>
      </header>
      <section className="poster-hero desk-scene" aria-labelledby="desk-title">
        <div className="desk-stage" ref={sceneRef}>
        <img className="desk-photo" src="/media/desk-scene.webp" width="1536" height="1024" alt="A photographic desk scene with a monitor, home-lab computer, open notebook, brass orbital model, and orange envelope beside a sunlit window." fetchPriority="high" />
        <DeskActivity paused={paused || Boolean(active)} />
        <div className="desk-screen-anchor" ref={screenRef} />
        </div>
        <div className="desk-intro">
          <h1 id="desk-title">Hi, I’m Nick.</h1>
          <p>IT systems engineer. Curious builder.</p>
          <span>Sacramento, California</span>
        </div>
        <div className="desk-objects" aria-label="Explore the desk">
          <button className="desk-object desk-monitor" onClick={() => open('work')}><span>Projects <ArrowUpRight size={16} aria-hidden="true" /></span></button>
          <button className="desk-object desk-notebook" onClick={() => open('experience')}><span>Experience <ArrowUpRight size={16} aria-hidden="true" /></span></button>
          <button className="desk-object desk-orbit" onClick={() => open('orbitlab')}><span>OrbitLab <ArrowUpRight size={16} aria-hidden="true" /></span></button>
          <button className="desk-object desk-envelope" onClick={() => open('contact')}><span>Email me <ArrowUpRight size={16} aria-hidden="true" /></span></button>
        </div>
        <p className="desk-hint">Explore the desk, or use the navigation.</p>
        <button className="desk-motion-toggle" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Resume desk motion' : 'Pause desk motion'}</button>
      </section>
      <dialog className="desk-dialog" ref={dialogRef} aria-labelledby="desk-panel-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
        <header className="desk-panel-bar"><span id="desk-panel-title">{active ? titles[active] : 'Explore'}</span><button ref={closeRef} onClick={close} aria-label="Close panel and return to desk"><X size={20} aria-hidden="true" /><span>Back to desk</span></button></header>
        {active && panels[active]}
      </dialog>
    </div>
  );
}
