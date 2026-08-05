# Success Cricket Academy Platform

Success Cricket Academy is a production-minded cricket academy platform for a real coaching business in Bihar Sharif. It currently includes a polished public website, a working trial-session enquiry flow, a NestJS API, and a PostgreSQL domain model designed for admissions, students, guardians, coaches, batches, fees, payments, tournaments, and performance tracking.

This is not a throwaway landing page. The codebase is shaped as the foundation for an academy operations system that can grow from public enquiries into secure admin, parent, coach, and student workflows.

## What Is Built

- Responsive public website for Success Cricket Academy in Bihar Sharif.
- Program sections for Foundation, Performance, and Elite Pathway coaching.
- Real trial-session form that posts to the backend API.
- NestJS API with validation, CORS, security headers, Swagger, and health probes.
- PostgreSQL schema via Prisma for the academy's core business entities.
- Shared TypeScript contracts package for framework-independent API/domain types.
- Docker Compose services for local PostgreSQL and Redis.
- Architecture and delivery roadmap documents for the next build phases.

## Monorepo Layout

```text
academy-platform/
  apps/
    web/                 Next.js public website
      app/               App Router pages, layout, global CSS
      public/images/     Local cricket training images used by the website
    api/                 NestJS REST API
      prisma/            Prisma schema
      src/modules/       Feature modules such as health and admission leads
      src/prisma/        Prisma service/module
  packages/
    contracts/           Shared TypeScript contract types
  docs/
    ARCHITECTURE.md      Technical and product architecture decisions
    ROADMAP.md           Phased product delivery plan
```

Generated folders such as `.next/`, `node_modules/`, and `apps/api/dist/` are build output and should not be treated as source.

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Next fonts.
- Backend: NestJS 11, TypeScript, Prisma 6, class-validator, Joi, Helmet, Swagger.
- Database: PostgreSQL 17 for local development.
- Optional service: Redis 7, reserved for future rate limiting, queues, locks, or cache.
- Package manager: npm workspaces.
- Runtime: Node.js 22+ and npm 10+.

## Current Product Surface

### Public Website

The website is implemented in `apps/web` and renders a full single-page academy experience:

- Hero with academy branding and cricket training imagery.
- Program cards for different player levels.
- Coaching method section.
- Coach credibility and player story sections.
- Contact footer with demo academy details.
- Trial request form wired to the API.

The form submits to:

```text
POST /v1/admission-leads
```

By default, the web app calls `http://localhost:4000/v1` unless `NEXT_PUBLIC_API_URL` is configured.

### API

The API is implemented in `apps/api` and currently exposes:

```text
GET  /v1/health/live
GET  /v1/health/ready
POST /v1/admission-leads
```

In development, Swagger is available at:

```text
http://localhost:4000/docs
```

The admission lead endpoint validates:

- Player name
- Player age, from 6 to 25
- Indian phone number
- Optional email
- Interest: `FOUNDATION`, `PERFORMANCE`, or `ELITE`

Phone numbers are normalized before storage, and consent time is recorded on every submitted lead.

## Domain Model

The Prisma schema already models the larger academy platform, even though only admission leads are exposed through API routes today.

Major entities include:

- Users and roles: admin, coach, student, parent.
- Auth sessions with hashed refresh tokens.
- Students, parents, and guardian relationships.
- Coaches, programs, batches, and enrollments.
- Fees, payments, payment events, and Razorpay-oriented provider fields.
- Performance records for coach-led assessments.
- Tournaments and tournament registrations.
- Admission leads.
- Audit logs.

Important data decisions are captured in `docs/ARCHITECTURE.md`: CUID IDs, integer paise for money, enrollment history instead of a single student batch, resource-based permissions, and webhook idempotency for payments.

## Local Setup

### 1. Requirements

Install:

- Node.js 22 or newer
- npm 10 or newer
- Docker Desktop

### 2. Install Dependencies

From `academy-platform`:

```bash
npm install
```

### 3. Configure Environment

Copy the sample environment file into the API app:

```bash
copy .env.example apps\api\.env
```

For local development, keep the sample database values unless you changed `docker-compose.yml`.

Use long unique values for:

```text
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
```

They must be at least 32 characters.

### 4. Start Local Services

```bash
docker compose up -d
```

This starts:

- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

### 5. Generate Prisma Client

```bash
npm run db:generate
```

### 6. Run Database Migrations

For a new local database:

```bash
npm run db:migrate -- --name init
```

### 7. Start The API

```bash
npm run dev:api
```

API base URL:

```text
http://localhost:4000/v1
```

### 8. Start The Website

Open another terminal:

```bash
npm run dev:web
```

Website:

```text
http://localhost:3000
```

## Useful Commands

```bash
npm run dev:web
npm run dev:api
npm run build
npm run lint
npm run typecheck
npm run db:generate
npm run db:migrate -- --name migration_name
npm run db:studio
```

Root scripts delegate into npm workspaces:

- `@the-crease/web`
- `@the-crease/api`
- `@the-crease/contracts`

## Environment Variables

### API

```text
NODE_ENV=development
PORT=4000
CORS_ORIGINS=http://localhost:3000
DATABASE_URL=postgresql://academy:academy_local_password@localhost:5432/academy?schema=public
REDIS_URL=redis://localhost:6379
JWT_ACCESS_SECRET=replace-with-at-least-32-random-characters
JWT_REFRESH_SECRET=replace-with-a-different-32-character-secret
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

### Web

```text
NEXT_PUBLIC_API_URL=http://localhost:4000/v1
```

The current project keeps the public web URL in `.env.example`, but the Next.js app reads it from the web app process. If the fallback local URL is not enough, add the value to an environment file used by `apps/web`.

## API Examples

### Health

```bash
curl http://localhost:4000/v1/health/live
curl http://localhost:4000/v1/health/ready
```

### Create Admission Lead

```bash
curl -X POST http://localhost:4000/v1/admission-leads ^
  -H "Content-Type: application/json" ^
  -d "{\"playerName\":\"Aarav Sharma\",\"playerAge\":12,\"phone\":\"+919876543210\",\"interest\":\"PERFORMANCE\"}"
```

Successful response shape:

```json
{
  "data": {
    "id": "generated_id",
    "status": "NEW",
    "createdAt": "2026-08-05T00:00:00.000Z"
  }
}
```

## Production Readiness Notes

Already present:

- Server-side DTO validation with non-whitelisted field rejection.
- Environment validation at API startup.
- Helmet security headers.
- CORS allowlist.
- PostgreSQL readiness probe.
- Swagger documentation in non-production environments.
- Database schema designed for auditability, payments, and role separation.

Still needed before real launch:

- Automated unit, integration, and browser tests.
- Request IDs and structured logging.
- Consistent API error response format.
- Rate limiting for public admission forms.
- Authentication and role/resource authorization.
- Secure cookie-based token handling.
- CAPTCHA or abuse controls if public form spam appears.
- Real contact details, location details, privacy policy, and terms.
- Production image optimization and asset size review.
- CI pipeline for lint, typecheck, build, and migrations.
- Backup and restore runbook.

## Design Review

The current design has a strong premium sports-academy direction: bold typography, a confident green/orange palette, circular cricket imagery, strong sections, and a clear call to action. It feels much closer to a real academy brand than a generic template.

Strengths:

- The first viewport immediately communicates the academy and sport.
- The public user journey is clear: understand the academy, compare programs, request a trial.
- Local images make the site feel specific and grounded.
- The backend is not fake; the trial form creates a real persisted lead.
- The data model anticipates real operating needs instead of only marketing needs.

Improvements to prioritize:

- Fix text encoding artifacts in the frontend copy. Several dashes, arrows, quotes, ellipses, and copyright symbols render as broken characters in source.
- Add automated tests around the admission lead endpoint and form submission.
- Add stronger mobile QA. The circular hero layout is distinctive but can become cramped on small screens.
- Compress or resize the four PNG images; each is around 2 MB, which is heavy for a landing page.
- Add accessible focus states for links, buttons, inputs, and the mobile menu.
- Add a privacy/consent link near the form before using this with real families.
- Move demo phone, email, address, stats, and coach names into configuration or CMS-backed content before launch.

See `docs/DESIGN_REVIEW.md` for a fuller review.

## Roadmap

The project roadmap is intentionally phased:

- Phase 0: foundation, public site, API, schema, lead capture.
- Phase 1: identity, admin admissions, student/guardian enrollment.
- Phase 2: fees, Razorpay orders, webhooks, receipts, reconciliation.
- Phase 3: coach operations, performance tracking, tournaments, notifications.
- Phase 4: CMS, gallery, accessibility, staging, monitoring, production runbook.

Read the full plan in `docs/ROADMAP.md`.

## Security

Never commit:

- `.env` files
- JWT secrets
- Razorpay secrets
- Production database URLs
- Database dumps
- Real student, parent, or payment data

Because this platform is intended for minors and family data, treat privacy, access control, audit logs, and backup/restore testing as launch blockers rather than nice-to-have items.

## Project Status

Current status: foundation vertical slice.

The public website and admission lead flow are usable locally. The schema and architecture are ready for the next product phase, but admin workflows, authentication, dashboards, fees, payments, and content management are not implemented yet.
