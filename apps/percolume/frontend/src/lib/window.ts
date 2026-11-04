import { getCurrentWindow } from "@tauri-apps/api/window";

export const isTauri = () =>
  typeof window !== "undefined" &&
  Boolean(
    (window as Window & { __TAURI_INTERNALS__?: unknown }).__TAURI_INTERNALS__,
  );

const current = () => {
  if (!isTauri()) return null;
  try {
    return getCurrentWindow();
  } catch {
    return null;
  }
};

export async function minimizeWindow() {
  await current()?.minimize();
}
export async function closeWindow() {
  await current()?.close();
}
export async function setAlwaysOnTop(value: boolean) {
  await current()?.setAlwaysOnTop(value);
}
export async function setClickThrough(value: boolean) {
  await current()?.setIgnoreCursorEvents(value);
}
