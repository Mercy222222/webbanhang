# 🛡️ Harness — Agent Team & Skill Architect

> A meta-skill and framework designed to audit, architect, build, and evolve multi-agent teams and specialized agent skills.

Harness functions as a **Meta-Skill**—a skill that constructs other skills and defines specialized agents. It enables you to orchestrate multiple cooperative agents (using the Agent Team pattern as a default) to solve complex domain problems while maintaining lightweight pointers in `CLAUDE.md`.

---

## 📂 Repository Structure

The plugin directory is structured as follows:

```
harness/
├── .claude-plugin/
│   └── plugin.json                 # Plugin manifest specifying skills entry point
├── skills/
│   └── harness/
│       ├── SKILL.md                # Main skill definition (6-Phase workflow)
│       └── references/
│           ├── agent-design-patterns.md   # 6 architectural patterns
│           ├── orchestrator-template.md   # Team/subagent orchestrator templates
│           ├── team-examples.md           # 5 real-world team configurations
│           ├── skill-writing-guide.md     # Skill authoring guide
│           ├── skill-testing-guide.md     # Testing & evaluation methodology
│           └── qa-agent-guide.md          # QA agent integration guide
└── README.md                       # This documentation file
```

---

## ⚙️ 6-Phase Architect Workflow

The core behavior of the `harness` skill revolves around a structured lifecycle to ensure robustness, avoid duplication, and enable feedback-driven evolution:

| Phase | Title | Description |
| :--- | :--- | :--- |
| **Phase 0** | **Audit & Drift Detection** | Examines existing agents/skills in `.claude/` and pointers in `CLAUDE.md` to identify drifts and decide on신규 구축 (New Setup) or 기존 확장 (Extension). |
| **Phase 1** | **Domain Analysis** | Identifies critical work types, technical stacks, data models, and detects user experience level to calibrate communication. |
| **Phase 2** | **Team Architecture Design** | Selects execution mode (Agent Teams, Sub-agents, or Hybrid) and architectural patterns (Pipeline, Fan-out/in, Expert Pool, etc.). |
| **Phase 3** | **Agent Definition** | Creates/updates agent profiles (`.claude/agents/*.md`) with clear rules, protocols, and model configuration (`model: "opus"`). |
| **Phase 4** | **Skill Construction** | Generates or modifies modular skills (`.claude/skills/*/SKILL.md`) following the progressive disclosure paradigm (<500 lines). |
| **Phase 5** | **Orchestration & Integration** | Hooks everything together using an orchestrator skill, details data routing, and registers minimized pointers in `CLAUDE.md`. |
| **Phase 6** | **Validation & Testing** | Performs structure validation, trigger testing (should-trigger vs should-not-trigger / near-miss), and runs comparative tests. |
| **Phase 7** | **Feedback & Evolution** | Collects post-run feedback and modifies the harness components incrementally based on execution results. |

---

## 📖 Reference Guides

Inside `references/`, you'll find comprehensive blueprints for different aspects of multi-agent design:

> [!NOTE]
> ### 🤖 [Agent Design Patterns](file:///d:/webbanhang/harness/skills/harness/references/agent-design-patterns.md)
> Guidelines for selecting between **Agent Teams** (collaborative, real-time message exchange via `SendMessage` and `TaskCreate`) and **Sub-agents** (lightweight, results-only execution). Maps out the 6 classic topologies (Pipeline, Fan-out/in, Expert Pool, Producer-Reviewer, Supervisor, and Hierarchical Delegation).

> [!TIP]
> ### 🎛️ [Orchestrator Template](file:///d:/webbanhang/harness/skills/harness/references/orchestrator-template.md)
> Complete templates and code structures for orchestrator skills. Details how to handle data passing (message-based, file-based, task-based, return-value) and error recovery protocols.

> [!IMPORTANT]
> ### 👥 [Team Examples](file:///d:/webbanhang/harness/skills/harness/references/team-examples.md)
> Real-world team setups for common code environments (e.g., E-commerce development pipelines, static UI site pipelines, QA pipelines, etc.) showing exact configurations and message specifications.

> [!WARNING]
> ### ✍️ [Skill Writing Guide](file:///d:/webbanhang/harness/skills/harness/references/skill-writing-guide.md)
> Detailed specifications for writing high-performance skill files. Focuses on writing pushy descriptions for active triggers and organizing folders for progressive disclosure.

> [!CAUTION]
> ### 🧪 [Skill Testing Guide](file:///d:/webbanhang/harness/skills/harness/references/skill-testing-guide.md)
> Explains QA methodologies, including comparing output quality with/without skills (baseline verification) and setting up near-miss trigger test suites.

> [!NOTE]
> ### 🛡️ [QA Agent Integration Guide](file:///d:/webbanhang/harness/skills/harness/references/qa-agent-guide.md)
> Best practices for integrating a dedicated QA/Tester agent in your team to conduct continuous verification, cross-boundary API comparisons, and regression testing.

---

## 🚀 How to Use

To trigger this harness framework or design a new team/skill:
1. Mention "harness" or ask to "configure a harness team" / "하네스 구성해줘" in your session prompt.
2. The orchestrator will trigger the `harness` skill to guide you through the **Audit & Drift Detection** phase, helping you build highly tailored developer teams and skills.
