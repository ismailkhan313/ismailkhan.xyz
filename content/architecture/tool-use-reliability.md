---
title: "Why Tool Use Breaks in Production (And How to Fix It)"
description: The gap between a tool call working in a demo and working reliably at scale.
date: 2026-08-25
tags:
  - agentic-ai
  - architecture
  - reliability
---

> This is a second starter post — replace with your own content. It demonstrates linking back to related posts and tagging.

## The demo-to-production gap

A tool call that works 95% of the time in a notebook is a different product than one that needs to work at 99.9% in front of customers. The last few percentage points usually come from handling cases nobody wrote a test for.

## Where it breaks

- **Ambiguous tool schemas** — the model guesses at a parameter the schema didn't constrain tightly enough.
- **Silent partial failures** — a tool call "succeeds" but returns something the model wasn't expecting, and it proceeds anyway.
- **No retry semantics** — transient failures get treated as terminal ones.
- **Context rot** — long-running agent loops accumulate stale or contradictory context that biases later tool calls.

## Practical fixes

1. Make invalid states unrepresentable in the tool schema, not just documented as constraints.
2. Return structured errors the model can reason about, not raw stack traces.
3. Log every tool call and result — you cannot debug an agent you cannot replay.
4. Set explicit budgets (steps, cost, time) so failures degrade gracefully instead of looping forever.

See also: [[architecture/agent-orchestration-patterns|Agent Orchestration Patterns]]
