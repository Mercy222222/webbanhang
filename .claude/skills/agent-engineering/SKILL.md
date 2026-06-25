---
name: agent-engineering
description: "LLM Agent Engineering & LangGraph development guidelines. Covers prompt template calibration, system messages for investor personas, structured outputs using Pydantic, and state graph design."
---

# LLM Agent Engineering & LangGraph Guidelines

Use this skill when modifying, testing, or building system prompts, agent personalities, Pydantic schemas, or state transition node graphs in python (specifically LangGraph and LangChain).

## Core Guidelines & Principles

### 1. Persona Alignment & Calibration
- Ensure each agent persona outputs decisions using its unique perspective:
  - **Warren Buffett**: Focuses on high return on equity (ROE), moat strength, stable margins, and buying below intrinsic value.
  - **Nassim Taleb**: Focuses on tail risk, antifragility, potential black swans, and asymmetric risk-reward profiles.
  - **Michael Burry**: Contrarian analysis, searching for short indicators, overvalued market segments, and hidden fundamental cracks.
- Maintain consistent system prompts. Avoid prompt drift where different personas start outputting identical general advice. Keep system prompts stored in structured files or Python variables.

### 2. Structured Outputs & Pydantic Schemas
- **ALWAYS enforce JSON schema outputs** from agent nodes using Pydantic models. This ensures the output can be cleanly parsed and passed as state updates.
  ```python
  from pydantic import BaseModel, Field
  
  class TradingSignal(BaseModel):
      ticker: str = Field(description="The stock ticker")
      action: str = Field(description="Action to take: 'buy', 'sell', or 'hold'")
      confidence: float = Field(description="Confidence score between 0.0 and 1.0")
      reasoning: str = Field(description="Key reasoning bullets explaining the decision")
  ```
- Always define clear enum constraints for fields like `action` to prevent LLMs from inventing new categories.

### 3. LangGraph Flow Architecture
- **State Definition**: Keep the graph state object clean. Only store necessary variables (e.g. ticker, dataframes summary, signals list, portfolio weights). Do not store massive raw dataframes in the graph state; pass file references instead.
- **Node Immutability**: Node functions should return the *updates* to the state, not mutate the state directly.
- **Conditional Routing**: When creating router edges, ensure all possible outcomes are handled, including error/fallback cases:
  ```python
  def route_after_signal(state: AgentState):
      if not state.get("signals"):
          return "error_node"
      return "portfolio_manager_node"
  ```
- Provide structured self-correction loops where if the output fails validation, the state routes back to a parser-fixer node.
