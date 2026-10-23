# PRD Review: AI SaaS Product Manager Portfolio & Tools Hub

**PRD Author**: Athur Naufan Muharam  
**PRD Status**: In Review (V2)  
**Review Date**: 2026-10-23  
**Reviewed by**: Executive · Designer · Customer Ops · Engineering (AI Personas)  
**Template variant**: Lean MVP (`prd_mvp.md`), reviewed without penalizing omitted narrative JTBD. "Customer Ops" is interpreted as the site owner operating content and releases.

---

## Overall Verdict: NEEDS REVISION ⚠️ (blocked only on owner confirmations)

**Summary**: V2 closes all 🔴 findings from the draft (architecture contradiction, deploy collision, accessibility, privacy). The remaining blockers are content and decisions only the owner can supply: real KPIs, cleared case studies, domain, language choice. Biggest strength: clear phase boundary with Tools limited to placeholders. Single most important fix: do not ship the shell before at least 3 case studies are written.

---

## 🏢 Executive Review

| Concern Area | Verdict |
| :--- | :--- |
| Strategic alignment | Strong |
| Business case & ROI | Adequate |
| Resource & opportunity cost | Adequate |
| Risk appetite | Strong |
| Timeline & planning fit | Adequate |
| Market & competitive urgency | Weak |
| Success clarity | Adequate |
| Stakeholder & customer commitments | Adequate |

**Narrative**: The site is a credible career asset if content is strong. The 2-week solo estimate is plausible for the shell but silent on content authoring, which is the real effort. Metrics now exist but the targets are guesses without a baseline.

### Concerns
- 🔴 Content readiness is not a gate: a polished shell with thin case studies reads worse than none.
- 🟡 No stated competitive reference (what do 3 strong AI PM portfolios do that this must beat).
- 🟡 Targets (8% contact intent, 10% tool discovery) have no benchmark; treat as hypotheses.
- 🟢 Employer-brand risk of publishing Matchmade work not yet handled in a written policy beyond the redaction list.

### Questions for PM
1. Is the primary goal job search or consulting? It changes the CTA and the proof you lead with.
2. Which 3 case studies are publishable, and who approves redaction?
3. What is the content-complete date, separate from the build date?

---

## 🎨 Designer Review

| Concern Area | Verdict |
| :--- | :--- |
| User empathy & problem framing | Adequate |
| Persona actionability | Adequate |
| Information architecture | Adequate |
| Interaction pattern consistency | Adequate |
| Edge, empty & error states | Strong |
| Accessibility | Adequate |
| Cognitive load | Weak |
| Progressive disclosure | Adequate |
| Mobile / responsive | Strong |
| Design debt | Adequate |

**Narrative**: Visual direction is distinctive and now accessible after the amber text token fix. Empty/error states are well covered. Concern is cognitive load: hero 3D, bento grid, scroll-spy rail, timeline, glass nav and dual theme compete for attention on a 2-minute skim.

### Concerns
- 🟡 Scroll choreography (three camera phases) is decorative; ensure it never moves text or hides content.
- 🟡 Ultrawide left-rail scroll-spy adds a second navigation system; justify or defer to Phase 2.
- 🟡 Mixed-app navigation (full page load between `/` and `/tools/`) can cause theme or nav flash; both apps must share the inline theme script and identical nav markup.
- 🟢 Touch targets on the nav pill must be >= 44px.
- 🟢 Dark mode amber glow needs a contrast check against body text.

### Questions for PM
1. What is the one thing a visitor must remember after 30 seconds?
2. Is the scroll-spy rail essential at launch?
3. Should the placeholder containers show a "notify me" or just an `In Development` chip?

---

## 🛠️ Customer Ops Review (Site Owner Operations)

| Concern Area | Verdict |
| :--- | :--- |
| Field pain validation | Adequate |
| Configuration self-serviceability | Strong |
| Migration & backward compatibility | Strong |
| Failure & recovery | Adequate |
| Training & documentation | Weak |
| Support burden forecast | Adequate |
| Field edge cases | Adequate |
| Rollout & pilot strategy | Strong |
| Out-of-scope client asks | Adequate |
| Inter-feature interactions | Adequate |

**Narrative**: Editing content by Markdown and shipping with a push is a good owner workflow. Staging subdomain and rollback are defined. Missing is a short owner runbook (how to edit profile, add a tool, roll back, rotate FTP credentials).

### Concerns
- 🟡 No owner runbook; the plan lists steps but not as an operations doc.
- 🟡 FTP credentials rotation and 2FA ownership are not scheduled.
- 🟢 Hostinger auto-managed files (`.well-known`, `cgi-bin`) must be excluded from sync.
- 🟢 Uptime alerts go to one inbox; add a backup contact.

### Questions for PM
1. Who else (if anyone) can deploy if you are unavailable?
2. How often will you update content, weekly or per project?
3. Do you want a draft-preview URL per PR?

---

## ⚙️ Engineering Review

| Concern Area | Verdict |
| :--- | :--- |
| Requirement precision | Strong |
| Feasibility & blockers | Adequate |
| Architecture impact | Strong |
| Performance & scalability | Adequate |
| Data integrity & idempotency | Strong |
| Testability | Strong |
| Backward compatibility | Strong |
| Monitoring & observability | Adequate |
| Security & access control | Strong |
| Estimation confidence | Weak |
| Maintenance burden | Adequate |

**Narrative**: Contracts (routes, frontmatter, tool meta, headers) are explicit enough to build without questions. The sole unknown is the bracketed working directory vs. glob tooling, deliberately front-loaded as spike S0. Performance budgets are now realistic but Lighthouse mobile >= 85 with an R3F chunk is still the tightest NFR.

### Concerns
- 🔴 Spike S0 (brackets in path) must pass before any other task; failing late means rework.
- 🟡 Cross-app shared tokens via relative import requires `server.fs.allow` in the tools Vite config; document it.
- 🟡 CSP for GoatCounter and any inline theme script: inline script needs a hash in `script-src`; document the SHA-256 generation step in the plan.
- 🟡 Playwright viewport matrix + Lighthouse CI + axe is 3 test systems for a solo project; keep to Lighthouse CI + axe via Playwright only.
- 🟢 `.htaccess` behavior differs on LiteSpeed (some Hostinger plans); verify rewrite rules on the actual plan.

### Questions for PM
1. Which Hostinger plan (Apache or LiteSpeed)?
2. OK to add a CSP script hash step to CI?
3. JavaScript or TypeScript?

---

## Cross-Cutting Themes

| Theme | Raised by | Severity |
| :--- | :--- | :--- |
| Content readiness and publishing governance | Executive, Customer Ops | 🔴 |
| Cross-app seams (nav, theme, deep links, deploy) | Designer, Customer Ops, Engineering | 🟡 |
| Too many simultaneous visual systems for the skim use case | Executive, Designer | 🟡 |
| Estimate confidence and operational runbook | Customer Ops, Engineering | 🟡 |

## Priority Action Items

🔴 **Critical - before approval / hand-off**
1. Add content-complete gate (3 case studies, KPIs with sources, redaction pass) ahead of production deploy.
2. Run spike S0 (brackets in path) and record result in the plan.

🟡 **Major - before engineering begins**
1. Write owner runbook (edit content, add tool, rollback, rotate secrets).
2. Document CSP inline-script hash step and `server.fs.allow` for shared tokens.
3. Decide on scroll-spy rail: ship or defer.
4. Confirm Hostinger plan (Apache vs LiteSpeed).
5. Confirm JS vs TS.

🟢 **Minor - during design/implementation**
1. 44px touch targets, dark-mode glow contrast check.
2. Backup alert contact and `.well-known` exclusion.

## Recommended Next Steps

1. Answer the 7 confirmations in `PRD.md` Section 11 (especially 1, 3, 5).
2. Draft the 3 case study outlines before any scaffolding.
3. Then approve and run S0 as the first build action.

---

## Appendix A: PRD Pipeline State 3 (Crucible) Scorecard on `PRD.md` V2

Independence caveat: the same agent authored and scored; context isolation was approximated by scoring against the PRD text and rubric only.

| # | Dimension | Score | Justification |
| :--- | :--- | :---: | :--- |
| 1 | Completeness | 9.0 | All lean template sections present; Section 11 lists owner-only inputs with defaults (no TBD). |
| 2 | Depth & Specificity | 9.0 | Contracts, budgets, headers, frontmatter schema, event table. |
| 3 | Edge Cases & Unhappy Paths | 9.0 | 11 documented scenarios. |
| 4 | Testability | 8.5 | Gherkin with measurable Thens; no QA matrix table with preconditions (see below). |
| 5 | Architectural Clarity | 9.0 | Two diagrams, route contract, deploy collision resolved. |
| 6 | Operational Readiness | 8.5 | Rollout, rollback, monitoring present; runbook still missing. |
| | **Average** | **8.83** | Below the 9.0 pass threshold. |

**Verdict: FAIL (by 0.17), no dimension below 7, 0 critical findings.** Deficiencies to reach PASS (loop 1 of 3, not yet applied because they depend on owner answers):
1. Add a QA test matrix (TC-01..TC-12) with preconditions and expected results mapped to US-001..US-010.
2. Add an owner runbook section (edit content, add tool, rollback, rotate credentials).

### Loop 2 (applied)

Both deficiencies were independent of owner answers and are now fixed in `PRD.md` (Section 12 QA matrix with 17 cases, Section 13 owner runbook).

| # | Dimension | Score |
| :--- | :--- | :---: |
| 1 | Completeness | 9.0 |
| 2 | Depth & Specificity | 9.0 |
| 3 | Edge Cases & Unhappy Paths | 9.0 |
| 4 | Testability | 9.5 |
| 5 | Architectural Clarity | 9.0 |
| 6 | Operational Readiness | 9.0 |
| | **Average** | **9.08** |

**Verdict: PASS** (average >= 9.0, no dimension < 7, 0 open critical findings). Remaining items are owner confirmations (PRD Section 11), not document defects.

> ⚠️ **IMPORTANT**: Per pipeline rules, STATE 4 (ticket generation) is paused. Reply `EXECUTE` after approving, or give feedback.
