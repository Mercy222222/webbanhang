---
name: frontend-nextjs
description: "React and Next.js frontend code development. Handles pages, page routing, server components, dynamic data fetching, and CSS layouts. ALWAYS use this skill when implementing or refactoring Next.js layouts, components, hooks, or page templates."
---

# Next.js Frontend — Development Guidelines

Use this skill when building or editing React components, Next.js page routes, dynamic client-side hooks, or integrating frontend modules.

## Technical Frameworks

### 1. Next.js Routing (App Router)
- **Folder Structure**: Organize files using `app/` directory routing (e.g. `app/page.tsx`, `app/layout.tsx`, `app/products/[id]/page.tsx`).
- **Layouts**: Define shared layouts using `layout.tsx` files. Use nested layouts to keep sub-page scopes clean.

### 2. React Components Optimization
- **Server Components (Default)**: Use React Server Components for fetching data directly from database models or backend APIs.
- **Client Components (`"use client"`)**: Declare `"use client"` at the very top of files ONLY when importing state hooks (`useState`, `useEffect`), event handlers (`onClick`), or browser APIs.
- **Loading & Error States**: Implement standard `loading.tsx` and `error.tsx` templates for all core page routes to handle async states gracefully.

### 3. API Fetching & Integration
- Prefer using SWR or React Query (TanStack Query) for client-side API requests to enable caching, revalidation, and automatic loading indicators.
- Inject authorization headers (`Bearer token`) securely from state providers or cookies.

## Typical Workflows
1. **Analyze Design Tokens**: Read the designer's wireframe and CSS variables.
2. **Setup Component Code**: Scaffold layout files and pages. Keep interactive elements isolated into clean client component sub-files.
3. **Responsive Checking**: Test viewport constraints across mobile, tablet, and desktop viewports.
