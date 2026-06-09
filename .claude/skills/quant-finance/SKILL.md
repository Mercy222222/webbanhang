---
name: quant-finance
description: "Quantitative finance development guidelines. Covers pandas vectorization, stock valuation models, financial indicators (RSI, MACD, etc.), Sharpe/Sortino ratios, and position risk metrics in Python."
---

# Quantitative Finance & Stock Analysis Development Guidelines

Use this skill when designing, writing, auditing, or refactoring Python code that performs financial calculations, calculates technical indicators, parses pricing data, or implements valuation formulas.

## Core Guidelines & Principles

### 1. Vectorized Pandas & Numpy Operations
- **NEVER use iterative loops** (`for index, row in df.iterrows()`) to calculate indicators or trading signals. This causes significant performance bottlenecks during backtesting.
- **ALWAYS write vectorized formulas**:
  ```python
  # Good (Vectorized SMA)
  df['sma_20'] = df['close'].rolling(window=20).mean()

  # Good (Vectorized RSI)
  delta = df['close'].diff()
  gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
  loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
  rs = gain / loss
  df['rsi_14'] = 100 - (100 / (1 + rs))
  ```
- **Avoid SettingWithCopyWarning**: When modifying slices, always use `.loc` or call `.copy()` explicitly.
  ```python
  df.loc[df['close'] > df['sma_20'], 'signal'] = 1
  ```

### 2. Financial Metrics Calculations
- **Sharpe Ratio**: Calculate annualized Sharpe ratio using daily risk-free rates:
  $$\text{Sharpe} = \frac{\text{Mean Daily Return} - \text{Daily Risk Free Rate}}{\text{Std Dev of Daily Return}} \times \sqrt{252}$$
- **Sortino Ratio**: Focus only on downside standard deviation (negative returns):
  $$\text{Sortino} = \frac{\text{Mean Daily Return} - \text{Daily Risk Free Rate}}{\text{Downside Std Dev}} \times \sqrt{252}$$
- **Max Drawdown**: Calculate the peak-to-trough decline over historical data:
  ```python
  cumulative = (1 + df['daily_return']).cumprod()
  running_max = cumulative.cummax()
  drawdown = (cumulative - running_max) / running_max
  max_drawdown = drawdown.min()
  ```

### 3. Valuation & Investor Persona Logic
- Ensure intrinsic value formulas are mathematically bounded. For instance, the Benjamin Graham formula:
  $$\text{Value} = \frac{\text{EPS} \times (8.5 + 2g) \times 4.4}{Y}$$
  where $Y$ is the current yield on AAA corporate bonds and $g$ is the expected growth rate. Limit $g$ and $Y$ to realistic positive ranges to avoid division-by-zero or negative valuations.
- Handle missing valuation inputs (e.g. missing Free Cash Flow or PE ratios) by using industry sector medians or raising a structured warning instead of failing the calculation.

### 4. Data Caching & Performance
- Store historical stock dataset fetches (e.g. Yahoo Finance or Financial Datasets API) locally in JSON or Parquet formats to avoid hitting API rate limits during repeated backtests.
- Always check that timestamps are aligned and sorted chronologically before joining or shifting series.
