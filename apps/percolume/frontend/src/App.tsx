import { useEffect, useMemo, useState } from "react";
import type { AppState, Cell } from "./types";
import { defaultState } from "./lib/defaultState";
import { loadState, saveState } from "./lib/storage";
import { breakthrough, randomProgressCells, reshuffleCells } from "./lib/grid";
import {
  closeWindow,
  isTauri,
  minimizeWindow,
  setAlwaysOnTop,
  setClickThrough,
} from "./lib/window";

const key = (d = new Date()) => d.toISOString().slice(0, 10);
export default function App() {
  const [state, setState] = useState<AppState>(defaultState);
  const [ready, setReady] = useState(false);
  const [amount, setAmount] = useState("1");
  const [note, setNote] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selected, setSelected] = useState<Cell | null>(null);
  const [detail, setDetail] = useState("");
  useEffect(() => {
    loadState().then((s) => {
      setState(s);
      setReady(true);
    });
  }, []);
  useEffect(() => {
    if (ready) void saveState(state);
  }, [state, ready]);
  useEffect(() => {
    if (ready) {
      void setAlwaysOnTop(state.window.alwaysOnTop);
      void setClickThrough(state.window.clickThrough);
    }
  }, [ready]);
  const total = state.size * state.size;
  const path = useMemo(
    () => new Set(breakthrough(state.size, state.cells)),
    [state.size, state.cells],
  );
  const lit = state.cells.filter((c) => !c.pending).length;
  const percent = Math.round((lit / total) * 100);
  const add = () => {
    const count = Math.min(
      total - state.cells.length,
      Math.max(1, Number(amount) || 1) * state.settings.cellsPerEntry,
    );
    if (!count) return;
    const at = new Date().toISOString();
    const cells = randomProgressCells(
      state.size,
      state.cells,
      count,
      (index) => ({
        index,
        litAt: at,
        note,
        pending: state.settings.delayedLighting,
      }),
    );
    const day = state.days[key()] ?? { count: 0, amount: 0, entries: [] };
    setState({
      ...state,
      cells: [...state.cells, ...cells],
      days: {
        ...state.days,
        [key()]: {
          count: day.count + 1,
          amount: day.amount + Number(amount),
          entries: [...day.entries, { at, note, amount: Number(amount) }],
        },
      },
    });
    setNote("");
  };
  const patchWindow = async (patch: Partial<AppState["window"]>) => {
    setState({ ...state, window: { ...state.window, ...patch } });
    if ("alwaysOnTop" in patch)
      await setAlwaysOnTop(Boolean(patch.alwaysOnTop));
    if ("clickThrough" in patch)
      await setClickThrough(Boolean(patch.clickThrough));
  };
  const patchSettings = (patch: Partial<AppState["settings"]>) =>
    setState({ ...state, settings: { ...state.settings, ...patch } });
  if (!ready) return <main className="loading">正在打开渗行…</main>;
  return (
    <div
      className={`shell ${state.window.clickThrough ? "is-click-through" : ""}`}
    >
      <header data-tauri-drag-region>
        <div className="brand" data-tauri-drag-region>
          <span className="mark">✦</span>PERCOLUME · 渗行
        </div>
        <div className="window-actions">
          <button
            className="icon-btn"
            onClick={() => setSettingsOpen(true)}
            aria-label="设置"
          >
            ⚙
          </button>
          <button
            className="icon-btn"
            onClick={() => void minimizeWindow()}
            aria-label="最小化"
          >
            −
          </button>
          <button
            className="icon-btn close-window"
            onClick={() => void closeWindow()}
            aria-label="关闭"
          >
            ×
          </button>
        </div>
      </header>
      <main>
        <section className="intro">
          <p className="kicker">A SMALL PRACTICE FOR BIG THINGS</p>
          <h1>
            把每一次微小的前进，<em>变成看得见的光。</em>
          </h1>
          <p className="sub">
            今天也为自己点亮一格。持续渗流，直到目标被彻底打通。
          </p>
        </section>
        <section className="card">
          <div className="card-head">
            <div>
              <span className="label">01 / DAILY RHYTHM</span>
              <h2>每日记录</h2>
            </div>
            <strong>{state.days[key()]?.amount ?? 0}</strong>
          </div>
          <div className="log-actions">
            <input
              className="amount-input"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="今天想留下什么？（可选）"
            />
            <button className="primary" onClick={add}>
              + 记录投入
            </button>
          </div>
        </section>
        <section className="card goal-card">
          <span className="label">02 / THE FLOW</span>
          <h2>{state.goal}</h2>
          <div className="flow-wrap">
            <div
              className="flow-grid"
              style={{ "--n": state.size } as React.CSSProperties}
            >
              {Array.from({ length: total }, (_, i) => {
                const cell = state.cells.find((c) => c.index === i);
                return (
                  <button
                    key={i}
                    className={`flow-cell ${cell && !cell.pending ? "on" : ""} ${path.has(i) ? "path" : ""}`}
                    onClick={() => {
                      if (cell) {
                        setSelected(cell);
                        setDetail(cell.note);
                      }
                    }}
                  />
                );
              })}
            </div>
            <div className="flow-side">
              <div className="percent">
                {percent}
                <small>%</small>
              </div>
              <p>
                已渗入 {lit} / {total} 格
              </p>
              <div className="bar">
                <i style={{ width: `${percent}%` }} />
              </div>
              <button
                className="secondary"
                onClick={() =>
                  setState({
                    ...state,
                    cells: reshuffleCells(state.size, state.cells),
                  })
                }
              >
                重新洗牌 ↻
              </button>
            </div>
          </div>
        </section>
        <footer>
          <span>LOCAL · PRIVATE · YOURS</span>
          <span>
            {state.window.clickThrough
              ? "点击穿透已开启"
              : isTauri()
                ? "桌面窗口 · 本地保存"
                : "浏览器预览"}
          </span>
        </footer>
      </main>
      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <article className="detail" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>
              ×
            </button>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
            <button
              className="primary"
              onClick={() => {
                setState({
                  ...state,
                  cells: state.cells.map((c) =>
                    c.index === selected.index ? { ...c, note: detail } : c,
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
        <aside className="settings-panel">
          <button className="close" onClick={() => setSettingsOpen(false)}>
            ×
          </button>
          <h2>设置</h2>
          <label>
            目标名称
            <input
              value={state.goal}
              onChange={(e) => setState({ ...state, goal: e.target.value })}
            />
          </label>
          <label>
            网格尺寸
            <input
              type="number"
              min="1"
              max="100"
              value={state.size}
              onChange={(e) =>
                setState({
                  ...state,
                  size: Math.max(1, Math.min(100, Number(e.target.value) || 1)),
                  cells: [],
                })
              }
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.window.alwaysOnTop}
              onChange={(e) =>
                void patchWindow({ alwaysOnTop: e.target.checked })
              }
            />{" "}
            始终置顶
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.window.clickThrough}
              onChange={(e) =>
                void patchWindow({ clickThrough: e.target.checked })
              }
            />{" "}
            点击穿透桌面
          </label>
          {state.window.clickThrough && (
            <p>点击穿透已开启，请从设置入口恢复交互。</p>
          )}
          <label>
            贡献颜色
            <input
              type="color"
              value={state.settings.color}
              onChange={(e) =>
                setState({
                  ...state,
                  settings: { ...state.settings, color: e.target.value },
                })
              }
            />
          </label>
        </aside>
      )}
    </div>
  );
}
