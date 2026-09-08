import { describe, expect, it } from 'vitest';
import { DESKTOP, SCREEN, perspectiveMatrix, projectPoint } from './deskGeometry';

describe('photographed monitor projection', () => {
  it('fits all four LCD corners without affine skew or drift', () => {
    const corners = [[0, 0], [DESKTOP.width, 0], [DESKTOP.width, DESKTOP.height], [0, DESKTOP.height]];
    corners.forEach(([x, y], i) => {
      const point = projectPoint(x, y);
      expect(point.x).toBeCloseTo(SCREEN[i].x, 8);
      expect(point.y).toBeCloseTo(SCREEN[i].y, 8);
    });
  });
  it('exports CSS homogeneous coordinates matching the corner projection', () => {
    const values = perspectiveMatrix(SCREEN, DESKTOP.width, DESKTOP.height).slice(9, -1).split(',').map(Number);
    const x = 615, y = 310;
    const w = values[3] * x + values[7] * y + values[15];
    const point = projectPoint(x, y);
    expect((values[0] * x + values[4] * y + values[12]) / w).toBeCloseTo(point.x, 8);
    expect((values[1] * x + values[5] * y + values[13]) / w).toBeCloseTo(point.y, 8);
  });
});
