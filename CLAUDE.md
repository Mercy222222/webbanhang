# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:6cd5cc61 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Agent Context Profiles

The managed Beads block is task-tracking guidance, not permission to override repository, user, or orchestrator instructions.

- **Conservative (default)**: Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
- **Minimal**: Keep tool instruction files as pointers to `bd prime`; use the same conservative git policy unless active instructions say otherwise.
- **Team-maintainer**: Only when the repository explicitly opts in, agents may close beads, run quality gates, commit, and push as part of session close. A current "do not commit" or "do not push" instruction still wins.

## Session Completion

This protocol applies when ending a Beads implementation workflow. It is subordinate to explicit user, repository, and orchestrator instructions.

1. **File issues for remaining work** - Create beads for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Handle git/sync by active profile**:
   ```bash
   # Conservative/minimal/default: report status and proposed commands; wait for approval.
   git status

   # Team-maintainer opt-in only, unless current instructions forbid it:
   git pull --rebase
   git push
   git status
   ```
5. **Hand off** - Summarize changes, validation, issue status, and any blocked sync/commit/push step

**Critical rules:**
- Explicit user or orchestrator instructions override this Beads block.
- Do not commit or push without clear authority from the active profile or the current user request.
- If a required sync or push is blocked, stop and report the exact command and error.
<!-- END BEADS INTEGRATION -->

## 🧭 Vibe Coding Guidelines

This project enforces strict **Vibe Coding Best Practices**. AI agents must review and align with these resources:
* **Guidelines**: [.agents/vibe-coding/VIBE_CODING.md](file:///d:/webbanhang/.agents/vibe-coding/VIBE_CODING.md)
* **Templates**: [.agents/vibe-coding/templates/](file:///d:/webbanhang/.agents/vibe-coding/templates/)

### Core Workflow for Agents:
1. **Plan Mode First**: Use `/plan` (or `Shift + Tab` twice) to present an implementation plan before editing files. List all assumptions and risks.
2. **Context Management**: Run `/clear` between tasks to avoid context bleed. Use `/compact` when context is near full.
3. **Diff & Risk Review**: Prior to task completion, run a risk review summarizing changed files, deleted files, and new dependencies.
4. **Off-Limits Zones**: Do not modify `/src/auth/`, `/src/payments/`, database migration files, or configuration files without explicit confirmation.

## Build & Test

This workspace contains multiple sub-projects. Run verification commands in their respective directories:

### 1. PHP/MySQL E-commerce (`webbanhang` or root)
* Validate PHP syntax: `php -l <filename>`
* Setup database: `php setup_db.php`

### 2. Next.js React App (`app`)
* Run dev server: `npm run dev` or `pnpm dev`
* Run typecheck: `pnpm typecheck` or `npm run typecheck`
* Run tests: `pnpm test` or `npm test`

### 3. Hedge Fund Simulator (`ai-hedge-fund`)
* Run tests: `pytest`

### 4. GSD Workflow Tool (`get-shit-done`)
* Run tests: `npm test` or `vitest`

```bash
# Example verification:
# php -l index.php
# pnpm typecheck
```

## Architecture Overview

_Add a brief overview of your project architecture_

## Conventions & Patterns

_Add your project-specific conventions here_

---

## 🧠 Karpathy AI Coding Guidelines

> Derived from [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls.
> **Skill file:** `.agents/skills/karpathy-guidelines/SKILL.md`

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## Harness: ecom-dev

**Goal:** Coordinate the backend, frontend, and QA agents to build, modify, and verify e-commerce components for the `webbanhang` workspace.

**Trigger:** Use `ecom-dev-orchestrator` skill for any feature additions, backend logic changes, styling edits, or testing tasks.

**Changelog:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-06-09 | Initial Harness setup | All | Configure developer agent team (backend-dev, frontend-dev, qa-tester) and skills. |

---

## Harness: web-dev

**Goal:** Coordinate the designer, frontend, backend, and QA agents in a Next.js pipeline to develop, test, and deploy React web applications.

**Trigger:** Use `web-dev-orchestrator` skill for wireframing, Next.js page development, REST/GraphQL API modifications, E2E tests, or staging deployment tasks.

**Changelog:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-06-09 | Initial Next.js Harness setup | All | Configure developer agent team (designer, frontend-dev-next, backend-api-dev, qa-tester-next) and skills. |

---

## Harness: quant-dev

**Goal:** Coordinate the quant developer, agent architect, and QA tester to build, update, and backtest the Python-based hedge fund simulator.

**Trigger:** Use `quant-dev-orchestrator` skill for adding investor agents, modifying valuation math, configuring risk limits, or running backtest validation suites.

**Changelog:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-06-09 | Initial Quant Harness setup | All | Configure developer agent team (quant-dev, agent-architect, quant-qa) and skills. |

---

## Harness: elite-dev

**Goal:** Coordinate a 5-member elite team (Architect, UI/WebGL Designer, Full-Stack Developer, Quant Developer, and QA Tester) to design, style, implement, and verify complex full-stack features and AI financial models across the entire workspace.

**Trigger:** Use `elite-orchestrator` skill for any multi-component feature implementation, WebGL/Three.js visual design, PHP backend/Next.js frontend integrations, or Python hedge fund agent modifications.

**Changelog:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-06-09 | Initial 5-member Elite Harness setup | All | Configure unified workspace-wide elite team and hybrid orchestrator skill. |

---

## Harness: deca-dev

**Goal:** Coordinate a 10-member workspace-wide developer team to design, build, test, and deploy features across PHP MVC e-commerce, Next.js admin dashboard, WebGL Three.js UI, Python quant hedge fund, and GSD workflows.

**Trigger:** Use `deca-orchestrator` skill for complex features, workspace-wide changes, refactoring, or multi-component updates.

**Changelog:**
| Date | Change | Target | Reason |
|------|--------|--------|--------|
| 2026-06-10 | Initial 10-member Deca Harness setup | All | Configure unified 10-member workspace-wide team and hybrid orchestrator skill. |

---

## 하네스: Growth & Deployment

**목표:** Manage A/B testing, ASO/SEO optimizations, and CI/CD deployments for the webbanhang portfolio.

**트리거:** Deployment, experiment, or metadata optimization 관련 작업 요청 시 `orchestrator-growth` 스킬을 사용하라. 단순 질문은 직접 응답 가능.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-13 | 초기 구성 | 전체 | 포트폴리오 프로덕션 배포 및 Growth 자동화 셋업 |
