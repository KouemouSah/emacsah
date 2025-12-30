# Configuration GitHub Actions CI/CD

## Description
Configure le pipeline CI/CD complet pour build, test et déploiement automatique sur le VPS via GitHub Container Registry.

## Prérequis
- Repository GitHub configuré
- Accès SSH au VPS

## Instructions

1. Crée le dossier `.github/workflows/` s'il n'existe pas.

2. Crée le fichier `.github/workflows/ci.yml` pour les tests :

```yaml
# ===========================================
# CI - Tests et Verifications
# Portfolio - Next.js + Payload CMS
# ===========================================

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '9'

jobs:
  # =========================================
  # Lint et Type Check
  # =========================================
  lint:
    name: Lint & Type Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

  # =========================================
  # Build Test
  # =========================================
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: lint

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build
        env:
          DATABASE_URI: postgresql://test:test@localhost:5432/test
          PAYLOAD_SECRET: test-secret-key-for-ci-minimum-32-chars
          NEXT_PUBLIC_SERVER_URL: https://emacsah.com
```

3. Crée le fichier `.github/workflows/build-deploy.yml` :

```yaml
# ===========================================
# Build & Deploy - Production
# Portfolio - Next.js + Payload CMS
# ===========================================

name: Build & Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # =========================================
  # Build & Push Docker Image
  # =========================================
  build:
    name: Build Docker Image
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    outputs:
      image_digest: ${{ steps.build.outputs.digest }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata for Docker
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v6
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64

      - name: Image info
        run: |
          echo "Image: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest"
          echo "Digest: ${{ steps.build.outputs.digest }}"

  # =========================================
  # Deploy to VPS
  # =========================================
  deploy:
    name: Deploy to VPS
    needs: build
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Deploy to VPS via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            set -e

            echo "=== Login to GHCR ==="
            echo ${{ secrets.GHCR_PAT }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin

            echo "=== Navigate to project ==="
            cd /opt/portfolio

            echo "=== Pull latest image ==="
            docker pull ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest

            echo "=== Restart containers ==="
            docker compose pull
            docker compose up -d --force-recreate app

            echo "=== Cleanup ==="
            docker image prune -f

            echo "=== Wait for health check ==="
            sleep 20

            echo "=== Health check ==="
            if curl -sf http://localhost:3000/api/health > /dev/null; then
              echo "Deployment successful!"
            else
              echo "Health check failed!"
              docker compose logs app --tail 50
              exit 1
            fi

      - name: Deployment summary
        if: success()
        run: |
          echo "Deployment completed!"
          echo "URL: https://emacsah.com"
```

4. Crée le fichier `.github/dependabot.yml` :

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
    commit-message:
      prefix: "chore(deps):"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    commit-message:
      prefix: "chore(ci):"

  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
    commit-message:
      prefix: "chore(docker):"
```

5. Configure les secrets GitHub :

**Repository → Settings → Secrets and variables → Actions**

| Secret | Description |
|--------|-------------|
| `VPS_HOST` | 180.149.199.86 ou emacsah.com |
| `VPS_USER` | root |
| `VPS_SSH_KEY` | Clé privée SSH |
| `GHCR_PAT` | Personal Access Token (read:packages) |

6. Configure l'environnement de production :

**Repository → Settings → Environments → New environment**

- Nom : `production`
- Protection rules (optionnel) : Required reviewers

7. Génère le fichier `documentations/github/secrets_setup.md` avec les instructions détaillées.

## Vérification

Après configuration :
1. Aller dans **Actions** → **Build & Deploy**
2. Cliquer sur **Run workflow**
3. Vérifier que le déploiement fonctionne
