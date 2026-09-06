---
type: Pattern
title: "Parallel Pattern"
description: Specialized subagents work concurrently on independent sub-tasks and their outputs are synthesized into one response — lower latency, higher token spend, and a gather step that has to reconcile conflicts.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, workflow]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

In the *multi-agent parallel pattern* — also called the *concurrent pattern* —
multiple specialized subagents perform a task or sub-tasks independently at
the same time, and their outputs are then synthesized into a final
consolidated response.[^agentic-patterns]

![One agent fanning out to three concurrent subagents, whose outputs converge on a single gather step.](/_attachments/parallel.jpg)

> [!diagram]
> Cropped from the [full pattern map](/Diagrams/choosing-a-pattern.excalidraw) — open it to pan and zoom.

## How it works

Like the [sequential pattern](</Agentic Design Patterns/sequential.md>), this
one uses a *parallel workflow agent* to manage how and when the other agents
run, without consulting an AI model to orchestrate them. The work splits into
two phases: a fan-out, where subagents run concurrently, and a gather, where
one final step consolidates what came back.

The gather step is where the difficulty lives — see Trade-offs below.

## When to use it

Use it when sub-tasks can genuinely execute concurrently, either to cut
latency or to collect diverse perspectives at once — gathering data from
disparate sources, or evaluating several options simultaneously.

The source's example: to analyze customer feedback, a parallel agent fans a
single feedback entry out to four specialized agents at the same time — a
sentiment analysis agent, a keyword extraction agent, a categorization agent,
and an urgency detection agent. A final agent gathers those four outputs into
a single comprehensive analysis.

From the pattern-comparison guidance, the workload profile is:

- independent tasks that can execute at the same time,
- no need for model orchestration,
- overall latency reduced by running sub-tasks simultaneously.

## Trade-offs

Lower overall latency than a sequential approach, because information is
gathered from multiple sources at once.

Against that: running multiple agents in parallel increases immediate
resource utilization and token consumption, raising operational costs. And
the gather step requires complex logic to synthesize results that may
conflict with each other, which adds development and maintenance overhead.

## Not the same as a coordinator

The [coordinator pattern](</Agentic Design Patterns/coordinator.md>) also
dispatches work to specialized agents, but it uses a model to decide *which*
agents get the work at runtime. The parallel pattern's dispatch is hardcoded:
the same fan-out happens every time, with no reasoning call spent on the
decision.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
