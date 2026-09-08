---
type: Practice
title: "Hooks as Approval Gates"
description: The Deploy-stage play — express each human approval the change process requires as a hook that can allow, ask, or block, and put the non-negotiable ones in managed settings engineers cannot switch off.
tags: [sdlc, claude-code, anthropic, hooks, governance, permissions, sandboxing, enterprise, managed-settings]
sources:
  - id: sdlc-playbook
    resource: references/anthropic-ai-native-sdlc-playbook.md
    title: "The AI-Native SDLC Playbook (Claude Academy)"
generated: { by: claude-code/opus-5, at: 2026-09-08T00:00:00Z }
status: stable
---

**Stage 5: Deploy.** A no-prerequisite play in
[the AI-native SDLC](</AI-Native SDLC/ai-native-sdlc.md>), and the deterministic
half of its governance model.

[The build phase](</AI-Native SDLC/skills-as-institutional-knowledge.md>) uses
hooks as guardrails that allow or block with no human involved. A hook can also
**ask** — pausing the action until a specific person approves — which is what
release gating needs.[^sdlc-playbook]

The play sits in Deploy because the release gate is the clearest case, but hooks
are not deploy-specific: they run wherever Claude acts. They can block edits to
migrations and infra without a change ticket during Build, and stop the agent
[editing test files during a fix](</AI-Native SDLC/feedback-loop.md>) during
Test.

## How it runs

1. **Engineering leadership, with change management and compliance, lists the
   human approval gates that must survive** — change management sign-off,
   release authorization, edits to protected paths. This is the step that makes
   the play a governance exercise rather than a scripting one.
2. The platform engineer expresses each gate as a hook: a script that runs
   before Claude acts and can allow, ask, or block.
3. **Team hooks go in `.claude/settings.json` in Git; non-negotiable hooks go in
   managed settings** owned by the platform or IT admin, where individual
   engineers cannot switch them off.
4. **A block should explain itself.** When a hook stops an action, the reason and
   the route to approval appear in Claude's output.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/production-gate.sh" }
        ]
      }
    ]
  }
}
```

```bash
#!/bin/bash
# Production deploys require a named release authorization
cmd=$(jq -r '.tool_input.command' < /dev/stdin)
if [[ "$cmd" == *"deploy"* && "$cmd" == *"production"* ]]; then
  if [ -z "$RELEASE_APPROVAL" ]; then
    echo "Production deploys need a release authorization." >&2
    exit 2   # exit 2 blocks the action; the message goes to Claude
  fi
fi
exit 0
```

## Managed settings for a regulated enterprise

The playbook's fullest artifact is a managed settings file deployed by the
platform team through MDM or the admin console, which engineers cannot edit or
override:

```json
{
  "permissions": {
    "deny": [
      "Read(.env*)", "Read(./secrets/**)",
      "WebFetch", "Bash(curl *)", "Bash(wget *)"
    ],
    "allow": [
      "Bash(git *)", "Bash(make build)",
      "Bash(make test)", "Bash(make lint)"
    ],
    "disableBypassPermissionsMode": "disable"
  },
  "allowManagedPermissionRulesOnly": true,
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "network": { "allowedDomains": ["git.internal.example.com", "registry.npmjs.org"] },
    "credentials": {
      "files": [
        { "path": "~/.ssh", "mode": "deny" },
        { "path": "~/.aws/credentials", "mode": "deny" }
      ],
      "envVars": [ { "name": "GITHUB_TOKEN", "mode": "deny" } ]
    }
  },
  "allowManagedHooksOnly": true,
  "disableSideloadFlags": true,
  "allowManagedMcpServersOnly": true,
  "strictKnownMarketplaces": [
    { "source": "github", "repo": "example-corp/approved-plugins" }
  ],
  "requiredMinimumVersion": "2.1.193"
}
```

What each key buys, in control terms:

- **`permissions.deny`** keeps secrets out of the agent's context and blocks
  network egress through tools. **`permissions.allow`** pre-approves the safe
  inner loop, so the deny list doesn't turn into prompt fatigue.
- **`disableBypassPermissionsMode`** plus **`allowManagedPermissionRulesOnly`**
  mean no engineer, project file, or command-line flag can widen the rules.
- **`sandbox`** covers what permissions cannot. A tool-level deny on `WebFetch`
  doesn't stop a *shell command* reaching the network; the OS-level domain
  allowlist blocks egress outright. The two enforce one objective at different
  layers. `failIfUnavailable` and `allowUnsandboxedCommands` make the sandbox a
  precondition — Claude Code refuses to start when it can't initialize, and a
  command that fails inside it can't be retried outside it.
- **`credentials`** handles a case the deny rules miss: `permissions.deny`
  governs Claude's *file tools*, but a sandboxed shell command could still read
  `~/.ssh` or `~/.aws/credentials`. This block denies those reads and strips the
  listed secrets from sandboxed command environments.
- **`allowManagedHooksOnly`** means only hooks defined in managed settings run —
  including, note, blocking the standalone `.claude/settings.json` example
  above. To keep this play's gate enforced under it, define the gate in the
  managed file's own `hooks` block.
- **`disableSideloadFlags`** and **`strictKnownMarketplaces`** mean every skill,
  agent, hook, and MCP server on an engineer's machine came through the approved
  marketplace rather than a home directory.
- **`allowManagedMcpServersOnly`** makes the agent's
  [MCP](/model-context-protocol.md) tool surface an allowlist owned by the
  platform team.
- **`requiredMinimumVersion`** refuses to start below an approved floor, so the
  controls are enforced by a build the organization has actually assessed.

The playbook flags this as a starting point rather than a template: every deny
rule removes capability, and the right balance depends on the data
classification of the repo.

Two of these deserve emphasis because they are easy to get wrong. The
layered-enforcement point — a tool deny and an OS-level sandbox enforcing *one*
objective at *two* layers — is the general principle behind the whole play. And
`allowManagedHooksOnly` silently invalidates the repo-level gate most teams
would write first.

## Governance

Hooks *are* the approval gates. The condition is enforced every time, for
everyone; allow and block decisions are logged with a timestamp; and the gate
also defines what counts as approval — an approved change ticket, the release
manager's sign-off. This is the
[human-in-the-loop pattern](</Agentic Design Patterns/human-in-the-loop.md>)
implemented as configuration rather than as a prompt instruction, which is
exactly what makes it a control.

## Measurement

- **Leading**: time spent waiting on each approval gate. Every hook decision goes
  to the OpenTelemetry export with a timestamp and an allow/block verdict, so
  the wait is visible per gate.
- **Lagging**: gate violations reaching production, before and after hooks.

[^sdlc-playbook]: ["The AI-Native SDLC Playbook"](https://academy.claude.com/courses/ai-native-sdlc-playbook), Claude Academy, retrieved 2026-09-08. Local copy: [`references/anthropic-ai-native-sdlc-playbook.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-ai-native-sdlc-playbook.md).
