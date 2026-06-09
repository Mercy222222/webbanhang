---
name: elite-orchestrator
description: "Workspace Elite Developer Team Orchestrator. Coordinates the Lead Architect, Visual Designer, Full-Stack Developer, Quant Developer, and QA Tester in an integrated workspace-wide pipeline (PHP e-commerce, Next.js dashboard, WebGL 3D Portfolio UI, and Python quant hedge fund). Use when the user asks to implement features, fix bugs, or run tests across multiple components of the workspace. Supports re-run, modify, update, and deploy commands."
---

# Workspace Elite Developer Team Orchestrator

This orchestrator coordinates the 5-member Workspace Elite Developer Team to design, develop, test, and deploy code changes across the entire workspace (including PHP MVC e-commerce, Next.js admin dashboard, WebGL Three.js portfolio UI, and Python quant hedge fund).

## Execution Mode: Hybrid

| Phase | Mode | Reason |
|-------|------|------|
| Phase 0: Context Audit | Sub-agent | Fast offline context checking |
| Phase 1: Planning & Design | Agent Team | Collaborative architecture design (lead-architect + ui-designer) |
| Phase 2: Implementation | Agent Team | Parallel development & integration (fullstack-dev + quant-dev + ui-designer) |
| Phase 3: QA & Verification | Agent Team | End-to-end testing and verification (qa-tester + fullstack-dev) |
| Phase 4: Production Deploy | Sub-agent | Final deployment checks and git pushing |

## Team Members

| Name | Agent Type | Core Role | Core Skills | Output |
|------|------------|-----------|-------------|--------|
| `lead-architect` | `general-purpose` | Database designs, code boundaries, PR code reviews | `api-and-interface-design`, `code-review-and-quality` | `schema.sql`, `SPEC.md`, `review_report.md` |
| `ui-designer` | `general-purpose` | WebGL Three.js shaders, CSS/Tailwind animations, visual aesthetics | `ui-frontend`, `high-end-visual-design` | `index.css`, WebGL modules, animations |
| `fullstack-dev` | `general-purpose` | PHP MVC backend, database migrations, Next.js frontend TS | `db-backend`, `frontend-nextjs` | PHP models/controllers, Next.js pages |
| `quant-dev` | `general-purpose` | Python financial models, investor agents, backtest execution | `quant-finance`, `agent-engineering` | Python agents, backtest parameters |
| `qa-tester` | `general-purpose` | Playwright E2E tests, python pytest, CORS checks, security audits | `qa-e2e-testing`, `python-testing`, `security-and-hardening` | Test scripts, E2E reports, bug logs |

---

## Workflow

### Phase 0: Context Audit
**Mode:** Sub-agent (`lead-architect`)
1. Verify the current state of files in the workspace (PHP MVC, Next.js dashboard, Python quant fund, static portfolio HTML).
2. Read `.claude/agents/*.md` and `.claude/skills/*` to ensure there are no drift anomalies.
3. Check `_workspace/` for existing intermediate results. If found, determine if we are performing a **new run**, a **partial re-run**, or a **feedback refinement**.

### Phase 1: Planning & Design
**Mode:** Agent Team (`lead-architect` & `ui-designer`)
1. Create a `TeamCreate` with `lead-architect` and `ui-designer`.
2. The `lead-architect` writes the database schema additions and REST API contract in `_workspace/01_api_spec.md`.
3. The `ui-designer` drafts the page hierarchy, responsive layout guidelines, and animation requirements in `_workspace/01_design_spec.md`.
4. Validate both specifications against structural limits and project requirements.

### Phase 2: Implementation
**Mode:** Agent Team (`fullstack-dev`, `quant-dev`, & `ui-designer`)
1. Create a `TeamCreate` with the developers and designer.
2. Register tasks via `TaskCreate` with clear dependencies:
   - `ui-designer`: Implement Three.js shaders and styling enhancements.
   - `fullstack-dev`: Implement database migrations, PHP routing, CORS API endpoints, and Next.js interfaces (dependent on `01_api_spec.md`).
   - `quant-dev`: Code Python investor agents, valuation math, and configure LangGraph nodes (dependent on `01_api_spec.md`).
3. Members communicate via `SendMessage` to align on data interfaces.

### Phase 3: QA & Verification
**Mode:** Agent Team (`qa-tester` & `fullstack-dev`)
1. Create a `TeamCreate` with `qa-tester` and `fullstack-dev`.
2. The `qa-tester` executes automated tests:
   - Python unit tests: `pytest` in `ai-hedge-fund`.
   - Node.js builds: `pnpm run build` in `admin-dashboard`.
   - CORS and API checks: verify CORS headers allow client access and credentials.
3. If bugs are found, `qa-tester` uses `SendMessage` to report stack traces to `fullstack-dev` or `quant-dev` for immediate fixes.

### Phase 4: Production Deploy & Close
**Mode:** Sub-agent (`lead-architect`)
1. Perform a final code review of all modified files.
2. Build production bundles and stage changes (`git add`).
3. Commit changes with a structured message and push to remote (`git push origin main`).
4. Generate the final project walkthrough in `walkthrough.md` and report success to the user.

---

## Data Flow Protocol
- **Specification**: Shared via files in `_workspace/01_*`.
- **Implementation drafts**: Saved to `_workspace/02_[agent]_[filename].[ext]`.
- **Final outputs**: Placed directly in the workspace production paths after QA approval.
- **Test results**: Saved to `_workspace/03_qa_report.md`.

## Error Handling
- **Database Conflict**: If auto-migrations fail, the `lead-architect` must be invoked to draft a safe, separate query to patch tables.
- **Port Conflicts / Connection issues**: If the frontend cannot reach the backend API, the `qa-tester` must audit CORS headers and local server listening ports.
- **Disk Space Overflow**: If drive D: runs out of space, invoke `pnpm store prune` to reclaim bytes.

## Test Scenarios

### Normal flow
1. User requests a full-stack feature (e.g. coupon system with admin list and fund balance impact).
2. Phase 0 finds a clean workspace.
3. Phase 1 defines the API endpoint and visual design.
4. Phase 2 develops the backend PHP controller, Next.js page, and Python investor cash adjustments.
5. Phase 3 runs pytest and Playwright tests successfully.
6. Phase 4 commits, pushes, and outputs `walkthrough.md`.

### Error flow
1. Phase 3 unit tests fail for the new Python investor agent.
2. `qa-tester` reports the failed assertion to `quant-dev` with logs.
3. `quant-dev` refines the calculation math.
4. `qa-tester` reruns pytest and passes.
5. Deployment proceeds safely.
