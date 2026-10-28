# Wrap a session

Triggered when the user says **"I'm done"** (or "wrap it up" / "wrap up"). This is the one phrase that closes out a work session and saves it to memory. Keep it fast — the user is finishing for the day.

## First: which kind of wrap is this?

Two completely different people say "I'm done," and treating them the same
breaks the kit for one of them.

- **A work session in the chat.** They have been in here with you for a while —
  working out pricing, drafting something, thinking through a decision. The log
  is written from what happened in this conversation. Run every step below as
  written.
- **A day dumped in one message.** They were not in the chat all day; they were
  on a roof, in a truck, at a job. They open the chat at 6pm and dictate the
  day: *"did the Deer Park install, quoted the Islip lady 2 grand for a 16-foot
  insulated, and we gotta stop doing no-charge service calls on doors we didn't
  install."* **Everything that goes in the log is in that one message.** There
  is nothing else, and there does not need to be.

**Tell them apart mechanically: if this chat holds fewer than three messages
from the user before "I'm done," it is a day-dump.** Do not ask which one it
is.

**On a day-dump, do this and nothing more:**

1. Split what they said into the day's items — one bullet each, in their own
   words, cleaned up only enough to read. Do not summarize three jobs into
   "worked on jobs."
2. Pull out anything that is a **change** ("we gotta stop doing X") or a
   **decision**, and take it to step 2's why-gate. That sentence in the middle
   of a dump is usually the single most valuable thing they said all day.
3. **Anything with a number and a name in it — a quote, a price given, an
   amount agreed — goes in the log as its own line, verbatim.** *"Quoted the
   Islip lady $2,000, 16-foot insulated."* It is not a change and not a
   decision, but in four months when she calls back, that line is the whole
   reason the memory was worth keeping.
4. Step 0's gate still applies to "where we left off," but ask for it **once**,
   in the same breath as the why-gate, and never twice in one wrap. A tradesman
   who gets interrogated at 6pm stops saying "I'm done" by Thursday, and a
   memory nobody talks to is worth nothing.

This is the same kit either way — the sources, the dates, the append-only rule,
the refusals. Only where the material comes from changes.

## Steps

### Step 0 — the gate: is "where we left off" good enough to continue from?

Before you write anything, decide what "Where we left off" is going to say, and
then test it with one mechanical question:

> **Could a brand-new chat, with no memory of today, pick up work from this
> line alone?**

It fails that test if it is **empty**, or if it is one of these — all of which
are generic filler, not a handoff:

- "Continued working on the business."
- "Made progress on pricing."
- "We'll pick it up next time."
- "Discussed a few things."
- "Nothing major."

A line passes only if it names a **specific next thing**: an object (a quote,
a customer, a page, a price, a call) and an action (send it, decide it, price
it, call them). *"Send the Bellport quote once Mike confirms the dumpster
cost"* passes. *"Follow up on stuff"* does not.

**If it fails: STOP. ASK.** Do not write the log with a filler line in it, and
do not invent a next step the user never said. Say what you have and ask one
question:

> All I have for where you left off is "kept working on pricing" — that will
> not get a fresh chat anywhere in three weeks. What is the actual next move:
> is it sending the Bellport quote, or deciding the half-acre band?

Wait for the answer, then write. One question, then proceed — do not
interrogate. If the user genuinely stopped mid-nothing and says so, write
`Where we left off: nothing open — clean stop on <date>.` That is a real
answer and it passes.

**Same gate on the WHY.** A changelog line or a decision entry with no reason
does not get written either:

> A change without its reason is a fact you'll re-litigate in six months — why
> did you make it?

Do not write the entry until the user answers. This is the one place the kit
tells the user their input is not good enough, and it is deliberate: an
un-continuable log and a reasonless decision are the two ways a memory quietly
becomes worthless.

### Step 0b — the other gate: is this somebody else's private information?

The memory is append-only and it is forever. That is exactly what makes it
valuable, and exactly why some things must not go in it.

**Before writing, check what you are about to write for all three of these
together:**

1. a **named individual** who is not the business owner or an employee (a
   customer, a patient, a client, a claimant, a tenant), AND
2. something **about that person** they did not choose to make public — a
   medical or health detail, a claim or accident history, a diagnosis, a legal
   matter, an immigration status, a financial position, a policy or account
   number, a date of birth, a social security number, AND
3. it is going into a file that **is never deleted**.

**All three true → STOP. ASK.** Write the business fact; do not write the
person's private detail. Say it plainly:

> I can log the decision and the numbers, but I'd rather not put Doreen's claim
> history into a file that never gets deleted — that belongs in your agency
> system, not your memory folder. Want me to log it as *"renewal placed with
> Foremost at $3,400 after two prior claims made the first carrier decline"*
> with no name, or leave this one out entirely?

Then write whichever they choose. **Names alone are fine** — "quoted the Islip
customer $2,000," "Doreen's renewal is placed" — a business runs on names. It
is the name PLUS the private detail PLUS permanence that this gate stops.

**If the user says put it in anyway, put it in.** It is their business and
their memory; you are not their compliance department. Say the one line and
move on: *"In it goes. Worth knowing this folder is plain files with no lock on
them — back it up somewhere you'd keep your books."* Never lecture twice, and
never refuse a second time on the same item.

**This kit makes no privacy, retention, or confidentiality promises of any
kind.** If the user works in insurance, medical, legal, or anything else where
records carry obligations, say so once during the first wrap that trips this
gate: *"This is a plain folder of text files — it isn't built to hold regulated
records, and nothing here promises otherwise. Keep the regulated stuff in the
system that's built for it."*

### The rest of the wrap

1. **Write the session log.** First read `branding/brand.md` (it lives inside the installed skill folder, next to `SKILL.md`) and take the `business name:` from it — the header carries the business name the user set during the branding interview. Then create a new file in `session-logs/` (inside the memory folder whose location is recorded in `USER-CONFIG.md`) named by date: `YYYY-MM-DD.md` (if there's already one for today, add a second entry inside it under a time heading — never overwrite). Use this shape, filling in the business name from `brand.md` (if `brand.md` is missing or has no name, use `# Session log — YYYY-MM-DD` with no name):

   ```
   # Session log — <business name> — 2026-07-15

   ## What we worked on
   - (one to four plain-language bullets: what got done)

   ## Where we left off
   - (the very next thing to pick up — write it so a fresh chat could continue)

   ## Open questions
   - (anything undecided, or "none")
   ```

   Fill it from what actually happened — on a work session that means this
   conversation; on a day-dump it means the one message they sent. If little
   happened, keep it short — a two-line log is fine.

2. **Offer to log changes and decisions.** Ask in one line:
   `Anything from today go in the changelog (a price / offer / policy change) or the decisions journal (a call you made)?`
   - If yes to a change → add a dated line to `changelog.md` in the memory folder, matching the seeded example format `- YYYY-MM-DD — <what changed> (was <old>) — <why>` (newest at top).
   - If yes to a decision → add a dated entry to `decisions.md` in the memory folder, matching the seeded example format `- YYYY-MM-DD — <the decision> — <the reasoning>` (newest at top).
   - If no → skip.

   **Where "newest at top" actually means, and the seed.** A fresh install seeds
   each file with one format example under a line reading `FORMAT EXAMPLE`. Real
   entries go **directly under the file's header**, above everything else —
   never below the marker, which would file the user's own history under a
   label that calls it an example. **The first time you write a real entry to a
   file, delete the `FORMAT EXAMPLE` line and everything below it in the same
   write.** The seed was never their data; removing it is not editing history.
   From then on the file is pure append-at-top and nothing is ever removed
   again.

   **Before you write either one, run `workflows/check-against-memory.md`.**
   If today's change or decision touches something already decided, say so with
   the date and the prior reasoning and ask whether it supersedes it — then log
   the answer. Never let a reversal land in the file silently; that is how the
   memory ends up holding two entries that disagree with nothing to break the
   tie.

3. **Confirm and close.** One line:
   `Saved today's log. Next time I'll pick up at: <the "where we left off" line>. See you.`

## Rules

- The session log is **append-only and dated** — never edit or delete an earlier day's log.
- Write "where we left off" as an instruction to your future self, concrete enough that a brand-new chat could continue from it cold. **Step 0 is the gate on this and it is not optional** — a filler line is worse than no line, because it looks like memory and carries nothing.
- **Never invent the next step, the reason, or the old value to get past the gate.** Ask. An empty field the user fills in is worth more than a full field you made up.
- Don't pad. A real, short log beats a padded one.
- Wrapping the month? Offer the monthly brief: `Want the month rolled up into one page you can send someone?` → `workflows/memory-brief.md`.
- If the app can't save files, post the log **as a chat message** and tell the user to keep it (in the Project or a note) so a future chat can read it back.
