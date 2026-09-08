---
type: Practice
title: "Closing the Loop on Metrics"
description: The Maintain-stage play — a deterministic detection script watches a metric's control bands and invokes Claude without a person in the path, tiered by sigma, with the diagnosis written back as an intent.md that restarts the lifecycle.
tags: [sdlc, claude-code, anthropic, monitoring, incidents, autonomy, governance, claude-tag]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 6: Maintain.** The final play in
[the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>), and the one that
makes it a loop rather than a line. It depends on
[captured intent](</AI-Native SDLC/capture-intent.md>) for its output format and
on [CI/CD](</AI-Native SDLC/ci-cd-integration.md>) for the rollback path its
highest tier invokes.

Every earlier stage needs a person to start it. This one runs
headless.[^sdlc-playbook] A trigger — a control-band breach, a ticket, a channel
message, a schedule — invokes Claude without a person in the path; Claude
diagnoses, acts only through gated routes, and writes what it finds as
`intent.md`, which then goes through the stages above. People triage and review
that work rather than starting it.

Traditionally maintenance is reactive in the worst sense: an alert fires at 3
a.m. and can be missed, a ticket sits in the backlog, post-mortem actions never
reach the codebase because another fire started.

## Detection stays deterministic

The design decision worth carrying away is that **no model is involved in
detection.** A version-controlled, unit-tested script watches production and
invokes Claude only when a control band is breached. The model is in the
diagnosis, never in the trigger.

1. The service owner or platform engineer picks **one metric with a stable
   rolling baseline** — CI test failure rate, post-deploy 5xx rate, PR cycle
   time.
2. They write the detection script: typically mean and standard deviation over a
   rolling window with rules (Western Electric or similar) so the bands catch
   slow drift as well as spikes.
3. **Response tiers live in version-controlled config.** At 1σ the script only
   logs; at 2σ it invokes Claude read-only to diagnose; at 3σ Claude may act,
   but only by opening a PR into the review gate or triggering a pre-approved
   runbook.
4. The trigger layer is a scheduled workflow, a webhook from the existing
   monitoring stack, or a cron job inside the network. Claude runs stateless —
   a non-interactive CI step or an Agent SDK service in a sandboxed container —
   so a loop can begin and end without anyone starting it.
5. The agent writes its diagnosis as `intent.md` in the Stage 1 format: the
   anomaly and its evidence, a proposed outcome, affected systems, open
   questions. From there it goes through the pipeline like anything else.
6. The service owner or on-call engineer triages the queue — fix now, schedule,
   or dismiss — routing product-facing findings to the product owner.
   **Dismissals tune the bands**, which is how the noise floor comes down.
7. When a fix ships, [add an eval for the incident](</AI-Native SDLC/continuous-evals.md>)
   so the class of problem is protected against going forward.

```yaml
metric: ci_test_failure_rate
baseline: rolling_30d
rules: western_electric
tiers:
  1sigma: { action: log }
  2sigma: { action: diagnose,
            tools: "Read,Grep,Bash(gh run view *)" }
  3sigma: { action: propose,
            routes: [pull_request, runbook:rollback-deploy] }
```

The tier ladder is the [human-in-the-loop pattern](</Agentic Design Patterns/human-in-the-loop.md>)
expressed as a threshold: autonomy is granted in proportion to how far the
metric has moved, and the top tier still routes through a gate rather than
around it. Between stages, an independent confidence check — a deterministic
test or an adversarial reviewing agent — decides whether the previous stage's
output continues or escalates to a human.

Three worked examples:

- CI test failure rate breaches 3σ → the agent quarantines the flaky test or
  opens a revert PR, and the review gate decides.
- Post-deploy 5xx rate breaches 3σ with a deployment in the window → the agent
  triggers the existing rollback pipeline.
- PR cycle time trips a drift rule → the agent writes a report for engineering
  leadership. Worth noting: the harness works for *process* metrics, not only
  production ones.

## Incidents arriving through a channel

Work does not only arrive as a metric. Claude Tag (public beta in Slack) makes
Claude a member of an incident channel under its own identity, so a 10 p.m.
message gets a first responder and the response itself becomes part of the loop.
The conversation stays in the channel — anyone there can guide it, test
hypotheses, and investigate in real time, with channel history adding to
auditability. Through MCP, Claude verifies the metric is back at baseline,
confirms it in the thread, and writes the post-mortem to a version-controlled
lessons file that future investigations can read.

The same path handles ordinary work: a small, well-bounded fix arrives as a PR
through the review gate, and anything larger is written up as `intent.md` for
Stage 1 — at which point the loop is feeding itself.

## Governance

Tier boundaries are enforced from version-controlled config, with permissions
and managed settings denying production access. Invocations, findings, and
triage decisions are logged with a timestamp. A service owner triages and
approves findings, resulting changes go through the normal PR review gate, and
the runbooks the agent may trigger were approved in advance.

## Measurement

- **Leading**: time from band breach to an `intent.md` in the triage queue,
  against the old time from incident to post-mortem action.
- **Lagging**: the share of findings that become merged fixes, and repeat
  incidents of the same class — which should fall as fixes add cases to the eval
  suite.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
