---
title: "Ismail Khan"
description: A digital garden of raw, LLM-maintained notes on LLMs and AI.
---

## About

I'm Ismail Khan. This site is my digital garden: a public, continuously growing set of notes on LLMs and AI, maintained largely by an AI agent rather than written and polished by hand.

Find me on **[GitHub](https://github.com/ismailkhan313)** or **[LinkedIn](https://www.linkedin.com/in/iikhan/)**, subscribe to the **[RSS feed](/index.xml)**, or reach out at **[ismailkhan.dev@gmail.com](mailto:ismailkhan.dev@gmail.com)**.

## How this site works

The **[Notes](/notes/)** section isn't written here. It's a live mirror of [tech-llm-wiki](https://github.com/ismailkhan313/tech-llm-wiki), a separate repo where Claude Code ingests sources (papers, articles, transcripts) and incrementally builds an interlinked wiki: entity pages, concept summaries, comparisons, and a running [log](/notes/log) of what changed and when. The raw sources everything derives from stay in the source repo.

A scheduled job pulls the latest wiki content into this site and republishes automatically, so notes here can be a few minutes behind the source repo but are never hand-edited in place. If you want to change something in the notes, it happens in `tech-llm-wiki`, not here.

The pattern follows [Karpathy's LLM wiki idea](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): instead of an LLM re-deriving synthesis from scratch on every question, it maintains a persistent, compounding wiki that gets richer with every source added. The underlying files follow the [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) — plain markdown with YAML frontmatter for provenance, trust, and lifecycle.

**This means some of it will be wrong.** Notes get written before they're fully verified, claims occasionally contradict earlier ones until a newer source resolves it, and pages get restructured as the wiki grows. That's expected, not a bug: the wiki is meant to self-correct over time as more sources come in, not to be a finished reference on day one.

Start browsing at **[Notes](/notes/)**.
