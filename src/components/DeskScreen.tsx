import { useEffect, useRef } from 'react';
import { BROWSER, DESKTOP, SCREEN, perspectiveMatrix, type Quad } from './deskGeometry';
import { DEMO_CODE } from './desktopDemo';

type Props = { paused: boolean; panel: string | null };
const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

/** A self-contained macOS desktop vignette; all activity is simulated locally. */
export default function DeskScreen({ paused, panel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clock = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const resize = () => {
      const scale = parent.clientWidth / 1536;
      const quad = SCREEN.map(p => ({ x: p.x * scale, y: p.y * scale })) as Quad;
      canvas.style.transform = perspectiveMatrix(quad, DESKTOP.width, DESKTOP.height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, previous = performance.now(), lastDraw = -Infinity;
    const started = previous;
    let drawn = false;
    function rect(x: number, y: number, w: number, h: number, color: string, radius = 0) {
      if (!ctx) return;
      ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(x, y, w, h, radius); ctx.fill();
    }
    function text(value: string, x: number, y: number, size = 13, color = '#d5d9e1', weight = '400') {
      if (!ctx) return;
      ctx.fillStyle = color; ctx.font = `${weight} ${size}px ${FONT}`; ctx.fillText(value, x, y);
    }
    function lights(x: number, y: number) {
      if (!ctx) return;
      ['#ff6058', '#febc2e', '#28c840'].forEach((color, index) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x + index * 19, y, 6, 0, Math.PI * 2); ctx.fill(); });
    }
    function safari(title: string, address: string) {
      const { x, y, width, height } = BROWSER;
      rect(x, y, width, height, '#faf9f7', 10);
      rect(x, y, width, 49, '#e6e4e1', 10); rect(x, y + 37, width, 12, '#e6e4e1');
      lights(x + 19, y + 23); text('‹   ›', x + 89, y + 28, 23, '#686868');
      rect(x + 205, y + 10, 500, 29, '#f8f7f5', 6); text(address, x + 232, y + 30, 13, '#4d5156');
      text('↗    +', x + width - 77, y + 29, 20, '#666');
      text(title, x + 24, y + 86, 16, '#373c43', '600');
    }
    function editor(characters: number, terminal: boolean) {
      rect(20, 40, 960, 520, '#1e222b', 10); rect(20, 40, 960, 33, '#30343e', 10); lights(39, 56);
      text('orbit.py — workbench', 418, 61, 13, '#c4c9d2');
      rect(20, 74, 40, 465, '#252933'); rect(60, 74, 144, 465, '#20242d');
      ['▤', '⌕', '⑂', '▷'].forEach((icon, i) => text(icon, 33, 102 + i * 49, 21, i ? '#8691a4' : '#d7e4ef'));
      text('EXPLORER', 75, 95, 11, '#afb6c4'); text('⌄ WORKBENCH', 75, 126, 11);
      text('⌄ experiments', 83, 153, 12); rect(61, 163, 142, 25, '#333b4b'); text('  ◇ orbit.py', 85, 180, 12, '#d9c18e');
      text('  README.md', 85, 207, 12, '#a7b3c4'); text('  requirements.txt', 85, 235, 11, '#a7b3c4');
      rect(205, 74, 131, 29, '#282e39'); text('◇ orbit.py   ×', 222, 94, 12); text('experiments  ›  orbit.py', 220, 124, 11, '#8390a3');
      const shown = DEMO_CODE.slice(0, characters).split('\n');
      shown.forEach((line, index) => {
        const y = 149 + index * 15;
        if (terminal && y > 421) return;
        text(String(index + 1), 222, y, 11, '#69768b');
        ctx!.font = '12px monospace'; let x = 252;
        const tokens = line.match(/(#.*|"[^"]*"|\b(?:from|import|def|return|for|in|assert)\b|\b\d[\d_.]*\b|[^\w\s]|\s+|\w+)/g) ?? [];
        tokens.forEach(token => { ctx!.fillStyle = /^(from|import|def|return|for|in|assert)$/.test(token) ? '#c69ddd' : /^\d/.test(token) ? '#c8a67d' : token.startsWith('"') ? '#a8c58e' : '#c4d1e0'; ctx!.fillText(token, x, y); x += ctx!.measureText(token).width; });
        if (index === shown.length - 1 && characters < DEMO_CODE.length) rect(x + 1, y - 11, 1.5, 14, '#dbe6f3');
      });
      if (terminal) {
        rect(205, 432, 775, 105, '#191d25'); text('PROBLEMS     OUTPUT     TERMINAL', 222, 451, 10, '#a9b6c8');
        text('nick@workbench % python3 experiments/orbit.py', 222, 475, 12);
        text('Energy: -0.50000000', 222, 497, 12, '#a6c692'); text('Orbit check passed', 222, 519, 12, '#a6c692');
      }
      rect(20, 539, 960, 21, '#2d4359'); text('⑂ main     ✓ 0 errors', 34, 554, 11); text('Python 3     UTF-8     Spaces: 4', 742, 554, 11);
    }
    function draw(now: number) {
      const elapsed = now - previous; previous = now;
      const running = !paused && !motion.matches && !document.hidden;
      if (running) clock.current += Math.max(0, Math.min(elapsed, 50));
      const opening = panel && now - started < 480 && !motion.matches;
      if ((!running && !opening && drawn) || now - lastDraw < 32) { frame = requestAnimationFrame(draw); return; }
      drawn = true; lastDraw = now;
      ctx!.clearRect(0, 0, 1000, 620);
      // Soft Monterey-like mountain silhouettes and a translucent macOS menu/dock.
      const wallpaper = ctx!.createLinearGradient(0, 0, 1000, 620);
      wallpaper.addColorStop(0, '#263b60'); wallpaper.addColorStop(.5, '#805b86'); wallpaper.addColorStop(1, '#bd857d');
      ctx!.fillStyle = wallpaper; ctx!.fillRect(0, 0, 1000, 620);
      ctx!.fillStyle = '#263854'; ctx!.beginPath(); ctx!.moveTo(0, 500); ctx!.bezierCurveTo(270, 205, 400, 660, 1000, 285); ctx!.lineTo(1000, 620); ctx!.lineTo(0, 620); ctx!.fill();
      const time = clock.current % 34000;
      const researching = time >= 11000 && time < 19500;
      canvas!.dataset.scene = panel ? 'opening-browser' : researching ? 'research' : time > 28000 ? 'terminal' : 'editor';
      const app = panel || researching ? 'Safari' : 'Code';
      rect(0, 0, 1000, 25, '#e0dbe3'); text('●', 17, 18, 17, '#252734'); text(app, 45, 17, 12, '#222633', '700'); text('File   Edit   View   Go   Window   Help', 96, 17, 12, '#30303a'); text('Wi-Fi    100%     Mon 9:41 AM', 808, 17, 11, '#30303a');
      const chars = time < 11000 ? Math.min(380, Math.floor(165 + time / 24)) : time < 19500 ? 380 : Math.min(DEMO_CODE.length, 380 + Math.floor((time - 19500) / 18));
      editor(chars, time > 28000);
      if (researching) {
        safari('Stack Overflow', 'stackoverflow.com/questions/34651818');
        text('stack', 60, 174, 21, '#383f47'); text('overflow', 105, 174, 21, '#383f47', '700'); rect(60, 184, 870, 2, '#e6e3df');
        text('Velocity verlet algorithm not conserving energy', 61, 224, 24, '#262f38');
        text('A question to investigate while building the orbit experiment.', 62, 255, 15, '#5d6670');
        rect(61, 283, 862, 142, '#eef0f2', 5);
        text('LOCAL RESEARCH NOTES', 82, 310, 11, '#6d7883', '600');
        text('Check when the acceleration is evaluated.', 82, 345, 18, '#333b45');
        text('Use the new position before the second velocity update.', 82, 376, 16, '#4f5d69');
        text('Compare the total energy before and after the run.', 82, 403, 16, '#4f5d69');
        text('python   numerical-integration   orbit-experiment', 63, 461, 13, '#536b80');
        text('Research preview • return to orbit.py', 63, 506, 13, '#75818c');
      }
      rect(334, 573, 332, 41, '#c5c8d180', 11);
      ['#69b8df', '#cbe6f1', '#367db4', '#202631', '#dca46b', '#939ead'].forEach((color, index) => {
        rect(344 + index * 53, 580, 29, 28, color, 7); text(['☺', '◈', '〈〉', '>_', '▤', '⚙'][index], 349 + index * 53, 600, 16, index === 3 ? '#dfe7e7' : '#25334a');
      });
      if (panel) {
        const progress = motion.matches ? 1 : Math.min(1, (now - started) / 420);
        const ease = 1 - (1 - progress) ** 3;
        ctx!.save(); ctx!.translate(500, 590); ctx!.scale(.08 + .92 * ease, .08 + .92 * ease); ctx!.translate(-500, -590); ctx!.globalAlpha = ease;
        safari('Nicholas Perez', `nicholastperez.com/#${panel.toLowerCase()}`);
        text(panel, 68, 221, 38, '#222b33', '600');
        text('IT systems engineer. Curious builder.', 70, 260, 18, '#677078');
        rect(70, 300, 848, 1, '#dededb');
        text('Nicholas Perez', 70, 347, 18, '#36404a');
        text('Opening ' + panel.toLowerCase() + '…', 70, 381, 15, '#677078');
        ctx!.restore();
      } else {
        // Deliberate movement between editor, Safari dock icon, and the article.
        const points = researching ? [[411, 593], [461, 222], [560, 371], [464, 593]] : [[465, 593], [430, 232], [660, 410], [411, 593]];
        const phase = researching ? (time - 11000) / 8500 : (time < 11000 ? time / 11000 : (time - 19500) / 14500);
        const pos = Math.min(2.999, phase * 3), i = Math.floor(pos), t = (pos - i) ** 2 * (3 - 2 * (pos - i));
        const x = points[i][0] + (points[i + 1][0] - points[i][0]) * t, y = points[i][1] + (points[i + 1][1] - points[i][1]) * t;
        ctx!.fillStyle = '#fff'; ctx!.strokeStyle = '#20252e'; ctx!.lineWidth = 1.2; ctx!.beginPath(); ctx!.moveTo(x, y); ctx!.lineTo(x + 2, y + 18); ctx!.lineTo(x + 7, y + 13); ctx!.lineTo(x + 14, y + 11); ctx!.closePath(); ctx!.fill(); ctx!.stroke();
      }
      // Match the photographed display's restrained luminance.
      rect(0, 0, 1000, 620, '#16212c14');
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [paused, panel]);
  return <canvas ref={canvasRef} className="desk-screen" width={1000} height={620} aria-hidden="true" />;
}
