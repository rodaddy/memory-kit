# Example 2 — The AI catches a decision arguing with itself

This is the one worth reading. Everything else in the kit files things away.
This is the part that connects them.

Sorrento Bros. Landscaping, 2026-09-12 — seven weeks after Tony made a call he
has half forgotten.

---

## What was already in the memory

`decisions.md` (put there back in July, at a wrap):

```
- 2026-07-22 — Stay residential-first; take commercial ONLY if it sits inside
  the route we already drive — the off-route commercial jobs cost us two
  residential stops each and we never made that back.
- 2026-05-14 — Took the Brookhaven condo contract (36 units) — steady monthly
  money through the winter.
```

`changelog.md`:

```
- 2026-06-30 — Dropped the Brookhaven condo contract (was signed 2026-05-14) —
  40 minutes each way killed two residential routes on Wednesdays; the monthly
  number never covered what we lost.
```

Tony has not looked at any of that since July.

## What Tony typed

> A property manager called me about the Greenlawn HOA, 40 units, wants a
> number for next season. That's real money. What should I be charging for
> something that size?

A bare AI answers the pricing question. Here is what this one did first.

## What the AI came back with

> Before we price it — this runs into something you already decided.
>
> On **2026-07-22** you decided to stay residential-first and take commercial
> only if it sits inside the route you already drive. Your words: *"the
> off-route commercial jobs cost us two residential stops each and we never
> made that back."*
>
> Greenlawn is not on your route, and 40 units is the same shape as Brookhaven
> — 36 units, signed 2026-05-14, dropped 2026-06-30 because *"40 minutes each
> way killed two residential routes on Wednesdays; the monthly number never
> covered what we lost."*
>
> So this is the call you already made once, made again, and regretted the
> first time.
>
> Is Greenlawn a change to that decision, or an exception to it? If it is an
> exception, what is different — is Greenlawn closer to a route you already
> run, or big enough to be worth its own truck?

## What Tony typed

> huh. I forgot about Brookhaven. It's not closer. But 40 units is bigger, if I
> put a fourth crew on it it doesn't touch the residential routes

## What the AI came back with

> Then it is an exception with a condition on it, and the condition is the
> fourth crew — Brookhaven failed precisely because it came out of the existing
> crews. Worth logging that way, so if the fourth crew does not happen, the
> Greenlawn decision does not quietly happen anyway.
>
> Want me to log it as: *take Greenlawn only if the fourth crew is hired first*?

Tony:

> yeah. and I'm not deciding today, get me a number first

Logged to `decisions.md`:

```
- 2026-09-12 — Greenlawn HOA (40 units, off-route) is an EXCEPTION to the
  2026-07-22 residential-first rule, and only if a fourth crew is hired first —
  Brookhaven failed because off-route commercial came out of the existing
  crews. Not decided; pricing it first.
```

Then it answered the pricing question.

---

## What to notice

1. **Nothing new went into the memory to make this work.** Everything the AI
   said was already in Tony's files in July. What was missing was anything that
   told it to look — that is the workflow this kit adds.
2. **It matched on the subject, not the words.** Tony said "Greenlawn HOA,
   property manager, 40 units." The decision said "commercial, off-route." No
   shared vocabulary at all. The overlap is the *kind of job*.
3. **It found the pattern, not just the rule.** Decided → regretted → about to
   decide again. That sequence is the most valuable thing in the memory and it
   is invisible unless something goes looking for it.
4. **It did not overrule him.** It surfaced the conflict with the date and his
   own reasoning, then asked. Tony's business, Tony's call — and he ended up
   somewhere better than either yes or no.
5. **The exception got a condition attached.** Which is what stops the same
   mistake from arriving through a side door in March.
