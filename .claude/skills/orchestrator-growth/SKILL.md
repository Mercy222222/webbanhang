---
name: orchestrator-growth
description: "Orchestrator for web deployment, SEO/ASO updates, and A/B Testing. Use this when the user wants to deploy new features, setup a new experiment, run growth analytics, or audit SEO metadata on the webbanhang project."
---

# Growth Orchestrator

## Overview
This orchestrator coordinates the Deployment Manager and Growth Hacker agents to ensure new features are tested (A/B testing), optimized for discovery (SEO/ASO), and successfully deployed to production via CI/CD.

## Execution Mode
**Agent Team**: Collaborates with `deployment-manager` and `growth-hacker`.

## Phase 1: Context & Audit
1. Growth Hacker checks `docs/ab-test-playbook.md` and SEO metadata in `index-portfolio.html`.
2. Validates any pending hypotheses.

## Phase 2: Implementation & QA
1. Growth Hacker creates A/B test splits or updates the Web App manifest.
2. Deployment Manager updates `.github/workflows` if infrastructure changes are needed.

## Phase 3: Deployment
1. Deployment Manager triggers or monitors the CI/CD pipeline to ensure successful deployment to GitHub Pages or Vercel.
2. Reports final live URLs back to the user.
