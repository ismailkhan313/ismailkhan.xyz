---
type: Practice
title: "Requirements and Design in One Session"
description: The Design-stage play — Claude turns an approved intent.md into a spec.md in a single session constrained by the organization's skills, flagging the policy conflicts an analyst would have escalated, and the product owner reviews rather than writes.
tags: [sdlc, claude-code, anthropic, requirements, design, agent-skills, governance]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 2: Design.** The second play in [the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>).

Traditionally requirements and design are separate phases run by separate
teams: analysts formalize the idea into requirements, designers parse those back
into a design. The separation exists for accountability, and the playbook grants
that — its objection is that it is slow and *lossy*.[^sdlc-playbook]

The play compresses both into one prompted session. Claude takes the approved
[`intent.md`](</AI-Native SDLC/capture-intent.md>) and produces a requirements
and design spec, constrained by the organization's skills for brand, security,
compliance, and UX, with areas of concern flagged. The product owner reviews
that spec but does not write it.

## The role skills play here

This is the play that makes [Agent Skills](/agent-skills.md) load-bearing rather
than convenient. The organization's policies are what constrain the spec, and
they only constrain it if they are in the session — so the prerequisite is not
just "an `intent.md`" but brand, security, compliance, and UX policies already
[written as skills](</AI-Native SDLC/skills-as-institutional-knowledge.md>).

The consequence is the interesting part: policy conflicts surface *while the
spec is being written* rather than in a review weeks later. The prompt is
written to demand this explicitly.

```text
Read the attached intent.md and produce a requirements and design spec for
integrating it into our existing codebase. Apply the skills available to you
so the plan conforms to our brand guidelines, security policies and UX
standards. Document the spec fully as spec.md, ready to hand to the
engineering team. Describe clearly any areas of concern, especially where you
cannot satisfy contradicting policies.
```

## How it runs

1. The product owner opens a session with the organization's skills available
   and attaches the `intent.md`.
2. The prompt points at the intent, names the constraints, and demands flagged
   concerns. Run it by hand at first; then codify it as an organization-level
   slash command; then make acceptance of `intent.md` the trigger, with a
   non-interactive job that fires on merge and opens `spec.md` as a pull request
   (see [CI/CD integration](</AI-Native SDLC/ci-cd-integration.md>) for the
   plumbing). From that point the product owner's first involvement is the
   review.
3. The same product owner reviews the spec against the idea: does it solve the
   stated problem, and are the `intent.md` open questions answered or carried
   forward?
4. **Work the flagged concerns first.** These are the points an analyst would
   have escalated; the product owner resolves each with its policy owner before
   engineering sees the spec.
5. Commit `spec.md` alongside `intent.md`. The pair records what was asked for
   and what was decided.
6. The product owner decides whether spec and intent progress to build,
   consulting a technical lead for anything classed as higher risk. A human
   always makes this call, and accepting the spec starts
   [plan mode](</AI-Native SDLC/plan-mode.md>) in Stage 3.

For front-end work the playbook adds a variant: the product owner mocks the
design up in Claude Design from the `intent.md`, iterates on the mock, then
exports it to Claude Code to build.

## Governance

The live policy is read and applied while the spec is written, rather than
discovered as a violation later. Three things land in version control: the spec,
the prompt that produced it, and the skill versions in force. The product owner
signs off and routes flagged concerns to named policy owners.

Worth keeping in view: a skill is an **advisory** control. It makes the policy
likely to be applied, not guaranteed — which is why this play pairs with
[hooks](</AI-Native SDLC/hooks-as-approval-gates.md>) and
[PR review](</AI-Native SDLC/ai-pr-review.md>) downstream rather than standing
alone.

## Measurement

- **Leading**: elapsed time between the `intent.md` commit and the `spec.md`
  commit for the same change — two Git timestamps — against the old
  requirements-plus-design cycle.
- **Lagging**: requirements rework after build starts, counted as `spec.md`
  commits dated after the first `plan.md` commit for the same change.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
