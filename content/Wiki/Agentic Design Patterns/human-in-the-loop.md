---
type: Pattern
title: "Human-in-the-Loop Pattern"
description: The agent pauses at a predefined checkpoint and waits for a person to approve, correct, or supply input before continuing — safety and compliance bought with an external review system you have to build.
tags: [agents, design-patterns, architecture, google-cloud, responsible-ai, hitl]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *human-in-the-loop pattern* integrates points for human intervention
directly into an agent's workflow.[^agentic-patterns] At a predefined
checkpoint, the agent pauses execution and calls an external system to wait
for a person to review its work.

![An agent system routing a proposed response through an external messaging system to a human reviewer, releasing it on approval and otherwise regenerating a solution.](/_attachments/human-in-the-loop.png)

> [!diagram]
> Open the interactive version [here](/Diagrams/human-in-the-loop.excalidraw) to pan and zoom.

## How it works

The checkpoint is a deliberate suspension of autonomy: the agent stops, hands
off, and does not proceed until a person acts. That person can approve a
decision, correct an error, or provide input the agent needs before it can
continue.

The mechanism is an *external system* the agent calls out to — which is where
the architectural cost of this pattern lives.

## When to use it

Use it for tasks requiring human oversight, subjective judgment, or final
approval of critical actions — approving a large financial transaction,
validating the summary of a sensitive document, or giving subjective feedback
on generated creative content.

The source's example: an agent tasked with anonymizing a patient dataset for
research automatically identifies and redacts all protected health
information, then pauses at a final checkpoint. It waits for a human
compliance officer to manually validate the dataset and approve its release,
which helps ensure no sensitive data is exposed.

From the pattern-comparison guidance, the workload profile is a single line:
work requiring human supervision because of high-stakes or subjective tasks,
which may carry safety, reliability, and compliance requirements.

## Trade-offs

Safety and reliability improve, because human judgment is inserted at the
decision points where an autonomous mistake would be most costly.

The pattern adds significant architectural complexity, since you have to
build and maintain the external system through which that human interaction
happens — including whatever queuing, notification, and state persistence a
paused workflow needs.

## Related

Human-in-the-loop also appears in this wiki as one of the techniques for
working around foundation model limitations — content moderation, sensitive
applications, and high-risk decisions, applied both before and after
generation. See [GAIL Module 2](</Google GAIL/module-2-foundational-concepts.md>).
It composes with any other pattern here: a checkpoint can sit inside a
[sequential](</Agentic Design Patterns/sequential.md>) pipeline or at the
approval step of a [coordinator](</Agentic Design Patterns/coordinator.md>)
workflow.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
