# Recall — "what did we decide about X?"

Triggered when the user asks what they decided, changed, or worked on before. Example phrasings: "what did we decide about pricing?", "when did I raise the price?", "what were we working on last Tuesday?", "did we ever settle on the refund policy?", "what changed this month?"

This is the payoff of the whole kit — the moment the AI answers a question about the past that it would normally have no way to know.

## Steps

1. **Search all three memory sources** for the topic (all inside the memory folder — read its location from `USER-CONFIG.md` next to `SKILL.md`):
   - `decisions.md` — for "what did we decide…"
   - `changelog.md` — for "when did I change / what changed…"
   - `session-logs/` — for "what were we working on…" (scan by date; the filenames are dates)

2. **Answer with the date and the reasoning.** Don't just say what — say *when* and *why*, and quote the actual log entry so the user trusts it. For example:

   > On 2026-07-08 you decided to raise the monthly plan from $59 to $79. Your reasoning at the time: "onboarding load is the same at either price and the $59 tier was attracting refund-heavy customers." It's logged in your decisions journal.

3. **If it's not in the memory, say so — never guess.**
   `I don't have that in the memory — it may be from before we started logging, or it wasn't recorded. Want me to add it now?`

4. **If several entries match** (the topic came up more than once), give them in date order, newest first, so the user sees how the thinking evolved.

## Rules

- **Never fabricate a date or a decision.** If the memory doesn't say it, you don't know it.
- **Always cite the date** — "when did I…" is the whole reason this exists.
- Quote the recorded entry rather than paraphrasing when the exact wording matters (prices, dates, policy).
- If the user's question reveals a decision or change that *should* have been logged but wasn't, offer to log it now.
