# API Endpoints - Portfolio EMACSAH

## Vue d'ensemble

| Base URL | Description |
|----------|-------------|
| `https://emacsah.com/api` | API Payload CMS |

---

## 1. Authentification

### POST `/api/users/login`

Login admin.

**Request:**
```json
{
  "email": "admin@emacsah.com",
  "password": "********"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "admin@emacsah.com",
    "name": "EMACSAH"
  },
  "exp": 1234567890
}
```

---

## 2. Projets

### GET `/api/projects`

Liste des projets publiés avec filtres.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `locale` | string | `fr` ou `en` (défaut: `fr`) |
| `where[status][equals]` | string | Filtrer par statut |
| `where[featured][equals]` | boolean | Projets mis en avant |
| `where[categories.slug][in]` | string | Filtrer par catégorie(s) |
| `limit` | number | Nombre de résultats (défaut: 10) |
| `page` | number | Page (défaut: 1) |
| `sort` | string | Tri: `order`, `-createdAt`, `title_fr` |
| `depth` | number | Profondeur des relations (défaut: 1) |

**Exemple:**
```
GET /api/projects?locale=fr&where[status][equals]=published&where[featured][equals]=true&limit=3&sort=order
```

**Response:**
```json
{
  "docs": [
    {
      "id": "uuid-1",
      "title_fr": "Projet IA de Classification",
      "title_en": "AI Classification Project",
      "slug": "projet-ia-classification",
      "summary_fr": "Un projet de ML pour classifier...",
      "featuredImage": {
        "url": "/media/project-1.webp",
        "alt_text_fr": "Screenshot du projet",
        "width": 1200,
        "height": 630,
        "blurhash": "LEHV6nWB2yk8pyo0adR..."
      },
      "status": "published",
      "featured": true,
      "domain": "Data/IA",
      "technologies": [
        { "name": "Python", "icon": "python.svg", "category": "backend" },
        { "name": "TensorFlow", "icon": "tensorflow.svg", "category": "ai_ml" }
      ],
      "categories": [
        { "name_fr": "Intelligence Artificielle", "slug": "ia" }
      ],
      "github_url": "https://github.com/emacsah/projet-ia",
      "live_url": "https://demo.emacsah.com/ia",
      "publishedAt": "2025-01-15T10:00:00Z"
    }
  ],
  "totalDocs": 10,
  "totalPages": 4,
  "page": 1,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

---

### GET `/api/projects/:slug`

Détail d'un projet par slug.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `locale` | string | `fr` ou `en` |
| `depth` | number | Profondeur des relations |

**Exemple:**
```
GET /api/projects/projet-ia-classification?locale=fr&depth=2
```

**Response:**
```json
{
  "id": "uuid-1",
  "title_fr": "Projet IA de Classification",
  "title_en": "AI Classification Project",
  "slug": "projet-ia-classification",
  "summary_fr": "...",
  "description_fr": { /* Lexical JSON */ },
  "description_en": { /* Lexical JSON */ },
  "featuredImage": { /* Media object */ },
  "status": "published",
  "featured": true,
  "order": 1,
  
  "business_context_fr": { /* Lexical JSON */ },
  "domain": "Data/IA",
  "problem_solved_fr": { /* Lexical JSON */ },
  
  "societal_impact_fr": { /* Lexical JSON */ },
  "environmental_impact_fr": { /* Lexical JSON */ },
  "benefits": [
    { "title": "+50% efficacité", "description": "..." },
    { "title": "-30% coûts", "description": "..." }
  ],
  
  "technologies": [
    { "name": "Python", "icon": "...", "category": "backend" },
    { "name": "TensorFlow", "icon": "...", "category": "ai_ml" }
  ],
  "architecture_fr": { /* Lexical JSON */ },
  "architecture_diagram": { /* Media object */ },
  
  "stakeholders": [
    {
      "name": "Client X",
      "role": "client",
      "description_fr": "...",
      "logo": { /* Media object */ }
    }
  ],
  
  "links": [
    { "type": "github", "url": "https://github.com/...", "label_fr": "Code source" },
    { "type": "live", "url": "https://demo...", "label_fr": "Démo live" }
  ],
  
  "gallery": [
    { "media": { /* Media object */ }, "caption_fr": "..." }
  ],
  
  "categories": [
    { "name_fr": "Intelligence Artificielle", "slug": "ia" }
  ],
  
  "ai_social_summary_fr": "🚀 Découvrez mon projet IA de classification...",
  
  "publishedAt": "2025-01-15T10:00:00Z",
  "createdAt": "2025-01-10T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}
```

---

### GET `/api/projects/filter-options`

Options de filtres disponibles (technos, catégories).

**Response:**
```json
{
  "technologies": [
    { "slug": "react", "name": "React", "count": 5, "category": "frontend" },
    { "slug": "python", "name": "Python", "count": 4, "category": "backend" },
    { "slug": "tensorflow", "name": "TensorFlow", "count": 3, "category": "ai_ml" }
  ],
  "categories": [
    { "slug": "fullstack", "name_fr": "Full-Stack", "name_en": "Full-Stack", "count": 4 },
    { "slug": "ia", "name_fr": "Intelligence Artificielle", "name_en": "Artificial Intelligence", "count": 3 }
  ],
  "domains": [
    { "value": "fintech", "count": 2 },
    { "value": "data-ia", "count": 3 }
  ]
}
```

---

## 3. Articles (Blog)

### GET `/api/articles`

Liste des articles publiés avec recherche.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `locale` | string | `fr` ou `en` |
| `where[status][equals]` | string | `published` |
| `where[featured][equals]` | boolean | Articles mis en avant |
| `where[categories.slug][in]` | string | Filtrer par catégorie(s) |
| `where[tags.slug][in]` | string | Filtrer par tag(s) |
| `q` | string | Recherche full-text |
| `limit` | number | Résultats par page |
| `page` | number | Page |
| `sort` | string | `-publishedAt`, `views_count` |

**Exemple recherche:**
```
GET /api/articles?locale=fr&where[status][equals]=published&q=react+hooks&limit=10
```

**Response:**
```json
{
  "docs": [
    {
      "id": "uuid-1",
      "title_fr": "Guide complet React Hooks",
      "title_en": "Complete React Hooks Guide",
      "slug": "guide-react-hooks",
      "excerpt_fr": "Découvrez comment utiliser les hooks React...",
      "featuredImage": { /* Media object */ },
      "status": "published",
      "featured": false,
      "reading_time": 8,
      "views_count": 1234,
      "categories": [
        { "name_fr": "Développement", "slug": "dev" }
      ],
      "tags": [
        { "name": "react", "slug": "react" },
        { "name": "hooks", "slug": "hooks" }
      ],
      "author": {
        "name": "EMACSAH",
        "avatar": { /* Media object */ }
      },
      "publishedAt": "2025-01-20T10:00:00Z",
      "_commentCount": 12
    }
  ],
  "totalDocs": 45,
  "totalPages": 5,
  "page": 1,
  "hasNextPage": true
}
```

---

### GET `/api/articles/:slug`

Détail d'un article.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `locale` | string | `fr` ou `en` |
| `depth` | number | Profondeur relations |

**Response:**
```json
{
  "id": "uuid-1",
  "title_fr": "Guide complet React Hooks",
  "title_en": "Complete React Hooks Guide",
  "slug": "guide-react-hooks",
  "excerpt_fr": "...",
  "content_fr": { /* Lexical JSON */ },
  "content_en": { /* Lexical JSON */ },
  "featuredImage": { /* Media object */ },
  "status": "published",
  "featured": false,
  "reading_time": 8,
  "views_count": 1234,
  
  "meta_title_fr": "Guide React Hooks | EMACSAH",
  "meta_description_fr": "...",
  
  "categories": [ /* ... */ ],
  "tags": [ /* ... */ ],
  
  "author": {
    "name": "EMACSAH",
    "avatar": { /* Media object */ }
  },
  
  "ai_social_summary_fr": "🔥 Mon guide complet sur React Hooks...",
  
  "publishedAt": "2025-01-20T10:00:00Z",
  "createdAt": "2025-01-18T10:00:00Z",
  "updatedAt": "2025-01-20T10:00:00Z",
  
  "_relatedArticles": [
    { "title_fr": "Article similaire 1", "slug": "..." },
    { "title_fr": "Article similaire 2", "slug": "..." }
  ]
}
```

---

### POST `/api/articles/:id/view`

Incrémenter le compteur de vues.

**Response:**
```json
{
  "success": true,
  "views_count": 1235
}
```

---

### GET `/api/articles/search`

Recherche full-text optimisée.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Terme de recherche |
| `locale` | string | `fr` ou `en` |
| `limit` | number | Max résultats |

**Response:**
```json
{
  "results": [
    {
      "id": "uuid-1",
      "title": "Guide React Hooks",
      "slug": "guide-react-hooks",
      "excerpt": "...utiliser les <mark>hooks</mark> React...",
      "relevance": 0.95
    }
  ],
  "total": 5,
  "query": "hooks"
}
```

---

## 4. Commentaires

### GET `/api/comments`

Commentaires d'un article.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `where[article][equals]` | string | ID article |
| `where[status][equals]` | string | `approved` |
| `sort` | string | `createdAt` |
| `depth` | number | Pour les réponses |

**Response:**
```json
{
  "docs": [
    {
      "id": "uuid-1",
      "author_name": "Jean Dupont",
      "author_website": "https://jean.dev",
      "content": "Super article ! Merci pour ces explications.",
      "status": "approved",
      "createdAt": "2025-01-21T14:30:00Z",
      "replies": [
        {
          "id": "uuid-2",
          "author_name": "EMACSAH",
          "content": "Merci Jean ! Content que ça t'aide.",
          "createdAt": "2025-01-21T15:00:00Z"
        }
      ]
    }
  ],
  "totalDocs": 12
}
```

---

### POST `/api/comments`

Créer un commentaire.

**Request:**
```json
{
  "article": "article-uuid",
  "parent": null,
  "author_name": "Jean Dupont",
  "author_email": "jean@example.com",
  "author_website": "https://jean.dev",
  "content": "Super article !"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Commentaire soumis. Il sera visible après modération.",
  "comment": {
    "id": "uuid",
    "status": "pending"
  }
}
```

---

## 5. Bio

### GET `/api/globals/bio`

Récupérer la biographie.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `locale` | string | `fr` ou `en` |
| `depth` | number | Profondeur média |

**Response:**
```json
{
  "tagline_fr": "Développeur Full-Stack passionné par l'IA",
  "tagline_en": "Full-Stack Developer passionate about AI",
  "intro_fr": "Bonjour ! Je suis...",
  "intro_en": "Hello! I am...",
  "story_fr": { /* Lexical JSON */ },
  "story_en": { /* Lexical JSON */ },
  "avatar": {
    "url": "/media/avatar.webp",
    "width": 400,
    "height": 400
  },
  "cv_fr": {
    "url": "/media/cv-fr.pdf",
    "filename": "CV_EMACSAH_FR.pdf"
  },
  "cv_en": {
    "url": "/media/cv-en.pdf",
    "filename": "CV_EMACSAH_EN.pdf"
  },
  "location": "Paris, France",
  "timezone": "Europe/Paris",
  "available_for_hire": true
}
```

---

## 6. Expériences

### GET `/api/experiences`

Liste des expériences professionnelles.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `locale` | string | `fr` ou `en` |
| `sort` | string | `-start_date` (récent d'abord) |
| `depth` | number | Pour les technos |

**Response:**
```json
{
  "docs": [
    {
      "id": "uuid-1",
      "company": "Tech Corp",
      "company_logo": { /* Media object */ },
      "company_url": "https://techcorp.com",
      "role_fr": "Développeur Full-Stack Senior",
      "role_en": "Senior Full-Stack Developer",
      "type": "fulltime",
      "location": "Paris",
      "remote": true,
      "description_fr": { /* Lexical JSON */ },
      "achievements_fr": [
        "Migration microservices (-40% latence)",
        "Mise en place CI/CD"
      ],
      "technologies": [
        { "name": "React", "icon": "..." },
        { "name": "Node.js", "icon": "..." }
      ],
      "start_date": "2023-01-01",
      "end_date": null,
      "is_current": true
    }
  ]
}
```

---

## 7. Technologies

### GET `/api/technologies`

Liste des technologies.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `where[category][equals]` | string | Filtrer par catégorie |
| `sort` | string | `order`, `name` |

**Response:**
```json
{
  "docs": [
    {
      "id": "uuid",
      "name": "React",
      "slug": "react",
      "category": "frontend",
      "icon": "/icons/react.svg",
      "color": "#61DAFB",
      "website": "https://react.dev"
    }
  ]
}
```

---

## 8. Catégories

### GET `/api/categories`

Liste des catégories.

**Response:**
```json
{
  "docs": [
    {
      "id": "uuid",
      "name_fr": "Développement",
      "name_en": "Development",
      "slug": "dev",
      "description_fr": "Articles sur le développement",
      "color": "#6366f1",
      "icon": "code"
    }
  ]
}
```

---

## 9. Tags

### GET `/api/tags`

Liste des tags.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `limit` | number | Max tags |
| `sort` | string | `-count` (populaires d'abord) |

**Response:**
```json
{
  "docs": [
    { "name": "react", "slug": "react", "_count": 15 },
    { "name": "python", "slug": "python", "_count": 12 },
    { "name": "docker", "slug": "docker", "_count": 8 }
  ]
}
```

---

## 10. Contact

### GET `/api/globals/contact`

Configuration de la page contact.

**Response:**
```json
{
  "title_fr": "Me contacter",
  "title_en": "Contact me",
  "subtitle_fr": "Une question ? N'hésitez pas !",
  "directContact": {
    "showEmail": true,
    "email": "contact@emacsah.com",
    "showPhone": false,
    "showLocation": true,
    "location": "Paris, France"
  },
  "formConfig": {
    "showCompanyField": true,
    "showPhoneField": true,
    "subjects": [
      { "value": "job", "label_fr": "Opportunité professionnelle", "label_en": "Job opportunity" },
      { "value": "freelance", "label_fr": "Projet freelance", "label_en": "Freelance project" }
    ],
    "successMessage_fr": "Merci ! Je vous réponds rapidement."
  },
  "availability": {
    "showAvailability": true,
    "isAvailable": true,
    "availabilityText_fr": "Disponible pour missions",
    "responseTime_fr": "Réponse sous 24-48h"
  },
  "socialLinks": [
    { "platform": "github", "url": "https://github.com/emacsah" },
    { "platform": "linkedin", "url": "https://linkedin.com/in/emacsah" }
  ]
}
```

---

### POST `/api/contact`

Envoyer un message de contact.

**Request:**
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+33612345678",
  "company": "Tech Corp",
  "subject": "freelance",
  "message": "Bonjour, j'ai un projet..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Merci pour votre message ! Je vous répondrai rapidement.",
  "id": "uuid"
}
```

**Response (Error - Rate Limit):**
```json
{
  "success": false,
  "error": "Trop de messages envoyés. Veuillez réessayer plus tard."
}
```

**Response (Error - Validation):**
```json
{
  "success": false,
  "error": "Adresse email invalide.",
  "field": "email"
}
```

---

## 11. Site Settings

### GET `/api/globals/site-settings`

Configuration globale du site.

**Response:**
```json
{
  "site_name": "EMACSAH",
  "site_tagline_fr": "Portfolio & Blog",
  "logo": { /* Media object */ },
  "favicon": { /* Media object */ },
  "default_meta_title_fr": "EMACSAH - Développeur Full-Stack & IA",
  "default_meta_description_fr": "...",
  "og_image": { /* Media object */ },
  "twitter_handle": "@emacsah",
  "linkedin_url": "https://linkedin.com/in/emacsah",
  "github_url": "https://github.com/emacsah",
  "google_analytics_id": "G-XXXXXXXXXX",
  "comments_enabled": true,
  "contact_form_enabled": true
}
```

---

## 12. Health Check

### GET `/api/health`

État de l'API.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-20T10:00:00Z",
  "uptime": 86400,
  "database": "connected",
  "version": "1.0.0"
}
```

---

## 13. IA (Admin only)

### POST `/api/ai/improve`

Améliorer un brouillon avec l'IA.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "draft": "Mon texte brut à améliorer...",
  "personalNotes": "J'aimerais insister sur X et Y",
  "context": "Article de blog sur React",
  "tone": "professional",
  "generateSocial": true,
  "locale": "fr"
}
```

**Response:**
```json
{
  "success": true,
  "content": "# Texte amélioré\n\nVoici le contenu restructuré...",
  "socialSummary": "🚀 Découvrez comment améliorer vos composants React ! #react #dev"
}
```

---

### POST `/api/ai/generate-summary`

Générer un résumé social uniquement.

**Request:**
```json
{
  "content": "Contenu de l'article...",
  "platform": "twitter",
  "locale": "fr"
}
```

**Response:**
```json
{
  "success": true,
  "summary": "🔥 Mon dernier article sur React Hooks ! #react #hooks #dev"
}
```

---

## 14. Media

### GET `/api/media/:id`

Récupérer les métadonnées d'un média.

**Response:**
```json
{
  "id": "uuid",
  "filename": "project-1.webp",
  "url": "/media/project-1.webp",
  "mime_type": "image/webp",
  "size": 125000,
  "width": 1200,
  "height": 630,
  "alt_text_fr": "Screenshot du projet",
  "blurhash": "LEHV6nWB2yk8pyo0adR..."
}
```

---

## Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 201 | Créé |
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Non trouvé |
| 429 | Rate limit dépassé |
| 500 | Erreur serveur |

---

## Headers communs

**Request:**
```
Content-Type: application/json
Accept: application/json
Accept-Language: fr,en (pour la locale)
```

**Response:**
```
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642680000
```
