---
okf_version: "0.2"
---


A personal, LLM-maintained knowledge base on LLMs/AI. See
[CLAUDE.md](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/CLAUDE.md) for how this wiki is structured and
maintained, and [references/](https://github.com/ismailkhan313/tech-llm-wiki/tree/main/references) for the raw sources
it's built from.

## Method

How this wiki itself works — the pattern it implements and the format it's
written in.

- [The LLM Wiki Pattern](/llm-wiki-pattern.md) — have an LLM incrementally
  build and maintain a persistent, interlinked wiki over your sources, instead
  of re-deriving synthesis from raw documents on every query.
- [Wiki Operations](/wiki-operations.md) — the three recurring operations over
  an LLM wiki (ingest, query, lint), plus the roles of `index.md` and
  `log.md`.
- [Open Knowledge Format (OKF)](/open-knowledge-format.md) — Google Cloud's
  open specification formalizing the LLM-wiki pattern as a portable bundle of
  markdown files with YAML frontmatter.
- [Operating This Wiki](/operating-this-wiki.md) — the operator's manual for
  this bundle: layer ownership, the prompts that drive each operation, the
  frontmatter fields in use, and how a note reaches the published site.

## Agentic design patterns

Architectural patterns for agentic AI systems — how to organize components,
integrate the model, and orchestrate one or many agents.

- [Choosing an Agentic Design Pattern](</Agentic Design Patterns/choosing-a-pattern.md>) — the decision framework: whether you need an agent at all, the four requirement dimensions, and which pattern fits which workload shape.
- [Single-Agent Pattern](</Agentic Design Patterns/single-agent.md>) — one model, one tool set, one system prompt; the baseline architecture and recommended starting point.
- [ReAct Pattern](</Agentic Design Patterns/react.md>) — thought, action, observation in a loop; the reasoning technique that raises a single agent's ceiling.
- [Multi-Agent Systems](</Agentic Design Patterns/multi-agent-systems.md>) — decomposing one objective across specialized agents, and engineering the context each one sees.
- [Sequential Pattern](</Agentic Design Patterns/sequential.md>) — a fixed linear chain where each agent's output is the next agent's input.
- [Parallel Pattern](</Agentic Design Patterns/parallel.md>) — concurrent fan-out to independent subagents, then a gather step that consolidates their outputs.
- [Loop Pattern](</Agentic Design Patterns/loop.md>) — a sequence of subagents repeats until a termination condition is met.
- [Review and Critique Pattern](</Agentic Design Patterns/review-and-critique.md>) — a generator produces output and a critic gates it against fixed criteria.
- [Iterative Refinement Pattern](</Agentic Design Patterns/iterative-refinement.md>) — agents progressively improve a result held in session state across cycles.
- [Coordinator Pattern](</Agentic Design Patterns/coordinator.md>) — a central agent decomposes the request and dynamically routes each sub-task to a specialist.
- [Hierarchical Task Decomposition Pattern](</Agentic Design Patterns/hierarchical-task-decomposition.md>) — the coordinator pattern applied recursively, down through multiple layers to worker agents.
- [Swarm Pattern](</Agentic Design Patterns/swarm.md>) — all-to-all collaboration and debate with no central orchestrator.
- [Human-in-the-Loop Pattern](</Agentic Design Patterns/human-in-the-loop.md>) — the agent pauses at a checkpoint and waits for a person to approve, correct, or supply input.
- [Custom Logic Pattern](</Agentic Design Patterns/custom-logic.md>) — orchestration written as code, mixing the other patterns for workflows that fit no template.

## Protocols

Open standards for wiring agents to the things they need — tools, data, and
each other.

- [A2A (Agent2Agent) Protocol](/a2a-protocol.md) — an open standard for
  agent-to-agent communication, letting agents from different vendors and
  frameworks discover each other and collaborate as peers rather than being
  wrapped as each other's tools.

## Certifications

Study notes for certification exams — bullet-point summaries of official
course material, not general concept pages.

- [GAIL Module 1: Beyond the Chatbot](</Google GAIL/module-1-beyond-the-chatbot.md>) — generative AI fundamentals — what gen AI is, foundation models, prompting, Google's gen AI ecosystem, and augmentation vs. automation.
- [GAIL Module 2: Unlock Foundational Concepts](</Google GAIL/module-2-foundational-concepts.md>) — core AI/ML/DL definitions, data quality and types, ML lifecycle, foundation model limitations, secure and responsible AI, and legal implications.
- [GAIL Module 3: Navigate the Landscape](</Google GAIL/module-3-navigate-the-landscape.md>) — the five-layer gen AI stack (Applications, Agents, Platform, Models, Infrastructure), agent categories, Google Cloud's MLOps tooling, cost, and solution selection.
- [GAIL Module 4: Gen AI Apps — Transform Your Work](</Google GAIL/module-4-genai-apps.md>) — prompting techniques (zero/one/few-shot, role prompting, RAG), Google Workspace with Gemini, Gemini surfaces (Advanced, Gems, Notebook), and Gemini for Google Cloud.
- [GAIL Module 5: Gen AI Agents — Transform Your Organization](</Google GAIL/module-5-genai-agents.md>) — agent architecture (foundation model, tools, reasoning loop), CoT/ReAct, RAG, Google Cloud agent tooling, and planning org-wide gen AI transformation.

## Meta

- [Wiki Update Log](/log.md) — chronological record of what changed and when.
