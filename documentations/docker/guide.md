# Guide Docker - Portfolio CMS

## Taille des images

| Image | Taille estimee |
|-------|----------------|
| payload-portfolio (production) | ~150-180 MB |
| node:20-alpine (base) | ~50 MB |
| redis:7-alpine | ~15 MB |

**Total footprint** : ~200 MB (vs ~800+ MB avec node:20 standard)

---

## Configuration specifique du projet

| Parametre | Valeur |
|-----------|--------|
| VPS | root@180.149.199.86 |
| Port API Payload | 3001 |
| Domaine | folio.emacsah.com |
| Base de donnees | payload_portfolio |
| Utilisateur DB | folio_sah |
| Container PostgreSQL | db-karlandklaude |
| Reseau existant | karlandklaude_default |

---

## Commandes essentielles

### Production

```bash
# Construire l'image localement
docker build -t portfolio-cms:latest .

# Demarrer les services
docker compose up -d

# Voir les logs
docker compose logs -f payload

# Redemarrer apres mise a jour
docker compose pull && docker compose up -d --force-recreate

# Arreter les services
docker compose down

# Arreter et supprimer les volumes (ATTENTION: perte de donnees)
docker compose down -v
```

### Developpement

```bash
# Demarrer en mode dev
docker compose -f docker-compose.dev.yml up

# Rebuild apres modification du Dockerfile
docker compose -f docker-compose.dev.yml up --build

# Acceder au shell du container
docker exec -it payload-dev sh
```

### Maintenance

```bash
# Nettoyer les images non utilisees
docker image prune -f

# Voir l'espace utilise par Docker
docker system df

# Backup des volumes
docker run --rm -v payload_uploads:/data -v $(pwd):/backup alpine tar czf /backup/uploads_backup.tar.gz /data

# Restore des volumes
docker run --rm -v payload_uploads:/data -v $(pwd):/backup alpine tar xzf /backup/uploads_backup.tar.gz -C /
```

---

## Variables d'environnement requises

| Variable | Description | Obligatoire |
|----------|-------------|-------------|
| DATABASE_URI | Connection string PostgreSQL | Oui |
| PAYLOAD_SECRET | Cle secrete (min 32 chars) | Oui |
| PAYLOAD_PUBLIC_SERVER_URL | URL publique du CMS | Oui |
| GEMINI_API_KEY | Cle API Google Gemini | Oui |
| FRONTEND_URL | URL du frontend Next.js | Oui |
| REDIS_URL | URL Redis | Optionnel |
| DB_PASSWORD | Mot de passe base de donnees | Oui |

---

## Troubleshooting

### Container ne demarre pas
```bash
# Voir les logs detailles
docker compose logs payload --tail 100

# Verifier les variables d'environnement
docker compose config
```

### Erreur de connexion PostgreSQL
```bash
# Verifier que le reseau Docker existe
docker network ls | grep karlandklaude

# Tester la connexion depuis le container
docker exec payload-portfolio sh -c "nc -zv db-karlandklaude 5432"
```

### Erreur memoire
```bash
# Augmenter les limites dans docker-compose.yml
# Ou verifier la memoire disponible
free -h
```

---

## Architecture Docker

```
portfolio-network (bridge)
    |
    +-- payload-portfolio (port 3001)
    |       |
    |       +-- Volumes: payload_uploads, payload_media
    |
    +-- payload-redis (cache)
            |
            +-- Volume: payload_redis_data

karlandklaude_default (externe)
    |
    +-- db-karlandklaude (PostgreSQL:5432)
```

---

## Fichiers crees

- `Dockerfile` : Image multi-stage production (~150-180 MB)
- `Dockerfile.dev` : Image developpement avec hot reload
- `docker-compose.yml` : Configuration production
- `docker-compose.dev.yml` : Configuration developpement local
- `docker-compose.override.yml.example` : Template pour surcharges locales
- `.dockerignore` : Exclusions pour optimiser le build
- `.env.docker` : Template variables d'environnement
- `scripts/docker-health.sh` : Script de verification sante
