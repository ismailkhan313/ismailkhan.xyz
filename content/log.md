---
type: Log
title: Wiki Log
description: Chronological record of what changed in this wiki and when, newest first.
generated: { by: claude-code/opus-5, at: 2026-09-01T19:28:00Z }
status: stable
---

# Wiki Log

## 2026-09-02
* **Update**: Added a diagram to [The LLM Wiki Pattern](/llm-wiki-pattern.md), arguing the note's central inversion visually — retrieval-only does its work after every question, the wiki compiles once at ingest. The Excalidraw source lives beside the note and publishes as an interactive, pan-and-zoom page; the PNG in `attachments/` is the inline figure. Diagrams are authored with the `excalidraw-diagram` skill under `.claude/`, whose palette is restricted to Excalidraw's stock colors so drawings adapt to the site's dark mode.

## 2026-09-01
* **Update**: Brought `references/` documents into OKF §11 conformance — both source files had HTML comment headers instead of YAML frontmatter, which §11.1 requires of every non-reserved `.md` file. They now carry `type: Reference` plus `resource`, `author`, `fidelity`, and `retrieved`.
* **Creation**: Added [Operating This Wiki](/operating-this-wiki.md), the operator's manual for this bundle — layer ownership, the prompts that drive each operation, the frontmatter fields in use, and the path from a push to the published site.
* **Update**: `log.md` is now published to the site alongside the concept pages, and carries frontmatter so it renders with a real title. OKF §8 forbids frontmatter on `index.md`; §9 sets no such rule for `log.md`.
* **Ingest**: Added [Karpathy's "LLM Wiki" gist](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/karpathy-llm-wiki.md) and the [Google Cloud OKF announcement](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/okf-announcement-google-cloud.md) as sources. Created [The LLM Wiki Pattern](/llm-wiki-pattern.md), [Wiki Operations](/wiki-operations.md), and [Open Knowledge Format (OKF)](/open-knowledge-format.md); catalogued both sources in `references/index.md` and populated the root `index.md`. Noted that the OKF blog documents v0.1 while this bundle targets v0.2 — `timestamp` and body `# Citations` are superseded by `generated` and frontmatter `sources`.
* **Initialization**: Created the OKF-structured wiki scaffold — `index.md`, `log.md`, `references/`, and `CLAUDE.md`.
