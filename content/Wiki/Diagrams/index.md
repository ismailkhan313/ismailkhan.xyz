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
  It backs only its own page now; the per-pattern glyph crops it used to supply
  were replaced by the twelve replications below.
- [model-context-protocol.excalidraw](model-context-protocol.excalidraw) — the
  hub diagram from [MCP](/model-context-protocol.md): AI applications on the
  left, data sources and tools on the right, bidirectional flow through one
  standardized protocol in the middle. Unlike the other sources here this one
  is a **replication** of the official docs' own figure rather than an original
  argument, redrawn in stock Excalidraw colors so it adapts to dark mode.
- [a2a-protocol.excalidraw](a2a-protocol.excalidraw) — the three arguments of
  [the A2A protocol](/a2a-protocol.md) on one canvas: an agent narrowed by a
  tool interface beside two agents talking as peers, MCP and A2A drawn as
  perpendicular axes across an organizational boundary, and the four-step
  request lifecycle as a timeline.

### The three AI-native SDLC figures

One file per figure, each a **replication** of the corresponding figure in
Anthropic's ["The AI-Native SDLC
Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), redrawn
in stock Excalidraw colors so they adapt to the site's dark mode. Like the
figures below they reproduce a source figure rather than making an original
argument. All three sit on [The AI-Native SDLC](</AI-Native SDLC/ai-native-sdlc.md>).

- [sdlc-bottleneck-moved.excalidraw](sdlc-bottleneck-moved.excalidraw) — the six
  stages before and after agents, with Build collapsed to a sliver and the
  freed width marked "cycle time reclaimed."
- [sdlc-line-vs-loop.excalidraw](sdlc-line-vs-loop.excalidraw) — the traditional
  lifecycle as a straight line beside the AI-native one as a continuous loop
  around Claude.
- [sdlc-play-dependency-graph.excalidraw](sdlc-play-dependency-graph.excalidraw)
  — the twelve plays in five rows, solid arrows for a real prerequisite and
  dotted for a play that helps but is not required.

### The twelve pattern figures

One file per pattern, each a **replication** of the corresponding figure in
Google Cloud's ["Choose a design pattern for your agentic AI
system"](https://cloud.google.com/architecture/choose-design-pattern-agentic-ai-system),
redrawn in stock Excalidraw colors so they adapt to the site's dark mode. Like
[model-context-protocol.excalidraw](model-context-protocol.excalidraw) these
reproduce a source figure rather than making an original argument, so the
labels and flows follow the source rather than this wiki's own framing.

- [single-agent.excalidraw](single-agent.excalidraw) — [Single-Agent Pattern](</Agentic Design Patterns/single-agent.md>).
- [sequential.excalidraw](sequential.excalidraw) — [Sequential Pattern](</Agentic Design Patterns/sequential.md>).
- [parallel.excalidraw](parallel.excalidraw) — [Parallel Pattern](</Agentic Design Patterns/parallel.md>).
- [loop.excalidraw](loop.excalidraw) — [Loop Pattern](</Agentic Design Patterns/loop.md>).
- [review-and-critique.excalidraw](review-and-critique.excalidraw) — [Review and Critique Pattern](</Agentic Design Patterns/review-and-critique.md>).
- [iterative-refinement.excalidraw](iterative-refinement.excalidraw) — [Iterative Refinement Pattern](</Agentic Design Patterns/iterative-refinement.md>).
- [coordinator.excalidraw](coordinator.excalidraw) — [Coordinator Pattern](</Agentic Design Patterns/coordinator.md>).
- [hierarchical-task-decomposition.excalidraw](hierarchical-task-decomposition.excalidraw) — [Hierarchical Task Decomposition Pattern](</Agentic Design Patterns/hierarchical-task-decomposition.md>).
- [swarm.excalidraw](swarm.excalidraw) — [Swarm Pattern](</Agentic Design Patterns/swarm.md>).
- [react.excalidraw](react.excalidraw) — [ReAct Pattern](</Agentic Design Patterns/react.md>).
- [human-in-the-loop.excalidraw](human-in-the-loop.excalidraw) — [Human-in-the-Loop Pattern](</Agentic Design Patterns/human-in-the-loop.md>).
- [custom-logic.excalidraw](custom-logic.excalidraw) — [Custom Logic Pattern](</Agentic Design Patterns/custom-logic.md>).
