# Plan d'Implémentation - Portfolio EMACSAH

**Date de création**: 5 janvier 2026
**Basé sur**: `.claude/specs/01_database_schema.md`
**Statut**: À implémenter

---

## RAPPORT D'ANALYSE CRITIQUE

### État actuel vs Spécifications

| Aspect | Actuel | Cible (Spec) | Écart |
|--------|--------|--------------|-------|
| **Collections** | 9 | 21 | -12 |
| **Globals** | 0 | 2 | -2 |
| **Relations N:N** | 1 (categories) | 5 | -4 |
| **Bilingue** | Partiel | Complet | Incomplet |
| **Pages frontend** | 6 basiques | 6 complètes | Fonctionnalités manquantes |

### Problèmes critiques identifiés

1. **Collections manquantes (12):**
   - project_stakeholders
   - project_links
   - project_gallery
   - project_technologies (relation N:N)
   - project_categories (relation N:N)
   - article_categories (relation N:N)
   - article_tags (relation N:N)
   - tags
   - comments
   - contact_messages
   - experience_technologies (relation N:N)
   - site_settings (global)

2. **Collections existantes incomplètes:**
   - Projects: manque business_context, problem_solved, impacts, architecture, stakeholders, links, gallery
   - Articles: manque draft_content, comments relation
   - Bio: manque tagline, intro, story bilingues, CVs FR/EN
   - Experiences: manque company_logo, type, remote, technologies relation
   - Categories: manque bilingue, color, icon, order
   - Users: manque avatar, locale

3. **Décalage DB actuelle vs schéma cible:**
   - Table `projects` a anciens champs (context_fr, challenges_fr) vs spec (business_context_fr, problem_solved_fr)
   - Nécessite migration complète

4. **Frontend incomplet:**
   - Page d'accueil = simple redirect
   - Pas de filtres sur listes
   - Pas de commentaires
   - Pas de recherche

---

## STRATÉGIE D'IMPLÉMENTATION

### Approche recommandée: Migration propre

**Option choisie**: Recréer le schéma DB selon les specs et réimporter les données.

**Justification**:
- La DB actuelle a peu de données (environnement de dev)
- Écart trop important entre actuel et cible
- Plus rapide que des migrations incrémentales

---

## PHASE 0 : PRÉPARATION (Jour 1)

### Objectif
Préparer l'environnement et nettoyer le code cassé.

### 0.1 Nettoyage du code

| Tâche | Fichier | Action |
|-------|---------|--------|
| Supprimer migrations cassées | `src/migrations/*` | Supprimer dossier |
| Vérifier payload.config.ts | `src/payload.config.ts` | Retirer imports migrations |

### 0.2 Backup des données actuelles

```bash
# Sur VPS
ssh root@180.149.199.86 "docker exec db-karlandklaude pg_dump -U folio_sah payload_portfolio > /opt/backup_$(date +%Y%m%d).sql"
```

### 0.3 Documentation de l'existant

- [ ] Lister les projets existants dans la DB
- [ ] Lister les articles existants
- [ ] Exporter les médias uploadés

### Critères de succès Phase 0
- [ ] Dossier migrations supprimé
- [ ] Backup de la DB réalisé
- [ ] Build local passe (`pnpm build`)

---

## PHASE 1 : COLLECTIONS PAYLOAD (Semaine 1)

### Objectif
Implémenter toutes les collections selon le schéma de référence.

### 1.1 Globals (2 fichiers)

#### `src/globals/SiteSettings.ts`

```typescript
// Champs selon spec 01_database_schema.md section 20:
- site_name: text (default 'EMACSAH')
- site_tagline_fr: text
- site_tagline_en: text
- logo: upload → media
- favicon: upload → media
- default_meta_title_fr: text
- default_meta_title_en: text
- default_meta_description_fr: textarea
- default_meta_description_en: textarea
- og_image: upload → media
- twitter_handle: text
- linkedin_url: text
- github_url: text
- google_analytics_id: text
- plausible_domain: text
- comments_enabled: checkbox (default true)
- contact_form_enabled: checkbox (default true)
```

#### `src/globals/Contact.ts`

```typescript
// Champs simples pour coordonnées:
- email: email (required)
- phone: text
- address: textarea
- map_url: text
```

### 1.2 Collections de base (5 fichiers)

#### `src/collections/Users.ts` (mise à jour)

```typescript
// Ajouter aux champs existants:
+ avatar: upload → media
+ locale: select (fr, en) default 'fr'
// Payload gère: email, password_hash, created_at, updated_at
```

#### `src/collections/Media.ts` (mise à jour)

```typescript
// Ajouter aux champs existants:
+ alt_text_fr: text (remplace alt)
+ alt_text_en: text
+ blurhash: text
// Payload gère: filename, url, mime_type, filesize, width, height
```

#### `src/collections/Categories.ts` (mise à jour)

```typescript
// Refaire complètement selon spec:
- name_fr: text (required)
- name_en: text (required)
- slug: text (required, unique)
- description_fr: textarea
- description_en: textarea
- color: text (hex)
- icon: text (nom icône Lucide)
- order: number (default 0)
```

#### `src/collections/Technologies.ts` (vérifier)

```typescript
// Vérifier conformité:
- name: text (required, unique)
- slug: text (required, unique)
- category: select (frontend, backend, database, devops, ai_ml, mobile, tools, other)
- icon: upload → media
- color: text (hex)
- website: text
- order: number (default 0)
```

#### `src/collections/SocialLinks.ts` (mise à jour)

```typescript
// Ajouter:
+ is_active: checkbox (default true)
```

### 1.3 Collection Bio (1 fichier)

#### `src/collections/Bio.ts` (refaire)

```typescript
// Selon spec section 15:
- tagline_fr: text
- tagline_en: text
- intro_fr: textarea
- intro_en: textarea
- story_fr: richText (Lexical)
- story_en: richText (Lexical)
- avatar: upload → media
- cv_fr: upload → media
- cv_en: upload → media
- location: text
- timezone: text
- available_for_hire: checkbox (default true)
- meta_title_fr: text
- meta_title_en: text
- meta_description_fr: textarea
- meta_description_en: textarea
```

### 1.4 Collection Experiences (1 fichier)

#### `src/collections/Experiences.ts` (refaire)

```typescript
// Selon spec section 16:
- company: text (required)
- company_logo: upload → media
- company_url: text
- role_fr: text (required)
- role_en: text (required)
- type: select (fulltime, parttime, freelance, internship, apprenticeship)
- location: text
- remote: checkbox
- description_fr: richText
- description_en: richText
- achievements_fr: richText
- achievements_en: richText
- start_date: date (required)
- end_date: date
- is_current: checkbox
- order: number
- technologies: relationship → technologies (hasMany)
```

### 1.5 Collection Projects (1 fichier)

#### `src/collections/Projects.ts` (refaire complètement)

```typescript
// Selon spec section 5:

// Tab: Informations de base
- title_fr: text (required)
- title_en: text
- slug: text (required, unique)
- summary_fr: textarea (required)
- summary_en: textarea
- description_fr: richText
- description_en: richText
- featuredImage: upload → media (required)
- status: select (draft, review, published, archived)
- featured: checkbox
- order: number

// Tab: Contexte métier
- domain: text
- business_context_fr: richText
- business_context_en: richText
- problem_solved_fr: richText
- problem_solved_en: richText

// Tab: Impact
- societal_impact_fr: richText
- societal_impact_en: richText
- environmental_impact_fr: richText
- environmental_impact_en: richText
- benefits: array [{ benefit_fr, benefit_en }]

// Tab: Technique
- architecture_fr: richText
- architecture_en: richText
- architecture_diagram: upload → media
- github_url: text
- live_url: text
- technologies: relationship → technologies (hasMany)
- categories: relationship → categories (hasMany)

// Tab: Parties prenantes (array)
- stakeholders: array [
    { name, role (select), description_fr, description_en, logo (upload), website }
  ]

// Tab: Liens (array)
- links: array [
    { type (select), url, label_fr, label_en }
  ]

// Tab: Galerie (array)
- gallery: array [
    { image (upload, required), caption_fr, caption_en }
  ]

// Tab: SEO & IA
- meta_title_fr: text
- meta_title_en: text
- meta_description_fr: textarea
- meta_description_en: textarea
- og_image: upload → media
- ai_social_summary_fr: text
- ai_social_summary_en: text
- ai_generated_at: date

// Tab: Publication
- author: relationship → users
- published_at: date
```

### 1.6 Collection Articles (1 fichier)

#### `src/collections/Articles.ts` (compléter)

```typescript
// Selon spec section 11:

// Tab: Contenu
- title_fr: text (required)
- title_en: text
- slug: text (required, unique)
- excerpt_fr: textarea
- excerpt_en: textarea
- draft_content_fr: richText
- draft_content_en: richText
- content_fr: richText (required)
- content_en: richText

// Tab: Médias
- featuredImage: upload → media

// Tab: Métadonnées
- status: select (draft, ai_review, ready, published, archived)
- featured: checkbox
- reading_time: number
- views_count: number (default 0, admin readOnly)
- author: relationship → users
- categories: relationship → categories (hasMany)
- tags: array [{ tag: text }] // Simplifié vs table séparée

// Tab: SEO
- meta_title_fr: text
- meta_title_en: text
- meta_description_fr: textarea
- meta_description_en: textarea
- ai_social_summary_fr: text
- ai_social_summary_en: text
- ai_generated_at: date

// Tab: Publication
- published_at: date
```

### 1.7 Collection Comments (nouveau)

#### `src/collections/Comments.ts` (créer)

```typescript
// Selon spec section 14:
- article: relationship → articles (required)
- parent: relationship → comments (pour threads)
- author_name: text (required)
- author_email: email (required)
- author_website: text
- content: textarea (required)
- status: select (pending, approved, spam, deleted) default 'pending'
- ip_address: text (admin only)
- user_agent: text (admin only)
```

### 1.8 Collection ContactMessages (nouveau)

#### `src/collections/ContactMessages.ts` (créer)

```typescript
// Selon spec section 19:
- name: text (required)
- email: email (required)
- phone: text
- company: text
- subject: select (job, collaboration, freelance, technical, other)
- message: textarea (required)
- status: select (new, read, replied, archived, spam) default 'new'
- notes: textarea (admin only)
- ip_address: text (admin only)
- user_agent: text (admin only)
- email_sent: checkbox (default false)
- email_error: text
```

### 1.9 Mise à jour payload.config.ts

```typescript
import { SiteSettings } from './globals/SiteSettings'
import { Contact } from './globals/Contact'
import { Comments } from './collections/Comments'
import { ContactMessages } from './collections/ContactMessages'

export default buildConfig({
  // ...
  globals: [SiteSettings, Contact],
  collections: [
    Users,
    Media,
    Categories,
    Technologies,
    SocialLinks,
    Bio,
    Experiences,
    Projects,
    Articles,
    Comments,
    ContactMessages,
  ],
  // ...
})
```

### Critères de succès Phase 1
- [ ] Toutes les collections créées
- [ ] `pnpm build` passe sans erreur
- [ ] Admin CMS affiche toutes les collections
- [ ] Création d'un projet test réussie
- [ ] Création d'un article test réussie

---

## PHASE 2 : PAGES FRONTEND (Semaine 2)

### Objectif
Implémenter les 6 pages principales avec toutes leurs fonctionnalités.

### 2.1 Page d'accueil (`/`)

**Fichier**: `src/app/(frontend)/page.tsx`

**Sections à implémenter**:

1. **Hero Section**
   - Tagline depuis Bio
   - Photo avatar
   - Boutons CTA (Projets, Contact)

2. **Projets à la une**
   - 3 projets avec `featured: true`
   - Cards avec image, titre, résumé, domaine
   - Lien "Voir tous les projets"

3. **Derniers articles**
   - 3 articles récents publiés
   - Cards avec image, titre, extrait, date
   - Lien "Voir le blog"

4. **Technologies**
   - Grille des technologies groupées par catégorie
   - Icônes et niveaux de maîtrise

5. **CTA Contact**
   - Disponibilité depuis Bio
   - Bouton vers page contact

**Composants à créer**:
- `src/components/home/Hero.tsx`
- `src/components/home/FeaturedProjects.tsx`
- `src/components/home/RecentArticles.tsx`
- `src/components/home/TechStack.tsx`
- `src/components/home/ContactCTA.tsx`

### 2.2 Page Projets (`/projets`)

**Fichier**: `src/app/(frontend)/projets/page.tsx`

**Fonctionnalités**:

1. **Liste des projets**
   - Grille responsive
   - ProjectCard: image, titre, résumé, domaine, technologies badges

2. **Filtres** (Phase 3 optionnel)
   - Par catégorie (tabs)
   - Par technologie (multi-select)

**Composants**:
- `src/components/projects/ProjectCard.tsx`
- `src/components/projects/ProjectGrid.tsx`

### 2.3 Page Détail Projet (`/projets/[slug]`)

**Fichier**: `src/app/(frontend)/projets/[slug]/page.tsx`

**Sections**:

1. **Header**
   - Titre, résumé
   - Image principale
   - Domaine, statut
   - Technologies badges

2. **Contenu principal** (tabs ou sections)
   - Contexte métier
   - Problème résolu
   - Architecture technique (avec diagramme si présent)

3. **Impact** (si renseigné)
   - Impact sociétal
   - Impact environnemental
   - Bénéfices

4. **Parties prenantes**
   - Liste des stakeholders avec logos

5. **Galerie** (si images)
   - Carousel ou grille

6. **Liens**
   - GitHub, démo, docs, etc.

7. **Projets similaires** (même catégorie)

**Champs DB utilisés**:
- title_fr, summary_fr, featuredImage
- business_context_fr, problem_solved_fr
- architecture_fr, architecture_diagram
- societal_impact_fr, environmental_impact_fr, benefits
- stakeholders[], gallery[], links[]
- technologies, categories

### 2.4 Page Blog (`/blog`)

**Fichier**: `src/app/(frontend)/blog/page.tsx`

**Fonctionnalités**:

1. **Article featured**
   - En grand en haut si `featured: true`

2. **Liste articles**
   - Grille responsive
   - ArticleCard: image, titre, extrait, date, catégories, temps lecture

3. **Filtres** (Phase 3)
   - Par catégorie
   - Recherche texte

**Composants**:
- `src/components/blog/ArticleCard.tsx`
- `src/components/blog/FeaturedArticle.tsx`

### 2.5 Page Détail Article (`/blog/[slug]`)

**Fichier**: `src/app/(frontend)/blog/[slug]/page.tsx`

**Sections**:

1. **Header**
   - Titre, image principale
   - Auteur, date publication
   - Catégories, temps de lecture

2. **Contenu**
   - Rich text avec styles prose
   - Syntax highlighting pour code
   - Images intégrées

3. **Tags**

4. **Commentaires** (si activés)
   - Liste des commentaires approuvés
   - Formulaire pour nouveau commentaire

5. **Articles similaires**

**Champs DB utilisés**:
- title_fr, excerpt_fr, content_fr, featuredImage
- author, published_at, reading_time
- categories, tags
- comments (via relation)

### 2.6 Page À Propos (`/a-propos`)

**Fichier**: `src/app/(frontend)/a-propos/page.tsx`

**Sections**:

1. **Introduction**
   - Avatar, tagline, intro
   - Localisation, disponibilité

2. **Histoire**
   - Story en rich text

3. **Expériences**
   - Timeline chronologique
   - Pour chaque: entreprise, rôle, dates, description, technologies

4. **Compétences**
   - Technologies groupées par catégorie
   - Niveaux de maîtrise visuels

5. **CV téléchargeable**
   - Boutons FR et EN

**Champs DB utilisés**:
- Bio: tagline_fr, intro_fr, story_fr, avatar, location, available_for_hire, cv_fr, cv_en
- Experiences: company, role_fr, dates, description_fr, technologies

**Composants**:
- `src/components/about/Timeline.tsx`
- `src/components/about/SkillsGrid.tsx`
- `src/components/about/ExperienceCard.tsx`

### 2.7 Page Contact (`/contact`)

**Fichier**: `src/app/(frontend)/contact/page.tsx`

**Sections**:

1. **Informations de contact**
   - Email, téléphone, adresse
   - Liens réseaux sociaux

2. **Formulaire**
   - Champs: nom, email, téléphone, entreprise, sujet, message
   - Honeypot anti-spam
   - Validation côté client et serveur
   - Feedback succès/erreur

**API endpoint**: `src/app/api/contact/route.ts`
- Validation des données
- Sauvegarde en DB (ContactMessages)
- Envoi email (Resend ou autre)
- Rate limiting

**Composants**:
- `src/components/contact/ContactForm.tsx`
- `src/components/contact/ContactInfo.tsx`

### Critères de succès Phase 2
- [ ] Toutes les pages chargent sans erreur
- [ ] Page d'accueil affiche hero + sections
- [ ] Navigation fluide entre pages
- [ ] Formulaire contact fonctionne
- [ ] Responsive sur mobile/tablet/desktop
- [ ] Métadonnées SEO sur chaque page

---

## PHASE 3 : FONCTIONNALITÉS AVANCÉES (Semaine 3)

### 3.1 Filtres et recherche

**Projets**:
- [ ] Filtres par catégorie (tabs)
- [ ] Filtres par technologie (checkboxes)
- [ ] URL query params pour partage

**Blog**:
- [ ] Filtres par catégorie
- [ ] Recherche texte (titre, extrait)
- [ ] Pagination ou infinite scroll

### 3.2 Commentaires

- [ ] Formulaire de soumission
- [ ] Modération dans admin (status)
- [ ] Affichage des commentaires approuvés
- [ ] Threads (réponses)

### 3.3 Design System

**Tailwind config complet**:
- [ ] Palette couleurs complète
- [ ] Dégradés
- [ ] Animations (fadeIn, slideUp)
- [ ] Ombres colorées

**Composants UI**:
- [ ] Button (variants: primary, secondary, ghost)
- [ ] Card
- [ ] Badge
- [ ] Input, Textarea, Select

### 3.4 SEO & Performance

- [ ] Sitemap.xml dynamique
- [ ] robots.txt
- [ ] JSON-LD structured data
- [ ] OG images par page
- [ ] Optimisation images (next/image, blur placeholder)

### 3.5 Améliorations UX

- [ ] Loading states (skeletons)
- [ ] Transitions entre pages
- [ ] Animations au scroll
- [ ] Dark mode (optionnel)

### Critères de succès Phase 3
- [ ] Filtres fonctionnels sur projets et blog
- [ ] Commentaires fonctionnels
- [ ] Score Lighthouse > 90
- [ ] Design cohérent sur toutes les pages

---

## PHASE 4 : PRODUCTION (Semaine 4)

### 4.1 Migration de la base de données

```bash
# 1. Backup de l'ancienne DB
ssh root@180.149.199.86 "docker exec db-karlandklaude pg_dump -U folio_sah payload_portfolio > /opt/backup_old.sql"

# 2. Recréer la DB (Payload va créer le nouveau schéma)
ssh root@180.149.199.86 "docker exec db-karlandklaude psql -U folio_sah -c 'DROP DATABASE payload_portfolio; CREATE DATABASE payload_portfolio OWNER folio_sah;'"

# 3. Déployer la nouvelle version
# Le démarrage de l'app va créer les tables
```

### 4.2 Saisie du contenu initial

Via admin CMS (`/cms`):

1. **SiteSettings**: Configurer nom, logos, SEO
2. **Contact**: Email, coordonnées
3. **Bio**: Infos personnelles, CV
4. **Categories**: Créer les catégories
5. **Technologies**: Ajouter le stack technique
6. **Experiences**: Parcours professionnel
7. **Projects**: Re-saisir les projets avec nouveau format
8. **Articles**: Re-saisir les articles
9. **SocialLinks**: Liens réseaux

### 4.3 Tests

- [ ] Test manuel de toutes les pages
- [ ] Test sur Chrome, Firefox, Safari
- [ ] Test mobile iOS et Android
- [ ] Test formulaire contact
- [ ] Test commentaires (si activés)

### 4.4 Monitoring

- [ ] Vérifier health check
- [ ] Configurer alertes erreurs
- [ ] Backup automatique DB

### Critères de succès Phase 4
- [ ] Site en production fonctionnel
- [ ] Contenu saisi
- [ ] Pas d'erreurs dans les logs
- [ ] Backups configurés

---

## RÉCAPITULATIF DES FICHIERS

### À créer (16 fichiers)

```
src/globals/
├── SiteSettings.ts         # Global settings
└── Contact.ts              # Contact info

src/collections/
├── Comments.ts             # Commentaires articles
└── ContactMessages.ts      # Messages formulaire contact

src/components/
├── home/
│   ├── Hero.tsx
│   ├── FeaturedProjects.tsx
│   ├── RecentArticles.tsx
│   ├── TechStack.tsx
│   └── ContactCTA.tsx
├── projects/
│   ├── ProjectCard.tsx
│   └── ProjectGrid.tsx
├── blog/
│   ├── ArticleCard.tsx
│   └── FeaturedArticle.tsx
├── about/
│   ├── Timeline.tsx
│   ├── SkillsGrid.tsx
│   └── ExperienceCard.tsx
└── contact/
    ├── ContactForm.tsx
    └── ContactInfo.tsx
```

### À modifier (10 fichiers)

```
src/collections/
├── Users.ts          # Ajouter avatar, locale
├── Media.ts          # Ajouter alt bilingue, blurhash
├── Categories.ts     # Refaire bilingue + color/icon
├── Technologies.ts   # Vérifier conformité
├── SocialLinks.ts    # Ajouter is_active
├── Bio.ts            # Refaire complet
├── Experiences.ts    # Refaire + technologies
├── Projects.ts       # Refaire complet
└── Articles.ts       # Compléter draft_content, tags

src/
└── payload.config.ts # Ajouter globals et collections
```

### À supprimer

```
src/migrations/       # Dossier complet
```

### Pages à modifier

```
src/app/(frontend)/
├── page.tsx              # Remplacer redirect par vraie page
├── projets/
│   ├── page.tsx          # Améliorer avec filtres
│   └── [slug]/page.tsx   # Adapter aux nouveaux champs
├── blog/
│   ├── page.tsx          # Améliorer avec filtres
│   └── [slug]/page.tsx   # Ajouter commentaires
├── a-propos/page.tsx     # Adapter aux nouveaux champs Bio/Experiences
└── contact/page.tsx      # Implémenter formulaire complet

src/app/api/
└── contact/route.ts      # Implémenter sauvegarde + email
```

---

## ESTIMATION TEMPORELLE

| Phase | Durée | Priorité |
|-------|-------|----------|
| Phase 0 - Préparation | 1 jour | CRITIQUE |
| Phase 1 - Collections | 4-5 jours | CRITIQUE |
| Phase 2 - Pages Frontend | 5-7 jours | HAUTE |
| Phase 3 - Fonctionnalités | 3-4 jours | MOYENNE |
| Phase 4 - Production | 2-3 jours | HAUTE |
| **Total** | **3-4 semaines** | |

---

## PROCHAINES ÉTAPES IMMÉDIATES

1. **Maintenant**: Exécuter Phase 0 (nettoyage migrations)
2. **Ensuite**: Créer les 2 globals manquantes
3. **Puis**: Mettre à jour collection Projects selon spec
4. **Enfin**: Créer page d'accueil fonctionnelle

---

*Plan généré le 5 janvier 2026*
*Basé sur: `.claude/specs/01_database_schema.md`*
