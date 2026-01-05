import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Projet',
    plural: 'Projets',
  },
  admin: {
    useAsTitle: 'title_fr',
    defaultColumns: ['title_fr', 'status', 'featured', 'domain', 'order'],
    group: 'Contenu',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Tab 1: Identité
        {
          label: 'Identité',
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
                  name: 'summary_fr',
                  type: 'textarea',
                  label: 'Résumé court (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'summary_en',
                  type: 'textarea',
                  label: 'Résumé court (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'description_fr',
                  type: 'richText',
                  label: 'Description (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'description_en',
                  type: 'richText',
                  label: 'Description (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'featuredImage',
              type: 'upload',
              label: 'Image principale',
              relationTo: 'media',
            },
          ],
        },
        // Tab 2: Métier
        {
          label: 'Métier',
          fields: [
            {
              name: 'domain',
              type: 'text',
              label: 'Domaine',
              admin: {
                description: 'Ex: Fintech, E-commerce, SaaS...',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'business_context_fr',
                  type: 'richText',
                  label: 'Contexte métier (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'business_context_en',
                  type: 'richText',
                  label: 'Contexte métier (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'problem_solved_fr',
                  type: 'richText',
                  label: 'Problème résolu (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'problem_solved_en',
                  type: 'richText',
                  label: 'Problème résolu (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        // Tab 3: Impact
        {
          label: 'Impact',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'societal_impact_fr',
                  type: 'richText',
                  label: 'Impact sociétal (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'societal_impact_en',
                  type: 'richText',
                  label: 'Impact sociétal (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'environmental_impact_fr',
                  type: 'richText',
                  label: 'Impact environnemental (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'environmental_impact_en',
                  type: 'richText',
                  label: 'Impact environnemental (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'benefits',
              type: 'array',
              label: 'Bénéfices',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icône',
                  admin: { description: 'Nom icône Lucide (ex: TrendingUp, Users)' },
                },
                {
                  name: 'title_fr',
                  type: 'text',
                  label: 'Titre (FR)',
                  required: true,
                },
                {
                  name: 'title_en',
                  type: 'text',
                  label: 'Titre (EN)',
                },
                {
                  name: 'description_fr',
                  type: 'textarea',
                  label: 'Description (FR)',
                },
                {
                  name: 'description_en',
                  type: 'textarea',
                  label: 'Description (EN)',
                },
              ],
            },
          ],
        },
        // Tab 4: Technique
        {
          label: 'Technique',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'architecture_fr',
                  type: 'richText',
                  label: 'Architecture (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'architecture_en',
                  type: 'richText',
                  label: 'Architecture (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'architecture_diagram',
              type: 'upload',
              label: 'Diagramme architecture',
              relationTo: 'media',
            },
            {
              name: 'technologies',
              type: 'relationship',
              label: 'Technologies utilisées',
              relationTo: 'technologies',
              hasMany: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'github_url',
                  type: 'text',
                  label: 'URL GitHub',
                  admin: { width: '50%' },
                },
                {
                  name: 'live_url',
                  type: 'text',
                  label: 'URL Démo',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'links',
              type: 'array',
              label: 'Autres liens',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  label: 'Type',
                  required: true,
                  options: [
                    { label: 'Documentation', value: 'docs' },
                    { label: 'Vidéo', value: 'video' },
                    { label: 'Article', value: 'article' },
                    { label: 'Design', value: 'design' },
                    { label: 'API', value: 'api' },
                    { label: 'Autre', value: 'other' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
                {
                  name: 'label_fr',
                  type: 'text',
                  label: 'Libellé (FR)',
                },
                {
                  name: 'label_en',
                  type: 'text',
                  label: 'Libellé (EN)',
                },
              ],
            },
          ],
        },
        // Tab 5: Parties prenantes
        {
          label: 'Parties prenantes',
          fields: [
            {
              name: 'stakeholders',
              type: 'array',
              label: 'Parties prenantes',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Nom',
                  required: true,
                },
                {
                  name: 'role',
                  type: 'select',
                  label: 'Rôle',
                  required: true,
                  options: [
                    { label: 'Client', value: 'client' },
                    { label: 'Partenaire', value: 'partner' },
                    { label: 'Utilisateur final', value: 'end_user' },
                    { label: 'Sponsor', value: 'sponsor' },
                    { label: 'Équipe', value: 'team' },
                    { label: 'Investisseur', value: 'investor' },
                    { label: 'Autre', value: 'other' },
                  ],
                },
                {
                  name: 'description_fr',
                  type: 'textarea',
                  label: 'Description (FR)',
                },
                {
                  name: 'description_en',
                  type: 'textarea',
                  label: 'Description (EN)',
                },
                {
                  name: 'logo',
                  type: 'upload',
                  label: 'Logo',
                  relationTo: 'media',
                },
                {
                  name: 'website',
                  type: 'text',
                  label: 'Site web',
                },
              ],
            },
          ],
        },
        // Tab 6: Galerie
        {
          label: 'Galerie',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              label: 'Images',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Image',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption_fr',
                  type: 'text',
                  label: 'Légende (FR)',
                },
                {
                  name: 'caption_en',
                  type: 'text',
                  label: 'Légende (EN)',
                },
              ],
            },
          ],
        },
        // Tab 7: SEO & IA
        {
          label: 'SEO & IA',
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
              type: 'row',
              fields: [
                {
                  name: 'ai_social_summary_fr',
                  type: 'textarea',
                  label: 'Résumé social IA (FR)',
                  admin: { width: '50%', description: 'Généré par IA pour réseaux sociaux' },
                },
                {
                  name: 'ai_social_summary_en',
                  type: 'textarea',
                  label: 'Résumé social IA (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'ai_generated_at',
              type: 'date',
              label: 'Date génération IA',
              admin: {
                readOnly: true,
                date: { pickerAppearance: 'dayAndTime' },
              },
            },
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'En revue', value: 'review' },
        { label: 'Publié', value: 'published' },
        { label: 'Archivé', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Mis en avant',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordre',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Auteur',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'categories',
      type: 'relationship',
      label: 'Catégories',
      relationTo: 'categories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
  ],
  timestamps: true,
}
