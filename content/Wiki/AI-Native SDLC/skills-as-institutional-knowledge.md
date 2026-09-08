---
type: Practice
title: "Skills as Institutional Knowledge"
description: The Build-stage play — encode one inconsistently-enforced policy as a skill owned by its policy owner, distributed through the repo or a plugin, and understood as an advisory control that needs a deterministic hook behind it.
tags: [sdlc, claude-code, anthropic, agent-skills, governance, hooks, policy]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 3: Build.** A no-prerequisite play in
[the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>), and the one that
[requirements and design](</AI-Native SDLC/requirements-and-design.md>) depends
on.

Skills are how an organization makes institutional knowledge operational:
explicit, version controlled, applied broadly, updated centrally when policy
changes.[^sdlc-playbook] For what a skill *is* — the `SKILL.md` format,
progressive disclosure, discovery — see [Agent Skills](/agent-skills.md); for
how to write one well, [Agent Skills Best Practices](/agent-skills-best-practices.md).
What this play adds is the *governance* framing.

The rule of thumb it offers for the boundary: write a skill for institutional
knowledge that must be applied consistently; don't write one for things that
belong in [`CLAUDE.md`](</AI-Native SDLC/claude-md.md>) or in a prompt.

## How it runs

1. **Pick one piece of knowledge that is enforced inconsistently today** — a
   security standard, an API design convention, a brand rule. Starting from an
   existing inconsistency is what makes the result measurable.
2. Write it as a skill: a folder with a `SKILL.md` whose frontmatter says when
   it triggers and whose body says what to do. An engineer writes it *from the
   policy owner's source of truth*, using Claude to help.
3. Put it at `.claude/skills/<name>/` so it ships with the code, or distribute
   it organization-wide through a plugin.
4. **Test that it triggers.** Ask Claude to do the relevant task in several
   different ways and confirm the skill loads each time.
5. When the policy changes, change the skill and have the policy owner sign off.
6. Engineers pick up the new version automatically in their next session.

```markdown
---
name: secure-api-review
description: Apply the API security standard. Use whenever creating or
  modifying an external-facing endpoint, reviewing API code, or
  generating an OpenAPI spec.
---
# Secure API review
When you create or change an API endpoint:
1. Authentication: every endpoint requires the gateway JWT;
   no anonymous routes outside /health.
2. Input validation: validate request bodies against the OpenAPI
   schema and reject unknown fields.
3. Audit: every state-changing endpoint emits an audit event with
   actor, action, entity and timestamp.
4. Data classification: fields tagged pii in the schema must never
   appear in logs or error messages.
Run scripts/check-endpoints.sh and include its output in your summary.
```

## A skill is an advisory control

This is the sentence the play turns on: **a skill is a control, but an advisory
one.** It makes Claude likely to apply the policy while the code is written, and
nothing forces a session to comply.

A policy that must always hold therefore needs something deterministic behind
it — a [hook](</AI-Native SDLC/hooks-as-approval-gates.md>) that blocks the
action, or a [review pass](</AI-Native SDLC/ai-pr-review.md>) that re-checks the
policy at the PR. The skill makes violations rare; the hook makes them close to
impossible. Skill invocations are logged in session traces, and the policy owner
reviews skill changes like code.

## Hooks as build-time guardrails

The play carries a note on the other half of the pairing. Most of Claude's
actions during implementation are file edits and shell commands, so the build
phase is where hooks fire most often. Build-phase hooks can:

- Block edits to protected paths — generated classes, a frozen package.
- Run the formatter and linter after file edits, so drift never accumulates.
- Keep credentials out of the diff.
- Back any skill whose policy has to hold without exception.

Because a hook runs on every matching action, build-phase hooks should be fast
and scoped to the file that changed; heavier checks belong at the commit or the
PR. And a hook that asks a *human* for approval belongs in Stage 5, not here —
an approval prompt during the build puts a person back on the critical path of
every session running in parallel.

## Measurement

- **Leading**: time from the policy owner approving a change to the updated
  skill merging, taken from the PR on the skill folder.
- **Lagging**: PR review findings that cite the policy, which should fall toward
  zero. Where they don't, either the skill isn't triggering or its text has
  drifted from the official policy — a useful diagnostic either way.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
