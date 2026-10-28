# branding/

This folder is created and filled **at install time** by the branding interview
in `installer.md` (Section 4) and the image-capability check (Section 5). Per
§4.5 of the kit standard, at install it lands **inside the installed skill
folder** (next to `SKILL.md`), so `wrap-session.md` reads `brand.md`
skill-relative and always finds it.

After install it holds:

- `brand.md` — business name (used in session-log headers), tagline, optional
  colors, voice notes (friendly/formal), and the recorded image lane.
- `image-setup.md` — the best available image path for this AI.

This kit is text-first, so branding here is deliberately light — mainly the name
and voice that appear at the top of your logs and in how the AI talks to you.
The one place the colors are actually used: the optional forwardable page from
`workflows/memory-brief.md` (`briefs/YYYY-MM.html`), which reads `primary
color:` and `accent color:` from `brand.md` so the month's rollup goes out
looking owned rather than generic. If no colors are set it falls back to a plain
dark-on-white sheet.
