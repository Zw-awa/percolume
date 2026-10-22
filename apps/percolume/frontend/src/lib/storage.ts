import { Store } from '@tauri-apps/plugin-store';
import type { AppState } from '../types';
import { defaultState } from './defaultState';
import { migrateState } from './migrations';

const key = 'percolume-state';
let storePromise: Promise<Store | null> | undefined;
const getStore = () => { storePromise ??= Store.load('percolume.json').catch(() => null); return storePromise; };
export async function loadState(): Promise<AppState> { const store = await getStore(); if (!store) { try { return migrateState(JSON.parse(localStorage.getItem(key) ?? '')); } catch { return defaultState(); } } return migrateState((await store.get<AppState>(key)) ?? defaultState()); }
export async function saveState(state: AppState) { const store = await getStore(); if (!store) { try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* storage may be unavailable in restricted webviews */ } return; } try { await store.set(key, state); await store.save(); } catch { try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* keep the in-memory state usable */ } } }
