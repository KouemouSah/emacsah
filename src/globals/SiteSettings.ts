import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site',
  admin: {
    group: 'Configuration',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Tab 1: Identité
        {
          label: 'Identité',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Nom du site',
              required: true,
              defaultValue: 'EMACSAH',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'siteTagline_fr',
                  type: 'text',
                  label: 'Slogan (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'siteTagline_en',
                  type: 'text',
                  label: 'Slogan (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'logo',
              type: 'upload',
              label: 'Logo',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              type: 'upload',
              label: 'Favicon',
              relationTo: 'media',
            },
          ],
        },
        // Tab 2: SEO
        {
          label: 'SEO',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'defaultMetaTitle_fr',
                  type: 'text',
                  label: 'Meta Title par défaut (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'defaultMetaTitle_en',
                  type: 'text',
                  label: 'Meta Title par défaut (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'defaultMetaDescription_fr',
                  type: 'textarea',
                  label: 'Meta Description par défaut (FR)',
                  admin: { width: '50%' },
                },
                {
                  name: 'defaultMetaDescription_en',
                  type: 'textarea',
                  label: 'Meta Description par défaut (EN)',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'ogImage',
              type: 'upload',
              label: 'Image Open Graph',
              relationTo: 'media',
              admin: {
                description: 'Image affichée lors du partage sur les réseaux sociaux',
              },
            },
          ],
        },
        // Tab 3: Réseaux sociaux
        {
          label: 'Réseaux sociaux',
          fields: [
            {
              name: 'twitterHandle',
              type: 'text',
              label: 'Twitter/X Handle',
              admin: { description: 'Ex: @emacsah' },
            },
            {
              name: 'linkedinUrl',
              type: 'text',
              label: 'URL LinkedIn',
            },
            {
              name: 'githubUrl',
              type: 'text',
              label: 'URL GitHub',
            },
          ],
        },
        // Tab 4: Analytics
        {
          label: 'Analytics',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              label: 'Google Analytics ID',
              admin: { description: 'Ex: G-XXXXXXXXXX' },
            },
            {
              name: 'plausibleDomain',
              type: 'text',
              label: 'Domaine Plausible',
            },
          ],
        },
        // Tab 5: Fonctionnalités
        {
          label: 'Fonctionnalités',
          fields: [
            {
              name: 'commentsEnabled',
              type: 'checkbox',
              label: 'Commentaires activés',
              defaultValue: true,
            },
            {
              name: 'contactFormEnabled',
              type: 'checkbox',
              label: 'Formulaire de contact activé',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
}
