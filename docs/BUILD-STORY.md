# How Memory Kit was built

Sources: `CHANGELOG.md`, the commit history of the private monorepo the kit
was developed in (it was published here as a single snapshot commit on
2026-10-27), and the test files.

## The problem and the first version (2026-07-15)

Chat assistants forget everything when a conversation ends. For a small
business owner that means explaining the same prices, policies and past
decisions again and again. The first version, 1.0, was a skill written in
Markdown: a startup ritual that reads a memory folder, a wrap ritual that
writes dated notes, and a self-adapting installer that picks an install path
based on what the host AI can do.

Before release it went through a polish pass, a review by a GPT-family model,
and a multi-agent review ("swarm"), with fixes from each. The coding-agent
install path was verified the same day in a clean-room sandbox (a fake home
folder) for both Codex and Claude Code.

## Rework after a quality review (2026-08-11 to 2026-08-12)

A panel of AI reviewers scored every kit in the line against the same quality
criteria. Memory Kit's verdict was REWORK: structurally clean, but with no
judgment and no refusals, "a filing convention, not a product." Version 1.0.1
answered that:

- **The contradiction check.** The panel's sharpest point was that the memory
  already held everything needed to catch a new decision arguing with an old
  one, and nothing told the assistant to look. The new workflow matches on the
  kind of decision, not the words, quotes the owner's own dated reasoning, and
  asks whether to supersede or make an exception. It never overrules the owner
  and never invents a prior decision.
- **The monthly brief.** A one-page, dated roll-up of changes, decisions, open
  items and reversals.
- **Named refusals,** each with a fixed trigger, for the cases where writing
  something down would make the memory worse.

The same review placed the kit as a free starting point rather than a priced
product, since the other kits build on it.

## Simulated buyers (2026-08-12)

Version 1.0.2 came from three rounds of AI agents following the kit's own
instructions literally, acting as the buyer's assistant for three invented
small businesses: an agency on a computer, a contractor on a phone, and an
insurance agency feeding it adversarial input. Twelve defects were found this
way and all were fixed. Two examples:

- The wrap assumed the work happened inside the chat. A contractor sends the
  whole day in one evening message from a truck, so a "day-dump" wrap was
  added that splits one message into separate dated items.
- Nothing stopped a private detail about a named customer (health, claims,
  account numbers) from landing in a permanent file. A third refusal was added
  with a mechanical three-part condition that still lets ordinary names
  through.

The changelog marks these as fixes from agent dry runs, not from a clean-room
test or a device check, and keeps those acceptance boxes open.

## Hardening the install (2026-08-13)

An engineering review of the literal install found that upgrading **renamed
the live skill folder, which moved the owner's memory away from the path the
assistant reads.** The fix was to stop leaving file operations to the model:
`scripts/install-files.mjs`, plain Node with no packages, now owns install and
upgrade. It refuses to overwrite, makes a backup copy, updates shipped files in
place and checks that the memory is still there before reporting success.
`scripts/verify-kit.mjs` and the first install tests were added in the same
release. A sample decision that led with one industry was replaced with
market-neutral wording.

## Two-model review (2026-08-17)

The new helper was reviewed by Claude Opus and a GPT-family reviewer. They
confirmed four defects, all in the code the previous round had just added:

1. Loose argument parsing: `--memory-dir --upgrade` took `--upgrade` as the
   path and created a folder with that name. Parsing is now strict.
2. Relative paths resolved against the unzipped kit folder, which the buyer is
   told to delete afterwards. Both paths must now be absolute.
3. `--upgrade` copied over a folder named `memory` before checking it was a
   Memory Kit install. The identity check now runs first, and an unrelated
   folder is left byte-for-byte untouched.
4. The Node requirement was not declared in `kit.json`, so a line-wide audit
   saw the kit as dependency-free.

Each fix has a functional test. The tier ladder was also corrected to the kit
line's standard names.

## How it is tested

- `node --test tests/install-files.test.mjs`: 7 tests covering fresh install,
  collision refusal, upgrade with memory preserved, and the four refusals from
  the 2026-08-17 review.
- `node scripts/verify-kit.mjs`: checks the required files, the version in
  every place it appears, the declared Node floor, the install table and tier
  ladder, and that each named refusal is still present in its workflow.
- Worked examples in `examples/` show the expected conversations.

## Current state (2026-10-27)

Version 1.0.4. Both checks pass. The chat-app, plain-chat and real-phone
install paths remain unverified and are labelled that way in the README. The
optional HTML monthly brief is specified but, per the changelog, has not yet
been rendered in a real run.
