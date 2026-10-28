import type { AppState } from '../types';
export const defaultState = (): AppState => ({ version: 2, goal: '读完《置身事内》', size: 10, cells: [], days: {}, settings: { color: '#31b872', unit: 'times', cellsPerEntry: 1, decay: false, decayThreshold: 30, showCellDetails: true, showNoteSummary: true, delayedLighting: false }, streak: 0 });
