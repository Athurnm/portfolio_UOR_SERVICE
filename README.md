# AI SaaS Product Manager Portfolio & Micro-Tools Hub

[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Design: Amber Beacon](https://img.shields.io/badge/Design-style%3Aamber--beacon-D97706)](./design.md)
[![License: Private](https://img.shields.io/badge/License-Private-red)](./)

A high-performance personal web application and modular micro-tools hub built for an **AI SaaS Product Manager**. The platform serves a dual purpose:

1. **Curated Career & Case Studies Showcase (`/`)**: Demonstrates technical product leadership, verified unit economics, and AI product strategy synthesized directly from a centralized Markdown content engine (`src/content/profile.md`).
2. **Modular Micro-Tools Hub (`/tools`)**: A decoupled, sandboxed sub-application (`tools/`) hosting PM utilities, AI economics simulators, and interactive workflow prototypes with isolated runtime containers.

---

## 🌐 Live URLs & Domain Routing

* **Primary Domain**: [`https://athur-exp-bot.tech/`](https://athur-exp-bot.tech/) *(redirects to active Netlify deployment)*
* **Tools Hub**: `/tools/`
* **GitHub Repository**: [`https://github.com/Athurnm/portfolio_UOR_SERVICE.git`](https://github.com/Athurnm/portfolio_UOR_SERVICE.git)

---

## 🏛️ System Architecture

The application adopts a **two-tier decoupled Single Page Application (SPA)** model compiled into a single static distribution artifact:

```text
portfolio_UOR_SERVICE/
├── public/
│   ├── _redirects             # Netlify SPA routing fallback (/tools/* and /*)
│   └── _headers               # Security headers, CSP, and asset caching rules
├── src/                       # PORTFOLIO WEBAPP (Root /)
│   ├── components/
│   │   ├── canvas/            # Three.js Amber Beacon lattice & SVG fallback
│   │   ├── layout/            # Floating glassmorphic Navbar & Footer
│   │   └── ui/                # GlassCard and telemetry badges
│   ├── content/
│   │   └── profile.md         # Curated profile, case studies & verified KPIs
│   ├── styles/
│   │   ├── tokens.css         # Amber Beacon design tokens (WCAG 2.2 AA compliant)
│   │   └── index.css          # Tailwind CSS v4 styling
│   ├── App.jsx                # Portfolio main page (Hero, KPIs, Case Studies, Projects)
│   └── main.jsx
├── tools/                     # MICRO-TOOLS SUB-APPLICATION (/tools/)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LabStandby.jsx     # Lab Standby overview & blueprint cards
│   │   │   └── ToolContainer.jsx  # Standardized sandbox placeholder container
│   │   ├── registry.js            # Blueprint tools metadata registry
│   │   ├── App.jsx                # Sub-app router for /tools and /tools/:slug
│   │   └── styles/index.css       # Imports shared design tokens
│   ├── index.html
│   ├── package.json               # Independent tools workspace package
│   └── vite.config.js             # Built with base path '/tools/'
├── scripts/
│   └── assemble-artifact.mjs  # Merges tools/dist into dist/tools for Netlify
├── .github/workflows/
│   └── deploy.yml             # Automated CI/CD deployment to Netlify
├── .env.example               # Environment variables template
└── vite.config.js             # Root Vite configuration with vendor chunk splitting
```

---

## 🎨 Visual Identity: `style:amber-beacon`

Inspired by precision AI telemetry and warm editorial design:
* **Adaptive Light/Dark Modes**: Warm Alabaster paper canvas (`#FAF8F5`) in Light mode; Carbon Obsidian (`#0C0A09`) in Dark Console mode.
* **Strict WCAG 2.2 AA Accessibility**: Enforces token separation:
  * `--amber-core` (`#D97706`): Reserved for decorative halo glows, borders, and 3D mesh emissives.
  * `--amber-text` (`#B45309` on light, `#FBBF24` on dark): High-contrast readable text for links, badges, and headers (guaranteed `>= 4.5:1` contrast ratio).
* **Scroll-Reactive 3D Beacon**: Procedural low-poly icosahedron lattice with orbiting nodes rotating and damping based on scroll depth. Automatically falls back to a static SVG poster on low-spec devices or when `prefers-reduced-motion` is enabled.

---

## ⚡ Quick Start & Local Development

### Prerequisites
* **Node.js**: `>= 20.0.0` (tested on Node v22.17.0)
* **npm**: `>= 10.0.0`

### 1. Installation
Install dependencies for both the root portfolio app and the nested `tools` workspace:
```bash
npm install
```

### 2. Configure Environment Variables
Copy the template and configure local values:
```bash
cp .env.example .env
```

### 3. Start Local Development Servers
* **Run Portfolio App (`http://localhost:5173`)**:
  ```bash
  npm run dev
  ```
* **Run Micro-Tools Sub-App standalone (`http://localhost:5174/tools/`)**:
  ```bash
  npm run dev --workspace=tools
  ```

---

## 📦 Building & Production Assembly

To compile both applications into the final unified production distribution (`dist/`):

```bash
npm run build:all
```

This single command:
1. Compiles the Portfolio SPA into `dist/`.
2. Compiles the Tools sub-app into `tools/dist/` (with base path `/tools/`).
3. Executes `scripts/assemble-artifact.mjs` to copy `tools/dist` into `dist/tools/`.
4. Verifies presence of `dist/index.html`, `dist/tools/index.html`, `dist/_redirects`, and `dist/_headers`.

To preview the combined production build locally:
```bash
npm run preview
```
Visit `http://localhost:4173/` for the portfolio and `http://localhost:4173/tools/` for the micro-tools lab.

---

## 🚀 Netlify Deployment

The project is pre-configured for automated edge deployment on **Netlify**.

### Option A: Automated CI/CD (GitHub Actions)
Pushing to the `main` branch triggers `.github/workflows/deploy.yml`. Add the following secrets in your GitHub repository (**Settings → Secrets and variables → Actions**):
* `NETLIFY_AUTH_TOKEN`: Your Netlify Personal Access Token (7-day validity token).
* `NETLIFY_SITE_ID`: Your Netlify API Site ID.

### Option B: Manual CLI Deploy
Deploy directly from your terminal using the Netlify CLI:
```bash
# 1. Build the unified distribution artifact
npm run build:all

# 2. Deploy to production
npx netlify deploy --dir=dist --prod --auth=YOUR_NETLIFY_AUTH_TOKEN --site=YOUR_NETLIFY_SITE_ID
```

---

## 🔒 Security & Privacy Invariants

1. **Zero Secret Leakage**: No private API keys (OpenAI, Anthropic, Groq) are exposed in client-side Vite bundles (`VITE_*`).
2. **Sanitized Content**: Profile and case study Markdown are sanitized via `rehype-sanitize` to guarantee zero XSS vulnerabilities.
3. **Cookieless Telemetry**: Site analytics are measured via privacy-friendly **GoatCounter** custom events without tracking cookies or GDPR banner friction.
4. **Content Security Policy (CSP)**: Strict headers enforced in `_headers` preventing unauthorized frame embeds and script injections.

---

## 🗺️ Micro-Tools Roadmap (Phase 2 Pipeline)

| Tool Slug | Title | Domain | Status |
| :--- | :--- | :--- | :--- |
| `llm-token-economics` | **LLM Token & Margin Simulator** | AI Economics | Blueprint Container Ready |
| `prd-prompt-compiler` | **PRD Prompt Compiler & Gherkin Engine** | PM Automation | Blueprint Container Ready |
| `asr-model-selector` | **Multilingual ASR Model Selector** | Speech AI | Blueprint Container Ready |

---

## 📄 License & Attribution

* **Author**: Athur Naufan Muharam ([athurnm@gmail.com](mailto:athurnm@gmail.com))
* **Design System**: `style:amber-beacon`
* **Repository**: Private (`Athurnm/portfolio_UOR_SERVICE`)