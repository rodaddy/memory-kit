import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, stat, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const kitRoot = resolve(import.meta.dirname, '..');
const installer = join(kitRoot, 'scripts/install-files.mjs');
const repoRoot = resolve(kitRoot, '..', '..', '..');
const worktreesMarker = `${join('_worktrees', 'placeholder').slice(0, -'placeholder'.length)}`;
const worktreesIndex = repoRoot.indexOf(worktreesMarker);
const scratchRoot = process.env.MEMORY_KIT_TEST_ROOT
  ? resolve(process.env.MEMORY_KIT_TEST_ROOT)
  : worktreesIndex === -1
    ? resolve(repoRoot, '_scratch', 'memory-kit-tests')
    : resolve(repoRoot.slice(0, worktreesIndex), '_scratch', 'memory-kit-tests');

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function run(...args) {
  return spawnSync(process.execPath, [installer, ...args], { encoding: 'utf8' });
}

await mkdir(scratchRoot, { recursive: true });

test('plain Node install creates the canonical skill and memory sources', async () => {
  const root = await mkdtemp(join(scratchRoot, 'memory-kit-install-'));
  const skillsDir = join(root, 'skills');
  const result = run('--skills-dir', skillsDir);
  assert.equal(result.status, 0, result.stderr);

  const skillPath = join(skillsDir, 'memory');
  for (const relativePath of [
    'SKILL.md',
    'workflows/wrap-session.md',
    'workflows/recall.md',
    'workflows/check-against-memory.md',
    'workflows/memory-brief.md',
    'OPERATIONS-MANUAL.md',
    'installer.md',
    'VERSION',
    'examples/01-wrap-a-session.md',
    'USER-CONFIG.md',
    'memory/session-logs',
    'memory/changelog.md',
    'memory/decisions.md',
  ]) assert.equal(await exists(join(skillPath, relativePath)), true, relativePath);

  const config = await readFile(join(skillPath, 'USER-CONFIG.md'), 'utf8');
  assert.equal(config, `memory folder location: ${join(skillPath, 'memory')}\n`);
});

test('install refuses a collision unless the buyer selected upgrade', async () => {
  const root = await mkdtemp(join(scratchRoot, 'memory-kit-collision-'));
  const skillsDir = join(root, 'skills');
  assert.equal(run('--skills-dir', skillsDir).status, 0);
  const result = run('--skills-dir', skillsDir);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /rerun with --upgrade only after the user chooses upgrade/);
});

test('a flag used as a path value is refused, not swallowed', async () => {
  const root = await mkdtemp(join(scratchRoot, 'memory-kit-argv-'));
  const skillsDir = join(root, 'skills');
  const result = run('--skills-dir', skillsDir, '--memory-dir', '--upgrade');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--memory-dir needs a path, but got the flag --upgrade/);
  assert.equal(await exists(join(kitRoot, '--upgrade')), false);
  assert.equal(await exists(join(skillsDir, 'memory')), false);
});

test('an unrecognized argument is refused', async () => {
  const root = await mkdtemp(join(scratchRoot, 'memory-kit-unknown-'));
  const skillsDir = join(root, 'skills');
  const result = run('--skills-dir', skillsDir, '--force');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /unrecognized argument: --force/);
  assert.equal(await exists(join(skillsDir, 'memory')), false);
});

test('relative --skills-dir and --memory-dir are refused', async () => {
  const root = await mkdtemp(join(scratchRoot, 'memory-kit-relative-'));
  const relative = run('--skills-dir', 'skills');
  assert.equal(relative.status, 1);
  assert.match(relative.stderr, /--skills-dir needs an ABSOLUTE path/);

  const skillsDir = join(root, 'skills');
  const relativeMemory = run('--skills-dir', skillsDir, '--memory-dir', 'my-memory');
  assert.equal(relativeMemory.status, 1);
  assert.match(relativeMemory.stderr, /--memory-dir needs an ABSOLUTE path/);
  assert.equal(await exists(join(skillsDir, 'memory')), false);
  assert.equal(await exists(join(kitRoot, 'my-memory')), false);
});

test('upgrade refuses an unrelated skill named memory without touching its files', async () => {
  const root = await mkdtemp(join(scratchRoot, 'memory-kit-foreign-'));
  const skillsDir = join(root, 'skills');
  const foreignSkill = join(skillsDir, 'memory');
  await mkdir(foreignSkill, { recursive: true });
  const foreignContents = 'unrelated\n';
  await writeFile(join(foreignSkill, 'SKILL.md'), foreignContents, 'utf8');

  const result = run('--skills-dir', skillsDir, '--upgrade');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /is not a Memory Kit install/);
  assert.equal(await readFile(join(foreignSkill, 'SKILL.md'), 'utf8'), foreignContents);
  assert.equal(await exists(join(foreignSkill, 'workflows')), false);
  assert.equal(await exists(join(foreignSkill, 'VERSION')), false);
});

test('upgrade copies a backup and preserves the live nested memory', async () => {
  const root = await mkdtemp(join(scratchRoot, 'memory-kit-upgrade-'));
  const skillsDir = join(root, 'skills');
  assert.equal(run('--skills-dir', skillsDir).status, 0);

  const skillPath = join(skillsDir, 'memory');
  const decisionPath = join(skillPath, 'memory', 'decisions.md');
  const buyerDecision = '- 2026-08-13 — Keep the service desk staffed — the team owns customer judgment.\n';
  await writeFile(decisionPath, buyerDecision, 'utf8');
  await writeFile(join(skillPath, 'VERSION'), '1.0.2\n', 'utf8');
  await writeFile(join(skillPath, 'SKILL.md'), 'old instructions\n', 'utf8');

  const result = run('--skills-dir', skillsDir, '--upgrade');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(await readFile(decisionPath, 'utf8'), buyerDecision);
  assert.equal(await exists(`${skillPath}.backup-1.0.2`), true);
  assert.equal(await readFile(join(`${skillPath}.backup-1.0.2`, 'memory', 'decisions.md'), 'utf8'), buyerDecision);
  assert.match(await readFile(join(skillPath, 'SKILL.md'), 'utf8'), /^---\nname: memory/m);
  const shippedVersion = (await readFile(join(kitRoot, 'VERSION'), 'utf8')).trim();
  assert.equal((await readFile(join(skillPath, 'VERSION'), 'utf8')).trim(), shippedVersion);
});
