import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  closeWindow,
  isTauri,
  minimizeWindow,
  setAlwaysOnTop,
  setClickThrough,
} from "./window";

describe("desktop configuration", () => {
  it("keeps Vite and Tauri on the same fixed development port", () => {
    const config = JSON.parse(
      readFileSync(resolve(process.cwd(), "src-tauri/tauri.conf.json"), "utf8"),
    );
    const viteConfig = readFileSync(
      resolve(process.cwd(), "vite.config.ts"),
      "utf8",
    );

    expect(config.build.devUrl).toBe("http://localhost:5173");
    expect(viteConfig).toContain("port: 5173");
    expect(viteConfig).toContain("strictPort: true");
  });

  it("keeps the desktop window transparent, borderless, compact, and on top", () => {
    const config = JSON.parse(
      readFileSync(resolve(process.cwd(), "src-tauri/tauri.conf.json"), "utf8"),
    );
    const [windowConfig] = config.app.windows;

    expect(windowConfig).toMatchObject({
      width: 420,
      height: 560,
      decorations: false,
      transparent: true,
      alwaysOnTop: true,
      fullscreen: false,
    });
  });
});

describe("browser window fallbacks", () => {
  it("does not call Tauri APIs or throw in a browser preview", async () => {
    expect(isTauri()).toBe(false);
    await expect(minimizeWindow()).resolves.toBeUndefined();
    await expect(closeWindow()).resolves.toBeUndefined();
    await expect(setAlwaysOnTop(true)).resolves.toBeUndefined();
    await expect(setClickThrough(true)).resolves.toBeUndefined();
  });
});
