# tests/

Plain-Node functional tests for the install helper. No test framework and no
packages; `node --test` runs them.

- `install-files.test.mjs` - exercises `scripts/install-files.mjs` end to end:
  fresh install, collision refusal, flag-as-path-value refusal, unknown-argument
  refusal, relative-path refusal, unrelated-skill upgrade refusal with the
  foreign file left byte-identical, and nested-memory preservation on upgrade.

Run from the kit root: `node --test tests/install-files.test.mjs`.
