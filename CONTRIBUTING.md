# Contributing To Percolume

Thank you for helping improve Percolume. Contributions can include bug fixes, documentation improvements, accessibility fixes, translations, tests, and changes to the desktop experience.

## Before You Start

Search the existing issues and pull requests first. For a substantial change, open an issue before writing the implementation so the problem and proposed behavior can be discussed in public.

Do not include private progress notes, exported local data, or other personal information in issues, pull requests, screenshots, or test fixtures.

## Local Development

The current application is in `apps/percolume/frontend` and uses Node.js with Vite.

```bash
cd apps/percolume/frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Validation

Before opening a pull request, run the production build:

```bash
npm run build
```

For changes to behavior, also describe the manual steps you used to verify the result. Keep new tests close to the code they cover when a test suite exists for that area.

## Pull Requests

Keep each pull request focused on one change. Explain the user-visible result, link the relevant issue, and include screenshots or a short recording for visual changes when useful.

Use a clear commit message, for example:

```text
fix(grid): preserve cell details after reshuffling
```

Pull requests are reviewed for correctness, clarity, accessibility, privacy, and consistency with the existing interface.

## Reporting Bugs

Use the bug report template and include the Percolume version, operating system, reproduction steps, expected behavior, and actual behavior. Remove private notes and local data before attaching files.

## License

By contributing, you agree that your contribution is provided under the repository's [MIT License](./LICENSE).
