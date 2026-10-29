import { describe, expect, it } from 'vitest';
import { breakthrough, decayCells, randomProgressCells, reshuffleCells } from './grid';
const cells = (indexes: number[]) => indexes.map(index => ({ index, litAt: '', note: '' }));
describe('breakthrough', () => {
  it('finds a straight path from top to bottom', () => expect(breakthrough(3, cells([0, 3, 6]))).toEqual([0, 3, 6]));
  it('rejects diagonals', () => expect(breakthrough(2, cells([0, 3]))).toEqual([]));
  it('finds turns', () => expect(breakthrough(3, cells([0, 1, 4, 7]))).toEqual([1, 4, 7]));
  it('ignores delayed and out-of-grid cells', () => expect(breakthrough(2, [...cells([0]), { index: 2, litAt: '', note: '', pending: true }, ...cells([99])])).toEqual([]));
  it('handles a one-cell grid and invalid dimensions', () => {
    expect(breakthrough(1, cells([0]))).toEqual([0]);
    expect(breakthrough(0, cells([0]))).toEqual([]);
  });
});
describe('randomProgressCells', () => {
  it('creates unique in-bounds cells and caps at free capacity', () => {
    const result = randomProgressCells(2, cells([0]), 10, index => ({ index, litAt: 'now', note: '' }));
    expect(result).toHaveLength(3);
    expect(new Set(result.map(cell => cell.index)).size).toBe(3);
    expect(result.every(cell => cell.index > 0 && cell.index < 4)).toBe(true);
  });
});
describe('decayCells', () => {
  it('removes only the oldest settled cell past the configured age', () => {
    const now = new Date('2026-10-28T12:00:00.000Z');
    const input = [
      { index: 0, litAt: '2026-09-01T12:00:00.000Z', note: 'old' },
      { index: 1, litAt: '2026-10-20T12:00:00.000Z', note: 'new' },
      { index: 2, litAt: '2026-09-01T12:00:00.000Z', note: 'pending', pending: true },
    ];
    expect(decayCells(input, now, 30).map(cell => cell.index)).toEqual([1, 2]);
  });
});
describe('reshuffleCells', () => {
  it('keeps cell metadata while assigning unique positions', () => {
    const input = [
      { index: 0, litAt: 'a', note: 'first' },
      { index: 1, litAt: 'b', note: 'second', pending: true },
      { index: 2, litAt: 'c', note: 'third' },
    ];
    const result = reshuffleCells(2, input, () => 0.25);
    expect(result).toHaveLength(3);
    expect(new Set(result.map(cell => cell.index)).size).toBe(3);
    expect(result.every(cell => cell.index >= 0 && cell.index < 4)).toBe(true);
    expect(result.map(cell => cell.note)).toEqual(['first', 'second', 'third']);
    expect(input.map(cell => cell.index)).toEqual([0, 1, 2]);
  });
});
