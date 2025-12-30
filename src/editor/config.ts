import {
  lexicalEditor,
  BlocksFeature,
  LinkFeature,
  UploadFeature,
  HeadingFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  HTMLConverterFeature,
} from '@payloadcms/richtext-lexical'

import { IconBlock } from './blocks/IconBlock'
import { CalloutBlock } from './blocks/CalloutBlock'
import { VideoEmbedBlock } from './blocks/VideoEmbedBlock'
import { CodeBlock } from './blocks/CodeBlock'
import { ButtonBlock } from './blocks/ButtonBlock'

/**
 * Éditeur WYSIWYG complet pour Payload CMS
 * Basé sur Lexical avec blocs personnalisés
 */
export const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,

    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),

    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    InlineCodeFeature(),

    LinkFeature({
      enabledCollections: ['media', 'projects', 'articles'],
      fields: [
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          options: [
            { label: 'No Follow', value: 'nofollow' },
            { label: 'No Opener', value: 'noopener' },
          ],
          hasMany: true,
        },
        {
          name: 'newTab',
          label: 'Ouvrir dans un nouvel onglet',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    }),

    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'alt',
              type: 'text',
              label: 'Texte alternatif',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
              label: 'Légende',
            },
            {
              name: 'alignment',
              type: 'select',
              label: 'Alignement',
              options: [
                { label: 'Gauche', value: 'left' },
                { label: 'Centre', value: 'center' },
                { label: 'Droite', value: 'right' },
                { label: 'Pleine largeur', value: 'full' },
              ],
              defaultValue: 'center',
            },
          ],
        },
      },
    }),

    HTMLConverterFeature({}),

    BlocksFeature({
      blocks: [
        IconBlock,
        CalloutBlock,
        VideoEmbedBlock,
        CodeBlock,
        ButtonBlock,
      ],
    }),
  ],
})

/**
 * Éditeur simplifié pour les champs courts (résumés, descriptions)
 */
export const simpleRichTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter(feature =>
      !['blocks', 'upload', 'relationship'].includes(feature.key || '')
    ),
    LinkFeature({
      enabledCollections: [],
    }),
    UnorderedListFeature(),
    OrderedListFeature(),
  ],
})
