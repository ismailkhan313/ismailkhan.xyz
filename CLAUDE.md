# ismailkhan.xyz

This site is a thin publishing layer over [tech-llm-wiki](https://github.com/ismailkhan313/tech-llm-wiki). It has no editorial voice of its own beyond the homepage.

## content/Wiki/ and content/log.md are sync targets — never hand-edit them

Everything under `content/Wiki/` is an exact mirror of `tech-llm-wiki`'s repo root, and `content/log.md` is generated from that repo's `log.md`, both kept in sync by `.github/workflows/sync-wiki.yaml` (cron every 30 min, plus manual `workflow_dispatch`). Any edit made to either one here gets silently overwritten on the next sync.

Not everything in the source repo gets published. The mirror excludes `references/`, `CLAUDE.md`, and `README.md` at every level; concept pages and `index.md` go live. `quartz.config.yaml`'s `ignorePatterns` blocks `Wiki/references/` too, so a stray copy can't sneak into a build.

### Casing and slugs

Quartz lowercases every slug segment, so the on-disk `content/Wiki/` folder serves at `/wiki/` while the UI shows **Wiki** — the folder-page and explorer take the display name from the on-disk path segment (or from `Wiki/index.md`'s title, which OKF leaves unset). Keep the directory capitalized; renaming it to `wiki/` would lowercase the UI label too.

`log.md` is mirrored separately rather than as part of the folder, so it lands at `/log` instead of `/wiki/log`. The sync step rewrites its frontmatter `title` and leading `# ` heading to **Wiki Log**, because upstream calls it "Wiki Update Log" and this site's naming lives in this repo.

**If you want to change a note, edit it in `tech-llm-wiki`, not here.** That repo's own `CLAUDE.md` has the actual conventions: OKF frontmatter, ingest/query/lint workflows, actor IDs. This file doesn't restate them.

## content/index.md is the one hand-authored page

The homepage is real content, edited here directly. It covers who I am, how the sync works, and links out to `/wiki/` and `/log`. No specific voice constraints beyond: be accurate about how the mechanism actually works if you change it.

## Site config

`quartz.config.yaml`, workflows, and everything outside `content/` are normal repo files — edit them like any other codebase, no special ritual.
