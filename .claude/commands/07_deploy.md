# Déploiement Production

## Description
Déploie l'application Next.js + Payload CMS sur le VPS en production.

## Paramètres requis
- $SSH_CONNECTION : Connexion SSH (ex: root@emacsah.com)

## Paramètres optionnels
- $DEPLOY_TYPE : Type de déploiement (`full` ou `update`, défaut: `update`)

## Prérequis
Avant d'exécuter cette commande, assure-toi que :
- [ ] Le DNS est configuré (commande `/01_setup_dns`)
- [ ] La base de données est créée (commande `/02_setup_database`)
- [ ] Le projet est initialisé (commande `/03_setup_payload_project`)
- [ ] Les fichiers Docker sont créés (commande `/04_setup_docker`)
- [ ] GitHub Actions est configuré (commande `/05_setup_github_actions`)

## Instructions

### Pour un déploiement UPDATE (mise à jour)

1. Connecte-toi au VPS via SSH : `$SSH_CONNECTION`

2. Exécute les commandes de mise à jour :

```bash
cd /opt/portfolio

# Pull de la dernière image
docker compose pull

# Redémarrer le container avec la nouvelle image
docker compose up -d --force-recreate app

# Nettoyer les anciennes images
docker image prune -f

# Vérifier le statut
docker compose ps

# Vérifier les logs
docker compose logs -f app --tail 50
```

3. Vérifie que l'application est accessible :

```bash
curl -s http://localhost:3000/api/health
```

---

### Pour un déploiement FULL (première installation)

1. Connecte-toi au VPS via SSH : `$SSH_CONNECTION`

2. Crée la structure du projet sur le VPS :

```bash
mkdir -p /opt/portfolio
cd /opt/portfolio
```

3. Crée le fichier `docker-compose.yml` sur le VPS :

```bash
cat > docker-compose.yml << 'EOF'
services:
  app:
    image: ghcr.io/GITHUB_USERNAME/REPO_NAME:latest
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
    volumes:
      - app_media:/app/public/media
    networks:
      - portfolio-network
      - karlandklaude_default
    depends_on:
      - redis
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  redis:
    image: redis:7-alpine
    container_name: portfolio-redis
    restart: unless-stopped
    command: redis-server --appendonly yes --maxmemory 128mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    networks:
      - portfolio-network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

networks:
  portfolio-network:
    driver: bridge
  karlandklaude_default:
    external: true

volumes:
  app_media:
  redis_data:
EOF
```

4. Remplace `GITHUB_USERNAME/REPO_NAME` par les valeurs réelles.

5. Crée le fichier `.env` avec les credentials :

```bash
cat > .env << 'EOF'
# Database
DB_PASSWORD=MOT_DE_PASSE_POSTGRESQL

# Payload
PAYLOAD_SECRET=CLE_SECRETE_32_CARACTERES_MINIMUM

# Gemini
GEMINI_API_KEY=CLE_API_GEMINI
EOF

# Sécuriser le fichier
chmod 600 .env
```

6. Se connecter à GitHub Container Registry :

```bash
echo "GITHUB_TOKEN" | docker login ghcr.io -u GITHUB_USERNAME --password-stdin
```

7. Démarrer les services :

```bash
# Pull des images
docker compose pull

# Démarrer en arrière-plan
docker compose up -d

# Vérifier le statut
docker compose ps

# Voir les logs
docker compose logs -f
```

8. Vérifier le déploiement :

```bash
# Test API locale
curl http://localhost:3000/api/health

# Test depuis l'extérieur (après config NPM)
curl https://emacsah.com/api/health
```

---

## Scripts utiles

Crée les scripts suivants sur le VPS dans `/opt/portfolio/scripts/` :

### `scripts/deploy.sh` - Déploiement rapide

```bash
#!/bin/bash
set -e

cd /opt/portfolio

echo "Pulling latest image..."
docker compose pull

echo "Restarting containers..."
docker compose up -d --force-recreate app

echo "Cleaning up..."
docker image prune -f

echo "Waiting for health check..."
sleep 15

if curl -sf http://localhost:3000/api/health > /dev/null; then
    echo "Deployment successful!"
else
    echo "Health check failed!"
    docker compose logs app --tail 20
    exit 1
fi
```

### `scripts/logs.sh` - Voir les logs

```bash
#!/bin/bash
docker compose -f /opt/portfolio/docker-compose.yml logs -f "${1:-app}" --tail 100
```

### `scripts/backup.sh` - Sauvegarde

```bash
#!/bin/bash
set -e

BACKUP_DIR="/opt/backups/portfolio"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

echo "Backup media..."
docker run --rm -v portfolio_media:/data -v $BACKUP_DIR:/backup alpine \
    tar czf /backup/media_$DATE.tar.gz /data

echo "Backup database..."
docker exec db-karlandklaude pg_dump -U folio_sah payload_portfolio | \
    gzip > $BACKUP_DIR/database_$DATE.sql.gz

echo "Backup complete: $BACKUP_DIR"
ls -la $BACKUP_DIR/*$DATE*
```

---

## Checklist post-déploiement

### Vérifications techniques
- [ ] Container app running : `docker ps | grep portfolio-app`
- [ ] Container Redis running : `docker ps | grep portfolio-redis`
- [ ] API Health OK : `curl http://localhost:3000/api/health`
- [ ] HTTPS accessible : `curl https://emacsah.com`
- [ ] Certificat SSL valide

### Vérifications fonctionnelles
- [ ] Page d'accueil accessible : https://emacsah.com
- [ ] Admin accessible : https://emacsah.com/cms
- [ ] Connexion admin fonctionne
- [ ] Upload d'image fonctionne
- [ ] API publique : https://emacsah.com/api/projects

### Première configuration admin
1. Aller sur https://emacsah.com/cms
2. Créer le premier utilisateur admin
3. Configurer les paramètres du site
4. Créer les premières entrées (Bio, Expériences)
