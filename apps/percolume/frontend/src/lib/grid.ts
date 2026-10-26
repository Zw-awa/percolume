import type { Cell } from '../types';
export const randomEmptyIndex = (size: number, cells: Cell[]) => { const used = new Set(cells.map(c => c.index)); const free = Array.from({ length: size * size }, (_, i) => i).filter(i => !used.has(i)); return free.length ? free[Math.floor(Math.random() * free.length)] : null; };
export function randomProgressCells(size: number, cells: Cell[], count: number, create: (index: number) => Cell): Cell[] {
  const used = new Set(cells.map(cell => cell.index));
  const free = Array.from({ length: size * size }, (_, index) => index).filter(index => !used.has(index));
  const amount = Math.max(0, Math.min(Math.floor(count), free.length));
  for (let i = free.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [free[i], free[j]] = [free[j], free[i]]; }
  return free.slice(0, amount).map(create);
}
export function breakthrough(size: number, cells: Cell[]): number[] {
  if (!Number.isInteger(size) || size < 1) return [];
  const limit = size * size;
  const lit = new Set(cells.filter(cell => !cell.pending && Number.isInteger(cell.index) && cell.index >= 0 && cell.index < limit).map(cell => cell.index));
  const queue = [...lit].filter(index => index < size);
  const parent = new Map<number, number | null>(queue.map(index => [index, null]));
  for (let head = 0; head < queue.length; head++) {
    const current = queue[head];
    if (current >= size * (size - 1)) {
      const path: number[] = [];
      let cursor: number | null = current;
      while (cursor !== null) { path.push(cursor); cursor = parent.get(cursor) ?? null; }
      return path.reverse();
    }
    const row = Math.floor(current / size), col = current % size;
    const neighbors = [current - size, current + size, col ? current - 1 : -1, col < size - 1 ? current + 1 : -1];
    for (const next of neighbors) {
      if (next >= 0 && next < limit && Math.abs(Math.floor(next / size) - row) + Math.abs(next % size - col) === 1 && lit.has(next) && !parent.has(next)) {
        parent.set(next, current);
        queue.push(next);
      }
    }
  }
  return [];
}
