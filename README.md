# ismailkhan.xyz

My digital garden: a personal homepage plus a raw, LLM-maintained wiki of notes on LLMs/AI, published from [tech-llm-wiki](https://github.com/ismailkhan313/tech-llm-wiki). Built with [Quartz](https://quartz.jzhao.xyz/) v5.

## Structure

```
content/
  index.md                # homepage — hand-authored, the only non-synced content
  notes/                    # mirror of tech-llm-wiki's repo root — DO NOT hand-edit
    index.md
    log.md
    references/
    <concept>.md
quartz.config.yaml       # site config: title, domain, theme, plugins
.github/workflows/
  deploy.yaml             # builds and deploys to GitHub Pages on push to main (or dispatch)
  sync-wiki.yaml           # pulls tech-llm-wiki into content/notes/ on a schedule, triggers deploy.yaml on change
```

`content/notes/` is a sync target, not a place to write. See [CLAUDE.md](CLAUDE.md).

## Local development

```bash
npm install
npx quartz build --serve
```

This serves the site locally (default: http://localhost:8080) and rebuilds on file changes.

## How notes get here

`sync-wiki.yaml` runs every 30 minutes (and can be triggered manually via `workflow_dispatch`): it clones `tech-llm-wiki`, mirrors it into `content/notes/` with `rsync --delete` (so deletions and renames in the source propagate too), and commits if anything changed. Because a push made with the default `GITHUB_TOKEN` doesn't trigger other workflows, the sync job explicitly dispatches `deploy.yaml` afterward.

To change a note, edit it in `tech-llm-wiki` — the next sync picks it up within 30 minutes, or run the `Sync notes from tech-llm-wiki` workflow manually to pull it in immediately.

## Deployment

This repo is configured to build and deploy automatically to **GitHub Pages** on every push to `main` (and can be triggered manually), via `.github/workflows/deploy.yaml`.

One-time setup after pushing this repo to GitHub:

1. Go to the repo's **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Under **Custom domain**, enter `www.ismailkhan.xyz` and save. GitHub will verify it once DNS is set up (see below).
4. Push to `main`. The Action will build the site and deploy it.

### DNS setup for the custom domain

At your domain registrar / DNS provider for `ismailkhan.xyz`, add:

- A `CNAME` record: `www` → `<your-github-username>.github.io`
- (Optional, for the bare/apex domain `ismailkhan.xyz` to also work) four `A` records pointing `@` to GitHub Pages' IPs:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
  and an `AAAA` record set to GitHub's IPv6 addresses if you want IPv6 support. See [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for the current list.

DNS propagation can take anywhere from a few minutes to 24 hours. GitHub Pages will also auto-provision HTTPS for the domain once it verifies.

## Config

Site-wide settings (title, base URL, theme colors/fonts, enabled plugins, footer links) live in `quartz.config.yaml`. Notably:

- `baseUrl` is set to `www.ismailkhan.xyz`. This is also used to auto-generate the `CNAME` file on build.
- `analytics` is currently disabled (`null`). Set it up later with Plausible, GA, Umami, or GoatCounter by editing that block.
