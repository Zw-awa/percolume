export type Cell = { index: number; litAt: string; note: string; pending?: boolean };
export type Contribution = { count: number; amount: number; entries: { at: string; note: string; amount: number }[] };
export type Settings = { color: string; unit: 'minutes' | 'times'; cellsPerEntry: number; decay: boolean; decayThreshold: number; showCellDetails: boolean; showNoteSummary: boolean; delayedLighting: boolean };
export type AppState = { version: number; goal: string; size: number; cells: Cell[]; days: Record<string, Contribution>; settings: Settings; streak: number };
