import type { AppState } from '../types';
export const defaultState = (): AppState => ({ version: 2, goal: '读完《置身事内》', size: 10, cells: [], days: {}, settings: { color: '#31b872', unit: 'times', showCellDetails: true, showNoteSummary: true, delayedLighting: false, decay: false }, streak: 0 });
