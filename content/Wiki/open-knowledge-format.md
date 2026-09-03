---
type: Specification
title: Open Knowledge Format (OKF)
description: Google Cloud's open specification formalizing the LLM-wiki pattern as a portable bundle of markdown files with YAML frontmatter.
tags: [okf, standards, knowledge-management, google-cloud, metadata]
sources:
  - id: okf-blog
    resource: references/okf-announcement-google-cloud.md
    title: "McVeety & Hormati, \"Introducing the Open Knowledge Format\" (Google Cloud blog, 2026-06-12)"
  - id: okf-spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF specification (v0.2)"
generated: { by: claude-code/sonnet-5, at: 2026-09-03T01:23:25Z }
status: stable
---

An open specification from Google Cloud that turns the
[LLM wiki pattern](/llm-wiki-pattern.md) from a private habit into a portable,
interoperable format.[^okf-blog] This bundle is written to it.

## What it is

A knowledge bundle is a directory of markdown files with YAML frontmatter.
Three properties define it:[^okf-blog]

- **Just markdown** — readable in any editor, renderable on GitHub, indexable
  by any search tool.
- **Just files** — shippable as a tarball, hostable in any git repo, mountable
  on any filesystem.
- **Just YAML frontmatter** — structured, queryable fields.

There is no runtime, no service, and no SDK. That is the entire design.

## The problem it targets

Inside most organizations the knowledge a model needs is scattered across
metadata catalogs behind proprietary APIs, wikis and shared drives, code
comments and docstrings, and senior engineers' heads. Two things follow: every
agent builder re-solves context assembly from scratch, and knowledge stays
locked inside whichever system happened to produce it.[^okf-blog]

OKF attacks the second problem, and the first falls out of it.

## Bundle structure

A bundle is a directory of **concepts** — one file per concept, where a
concept is whatever the producer needs it to be: a table, dataset, metric,
playbook, runbook, or API.[^okf-blog]

```
sales/
├── index.md
├── datasets/
│   ├── index.md
│   └── orders_db.md
├── tables/
│   ├── index.md
│   ├── orders.md
│   └── customers.md
└── metrics/
    ├── index.md
    └── weekly_active_users.md
```

`index.md` and `log.md` are reserved at every directory level — catalog and
chronology respectively, as described in
[wiki operations](/wiki-operations.md). Every other `.md` file is a concept.

## Design principles

1. **Minimally opinionated.** Only `type` is required; producers decide their
   own content models. A concept carrying nothing but `type` is fully
   conformant.[^okf-blog][^okf-spec]
2. **Producer/consumer independence.** Writing knowledge is separated from
   consuming it, and the format is the contract between them.[^okf-blog]
3. **Format, not platform.** Vendor-neutral — no proprietary account or SDK
   needed to produce or read a bundle.[^okf-blog]

The third principle is the one to weigh when judging the spec: Google's
commercial interest is in Knowledge Catalog ingesting OKF, but nothing about
the format requires Google to be in the loop.

### Type examples

`type` values aren't centrally registered (§4.1) — the blog's own phrasing is
that a concept is "whatever the producer needs it to be: a table, dataset,
metric, playbook, runbook, or API."[^okf-blog] Those six are illustrative, not
a closed list: the post's own worked example uses a producer-defined
`BigQuery Table` in place of a generic `Table`, underscoring that the type
should fit the concept rather than the concept being forced into a fixed
enum.[^okf-blog] This bundle's own type usage is cataloged in
[Operating This Wiki](/operating-this-wiki.md).

## Version drift: the blog describes v0.1

The announcement post documents **v0.1**, while the current spec — and this
bundle's `okf_version` — is **v0.2**. Two v0.1 details in the blog are
superseded:[^okf-spec]

| v0.1 (as announced) | v0.2 (current) |
|---|---|
| `timestamp: <ISO 8601>` | `generated: { by: <actor>, at: <ISO 8601> }` |
| A `# Citations` list in the body | A `sources` array in frontmatter |

Both are breaking changes, so the blog's example document will not round-trip
as conformant v0.2. v0.2 also adds field families for provenance
(`sources`, `usage_window`), trust (`generated`, `verified`), and lifecycle
(`status`, `stale_after`); an `Attested Computation` concept type with its
associated machinery; and an actor naming convention for identity
fields.[^okf-spec]

This bundle uses the v0.2 core fields and deliberately skips the attested
computation machinery, which targets verifiable data pipelines rather than a
reading wiki.

## Reference implementations

Google shipped three things alongside the spec: an enrichment agent that walks
BigQuery datasets and emits OKF concept documents with schemas and citations,
a static HTML visualizer that renders a bundle as an interactive graph, and
three sample bundles (GA4 e-commerce, Stack Overflow, Bitcoin). Knowledge
Catalog itself was updated to ingest OKF and serve it to agents.[^okf-blog]

The stated ambition is that the format evolves as an open standard and remains
the primary contribution, rather than the tooling around it.[^okf-blog]

[^okf-blog]: Sam McVeety & Amir Hormati, ["Introducing the Open Knowledge Format"](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing), Google Cloud blog, 2026-06-12. Local copy: [`references/okf-announcement-google-cloud.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/okf-announcement-google-cloud.md).
[^okf-spec]: [OKF specification v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md), §12–§13.
