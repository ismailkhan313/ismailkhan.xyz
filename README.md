# ismailkhan.xyz

Personal site for thought leadership on agentic AI architecture, consulting, and the AI industry. Built with [Quartz](https://quartz.jzhao.xyz/) v5.

## Structure

```
content/
  index.md              # homepage
  architecture/          # technical deep-dives on agentic AI system design
  industry/               # shorter commentary on the AI industry
  consulting/             # consulting services page
quartz.config.yaml       # site config: title, domain, theme, plugins
.github/workflows/deploy.yaml   # auto-deploys to GitHub Pages on push to main
```

## Local development

```bash
npm install
npx quartz build --serve
```

This serves the site locally (default: http://localhost:8080) and rebuilds on file changes.

## Writing a new post

Add a new `.md` file under `content/architecture/` or `content/industry/`, with frontmatter like:

```yaml
---
title: "Your Post Title"
description: One-sentence summary for previews and RSS.
date: 2026-08-25
tags:
  - agentic-ai
  - architecture
---
```

Link to it from the relevant section's `index.md` so it shows up in navigation, and Quartz's backlink/graph features will pick up any `[[wikilink]]`-style links automatically.

## Deployment

This repo is configured to build and deploy automatically to **GitHub Pages** on every push to `main`, via `.github/workflows/deploy.yaml`.

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
