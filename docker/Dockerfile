# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:25-alpine AS deps

WORKDIR /app

# Installer les dependances systeme minimales
RUN apk add --no-cache libc6-compat python3 make g++

# Activer pnpm
RUN corepack enable pnpm

# Copier les fichiers de dependances
COPY package.json pnpm-lock.yaml ./

# Installer toutes les dependances (incluant devDependencies pour le build)
RUN pnpm install --frozen-lockfile

# ============================================
# Stage 2: Builder
# ============================================
FROM node:25-alpine AS builder

WORKDIR /app

# Copier les dependances du stage precedent
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Activer pnpm
RUN corepack enable pnpm

# Build de l'application
ENV NODE_ENV=production
RUN pnpm run build

# Supprimer les devDependencies apres le build
RUN pnpm prune --prod

# ============================================
# Stage 3: Production Runner
# ============================================
FROM node:25-alpine AS runner

WORKDIR /app

# Labels pour GitHub Container Registry
LABEL org.opencontainers.image.source="https://github.com/emacsah/emacsah"
LABEL org.opencontainers.image.description="Portfolio CMS avec Payload"
LABEL org.opencontainers.image.licenses="MIT"

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Installer uniquement les dependances runtime necessaires
RUN apk add --no-cache \
    libc6-compat \
    curl \
    && rm -rf /var/cache/apk/*

# Creer un utilisateur non-root pour la securite
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 payload

# Copier uniquement les fichiers necessaires pour la production
COPY --from=builder --chown=payload:nodejs /app/dist ./dist
COPY --from=builder --chown=payload:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=payload:nodejs /app/package.json ./package.json

# Creer les dossiers pour les uploads avec les bonnes permissions
RUN mkdir -p /app/uploads /app/media \
    && chown -R payload:nodejs /app/uploads /app/media

# Utiliser l'utilisateur non-root
USER payload

# Exposer le port
EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3001/api/health || exit 1

# Demarrer l'application
CMD ["node", "dist/server.js"]
