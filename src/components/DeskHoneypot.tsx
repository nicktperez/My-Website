import { useEffect, useRef } from 'react';
import { perspectiveMatrix, type Quad } from './deskGeometry';

const SCREEN: Quad = [{ x: 746, y: 319 }, { x: 1059, y: 313 }, { x: 1060, y: 500 }, { x: 749, y: 516 }];
// Synthetic documentation-range addresses; no network connections or captured credentials.
const EVENTS = [
  ['session.connect', '198.51.100.24 → ssh', '#a9cbdc'],
  ['login.failed', 'root · authentication rejected', '#e4b38b'],
  ['login.failed', 'admin · authentication rejected', '#e4b38b'],
  ['session.connect', '203.0.113.18 → ssh', '#a9cbdc'],
  ['login.success', 'root · decoy shell opened', '#a8c89e'],
  ['command.input', 'uname -a', '#dce5ee'],
  ['command.input', 'cat /etc/os-release', '#dce5ee'],
  ['session.closed', 'session recorded → Elastic', '#a8c89e'],
];

export default function DeskHoneypot({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const clock = useRef(0);
  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !parent || !ctx) return;
    const resolution = Math.min(devicePixelRatio || 1, 3) * 2;
    canvas.width = 1000 * resolution; canvas.height = 620 * resolution;
    ctx.setTransform(resolution, 0, 0, resolution, 0, 0);
    const resize = () => {
      const scale = parent.clientWidth / 1536;
      canvas.style.transform = perspectiveMatrix(SCREEN.map(p => ({ x: p.x * scale, y: p.y * scale })) as Quad, 1000, 620);
    };
    resize();
    const observer = new ResizeObserver(resize); observer.observe(parent);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, previous = performance.now(), lastStep = -1;
    const text = (value: string, x: number, y: number, size: number, color: string) => {
      ctx.font = `${size}px monospace`; ctx.fillStyle = color; ctx.fillText(value, x, y);
    };
    const draw = (now: number) => {
      if (!paused && !reduced.matches && !document.hidden) clock.current += Math.min(now - previous, 50);
      previous = now;
      const step = Math.floor(clock.current / 2400);
      if (step !== lastStep) {
        lastStep = step;
        ctx.fillStyle = '#101b26'; ctx.fillRect(0, 0, 1000, 620);
        ctx.fillStyle = '#27333f'; ctx.fillRect(0, 0, 1000, 49);
        text('● ● ●', 25, 32, 20, '#b9c5ce');
        text('nick@workbench — display 02', 270, 32, 21, '#d9e2e9');
        text('Cowrie / SSH honeypot', 38, 100, 34, '#e4edf4');
        text('raspberry-pi  ·  session feed', 38, 143, 25, '#a5b9c9');
        const end = step + 3;
        for (let row = 0; row < 4; row++) {
          const index = end - 3 + row;
          const event = EVENTS[index % EVENTS.length];
          const seconds = String((index * 2) % 60).padStart(2, '0');
          text(`09:41:${seconds}  ${event[0]}`, 38, 206 + row * 82, 27, event[2]);
          text(event[1], 38, 240 + row * 82, 25, '#c0ceda');
        }
        ctx.fillStyle = '#20313e'; ctx.fillRect(0, 555, 1000, 65);
        text('● collecting → Elastic   /   simulated', 30, 596, 24, '#b4d3b0');
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [paused]);
  return <canvas className="desk-screen" ref={ref} aria-hidden="true" />;
}
