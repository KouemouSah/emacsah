import type { CollectionConfig } from 'payload'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'order'],
    group: 'Configuration',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'Identifiant unique (ex: react, python, docker)',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Catégorie',
      required: true,
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Base de données', value: 'database' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Data / IA', value: 'ai_ml' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Autre', value: 'other' },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      label: 'Icône',
      relationTo: 'media',
      admin: {
        description: 'Icône SVG ou PNG de la technologie',
      },
    },
    {
      name: 'color',
      type: 'text',
      label: 'Couleur',
      admin: {
        description: 'Couleur hex (ex: #61DAFB pour React)',
      },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Site officiel',
    },
    {
      name: 'proficiency',
      type: 'number',
      label: 'Niveau de maîtrise (%)',
      min: 0,
      max: 100,
      defaultValue: 50,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordre d\'affichage',
      defaultValue: 0,
    },
  ],
}
