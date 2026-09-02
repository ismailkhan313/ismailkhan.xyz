---
type: Playbook
title: Operating This Wiki
description: The operator's manual for this bundle — layer ownership, the prompts that drive each operation, the frontmatter fields in use, and how a note reaches the published site.
tags: [knowledge-management, workflow, okf, operations]
sources:
  - id: karpathy-gist
    resource: references/karpathy-llm-wiki.md
    title: "Karpathy, \"LLM Wiki\" (gist)"
  - id: okf-spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
    title: "OKF specification (v0.2)"
generated: { by: claude-code/opus-5, at: 2026-09-01T19:28:00Z }
status: stable
---

# Operating This Wiki

The concrete manual for this bundle. [Wiki Operations](/wiki-operations.md)
describes the general shape of ingest, query, and lint; this page is what they
look like *here*, with the prompts, fields, and pipeline that actually apply.

## Layer ownership

The [three layers](/llm-wiki-pattern.md) map onto this repo directly, and
nearly every mistake available to you is a layer violation — editing something
you don't own, or asking the agent to edit something it doesn't.

| Layer | Where | Who owns it |
|---|---|---|
| Raw sources | `references/` | You, by curation. The agent reads, never edits. |
| The wiki | `*.md`, `index.md`, `log.md` | The agent, entirely. You read it. |
| The schema | `CLAUDE.md` | You and the agent, together. |

If you find yourself hand-editing a concept page, something has gone wrong —
either the schema is unclear, or you're doing work the agent should do. Correct
a page by telling the agent what's wrong, so the fix lands with its
cross-references and log entry intact.

If a *source* is wrong, it stays wrong. `references/` is immutable; the
correction belongs in the concept page that cites it.

## Driving each operation

Naming the operation loads the right workflow from the schema, so say it out
loud.

**Ingest.** A source comes in and gets integrated:

> Here's a paper on speculative decoding — save it to `references/` and ingest
> it. Talk me through the takeaways before you write anything.

Default to one source at a time with you in the loop. Batch ingesting works,
but supervision is the default deliberately: unsupervised batches are where
framing drifts and contradictions get papered over instead of
flagged.[^karpathy-gist]

**Query.** Ask against the wiki, and file the good answers back:

> What do my notes say about how OKF handles provenance, and where does that
> differ from what the announcement described?

> That comparison was useful — file it as its own concept page and link it from
> both parent pages.

The filing step is the one people skip. A comparison you asked for is worth as
much as a source you ingested, and it evaporates if it stays in chat
history.[^karpathy-gist]

**Lint.** Ask for findings before fixes:

> Lint the wiki. Don't fix anything yet — show me what you found and what you'd
> propose.

The extra round trip earns its keep. Lint is where an agent is most tempted to
invent structure nobody asked for.

## The ingest sequence

A real order of operations — each step depends on the one before it.

1. **Get the source into `references/`** as a file, since the citation graph
   points at paths. If the copy isn't byte-faithful — a transcription of a
   JS-heavy page — say so in its `fidelity` field, so a later reader knows the
   canonical URL wins.
2. **Discuss before writing.** Steering emphasis here is far cheaper than
   reviewing three pages that framed the source wrong.
3. **Decide what gets a page.** One source may justify several pages, or none —
   sometimes the right move is a paragraph added to a page that already exists.
   Pages are named after *concepts*, not sources; pages named after papers are
   the first sign the wiki is drifting back into being a reading list.
4. **Write, with frontmatter and footnotes.** Every claim traceable to a source
   cites it through a `sources[].id`.
5. **Update `index.md`.** A page missing from the catalog is functionally
   invisible to the agent next session.
6. **Append to `log.md`,** newest first, with a bold leading word.
7. **Commit and push.** Nothing reaches the site until the repo is pushed — the
   sync job reads GitHub, not your disk.

## Frontmatter in use

Only `type` is required by [OKF](/open-knowledge-format.md) §11 — a page
carrying nothing else is still conformant — but `title`, `description`, and
`generated` are what make the catalog and search useful, so they always get
filled in.[^okf-spec]

| Field | Purpose |
|---|---|
| `type` | The only required key. In use here: `Overview`, `Concept`, `Technique`, `Playbook`, `Specification`, `Reference`, `Comparison`, `Synthesis`. |
| `title` | Display name, shown in the catalog. |
| `description` | One line. The catalog pulls its entry text from here, so write it to stand alone. |
| `tags` | Flat list. The published site builds tag pages from these. |
| `sources` | List of `{ id, resource, title }`. The `id` is the footnote key; `resource` may be a path into `references/` or an external URL. |
| `generated` | `{ by: <actor>, at: <ISO 8601> }` — who wrote it, when. |
| `verified` | Same shape, and **only** once someone actually checked the page against its sources. |
| `status` | `draft`, `stable`, or `deprecated`. |

Every non-reserved `.md` file needs this block, `references/` included — that
requirement is §11.1 and it is easy to miss on a source file.[^okf-spec]

### Actors

```yaml
generated: { by: claude-code/opus-5, at: 2026-09-01T19:01:57Z }
verified:  { by: human:ismailkhan,   at: 2026-09-01T19:30:00Z }
```

Match the model that actually did the work. Don't rubber-stamp `verified` — the
`human:` prefix is the only signal separating "an agent wrote this" from "a
person checked it," and consumers key trust tiers off it. A page edited after
verification is no longer verified.

## Reaching the site

Publishing is automatic; what you control is what you push and when.

```
push to tech-llm-wiki
      │
      ├─ sync-wiki.yaml   # cron */30, rsync --delete into content/notes/
      │        └─ commits, then dispatches deploy
      │
      └─ deploy.yaml      # quartz build → GitHub Pages
               └─ www.ismailkhan.xyz/notes/
```

Worst case is about 30 minutes. To skip the wait, from the site repo:

```bash
gh workflow run sync-wiki.yaml
gh run list --limit 3
```

Concept pages, `index.md`, and `log.md` are published. `references/`,
`CLAUDE.md`, and `README.md` are excluded at every level — your raw sources and
agent instructions stay private. Excluding them costs nothing in conformance
terms: the published site is a *consumer* rendering a subset, not a bundle
distribution, and OKF §6.1 requires consumers to tolerate links whose targets
aren't present.[^okf-spec]

That tolerance is about machines, not readers. A footnote pointing at an
unpublished `references/` file still reads as a dead link to a human, so cite
the canonical URL in the prose and keep the local path in `sources[].resource`
where it belongs.

To see how a page will render before pushing:

```bash
npx quartz build --serve     # localhost:8080
```

## As it grows

At roughly a hundred sources and a few hundred pages, reading `index.md` and
drilling in still beats embedding-based retrieval and needs no
infrastructure.[^karpathy-gist] Past that, add real search rather than a bigger
index — [qmd](https://github.com/tobi/qmd) offers local hybrid BM25/vector
search over markdown with LLM re-ranking, as both a CLI and an MCP server.

`CLAUDE.md` is the highest-leverage file here: every convention fixed there is
a correction you never give again. The tell that something belongs in it is
having explained the same preference in two different sessions.

What to watch for beyond the standard lint pass:

- **Source pages masquerading as concepts** — the reading-list failure mode.
- **Silent supersession** — when a new source contradicts an old claim, the
  contradiction should be visible on the page, not resolved by overwriting.
- **Stale `verified` stamps** on pages edited since.
- **Orphans** — a page nothing links to won't be found by a query, however
  good it is.

[^karpathy-gist]: Andrej Karpathy, ["LLM Wiki"](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) (gist). Local copy: [`references/karpathy-llm-wiki.md`](https://github.com/ismailkhan313/tech-llm-wiki/blob/main/references/karpathy-llm-wiki.md).
[^okf-spec]: [OKF specification v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md), §6.1, §11.
