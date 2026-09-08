# AI-Native SDLC

Anthropic's playbook for rebuilding the software development lifecycle around
agentic coding, from the Claude Academy course of the same name. One page for
the model itself, then one page per play — what changes, how to start,
governance, and how to measure it.

## Start here

- [The AI-Native SDLC](ai-native-sdlc.md) — why the bottleneck moved out of the
  build phase, the six stages as a loop rather than a line, the committed
  artifact that carries work between them, and the split between advisory and
  deterministic controls.

## Stage 1: Plan

- [Capture as intent.md](capture-intent.md) — the originator brainstorms the
  idea with Claude and commits it as a version-controlled proto-spec in their
  own terms, instead of handing it through backlog refinement.

## Stage 2: Design

- [Requirements and Design in One Session](requirements-and-design.md) — Claude
  turns an approved `intent.md` into a `spec.md` constrained by the
  organization's skills, flagging the policy conflicts an analyst would have
  escalated.

## Stage 3: Build

- [Plan Mode as the Default Starting Point](plan-mode.md) — the plan becomes
  reviewable before any code exists, and the accepted `plan.md` is what later
  stages check the diff against. Also covers auto mode and the legacy
  source-of-truth problem.
- [The CLAUDE.md as Institutional Memory](claude-md.md) — the onboarding
  document a new joiner would need, kept under a page and corrected whenever
  Claude makes the same mistake twice.
- [Skills as Institutional Knowledge](skills-as-institutional-knowledge.md) —
  encode one inconsistently-enforced policy as a skill, and understand it as an
  advisory control that needs a deterministic hook behind it.
- [Parallel Sessions and Subagents](parallel-sessions-and-subagents.md) — one
  engineer drives several sessions in separate worktrees, with recurring jobs
  packaged as subagents; the ceiling is review capacity.

## Stage 4: Test

- [Give Claude a Feedback Loop](feedback-loop.md) — the session verifies its own
  work before an engineer sees it, and the check itself is protected from the
  agent fixing the code.
- [Continuous Evals in CI](continuous-evals.md) — 20 to 50 real tasks with
  checks, run whenever `CLAUDE.md`, skills, or hooks change, because
  configuration steers the agent and deserves regression testing.

## Stage 5: Deploy

- [AI in the PR Review Loop](ai-pr-review.md) — every PR gets an identical set
  of review passes defined in `REVIEW.md`, and human attention moves up to
  intent and risk.
- [Hooks as Approval Gates](hooks-as-approval-gates.md) — each human approval
  the process requires expressed as a hook that can allow, ask, or block, with
  the regulated-enterprise managed settings file annotated key by key.
- [CI/CD Integration and Deployment](ci-cd-integration.md) — Claude runs
  non-interactively in the pipeline for the judgment steps, sandboxed, with
  deploy and rollback exposed through MCP and autonomy tiered by environment.

## Stage 6: Maintain

- [Closing the Loop on Metrics](closing-the-loop.md) — a deterministic detection
  script invokes Claude on a control-band breach, tiered by sigma, and the
  diagnosis is written back as an `intent.md` that restarts the lifecycle.
