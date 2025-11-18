# Svelte Login App

A compact SvelteKit example demonstrating user login/auth flows, database wiring with Drizzle, and an opinionated project structure for learning and quick prototyping.

## Overview

This repository is a small SvelteKit application that demonstrates:

- Google OAuth login flow (server endpoints for login/callback/logout)
- A minimal database integration using Drizzle and a local SQL file
- Simple protected pages and auth-aware UI in Svelte components
- API routes that show server-side handling and parameterized endpoints

It is intended as a learning project and starter template for authentication + DB in SvelteKit.

## Features

- OAuth-based login (Google) with server-side routes
- Login, logout, and callback endpoints wired into the app
- A small SQLite/Drizzle-backed user table and migrations (drizzle folder)
- Example API endpoints under `src/routes/api/` (including parameterized routes)
- Minimal UI pages showing login state and a protected app area

## Technologies

- SvelteKit — app framework and routing
- TypeScript — static types across the app
- Vite — dev server and bundling
- Drizzle ORM — typed queries and migrations (drizzle/)
- SQLite (or other SQL via Drizzle) — simple local database for users
- Node-compatible server environment (adapters can be added for deployment)

## Project structure (high level)

Files and folders you'll commonly work with:

- `drizzle.config.ts` — Drizzle configuration and migrations
- `drizzle/` — SQL migrations and snapshots
- `src/lib/db/` — Drizzle database setup and models
	- `User.db.ts` — DB functions for the User entity
	- `schema/User.schema.ts` — Table schema definitions
- `src/routes/` — SvelteKit routes and server endpoints
	- `src/routes/login/+page.svelte` — login page UI
	- `src/routes/app/` — a simple protected area
	- `src/routes/auth/*/` — Google login/callback/logout server endpoints
	- `src/routes/api/*` — example API endpoints (e.g., cats)
- `src/hooks.server.ts` — hook to add auth/user info to requests
- `src/app.d.ts` — shared application typings

Refer to the repository tree at the top-level for the exact file layout.

## Implementation details

- Authentication:
	- Login requests are routed to `src/routes/auth/login/google/+server.ts` which starts the OAuth flow.
	- Google redirects back to `src/routes/auth/callback/google/+server.ts` where the app exchanges the authorization code and provisions or updates a user in the database.
	- Logout is handled by `src/routes/auth/logout/google/+server.ts` which clears the session/cookie.

- Database:
	- The project uses Drizzle with SQL migration files stored in `drizzle/`.
	- `src/lib/db/index.ts` initializes the database connection. `src/lib/db/User.db.ts` contains user-related operations.

- UI and routing:
	- Pages are standard SvelteKit +page.svelte files. Server-side logic for pages is in `+page.server.ts` when needed.
	- `+layout.svelte` contains shared layout and usually the header showing login state.

## Environment and configuration

This project expects a few environment variables (especially for OAuth). Typical variables:

- `GOOGLE_CLIENT_ID` — Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` — Google OAuth client secret
- `DATABASE_URL` — connection string for your SQL database (e.g., `file:./dev.db` for SQLite)

Create a `.env` file in the project root (do NOT commit credentials):

```sh
# .env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=file:./dev.db
```

If the project uses a different naming convention for environment variables, check the server endpoint files under `src/routes/auth/` for the exact env var names.

## Setup & local development

Prerequisites:

- Node.js (recommended v18+)
- npm, pnpm, or yarn

Install dependencies:

```sh
npm install
# or: pnpm install
# or: yarn
```

Run database migrations (if using Drizzle CLI in this project):

```sh
# Example, adjust if you use pnpm or a different script
npm run drizzle:push
```

Start the dev server:

```sh
npm run dev
```

Open http://localhost:5173 (or as printed by the dev server) and try the login flow.

Build and preview production bundle:

```sh
npm run build
npm run preview
```

## SCREEN RECORDING:


https://github.com/user-attachments/assets/7693810c-0eb3-48da-ad9b-0d1e8c509c94


## How to customize

- To change OAuth providers, replace the Google-specific endpoints with your provider's flows and adapt the auth exchange logic.
- To use a different database, update `DATABASE_URL` and Drizzle configuration in `drizzle.config.ts` and re-run migrations.
- Add adapters to `svelte.config.js` to deploy to your target (Vercel, Netlify, Cloudflare Workers, etc.).

## Troubleshooting

- If OAuth redirects fail, ensure your Google developer console has the correct redirect URI (e.g., `http://localhost:5173/auth/callback/google`).
- If database connections fail, confirm `DATABASE_URL` is correct and the database file (for SQLite) is writable.
- Check server logs printed by SvelteKit for stack traces; server endpoints are under `src/routes/auth` and `src/routes/api`.

## Learning outcomes

Working with this project should teach you:

- How SvelteKit routes and server endpoints work, including `+server.ts` and `+page.server.ts` usage.
- Implementing OAuth flows and handling provider callbacks securely.
- Wiring a typed database layer with Drizzle and managing migrations.
- Structuring a small SvelteKit app with clear separation of server logic, DB code, and UI components.
- Basic deployment considerations (environment variables, adapters).

## Next steps / Improvements

- Add automated tests for server endpoints and DB operations.
- Add session management and stronger CSRF protections where appropriate.
- Expand the UI with role-based access controls and profile management.

---

## Author

- Author: Samhitha Dwarakanath
