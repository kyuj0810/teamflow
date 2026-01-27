# Copilot / AI Agent Instructions — Teamflow API

Short, actionable guidance for editing and extending this repository.

## Big picture
- REST API built with NestJS (see `package.json` scripts and `nest-cli.json`).
- PostgreSQL backed domain modeled with Prisma (`prisma/schema.prisma`).
- Typical flow: HTTP controller -> service (business logic) -> `prisma` client.

## Key files & places to look
- `src/lib/prisma.ts` — exports singleton `prisma` client (use this instead of new PrismaClient()).
- `prisma/schema.prisma` — canonical DB schema and generators/migrations.
- `prisma/migrations/` — migration history; use Prisma migrate commands to update.
- `generated/prisma/` — bundled/generated Prisma client/runtime artifacts.
- `src/controllers/`, `src/services/`, `src/routes/` — main code organization (controllers handle requests, services contain logic).
- `test/` — jest tests; `test/jest-e2e.json` used for e2e.
- `docs/setup-log.md` — project-specific notes and troubleshooting for Prisma/DB.

## Workflow snippets (exact commands)
- Install: `npm install`
- Generate Prisma client: `npx prisma generate`
- Apply migrations / dev DB: `npx prisma migrate dev --name <desc>`
- Run dev server: `npm run start:dev`
- Build: `npm run build`
- Unit tests: `npm test`
- E2E tests: `npm run test:e2e`

## Code patterns and conventions
- Use the exported `prisma` singleton from `src/lib/prisma.ts` everywhere. Example:

```ts
import { prisma } from 'src/lib/prisma';
await prisma.user.findMany();
```

- Avoid creating multiple `PrismaClient` instances; the repo uses `globalThis` in dev to reuse the client.
- Controllers are thin: prefer putting business logic in `src/services/*`.
- Use NestJS CLI conventions when adding modules / controllers (`nest g controller|service`).

## Integration & environment
- Database: PostgreSQL 15 (connection in `prisma/schema.prisma` and `.env`).
- Prisma client is `@prisma/client` (see `package.json`).
- OpenAI integration is planned; if adding, keep API keys in `.env` and follow patterns in services.

## Tests & debugging
- Tests use Jest + `ts-jest`. See `jest` config in `package.json` and `test/jest-e2e.json` for e2e specifics.
- For debugging tests use: `npm run test:debug`.

## What to avoid / gotchas
- Do not instantiate `new PrismaClient()` directly in long-lived processes — reuse `src/lib/prisma.ts`.
- The `generated/prisma` folder contains built Prisma artifacts; inspect but prefer `prisma/schema.prisma` for schema changes.

## Quick examples to implement common changes
- Add a new DB field: update `prisma/schema.prisma` → `npx prisma migrate dev --name add_field` → `npx prisma generate` → update service using `prisma`.

---
If anything here is unclear or you want more examples (service wiring, controller samples, or test templates), tell me which area to expand. 
