# AI Product Manager Portfolio & Tools Lab

[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B2B4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Design: Amber Beacon](https://img.shields.io/badge/Design-amber%20beacon%2C%20demoted-92400E)](./DESIGN.md)
[![License: Private](https://img.shields.io/badge/License-Private-red)](./)

A personal portfolio and a small tools lab, built as two separate Vite apps that ship as one static artifact.

1. **Portfolio (`/`)**: seven sections, each with its own composition. A hero, a four-reading impact band, a career timeline, a pinned company carousel with one case study per screen, a capability stack, the tools lab, and a contact close.
2. **Tools lab (`/tools/`)**: a separate app with its own build, its own routes, and three blueprint containers. A tool that breaks cannot take the portfolio with it.

---

## Live URLs

- **Primary domain**: [`https://athur-exp-bot.tech/`](https://athur-exp-bot.tech/)
- **Tools lab**: `/tools/`
- **Repository**: `https://github.com/Authurnm/portfolio_UOR_SERVICE.git` (private)

---

## Documentation

| File | What it is |
| :--- | :--- |
| [`DESIGN.md`](./DESIGN.md) | **The build contract.** Identity, dials, palette with a computed contrast matrix, type roles, dose caps, the seven section compositions, motion rules, diagram language, voice rules, and a decision manifest. Read this before changing anything visual. |
| [`design-system.md`](./design-system.md) | The 3D beacon architecture, responsive viewport strategy, component specs, and accessibility rules. |
| [`PRD.md`](./PRD.md) | Product requirements, user stories, NFRs, telemetry registry. |
| [`implementation-plan.md`](./implementation-plan.md) | Phases, tasks, exit criteria, deploy workflow. |
| `anti-slop/audit-002-2026-10-24.md` | The 34-finding audit of the first build. |
| `anti-slop/audit-002-followup-2026-10-24.md` | What was fixed, with evidence, plus six defects found during the fix. |

---

## Architecture

```text
portfolio_UOR_SERVICE/
├── public/
│   ├── _redirects              # Netlify SPA rules for / and /tools/*
│   ├── _headers                # CSP, security headers, asset caching
│   ├── favicon.svg             # hexagon and dot, the beacon reduced to two shapes
│   ├── og-image.png            # 1200x630 social card
│   ├── robots.txt
│   └── sitemap.xml
├── src/                        # PORTFOLIO APP (built at /)
│   ├── components/
│   │   ├── canvas/             # BeaconMount (lazy gate), BeaconScene, BeaconPoster
│   │   ├── diagrams/           # 6 inline SVG diagrams + shared primitives
│   │   ├── layout/             # Navbar, Footer
│   │   ├── ui/                 # Reveal, Metric, Disclosure, SplitText
│   │   └── CompanyCarousel.jsx # pinned, scroll-driven, three render modes
│   ├── content/profile.js      # SINGLE SOURCE for all portfolio content
│   ├── hooks/                  # useFocusTrap, useScrollProgress
│   ├── styles/
│   │   ├── tokens.css          # design tokens, both themes
│   │   ├── components.css      # shared structure, wrapped in @layer components
│   │   └── index.css           # entry: tailwind + tokens + components
│   ├── App.jsx
│   └── main.jsx                # self-hosted fonts, then styles
├── tools/                      # TOOLS APP (built at /tools/)
│   ├── src/
│   │   ├── pages/              # LabStandby, ToolContainer
│   │   ├── registry.js         # blueprint tool metadata
│   │   ├── App.jsx
│   │   └── styles/index.css    # imports the same tokens and components
│   ├── index.html
│   └── vite.config.js          # base /tools/, @shared-styles alias
├── scripts/assemble-artifact.mjs
└── vite.config.js
```

### One source of truth, three of them

- **Content**: `src/content/profile.js`. Structured data, not markdown, because the diagrams, the carousel, and the metric band all need typed values. The tools app imports the same file.
- **Tokens**: `src/styles/tokens.css`, imported by both apps. The tools app reaches it through the `@shared-styles` alias, so the two builds cannot drift.
- **Direction**: `DESIGN.md`. If a visual decision is not justified there, it does not ship.

---

## Visual identity

Amber is a **signal, not a theme**. It marks one thing per screen: the primary action, the status dot, or the one path a diagram is explaining. Everything else is paper, ink, and hairline.

- **Light**: warm alabaster `#FAF8F5`, ink `#141413`, amber text `#92400E` (6.7:1), amber fill `#D97706` with near-black text (5.8:1).
- **Dark**: carbon `#0C0A09`, amber text `#FBBF24` (11.8:1).
- **Dose caps**: glass on one element (the nav), glow on one (the beacon core, dark mode only), shadow on two, radius in three steps, monospace for numbers and identifiers only.
- **Contrast**: every pair is computed and tabulated in `DESIGN.md` Section 3.2. Nothing ships below 4.5:1.

The full matrix, the seven section compositions, and the eighteen one-line decisions are in [`DESIGN.md`](./DESIGN.md).

---

## Quick start

Requires Node 20 or newer.

```bash
npm install
npm run dev                      # portfolio at http://localhost:5173
npm run dev --workspace=tools    # tools lab at http://localhost:5174/tools/
```

### Theme override

Both apps accept `?theme=light` or `?theme=dark` on the URL. It overrides the stored preference for that page load without writing to `localStorage`, which makes a shared link open in the intended theme and makes visual review reproducible.

---

## Build and preview

```bash
npm run build:all
```

That runs three steps: build the portfolio into `dist/`, build the tools app into `tools/dist/` with base `/tools/`, then `scripts/assemble-artifact.mjs` copies the tools build into `dist/tools/` and verifies both entry points plus `_redirects` and `_headers`.

```bash
npm run preview    # http://localhost:4173
```

Note: `vite preview` does not apply `_redirects`, so `/tools/<slug>` needs Netlify or a server that honours the rule. The tools app resolves the slug from `window.location.pathname` on load.

---

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`. Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` as repository secrets.

Manual deploy:

```bash
npm run build:all
npx netlify deploy --dir=dist --prod --auth=YOUR_TOKEN --site=YOUR_SITE_ID
```

---

## Security and privacy

1. **No client secrets.** No API keys in the bundle, no `VITE_*` secret usage.
2. **Strict CSP** in `public/_headers`. Fonts are self-hosted through `@fontsource` precisely so `font-src 'self'` holds.
3. **Cookieless analytics.** GoatCounter custom events, no cookies, no consent banner.
4. **No fabricated telemetry.** The tools containers state that they are not built yet. There are no invented latency, memory, or pass/fail strings anywhere in the codebase.

---

## Tools roadmap

| Slug | Title | Domain | Status |
| :--- | :--- | :--- | :--- |
| `llm-token-economics` | LLM Token & Margin Simulator | AI economics | Container ready, not built |
| `prd-prompt-compiler` | PRD Prompt Compiler & Gherkin Engine | PM automation | Container ready, not built |
| `asr-model-selector` | Multilingual ASR Model Selector | Speech AI | Container ready, not built |

---

## Author

Athur Naufan Muharam, [athurnm@gmail.com](mailto:athurnm@gmail.com)
