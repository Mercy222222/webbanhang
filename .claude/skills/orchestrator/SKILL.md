---
name: ecom-dev-orchestrator
description: "E-commerce developer team orchestrator. Coordinates the backend, frontend, and QA specialist agents for the webbanhang project. Use this when building new features, updating existing pages, modifying database schemas, styling UI changes, or testing. Also triggers on: 're-run', 'modify', 'update', 'fix', or 'improve' e-commerce components."
---

# E-commerce Developer Team Orchestrator

Integrates the Backend Developer, Frontend Developer, and QA Tester into a coordinated pipeline to build, update, and verify e-commerce components for the `webbanhang` workspace.

## Execution Mode: Agent Team

## Agent Configuration

| Team Member | Agent Type | Role | Skill | Output |
|-------------|------------|------|-------|--------|
| backend-dev | custom | PHP & SQL Developer | db-backend | `_workspace/03_backend_dev.md` |
| frontend-dev | custom | Premium UI/UX Developer | ui-frontend | `_workspace/03_frontend_dev.md` |
| qa-tester | custom | Verification & Test Specialist | — | `_workspace/04_qa_report.md` |

---

## Workflow

### Phase 0: Context Check (Subsequent Operations Support)
Before executing, inspect existing deliverables to determine if this is a fresh setup, an update, or a partial re-run.
1. Check if the `_workspace/` directory exists.
2. Determine execution branch:
   - **No `_workspace/`**: Initial run. Proceed to Phase 1.
   - **`_workspace/` exists + partial update request**: Re-run the specific affected agent (e.g., only `frontend-dev` if the request is styling-only), preserving other previous artifacts.
   - **`_workspace/` exists + new feature request**: Archive previous `_workspace/` to `_workspace_backup_[timestamp]/` and begin a fresh run from Phase 1.

### Phase 1: Preparation
1. Parse the user request to identify structural database needs, API logic updates, UI refinements, or testing requirements.
2. Ensure the working directory contains `_workspace/`. Save raw input briefs to `_workspace/00_input.json`.

### Phase 2: Team Creation
1. Spawn the developer team using `TeamCreate`:
   ```
   TeamCreate(
     team_name: "ecom-dev-team",
     members: [
       { name: "backend-dev", agent_type: "general-purpose", model: "opus", prompt: "You are the PHP & MySQL database specialist. Analyze database schema, design endpoints, write secure SQL and PDO code, and place drafts in _workspace/." },
       { name: "frontend-dev", agent_type: "general-purpose", model: "opus", prompt: "You are the Premium UI/UX Developer. Enhance templates, write responsive CSS, customize typography, structure HTML, and place drafts in _workspace/." },
       { name: "qa-tester", agent_type: "general-purpose", model: "opus", prompt: "You are the QA Tester. Write validation scripts, check database integrity, test endpoint parameters, inspect UI console warnings, and output reports." }
     ]
   )
   ```
2. Register tasks with `TaskCreate`:
   ```
   TaskCreate(tasks: [
     { title: "Database & Backend Setup", description: "Design database schemas or API updates.", assignee: "backend-dev" },
     { title: "UI styling & markup updates", description: "Refine CSS styling, visual layouts, and responsive components.", assignee: "frontend-dev" },
     { title: "QA Validation", description: "Write and execute integrity validation scripts for backend and frontend updates.", depends_on: ["Database & Backend Setup", "UI styling & markup updates"], assignee: "qa-tester" }
   ])
   ```

### Phase 3: Development & Iteration
- Developers work on their respective components.
- `backend-dev` sends API and database structures to `frontend-dev` via `SendMessage`.
- `frontend-dev` informs `qa-tester` of DOM selectors and URLs to check.
- `backend-dev` coordinates with `qa-tester` to verify database transaction mutations.
- Deliverables are outputted to `_workspace/` as intermediate progress files.

### Phase 4: Verification & Integration
1. The `qa-tester` gathers the developers' artifacts by running test files and logging results.
2. If any test fails, `qa-tester` sends the error traces back to `backend-dev` or `frontend-dev` via `SendMessage`.
3. Once all tests pass, the final changes are committed/written to the main repository paths.
4. Generates a validation report in `_workspace/04_qa_report.md`.

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
1. User requests: "Add user profile page with bio update."
2. Phase 1 saves the requirements.
3. Phase 2 creates the team and tasks.
4. `backend-dev` implements the database schema update and SQL/PHP script.
5. `frontend-dev` structures the responsive profile page HTML/CSS.
6. `qa-tester` runs verification script, confirming database records update properly and styles are correct.
7. Phase 5 deletes the team and outputs the final page.

### Rollback / Recovery Path
1. Phase 3 database update script fails with SQL syntax error.
2. `qa-tester` catches the exception, logs it, and routes it to `backend-dev`.
3. `backend-dev` corrects the SQL script and notifies `qa-tester`.
4. Tests pass, and integration completes.
