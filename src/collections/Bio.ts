import type { CollectionConfig } from 'payload'

export const Bio: CollectionConfig = {
  slug: 'bio',
  labels: {
    singular: 'Biographie',
    plural: 'Biographie',
  },
  admin: {
    useAsTitle: 'tagline_fr',
    group: 'Profil',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Tab 1: Introduction
        {
          label: 'Introduction',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'tagline_fr',
                  type: 'text',
                  label: 'Accroche (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'tagline_en',
                  type: 'text',
                  label: 'Accroche (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'intro_fr',
                  type: 'textarea',
                  label: 'Introduction (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'intro_en',
                  type: 'textarea',
                  label: 'Introduction (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        // Tab 2: Histoire
        {
          label: 'Histoire',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'story_fr',
                  type: 'richText',
                  label: 'Parcours détaillé (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'story_en',
                  type: 'richText',
                  label: 'Parcours détaillé (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        // Tab 3: Médias
        {
          label: 'Médias',
          fields: [
            {
              name: 'avatar',
              type: 'upload',
              label: 'Photo principale',
              relationTo: 'media',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'cv_fr',
                  type: 'upload',
                  label: 'CV PDF (FR)',
                  relationTo: 'media',
                  admin: { width: '50%' },
                },
                {
                  name: 'cv_en',
                  type: 'upload',
                  label: 'CV PDF (EN)',
                  relationTo: 'media',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
        // Tab 4: Localisation
        {
          label: 'Localisation',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'location',
                  type: 'text',
                  label: 'Ville, Pays',
                  admin: { width: '50%' },
                },
                {
                  name: 'timezone',
                  type: 'text',
                  label: 'Fuseau horaire',
                  admin: { width: '50%', description: 'Ex: Europe/Paris' },
                },
              ],
            },
            {
              name: 'available_for_hire',
              type: 'checkbox',
              label: 'Disponible pour embauche',
              defaultValue: true,
            },
          ],
        },
        // Tab 5: SEO
        {
          label: 'SEO',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'meta_title_fr',
                  type: 'text',
                  label: 'Meta Title (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'meta_title_en',
                  type: 'text',
                  label: 'Meta Title (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'meta_description_fr',
                  type: 'textarea',
                  label: 'Meta Description (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'meta_description_en',
                  type: 'textarea',
                  label: 'Meta Description (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
