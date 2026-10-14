# Percolume · 渗行

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md)

[![License](https://img.shields.io/badge/license-MIT-1976d2)](./LICENSE) ![Platform](https://img.shields.io/badge/platform-Windows-0078d4)

**Small efforts find a path.**

Percolume (渗行) is a quiet desktop widget for making small efforts visible. Record a little progress and a random pixel lights up in your goal grid. Over time, separate points can become a path from the top of the grid to the bottom.

## Features

- A daily contribution view for recording effort.
- A goal grid where each record lights one random cell.
- A timestamp and optional note for each lit cell.
- Four-direction path visualization when progress connects across the grid.
- Local-first storage with no account required.
- A small, distraction-free interface for everyday use.

## Getting Started

```bash
cd apps/percolume/frontend
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Repository

The application lives in [`apps/percolume/frontend`](./apps/percolume/frontend). GitHub community files are kept under [`.github`](./.github).

## Privacy

Percolume stores progress records on your device. Notes and timestamps are not sent to a hosted service by the application.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the contribution workflow.

## License

MIT. See [LICENSE](./LICENSE).
