---
type: Practice
title: "Agent Skills Best Practices"
description: How to write a skill an agent actually finds and follows — sourcing it from real expertise, spending context sparingly, calibrating how prescriptive to be, and iterating against evaluations rather than assumptions.
tags: [agent-skills, skills, best-practices, authoring, evaluation, context-engineering, claude-code]
sources:
  - id: anthropic-bp
    resource: references/anthropic-agent-skills-best-practices.md
    title: "Skill authoring best practices (Claude Platform documentation)"
  - id: as-bp
    resource: references/agentskills-io-best-practices.md
    title: "Best practices for skill creators (agentskills.io)"
  - id: cc-skills
    resource: references/claude-code-skills.md
    title: "Extend Claude with skills (Claude Code documentation)"
generated: { by: claude-code/opus-5, at: 2026-09-07T19:48:41Z }
status: stable
---

The two authoritative guides on writing [Agent Skills](/agent-skills.md) —
Anthropic's and the open standard's — agree on almost everything, and the
places they emphasize differently are the useful part. Anthropic's guide is
about authoring mechanics: structure, discovery, degrees of freedom,
evaluation.[^anthropic-bp] The agentskills.io guide leads with a question
Anthropic's assumes away — *where does the content come from in the first
place* — and it names the failure mode most directly.[^as-bp]

## Start from real expertise

> A common pitfall in skill creation is asking an LLM to generate a skill
> without providing domain-specific context — relying solely on the LLM's
> general training knowledge. The result is vague, generic procedures ("handle
> errors appropriately," "follow best practices for authentication") rather
> than the specific API patterns, edge cases, and project conventions that make
> a skill valuable.[^as-bp]

This is worth quoting in full because it invalidates the most tempting way to
produce a skill. A model asked to write a skill from nothing writes down what
it already knows — which is precisely the content that earns nothing, since the
agent reading the skill also already knows it.

Two sourcing methods actually work:[^as-bp]

- **Extract from a hands-on task.** Do the real work in conversation with an
  agent, supplying context and corrections as you go, then extract the
  reusable pattern. What to harvest: the sequence of steps that worked, the
  places you *corrected* the agent ("use library X, not Y"), the input and
  output formats, and the project-specific facts it didn't know.
- **Synthesize from existing artifacts.** Feed it your material — runbooks,
  style guides, schemas, code-review comments, issue trackers, and especially
  version-control history, where patches reveal what actually goes wrong. A
  data-pipeline skill built from your team's incident reports beats one built
  from a generic best-practices article, because it captures *your* schemas and
  failure modes.

Anthropic reaches the same place from the other direction: complete a task with
normal prompting, notice what context you kept providing, and ask Claude to
turn that into a skill.[^anthropic-bp]

## Context is a public good

Once a skill triggers, its whole body sits in the context window competing with
the system prompt, conversation history, other skills' metadata, and the actual
request.[^anthropic-bp] The default assumption both guides start from is that
**the model is already smart** — so only add what it lacks.

The test each guide proposes is the same one phrased two ways: "Does this
paragraph justify its token cost?"[^anthropic-bp] and, more operationally,
**"Would the agent get this wrong without this instruction?" If no, cut
it.**[^as-bp]

The canonical illustration, ~150 tokens versus ~50:[^anthropic-bp]

```markdown
<!-- Too verbose: explains what the agent already knows -->
PDF (Portable Document Format) files are a common file format that contains
text, images, and other content. To extract text from a PDF, you'll need to
use a library. There are many libraries available...

<!-- Better: jumps to what it wouldn't know -->
Use pdfplumber for text extraction. For scanned documents, fall back to
pdf2image with pytesseract.
```

The agentskills.io corollary is the harsher one: if the agent already handles
the whole task well without the skill, the skill may not be adding
anything.[^as-bp] Overly comprehensive skills actively hurt — the agent
struggles to find what's relevant and can chase instructions that don't apply
to the task at hand. Concise, stepwise guidance with one working example beats
exhaustive documentation.[^as-bp]

## Scope it as a coherent unit

Deciding what a skill covers is like deciding what a function does. Scoped too
narrowly, a single task drags in several skills, with the overhead and
conflicting instructions that implies; scoped too broadly, it can't be
activated precisely. Querying a database and formatting the results is probably
one unit; adding database administration to it is probably two.[^as-bp]

## Calibrate control to fragility

Match how prescriptive you are to how fragile the task is — and calibrate each
*part* of a skill independently, since most skills mix both.[^as-bp]

| Freedom | Use when | Form |
| --- | --- | --- |
| **High** | Multiple approaches are valid, decisions depend on context | Prose instructions, heuristics |
| **Medium** | A preferred pattern exists, some variation is fine | Pseudocode, parameterized scripts |
| **Low** | Operations are fragile, consistency is critical, sequence matters | Exact commands: "Run exactly this script… Do not modify the command or add additional flags" |

Anthropic's analogy: a robot on a narrow bridge with cliffs on both sides needs
guardrails and exact instructions; a robot in an open field needs a direction
and the freedom to find its own route.[^anthropic-bp] The agentskills.io
refinement is that for the open-field case, **explaining *why* outperforms
rigid directives** — an agent that understands the purpose behind an
instruction makes better context-dependent decisions.[^as-bp]

Two rules follow from the same principle:

- **Provide defaults, not menus.** "You can use pypdf, or pdfplumber, or
  PyMuPDF, or pdf2image…" is a worse instruction than one default plus an
  escape hatch: use pdfplumber; for scanned PDFs needing OCR, use pdf2image
  with pytesseract.[^anthropic-bp][^as-bp]
- **Favor procedures over declarations.** A skill should teach *how to approach
  a class of problems*, not *what to produce for one instance*. "Join `orders`
  to `customers` on `customer_id`, filter `region = 'EMEA'`" is an answer;
  "read the schema, join on the `_id` foreign-key convention, apply the
  request's filters as WHERE clauses" is a method.[^as-bp]

## Make it discoverable

The `description` is the only thing loaded at startup, so it's the only thing
that decides whether the skill triggers — and it may be competing with 100+
other skills.[^anthropic-bp]

- **Say what it does *and* when to use it**, with concrete trigger terms:
  `Extract text and tables from PDF files, fill forms, merge documents. Use
  when working with PDF files or when the user mentions PDFs, forms, or
  document extraction.` Not `Helps with documents`.[^anthropic-bp]
- **Always write in third person.** The description is injected into the system
  prompt; "I can help you process Excel files" and "You can use this to…" both
  cause discovery problems.[^anthropic-bp]
- **Name in gerund form** — `processing-pdfs`, `analyzing-spreadsheets`,
  `writing-documentation`. Noun phrases (`pdf-processing`) and action forms
  (`process-pdfs`) are acceptable; `helper`, `utils`, `tools`, `documents`, and
  `data` are not.[^anthropic-bp]
- **Front-load the key use case.** In Claude Code the combined `description`
  and `when_to_use` text is truncated at 1,536 characters in the skill listing,
  and when the listing overflows its budget, descriptions are dropped starting
  with the least-invoked skills.[^cc-skills]

## Structure for progressive disclosure

`SKILL.md` is a table of contents, not the manual. Keep it under 500 lines and
split past that.[^anthropic-bp] Three organizing patterns:[^anthropic-bp]

1. **High-level guide with references** — a quick-start inline, then
   `FORMS.md`, `REFERENCE.md`, `EXAMPLES.md` linked by purpose.
2. **Domain-specific organization** — `reference/finance.md`,
   `reference/sales.md`, `reference/product.md`, so a sales question never
   loads the finance schema. Bundling a `grep` recipe for the reference
   directory is a cheap addition here.
3. **Conditional details** — basic content inline, advanced paths linked
   ("**For tracked changes**: see `REDLINING.md`").

Three mechanical rules carry most of the benefit:

- **Keep references one level deep from `SKILL.md`.** On nested chains the
  agent previews with `head -100` rather than reading whole files, and gets
  incomplete information.[^anthropic-bp]
- **Say *when* to load each file.** "Read `references/api-errors.md` if the API
  returns a non-200 status" beats "see references/ for details" — that's what
  makes progressive disclosure work as designed.[^as-bp]
- **Give reference files over 100 lines a table of contents**, so a partial
  read still reveals the file's full scope.[^anthropic-bp] And name files for
  their content: `form_validation_rules.md`, not `doc2.md`.[^anthropic-bp]

## Instruction patterns that pay for themselves

- **Gotchas.** The agentskills.io guide calls this the highest-value content in
  many skills: environment-specific facts that defy reasonable assumptions.
  Not "handle errors appropriately" but "the `users` table uses soft deletes —
  queries must include `WHERE deleted_at IS NULL`", or "`/health` returns 200
  as long as the web server is running even if the database is down; use
  `/ready`". Keep them in `SKILL.md`, since the agent won't know to go load a
  file about a trap it doesn't know exists.[^as-bp]
- **Templates for output format.** Concrete structures beat prose descriptions
  because agents pattern-match against them. Say explicitly whether the
  template is strict ("ALWAYS use this exact structure") or a sensible
  default.[^anthropic-bp][^as-bp]
- **Checklists for multi-step workflows.** Give the agent a checklist to copy
  into its response and tick off. This works for analysis tasks as much as for
  script-driven ones, and it's what stops the agent skipping a validation
  step.[^anthropic-bp]
- **Validation loops.** Do the work → run the validator → fix → repeat → only
  proceed when it passes. The "validator" can be a script or a reference
  document the agent checks its output against.[^anthropic-bp][^as-bp]
- **Plan-validate-execute.** For batch or destructive operations, have the
  agent write its plan to a structured file, validate that file against a
  source of truth with a script, and only then execute. The load-bearing piece
  is a verbose validator: "Field 'signature_date' not found. Available fields:
  customer_name, order_total, signature_date_signed" gives the agent enough to
  self-correct.[^anthropic-bp][^as-bp]

These last two are the [review-and-critique](</Agentic Design Patterns/review-and-critique.md>)
and [iterative-refinement](</Agentic Design Patterns/iterative-refinement.md>)
patterns reached from the other end — a gate expressed as an instruction rather
than as a second agent.

## Content hygiene

- **No time-sensitive information.** "Before August 2025, use the old API"
  becomes wrong on its own. Put superseded material in a collapsed "Old
  patterns" section instead.[^anthropic-bp]
- **One term per thing.** Pick "API endpoint" or "URL" or "route" and stay with
  it; same for "field" vs "box" vs "element", "extract" vs "pull" vs
  "get".[^anthropic-bp]
- **Forward slashes always**, even on Windows: `scripts/helper.py`.[^anthropic-bp]

## Skills with executable code

- **Solve, don't defer.** A script should handle its error conditions rather
  than failing and leaving the agent to work it out — catch `FileNotFoundError`
  and create the file, catch `PermissionError` and fall back.[^anthropic-bp]
- **No voodoo constants.** `TIMEOUT = 47 # Why 47?` is a defect. Document the
  reasoning: "HTTP requests typically complete within 30 seconds; longer
  timeout accounts for slow connections." Ousterhout's law applies — if you
  don't know the right value, the agent certainly won't.[^anthropic-bp]
- **Prefer a bundled script to generated code** for anything deterministic:
  more reliable, no code-generation time, and the script's source never enters
  context.[^anthropic-bp] The signal that you need one is behavioral — if
  execution traces show the agent reinventing the same logic every run, write
  it once and bundle it.[^as-bp]
- **Make execution intent explicit.** "Run `analyze_form.py` to extract fields"
  and "See `analyze_form.py` for the extraction algorithm" are different
  instructions; the agent shouldn't have to guess which you meant.[^anthropic-bp]
- **Don't assume packages are installed**, and name required ones. On the
  Claude API there is no network access and no runtime installation at all, so
  a skill that pip-installs is a skill that doesn't run there.[^anthropic-bp]
- **Fully qualify MCP tool names** — `BigQuery:bigquery_schema`,
  `GitHub:create_issue`. Without the server prefix the agent may not find the
  tool when several [MCP](/model-context-protocol.md) servers are
  connected.[^anthropic-bp]

## Evaluate first, iterate against reality

The strongest procedural claim in Anthropic's guide is about ordering: **build
evaluations before writing extensive documentation.**[^anthropic-bp] Run the
model on representative tasks *without* the skill, document what actually
fails, build three scenarios from those gaps, measure the baseline, then write
only enough content to pass them. Otherwise you document imagined problems.

An evaluation is a small structured record — the skill under test, the query,
the input files, and a rubric of expected behaviors:[^anthropic-bp]

```json
{
  "skills": ["pdf-processing"],
  "query": "Extract all text from this PDF file and save it to output.txt",
  "files": ["test-files/document.pdf"],
  "expected_behavior": [
    "Successfully reads the PDF file using an appropriate library or CLI tool",
    "Extracts text from all pages without missing any",
    "Saves the extracted text to output.txt in a readable format"
  ]
}
```

There's no built-in runner in the platform docs; in Claude Code, the
`skill-creator` plugin generates `evals/evals.json`, grading, and benchmark
files inside the skill directory.[^cc-skills]

The iteration loop both guides describe is **two agents and a person**:
Claude A helps you author and refine the skill; Claude B, a fresh instance with
the skill loaded, does real work with it; you watch B and bring specifics back
to A ("it forgot to filter test accounts even though the skill says to — is
that rule prominent enough?").[^anthropic-bp] Models understand the skill
format natively, so no special prompting is needed to get A to produce
well-formed `SKILL.md` content — the work is in the review passes: cut what the
model already knows, move growing sections into reference files.

What to watch while B works:[^anthropic-bp][^as-bp]

- **Read execution traces, not just final outputs.** Wasted steps usually mean
  instructions too vague (the agent tries several approaches first), not
  applicable to this task (it follows them anyway), or too many options with no
  default.
- **Unexpected exploration order** suggests the structure isn't as intuitive as
  you thought; **missed references** mean the links aren't prominent enough.
- **A file read on every run** belongs in `SKILL.md`; **a file never read** is
  either unnecessary or badly signaled.
- **Every correction you have to make by hand is a gotcha to add.** This is the
  most direct way to improve a skill.[^as-bp]
- **Test on every model you'll use it with.** What Opus handles from a terse
  instruction, Haiku may need spelled out; what Opus finds over-explained wastes
  context for everyone.[^anthropic-bp]

## The pre-share checklist

Anthropic's own, condensed:[^anthropic-bp]

**Core** — description is specific and says both what and when; body under 500
lines; extra detail in separate files; no time-sensitive content; consistent
terminology; concrete examples; file references one level deep; workflows have
clear steps.

**Code** — scripts solve rather than defer; explicit error handling; no
unjustified constants; required packages listed and verified available; no
Windows paths; validation steps for critical operations; feedback loops where
quality matters.

**Testing** — at least three evaluations; tested with Haiku, Sonnet, and Opus;
tested on real scenarios; team feedback incorporated.

## Where it sits

Nearly every rule here is [context engineering](/context-engineering.md)
applied to instructions rather than data: the description is the retrieval
index, the reference files are just-in-time retrieval, and "would the agent get
this wrong without this?" is the attention-budget argument in one sentence. The
patterns that survive from [prompt engineering](/prompt-engineering.md) survive
here too — few-shot input/output pairs remain the clearest way to convey a
desired style, which is why the examples pattern is in both guides. The format
those rules apply to is described in [Agent Skills](/agent-skills.md).

[^anthropic-bp]: ["Skill authoring best practices"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices), Claude Platform documentation, retrieved 2026-09-07. Local copy: [`references/anthropic-agent-skills-best-practices.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-agent-skills-best-practices.md).

[^as-bp]: ["Best practices for skill creators"](https://agentskills.io/skill-creation/best-practices), agentskills.io, retrieved 2026-09-07. Local copy: [`references/agentskills-io-best-practices.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/agentskills-io-best-practices.md).

[^cc-skills]: ["Extend Claude with skills"](https://code.claude.com/docs/en/skills), Claude Code documentation, retrieved 2026-09-07. Local copy: [`references/claude-code-skills.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/claude-code-skills.md).
