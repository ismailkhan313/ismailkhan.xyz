---
type: Practice
title: "Context Engineering"
description: Curating and maintaining the optimal set of tokens an LLM sees during inference — the discipline that supersedes prompt engineering once you move from one-shot prompts to agents running in a loop.
tags: [context-engineering, prompt-engineering, agents, anthropic, karpathy, attention-budget]
sources:
  - id: coinage
    resource: references/context-engineering-coinage-tweets.md
    title: "The 'context engineering' coinage tweets — Tobi Lütke and Andrej Karpathy (June 2025)"
  - id: anthropic-ce
    resource: references/anthropic-effective-context-engineering.md
    title: "Effective context engineering for AI agents (Anthropic, 2025-09-29)"
  - id: wikipedia-pe
    resource: references/wikipedia-prompt-engineering.md
    title: "Prompt engineering (Wikipedia, rev. 1373316427)"
generated: { by: claude-code/opus-5, at: 2026-09-07T07:20:21Z }
status: stable
---

**Context engineering** is the set of strategies for curating and maintaining
the optimal set of tokens — the information — available to a language model
during inference, including everything that lands there outside the
prompt.[^anthropic-ce] Where prompt engineering asks *what words do I write*,
context engineering asks the broader question: *what configuration of context
is most likely to generate the desired behavior?*

The unit of work is the whole context state — system instructions, tools,
[MCP](/model-context-protocol.md) servers, external data, message history — and
the curation happens repeatedly, every time you decide what to pass to the
model.
That repetition is the structural difference: writing a prompt is a discrete
task you finish, while context engineering is a loop that runs for as long as
the agent does.[^anthropic-ce]

## Where the term comes from

The term was proposed by **Tobi Lütke** (Shopify's CEO) on 19 June 2025:

> I really like the term "context engineering" over prompt engineering. It
> describes the core skill better: the art of providing all the context for the
> task to be plausibly solvable by the LLM.[^coinage]

Six days later, on 25 June 2025, **Andrej Karpathy** quote-tweeted him with the
endorsement that carried the term into general use.[^coinage] It's worth
getting the attribution right: Karpathy is usually credited with coining it,
but his post opens "+1 for 'context engineering' over 'prompt engineering'" —
he's seconding Lütke, not naming it. What Karpathy added was the definition
that stuck.

### Karpathy's premise

His argument has two moves. The first is that *the word "prompt" undersells the
job*:

> People associate prompts with short task descriptions you'd give an LLM in
> your day-to-day use. When in every industrial-strength LLM app, context
> engineering is the delicate art and science of filling the context window
> with just the right information for the next step.[^coinage]

The gap he's pointing at is between casual chat use and production systems. In
a real application the context window has to be packed with "task descriptions
and explanations, few shot examples, RAG, related (possibly multimodal) data,
tools, state and history, compacting" — and the failure is two-sided:

> Too little or of the wrong form and the LLM doesn't have the right context
> for optimal performance. Too much or too irrelevant and the LLM costs might
> go up and performance might come down.[^coinage]

That two-sided failure is the whole reason the practice needs a name. If more
context were monotonically better, there would be no engineering problem —
you'd just include everything.

The second move is deflationary, and it's the half that usually gets dropped
when the tweet is quoted: context engineering is **not** the whole job. Karpathy
lists what an LLM app also has to do — break problems into control flows,
dispatch calls to models of the right capability, handle
generation-verification UI flows, guardrails, security, evals, parallelism,
prefetching — and concludes that context engineering "is just one small piece
of an emerging thick layer of non-trivial software."[^coinage] The tweet is as
much a defense of application engineering against the "ChatGPT wrapper" jibe as
it is a coinage.

## Why context is scarce

Anthropic's account grounds the practice in an architectural
constraint.[^anthropic-ce] Needle-in-a-haystack benchmarking has surfaced
**context rot**: as the token count in the context window rises, the model's
ability to accurately recall information from that context falls. Some models
degrade more gently than others, but the characteristic shows up in all of them.

The cause is the transformer itself. Every token can attend to every other
token, which means *n* tokens produce **n² pairwise relationships**. Stretch
the context and the model's capacity to capture those relationships is spread
thinner. Compounding this, models learn their attention patterns from training
data in which short sequences are far more common than long ones, so they have
less experience and fewer specialized parameters for context-wide dependencies.

The useful framing that falls out of this is the **attention budget**: like
human working memory, an LLM has a finite pool it draws on, and every token
introduced depletes it. Context is therefore a resource with *diminishing
marginal returns*, not a container to fill. Anthropic is careful that this is
"a performance gradient rather than a hard cliff" — long contexts still work,
they just lose precision on retrieval and long-range reasoning.[^anthropic-ce]

Which yields the guiding principle, and it is the one line worth memorizing
from the whole literature:

> good context engineering means finding the **smallest** possible set of
> high-signal tokens that maximize the likelihood of some desired
> outcome.[^anthropic-ce]

## The anatomy of effective context

Anthropic works that principle through each component of context.

**System prompts** should sit at the *right altitude* — the Goldilocks zone
between two failure modes. Too low: engineers hardcode brittle if-else logic to
force exact behavior, which is fragile and expensive to maintain. Too high:
vague guidance that gives no concrete signal, often falsely assuming shared
context. The target is specific enough to guide behavior, flexible enough to
leave the model strong heuristics.[^anthropic-ce]

Organize prompts into distinct sections (`<background_information>`,
`<instructions>`, `## Tool guidance`, `## Output description`) delineated with
XML tags or Markdown headers — while noting that exact formatting matters less
as models improve. Strive for the minimal set of information that fully
specifies the expected behavior, where **minimal does not mean short**. The
recommended method is empirical: test a minimal prompt on the best available
model, then add instructions and examples in response to observed failure
modes.[^anthropic-ce]

**Tools** define the contract between an agent and its action space, so they
must be token-efficient in what they return and encourage efficient behavior.
They should be self-contained, robust to error, and unambiguous about their
intended use. The named failure mode is **bloated tool sets** with overlapping
functionality and ambiguous decision points — and the test for it is sharp: *if
a human engineer can't say definitively which tool applies in a given
situation, an agent can't be expected to do better.*[^anthropic-ce] This is the
same discipline the [single-agent pattern](</Agentic Design Patterns/single-agent.md>)
runs into from the other direction, where adding tools past a point degrades
tool selection.

**Examples** (few-shot prompting) remain strongly advised, but the common error
is stuffing in a laundry list of edge cases to cover every rule. Curate instead
a set of diverse, canonical examples that portray the expected behavior. For an
LLM, examples are the "pictures" worth a thousand words.[^anthropic-ce]

## Retrieval: just-in-time instead of up-front

Many AI-native applications use embedding-based retrieval *before* inference to
surface what the agent will need. Anthropic reports the field shifting toward
**just-in-time** strategies: rather than pre-processing data up front, the agent
holds lightweight identifiers — file paths, stored queries, web links — and
loads data at runtime with tools.[^anthropic-ce]

Claude Code works this way, writing targeted queries and using `head` and `tail`
to analyze large data without ever pulling full objects into context. The
analogy offered is human cognition: we don't memorize corpora, we build file
systems, inboxes, and bookmarks and retrieve on demand.

Two consequences are worth drawing out:

- **Metadata is signal.** A `test_utils.py` in a `tests/` folder means something
  different from the same filename under `src/core_logic/`. Folder hierarchies,
  naming conventions, and timestamps tell an agent how and when to use
  information — which means the *organization* of your data is part of your
  context engineering.
- **Progressive disclosure.** The agent discovers context incrementally through
  exploration, each interaction informing the next decision, assembling
  understanding layer by layer while holding only what's needed in working
  memory.

The trade-off is real: runtime exploration is slower than reading pre-computed
data, and without good tools and heuristics an agent will waste context chasing
dead ends. Hence the **hybrid** strategy — some data up front for speed, plus
autonomous exploration at the agent's discretion. Claude Code is again the
worked example: `CLAUDE.md` files are dropped into context up front, while
`glob` and `grep` retrieve files just in time.[^anthropic-ce]

## Long-horizon tasks

When a task's token count exceeds the context window — a large codebase
migration, a multi-hour research project — three techniques address the
limit.[^anthropic-ce] Anthropic's position is that waiting for bigger context
windows is not the answer: windows of *all* sizes remain subject to context
pollution and relevance problems wherever peak agent performance matters.

- **Compaction** — summarize a conversation nearing the window limit and
  reinitialize with the summary. In Claude Code this preserves architectural
  decisions, unresolved bugs, and implementation details while discarding
  redundant tool outputs, then continues with the compressed context plus the
  five most recently accessed files. The art is in what you discard: over-
  aggressive compaction loses subtle context whose importance only surfaces
  later. The tuning advice is to maximize recall first, then improve precision.
  The safest, lightest form is simply clearing old tool results.
- **Structured note-taking** (agentic memory) — the agent writes notes to
  persistent storage outside the context window and reads them back later. A
  `NOTES.md` file or a to-do list is enough to carry progress across dozens of
  tool calls. The illustration is *Claude Plays Pokémon*, which maintains tallies
  across thousands of game steps and, with no prompting about memory structure,
  develops maps, tracks achievements, and keeps combat notes — then resumes
  multi-hour sequences after a context reset by reading its own notes.
- **Sub-agent architectures** — specialized sub-agents work focused tasks in
  clean context windows and return only a distilled summary, often 1,000–2,000
  tokens, from explorations that may have consumed tens of thousands. The lead
  agent keeps the high-level plan; detailed search context stays isolated
  downstream.

Which to reach for depends on the task: compaction maintains conversational flow
where there's extensive back-and-forth, note-taking suits iterative development
with clear milestones, and multi-agent architectures pay off where parallel
exploration does.[^anthropic-ce]

These map directly onto patterns already in this wiki. Sub-agent
architectures are the [coordinator pattern](</Agentic Design Patterns/coordinator.md>)
and, more generally, [multi-agent systems](</Agentic Design Patterns/multi-agent-systems.md>)
— whose own context-engineering section names the same three levers from Google
Cloud's vocabulary: *isolating* context to the agent that needs it,
*persisting* it across steps, and *compressing* it. Isolation is the sub-agent,
persistence is note-taking, compression is compaction. Two independent sources
arriving at the same triad is reasonable evidence the taxonomy is real.

## Why this is the next evolution of prompt engineering

Anthropic's framing is that context engineering is "the natural progression of
prompt engineering," not its refutation.[^anthropic-ce] Four things drove the
shift:

1. **The workload changed from one-shot to looping.** Early LLM work was mostly
   prompts optimized for one-shot classification or generation, where the
   prompt genuinely *was* the whole input. An agent operating over many turns
   generates data each turn that might matter for the next, and that growing
   pile has to be refined continuously. There is no single artifact to
   perfect.[^anthropic-ce]
2. **The prompt stopped being most of the context.** System instructions, tool
   definitions, MCP servers, retrieved documents, and message history now
   dominate the token budget. Optimizing only the part you typed means
   optimizing a shrinking fraction of what the model actually reads.
3. **Scarcity became the binding constraint.** Once context rot and the
   attention budget are the limit, the question stops being "how do I phrase
   this?" and becomes "what earns its place in the window?" — a curation and
   eviction problem, not a writing problem.
4. **Model capability ate the manual technique.** As models got better at
   inferring intent, elaborate prompt construction lost marginal value for
   everyday tasks, and Wikipedia notes the same dynamic hollowing out the
   dedicated prompt engineer role.[^wikipedia-pe] What did *not* get easier is
   deciding what information an agent should have — that difficulty scales
   *with* capability, because more capable agents run longer and touch more.

The relationship, then, is containment rather than replacement: prompt
engineering is now one component of context engineering, which is exactly how
Anthropic's own article treats it — system prompts and few-shot examples appear
as two of the components to be engineered. See
[prompt engineering](/prompt-engineering.md) for what happened to the older
term and what remains live under it.

Wikipedia's independent framing corroborates the shift while adding an
operational dimension neither Karpathy nor Anthropic emphasizes: it defines
context engineering as the area concerned with non-prompt context supplied to
the model, aimed at reliability, provenance, and token efficiency, and
practiced through **token budgeting, provenance tags, versioning of context
artifacts, observability logging of which context was supplied, and context
regression tests** so that changes to context don't silently alter
behavior.[^wikipedia-pe] That last list is the tell that the discipline has
matured — those are the practices of configuration management, applied to
tokens.

## Where it's heading

Anthropic's closing expectation is that smarter models need less prescriptive
engineering, so agentic design trends toward "letting intelligent models act
intelligently, with progressively less human curation." But treating context as
a finite resource stays central regardless of capability.[^anthropic-ce] The
standing advice — "do the simplest thing that works" — is a caution against
building elaborate context machinery before you've shown a minimal version
fails.

[^coinage]: Tobi Lütke ([2025-06-19](https://x.com/tobi/status/1935533422589399127)) and Andrej Karpathy ([2025-06-25](https://x.com/karpathy/status/1937902205765607626)), posts on X. Local copy: [`references/context-engineering-coinage-tweets.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/context-engineering-coinage-tweets.md).

[^anthropic-ce]: Anthropic Applied AI team, ["Effective context engineering for AI agents"](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), 2025-09-29. Local copy: [`references/anthropic-effective-context-engineering.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-effective-context-engineering.md).

[^wikipedia-pe]: ["Prompt engineering"](https://en.wikipedia.org/w/index.php?title=Prompt_engineering&oldid=1373316427), Wikipedia, revision 1373316427 (2026-09-05). Local excerpt: [`references/wikipedia-prompt-engineering.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/wikipedia-prompt-engineering.md).
