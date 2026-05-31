# Otto Docs Site — Maintenance Guide

Documentation for the workflow automation platform. This README is the entry
point for **anyone touching the docs site** — humans and AI agents alike. It
covers the project layout, every common operation (add a page, cut a release
note, replace a screenshot, embed a video, deploy), and the conventions that
keep the site consistent.

- 🌐 **Live (canary):** https://lemon-mud-0e10bdd1e.7.azurestaticapps.net
- ⚙️ **Built with:** [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) + [Plyr](https://plyr.io) (videos)
- ☁️ **Hosted on:** Azure Static Web App (canary subscription) — see [`INFRA.md`](./INFRA.md)
- 🚀 **Deploy workflow:** [`.github/workflows/docs-site-deploy.yml`](../.github/workflows/docs-site-deploy.yml)

---

## Quickstart for contributors

```bash
cd docs-site
npm install         # one-time
npm run dev         # http://localhost:4321 — hot reload
```

| Command            | What it does                                                |
| ------------------ | ----------------------------------------------------------- |
| `npm run dev`      | Hot-reload dev server (port 4321).                          |
| `npm run check`    | Type-check content + validate internal links.               |
| `npm run build`    | Production build to `dist/`.                                |
| `npm run preview`  | Serve the production build locally (close to canary).       |

**Before pushing:** `npm run check && npm run build` (both green).

---

## Where everything lives

```
docs-site/
├── README.md                      ← this file (entry point + conventions)
├── INFRA.md                       ← canary + prod resources + deploy recovery
├── staticwebapp.config.json       ← SWA security headers + caching + video MIME / range + `/` → `/docs/` redirect (postbuild copies this into `dist/`)
├── astro.config.mjs               ← site config + sidebar groups (built with `base: '/docs'`, `outDir: './dist/docs'`)
├── package.json
├── tsconfig.json
├── scripts/
│   ├── postbuild.mjs              ← copies staticwebapp.config.json into dist/ root after `astro build`
│   └── remarkBasePrefix.mjs       ← remark plugin: prepends `/docs` to plain markdown links so content stays portable
├── public/                        ← copied as-is into `dist/docs/` (so URLs match the `/docs/*` AFD route)
│   ├── favicon.svg                ← product icon (reused from portal)
│   └── videos/                    ← self-hosted MP4 clips (see ./public/videos/README.md)
└── src/
    ├── assets/
    │   ├── logo.svg               ← logo on the landing page hero
    │   └── portal/                ← portal screenshots (numbered, kebab-case)
    │       ├── 01-login.png
    │       ├── 02-projects.png
    │       └── …
    ├── components/
    │   └── Video.astro            ← <Video> embed (Plyr-backed, MP4 / YouTube / Vimeo)
    ├── content.config.ts          ← Starlight content collection schema
    └── content/
        └── docs/
            ├── index.mdx          ← landing page
            ├── getting-started/
            │   ├── introduction.md
            │   ├── setup.md
            │   └── quickstart.md
            ├── demos/             ← short video walk-throughs (.mdx — uses <Video>)
            │   ├── index.mdx
            │   └── platform-overview.mdx
            ├── features/
            │   ├── overview.md
            │   ├── projects-and-applications.md
            │   ├── permissions.md
            │   ├── visual-designer.md
            │   ├── ai-assistant.md
            │   ├── workflows.md
            │   ├── agents.md
            │   ├── sandboxes.md
            │   ├── connectors.md
            │   └── runs-and-monitoring.md
            ├── guides/            ← stub for how-tos (auto-shown when populated)
            ├── reference/         ← stub for technical reference
            ├── release-notes/
            │   └── changelog.md
            └── support/
                ├── report-a-bug.md
                └── feature-request.md
```

**Sidebar** is auto-generated from these folders (`autogenerate` in
`astro.config.mjs`). Adding a page = drop a file in the right folder. No
config edit needed.

---

## How to do common things

### Add a new page

Pick the section, copy an existing page nearby, rename, and edit the
frontmatter. The page appears in the sidebar automatically.

```bash
# Example: add a "triggers" reference page
cp src/content/docs/features/workflows.md src/content/docs/features/triggers.md
# Edit title/description/sidebar.order in the frontmatter, write the body
npm run check && npm run build
```

### Add a new top-level section

This is the **only** time you touch `astro.config.mjs`:

1. Create the folder under `src/content/docs/` (e.g., `tutorials/`).
2. Add to the `sidebar` array in `astro.config.mjs`:

   ```js
   {
     label: 'Tutorials',
     items: [{ autogenerate: { directory: 'tutorials' } }],
   },
   ```

3. Drop your first page in the new folder and ship.

### Cut a release note / changelog entry

Edit [`src/content/docs/release-notes/changelog.md`](./src/content/docs/release-notes/changelog.md).

- **Newest first** at the top.
- Group entries under a version heading (`## 1.4.0 — 2026-06-10`, or `## Unreleased`).
- Use emoji + topic prefix so scanning is fast:
  - 🚀 New: significant new features
  - ✨ Improved: enhancements to existing features
  - 🐛 Fixed: bug fixes
  - 📚 Docs: docs-only changes
  - ⚠️ Breaking: breaking changes

```markdown
## 1.4.0 — 2026-06-10

- 🚀 **Sandboxes:** Public preview now supports `.csv` input files without
  the manual `contentType` override.
- ✨ **Designer:** Agent Harness tab persists draft selections across reloads.
- 🐛 **Monitoring:** Fixed missing run output when payload was empty.
```

For larger releases, link out to a longer write-up under `guides/` rather
than bloating the changelog.

### Add or replace a portal screenshot

Screenshots live under `src/assets/portal/` and use the naming convention
`NN-description.png` (where `NN` matches the capture order — see existing
numbering for grouping).

To capture against your local portal (running at `http://localhost:4200`):

```bash
cd docs-site
npx -y playwright install chromium  # one-time
node -e "
  const { chromium } = require('playwright');
  (async () => {
    const browser = await chromium.launch();
    const page = await browser.newContext({
      viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2,
    }).then(c => c.newPage());
    await page.goto('http://localhost:4200/login');
    await page.waitForTimeout(1500);
    const signIn = page.locator('button:has-text(\"Sign in\")').first();
    if (await signIn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await signIn.click(); await page.waitForTimeout(2500);
    }
    // navigate to the page you want, then:
    await page.screenshot({ path: 'src/assets/portal/NN-name.png' });
    await browser.close();
  })();
"
```

Reference the screenshot from a `.md`:

```markdown
![What the screenshot shows](../../../assets/portal/NN-name.png)
```

Astro auto-optimises images at build (PNG → WebP, responsive `srcset`), so
don't pre-compress.

### Add a video

Videos use the **`<Video>` Astro component** at
[`src/components/Video.astro`](./src/components/Video.astro), which wraps the
[Plyr](https://plyr.io) player. One component, three source kinds — Plyr's
JS + CSS lazy-load only on pages that actually contain a video.

#### What `<Video>` gives you

| Capability | Notes |
| --- | --- |
| Unified controls | Play / pause / seek / time / mute / volume / captions / settings / PiP / AirPlay / fullscreen — same UI for MP4, YouTube, and Vimeo. |
| HTTP-range buffering | `Accept-Ranges: bytes` is set on `/docs/videos/*` by `staticwebapp.config.json`, so the player only fetches the bytes it needs for the user's current playback position. |
| Lazy load | `import('plyr')` runs only when the page actually has a `[data-docs-video]` host. Pages without a video stay zero-cost. |
| Idempotent init | The init script marks each host with `data-plyr-initialised`, so client-side route changes (Starlight prefetching) don't double-mount the player. |
| Themed | Plyr's CSS variables are bound to the Starlight palette in the component's `<style>` block. |
| Accessible | Plyr exposes ARIA-compliant controls; `<Video title="…">` is required and becomes the `aria-label` on the player's container `<div>` so screen readers can identify the player region. (For YouTube / Vimeo, the iframe inside is managed by Plyr and uses metadata from the embedded service for its own labels — the `title` prop doesn't reach the iframe attribute.) |

#### Source kinds (auto-detected)

| `src` | Renders as | Notes |
| --- | --- | --- |
| `/docs/videos/foo.mp4` (or `.webm` / `.mov` / `.m4v`) | HTML5 `<video>` + Plyr | Uses `preload="metadata"` — only the poster + duration are fetched until play. |
| `https://www.youtube.com/watch?v=…`, `https://youtu.be/…`, `https://www.youtube.com/shorts/…` | Plyr's YouTube provider (iframe) | Privacy-friendly host, no cookies until play. |
| `https://vimeo.com/123456` | Plyr's Vimeo provider (iframe) | — |
| Any absolute `.mp4` URL (e.g. Azure Blob) | HTML5 `<video>` + Plyr | Works as long as the host serves `Accept-Ranges: bytes`. |

#### Usage

The component requires an **MDX** file. If your target page is `.md`, rename it
to `.mdx` first (the file path / URL stays the same).

```mdx
import Video from '../../../components/Video.astro';

{/* Self-hosted MP4 with optional poster */}
<Video
  src="/docs/videos/quickstart.mp4"
  poster="/docs/videos/quickstart-poster.png"
  title="Building your first workflow"
/>

{/* YouTube — just paste the watch URL */}
<Video src="https://www.youtube.com/watch?v=ABC123" title="Platform overview" />

{/* Vimeo */}
<Video src="https://vimeo.com/123456" title="Demo" />
```

Props:

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `src` | string | — (required) | Path or full URL. Auto-detected. |
| `title` | string | — (required) | Accessible label for the player region (rendered as the container `<div>`'s `aria-label`). Not the YouTube/Vimeo iframe's `title` — Plyr manages the iframe. |
| `poster` | string | — | Image shown before playback (self-hosted only). |
| `aspect` | `'16/9' \| '4/3' \| '1/1' \| '9/16'` | `'16/9'` | Container aspect ratio. `9/16` caps at 360 px wide so vertical clips stay readable. |

#### Self-hosted vs external — when to pick which

| Clip length | Where to host | Why |
| --- | --- | --- |
| ≤ 60 s, ≤ 25 MB | `public/videos/*.mp4` (committed) | Zero infra; ships with the site; fastest first-byte. |
| > 60 s or > 25 MB | YouTube unlisted / Vimeo / Azure Blob | Keep the repo lean; get a real CDN + transcoding. |
| Sensitive / private | Azure Blob in the canary RG (private container + signed URL), or Vimeo private | Stay inside the boundary. |

See [`public/videos/README.md`](./public/videos/README.md) for size / encoding
conventions (1080p H.264, `+faststart`, ≤ 25 MB) and an `ffmpeg` cookbook for
re-encoding screen captures.

#### The summary walk-through on the landing page

[`src/content/docs/index.mdx`](./src/content/docs/index.mdx) reserves a
commented-out `<Video>` block for the platform walk-through. To enable it:

1. Drop `public/videos/overview.mp4` (and optional `overview-poster.png`).
2. Un-comment the block — that's it.

Or replace the `src` with a YouTube watch URL.

#### Per-feature videos

Same pattern. Rename the feature page from `.md` to `.mdx`, import the
component, and drop the `<Video>` block right under the page summary so the
video lands above the fold.

```mdx
---
title: AI workflow assistant
description: ...
sidebar:
  order: 5
---
import Video from '../../../components/Video.astro';

The **AI workflow assistant** is the fastest path from idea to running workflow…

<Video src="/docs/videos/ai-assistant.mp4" title="Authoring with the AI assistant" />

## Starting from a prompt
…
```

### Add a demo (video walk-through page)

The **Demos** section (`src/content/docs/demos/`) hosts dedicated pages for
each video walk-through. Each demo gets its own page so it can carry context
(what's in the video, jump-to-the-right-minute table, "where to go after
watching" links) and so it's reachable via the sidebar and search.

#### Add a new demo

1. Create `src/content/docs/demos/<slug>.mdx` (`.mdx` so you can import
   `<Video>`).
2. Frontmatter scaffold:

   ```yaml
   ---
   title: <Demo title>
   description: <One-sentence summary of the video.>
   sidebar:
     order: <next number in the section>
   ---
   ```

3. Body shape that works well:
   - 1–2 sentences explaining what the demo covers.
   - Either an embedded `<Video>` (if the asset is hostable) or a styled
     link-out button (if the asset lives somewhere that blocks iframe
     embedding — see *Embed vs link-out* below).
   - A **What's in the video** table mapping timestamps to topics.
   - A **Where to go after watching** list cross-linking the relevant
     concept pages.
4. Update `demos/index.mdx` to include the new demo in its
   `<CardGrid><LinkCard …/></CardGrid>` listing.

#### Embed vs link-out

| Where the video lives | Use |
| --- | --- |
| Self-hosted MP4 in `public/videos/`, YouTube unlisted, Vimeo, or any URL that allows iframe embedding | `<Video src="…" title="…" />` — inline Plyr player |
| SharePoint personal-share, Stream-on-SharePoint *share* URL, or anywhere that sets `X-Frame-Options` | A styled link-out button (the iframe would render an X-Frame-Options error page) |

The platform-overview demo is currently a link-out because the asset lives
on personal SharePoint; the code carries a commented-out `<Video>` block
ready to swap in when the asset moves to an embeddable host.

#### Use aka.ms / stable shortlinks

For demo URLs, prefer an `aka.ms/...` shortlink over the raw asset URL. The
redirect target can change without touching the docs (e.g. when the video
moves from SharePoint to YouTube to a custom domain), and the link in the
docs keeps working.

#### Troubleshooting

| Symptom | Try |
| --- | --- |
| Player doesn't render | Confirm the page is `.mdx` (not `.md`) and you imported `Video` from the right relative path. Check the browser console for the dynamic `import('plyr')` error. |
| Poster shows but video won't play | Browser blocked autoplay (expected — Plyr respects this). User has to click play. |
| Self-hosted MP4 won't seek | The source server must serve `Accept-Ranges: bytes`. SWA does this automatically for `/docs/videos/*` via `staticwebapp.config.json`. External hosts may not. |
| Captions don't appear | Plyr expects `<track kind="captions">` inside the `<video>`. Add a `.vtt` file to `public/videos/` and pass a `<track>` slot (component currently doesn't expose this — extend `Video.astro` if you need it). |
| Page loads slower after adding a video | Expected only on pages with a video — Plyr lazy-loads (~33 KB gz). Pages without a video are untouched. |

### Update an existing page

Edit it. Hot-reload picks it up. Run `npm run check` before pushing.

### Hide a page from the sidebar (keep it reachable by URL)

Add `sidebar: { hidden: true }` to the page's frontmatter.

---

## Frontmatter reference

Minimum frontmatter for every page:

```yaml
---
title: Page title
description: One-sentence summary used by search and social cards.
---
```

Optional fields:

```yaml
---
title: ...
description: ...
sidebar:
  order: 5                  # position in the section (lower = earlier)
  label: "Short label"      # override page title in the nav
  badge:
    text: "preview"         # short tag rendered beside the nav item
    variant: tip            # note | tip | caution | danger | success
  hidden: false             # hide from sidebar but keep the URL
template: doc               # doc (default) | splash (landing-page layout)
hero:                       # only with template: splash
  tagline: One-liner
  image:
    file: ../../assets/logo.svg
  actions:
    - text: Get started
      link: /getting-started/introduction/
      icon: right-arrow
      variant: primary
---
```

---

## Conventions

- **Sentence-case** headings — "Getting started", not "Getting Started".
- **Imperative voice** for instructions — "Run the build", not "You should run the build".
- **Site-absolute paths** with trailing slash for cross-links:
  `[Quickstart](/getting-started/quickstart/)`.
- **Relative paths** for images, three levels up from a content file:
  `![…](../../../assets/portal/01-login.png)`.
- **Callouts** sparingly:

  ```markdown
  :::note     informational
  :::tip      helpful nudges
  :::caution  heads-up
  :::danger   hard warning
  ```

- **Code blocks** get a `title="…"` attribute when referring to a real file.
- **Tabs / cards** require renaming the file to `.mdx` and importing Starlight
  components.
- Keep the voice **product-neutral** — don't reference internal codenames.

---

## Validation, build, deploy

| Step | Trigger |
| --- | --- |
| Local validation | `npm run check` |
| Local build | `npm run build` |
| Local preview | `npm run preview` |
| CI validation | Every push / PR runs `npm run check` and `npm run build` |
| Canary deploy | `push` to `main` under `docs-site/**` → SWA |
| PR preview | Every PR touching `docs-site/**` gets a free preview env; closing the PR tears it down |

Workflow file: [`.github/workflows/docs-site-deploy.yml`](../.github/workflows/docs-site-deploy.yml).
Resource map + rotation commands: [`INFRA.md`](./INFRA.md).

---

## Agent-friendly playbook

This section is a structured map for AI agents working on the docs.

### File locations by task

| Task | Path |
| --- | --- |
| Add a feature concept page | `src/content/docs/features/<slug>.md` |
| Add a demo (video walk-through) page | `src/content/docs/demos/<slug>.mdx` — `.mdx` so it can import `<Video>`. See *Add a demo* below. |
| Add a how-to recipe | `src/content/docs/guides/<slug>.md` |
| Add a technical reference page | `src/content/docs/reference/<slug>.md` |
| Update the changelog | `src/content/docs/release-notes/changelog.md` |
| Update support entry points | `src/content/docs/support/{report-a-bug,feature-request}.md` |
| Add a new sidebar group | `astro.config.mjs` — add entry to `sidebar` array |
| Add a portal screenshot | `src/assets/portal/NN-name.png` |
| Add a video (self-hosted) | `public/videos/<name>.mp4` (+ optional `<name>-poster.png`); see `public/videos/README.md` for encoding |
| Embed a video on a page | Rename target page to `.mdx`; `import Video from '../../../components/Video.astro';` then `<Video src="..." title="..." />`. Auto-detects MP4 vs YouTube vs Vimeo and wraps Plyr lazily. |
| Update logo / favicon | `src/assets/logo.svg`, `public/favicon.svg` |
| Update SWA security headers / caching | `staticwebapp.config.json` |
| Update deploy workflow | `../.github/workflows/docs-site-deploy.yml` |
| Inspect canary infra / RBAC / fed creds | `INFRA.md` |

### Conventions checklist (every page must satisfy all of)

- [ ] Frontmatter has `title` and `description`.
- [ ] `sidebar.order` is set if order matters (lower = earlier).
- [ ] Body starts at H2 (the H1 comes from frontmatter `title`).
- [ ] Internal links are site-absolute with trailing slash.
- [ ] Image paths use `../../../assets/...` from a content file.
- [ ] Voice is sentence-case, imperative, product-neutral.
- [ ] `npm run check` passes (no broken links, no frontmatter errors).
- [ ] `npm run build` succeeds.

### Recipes

**Add a new feature page named `<x>`.**

1. Create `src/content/docs/features/<x>.md`.
2. Frontmatter scaffold:

   ```yaml
   ---
   title: <Title>
   description: <One sentence.>
   sidebar:
     order: <highest existing order in features + 1>
   ---
   ```

3. Open with a 1-paragraph summary; break into H2 sections below.
4. Add the page to the table in `features/overview.md`.
5. Cross-link from any related feature page.
6. Run `npm run check && npm run build`.

**Cut a release note.**

1. Edit `src/content/docs/release-notes/changelog.md`.
2. Insert a new `## <version> — <YYYY-MM-DD>` heading at the top.
3. Bullets prefixed with emoji + topic (🚀 ✨ 🐛 📚 ⚠️).
4. Link to a `guides/` page if any entry needs > 2 lines.
5. Run `npm run check && npm run build`.

**Replace a portal screenshot.**

1. Capture the new shot at `1440×900`, `deviceScaleFactor: 2`.
2. Save with the **same filename** as the old one under `src/assets/portal/`
   — Astro re-optimises on the next build.

**Embed a video (self-hosted MP4 or YouTube).**

1. **Self-hosted**: drop `public/videos/<name>.mp4` (+ optional
   `<name>-poster.png`). See `public/videos/README.md` for size / encoding
   conventions (1080p H.264, `+faststart`, ≤ 25 MB).
2. Rename target page from `.md` → `.mdx` if it isn't already.
3. Add the import + element:

   ```mdx
   import Video from '../../../components/Video.astro';

   <Video src="/docs/videos/<name>.mp4" title="<accessible label>" />
   ```

   For YouTube / Vimeo, replace `src` with the watch URL — auto-detected.

4. Run `npm run build` to verify the slot renders.

---

## Troubleshooting

| Symptom | Try |
| --- | --- |
| `astro check` complains about a frontmatter field | Check the schema in `src/content/content.config.ts` and Starlight docs. |
| Sidebar page doesn't appear after adding it | Confirm the folder is listed in `astro.config.mjs`'s `sidebar`, and that frontmatter parsed (run `npm run check`). |
| Image renders as a broken link | Path must be relative from the `.md` file (typically `../../../assets/...`). Astro is case-sensitive. |
| Build succeeds but live site is stale | The deploy is async; allow ~1 min after the workflow shows green. SWA caches at the edge; first hit to a new path can take a few seconds. |
| Canary URL returns 404 | The deploy workflow may have failed — check **Actions** on GitHub. Common causes in `INFRA.md`. |
| Local build looks different from canary | `npm run preview` to serve the production build locally. If preview matches canary, the SWA edge cache hasn't refreshed yet. |

---

## What NOT to commit

`.gitignore` already excludes the generated/secret stuff inside `docs-site/`:

- `node_modules/`, `dist/`, `.astro/`
- `*.log`, `npm-debug.log*`
- `.env`, `.env.production`
- `.DS_Store`

If something is unclear in this README, fix it in the same PR.
