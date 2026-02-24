# 3x3 Basketball Portal — web-next

Next.js 14 App Router + Neon Postgres portal for 3x3 basketball events, teams, players, venues, and news.

## Quick Start

```bash
cp .env.local.example .env.local
# Fill in DATABASE_URL in .env.local

npm install
npm run dev        # http://localhost:3000
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Neon Postgres connection string (server-side only) |
| `NEXT_PUBLIC_BASE_URL` | No | Full URL for OG metadata (default: http://localhost:3000) |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── api/             # Route Handlers (events, teams, news)
│   ├── events/          # Event list + detail
│   ├── teams/           # Team list + detail
│   ├── players/         # Placeholder
│   ├── venues/          # Placeholder
│   └── news/            # News list + detail
├── components/
│   ├── layout/          # SiteHeader, SiteFooter
│   └── ui/              # EventCard, TeamCard, NewsCard, badges, etc.
├── lib/
│   ├── db/              # Neon client + query helpers
│   ├── mappers/         # DB row → domain model transforms
│   ├── repositories/    # Domain-level data access
│   └── utils/           # date formatting, param parsing
└── types/
    └── domain.ts        # All domain types (Event, Team, Player, etc.)
```

## Caching Strategy

- All pages use ISR with `revalidate = 60` (60 second CDN cache)
- API routes add `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`
- Static assets: `Cache-Control: immutable` via next.config.ts

## Deploy to Vercel

```bash
vercel --prod
```

Required Vercel env vars: `DATABASE_URL`

## DB Schema Assumptions

The portal currently reads from:
- `tournaments` table (events)
- `teams` table
- `news` table (with optional `team_id` FK)

Columns follow the existing create.xyz schema. Mappers in `src/lib/mappers/` handle the row-to-domain transformation.
