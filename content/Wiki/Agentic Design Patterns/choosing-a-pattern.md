---
type: Overview
title: "Choosing an Agentic Design Pattern"
description: The decision framework for agent architecture — whether you need an agent at all, the four requirement dimensions, and which pattern fits deterministic, dynamically orchestrated, iterative, and special-requirement workloads.
tags: [agents, design-patterns, architecture, google-cloud, decision-framework]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

An *agent design pattern* is a common architectural approach for building
agentic applications — a framework for organizing a system's components,
integrating the model, and orchestrating one or several agents to accomplish
a workflow.[^agentic-patterns] Picking one is a fundamental architectural
decision, and each pattern trades flexibility against complexity and
performance differently. This page is the map; the individual pattern pages
linked below are the territory.

## First: do you need an agent at all?

Agents earn their cost on open-ended problems that need autonomous
decision-making and multi-step workflow management — solving problems in
real time against external data, automating knowledge-intensive tasks, and
completing goal-focused tasks with some degree of autonomy.

If your workload is predictable or highly structured, or if it can be
executed with a single call to a model, a non-agentic solution is usually
more cost effective. Summarizing a document, translating text, and
classifying customer feedback are the source's own examples of tasks that
don't need an agentic workflow at all.

## Four requirement dimensions

The source frames pattern selection around four questions. They aren't an
exhaustive planning checklist — they're the starting point for identifying
the primary goal of the system.

- **Task characteristics** — can the task be completed in predefined
  workflow steps, or is it open-ended? Does it need an AI model to
  orchestrate the workflow at all?
- **Latency and performance** — do you prioritize fast, interactive
  responses at the cost of accuracy? Or can the application tolerate delay
  to get a more accurate, thorough result?
- **Cost** — what's the budget for inference? Can you afford patterns that
  make multiple model calls per request?
- **Human involvement** — does the task involve high-stakes decisions,
  safety-critical operations, or subjective approvals that need human
  judgment?

The third question is the one that separates the two families of multi-agent
pattern: whether orchestration runs on predefined code or on a model's
reasoning. See [Multi-Agent Systems](</Agentic Design Patterns/multi-agent-systems.md>).

## The design process

1. **Define your requirements** — assess task complexity, latency and
   performance expectations, cost budget, and the need for human
   involvement.
2. **Review the common patterns** — both single-agent and multi-agent.
3. **Select a pattern** based on those workload characteristics.

This isn't a one-time decision. Revisit it as workload characteristics
change, requirements evolve, or new platform features become available.

## Pattern selection by workload shape

### Deterministic workflows

Predictable, sequential tasks with a clearly defined path from start to
finish. The steps are known in advance and the process doesn't change much
between runs.

- [Sequential](</Agentic Design Patterns/sequential.md>) — multi-step tasks on
  a predefined, rigid workflow; no model orchestration; fixed sequence where
  each agent's output is the next agent's input.
- [Parallel](</Agentic Design Patterns/parallel.md>) — independent tasks that
  can run at the same time; no model orchestration; reduces overall latency
  by running sub-tasks simultaneously.
- [Iterative refinement](</Agentic Design Patterns/iterative-refinement.md>) —
  open-ended or complex generation that's hard to complete in one attempt;
  progressively improves output over cycles; no model orchestration;
  prioritizes quality over latency.

### Workflows that require dynamic orchestration

Complex problems where agents must decide how to proceed — the system plans,
delegates, and coordinates without a script.

- [Single agent](</Agentic Design Patterns/single-agent.md>) — structured,
  multi-step tasks that need external tools; fast development of a
  proof-of-concept prototype.
- [Coordinator](</Agentic Design Patterns/coordinator.md>) — dynamic routing
  to the right specialized subagent for structured tasks with varied input;
  high latency and cost from repeated calls to the coordinator model.
- [Hierarchical task decomposition](</Agentic Design Patterns/hierarchical-task-decomposition.md>) —
  multi-level model orchestration for complex, open-ended, ambiguous tasks
  where decomposing the ambiguity is the primary challenge; high latency
  from nested decomposition.
- [Swarm](</Agentic Design Patterns/swarm.md>) — collaborative debate and
  iterative refinement across specialized agents; prioritizes synthesizing
  multiple perspectives; high latency and cost from all-to-all
  communication.

### Workflows that involve iteration

The final output is reached through cycles of refinement, feedback, and
improvement.

- [ReAct](</Agentic Design Patterns/react.md>) — the agent iteratively
  reasons, acts, and observes to build or adapt a plan for complex,
  open-ended, dynamic tasks; prioritizes a thorough result over latency.
- [Loop](</Agentic Design Patterns/loop.md>) — monitoring or polling tasks
  that repeat a predefined action until an exit condition is met;
  unpredictable or long-running latency while waiting.
- [Review and critique](</Agentic Design Patterns/review-and-critique.md>) —
  tasks that require a distinct validation step before completion.
- [Iterative refinement](</Agentic Design Patterns/iterative-refinement.md>) —
  listed here as well as under deterministic workflows, since the loop is
  code-driven but the work inside it is open-ended generation.

### Workflows with special requirements

Tasks that don't follow the common patterns — unique business logic, or
human judgment at critical points. The system ends up custom-built for a
single, specific purpose.

- [Human-in-the-loop](</Agentic Design Patterns/human-in-the-loop.md>) —
  human supervision for high-stakes or subjective tasks with safety,
  reliability, or compliance requirements.
- [Custom logic](</Agentic Design Patterns/custom-logic.md>) — complex
  branching that goes beyond a linear sequence; maximum control to mix
  predefined rules with model reasoning; fine-grained process control for a
  workflow that fits no standard template.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
