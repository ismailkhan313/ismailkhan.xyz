---
type: Pattern
title: "Iterative Refinement Pattern"
description: Agents progressively improve a result held in session state across cycles until it hits a quality threshold or an iteration cap — for outputs that can't be reached in a single pass.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, workflow]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *iterative refinement pattern* uses a looping mechanism to progressively
improve an output over multiple cycles.[^agentic-patterns] Like
[review and critique](</Agentic Design Patterns/review-and-critique.md>), it is
an implementation of the [loop pattern](</Agentic Design Patterns/loop.md>).

![A generator whose output goes to a quality evaluator: passing scores return to the generator, failing ones route through a prompt enhancer that feeds back an updated prompt.](/_attachments/iterative-refinement.png)

> [!diagram]
> Open the interactive version [here](/Diagrams/iterative-refinement.excalidraw) to pan and zoom.

## How it works

One or more agents work inside a loop, modifying a result that's stored in
the *session state* on each iteration. That shared state is the distinguishing
mechanic — the artifact persists across cycles and each pass edits it rather
than regenerating from scratch.

The process continues until the output meets a predefined quality threshold
or reaches a maximum number of iterations. The iteration cap isn't optional
bookkeeping; it's what prevents the infinite loop that the base
[loop pattern](</Agentic Design Patterns/loop.md>) warns about.

## When to use it

Use it for complex generation tasks where the output is difficult to achieve
in a single step — writing and debugging a piece of code, developing a
detailed multi-part plan, drafting and revising a long-form document.

The source's example is a creative writing workflow: an agent generates a
draft of a blog post, critiques the draft for flow and tone, then rewrites it
based on that critique. The loop repeats until the work meets a predefined
quality standard or hits the maximum number of iterations.

From the pattern-comparison guidance, the workload profile is:

- open-ended or complex generation tasks that are difficult to complete in a
  single attempt,
- the agent must progressively improve the output over multiple cycles,
- no need for model orchestration,
- output quality is prioritized over latency.

Note that this is the one pattern the source lists in two categories — under
deterministic workflows *and* under workflows involving iteration. Both are
correct: the loop itself is code-driven and predictable, while the generation
happening inside it is open-ended. See
[Choosing an Agentic Design Pattern](</Agentic Design Patterns/choosing-a-pattern.md>).

## Trade-offs

The pattern produces highly complex or polished outputs that would be
difficult to reach in a single step.

The looping mechanism increases latency and operational cost with every
cycle, and it adds architectural complexity: exit conditions — a quality
evaluation, a maximum iteration limit — have to be designed carefully to
prevent excessive cost or uncontrolled execution.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
