---
type: Pattern
title: "Loop Pattern"
description: A sequence of subagents repeats until a termination condition is met — the base pattern for self-correction and iterative work, and the one that can run forever if the exit condition is wrong.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, workflow]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *multi-agent loop pattern* repeatedly executes a sequence of specialized
subagents until a specific termination condition is met.[^agentic-patterns]

![Two agents running in sequence into a decision diamond, which loops back to the start until the exit condition holds.](/_attachments/loop.jpg)

> [!diagram]
> Cropped from the [full pattern map](/Diagrams/choosing-a-pattern.excalidraw) — open it to pan and zoom.

## How it works

A *loop workflow agent* drives the cycle. Like the other workflow agents
behind the [sequential](</Agentic Design Patterns/sequential.md>) and
[parallel](</Agentic Design Patterns/parallel.md>) patterns, it runs on
predefined logic rather than consulting a model for orchestration.

After the subagents finish their tasks, the loop agent evaluates whether the
exit condition has been met. That condition can be a maximum number of
iterations or a custom state. If it isn't met, the sequence of subagents runs
again. The evaluation doesn't have to sit at the end — you can implement the
loop so the exit condition is checked at any point in the flow.

## When to use it

Use it for tasks that require iterative refinement or self-correction —
generating content and having a critic agent review it until it meets a
quality standard, for instance.

From the pattern-comparison guidance, the workload profile is:

- monitoring or polling tasks that repeat a predefined action, such as
  automated checks, until an exit condition is met,
- tolerance for unpredictable or long-running latency while waiting for that
  condition.

## Two named implementations

The source calls out two specializations of this pattern, both of which get
their own page:

- [Review and critique](</Agentic Design Patterns/review-and-critique.md>) — a
  generator agent produces output and a critic agent evaluates it against
  fixed criteria, approving, rejecting, or returning it with feedback.
- [Iterative refinement](</Agentic Design Patterns/iterative-refinement.md>) —
  one or more agents progressively improve a result held in session state
  across cycles.

## Trade-offs

The loop is what lets agents refine their own work and keep processing until
a specific quality or state is reached, which is not achievable in a single
pass.

The primary risk is an infinite loop. If the termination condition isn't
correctly defined, or the subagents never produce the state required to stop,
the loop runs indefinitely — leading to excessive operational costs, high
resource consumption, and potential system hangs. Designing the exit
condition is the real work of this pattern.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
