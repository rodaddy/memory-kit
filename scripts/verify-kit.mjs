#!/usr/bin/env node

import { readFile, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const kitRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

async function text(relativePath) {
  return readFile(join(kitRoot, relativePath), 'utf8');
}

async function exists(relativePath) {
  try {
    await stat(join(kitRoot, relativePath));
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

const requiredFiles = [
  'START-HERE.md',
  'installer.md',
  'OPERATIONS-MANUAL.md',
  'README.md',
  'VERSION',
  'CHANGELOG.md',
  'skills/memory/SKILL.md',
  'skills/memory/workflows/wrap-session.md',
  'skills/memory/workflows/recall.md',
  'skills/memory/workflows/check-against-memory.md',
  'skills/memory/workflows/memory-brief.md',
  'examples/01-wrap-a-session.md',
  'examples/02-contradiction-check.md',
  'examples/03-monthly-brief.md',
  'scripts/install-files.mjs',
  'kit.json',
];
for (const path of requiredFiles) check(await exists(path), `missing required file: ${path}`);

const version = (await text('VERSION')).trim();
const installer = await text('installer.md');
const readme = await text('README.md');
const changelog = await text('CHANGELOG.md');
const skill = await text('skills/memory/SKILL.md');
const wrap = await text('skills/memory/workflows/wrap-session.md');
const contradiction = await text('skills/memory/workflows/check-against-memory.md');
const brief = await text('skills/memory/workflows/memory-brief.md');
const all = `${installer}\n${readme}\n${skill}\n${wrap}\n${contradiction}\n${brief}`;

check(installer.includes(`**Version:** ${version}`), 'installer version does not match VERSION');
check(changelog.includes(`## [${version}] - `), 'CHANGELOG has no current VERSION entry');
check(/^---\nname: memory\ndescription:/m.test(skill), 'SKILL.md frontmatter name/description is invalid');
check(!/\b(?:bun run|bun test|Bun\.)\b/.test(all), 'buyer-facing kit requires Bun');
check(!/(?:^|[` ])claude\s+-p(?:[` ]|$)/m.test(`${installer}\n${skill}\n${wrap}\n${contradiction}\n${brief}`), 'buyer-facing install or workflow invokes claude -p');
check(!/focus on law-firm clients first/i.test(`${installer}\n${skill}`), 'generic shipped seed leads with law firms');
check(installer.indexOf('ASK WHAT DEVICE THEY ARE ON BEFORE YOU ASK FOR FILES') < installer.indexOf('ask them to add these exact files'), '3C asks for files before selecting the device path');
check(installer.includes('Do not rename or move the live `memory/` folder'), 'upgrade does not protect the live nested memory folder');
check(/makes? a backup COPY/.test(installer), 'upgrade does not require a non-destructive backup copy');
check(installer.includes('scripts/install-files.mjs'), '3A does not name the deterministic install helper');
check(/All three true → STOP\. ASK\./.test(wrap), 'private-information refusal is missing');
check(/If it fails: STOP\. ASK\./.test(wrap), 'where-we-left-off refusal is missing');
check(/A reversal without a reason does not get\s+written/.test(contradiction), 'contradiction refusal is missing');
check(/If that total is under 4, do not write a brief/.test(brief), 'brief refusal count is missing');
check(installer.includes("user's OWN business") && installer.includes('leave the install unverified'), 'own-data verification refusal is missing');
check(readme.includes('| **Claude app** |') && readme.includes('| **Codex** |') && readme.includes('| **claude.ai web** | Presumed zip upload, same as the app. | **UNVERIFIED** — never tested |'), 'required harness install/status rows are missing');
check(readme.includes('**T1 — full**') && readme.includes('**T2 — shell-only**') && readme.includes('**T3 — no shell**'), 'capability tier ladder does not use the KIT-STANDARD §9.2 tier names');
check(readme.includes('**T3a — file-backed Project/Gem**') && readme.includes('**T3b — chat-only**'), 'T3 does not split the Project/Gem and chat-only shapes');

// KIT-STANDARD §9.3: the Node dependency is declared machine-readably and the
// floor stated in kit.json, README, and installer must be the SAME floor.
const NODE_FLOOR = '22.6.0';
const kit = JSON.parse(await text('kit.json'));
check(kit.name === 'memory-kit', 'kit.json name is not memory-kit');
check(kit.version === version, 'kit.json version does not match VERSION');
check(kit.requirements?.runtimes?.node === `>=${NODE_FLOOR}`, `kit.json does not declare requirements.runtimes.node >=${NODE_FLOOR}`);
check(readme.includes(`Node ${NODE_FLOOR}+`), `README does not state the Node ${NODE_FLOOR}+ floor beside the tier ladder`);
check(readme.includes('`kit.json` `requirements.runtimes`'), 'README tier ladder does not point at the kit.json declaration');
check(!/Node 1[0-9]\b|Node 2[0-2]\.[0-5]\b|Node 18/.test(`${readme}\n${installer}`), 'a stale Node floor below 22.6.0 is stated in buyer-facing docs');

// The install helper must refuse malformed argv rather than swallowing a flag as
// a path, and must refuse a relative path that would resolve against its own cwd.
const installHelper = await text('scripts/install-files.mjs');
check(installHelper.includes('unrecognized argument'), 'install helper does not reject unknown arguments');
check(installHelper.includes('needs a path, but got the flag'), 'install helper does not reject a flag used as a path value');
check(installHelper.includes('needs an ABSOLUTE path'), 'install helper does not require absolute --skills-dir/--memory-dir');
check(installHelper.indexOf('is not a Memory Kit install') < installHelper.indexOf("await cp(skillPath, backupPath"), 'upgrade copies before verifying the folder is a Memory Kit');

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}
console.log(`memory-kit contract verified at v${version}`);
console.log(`checked ${requiredFiles.length} required files and buyer-facing portability/refusal contracts`);
