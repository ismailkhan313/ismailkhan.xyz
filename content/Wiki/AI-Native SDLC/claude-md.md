---
type: Practice
title: "The CLAUDE.md as Institutional Memory"
description: The Build-stage play — the onboarding document a new joiner would need, written as a file the agent reads at the start of every session, kept under a page, checked into Git, and corrected whenever Claude makes the same mistake twice.
tags: [sdlc, claude-code, anthropic, claude-md, context-engineering, governance]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 3: Build.** A play with no prerequisites in
[the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>), and a dependency of
several others — [subagents](</AI-Native SDLC/parallel-sessions-and-subagents.md>),
[evals](</AI-Native SDLC/continuous-evals.md>), and
[PR review](</AI-Native SDLC/ai-pr-review.md>) all read it.

`CLAUDE.md` gives Claude the context a new joiner would need: conventions,
commands, architecture, and the mistakes the team sees most often. Knowledge
that used to sit in people's heads and on wikis becomes a file the agent reads
at the start of every session, maintained by the whole team.[^sdlc-playbook]

## How it runs

1. Run `/init` in the repo. Claude generates a starting `CLAUDE.md` from what it
   finds.
2. **Cut it down** to what a new joiner would need on day one: the build, test,
   and lint commands, the conventions that matter, and the things Claude keeps
   getting wrong.
3. Check it into Git at the repo root, so the team shares one version and
   changes are reviewed like code.
4. Adopt the working rule: **when Claude makes a mistake twice, the correction
   goes into `CLAUDE.md`.**
5. Keep it under a page. Claude reads all of it at the start of a session, so
   anything stale is spending context for no benefit.

```markdown
# Payments service
## Commands
- Build: make build
- Test: make test (unit), make itest (integration, needs docker)
- Lint: make lint (runs in CI; fix before pushing)
## Conventions
- Java 21, Spring Boot 3. No new Lombok.
- Money is always BigDecimal, never double.
- Every endpoint needs an integration test in src/itest.
## Architecture
- api/ holds REST controllers, core/ holds domain logic,
  adapters/ talks to external systems.
- Kafka events are defined in schemas/; never edit generated classes.
## Things Claude gets wrong
- Do not bump dependency versions; the platform team owns them.
- The legacy v1/ package is frozen; changes go in v2/.
```

The "Things Claude gets wrong" section is the one that distinguishes this from a
README. It is a record of observed failure modes, not a statement of intent.

## Why the page limit matters

The one-page ceiling is a [context engineering](/context-engineering.md)
constraint, not a style preference: `CLAUDE.md` is loaded into every session
unconditionally, so it competes for attention with the actual task. This is the
same budget logic that makes [Agent Skills](/agent-skills.md) load progressively
— and it is the reason the playbook's rule of thumb separates the two. Write a
skill for institutional knowledge that must be applied consistently to a
*particular kind of task*; keep in `CLAUDE.md` what every session needs.

## Governance

`CLAUDE.md` is version controlled, so the instructions the agent works to are
themselves reviewable and auditable. Team conventions are applied through the
file, changes are logged in Git history, and code owners approve those changes
in PR review. It is also the feedback sink for
[PR review findings](</AI-Native SDLC/ai-pr-review.md>): a mistake flagged twice
becomes a line in the file, and because review also reads the file, it is caught
from the next PR onward.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
