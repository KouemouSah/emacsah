import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Message',
    plural: 'Messages de contact',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Contact',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Téléphone',
          admin: { width: '50%' },
        },
        {
          name: 'company',
          type: 'text',
          label: 'Entreprise',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'subject',
      type: 'select',
      label: 'Sujet',
      required: true,
      options: [
        { label: 'Offre d\'emploi', value: 'job' },
        { label: 'Collaboration', value: 'collaboration' },
        { label: 'Mission freelance', value: 'freelance' },
        { label: 'Question technique', value: 'technical' },
        { label: 'Autre', value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'Nouveau', value: 'new' },
        { label: 'Lu', value: 'read' },
        { label: 'Répondu', value: 'replied' },
        { label: 'Archivé', value: 'archived' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes internes',
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
    {
      name: 'email_sent',
      type: 'checkbox',
      label: 'Email envoyé',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'email_error',
      type: 'text',
      label: 'Erreur email',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
