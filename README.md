# Percolume · 渗行

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md)

[![License](https://img.shields.io/badge/license-MIT-1976d2)](./LICENSE) ![Platform](https://img.shields.io/badge/platform-Windows-0078d4)

**Small efforts find a path.**

Percolume (渗行) is a quiet desktop widget for making small efforts visible. Record a little progress and a random pixel lights up in your goal grid. Over time, separate points can become a path from the top of the grid to the bottom.

## Features

- A daily contribution view for recording effort.
- A goal grid where each record lights one random cell.
- A tooltip showing the date and contribution count for each day.
- A visual grid that makes accumulated progress easy to scan.
- Local-first storage with no account required.
- A compact Windows desktop island with a transparent, borderless, always-on-top window.
- Draggable header, minimize and close controls, plus optional desktop click-through.
- Local progress records and window preferences saved on the device.

## Use Percolume

1. Press **Record today** to add one contribution and light one cell.
2. Use **Edit goal** to change the goal name or grid size.
3. Hover over a daily cell to see its date and contribution count.
4. Select a lit goal cell to inspect it, or use **Reshuffle** to clear the current grid arrangement.

The goal grid accepts sizes from 4x4 to 14x14 in the web prototype. Empty cells remain available for future contributions, and the current total is saved automatically in the browser.

## Getting Started

```bash
cd apps/percolume/frontend
npm install
npm run dev
```

For the desktop widget, use `npm run tauri:dev`. The default window is approximately 420 x 560, centered, transparent, borderless, and always on top. Open Settings to disable always-on-top or enable click-through.

To create a production build:

```bash
npm run build
```

Windows packaging requires WebView2, the MSVC Visual C++ toolchain, and NSIS. Run `npm run tauri:build` to produce the installer.

## Repository

The application lives in [`apps/percolume/frontend`](./apps/percolume/frontend). GitHub community files are kept under [`.github`](./.github).

## Privacy

Percolume stores progress records on your device using browser storage. The web application does not send your progress to a hosted service. Clearing site data or using a different browser profile removes the local record.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the contribution workflow.

## License

MIT. See [LICENSE](./LICENSE).
