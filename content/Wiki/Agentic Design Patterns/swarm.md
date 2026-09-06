---
type: Pattern
title: "Swarm Pattern"
description: Specialized agents communicate all-to-all, debating and handing off to each other with no central orchestrator — the most capable multi-agent pattern and the most expensive and hardest to converge.
tags: [agents, design-patterns, multi-agent, architecture, google-cloud, orchestration]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *multi-agent swarm pattern* uses a collaborative, all-to-all
communication approach, in which multiple specialized agents work together to
iteratively refine a solution to a complex problem.[^agentic-patterns]

## How it works

A **dispatcher agent** routes the user's request into the collaborative group.
It interprets the request and determines which agent in the swarm is best
suited to begin the task.

From there, every agent can communicate with every other agent. They share
findings, critique proposals, and build on each other's work to iteratively
refine a solution. Any agent can hand the task off to another agent it judges
better suited to the next step, or return the final response to the user.

## No orchestrator, so you need an exit condition

A swarm typically lacks a central supervisor. The dispatcher does *not*
orchestrate the workflow — unlike the
[coordinator pattern](</Agentic Design Patterns/coordinator.md>), where a model
actively routes each sub-task. The dispatcher only facilitates communication
between the swarm's subagents and the user. (The source's own wording slips
here, describing the return path as going "back to the user through the
coordinator agent"; that agent is the dispatcher, which brokers messages
rather than directing work.)

Because nothing in the system is steering toward completion, you must define
an explicit exit condition. Typically that's a maximum number of iterations, a
time limit, or achieving a specific goal such as reaching consensus.

## When to use it

Use it for ambiguous or highly complex problems that benefit from debate and
iterative refinement.

The source's example is designing a new product, involving a market
researcher agent, an engineering agent, and a financial modeling agent. They
share initial ideas, debate the trade-offs between features and costs, and
collectively converge on a final design specification that balances the
competing requirements.

From the pattern-comparison guidance, the workload profile is:

- collaborative debate and iterative refinement from multiple specialized
  agents, on highly complex, open-ended, or ambiguous tasks,
- synthesis of multiple perspectives into a comprehensive or creative
  solution,
- tolerance for high latency and operational cost from dynamic, all-to-all
  communication.

## Trade-offs

Because it simulates a collaborative team of experts, the swarm can produce
exceptionally high-quality and creative solutions.

It is also the most complex and costly multi-agent pattern to implement.
Without an agent using a model to orchestrate, the swarm risks unproductive
loops or failing to converge on a solution at all. You have to design
sophisticated logic to manage intricate inter-agent communication, control
the iterative workflow, and absorb the significant cost and latency of a
dynamic, multi-turn conversation among several agents.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
