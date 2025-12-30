import type { Block } from 'payload'

export const VideoEmbedBlock: Block = {
  slug: 'videoEmbed',
  labels: {
    singular: 'Vidéo',
    plural: 'Vidéos',
  },
  fields: [
    {
      name: 'source',
      type: 'select',
      label: 'Source',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'URL directe (MP4)', value: 'direct' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL de la vidéo',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titre (accessibilité)',
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Format',
      defaultValue: '16/9',
      options: [
        { label: '16:9 (Standard)', value: '16/9' },
        { label: '4:3', value: '4/3' },
        { label: '1:1 (Carré)', value: '1/1' },
      ],
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Légende',
    },
  ],
}
