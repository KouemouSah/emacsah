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
    // Titre
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
    // Résumé
    {
      type: 'row',
      fields: [
        {
          name: 'summary_fr',
          type: 'textarea',
          label: 'Résumé court (FR)',
          required: true,
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
    // Image
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Image principale',
      relationTo: 'media',
    },
    // Statut et options
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
          type: 'text',
          label: 'Domaine',
          admin: { width: '25%' },
        },
      ],
    },
    // Client et dates
    {
      type: 'row',
      fields: [
        {
          name: 'client',
          type: 'text',
          label: 'Client',
          admin: { width: '33%' },
        },
        {
          name: 'start_date',
          type: 'date',
          label: 'Date début',
          admin: { width: '33%' },
        },
        {
          name: 'end_date',
          type: 'date',
          label: 'Date fin',
          admin: { width: '33%' },
        },
      ],
    },
    // Contenu riche
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu principal',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'context_fr',
          type: 'richText',
          label: 'Contexte (FR)',
          admin: { width: '50%' },
        },
        {
          name: 'context_en',
          type: 'richText',
          label: 'Contexte (EN)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'challenges_fr',
          type: 'richText',
          label: 'Défis (FR)',
          admin: { width: '50%' },
        },
        {
          name: 'challenges_en',
          type: 'richText',
          label: 'Défis (EN)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'solution_fr',
          type: 'richText',
          label: 'Solution (FR)',
          admin: { width: '50%' },
        },
        {
          name: 'solution_en',
          type: 'richText',
          label: 'Solution (EN)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'results_fr',
          type: 'richText',
          label: 'Résultats (FR)',
          admin: { width: '50%' },
        },
        {
          name: 'results_en',
          type: 'richText',
          label: 'Résultats (EN)',
          admin: { width: '50%' },
        },
      ],
    },
    // Liens
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
    // Catégories
    {
      name: 'categories',
      type: 'relationship',
      label: 'Catégories',
      relationTo: 'categories',
      hasMany: true,
    },
    // SEO
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
  ],
  timestamps: true,
}
