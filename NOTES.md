# NOTES

The starter had legacy `/demo/better-auth` links, product inputs bound to non-reactive `getFieldValue()` calls, and user-role server functions that did not protect self-demotion or self-deletion. Legacy auth links/routes were removed in favor of `/login`; Better Auth cookies now use HTTP-only, SameSite=Lax settings and a 24-hour session; product server functions use bounded Zod validation and require an authenticated admin for mutations; user management validates target users and blocks self-role-demotion, self-deletion, and removal/demotion of the last administrator. The app intentionally remains in-memory, so accounts, sessions, roles, and products reset when the server process restarts.

## Setup

1. Copy `.env.example` to `.env` and set `BETTER_AUTH_URL` and a generated `BETTER_AUTH_SECRET`.
2. Run `bun install`.
3. Run `bun run generate-routes` (or `bunx tsr generate`) after route changes.
4. Run `bun dev`, visit `/setup`, then sign in at `/login` with the seed credentials shown on the setup page.
5. Verify `/`, `/login`, `/setup`, `/dashboard`, `/products`, and `/users`.
6. Run `bun run lint` and `bun run build`.

Security note: seed credentials are for local coursework/demo only. Do not expose a known seed password in a public production deployment; replace the seed mechanism with a deployment-time secret or remove it before production. The in-memory design is not suitable for durable production data.
