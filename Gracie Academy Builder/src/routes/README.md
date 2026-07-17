# Routes

TanStack Router uses **file-based routing** in this app. The current routes are
defined in this directory and collected by `src/routeTree.gen.ts`. Do **not**
create `src/pages/`, `src/routes/_app/index.tsx`, or `app/layout.tsx` — those
are Next.js / Remix conventions. The only root layout is `src/routes/__root.tsx`.

## Conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `free-trial.tsx` | `/free-trial` |
| `admin.tsx` | `/admin` |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.
