---
okf_version: "0.2"
---


A personal, LLM-maintained knowledge base on LLMs/AI. See
[CLAUDE.md](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/CLAUDE.md) for how this wiki is structured and
maintained, and [references/](https://github.com/ismailkhan313/tech-llm-wiki/tree/main/references) for the raw sources
it's built from.

## Method

How this wiki itself works — the pattern it implements and the format it's
written in.

- [The LLM Wiki Pattern](/llm-wiki-pattern.md) — have an LLM incrementally
  build and maintain a persistent, interlinked wiki over your sources, instead
  of re-deriving synthesis from raw documents on every query.
- [Wiki Operations](/wiki-operations.md) — the three recurring operations over
  an LLM wiki (ingest, query, lint), plus the roles of `index.md` and
  `log.md`.
- [Open Knowledge Format (OKF)](/open-knowledge-format.md) — Google Cloud's
  open specification formalizing the LLM-wiki pattern as a portable bundle of
  markdown files with YAML frontmatter.
- [Operating This Wiki](/operating-this-wiki.md) — the operator's manual for
  this bundle: layer ownership, the prompts that drive each operation, the
  frontmatter fields in use, and how a note reaches the published site.

## Certifications

Study notes for certification exams — bullet-point summaries of official
course material, not general concept pages.

- [Google Cloud GAIL Certification](/google-GAIL.md) — consolidated study
  notes: overview, exam format, and all five course modules in one page.

## Meta

- [Wiki Update Log](/log.md) — chronological record of what changed and when.
