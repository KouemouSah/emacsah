import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'company', type: 'text', required: true },
    { name: 'location', type: 'text' },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    { name: 'current', type: 'checkbox', defaultValue: false },
    { name: 'description', type: 'richText' },
    { name: 'achievements', type: 'array', fields: [{ name: 'item', type: 'text' }] },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
