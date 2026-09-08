---
type: Practice
title: "Plan Mode as the Default Starting Point"
description: The Build-stage play — every session starts in plan mode against the approved spec, the engineer interrogates and corrects the plan before any code exists, and the accepted plan.md becomes the artifact later stages check the diff against.
tags: [sdlc, claude-code, anthropic, planning, plan-mode, auto-mode, governance, legacy-systems]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 3: Build.** The first of four Build plays in
[the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>).

The argument is about *when the plan becomes reviewable*. Traditionally an
engineer reads the design and starts writing code; how the change will be
made — which files, which tests — stays in their head or at best in a ticket
comment. The first thing a reviewer sees is the finished diff, and by then
rework is slow.[^sdlc-playbook]

Plan mode inverts this. Claude reads the codebase without changing anything and
produces a written plan; the engineer corrects it before code is written; the
approved version is committed as `plan.md` for later stages to check against.
The mode enforces its own discipline — Claude cannot edit files until the
engineer accepts the plan.

## How it runs

1. Start the session in plan mode.
2. Give Claude the `intent.md` and `spec.md` and ask for an implementation plan
   that names the files that change, the order of the work, and the tests that
   prove it.
3. **Interrogate the plan**: what could this break, which step is riskiest, what
   options did you choose not to take?
4. Iterate until an engineer who has never seen the conversation could implement
   the change from the plan alone. This is the acceptance bar worth keeping.
5. Commit the approved plan as `plan.md`.
6. Accept and let Claude implement. With a solid plan, implementation is often a
   single pass.
7. When implementation departs from the plan, update `plan.md` in the same
   commit — and consider a [hook](</AI-Native SDLC/hooks-as-approval-gates.md>)
   to enforce that synchronization.

```markdown
# Plan: claims status self-service (from intent.md 2026-06-02)

## Files that change

portal/src/claims/StatusPanel.tsx (new), claims-api/routes/status.py, claims-api/tests/test_status.py

## Order of work

1. Add the status endpoint behind existing auth.
2. Panel against the endpoint.
3. Wire into the portal nav.

## Risks

The claims-core API rate-limits at 50 rps; the panel must cache.

## Proof

test_status.py covers the four claim states; screenshot matches the approved mock.
```

## Auto mode, and what makes it safe

Claude Code can also run in auto mode, where the engineer iterates on and
approves the plan and Claude then applies each change without a per-edit prompt.
The playbook's position is that auto mode becomes the default for routine work
*as the other plays mature* — a tuned [`CLAUDE.md`](</AI-Native SDLC/claude-md.md>),
[skills that encode policy](</AI-Native SDLC/skills-as-institutional-knowledge.md>),
[hooks that block unsafe actions](</AI-Native SDLC/hooks-as-approval-gates.md>),
and [a test suite Claude can run](</AI-Native SDLC/feedback-loop.md>) — together
with a tight spec, a small blast radius, and code the tests already cover.

The shift it describes is from watching the agent make edits to reviewing
artifacts after longer autonomous sessions. Auto mode is also what makes
[parallel sessions](</AI-Native SDLC/parallel-sessions-and-subagents.md>) worth
running, and it is the precondition for
[closing the loop](</AI-Native SDLC/closing-the-loop.md>) in Stage 6.

## Legacy systems and the source of truth

This play carries the playbook's only sustained treatment of a problem every
enterprise adoption hits: the artifacts already exist somewhere else. Work items
are in Jira, requirements in a tool with regulatory traceability, designs in
Figma, approvals with a change board. Those systems are hard to displace because
auditors already accept them and other teams depend on them.

The rule offered is that for each artifact, **one system is named the source of
truth and the others hold a copy or a link** — and the choice can differ per
artifact. Three configurations:

- **The repo is the truth.** Markdown artifacts are authoritative; the legacy
  system references files within commits. Cleanest for engineering-led
  organizations — one tool, one timestamp authority.
- **The legacy system is the truth.** Jira, ServiceNow, or the requirements tool
  holds the record; the markdown artifacts are working copies. Claude reads the
  record at session start and writes the outcome back through an
  [MCP](/model-context-protocol.md) connector in the same session that produced
  the spec or plan.
- **Linkage as the minimum bar.** Every artifact notes the record ID and every
  legacy record carries the commit SHA. A reasonable transitional state, at the
  cost of two sources of truth.

## Governance

Design review happens before any code is generated, when changing course is
still a matter of editing a document. The plan and its revisions are logged
along with who accepted it. Routine changes are approved by the engineer;
higher-risk ones go to a tech lead or architect.

## Measurement

- **Leading**: share of changes that merge from the first implementation pass,
  and time from plan approval to merged PR (both from PR metadata).
- **Lagging**: rework cycles per change, and how often the merged diff still
  matches the committed `plan.md`.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
