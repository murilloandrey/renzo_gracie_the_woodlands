# Deploy pipeline — dev → preview → production

App root: `app/`
Package manager: **npm**
Node: **22**

## Branch model

| Branch | Purpose | Vercel target |
|---|---|---|
| `main` | Production; updated through a pull request from `dev` | Production |
| `dev` | Integration and staging | Preview |
| `feat/*`, `fix/*` | Focused changes merged into `dev` | Preview |

Flow: feature or fix branch → pull request into `dev` → verify CI and the preview
deployment → pull request from `dev` into `main` → verify CI → production.

## Vercel settings

Set the Vercel Root Directory to `app` and the Production Branch to `main`.
Keep automatic Git deployments enabled so branches receive preview deployments.

Configure `VITE_SITE_URL`, `VITE_SUPABASE_URL`, and
`VITE_SUPABASE_ANON_KEY` in Vercel Project Settings → Environment Variables for
the appropriate Production, Preview, and Development environments.

Never expose a Supabase service-role key through a `VITE_` variable. Variables
with that prefix are included in the browser bundle.

## Continuous integration

`.github/workflows/ci.yml` runs for pull requests into `main` or `dev` and pushes
to `dev`. It installs dependencies with `npm ci`, then runs lint, type checking,
and the production build. A separate job rejects tracked environment files and
common secret patterns.

Protect `main` with pull requests, required CI status checks, and blocked force
pushes.

## Local verification

```bash
cd app
npm ci
npm run lint
npm run typecheck
npm run build
```

Use `npm run dev` for local development and verify meaningful changes in the
Vercel preview before promoting `dev` to `main`.
