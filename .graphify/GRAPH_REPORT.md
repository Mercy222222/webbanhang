# Graph Report - .  (2026-06-08)

## Corpus Check
- Corpus is ~39,113 words - fits in a single context window. You may not need a graph.

## Summary
- 194 nodes · 154 edges · 18 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.87)
- Token cost: 1,200 input · 800 output
- Edge kinds: method: 73 · contains: 48 · calls: 19 · references: 10 · conceptually_related_to: 4


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 88 · Candidates: 114
- Excluded: 93 untracked · 49 ignored · 0 sensitive · 1 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.
## God Nodes (most connected - your core abstractions)
1. `ProductController` - 12 edges
2. `CategoryController` - 11 edges
3. `DefaultController` - 11 edges
4. `ProductModel` - 9 edges
5. `AdminController` - 8 edges
6. `CategoryModel` - 8 edges
7. `OrderModel` - 8 edges
8. `AuthController` - 7 edges
9. `CartController` - 7 edges
10. `UserModel` - 6 edges

## Surprising Connections (you probably didn't know these)
- `User Authentication Module` --conceptually_related_to--> `TechStore SPA Frontend`  [EXTRACTED]
  auth.js → index.html
- `Beads Skill Instruction Guide` --conceptually_related_to--> `Beads Issue Tracker Guide`  [INFERRED]
  .agents/skills/beads/SKILL.md → .beads/README.md
- `Graphify Skill Instruction Guide` --conceptually_related_to--> `Agent Workflow Rules`  [INFERRED]
  .agents/skills/graphify/SKILL.md → AGENTS.md
- `Agent Workflow Rules` --references--> `Beads Issue Tracker Guide`  [EXTRACTED]
  AGENTS.md → .beads/README.md
- `AI Agent Project Instructions` --references--> `Beads Issue Tracker Guide`  [EXTRACTED]
  CLAUDE.md → .beads/README.md

## Communities

### Community 0 - "Product Management Controller"
Cohesion: 0.18
Nodes (1): ProductController

### Community 1 - "Category Management Controller"
Cohesion: 0.26
Nodes (1): CategoryController

### Community 2 - "Default Landing and Explore Controller"
Cohesion: 0.17
Nodes (1): DefaultController

### Community 3 - "Frontend Authentication Management"
Cohesion: 0.33
Nodes (11): getCurrentUser(), handleAuthSubmit(), hideAuthModal(), loadUsers(), login(), logout(), register(), saveUsers() (+3 more)

### Community 4 - "Product Database Model"
Cohesion: 0.20
Nodes (1): ProductModel

### Community 5 - "Admin Dashboard Controller"
Cohesion: 0.22
Nodes (1): AdminController

### Community 6 - "Category Database Model"
Cohesion: 0.22
Nodes (1): CategoryModel

### Community 7 - "Order Database Model"
Cohesion: 0.22
Nodes (1): OrderModel

### Community 8 - "Backend Authentication Controller"
Cohesion: 0.25
Nodes (1): AuthController

### Community 9 - "Backend Cart Controller"
Cohesion: 0.25
Nodes (1): CartController

### Community 10 - "User Database Model"
Cohesion: 0.29
Nodes (1): UserModel

### Community 11 - "Database SQL Schema"
Cohesion: 0.48
Nodes (6): category, coupons, order_details, orders, product, users

### Community 12 - "Alternative Database SQL Schema"
Cohesion: 0.48
Nodes (6): category, coupons, order_details, orders, product, users

### Community 13 - "Agent Skills and Workflow Settings"
Cohesion: 0.33
Nodes (6): Agent Workflow Rules, Beads Configuration Settings, Beads Issue Tracker Guide, Beads Skill Instruction Guide, AI Agent Project Instructions, Graphify Skill Instruction Guide

### Community 14 - "Backend Checkout Controller"
Cohesion: 0.33
Nodes (1): CheckoutController

### Community 15 - "Database Connection Configuration"
Cohesion: 0.50
Nodes (1): Database

### Community 16 - "Coupon Database Model"
Cohesion: 0.50
Nodes (1): CouponModel

### Community 17 - "Client-side SPA Components"
Cohesion: 1.00
Nodes (2): User Authentication Module, TechStore SPA Frontend

## Knowledge Gaps
- **8 isolated node(s):** `coupons`, `coupons`, `TechStore SPA Frontend`, `User Authentication Module`, `AI Agent Project Instructions` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Product Management Controller`** (1 nodes): `ProductController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Category Management Controller`** (1 nodes): `CategoryController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Default Landing and Explore Controller`** (1 nodes): `DefaultController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Product Database Model`** (1 nodes): `ProductModel`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Admin Dashboard Controller`** (1 nodes): `AdminController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Category Database Model`** (1 nodes): `CategoryModel`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Order Database Model`** (1 nodes): `OrderModel`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Authentication Controller`** (1 nodes): `AuthController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Cart Controller`** (1 nodes): `CartController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `User Database Model`** (1 nodes): `UserModel`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Checkout Controller`** (1 nodes): `CheckoutController`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Database Connection Configuration`** (1 nodes): `Database`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Coupon Database Model`** (1 nodes): `CouponModel`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Client-side SPA Components`** (2 nodes): `User Authentication Module`, `TechStore SPA Frontend`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `coupons`, `coupons`, `TechStore SPA Frontend` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._