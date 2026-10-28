#!/usr/bin/env node

import { cp, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const kitRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageVersion = (await readFile(join(kitRoot, 'VERSION'), 'utf8')).trim();

const USAGE = 'usage: node scripts/install-files.mjs --skills-dir <absolute path> [--memory-dir <absolute path>] [--upgrade]';

function fail(message) {
  console.error(`memory-kit install refused: ${message}`);
  console.error(USAGE);
  process.exit(1);
}

const VALUE_FLAGS = new Set(['--skills-dir', '--memory-dir']);
const BOOLEAN_FLAGS = new Set(['--upgrade']);

// Parse argv strictly: an unknown argument, a repeated flag, a missing value, or
// a value that is itself a flag is a refusal, never a silently swallowed token.
const args = process.argv.slice(2);
const parsed = new Map();
for (let index = 0; index < args.length; index += 1) {
  const token = args[index];
  if (BOOLEAN_FLAGS.has(token)) {
    if (parsed.has(token)) fail(`${token} was given more than once`);
    parsed.set(token, true);
    continue;
  }
  if (!VALUE_FLAGS.has(token)) fail(`unrecognized argument: ${token}`);
  if (parsed.has(token)) fail(`${token} was given more than once`);
  const value = args[index + 1];
  if (value === undefined) fail(`${token} needs a value`);
  if (value.startsWith('--')) fail(`${token} needs a path, but got the flag ${value}`);
  parsed.set(token, value);
  index += 1;
}

function absolutePathFor(flag) {
  const value = parsed.get(flag);
  if (value === undefined) return null;
  if (!isAbsolute(value)) fail(`${flag} needs an ABSOLUTE path; got ${value}`);
  return resolve(value);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function nextBackupPath(skillPath, oldVersion) {
  const base = `${skillPath}.backup-${oldVersion || 'unknown'}`;
  if (!(await exists(base))) return base;
  for (let suffix = 2; suffix < 1000; suffix += 1) {
    const candidate = `${base}-${suffix}`;
    if (!(await exists(candidate))) return candidate;
  }
  fail(`could not choose a free backup name beside ${skillPath}`);
}

async function installedVersion(skillPath) {
  for (const relativePath of ['VERSION', 'installer.md']) {
    const path = join(skillPath, relativePath);
    if (!(await exists(path))) continue;
    const text = await readFile(path, 'utf8');
    if (relativePath === 'VERSION') return text.trim();
    const match = text.match(/^\*\*Version:\*\*\s*(\S+)/m);
    if (match) return match[1];
  }
  return 'unknown';
}

async function seedMemory(memoryPath) {
  await mkdir(join(memoryPath, 'session-logs'), { recursive: true });
  const seeds = {
    'changelog.md': `# Changelog — business changes, newest first\n\n<!-- Your entries go directly below this line, newest first. -->\n\n<!-- FORMAT EXAMPLE — not your data. Everything below this line is deleted the first time a real entry is written. -->\n- 2026-07-15 — Raised monthly plan to $79 (was $59) — the $59 tier attracted refund-heavy customers.\n`,
    'decisions.md': `# Decisions — with dates and reasoning, newest first\n\n<!-- Your entries go directly below this line, newest first. -->\n\n<!-- FORMAT EXAMPLE — not your data. Everything below this line is deleted the first time a real entry is written. -->\n- 2026-07-15 — Decided to focus on referral-driven local businesses first — strongest existing relationships and fastest feedback loop.\n`,
  };
  for (const [name, contents] of Object.entries(seeds)) {
    const path = join(memoryPath, name);
    if (!(await exists(path))) await writeFile(path, contents, 'utf8');
  }
}

const skillsDir = absolutePathFor('--skills-dir');
if (!skillsDir) fail('missing --skills-dir <absolute path>');
const skillPath = join(skillsDir, 'memory');
const requestedMemoryPath = absolutePathFor('--memory-dir');
const upgrade = parsed.has('--upgrade');
const existing = await exists(skillPath);

if (existing && !upgrade) {
  fail(`a memory skill already exists at ${skillPath}; rerun with --upgrade only after the user chooses upgrade`);
}

if (existing) {
  // Identity check BEFORE any copy: an unrelated skill that happens to be named
  // `memory` must be refused with its files untouched (KIT-STANDARD §2 item 4).
  const configPath = join(skillPath, 'USER-CONFIG.md');
  if (!(await exists(configPath))) {
    fail(`${skillPath} is not a Memory Kit install (no USER-CONFIG.md); nothing was copied — back up or rename that folder before installing`);
  }
  const config = await readFile(configPath, 'utf8');
  const match = config.match(/^memory folder location:\s*(.+)$/m);
  if (!match) fail(`${skillPath} has a USER-CONFIG.md with no memory folder location; nothing was copied`);
  const memoryPath = resolve(match[1].trim());

  const oldVersion = await installedVersion(skillPath);
  const backupPath = await nextBackupPath(skillPath, oldVersion);
  await cp(skillPath, backupPath, { recursive: true, errorOnExist: true, force: false });

  for (const relativePath of [
    'skills/memory/SKILL.md',
    'skills/memory/workflows',
    'OPERATIONS-MANUAL.md',
    'installer.md',
    'VERSION',
    'examples',
  ]) {
    const source = join(kitRoot, relativePath);
    const destination = relativePath.startsWith('skills/memory/')
      ? join(skillPath, relativePath.slice('skills/memory/'.length))
      : join(skillPath, relativePath);
    await mkdir(dirname(destination), { recursive: true });
    await cp(source, destination, { recursive: true, force: true });
  }

  for (const required of ['session-logs', 'changelog.md', 'decisions.md']) {
    if (!(await exists(join(memoryPath, required)))) fail(`upgrade backup created at ${backupPath}, but preserved data is missing ${required}`);
  }
  console.log(`upgraded memory kit ${oldVersion} -> ${packageVersion}`);
  console.log(`backup: ${backupPath}`);
  console.log(`memory preserved: ${memoryPath}`);
  process.exit(0);
}

await mkdir(skillsDir, { recursive: true });
await cp(join(kitRoot, 'skills/memory'), skillPath, { recursive: true, errorOnExist: true, force: false });
for (const relativePath of ['OPERATIONS-MANUAL.md', 'installer.md', 'VERSION', 'examples']) {
  await cp(join(kitRoot, relativePath), join(skillPath, relativePath), { recursive: true, errorOnExist: true, force: false });
}
const memoryPath = resolve(requestedMemoryPath || join(skillPath, 'memory'));
await seedMemory(memoryPath);
await writeFile(join(skillPath, 'USER-CONFIG.md'), `memory folder location: ${memoryPath}\n`, 'utf8');
await mkdir(join(skillPath, 'branding'), { recursive: true });

console.log(`installed memory kit ${packageVersion}`);
console.log(`skill: ${skillPath}`);
console.log(`memory: ${memoryPath}`);
console.log('branding pending: complete installer Sections 4 and 5');
