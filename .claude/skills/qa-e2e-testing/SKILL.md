---
name: qa-e2e-testing
description: "Playwright, Cypress, Vitest, and Jest test automation. End-to-end testing, visual audit scripting, and API validation. ALWAYS use this skill when writing test files, executing test suites, checking UI responsiveness, or auditing endpoint security."
---

# QA E2E Testing — Development Guidelines

Use this skill when scripting automated test cases, running test runners, asserting visual rendering correctness, or checking API schemas.

## Technical Frameworks

### 1. E2E Web Testing (Playwright / Cypress)
- **Flake-Free Design**: Avoid hardcoded timeouts (`setTimeout` or `page.waitForTimeout()`). Always wait for element visibility, state hooks, or network responses:
  ```javascript
  // Correct (Playwright)
  await page.locator('#submit-btn').waitFor({ state: 'visible' });
  await page.click('#submit-btn');
  ```
- **Selector Stability**: Target stable attributes (e.g. `data-testid`, `id`) instead of volatile CSS class chains or positional indices.

### 2. API Test Assertions
- Assert both success flows (`200 OK`, `201 Created`) and error responses (`400 Bad Request`, `401 Unauthorized`, `404 Not Found`).
- Verify that response structures match JSON schema specifications.

### 3. Responsive UI Auditing
- Verify layout structures under different viewport view widths:
  - Mobile: `375px` width.
  - Tablet: `768px` width.
  - Desktop: `1440px` width.

## Typical Workflows
1. **Identify Test Scenarios**: Outline the critical user stories (e.g. sign up, add product, check out).
2. **Write Automated Scripts**: Implement the test files using Playwright or Jest.
3. **Execute Test Suite**: Run the test runner and output results to `_workspace/`.
