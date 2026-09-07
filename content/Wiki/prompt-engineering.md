---
type: Practice
title: "Prompt Engineering"
description: Structuring natural-language input to get specified outputs from a generative model — the techniques catalog, why prompts are brittle, and what actually happened to the term once context engineering absorbed it.
tags: [prompt-engineering, context-engineering, techniques, chain-of-thought, few-shot, prompt-injection]
sources:
  - id: wikipedia-pe
    resource: references/wikipedia-prompt-engineering.md
    title: "Prompt engineering (Wikipedia, rev. 1373316427)"
  - id: anthropic-ce
    resource: references/anthropic-effective-context-engineering.md
    title: "Effective context engineering for AI agents (Anthropic, 2025-09-29)"
  - id: coinage
    resource: references/context-engineering-coinage-tweets.md
    title: "The 'context engineering' coinage tweets — Tobi Lütke and Andrej Karpathy (June 2025)"
generated: { by: claude-code/opus-5, at: 2026-09-07T07:20:21Z }
status: stable
---

**Prompt engineering** is the process of structuring natural-language inputs —
prompts — to produce specified outputs from a generative AI model.[^wikipedia-pe]
The Oxford English Dictionary gives it as "the action or process of formulating
and refining prompts for an artificial intelligence program, algorithm, etc., in
order to optimize its output or to achieve a desired outcome; the discipline or
profession concerned with this." In 2023, *prompt* was runner-up for Oxford's
word of the year.

This page exists mostly to answer a question that gets asked in a misleading
form. The short version: the **job title** is largely gone, the **term** has
been superseded as the name of the discipline, and the **practice** is alive and
sitting inside [context engineering](/context-engineering.md). Those three
fates are different, and collapsing them is where "prompt engineering is dead"
goes wrong. The [long answer](#is-it-deprecated) is below.

## The techniques

A 2024 survey found **over 50 distinct text-based prompting techniques**, 40
multimodal variants, and a vocabulary of 33 terms — which the article reads,
correctly, as evidence that the field lacks standardized
terminology.[^wikipedia-pe] The durable ones:

- **Multi-shot / few-shot** — include examples for the model to learn from
  in-context, e.g. completing `maison → house, chat → cat, chien →`. This is
  [in-context learning](#in-context-learning), and it survives intact as one of
  the components of context engineering.
- **Chain-of-thought (CoT)** — proposed by Google researchers in 2022; induces
  the model to answer a multi-step problem with intermediate reasoning steps.
  Applied to PaLM (540B) it reached state-of-the-art on mathematical reasoning
  benchmarks. Originally few-shot, it was later found to work zero-shot by
  simply appending *"Let's think step-by-step."*
- **Self-consistency** — run several CoT rollouts and take the most common
  conclusion.
- **Tree-of-thought** — generalizes CoT to multiple parallel reasoning lines
  with backtracking, using breadth-first, depth-first, or beam search.
- **Role assignment** — instruct the model to adopt a persona.
- **Retrieval-augmented generation (RAG)** — retrieve from a document
  collection at query time so the model answers from specified sources,
  enabling domain-specific and current information without retraining.
  **GraphRAG** (Microsoft Research) extends this with knowledge graphs so the
  model can connect disparate facts and summarize semantic concepts across
  large datasets.

CoT's benefits are narrower than its reputation. A meta-analysis of 100+ studies
found substantial gains concentrated in **mathematical, logical, and symbolic
reasoning**, with much smaller improvements elsewhere — and on cognitive-
psychology tasks where deliberation *impairs* human performance, CoT reduced
model accuracy.[^wikipedia-pe] It is a tool for a class of problems, not a
general-purpose accuracy switch.

This wiki covers several of these from the practitioner's angle already:
zero/one/few-shot and role prompting in
[GAIL Module 4](</Google GAIL/module-4-genai-apps.md>), and CoT and ReAct as
reasoning-loop techniques in
[GAIL Module 5](</Google GAIL/module-5-genai-agents.md>). The
[ReAct pattern](</Agentic Design Patterns/react.md>) is where a prompting
technique becomes an architecture.

## Why prompts are brittle

The reason prompt engineering never stabilized into reliable practice is that
model behavior is extremely sensitive to things that carry no
meaning.[^wikipedia-pe]

- Reordering the examples in a prompt has produced **accuracy shifts of more
  than 40 percentage points**.
- Formatting changes alone have produced swings of up to **76 accuracy points**
  in few-shot settings.
- Linguistic features — morphology, syntax, lexico-semantic choices — measurably
  change task performance. Clausal syntax, for instance, improves consistency
  and reduces uncertainty in knowledge retrieval.
- The sensitivity **persists** despite larger models, more few-shot examples, or
  instruction tuning.

Two structural limitations follow, and they're why the discipline stayed a craft:
effective strategies are **model-specific** — a technique that helps one model
can hurt another — and prompts are **brittle**, in that minor changes to
phrasing, punctuation, or word order produce dramatically different outputs at
identical semantic intent. Together these make durable, transferable prompt
patterns hard to establish.[^wikipedia-pe]

Proposed responses are evaluative rather than prescriptive: **FormatSpread**
evaluates a range of plausible prompt formats to report a performance interval
instead of a point estimate, and **PromptEval** estimates performance
distributions across diverse prompts to give robust metrics like quantiles.
Both amount to admitting that a single measured prompt score is not a real
number.

### In-context learning

A model's ability to learn temporarily from its prompt is **in-context
learning** — an emergent property of scale, whose efficacy increases at a
different rate in larger models than smaller ones. Unlike training and
fine-tuning, which change parameters durably, in-context learning is temporary;
training a model to do it can be seen as meta-learning, "learning to
learn."[^wikipedia-pe] This is the mechanism every prompting technique on this
page ultimately exploits.

## Automating it

The response to brittleness has been to stop doing it by hand.[^wikipedia-pe]

- **Automatic prompt engineer (APE)** — one LLM beam-searches over prompts for
  another: show it input/output pairs, ask for instructions that would produce
  those outputs, score each by the log-probability of the outputs, then refine
  the best.
- **Auto-CoT** — vectorize a question library, cluster it, pick diverse
  centroid-proximate questions, run zero-shot CoT on each, and use the results
  as few-shot demonstrations.
- **MIPRO** — optimizes instructions and few-shot demonstrations across
  multi-stage programs.
- **GEPA** — combines LLM-based execution-trace analysis with Pareto
  evolutionary search, reporting **10% gains over reinforcement learning with
  35× fewer rollouts**.
- **Soft prompting** (prefix-tuning, prompt tuning) — gradient descent over
  floating-point vectors rather than tokens, maximizing output log-likelihood.
- **DSPy** and similar frameworks expose these optimizers as programmatic
  pipeline components.

This branch is *growing*, not shrinking, and it complicates any simple
"deprecated" story: the parts of prompt engineering that could be handed to a
compiler are being handed to one.

## Prompt injection

**Prompt injection** is a security exploit in which an adversary crafts input
that looks legitimate but causes unintended model behavior. It works because
models cannot reliably distinguish developer-defined instructions from user
input, which lets an attacker bypass safeguards and steer
behavior.[^wikipedia-pe]

This is the part of the field that has become *more* important rather than
less. Every technique on this page that widens what enters the context window —
RAG, tool output, retrieved documents, agent-to-agent messages — widens the
injection surface with it. It's the security cost of context engineering, and
it belongs on the same ledger.

## Is it deprecated?

Not as a practice. Three different things travel under this name, and they have
had three different fates.

**The job title is effectively obsolete.** Employees titled "prompt engineer"
were hired across industries during the 2020s AI boom, but the title has become
uncommon — models now produce better prompts than humans, and prompting is
taught as general corporate training rather than staffed as a specialty. The
*Wall Street Journal* put it bluntly in 2025: the job "was one of the hottest in
2023, but has become obsolete due to models that better intuit user intent and
to company trainings."[^wikipedia-pe]

**The term has been superseded as the name of the discipline.** This is what
Lütke and Karpathy were arguing in June 2025 — not that prompting stopped
mattering, but that the word misdescribes the work. Karpathy's objection is
specifically lexical: "people associate prompts with short task descriptions
you'd give an LLM in your day-to-day use," while the actual job in a production
app is filling the whole context window.[^coinage] The complaint is that the
term is too small, not that the activity is worthless.

**The practice is alive, and now a component of something larger.** Anthropic
frames context engineering as "the natural progression of prompt engineering,"
and its own guidance devotes sections to system prompts — clarity, the right
altitude, sectioning with XML tags or Markdown headers — and to few-shot
examples, which it "continue[s] to strongly advise."[^anthropic-ce] You cannot
do context engineering without doing prompt engineering; the prompt is simply no
longer the *whole* of what you engineer.

What genuinely eroded is narrower than the headline suggests: **manual,
trial-and-error prompt tinkering for everyday tasks**. As models improved at
interpreting intent directly, the marginal value of elaborate prompt
construction fell, which is what raises the question about the field's long-term
viability *as a standalone discipline*.[^wikipedia-pe] Note the qualifier —
standalone. The verdict in the sources is absorption, not deletion.

What did not erode: system prompt design (harder now, because agents run
longer), few-shot example curation, automated prompt optimization (actively
advancing), and prompt injection defense (more urgent every year). And
Wikipedia's own lead now introduces context engineering in its first paragraph
as the related discipline covering non-prompt context — the encyclopedia has
already absorbed the reframing.[^wikipedia-pe]

The honest summary is that prompt engineering is in the position of "webmaster"
circa 2005: the title is gone, the word sounds dated, and every task it named is
still being done by someone with a different title.

[^wikipedia-pe]: ["Prompt engineering"](https://en.wikipedia.org/w/index.php?title=Prompt_engineering&oldid=1373316427), Wikipedia, revision 1373316427 (2026-09-05). Local excerpt: [`references/wikipedia-prompt-engineering.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/wikipedia-prompt-engineering.md).

[^anthropic-ce]: Anthropic Applied AI team, ["Effective context engineering for AI agents"](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), 2025-09-29. Local copy: [`references/anthropic-effective-context-engineering.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-effective-context-engineering.md).

[^coinage]: Tobi Lütke ([2025-06-19](https://x.com/tobi/status/1935533422589399127)) and Andrej Karpathy ([2025-06-25](https://x.com/karpathy/status/1937902205765607626)), posts on X. Local copy: [`references/context-engineering-coinage-tweets.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/context-engineering-coinage-tweets.md).
