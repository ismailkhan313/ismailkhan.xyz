---
type: Pattern
title: "Review and Critique Pattern"
description: A generator agent produces output and a critic agent evaluates it against fixed criteria before it ships — a dedicated verification step bought with an extra model call per cycle.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, evaluation]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *multi-agent review and critique pattern* — also called the *generator and
critic pattern* — improves the quality and reliability of generated content
using two specialized agents, typically in a sequential
workflow.[^agentic-patterns] It is an implementation of the
[loop pattern](</Agentic Design Patterns/loop.md>).

## How it works

A **generator agent** creates an initial output — a block of code, a summary
of a document. A **critic agent** then evaluates that output against a
predefined set of criteria: factual accuracy, adherence to formatting rules,
safety guidelines. Based on that evaluation the critic does one of three
things:

- approve the content,
- reject it,
- return it to the generator with feedback for revision.

The third branch is what makes this a loop rather than a straight line, and
it's where the cost accumulates.

## When to use it

Use it when outputs must be highly accurate, or must conform to strict
constraints, before they reach a user or a downstream process.

The source's example is a code generation workflow: a generator agent writes
a function to fulfill a user's request, and the generated code passes to a
critic agent acting as a security auditor. That critic checks the code
against a set of constraints — scanning for security vulnerabilities,
verifying that it passes all unit tests — before the code is approved for
use.

From the pattern-comparison guidance, the workload profile is short: tasks
that require a distinct validation step before completion.

## Trade-offs

Output quality, accuracy, and reliability improve because verification is a
dedicated step performed by an agent with different instructions than the one
that produced the work.

That quality assurance costs latency and operational expense directly. The
workflow requires at least one additional model call for the critic's
evaluation, and if revision loops are included — content sent back for
refinement — both latency and cost accumulate with every iteration.

## Compared with iterative refinement

Both are loop implementations and they overlap in practice. The distinction
worth holding onto: review and critique is fundamentally a *gate*, with a
separate critic deciding whether work passes, whereas
[iterative refinement](</Agentic Design Patterns/iterative-refinement.md>) is
fundamentally *improvement*, with agents progressively reworking a result in
session state until it's good enough.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
