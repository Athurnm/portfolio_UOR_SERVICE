# DESIGN.md: Brand Guidelines for the AI PM Portfolio

**Owner:** Athur Naufan Muharam
**Status:** Active direction. Supersedes the color and typography sections of [`design-system.md`](./design-system.md), which keeps the 3D and component specs.
**Filter applied on top of this file:** the `antislop` core plus `antislop-ui`, `antislop-copywriting`, `antislop-human`.
**Scope:** the portfolio SPA at `/` and the micro-tools sub-app at `/tools/`. Both read these tokens.

> This file is direction, not decoration. It answers one question before any visual decision: what does this serve? If a decision cannot be justified in one line here, it does not ship.

---

## 1. The Design Read

> Reading this as: **a working portfolio for hiring managers, AI founders, and engineering peers**, in an **editorial-instrument** visual language, dial **ENERGY 2 / RHYTHM 3 / MOTION 2**.

### 1.1 Identity in one paragraph

Athur is a Product Manager who ships working software. The site must read like an **instrument he operates**, not a brochure that sells him. Editorial means the type does the work, the page is quiet, and the numbers are given room. Instrument means the interface has the precision of a control surface: labelled readings, hairline rules, a single signal light, and nothing decorative competing with the data. The visitor should feel they are reading a spec sheet written by someone who could also build the thing.

### 1.2 What the identity must refuse

| Refused | Why it is refused here |
| :--- | :--- |
| A glowing orb as the hero image | It is the generic AI-company mark. The beacon stays, but as a **signal light**, not the subject of the page. |
| Glass panels on every surface | Glass reads as a 2021 trend when used repeatedly. It stops communicating material and starts communicating template. |
| Terminal cosplay (fake windows, typed commands, `STATUS:` chatter) | It imitates engineering instead of demonstrating product judgement. |
| Uppercase monospace labels on every section | Telemetry voice on a section heading is costume. Mono is reserved for numbers and identifiers. |
| A page that could belong to any AI PM | The work history, the numbers, and the diagrams are the only things that cannot be swapped out. The design must give them the whole stage. |

---

## 2. Dials

| Dial | Value | What that value means concretely here |
| :--- | :--- | :--- |
| **ENERGY** | **2** | Confident, not loud. One signal color, one primary action per screen. No full-bleed gradients, no glow washes, no oversized type past the `clamp` max. |
| **RHYTHM** | **3** | Six sections, six different compositions. If two consecutive sections share the same internal structure, one of them is wrong. |
| **MOTION** | **2** | Motion explains position, never decorates arrival. Two sanctioned motions: the pinned company carousel following scroll, and a single opacity-and-rise reveal used at most once per viewport. No `animate-ping`, no `animate-bounce`, no floating cards. |

**Consistency test:** if a reviewer cannot tell, from a screenshot of two adjacent sections, which section they are looking at, RHYTHM 3 has failed.

---

## 3. Palette

Amber is **demoted from a theme to a signal**. It no longer tints the page. It marks the one thing on each screen that carries meaning: a metric, the live status light, or the primary action. Everything else is paper, ink, and hairline.

### 3.1 Tokens

```css
:root {
  /* Paper */
  --bg-canvas: #FAF8F5;            /* warm alabaster */
  --bg-surface: #F1ECE4;           /* recessed panel, no blur */
  --bg-raised: #FFFFFF;            /* only for the nav pill and popovers */

  /* Ink */
  --text-primary: #141413;         /* 17.4:1 on canvas */
  --text-secondary: #57534E;       /* 7.2:1 on canvas */
  --text-muted: #6B655C;           /* 5.4:1 on canvas, 4.9:1 on surface */

  /* Signal */
  --accent-ink: #92400E;           /* amber for TEXT and links: 6.7:1 canvas, 6.0:1 surface */
  --accent-fill: #D97706;          /* amber for FILLS: 3.0:1 on canvas, borders and large type only */
  --accent-fill-ink: #141413;      /* text that sits ON --accent-fill: 5.8:1 */
  --accent-wash: rgba(217, 119, 6, 0.08); /* metric backgrounds, selection */

  /* Structure */
  --hairline: rgba(20, 20, 19, 0.10);
  --hairline-strong: rgba(20, 20, 19, 0.20);
  --focus-ring: var(--accent-ink);

  /* Type */
  --font-display: 'Outfit', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Geometry */
  --radius-sm: 4px;                /* inputs, badges, tags */
  --radius-md: 10px;               /* panels, cards, diagram frames */
  --radius-pill: 999px;            /* nav pill and the primary CTA only */

  /* Elevation (two, not five) */
  --shadow-nav: 0 1px 2px rgba(20, 20, 19, 0.06), 0 8px 24px -12px rgba(20, 20, 19, 0.14);
  --shadow-popover: 0 4px 8px rgba(20, 20, 19, 0.06), 0 16px 40px -16px rgba(20, 20, 19, 0.22);
}

[data-theme="dark"] {
  --bg-canvas: #0C0A09;
  --bg-surface: #171412;
  --bg-raised: #221D19;

  --text-primary: #F5F5F4;
  --text-secondary: #C9C4BF;       /* 11.4:1 on canvas */
  --text-muted: #A8A29E;           /* 7.8:1 on canvas, 7.3:1 on surface */

  --accent-ink: #FBBF24;           /* 11.8:1 on canvas */
  --accent-fill: #F59E0B;
  --accent-fill-ink: #141413;      /* 8.6:1 on --accent-fill */
  --accent-wash: rgba(245, 158, 11, 0.10);

  --hairline: rgba(245, 245, 244, 0.12);
  --hairline-strong: rgba(245, 245, 244, 0.24);

  --shadow-nav: 0 1px 2px rgba(0, 0, 0, 0.5), 0 8px 24px -12px rgba(0, 0, 0, 0.7);
  --shadow-popover: 0 4px 8px rgba(0, 0, 0, 0.5), 0 16px 40px -16px rgba(0, 0, 0, 0.8);
}
```

### 3.2 Contrast matrix (WCAG 2.2 AA, computed)

| Pair | Ratio | Normal text (4.5) | Large text and UI (3.0) |
| :--- | :--- | :--- | :--- |
| `--text-primary` on canvas (light) | 17.4:1 | PASS | PASS |
| `--text-secondary` on canvas (light) | 7.2:1 | PASS | PASS |
| `--text-muted` on canvas (light) | 5.4:1 | PASS | PASS |
| `--text-muted` on `--bg-surface` (light) | 4.9:1 | PASS | PASS |
| `--accent-ink` on canvas (light) | 6.7:1 | PASS | PASS |
| `--accent-ink` on `--bg-surface` (light) | 6.0:1 | PASS | PASS |
| `--accent-fill` on canvas (light) | 3.0:1 | FAIL: never use as text | PASS |
| `--accent-fill-ink` on `--accent-fill` (light) | 5.8:1 | PASS | PASS |
| White `#FFFFFF` on `--accent-fill` (light) | 3.2:1 | FAIL: never use | PASS |
| `--text-primary` on canvas (dark) | 18.9:1 | PASS | PASS |
| `--text-secondary` on canvas (dark) | 11.4:1 | PASS | PASS |
| `--text-muted` on canvas (dark) | 7.8:1 | PASS | PASS |
| `--accent-ink` on canvas (dark) | 11.8:1 | PASS | PASS |
| `--accent-fill-ink` on `--accent-fill` (dark) | 8.6:1 | PASS | PASS |

Two consequences that change the current build:

1. `--text-muted` moves from `#8C857B` (3.4:1, fails) to `#6B655C`. The old value was used for most 10px metadata, which was the site's largest accessibility defect.
2. **The primary CTA stops using white text.** `text-white` on `#D97706` is 3.2:1. Filled amber buttons use `--accent-fill-ink` (near-black). This is also why the button looks heavier than it needs to: white on orange vibrates.

### 3.3 The amber budget

| Allowed | Cap as built |
| :--- | :--- |
| `--accent-fill` filled surfaces (the Contact CTA) | 1 per screen |
| `--accent-fill` status dot in the nav | 1, always, it is the identity motif |
| `--accent-ink` text (one metric, one inline link, the active nav underline) | 2 per screen |
| `--accent-wash` backgrounds (active nav item, badges, selection) | 1 region per screen |
| Amber on an icon | 0, unless the icon is the status light |

If a screen shows amber in three places, the two least important must lose it. Nothing else in the palette competes, so amber never has to shout.

### 3.4 Color rules

- Gradients: none. The current scroll-progress bar is a three-stop amber gradient and is removed.
- Semantic color: only one non-amber accent is permitted, `--signal-ok: #047857` (light) / `#34D399` (dark), and only for a confirmed clipboard copy. It never appears in static layout.
- No color carries meaning alone. Every status also has a text label.

---

## 4. Typography

### 4.1 Roles

| Role | Face | Size | Used for |
| :--- | :--- | :--- | :--- |
| Display | Outfit 600, tracking `-0.02em` | `clamp(2.4rem, 5vw, 4.2rem)` | The one `<h1>` per page |
| Section | Outfit 600, tracking `-0.015em` | `clamp(1.5rem, 2.4vw, 2.1rem)` | `<h2>` |
| Subsection | Outfit 600 | `1.125rem` | `<h3>`, company names |
| Body | Inter 400, line height `1.65` | `1rem` | Prose. Never below `0.9375rem` |
| Label | Inter 500, sentence case | `0.8125rem` | Section eyebrows, field labels |
| Reading | JetBrains Mono 500, tabular numbers | `1.75rem` to `2.75rem` | **Metrics only** |
| Identifier | JetBrains Mono 500 | `0.75rem` | Version strings, slugs, dates, GPA |

### 4.2 The mono restriction

Monospace is a **numeric and identifier face here, not a voice**. It appears in three places only: a metric value, an identifier (version, slug, date range), and a code sample. It never appears as a section eyebrow, never in uppercase with wide tracking, and never as body prose.

This rule alone removes the site's strongest AI tell. Today `font-mono uppercase tracking-wider` labels every section, every card header, and every badge, which makes six sections read as one long system log.

### 4.3 Scale discipline

Three sizes per section maximum: one section heading, one body size, one label size. If a section needs a fourth size, it needs a diagram instead.

---

## 5. Geometry, elevation, and the dose caps

| Technique | Cap | Where | Reason |
| :--- | :--- | :--- | :--- |
| `backdrop-filter` glass | **1 element** | The floating nav pill | The nav overlays scrolling content, so it needs to transmit what is behind it. Panels sit on a flat canvas and do not. |
| Glow / `box-shadow` bloom | **1 element** | The beacon core, dark mode only | It marks the single live object on the page. |
| Shadow | **2 elements** | Nav pill, contact popover | Elevation means "floats above the document". A card on a flat page is not floating. |
| Border radius | **3 steps** | 4 / 10 / pill | Radius encodes touchability: `4` = small control, `10` = container, pill = the two things that should feel like buttons on a device. |
| Hairline rules | 1px `--hairline` | Every panel edge, every table row | The only repeated texture the page needs. It replaces glass. |
| Dot indicators | 1 per screen | The beacon status light | A second pulsing dot makes neither meaningful. |
| Capsule badges | **1 per card, 0 per section** | Tool status only | A badge is a status, not a label. Company names, domains and tags are plain text. |
| Directional arrows on buttons | **0** by default | Only the external-link glyph on a link that leaves the site | Arrows on internal actions are decoration. |

**Card treatment:** a panel is `--bg-surface`, 1px `--hairline`, `--radius-md`, no blur, no glow, no shadow, `padding: 1.5rem` to `2rem`. Hierarchy comes from where the panel sits and how much space it gets, not from how much it glows.

---

## 6. Section compositions (RHYTHM 3 in practice)

Six sections, six different shapes. No section repeats another's internal structure.

| # | Section | Composition | Why this shape |
| :--- | :--- | :--- | :--- |
| 1 | **Hero** | Asymmetric split: 7 columns of type on the left, the beacon signal on the right at 5 columns. Below both, a single hairline rule carrying the market line. | One focal point (the claim), one live object. No badge above the headline. |
| 2 | **Impact strip** | Four readings in one horizontal band on `--bg-surface`, separated by hairline rules. Numbers in mono at display size, labels beneath in sentence case. No cards. | Four numbers are one reading, not four products. Cards would fragment a single fact set. |
| 3 | **Career arc** | Heading and one sentence, then a full-width timeline diagram. Nothing else. | The five-year story is a sequence, so it is drawn as one. |
| 4 | **Selected work** | Pinned carousel, one company per screen. Left: company, role, one problem line. Right: the case diagram. A metric row under the diagram, then one closed disclosure. | The strongest structural answer to "too much text": one company at a time, and the diagram carries the argument. |
| 5 | **Capability** | One layered stack diagram, one education line, then three project rows separated by hairlines. | Four competency lines of prose become one picture of how the layers stack. |
| 6 | **Tools lab** | Two columns: the mount architecture diagram, then three blueprint rows. Not three equal cards. | The lab is a pipeline, not a shop shelf. Rows show sequence, cards show equivalence. |
| 7 | **Contact** | One sentence, one email address set large, one location line. Full-width, no panel. | The closing action should be the quietest thing on the page, so it reads as confidence rather than a pitch. |

### 6.1 What replaces the expanded case study text

Each company panel carries, in place of paragraphs:

- **One problem line** (max 120 characters).
- **One diagram** (the system or the funnel).
- **Three metrics**, mono, with the unit and the comparison stated (`5 days to 1 day`, not `80% faster`).
- **One disclosure** for the technical detail, closed by default, holding trade-offs as a short list. Only the reviewer who wants depth opens it.

---

## 7. Motion

| Motion | Where | Duration and easing | Purpose |
| :--- | :--- | :--- | :--- |
| Pinned carousel tracking scroll | Section 3 | Tied to scroll position, no easing | Position feedback: which company you are reading |
| Reveal (opacity 0 to 1, `translateY 12px` to 0) | Once per viewport, on the section's first entry | 420ms, `cubic-bezier(0.16, 1, 0.3, 1)` | Separates chapter starts, nothing more |
| Hover (border to `--hairline-strong`, text to `--text-primary`) | Interactive elements | 140ms linear | Affordance |
| Clipboard confirmation | Copy buttons | 200ms fade | State feedback |

**Removed:** `animate-ping`, `animate-pulse`, `animate-bounce`, `whileHover` scale and lift on every card, `hover:rotate-45` on the theme toggle, staggered fade-up on every single block.

**`prefers-reduced-motion: reduce`:** the carousel becomes a stacked list of three panels, the reveal is skipped, and no transform runs. This is a rendering path, not a CSS override.

---

## 8. Diagram language

All diagrams are inline SVG React components in `src/components/diagrams/`. No image files, no mermaid runtime, no new dependency. They read their colors from CSS variables so both themes work without a second asset.

| Property | Value |
| :--- | :--- |
| Stroke | `1.25px`, `--hairline-strong` for structure, `--accent-fill` for the one path being explained |
| Node fill | `--bg-raised` on light, `--bg-surface` on dark |
| Node radius | `--radius-sm` (4px) |
| Node label | Inter 500, `0.8125rem`, `--text-primary` |
| Node sublabel | Inter 400, `0.75rem`, `--text-muted` |
| Connector | Orthogonal, 8px corner radius, arrowhead 6px |
| Accent | Exactly one accent path per diagram: the flow the case study is about |
| Labels | Sentence case, always horizontal, never rotated |
| Text in SVG | Real `<text>`, not paths, so it scales and stays selectable |
| Accessibility | `role="img"` plus `<title>` and `<desc>`; the same content also appears as a short caption or list in the DOM |

Six diagrams:

| Component | Answers |
| :--- | :--- |
| `CareerTimeline` | What is the five-year arc, and where does each company sit in it? |
| `ReconciliationFlow` | How does the Matchmade engine turn three document types into an audited reconciliation? |
| `PaymentFunnel` | Where did the PegiPegi payment funnel lose people, and what changed? |
| `FunnelLift` | What did the AdaKerja checkout change do to conversion? |
| `CapabilityStack` | How do the four competency layers stack on each other? |
| `ToolsArchitecture` | How does a tool mount inside `/tools/` without touching the portfolio shell? |

---

## 9. Component contracts

| Component | Contract |
| :--- | :--- |
| `Navbar` | One glass surface. Sentence-case links. Esc closes the contact popover and returns focus to the trigger. The mobile sheet traps focus and restores it. Popover width `min(20rem, calc(100vw - 2rem))`. No scroll-progress gradient bar. |
| `Panel` | Solid `--bg-surface`, 1px hairline, `--radius-md`. Replaces `GlassCard`. No `glow` prop exists. |
| `Badge` | One variant. `--accent-wash` background, `--accent-ink` text, `--radius-sm`, sentence case, no dot, no uppercase, no border. Used for tool status only. |
| `Metric` | Mono, tabular, `--text-primary` for the value, `--text-muted` for the label. Optional `from to` comparison. Never wrapped in a card on its own. |
| `CompanyCarousel` | Pinned section, prev and next buttons, three dot buttons with `aria-label`, arrow-key support, `aria-live="polite"` announcing the active company, stacked fallback under `prefers-reduced-motion` and below 768px (native horizontal scroll snap, no pinning). No `preventDefault` on wheel. |
| `Button` | Two variants only. `primary`: `--accent-fill` with `--accent-fill-ink` text. `quiet`: transparent, hairline border, `--text-primary` text. No arrow glyph unless the link leaves the site. |

---

## 10. Voice and copy

| Rule | Applied |
| :--- | :--- |
| No em dash | Use a colon, a comma, or a full stop. |
| No buzzwords | Banned: seamless, cutting edge, revolutionary, next generation, AI powered, leverage, robust, empower. |
| Evidence over adjectives | `5 days to 1 day` beats `dramatically faster`. `IDR 1.2B per client per year` beats `huge savings`. |
| CTAs name the action | `Email Athur`, `Copy email`, `Open the tools lab`, `Read the Matchmade case`. Never `Learn more`, `Explore`, `Get in touch`. |
| No internal jargon in user-facing copy | The footer does not say `style:amber-beacon`. The lab does not say `zero runtime collisions`. Design and build vocabulary stays in this file. |
| No fabricated telemetry | No latency, memory, or `PASS` strings that are not produced by a real measurement. A placeholder says it is a placeholder. |
| Section eyebrows are sentence case and specific | `Selected work` and `How the work was built` are allowed. `IMPACT TELEMETRY //` and `ENGINEERING FLUENCY` are not. |

---

## 11. Decision manifest (R-31)

| Decision | One-line reason |
| :--- | :--- |
| Keep the warm alabaster canvas | It differentiates from the default cold-white developer portfolio while staying quiet enough for body text. |
| Demote amber to a signal | Amber on fill, text, border, and glow at once made the accent meaningless. |
| Near-black text on amber fills | White on `#D97706` is 3.2:1 and fails AA. |
| Glass only on the nav | The nav genuinely overlays content. Panels do not, so glass there is costume. |
| Panels instead of cards with glow | Shadow and glow were carrying hierarchy that spacing and rule weight should carry. |
| Three radius steps | Radius is a hierarchy tool, so collapsing it to one pill shape erased the hierarchy. |
| Mono for numbers only | Mono as a section voice turned the page into a fake console. |
| Six different section compositions | The page felt constricted because every section had the same shape. |
| A pinned carousel for companies | One company at a time is the only way to give three case studies real room without a wall of text. |
| Diagrams for the case studies | The argument is a system and a funnel, which a diagram states faster than a paragraph. |
| Structured `profile.js` instead of markdown | Diagrams and metrics need typed data, and the markdown pipeline was never read. |
| Self-hosted fonts | The production CSP allows `font-src 'self'`, so the Google Fonts CDN link was a guaranteed font failure. |
| Two shadows only | Elevation should be rare enough to mean something. |
| A hexagon-and-dot mark for the favicon and OG card | It is the beacon reduced to two shapes, so the identity survives at 16px. |
| A generated 1200x630 OG card | A blank link preview loses the first impression before the page loads. |
| A `?theme=light` or `?theme=dark` override | Lets a shared link open in the intended theme, and makes visual review reproducible. |
| The 3D chunk loads only after four capability gates and idle | 223KB gzipped must never sit on the critical path. |
| The reveal has a 1200ms fallback timer | A failed IntersectionObserver must never strand content at opacity 0. |

---

## 12. Delivery gate for this project

Before shipping, every line must hold, with evidence.

- [ ] Zero em dashes in content, metadata, and code strings.
- [ ] Every text pair is at or above 4.5:1, verified against the matrix in 3.2.
- [ ] Amber appears at most twice per screen (3.3).
- [ ] Glass on exactly one element, shadow on at most two, glow on at most one (5).
- [ ] Mono appears only as a metric or identifier (4.2).
- [ ] No two adjacent sections share a composition (6).
- [ ] No `animate-ping`, `animate-pulse`, or `animate-bounce` in the source.
- [ ] The carousel is fully operable by keyboard, announces the active company, and degrades to a stacked list under reduced motion.
- [ ] Every control has a real action. Any placeholder is labelled as one.
- [ ] Both themes render at 320px, 768px, and 1440px with no horizontal overflow and no clipped text.
- [ ] Every diagram has `role="img"`, a `<title>`, and a text equivalent in the DOM.
