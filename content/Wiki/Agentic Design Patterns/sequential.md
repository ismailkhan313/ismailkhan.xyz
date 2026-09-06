---
type: Pattern
title: "Sequential Pattern"
description: Specialized agents run in a fixed linear order, each agent's output feeding the next — the cheapest multi-agent pattern, and the least adaptable.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, workflow]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *multi-agent sequential pattern* executes a series of specialized agents
in a predefined, linear order, where the output from one agent is the direct
input to the next.[^agentic-patterns]

![Three agents in a fixed chain, each arrow feeding the next agent's output forward.](/_attachments/sequential.jpg)

> [!diagram]
> Cropped from the [full pattern map](/Diagrams/choosing-a-pattern.excalidraw) — open it to pan and zoom.

## How it works

Orchestration is handled by a *sequential workflow agent* that operates on
predefined logic — it does not consult an AI model to decide what runs next.
That distinction is the whole economic case for the pattern, and it's shared
with the [parallel](</Agentic Design Patterns/parallel.md>) and
[loop](</Agentic Design Patterns/loop.md>) patterns. Contrast it with the
[coordinator pattern](</Agentic Design Patterns/coordinator.md>), where a model
does the routing.

## When to use it

Use it for highly structured, repeatable processes where the sequence of
operations doesn't change. The source's example is a data processing
pipeline: a data extraction agent pulls raw data, passes it to a data
cleaning agent for formatting, which passes the clean data to a data loading
agent that saves it to a database.

From the pattern-comparison guidance, the workload profile is:

- multi-step tasks following a predefined, rigid workflow,
- no need for model orchestration,
- a fixed sequence where each agent's output is the next agent's input.

## Trade-offs

Compared with any pattern that uses a model to orchestrate, this one reduces
both latency and operational cost — there are no reasoning calls spent on
deciding what happens next.

The price is flexibility. A rigid, predefined pipeline is hard to adapt to
dynamic conditions and can't skip steps that turn out to be unnecessary,
which causes inefficient processing and can *raise* cumulative latency when
an unneeded step happens to be a slow one.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
