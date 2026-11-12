import { cursorPosition, getCurrentWindow } from "@tauri-apps/api/window";

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

export async function startDragging() {
  await current()?.startDragging();
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

export function watchSelectiveClickThrough() {
  const appWindow = current();
  if (!appWindow) return () => {};

  let lastIgnoreState: boolean | undefined;
  let checking = false;

  const updateHitTest = async () => {
    if (checking) return;
    checking = true;

    try {
      const [cursor, origin, scaleFactor, size] = await Promise.all([
        cursorPosition(),
        appWindow.innerPosition(),
        appWindow.scaleFactor(),
        appWindow.innerSize(),
      ]);
      const x = (cursor.x - origin.x) / scaleFactor;
      const y = (cursor.y - origin.y) / scaleFactor;
      const viewportWidth = size.width / scaleFactor;
      const onScrollbar = x >= viewportWidth - 16;
      const target = document.elementFromPoint(x, y);
      const onInteractiveTarget = Boolean(
        target?.closest(
          "button, input, select, textarea, [data-tauri-drag-region], [data-click-through-hit]",
        ),
      );
      const shouldIgnore = !onScrollbar && !onInteractiveTarget;

      if (shouldIgnore !== lastIgnoreState) {
        await appWindow.setIgnoreCursorEvents(shouldIgnore);
        lastIgnoreState = shouldIgnore;
      }
    } catch {
      if (lastIgnoreState !== false) {
        await appWindow.setIgnoreCursorEvents(false).catch(() => {});
        lastIgnoreState = false;
      }
    } finally {
      checking = false;
    }
  };

  const timer = window.setInterval(() => void updateHitTest(), 30);
  void updateHitTest();

  return () => {
    window.clearInterval(timer);
    void appWindow.setIgnoreCursorEvents(false);
  };
}
