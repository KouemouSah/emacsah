import type { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: {
    singular: 'Callout',
    plural: 'Callouts',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'ℹ️ Information', value: 'info' },
        { label: '✅ Succès', value: 'success' },
        { label: '⚠️ Attention', value: 'warning' },
        { label: '❌ Danger', value: 'danger' },
        { label: '💡 Astuce', value: 'tip' },
        { label: '📝 Note', value: 'note' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titre (optionnel)',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Contenu',
      required: true,
    },
  ],
}
