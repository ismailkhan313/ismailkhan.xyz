---
title: "Context Garden Home"
description: A digital garden of raw, LLM-maintained notes on AI.
---

## About

This is my digital garden: a public, continuously growing set of technical notes built with context programming and AI agents.

I'm Ismail Khan. I have 10+ years in IT — as a software developer, then a technical project manager, and now a Senior Technical Scrum Master and AI Delivery Manager at a Fortune 50 company that's mainly a Google shop. I still code after hours, and I write about Google AI and about AI workflows for technical IT managers and scrum masters.

Find me on [GitHub](https://github.com/ismailkhan313) or [LinkedIn](https://www.linkedin.com/in/iikhan/), subscribe to the [RSS feed](/index.xml), or reach out at [ismailkhan.dev@gmail.com](mailto:ismailkhan.dev@gmail.com).

## Why I built this

Most of what I read doesn't stay read. I'll work through a paper or a transcript, form a view on it, and months later I'm re-deriving the same synthesis from scratch because the notes live in a doc I never reopen. This site is my attempt to stop doing that: instead of a stream of posts that age out of relevance, an agent reads through my source material and folds what it learns into a standing wiki, so the next question I ask starts from what's already been worked out. It's also a live test of whether the context-engineering ideas I write about actually hold up when applied to my own workflow.

## What's inside

The wiki grows around a few clusters: LLM agents and the tooling around them (Claude Code, context engineering, agent workflows), Google's AI and cloud stack, and — closer to my day job — how technical IT managers and scrum masters can put AI to use in enterprise delivery rather than just discuss it. Expect entity pages, concept summaries, and comparisons more than opinion pieces; the summaries are the agent's, the opinions are mine.

## How this site works

This is the site's landing page. The actual **[Wiki](/wiki/)** is not stored here. The Wiki is a live mirror of [tech-llm-wiki](https://github.com/ismailkhan313/tech-llm-wiki), a separate repo where I use Claude Code to ingest sources (papers, articles, transcripts) and incrementally build an interlinked wiki: entity pages, concept summaries, comparisons, and a running [log](/log) of what changed and when, based on the queries and research questions I put to the AI agent that reads through the references. The raw sources everything derives from stay in the source repo.

The pattern follows [Karpathy's LLM wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): instead of an LLM re-deriving synthesis from scratch on every question, it maintains a persistent, compounding wiki that gets richer with every source added. The underlying files follow the Google Cloud team's [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) — plain markdown with YAML frontmatter for provenance, trust, and lifecycle.

## A note on accuracy

The wiki is LLM-maintained, which is worth being upfront about. Entries are drafted by an agent working through primary sources, and I review them at my own discretion rather than on a fixed schedule, so quality varies by how recently I've looked at a given page. Treat it as a working reference and a starting point for your own reading, not a citation-grade source: the [log](/log) shows how a page has changed over time, and the linked primary sources are there so you can verify anything that matters to you. If something looks wrong, open an issue on the [source repo](https://github.com/ismailkhan313/tech-llm-wiki) — I'd rather know.

## Colophon

The site runs on [Quartz](https://quartz.jzhao.xyz/) (latest version). Updates publish immediately once a change is pushed to [tech-llm-wiki](https://github.com/ismailkhan313/tech-llm-wiki) — no separate build or review step in between. The agent doing the reading and writing is Claude Code, which I run manually, at my own discretion, rather than on any fixed schedule.

## Start here

New here? A few places to jump in: [flagship entity page], [a comparison page], or the [log](/log) for a sense of what's been added lately. Otherwise, the full **[Wiki](/wiki/)** is the front door.
