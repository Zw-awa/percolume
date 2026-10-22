import { describe, expect, it } from 'vitest';
import { breakthrough } from './grid';
const cells = (indexes: number[]) => indexes.map(index => ({ index, litAt: '', note: '' }));
describe('breakthrough', () => { it('finds a straight path', () => expect(breakthrough(3, cells([0, 3, 6]))).toEqual([6, 3, 0])); it('rejects diagonals', () => expect(breakthrough(2, cells([0, 3]))).toEqual([])); it('finds turns', () => expect(breakthrough(3, cells([0, 1, 4, 7]))).toEqual([7, 4, 1])); });
