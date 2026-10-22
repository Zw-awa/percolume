import { describe, expect, it } from 'vitest';
import { defaultState } from './defaultState';
import { migrateState } from './migrations';

describe('migrateState', () => {
  it('returns safe defaults for malformed data', () => expect(migrateState(null)).toEqual(defaultState()));
  it('clamps dimensions and fills new settings', () => {
    const state = migrateState({ version: 1, goal: 'Goal', size: 1000, cells: [{ index: 10000 }, { index: 0, note: 'ok' }] });
    expect(state.version).toBe(2);
    expect(state.size).toBe(100);
    expect(state.cells).toHaveLength(1);
    expect(state.settings.showNoteSummary).toBe(true);
  });
});
