# Checklist Post-Deploiement

## Verification techniques

- [x] Container portfolio-app running : `docker ps | grep portfolio-app`
- [x] Container portfolio-redis running : `docker ps | grep portfolio-redis`
- [x] Site accessible : `curl https://emacsah.com`
- [x] Admin CMS accessible : `curl https://emacsah.com/cms`
- [x] Certificat SSL valide : Let's Encrypt (expire 2026-03-30)

## URLs de production

| Service | URL |
|---------|-----|
| Frontend | https://emacsah.com |
| Admin CMS | https://emacsah.com/cms |
| API | https://emacsah.com/api |

## Configuration VPS

| Parametre | Valeur |
|-----------|--------|
| Dossier | `/opt/portfolio` |
| Container App | `portfolio-app` |
| Container Redis | `portfolio-redis` |
| Port interne | 3000 |

## Premiere configuration admin

1. Aller sur https://emacsah.com/cms
2. Creer le premier utilisateur admin
3. Configurer les parametres du site
4. Creer les premieres entrees (Bio, Experiences)

## Commandes utiles

```bash
# Voir les logs
docker compose -f /opt/portfolio/docker-compose.yml logs -f app

# Redemarrer
docker compose -f /opt/portfolio/docker-compose.yml restart app

# Deploiement rapide
/opt/portfolio/scripts/deploy.sh

# Backup database
docker exec db-karlandklaude pg_dump -U folio_sah payload_portfolio > backup.sql
```

## CI/CD

Le deploiement automatique est configure via GitHub Actions :
- Push sur `main` -> Build & Deploy automatique
- Les secrets sont configures dans le repository

---

*Deploye le 2025-12-30*
