---
type: Pattern
title: "Coordinator Pattern"
description: A central agent uses a model to decompose the request and dynamically route each sub-task to a specialist — adaptive routing bought with extra model calls, tokens, and latency.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, orchestration]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *multi-agent coordinator pattern* uses a central agent — the
*coordinator* — to direct a workflow.[^agentic-patterns] The coordinator
analyzes and decomposes a user's request into sub-tasks, then dispatches each
sub-task to a specialized agent for execution. Each specialized agent is an
expert in a specific function, such as querying a database or calling an API.

![A central coordinator model fanning out to three specialist agents.](/_attachments/coordinator.jpg)

> [!diagram]
> Cropped from the [full pattern map](/Diagrams/choosing-a-pattern.excalidraw) — open it to pan and zoom.

## The distinction that matters

The coordinator uses an **AI model to orchestrate and dynamically route**
tasks. That is the line between this pattern and the code-driven workflow
patterns: the [parallel pattern](</Agentic Design Patterns/parallel.md>)
dispatches tasks for simultaneous execution through a hardcoded workflow, with
no model orchestration involved. Here, routing is a reasoning decision made
fresh at runtime.

## When to use it

Use it to automate structured business processes that require adaptive
routing. The source's example: a customer service agent acts as the
coordinator, analyzing an incoming request to determine whether it's an order
status request, a product return, or a refund request, and routing to the
appropriate specialized agent based on that determination.

From the pattern-comparison guidance, the workload profile is:

- dynamic routing to an appropriate specialized subagent for structured tasks
  with varied input,
- tolerance for high latency, caused by the repeated calls to the coordinator
  model that direct tasks to the right subagent,
- tolerance for the cost those repeated coordinator calls incur.

## Trade-offs

More flexible than rigid, predefined workflows. Because a model does the
routing, the coordinator handles a wider variety of inputs and can adapt the
workflow at runtime.

The cost follows directly from that: the coordinator and each specialized
agent all rely on a model for reasoning, so the pattern makes more model calls
than a [single-agent system](</Agentic Design Patterns/single-agent.md>). The
reasoning quality can be higher, but token throughput, operational cost, and
overall latency all increase.

## Going deeper

[Hierarchical task decomposition](</Agentic Design Patterns/hierarchical-task-decomposition.md>)
is the coordinator pattern applied recursively — coordinators delegating to
coordinators, several layers deep.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
