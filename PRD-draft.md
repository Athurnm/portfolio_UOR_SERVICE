# Product Requirements Document (PRD): AI SaaS Product Manager Portfolio & Tools Hub

## 1. Executive Summary

A high-performance, aesthetically refined personal web application built with **React 19** and **Vite 6**. Designed specifically for an **AI SaaS Product Manager**, the application serves a dual purpose:

1. **Dynamic Markdown-Driven Portfolio**: Showcases product strategy, AI SaaS case studies, metrics, and career trajectory parsed directly from a centralized `profile.md` document.
2. **Modular Micro-Tools Hub (`/tools`)**: A scalable, plug-and-play directory architecture (`src/tools/`) where custom web utilities, AI calculators, and interactive prototypes built by the PM can be dynamically discovered, lazy-loaded, and showcased to the public.

The visual identity draws inspiration from NeedMCP's **`style:amber-beacon`**—balancing an airy, warm-parchment / dark-obsidian dual-mode aesthetic with glowing amber telemetry accents, subtle glassmorphism, and a lightweight, scroll-reactive **Three.js** (`@react-three/fiber`) 3D neural/beacon lattice.

---

## 2. Target Audience & User Personas

1. **AI SaaS Founders & Hiring Executives**: Looking for evidence of product sense, technical fluency (AI/LLMs, MCP, unit economics), and shipped products.
2. **Product Peers & Engineers**: Exploring interactive PM tools, prompt calculators, or SaaS frameworks hosted under the `/tools` directory.
3. **General Visitors (Mobile & Desktop)**: Browsing on varying viewport ratios (from 320px smartphones to 4K ultrawide monitors) expecting zero lag and intuitive navigation.

---

## 3. Core Functional Requirements

### 3.1. Global Navigation Bar

- **Persistent Glassmorphic Header**: Floating top navigation bar featuring brand identity/logo, primary route links (**Portfolio**, **Tools**), a theme toggle (Light / Dark Amber Beacon mode), and a primary CTA (e.g., "Book Strategy Call" or "Resume").
- **Responsive Adaptation**: Collapses into a clean, accessible bottom sheet or minimal floating pill menu on mobile viewports (`< 768px`).

### 3.2. Portfolio View (`/`) — Markdown-Driven Architecture

- **Decoupled Content Engine**: The portfolio page reads and parses `/src/content/profile.md` (supporting YAML frontmatter + GitHub Flavored Markdown) so the user can update their bio, work history, metrics, and AI product case studies without touching React component code.
- **Security Sanitization**: All rendered Markdown passes through `rehype-sanitize` and `DOMPurify` to guarantee zero XSS vulnerabilities.
- **Scroll-Linked Sections**:
  - **Hero Section**: Headline, value proposition, quick KPI badges (e.g., ARR growth, AI adoption metrics), and interactive Three.js Amber Beacon background.
  - **Product Philosophy & AI Stack**: Structured bento grid generated from Markdown sections.
  - **Case Studies & Experience**: Interactive timeline/cards detailing problem, AI architecture, PM execution, and measurable outcomes.

### 3.3. Modular Tools Showcase (`/tools` & `/tools/:toolSlug`)

- **Auto-Discovery Registry (`import.meta.glob`)**: Tools placed inside `src/tools/<tool-name>/` with a valid `meta.js` (or `index.jsx`) and marked `isPublic: true` are automatically registered in the `/tools` gallery.
- **Current State (Empty / Standby State)**: Since no public tools are enabled initially, `/tools` displays an engineered **"Amber Beacon Standby / Lab Coming Soon"** empty state—complete with an interactive 3D wireframe node, a preview of upcoming AI PM utilities (e.g., *LLM Token Economics Calculator*, *PRD Prompt Compiler*), and an architectural callout explaining how tools are dynamically mounted.
- **Future State (Scalable Sandboxing)**: Each future tool loads via `React.lazy()` and `<Suspense>`, wrapped in an `<ErrorBoundary>` so a crash in an experimental tool never breaks the main portfolio shell.

### 3.4. Lightweight Three.js & Scroll Animation System

- **3D Scene (`@react-three/fiber` + `@react-three/drei`)**: A low-poly, instanced geometric "Amber Beacon / AI Signal Lattice" that gently rotates and shifts camera perspective based on normalized scroll depth (`window.scrollY`).
- **Performance Guardrails**:
  - Frame-rate capped / on-demand rendering when static.
  - Automatic DPR clamping (`dpr={[1, 1.5]}`) to prevent mobile GPU overheating.
  - Full respect for `prefers-reduced-motion`.

---

## 4. Non-Functional Requirements (NFRs)

| Category | Requirement | Target Metric |
| :--- | :--- | :--- |
| **Performance** | Initial JS bundle (excluding lazy Three.js chunk) kept lean via code splitting. | Lighthouse Performance >= 92 (Desktop), >= 85 (Mobile) |
| **Responsiveness** | Dynamic fluid layout across 16:9, 21:9, 4:3, and 9:19.5 (mobile) viewports. | Zero horizontal overflow (`320px` to `2560px+`) |
| **Security** | Strict CSP headers, `.htaccess` hardening on Hostinger, sanitized Markdown, no exposed API keys in client bundle. | Mozilla Observatory Grade A |
| **Scalability** | Adding a new tool requires zero edits to core routing (`App.jsx`)—just adding a folder in `src/tools/`. | O(1) developer friction per new tool |
| **SEO & Hosting** | Clean client-side routing on Hostinger Apache servers via `.htaccess` SPA fallback rules. | Zero `404` errors on direct `/tools` refresh |

---

## 5. Out of Scope (Phase 1)

- Backend database or user authentication (all tools in Phase 1-2 will be client-side or use stateless edge endpoints).
- Live public tools on Day 1 (the `/tools` route will launch with the intentional Empty/Standby Lab UI until the first tool is toggled `isPublic: true`).
