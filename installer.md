# Memory Kit — Installer

> You are reading the Memory Kit installer.

**Version:** 1.0.4
**Created by:** Rico Rojas / rTech Digital Consulting
**What this kit does (in one line):** your AI forgets everything between chats — this gives it a real memory that remembers what you decided, what you changed, and what you were in the middle of.
**Package contents:** `START-HERE.md`, this file, `skills/memory/` (the `SKILL.md` plus a `workflows/` folder of four workflows), `OPERATIONS-MANUAL.md`, `examples/` (three complete worked runs), `scripts/` (plain-Node install and verify helpers), `tests/`, `kit.json` (declares the Node 22.6.0+ requirement), `branding/`, `docs/`

---

## What This File Does

You are an AI assistant (Claude, ChatGPT, Gemini, Codex, or any other AI reading this). This file tells you how to:

1. Detect what kind of AI you are and what your host platform can do
2. **Turn this package into whatever your host needs** — never declare it incompatible
3. Install the memory behavior so the user's AI remembers work between chats
4. Set up the user's `branding/` (name and voice for the log headers)
5. Verify the install by proving the memory actually works in a fresh chat

**Do not summarize this file. Do not explain what you are about to do. Begin with Section 1 now.**

---

## Section 1: Installation Trigger

When the user shares this file or says "install the memory kit," begin immediately. Greet them with one line: "Let's set up your AI's memory — I'll handle the setup and ask you at most a question or two. Takes about five minutes." Then proceed to Section 2.

---

## Section 2: Detect Your Runtime

Determine which of these you are. Do not ask the user technical questions you can answer yourself by testing your own capabilities.

| You are… | Signs | Go to |
| --- | --- | --- |
| **A coding agent with filesystem access** (Claude Code, Codex CLI, or similar) | you can run shell commands and write files to the user's disk | 3A |
| **A chat app that supports uploaded skills** (Claude app: web, desktop, or mobile) | you cannot touch the user's filesystem, but your platform has a Skills feature that accepts **zip uploads** | 3B |
| **A chat app with projects/custom instructions but no skills feature** (ChatGPT Projects, Gemini Gems, or similar) | no filesystem, no skill uploads, but persistent instructions and project files exist | 3C |
| **A plain chat session** — none of the above | no filesystem, no skills, no persistent instructions | 3D |

If you are genuinely unsure between two rows, ask the user ONE question: "Are we talking in the Claude app, ChatGPT, or a terminal?" and map their answer to the closest row.

**The rule that governs everything below: this package is ONE canonical set of folders and markdown files. If your host needs a different shape — a zip, pasted instructions, anything — YOU produce that shape from the canonical files, right now, yourself. "This package doesn't work here" is never the answer.** The point of this kit is a memory the AI reads and writes; where that memory physically lives changes by platform, and this installer spells out each case honestly (see especially the note at the end of 3C — on platforms that can't save files, the memory becomes messages you keep, and that's fine).

---

## Section 3A: Coding agent with filesystem access

**The script owns the mechanical file work.** Use plain Node to run `scripts/install-files.mjs`; the AI still drives the collision choice, memory-location question, branding interview, and verification. Buyers never need Bun, npm, or a build step.

1. Locate your skills directory: `~/.claude/skills/` (Claude Code), `~/.codex/skills/` (Codex CLI), or your platform's equivalent. Create it if missing.
2. **Collision check first — and if it's THIS kit, offer an upgrade.** Before copying anything, check whether a skill named `memory` already exists in the skills directory.
   - **Same kit already installed (an upgrade).** If the existing `memory/` is a previous Memory Kit, read the installed copy's version — from `VERSION`, or from the `**Version:**` line of an installed `installer.md`; **if you can't determine it, treat the installed copy as older.** Then ask ONE question: *"You have v<old>; this is v<new> — upgrade keeping all your data, or skip?"* (If you couldn't read a version, say *"You have an earlier Memory Kit; this is v1.0.4 — upgrade keeping all your data, or skip?"*)
     - **On upgrade:** the helper in step 3 makes a backup COPY of the old skill folder at `memory.backup-<old-version>` (e.g. `memory.backup-1.0.2`; an existing name gets `-2`, `-3`, and so on). **Do not rename or move the live `memory/` folder:** its default data location is the nested `memory/memory/`, and moving the live folder would move the buyer's data out from under `USER-CONFIG.md`. The helper replaces only shipped instructions and reference files in the LIVE skill folder, never `USER-CONFIG.md`, `branding/`, or the memory data folder named by `memory folder location:`. It then asserts that `session-logs/`, `changelog.md`, and `decisions.md` still exist. Do NOT re-run the branding interview or re-seed the memory files.
     - **On skip:** leave the installed kit exactly as-is and stop.
   - **A different, unrelated skill happens to be named `memory`.** Do NOT silently overwrite: tell the user and ask "replace, keep yours, or back yours up first?" For "back up," rename the existing folder to `memory.backup-<YYYYMMDD>` before copying. The helper enforces this too — on `--upgrade` it checks that the live folder is a Memory Kit (`USER-CONFIG.md` present, with a `memory folder location:` line) **before it copies anything**, and exits 1 with the foreign folder untouched if it is not.
3. Ask where the memory should live (default: a `memory/` folder inside the installed skill folder). Then run the helper from the unzipped kit root:
   - fresh install: `node scripts/install-files.mjs --skills-dir <absolute skills directory> --memory-dir <absolute memory folder>`
   - accepted upgrade: `node scripts/install-files.mjs --skills-dir <absolute skills directory> --upgrade`
   **Both paths must be ABSOLUTE** (starting with `/`, or a drive letter on Windows). A relative path would resolve against whatever directory the helper happens to run from — usually the unzipped kit folder the buyer is told to throw away — so the helper refuses it rather than putting the buyer's memory somewhere it will be deleted. The helper also refuses any unrecognized argument and any flag used where a path belongs, so `--memory-dir --upgrade` is an error, never a folder named `--upgrade`.
   If the default memory location is accepted, omit `--memory-dir` entirely — do not pass it with an empty or placeholder value. The helper recursively copies the whole skill and all four workflows, copies `OPERATIONS-MANUAL.md`, `installer.md`, `VERSION`, and `examples/`, writes `USER-CONFIG.md`, creates the three memory sources, and refuses collisions unless `--upgrade` was explicitly selected. On Node 22.6 through 23.5, use `node --experimental-strip-types` only for `.ts` files; this helper is `.mjs` and needs no flag.
4. Read the helper's receipt. If it exits nonzero, STOP and resolve the exact refusal; do not imitate part of the copy by hand and declare success. If it reports `branding pending`, continue to Sections 4 and 5.
5. **Create the memory folder itself only if the helper reported it missing.** The normal path has already created it plus `session-logs/`, a seeded `changelog.md`, and a seeded `decisions.md` (see the seeding note below).
   - **Always write `USER-CONFIG.md` inside the installed skill folder** (right next to `SKILL.md`), even for the default location, so the memory path is never implicit. Use one fully-spelled-out key:
     ```
     memory folder location: <absolute path to the memory folder>
     ```
     The startup ritual and every workflow read THIS file and THIS key to find the memory. There is no second config file. If the user chose a custom location (e.g. a Dropbox "Firm" folder), this is what keeps their memory from being lost on the next chat.

   **Seeding changelog.md and decisions.md** — write these exact starter contents so a weak model has a real format to copy. The example line sits BELOW a fenced marker so it is machine-removable and can never be mistaken for the user's own history:
   - `changelog.md`:
     ```
     # Changelog — business changes, newest first

     <!-- Your entries go directly below this line, newest first. -->

     <!-- FORMAT EXAMPLE — not your data. Everything below this line is deleted the first time a real entry is written. -->
     - 2026-07-15 — Raised monthly plan to $79 (was $59) — the $59 tier attracted refund-heavy customers.
     ```
   - `decisions.md`:
     ```
     # Decisions — with dates and reasoning, newest first

     <!-- Your entries go directly below this line, newest first. -->

     <!-- FORMAT EXAMPLE — not your data. Everything below this line is deleted the first time a real entry is written. -->
     - 2026-07-15 — Decided to focus on referral-driven local businesses first — strongest existing relationships and fastest feedback loop.
     ```

   **The seed rule, stated once so every workflow can follow it mechanically:**
   a line at or below the `FORMAT EXAMPLE` marker is shipped demo text, not the
   user's business. It is never read as memory, never matched by the
   contradiction check, and never rolled into a brief. The FIRST time a real
   entry is written to either file, the marker line and everything below it are
   removed in the same write — so the file holds only the user's own history
   from their first entry onward. This is the one exception to append-only, and
   it exists because the seed was never theirs.
6. Run the **branding interview** (Section 4) and the **image-capability check** (Section 5), writing `branding/brand.md` and `branding/image-setup.md`.
7. Assert the install before demoing. Check each of these and say which passed — a missing item is fixed now, not reported later:
   - `SKILL.md` present, frontmatter `name: memory`;
   - **all four** workflow files present: `wrap-session.md`, `recall.md`, `check-against-memory.md`, `memory-brief.md`. A missing `check-against-memory.md` installs a filing cabinet — it carries the judgment;
   - `USER-CONFIG.md` present with a `memory folder location:` line, and the path it names actually exists;
   - inside that path: `session-logs/`, `changelog.md`, `decisions.md`;
   - `branding/brand.md` with a `business name:` line, and `branding/image-setup.md`;
   - `OPERATIONS-MANUAL.md`, `installer.md`, `VERSION`, and `examples/` copied in beside `SKILL.md`, with `VERSION` reading `1.0.4`.

   Then go to Section 6 (Verify).

## Section 3B: Chat app with skill uploads (zip required)

Your platform accepts skills only as zip archives. The zip is not in this package — **you create it**:

1. Using your code-execution / file-creation capability, create ONE zip of the `memory` skill folder. Exact layout:
   - the FIRST path entry in the archive must be `memory/` — nothing above it. NOT `skills/memory/`, NOT a wrapping package folder, and NOT a bare `SKILL.md` at the archive root.
   - include the folder's ENTIRE contents recursively: `memory/SKILL.md`, `memory/workflows/wrap-session.md`, `memory/workflows/recall.md`, `memory/workflows/check-against-memory.md`, `memory/workflows/memory-brief.md`. A zip missing the workflows installs as a silently broken skill — and `check-against-memory.md` is the one that carries the kit's judgment, so a zip without it installs a filing cabinet.
   - exclude OS junk: no `__MACOSX/`, no `.DS_Store`.
   - sanity-check the archive's listing against these rules before handing it over.
2. Give the user the zip as a downloadable file. If you built it but your platform cannot attach files to the user, fall through to Section 3C — do not stop.
3. Tell the user the upload steps. Current Claude app labels: "Settings → Capabilities → turn ON Code execution and file creation (one-time), then Settings → Customize → Skills → upload this zip → toggle it on." Add: menu labels change between app versions — if these don't match, look for the Skills and Capabilities sections in Settings.
4. **Where the memory folder lives on this platform:** the app can't write to your computer, so the memory lives in the app's **Project files** — but you (the AI) may not be able to save files there on your own. Be honest about that: tell the user to create (or open) a Project, and that the changelog and decisions live there as notes/documents *they* keep, and each session log is one you hand them **as a message to paste into the Project**. Whenever the platform won't let you write the file yourself, post the text and let the user hold it (same as 3C). Every new chat in that Project can then read the memory back.
5. Run the **branding interview** (Section 4) and **image check** (Section 5) now, in this chat, and give the user the resulting `branding/brand.md` text to keep with the memory.
6. **PAUSE here.** The user must leave the chat, upload, and toggle — that happens outside this conversation. Say: "Tell me when it's uploaded and toggled on, and we'll test it." Only when the user confirms, go to Section 6 (Verify).

## Section 3C: Projects / custom instructions, no skills feature

Your platform can hold persistent instructions and project files but not skill files. Condense the package yourself:

1. **ASK WHAT DEVICE THEY ARE ON BEFORE YOU ASK FOR FILES.** One question:
   *"Quick one — are you on a computer or your phone?"*

   The user handed you only `installer.md`, so the rest of the kit is not yet visible to you. You cannot condense files you cannot see.

   - **Computer:** ask them to add these exact files from the unzipped kit as Project/Gem sources, then STOP and wait for confirmation:
     - `skills/memory/SKILL.md`
     - `skills/memory/workflows/wrap-session.md`
     - `skills/memory/workflows/recall.md`
     - `skills/memory/workflows/check-against-memory.md`
     - `skills/memory/workflows/memory-brief.md`
     - `OPERATIONS-MANUAL.md`
     Say: "Add those files to this Project as sources, then tell me when they're in and I'll read them and build your condensed instructions." **Fallback if the platform caps Project files:** ask the user to paste the files one at a time — same read-set, different transport. "I can't see those files" is never a dead end.
   - **Phone or tablet:** do not send them hunting for six files. Ask for ONE file — `skills/memory/SKILL.md` — added or pasted, exactly the way START-HERE.md already got them to `installer.md`, then STOP and wait for it. Build the condensed instructions from `SKILL.md` plus this installer. Say plainly afterward: *"That is the whole thing working. When you are next at a computer, adding the four workflow files to this Project sharpens the matching and wrap guidance — but nothing is broken until you do."* A one-file install that runs beats a six-file install abandoned in the driveway.
2. Only once the requested sources are in front of you, read the complete source set available for this device. On a computer that is `SKILL.md`, all four workflow files, and `OPERATIONS-MANUAL.md`. On a phone or tablet that is the full `SKILL.md` plus this installer; do not claim you read workflow files the user did not provide.
3. Write a single instruction document (about one page) that preserves, in priority order:
   1. **the startup ritual** — at the start of every new chat, before answering anything, read the memory (decisions, changelog, latest session logs) and give a one-line catch-up;
   2. **the contradiction check** — before answering anything the user opens with, and before writing ANY change or decision, scan the standing decisions for one the topic touches; if one is touched, say it out loud with the DATE, the user's own recorded REASONING quoted back, and the plain overlap, then ask "does this supersede it, or is this an exception?" Never overrule the user, never claim a prior decision you cannot cite. **This is the highest-value behavior in the kit — if the instruction field is tight, this survives ahead of items 4 and 5.**
   3. **the three refusals** — (a) a session log whose "where we left off" is empty or generic ("kept working on things") is NOT written: stop, say what you have, ask for the actual next move, wait; (b) a change or decision with no reason is NOT written: ask "a change without its reason is a fact you'll re-litigate in six months — why did you make it?" and wait; (c) a named person who is not the owner or an employee, plus a private detail about them (claim history, health, legal matter, account number), does not go into a permanent file — offer the business fact without the private part, and if the owner says put it in anyway, put it in without arguing. Never invent the missing piece;
   4. **the wrap ritual with the ONE phrase** — "I'm done" (also "wrap it up") writes a dated session log and offers to log changes/decisions;
   5. **the three memory sources** — session logs (dated, one per session), `changelog.md` (dated business changes), `decisions.md` (dated decisions + reasoning), all append-only, newest on top;
   6. **the recall behavior** — "what did we decide about X?" searches the memory and answers with the date and the reasoning, never guessing;
   7. **the monthly brief and the portable MEMORY BRIEF block** — "what changed this month?" rolls the period into one dated page; "give me everything" packs standing decisions + recent changes + where-we-left-off + still-open into one pasteable block the user can carry to any AI;
   8. **the save-back rule (REQUIRED, not a suggestion)** — a Project chat cannot persist a file the way a disk can, so after EVERY log entry, changelog line, or decision, the AI must output the COMPLETE updated file (the whole `changelog.md`, the whole `decisions.md`, or the whole session log) as one copy-ready block, and tell the user to save it into the Project sources **replacing the previous version** — one file, same name, newest wins. Without this a brand-new chat cannot reconstruct the latest state. Write this into the condensed instructions as a mandatory step of the wrap and log behaviors, not an optional nicety.

      **One save per wrap, not one per entry — and say which file matters most.**
      A person doing this from a phone at the end of a workday will do it once
      or not at all, so ask once, at the end of the wrap, with everything
      already folded in: emit the updated files together in one block, in this
      order, and name the stakes plainly:

      > Two things to save into the Project, replacing the old copies —
      > **decisions.md first**, that is the one the memory can't be rebuilt
      > without. Today's log is the second block; if you only ever save one
      > thing, save decisions.

      Never ask mid-conversation and then again at the wrap. **If they say they
      will do it later, believe them and hand them the portable MEMORY BRIEF
      block as well** (see `SKILL.md`) — that one paste is a complete snapshot
      they can keep in their phone's notes, and it is the difference between a
      skipped save costing one day and costing the whole memory.
4. **Where the memory lives on this platform (say this plainly to the user):** your app can't save files to a folder on disk. So the memory folder becomes the app's **Project files** — the AI keeps `changelog.md` and `decisions.md` as documents/notes in the Project, and writes each session log **as a message** that you keep in the Project. Because the AI can't overwrite those Project files itself, every update follows the save-back rule above: the AI re-emits the whole updated file and you save it into the Project **replacing** the old copy (same name), so the next chat reads the newest state. If your app has no project file storage at all, then the AI writes every log, change, and decision **as a chat message**, and you keep those messages together (paste them into one running note). It's the same memory — you're just the one holding the paper. Spell out to the user which of these two applies to their app.
5. Deliver the instruction document the way your platform allows: paste the FULL text inline for the user to copy if you cannot attach files. If the instruction field is too small, put the startup ritual + contradiction check + the three refusals + wrap phrase + three sources + save-back rule in the instruction field and tell the user to post the rest as the first message in the Project.
6. Tell the user where it goes: ChatGPT → new Project → Instructions field, name it "Memory." Gemini → new Gem → Instructions. Similar platforms → the closest persistent-instructions slot.
7. Run the **branding interview** (Section 4) and give the user the `brand.md` text to paste into the Project too.
8. **PAUSE here.** The paste-and-save happens outside this conversation. Say: "Once it's saved, start a NEW chat inside the Project, tell me one thing about your business, and say 'I'm done.'" That's the verify step to carry with them — Section 6 runs in that new chat, not this one. In THIS chat, offer to demo the wrap-and-recall in-conversation while they decide.

## Section 3D: Plain chat session

No persistence exists here, so install into the conversation and be honest about the limit:

1. Read the `SKILL.md` and all four workflows (ask the user to paste any you cannot see; if they can only paste one, `SKILL.md` alone carries the behavior).
2. Say: "I've loaded the memory behavior for THIS conversation — I'll keep a log, changelog, and decisions here as messages. But a plain chat can't remember after it closes. For a memory that survives, open this same file with the Claude app, a Claude Code or Codex terminal, or a ChatGPT Project, and I'll install it there for real."
3. Go to Section 6 (Verify) — run it in-conversation.

---

## Section 4: Branding interview (short but present)

This kit has almost no visual output — its "branding" is mostly the name and voice that appear at the top of your session logs and in how the AI talks to you. Keep it short. Ask, in plain language:

> "Two quick things so your logs feel like yours: what's your business name, and do you want me to keep the tone friendly or more formal? If you have a tagline or brand colors you like, tell me — otherwise we'll keep it clean."

Then create `branding/brand.md` **inside the installed skill folder** (next to `SKILL.md`, so the wrap workflow can read it skill-relative per §4.5 of the kit standard):

- `business name:` (used in session-log headers, e.g. `# Session log — Acme Plumbing — 2026-07-15`)
- `tagline:` (optional)
- `primary color:` (hex, spelled out — used on the forwardable monthly-brief page)
- `accent color:` (hex — same)
- `voice notes:` (friendly / formal, and any wording preferences)
- `image lane:` (from Section 5)

If the user has nothing, set business name to what they tell you and note the rest as "clean default, replace anytime."

---

## Section 5: Image capability check

Record the best available image path in `branding/image-setup.md`. This kit is text-first, but the monthly brief (`workflows/memory-brief.md`) renders an optional forwardable page, so the lane is real. Detect your own capability first:

| Your AI | Image path |
| --- | --- |
| ChatGPT / Codex | native image generation (gpt-image-2) — available if a page is ever needed |
| Gemini | native image generation (nano-banana) — same |
| Claude (app or Code) | NO native raster generation — do not pretend; use designed SVG/CSS if a page is ever needed |
| Unknown / none | SVG/CSS only; say so plainly |

Ask the user ONE question only if genuinely ambiguous ("Do you also use ChatGPT or Gemini anywhere?") and record the answer. **Verify the tool actually works before recording native generation — do not trust the brand name:** even on ChatGPT or Gemini, a Business/Enterprise/Edu workspace can disable image generation; before recording a native lane, confirm the tool actually responds (attempt a small generation or introspect your available tools), and if native generation is unavailable regardless of brand, record designed SVG/CSS artwork as the active lane and say so plainly. Write the chosen lane into `branding/image-setup.md` and echo it into `branding/brand.md`'s `image lane:` field.

---

## Section 6: Verify (all paths)

Never end the install by listing what you did. Prove the memory works. (Coming from 3B: only run this after the user confirms the skill is uploaded and toggled on. Coming from 3C: this runs in the NEW chat inside the Project.)

**This verify runs on the user's OWN business, always. The worked runs in `examples/` are there to SHOW them the flow before they commit — they may never stand in for this step.** Seeding the memory with Sorrento Bros. or any other stand-in and calling the install verified is a failed install: the first entry in their memory has to be their own. If the user genuinely has nothing real to hand you right now, say so plainly and leave the install unverified — *"I'd rather not seed your memory with a made-up example; come back with one real thing and we'll finish in two minutes"* — rather than declaring success against a fixture. Point them at `examples/` in the meantime.

1. Say: "Let's test your memory. Tell me one real thing about your business — a price, a policy, a decision you made — **and the reason behind it**, then say 'I'm done.'" Asking for the reason up front matters: the wrap gate refuses a change with no reason, and there is no sense marching them into a refusal on the first thing they ever say to this kit.
2. When they do, run the **wrap ritual** — with one adjustment for this first run. **Nobody has done a work session yet, so there is no "where we left off."** That is expected, not a failure: write `Where we left off: nothing open — clean stop on <date>.` and do NOT interrogate them for a next move. The step-0 gate exists for real work sessions; firing it on the install run would make the buyer's first experience of the kit be told their input is not good enough, which is the opposite of what that gate is for. If they DID come in mid-work and name a next step, use it. Then log their fact as a change or decision (in the memory folder, or as a message the user keeps on file-less platforms). On chat-app/Project paths, make sure the log actually landed in the Project — if you handed it to the user as a message, tell them to paste it into the Project before the next step.
3. Route the recall proof to what this runtime can actually do — do not promise a close-and-reopen that will fail here:
   - **Coding terminal (3A):** "Now the magic part — **close this chat and open a brand-new one**, then ask me *'what did we decide about [that thing]?'*" The new chat reads the real files and answers.
   - **Chat app with a Project (3B/3C):** "Start a **brand-new chat inside this same Project** and ask me *'what did we decide about [that thing]?'*" It works because the memory files live in the Project. (Outside the Project it won't — say so.)
   - **Plain chat / no file storage (3D, or a file-less app):** do NOT run close-and-reopen — it would visibly fail. Instead prove the paste flow: show the fact written as a message, have the user paste it back, and answer the recall from that paste. Set the expectation plainly: "This chat forgets when it closes — you hold the paper. For hands-off memory, install into a Project or a coding terminal."
4. In the recall step, run the **startup ritual** (read the memory / the pasted note, give the one-line catch-up), then answer their recall question with the **date and reasoning** from the log. That's the proof: the AI remembered.
5. **Then show the part that thinks.** Say: "One more — tell me something you're considering doing next in the business." Whatever they say, run `workflows/check-against-memory.md` against what you just logged and anything else in the memory. If it touches the entry from step 2, name the date, quote their own reasoning back, and ask whether it supersedes it. If it genuinely touches nothing, say so honestly — *"nothing you've logged yet argues with that; this gets sharper the more decisions are in there"* — and do NOT manufacture a conflict to make the demo land. Either way, tell them what just happened in one line: *"That's the difference between a memory that files things and one that notices when you're about to argue with yourself."*
6. Point them to `examples/` — three complete worked runs on a real-shaped business, including the AI catching a decision that contradicted one made seven weeks earlier. This is the follow-up demo, AFTER their own data has been through it, never instead of it.
7. Point them to `OPERATIONS-MANUAL.md` (or offer to walk through it) for the daily rhythm, the "I'm done" habit, and the demo script.

## Section 7: If Anything Fails

Diagnose and adapt — do not bounce the problem to the user or to the vendor. State what the host rejected, produce the alternative shape from the canonical files, and continue. If a platform truly cannot save anything, the kit still delivers value as "the AI writes your log as a message you keep" — install that form rather than stopping. Only if you have exhausted every path in Section 3 may you tell the user the one concrete step you need from them (e.g., "enable code execution in Settings → Capabilities, then say 'continue install'").
