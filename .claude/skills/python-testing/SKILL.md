---
name: python-testing
description: "Python testing and backtester verification guidelines. Covers running pytest in Poetry environments, mocking financial data APIs, asserting trading signals, and running backtests with ticker flags."
---

# Python Testing & Backtest Verification Guidelines

Use this skill when writing test cases, structuring test fixtures, mocking API calls, running unit/integration test suites, or validating backtesting output.

## Core Guidelines & Principles

### 1. Test Suite Execution (Poetry & Pytest)
- Always execute tests in the Poetry virtual environment.
- **Run all tests**:
  ```bash
  poetry run pytest
  ```
- **Run a specific test file**:
  ```bash
  poetry run pytest tests/test_risk_manager.py
  ```
- **Run tests matching a keyword**:
  ```bash
  poetry run pytest -k "valuation"
  ```

### 2. Mocking Financial APIs & Network Calls
- **NEVER make live HTTP network calls** during automated tests. This causes flaky test execution, rate limits, and slow build times.
- Mock libraries like `yfinance` or local custom API fetchers using `pytest-mock` (`mocker`) or `unittest.mock.patch`:
  ```python
  def test_valuation_agent(mocker):
      # Mock the API client that pulls financial ratios
      mock_get_data = mocker.patch("src.data.financial_datasets.get_financial_data")
      mock_get_data.return_value = {
          "eps": 5.20,
          "growth_rate": 0.08,
          "yield_aaa": 0.045
      }
      # Execute test assertions here...
  ```

### 3. Backtest Verification Scenarios
- When executing the backtester to verify code changes, use short time horizons and a small set of tickers to save tokens and time:
  ```bash
  poetry run python src/backtester.py --ticker AAPL --start-date 2024-01-01 --end-date 2024-02-01
  ```
- Compare the backtester outputs in `_workspace/` to ensure Sharpe ratios, transaction counts, and ending values are within realistic ranges (e.g. Sharpe ratio isn't infinity).

### 4. Risk & Allocation Assertions
- Assert that the Portfolio Manager never exceeds the risk limits defined by the Risk Manager.
- Check that the sum of portfolio allocations always equals 1.0 (or less, if cash is held) and that individual stock weights do not violate bounds.
