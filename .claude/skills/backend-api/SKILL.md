---
name: backend-api
description: "REST and GraphQL API development, route handlers, controllers, data models, and database schema migrations. ALWAYS use this skill when designing endpoints, writing controller routes, setting up middleware, or defining schema relationships."
---

# Backend API — Development Guidelines

Use this skill when designing or implementing API routes, endpoint controllers, database models, or authentication middleware.

## Technical Frameworks

### 1. API Route Structure
- **RESTful Endpoints**: Use appropriate HTTP methods:
  - `GET /api/v1/resource` (fetch list).
  - `POST /api/v1/resource` (create new entry).
  - `PUT /api/v1/resource/:id` (full updates).
  - `DELETE /api/v1/resource/:id` (delete entry).
- **GraphQL Schemas**: Define clear types, queries, and mutations. Avoid nesting queries deeper than 3 layers to prevent performance degradation.

### 2. Validation & Parameter Binding
- **Strict Parsing**: Validate every query, param, and body payload before processing. Reject requests that don't match the required shape with `400 Bad Request`.
- **Database Safety**: Never execute raw SQL containing dynamic strings. Use prepared statements or built-in ORM safe methods (e.g. Prisma, Mongoose, Sequelize) to bind query parameters.

### 3. Session Security
- Implement JWT (JSON Web Tokens) or HTTP-only cookie session authentication.
- Encrypt passwords using high-entropy hashing algorithms (e.g., bcrypt with salt factor >= 10).

## Typical Workflows
1. **Define Endpoint Spec**: Write an API draft in `_workspace/` showing the route path, payload shape, and response status codes.
2. **Implement Router Logic**: Code the routes, controllers, and database handlers.
3. **Log Test Outcomes**: Provide example request commands (curl or REST client scripts) for QA validation.
