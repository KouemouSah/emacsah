# Configuration Éditeur WYSIWYG Avancé

## Description
Configure un éditeur WYSIWYG HTML complet avec Lexical (natif Payload 3) incluant : insertion d'icônes, images, vidéos, gestion de mise en page, blocs personnalisés, et export HTML.

## Fonctionnalités

- ✅ Formatage texte complet (gras, italique, souligné, barré, etc.)
- ✅ Titres (H1-H6)
- ✅ Listes (ordonnées, non ordonnées, checklist)
- ✅ Liens et ancres
- ✅ Images avec upload et redimensionnement
- ✅ Vidéos embarquées (YouTube, Vimeo)
- ✅ Icônes (Lucide Icons intégrées)
- ✅ Blocs de code avec coloration syntaxique
- ✅ Citations et callouts
- ✅ Tableaux
- ✅ Colonnes et mise en page
- ✅ Séparateurs
- ✅ Export HTML propre

## Instructions

1. Installe les dépendances supplémentaires pour l'éditeur :

```bash
pnpm add @payloadcms/richtext-lexical lucide-react
```

2. Crée le dossier `src/editor/` pour les composants personnalisés de l'éditeur.

3. Crée le fichier `src/editor/config.ts` - Configuration principale de l'éditeur :

```typescript
import {
  lexicalEditor,
  BlocksFeature,
  LinkFeature,
  UploadFeature,
  HeadingFeature,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  RelationshipFeature,
  HTMLConverterFeature,
  TreeViewFeature,
} from '@payloadcms/richtext-lexical'

import { IconBlock } from './blocks/IconBlock'
import { CalloutBlock } from './blocks/CalloutBlock'
import { ColumnsBlock } from './blocks/ColumnsBlock'
import { VideoEmbedBlock } from './blocks/VideoEmbedBlock'
import { CodeBlock } from './blocks/CodeBlock'
import { ButtonBlock } from './blocks/ButtonBlock'
import { AccordionBlock } from './blocks/AccordionBlock'

/**
 * Éditeur WYSIWYG complet pour Payload CMS
 * Basé sur Lexical avec blocs personnalisés
 */
export const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    
    // Headings H1-H6
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    
    // Paragraphes
    ParagraphFeature(),
    
    // Listes
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    
    // Citations
    BlockquoteFeature(),
    
    // Séparateur horizontal
    HorizontalRuleFeature(),
    
    // Code inline
    InlineCodeFeature(),
    
    // Liens avancés
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
            { label: 'No Referrer', value: 'noreferrer' },
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
    
    // Upload d'images
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
            {
              name: 'size',
              type: 'select',
              label: 'Taille',
              options: [
                { label: 'Petite', value: 'small' },
                { label: 'Moyenne', value: 'medium' },
                { label: 'Grande', value: 'large' },
                { label: 'Originale', value: 'original' },
              ],
              defaultValue: 'medium',
            },
          ],
        },
      },
    }),
    
    // Relations vers d'autres contenus
    RelationshipFeature({
      enabledCollections: ['projects', 'articles'],
    }),
    
    // Conversion HTML
    HTMLConverterFeature({}),
    
    // Blocs personnalisés
    BlocksFeature({
      blocks: [
        IconBlock,
        CalloutBlock,
        ColumnsBlock,
        VideoEmbedBlock,
        CodeBlock,
        ButtonBlock,
        AccordionBlock,
      ],
    }),
  ],
})

/**
 * Éditeur simplifié pour les champs courts (résumés, etc.)
 */
export const simpleRichTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ParagraphFeature(),
    LinkFeature({
      enabledCollections: [],
    }),
    UnorderedListFeature(),
    OrderedListFeature(),
  ],
})
```

4. Crée le fichier `src/editor/blocks/IconBlock.ts` - Bloc d'insertion d'icônes :

```typescript
import { Block } from 'payload'

export const IconBlock: Block = {
  slug: 'icon',
  labels: {
    singular: 'Icône',
    plural: 'Icônes',
  },
  imageURL: '/assets/blocks/icon.png',
  imageAltText: 'Bloc icône',
  fields: [
    {
      name: 'icon',
      type: 'select',
      label: 'Icône',
      required: true,
      options: [
        // Général
        { label: '✓ Check', value: 'check' },
        { label: '✗ X', value: 'x' },
        { label: '★ Star', value: 'star' },
        { label: '♥ Heart', value: 'heart' },
        { label: '⚡ Zap', value: 'zap' },
        { label: '🔥 Fire', value: 'flame' },
        { label: '💡 Ampoule', value: 'lightbulb' },
        { label: '🎯 Target', value: 'target' },
        { label: '🚀 Rocket', value: 'rocket' },
        { label: '📌 Pin', value: 'pin' },
        // Tech
        { label: '💻 Code', value: 'code' },
        { label: '🔧 Settings', value: 'settings' },
        { label: '📱 Smartphone', value: 'smartphone' },
        { label: '🖥️ Monitor', value: 'monitor' },
        { label: '☁️ Cloud', value: 'cloud' },
        { label: '🔒 Lock', value: 'lock' },
        { label: '🔓 Unlock', value: 'unlock' },
        { label: '📊 Chart', value: 'bar-chart' },
        { label: '📈 Trending Up', value: 'trending-up' },
        { label: '📉 Trending Down', value: 'trending-down' },
        // Communication
        { label: '📧 Mail', value: 'mail' },
        { label: '💬 Message', value: 'message-circle' },
        { label: '📞 Phone', value: 'phone' },
        { label: '🔔 Bell', value: 'bell' },
        { label: '📢 Megaphone', value: 'megaphone' },
        // Réseaux sociaux
        { label: 'GitHub', value: 'github' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Instagram', value: 'instagram' },
        // Flèches & Navigation
        { label: '→ Arrow Right', value: 'arrow-right' },
        { label: '← Arrow Left', value: 'arrow-left' },
        { label: '↑ Arrow Up', value: 'arrow-up' },
        { label: '↓ Arrow Down', value: 'arrow-down' },
        { label: '↗ External Link', value: 'external-link' },
        // Fichiers
        { label: '📄 File', value: 'file' },
        { label: '📁 Folder', value: 'folder' },
        { label: '📎 Attachment', value: 'paperclip' },
        { label: '📥 Download', value: 'download' },
        { label: '📤 Upload', value: 'upload' },
        // Utilisateurs
        { label: '👤 User', value: 'user' },
        { label: '👥 Users', value: 'users' },
        { label: '🏢 Building', value: 'building' },
        { label: '🌍 Globe', value: 'globe' },
        // Temps
        { label: '📅 Calendar', value: 'calendar' },
        { label: '⏰ Clock', value: 'clock' },
        { label: '⏱️ Timer', value: 'timer' },
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
        { label: 'Très grande (48px)', value: 'xlarge' },
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
        { label: 'Succès (vert)', value: 'success' },
        { label: 'Attention (jaune)', value: 'warning' },
        { label: 'Danger (rouge)', value: 'danger' },
        { label: 'Info (bleu)', value: 'info' },
        { label: 'Gris', value: 'muted' },
      ],
    },
    {
      name: 'inline',
      type: 'checkbox',
      label: 'Affichage inline (dans le texte)',
      defaultValue: false,
    },
  ],
}
```

5. Crée le fichier `src/editor/blocks/CalloutBlock.ts` - Bloc callout/alerte :

```typescript
import { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: {
    singular: 'Callout',
    plural: 'Callouts',
  },
  imageURL: '/assets/blocks/callout.png',
  imageAltText: 'Bloc callout',
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
        { label: '❌ Danger/Erreur', value: 'danger' },
        { label: '💡 Astuce', value: 'tip' },
        { label: '📝 Note', value: 'note' },
        { label: '🔥 Important', value: 'important' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titre (optionnel)',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
      required: true,
    },
    {
      name: 'collapsible',
      type: 'checkbox',
      label: 'Repliable',
      defaultValue: false,
    },
    {
      name: 'defaultCollapsed',
      type: 'checkbox',
      label: 'Replié par défaut',
      defaultValue: false,
      admin: {
        condition: (data, siblingData) => siblingData?.collapsible,
      },
    },
  ],
}
```

6. Crée le fichier `src/editor/blocks/ColumnsBlock.ts` - Bloc de colonnes :

```typescript
import { Block } from 'payload'

export const ColumnsBlock: Block = {
  slug: 'columns',
  labels: {
    singular: 'Colonnes',
    plural: 'Colonnes',
  },
  imageURL: '/assets/blocks/columns.png',
  imageAltText: 'Bloc colonnes',
  fields: [
    {
      name: 'layout',
      type: 'select',
      label: 'Disposition',
      required: true,
      defaultValue: '2-equal',
      options: [
        { label: '2 colonnes égales (50/50)', value: '2-equal' },
        { label: '2 colonnes (33/66)', value: '2-left-small' },
        { label: '2 colonnes (66/33)', value: '2-right-small' },
        { label: '3 colonnes égales', value: '3-equal' },
        { label: '4 colonnes égales', value: '4-equal' },
        { label: '3 colonnes (25/50/25)', value: '3-center-large' },
      ],
    },
    {
      name: 'gap',
      type: 'select',
      label: 'Espacement',
      defaultValue: 'medium',
      options: [
        { label: 'Aucun', value: 'none' },
        { label: 'Petit', value: 'small' },
        { label: 'Moyen', value: 'medium' },
        { label: 'Grand', value: 'large' },
      ],
    },
    {
      name: 'verticalAlign',
      type: 'select',
      label: 'Alignement vertical',
      defaultValue: 'top',
      options: [
        { label: 'Haut', value: 'top' },
        { label: 'Centre', value: 'center' },
        { label: 'Bas', value: 'bottom' },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Colonnes',
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          name: 'content',
          type: 'richText',
          label: 'Contenu de la colonne',
          required: true,
        },
        {
          name: 'backgroundColor',
          type: 'select',
          label: 'Couleur de fond',
          options: [
            { label: 'Aucune', value: 'none' },
            { label: 'Gris clair', value: 'light' },
            { label: 'Gris foncé', value: 'dark' },
            { label: 'Primaire', value: 'primary' },
          ],
        },
        {
          name: 'padding',
          type: 'checkbox',
          label: 'Ajouter du padding',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'mobileStack',
      type: 'checkbox',
      label: 'Empiler sur mobile',
      defaultValue: true,
    },
  ],
}
```

7. Crée le fichier `src/editor/blocks/VideoEmbedBlock.ts` - Bloc vidéo embarquée :

```typescript
import { Block } from 'payload'

export const VideoEmbedBlock: Block = {
  slug: 'videoEmbed',
  labels: {
    singular: 'Vidéo',
    plural: 'Vidéos',
  },
  imageURL: '/assets/blocks/video.png',
  imageAltText: 'Bloc vidéo',
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
        { label: 'Dailymotion', value: 'dailymotion' },
        { label: 'URL directe (MP4)', value: 'direct' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL de la vidéo',
      required: true,
      admin: {
        description: 'Collez l\'URL complète de la vidéo',
      },
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
        { label: '9:16 (Vertical)', value: '9/16' },
        { label: '21:9 (Cinéma)', value: '21/9' },
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Lecture automatique',
      defaultValue: false,
    },
    {
      name: 'muted',
      type: 'checkbox',
      label: 'Muet par défaut',
      defaultValue: false,
    },
    {
      name: 'loop',
      type: 'checkbox',
      label: 'Boucle',
      defaultValue: false,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Légende',
    },
  ],
}
```

8. Crée le fichier `src/editor/blocks/CodeBlock.ts` - Bloc de code avec coloration :

```typescript
import { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'codeBlock',
  labels: {
    singular: 'Bloc de code',
    plural: 'Blocs de code',
  },
  imageURL: '/assets/blocks/code.png',
  imageAltText: 'Bloc code',
  fields: [
    {
      name: 'language',
      type: 'select',
      label: 'Langage',
      required: true,
      defaultValue: 'javascript',
      options: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'SCSS/Sass', value: 'scss' },
        { label: 'JSON', value: 'json' },
        { label: 'YAML', value: 'yaml' },
        { label: 'Markdown', value: 'markdown' },
        { label: 'Bash/Shell', value: 'bash' },
        { label: 'SQL', value: 'sql' },
        { label: 'PHP', value: 'php' },
        { label: 'Java', value: 'java' },
        { label: 'C#', value: 'csharp' },
        { label: 'C/C++', value: 'cpp' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'Swift', value: 'swift' },
        { label: 'Kotlin', value: 'kotlin' },
        { label: 'Docker', value: 'dockerfile' },
        { label: 'GraphQL', value: 'graphql' },
        { label: 'Texte brut', value: 'plaintext' },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: 'Code',
      required: true,
      admin: {
        language: 'javascript', // Sera dynamique côté frontend
      },
    },
    {
      name: 'filename',
      type: 'text',
      label: 'Nom du fichier (optionnel)',
      admin: {
        description: 'Ex: app.js, styles.css',
      },
    },
    {
      name: 'showLineNumbers',
      type: 'checkbox',
      label: 'Afficher les numéros de ligne',
      defaultValue: true,
    },
    {
      name: 'highlightLines',
      type: 'text',
      label: 'Lignes à surligner',
      admin: {
        description: 'Ex: 1,3,5-10',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Légende',
    },
  ],
}
```

9. Crée le fichier `src/editor/blocks/ButtonBlock.ts` - Bloc bouton CTA :

```typescript
import { Block } from 'payload'

export const ButtonBlock: Block = {
  slug: 'button',
  labels: {
    singular: 'Bouton',
    plural: 'Boutons',
  },
  imageURL: '/assets/blocks/button.png',
  imageAltText: 'Bloc bouton',
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Texte du bouton',
      required: true,
    },
    {
      name: 'linkType',
      type: 'select',
      label: 'Type de lien',
      required: true,
      defaultValue: 'url',
      options: [
        { label: 'URL externe', value: 'url' },
        { label: 'Page interne', value: 'internal' },
        { label: 'Email', value: 'email' },
        { label: 'Téléphone', value: 'phone' },
        { label: 'Téléchargement', value: 'download' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      required: true,
      admin: {
        condition: (data, siblingData) => 
          ['url', 'email', 'phone'].includes(siblingData?.linkType),
      },
    },
    {
      name: 'internalLink',
      type: 'relationship',
      relationTo: ['projects', 'articles'],
      label: 'Lien interne',
      admin: {
        condition: (data, siblingData) => siblingData?.linkType === 'internal',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Fichier à télécharger',
      admin: {
        condition: (data, siblingData) => siblingData?.linkType === 'download',
      },
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
        { label: 'Lien', value: 'link' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      label: 'Taille',
      defaultValue: 'medium',
      options: [
        { label: 'Petite', value: 'small' },
        { label: 'Moyenne', value: 'medium' },
        { label: 'Grande', value: 'large' },
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
        { label: '📧 Email', value: 'mail' },
        { label: '📞 Téléphone', value: 'phone' },
        { label: '▶ Play', value: 'play' },
        { label: 'GitHub', value: 'github' },
        { label: 'LinkedIn', value: 'linkedin' },
      ],
    },
    {
      name: 'iconPosition',
      type: 'select',
      label: 'Position icône',
      defaultValue: 'right',
      options: [
        { label: 'Gauche', value: 'left' },
        { label: 'Droite', value: 'right' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.icon,
      },
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Alignement',
      defaultValue: 'left',
      options: [
        { label: 'Gauche', value: 'left' },
        { label: 'Centre', value: 'center' },
        { label: 'Droite', value: 'right' },
        { label: 'Pleine largeur', value: 'full' },
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
```

10. Crée le fichier `src/editor/blocks/AccordionBlock.ts` - Bloc accordéon/FAQ :

```typescript
import { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordion',
  labels: {
    singular: 'Accordéon',
    plural: 'Accordéons',
  },
  imageURL: '/assets/blocks/accordion.png',
  imageAltText: 'Bloc accordéon',
  fields: [
    {
      name: 'style',
      type: 'select',
      label: 'Style',
      defaultValue: 'default',
      options: [
        { label: 'Par défaut', value: 'default' },
        { label: 'Bordé', value: 'bordered' },
        { label: 'Séparé', value: 'separated' },
      ],
    },
    {
      name: 'allowMultiple',
      type: 'checkbox',
      label: 'Permettre plusieurs ouverts',
      defaultValue: false,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Éléments',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre / Question',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Contenu / Réponse',
          required: true,
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          label: 'Ouvert par défaut',
          defaultValue: false,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icône (optionnel)',
          options: [
            { label: 'Aucune', value: '' },
            { label: '❓ Question', value: 'help-circle' },
            { label: '💡 Astuce', value: 'lightbulb' },
            { label: '⚙️ Config', value: 'settings' },
            { label: '📌 Important', value: 'pin' },
          ],
        },
      ],
    },
  ],
}
```

11. Crée le fichier `src/editor/blocks/index.ts` - Export de tous les blocs :

```typescript
export { IconBlock } from './IconBlock'
export { CalloutBlock } from './CalloutBlock'
export { ColumnsBlock } from './ColumnsBlock'
export { VideoEmbedBlock } from './VideoEmbedBlock'
export { CodeBlock } from './CodeBlock'
export { ButtonBlock } from './ButtonBlock'
export { AccordionBlock } from './AccordionBlock'
```

12. Mets à jour `src/payload.config.ts` pour utiliser le nouvel éditeur :

Remplace :
```typescript
import { lexicalEditor } from '@payloadcms/richtext-lexical'
```

Par :
```typescript
import { richTextEditor, simpleRichTextEditor } from './editor/config'
```

Et remplace :
```typescript
editor: lexicalEditor({}),
```

Par :
```typescript
editor: richTextEditor,
```

13. Crée le fichier `src/editor/serializers/htmlSerializer.ts` pour l'export HTML propre :

```typescript
/**
 * Sérialiseur HTML pour le contenu Lexical
 * Génère du HTML propre et sémantique
 */

import type { SerializedEditorState } from 'lexical'

interface SerializeOptions {
  addClasses?: boolean
  wrapInArticle?: boolean
}

export function serializeToHTML(
  content: SerializedEditorState,
  options: SerializeOptions = {}
): string {
  const { addClasses = true, wrapInArticle = false } = options

  if (!content?.root?.children) {
    return ''
  }

  const html = serializeNodes(content.root.children, addClasses)

  if (wrapInArticle) {
    return `<article class="prose">${html}</article>`
  }

  return html
}

function serializeNodes(nodes: any[], addClasses: boolean): string {
  return nodes
    .map((node) => serializeNode(node, addClasses))
    .join('')
}

function serializeNode(node: any, addClasses: boolean): string {
  // Implémentation selon les types de nodes Lexical
  // Cette fonction sera étendue selon les blocs utilisés
  
  switch (node.type) {
    case 'paragraph':
      const pClass = addClasses ? ' class="paragraph"' : ''
      return `<p${pClass}>${serializeNodes(node.children || [], addClasses)}</p>`
    
    case 'heading':
      const tag = `h${node.tag || 2}`
      const hClass = addClasses ? ` class="heading heading-${node.tag}"` : ''
      return `<${tag}${hClass}>${serializeNodes(node.children || [], addClasses)}</${tag}>`
    
    case 'text':
      let text = escapeHTML(node.text || '')
      if (node.format & 1) text = `<strong>${text}</strong>` // Bold
      if (node.format & 2) text = `<em>${text}</em>` // Italic
      if (node.format & 8) text = `<u>${text}</u>` // Underline
      if (node.format & 4) text = `<s>${text}</s>` // Strikethrough
      if (node.format & 16) text = `<code>${text}</code>` // Code
      return text
    
    case 'link':
      const href = node.fields?.url || '#'
      const target = node.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${target}>${serializeNodes(node.children || [], addClasses)}</a>`
    
    case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      const listClass = addClasses ? ` class="list list-${node.listType}"` : ''
      return `<${listTag}${listClass}>${serializeNodes(node.children || [], addClasses)}</${listTag}>`
    
    case 'listitem':
      return `<li>${serializeNodes(node.children || [], addClasses)}</li>`
    
    case 'quote':
      const qClass = addClasses ? ' class="blockquote"' : ''
      return `<blockquote${qClass}>${serializeNodes(node.children || [], addClasses)}</blockquote>`
    
    case 'horizontalrule':
      return '<hr />'
    
    case 'upload':
      // Image upload
      const imgUrl = node.value?.url || ''
      const imgAlt = node.fields?.alt || ''
      const imgCaption = node.fields?.caption
      const imgAlign = node.fields?.alignment || 'center'
      const figClass = addClasses ? ` class="figure figure-${imgAlign}"` : ''
      
      let imgHtml = `<figure${figClass}><img src="${imgUrl}" alt="${imgAlt}" loading="lazy" />`
      if (imgCaption) {
        imgHtml += `<figcaption>${escapeHTML(imgCaption)}</figcaption>`
      }
      imgHtml += '</figure>'
      return imgHtml
    
    case 'block':
      return serializeBlock(node, addClasses)
    
    default:
      if (node.children) {
        return serializeNodes(node.children, addClasses)
      }
      return ''
  }
}

function serializeBlock(node: any, addClasses: boolean): string {
  const blockType = node.fields?.blockType
  
  switch (blockType) {
    case 'callout':
      const calloutType = node.fields?.type || 'info'
      const calloutTitle = node.fields?.title
      const calloutContent = node.fields?.content
      
      let calloutHtml = `<aside class="callout callout-${calloutType}">`
      if (calloutTitle) {
        calloutHtml += `<strong class="callout-title">${escapeHTML(calloutTitle)}</strong>`
      }
      if (calloutContent) {
        calloutHtml += serializeToHTML(calloutContent, { addClasses })
      }
      calloutHtml += '</aside>'
      return calloutHtml
    
    case 'codeBlock':
      const lang = node.fields?.language || 'plaintext'
      const code = node.fields?.code || ''
      const filename = node.fields?.filename
      
      let codeHtml = '<div class="code-block">'
      if (filename) {
        codeHtml += `<div class="code-filename">${escapeHTML(filename)}</div>`
      }
      codeHtml += `<pre><code class="language-${lang}">${escapeHTML(code)}</code></pre></div>`
      return codeHtml
    
    // Ajouter d'autres blocs selon les besoins
    
    default:
      return ''
  }
}

function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
```

14. Crée un fichier `documentations/editor/guide.md` résumant les blocs disponibles et leur utilisation.

15. Affiche un résumé des fonctionnalités ajoutées et comment les utiliser dans l'admin Payload.
