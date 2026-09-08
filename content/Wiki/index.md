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

## Practices

How to actually work with these models — the disciplines, not the
architectures.

- [Context Engineering](/context-engineering.md) — curating and maintaining the
  optimal set of tokens an LLM sees during inference; the discipline that
  supersedes prompt engineering once you move from one-shot prompts to agents
  running in a loop.
- [Prompt Engineering](/prompt-engineering.md) — structuring natural-language
  input to get specified outputs; the techniques catalog, why prompts are
  brittle, and what actually happened to the term.

## Agent skills

Packaging procedural knowledge so an agent loads it only when the task calls
for it.

- [Agent Skills](/agent-skills.md) — folders of procedural knowledge an agent
  loads on demand; the open `SKILL.md` format, the progressive disclosure that
  makes it cheap, and how Claude Code discovers, scopes, and invokes them.
- [Agent Skills Best Practices](/agent-skills-best-practices.md) — how to write
  a skill an agent actually finds and follows: sourcing it from real expertise,
  spending context sparingly, calibrating how prescriptive to be, and iterating
  against evaluations rather than assumptions.

## AI-native SDLC

Anthropic's playbook for rebuilding the software development lifecycle around
agentic coding — twelve plays across six stages, each with its own governance
story and metric.

- [The AI-Native SDLC](</AI-Native SDLC/ai-native-sdlc.md>) — why the bottleneck moved out of the build phase, the six stages as a loop rather than a line, and the committed artifact that carries work between them.
- [Capture as intent.md](</AI-Native SDLC/capture-intent.md>) — the originator brainstorms the idea with Claude and commits it as a version-controlled proto-spec in their own terms.
- [Requirements and Design in One Session](</AI-Native SDLC/requirements-and-design.md>) — Claude turns an approved intent into a spec constrained by the organization's skills, flagging the policy conflicts an analyst would have escalated.
- [Plan Mode as the Default Starting Point](</AI-Native SDLC/plan-mode.md>) — the plan becomes reviewable before any code exists; also auto mode and the legacy source-of-truth problem.
- [The CLAUDE.md as Institutional Memory](</AI-Native SDLC/claude-md.md>) — the onboarding document a new joiner would need, kept under a page and corrected whenever Claude makes the same mistake twice.
- [Skills as Institutional Knowledge](</AI-Native SDLC/skills-as-institutional-knowledge.md>) — one inconsistently-enforced policy encoded as a skill, understood as an advisory control that needs a deterministic hook behind it.
- [Parallel Sessions and Subagents](</AI-Native SDLC/parallel-sessions-and-subagents.md>) — one engineer drives several sessions in separate worktrees, with recurring jobs packaged as subagents; the ceiling is review capacity.
- [Give Claude a Feedback Loop](</AI-Native SDLC/feedback-loop.md>) — the session verifies its own work before an engineer sees it, and the check is protected from the agent fixing the code.
- [Continuous Evals in CI](</AI-Native SDLC/continuous-evals.md>) — real tasks with checks, run whenever `CLAUDE.md`, skills, or hooks change, because configuration steers the agent and deserves regression testing.
- [AI in the PR Review Loop](</AI-Native SDLC/ai-pr-review.md>) — every PR gets an identical set of review passes defined in `REVIEW.md`, and human attention moves up to intent and risk.
- [Hooks as Approval Gates](</AI-Native SDLC/hooks-as-approval-gates.md>) — each human approval expressed as a hook that can allow, ask, or block, with the regulated-enterprise managed settings file annotated key by key.
- [CI/CD Integration and Deployment](</AI-Native SDLC/ci-cd-integration.md>) — Claude runs non-interactively in the pipeline for the judgment steps, sandboxed, with deploy and rollback exposed through MCP.
- [Closing the Loop on Metrics](</AI-Native SDLC/closing-the-loop.md>) — a deterministic detection script invokes Claude on a control-band breach, and the diagnosis is written back as an `intent.md` that restarts the lifecycle.

## Protocols

Open standards for wiring agents to the things they need — tools, data, and
each other.

- [Model Context Protocol (MCP)](/model-context-protocol.md) — an open standard
  for connecting AI applications to external systems; the USB-C port for AI,
  and the client-server architecture, two layers, and primitives that implement
  it.
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
