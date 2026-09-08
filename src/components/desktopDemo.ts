// Runnable Python, authored for this desktop vignette; not scraped answer text.
export const DEMO_CODE = `from math import hypot

DT = 0.002
x, y = 1.0, 0.0
vx, vy = 0.0, 1.0

def acceleration(x, y):
    r = hypot(x, y)
    return -x / r**3, -y / r**3

for step in range(10_000):
    ax, ay = acceleration(x, y)
    x += vx * DT + 0.5 * ax * DT**2
    y += vy * DT + 0.5 * ay * DT**2
    bx, by = acceleration(x, y)
    vx += 0.5 * (ax + bx) * DT
    vy += 0.5 * (ay + by) * DT

energy = (vx*vx + vy*vy) / 2 - 1 / hypot(x, y)
print(f"Energy: {energy:.8f}")
assert abs(energy + 0.5) < 1e-6
print("Orbit check passed")`;
export const RESEARCH_URL = 'https://stackoverflow.com/questions/34651818/velocity-verlet-algorithm-not-conserving-energy';
