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
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ],

  csrf: [
    'https://emacsah.com',
    'https://www.emacsah.com',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  ],

  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
})
