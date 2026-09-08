---
type: Practice
title: "Parallel Sessions and Subagents"
description: The Build-stage play — one engineer drives several Claude Code sessions at once, each isolated in its own Git worktree, with recurring jobs packaged as subagents; the ceiling is how many streams one person can review properly.
tags: [sdlc, claude-code, anthropic, subagents, worktrees, parallelism, multi-agent]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 3: Build.** A play in [the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>)
that depends on [`CLAUDE.md`](</AI-Native SDLC/claude-md.md>), since every
session reads it, and is helped by
[the feedback loop](</AI-Native SDLC/feedback-loop.md>), since a session that
can verify its own work needs less supervision.

The play distinguishes two things that get conflated:[^sdlc-playbook]

- **A parallel session** is another full Claude Code instance working a separate
  task in its own Git worktree. Independent sessions know nothing about each
  other; the engineer steering them is the only thing they share.
- **A subagent** runs *inside* a single session as a scoped helper with its own
  context window and tool limits, suited to jobs that recur across tasks.

Parallel sessions raise how many tasks are in flight; subagents keep each
session focused on its own. In the vocabulary of the
[agentic design patterns](</Agentic Design Patterns/choosing-a-pattern.md>),
sessions are not a multi-agent system at all — there is no orchestrator, and the
human is the only shared state — while subagents are the
[parallel pattern](</Agentic Design Patterns/parallel.md>) with context
isolation as the point.

## How it runs

1. Split the work into tasks that touch different files, using the
   [plan](</AI-Native SDLC/plan-mode.md>) to see where the work is independent.
   Tasks that share files run in one session, one after another.
2. Give each parallel task its own worktree — `claude --worktree feature-auth`
   in one terminal, `claude --worktree fix-rate-limit` in another. A worktree is
   a separate checkout on its own branch, which stops sessions colliding on
   files.
3. **Two or three sessions is a sensible start.** The practical ceiling is how
   many streams one person can review properly; add sessions only while review
   is keeping up.
4. Turn repeated jobs into subagents — markdown files in `.claude/agents/`, each
   with a name, a description of when to use it, and the tools it may touch.
   Check them into Git so the team shares them.

The examples the playbook names map onto familiar patterns: a **code simplifier**
that strips needless complexity after the main agent finishes, a **verifier**
that runs the app and checks behavior — the
[review-and-critique pattern](</Agentic Design Patterns/review-and-critique.md>)
— and a **researcher** that explores the codebase and reports back without
flooding the main context.

```markdown
---
name: verifier
description: Runs the app and checks the change works before the session reports done
tools: Bash, Read
---
Start the app with make run. Exercise the changed behavior and the two
nearest neighboring flows. Report what you ran, what you saw, and any
behavior that does not match plan.md. Do not fix anything; report only.
```

"Do not fix anything; report only" is the line that makes the verifier a
control. A checker that can also repair what it finds stops being independent
evidence.

## Governance

More sessions means more output, so the controls have to live in the repo rather
than in any one session: hooks and permission settings there apply to all
sessions, and what a session does is logged and attributed to the engineer who
ran it. Permissions also need tuning in the other direction — sessions waiting
on approval prompts for commands the organization considers safe defeat the
point.

## Measurement

- **Leading**: concurrent sessions per engineer *while review quality holds*,
  counted from the OpenTelemetry export, and the share of the day spent steering
  rather than waiting.
- **Lagging**: changes merged per engineer per week, read alongside the rework
  rate. The pairing is the safeguard — throughput alone would reward exactly the
  over-parallelization the ceiling in step 3 warns about.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
