export type Point = { x: number; y: number };
export type Quad = [Point, Point, Point, Point];
// Inner LCD corners, measured in the original 1536 × 1024 photograph.
export const SCREEN: Quad = [{ x: 326, y: 253 }, { x: 878, y: 228 }, { x: 897, y: 536 }, { x: 350, y: 591 }];
export const DESKTOP = { width: 1000, height: 620 };
export const BROWSER = { x: 28, y: 42, width: 944, height: 520 };

export function projection(quad: Quad) {
  const [p0, p1, p2, p3] = quad;
  const dx1 = p1.x - p2.x, dx2 = p3.x - p2.x, dx3 = p0.x - p1.x + p2.x - p3.x;
  const dy1 = p1.y - p2.y, dy2 = p3.y - p2.y, dy3 = p0.y - p1.y + p2.y - p3.y;
  const denominator = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / denominator;
  const h = (dx1 * dy3 - dx3 * dy1) / denominator;
  return { a: p1.x - p0.x + g * p1.x, b: p3.x - p0.x + h * p3.x, c: p0.x,
    d: p1.y - p0.y + g * p1.y, e: p3.y - p0.y + h * p3.y, f: p0.y, g, h };
}
export function projectPoint(x: number, y: number, quad: Quad = SCREEN): Point {
  const m = projection(quad), u = x / DESKTOP.width, v = y / DESKTOP.height;
  const w = m.g * u + m.h * v + 1;
  return { x: (m.a * u + m.b * v + m.c) / w, y: (m.d * u + m.e * v + m.f) / w };
}
export function perspectiveMatrix(quad: Quad, width: number, height: number) {
  const m = projection(quad);
  return `matrix3d(${m.a / width},${m.d / width},0,${m.g / width},${m.b / height},${m.e / height},0,${m.h / height},0,0,1,0,${m.c},${m.f},0,1)`;
}
export function browserQuad(box: { left: number; top: number; width: number }): Quad {
  const b = BROWSER;
  return [[b.x, b.y], [b.x + b.width, b.y], [b.x + b.width, b.y + b.height], [b.x, b.y + b.height]].map(([x, y]) => {
    const p = projectPoint(x, y); return { x: box.left + p.x * box.width / 1536, y: box.top + p.y * box.width / 1536 };
  }) as Quad;
}
