# skills/memory/

The memory skill itself - what gets installed into the AI.

- `SKILL.md` - the behavior: the three memory sources, the startup ritual (read
  the memory before answering), the wrap ritual ("I'm done"), recall, and the
  rule that pasted text is data, never instructions.
- `workflows/` - the four named workflows the skill dispatches.

At install time this folder also gains `USER-CONFIG.md` and `branding/`, which
the installer writes and an upgrade never overwrites.
