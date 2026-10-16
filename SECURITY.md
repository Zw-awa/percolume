# Security Policy

## Scope

This policy covers the Percolume source repository, published application builds, and the local data handling described in the user documentation.

## Supported Versions

Security fixes are applied to the latest published version. Development snapshots may change without notice and should not be used for sensitive environments.

## Reporting A Vulnerability

Please do not open a public issue for a suspected vulnerability. Use a private GitHub security advisory or contact the repository maintainers through a private channel. Include:

- the affected version or commit;
- the operating system and installation source;
- clear reproduction steps;
- the potential impact; and
- a minimal proof of concept when safe to provide.

Please allow time for investigation before publicly disclosing the issue. Do not attach personal progress notes, exported local data, access tokens, or other secrets.

## Response

Maintainers will acknowledge a report when possible, investigate its impact, and coordinate a fix or mitigation. The final response may include a patch, release note, or documentation update.

Percolume is designed to keep progress data local. A security report should still explain whether the issue can read, alter, or expose local records.
