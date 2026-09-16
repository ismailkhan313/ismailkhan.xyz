---
type: Comparison
title: "Agents vs. Workflows"
description: The architectural line between a system whose path is fixed in code and one where the model chooses its own — Anthropic's definitions, the five workflow patterns, the guidance to build neither, and how the distinction degrades as it circulates.
tags: [agents, workflows, agentic-systems, design-patterns, anthropic, langgraph, terminology]
sources:
  - id: anthropic
    resource: references/anthropic-building-effective-agents.md
    title: "Building effective agents (Erik S. and Barry Zhang, Anthropic, 2024-12-19)"
  - id: langgraph
    resource: https://docs.langchain.com/oss/python/langgraph/workflows-agents
    title: "Workflows and agents (LangChain / LangGraph documentation)"
  - id: hfpost
    resource: references/hf-virtualoasis-agents-vs-workflows.md
    title: "Agents vs. Workflows (VirtualOasis, Hugging Face community article, 2025-05-06)"
  - id: agentic-patterns
    resource: references/google-cloud-agentic-design-patterns.md
    title: "Choose a design pattern for your agentic AI system (Google Cloud Architecture Center)"
generated: { by: claude-code/opus-5, at: 2026-09-16T15:40:00Z }
status: stable
---

"Agent" is doing too much work. It is used for a fully autonomous system
running for hours, and for a three-step script with an LLM call in the middle,
and the two share almost nothing architecturally. The distinction worth keeping
is the one Anthropic drew in December 2024, and it is not about how clever the
system is — it is about **who decides what happens next**.

## The definitions that do the work

Anthropic groups every LLM-plus-tools system under **agentic systems**, then
splits it in two:[^anthropic]

> **Workflows** are systems where LLMs and tools are orchestrated through
> predefined code paths.
>
> **Agents**, on the other hand, are systems where LLMs dynamically direct their
> own processes and tool usage, maintaining control over how they accomplish
> tasks.

Everything else follows from that one criterion. A workflow's control flow is
readable in the source before it runs; an agent's is not, because the model
produces it at runtime. That is why workflows are easier to debug, test and
price, and why agents can handle inputs nobody anticipated. Adaptability is a
*consequence* of the criterion, not the criterion — which matters, because
adaptability is what most restatements lead with, and it is the part you cannot
check by reading the code.

Both sit on top of a shared building block, the **augmented LLM**: a model with
retrieval, tools and memory, able to generate its own search queries, pick
tools, and decide what to retain.[^anthropic] Anthropic points at the
[Model Context Protocol](/model-context-protocol.md) as one way to wire those
augmentations up.

## The five workflow patterns

These are compositions of the augmented LLM, ordered by increasing
complexity.[^anthropic] LangGraph's documentation implements the same five under
the same names, which is a good sign the taxonomy carried.[^langgraph]

| Pattern | Shape | When Anthropic says to use it |
| --- | --- | --- |
| **Prompt chaining** | Each call processes the previous call's output, optionally through a programmatic gate | The task decomposes cleanly into fixed subtasks; trades latency for accuracy by making each call easier |
| **Routing** | Classify the input, send it to a specialized followup | Distinct categories are better handled separately, *and* classification can be done accurately |
| **Parallelization** | Concurrent calls, aggregated programmatically — *sectioning* for independent subtasks, *voting* for repeated attempts | Subtasks parallelize for speed, or multiple attempts raise confidence |
| **Orchestrator-workers** | A central LLM decomposes, delegates to workers, synthesizes | You can't predict the subtasks in advance — the number of files a change touches, say |
| **Evaluator-optimizer** | One call generates, another critiques, in a loop | Evaluation criteria are clear and iterative refinement measurably helps |

Two of these are easy to confuse. Parallelization and orchestrator-workers are
topologically the same fan-out; the difference is that parallelization's
subtasks are fixed in code and the orchestrator's are chosen by a model at
runtime.[^anthropic] By the definition above, that makes orchestrator-workers
the pattern sitting closest to the workflow/agent line while still being
classified as a workflow — the model picks the subtasks, but the orchestration
scaffold around it is still predefined.

## When it's an agent

An agent is, structurally, unglamorous: "typically just LLMs using tools based
on environmental feedback in a loop."[^anthropic] What makes the loop work is
**ground truth from the environment at each step** — tool results, code
execution output — so the model can assess its own progress rather than
narrate it. The loop needs stopping conditions (a maximum iteration count is
the given example) to stay controllable, and can pause for human input at
checkpoints. See [ReAct](</Agentic Design Patterns/react.md>) for the reasoning
loop itself and
[Human-in-the-Loop](</Agentic Design Patterns/human-in-the-loop.md>) for the
checkpoints.

The conditions Anthropic gives for reaching for one: open-ended problems where
you can't predict the number of steps or hardcode a path, you have some trust in
the model's decision-making, and the environment is one where autonomy is safe
to grant.[^anthropic] The cost side is stated just as plainly — higher cost, and
**compounding errors**, mitigated by sandboxed testing and guardrails.

The appendix generalizes from customer support and coding to a profile: agents
pay off where tasks "require both conversation and action, have clear success
criteria, enable feedback loops, and integrate meaningful human
oversight."[^anthropic] Coding is the strongest case because it is *verifiable*
— tests supply the ground truth the loop runs on.

## The recommendation most summaries drop

The post's actual top-line advice is not to build either one:

> When building applications with LLMs, we recommend finding the simplest
> solution possible, and only increasing complexity when needed. This might mean
> not building agentic systems at all. Agentic systems often trade latency and
> cost for better task performance, and you should consider when this tradeoff
> makes sense. [...] For many applications, however, optimizing single LLM calls
> with retrieval and in-context examples is usually enough.[^anthropic]

And on frameworks: start with the API directly, because abstraction layers
"obscure the underlying prompts and responses," make debugging harder, and
"make it tempting to add complexity when a simpler setup would
suffice."[^anthropic]

Google Cloud's pattern catalog reaches the same conclusion independently: if a
workload is predictable, highly structured, or executable in a single model
call, a non-agentic solution is usually more cost
effective.[^agentic-patterns] Two vendors with agent products to sell both
leading with "you probably don't need this" is the most load-bearing agreement
in the literature, and it is the first thing a summary tends to cut, because it
is the least exciting.

## How the distinction degrades in transit

The Hugging Face community post that prompted this page is a useful specimen of
what happens to the vocabulary a few hops out.[^hfpost] It opens on analogies —
an agent is "a chef who can make a meal based on what's in the kitchen," a
workflow is "a recipe with fixed steps" — which are memorable and describe the
*symptom* (flexibility) rather than the criterion (who controls the path). Its
nine citations are seven blog posts, one vendor documentation page, and a link
to Mermaid's live editor. No primary source appears.

Two things are worth recording from it:

**The definition is laundered.** The post writes that "agents are described as
systems where LLMs dynamically direct their own processes and tool usage,
maintaining control over how they accomplish tasks," and attributes that to
LangChain.[^hfpost] The sentence is Anthropic's, word for word.[^anthropic] The
LangGraph page it cites now redirects to a rewritten version that defines the
terms in its own words with no attribution,[^langgraph] so what the May 2025
version said is not something this page can check — but the sentence originated
with Anthropic regardless, and by the time it reaches a reader here the trail
back to the reasoning that produced it is gone. That matters more than
credit: the definition is only useful alongside the argument for why *that*
line and not another, and the argument is what gets stripped.

**The one thing it adds is the complaint.** The post records a real controversy
— that systems marketed as agents are "actually workflows or automations in
disguise," producing inflated expectations.[^hfpost] That complaint is exactly
what the Anthropic taxonomy exists to settle, and it is evidence the taxonomy is
needed. The irony is that a post reaching for the distinction to resolve
agent-washing gets it secondhand, without the criterion that would let a reader
adjudicate any specific case.

The general lesson is the one this wiki's schema already encodes: prefer the
normative source over any summary of it. The summary is where the caveats go to
die — here, the entire "you probably shouldn't build this" section, which is
absent from the post.

## Mapping onto the pattern catalog

This wiki's [agentic design patterns](</Agentic Design Patterns/index.md>) come
from Google Cloud's catalog, which cuts the same territory along the same joint
— its top-level split is between multi-agent systems "orchestrated by code" and
those "orchestrated by a model," which is Anthropic's workflow/agent line
applied one level down.[^agentic-patterns] The correspondence is close but not
one-to-one:

- Prompt chaining ↔ [Sequential](</Agentic Design Patterns/sequential.md>)
- Parallelization (sectioning) ↔ [Parallel](</Agentic Design Patterns/parallel.md>)
- Evaluator-optimizer ↔ [Review and Critique](</Agentic Design Patterns/review-and-critique.md>)
  and [Iterative Refinement](</Agentic Design Patterns/iterative-refinement.md>),
  which split it by whether the critic gates or the result accumulates
- Orchestrator-workers ↔ [Coordinator](</Agentic Design Patterns/coordinator.md>),
  which Google Cloud files under model-orchestrated where Anthropic files it
  under workflows — the same architecture, classified differently depending on
  whether you weigh the scaffold or the routing decision
- Routing has no separate entry in the Google Cloud catalog; the nearest thing
  is the coordinator's dispatch step

[Choosing an Agentic Design Pattern](</Agentic Design Patterns/choosing-a-pattern.md>)
is the fuller decision framework, and it starts where this page does: with
whether you need an agent at all.

Once you are running an agent rather than a workflow, the binding constraint
moves to what the model can see — which is
[context engineering](/context-engineering.md), and the reason that discipline
succeeded prompt engineering as agents took over from one-shot calls.

## What this page can't reach

The Anthropic post now carries a note that "much of the tooling landscape
described in this post has changed since December 2024," pointing readers at
Claude Managed Agents for the current approach.[^anthropic] The definitions and
the pattern taxonomy are not what changed — they are vocabulary, and they have
propagated widely enough to be load-bearing — but this page is built on a
document its own publisher has partially superseded, and the framework advice in
particular should be read as of its date.

The evidence base is also thinner than the confident tone of the genre
suggests. Anthropic's patterns come from working with "dozens of teams" and are
offered as observed practice, not measured results; no comparative study is
cited for when a workflow beats an agent, and the cost and latency claims are
directional rather than quantified. Nobody has published the number that would
actually settle an architecture argument.

[^anthropic]: Erik S. and Barry Zhang, ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents), Engineering at Anthropic, 2024-12-19. Local excerpt: [`references/anthropic-building-effective-agents.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/anthropic-building-effective-agents.md). The superseding note about the tooling landscape is carried on the live page as of 2026-09-16 and is not in the original December 2024 text.

[^langgraph]: ["Workflows and agents"](https://docs.langchain.com/oss/python/langgraph/workflows-agents), LangChain / LangGraph documentation, retrieved 2026-09-16. The URL cited by the Hugging Face post, `langchain-ai.github.io/langgraph/tutorials/workflows/`, redirects here; the current page defines workflows as having "predetermined code paths" and agents as "dynamic and define their own processes and tool usage," in its own words and without attribution. What the May 2025 revision said is not verified here.

[^hfpost]: VirtualOasis, ["Agents vs. Workflows"](https://huggingface.co/blog/VirtualOasis/agents-vs-workflows-en), Hugging Face community article, 2025-05-06. Local transcription: [`references/hf-virtualoasis-agents-vs-workflows.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/hf-virtualoasis-agents-vs-workflows.md). Cited here as evidence about how the distinction circulates, not as an authority on the distinction itself.

[^agentic-patterns]: Samantha He, ["Choose a design pattern for your agentic AI system"](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), Google Cloud Architecture Center, last reviewed 2026-05-28. Local copy: [`references/google-cloud-agentic-design-patterns.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/google-cloud-agentic-design-patterns.md).
