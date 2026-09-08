---
type: Practice
title: "Give Claude a Feedback Loop"
description: The Test-stage play — always give the session a way to verify its own work (tests, a build, a screenshot diff) so it fixes its own mistakes before an engineer sees them, and protect the check itself from the agent fixing the code.
tags: [sdlc, claude-code, anthropic, testing, verification, hooks, tdd]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 4: Test.** A no-prerequisite play in
[the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>) that several others
lean on.

The problem is signal latency. Traditionally the signal that code works arrives
late — CI minutes later, a tester days later, production weeks later. With an
agent producing the code, a late signal means a person has to check all of its
output, and that person becomes the bottleneck.[^sdlc-playbook]

So: give the session a way to check its own work before a person sees it. Run
the tests, run the build, take the screenshot. Claude iterates until the check
passes, and what reaches the engineer has already passed it. This is the
[iterative refinement pattern](</Agentic Design Patterns/iterative-refinement.md>)
with a deterministic evaluator rather than a model as the judge.

## Not the same thing as a verifier subagent

The playbook is explicit about a distinction worth preserving. The **feedback
loop** runs throughout the task, as many times as the work requires. The
[**verifier subagent**](</AI-Native SDLC/parallel-sessions-and-subagents.md>) is
one way to package the *final* check: a fresh context window opened once the
session believes the work is done, so the verdict is not colored by the
assumptions that produced the code.

## How it runs

1. If checking the work takes a sequence of commands and some environment
   knowledge, wrap it in a single target — `make test`, `npm test` — that exits
   non-zero on failure.
2. List each command in the `CLAUDE.md` Commands section **with an example of
   healthy output**.
3. State a quantifiable target so Claude can check without asking: "all tests in
   `test_status.py` pass," "the screenshot matches the attached mock," "the
   endpoint returns 200 with the new field."
4. **For bug fixes, write the failing test first.** Ask Claude to reproduce the
   bug as a test, run it, and confirm it fails for the reason you expect. Commit
   that test. Only then ask for the fix, without editing the test. A test that
   existed before the fix, and that the agent couldn't rewrite, is proof the bug
   is gone.
5. For UI work, close the loop visually: give Claude a browser or screenshot
   tool and the mock, and let it implement, screenshot, compare, adjust. Two or
   three rounds is normal.
6. Make verification part of "done," stated in `CLAUDE.md`: run the tests before
   reporting a task complete, and show the output.
7. **Protect the loop itself.** An agent fixing code must not be able to weaken
   the check on that code — a [hook](</AI-Native SDLC/hooks-as-approval-gates.md>)
   that blocks edits to test files during a fix task does this. The alternative
   is catching it in review and rejecting any change that touches a test.

```markdown
## Verifying your work

- Build: make build (must finish with "Build succeeded")
- Test: make test (all green; never skip or delete a failing test)
- Lint: make lint (zero warnings)

Run all three before reporting any task complete, and paste the output.
If a test fails, fix the code, not the test.
```

Step 7 is the load-bearing one. Everything else raises the odds the code is
right; only step 7 stops the measurement from being edited by the thing it
measures.

## Governance

- **What is enforced**: verification before a task is reported done, and the
  block on editing test files during a fix — both as hooks where the
  organization wants them guaranteed.
- **What the evidence is**: the literal output of `make test`, the build log, or
  the screenshot diff. The evidence comes from the toolchain, not from the
  agent's summary of it.
- **Where it is logged**: the session transcript, forwarded by the OpenTelemetry
  export, and the PR's check run.
- **Who approves**: the code owner reviewing the PR, who can concentrate on
  intent and risk because the mechanical evidence is already attached.

## Measurement

- **Leading**: first-pass CI success rate for agent-written changes.
- **Lagging**: review time per PR, which should fall once the tests catch what
  reviewers used to catch, plus the change failure rate from the incident
  tracker.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
