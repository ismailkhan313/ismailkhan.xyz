---
type: Playbook
title: Wiki Operations
description: The three recurring operations over an LLM wiki — ingest, query, and lint — plus the roles of index.md and log.md.
tags: [knowledge-management, workflow, agents, pattern]
sources:
  - id: karpathy-gist
    resource: references/karpathy-llm-wiki.md
    title: "Karpathy, \"LLM Wiki\" (gist)"
generated: { by: claude-code/opus-5, at: 2026-09-01T19:01:57Z }
status: stable
---

# Wiki Operations

Three recurring operations keep an [LLM wiki](/llm-wiki-pattern.md) alive.
They're what you actually do with the thing day to day; the local rules for
this bundle live in
[CLAUDE.md](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/CLAUDE.md).

## Ingest

You drop a source into the raw collection and tell the agent to process it. A
representative flow: the agent reads the source, discusses the key takeaways
with you, writes a summary page, updates the index, revises the entity and
concept pages the source touches, and appends a log entry. A single source
might touch 10–15 pages.[^karpathy-gist]

The supervision level is a real choice. Karpathy prefers one source at a time,
staying involved — reading the summaries, checking the updates, steering
emphasis — but notes you can batch-ingest with less oversight. Whichever you
pick, document it in the schema so future sessions inherit it.[^karpathy-gist]

## Query

You ask a question; the agent finds the relevant pages, reads them, and
answers with citations. The output doesn't have to be prose — a comparison
table, a slide deck, a chart, a canvas all work.[^karpathy-gist]

The non-obvious part: **good answers should be filed back into the wiki.** A
comparison you requested, an analysis, a connection you noticed — these are
worth as much as an ingested source and shouldn't evaporate into chat history.
Filing them back is what makes your exploration compound rather than just your
reading.[^karpathy-gist]

## Lint

Periodically, ask for a health check. What to look for:[^karpathy-gist]

- Contradictions between pages.
- Stale claims a newer source has superseded.
- Orphan pages with no inbound links.
- Concepts mentioned repeatedly but with no page of their own.
- Missing cross-references between clearly related pages.
- Data gaps a targeted web search could close.

Agents are also good at proposing the next question to investigate and the
next source to go find — lint is the operation that keeps a growing wiki from
quietly rotting.

## The two special files

`index.md` and `log.md` are reserved names and answer different
questions.[^karpathy-gist]

**`index.md` is content-oriented** — a catalog of what exists, each page with
a link and a one-line summary, grouped by category. Updated on every ingest.
On a query the agent reads the index first to find candidates, then drills in.
This works well at moderate scale (~100 sources, hundreds of pages) and
removes any need for embedding-based RAG infrastructure.

**`log.md` is chronological** — an append-only record of what happened when:
ingests, queries, lint passes. Keep the entry prefix consistent and the log
becomes parseable with ordinary unix tools: `grep "^## " log.md` for dates,
`grep "^\* \*\*" log.md` for entries. It gives you a timeline of how the wiki
evolved and tells the agent what was done recently.

Both are reserved by [OKF](/open-knowledge-format.md) §3.1, so no concept page
may take either name.

## Scaling past the index

At small scale the index file *is* the search engine. As the wiki grows you
eventually want real search — Karpathy suggests
[qmd](https://github.com/tobi/qmd), a local markdown search engine with hybrid
BM25/vector retrieval and LLM re-ranking, exposed as both a CLI (the agent
shells out) and an MCP server (the agent calls it natively). A naive search
script you vibe-code yourself is a reasonable stopgap.[^karpathy-gist]

Because the wiki is just a git repo of markdown, version history, diffs,
branching, and collaboration come for free.[^karpathy-gist]

[^karpathy-gist]: Andrej Karpathy, ["LLM Wiki"](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) (gist). Local copy: [`references/karpathy-llm-wiki.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/karpathy-llm-wiki.md).
