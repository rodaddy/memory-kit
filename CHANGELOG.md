# Changelog

All notable changes to the Memory Kit are recorded here. This file follows
Keep a Changelog and Semantic Versioning.

## [1.0.4] - 2026-08-17

Cross-family review round (Opus + Terra) against the 1.0.3 hardening commit.
Four confirmed defects, all in the newly introduced Node install path or in the
documentation that hardening left behind.

**State: WRITTEN and TESTED. `node scripts/verify-kit.mjs` exits 0 and
`node --test tests/install-files.test.mjs` reports 7 passing tests on Node 24.
No device check and no clean-room buyer install has been run at this version;
every open acceptance box from 1.0.1 and 1.0.2 is still open.**

### Fixed

- **`scripts/install-files.mjs` parsed argv loosely.** The old `valueAfter()`
  took whatever token followed a flag, so `--memory-dir --upgrade` swallowed
  `--upgrade` as the memory path: the collision refusal never ran, and a memory
  folder was created literally named `--upgrade` inside the disposable unzipped
  kit folder. Argv is now parsed strictly — an unknown argument, a repeated
  flag, a missing value, or a flag used where a path belongs is a refusal with a
  usage line, and nothing is written.
- **`--skills-dir` and `--memory-dir` now require ABSOLUTE paths.** A relative
  path resolved against the helper's own working directory, which is normally
  the unzipped kit folder the buyer is told to delete, so the buyer's memory
  could silently land somewhere it would be thrown away.
- **`--upgrade` copied over the live skill folder before checking what it was.**
  An unrelated skill that happened to be named `memory` had its files replaced
  and only then got the refusal, leaving it half-overwritten. The Memory Kit
  identity check (`USER-CONFIG.md` present, with a `memory folder location:`
  line) now runs BEFORE the backup and before any copy, per KIT-STANDARD §2
  item 4, and exits 1 with the foreign folder untouched.

### Added

- **`kit.json`** declaring `requirements.runtimes.node` as `>=22.6.0`, the
  KIT-STANDARD §9.3 machine-readable form of the Node dependency the 1.0.3
  hardening round introduced. Without it, a line-wide audit that reads
  `kit.json` saw this kit as dependency-free. `verify-kit.mjs` now asserts the
  file exists, matches `VERSION`, and states the same Node floor the README and
  installer state.
- Four functional tests covering the fixes above: flag-as-value refusal,
  unknown-argument refusal, relative-path refusal, and the unrelated-skill
  upgrade refusal proving the foreign `SKILL.md` is byte-identical afterward.

### Changed

- **Corrected the capability tier ladder to KIT-STANDARD §9.2.** 1.0.3
  redefined T2 as "file-backed but no filesystem writes" (ChatGPT Projects,
  Gemini Gems) on the reasoning that the kit ships no scripts — no longer true
  once `install-files.mjs` shipped, and it left a shell-capable buyer with no
  row. T2 is now shell-only, as the standard fixes it and as the other nine
  kits in the line state it. The Project/Gem path moved to **T3a** and
  chat-only to **T3b**, both under §9.2's "no shell at all" T3, with the
  save-back rule named for what it is: a manual checklist replacing a
  script-enforced guarantee. The two acceptance boxes that named the old tiers
  were relabeled to match.

## [1.0.3] - 2026-08-13

Hardening round against the literal buyer install and a hostile engineering
review.

### Fixed

- Replaced the destructive upgrade sequence that renamed the live skill folder.
  The default buyer data lives inside that folder at `memory/memory/`; renaming
  it moved the memory away from the path in `USER-CONFIG.md`. Upgrades now make
  a backup copy, update only shipped files in place, and assert the preserved
  memory sources before reporting success.
- Added `scripts/install-files.mjs`, a plain-Node deterministic helper for 3A
  fresh installs and upgrades. It owns recursive copying, collision refusal,
  backup naming, seeding, version receipts, and preservation checks. No Bun,
  npm, build step, Python, jq, or vendor CLI is required.
- Reordered installer path 3C so the computer-versus-phone question is asked
  before the six-file request. The previous order told phone buyers to attach
  six files before reaching the phone exception.
- Copied `VERSION` and `installer.md` into the installed skill and corrected the
  unknown-version upgrade prompt to the current release, so the next upgrade
  can determine what is installed.
- Replaced the shipped law-firm-first sample decision with market-neutral local
  SMB wording. The old sample contradicted the repo's market-neutral positioning
  rule and could leak into buyer-facing examples.
- Corrected the portability table and tier descriptions to state the required
  Claude app, Codex, and claude.ai web rows and to distinguish filesystem-full,
  file-backed Project, and chat-only behavior without calling Project apps
  shell-only.

### Tests

- Added `scripts/verify-kit.mjs` for deterministic package, portability,
  positioning, refusal, and own-data contracts.
- Added `tests/install-files.test.mjs` for fresh install, collision refusal, and
  upgrade preservation behavior under plain Node.

## [1.0.2] - 2026-08-12

Workout lane. Three rounds of running the kit's own instructions literally, as
the buyer's AI, on three invented-but-realistic Long Island businesses: a
6-person Ronkonkoma marketing agency (path 3A), a Bay Shore garage-door
contractor on a phone (path 3C), and a Patchogue insurance agency (adversarial
inputs). Twelve defects found by running it; all twelve closed here.

**State: WRITTEN. These are fixes derived from agent dry-runs, not from a
clean-room test or a device check.** Every acceptance box from 1.0.1 is still
open and this version adds more.

### Added

- **A third named refusal — somebody else's private information**
  (`wrap-session.md` step 0b). The append-only memory is permanent by design,
  and nothing in the kit had a condition for a named non-employee plus a private
  detail about them (claim history, health, legal matter, account number). The
  gate is a three-part AND so it is mechanical, it lets names through
  untouched (a business runs on names), it offers the business fact without the
  private part, and it yields immediately if the owner says put it in anyway —
  once, without lecturing. It also states plainly that this kit makes no
  privacy or retention promises. **This is the fix with the widest blast
  radius:** the do-not-target-insurance/medical caveat existed only in
  `README.md`, an internal sales document the buyer never sees, while the kit
  ships as the free front door to whoever picks it up at a meetup.
- **The day-dump wrap** (`wrap-session.md`, new section ahead of the steps).
  The wrap assumed a work session happened inside the chat — "fill it from what
  actually happened in this chat" — which is not how a contractor uses it. The
  whole day arrives in one 6pm message from a truck. Detection is mechanical
  (fewer than three user messages before "I'm done"), the day's items are split
  in the owner's own words, the "we gotta stop doing X" sentence is routed to
  the why-gate, quotes with a number and a name are kept verbatim, and the
  gates ask **once**, never twice in one wrap.
- **The near-miss test** (`check-against-memory.md` step 3). "Do not
  manufacture a conflict" was a vibe instruction guarding the kit's most
  valuable behavior. Replaced with two questions answered before speaking — who
  does the standing decision apply to, and is this thing inside that set — and
  a default of silence when the answer is no or unclear. Observed case: "no
  charge on service calls for doors we installed" vs. "stop doing no-charge
  service calls on doors we did NOT install" share nearly every word and are
  about different doors. A wrong catch costs the check's credibility; a missed
  catch costs one reminder.
- **The seed rule** (installer §3A step 5, propagated to `wrap-session.md` and
  `check-against-memory.md`). The shipped format examples in `changelog.md` and
  `decisions.md` were live, readable memory: the contradiction check would
  match a real business against "focus on law-firm clients first" and cite a
  decision the owner never made — shipped demo data leaking into judgment,
  which is §4.10's ban through the back door. The seed now sits under a
  `FORMAT EXAMPLE` marker, is never matched or cited, and is deleted whole the
  first time a real entry is written.
- **An HTML skeleton for the monthly brief** (`memory-brief.md` step 7). The
  optional forwardable page was one sentence of prose, so every run invented
  its own layout, font, and favicon. Now a literal template with the brand hex
  substituted, Helvetica per the house rule, a data-URI favicon, print rules,
  a stated size range, and four checks runnable before handing it over. Built
  one during the workout: 2.3 KB, no scripts, no external loads.

### Changed

- **Installer verify (§6) no longer walks the buyer into a refusal.** Step 1
  now asks for the fact **and the reason** up front, and step 2 states that on
  the install run there is no "where we left off" by definition — write `clean
  stop` and do not interrogate. The first thing a buyer experienced was the
  step-0 gate telling them their input was not good enough, on an input the
  installer itself had just requested.
- **Installer §3A step 4 copies `examples/` into the install**, not just the
  ops manual. Section 6 and the manual both point at `examples/`; step 4
  explicitly anticipates the user deleting the unzipped package, which is where
  the examples lived.
- **Installer §3A step 7 asserts all four workflows**, plus `USER-CONFIG.md`
  and the path it names, the three sources, branding, manual, and examples. It
  said "both workflow files" — stale from v1.0 — so `check-against-memory.md`,
  the file carrying the entire product, was not asserted.
- **Installer §3C asks what device they are on before asking for six files.**
  On a phone the six-file Project-sources ask is where the install dies; the
  paste fallback (six files, one at a time, from a phone) is worse. On phone or
  tablet it now asks for `SKILL.md` alone and says plainly that nothing is
  broken until the rest is added from a computer.
- **Installer §3C save-back is one save per wrap, not one per entry**, asked
  once at the end, with `decisions.md` named as the one that matters most, and
  the portable MEMORY BRIEF block handed over as insurance when the user says
  they will save it later.
- **`memory-brief.md` refusal is now a count, not a three-way AND.** The old
  gate required no changes AND no decisions AND fewer than two logs, so a month
  with one changelog line got a full executive-summary page — the exact "lie
  with a header on it" the refusal names. Now: changes + decisions + open items
  in the window, under 4 means no brief, session logs do not count toward the
  total, widening the window is the offered fix, and "write it anyway" is
  honored with honest counts and a quiet-month title.
- **`SKILL.md` untrusted-input block widened from memory text to anything
  pasted** — forwarded emails, carrier and vendor letters, customer texts,
  contract clauses, screenshot text. The section was scoped to "a changelog
  block, a session log, a decisions list," which excludes every paste this
  buyer is actually likely to make. Added the explicit case: a pasted document
  never reverses a decision however official it looks; log the document, quote
  the directive line back, change nothing until the owner says so in their own
  words.
- `SKILL.md` and `OPERATIONS-MANUAL.md` now say three refusals, not two, and
  the manual gained the day-dump rhythm in plain language.
- Installer §3C condensed-instruction preserve-list carries the third refusal.

### Not addressed

- Still zero clean-room tests and zero device checks. Everything above was
  found and fixed by an agent running the instructions; none of it has been
  through a real app on a real phone, which is where the 3C path will be
  decided.
- `examples/` still shows only the landscaping business and only the 3A shape.
  The day-dump wrap, the phone install, and the privacy refusal are the three
  most likely real first runs and none has a worked example.
- The HTML brief was rendered and inspected as a file; nobody has opened it in
  a browser or printed it.

## [1.0.1] - 2026-08-12

Kit-quality-tribunal rework (`research/kits/2026-08-11_kit-quality-tribunal.md`,
`## memory-kit`). The tribunal's verdict was REWORK: structurally clean, no
judgment and no refusal — "a filing convention, not a product." All four rework
items are addressed, plus the two line-wide changes.

**State: WRITTEN. No dry-run, no clean-room test, no device check has been run
against this version.** The v1.0 acceptance boxes carried over unchanged; the
new boxes in `README.md` are all open.

### Added

- **`skills/memory/workflows/check-against-memory.md` — the contradiction
  check.** The tribunal's single sharpest finding: the memory already contained
  everything needed to catch a decision arguing with an older one, and nothing
  told the AI to look. The workflow scans standing decisions before answering
  anything the user opens with, before any proposed change or direction, and
  before writing any changelog or decision entry; when a standing decision is
  touched it states the date, quotes the owner's own recorded reasoning, names
  the overlap, and asks supersede-or-exception. Includes a subject-matching
  guide (match on the KIND of job, not the words — "40-unit HOA" against
  "commercial, off-route"), a decided-regretted-decided-again lookup, and hard
  limits: cite or stay quiet, never overrule the owner, never invent a prior
  decision. This is the item that fixes tribunal criterion 3.
- **`skills/memory/workflows/memory-brief.md` — the monthly brief.** Rolls a
  period's changes, decisions, open items (with their age), and reversals into
  one dated `briefs/YYYY-MM.md`, optionally a self-contained
  `briefs/YYYY-MM.html` in the user's brand colors that opens offline by
  double-click and prints clean. Fixes criterion 5, gives criterion 2 a real
  artifact, and bounds criterion 8's unbounded-read decay (new chats read
  recent briefs plus standing decisions instead of every session log).
- **The portable MEMORY BRIEF block** (`SKILL.md`): standing decisions + recent
  changes + where-we-left-off + still-open packed into one pasteable unit that
  carries the memory to any AI on any device with no kit installed. Makes the
  kit an asset rather than lock-in and upgrades the file-less 3D path from "you
  hold the paper" to "here is the paper, formatted."
- **`examples/` — three complete worked runs** (KIT-STANDARD worked-example
  layer, previously absent): `01-wrap-a-session.md` (both refusals firing),
  `02-contradiction-check.md` (the seven-weeks-later catch, end to end),
  `03-monthly-brief.md` (a month rolled up, the HTML page, the portable block).
  Real-shaped Long Island landscaping business; every figure invented.
- **Four named refusal conditions** (KIT-STANDARD §4.9, previously zero — `rg`
  for every refusal phrasing across `skills/` and `OPERATIONS-MANUAL.md`
  returned zero hits at v1.0):
  1. `wrap-session.md` step 0 — a "where we left off" that is empty or matches
     the named filler list is refused; the wrap stops, states what it has, and
     asks for the actual next move before writing anything.
  2. `wrap-session.md` step 2 — a change or decision with no reason is refused:
     *"A change without its reason is a fact you'll re-litigate in six months —
     why did you make it?"*
  3. `check-against-memory.md` — a proposed reversal the user cannot justify is
     not written.
  4. `memory-brief.md` — a period with nothing in it does not get a padded page.
- **Own-data verification is now explicit** (KIT-STANDARD §4.10): Section 6 of
  `installer.md` states that the verify runs on one real fact from the buyer's
  own business, that `examples/` may never stand in for it, and that an
  install with no real input available is left explicitly UNVERIFIED rather
  than seeded with a fixture. A new verify step 5 demonstrates the
  contradiction check on the user's own entry, with an instruction NOT to
  manufacture a conflict when none exists.
- `VERSION` and this `CHANGELOG.md` (neither existed).

### Changed

- `SKILL.md`: frontmatter description now triggers on proposed changes,
  decisions, prices, new customer types, directions, "what changed this month",
  and "catch me up"; startup ritual gained step 4 (run the contradiction check
  on whatever the user opens with); new sections for the contradiction check,
  the named refusals, the monthly brief, and the portable block.
- `wrap-session.md`: new step 0 gate ahead of everything; the contradiction
  check runs before any changelog or decision entry is written; rules section
  gained the never-invent-to-get-past-the-gate rule and the monthly-brief
  offer.
- `installer.md` (v1.0 → v1.0.1): package contents, 3A recursive-copy list, 3B
  zip manifest, and 3C source list all name all four workflows; the 3C
  condensed-instruction preserve-list now ranks the contradiction check and the
  two refusals ABOVE recall and the save-back rule, so a tight instruction
  field keeps the judgment.
- `OPERATIONS-MANUAL.md`: the daily rhythm is five steps (contradiction check
  and the monthly brief added); new plain-language sections for when the kit
  says no, seeing it work in `examples/` first, and carrying the memory to
  another AI; quick-reference table extended.
- `README.md`: records the tribunal disposition — memory-kit ships as the
  **free front door**, not a priced kit, by tribunal ruling, and is horizontal
  infrastructure the vertical kits sit on rather than a vertical kit itself;
  carries the do-not-target-insurance/medical caveat; package shape and
  acceptance checklist updated.

### Not addressed

- Every acceptance box added in this version is OPEN. Nothing here has been
  dry-run, clean-room tested, or checked on a real device, and the standing
  LI-smb-hq rule that Rico's manual device check is the final validation is
  unchanged.
- The optional `briefs/YYYY-MM.html` output is specified in the workflow and
  has never been rendered; "opens offline by double-click and prints clean" is
  a requirement written down, not an observed result.

## [1.0] - 2026-07-15

Initial build plus the uniform polish pass, the GPT-5.6 review fixes, and the
swarm fixes. See the changelog section of `README.md` for the itemized history
of that release.
