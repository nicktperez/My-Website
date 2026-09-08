import { useEffect, useRef } from 'react';

type Props = { paused: boolean };

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
