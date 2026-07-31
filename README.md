# Renzo Gracie The Woodlands

The website and lead-capture application for Renzo Gracie The Woodlands. The
frontend is a Vite application built with React 19, TanStack Router, and
Tailwind CSS 4. Supabase provides backend data services, and Vercel hosts preview
and production deployments.

## Local development

Requirements: Node.js 22 and npm.

```bash
cd app
cp .env.example .env
npm ci
npm run dev
```

The local server is available at `http://localhost:5173`. Before opening a pull
request, run:

```bash
npm run lint
npm run typecheck
npm run build
```

## Branches and deployment

- `dev` is the integration branch. Pushes and pull requests receive Vercel
  preview deployments.
- `main` is the production branch. Changes move from `dev` to `main` by pull
  request and deploy to production after CI passes.
- Feature and fix branches merge into `dev` first.

## Environment variables

Local values live in `app/.env`, which is ignored by Git. Copy
`app/.env.example` to get the supported keys. Hosted values are configured in
Vercel Project Settings → Environment Variables for Development, Preview, and
Production.

Supabase browser credentials come from the Supabase project settings. Never put
a service-role key in a `VITE_` variable because Vite exposes those variables to
client-side code.
