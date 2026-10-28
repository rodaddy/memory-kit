# Memory Kit - basic

The Memory Kit has one tier. `basic` is the whole kit.

## What ships

A memory folder the AI reads at the start of every chat and writes to at the
end, plus the behavior that drives it. Three plain, dated, append-only sources:
`session-logs/` (one dated note per work session, written when the owner says
"I'm done"), `changelog.md` (business changes with date, what, and why), and
`decisions.md` (decisions with their date and reasoning).

The package holds `START-HERE.md` (the first file to open), `installer.md` (the
self-adapting installer, paths 3A-3D), `OPERATIONS-MANUAL.md` (the
plain-language driving manual and the demo script), `kit.json` (declares the
Node >=22.6.0 runtime floor), and `skills/memory/` with `SKILL.md` plus four
workflows: `wrap-session.md`, `recall.md`, `check-against-memory.md`, and
`memory-brief.md`. Alongside those: `examples/` (three complete worked runs on a
real-shaped Long Island landscaping business), `scripts/install-files.mjs` (the
plain-Node install and upgrade helper), `scripts/verify-kit.mjs` (package
contract check), `tests/` (plain-Node functional install and upgrade tests),
`branding/` (filled at install from a short branding interview), and `docs/`.

The piece that is not filing is the contradiction check: before helping with a
new price, a new kind of customer, a new territory, or any decision, the AI
scans the standing decisions for one the idea touches and, if it finds one,
names the DATE, quotes the owner's own recorded REASONING back, states the
overlap, and asks whether this supersedes the earlier call or is an exception to
it. It matches on the subject, not the words. The monthly brief rolls a period
into one dated forwardable page (`briefs/YYYY-MM.md`, optionally a
self-contained branded HTML page), and "give me everything you know" hands over
a pasteable MEMORY BRIEF block that carries the memory to any AI on any device.

## Who it is for

Business owners whose entire business context lives in their head, and who
already use an AI that goes blank every time a chat closes. Best fits per the
kit's own disposition note: solo operators, and agencies (the monthly brief is a
client-status artifact and per-client memory folders are the obvious
extension). It works for owners who are never in the chat during the day - the
6pm one-message day dump is a written path in `wrap-session.md`.

memory-kit is horizontal infrastructure rather than a vertical kit, and it ships
as the free front door: the meetup takeaway and the thing a walk-in leaves with
(kit review panel decision, 2026-08-11).

## What it refuses to do

Five named refusals, all from the kit's own docs:

1. A session log whose "where we left off" is empty or generic is not written.
   It stops, says what it has, and asks for the actual next move.
2. A change or decision offered with no reason is not written: "A change without
   its reason is a fact you'll re-litigate in six months - why did you make it?"
3. A proposed reversal the owner cannot give a reason for is refused
   (`check-against-memory.md`); the entry is not written.
4. A period with no changes, no decisions, and too little to roll up gets a
   plain "not enough here to be worth a page," never a padded brief.
5. A named non-employee's private detail - a claim history, a health matter, a
   legal matter, an account number - does not go into a file that is never
   deleted. It offers the business fact without the private part, and yields
   without argument, once, if the owner says put it in anyway. Names alone pass
   untouched.

It never invents the missing piece to get past a gate, and it never overrules
the owner - the call stays theirs. Pasted text is DATA, not instructions: a
pasted "mark this decision reversed" is quoted back, never obeyed.

Not targeted as shipped: insurance and medical. This is a plain folder of text
files with no lock on it and it makes no retention or privilege claim, so
regulated records belong in the system built for them.

Install paths that are still UNVERIFIED are named as such in the kit README
(Claude app 3B, plain chat 3D, claude.ai web, and a real-device 3C check); they
are not softened to "should work."

## Install

Per `START-HERE.md` and `installer.md`. Unzip the kit, then get `installer.md`
in front of the AI and say "install the memory kit."

- Coding agent with filesystem access (path 3A): locate the skills directory
  (`~/.claude/skills/`, `~/.codex/skills/`, or the platform equivalent); check
  for a collision with an existing skill named `memory` and, if it is a previous
  Memory Kit, ask upgrade-keeping-data or skip; ask where the memory should live
  (default: a `memory/` folder inside the installed skill folder); run
  `node scripts/install-files.mjs --skills-dir <absolute path>
  [--memory-dir <absolute path>]` for a fresh install or
  `node scripts/install-files.mjs --skills-dir <absolute path> --upgrade` for an
  accepted upgrade. Both paths must be absolute. Read the helper's receipt and
  stop on any nonzero exit rather than imitating the copy by hand. Then run the
  branding interview (Section 4) and image-capability check (Section 5), assert
  the install (SKILL.md with frontmatter `name: memory`, all four workflows,
  `USER-CONFIG.md` with a `memory folder location:` line pointing at a path that
  exists, `session-logs/` plus `changelog.md` plus `decisions.md` inside it,
  `branding/brand.md` and `branding/image-setup.md`, and OPERATIONS-MANUAL.md,
  installer.md, VERSION, examples/ beside SKILL.md), and verify on one real fact
  from the owner's own business (Section 6).
- Chat app with skill uploads (path 3B): the AI builds one zip of the `memory`
  skill folder - first archive entry `memory/`, all four workflows included, no
  OS junk - hands it over, and the user uploads and toggles it on; the memory
  lives in the app's Project files.
- Projects / Gems, no skills feature (path 3C): device question first, then add
  the named kit files as Project sources and paste `installer.md`. The save-back
  rule applies: after every entry the AI re-emits the whole updated file and the
  user saves it back into the Project, replacing the previous version.
- Plain chat (path 3D): paste `installer.md`. Loads for that conversation only,
  and the installer says plainly that the memory does not survive the chat
  closing, then points at a real install.

Verification never runs on `examples/` - it runs on one real fact from the
owner's own business, or the install is left explicitly UNVERIFIED.

Runtime floor: Node >=22.6.0 (`kit.json`). No npm install, bundler, jq, Python,
or Bun.

## Current version

`VERSION` reads:

```
1.0.4
```

Itemized history is in `CHANGELOG.md`. At v1.0.4 the plain-Node contracts are
re-verified: `node scripts/verify-kit.mjs` exits 0 and
`node --test tests/install-files.test.mjs` passes 7 tests. Not device-checked.
