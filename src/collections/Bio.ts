import type { CollectionConfig } from 'payload'

export const Bio: CollectionConfig = {
  slug: 'bio',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'richText' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'resume', type: 'upload', relationTo: 'media' },
  ],
}
