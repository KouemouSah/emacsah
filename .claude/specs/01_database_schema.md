# Schéma Base de Données - Portfolio EMACSAH

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SCHÉMA BASE DE DONNÉES                            │
│                              PostgreSQL 15                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    users     │     │   projects   │     │   articles   │
│──────────────│     │──────────────│     │──────────────│
│ id           │     │ id           │     │ id           │
│ email        │     │ title_fr     │     │ title_fr     │
│ name         │     │ title_en     │     │ title_en     │
│ role         │     │ slug         │     │ slug         │
│ avatar       │────▶│ author_id    │◀────│ author_id    │
└──────────────┘     │ status       │     │ status       │
                     │ featured     │     │ featured     │
                     └──────┬───────┘     └──────┬───────┘
                            │                    │
                            ▼                    ▼
                     ┌──────────────┐     ┌──────────────┐
                     │ proj_techs   │     │  comments    │
                     │──────────────│     │──────────────│
                     │ project_id   │     │ article_id   │
                     │ tech_id      │     │ author_name  │
                     └──────┬───────┘     │ content      │
                            │             │ status       │
                            ▼             └──────────────┘
                     ┌──────────────┐
                     │ technologies │
                     │──────────────│
                     │ id           │
                     │ name         │
                     │ category     │
                     │ icon         │
                     └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│     bio      │     │ experiences  │     │   media      │
│──────────────│     │──────────────│     │──────────────│
│ id           │     │ id           │     │ id           │
│ intro_fr     │     │ company      │     │ filename     │
│ intro_en     │     │ role_fr      │     │ url          │
│ story_fr     │     │ role_en      │     │ mime_type    │
│ story_en     │     │ start_date   │     │ size         │
│ avatar       │     │ end_date     │     │ alt_text     │
└──────────────┘     └──────────────┘     └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  categories  │     │ social_links │     │contact_msgs  │
│──────────────│     │──────────────│     │──────────────│
│ id           │     │ id           │     │ id           │
│ name_fr      │     │ platform     │     │ name         │
│ name_en      │     │ url          │     │ email        │
│ slug         │     │ icon         │     │ subject      │
│ color        │     │ order        │     │ message      │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## Tables détaillées

### 1. users (Utilisateurs admin)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | Identifiant unique |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email de connexion |
| password_hash | VARCHAR(255) | NOT NULL | Mot de passe hashé |
| name | VARCHAR(100) | NOT NULL | Nom affiché |
| role | ENUM | DEFAULT 'editor' | 'admin', 'editor' |
| avatar_id | UUID | FK → media.id | Photo de profil |
| locale | VARCHAR(5) | DEFAULT 'fr' | Langue préférée |
| created_at | TIMESTAMP | DEFAULT NOW() | Date création |
| updated_at | TIMESTAMP | DEFAULT NOW() | Date modification |

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    avatar_id UUID REFERENCES media(id) ON DELETE SET NULL,
    locale VARCHAR(5) DEFAULT 'fr',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### 2. media (Fichiers uploadés)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant unique |
| filename | VARCHAR(255) | NOT NULL | Nom du fichier |
| original_name | VARCHAR(255) | | Nom original |
| mime_type | VARCHAR(100) | NOT NULL | Type MIME |
| size | INTEGER | NOT NULL | Taille en bytes |
| url | TEXT | NOT NULL | URL d'accès |
| alt_text_fr | VARCHAR(255) | | Texte alternatif FR |
| alt_text_en | VARCHAR(255) | | Texte alternatif EN |
| width | INTEGER | | Largeur (images) |
| height | INTEGER | | Hauteur (images) |
| blurhash | VARCHAR(100) | | Placeholder blur |
| created_at | TIMESTAMP | DEFAULT NOW() | Date upload |

```sql
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    mime_type VARCHAR(100) NOT NULL,
    size INTEGER NOT NULL,
    url TEXT NOT NULL,
    alt_text_fr VARCHAR(255),
    alt_text_en VARCHAR(255),
    width INTEGER,
    height INTEGER,
    blurhash VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_media_mime_type ON media(mime_type);
```

---

### 3. categories (Catégories projets/articles)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant unique |
| name_fr | VARCHAR(100) | NOT NULL | Nom en français |
| name_en | VARCHAR(100) | NOT NULL | Nom en anglais |
| slug | VARCHAR(100) | UNIQUE, NOT NULL | URL slug |
| description_fr | TEXT | | Description FR |
| description_en | TEXT | | Description EN |
| color | VARCHAR(7) | | Couleur hex (#FF5733) |
| icon | VARCHAR(50) | | Nom icône Lucide |
| order | INTEGER | DEFAULT 0 | Ordre d'affichage |
| created_at | TIMESTAMP | DEFAULT NOW() | |

```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_fr VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description_fr TEXT,
    description_en TEXT,
    color VARCHAR(7),
    icon VARCHAR(50),
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 4. technologies (Stack technique)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant unique |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Nom (React, Python...) |
| slug | VARCHAR(100) | UNIQUE, NOT NULL | URL slug |
| category | ENUM | NOT NULL | Catégorie technique |
| icon | VARCHAR(100) | | URL ou nom icône |
| color | VARCHAR(7) | | Couleur associée |
| website | VARCHAR(255) | | Site officiel |
| order | INTEGER | DEFAULT 0 | Ordre d'affichage |

**Categories :** `frontend`, `backend`, `database`, `devops`, `ai_ml`, `mobile`, `tools`, `other`

```sql
CREATE TABLE technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN (
        'frontend', 'backend', 'database', 'devops', 
        'ai_ml', 'mobile', 'tools', 'other'
    )),
    icon VARCHAR(100),
    color VARCHAR(7),
    website VARCHAR(255),
    "order" INTEGER DEFAULT 0
);

CREATE INDEX idx_technologies_category ON technologies(category);
```

---

### 5. projects (Projets portfolio)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant unique |
| title_fr | VARCHAR(200) | NOT NULL | Titre français |
| title_en | VARCHAR(200) | NOT NULL | Titre anglais |
| slug | VARCHAR(200) | UNIQUE, NOT NULL | URL slug |
| summary_fr | VARCHAR(300) | | Résumé court FR |
| summary_en | VARCHAR(300) | | Résumé court EN |
| description_fr | JSONB | | Contenu riche FR (Lexical) |
| description_en | JSONB | | Contenu riche EN (Lexical) |
| featured_image_id | UUID | FK → media.id | Image principale |
| status | ENUM | DEFAULT 'draft' | Statut publication |
| featured | BOOLEAN | DEFAULT false | Mis en avant |
| order | INTEGER | DEFAULT 0 | Ordre d'affichage |
| --- | --- | --- | --- |
| **Métier** | | | |
| business_context_fr | JSONB | | Contexte métier FR |
| business_context_en | JSONB | | Contexte métier EN |
| domain | VARCHAR(100) | | Domaine (Fintech, etc.) |
| problem_solved_fr | JSONB | | Problème résolu FR |
| problem_solved_en | JSONB | | Problème résolu EN |
| --- | --- | --- | --- |
| **Impact** | | | |
| societal_impact_fr | JSONB | | Impact sociétal FR |
| societal_impact_en | JSONB | | Impact sociétal EN |
| environmental_impact_fr | JSONB | | Impact environnemental FR |
| environmental_impact_en | JSONB | | Impact environnemental EN |
| benefits | JSONB | | Liste des bénéfices |
| --- | --- | --- | --- |
| **Technique** | | | |
| architecture_fr | JSONB | | Architecture FR |
| architecture_en | JSONB | | Architecture EN |
| architecture_diagram_id | UUID | FK → media.id | Diagramme |
| github_url | VARCHAR(255) | | Lien GitHub |
| live_url | VARCHAR(255) | | Lien démo |
| --- | --- | --- | --- |
| **IA Generated** | | | |
| ai_social_summary_fr | VARCHAR(280) | | Résumé social FR |
| ai_social_summary_en | VARCHAR(280) | | Résumé social EN |
| ai_generated_at | TIMESTAMP | | Date génération IA |
| --- | --- | --- | --- |
| **Timestamps** | | | |
| author_id | UUID | FK → users.id | Auteur |
| published_at | TIMESTAMP | | Date publication |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

**Status :** `draft`, `review`, `published`, `archived`

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Identité
    title_fr VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    summary_fr VARCHAR(300),
    summary_en VARCHAR(300),
    description_fr JSONB,
    description_en JSONB,
    featured_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
    
    -- Statut
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    featured BOOLEAN DEFAULT false,
    "order" INTEGER DEFAULT 0,
    
    -- Métier
    business_context_fr JSONB,
    business_context_en JSONB,
    domain VARCHAR(100),
    problem_solved_fr JSONB,
    problem_solved_en JSONB,
    
    -- Impact
    societal_impact_fr JSONB,
    societal_impact_en JSONB,
    environmental_impact_fr JSONB,
    environmental_impact_en JSONB,
    benefits JSONB DEFAULT '[]',
    
    -- Technique
    architecture_fr JSONB,
    architecture_en JSONB,
    architecture_diagram_id UUID REFERENCES media(id) ON DELETE SET NULL,
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    
    -- IA
    ai_social_summary_fr VARCHAR(280),
    ai_social_summary_en VARCHAR(280),
    ai_generated_at TIMESTAMP,
    
    -- Relations & Timestamps
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX idx_projects_published ON projects(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_projects_slug ON projects(slug);
```

---

### 6. project_technologies (Relation N:N)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| project_id | UUID | FK, PK | Référence projet |
| technology_id | UUID | FK, PK | Référence techno |
| is_primary | BOOLEAN | DEFAULT false | Techno principale |
| order | INTEGER | DEFAULT 0 | Ordre d'affichage |

```sql
CREATE TABLE project_technologies (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    technology_id UUID REFERENCES technologies(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    "order" INTEGER DEFAULT 0,
    PRIMARY KEY (project_id, technology_id)
);

CREATE INDEX idx_project_tech_project ON project_technologies(project_id);
CREATE INDEX idx_project_tech_tech ON project_technologies(technology_id);
```

---

### 7. project_categories (Relation N:N)

```sql
CREATE TABLE project_categories (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);
```

---

### 8. project_stakeholders (Parties prenantes)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant |
| project_id | UUID | FK, NOT NULL | Référence projet |
| name | VARCHAR(200) | NOT NULL | Nom organisation |
| role | ENUM | NOT NULL | Type de partie prenante |
| description_fr | TEXT | | Description FR |
| description_en | TEXT | | Description EN |
| logo_id | UUID | FK → media.id | Logo |
| website | VARCHAR(255) | | Site web |
| order | INTEGER | DEFAULT 0 | Ordre |

**Roles :** `client`, `partner`, `end_user`, `sponsor`, `team`, `investor`, `other`

```sql
CREATE TABLE project_stakeholders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN (
        'client', 'partner', 'end_user', 'sponsor', 'team', 'investor', 'other'
    )),
    description_fr TEXT,
    description_en TEXT,
    logo_id UUID REFERENCES media(id) ON DELETE SET NULL,
    website VARCHAR(255),
    "order" INTEGER DEFAULT 0
);

CREATE INDEX idx_stakeholders_project ON project_stakeholders(project_id);
```

---

### 9. project_links (Liens externes)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant |
| project_id | UUID | FK, NOT NULL | Référence projet |
| type | ENUM | NOT NULL | Type de lien |
| url | TEXT | NOT NULL | URL |
| label_fr | VARCHAR(100) | | Libellé FR |
| label_en | VARCHAR(100) | | Libellé EN |
| order | INTEGER | DEFAULT 0 | Ordre |

**Types :** `github`, `live`, `docs`, `video`, `article`, `design`, `api`, `other`

```sql
CREATE TABLE project_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN (
        'github', 'live', 'docs', 'video', 'article', 'design', 'api', 'other'
    )),
    url TEXT NOT NULL,
    label_fr VARCHAR(100),
    label_en VARCHAR(100),
    "order" INTEGER DEFAULT 0
);

CREATE INDEX idx_links_project ON project_links(project_id);
```

---

### 10. project_gallery (Images du projet)

```sql
CREATE TABLE project_gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    caption_fr VARCHAR(255),
    caption_en VARCHAR(255),
    "order" INTEGER DEFAULT 0
);

CREATE INDEX idx_gallery_project ON project_gallery(project_id);
```

---

### 11. articles (Blog)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant unique |
| title_fr | VARCHAR(200) | NOT NULL | Titre français |
| title_en | VARCHAR(200) | NOT NULL | Titre anglais |
| slug | VARCHAR(200) | UNIQUE, NOT NULL | URL slug |
| excerpt_fr | VARCHAR(300) | | Extrait FR |
| excerpt_en | VARCHAR(300) | | Extrait EN |
| --- | --- | --- | --- |
| **Contenu** | | | |
| draft_content_fr | JSONB | | Brouillon FR |
| draft_content_en | JSONB | | Brouillon EN |
| content_fr | JSONB | | Contenu final FR |
| content_en | JSONB | | Contenu final EN |
| --- | --- | --- | --- |
| **Médias** | | | |
| featured_image_id | UUID | FK → media.id | Image à la une |
| --- | --- | --- | --- |
| **Métadonnées** | | | |
| status | ENUM | DEFAULT 'draft' | Statut |
| featured | BOOLEAN | DEFAULT false | Mis en avant |
| reading_time | INTEGER | | Temps lecture (min) |
| views_count | INTEGER | DEFAULT 0 | Nombre de vues |
| --- | --- | --- | --- |
| **SEO** | | | |
| meta_title_fr | VARCHAR(60) | | Meta title FR |
| meta_title_en | VARCHAR(60) | | Meta title EN |
| meta_description_fr | VARCHAR(160) | | Meta description FR |
| meta_description_en | VARCHAR(160) | | Meta description EN |
| --- | --- | --- | --- |
| **IA** | | | |
| ai_social_summary_fr | VARCHAR(280) | | Résumé social FR |
| ai_social_summary_en | VARCHAR(280) | | Résumé social EN |
| ai_generated_at | TIMESTAMP | | |
| --- | --- | --- | --- |
| **Timestamps** | | | |
| author_id | UUID | FK → users.id | Auteur |
| published_at | TIMESTAMP | | Date publication |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

**Status :** `draft`, `ai_review`, `ready`, `published`, `archived`

```sql
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Identité
    title_fr VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt_fr VARCHAR(300),
    excerpt_en VARCHAR(300),
    
    -- Contenu
    draft_content_fr JSONB,
    draft_content_en JSONB,
    content_fr JSONB,
    content_en JSONB,
    
    -- Médias
    featured_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
    
    -- Métadonnées
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN (
        'draft', 'ai_review', 'ready', 'published', 'archived'
    )),
    featured BOOLEAN DEFAULT false,
    reading_time INTEGER,
    views_count INTEGER DEFAULT 0,
    
    -- SEO
    meta_title_fr VARCHAR(60),
    meta_title_en VARCHAR(60),
    meta_description_fr VARCHAR(160),
    meta_description_en VARCHAR(160),
    
    -- IA
    ai_social_summary_fr VARCHAR(280),
    ai_social_summary_en VARCHAR(280),
    ai_generated_at TIMESTAMP,
    
    -- Relations & Timestamps
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour les recherches
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published ON articles(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_articles_featured ON articles(featured) WHERE featured = true;
CREATE INDEX idx_articles_slug ON articles(slug);

-- Index full-text search pour la recherche
CREATE INDEX idx_articles_search_fr ON articles USING GIN (
    to_tsvector('french', COALESCE(title_fr, '') || ' ' || COALESCE(excerpt_fr, ''))
);
CREATE INDEX idx_articles_search_en ON articles USING GIN (
    to_tsvector('english', COALESCE(title_en, '') || ' ' || COALESCE(excerpt_en, ''))
);
```

---

### 12. article_categories (Relation N:N)

```sql
CREATE TABLE article_categories (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, category_id)
);
```

---

### 13. article_tags (Tags libres)

```sql
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE article_tags (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

CREATE INDEX idx_tags_slug ON tags(slug);
```

---

### 14. comments (Commentaires articles)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant |
| article_id | UUID | FK, NOT NULL | Article concerné |
| parent_id | UUID | FK → comments.id | Réponse à (thread) |
| author_name | VARCHAR(100) | NOT NULL | Nom auteur |
| author_email | VARCHAR(255) | NOT NULL | Email (non affiché) |
| author_website | VARCHAR(255) | | Site web (optionnel) |
| content | TEXT | NOT NULL | Contenu |
| status | ENUM | DEFAULT 'pending' | Statut modération |
| ip_address | VARCHAR(45) | | IP pour anti-spam |
| user_agent | TEXT | | User agent |
| created_at | TIMESTAMP | DEFAULT NOW() | |

**Status :** `pending`, `approved`, `spam`, `deleted`

```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    author_website VARCHAR(255),
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'spam', 'deleted'
    )),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comments_article ON comments(article_id);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_comments_parent ON comments(parent_id);
```

---

### 15. bio (Singleton - Biographie)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant |
| --- | --- | --- | --- |
| **Introduction** | | | |
| tagline_fr | VARCHAR(200) | | Accroche FR |
| tagline_en | VARCHAR(200) | | Accroche EN |
| intro_fr | TEXT | | Introduction FR |
| intro_en | TEXT | | Introduction EN |
| --- | --- | --- | --- |
| **Histoire** | | | |
| story_fr | JSONB | | Parcours détaillé FR |
| story_en | JSONB | | Parcours détaillé EN |
| --- | --- | --- | --- |
| **Médias** | | | |
| avatar_id | UUID | FK → media.id | Photo principale |
| cv_fr_id | UUID | FK → media.id | CV PDF français |
| cv_en_id | UUID | FK → media.id | CV PDF anglais |
| --- | --- | --- | --- |
| **Localisation** | | | |
| location | VARCHAR(100) | | Ville, Pays |
| timezone | VARCHAR(50) | | Fuseau horaire |
| available_for_hire | BOOLEAN | DEFAULT true | Disponible |
| --- | --- | --- | --- |
| **SEO** | | | |
| meta_title_fr | VARCHAR(60) | | |
| meta_title_en | VARCHAR(60) | | |
| meta_description_fr | VARCHAR(160) | | |
| meta_description_en | VARCHAR(160) | | |
| --- | --- | --- | --- |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

```sql
CREATE TABLE bio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Introduction
    tagline_fr VARCHAR(200),
    tagline_en VARCHAR(200),
    intro_fr TEXT,
    intro_en TEXT,
    
    -- Histoire
    story_fr JSONB,
    story_en JSONB,
    
    -- Médias
    avatar_id UUID REFERENCES media(id) ON DELETE SET NULL,
    cv_fr_id UUID REFERENCES media(id) ON DELETE SET NULL,
    cv_en_id UUID REFERENCES media(id) ON DELETE SET NULL,
    
    -- Localisation
    location VARCHAR(100),
    timezone VARCHAR(50),
    available_for_hire BOOLEAN DEFAULT true,
    
    -- SEO
    meta_title_fr VARCHAR(60),
    meta_title_en VARCHAR(60),
    meta_description_fr VARCHAR(160),
    meta_description_en VARCHAR(160),
    
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Un seul enregistrement
INSERT INTO bio (id) VALUES (uuid_generate_v4());
```

---

### 16. experiences (Expériences professionnelles)

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| id | UUID | PK | Identifiant |
| company | VARCHAR(200) | NOT NULL | Nom entreprise |
| company_logo_id | UUID | FK → media.id | Logo |
| company_url | VARCHAR(255) | | Site entreprise |
| role_fr | VARCHAR(200) | NOT NULL | Poste FR |
| role_en | VARCHAR(200) | NOT NULL | Poste EN |
| type | ENUM | NOT NULL | Type contrat |
| location | VARCHAR(100) | | Lieu |
| remote | BOOLEAN | DEFAULT false | Télétravail |
| description_fr | JSONB | | Description FR |
| description_en | JSONB | | Description EN |
| achievements_fr | JSONB | | Réalisations FR |
| achievements_en | JSONB | | Réalisations EN |
| start_date | DATE | NOT NULL | Date début |
| end_date | DATE | | Date fin (NULL = actuel) |
| is_current | BOOLEAN | DEFAULT false | Poste actuel |
| order | INTEGER | DEFAULT 0 | Ordre affichage |
| created_at | TIMESTAMP | DEFAULT NOW() | |

**Types :** `fulltime`, `parttime`, `freelance`, `internship`, `apprenticeship`

```sql
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company VARCHAR(200) NOT NULL,
    company_logo_id UUID REFERENCES media(id) ON DELETE SET NULL,
    company_url VARCHAR(255),
    role_fr VARCHAR(200) NOT NULL,
    role_en VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN (
        'fulltime', 'parttime', 'freelance', 'internship', 'apprenticeship'
    )),
    location VARCHAR(100),
    remote BOOLEAN DEFAULT false,
    description_fr JSONB,
    description_en JSONB,
    achievements_fr JSONB,
    achievements_en JSONB,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_experiences_dates ON experiences(start_date DESC);
```

---

### 17. experience_technologies (Relation N:N)

```sql
CREATE TABLE experience_technologies (
    experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
    technology_id UUID REFERENCES technologies(id) ON DELETE CASCADE,
    PRIMARY KEY (experience_id, technology_id)
);
```

---

### 18. social_links (Réseaux sociaux)

```sql
CREATE TABLE social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon VARCHAR(50),
    label VARCHAR(100),
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);
```

---

### 19. contact_messages (Messages reçus)

```sql
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(200),
    subject VARCHAR(50) NOT NULL CHECK (subject IN (
        'job', 'collaboration', 'freelance', 'technical', 'other'
    )),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN (
        'new', 'read', 'replied', 'archived', 'spam'
    )),
    notes TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    email_sent BOOLEAN DEFAULT false,
    email_error TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_created ON contact_messages(created_at DESC);
```

---

### 20. site_settings (Configuration globale)

```sql
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Identité
    site_name VARCHAR(100) DEFAULT 'EMACSAH',
    site_tagline_fr VARCHAR(200),
    site_tagline_en VARCHAR(200),
    logo_id UUID REFERENCES media(id) ON DELETE SET NULL,
    favicon_id UUID REFERENCES media(id) ON DELETE SET NULL,
    
    -- SEO Global
    default_meta_title_fr VARCHAR(60),
    default_meta_title_en VARCHAR(60),
    default_meta_description_fr VARCHAR(160),
    default_meta_description_en VARCHAR(160),
    og_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
    
    -- Réseaux sociaux
    twitter_handle VARCHAR(50),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    
    -- Analytics
    google_analytics_id VARCHAR(50),
    plausible_domain VARCHAR(100),
    
    -- Features toggles
    comments_enabled BOOLEAN DEFAULT true,
    contact_form_enabled BOOLEAN DEFAULT true,
    
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Un seul enregistrement
INSERT INTO site_settings (id) VALUES (uuid_generate_v4());
```

---

## Résumé des tables

| Table | Description | Lignes estimées |
|-------|-------------|-----------------|
| users | Admins | 1-3 |
| media | Fichiers uploadés | ~100 |
| categories | Catégories | ~10 |
| technologies | Stack technique | ~30-50 |
| projects | Projets portfolio | ~10 |
| project_technologies | Relation | ~50 |
| project_categories | Relation | ~20 |
| project_stakeholders | Parties prenantes | ~20 |
| project_links | Liens projets | ~30 |
| project_gallery | Images projets | ~50 |
| articles | Blog | ~150/an |
| article_categories | Relation | ~200 |
| tags | Tags libres | ~50 |
| article_tags | Relation | ~400 |
| comments | Commentaires | ~500/an |
| bio | Biographie | 1 |
| experiences | Expériences pro | ~5-10 |
| experience_technologies | Relation | ~30 |
| social_links | Réseaux sociaux | ~5-10 |
| contact_messages | Messages contact | ~50/an |
| site_settings | Config globale | 1 |

**Total estimé après 1 an :** ~1500-2000 lignes (très léger)

---

## Migrations Payload

Ces tables seront générées automatiquement par Payload CMS lors du premier démarrage. Le schéma SQL ci-dessus est une référence pour comprendre la structure.
