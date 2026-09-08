---
type: Practice
title: "CI/CD Integration and Deployment"
description: The Deploy-stage play — run Claude non-interactively inside the pipeline for the judgment steps, sandbox it with scoped credentials, expose deploy and rollback through MCP, and tier autonomy by environment up to a gate the agent cannot pass.
tags: [sdlc, claude-code, anthropic, ci-cd, deployment, mcp, sandboxing, governance, dora]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 5: Deploy.** A play in [the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>)
that depends on [PR review](</AI-Native SDLC/ai-pr-review.md>) and
[hooks](</AI-Native SDLC/hooks-as-approval-gates.md>) — because, as the playbook
puts it, the gates must exist before automation accelerates anything through
them.[^sdlc-playbook]

Pipelines run deterministic scripts, and anything needing judgment waits for a
human: triaging the flaky test, writing the changelog, working out why the build
broke. Deployment and rollback are runbooks a human follows under pressure. The
play puts Claude inside the pipeline for exactly those judgment steps, in a
sandbox with scoped credentials, and exposes deployment tooling through
[MCP](/model-context-protocol.md) so the workflow that wrote and tested the
change can also ship and roll it back.

## How it runs

The sequencing is deliberately conservative — read-only first, write behind
gates, then deployment powers as an allowlist.

1. **Start with read-only judgment steps.** Use `claude -p` in a pipeline job to
   triage a failed build, summarize a flaky test, or draft the changelog.
2. **Add write steps behind the existing gates** — fixing lint, updating
   generated docs, addressing `@claude` review comments. Anything the agent
   writes arrives as a PR through branch protection; the agent has no route to
   push to main.
3. **Sandbox execution.** Agent jobs run in containers under a network policy
   with short-lived scoped tokens, and hold no production credentials by
   default.
4. **Expose deployment through MCP.** Deploy, status, and rollback become tools,
   scoped per environment — so the agent's deployment powers are an allowlist
   rather than a shell script with credentials.
5. **Tier autonomy by environment.** In development the agent deploys freely; in
   production it prepares the release and the release manager authorizes it,
   with a hook enforcing the gate. Staging sits in between.
6. **Rehearse rollback.** It should be the most exercised path in the pipeline —
   a single command the agent can run, exercised regularly in staging.
   [Closing the loop](</AI-Native SDLC/closing-the-loop.md>) calls this rollback
   when a control band is breached, so it has to be proven in advance.

```yaml
- name: Triage failed build
  if: failure()
  run: >
    claude -p "Read the build log at out/build.log. Identify the most
    likely cause, say whether the failure looks flaky or real, and write a
    three-line summary for the PR thread." >> triage.md
```

Model access is a deployment decision too: the API, or Amazon Bedrock, Google
Cloud's Vertex AI, or Microsoft Foundry where traffic must stay on the
organization's own cloud agreement.

## Governance

The governing principle is a single sentence: **the agent may act up to the
production gate and cannot pass it.** Three controls enforce it.

- **Branch protection** turns anything the agent writes into a PR, with no direct
  path to main.
- **The production deploy hook** blocks the release until a named release manager
  authorizes it. Each non-interactive run acts under the agent's own identity,
  so the pipeline log separates what the agent did from what the engineer who
  triggered it did.
- **Per-environment permission tiers** set how much the agent may do on the way
  to the gate.

The identity point is easy to skim past and is what makes the pipeline log an
audit record rather than a mixed transcript.

## Measurement

- **Leading**: the share of pipeline failures triaged without paging a human,
  from the CI/CD logs.
- **Lagging**: DORA measures, which the CI system and deployment tooling already
  emit.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
