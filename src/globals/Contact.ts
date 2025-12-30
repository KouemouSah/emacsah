import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  fields: [
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'mapUrl', type: 'text' },
  ],
}
