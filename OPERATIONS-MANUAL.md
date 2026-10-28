# Memory Kit — Operations Manual

Plain-language guide to running your AI's memory. No jargon. If you can send a text message, you can run this.

---

## What you got

Your AI forgets everything the moment a chat closes. Ask it tomorrow what you decided today and it has no idea. This kit fixes that by keeping a small **memory folder** the AI reads at the start of every chat and writes to at the end.

Inside the memory folder are three things:

- **Session logs** — one dated note per work session: what you did and where you left off.
- **Changelog** — every change in your business: a price change, a new offer, a policy call. Date, what changed, and why.
- **Decisions** — the calls you've made, with the date and the reasoning, so later you (and the AI) know *why*, not just *what*.

Three plain files, always dated, only ever added to.

And then the part that makes it more than a filing cabinet: **the AI checks new
ideas against decisions you already made.** Tell it you're thinking about
something, and if it argues with a call you made seven weeks ago, it says so —
with the date and your own reasoning — before you act on it. That is the piece
your plain ChatGPT will never do, because it does not know what you decided.

## See it work before you use it

Open the **`examples/`** folder. Three complete runs on a real-shaped Long
Island landscaping business, start to finish — what went in, exactly what came
out. Example 2 is the one to read: the owner asks about a 40-unit HOA job and
the AI catches that it's the same call he made and regretted in the spring.

Your own setup ran on your own business, not on those examples. They're there
so you can see the shape of it.

---

## The daily rhythm

**1. Start of a chat — the AI catches itself up.**
When you open a new chat, the AI reads the memory first and gives you a one-line catch-up, like: *"Caught up — last time you were finishing the pricing page, and last week you decided to raise the monthly plan to $79. What are we on today?"* You don't have to do anything. If it doesn't do this, just say "catch up from memory."

**2. During the chat — log changes and decisions as they happen.**
Any time you change something (a price, an offer, a policy) or make a decision, the AI logs it with today's date and the reason. You can also just say "log this" or "remember this." It'll confirm in one line.

**3. Any time you're thinking about a change — it checks you against yourself.**
Say you're considering a new price, a new kind of customer, a different territory, a hire. Before it helps you plan it, the AI looks at what you already decided. If today's idea argues with a call you made in July, it tells you — the date, what you said at the time, and the plain overlap — then asks the one question that matters: *is this a change to that decision, or an exception to it?*

> It never overrules you. It's your business and your call. It just refuses to let you quietly reverse yourself and find out in six months.

**4. End of the day — say the magic phrase.**
When you're finished, say **"I'm done."** That one phrase is the whole wrap-up. The AI writes today's session log — what you did, where you left off — and asks if anything should go in the changelog or decisions. Say yes or no. Done.

> The wrap phrase is **one thing to remember: "I'm done."** ("Wrap it up" works too.) You never have to remember file names or steps.

**If you were not in the chat all day, that's fine — dump it in one message.**
Plenty of people never open the chat until the truck is parked. Open it at 6pm
and say the day out loud: *"did the Deer Park install, quoted the Islip lady
$2,000 for a 16-foot insulated, and we gotta stop doing no-charge service calls
on doors we didn't install."* Then "I'm done." That one message is the whole
session as far as the kit is concerned — it splits out the jobs, catches the
"we gotta stop doing X" as a decision and asks you why, and keeps the quote
with the number and the name on it. Four months later when that Islip customer
calls back, that line is why you know what you told her.

It will ask you at most one question. If it starts asking two, tell it to just
log what you said.

**5. End of the month — get the page you can send.**
Ask **"what changed this month?"** and the AI rolls the whole month — changes, decisions, what's still open, anything you reversed — into one dated page. Ask for it as a page and you get a file you can double-click, read, and email to a partner, a bookkeeper, or whoever needs catching up. No internet needed, prints clean.

## When it tells you no

This is deliberate, and it's the difference between a memory you trust and one you don't. There are exactly three places it pushes back:

0. **Somebody else's private business doesn't go in a file that's never deleted.** Names are fine — "quoted the Islip customer $2,000" is exactly what this is for. But a customer's name attached to their claim history, a health detail, a legal matter, or an account number is a different thing, and it'll offer to log the business fact without the private part. Tell it to put it in anyway and it will, once, without arguing. Worth knowing: **this is a plain folder of text files with no lock on it.** It is not built to hold regulated records — if you're in insurance, medical, or legal, keep that material in the system that's built for it and use this for how you run the business.

1. **A vague "where we left off" doesn't get saved.** If all you give it is "kept working on pricing," it stops and asks what the actual next move is — because that line is the only thing a fresh chat has to go on in three weeks, and "kept working on pricing" gets it nowhere. Give it the real next thing and it writes.
2. **A change with no reason doesn't get saved.** It'll ask: *"A change without its reason is a fact you'll re-litigate in six months — why did you make it?"* Answer it and it logs.

Both take you ten seconds and save you an argument with yourself next spring. It will never make up the missing piece to get past you.

---

## The demo that sells it

The demo is the same idea everywhere — tell your AI a fact, come back in a fresh conversation, watch it remember — but HOW you run it depends on where your memory lives. Your setup told you which of these you are; run the matching one so it works the first time in front of you (or a friend).

**If your AI is a coding terminal (Claude Code / Codex) — the full magic moment:**

1. In a chat, tell the AI a real fact — *"I'm raising my monthly plan from $59 to $79 because the cheap tier attracts refund-heavy customers."* Then say **"I'm done."**
2. **Close that chat completely. Open a brand-new one.**
3. Ask: **"What did we decide about pricing yesterday?"**

It answers with the date, the new price, the old price, and your exact reasoning — because the memory files are real files on your computer that every new chat reads. That's the thing a plain ChatGPT can't do, working in front of you.

**If your AI is a chat app with a Project (Claude Projects, ChatGPT Projects, Gemini Gems) — same demo, one rule:**

The memory lives in your Project's files, so the new chat has to be started **inside that same Project**. Run it exactly as above, but at step 2 open the new chat **from within the Project** (not a loose chat outside it). Make sure the log/change from step 1 was actually saved into the Project first — if your AI handed you the text as a message, paste it into the Project before you open the new chat. Then step 3 works: the fresh in-Project chat reads the memory and answers.

> **The save-back rule on a Project (this is what keeps it working).** A Project chat can't overwrite its own files, so after every log entry, changelog line, or decision, your AI gives you the WHOLE updated file — the entire `changelog.md`, the entire `decisions.md`, or the whole session log — as one copy-ready block. Save that block into the Project sources **replacing the previous version**: same file name, newest wins. One file, not a growing pile. If you skip this, the next chat reads a stale copy and "it remembered" quietly stops being true. This is a required step, not a nicety.

**If your AI is a plain chat with no Project and can't save files — the demo is the paste:**

There's no "close and reopen and it remembers" here, and don't promise one — a plain chat genuinely forgets when it closes. Instead show the real move: your AI writes the fact as a message, you keep it (paste it into a note), and in a new chat you paste that note back and the AI picks up from it. That's the honest version of the same value: the paper carries the memory, and you're the one holding it. When you're ready for the hands-off version, install into a Project or a coding terminal.

---

## Asking your memory questions (recall)

Any time, in any chat, you can ask:

- "What did we decide about [the refund policy / pricing / the new hire]?"
- "When did I change my prices?"
- "What were we working on last Tuesday?"
- "What changed this month?"

The AI searches the memory and answers with the **date** and the **reasoning**, and shows you the actual entry so you can trust it. If it's not in the memory, it tells you straight — it never makes something up.

---

## The rules that keep it trustworthy

- **Always dated.** Every entry has the date. That's what makes "when did I…" work.
- **Only ever added to.** The AI never rewrites or erases old entries. If something changes, it adds a new dated entry — your history stays intact.
- **Newest first.** The latest change or decision is always at the top, so it's the first thing read.
- **Plain and skimmable.** Logs are written so a human can read them in ten seconds.

---

## If your app can't save files

Some chat apps (plain ChatGPT without a Project, some mobile apps) can't keep files. Your memory kit still works — the AI writes your session log, your changelog line, or your decision **as a message right in the chat**, and you keep those messages together (paste them into your Project, or one running note on your phone). Same memory; you're just the one holding onto it. Your setup told you which mode you're in. The best home is a **Project** (ChatGPT Projects, Claude Projects, Gemini Gems) — the files live there and every new chat in that Project can read them.

---

## Taking your memory with you

Say **"give me everything you know"** (or "how do I take this with me?") and the AI hands you one block of text — your standing decisions, your recent changes, where you left off, what's still open. Paste that at the top of a chat with **any** AI, on any device, and it knows where you stand.

That's on purpose. This is your paper, not something you're locked into. If you switch AIs next year, you carry your memory across in one paste.

## Keeping it healthy

- **Back it up.** The memory folder is just files — copy it to your cloud drive now and then. It's your business's memory; treat it like your books.
- **Say "I'm done" even on light days.** A two-line log still tells tomorrow-you where you stopped.
- **Trust but verify.** Once in a while, ask a recall question you know the answer to. If it's right, your memory is healthy.

---

## Quick reference

| You want to… | Say… |
| --- | --- |
| Get caught up | (nothing — it's automatic) or "catch up from memory" |
| Log a change or decision | "log this" / "remember this" / just make the change and it'll ask |
| Check an idea against past calls | (nothing — it's automatic) or "does this conflict with anything?" |
| End the session | **"I'm done."** |
| Look something up | "what did we decide about ___?" / "when did I ___?" |
| Roll up the month | "what changed this month?" / "catch me up on the quarter" |
| Carry it to another AI | "give me everything you know" |
