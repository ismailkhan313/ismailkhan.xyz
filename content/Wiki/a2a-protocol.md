---
type: Protocol
title: "A2A (Agent2Agent) Protocol"
description: An open standard for agent-to-agent communication — letting agents from different vendors and frameworks discover each other and collaborate as peers over HTTP, rather than being wrapped as each other's tools.
tags: [agents, protocols, a2a, mcp, interoperability, multi-agent, google]
sources:
  - id: what-is-a2a
    resource: references/a2a-protocol-what-is-a2a.md
    title: "What is A2A? (a2a-protocol.org)"
generated: { by: claude-code/opus-5, at: 2026-09-06T21:46:47Z }
status: stable
---

**A2A** is an open standard for communication between AI agents. It gives
agents built on different frameworks, by different vendors, and owned by
different organizations a common language, so they can find each other and
collaborate without a bespoke integration per pair.[^what-is-a2a]

The load-bearing word is *agents*. A2A's premise is that an agent is an
autonomous problem-solver, and that the standard way of connecting one agent
to another — wrapping it as a tool — throws that autonomy away.

![A2A on one page: wrapping an agent as a tool versus keeping it an agent; one orchestrator using MCP downward to tools and A2A across an organizational boundary to peer agents; and the four-step request lifecycle from agent card to streamed task artifacts.](/_attachments/a2a-protocol.png)

> [!diagram]
> Open the interactive version [here](/Diagrams/a2a-protocol.excalidraw) to pan and zoom.

## The problem it solves

Take the source's example: a user asks an assistant to plan an international
trip, and satisfying that means orchestrating a flight booking agent, a hotel
reservation agent, a local tours agent, and a currency conversion agent. Each
was built and deployed independently. Without a shared protocol, wiring them
together runs into six problems the source names:[^what-is-a2a]

- **Agent exposure** — the usual move is to wrap each agent as a tool, the way
  tools are exposed through MCP. But agents are designed to negotiate directly,
  and wrapping one as a tool limits its capabilities. A2A exposes agents *as
  agents*.
- **Custom integrations** — every pairing becomes a point-to-point solution,
  and the engineering overhead is per-pair.
- **Slow innovation** — bespoke development for each new integration is the
  rate limiter on adding agents at all.
- **Scalability** — the number of integrations grows faster than the number of
  agents, so the system gets harder to maintain as it grows.
- **Interoperability** — with no common language, complex ecosystems can't form
  organically; you only get the connections someone explicitly built.
- **Security gaps** — ad hoc channels each make their own security decisions,
  so there's no consistent floor.

That first bullet is the conceptual claim underneath the other five, and it's
the one worth arguing with. A tool interface is stateless and predefined — a
calculator, a database query. An agent asked to book a flight may need to come
back and clarify, negotiate, or re-plan. Force it through a tool-shaped hole
and multi-turn behavior is the thing you lose. The A2A docs make this argument
at length under the heading ["Why Agents Are Not
Tools"](https://discuss.google.dev/t/agents-are-not-tools/192812).

## Where it sits: A2A vs. MCP

A2A is positioned as complementary to the
[**Model Context Protocol (MCP)**](/model-context-protocol.md), not competitive
with it. They cut the problem at different joints:[^what-is-a2a]

| | MCP | A2A |
|---|---|---|
| Connects | a model to data and external resources | an agent to another agent |
| Other side is | a tool — stateless, specific, predefined | an agent — autonomous, stateful, reasoning |
| Interaction shape | call and return | multi-turn: reason, plan, delegate, negotiate, clarify |

The source frames both as layers of one **agent stack**: models at the bottom
(any LLM, supplying the reasoning), frameworks like Google's
[ADK](https://google.github.io/adk-docs) for constructing an agent, MCP for
connecting that agent down to tools and data, and A2A for connecting it across
to other agents. A2A is deliberately framework-agnostic — an ADK agent, a
LangGraph agent, and a CrewAI agent all speak it.

For this wiki's purposes, that stack maps cleanly onto the three components of
a generative agent — foundation model, tools, reasoning loop — described in
[GAIL Module 5](</Google GAIL/module-5-genai-agents.md>). MCP serves the
*tools* component; A2A is the piece that layer doesn't have a name for.

## What it buys you

- **Secure collaboration** — HTTPS for transport, plus opaque operation: agents
  can't see inside each other while collaborating.
- **Interoperability** — silos between vendor ecosystems come down.
- **Agent autonomy** — agents keep their own capabilities and act as
  autonomous entities rather than being reduced to callable functions.
- **Reduced integration complexity** — one protocol instead of N² adapters, so
  teams work on what their agent is actually for.
- **Long-running operations** — streaming via Server-Sent Events and
  asynchronous execution are first-class, not bolted on.[^what-is-a2a]

## Design principles

Five principles shape the protocol, and each one is a bet about adoption:[^what-is-a2a]

- **Simplicity** — build on HTTP, JSON-RPC, and SSE rather than inventing
  transports. Nothing new to learn at the plumbing layer.
- **Enterprise readiness** — authentication, authorization, security, privacy,
  tracing, and monitoring align with standard web practice, so existing
  infrastructure applies.
- **Asynchronous** — long-running tasks are the default assumption. Agents and
  users are allowed to disconnect; streaming and push notifications carry the
  gap.
- **Modality independence** — agents exchange a wide variety of content types,
  not just text.
- **Opaque execution** — agents collaborate through *declared capabilities and
  exchanged context*, never by exposing internal logic, memory, or proprietary
  tools.

Opaque execution is the one doing the most work. It's what makes A2A viable
*between organizations*: a vendor can participate without publishing how its
agent works, which is both an IP-protection story and a security story. It's
also the constraint that forces everything else — if you can't see inside a
peer, capability discovery has to be explicit, which is what the agent card is
for.

## The request lifecycle

A request between an A2A client and an A2A server runs through four
steps:[^what-is-a2a]

1. **Agent discovery** — the client fetches the server's **agent card**, by
   convention at `/.well-known/agent-card`. The card is the declaration of
   capabilities that opaque execution requires: what this agent can do, where
   to send requests (`url`), and how to authenticate (`securitySchemes`).
2. **Authentication** — the client parses `securitySchemes` from the card. For
   `openIdConnect`, it requests a token from the auth server named by the
   card's `authorizationUrl` and `tokenUrl`, and gets back a JWT.
3. **`sendMessage`** — the client POSTs to the `url` from the card, bearing the
   JWT. The server processes the message, creates a **task**, and returns a
   task response.
4. **`sendMessageStream`** — the streaming variant. The server opens an SSE
   stream and emits the task's progress as it happens: `Task (Submitted)`, then
   `TaskStatusUpdateEvent (Working)`, then a `TaskArtifactUpdateEvent` per
   artifact produced, then `TaskStatusUpdateEvent (Completed)`.

Note the shape of step 4 — artifacts arrive incrementally, before completion.
That's the long-running-operations principle showing up concretely: the client
gets partial results as they're produced rather than waiting on one blocking
call.

## Relation to the agentic design patterns

A2A is a wire protocol, not an architecture, but it's the substrate the
[multi-agent patterns](</Agentic Design Patterns/multi-agent-systems.md>)
assume without naming. The trip-planning example is exactly the
[coordinator pattern](</Agentic Design Patterns/coordinator.md>) — one
orchestrating agent decomposing a request and routing sub-tasks to specialists
— with the difference that those specialists live in other organizations. The
Google Cloud pattern catalog treats sub-agents as components of a system you
own and deploy; A2A is what the same picture looks like when you don't own the
other half of it.

Read that way, A2A's real claim is about *organizational* boundaries rather
than architectural ones: within your own system, calling a sub-agent directly
is fine, and the patterns describe how. Across a boundary — different vendor,
different framework, no visibility into the other side — you need discovery,
auth, opacity, and a shared task model, which is the list A2A provides.

[^what-is-a2a]: ["What is A2A?"](https://a2a-protocol.org/latest/topics/what-is-a2a/), A2A Protocol documentation, retrieved 2026-09-06. Local copy: [`references/a2a-protocol-what-is-a2a.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/a2a-protocol-what-is-a2a.md).
