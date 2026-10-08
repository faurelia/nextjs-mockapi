# Mock API Starter

A lightweight Next.js mock API for frontend prototyping, demos, and local development. This project exposes a set of realistic REST endpoints backed by a local database so you can test client apps without needing a production backend.

## What it includes

The app ships with mock data for common resource types:

- `/api/users`
- `/api/posts`
- `/api/todos`
- `/api/products`
- `/api/movies`
- `/api/authors`
- `/api/books`

Each collection supports standard CRUD-style patterns using Next.js route handlers.

## Features

- Fast local API for UI development
- Structured mock data for multiple domains
- REST endpoints with GET and POST support
- seeded records for easy testing
- input validation with Zod for safer request payloads
- built with Next.js and Drizzle ORM

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

List users:

```bash
curl http://localhost:3000/api/users
```

Create a todo:

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Ship mock API demo","completed":false}'
```

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
- Drizzle ORM
- PostgreSQL / Neon-compatible database
- TypeScript
- Zod

## Notes

This project is intended as a mock backend for development and demos. It is not a production authentication or storage system, but it is useful for testing frontend flows, API contracts, and sample integrations.
