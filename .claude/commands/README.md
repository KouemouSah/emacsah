# Commandes Claude Code - Portfolio CMS

## Vue d'ensemble

Ce dossier contient les commandes Claude Code pour configurer et déployer le Portfolio avec Next.js + Payload CMS intégré.

**Architecture unifiée** : Une seule application Next.js avec Payload CMS intégré, déployée sur le VPS à emacsah.com.

## Ordre d'exécution recommandé

Exécute les commandes dans cet ordre pour un déploiement complet :

| # | Commande | Description |
|---|----------|-------------|
| 0 | `/audit_vps` | Audit de l'infrastructure VPS |
| 1 | `/01_setup_dns` | Configuration des enregistrements DNS |
| 2 | `/02_setup_database` | Création de la base PostgreSQL |
| 3 | `/03_setup_payload_project` | Initialisation du projet Next.js + Payload |
| 4 | `/04_setup_docker` | Configuration Docker optimisée |
| 5 | `/05_setup_github_actions` | Pipeline CI/CD GitHub |
| 6 | `/06_setup_nginx_proxy` | Configuration reverse proxy + SSL |
| 7 | `/07_deploy` | Déploiement en production |
| 8 | `/08_setup_wysiwyg_editor` | Éditeur WYSIWYG HTML complet |
| 9 | `/09_setup_contact_email` | Formulaire contact + envoi email |

---

## Liste des commandes

### `audit_vps.md`
Effectue un audit complet du VPS et génère un rapport structuré.

```bash
/audit_vps SSH_CONNECTION=root@emacsah.com
```

### `01_setup_dns.md`
Génère la documentation pour configurer les enregistrements DNS.

```bash
/01_setup_dns DOMAIN=emacsah.com VPS_IP=180.149.199.86
```

### `02_setup_database.md`
Crée la base de données et l'utilisateur PostgreSQL.

```bash
/02_setup_database SSH_CONNECTION=root@emacsah.com
```

### `03_setup_payload_project.md`
Initialise le projet Next.js + Payload CMS unifié avec toutes les collections.

```bash
/03_setup_payload_project
```

### `04_setup_docker.md`
Crée les fichiers Docker optimisés (image ~200MB).

```bash
/04_setup_docker
```

### `05_setup_github_actions.md`
Configure les workflows GitHub Actions pour CI/CD.

```bash
/05_setup_github_actions
```

### `06_setup_nginx_proxy.md`
Guide de configuration Nginx Proxy Manager pour SSL et reverse proxy.

```bash
/06_setup_nginx_proxy SSH_CONNECTION=root@emacsah.com DOMAIN=emacsah.com
```

### `07_deploy.md`
Déploie l'application en production sur le VPS.

```bash
/07_deploy SSH_CONNECTION=root@emacsah.com DEPLOY_TYPE=full
```

### `08_setup_wysiwyg_editor.md`
Configure l'éditeur WYSIWYG HTML complet avec blocs personnalisés.

### `09_setup_contact_email.md`
Configure le formulaire de contact avec envoi d'email via Resend.

---

## Architecture cible

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Nginx Proxy Manager │
                    │  (SSL / Reverse Proxy)│
                    └─────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         VPS                                  │
│                    emacsah.com                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────────────────────────────────────────┐       │
│   │          Next.js + Payload CMS                   │       │
│   │          (Application unifiée)                   │       │
│   │          Port 3000                               │       │
│   │                                                  │       │
│   │   /           → Frontend React + Tailwind       │       │
│   │   /cms        → Payload Admin Panel             │       │
│   │   /api/*      → Payload REST API                │       │
│   └─────────────────────────────────────────────────┘       │
│              │                           │                   │
│              ▼                           ▼                   │
│   ┌──────────────────┐      ┌──────────────────┐            │
│   │   PostgreSQL     │      │     Redis        │            │
│   │   (db existante) │      │     (cache)      │            │
│   └──────────────────┘      └──────────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Documentation générée

Chaque commande génère de la documentation dans le dossier `documentations/` :

```
documentations/
├── dns/
│   └── configuration_dns.md
├── database/
│   └── credentials.md          # Ne pas commiter
├── docker/
│   └── guide.md
├── github/
│   └── secrets_setup.md
├── nginx/
│   └── npm_configuration.md
├── vps/
│   └── rapport_audit.md
└── deployment/
    └── checklist.md
```

---

## Fichiers sensibles

Ces fichiers ne doivent **JAMAIS** être commités :

- `documentations/database/credentials.md`
- `.env`
- `.env.local`
- `.env.production`

---

## Maintenance

### Mise à jour rapide
```bash
/07_deploy SSH_CONNECTION=root@emacsah.com DEPLOY_TYPE=update
```

### Logs
```bash
ssh root@emacsah.com "docker compose -f /opt/portfolio/docker-compose.yml logs -f app"
```

### Backup
```bash
ssh root@emacsah.com "/opt/portfolio/scripts/backup.sh"
```

---

## Troubleshooting

En cas de problème :
1. Consulter les logs : `docker compose logs app`
2. Vérifier le health check : `curl http://localhost:3000/api/health`
3. Relancer les containers : `docker compose up -d --force-recreate`
