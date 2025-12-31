import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    useAsTitle: 'title_fr',
    defaultColumns: ['title_fr', 'status', 'categories', 'publishedAt'],
    group: 'Contenu',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenu',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title_fr',
                  type: 'text',
                  label: 'Titre (FR)',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'title_en',
                  type: 'text',
                  label: 'Titre (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'slug',
              type: 'text',
              label: 'Slug URL',
              required: true,
              unique: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'excerpt_fr',
                  type: 'textarea',
                  label: 'Extrait (FR)',
                  admin: {
                    width: '50%',
                    description: 'Résumé affiché dans les listes (150-200 caractères)',
                  },
                },
                {
                  name: 'excerpt_en',
                  type: 'textarea',
                  label: 'Extrait (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'content_fr',
              type: 'richText',
              label: 'Contenu (FR)',
              required: true,
            },
            {
              name: 'content_en',
              type: 'richText',
              label: 'Contenu (EN)',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              label: 'Image à la une',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Métadonnées',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  type: 'select',
                  label: 'Statut',
                  required: true,
                  defaultValue: 'draft',
                  options: [
                    { label: 'Brouillon', value: 'draft' },
                    { label: 'Publié', value: 'published' },
                    { label: 'Archivé', value: 'archived' },
                  ],
                  admin: { width: '33%' },
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  label: 'Article mis en avant',
                  defaultValue: false,
                  admin: { width: '33%' },
                },
                {
                  name: 'reading_time',
                  type: 'number',
                  label: 'Temps de lecture (min)',
                  admin: { width: '33%' },
                },
              ],
            },
            {
              name: 'author',
              type: 'relationship',
              label: 'Auteur',
              relationTo: 'users',
            },
            {
              name: 'categories',
              type: 'relationship',
              label: 'Catégories',
              relationTo: 'categories',
              hasMany: true,
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'meta_title_fr',
                  type: 'text',
                  label: 'Meta Title (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'meta_title_en',
                  type: 'text',
                  label: 'Meta Title (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'meta_description_fr',
                  type: 'textarea',
                  label: 'Meta Description (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'meta_description_en',
                  type: 'textarea',
                  label: 'Meta Description (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'ai_social_summary_fr',
              type: 'textarea',
              label: 'Résumé social (FR)',
              admin: {
                description: 'Texte optimisé pour les réseaux sociaux',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'views_count',
      type: 'number',
      label: 'Nombre de vues',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
