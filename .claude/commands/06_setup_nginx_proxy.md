# Configuration Nginx Proxy Manager

## Description
Configure le reverse proxy et le certificat SSL pour emacsah.com dans Nginx Proxy Manager.

## Paramètres requis
- $SSH_CONNECTION : Connexion SSH (ex: root@emacsah.com)
- $NPM_ADMIN_URL : URL de l'admin NPM (ex: http://180.149.199.86:81)
- $DOMAIN : emacsah.com
- $ADMIN_EMAIL : Email pour le certificat SSL

## Instructions

1. Vérifie d'abord que le DNS est propagé :

```bash
ssh $SSH_CONNECTION "dig emacsah.com +short"
```

Le résultat doit afficher l'IP du VPS (180.149.199.86).

2. Vérifie que le container est accessible localement :

```bash
ssh $SSH_CONNECTION "curl -s http://localhost:3000/api/health"
```

Le résultat doit afficher `{"status":"ok",...}`.

3. Crée le fichier `documentations/nginx/npm_configuration.md` :

```markdown
# Configuration Nginx Proxy Manager

## Accès à l'interface admin

- **URL** : http://180.149.199.86:81
- **Credentials par défaut** (première connexion) :
  - Email: admin@example.com
  - Password: changeme

**Changer le mot de passe immédiatement après la première connexion !**

---

## Ajouter le Proxy Host pour emacsah.com

1. Aller dans **Hosts** → **Proxy Hosts**
2. Cliquer sur **Add Proxy Host**

### Onglet "Details"

| Champ | Valeur |
|-------|--------|
| Domain Names | `emacsah.com`, `www.emacsah.com` |
| Scheme | `http` |
| Forward Hostname / IP | `portfolio-app` ou `172.17.0.1` |
| Forward Port | `3000` |
| Cache Assets | Activé |
| Block Common Exploits | Activé |
| Websockets Support | Activé |

### Onglet "SSL"

| Champ | Valeur |
|-------|--------|
| SSL Certificate | Request a new SSL Certificate |
| Force SSL | Activé |
| HTTP/2 Support | Activé |
| HSTS Enabled | Activé |
| Email Address | votre-email@domain.com |
| I Agree to the Let's Encrypt Terms | Activé |

3. Cliquer sur **Save**

---

## Configuration avancée (optionnel)

Dans l'onglet **Advanced** :

```nginx
# Augmenter la taille max des uploads
client_max_body_size 50M;

# Headers de sécurité
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;

# Cache pour les assets statiques
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

---

## Connexion des réseaux Docker

Si NPM ne peut pas résoudre le container :

```bash
# Lister les réseaux
docker network ls

# Connecter NPM au réseau portfolio
docker network connect portfolio-network nginx-proxy-manager
```

---

## Vérification

### Test SSL
```bash
curl -I https://emacsah.com
```

### Test certificat
```bash
echo | openssl s_client -connect emacsah.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Test API
```bash
curl https://emacsah.com/api/health
```

### Test Admin
Ouvrir https://emacsah.com/cms dans le navigateur

---

## Troubleshooting

### Erreur "Bad Gateway" (502)
- Vérifier que le container est running : `docker ps | grep portfolio`
- Vérifier les logs : `docker compose logs app`
- Vérifier la connectivité réseau

### Erreur certificat SSL
- Vérifier que le DNS pointe vers le VPS
- Vérifier que les ports 80 et 443 sont ouverts
- Consulter les logs NPM : `docker logs nginx-proxy-manager`
```

4. Affiche les instructions pour accéder à NPM et configurer le proxy manuellement.
