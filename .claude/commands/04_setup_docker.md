# Configuration Docker Optimisée

## Description
Crée les fichiers Docker pour l'application Next.js + Payload CMS unifiée, optimisés pour la production (image ~200MB).

## Paramètres optionnels
- $PROJECT_DIR : Répertoire du projet (défaut: répertoire courant)

## Instructions

1. Vérifie que tu es dans le bon répertoire projet.

2. Crée le dossier `docker/` s'il n'existe pas.

3. Crée le fichier `Dockerfile` à la racine avec une image multi-stage :

```dockerfile
# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++
RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# ============================================
# Stage 3: Production Runner
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat curl \
    && rm -rf /var/cache/apk/*

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN mkdir -p /app/public/media \
    && chown -R nextjs:nodejs /app/public/media

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
```

4. Crée le fichier `.dockerignore` à la racine :

```dockerignore
# Dependencies
node_modules
.pnpm-store

# Build outputs
.next
dist
build

# Development
.git
.gitignore
**/*.md
!README.md

# Environment files
.env
.env.*
!.env.example

# IDE
.vscode
.idea
*.swp
.DS_Store

# Tests
coverage
__tests__
**/*.test.ts
**/*.spec.ts

# Docker
Dockerfile*
docker-compose*
.docker

# Documentation
docs
documentations

# Logs
*.log
logs

# Temporary
tmp
temp
.cache
```

5. Crée le fichier `docker/docker-compose.yml` pour la production :

```yaml
# ===========================================
# Docker Compose - Production
# Portfolio - Next.js + Payload CMS
# ===========================================

services:
  # =========================================
  # Application (Next.js + Payload)
  # =========================================
  app:
    build:
      context: ..
      dockerfile: Dockerfile
    image: ghcr.io/${GITHUB_REPOSITORY:-emacsah/emacsah}:latest
    container_name: portfolio-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URI=postgresql://folio_sah:${DB_PASSWORD}@db-karlandklaude:5432/payload_portfolio
      - PAYLOAD_SECRET=${PAYLOAD_SECRET}
      - NEXT_PUBLIC_SERVER_URL=https://emacsah.com
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - REDIS_URL=redis://portfolio-redis:6379
      - RESEND_API_KEY=${RESEND_API_KEY:-}
      - EMAIL_FROM=${EMAIL_FROM:-}
      - EMAIL_TO=${EMAIL_TO:-}
    volumes:
      - app_media:/app/public/media
    networks:
      - portfolio-network
      - karlandklaude_default
    depends_on:
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # =========================================
  # Redis - Cache
  # =========================================
  redis:
    image: redis:7-alpine
    container_name: portfolio-redis
    restart: unless-stopped
    command: >
      redis-server
      --appendonly yes
      --maxmemory 128mb
      --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    networks:
      - portfolio-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3
    deploy:
      resources:
        limits:
          memory: 150M

# =========================================
# Reseaux
# =========================================
networks:
  portfolio-network:
    driver: bridge
    name: portfolio-network
  karlandklaude_default:
    external: true

# =========================================
# Volumes persistants
# =========================================
volumes:
  app_media:
    name: portfolio_media
  redis_data:
    name: portfolio_redis
```

6. Crée le fichier `docker/docker-compose.dev.yml` pour le développement :

```yaml
# ===========================================
# Docker Compose - Developpement Local
# Portfolio - Next.js + Payload CMS
# ===========================================

services:
  # =========================================
  # Application - Dev avec hot reload
  # =========================================
  app:
    build:
      context: ..
      dockerfile: docker/Dockerfile.dev
    container_name: portfolio-dev
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - PORT=3000
      - DATABASE_URI=postgresql://payload:devpassword@postgres:5432/payload_dev
      - PAYLOAD_SECRET=dev-secret-key-minimum-32-characters-long
      - NEXT_PUBLIC_SERVER_URL=http://localhost:3000
      - GEMINI_API_KEY=${GEMINI_API_KEY:-}
    volumes:
      - ..:/app
      - /app/node_modules
      - /app/.next
      - dev_media:/app/public/media
    networks:
      - dev-network
    depends_on:
      postgres:
        condition: service_healthy

  # =========================================
  # PostgreSQL - Dev
  # =========================================
  postgres:
    image: postgres:15-alpine
    container_name: portfolio-postgres-dev
    restart: unless-stopped
    environment:
      - POSTGRES_USER=payload
      - POSTGRES_PASSWORD=devpassword
      - POSTGRES_DB=payload_dev
    ports:
      - "5433:5432"
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data
    networks:
      - dev-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U payload -d payload_dev"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  dev-network:
    driver: bridge

volumes:
  postgres_dev_data:
  dev_media:
```

7. Crée le fichier `docker/Dockerfile.dev` :

```dockerfile
# ============================================
# Dockerfile Development
# Hot reload
# ============================================

FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++ curl
RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .

ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["pnpm", "dev"]
```

8. Affiche un résumé avec :

**Commandes essentielles :**

```bash
# Production
docker compose -f docker/docker-compose.yml up -d
docker compose -f docker/docker-compose.yml logs -f app

# Développement
docker compose -f docker/docker-compose.dev.yml up

# Build local
docker build -t portfolio:latest .
```

**Variables d'environnement requises :**

| Variable | Description |
|----------|-------------|
| DATABASE_URI | Connection string PostgreSQL |
| PAYLOAD_SECRET | Clé secrète (min 32 chars) |
| NEXT_PUBLIC_SERVER_URL | https://emacsah.com |
| GEMINI_API_KEY | Clé API Google Gemini |

**Taille estimée de l'image :** ~200MB
