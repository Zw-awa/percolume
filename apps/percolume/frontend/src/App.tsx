import { useEffect, useMemo, useState } from "react";
import type { AppState, Cell } from "./types";
import { defaultState } from "./lib/defaultState";
import { loadState, saveState } from "./lib/storage";
import {
  breakthrough,
  decayCells,
  randomProgressCells,
  reshuffleCells,
} from "./lib/grid";
import {
  closeWindow,
  minimizeWindow,
  setAlwaysOnTop,
  setClickThrough,
  startDragging,
  watchSelectiveClickThrough,
} from "./lib/window";

const dateKey = (date = new Date()) => date.toISOString().slice(0, 10);
const compactGridSize = 18;

export default function App() {
  const [state, setState] = useState<AppState>(defaultState);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selected, setSelected] = useState<Cell | null>(null);
  const [detailNote, setDetailNote] = useState("");
  const [entryNote, setEntryNote] = useState("");

  useEffect(() => {
    loadState().then((loaded) => {
      const size = Math.min(compactGridSize, loaded.size);
      setState({
        ...loaded,
        size,
        cells: loaded.cells.filter((cell) => cell.index < size * size),
      });
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) void saveState(state);
  }, [ready, state]);

  useEffect(() => {
    if (ready) void setAlwaysOnTop(state.window.alwaysOnTop);
  }, [ready, state.window.alwaysOnTop]);

  useEffect(() => {
    if (!ready || !state.window.clickThrough) {
      void setClickThrough(false);
      return;
    }

    return watchSelectiveClickThrough();
  }, [ready, state.window.clickThrough]);

  const total = state.size * state.size;
  const path = useMemo(
    () => new Set(breakthrough(state.size, state.cells)),
    [state.size, state.cells],
  );

  const addProgress = () => {
    if (state.cells.length >= total) return;

    const at = new Date().toISOString();
    const cells = randomProgressCells(
      state.size,
      state.cells,
      Math.min(state.settings.cellsPerEntry, total - state.cells.length),
      (index) => ({
        index,
        litAt: at,
        note: entryNote.trim(),
        pending: state.settings.delayedLighting,
      }),
    );
    const today = dateKey();
    const day = state.days[today] ?? { count: 0, amount: 0, entries: [] };

    const nextCells = state.settings.decay
      ? decayCells(
          [...state.cells, ...cells],
          new Date(at),
          state.settings.decayThreshold,
        )
      : [...state.cells, ...cells];

    setState({
      ...state,
      cells: nextCells,
      days: {
        ...state.days,
        [today]: {
          count: day.count + 1,
          amount: day.amount + 1,
          entries: [...day.entries, { at, note: entryNote.trim(), amount: 1 }],
        },
      },
    });
    setEntryNote("");
  };

  const patchSettings = (patch: Partial<AppState["settings"]>) => {
    setState({ ...state, settings: { ...state.settings, ...patch } });
  };

  const patchWindow = async (patch: Partial<AppState["window"]>) => {
    setState({ ...state, window: { ...state.window, ...patch } });

    if (typeof patch.alwaysOnTop === "boolean") {
      await setAlwaysOnTop(patch.alwaysOnTop);
    }
    if (typeof patch.clickThrough === "boolean") {
      await setClickThrough(patch.clickThrough);
    }
  };

  if (!ready) return <main className="loading" aria-label="正在加载" />;

  return (
    <div className="shell">
      <header
        className="island-toolbar"
        data-tauri-drag-region
        onPointerDown={(event) => {
          const target = event.target as HTMLElement;
          if (
            event.button === 0 &&
            !target.closest("button, input, select, textarea")
          ) {
            void startDragging();
          }
        }}
      >
        <span className="toolbar-spacer" data-tauri-drag-region />
        <div className="window-actions">
          <button
            className="window-button"
            onClick={() => void minimizeWindow()}
            aria-label="最小化"
            title="最小化"
          >
            <span aria-hidden="true">−</span>
          </button>
          <button
            className="window-button"
            onClick={() => setSettingsOpen(true)}
            aria-label="设置"
            title="设置"
          >
            <span aria-hidden="true">⚙</span>
          </button>
          <button
            className="window-button window-button-close"
            onClick={() => void closeWindow()}
            aria-label="关闭"
            title="关闭"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </header>

      <main className="island-main">
        <div
          className="contribution-grid"
          aria-label="贡献格子"
        >
          {Array.from({ length: total }, (_, index) => {
            const cell = state.cells.find((item) => item.index === index);

            return (
              <button
                key={index}
                className={`contribution-cell ${cell && !cell.pending ? "on" : ""} ${cell?.pending ? "pending" : ""} ${path.has(index) ? "path" : ""}`}
                onClick={() => {
                  if (
                    !cell ||
                    cell.pending ||
                    !state.settings.showCellDetails
                  ) {
                    return;
                  }

                  setSelected(cell);
                  setDetailNote(cell.note);
                }}
                aria-label={cell ? "查看贡献记录" : "未点亮格子"}
              />
            );
          })}
        </div>
      </main>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <article
            className="detail"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setSelected(null)}
              aria-label="关闭记录"
            >
              ×
            </button>
            <textarea
              value={detailNote}
              onChange={(event) => setDetailNote(event.target.value)}
              placeholder="为这次贡献留下备注"
              aria-label="贡献备注"
            />
            <button
              className="primary"
              onClick={() => {
                setState({
                  ...state,
                  cells: state.cells.map((cell) =>
                    cell.index === selected.index
                      ? { ...cell, note: detailNote.trim() }
                      : cell,
                  ),
                });
                setSelected(null);
              }}
            >
              保存备注
            </button>
          </article>
        </div>
      )}

      {settingsOpen && (
        <aside className="settings-panel" aria-label="设置">
          <button
            className="close"
            onClick={() => setSettingsOpen(false)}
            aria-label="关闭设置"
          >
            ×
          </button>
          <h2>设置</h2>

          <label>
            目标名称
            <input
              value={state.goal}
              onChange={(event) =>
                setState({ ...state, goal: event.target.value })
              }
            />
          </label>

          <label>
            本次备注
            <input
              value={entryNote}
              maxLength={120}
              onChange={(event) => setEntryNote(event.target.value)}
              placeholder="可选"
            />
          </label>

          <button
            className="primary"
            onClick={addProgress}
            disabled={state.cells.length >= total}
          >
            记录一次投入
          </button>

          <label>
            网格尺寸
            <input
              type="number"
              min="1"
              max={compactGridSize}
              value={state.size}
              onChange={(event) =>
                setState({
                  ...state,
                  size: Math.max(
                    1,
                    Math.min(compactGridSize, Number(event.target.value) || 1),
                  ),
                  cells: [],
                })
              }
            />
          </label>

          <label>
            每次点亮格数
            <input
              type="number"
              min="1"
              max="100"
              value={state.settings.cellsPerEntry}
              onChange={(event) =>
                patchSettings({
                  cellsPerEntry: Math.max(
                    1,
                    Math.min(100, Number(event.target.value) || 1),
                  ),
                })
              }
            />
          </label>

          <label>
            贡献颜色
            <input
              type="color"
              value={state.settings.color}
              onChange={(event) => patchSettings({ color: event.target.value })}
            />
          </label>

          <label>
            记录单位
            <select
              value={state.settings.unit}
              onChange={(event) =>
                patchSettings({
                  unit: event.target.value as "minutes" | "times",
                })
              }
            >
              <option value="times">次数</option>
              <option value="minutes">分钟</option>
            </select>
          </label>

          <label className="settings-check">
            <input
              type="checkbox"
              checked={state.settings.showCellDetails}
              onChange={(event) =>
                patchSettings({ showCellDetails: event.target.checked })
              }
            />
            显示格子备注
          </label>

          <label className="settings-check">
            <input
              type="checkbox"
              checked={state.settings.showNoteSummary}
              onChange={(event) =>
                patchSettings({ showNoteSummary: event.target.checked })
              }
            />
            显示备注摘要
          </label>

          <label className="settings-check">
            <input
              type="checkbox"
              checked={state.settings.delayedLighting}
              onChange={(event) =>
                patchSettings({ delayedLighting: event.target.checked })
              }
            />
            延迟到次日点亮
          </label>

          <label className="settings-check">
            <input
              type="checkbox"
              checked={state.settings.decay}
              onChange={(event) =>
                patchSettings({ decay: event.target.checked })
              }
            />
            启用随机衰减
          </label>

          <label>
            衰减周期
            <input
              type="number"
              min="1"
              max="365"
              value={state.settings.decayThreshold}
              onChange={(event) =>
                patchSettings({
                  decayThreshold: Math.max(
                    1,
                    Math.min(365, Number(event.target.value) || 1),
                  ),
                })
              }
            />
          </label>

          <label className="settings-check">
            <input
              type="checkbox"
              checked={state.window.alwaysOnTop}
              onChange={(event) =>
                void patchWindow({ alwaysOnTop: event.target.checked })
              }
            />
            始终置顶
          </label>

          <label className="settings-check">
            <input
              type="checkbox"
              checked={state.window.clickThrough}
              onChange={(event) =>
                void patchWindow({ clickThrough: event.target.checked })
              }
            />
            透明区域穿透
          </label>

          <button
            className="secondary"
            onClick={() =>
              setState({
                ...state,
                cells: reshuffleCells(state.size, state.cells),
              })
            }
          >
            重新洗牌
          </button>
        </aside>
      )}
    </div>
  );
}
