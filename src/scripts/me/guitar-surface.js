// The original carved surface, with exactly the same samples and subdivision.
// Kept independent of Three.js so a worker needs no second rendering library.
const S = .00031;
const limit = (n, a, b) => Math.max(a, Math.min(b, n));

export function createBodySampler(edge) {
  const cache = new Map();
  return function sample(x, y) {
    const key = `${x.toFixed(7)},${y.toFixed(7)}`;
    if (cache.has(key)) return cache.get(key);
    let distanceSquared = Infinity, nx = 0, ny = 0, totalWeight = 0, meanX = 0, meanY = 0;
    for (let i = 0; i < edge.length - 1; i++) {
      const a = edge[i], b = edge[i + 1], dx = b.x - a.x, dy = b.y - a.y;
      const t = limit(((x - a.x) * dx + (y - a.y) * dy) / (dx * dx + dy * dy || 1), 0, 1);
      const ex = x - a.x - dx * t, ey = y - a.y - dy * t, d = ex * ex + ey * ey;
      const weight = 1 / (d + .000025) ** 2;
      totalWeight += weight;meanX += ex * weight;meanY += ey * weight;
      if (d < distanceSquared) {distanceSquared = d;const length = Math.hypot(dx, dy) || 1;nx = -dy / length;ny = dx / length;}
    }
    const distance = Math.sqrt(distanceSquared), t = limit(distance / .035, 0, 1);
    const slope = .012 * 6 * t * (1 - t) / .035;
    const normal = [-slope * meanX / totalWeight / (distance || 1), -slope * meanY / totalWeight / (distance || 1), 1];
    const inverseLength = 1 / Math.sqrt(normal[0] ** 2 + normal[1] ** 2 + 1);
    const padding = Math.max(0, .003 - distance) ** 2 / .003;
    const value = {z: .014 + .012 * t * t * (3 - 2 * t), normal: normal.map(n => n * inverseLength), u: ((x + nx * padding) / S + 540) / 1080, v: 1 - (1000 - (y + ny * padding) / S) / 1501};
    cache.set(key, value);return value;
  };
}

export async function buildGuitarSurface(points, edge, yieldTask = async () => {}) {
  const sample = createBodySampler(edge), positions = [], uvs = [];
  function surface(x, y) {
    const value = sample(x, y);positions.push(x, y, value.z);uvs.push(value.u, value.v);
  }
  function triangle(a, b, c, depth) {
    if (!depth) {surface(...a);surface(...b);surface(...c);return;}
    const mid = (u, v) => [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2];
    const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a);
    triangle(a, ab, ca, depth - 1);triangle(ab, b, bc, depth - 1);
    triangle(ca, bc, c, depth - 1);triangle(ab, bc, ca, depth - 1);
  }
  let lastYield = performance.now();
  for (let i = 0; i < points.length; i += 9) {
    triangle([points[i], points[i + 1]], [points[i + 3], points[i + 4]], [points[i + 6], points[i + 7]], 3);
    if (performance.now() - lastYield > 8) {await yieldTask();lastYield = performance.now();}
  }
  const vertices = [], texcoords = [], indices = [], normals = [], shared = new Map();
  for (let i = 0; i < positions.length; i += 3) {
    const key = positions.slice(i, i + 3).map(n => Math.round(n * 1e7)).join(',');
    if (!shared.has(key)) {
      shared.set(key, vertices.length / 3);vertices.push(...positions.slice(i, i + 3));
      texcoords.push(...uvs.slice(i / 3 * 2, i / 3 * 2 + 2));
      normals.push(...sample(positions[i], positions[i + 1]).normal);
    }
    indices.push(shared.get(key));
    if (i % 2048 === 0 && performance.now() - lastYield > 8) {await yieldTask();lastYield = performance.now();}
  }
  return {position: new Float32Array(vertices), normal: new Float32Array(normals), uv: new Float32Array(texcoords), index: new Uint16Array(indices)};
}
