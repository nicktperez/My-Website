import { useEffect, useRef } from 'react';

type Props = { paused: boolean };
const searches = ['C++ orbital integrators', 'macOS endpoint event tracing', 'Raspberry Pi home lab', 'why is DNS always the problem'];

/** Decorative, local animation. No browser automation or external requests. */
export default function DeskActivity({ paused }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clock = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let elapsed = clock.current;
    let drawn = false;
    let previous = performance.now();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    function sphere(x: number, y: number, radius: number, color: string) {
      if (!ctx) return;
      const gradient = ctx.createRadialGradient(x - radius * .4, y - radius * .45, radius * .05, x, y, radius);
      gradient.addColorStop(0, '#f0dfba'); gradient.addColorStop(.32, color); gradient.addColorStop(1, '#242019');
      ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
    }
    function draw(now: number) {
      if (!ctx) return;
      const running = !paused && !motion.matches && !document.hidden;
      if (running) elapsed += Math.min(now - previous, 50);
      previous = now;
      if (!running && drawn) { frame = requestAnimationFrame(draw); return; }
      drawn = true;
      clock.current = elapsed;
      ctx.clearRect(0, 0, 1536, 1024);
      // Match the photographed display's four corners, keeping its bezel visible.
      ctx.save(); ctx.beginPath(); ctx.moveTo(325, 251); ctx.lineTo(879, 228); ctx.lineTo(897, 537); ctx.lineTo(349, 593); ctx.closePath(); ctx.clip();
      ctx.fillStyle = '#151d25'; ctx.fill();
      ctx.transform(.938, -.058, .074, 1.08, 325, 251);
      ctx.fillStyle = '#29333b'; ctx.fillRect(0, 0, 600, 22);
      ['#d87966', '#d6b568', '#8ca782'].forEach((color, i) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(12 + i * 14, 10, 4, 0, 7); ctx.fill(); });
      const scene = Math.floor(elapsed / 10000) % 3;
      const phase = elapsed % 10000;
      ctx.font = '12px monospace'; ctx.fillStyle = '#b8c2cc'; ctx.fillText(['Browser — notes & research', 'Editor — orbitlab.cpp', 'Terminal — home lab'][scene], 80, 14);
      if (scene === 0) {
        ctx.fillStyle = '#dbe3eb'; ctx.font = '25px sans-serif'; ctx.fillText('Google', 248, 82);
        ctx.fillStyle = '#303b46'; ctx.fillRect(65, 107, 465, 32);
        ctx.fillStyle = '#e3e6ea'; ctx.font = '14px monospace';
        const query = searches[Math.floor(elapsed / 30000) % searches.length];
        ctx.fillText(query.slice(0, Math.floor(phase / 85)), 80, 129);
        if (phase > 3500) {
          ['Documentation & examples', 'A closer look at the implementation', 'Notes from the workbench'].forEach((line, i) => {
            ctx.fillStyle = '#90bde4'; ctx.fillText(line, 70, 174 + i * 48);
            ctx.fillStyle = '#8a9ba7'; ctx.font = '11px monospace'; ctx.fillText('Read, experiment, build. Repeat.', 70, 192 + i * 48); ctx.font = '14px monospace';
          });
        }
      } else if (scene === 1) {
        ctx.fillStyle = '#1d2832'; ctx.fillRect(0, 22, 112, 310); ctx.fillStyle = '#9badbd'; ctx.font = '12px monospace';
        ['EXPLORER', 'src/', '  main.cpp', '  orbit.cpp', '  solver.cpp', 'tests/'].forEach((line, i) => ctx.fillText(line, 12, 49 + i * 23));
        const code = ['// One small experiment at a time.', '#include <vector>', '', 'void step(System& world, double dt) {', '  for (auto& body : world.bodies) {', '    auto force = gravity(body, world);', '    body.velocity += force * dt;', '    body.position += body.velocity * dt;', '  }', '}', '', '// Next: compare energy drift'];
        const typed = Math.floor(phase / 20); let remaining = typed;
        code.forEach((line, i) => { ctx.fillStyle = '#647889'; ctx.fillText(String(i + 1), 124, 50 + i * 21); ctx.fillStyle = line.startsWith('//') ? '#859d8b' : '#d1bf98'; ctx.fillText(line.slice(0, Math.max(0, remaining)), 150, 50 + i * 21); remaining -= line.length; });
      } else {
        ctx.font = '14px monospace';
        ['$ ssh workbench', 'Connected to home-lab.local', '$ ./run-checks', '✓ identity services online', '✓ event collector healthy', '✓ backups verified', '', '$ cmake --build build', '[100%] Built target orbitlab', 'All checks passed.'].slice(0, 1 + Math.floor(phase / 720)).forEach((line, i) => { ctx.fillStyle = line.startsWith('$') ? '#d8c49b' : '#91baa5'; ctx.fillText(line, 24, 52 + i * 24); });
      }
      const cursorX = 310 + Math.sin(elapsed / 2400) * 175;
      const cursorY = 160 + Math.sin(elapsed / 1750) * 90;
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#17222b'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(cursorX, cursorY); ctx.lineTo(cursorX + 3, cursorY + 18); ctx.lineTo(cursorX + 8, cursorY + 12); ctx.lineTo(cursorX + 15, cursorY + 11); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.restore();
      // Brass arms orbit around a fixed spindle; depth changes their overlap.
      const planets = [
        { radius: 52, size: 7, color: '#918676', speed: 1.1, offset: 0 },
        { radius: 87, size: 10, color: '#aa7242', speed: .75, offset: 2 },
        { radius: 131, size: 14, color: '#547e93', speed: .48, offset: 4 },
        { radius: 174, size: 8, color: '#a77b65', speed: .3, offset: 1 },
      ].map(p => { const angle = elapsed / 7000 * p.speed + p.offset; return { ...p, x: 1160 + Math.cos(angle) * p.radius, y: 540 + Math.sin(angle) * p.radius * .23 }; }).sort((a, b) => a.y - b.y);
      ctx.strokeStyle = '#a98a46'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(1160, 587); ctx.lineTo(1160, 462); ctx.stroke();
      planets.forEach(p => { ctx.strokeStyle = '#806633'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1160, 553); ctx.lineTo(p.x, p.y + 20); ctx.lineTo(p.x, p.y - 55); ctx.stroke(); ctx.strokeStyle = '#d6ba73'; ctx.lineWidth = 1; ctx.stroke(); sphere(p.x, p.y - 55, p.size, p.color); });
      sphere(1160, 459, 31, '#b6934c');
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [paused]);
  return <canvas ref={canvasRef} className="desk-activity" width={1536} height={1024} aria-hidden="true" />;
}
