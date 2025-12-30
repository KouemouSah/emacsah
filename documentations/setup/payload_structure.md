# Structure du Projet Payload CMS - Portfolio

## Vue d'ensemble

Ce document decrit la structure complete du projet Payload CMS pour le portfolio personnel deploye sur `folio.emacsah.com`.

## Arborescence du projet

```
src/
├── payload.config.ts          # Configuration principale Payload
├── server.ts                  # Serveur Express
├── collections/
│   ├── Users.ts               # Gestion des utilisateurs
│   ├── Bio.ts                 # Biographie personnelle
│   ├── Experiences.ts         # Experiences professionnelles
│   ├── Projects.ts            # Projets du portfolio
│   ├── Articles.ts            # Articles du blog
│   ├── Categories.ts          # Categories (projets/articles)
│   ├── Media.ts               # Gestion des medias
│   └── SocialLinks.ts         # Liens reseaux sociaux
├── globals/
│   ├── SiteSettings.ts        # Parametres du site
│   └── Contact.ts             # Informations de contact
├── services/
│   ├── ai/
│   │   ├── index.ts           # Export des services IA
│   │   ├── gemini.ts          # Integration Gemini AI
│   │   └── prompts.ts         # Templates de prompts
│   └── github/
│       └── analyzer.ts        # Analyse de repos GitHub
├── hooks/
│   └── generateSocialSummary.ts  # Hook generation resume social
└── endpoints/
    ├── health.ts              # Endpoint sante
    └── ai-improve.ts          # Endpoint amelioration IA
```

## Collections

### Users
- **Slug**: `users`
- **Groupe**: Admin
- **Champs principaux**:
  - `name` (text, requis)
  - `email` (email, requis - auth)
  - `role` (select: admin, editor)

### Bio
- **Slug**: `bio`
- **Groupe**: Portfolio
- **Champs principaux**:
  - `fullName` (text, requis)
  - `title` (text, requis) - Titre professionnel
  - `profileImage` (upload)
  - `shortBio` (textarea, max 300)
  - `fullBio` (richText)
  - `skills` (array) - Competences avec niveau et categorie
  - `location` (text)
  - `availability` (select)

### Experiences
- **Slug**: `experiences`
- **Groupe**: Portfolio
- **Champs principaux**:
  - `title` (text, requis) - Titre du poste
  - `company` (text, requis)
  - `companyLogo` (upload)
  - `type` (select) - Type de contrat
  - `startDate`, `endDate` (date)
  - `current` (checkbox)
  - `description` (richText)
  - `achievements` (array)
  - `technologies` (array)

### Projects
- **Slug**: `projects`
- **Groupe**: Portfolio
- **Onglets**:
  1. **Presentation Metier**: Contexte business, domaine, probleme resolu
  2. **Impact**: Impact societal/environnemental, benefices
  3. **Parties Prenantes**: Acteurs impliques
  4. **Technique**: Stack technique, architecture
  5. **Liens & References**: GitHub, demo, docs
- **Champs sidebar**:
  - `aiGenerated` (group) - Resume social genere par IA
  - `categories` (relationship)
  - `featured` (checkbox)
  - `order` (number)

### Articles
- **Slug**: `articles`
- **Groupe**: Blog
- **Champs principaux**:
  - `title`, `slug` (requis)
  - `status` (select: draft, ai_review, ready, published)
  - `draftContent` (richText) - Brouillon
  - `personalNotes` (textarea) - Notes pour l'IA
  - `content` (richText) - Contenu final ameliore
  - `socialSummary` (textarea, max 280)
  - `readingTime` (number, auto-calcule)

### Categories
- **Slug**: `categories`
- **Groupe**: Taxonomie
- **Champs principaux**:
  - `name`, `slug` (requis)
  - `description`, `color`, `icon`
  - `type` (select: project, article, both)

### Media
- **Slug**: `media`
- **Groupe**: Admin
- **Tailles d'images**:
  - thumbnail: 300x300
  - card: 600x400
  - feature: 1200x630

### SocialLinks
- **Slug**: `social-links`
- **Groupe**: Portfolio
- **Plateformes supportees**: GitHub, LinkedIn, Twitter, YouTube, etc.

## Globals

### SiteSettings
- Nom et description du site
- Logo, favicon, OG image
- Parametres SEO
- Couleurs et apparence
- Footer

### Contact
- Email, telephone
- Adresse
- Disponibilite
- Formulaire de contact
- Integration Calendly

## Services IA

### Gemini Integration
- `improveContent()` - Ameliore les articles bruts
- `generateSocialSummary()` - Genere des resumes pour Twitter/LinkedIn
- `analyzeGitHubRepo()` - Analyse les repos GitHub

### GitHub Analyzer
- `fetchGitHubRepo()` - Recupere les infos d'un repo
- `analyzeRepository()` - Analyse complete avec IA
- `parseGitHubUrl()` - Parse les URLs GitHub

## Endpoints API

### GET /api/health
Retourne le statut du serveur.

### POST /api/ai/improve
Ameliore le contenu avec Gemini AI.
- **Auth**: Requise
- **Body**: `{ draft, personalNotes?, context?, tone?, generateSocial? }`

## Configuration

### Variables d'environnement
Voir `.env.example` pour la liste complete.

### Base de donnees
- **Type**: PostgreSQL
- **Container**: db-karlandklaude
- **Base**: payload_portfolio
- **User**: folio_sah

### Ports
- **Payload CMS**: 3001
- **PostgreSQL**: 5432

## Commandes

```bash
# Developpement
pnpm dev

# Build
pnpm build

# Production
pnpm start

# Generation types TypeScript
pnpm generate:types

# Migrations
pnpm db:migrate
```
