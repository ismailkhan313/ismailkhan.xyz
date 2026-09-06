# Agentic Design Patterns

Architectural patterns for building agentic AI systems, from Google Cloud's
Architecture Center guidance on choosing between them. Each page covers one
pattern: how it works, when to use it, and what it costs.

## Start here

- [Choosing an Agentic Design Pattern](choosing-a-pattern.md) — the decision
  framework: whether you need an agent at all, the four requirement
  dimensions, and which pattern fits which workload shape.

## Single agent

- [Single-Agent Pattern](single-agent.md) — one model, one tool set, one
  system prompt; the baseline architecture and the recommended starting
  point.
- [ReAct Pattern](react.md) — thought, action, observation in a loop; the
  reasoning technique that raises a single agent's ceiling.

## Multi-agent

- [Multi-Agent Systems](multi-agent-systems.md) — the shared principle behind
  every pattern below: decompose an objective across specialized agents, and
  engineer the context each one sees.

### Orchestrated by code

Workflow agents that run on predefined logic, without a model deciding what
happens next.

- [Sequential Pattern](sequential.md) — a fixed linear chain where each
  agent's output is the next agent's input.
- [Parallel Pattern](parallel.md) — concurrent fan-out to independent
  subagents, then a gather step that consolidates their outputs.
- [Loop Pattern](loop.md) — a sequence of subagents repeats until a
  termination condition is met.
- [Review and Critique Pattern](review-and-critique.md) — a loop
  implementation: a generator produces output, a critic gates it against
  fixed criteria.
- [Iterative Refinement Pattern](iterative-refinement.md) — a loop
  implementation: agents progressively improve a result held in session
  state.

### Orchestrated by a model

Routing decided at runtime by model reasoning.

- [Coordinator Pattern](coordinator.md) — a central agent decomposes the
  request and dynamically routes each sub-task to a specialist.
- [Hierarchical Task Decomposition Pattern](hierarchical-task-decomposition.md) —
  the coordinator pattern applied recursively, down through multiple layers
  to worker agents.
- [Swarm Pattern](swarm.md) — all-to-all collaboration and debate with no
  central orchestrator.

## Special requirements

- [Human-in-the-Loop Pattern](human-in-the-loop.md) — the agent pauses at a
  checkpoint and waits for a person to approve, correct, or supply input.
- [Custom Logic Pattern](custom-logic.md) — orchestration written as code,
  mixing the other patterns for workflows that fit no template.
