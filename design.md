# Design System & 3D Experience Specification (`design.md`)

## 1. Aesthetic Direction: `style:amber-beacon` (AI SaaS PM Edition)

Inspired by NeedMCP's **Amber Beacon** and **Amber Atrium** design language, this system blends **editorial clarity (Light-first warmth)** with **precision AI telemetry (Glowing Amber accents and Translucent Glass)**.

Unlike heavy, neon-drenched cyberpunk themes that feel dated and slow down browsers, **Amber Beacon Light/Adaptive** uses an airy warm-alabaster canvas (`#FAF8F5`) paired with deep obsidian typography (`#141413`), precision 1px borders, and a radiant amber core (`#D97706` to `#F59E0B`) that guides the user's eye like a literal beacon. A sleek Dark Console mode (`#0C0A09`) is included for evening viewing.

---

## 2. Color Tokens (CSS Custom Properties)

```css
:root {
  /* Light Mode (Default -- Airy, Editorial, Warm Parchment) */
  --bg-canvas: #FAF8F5;          /* Warm Alabaster Paper */
  --bg-surface: #F3EFEA;         /* Inset Bone / Card Background */
  --bg-glass: rgba(255, 255, 255, 0.72); /* Translucent Floating Panels */
  
  --text-primary: #141413;       /* Deep Obsidian Ink */
  --text-secondary: #57534E;     /* Warm Graphite */
  --text-muted: #8C857B;         /* Muted Stone */

  /* Amber Beacon Core Accents */
  /* RULE: --amber-core is for fills, borders, glow, large display text only (about 3.0:1 on canvas, fails AA for body text). */
  /* RULE: any amber TEXT at body size uses --amber-text (about 4.7:1 on --bg-canvas). */
  --amber-text: #B45309;         /* Accessible amber for text and links on light */
  --amber-core: #D97706;         /* Primary Beacon Amber */
  --amber-glow: #F59E0B;         /* Radiant Signal Gold */
  --amber-subtle: rgba(217, 119, 6, 0.12); /* Badge & Halo Fill */
  --amber-border: rgba(217, 119, 6, 0.35); /* Active Telemetry Ring */

  /* Structural & Semantic */
  --border-hairline: rgba(20, 20, 19, 0.08);
  --shadow-elevated: 0 12px 32px -8px rgba(20, 20, 19, 0.06), 0 0 1px 1px rgba(20, 20, 19, 0.05);
  --shadow-beacon: 0 0 24px -4px rgba(245, 158, 11, 0.28);
}

[data-theme="dark"] {
  /* Dark Mode (Amber Console -- Deep Obsidian & Warm Glow) */
  --bg-canvas: #0C0A09;          /* Carbon Obsidian */
  --bg-surface: #171412;         /* Warm Espresso Slate */
  --bg-glass: rgba(23, 20, 18, 0.75);
  
  --text-primary: #F5F5F4;
  --text-secondary: #A8A29E;
  --text-muted: #78716C;

  --amber-text: #FBBF24;         /* Accessible on #0C0A09 (above 10:1) */
  --amber-core: #F59E0B;
  --amber-glow: #FBBF24;
  --amber-subtle: rgba(245, 158, 11, 0.15);
  --amber-border: rgba(245, 158, 11, 0.45);
  --border-hairline: rgba(245, 245, 244, 0.08);
}
```

---

## 3. Typography & Hierarchy

To communicate the authority of an **AI SaaS Product Manager**, typography pairs geometric executive headers with clean body copy and developer-grade monospace telemetry:

- **Heading Font (`--font-display`)**: `'Outfit'` or `'Plus Jakarta Sans'` (Weights: 600, 700; tight tracking `-0.02em`).
- **Body Font (`--font-sans`)**: `'Inter'` or `'DM Sans'` (Weights: 400, 500; generous `1.65` line height for Markdown case studies).
- **Telemetry / Metrics Font (`--font-mono`)**: `'JetBrains Mono'` (Used for KPI tags, version badges, latency metrics, and `/tools` metadata).

### Fluid Type Scale (`clamp()`)

- **H1 (Hero Title)**: `clamp(2.25rem, 4vw + 1rem, 4rem)`
- **H2 (Section Header)**: `clamp(1.65rem, 2.5vw + 0.75rem, 2.5rem)`
- **H3 (Card / Tool Title)**: `clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem)`
- **Body**: `clamp(0.95rem, 0.4vw + 0.85rem, 1.125rem)`

---

## 4. Three.js Visual Architecture ("The Amber Beacon")

The 3D experience must enhance the narrative of an AI Product Manager -- turning complexity into structured signals -- while remaining lightweight: the lazy Beacon chunk budget is `<= 280KB` gzipped (`three` core alone is roughly 150KB gzipped, so the draft's 150KB figure was infeasible), target 60fps on mid-range mobile, never on the critical rendering path.

> ⚠️ **IMPORTANT**: The Beacon is optional enhancement. It loads only after idle AND when WebGL is available, `prefers-reduced-motion` is not `reduce`, and `saveData` is not `true`. Otherwise a static SVG poster of the beacon is shown and the chunk is never requested.

### 4.1. Scene Concept: Neural Signal Beacon

1. **Core Geometry**: An abstract icosahedron wireframe cage surrounding a softly pulsing amber core (`MeshPhysicalMaterial` with `transmission: 0.6`, `roughness: 0.2`, `emissive: '#D97706'`).
2. **Orbital Telemetry Nodes**: 40-60 instanced points (`<Instances>` from `@react-three/drei`) representing product data points that orbit the core cleanly.
3. **Scroll Choreography**:
   - **0% Scroll (Hero)**: The Beacon sits in the right two-thirds on desktop (or subtle top background on mobile), gently rotating.
   - **25%-60% Scroll (Experience & Metrics)**: Camera interpolates smoothly along a spline; the orbital nodes align into a structured 3D grid (symbolizing product roadmapping & order).
   - **60%-100% Scroll (Case Studies / Footer)**: The Beacon compresses into a warm horizon ring glow.

### 4.2. Performance & Lightness Rules

- **Single Shared Canvas**: One fixed `<Canvas>` (`position: fixed; inset: 0; pointer-events: none; z-index: 0`) sits behind the DOM content.
- **No Heavy Textures or Models**: 100% procedural geometry (zero `.gltf` or `.hdr` network downloads).
- **Adaptive Pixel Ratio**: `<Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: true }}>`.
- **Render Loop Policy**: the loop runs only while the hero is intersecting the viewport and the tab is visible (IntersectionObserver + `visibilitychange`); otherwise `frameloop="never"`. This resolves the draft's conflict between "on-demand when static" and "continuous rotation".
- **Failure Policy**: chunk load error or WebGL context loss swaps in the SVG poster; text content is never affected.
- **Import Discipline**: import specific `drei` helpers (e.g. `Instances`) so the bundler tree-shakes the rest; CI fails if the chunk exceeds the budget.

---

## 5. Responsive Viewport Strategy (Smartphone to Ultrawide)

Using CSS Grid, Container Queries, and dynamic viewport units (`100dvh`):

| Viewport Class | Breakpoint | Aspect Ratios | Layout & 3D Adaptation |
| :--- | :--- | :--- | :--- |
| **Smartphone (Portrait)** | `< 640px` | `9:16`, `9:19.5`, `9:20` | Single-column Bento stack; sticky glass pill navbar at top; Three.js Beacon scales down (`0.65x`) and shifts to top-center behind hero text with increased transparency (`opacity: 0.45`). |
| **Smartphone (Landscape) & Phablet** | `640px - 768px` | `16:9`, `18:9` | 2-column compact cards; reduced vertical padding (`py-8`); 3D canvas throttles particle count by 50%. |
| **Tablet & Foldable** | `768px - 1024px` | `4:3`, `3:4`, `16:10` | Asymmetric 2-column Bento grid; collapsible side TOC for Markdown profile sections. |
| **Desktop & Laptop** | `1024px - 1536px` | `16:9`, `16:10` | 12-column max-width container (`1200px`); split Hero (left 7 cols typography, right 5 cols interactive 3D Beacon). |
| **Ultrawide Monitor** | `> 1536px` | `21:9`, `32:9` | Content locked to `1360px` centered container with persistent left-rail Markdown scroll-spy and ambient wide-field Three.js lighting. |

---

## 6. Component Specifications

### 6.1. Navigation Bar (`Navbar.jsx`)

- **Height**: `64px`, floating `16px` from top of viewport.
- **Surface**: `backdrop-filter: blur(16px)`, `background: var(--bg-glass)`, `border: 1px solid var(--border-hairline)`, `border-radius: 9999px` (pill shape).
- **Items**:
  - Left: Pulsing `8px` Amber Beacon status dot + PM Name & `"AI PM"` monospace badge.
  - Center/Right: `Portfolio` (`/`) and `Tools` (`/tools/` with a static `Lab` badge, never a numeric count, since `0` advertises emptiness). `Tools` is a plain `<a>` (full page load, separate app).
  - Right: `Contact` CTA (popover: Email, LinkedIn). The draft's "Book Strategy Call" is removed because no booking flow exists.
- **Mobile (`< 768px`) decision**: the pill stays at the top and collapses to brand + menu button; the menu opens a full-width sheet. Focus is trapped in the sheet, `Esc` or backdrop closes it and returns focus to the button. (Resolves the draft's "bottom sheet or pill" ambiguity.)
- **Touch targets**: minimum `44x44px`.
- **Skip link**: first focusable element is `Skip to content`.
- **Far Right**: Theme Switcher icon button (stores `theme` in `localStorage`, same key on both apps).

### 6.2. Tools Standby / Empty State (`tools/src/pages/LabStandby.jsx`)

When no tool has `status: "live"`, instead of a broken or plain "No tools found" text, render the **Amber Beacon Lab Standby Card**:

- **Visual**: A translucent glass card with a `1px` dashed amber border (`var(--amber-border)`), a live status indicator (`STATUS: STANDBY // PIPELINE INITIALIZED`), and a clean architectural diagram showing how tools in `/src/tools/*` auto-mount.
- **Preview Slots**: 2-3 muted "Upcoming Blueprint" skeleton cards (e.g., *AI Feature ROI Estimator*, *Token Window Visualizer*) labeled `In Development` to reinforce the user's AI SaaS PM credibility even before the first tool is published.

### 6.3. Tool Container Page (`tools/src/components/ToolShell.jsx`)

Rendered at `/tools/:slug` for every registered tool. Placeholder now, real tool mount later, same chrome.

| Region | Spec |
| :--- | :--- |
| Breadcrumb | `Tools / <title>`, `Tools` links to `/tools/` |
| Header | Title (H1, `--font-display`), description, mono meta row: `version`, `category` |
| Status chip | `In Development` (amber-subtle fill, `--amber-text` label) for `blueprint`; `Live` (green-neutral) for `live` |
| Mount region | `role="region"`, `aria-label="<title> workspace"`, min-height `320px`, dashed `--amber-border`; placeholder copy: "This tool is being built. Check back soon." |
| Error state | Error boundary shows `This tool hit an error` + `[Reload tool]` + `[Back to Tools]`; navbar and footer stay functional |
| Footer CTA | `[Back to Tools]` |

### 6.4. 404 Pages

Portfolio 404 and Tools 404 share one component: large mono `404`, one line of copy, `[Back to Portfolio]` or `[Back to Tools]`. Both set `<meta name="robots" content="noindex">`.

---

## 7. Accessibility (WCAG 2.2 AA)

| Rule | Spec |
| :--- | :--- |
| Text contrast | >= 4.5:1 body; >= 3:1 for text >= 24px (or 18.66px bold) and UI borders. Amber text uses `--amber-text` |
| Focus | Visible ring: `2px` `--amber-text` outline with `2px` offset, >= 3:1 against adjacent colors |
| Motion | `prefers-reduced-motion: reduce` disables Beacon, scroll choreography, rotation, and reveal animations |
| Landmarks | `header`, `nav`, `main`, `footer`; one `<h1>` per page; no skipped heading levels |
| Keyboard | Everything operable by keyboard; focus trapped in mobile sheet and contact popover |
| No JavaScript | `<noscript>` shows name, headline, summary, contact links |
| Automation | axe-core on `/`, `/tools/`, one container page, 404; 0 serious/critical violations |

## 8. Cross-App Consistency (Portfolio and Tools apps)

- **Shared tokens**: both apps import `src/styles/tokens.css` (root app is the owner). The Tools Vite config sets `server.fs.allow` to include the repo root.
- **Shared theme bootstrap**: an identical inline script in both `index.html` files sets `data-theme` before first paint. Its SHA-256 is whitelisted in the CSP `script-src` (see `implementation-plan.md`).
- **Identical nav markup**: both apps render the same navbar (links are full page loads between apps) so the seam is invisible. Active-link state is derived from `location.pathname`.
- **Fonts**: self-hosted via `@fontsource` (Outfit, Inter, JetBrains Mono) so CSP `font-src 'self'` holds and no third-party font request leaks visitor IPs.
