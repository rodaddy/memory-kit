# scripts/

The kit's deterministic helpers, plain Node, no packages and no build step.

- `install-files.mjs` - owns the path 3A install and upgrade file operations:
  strict argument parsing, absolute-path requirement, recursive skill copy,
  collision refusal, backup naming, `USER-CONFIG.md`, the three seeded memory
  sources, version receipt, and the preserved-memory assertion on upgrade.
- `verify-kit.mjs` - package contract check; exits 0 when the required files and
  the portability, positioning, refusal, Node-floor, and install-helper-argument
  contracts all hold.

Run from the kit root: `node scripts/verify-kit.mjs`.
