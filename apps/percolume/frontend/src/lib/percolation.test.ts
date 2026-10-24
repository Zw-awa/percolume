import { describe, expect, it } from 'vitest';
import { breakthrough, randomProgressCells } from './grid';
const cells = (indexes: number[]) => indexes.map(index => ({ index, litAt: '', note: '' }));
describe('breakthrough', () => { it('finds a straight path', () => expect(breakthrough(3, cells([0, 3, 6]))).toEqual([6, 3, 0])); it('rejects diagonals', () => expect(breakthrough(2, cells([0, 3]))).toEqual([])); it('finds turns', () => expect(breakthrough(3, cells([0, 1, 4, 7]))).toEqual([7, 4, 1])); });
describe('randomProgressCells', () => {
  it('creates unique in-bounds cells and caps at free capacity', () => {
    const result = randomProgressCells(2, cells([0]), 10, index => ({ index, litAt: 'now', note: '' }));
    expect(result).toHaveLength(3);
    expect(new Set(result.map(cell => cell.index)).size).toBe(3);
    expect(result.every(cell => cell.index > 0 && cell.index < 4)).toBe(true);
  });
});
