import type { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comments',
  labels: {
    singular: 'Commentaire',
    plural: 'Commentaires',
  },
  admin: {
    useAsTitle: 'author_name',
    defaultColumns: ['author_name', 'article', 'status', 'createdAt'],
    group: 'Contenu',
  },
  fields: [
    {
      name: 'article',
      type: 'relationship',
      label: 'Article',
      relationTo: 'articles',
      required: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      label: 'Réponse à',
      relationTo: 'comments',
      admin: {
        description: 'Laisser vide pour un commentaire racine',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'author_name',
          type: 'text',
          label: 'Nom',
          required: true,
          admin: { width: '33%' },
        },
        {
          name: 'author_email',
          type: 'email',
          label: 'Email',
          required: true,
          admin: { width: '33%' },
        },
        {
          name: 'author_website',
          type: 'text',
          label: 'Site web',
          admin: { width: '33%' },
        },
      ],
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Contenu',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'En attente', value: 'pending' },
        { label: 'Approuvé', value: 'approved' },
        { label: 'Spam', value: 'spam' },
        { label: 'Supprimé', value: 'deleted' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'ip_address',
      type: 'text',
      label: 'Adresse IP',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'user_agent',
      type: 'textarea',
      label: 'User Agent',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
