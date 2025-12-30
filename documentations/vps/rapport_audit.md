# Rapport d'Audit VPS - Portfolio EMACSAH

**Date de l'audit** : 30 décembre 2025
**Serveur** : IP_vps (emacsah.com)
**Objectif** : Préparation déploiement CMS Portfolio (Payload CMS)

---

## 1. Résumé Exécutif

### État général
| Composant | Status | Version | Action requise |
|-----------|--------|---------|----------------|
| Système | ✅ | Debian 12 (bookworm) | Aucune |
| Node.js | ❌ | Non installé | **Installation requise** |
| PostgreSQL | ⚠️ | 15 (via Docker) | Créer base dédiée |
| Nginx | ⚠️ | Via Nginx Proxy Manager | Configurer proxy |
| SSL/Certbot | ⚠️ | Géré par NPM | Créer certificat folio.emacsah.com |
| Docker | ✅ | 28.3.2 | Aucune |

### Verdict global
Le VPS est fonctionnel avec une infrastructure Docker existante (Odoo, Nginx Proxy Manager). **Node.js n'est pas installé** sur le système hôte, ce qui est requis pour Payload CMS. Deux options : installer Node.js nativement ou déployer Payload CMS via Docker (recommandé pour cohérence avec l'infrastructure existante).

---

## 2. Détail Système

### OS et Kernel
- **Distribution** : Debian GNU/Linux
- **Version** : 12 (bookworm)
- **Kernel** : 6.1.0-38-cloud-amd64

### Ressources
| Ressource | Total | Utilisé | Disponible | Statut |
|-----------|-------|---------|------------|--------|
| RAM | 7,8 Gi | 1,3 Gi | 6,4 Gi | ✅ Excellent |
| Disque | 148 Go | 12 Go (8%) | 131 Go | ✅ Excellent |

---

## 3. Services Existants

### Docker Containers
| Container | Image | Ports | Status |
|-----------|-------|-------|--------|
| nginx-proxy-manager | jc21/nginx-proxy-manager:latest | 80, 81, 443 | ✅ Up 3 months |
| odoo17-karlandklaude | odoo:17 | 8071→8069, 8072 | ✅ Up 7 weeks |
| db-karlandklaude | postgres:15 | 5432 (interne) | ✅ Up 3 months |
| nginxpm-db | mariadb:10.5 | 3306 (interne) | ✅ Up 3 months |

### PostgreSQL
- **Version** : 15 (conteneur Docker)
- **Accès** : Interne au réseau Docker uniquement
- **Base existante** : Utilisée par Odoo
- **Recommandation** : Créer une nouvelle base dédiée pour Payload CMS ou utiliser le conteneur postgres existant

### Nginx Proxy Manager
- **Version** : Latest (jc21/nginx-proxy-manager)
- **Interface Admin** : Port 81
- **Gestion SSL** : Intégrée (Let's Encrypt)
- **Sites probables** : karlandklaude.com → Odoo

### Certificats SSL
- **Certbot** : Non installé (géré via NPM)
- **Domaines certifiés** : Gérés dans Nginx Proxy Manager
- **Action pour folio.emacsah.com** : À créer via NPM

---

## 4. Composants à Installer

### Option A : Installation Native (Node.js sur l'hôte)
| Composant | Commande d'installation |
|-----------|------------------------|
| Node.js 20 LTS | `curl -fsSL https://deb.nodesource.com/setup_20.x \| sudo -E bash - && sudo apt install -y nodejs` |
| PM2 | `npm install -g pm2` |
| PostgreSQL Client | `sudo apt install -y postgresql-client` |

### Option B : Déploiement Docker (Recommandé)
| Composant | Usage |
|-----------|-------|
| Image Node.js | Container pour Payload CMS |
| Réseau Docker | Connecter à postgres existant |
| Volume | Persistance des uploads |

### Optionnels (recommandés)
| Composant | Usage | Commande |
|-----------|-------|----------|
| htop | Monitoring | `sudo apt install -y htop` |
| git | Gestion code | `sudo apt install -y git` |

---

## 5. Configuration Réseau

### Ports en écoute
| Port | Service | État |
|------|---------|------|
| 22 | SSH | ✅ Actif |
| 53 | DNS (systemd-resolve) | ✅ Actif |
| 80 | HTTP (NPM) | ✅ Actif |
| 81 | NPM Admin | ✅ Actif |
| 443 | HTTPS (NPM) | ✅ Actif |
| 8071 | Odoo Web | ✅ Actif |
| 8072 | Odoo Longpolling | ✅ Actif |

### Ports nécessaires pour le projet
| Port | Service | Statut actuel |
|------|---------|---------------|
| 3001 | Payload CMS API | ⚠️ Libre - À configurer |
| 443 | HTTPS (folio.emacsah.com) | ⚠️ Via NPM - À configurer |

---

## 6. Plan d'Action

### Étape 1 : Prérequis DNS
```bash
# Ajouter un enregistrement DNS A pour folio.emacsah.com
# Pointant vers IP
```

### Étape 2 : Créer la base PostgreSQL
```bash
# Se connecter au conteneur postgres
docker exec -it db-karlandklaude psql -U odoo

# Dans psql, créer la base et l'utilisateur
CREATE USER payload WITH PASSWORD 'votre_mot_de_passe_securise';
CREATE DATABASE payload_portfolio OWNER payload;
GRANT ALL PRIVILEGES ON DATABASE payload_portfolio TO payload;
\q
```

### Étape 3A : Installation Native Node.js
```bash
# Installer Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Vérifier l'installation
node -v
npm -v

# Installer PM2 pour la gestion du processus
npm install -g pm2
```

### Étape 3B : Alternative Docker (Recommandé)
```bash
# Créer un Dockerfile pour Payload CMS
# Ou utiliser docker-compose avec l'image node:20-alpine
```

### Étape 4 : Configuration Nginx Proxy Manager
```
1. Accéder à http://IP
2. Se connecter (admin@example.com / changeme par défaut)
3. Ajouter un Proxy Host :
   - Domain: folio.emacsah.com
   - Forward Hostname: localhost (ou container_name si Docker)
   - Forward Port: 3001
   - SSL: Request a new SSL Certificate (Let's Encrypt)
   - Force SSL: Oui
```

### Étape 5 : Déploiement Payload CMS
```bash
# Cloner le projet
cd /opt
git clone <votre-repo-payload> portfolio

# Installer les dépendances
cd portfolio
npm install

# Configurer les variables d'environnement
cp .env.example .env
nano .env
# DATABASE_URI=postgres://payload:password@localhost:5432/payload_portfolio
# PAYLOAD_SECRET=votre_secret
# etc.

# Build et démarrer
npm run build
pm2 start npm --name "payload-portfolio" -- start
pm2 save
pm2 startup
```

---

## 7. Risques et Points d'Attention

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Conflit de ports | Moyen | Le port 3001 est libre, pas de conflit prévu |
| Base de données partagée | Faible | Créer un utilisateur/base dédiés pour isolation |
| Ressources mémoire | Faible | 6.4 Go disponibles, largement suffisant |
| Compatibilité Node.js/Odoo | Nul | Environnements isolés |
| SSL non configuré | Moyen | Utiliser NPM pour génération automatique |

---

## 8. Prochaines Étapes

1. [ ] Configurer l'enregistrement DNS pour folio.emacsah.com
2. [ ] Créer la base de données PostgreSQL dédiée
3. [ ] Installer Node.js 20 LTS (ou préparer Docker)
4. [ ] Cloner et configurer le projet Payload CMS
5. [ ] Configurer le proxy dans Nginx Proxy Manager
6. [ ] Générer le certificat SSL pour folio.emacsah.com
7. [ ] Tester le déploiement
8. [ ] Configurer PM2 pour le démarrage automatique

---

## 9. Informations de Connexion

| Service | URL/Port | Notes |
|---------|----------|-------|
| SSH | `ssh root@IP` | Port 22 |
| NPM Admin | `http://IP` | Interface de gestion |
| Odoo | `https://emacsah.com` (probable) | Via NPM |
| Payload (futur) | `https://folio.emacsah.com` | Port 3001 en interne |

---

*Rapport généré automatiquement par Claude Code*
