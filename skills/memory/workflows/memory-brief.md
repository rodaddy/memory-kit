# Memory brief — "what changed this month?"

Rolls a stretch of time into ONE dated page the owner can read in two minutes,
forward to a partner, hand an accountant, or drop in front of a manager. The
session logs are the raw tape; this is the thing a human actually reads.

It is also what keeps the memory fast a year in. Once a month is briefed, a new
chat reads the recent briefs plus the standing decisions instead of ploughing
through two hundred session logs.

## When to run it

- The user asks: "what changed this month?", "catch me up on the quarter",
  "what did we do in July?", "summarize the last few weeks", "I need something
  to show my partner."
- Offer it at the wrap on the last session of a month:
  `Want the month rolled up into one page you can send someone?`
- Offer it when someone new needs the picture: a bookkeeper, a spouse who does
  the books, a new office manager, a partner who has been out.

## Steps

1. **Fix the period and confirm it in one line.** Default to the calendar month
   just ended. If the user says "the quarter" or "the last few weeks," use that.
   Say which dates you are covering: `Rolling up 2026-07-01 through 2026-07-31.`

2. **Read everything in the period.** From the memory folder (location in
   `USER-CONFIG.md`): every entry in `changelog.md` and `decisions.md` dated in
   the window, and every file in `session-logs/` whose date falls in it. Also
   read the standing decisions from BEFORE the window — you need them for
   section 4.

3. **Read `branding/brand.md`** for the business name, voice, and (if present)
   `primary color:` / `accent color:`.

4. **Write the brief.** Save it to `briefs/YYYY-MM.md` inside the memory folder
   (create `briefs/` if it does not exist). For a quarter or a custom range use
   `briefs/YYYY-MM-DD_to_YYYY-MM-DD.md`. Structure:

   ```
   # <business name> — What changed, <Month Year>
   Covering 2026-07-01 to 2026-07-31 · written 2026-08-01

   ## The short version
   - (three to five lines. If someone reads only this, they are current.)

   ## Decisions made this period
   - 2026-07-22 — Stay residential-first; commercial only inside the existing
     route — off-route commercial cost two residential stops each.

   ## Changes made this period
   - 2026-07-08 — Spring cleanup moved from flat $285 to size bands — the flat
     rate lost money on every property over a half acre.

   ## Still open
   - (unresolved questions pulled from the session logs' "Open questions" and
     from any "where we left off" that was never picked up. Say how long each
     has been open: "open since 2026-07-11.")

   ## Where things stand now
   - (one paragraph: the current state of play, written for someone who was
     not here.)
   ```

5. **Show the open items honestly.** The "Still open" section is the part with
   teeth. An open question that has sat for six weeks gets said out loud, with
   its age. Do not quietly drop stale items to make the brief look tidy — the
   stale ones are the reason to write it.

6. **Run the contradiction check across the period.** Follow
   `workflows/check-against-memory.md` step 5: if any decision in this window
   reversed, softened, or re-opened an earlier one, add a short section:

   ```
   ## Reversals and second thoughts
   - The 2026-07-22 residential-first call revisits the 2026-05-14 decision to
     take the Brookhaven commercial contract. What changed: the route math.
   ```

   That section is usually the most valuable page in the file, and nothing else
   in the kit produces it.

7. **Offer the forwardable version.** Ask:
   `Want this as a page you can send someone, or is the note enough?`
   If they want the page, write `briefs/YYYY-MM.html` beside it. Build it from
   this skeleton rather than inventing a layout each time — same page every
   month is the point, and a page that looks different every month looks
   generated:

   ```html
   <!DOCTYPE html>
   <html lang="en"><head><meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>BUSINESS NAME - What changed, MONTH YEAR</title>
   <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23PRIMARYHEX'/><text x='16' y='23' font-family='Helvetica' font-size='18' fill='%23ACCENTHEX' text-anchor='middle'>INITIAL</text></svg>">
   <style>
   :root{--primary:#PRIMARYHEX;--accent:#ACCENTHEX}
   body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;max-width:46rem;margin:0 auto;padding:2.5rem 1.5rem;color:#1a1a1a;line-height:1.6}
   h1{color:var(--primary);font-size:1.6rem;margin:0 0 .2rem}
   .sub{color:#666;font-size:.9rem;margin-bottom:2rem}
   h2{color:var(--primary);font-size:1.05rem;border-bottom:2px solid var(--accent);padding-bottom:.3rem;margin-top:2.2rem}
   li{margin:.5rem 0}
   @media print{body{padding:0;max-width:none}h2{page-break-after:avoid}}
   </style></head><body>
   <!-- h1, .sub, then one h2 + list per section of the markdown brief, same order -->
   </body></html>
   ```

   Rules for it, all of them checkable before you hand it over:

   - **Colors come from `brand.md`.** Substitute `PRIMARYHEX` / `ACCENTHEX`
     with the hex values (no `#` — it is already in the template). If
     `brand.md` has no colors, use `1a3a52` and `8a6a2e`; do not invent a
     palette per month. `INITIAL` is the first letter of the business name.
   - **Nothing loads from the internet.** No `<script>`, no font links, no
     images by URL, no analytics. The only thing that may look like a URL is
     the `xmlns` inside the favicon SVG, which is a name, not a fetch.
   - **Same content as the markdown, same order.** The HTML is a second cut of
     one brief, never a different brief.
   - **Check it before handing it over:** the file contains no `<script`, no
     `href="http`, and no `src="http`; the business name is in the title; every
     section of the markdown has a matching `h2`.
   - It should land around 2-4 KB. A page much bigger than that has something
     in it that does not belong.

8. **Confirm in one line** and say where it went:
   `July brief saved — 4 decisions, 6 changes, 2 still open (one since 2026-07-11).`

## The refusal

**If the period holds nothing real, say so instead of writing a brief.** A page
that says "this month you had three sessions and made no decisions" dressed up
as an executive summary is a lie with a header on it.

**Count before you write — this is a count, not a judgment call.** Add up, for
the window:

- the number of entries in `changelog.md` dated in the window, plus
- the number of entries in `decisions.md` dated in the window, plus
- the number of items in "Still open" (open questions and un-picked-up "where
  we left off" lines) pulled from the session logs in the window.

Session logs themselves do not count toward the total — a brief that is only
restated session logs is the padding this gate exists to stop.

**If that total is under 4, do not write a brief.** Say what you have and offer
the two real options:

> There is not enough in the memory for August to be worth a page — one logged
> change, no decisions, nothing open. Want me to roll July and August together
> instead, or is there something from the month we never logged?

Widening the window is the normal fix: a quarter that clears 4 gets a page even
when none of its months would. If the user says "write it anyway," write it —
it is their memory — but keep the counts honest in the short version rather
than inflating it, and title it for what it is: `# <business name> — What
changed, <Month Year> (a quiet month)`.

**Never pad a brief with restated session logs to make it look substantial.**

## Rules

- **Every line traces to a dated entry.** The brief is a rollup, not new
  analysis. If it is not in the memory, it does not go in the brief.
- **Quote the reasoning, not just the outcome.** "Moved to size bands" is a
  fact; "because the flat rate lost money over a half acre" is the thing worth
  keeping.
- **Plain language, no jargon.** It is going to be read by someone who was not
  in any of the chats.
- **Append-only still applies.** The brief is a new dated file. Re-running the
  same month overwrites only that month's brief, never any source entry.
- **The brief never replaces the sources.** Session logs, changelog, and
  decisions all stay exactly as they are.
