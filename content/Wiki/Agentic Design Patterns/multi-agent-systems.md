---
type: Concept
title: "Multi-Agent Systems"
description: Decomposing one objective across specialized agents — the shared principle behind the sequential, parallel, loop, coordinator, hierarchical, and swarm patterns, plus context engineering and the costs the approach adds.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, context-engineering]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

A *multi-agent system* orchestrates several specialized agents to solve a
problem that a [single agent](</Agentic Design Patterns/single-agent.md>) can't
easily manage.[^agentic-patterns] The core principle is decomposition: break
a large objective into smaller sub-tasks and assign each to a dedicated agent
with a specific skill. Those agents then interact through collaborative or
hierarchical workflows to reach the final goal.

The argument for it is modularity. Compared with a single agent carrying a
monolithic prompt, a set of narrowly scoped agents is more scalable, more
reliable, and more maintainable — each one has a smaller job to get right.

## Context engineering

Every agent in the system needs the specific context required to do its own
task. Context here means documentation, historical preferences, relevant
links, conversational history, or operational constraints. Managing that
flow of information is *context engineering*, and the source names three
strategies:

- **Isolating** context to the specific agent that needs it,
- **persisting** information across multiple steps,
- **compressing** large amounts of data to improve efficiency.

This is the tax that grows fastest as agent count grows: the decomposition
that makes each agent simpler also means no single agent sees the whole
picture, and what each one does see becomes a design decision.

Those three strategies have a direct counterpart in Anthropic's long-horizon
techniques — sub-agents *isolate*, structured note-taking *persists*,
compaction *compresses* — which is some evidence the triad is real rather than
one source's framing. [Context Engineering](/context-engineering.md) treats the
discipline in its own right, including why context is a scarce resource in the
first place.

## What it costs you

Multi-agent systems need more evaluation, security, reliability, and cost
work than a single agent. Concretely:

- precise access controls for each specialized agent,
- a robust orchestration system for reliable inter-agent communication,
- higher operational costs from the computational overhead of running
  multiple agents.

## The two families

The multi-agent patterns split on one question — *what decides which agent
runs next?*

**Code decides** (workflow agents operating on predefined logic, without
consulting a model for orchestration):

- [Sequential](</Agentic Design Patterns/sequential.md>) — fixed linear chain.
- [Parallel](</Agentic Design Patterns/parallel.md>) — concurrent fan-out, then
  a gather step.
- [Loop](</Agentic Design Patterns/loop.md>) — repeat until an exit condition,
  with two named implementations:
  [review and critique](</Agentic Design Patterns/review-and-critique.md>) and
  [iterative refinement](</Agentic Design Patterns/iterative-refinement.md>).

**A model decides** (dynamic orchestration at runtime):

- [Coordinator](</Agentic Design Patterns/coordinator.md>) — a central agent
  routes sub-tasks, with
  [hierarchical task decomposition](</Agentic Design Patterns/hierarchical-task-decomposition.md>)
  as its multi-level implementation.
- [Swarm](</Agentic Design Patterns/swarm.md>) — all-to-all collaboration with
  no orchestrator at all.

Code-driven orchestration is cheaper and more predictable; model-driven
orchestration is more flexible and adapts at runtime. That trade sits behind
most of the pattern-selection guidance in
[Choosing an Agentic Design Pattern](</Agentic Design Patterns/choosing-a-pattern.md>).

A worked reference architecture for building one of these on Google Cloud is
published separately as
[Multi-agent AI systems in Google Cloud](https://docs.cloud.google.com/architecture/multiagent-ai-system).

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
