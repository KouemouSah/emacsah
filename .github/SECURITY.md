# Politique de Securite

## Versions supportees

| Version | Supportee          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Signaler une vulnerabilite

Si vous decouvrez une vulnerabilite de securite, merci de :

1. **Ne pas** ouvrir une issue publique
2. Envoyer un email a : security@emacsah.com
3. Inclure :
   - Description de la vulnerabilite
   - Etapes pour reproduire
   - Impact potentiel
   - Suggestions de correction (si possible)

## Delai de reponse

- Accusee de reception : 48h
- Premiere evaluation : 7 jours
- Correction : selon la severite

## Processus de divulgation

1. Vous signalez la vulnerabilite en prive
2. Nous confirmons et evaluons le probleme
3. Nous developpons un correctif
4. Nous publions le correctif
5. Nous vous creditons (si vous le souhaitez)

## Bonnes pratiques

Ce projet suit les bonnes pratiques de securite :

- Dependances mises a jour regulierement (Dependabot)
- Analyse de code statique (CodeQL)
- Scan des images Docker (Trivy)
- Variables sensibles dans les secrets GitHub
- HTTPS obligatoire en production
