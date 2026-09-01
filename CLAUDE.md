# ismailkhan.xyz

This site is a thin publishing layer over [tech-llm-wiki](https://github.com/ismailkhan313/tech-llm-wiki). It has no editorial voice of its own beyond the homepage.

## content/notes/ is a sync target — never hand-edit it

Everything under `content/notes/` is an exact mirror of `tech-llm-wiki`'s repo root, kept in sync by `.github/workflows/sync-wiki.yaml` (cron every 30 min, plus manual `workflow_dispatch`). Any edit made directly in `content/notes/` here gets silently overwritten on the next sync.

Not everything in the source repo gets published. The mirror excludes `log.md`, `references/`, `CLAUDE.md`, and `README.md` at every level — only the concept pages go live. `quartz.config.yaml`'s `ignorePatterns` blocks `notes/log.md` and `notes/references/` too, so a stray copy can't sneak into a build.

**If you want to change a note, edit it in `tech-llm-wiki`, not here.** That repo's own `CLAUDE.md` has the actual conventions: OKF frontmatter, ingest/query/lint workflows, actor IDs. This file doesn't restate them.

## content/index.md is the one hand-authored page

The homepage is real content, edited here directly. It covers who I am, how the sync works, and links out to `/notes/`. No specific voice constraints beyond: be accurate about how the mechanism actually works if you change it.

## Site config

`quartz.config.yaml`, workflows, and everything outside `content/` are normal repo files — edit them like any other codebase, no special ritual.
