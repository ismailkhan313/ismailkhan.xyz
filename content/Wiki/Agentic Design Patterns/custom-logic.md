---
type: Pattern
title: "Custom Logic Pattern"
description: Orchestration written as code — conditional branching that mixes the other patterns together, for workflows that fit no standard template, at the cost of owning the whole flow yourself.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, orchestration]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *custom logic pattern* provides the maximum flexibility in workflow
design.[^agentic-patterns] You implement the orchestration logic yourself in
code — conditional statements and the like — to build complex workflows with
multiple branching paths.

![A refund workflow mixing patterns: a parallel verification stage, an is_eligible branch, a sequential store-credit path, a refund processor, and a response generator feeding back to the custom agent.](/_attachments/custom-logic.png)

> [!diagram]
> Open the interactive version [here](/Diagrams/custom-logic.excalidraw) to pan and zoom.

## The worked example

The source illustrates the pattern with a customer refund agent, and the
example is worth following closely because it shows *why* the standard
patterns weren't enough:

1. The user sends a query to the customer refund agent, which acts as a
   coordinator agent.
2. The coordinator's custom logic first invokes a parallel verifier agent,
   which simultaneously dispatches two subagents: a purchaser verifier agent
   and a refund eligibility agent.
3. Once those results are gathered, the coordinator executes a tool to check
   whether the request is eligible for a refund.
   - If eligible, it routes to a refund processor agent, which calls the
     `process_refund` tool.
   - If not eligible, it routes to a separate sequential flow, starting with
     a store credit agent and then a process credit decision agent.
4. The result from whichever path was taken goes to a final response agent,
   which formulates the answer for the user.

This workflow *mixes* patterns: it runs a
[parallel](</Agentic Design Patterns/parallel.md>) check, then executes a custom
conditional branch that routes into two entirely different downstream
processes — one of which is a
[sequential](</Agentic Design Patterns/sequential.md>) flow. Logic-level
orchestration like this goes beyond what the structured patterns offer, and
that mixture is the ideal use case for custom logic.

## When to use it

Use it when you need fine-grained control over the agent's execution, or when
your workflow simply doesn't fit any of the other patterns.

From the pattern-comparison guidance, the workload profile is:

- complex, branching logic that goes beyond a direct linear sequence,
- a need for maximum control to mix predefined rules with model reasoning,
- fine-grained process control for a workflow with no standard template.

## Trade-offs

Total control, paid for in development and maintenance complexity. You are
responsible for designing, implementing, and debugging the entire
orchestration flow, which takes more effort and is more error-prone than
using a predefined pattern supported by a framework such as the
[Agent Development Kit (ADK)](https://google.github.io/adk-docs/). ADK
documents its own approach to this in
[Custom agents](https://google.github.io/adk-docs/agents/custom-agents/).

Treat it as the escape hatch, not the default — the value of the named
patterns is that someone else has already debugged their control flow.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
