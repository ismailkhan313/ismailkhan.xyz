---
okf_version: "0.2"
---

# tech-llm-wiki

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

- [Google Cloud Generative AI Leader Certification](/google-GAIL-cert.md) —
  overview, exam format, and links to the five module study guides.
- [Module 1 — Gen AI: Beyond the Chatbot](/google-GAIL-module-1-beyond-the-chatbot.md)
- [Module 2 — Gen AI: Unlock Foundational Concepts](/google-GAIL-module-2-foundational-concepts.md)
- [Module 3 — Gen AI: Navigate the Landscape](/google-GAIL-module-3-navigate-the-landscape.md)
- [Module 4 — Gen AI Apps: Transform Your Work](/google-GAIL-module-4-genai-apps.md)
- [Module 5 — Gen AI Agents: Transform Your Organization](/google-GAIL-module-5-genai-agents.md)

## Meta

- [Wiki Update Log](/log.md) — chronological record of what changed and when.
