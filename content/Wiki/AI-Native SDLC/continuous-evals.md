---
type: Practice
title: "Continuous Evals in CI"
description: The Test-stage play — a suite of 20 to 50 real tasks with checks, run non-interactively whenever the agent's configuration changes, so CLAUDE.md, skills, and hooks get the regression testing that code gets.
tags: [sdlc, claude-code, anthropic, evals, testing, ci, governance]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 4: Test.** A play in [the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>)
that depends on [`CLAUDE.md`](</AI-Native SDLC/claude-md.md>) and
[the feedback loop](</AI-Native SDLC/feedback-loop.md>).

Evals are the AI-native equivalent of stage-gate QA: a suite that runs whenever
the agent's *configuration* changes.[^sdlc-playbook] When a new model is swapped
in or a prompt is rewritten, the eval suite says whether the agent still does
the work to the same standard.

The premise that makes this a distinct play is that
[`CLAUDE.md`](</AI-Native SDLC/claude-md.md>),
[skills](</AI-Native SDLC/skills-as-institutional-knowledge.md>), and
[hooks](</AI-Native SDLC/hooks-as-approval-gates.md>) are not documentation —
they steer the agent, so they deserve the regression testing that code gets.

## How it runs

1. A platform engineer collects **20 to 50 real tasks** from recent work, each
   with its expected or accepted outcome.
2. Write each as an eval: the prompt, plus the checks that define acceptable —
   tests pass, lint clean, behavior unchanged, policy followed.
3. Run the suite non-interactively in CI, on a schedule *and* on any change to
   `CLAUDE.md`, skills, or hooks.
4. **Gate configuration changes on the results.** A skill change that drops the
   pass rate gets reviewed before it merges.
5. Every production incident gets an eval, written by the team that owned the
   incident, and stays in the suite as a regression test.

```yaml
name: Agent evals
on:
  pull_request:
    paths: ['CLAUDE.md', '.claude/**']
  schedule:
    - cron: '0 2 * * *'
jobs:
  evals:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @anthropic-ai/claude-code
      - name: Run eval suite
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          for eval in evals/*.json; do
            claude -p "$(jq -r '.prompt' $eval)" \
              --allowedTools "Read,Edit,Bash(make test)" \
              --output-format json > result.json
            ./evals/check.sh "$eval" result.json
          done
```

## The suite is live, not fixed

The caveat the playbook attaches matters more than the mechanics: **as models
improve, cases that once discriminated stop doing so.** A suite that isn't
gaining new cases from ongoing monitoring is quietly losing its power to
distinguish a good configuration from a bad one. The incident-to-eval rule in
step 5 is what keeps it fed, and it is also the hinge that connects this play to
[closing the loop](</AI-Native SDLC/closing-the-loop.md>) in Stage 6.

Not every team needs this continuously. Where the cost or cadence doesn't
justify it, the same suite can run offline on a set schedule.

## Governance

Evals give QA a gate that keeps up with agent output. The pass-rate threshold is
enforced as a merge check, runs are logged so results can be compared over time,
and the team that owns a configuration change approves it.

## Measurement

- **Leading**: eval pass rate over time, and how long a production incident takes
  to become a permanent eval.
- **Lagging**: regressions caught in CI versus regressions found in production.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
