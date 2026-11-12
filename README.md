# LearnHub LMS

Simplified Learning Management System built with **Next.js (App Router)**, **Express.js (TypeScript)**, **PostgreSQL**, and **Prisma**.

## Features

- **Student Portal:** Browse all courses (`/` and `/courses`), view course details & lecture list (`/courses/[id]`), and watch embedded YouTube videos via a click-to-load facade player.
- **Admin Dashboard:** Protected `/admin` panel with email/password login (httpOnly JWT cookie) and optional Google OAuth, plus full Course & Lecture CRUD with on-demand cache revalidation.
- **States & Responsiveness:** Mobile-first responsive UI with skeleton loaders, empty states, error boundaries, and 404 pages.

## Tech Stack & Architecture

- **Frontend (`client/`):** Next.js App Router, TypeScript, Tailwind CSS, Server Components + Server Actions, `src/proxy.ts` route protection.
- **Backend (`server/`):** Node.js + Express (TypeScript) structured in MVC (`routes/` -> `validators/` -> `middleware/` -> `controllers/` -> `models/` -> Prisma).
- **Database:** PostgreSQL with Prisma ORM (`User`, `Course`, `Lecture`).

## Local Setup

### 1. Backend (`server/`)

```bash
cd server
pnpm install
cp .env.example .env
# Update DATABASE_URL and JWT_SECRET in .env
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

### 2. Frontend (`client/`)

```bash
cd client
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000` for the student portal and `http://localhost:3000/admin` for the admin dashboard.

## Test Admin Credentials (Seeded)

- **Email:** `admin@learnhub.com`
- **Password:** `Admin123!`

## API Summary

| Method | Route | Access |
|---|---|---|
| GET | `/api/health` | Public |
| POST | `/api/auth/login` | Public (rate limited) |
| POST | `/api/auth/google` | Public (allowlist checked) |
| GET | `/api/auth/me` | Admin |
| GET | `/api/courses` | Public (paginated) |
| GET | `/api/courses/:id` | Public (with lectures) |
| POST / PUT / DELETE | `/api/courses`, `/api/courses/:id` | Admin |
| GET | `/api/courses/:courseId/lectures` | Public |
| POST | `/api/courses/:courseId/lectures` | Admin |
| PUT / DELETE | `/api/lectures/:id` | Admin |

## Security & Performance Decisions

- **httpOnly Cookie Auth:** JWT never touches `localStorage` or client JavaScript; Express `authMiddleware` enforces authorization on all admin endpoints.
- **YouTube Facade:** Video iframes (`youtube-nocookie.com`) are only loaded when the user clicks play, keeping initial page load fast.
- **Security Headers & Validation:** `helmet`, `compression`, strict CORS, `express-rate-limit` on auth endpoints, and Zod validation on all inputs and params.
