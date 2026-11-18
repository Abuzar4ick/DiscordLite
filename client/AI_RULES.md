# Frontend Development Rules

## General
- Write clean, readable TypeScript.
- Prefer simple solutions over abstractions.
- Do not introduce unnecessary dependencies.
- Do not rewrite existing code without permission.

## Architecture
- Use reusable React components.
- Keep components small and focused.
- Separate API requests from UI components.
- Keep business logic out of presentation components.

## Backend integration
- My backend is built with Express and TypeScript.
- PostgreSQL is managed by the backend.
- Never modify backend code or database migrations.
- Follow my existing API contracts.
- Never invent API endpoints.

## Restrictions
- Explain changes before implementing them.
- Ask before installing dependencies.
- Do not delete existing files without permission.
- Do not modify environment variables.