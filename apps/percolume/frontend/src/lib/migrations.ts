import type { AppState, Settings } from '../types';
import { defaultState } from './defaultState';

export function migrateState(input: unknown): AppState {
  const fallback = defaultState();
  if (!input || typeof input !== 'object') return fallback;
  const raw = input as Partial<AppState> & { settings?: Partial<Settings> };
  const size = Number.isInteger(raw.size) ? Math.max(1, Math.min(100, raw.size as number)) : fallback.size;
  const storedSettings: Partial<Settings> = raw.settings ?? {};
  const settings: Settings = {
    ...fallback.settings,
    ...storedSettings,
    unit: storedSettings.unit === 'minutes' ? 'minutes' : 'times',
    cellsPerEntry: Number.isInteger(storedSettings.cellsPerEntry) ? Math.max(1, Math.min(100, storedSettings.cellsPerEntry as number)) : fallback.settings.cellsPerEntry,
    decayThreshold: Number.isInteger(storedSettings.decayThreshold) ? Math.max(1, Math.min(365, storedSettings.decayThreshold as number)) : fallback.settings.decayThreshold,
  };
  const cells = Array.isArray(raw.cells) ? raw.cells.filter(c => c && Number.isInteger(c.index) && c.index >= 0 && c.index < size * size).map(c => ({ ...c, note: typeof c.note === 'string' ? c.note : '', litAt: typeof c.litAt === 'string' ? c.litAt : new Date().toISOString() })) : [];
  const days = raw.days && typeof raw.days === 'object' ? Object.fromEntries(Object.entries(raw.days).map(([key, value]) => {
    const day = value as Partial<AppState['days'][string]>;
    const entries = Array.isArray(day.entries) ? day.entries.map(entry => ({ ...entry, amount: Number.isFinite(entry.amount) && entry.amount > 0 ? entry.amount : 1 })) : [];
    const amount = Number.isFinite(day.amount) && day.amount! >= 0 ? day.amount! : Math.max(Number(day.count) || 0, entries.reduce((sum, entry) => sum + entry.amount, 0));
    return [key, { count: Number.isFinite(day.count) ? Math.max(0, day.count!) : entries.length, amount, entries }];
  })) : {};
  return { ...fallback, ...raw, version: 2, size, goal: typeof raw.goal === 'string' && raw.goal.trim() ? raw.goal : fallback.goal, cells, settings, days };
}
