---
name: quant-dev-orchestrator
description: "AI Hedge Fund developer team orchestrator. Coordinates the quant-dev, agent-architect, and quant-qa agents to develop, backtest, and test the Python-based hedge fund simulator. Triggers on requests involving 'hedge fund', 'quant dev', 'backtester', 'investor agents', 'portfolio manager', or 'risk manager'."
---

# AI Hedge Fund Developer Team Orchestrator

Integrates the Quantitative Developer, Agent Architect, and Quantitative QA Tester into a coordinated development team to implement new agent personas, update valuation calculators, optimize risk rules, and execute backtests.

## Execution Mode: Agent Team

## Agent Configuration

| Team Member | Agent Type | Role | Skill | Output |
|-------------|------------|------|-------|--------|
| quant-dev | custom | Quantitative Developer | quant-finance | `_workspace/03_quant_dev.md` |
| agent-architect | custom | Agent Architect | agent-engineering | `_workspace/03_agent_architect.md` |
| quant-qa | custom | Quant QA & Tester | python-testing | `_workspace/04_quant_qa.md` |

---

## Workflow

### Phase 0: Context Check (Subsequent Operations Support)
Before executing, inspect existing deliverables in the workspace to determine if this is a fresh setup, an update, or a partial re-run.
1. Check if the `_workspace/` directory exists.
2. Determine execution branch:
   - **No `_workspace/`**: Initial run. Proceed to Phase 1.
   - **`_workspace/` exists + partial update request**: Re-run only the affected agent (e.g. only `agent-architect` if the request is prompt-tuning only; only `quant-dev` if the request is a formula fix), retaining other previous deliverables.
   - **`_workspace/` exists + new feature request**: Archive the previous `_workspace/` to `_workspace_backup_[timestamp]/` and begin a fresh run from Phase 1.

### Phase 1: Preparation
1. Parse the user request to identify:
   - Stocks / Ticker targets (e.g. `AAPL`, `MSFT`, `NVDA`).
   - Strategy / Persona changes (e.g. adding a new investor agent, updating prompt boundaries).
   - Core mathematical adjustments (valuation formulas, risk limits).
2. Save raw inputs and parsed requirements to `_workspace/00_input.json`.

### Phase 2: Team Creation
1. Spawn the developer team using `TeamCreate`:
   ```
   TeamCreate(
     team_name: "quant-dev-team",
     members: [
       { name: "quant-dev", agent_type: "general-purpose", model: "opus", prompt: "You are the Quantitative Developer. Implement financial logic, indicators, valuation formulas in Python, and save drafts in _workspace/." },
       { name: "agent-architect", agent_type: "general-purpose", model: "opus", prompt: "You are the Agent Architect. Update LangGraph configuration, system prompt templates, Pydantic schemas, and save drafts in _workspace/." },
       { name: "quant-qa", agent_type: "general-purpose", model: "opus", prompt: "You are the Quant QA. Run pytest suites, execute backtester runs, inspect Sharpe/drawdowns, and output report to _workspace/." }
     ]
   )
   ```
2. Register tasks with `TaskCreate`:
   ```
   TaskCreate(tasks: [
     { title: "Financial & Calculations Implementation", description: "Implement valuation algorithms, pandas indicators, or caching logic.", assignee: "quant-dev" },
     { title: "LLM Prompting & Graph State Setup", description: "Calibrate investor persona prompts, tool definitions, and state schemas.", assignee: "agent-architect" },
     { title: "Backtest Verification & Pytest Validation", description: "Run pytest suites, execute backtester.py, check Sharpe/drawdown ranges.", depends_on: ["Financial & Calculations Implementation", "LLM Prompting & Graph State Setup"], assignee: "quant-qa" }
   ])
   ```

### Phase 3: Development & Iteration
- Developers work on their respective components inside `ai-hedge-fund/`.
- `quant-dev` sends updated computed metrics or dataframe layouts to `agent-architect` via `SendMessage`.
- `agent-architect` coordinates with `quant-dev` to ensure tools map correctly to calculations.
- `quant-dev` and `agent-architect` notify `quant-qa` once drafts are saved to `_workspace/`.

### Phase 4: Verification & Integration
1. The `quant-qa` agent runs the test suite:
   ```bash
   poetry run pytest ai-hedge-fund/tests
   ```
2. The `quant-qa` agent runs a validation backtest:
   ```bash
   poetry run python ai-hedge-fund/src/backtester.py --ticker AAPL --start-date 2024-01-01 --end-date 2024-02-01
   ```
3. If tests fail or backtest outcomes are anomalous (e.g. division by zero, invalid signal formatting), `quant-qa` sends logs back to developers via `SendMessage`.
4. Once all validation checks pass, final files are committed, and the validation report is written to `_workspace/04_quant_qa.md`.

### Phase 5: Clean Up
1. Terminate agent sessions and delete the team using `TeamDelete`.
2. Present the user with a summary of the development changes and backtest validation metrics (Sharpe ratio, returns, Max Drawdown).

---

## Error Handling

- **Calculations Divergence**: If the backtester produces mathematically impossible metrics (e.g. Sharpe ratio > 100 or Max Drawdown > 1.0), the QA agent halts the pipeline and requests `quant-dev` to re-check indicator scales and division bounds.
- **LLM Schema Errors**: If Pydantic parsing fails during state graph execution, `quant-qa` captures the output and redirects `agent-architect` to modify the system message or schema constraints.

---

## Test Scenarios

### Happy Path
1. User requests: "Add an aggressive growth investor agent styled after Cathie Wood."
2. Phase 1 parses requirements and initializes `_workspace/`.
3. Phase 2 creates the team and tasks.
4. `agent-architect` writes the system message and Pydantic output schema for Cathie Wood Agent.
5. `quant-dev` sets up indicator hooks for high-growth momentum parameters.
6. `quant-qa` runs tests, executing a backtest for `AAPL` and confirming signals trigger as expected.
7. Phase 5 completes the clean up and reports results.
