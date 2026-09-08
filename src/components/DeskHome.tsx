import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => setActive(panelFromHash());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active) {
      const previousOverflow = document.body.style.overflow;
      dialog.showModal();
      dialog.scrollTop = 0;
      closeRef.current?.focus();
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = previousOverflow; dialog.close(); };
    }
    triggerRef.current?.focus();
  }, [active]);

  const open = (panel: Panel) => {
    triggerRef.current = document.activeElement as HTMLElement;
    window.history.pushState(null, '', `#${panel}`);
    setActive(panel);
  };
  const close = () => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setActive(null);
  };
  const panels: Record<Panel, ReactNode> = { work: projects, experience, capabilities, orbitlab: orbit, contact };

  return (
    <div className="desk-home">
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
        <img className="desk-photo" src="/media/desk-scene.webp" width="1536" height="1024" alt="A photographic desk scene with a monitor, home-lab computer, open notebook, brass orbital model, and orange envelope beside a sunlit window." fetchPriority="high" />
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
      </section>
      <dialog className="desk-dialog" ref={dialogRef} aria-labelledby="desk-panel-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
        <header className="desk-panel-bar"><span id="desk-panel-title">{active ? titles[active] : 'Explore'}</span><button ref={closeRef} onClick={close} aria-label="Close panel and return to desk"><X size={20} aria-hidden="true" /><span>Back to desk</span></button></header>
        {active && panels[active]}
      </dialog>
    </div>
  );
}
