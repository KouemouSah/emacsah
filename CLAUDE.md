# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **emacsah portfolio system** - a unified Next.js + Payload CMS application deployed on a VPS at emacsah.com.

## Architecture

```
portfolio/
├── src/
│   ├── app/
│   │   ├── (frontend)/       # Public pages (React + Tailwind)
│   │   ├── (payload)/
│   │   │   └── cms/          # Payload Admin Panel (/cms)
│   │   └── api/              # API routes
│   ├── collections/          # Payload collections
│   ├── globals/              # Payload globals
│   ├── components/           # React components
│   └── payload.config.ts     # Payload configuration
├── docker/                   # Docker configs
├── .github/                  # GitHub Actions workflows
├── Dockerfile                # Production image
└── package.json
```

## Deployment Target

- **VPS**: 180.149.199.86 (root@180.149.199.86)
- **Domain**: emacsah.com
- **App Port**: 3000
- **Admin URL**: https://emacsah.com/cms
- **Database**: PostgreSQL 15 (container: db-karlandklaude, db: payload_portfolio, user: folio_sah)
- **Cache**: Redis 7

## Key Commands

```bash
# Development
pnpm dev              # Run Next.js dev server (port 3000)
pnpm build            # Build for production
pnpm start            # Start production server

# Type checking
pnpm type-check       # Run TypeScript checks
pnpm lint             # Run ESLint

# Docker
docker compose -f docker/docker-compose.dev.yml up   # Dev with hot reload
docker compose -f docker/docker-compose.yml up       # Production
```

## URLs

| Environment | URL |
|-------------|-----|
| Frontend | https://emacsah.com |
| Admin CMS | https://emacsah.com/cms |
| API | https://emacsah.com/api |
| Health Check | https://emacsah.com/api/health |

## Custom Claude Commands

See `.claude/commands/` for deployment commands:
- `/audit_vps` - VPS audit
- `/01_setup_dns` - Configure DNS
- `/02_setup_database` - Setup PostgreSQL
- `/03_setup_payload_project` - Initialize project
- `/04_setup_docker` - Docker configuration
- `/05_setup_github_actions` - CI/CD setup
- `/06_setup_nginx_proxy` - Nginx/SSL configuration
- `/07_deploy` - Production deployment

## Environment Variables

```env
DATABASE_URI=postgresql://folio_sah:xxx@db-karlandklaude:5432/payload_portfolio
PAYLOAD_SECRET=xxx
NEXT_PUBLIC_SERVER_URL=https://emacsah.com
GEMINI_API_KEY=xxx
```

## Language

Project documentation and custom commands are written in French.
