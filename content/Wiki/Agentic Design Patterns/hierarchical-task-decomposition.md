---
type: Pattern
title: "Hierarchical Task Decomposition Pattern"
description: A root agent breaks a complex task into sub-tasks and delegates down through multiple layers until worker agents can execute directly — the pattern for ambiguity, at the highest complexity and cost.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, orchestration]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *multi-agent hierarchical task decomposition pattern* organizes agents
into a multi-level hierarchy to solve complex problems that require extensive
planning.[^agentic-patterns] It is an implementation of the
[coordinator pattern](</Agentic Design Patterns/coordinator.md>), applied at
more than one level.

## How it works

A top-level parent — the *root* agent — receives a complex task and is
responsible for decomposing it into several smaller, manageable sub-tasks. It
delegates each sub-task to a specialized subagent one level down.

That process can repeat through multiple layers, with agents progressively
decomposing their assigned tasks until the tasks are small enough to be
executed directly by a worker agent at the lowest level. Decomposition, not
execution, is what the upper layers actually do.

## When to use it

Use it for ambiguous, open-ended problems that require multi-step reasoning —
tasks involving research, planning, and synthesis.

The source's example is a complex research project. A coordinator agent
decomposes the high-level goal into tasks like gathering information,
analyzing the findings, and synthesizing the final report, then delegates
those to specialized subagents — a data gathering agent, an analysis agent,
and a report-writing agent — each of which either executes its task or
decomposes it further.

From the pattern-comparison guidance, the workload profile is:

- multi-level model orchestration for complex, open-ended, ambiguous tasks,
- a need for comprehensive, high-quality results where *decomposing the
  ambiguity* is the primary challenge,
- tolerance for high latency from nested, multi-level decomposition and the
  many reasoning calls it makes.

## Trade-offs

For highly complex and ambiguous problems, systematic decomposition into
manageable sub-tasks produces more comprehensive, higher-quality results than
simpler patterns can.

The capability is expensive on every axis. The multi-level structure adds
considerable architectural complexity, making the system harder to design,
debug, and maintain. The layers of delegation and reasoning also produce a
high number of model calls, which significantly increases both latency and
operational cost relative to other patterns.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
