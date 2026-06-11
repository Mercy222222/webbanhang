---
name: deca-orchestrator
description: "Workspace 10-Member AI Developer Team Orchestrator. Coordinates lead-architect, ui-designer, frontend-dev-next, frontend-dev, backend-api-dev, backend-dev, quant-dev, agent-architect, qa-tester-next, and quant-qa in a unified full-stack workspace development team. Use for complex features, workspace-wide changes, refactoring, or multi-component updates. Supports re-run, modify, update, design, and deploy commands. Always refer to this skill when coordinating the entire 10-agent team."
---

# Workspace Deca-Developer Team Orchestrator

This orchestrator coordinates the 10-member Workspace Deca-Developer Team to design, build, test, and deploy features across the entire workspace (including PHP MVC e-commerce, Next.js admin dashboard, WebGL Three.js portfolio UI, Python quant hedge fund, and GSD workflow).

## Execution Mode: Hybrid

| Phase | Mode | Reason |
|-------|------|------|
| **Phase 0: Context Audit** | Sub-agent | Fast audit of the workspace state and previous outputs. |
| **Phase 1: Planning & Architecture** | Agent Team | Collaborative design (lead-architect, agent-architect, ui-designer). |
| **Phase 2: Frontend & UI Development** | Agent Team | Collaborative UI coding (frontend-dev-next, frontend-dev, ui-designer). |
| **Phase 3: Backend & API Development** | Agent Team | Parallel backend logic (backend-dev, backend-api-dev, quant-dev). |
| **Phase 4: QA & Verification** | Agent Team | Comprehensive cross-boundary validation (qa-tester-next, quant-qa, lead-architect). |
| **Phase 5: Production Deploy & Close** | Sub-agent | Final integration checks, commits, and clean up. |

---

## Team Members

All agent invocations MUST explicitly set `model: "opus"`.

| Member Name | Agent Type | Core Role | Focus Area |
|-------------|------------|-----------|------------|
| `lead-architect` | `general-purpose` | Database schema designs, module boundaries, system design, PR reviews. | Global architecture, schema.sql, REST contracts. |
| `ui-designer` | `general-purpose` | WebGL Three.js shaders, CSS animations, landing pages, visual style design. | UI style, index.css, visual effects. |
| `frontend-dev-next` | `general-purpose` | Next.js React frontend components, page routing, dynamic hooks. | admin-dashboard, React pages. |
| `frontend-dev` | `general-purpose` | Vanilla HTML/CSS/JS frontend modules, UI styling fixes. | blog-template, static HTML. |
| `backend-api-dev` | `general-purpose` | Node.js REST/GraphQL API handlers, serverless endpoints. | backend-api, database queries. |
| `backend-dev` | `general-purpose` | PHP MVC controllers, database migrations, database administration. | webbanhang, PHP models. |
| `quant-dev` | `general-purpose` | Python financial models, investor agents, backtesting logic. | ai-hedge-fund, pytest scripts. |
| `agent-architect` | `general-purpose` | GSD (Get Shit Done) workflows, agent prompts, task definitions. | get-shit-done, agent cooperation. |
| `qa-tester-next` | `general-purpose` | Next.js frontend testing, Playwright E2E tests, browser auditing. | E2E automation, UI correctness. |
| `quant-qa` | `general-purpose` | Python testing, financial math validation, edge cases. | ai-hedge-fund, pytest verification. |

---

## Workflows by Phase

### Phase 0: Context Audit (Sub-agent: `lead-architect`)
1. Verify the current state of files in the workspace.
2. Read `.claude/agents/*.md` and `.claude/skills/*` to verify there are no drift anomalies.
3. Check `_workspace/` for existing intermediate results:
   - **`_workspace/` missing** → Initial Run. Proceed to Phase 1.
   - **`_workspace/` present + partial update request** → Refinement Run. Invoke only specific developer agents for changes, reusing existing specs.
   - **`_workspace/` present + new request** → Fresh Run. Move the old `_workspace/` to `_workspace_prev/` and recreate `_workspace/`.

### Phase 1: Planning & Architecture (Agent Team: `lead-architect`, `agent-architect`, `ui-designer`)
1. Create a `TeamCreate` containing `lead-architect`, `agent-architect`, and `ui-designer`.
2. Register tasks via `TaskCreate`:
   - `lead-architect`: Draft global API specifications (`_workspace/01_api_spec.md`) and database schemas.
   - `ui-designer`: Design UI wireframe guides, visual tokens, and motion layouts (`_workspace/01_ui_spec.md`).
   - `agent-architect`: Define developer sub-tasks, task dependencies, and agent cooperation prompt rules (`_workspace/01_workflow_spec.md`).
3. Agents refine the plans through `SendMessage` before outputting specs to `_workspace/`.

### Phase 2: Frontend & UI Development (Agent Team: `frontend-dev-next`, `frontend-dev`, `ui-designer`)
1. Create a `TeamCreate` containing `frontend-dev-next`, `frontend-dev`, and `ui-designer`.
2. Register tasks:
   - `ui-designer`: Code WebGL Three.js modules, custom shaders, and animations.
   - `frontend-dev-next`: Build Next.js dashboards, React components, and data binding hooks.
   - `frontend-dev`: Implement vanilla CSS rules, static HTML elements, and portfolio effects.
3. Coordinate styles through `_workspace/01_ui_spec.md` to prevent styling conflicts.

### Phase 3: Backend & API Development (Agent Team: `backend-dev`, `backend-api-dev`, `quant-dev`)
1. Create a `TeamCreate` containing `backend-dev`, `backend-api-dev`, and `quant-dev`.
2. Register tasks:
   - `backend-dev`: Setup database tables and write PHP controllers and query logic.
   - `backend-api-dev`: Implement Node.js API handlers, middleware, and CORS configuration.
   - `quant-dev`: Program Python investor logic, financial data loaders, and backtest configurations.
3. Reference `_workspace/01_api_spec.md` as the source of truth for all data interface formats.

### Phase 4: QA & Verification (Agent Team: `qa-tester-next`, `quant-qa`, `lead-architect`)
1. Create a `TeamCreate` containing `qa-tester-next`, `quant-qa`, and `lead-architect`.
2. Execute automated validation:
   - `qa-tester-next` runs Playwright E2E browser tests and Node.js lint/typechecks.
   - `quant-qa` executes Python pytest coverage and math assertion checks.
   - `lead-architect` conducts a code review of modified components.
3. Bugs are reported immediately via `SendMessage` to the respective developers for correction.

### Phase 5: Production Deploy & Close (Sub-agent: `lead-architect`)
1. Compile final code bundles (e.g., `pnpm run build` or `npm run build`).
2. Run git commands to stage and commit changed files (`git add`, `git commit`).
3. Push changes to git remote (`git push origin main` or equivalent).
4. Create the final walkthrough in `walkthrough.md` summarizing the changes and verification results.

---

## Data Flow Protocol
- **Workspace directory**: Intermediate files are saved in `_workspace/` with names following `{phase}_{agent}_{artifact_desc}.{ext}`.
- **Specification sharing**: Developers must read specifications from `_workspace/01_*` prior to starting work in Phase 2/3.
- **Verification log**: The QA results must be logged in `_workspace/04_qa_report.md`.

## Error Handling & Recovery
- **Compile/Build Error**: The QA agent identifies the error stack trace and sends it via `SendMessage` directly to the developer responsible. The developer fixes it and requests a recheck.
- **Conflict in Schemas**: If PHP MVC and Next.js APIs require schema adjustments, `lead-architect` is invoked to rewrite database specs and resolve conflicts.

## Test Scenarios

### Normal Flow
1. User requests a global dashboard update linked with PHP backend data and a Python backtest preview.
2. `lead-architect` performs a workspace audit.
3. Design team drafts API specs and UI wireframes.
4. Backend and Frontend developers build components concurrently.
5. QA agents verify all endpoints, test coverage, and build correctness.
6. Deployer commits, pushes, and outputs `walkthrough.md`.

### Error Recovery Flow
1. During Phase 4, Next.js build fails due to type mismatch in backend API.
2. `qa-tester-next` captures the TypeScript compiler error and sends a `SendMessage` to `frontend-dev-next` and `backend-api-dev`.
3. Developers update files to match specs.
4. Build is retried and passes.
5. Deployment finishes successfully.
