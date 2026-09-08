---
type: Practice
title: "AI in the PR Review Loop"
description: The Deploy-stage play — every PR gets an identical set of review passes defined in REVIEW.md, Claude both gives and receives review, and human attention moves up to whether the change does what the plan intended.
tags: [sdlc, claude-code, anthropic, code-review, governance, pull-requests]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 5: Deploy.** A play in [the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>)
that depends on [evals](</AI-Native SDLC/continuous-evals.md>) and
[subagents](</AI-Native SDLC/parallel-sessions-and-subagents.md>), with
[skills](</AI-Native SDLC/skills-as-institutional-knowledge.md>) helping.

Review capacity is the constraint this play attacks. Traditionally it is planned
around human output: a PR waits for a reviewer to read all of it, quality varies
with the reviewer's load, and the author chases while the backlog
grows.[^sdlc-playbook]

Under the play, every PR gets an identical set of review passes with findings
ranked by severity, and human attention moves up a level — to whether the change
does what the plan intended and whether the risk is acceptable. Claude both
*gives* review (against the organization's policies) and *receives* it
(addressing comments on its own PRs).

## How it runs

1. **Start with the managed Code Review service** — an admin enables it and
   selects repositories. Run the review in your own CI with the
   `claude-code-action` when you need control of the pipeline or want API calls
   routed through your own cloud agreement.
2. **The tech lead writes `REVIEW.md`** at the repo root, divided into the passes
   the organization cares about: bugs and logical errors; security and
   vulnerabilities; compliance against [`spec.md`](</AI-Native SDLC/requirements-and-design.md>),
   [`plan.md`](</AI-Native SDLC/plan-mode.md>), and design principles. It also
   defines what counts as *Important* versus a *Nit*, and what to skip.
3. **The tech lead sets the human threshold.** Findings do not approve or block a
   PR on their own; branch protection still requires a code owner's approval. A
   platform engineer who wants to gate merges can read the severity counts the
   check run publishes as a machine-readable tally.
4. **The fix loop**: when a reviewer or the author tags `@claude` on a review
   comment, Claude addresses it and pushes the fix, with the thread recording
   both the request and the change. For PRs Claude opened, teams wrap this in a
   custom slash command that sweeps unresolved comments and failing checks until
   the PR is green and waiting only on code owner approval.
5. **Findings feed back into [`CLAUDE.md`](</AI-Native SDLC/claude-md.md>).**
   When review flags a mistake for the second time, the correction goes into the
   file as part of that review — and because review reads `CLAUDE.md`, the
   mistake is caught from the next PR onward. Review also flags when a change has
   made `CLAUDE.md` outdated.
6. **Tune monthly.** The tech lead rates findings so the reviewer improves, caps
   nit volume in `REVIEW.md`, and excludes generated paths and anything CI
   already enforces.

```markdown
# Review instructions
## Passes
Run three passes and tag each finding with its pass:
- Bugs: logic errors, broken edge cases, subtle regressions
- Security: injection risks, authentication gaps, PII in logs
- Compliance: the change matches spec.md, plan.md and our design principles
## What Important means here
Reserve Important for findings that would break behavior, leak data
or breach a policy. Style and naming are nits.
## Cap the nits
Report at most five nits per review; summarize the rest as a count.
## Do not report
Generated files under src/gen/ and anything CI already enforces.
```

The nit cap and the exclusion list are the parts most likely to be skipped and
most likely to decide whether the play survives. A reviewer that reports
everything trains people to read nothing.

## Governance

Separation of duties is preserved for a structural reason: **the agent that
wrote the code has no way to approve it.** The policy in `REVIEW.md` is applied
to all PRs; findings, fixes, ratings, and approvals are logged in the PR
history, so the PR is the audit record; approval comes from a human through
branch protection, informed by the findings.

This is the [review-and-critique pattern](</Agentic Design Patterns/review-and-critique.md>)
with the gate held by a person rather than the critic — which is what keeps it a
control rather than an automation.

## Measurement

- **Leading**: time to first review, which should fall to minutes, and the share
  of review comments resolved without a human touching the branch.
- **Lagging**: defects and vulnerabilities caught before merge, set against those
  escaping to production.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
