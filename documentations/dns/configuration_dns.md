# Configuration DNS - emacsah.com

**Date** : 2025-12-30
**IP VPS** : 180.149.199.86

---

## Enregistrements à créer chez le registrar LWS

### Enregistrements A (IPv4)

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | 180.149.199.86 | 3600 |
| A | folio | 180.149.199.86 | 3600 |
| A | www | 180.149.199.86 | 3600 |

### Enregistrements AAAA (IPv6) - Optionnel
Si ton VPS a une IPv6, ajoute les enregistrements équivalents.

---

## Vérification

Après configuration (propagation 5-30 min), vérifier avec :

```bash
# Vérifier la résolution DNS
dig emacsah.com +short
dig folio.emacsah.com +short
dig www.emacsah.com +short

# Ou avec nslookup
nslookup emacsah.com
nslookup folio.emacsah.com
```

### Résultat attendu
Toutes les commandes doivent retourner : `180.149.199.86`

---

## Checklist

- [x] Enregistrement A pour @ (racine) créé
- [x] Enregistrement A pour folio créé
- [x] Enregistrement A pour www créé (alias CNAME vers @)
- [x] Propagation vérifiée avec `nslookup`
- [ ] **IMPORTANT** : Supprimer l'ancien enregistrement A (213.255.195.48) pour @
- [ ] Test accès HTTP vers le VPS

---

## Troubleshooting

### La propagation prend du temps
- Attendre 5-30 minutes (parfois jusqu'à 48h pour certains registrars)
- Utiliser https://dnschecker.org pour vérifier la propagation mondiale

### Erreur "NXDOMAIN"
- Vérifier que le domaine est bien actif chez le registrar
- Vérifier les nameservers configurés

### Le domaine pointe vers une mauvaise IP
- Supprimer les anciens enregistrements A conflictuels
- Vérifier qu'il n'y a pas de proxy Cloudflare actif (nuage orange)
