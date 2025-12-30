import type { Block } from 'payload'

export const ButtonBlock: Block = {
  slug: 'button',
  labels: {
    singular: 'Bouton',
    plural: 'Boutons',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Texte du bouton',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      required: true,
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Style',
      defaultValue: 'primary',
      options: [
        { label: 'Primaire', value: 'primary' },
        { label: 'Secondaire', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
        { label: 'Ghost', value: 'ghost' },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icône (optionnel)',
      options: [
        { label: 'Aucune', value: '' },
        { label: '→ Flèche droite', value: 'arrow-right' },
        { label: '↗ Lien externe', value: 'external-link' },
        { label: '📥 Download', value: 'download' },
        { label: 'GitHub', value: 'github' },
      ],
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Ouvrir dans un nouvel onglet',
      defaultValue: false,
    },
  ],
}
