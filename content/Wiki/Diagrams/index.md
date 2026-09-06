# Diagrams

Raw [Excalidraw](https://excalidraw.com) sources for the interactive
diagrams embedded in wiki notes — nothing else lives here. Each file's
rendered PNG lives in `_attachments/`, embedded directly in the concept
page it illustrates; this folder holds only the editable `.excalidraw`
source, linked from that page through a `[!diagram]` callout so the
image opens the pan-and-zoom version.

Not a concept catalog like the root `index.md` — a diagram isn't a
concept in its own right, it argues one visually. Each entry below
points back to the note it belongs to.

## Sources

- [llm-wiki-pattern.excalidraw](llm-wiki-pattern.excalidraw) — the
  retrieval-only-vs-wiki-compilation argument from
  [The LLM Wiki Pattern](/llm-wiki-pattern.md).
- [choosing-a-pattern.excalidraw](choosing-a-pattern.excalidraw) — all twelve
  agent design patterns mapped along the who-decides-what-runs-next axis, each
  drawn as the shape of its own architecture, from
  [Choosing an Agentic Design Pattern](</Agentic Design Patterns/choosing-a-pattern.md>).
  Each pattern's glyph is also exported on its own to
  `_attachments/<pattern>.jpg` and embedded in that pattern's page, so this one
  source backs all thirteen images — re-export the crops if you edit it.
- [a2a-protocol.excalidraw](a2a-protocol.excalidraw) — the three arguments of
  [the A2A protocol](/a2a-protocol.md) on one canvas: an agent narrowed by a
  tool interface beside two agents talking as peers, MCP and A2A drawn as
  perpendicular axes across an organizational boundary, and the four-step
  request lifecycle as a timeline.
