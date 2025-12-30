# Configuration Base de Données PostgreSQL

## Description
Crée la base de données et l'utilisateur dédiés pour Payload CMS dans le conteneur PostgreSQL existant.

## Paramètres requis
- $SSH_CONNECTION : root@IP_VPS

## Paramètres optionnels
- $DB_PASSWORD : Mot de passe pour l'utilisateur payload (sera généré automatiquement si non fourni)
- POSTGRES_DB=karlandklaude
- POSTGRES_USER=christy
- POSTGRES_PASSWORD=kak@25
- POSTGRES_PORT=5432
- PGDATA=/var/lib/postgresql/data/pgdata
- si les informations sont exact créer un fichier .env pour sauvegarder cela

## Instructions

1. Si `$DB_PASSWORD` n'est pas fourni, génère un mot de passe sécurisé de 32 caractères alphanumériques et stocke-le dans une variable.

2. Connecte-toi au VPS via SSH : `$SSH_CONNECTION`

3. Vérifie d'abord le nom exact du conteneur PostgreSQL :

```bash
docker ps --format "table {{.Names}}\t{{.Image}}" | grep postgres
```

4. Exécute les commandes suivantes pour créer la base de données (adapte le nom du conteneur si différent de `db-karlandklaude`) :

```bash
# Créer l'utilisateur et la base de données
docker exec -it db-karlandklaude psql -U odoo << 'EOSQL'
-- Créer l'utilisateur payload
CREATE USER payload WITH PASSWORD '$DB_PASSWORD';

-- Créer la base de données dédiée
CREATE DATABASE payload_portfolio 
    OWNER payload
    ENCODING 'UTF8'
    LC_COLLATE 'en_US.utf8'
    LC_CTYPE 'en_US.utf8'
    TEMPLATE template0;

-- Accorder tous les privilèges
GRANT ALL PRIVILEGES ON DATABASE payload_portfolio TO payload;

-- Connexion à la nouvelle base pour configurer le schema
\c payload_portfolio

-- Accorder les droits sur le schema public (requis PostgreSQL 15+)
GRANT ALL ON SCHEMA public TO payload;
GRANT CREATE ON SCHEMA public TO payload;

-- Vérification
\l payload_portfolio
\du payload
EOSQL
```

5. Vérifie que la connexion fonctionne avec le nouvel utilisateur :

```bash
docker exec -it db-karlandklaude psql -U payload -d payload_portfolio -c "\conninfo"
```

6. Crée le dossier `documentations/database/` s'il n'existe pas.

7. Sauvegarde les informations de connexion dans `documentations/database/credentials.md` :

```markdown
# Credentials Base de Données - CONFIDENTIEL

⚠️ **NE PAS COMMITER CE FICHIER - AJOUTÉ AU .gitignore**

## PostgreSQL - Payload CMS

| Paramètre | Valeur |
|-----------|--------|
| Host (Docker) | db-karlandklaude |
| Host (externe) | localhost ou IP_VPS |
| Port | 5432 |
| Database | payload_portfolio |
| User | payload |
| Password | $DB_PASSWORD |

---

## Connection Strings

### Depuis un container Docker (même réseau)
```
postgresql://payload:$DB_PASSWORD@db-karlandklaude:5432/payload_portfolio
```

### Depuis l'hôte VPS
```
postgresql://payload:$DB_PASSWORD@localhost:5432/payload_portfolio
```

---

## Commandes utiles

### Accès console psql
```bash
docker exec -it db-karlandklaude psql -U payload -d payload_portfolio
```

### Backup de la base
```bash
docker exec db-karlandklaude pg_dump -U payload payload_portfolio > backup_$(date +%Y%m%d).sql
```

### Restore de la base
```bash
cat backup.sql | docker exec -i db-karlandklaude psql -U payload -d payload_portfolio
```

---

## Vérification santé

```bash
docker exec db-karlandklaude pg_isready -U payload -d payload_portfolio
```

---

*Généré le [DATE_DU_JOUR]*
```

8. Mets à jour le fichier `.gitignore` à la racine du projet pour exclure les credentials :

```gitignore
# Credentials - NE JAMAIS COMMITER
documentations/database/credentials.md
.env
.env.local
.env.production
.env*.local

# Secrets
*.pem
*.key
secrets/
```

9. Affiche un rapport de succès avec :
   - Confirmation de création de la base
   - Connection string (sans le mot de passe en clair dans le terminal)
   - Rappel que les credentials sont dans `documentations/database/credentials.md`
   - Prochaines étapes
