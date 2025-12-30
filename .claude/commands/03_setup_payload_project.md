# Initialisation du Projet Payload CMS

## Description
Crée la structure complète du projet Next.js + Payload CMS unifié pour le portfolio.

## Architecture
- **Next.js 15** avec App Router
- **Payload CMS 3.0** intégré nativement
- **Tailwind CSS** pour le styling
- **Gemini AI** pour l'amélioration de contenu

## Paramètres optionnels
- $PROJECT_DIR : Répertoire du projet (défaut: répertoire courant)

## Instructions

1. Vérifie que tu es dans le bon répertoire projet.

2. Crée la structure de dossiers suivante :

```
src/
├── app/
│   ├── (frontend)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── blog/page.tsx
│   │   └── contact/page.tsx
│   ├── (payload)/
│   │   └── cms/[[...segments]]/
│   │       ├── page.tsx
│   │       └── not-found.tsx
│   └── api/
│       ├── [...slug]/route.ts
│       └── health/route.ts
├── collections/
│   ├── Users.ts
│   ├── Bio.ts
│   ├── Experiences.ts
│   ├── Projects.ts
│   ├── Articles.ts
│   ├── Categories.ts
│   ├── Media.ts
│   └── SocialLinks.ts
├── globals/
│   ├── SiteSettings.ts
│   └── Contact.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/
│   └── payload.ts
├── services/
│   └── ai/
│       ├── gemini.ts
│       └── prompts.ts
└── payload.config.ts
```

3. Crée le fichier `package.json` :

```json
{
  "name": "portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "generate:types": "payload generate:types"
  },
  "dependencies": {
    "@payloadcms/db-postgres": "^3.0.0",
    "@payloadcms/next": "^3.0.0",
    "@payloadcms/richtext-lexical": "^3.0.0",
    "payload": "^3.0.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@google/generative-ai": "^0.21.0",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0",
    "tailwindcss": "^3.4.14",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20"
  },
  "engines": {
    "node": ">=20.0.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

4. Crée le fichier `src/payload.config.ts` :

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Bio } from './collections/Bio'
import { Experiences } from './collections/Experiences'
import { Projects } from './collections/Projects'
import { Articles } from './collections/Articles'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { SocialLinks } from './collections/SocialLinks'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Contact } from './globals/Contact'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_IN_PRODUCTION_MIN_32_CHARS',

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Portfolio CMS',
    },
    routes: {
      admin: '/cms',
    },
  },

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  collections: [
    Users,
    Bio,
    Experiences,
    Projects,
    Articles,
    Categories,
    Media,
    SocialLinks,
  ],

  globals: [
    SiteSettings,
    Contact,
  ],

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  cors: [
    'https://emacsah.com',
    'https://www.emacsah.com',
    'http://localhost:3000',
  ],

  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
})
```

5. Crée le fichier `src/app/(payload)/cms/[[...segments]]/page.tsx` :

```typescript
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams })

export default Page
```

6. Crée le fichier `src/app/api/[...slug]/route.ts` pour les routes API Payload :

```typescript
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
```

7. Crée le fichier `src/app/api/health/route.ts` :

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
}
```

8. Crée le fichier `src/app/(frontend)/layout.tsx` :

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Mon portfolio personnel',
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

9. Crée le fichier `src/app/(frontend)/page.tsx` :

```typescript
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Bienvenue</h1>
      <p className="text-lg text-gray-600">
        Portfolio personnel - Next.js + Payload CMS
      </p>
    </div>
  )
}
```

10. Crée les fichiers de collection dans `src/collections/` (Users.ts, Projects.ts, Articles.ts, etc.) avec les champs appropriés pour un portfolio.

11. Crée le fichier `tailwind.config.ts` :

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

12. Crée le fichier `.env.example` :

```env
# Base de données PostgreSQL
DATABASE_URI=postgresql://folio_sah:password@db-karlandklaude:5432/payload_portfolio

# Payload CMS
PAYLOAD_SECRET=votre-secret-min-32-caracteres

# URL publique
NEXT_PUBLIC_SERVER_URL=https://emacsah.com

# IA - Gemini
GEMINI_API_KEY=votre-cle-api-gemini

# Email (optionnel)
RESEND_API_KEY=votre-cle-resend
EMAIL_FROM=noreply@emacsah.com
EMAIL_TO=contact@emacsah.com

# Node
NODE_ENV=production
PORT=3000
```

13. Affiche un résumé des fichiers créés et les commandes pour tester le projet :

```bash
# Installation des dépendances
pnpm install

# Lancer en développement
pnpm dev

# Accéder à l'application
# Frontend: http://localhost:3000
# Admin:    http://localhost:3000/cms
# API:      http://localhost:3000/api
```
