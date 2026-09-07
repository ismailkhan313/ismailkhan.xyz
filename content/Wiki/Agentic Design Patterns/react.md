---
type: Pattern
title: "ReAct Pattern"
description: An agent loops through thought, action, and observation in natural language until it reaches an answer — the reasoning technique that raises a single agent's ceiling before multi-agent architecture is warranted.
tags: [agents, design-patterns, architecture, google-cloud, reasoning, react]
sources:
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-06T04:49:55Z }
status: stable
---

The *ReAct* (reason and act) pattern has the AI model frame its thought
processes and actions as a sequence of natural language
interactions.[^agentic-patterns] The agent operates in an iterative loop of
thought, action, and observation until an exit condition is met. It
originates in the [ReAct paper](https://arxiv.org/abs/2210.03629) (Yao et
al., 2022).

![The ReAct loop: the agent system queries an AI model that thinks, acts by calling tool APIs against external environments, and observes by saving to memory, which updates the model.](/_attachments/react.png)

> [!diagram]
> Open the interactive version [here](/Diagrams/react.excalidraw) to pan and zoom.

## The loop

- **Thought** — the model reasons about the task and decides what to do next,
  evaluating everything it has gathered so far to determine whether the
  user's request has been fully answered.
- **Action** — based on that reasoning, the model does one of two things. If
  the task isn't complete, it selects a tool and forms a query to gather more
  information. If the task is complete, it formulates the final answer and
  ends the loop.
- **Observation** — the model receives the tool's output and saves the
  relevant information to memory. Because it accumulates observations, it can
  build on previous ones, which keeps it from repeating itself or losing
  context.

The loop terminates when the agent reaches a conclusive answer, hits a preset
maximum number of iterations, or encounters an error that prevents it from
continuing. This structure is what lets the agent build a plan dynamically,
gather evidence, and adjust its approach as it goes.

## When to use it

Use it for complex, dynamic tasks that require continuous planning and
adaptation.

The source's example is a robotics agent generating a path from an initial
state to a goal state. *Thought*: reason about the optimal path, optimizing
for metrics like time or energy. *Action*: execute the next step by moving
along a calculated path segment. *Observation*: record the new state of the
environment — its own position and any perceived changes. The loop lets the
agent honor dynamic constraints such as new obstacles or traffic regulations
by constantly updating its plan against new observations, continuing until it
reaches its goal or errors out.

From the pattern-comparison guidance, the workload profile is:

- the agent must iteratively reason, act, and observe to build or adapt a
  plan for complex, open-ended, dynamic tasks,
- a more accurate and thorough result is worth more than low latency.

## Trade-offs

A single ReAct agent is simpler and more cost-effective to build and maintain
than a full [multi-agent system](</Agentic Design Patterns/multi-agent-systems.md>).
The model's thinking also produces a transcript of its reasoning, which helps
with debugging — you can see where a run went wrong.

Against that, the iterative multi-step loop raises end-to-end latency
compared with a single query, and the agent's effectiveness depends heavily
on the quality of the model's reasoning. An error or a misleading result from
a tool at one observation step propagates forward and can make the final
answer wrong.

## Where it fits

ReAct is the standard first response when a
[single agent](</Agentic Design Patterns/single-agent.md>) starts picking the
wrong tools or failing to finish tasks — tighten the reasoning process before
reaching for more architecture. ReAct and chain-of-thought prompting are also
covered from the certification angle in
[GAIL Module 5](</Google GAIL/module-5-genai-agents.md>), which contrasts
ReAct's external interaction with chain-of-thought's purely internal
reasoning.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
