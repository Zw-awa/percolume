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
  it('preserves legacy contribution days and derives their amount', () => {
    const state = migrateState({ version: 1, days: { '2026-10-20': { count: 3, entries: [{ at: '2026-10-20T12:00:00.000Z', note: 'read' }] } } });
    expect(state.days['2026-10-20']).toEqual({ count: 3, amount: 3, entries: [{ at: '2026-10-20T12:00:00.000Z', note: 'read', amount: 1 }] });
  });
  it('bounds new progress settings and fills defaults', () => {
    const state = migrateState({ settings: { cellsPerEntry: 0, decayThreshold: 9999, unit: 'invalid' } });
    expect(state.settings.cellsPerEntry).toBe(1);
    expect(state.settings.decayThreshold).toBe(365);
    expect(state.settings.unit).toBe('times');
  });
});
