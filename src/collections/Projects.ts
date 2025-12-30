import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title_fr',
    defaultColumns: ['title_fr', 'status', 'featured', 'domain', 'order'],
    group: 'Contenu',
  },
  fields: [
    // ============================================
    // Informations de base
    // ============================================
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations',
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
              admin: {
                description: 'Identifiant unique pour l\'URL (ex: mon-projet-ia)',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'summary_fr',
                  type: 'textarea',
                  label: 'Résumé court (FR)',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Affiché dans les cartes de projet (150-200 caractères)',
                  },
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
              name: 'featuredImage',
              type: 'upload',
              label: 'Image principale',
              relationTo: 'media',
              required: true,
            },
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
                  admin: { width: '25%' },
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  label: 'Mis en avant',
                  defaultValue: false,
                  admin: { width: '25%' },
                },
                {
                  name: 'order',
                  type: 'number',
                  label: 'Ordre',
                  defaultValue: 0,
                  admin: { width: '25%' },
                },
                {
                  name: 'domain',
                  type: 'select',
                  label: 'Domaine',
                  required: true,
                  options: [
                    { label: 'Frontend', value: 'frontend' },
                    { label: 'Backend', value: 'backend' },
                    { label: 'Full-Stack', value: 'fullstack' },
                    { label: 'Data / IA', value: 'data-ia' },
                    { label: 'DevOps', value: 'devops' },
                    { label: 'Mobile', value: 'mobile' },
                  ],
                  admin: { width: '25%' },
                },
              ],
            },
            {
              name: 'categories',
              type: 'relationship',
              label: 'Catégories',
              relationTo: 'categories',
              hasMany: true,
            },
            {
              name: 'technologies',
              type: 'relationship',
              label: 'Technologies utilisées',
              relationTo: 'technologies',
              hasMany: true,
            },
          ],
        },

        // ============================================
        // Présentation (Tab)
        // ============================================
        {
          label: 'Présentation',
          fields: [
            {
              name: 'business_context_fr',
              type: 'richText',
              label: 'Contexte métier (FR)',
              admin: {
                description: 'Décrivez le contexte business et les enjeux du projet',
              },
            },
            {
              name: 'business_context_en',
              type: 'richText',
              label: 'Contexte métier (EN)',
            },
            {
              name: 'problem_solved_fr',
              type: 'richText',
              label: 'Problème résolu (FR)',
              admin: {
                description: 'Quel problème ce projet résout-il ?',
              },
            },
            {
              name: 'problem_solved_en',
              type: 'richText',
              label: 'Problème résolu (EN)',
            },
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
                  options: [
                    { label: 'Client', value: 'client' },
                    { label: 'Partenaire', value: 'partner' },
                    { label: 'Utilisateur', value: 'user' },
                    { label: 'Équipe', value: 'team' },
                  ],
                },
                {
                  name: 'description_fr',
                  type: 'text',
                  label: 'Description (FR)',
                },
                {
                  name: 'logo',
                  type: 'upload',
                  label: 'Logo',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },

        // ============================================
        // Impact (Tab)
        // ============================================
        {
          label: 'Impact',
          fields: [
            {
              name: 'societal_impact_fr',
              type: 'richText',
              label: 'Impact sociétal (FR)',
            },
            {
              name: 'societal_impact_en',
              type: 'richText',
              label: 'Impact sociétal (EN)',
            },
            {
              name: 'environmental_impact_fr',
              type: 'richText',
              label: 'Impact environnemental (FR)',
            },
            {
              name: 'environmental_impact_en',
              type: 'richText',
              label: 'Impact environnemental (EN)',
            },
            {
              name: 'benefits',
              type: 'array',
              label: 'Bénéfices clés',
              fields: [
                {
                  name: 'metric',
                  type: 'text',
                  label: 'Métrique',
                  required: true,
                  admin: {
                    description: 'Ex: +50% efficacité, -30% coûts, 10k utilisateurs',
                  },
                },
                {
                  name: 'description_fr',
                  type: 'text',
                  label: 'Description (FR)',
                },
                {
                  name: 'description_en',
                  type: 'text',
                  label: 'Description (EN)',
                },
              ],
            },
          ],
        },

        // ============================================
        // Technique (Tab)
        // ============================================
        {
          label: 'Technique',
          fields: [
            {
              name: 'architecture_fr',
              type: 'richText',
              label: 'Description architecture (FR)',
            },
            {
              name: 'architecture_en',
              type: 'richText',
              label: 'Description architecture (EN)',
            },
            {
              name: 'architecture_diagram',
              type: 'upload',
              label: 'Diagramme d\'architecture',
              relationTo: 'media',
            },
            {
              name: 'technical_stack',
              type: 'group',
              label: 'Stack technique détaillée',
              fields: [
                {
                  name: 'frontend',
                  type: 'textarea',
                  label: 'Frontend',
                  admin: { description: 'Ex: React, TypeScript, Tailwind CSS' },
                },
                {
                  name: 'backend',
                  type: 'textarea',
                  label: 'Backend',
                  admin: { description: 'Ex: Node.js, Express, PostgreSQL' },
                },
                {
                  name: 'devops',
                  type: 'textarea',
                  label: 'DevOps',
                  admin: { description: 'Ex: Docker, GitHub Actions, AWS' },
                },
                {
                  name: 'other',
                  type: 'textarea',
                  label: 'Autres',
                },
              ],
            },
          ],
        },

        // ============================================
        // Galerie & Liens (Tab)
        // ============================================
        {
          label: 'Galerie & Liens',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              label: 'Galerie d\'images',
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
            {
              name: 'links',
              type: 'array',
              label: 'Liens',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  label: 'Type',
                  required: true,
                  options: [
                    { label: 'GitHub', value: 'github' },
                    { label: 'Démo live', value: 'live' },
                    { label: 'Documentation', value: 'docs' },
                    { label: 'API', value: 'api' },
                    { label: 'Vidéo', value: 'video' },
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
                  label: 'Label (FR)',
                },
                {
                  name: 'label_en',
                  type: 'text',
                  label: 'Label (EN)',
                },
              ],
            },
          ],
        },

        // ============================================
        // SEO & Social (Tab)
        // ============================================
        {
          label: 'SEO & Social',
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
              name: 'og_image',
              type: 'upload',
              label: 'Image Open Graph',
              relationTo: 'media',
              admin: {
                description: 'Image pour le partage social (1200x630 recommandé)',
              },
            },
            {
              name: 'ai_social_summary_fr',
              type: 'textarea',
              label: 'Résumé social (FR)',
              admin: {
                description: 'Texte optimisé pour les réseaux sociaux',
              },
            },
            {
              name: 'ai_social_summary_en',
              type: 'textarea',
              label: 'Résumé social (EN)',
            },
          ],
        },
      ],
    },

    // ============================================
    // Timestamps
    // ============================================
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
  ],
  timestamps: true,
}
