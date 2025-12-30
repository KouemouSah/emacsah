# Configuration DNS pour emacsah.com

## Description
Configure les enregistrements DNS pour faire pointer emacsah.com et folio.emacsah.com vers le VPS.

## Paramètres requis
- $DOMAIN : emacsah.com
- $VPS_IP : 180.149.199.86
- Configuré : les enregistrements A @ $vps_ip , A folio $vps_ip ont été réalisés avec succès

## Instructions

1. Crée le dossier `documentations/dns/` s'il n'existe pas.

2. Génère un guide de configuration DNS et sauvegarde-le dans `documentations/dns/configuration_dns.md` avec le contenu suivant (en remplaçant les variables) :

```markdown
# Configuration DNS - $DOMAIN

**Date** : [DATE_DU_JOUR]
**IP VPS** : $VPS_IP

---

## Enregistrements à créer chez le registrar LWS

### Enregistrements A (IPv4)

| Type | Nom | Valeur | TTL | 
|------|-----|--------|-----|
| A | @ | $VPS_IP | 3600 |
| A | folio | $VPS_IP | 3600 |
| A | www | $VPS_IP | 3600 |

### Enregistrements AAAA (IPv6) - Optionnel
Si ton VPS a une IPv6, ajoute les enregistrements équivalents.

---

## Vérification

Après configuration (propagation 5-30 min), vérifier avec :

```bash
# Vérifier la résolution DNS
dig $DOMAIN +short
dig folio.$DOMAIN +short
dig www.$DOMAIN +short

# Ou avec nslookup
nslookup $DOMAIN
nslookup folio.$DOMAIN
```

### Résultat attendu
Toutes les commandes doivent retourner : `$VPS_IP`

---

## Checklist

- [ ] Enregistrement A pour @ (racine) créé
- [ ] Enregistrement A pour folio créé  
- [ ] Enregistrement A pour www créé
- [ ] Propagation vérifiée avec `dig`
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
```

3. Affiche un résumé des actions à effectuer manuellement chez le registrar.

4. Propose de vérifier la propagation DNS avec une commande de test.
