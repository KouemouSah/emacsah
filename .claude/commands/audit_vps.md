# Audit VPS pour projet Portfolio

## Description
Cette commande effectue un audit complet du VPS et génère un rapport structuré.

## Paramètres requis
- $SSH_CONNECTION : Connexion SSH au format user@host (ex: root@emacsah.com)

## Instructions

1. Connecte-toi au VPS via SSH avec la connexion fournie : $ssh root@180.149.199.86

2. Exécute le script d'audit suivant sur le VPS :
````bash
#!/bin/bash
echo "SYSTEM_INFO_START"
uname -a
cat /etc/os-release | grep -E "^(NAME|VERSION)=" 2>/dev/null
echo "SYSTEM_INFO_END"

echo "NODEJS_START"
node -v 2>/dev/null || echo "NON_INSTALLE"
npm -v 2>/dev/null || echo "NON_INSTALLE"
echo "NODEJS_END"

echo "POSTGRESQL_START"
psql --version 2>/dev/null || echo "CLI_NON_TROUVE"
sudo -u postgres psql -t -c "SELECT version();" 2>/dev/null | head -1
echo "POSTGRESQL_END"

echo "DATABASES_START"
sudo -u postgres psql -t -c "\l" 2>/dev/null
echo "DATABASES_END"

echo "NGINX_START"
nginx -v 2>&1
echo "NGINX_END"

echo "NGINX_SITES_START"
ls /etc/nginx/sites-enabled/ 2>/dev/null
echo "NGINX_SITES_END"

echo "NGINX_CONFIG_START"
cat /etc/nginx/sites-enabled/* 2>/dev/null
echo "NGINX_CONFIG_END"

echo "PORTS_START"
sudo ss -tlnp 2>/dev/null
echo "PORTS_END"

echo "DOCKER_START"
docker --version 2>/dev/null || echo "NON_INSTALLE"
docker ps 2>/dev/null
echo "DOCKER_END"

echo "MEMORY_START"
free -h
echo "MEMORY_END"

echo "DISK_START"
df -h /
echo "DISK_END"

echo "SSL_START"
certbot --version 2>/dev/null || echo "NON_INSTALLE"
sudo ls /etc/letsencrypt/live/ 2>/dev/null || echo "AUCUN_CERTIFICAT"
echo "SSL_END"

echo "SERVICES_START"
sudo systemctl list-units --type=service --state=running | grep -E "(odoo|nginx|postgres|redis|node)" 2>/dev/null
echo "SERVICES_END"

echo "PYTHON_START"
python3 --version 2>/dev/null
echo "PYTHON_END"
````

3. Analyse les résultats et génère un rapport structuré au format suivant dans le fichier `documentations/vps/rapport_audit.md` :

## Format du rapport à générer
````markdown
# Rapport d'Audit VPS - Portfolio EMACSAH

**Date de l'audit** : [DATE_DU_JOUR]
**Serveur** : [IP_OU_DOMAINE]
**Objectif** : Préparation déploiement CMS Portfolio

---

## 1. Résumé Exécutif

### État général
| Composant | Status | Version | Action requise |
|-----------|--------|---------|----------------|
| Système | ✅/⚠️/❌ | [VERSION] | [ACTION] |
| Node.js | ✅/⚠️/❌ | [VERSION] | [ACTION] |
| PostgreSQL | ✅/⚠️/❌ | [VERSION] | [ACTION] |
| Nginx | ✅/⚠️/❌ | [VERSION] | [ACTION] |
| SSL/Certbot | ✅/⚠️/❌ | [VERSION] | [ACTION] |
| Docker | ✅/⚠️/❌ | [VERSION] | [ACTION] |

### Verdict global
[RESUME EN 2-3 PHRASES]

---

## 2. Détail Système

### OS et Kernel
- **Distribution** : [NOM]
- **Version** : [VERSION]
- **Kernel** : [KERNEL]

### Ressources
| Ressource | Disponible | Utilisé | Statut |
|-----------|------------|---------|--------|
| RAM | [TOTAL] | [USED] | ✅/⚠️ |
| Disque | [TOTAL] | [USED] | ✅/⚠️ |

---

## 3. Services Existants

### PostgreSQL
- **Version** : [VERSION]
- **Bases existantes** :
  | Nom | Owner | Encoding | Taille |
  |-----|-------|----------|--------|
  | [DB] | [OWNER] | [ENC] | [SIZE] |

- **Recommandation** : [CREER_NOUVELLE_DB ou REUTILISER]

### Nginx
- **Version** : [VERSION]
- **Sites configurés** :
  - [LISTE DES SITES]
- **Configuration Odoo détectée** : Oui/Non

### Certificats SSL
- **Certbot** : [VERSION ou NON_INSTALLE]
- **Domaines certifiés** :
  - [LISTE]
- **Action pour folio.emacsah.com** : [A_CREER ou EXISTANT]

---

## 4. Composants à Installer

### Requis
| Composant | Commande d'installation |
|-----------|------------------------|
| [COMP] | `[COMMANDE]` |

### Optionnels (recommandés)
| Composant | Usage | Commande |
|-----------|-------|----------|
| [COMP] | [USAGE] | `[CMD]` |

---

## 5. Configuration Réseau

### Ports en écoute
| Port | Service | État |
|------|---------|------|
| [PORT] | [SERVICE] | ✅ Actif |

### Ports nécessaires pour le projet
| Port | Service | Statut actuel |
|------|---------|---------------|
| 3001 | Payload CMS API | ⚠️ À configurer |
| 443 | HTTPS (folio.emacsah.com) | [STATUT] |

---

## 6. Plan d'Action

### Étape 1 : Prérequis système
```bash
# Commandes à exécuter
[COMMANDES]
```

### Étape 2 : Configuration PostgreSQL
```bash
[COMMANDES]
```

### Étape 3 : Configuration Nginx
```bash
[COMMANDES]
```

### Étape 4 : Certificat SSL
```bash
[COMMANDES]
```

---

## 7. Risques et Points d'Attention

| Risque | Impact | Mitigation |
|--------|--------|------------|
| [RISQUE] | [IMPACT] | [SOLUTION] |

---

## 8. Prochaines Étapes

1. [ ] [ETAPE 1]
2. [ ] [ETAPE 2]
3. [ ] [ETAPE 3]

---

*Rapport généré automatiquement par Claude Code*
````

4. Crée le dossier `documentations/vps/` s'il n'existe pas avant de sauvegarder le rapport.

5. Après avoir sauvegardé le rapport, affiche un résumé des points critiques identifiés.