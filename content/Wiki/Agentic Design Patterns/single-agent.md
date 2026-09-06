---
type: Pattern
title: "Single-Agent Pattern"
description: One model, one defined tool set, one comprehensive system prompt — the baseline agentic architecture and the recommended starting point for new agent development.
tags: [agents, design-patterns, architecture, google-cloud, single-agent]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

A *single-agent system* uses an AI model, a defined set of tools, and a
comprehensive system prompt to autonomously handle a user request or complete
a specific task.[^agentic-patterns] It is the fundamental agentic pattern —
everything else in this bundle is a response to a limit this one runs into.

![A single agent calling out to three tools, marked START HERE.](/_attachments/single-agent.jpg)

> [!diagram]
> Cropped from the [full pattern map](/Diagrams/choosing-a-pattern.excalidraw) — open it to pan and zoom.

## How it works

The agent relies on the model's own reasoning to interpret the request, plan
a sequence of steps, and decide which tools to use from the defined set. The
system prompt is doing more work here than in any other pattern: it shapes
behavior by defining the agent's core task, its persona, its operations, and
the specific conditions under which each tool should be used.

This maps onto the three components of a generative agent — foundation
model, tools, and reasoning loop — covered in
[GAIL Module 5](</Google GAIL/module-5-genai-agents.md>).

## When to use it

Use it for tasks that need multiple steps and access to external data. A
customer support agent that must query a database for an order status, or a
research assistant that calls APIs to summarize recent news, both fit. A
non-agentic system can't do either job, because it can't autonomously use
tools or execute a multi-step plan and synthesize a final answer.

It's also the right place to begin. If you're early in agent development,
start here: a single agent lets you refine core logic, prompt, and tool
definitions before adding architectural components that make all three
harder to debug.

## Where it breaks down

A single agent's performance degrades as you add tools and as tasks grow
more complex. The symptoms the source names are worth memorizing, because
they're how you'll notice the ceiling:

- increased latency,
- incorrect tool selection or tool use,
- outright failure to complete the task.

Often you can mitigate these by tightening the agent's reasoning process
with a technique like the [ReAct pattern](</Agentic Design Patterns/react.md>).
But if the workflow genuinely requires one agent to manage several distinct
responsibilities, no amount of prompt refinement will fix it — that's the
signal to move to a
[multi-agent system](</Agentic Design Patterns/multi-agent-systems.md>), which
improves resilience and performance by delegating specific skills to
specialized agents.

## Trade-offs

Cheapest and simplest of the patterns, with the fewest model calls per
request and the least orchestration code to maintain. The cost is a hard
ceiling on task complexity and tool count, past which reliability falls off
rather than degrading gracefully.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
