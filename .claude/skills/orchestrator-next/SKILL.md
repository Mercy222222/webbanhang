---
name: web-dev-orchestrator
description: "Full-stack React/Next.js developer team orchestrator. Coordinates designer, frontend-dev-next, backend-api-dev, and qa-tester-next. Use this when developing Next.js websites, designing API handlers, wireframing pages, testing user flows, or deploying code. Also triggers on: 're-run', 'modify', 'update', 'fix', or 're-deploy' web elements."
---

# Next.js Full-Stack Developer Team Orchestrator

Integrates the UI/UX Designer, Next.js Frontend Developer, Backend API Developer, and E2E QA Tester into a sequential development pipeline to build, verify, and deploy modern web applications.

## Execution Mode: Agent Team

## Agent Configuration

| Team Member | Agent Type | Role | Skill | Output |
|-------------|------------|------|-------|--------|
| designer | custom | UI/UX Designer | design-wireframe | `_workspace/02_designer_layout.md` |
| backend-api-dev | custom | API Developer | backend-api | `_workspace/03_backend_api.md` |
| frontend-dev-next | custom | Next.js Developer | frontend-nextjs | `_workspace/04_frontend_next.md` |
| qa-tester-next | custom | QA Tester | qa-e2e-testing | `_workspace/05_qa_report.md` |

---

## Workflow

### Phase 0: Context Check (Subsequent Operations Support)
Analyze previous workspace states to determine execution path:
1. Verify if the `_workspace/` directory exists.
2. Determine execution branch:
   - **No `_workspace/`**: Initial run. Proceed to Phase 1.
   - **`_workspace/` exists + partial update request**: Re-run the specific affected agent (e.g., only `frontend-dev-next` if the request is styling-only), preserving other previous artifacts.
   - **`_workspace/` exists + new feature request**: Archive previous `_workspace/` to `_workspace_backup_[timestamp]/` and begin a fresh run from Phase 1.

### Phase 1: Preparation
1. Parse the user request to identify structural database needs, API logic updates, UI refinements, or testing requirements.
2. Ensure the working directory contains `_workspace/`. Save raw input briefs to `_workspace/00_input.json`.

### Phase 2: Team Creation
1. Spawn the developer team using `TeamCreate`:
   ```
   TeamCreate(
     team_name: "web-dev-team",
     members: [
       { name: "designer", agent_type: "general-purpose", model: "opus", prompt: "You are the UI/UX Designer. Create layout wireframes, HSL style guides, spacing tokens, and outline interactive components." },
       { name: "backend-api-dev", agent_type: "general-purpose", model: "opus", prompt: "You are the Backend API Developer. Design REST/GraphQL endpoints, database models, secure controller routing, and JWT parameters." },
       { name: "frontend-dev-next", agent_type: "general-purpose", model: "opus", prompt: "You are the Next.js Frontend Developer. Implement App routing, Server vs Client components, API data fetching, and CSS layouts." },
       { name: "qa-tester-next", agent_type: "general-purpose", model: "opus", prompt: "You are the QA Tester. Write Playwright/Cypress E2E scripts, check API status codes, verify mobile/desktop responsiveness, and deploy sanity." }
     ]
   )
   ```
2. Register tasks with `TaskCreate`:
   ```
   TaskCreate(tasks: [
     { title: "UI/UX Layout Design", description: "Draft layout wireframe and HSL theme variables.", assignee: "designer" },
     { title: "API & Data Models Setup", description: "Design endpoints and database schema migrations.", assignee: "backend-api-dev", depends_on: ["UI/UX Layout Design"] },
     { title: "Next.js UI & API Integration", description: "Develop React components and integrate SWR API queries.", assignee: "frontend-dev-next", depends_on: ["API & Data Models Setup"] },
     { title: "QA E2E Validation & Deploy Check", description: "Run E2E test suites and verify deployment URLs.", assignee: "qa-tester-next", depends_on: ["Next.js UI & API Integration"] }
   ])
   ```

### Phase 3: Development & Iteration
- Developers work on their respective components.
- `designer` sends theme tokens and layout metrics to `frontend-dev-next`.
- `backend-api-dev` sends endpoint JSON structures to `frontend-dev-next` and database structures to `qa-tester-next`.
- `frontend-dev-next` informs `qa-tester-next` of component class test IDs.
- Deliverables are outputted to `_workspace/` as intermediate progress files.

### Phase 4: Verification & Integration
1. The `qa-tester-next` gathers the developers' artifacts by running test files and logging results.
2. If any test fails, `qa-tester-next` sends the error traces back to the developers.
3. Once all tests pass, the final changes are committed/written to the main repository paths.
4. Generates a validation report in `_workspace/05_qa_report.md`.

### Phase 5: Clean Up
1. Terminate agent sessions and delete the team using `TeamDelete`.
2. Keep the `_workspace/` directory intact to preserve the audit trail.
3. Present the user with a summary of changes and validation outcomes.

---

## Error Handling

- **Single Dev Failure**: If an agent hangs or fails, retry the process once. If it persists, log the error in `_workspace/` and proceed with the remaining modules.
- **Merge Conflicts**: If both developers update the same template file, review the conflict markers, preserve both implementations where applicable, and request manual revision if the layout breaks.

---

## Test Scenarios

### Happy Path
1. User requests: "Scaffold a new admin dashboard with authentication."
2. Phase 1 saves the requirements.
3. Phase 2 creates the team and tasks.
4. `designer` drafts the dashboard bento-grid layout.
5. `backend-api-dev` creates the JWT login routes.
6. `frontend-dev-next` builds the Next.js pages and connects SWR login queries.
7. `qa-tester-next` runs Playwright, confirming successful login/auth flows.
8. Phase 5 deletes the team and outputs the final pages.

### Rollback / Recovery Path
1. Next.js production build fails due to typescript warnings.
2. `qa-tester-next` catches the compile log and routes it to `frontend-dev-next`.
3. `frontend-dev-next` resolves types and rebuilds.
4. Tests pass, and integration completes.
