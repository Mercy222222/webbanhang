---
name: web-deploy
description: "Deployment pipeline auditing, environment variable validation, and production build checks. ALWAYS use this skill when reviewing deployment configurations, verifying hosting pings, setting up Vercel/Netlify environments, or running CI/CD status scripts."
---

# Web Deployment — Verification Guidelines

Use this skill when auditing deployment setups, checking hosting platform parameters (Vercel, Netlify, AWS, Docker), or verifying environment variables.

## Technical Frameworks

### 1. Build Verification
- **Bundle Optimization**: Ensure Next.js builds complete successfully without typescript errors or package resolution warnings.
- **Image Optimization**: Confirm image formats are optimized (e.g. Next.js `<Image>` config is correctly set up with supported loaders).

### 2. Environment Variable Checks
- Prior to deployment, verify that all required variables (`DATABASE_URL`, `JWT_SECRET`, `API_KEY`) are defined and valid in the environment dashboard.
- **NEVER** commit absolute secrets or password keys to version control files.

### 3. Production Pings & Smoke Testing
- Once deployed, execute basic smoke pings to check the root page loading status:
  - Check HTTP Status Code: Must be `200 OK`.
  - Validate DOM Elements: Confirm core landing section layout elements exist.

## Typical Workflows
1. **Pre-build Check**: Run local compilation/build scripts (`npm run build` or `pnpm build`) to verify bundle compilation success.
2. **Deploy Trigger**: Push clean git branch commits to target remote branches (e.g. `main` or `staging`).
3. **Smoke Test**: Ping the live URL, verifying SSL cert validity and basic core flows.
