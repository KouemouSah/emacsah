import type { Block } from 'payload'

export const IconBlock: Block = {
  slug: 'icon',
  labels: {
    singular: 'Icône',
    plural: 'Icônes',
  },
  fields: [
    {
      name: 'icon',
      type: 'select',
      label: 'Icône',
      required: true,
      options: [
        { label: '✓ Check', value: 'check' },
        { label: '✗ X', value: 'x' },
        { label: '★ Star', value: 'star' },
        { label: '⚡ Zap', value: 'zap' },
        { label: '🔥 Fire', value: 'flame' },
        { label: '💡 Ampoule', value: 'lightbulb' },
        { label: '🎯 Target', value: 'target' },
        { label: '🚀 Rocket', value: 'rocket' },
        { label: '💻 Code', value: 'code' },
        { label: '📧 Mail', value: 'mail' },
        { label: '📞 Phone', value: 'phone' },
        { label: 'GitHub', value: 'github' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: '→ Arrow Right', value: 'arrow-right' },
        { label: '↗ External Link', value: 'external-link' },
        { label: '📥 Download', value: 'download' },
        { label: '📅 Calendar', value: 'calendar' },
        { label: '⏰ Clock', value: 'clock' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      label: 'Taille',
      defaultValue: 'medium',
      options: [
        { label: 'Petite (16px)', value: 'small' },
        { label: 'Moyenne (24px)', value: 'medium' },
        { label: 'Grande (32px)', value: 'large' },
      ],
    },
    {
      name: 'color',
      type: 'select',
      label: 'Couleur',
      defaultValue: 'default',
      options: [
        { label: 'Par défaut', value: 'default' },
        { label: 'Primaire', value: 'primary' },
        { label: 'Succès', value: 'success' },
        { label: 'Attention', value: 'warning' },
        { label: 'Danger', value: 'danger' },
      ],
    },
  ],
}
