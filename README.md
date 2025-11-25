# TinyLink

TinyLink is a small URL shortener built with Next.js, Tailwind CSS and Postgres.

## Features
- Create short links (custom codes allowed)
- Redirect with 302
- Increment click count and last-clicked time
- Delete links
- Dashboard and per-code stats
- Healthcheck `/healthz`

## Run locally
1. Copy files and set `.env` using `.env.example`.
2. Create Postgres and run migration: `npm run migrate` (requires psql CLI and DATABASE_URL set).
3. Install: `npm install`
4. Run dev server: `npm run dev`

## Tests
Make sure app is running on `TEST_BASE_URL` (defaults to `http://localhost:3000`). Then:

```
npm test
```

Tests use Mocha + Supertest to hit the running server.

## API endpoints (required by autograder)
- POST `/api/links` - Create link (409 if code exists)
- GET `/api/links` - List links
- GET `/api/links/:code` - Get stats
- DELETE `/api/links/:code` - Delete link
- GET `/healthz` - Health check
