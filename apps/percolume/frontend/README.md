# Percolume Desktop

Percolume is a transparent, borderless, always-on-top Windows desktop app for tracking daily effort on a local progress grid.

## Windows prerequisites

- Node.js 20 or newer
- Rust stable with the MSVC toolchain
- Microsoft WebView2 Runtime
- Visual Studio 2022 C++ build tools with the Windows 10/11 SDK

## Development

Install dependencies and start the Tauri development window:

```bash
npm ci
npm run tauri:dev
```

Run the frontend checks before committing:

```bash
npm run build
npm test
```

## Windows packaging

Create the NSIS installer bundle locally:

```bash
npm run tauri:build
```

The installer is written to `src-tauri/target/release/bundle/nsis/` (normally as a `.exe`). CI builds the same Windows bundle and uploads the installer as a workflow artifact.

## Local data

Progress, cell notes, timestamps, and settings are stored on the local machine through the Tauri Store plugin. The app has no account, cloud sync, hosted database, or required network service. If the Tauri Store is unavailable, the frontend uses browser local storage as a safe fallback.

Uninstalling removes the application but does not promise to remove all local data. To reset progress, use the app's reset action or remove its local application data after closing Percolume. Upgrading keeps compatible local state and applies the built-in schema migrations.

## Release checklist

- Run `npm run build` and `npm test`.
- Run `npm run tauri:build` on Windows.
- Verify the NSIS installer launches and the transparent always-on-top window behaves correctly.
- Install over the previous version and confirm local progress is retained.
- Test uninstall and a fresh install before publishing the `.exe` artifact.
