# Detailed Implementation Plan (`implementation-plan.md`)

**Version:** V2 (2026-10-23), supersedes the 2026-10-23 16:06 draft. Aligned to `PRD.md` V2.  
**Status:** Planning only. No code has been written. Do not scaffold until PRD Section 11 is confirmed.

## 0. Change Summary vs Draft

| Area | Draft | V2 |
| :--- | :--- | :--- |
| Tools location | `src/tools/` inside the portfolio app, `import.meta.glob` | Separate Vite app in `tools/`, base `/tools/`, own registry |
| Scaffold location | New `ai-pm-portfolio/` folder | In place, in this directory (repo root = working directory) |
| Deploy | Sync `dist/` to `public_html/` | One combined artifact (`dist/` + `dist/tools/`), FTPS, `.well-known` excluded |
| `.htaccess` | Catch-all rewrite, no CSP | `/tools/` rule before catch-all, nested `.htaccess`, concrete CSP, `Cache-Control` for HTML |
| Sanitization | `rehype-raw` + `rehype-sanitize` + `DOMPurify` | `react-markdown` + `rehype-sanitize` only |
| 3D budget | `<150KB` gz | `<=280KB` gz, gated, with poster fallback |
| Versions | Hard-coded majors | Latest stable at scaffold time, pinned by lockfile |
| Content | `profile.md` assumed | Curated public `src/content/profile.md`, validation and redaction check at build |
| Risk handling | none | Spike S0 for bracketed path before anything else |

---

## 1. System Architecture & Tech Stack

- **Core Framework**: React + Vite (JavaScript / ESNext by default; confirm vs TypeScript in PRD Section 11 #1). Use the latest stable majors at scaffold time and record them in `package.json` + lockfile.
- **Styling**: Tailwind CSS (v4 Vite plugin) + CSS Custom Properties (`style:amber-beacon` tokens in `src/styles/tokens.css`).
- **Routing**: `react-router` (confirm current package name at scaffold; the `react-router-dom` package has been consolidated into `react-router` in v7). Each app has its own router. Cross-app links are plain `<a>`.
- **3D & Animation**: `three`, `@react-three/fiber`, specific `@react-three/drei` helpers only; `motion` for DOM reveals. All behind lazy import and capability gate.
- **Markdown**: `react-markdown`, `remark-gfm`, `rehype-sanitize`, `gray-matter` (build-time) or Vite plugin for frontmatter. Not used: `rehype-raw`, `dompurify`.
- **Fonts**: `@fontsource/outfit`, `@fontsource/inter`, `@fontsource/jetbrains-mono` (self-hosted).
- **Analytics**: GoatCounter script (`https://gc.zgo.at/count.js`), cookieless.
- **Tests**: Playwright (viewports, behavior, axe via `@axe-core/playwright`), Lighthouse CI. Nothing else.
- **Hosting**: Netlify Edge CDN, automated deploy via Netlify CLI or GitHub Actions with personal access token; apex domain https://athur-exp-bot.tech/ redirects to Netlify.

---

## 2. Repository & Directory Structure

This directory is the git root and the portfolio app root. It already contains planning docs and the research draft; those stay and are excluded from builds.

```text
[1] Portfolio WebApp - Parent/          # repo root = portfolio app root
├── PRD.md, PRD-draft.md, design.md, implementation-plan.md   # planning docs (kept)
├── Hyperplan_Review_2026-10-23.md, PRD_Review_*.md           # review artifacts (kept)
├── package.json                        # name: ai-pm-portfolio ; "workspaces": ["tools"]
├── index.html                          # static meta, OG tags, theme bootstrap, noscript
├── vite.config.js
├── public/
│   ├── _redirects                     # Netlify SPA rules for root and /tools/*
│   ├── _headers                       # Security headers, CSP, asset caching
│   ├── og-image.png                    # 1200x630
│   ├── robots.txt, sitemap.xml, favicon.svg
│   └── cv.pdf                          # optional
├── scripts/
│   ├── validate-content.mjs            # frontmatter schema + redaction list + KPI source check
│   ├── csp-hash.mjs                    # prints SHA-256 of the theme bootstrap script
│   └── assemble-artifact.mjs           # copies tools/dist -> dist/tools, verifies both index.html
├── src/
│   ├── components/{canvas,layout,ui}/  # Beacon (lazy), Navbar, Footer, GlassCard, MarkdownRenderer, BeaconPoster.svg
│   ├── content/profile.md              # PUBLIC curated content only
│   ├── pages/{PortfolioPage,NotFoundPage}.jsx
│   ├── hooks/{useScrollProgress,useViewportRatio,useBeaconEligibility}.js
│   ├── styles/{tokens.css,index.css}   # tokens shared with tools app
│   ├── App.jsx, main.jsx
├── tools/                              # SEPARATE Vite app
│   ├── drafts/                         # research inputs, excluded from build (e.g. ASR models research)
│   ├── package.json                    # name: ai-pm-tools
│   ├── index.html                      # same bootstrap + meta (title "Tools Lab")
│   ├── vite.config.js                  # base: '/tools/', server.fs.allow: ['..']

│   └── src/
│       ├── main.jsx, App.jsx
│       ├── registry.js                 # builds tool list from meta files
│       ├── components/{ToolShell,ToolErrorBoundary,Navbar,Footer}.jsx
│       ├── pages/{LabStandby,ToolPage,NotFoundPage}.jsx
│       └── tools/
│           ├── _template/{meta.js,index.jsx}
│           ├── llm-token-economics/meta.js      # status: blueprint
│           ├── prd-prompt-compiler/meta.js      # status: blueprint
│           └── asr-model-selector/meta.js       # status: blueprint (from tools/drafts research)
├── .github/workflows/deploy.yml
├── .gitignore                          # node_modules, dist, tools/dist, redaction.txt, .env*
└── redaction.txt                       # gitignored; private deny-list strings
```

> ⚠️ **IMPORTANT**: This directory is inside the Matchmade product-management workspace git repo. The app must have its **own** `git init` and push to a **personal private** GitHub repo (`Athurnm/<name>`), never the Match-Made org and never staged in the parent repo. Confirm repo name (PRD Section 11 #7).

---

## 3. Phases, Tasks and Exit Criteria

Estimates are solo-developer working days (Phase 1 target: 10).

### Phase 0: Spike and Setup (0.5 day)

| ID | Task | Exit Criteria |
| :--- | :--- | :--- |
| S0 | In this directory, scaffold a throwaway Vite app, add `import.meta.glob('./*/meta.js', {eager:true})` in a test folder, run `dev` and `build` | Glob returns expected files in both modes. If it fails: adopt explicit manifest import (no glob) for the tools registry, or build from a bracket-free symlink. Record result here. |
| S1 | Resolved: JavaScript, Netlify hosting, domain https://athur-exp-bot.tech/, remote https://github.com/Athurnm/portfolio_UOR_SERVICE.git | PRD Section 11 answered |
| S2 | `git init`, `.gitignore`, personal private remote, branch protection on `main` | First commit pushed; 2FA on |

### Phase 1: Foundation (1.5 days)

| ID | Task | Exit Criteria |
| :--- | :--- | :--- |
| F1 | Scaffold portfolio app in place; Tailwind v4 plugin; npm workspace `tools` | `npm run dev` works |
| F2 | `tokens.css` from `design.md` incl. `--amber-text`; self-hosted fonts; theme bootstrap inline script | No light flash in dark mode; contrast checks pass |
| F3 | Vite chunking: `react-vendor`, `three-vendor` (dynamic only), `markdown-vendor` | Size report shows initial JS <= 120KB gz |
| F4 | `validate-content.mjs` wired into `build` | TC-02 passes |

### Phase 2: Portfolio Shell and Content (3 days)

| ID | Task | Exit Criteria |
| :--- | :--- | :--- |
| P1 | Navbar (desktop pill, mobile menu sheet, skip link, Contact popover) | TC-04 |
| P2 | `PortfolioPage` renders `profile.md` sections; bento/timeline layout; `<noscript>` block | TC-01, TC-03, TC-16 |
| P3 | 404 page (`noindex`) | E1 |
| P4 | Content authoring: 3 case studies, KPIs with sources, redaction pass | Owner sign-off (content gate) |
| P5 | Static SEO: meta, OG image, canonical, `sitemap.xml`, `robots.txt` | TC-12 |

### Phase 3: Beacon 3D (2 days)

| ID | Task | Exit Criteria |
| :--- | :--- | :--- |
| B1 | `BeaconPoster.svg` static fallback | Visible when chunk absent |
| B2 | `useBeaconEligibility` (WebGL, reduced-motion, saveData, idle) | TC-07 |
| B3 | `BeaconScene` procedural geometry, scroll choreography, damped camera, render-loop policy (IntersectionObserver + visibility) | 60fps on mid-range mobile; offscreen = 0 frames |
| B4 | Failure handling (chunk error, context lost) | TC-08 |
| B5 | CI size budget (<= 280KB gz) | Build fails if exceeded |

### Phase 4: Tools App (1.5 days)

| ID | Task | Exit Criteria |
| :--- | :--- | :--- |
| T1 | Scaffold `tools/` app (base `/tools/`, shared tokens, `server.fs.allow`) | `/tools/` serves in dev and preview |
| T2 | `registry.js` + 3 blueprint `meta.js` + `_template` | Registry returns 3 blueprint tools |
| T3 | `LabStandby` page | TC-09 |
| T4 | `ToolShell` + `ToolPage` placeholder container + `ToolErrorBoundary` + Tools 404 | TC-09, TC-10 |
| T5 | Identical navbar and theme bootstrap | TC-06 |

### Phase 5: Hardening and Deploy (1.5 days)

| ID | Task | Exit Criteria |
| :--- | :--- | :--- |
| D1 | `.htaccess` and  with CSP, headers, caching, Netlify SPA rewrites | TC-17; Observatory >= A |
| D2 | `assemble-artifact.mjs` + GitHub Actions workflow (FTPS, `exclude`, `workflow_dispatch` with `ref`) | TC-13, TC-14 |
| D3 | Staging subdomain deploy; Playwright matrix, axe, Lighthouse CI | TC-15; NFR-01..04 |
| D4 | GoatCounter events (PRD Section 7) | Events visible in dashboard |
| D5 | Uptime check + production deploy | Rollout R2 |

### Phase 6 (deferred): First real tool

Candidate: **Multilingual ASR Model Selector**, seeded from `tools/drafts/Top Multilingual Transcription Models.md`. Needs its own mini-PRD. If it calls an LLM or ASR API, design a proxy or bring-your-own-key flow first (never `VITE_*` secrets).

---

## 4. Key Design Snippets (illustrative, not code to commit as-is)

### 4.1 Tools registry (`tools/src/registry.js`)

```javascript
import { lazy } from 'react';

// Metadata is eager (tiny). Components are lazy and only for status === 'live'.
const metaModules = import.meta.glob('./tools/*/meta.js', { eager: true });
const componentModules = import.meta.glob('./tools/*/index.jsx');

export function getTools() {
  return Object.entries(metaModules)
    .filter(([path]) => !path.includes('/_template/'))
    .map(([path, mod]) => {
      const meta = mod.default;
      const loader = componentModules[path.replace('meta.js', 'index.jsx')];
      return {
        ...meta,
        Component: meta.status === 'live' && loader ? lazy(loader) : null,
      };
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}
```

If spike S0 fails on brackets, replace the two globs with an explicit import list in this same file.

### 4.2 Tool meta (`tools/src/tools/llm-token-economics/meta.js`)

```javascript
export default {
  slug: 'llm-token-economics',
  title: 'LLM Token & Margin Simulator',
  description: 'Model gross margin impact of multi-agent workflows across tier pricing.',
  category: 'AI Economics',
  version: '0.0.0',
  status: 'blueprint', // 'blueprint' | 'live'
  order: 10,
};
```

### 4.3 Netlify Configuration (`public/_redirects` and `public/_headers`)

#### `public/_redirects`
```text
# Tools sub-application SPA fallback
/tools/*    /tools/index.html   200

# Root portfolio SPA fallback
/*          /index.html         200
```

#### `public/_headers`
```text
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; connect-src 'self' https://*.goatcounter.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'

/*.html
  Cache-Control: no-cache, no-store, must-revalidate

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Notes: Vite outputs content-hashed filenames in `/assets/`, so 1-year immutable caching is safe. HTML files are set to `no-cache` to ensure instant updates on deploy.

### 4.4 Deploy workflow (`.github/workflows/deploy.yml`)

```yaml
name: Build and Deploy to Netlify
on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      ref:
        description: 'Commit or tag to deploy (rollback)'
        required: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.inputs.ref || github.sha }}
      - uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build            # validates content, builds portfolio
      - run: npm run build --workspace tools
      - run: node scripts/assemble-artifact.mjs   # dist/ + dist/tools, verifies both index.html
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v3.0
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions: ${{ github.sha }}"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 5. Security Guardrails (applies to all current and future tools)

1. **Crash isolation**: separate app plus `ToolErrorBoundary` around the lazy tool.
2. **Content safety**: sanitize any rendered Markdown with `rehype-sanitize`; never `dangerouslySetInnerHTML`.
3. **No client secrets**: never put OpenAI/Anthropic keys in `VITE_*`. For AI tools use either (a) bring-your-own-key kept in memory only (never persisted, never logged), or (b) a rate-limited proxy (Cloudflare Worker or serverless function) designed in that tool's own PRD.
4. **Headers/CSP**: enforced by Netlify `_headers` (Section 4.3). Any new third-party origin requires a CSP edit and a PRD note.
5. **Supply chain**: lockfile committed, Dependabot weekly, `npm audit --audit-level=high` in CI.
6. **Publishing governance**: public content lives in `src/content/profile.md`, synthesized from approved CV and profile items.

---

## 6. Deployment Guide (Netlify)

1. **Prereqs**: Netlify account, Personal Access Token with 7-day validity (`NETLIFY_AUTH_TOKEN`), domain `https://athur-exp-bot.tech/` configured to redirect to the Netlify site URL.
2. **Local build & preview**:
   ```bash
   npm run build && npm run build --workspace tools && node scripts/assemble-artifact.mjs && npx vite preview
   ```
   Verify `/`, `/tools/`, `/tools/<slug>`, refresh on each, and unknown paths redirect to 404.
3. **Manual Netlify CLI deploy**:
   ```bash
   npx netlify deploy --dir=dist --prod --auth=$NETLIFY_AUTH_TOKEN
   ```
4. **Production CI/CD**: Pushing to `main` on `https://github.com/Athurnm/portfolio_UOR_SERVICE.git` automatically triggers `.github/workflows/deploy.yml`.
5. **Post-deploy smoke test**: TC-12, TC-17, response headers check, GoatCounter test event.
6. **Rollback**: Instant rollback available via Netlify Web UI ("Deploys" -> click previous deploy -> "Publish deploy") or GitHub Actions re-run with good `ref`.

---

## 7. Open Items

All items resolved and confirmed (see `PRD.md` Section 8).
