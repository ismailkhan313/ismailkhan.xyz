---
type: Practice
title: "Capture as intent.md"
description: The Plan-stage play — the person who has the idea brainstorms it with Claude and commits the result as intent.md, a version-controlled proto-spec in their own terms, instead of handing it through backlog refinement.
tags: [sdlc, claude-code, anthropic, planning, requirements, governance]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 1: Plan.** The first play in [the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>),
and the one everything downstream reads from.

The problem it addresses is loss in transit. An idea traditionally passes
through backlog entries, user stories, story points, and refinement meetings
before anyone can act on it, and ownership transfers at each handoff — so what
reaches engineering is several steps removed from what the originator
meant.[^sdlc-playbook]

The play replaces that chain with one artifact. The originator brainstorms with
Claude and writes the result down as `intent.md`: what is wanted, why, and under
which constraints, in their own terms. It is human readable, version
controlled, and immediately consumable by the next stage.

Intent can enter through three routes — a person has an idea, a ticket is
filed, or an incident surfaces via an alert (which is what
[closing the loop](</AI-Native SDLC/closing-the-loop.md>) produces). All three
converge on the same step: the product owner reviews and corrects the
agent-written `intent.md` before it is committed.

## Prerequisites and setup

None, in terms of other plays. What it needs is infrastructure:

- Claude access for people who are not engineers (claude.ai or Cowork).
- An agreed `intent.md` template — best encoded as an [Agent Skill](/agent-skills.md)
  so it applies consistently.
- A shared, version-controlled home for intent that the product owner watches.

On that last point the playbook is opinionated: for a single product the
simplest home is an `intent/` folder in the product repo, which keeps the
artifact chain next to the code derived from it. A dedicated intent repo is only
worth the overhead when intent spans many repositories; in a monorepo it is a
directory.

Standing this up is a one-time job for the platform or engineering team, which
also decides who can write to it. Contributors without Git experience never
touch Git directly — a connector to the version-control system lets Claude
commit the markdown on their behalf.

## How it runs

1. The originator describes the problem in their own words: what they cannot do
   today, who is affected, what better looks like, what is out of scope. No
   formal language required.
2. They brainstorm until it is concrete, with Claude asking the questions an
   analyst would ask — scope, users, constraints, what success looks like.
3. Claude writes the result as `intent.md` using the organization's template.
4. The originator corrects anything Claude misunderstood.
5. Commit. Author and timestamp join the record, and the product owner picks it
   up from there.

```markdown
# Intent: claims status self-service
Author: J. Ortiz (claims operations). Status: draft.
## Problem
Customers phone the contact center to ask where their claim is.
Handlers spend roughly a third of call time on status-only queries.
## Proposed outcome
Customers see claim status, next step and expected date in the portal.
## Affected users and systems
Claims handlers, portal team, claims-core API.
## Constraints
No new PII in the portal session. Existing authentication only.
## Open questions
Do third-party loss adjusters need access too?
```

Note what the template forces: constraints and open questions are fields, not
afterthoughts. The `intent.md` that reaches
[requirements and design](</AI-Native SDLC/requirements-and-design.md>) already
carries the things a spec pass would otherwise have to guess at.

## Governance

The committed file is the evidence — author, timestamp, full revision history,
all in the Git history of the intent home. The product owner approves, and the
accept-or-reject decision that promotes the intent into Stage 2 is recorded as
the merge or the closing review. There is no separate approval system to keep in
sync, which is the recurring move in this playbook.

## Measurement

- **Leading**: time from first conversation to a committed `intent.md`, read off
  Git history. The claim is that this falls from a multi-week elicitation cycle
  to hours.
- **Lagging**: survival rate — the share of `intent.md` files the product owner
  accepts into Stage 2 rather than closes. Also count changes to `intent.md`
  made after the first `spec.md` commit for the same change, which measures how
  much the capture actually pinned down.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
