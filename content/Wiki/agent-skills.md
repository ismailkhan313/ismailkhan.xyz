---
type: Concept
title: "Agent Skills"
description: Folders of procedural knowledge an agent loads on demand — the open SKILL.md format, the progressive disclosure that makes it cheap, and how Claude Code discovers, scopes, and invokes them.
tags: [agent-skills, skills, claude-code, anthropic, progressive-disclosure, context-engineering, standards]
sources:
  - id: skills-overview
    resource: references/anthropic-agent-skills-overview.md
    title: "Agent Skills (Claude Platform documentation)"
  - id: as-spec
    resource: references/agentskills-io-specification.md
    title: "Agent Skills specification (agentskills.io)"
  - id: cc-skills
    resource: references/claude-code-skills.md
    title: "Extend Claude with skills (Claude Code documentation)"
  - id: anthropic-bp
    resource: references/anthropic-agent-skills-best-practices.md
    title: "Skill authoring best practices (Claude Platform documentation)"
generated: { by: claude-code/opus-5, at: 2026-09-07T19:48:41Z }
status: stable
---

An **Agent Skill** is a directory with a `SKILL.md` file in it.[^as-spec] That
is the whole format. The file carries two required pieces of metadata — a
`name` and a `description` — followed by markdown instructions, and the
directory may carry anything else the instructions need: scripts to run,
reference documents to read, templates to fill.

What makes this more than a file-naming convention is *when* each part gets
read. Anthropic's framing is that a skill is "organized like an onboarding
guide you'd create for a new team member":[^skills-overview] the agent skims
the table of contents on day one and opens the chapter on expense reports only
when someone asks it to file one. Skills are the packaging format for the
procedural knowledge an agent doesn't already have, and progressive disclosure
is the reading order that keeps that packaging from costing anything until it's
needed.

## What a skill is, and what it isn't

The three comparisons worth pinning down, because a skill is easy to confuse
with each of them:

- **Not a prompt.** A prompt is conversation-level and one-off. A skill is
  filesystem-level and reusable, so you don't repeat the same guidance across
  conversations.[^skills-overview] The trade is that a prompt is always in
  context and a skill has to be *discovered* — which is why the `description`
  field carries so much weight.
- **Not a tool, and not [MCP](/model-context-protocol.md).** MCP gives a model
  new *capabilities* — a connection down to systems it otherwise can't reach.
  A skill gives it *procedure*: what to do with capabilities it already has,
  in what order, with which conventions. A skill can tell the agent to call an
  MCP tool, and the authoring guidance is that it should name that tool fully
  qualified (`ServerName:tool_name`) when it does.[^anthropic-bp]
- **Not CLAUDE.md.** In Claude Code the distinction is a budget one: CLAUDE.md
  content is loaded every session, a skill's body loads only when used, "so
  long reference material costs almost nothing until you need it."[^cc-skills]
  The documentation's own trigger for creating one is telling — when a section
  of CLAUDE.md "has grown into a procedure rather than a fact."[^cc-skills]

## Progressive disclosure is the whole trick

Skills load in three stages, each with a different cost:[^skills-overview]

| Level | When loaded | Token cost | Content |
| --- | --- | --- | --- |
| **1. Metadata** | Always, at startup | ~100 tokens per skill | `name` and `description` from the frontmatter |
| **2. Instructions** | When the skill triggers | Under 5k tokens | The `SKILL.md` body |
| **3. Resources** | As needed | Nothing until accessed | Bundled files — read into context, or scripts run through bash so only their *output* costs tokens |

The architectural claim underneath is that skills exist on a filesystem the
agent navigates with bash, exactly as a person would.[^skills-overview] Three
consequences follow, and they're the reason the format is shaped this way:

- **On-demand file access.** A skill can bundle dozens of reference files; if
  the task needs one, that's the one that gets read and the rest cost zero.
- **Efficient script execution.** When the agent runs `validate_form.py`, the
  script's *code* never enters context — only its output does. That makes a
  bundled script strictly cheaper, and more reliable, than having the model
  generate the equivalent code each time.
- **No practical limit on bundled content.** Complete API documentation, large
  datasets, extensive examples: none of it is a context penalty until read.

This is [context engineering](/context-engineering.md) with the filesystem as
the store — the same just-in-time retrieval argument, applied to the agent's
own instructions rather than to its data. The `description` field is doing the
work the retrieval index would do, which is why authoring guidance treats it as
the single most consequential line in the file.[^anthropic-bp]

## The specification

The format is published as an open standard at
[agentskills.io](https://agentskills.io), and Claude Code implements it rather
than a proprietary variant.[^cc-skills]

### Directory layout

```
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

The three optional directories are conventions, not requirements — `scripts/`
for code the agent runs, `references/` for documents it reads on demand,
`assets/` for templates, images, schemas, and other static
resources.[^as-spec]

### Frontmatter

Six fields, of which two are required:[^as-spec]

| Field | Required | Constraints |
| --- | --- | --- |
| `name` | Yes | 1–64 characters, lowercase alphanumerics and hyphens only, no leading, trailing, or consecutive hyphens; must match the parent directory name |
| `description` | Yes | 1–1024 characters, non-empty; says what the skill does *and* when to use it |
| `license` | No | License name, or the name of a bundled license file |
| `compatibility` | No | ≤500 characters; environment requirements — intended product, system packages, network access |
| `metadata` | No | Arbitrary string→string map for properties the spec doesn't define |
| `allowed-tools` | No | Space-separated list of pre-approved tools. Experimental; support varies by implementation |

Anthropic's platform documentation adds two constraints the spec page doesn't
spell out: `name` may not contain XML tags or the reserved words "anthropic"
and "claude", and neither may `description`.[^skills-overview]

Most skills need only the two required fields. `compatibility` in particular is
for the exceptions — "Requires Python 3.14+ and uv", "Requires git, docker, jq,
and access to the internet."[^as-spec]

### Budgets and file references

- Keep `SKILL.md` under **500 lines and 5,000 tokens**.[^as-spec] Past that,
  move material into separate files.
- Reference other files by **relative path from the skill root**, and keep
  those references **one level deep** from `SKILL.md`.[^as-spec] The reason is
  behavioral rather than aesthetic: on a nested chain the agent tends to
  preview files with something like `head -100` instead of reading them whole,
  so information at the end of the chain arrives incomplete.[^anthropic-bp]
- Validate with the reference library: `skills-ref validate ./my-skill` checks
  frontmatter and naming conventions.[^as-spec] In Claude Code,
  `claude plugin validate .claude/skills` finds `SKILL.md` files whose
  frontmatter doesn't parse.[^cc-skills]

## Skills in Claude Code

Claude Code supports custom skills only — the pre-built document skills (pptx,
xlsx, docx, pdf) are API and claude.ai features — and it discovers them from
the filesystem with no upload step.[^skills-overview] It also *extends* the
open format with a set of fields the spec doesn't define, which is the main
thing to keep straight when authoring for more than one surface.

### Where they live

| Location | Path | Applies to |
| --- | --- | --- |
| Enterprise | Managed settings directory | All users in the organization |
| Personal | `~/.claude/skills/<skill-name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<skill-name>/SKILL.md` | This project only |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` | Wherever the plugin is enabled |

On a name collision, enterprise overrides personal, and personal overrides
project; any of the three overrides a bundled skill of the same name (though
not the bundled skill's aliases). Plugin skills sit in a `plugin-name:skill-name`
namespace and therefore can't collide at all.[^cc-skills]

Project skills load from `.claude/skills/` in the starting directory and every
parent up to the repository root. Skills in *nested* `.claude/skills/`
directories below the starting directory load lazily — the first time Claude
reads or edits a file in that subdirectory — which is how a monorepo package
supplies skills that apply only to work inside it. A nested skill that collides
with a root one stays available under a directory-qualified name like
`apps/web:deploy`.[^cc-skills]

The command you type comes from the **directory name**, not the frontmatter
`name`, for personal and project skills; `name` there sets only the display
label. In a plugin skill, `name` sets the last segment of the command and the
plugin prefix stays.[^cc-skills] This catches people out: renaming the skill in
frontmatter doesn't rename `/the-command`.

### Who invokes it

By default both parties can: you type `/skill-name`, and Claude loads it
automatically when the description matches. Two fields narrow that:[^cc-skills]

| Frontmatter | You can invoke | Claude can invoke | When loaded |
| --- | --- | --- | --- |
| (default) | Yes | Yes | Description always in context; body loads on invocation |
| `disable-model-invocation: true` | Yes | No | Description *not* in context; body loads when you invoke |
| `user-invocable: false` | No | Yes | Description always in context; body loads on invocation |

The split is a good design prompt in itself. `disable-model-invocation` is for
anything with side effects whose timing you want to own — `/commit`,
`/deploy`, `/send-slack-message`; you don't want Claude deciding to deploy
because the code looks ready. `user-invocable: false` is for background
knowledge that isn't an action: a `legacy-system-context` skill Claude should
consult when relevant, but which nobody would meaningfully "run."[^cc-skills]

### The Claude Code extensions

Beyond the spec's six fields, `SKILL.md` in Claude Code accepts a much larger
set — all optional, with only `description` recommended.[^cc-skills] The ones
that change what a skill *is*, rather than just labeling it:

- **`when_to_use`** — extra trigger phrases, appended to `description` in the
  listing. The two together are capped at 1,536 characters.
- **`argument-hint`** and **`arguments`** — autocomplete hint, and named
  positional arguments for `$name` substitution in the body.
- **`allowed-tools`** / **`disallowed-tools`** — pre-approve tools for the
  invoking turn, or remove them from the pool while the skill is active. Both
  clear on your next message.
- **`model`**, **`effort`** — override the model or effort level while the
  skill is active.
- **`context: fork`**, **`agent`**, **`background`** — run the skill in its own
  subagent context, optionally as a specific agent type (`Explore`, `Plan`,
  `general-purpose`), in the background by default.
- **`paths`** — glob patterns that limit automatic activation to work on
  matching files.
- **`hooks`** — hooks registered when the skill is invoked, for the rest of the
  session.

The body gets extensions too. String substitutions (`$ARGUMENTS`, `$0`,
`$issue`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_PROJECT_DIR}`) and **dynamic context
injection** — `` !`git diff HEAD` `` runs before Claude reads the skill, so the
instructions arrive already grounded in the current state of the
repository.[^cc-skills]

**Portability is the catch.** Outside Claude Code — claude.ai uploads, the
Skills API, packaging with `package_skill.py` — only the spec's six fields are
accepted, and an extra field is a hard error rather than an ignored key:
`Unexpected key(s) in SKILL.md frontmatter: argument-hint.`[^cc-skills] Body
features like dynamic context injection simply don't function there either. A
skill written to the spec loads in Claude Code unchanged; a skill written to
Claude Code's full field set does not travel.

### What it costs

Two budgets are worth knowing before a skill collection gets large:[^cc-skills]

- **The listing.** Every skill's name and description sit in context so Claude
  knows what exists. The listing's budget is 1% of the model's context window
  (`skillListingBudgetFraction`), and when it overflows, descriptions are
  dropped starting with the skills you invoke least — which can silently strip
  the keywords a skill needs to trigger. Put the key use case first in the
  description. `/doctor` estimates the listing's cost; `/skill-doctor` finds
  skills you never invoke; `/context` shows the post-budget size.
- **Persistence.** An invoked skill's rendered content enters the conversation
  as one message and *stays there* across later turns — Claude Code does not
  re-read the file. Write standing instructions, not one-time steps. Through
  auto-compaction, the most recent invocation of each skill is re-attached with
  its first 5,000 tokens, sharing a combined 25,000-token budget filled from
  the most recent backwards, so skills invoked early in a long session can drop
  out entirely.

### Sharing

Project skills go in version control under `.claude/skills/`; broader
distribution is a plugin with a `skills/` directory, or organization-wide
deployment through managed settings.[^cc-skills] Skills enabled on a claude.ai
account can be synced down into `~/.claude/skills/synced/`, and Cowork and
cloud sessions read *those* rather than your local personal skills — a personal
skill that exists only on your machine is "not found" when a scheduled routine
tries to invoke it.[^cc-skills]

## Across surfaces

Skills work on the Claude API (with the code execution tool, referencing a
`skill_id` in the `container` parameter), in Claude Code, and on
claude.ai.[^skills-overview] Three constraints cut across them:

- **Nothing syncs.** A skill uploaded to claude.ai is not available through the
  API; API skills aren't on claude.ai; Claude Code's are filesystem-based and
  separate from both. You manage each surface separately.[^skills-overview]
- **Sharing scope differs.** claude.ai custom skills are per-user with no
  admin-managed org-wide distribution; API skills are workspace-wide; Claude
  Code skills are personal, project, or plugin-shared.[^skills-overview]
- **The runtime differs, and it constrains what you can write.** On the API,
  skills run sandboxed with *no network access and no runtime package
  installation* — only pre-installed packages. In Claude Code they have the
  same network access as any other program on your machine, and the guidance is
  to install packages locally rather than globally.[^skills-overview]

## Security

The documentation's position is blunt: use skills only from sources you trust,
because a skill is instructions plus code, and a malicious one can direct the
agent to invoke tools or execute code in ways that don't match its stated
purpose — data exfiltration, unauthorized access.[^skills-overview] Treat
installing one like installing software. Skills that fetch from external URLs
are the sharpest case, since fetched content can carry instructions of its own
and a dependency that was safe can change.

Claude Code adds a specific trap worth naming: workspace trust does *not* gate
`allowed-tools`. A project skill's tool grants apply whenever the skill is
invoked, including in a `-p` run inside a folder you've never trusted — so a
skill checked into a repository can grant itself broad tool access. Read the
`allowed-tools` of repo-provided skills before running Claude Code
there.[^cc-skills]

## Where it sits

Skills are the third leg of the same problem the other two open standards on
this wiki address, and the boundaries are cleaner than the marketing suggests:
[MCP](/model-context-protocol.md) standardizes the connection *down* to tools
and data, [A2A](/a2a-protocol.md) standardizes communication *across* to peer
agents, and Agent Skills standardize the *procedural knowledge* an agent brings
to either. None of the three substitutes for another.

For a single agent, a skill is the cheapest way to raise the ceiling of the
[single-agent pattern](</Agentic Design Patterns/single-agent.md>) without
adding architecture — new competence, no new components. `context: fork` is
where it stops being that: a forked skill is a
[subagent](</Agentic Design Patterns/multi-agent-systems.md>) with its own
context window, which is the parallel pattern reached through a `SKILL.md`
instead of an orchestration framework.

Writing one well is a separate discipline with its own literature — see
[Agent Skills Best Practices](/agent-skills-best-practices.md).

[^skills-overview]: ["Agent Skills"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview), Claude Platform documentation, retrieved 2026-09-07. Local copy: [`references/anthropic-agent-skills-overview.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-agent-skills-overview.md).

[^as-spec]: ["Specification"](https://agentskills.io/specification), agentskills.io, retrieved 2026-09-07. Local copy: [`references/agentskills-io-specification.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/agentskills-io-specification.md).

[^cc-skills]: ["Extend Claude with skills"](https://code.claude.com/docs/en/skills), Claude Code documentation, retrieved 2026-09-07. Local copy: [`references/claude-code-skills.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/claude-code-skills.md).

[^anthropic-bp]: ["Skill authoring best practices"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices), Claude Platform documentation, retrieved 2026-09-07. Local copy: [`references/anthropic-agent-skills-best-practices.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-agent-skills-best-practices.md).
