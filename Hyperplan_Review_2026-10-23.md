# Hyperplan Review: AI SaaS PM Portfolio & Tools Hub

**Target:** `PRD-draft.md`, `design.md`, `implementation-plan.md` (as of 2026-10-23 16:05)  
**Mode:** HYPERPLAN (single pass, 5 lenses)  
**Method note:** Critics were run as five sequential lens passes by the main agent, not as parallel subagents (no subagent tool was available in this session). Each lens was held to attacks only, then ruled on in a separate synthesis pass.  
**Verdict:** **GO WITH CHANGES** (all survivors folded into `PRD.md` V2, `design.md` and `implementation-plan.md`)

---

## Survivors (ranked by severity)

| # | Lens | Attack | Ruling | Fix applied |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Strategist | Draft puts tools in `src/tools/` via `import.meta.glob`; owner now wants `tools/` as its own app. Two incompatible architectures. | SURVIVED | Tools = separate Vite app, base `/tools/`, own registry (PRD DEC-PW-002) |
| 2 | Strategist | FTP sync of `dist/` to `public_html/` deletes anything not in `dist/`. Deploying the two apps separately wipes each other. | SURVIVED | One combined artifact, one sync, `.well-known` excluded (US-009) |
| 3 | Strategist | Root `.htaccess` catch-all rewrites every non-file URL to the root `index.html`, shadowing `/tools/*` deep links. | SURVIVED | Explicit `RewriteRule` for `/tools/` before the catch-all, plus nested `.htaccess` |
| 4 | Stakeholder | Hiring execs reach the site via LinkedIn/Slack links; a client-rendered SPA gives blank previews and weak SEO. | SURVIVED | Static meta + OG image per app, sitemap, robots, `noindex` on 404s (US-008, NFR-07) |
| 5 | Evidence | `<150KB gzipped` Three.js chunk with `@react-three/fiber` + `drei` is unsupported; `three` alone is about 150KB gzipped. | SURVIVED | Budget 280KB lazy, capability gate, poster fallback (NFR-02, DEC-PW-004) |
| 6 | Evidence | `--amber-core #D97706` on `#FAF8F5` is about 3.0:1: fails AA for body-size text. Draft claims editorial clarity, no a11y requirement at all. | SURVIVED | `--amber-text #B45309` (about 4.7:1), WCAG 2.2 AA requirement and axe CI (US-010) |
| 7 | Stakeholder | `profiles/profile.md` holds personal notes (study goals, interests). Draft says portfolio is "parsed from `profile.md`"; risk of publishing private or employer-confidential content. | SURVIVED | Separate curated `src/content/profile.md`, redaction check at build, owner checklist |
| 8 | Evidence | "Hero KPI badges (ARR growth, AI adoption)" are unsourced placeholders. Fabricated metrics on a hiring artifact are a credibility killer. | SURVIVED | KPIs optional, each requires a private `source` field, none rendered until supplied |
| 9 | Strategist | Working directory name contains `[1]`, spaces and brackets. Glob engines treat `[...]` as character classes; `import.meta.glob` and some tooling may fail. | SURVIVED (risk, unverified) | Spike S0 before anything else; fallback manifest import |
| 10 | Skeptic | Draft is silent on analytics and success metrics for the portfolio itself. | SURVIVED | GoatCounter events and measurable targets (PRD 1.3, 7) |
| 11 | Stakeholder | Parent app dir sits inside the Matchmade product-management workspace repo; AGENTS rules say prototypes/code go to the owner's personal private GitHub, never the parent repo. | SURVIVED | Own `git init`, personal private repo, parent ignores build artifacts (PRD Section 11 #7) |
| 12 | Strategist | Draft says `frameloop` on-demand when static AND gently rotating continuously. Contradiction; always-on loop drains battery. | PARTIAL | Loop runs only while hero visible and tab visible; paused otherwise (US-004) |
| 13 | Strategist | Plain FTP with a password in CI. | PARTIAL | FTPS (`protocol: ftps`), dedicated scoped FTP account |
| 14 | Stakeholder | CTA "Book Strategy Call" has no backing flow. Navbar badge `0` on Tools advertises emptiness. | SURVIVED | CTA = `Contact` (mailto + LinkedIn); badge text `Lab` |
| 15 | Evidence | Mobile nav described two ways ("bottom sheet or floating pill") and design.md says top pill. | SURVIVED | Single decision: top pill, menu button + sheet below 768px (US-002) |
| 16 | Evidence | PRD claims "strict CSP" but `.htaccess` in plan has none. | SURVIVED | Concrete CSP table in PRD 3.3 and plan |
| 17 | Skeptic | Both `rehype-sanitize` and `DOMPurify`, plus `rehype-raw`, for author-owned Markdown. | SURVIVED | Keep `react-markdown` + `rehype-sanitize`; drop other two (DEC-PW-006) |
| 18 | Evidence | Hard-coded versions ("Vite 6", "react-router-dom v7") will drift; `react-router-dom` is now consolidated into `react-router`. | PARTIAL | "Latest stable at scaffold time, pinned by lockfile"; package name verified at scaffold |
| 19 | Strategist | No 404 page, soft-404 behavior of Apache SPA fallback is ignored. | SURVIVED | 404 pages + `noindex` (E1, E2, NFR-07) |
| 20 | Strategist | No rollback or monitoring. | SURVIVED | `workflow_dispatch` with ref, UptimeRobot (PRD 8) |

## Refuted

| Attack | Lens | Why refuted |
| :--- | :--- | :--- |
| "Drop Three.js entirely, a portfolio does not need 3D." | Skeptic | The 3D beacon is a deliberate differentiator the owner chose; risk is handled by gating and fallback instead of removal. |
| "Use Astro or Next.js static export instead of React + Vite SPA." | Contrarian | Valid but out of the owner's stated stack and skill path; SEO gap is closed with static meta. Revisit prerendering in Phase 2 if share previews underperform. |
| "Skip the separate tools app, one app is simpler." | Skeptic | Contradicts explicit owner instruction; benefit (crash and bundle isolation) is real. |
| "Hostinger shared hosting is wrong, use Vercel/Cloudflare." | Contrarian | Owner has Hostinger; static hosting is sufficient. Noted as an exit option if Phase 2 tools need a proxy. |
| "Dual theme doubles design cost." | Skeptic | Tokens already defined for both; marginal cost is verification only. Contrast checks added. |

## Contrarian blind-spot worth keeping

The draft optimizes the *container* (3D, tool registry, theming) before the *content*. A portfolio lives or dies on 3 to 4 sharp case studies with real outcomes. PRD V2 adds content-readiness as an explicit rollout gate (Section 11 #4, #5) so the shell is not shipped empty.

## Offer

A second loop-until-dry round (re-run critics on V2) is available. Not auto-run; ask if wanted.
