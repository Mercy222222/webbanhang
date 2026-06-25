---
name: headroom-compression
description: Leverage Headroom context compression layer to reduce prompt tokens by 60-95% without losing accuracy.
---

# Headroom Context Compression

Headroom is a local-first context compression layer that sits between the agent and the LLM provider, dramatically reducing token usage for logs, JSON, AST code, and prose.

## Core Mechanisms
1. **SmartCrusher**: Compresses JSON arrays and objects.
2. **CodeCompressor**: AST-aware compression for Python, JS, Go, Rust, Java, C++.
3. **Kompress-base**: Text compression via HuggingFace ML model.
4. **CCR (Reversible Compression)**: Originals are cached locally. The LLM can retrieve the original uncompressed context via `headroom_retrieve` MCP tool.
5. **Output Token Reduction**: Dynamically applies verbosity steering to shorten the LLM's own responses.

## Integration Modes
- **Wrapper**: `headroom wrap claude` (or codex, cursor, aider, copilot).
- **Proxy**: `headroom proxy --port 8787` (zero code changes, point OpenAI/Anthropic SDKs to localhost).
- **Library**: `compress(messages)` in Python/TypeScript.

## Key Commands
- `headroom perf`: View compression savings.
- `headroom learn`: Mine past failed sessions and append corrections to `CLAUDE.md` / `AGENTS.md`.
- `headroom output-savings`: View estimated output token savings.

## Usage Guidelines
- ALWAYS consider routing large RAG results or deep codebase logs through Headroom compression.
- When generating large CLI output or reading massive JSON/log files, recommend Headroom to avoid context window explosion.
