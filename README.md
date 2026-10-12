# Mock API Starter

A Next.js mock backend for frontend prototyping, demos, and local app development. It combines a realistic REST API with Better Auth-based authentication so you can exercise both public data flows and authenticated user experiences in one project.

## What it includes

The app ships with mock data for common resource types and a full CRUD-style route layer:

- `/api/users`
- `/api/users/[id]`
- `/api/posts`
- `/api/posts/[id]`
- `/api/todos`
- `/api/todos/[id]`
- `/api/products`
- `/api/products/[id]`
- `/api/movies`
- `/api/movies/[id]`
- `/api/authors`
- `/api/authors/[id]`
- `/api/authors/[id]/books`
- `/api/books`
- `/api/books/[id]`
- `/api/auth/*` (Better Auth routes)

## Features

- Next.js API routes for mock CRUD interactions
- Better Auth email/password authentication
- User-scoped resources such as posts and todos
- Public reference data for authors, books, movies, and products
- Database-backed schema with Drizzle ORM
- Input validation with Zod
- Seed data for rapid local development and demos
- PostgreSQL-compatible database support via Neon and Drizzle

## Authentication

Authentication is powered by Better Auth and mounted under the app auth route namespace:

- `/api/auth/sign-up/email`
- `/api/auth/sign-in/email`
- `/api/auth/sign-out`
- `/api/auth/get-session`
- additional Better Auth endpoints as needed by the library

Example sign-up:

```bash
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "secret123",
    "name": "Demo User"
  }'
```

Example sign-in:

```bash
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "secret123"
  }'
```

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Seeding mock data

This project includes a seed script to populate the mock endpoints with sample records:

```bash
npm run seed
```

## Example requests

List public users:

```bash
curl http://localhost:3000/api/users
```

Create a todo for the authenticated user:

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Ship mock API demo","completed":false}'
```

List books by author:

```bash
curl http://localhost:3000/api/authors/1/books
```

## Route overview

| Area | Endpoint pattern | Notes |
| --- | --- | --- |
| Auth | `/api/auth/*` | Better Auth flows for sign-up, sign-in, session, and sign-out |
| Users | `/api/users`, `/api/users/[id]` | User listing and user detail updates |
| Posts | `/api/posts`, `/api/posts/[id]` | User-scoped post collection and item operations |
| Todos | `/api/todos`, `/api/todos/[id]` | User-scoped tasks and task updates |
| Products | `/api/products`, `/api/products/[id]` | Catalog-style mock inventory |
| Movies | `/api/movies`, `/api/movies/[id]` | Movie catalog data |
| Authors | `/api/authors`, `/api/authors/[id]` | Author metadata and author detail routes |
| Books | `/api/books`, `/api/books/[id]` | Book catalog data |
| Relations | `/api/authors/[id]/books` | Fetch books for a given author |

## Project scripts

```bash
npm run dev
npm run build
npm run start
npm run seed
npm run db:generate
npm run db:migrate
npm run db:push
```

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Better Auth
- Drizzle ORM
- PostgreSQL / Neon-compatible database
- Zod validation

## Notes

This project is designed for local development, UI prototyping, and mock-data-driven demos. It is useful for testing frontend flows, auth flows, API contracts, and sample integrations without depending on a production backend.
