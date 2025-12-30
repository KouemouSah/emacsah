# Documentation Frontend - Portfolio emacsah.com

## Table des matières

1. [Stack Technique](#stack-technique)
2. [Architecture](#architecture)
3. [Pages et Fonctionnalités](#pages-et-fonctionnalités)
4. [API Backend (Payload CMS)](#api-backend-payload-cms)
5. [Structures de Données](#structures-de-données)
6. [Composants Réutilisables](#composants-réutilisables)
7. [Conventions et Standards](#conventions-et-standards)
8. [Variables d'Environnement](#variables-denvironnement)

---

## Stack Technique

### Frontend
| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 15.x | Framework React avec App Router |
| **React** | 19.x | Bibliothèque UI |
| **TypeScript** | 5.x | Typage statique |
| **Tailwind CSS** | 3.x | Styling utility-first |
| **Framer Motion** | 11.x | Animations |
| **React Hook Form** | 7.x | Gestion des formulaires |
| **Zod** | 3.x | Validation des données |
| **SWR** ou **TanStack Query** | - | Fetching et cache |

### Backend (déjà en place)
| Technologie | Usage |
|-------------|-------|
| **Payload CMS 3.x** | Headless CMS |
| **PostgreSQL** | Base de données |
| **Redis** | Cache |

### URLs
| Environnement | Frontend | Backend API |
|---------------|----------|-------------|
| Production | `https://emacsah.com` | `https://emacsah.com/api` |
| CMS Admin | - | `https://emacsah.com/cms` |

---

## Architecture

```
src/
├── app/                      # Next.js App Router
│   ├── (frontend)/          # Groupe de routes frontend
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── about/
│   │   │   └── page.tsx     # Page À propos
│   │   ├── projects/
│   │   │   ├── page.tsx     # Liste des projets
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Détail d'un projet
│   │   ├── blog/
│   │   │   ├── page.tsx     # Liste des articles
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Article complet
│   │   ├── contact/
│   │   │   └── page.tsx     # Page de contact
│   │   └── layout.tsx       # Layout frontend
│   ├── (payload)/           # Routes Payload (existant)
│   └── api/                  # API routes custom
├── components/
│   ├── ui/                   # Composants UI de base
│   ├── sections/             # Sections de pages
│   └── layout/               # Header, Footer, Nav
├── lib/
│   ├── api.ts               # Fonctions fetch API
│   ├── utils.ts             # Utilitaires
│   └── types.ts             # Types TypeScript
├── hooks/                    # Custom hooks
└── styles/                   # Styles globaux
```

---

## Pages et Fonctionnalités

### 1. Page d'Accueil (`/`)

**Fichier:** `src/app/(frontend)/page.tsx`

#### Sections à implémenter

| Section | Description | Données API |
|---------|-------------|-------------|
| **Hero** | Introduction avec nom, titre, photo | `GET /api/globals/site-settings` |
| **À propos (résumé)** | Courte bio avec bouton "En savoir plus" | `GET /api/globals/about` |
| **Projets vedettes** | 3-4 projets mis en avant | `GET /api/projects?where[featured][equals]=true&limit=4` |
| **Compétences** | Liste des skills avec icônes | `GET /api/skills?sort=order` |
| **Expériences récentes** | 2-3 dernières expériences | `GET /api/experiences?limit=3&sort=-startDate` |
| **Contact CTA** | Call-to-action vers formulaire | Statique |

#### Fonctionnalités
- [x] Animations au scroll (Framer Motion)
- [x] Responsive (mobile-first)
- [x] SEO optimisé (metadata dynamique)
- [x] Lazy loading des images
- [x] Dark mode toggle

---

### 2. Page À Propos (`/about`)

**Fichier:** `src/app/(frontend)/about/page.tsx`

#### Sections à implémenter

| Section | Description | Données API |
|---------|-------------|-------------|
| **Bio complète** | Texte riche avec photo | `GET /api/globals/about` |
| **Timeline** | Parcours chronologique | `GET /api/experiences?sort=-startDate` |
| **Éducation** | Formation académique | `GET /api/education?sort=-year` |
| **Certifications** | Badges et certifs | `GET /api/certifications` |
| **Télécharger CV** | Bouton download | `GET /api/globals/about` (champ `cvFile`) |

#### Fonctionnalités
- [x] Timeline interactive
- [x] Animation d'apparition des éléments
- [x] Téléchargement CV en PDF

---

### 3. Liste des Projets (`/projects`)

**Fichier:** `src/app/(frontend)/projects/page.tsx`

#### Sections à implémenter

| Section | Description | Données API |
|---------|-------------|-------------|
| **Filtres** | Par catégorie/technologie | `GET /api/categories` |
| **Grille projets** | Cards avec preview | `GET /api/projects?sort=-createdAt` |
| **Pagination** | Chargement progressif | `?page=1&limit=9` |

#### Fonctionnalités
- [x] Filtrage par catégorie
- [x] Filtrage par technologie
- [x] Recherche textuelle
- [x] Pagination ou infinite scroll
- [x] Animations de transition

---

### 4. Détail Projet (`/projects/[slug]`)

**Fichier:** `src/app/(frontend)/projects/[slug]/page.tsx`

#### Sections à implémenter

| Section | Description | Données API |
|---------|-------------|-------------|
| **Header** | Titre, catégorie, date | `GET /api/projects?where[slug][equals]={slug}` |
| **Galerie** | Images/vidéos du projet | Inclus dans réponse projet |
| **Description** | Contenu riche (Rich Text) | Inclus dans réponse projet |
| **Technologies** | Stack utilisée | Inclus dans réponse projet |
| **Liens** | GitHub, Demo live | Inclus dans réponse projet |
| **Projets similaires** | Suggestions | `GET /api/projects?where[category][equals]={categoryId}&limit=3` |

#### Fonctionnalités
- [x] Galerie avec lightbox
- [x] Partage social
- [x] Navigation projet précédent/suivant
- [x] Breadcrumb

---

### 5. Blog - Liste (`/blog`)

**Fichier:** `src/app/(frontend)/blog/page.tsx`

#### Sections à implémenter

| Section | Description | Données API |
|---------|-------------|-------------|
| **Article vedette** | Dernier article en grand | `GET /api/posts?limit=1&sort=-publishedAt` |
| **Liste articles** | Cards avec excerpt | `GET /api/posts?sort=-publishedAt` |
| **Catégories** | Sidebar avec tags | `GET /api/post-categories` |
| **Recherche** | Barre de recherche | `?where[title][contains]={query}` |

#### Fonctionnalités
- [x] Filtrage par catégorie
- [x] Recherche
- [x] Pagination
- [x] Temps de lecture estimé

---

### 6. Article Blog (`/blog/[slug]`)

**Fichier:** `src/app/(frontend)/blog/[slug]/page.tsx`

#### Sections à implémenter

| Section | Description | Données API |
|---------|-------------|-------------|
| **Header** | Titre, date, auteur, image | `GET /api/posts?where[slug][equals]={slug}` |
| **Contenu** | Rich text avec code blocks | Inclus dans réponse |
| **Table des matières** | Navigation interne | Généré côté client |
| **Partage** | Boutons réseaux sociaux | Statique |
| **Articles liés** | Suggestions | `GET /api/posts?where[category][equals]={categoryId}&limit=3` |

#### Fonctionnalités
- [x] Syntax highlighting pour code
- [x] Table des matières sticky
- [x] Partage social
- [x] Estimation temps de lecture
- [x] Copy code button

---

### 7. Page Contact (`/contact`)

**Fichier:** `src/app/(frontend)/contact/page.tsx`

#### Sections à implémenter

| Section | Description | Données API |
|---------|-------------|-------------|
| **Formulaire** | Nom, email, sujet, message | `POST /api/contact-submissions` |
| **Informations** | Email, téléphone, localisation | `GET /api/globals/site-settings` |
| **Réseaux sociaux** | Liens vers profils | `GET /api/globals/site-settings` |
| **Map** | Localisation (optionnel) | Statique ou API Maps |

#### Fonctionnalités
- [x] Validation côté client (Zod)
- [x] Protection spam (honeypot + rate limit)
- [x] Feedback visuel (loading, success, error)
- [x] Envoi d'email de confirmation

---

## API Backend (Payload CMS)

### Base URL
```
Production: https://emacsah.com/api
```

### Authentification
Les endpoints publics ne nécessitent pas d'authentification. Les données sensibles sont protégées par les Access Controls de Payload.

### Format des réponses

```typescript
// Réponse collection (liste)
interface CollectionResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Réponse global (singleton)
interface GlobalResponse<T> {
  // Directement les champs du global
  [key: string]: any;
}
```

### Endpoints Collections

#### Projects
```http
GET /api/projects
GET /api/projects/{id}
GET /api/projects?where[slug][equals]={slug}
GET /api/projects?where[featured][equals]=true
GET /api/projects?where[category][equals]={categoryId}
GET /api/projects?sort=-createdAt&limit=10&page=1
```

#### Posts (Blog)
```http
GET /api/posts
GET /api/posts/{id}
GET /api/posts?where[slug][equals]={slug}
GET /api/posts?where[status][equals]=published
GET /api/posts?sort=-publishedAt
```

#### Experiences
```http
GET /api/experiences
GET /api/experiences?sort=-startDate
GET /api/experiences?where[current][equals]=true
```

#### Skills
```http
GET /api/skills
GET /api/skills?sort=order
GET /api/skills?where[category][equals]={category}
```

#### Education
```http
GET /api/education
GET /api/education?sort=-year
```

#### Categories
```http
GET /api/categories
GET /api/post-categories
```

#### Contact Submissions
```http
POST /api/contact-submissions
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

### Endpoints Globals

```http
GET /api/globals/site-settings
GET /api/globals/about
GET /api/globals/home-page
```

### Paramètres de requête communs

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| `limit` | Nombre de résultats | `?limit=10` |
| `page` | Numéro de page | `?page=2` |
| `sort` | Tri (- pour desc) | `?sort=-createdAt` |
| `where` | Filtres | `?where[status][equals]=published` |
| `depth` | Profondeur relations | `?depth=2` |

### Opérateurs de filtre

| Opérateur | Usage |
|-----------|-------|
| `equals` | Égalité exacte |
| `not_equals` | Différent de |
| `contains` | Contient (string) |
| `like` | Pattern matching |
| `in` | Dans une liste |
| `exists` | Champ existe |
| `greater_than` | Supérieur à |
| `less_than` | Inférieur à |

---

## Structures de Données

### Project

```typescript
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;           // Rich Text (HTML ou Lexical)
  excerpt: string;               // Texte court
  featured: boolean;
  status: 'draft' | 'published';

  // Media
  thumbnail: Media;
  gallery: Media[];

  // Relations
  category: Category;
  technologies: Technology[];

  // Liens
  githubUrl?: string;
  liveUrl?: string;

  // Dates
  projectDate: string;           // ISO date
  createdAt: string;
  updatedAt: string;
}

interface Media {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  mimeType: string;
  filename: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Technology {
  id: string;
  name: string;
  icon?: string;                 // URL ou nom d'icône
  color?: string;                // Code couleur hex
}
```

### Post (Blog)

```typescript
interface Post {
  id: string;
  title: string;
  slug: string;
  content: any;                  // Rich Text (Lexical format)
  excerpt: string;
  status: 'draft' | 'published';

  // Media
  featuredImage: Media;

  // Relations
  category: PostCategory;
  tags: Tag[];
  author: User;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Dates
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface PostCategory {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}
```

### Experience

```typescript
interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;           // Rich Text
  location?: string;

  // Dates
  startDate: string;             // ISO date
  endDate?: string;              // null si current=true
  current: boolean;

  // Media
  companyLogo?: Media;

  // Relations
  technologies: Technology[];
}
```

### Skill

```typescript
interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'soft';
  level: number;                 // 1-100
  icon?: string;
  order: number;                 // Pour le tri
}
```

### Education

```typescript
interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: number;
  description?: string;
  logo?: Media;
}
```

### Site Settings (Global)

```typescript
interface SiteSettings {
  siteName: string;
  siteDescription: string;

  // Personal info
  fullName: string;
  jobTitle: string;
  email: string;
  phone?: string;
  location?: string;

  // Media
  profilePhoto: Media;
  favicon: Media;
  ogImage: Media;

  // Social links
  socialLinks: {
    platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'youtube';
    url: string;
  }[];

  // SEO
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
}
```

### About (Global)

```typescript
interface About {
  headline: string;              // Titre accrocheur
  bio: any;                      // Rich Text complet
  shortBio: string;              // Version courte (pour hero)

  // Media
  photo: Media;
  cvFile?: Media;                // PDF téléchargeable

  // Stats (optionnel)
  yearsExperience?: number;
  projectsCompleted?: number;
  clientsSatisfied?: number;
}
```

### Contact Submission

```typescript
interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;

  // Auto-généré
  id: string;
  createdAt: string;
  read: boolean;
}
```

---

## Composants Réutilisables

### Liste des composants à créer

#### UI Components (`components/ui/`)

| Composant | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `loading`, `disabled` | Bouton stylisé |
| `Card` | `children`, `className`, `hover` | Container card |
| `Badge` | `variant`, `children` | Tag/label |
| `Input` | `label`, `error`, `...inputProps` | Input avec label |
| `Textarea` | `label`, `error`, `rows` | Zone de texte |
| `Select` | `options`, `value`, `onChange` | Select dropdown |
| `Modal` | `isOpen`, `onClose`, `children` | Modal dialog |
| `Skeleton` | `width`, `height`, `variant` | Loading placeholder |
| `Avatar` | `src`, `alt`, `size` | Image profil |
| `Icon` | `name`, `size`, `color` | Icône SVG |

#### Section Components (`components/sections/`)

| Composant | Usage |
|-----------|-------|
| `HeroSection` | Section hero page d'accueil |
| `ProjectsGrid` | Grille de projets |
| `ProjectCard` | Card individuelle projet |
| `SkillsSection` | Section compétences |
| `TimelineSection` | Timeline expériences |
| `ContactForm` | Formulaire de contact |
| `BlogPostCard` | Card article blog |
| `TestimonialsSection` | Témoignages (optionnel) |

#### Layout Components (`components/layout/`)

| Composant | Usage |
|-----------|-------|
| `Header` | Navigation principale |
| `Footer` | Pied de page |
| `MobileNav` | Navigation mobile (hamburger) |
| `Breadcrumb` | Fil d'Ariane |
| `PageTransition` | Animation entre pages |
| `ScrollToTop` | Bouton retour en haut |
| `ThemeToggle` | Switch dark/light mode |

---

## Conventions et Standards

### Naming Conventions

```typescript
// Fichiers
components/ui/Button.tsx        // PascalCase pour composants
lib/api.ts                      // camelCase pour utilitaires
hooks/useProjects.ts            // camelCase avec préfixe use

// Variables
const projectData = ...         // camelCase
const API_BASE_URL = ...        // SCREAMING_SNAKE_CASE pour constantes

// Types
interface ProjectProps {}       // PascalCase avec suffixe descriptif
type ButtonVariant = ...        // PascalCase
```

### Structure d'un composant

```typescript
// components/ui/Button.tsx
'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          // variants...
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Spinner className="mr-2" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Fetch API Pattern

```typescript
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://emacsah.com/api';

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

// Fonctions spécifiques
export async function getProjects(params?: {
  featured?: boolean;
  category?: string;
  limit?: number;
  page?: number;
}) {
  const searchParams = new URLSearchParams();

  if (params?.featured) {
    searchParams.set('where[featured][equals]', 'true');
  }
  if (params?.category) {
    searchParams.set('where[category][equals]', params.category);
  }
  if (params?.limit) {
    searchParams.set('limit', String(params.limit));
  }
  if (params?.page) {
    searchParams.set('page', String(params.page));
  }

  const query = searchParams.toString();
  return fetchAPI<CollectionResponse<Project>>(`/projects${query ? `?${query}` : ''}`);
}

export async function getProjectBySlug(slug: string) {
  const res = await fetchAPI<CollectionResponse<Project>>(
    `/projects?where[slug][equals]=${slug}&limit=1`
  );
  return res.docs[0] || null;
}

export async function getSiteSettings() {
  return fetchAPI<SiteSettings>('/globals/site-settings');
}

export async function submitContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return fetchAPI<ContactSubmission>('/contact-submissions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

### Custom Hooks

```typescript
// hooks/useProjects.ts
'use client';

import useSWR from 'swr';
import { getProjects } from '@/lib/api';

export function useProjects(params?: Parameters<typeof getProjects>[0]) {
  const key = ['projects', params];

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => getProjects(params),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    projects: data?.docs || [],
    totalPages: data?.totalPages || 0,
    isLoading,
    isError: !!error,
    mutate,
  };
}
```

---

## Variables d'Environnement

### Fichier `.env.local`

```env
# API
NEXT_PUBLIC_API_URL=https://emacsah.com/api
NEXT_PUBLIC_SITE_URL=https://emacsah.com

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form
CONTACT_EMAIL_TO=contact@emacsah.com
```

---

## Workflow d'Intégration

### Étapes pour le développeur frontend

1. **Cloner le repo** et installer les dépendances
2. **Créer les composants UI** de base (`Button`, `Card`, `Input`, etc.)
3. **Implémenter les sections** page par page
4. **Tester avec l'API** de production ou staging
5. **Fournir les fichiers** dans le dossier `src/app/(frontend)/`

### Structure des fichiers à fournir

```
src/
├── app/(frontend)/
│   ├── layout.tsx           # ✅ À fournir
│   ├── page.tsx             # ✅ À fournir
│   ├── about/page.tsx       # ✅ À fournir
│   ├── projects/
│   │   ├── page.tsx         # ✅ À fournir
│   │   └── [slug]/page.tsx  # ✅ À fournir
│   ├── blog/
│   │   ├── page.tsx         # ✅ À fournir
│   │   └── [slug]/page.tsx  # ✅ À fournir
│   └── contact/page.tsx     # ✅ À fournir
├── components/              # ✅ À fournir
├── lib/
│   ├── api.ts              # ✅ À fournir
│   ├── utils.ts            # ✅ À fournir
│   └── types.ts            # ✅ À fournir
├── hooks/                   # ✅ À fournir
└── styles/
    └── globals.css          # ✅ À fournir (complémentaire)
```

### Checklist avant livraison

- [ ] Toutes les pages sont responsive (mobile, tablet, desktop)
- [ ] Dark mode fonctionne sur toutes les pages
- [ ] Les animations sont fluides (60fps)
- [ ] Les images utilisent `next/image` avec lazy loading
- [ ] SEO: metadata dynamique sur chaque page
- [ ] Accessibilité: navigation clavier, labels ARIA
- [ ] Les formulaires ont une validation client
- [ ] Les erreurs API sont gérées gracieusement
- [ ] Loading states sur tous les fetches
- [ ] Pas de console.log en production

---

## Contact

Pour toute question sur l'API ou l'intégration:
- **Email**: contact@emacsah.com
- **Repo**: github.com/KouemouSah/emacsah

---

*Documentation générée le 30 décembre 2025*
