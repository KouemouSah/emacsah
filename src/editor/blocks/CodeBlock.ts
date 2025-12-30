import type { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'codeBlock',
  labels: {
    singular: 'Bloc de code',
    plural: 'Blocs de code',
  },
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
        { label: 'JSON', value: 'json' },
        { label: 'Bash/Shell', value: 'bash' },
        { label: 'SQL', value: 'sql' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'Docker', value: 'dockerfile' },
        { label: 'Texte brut', value: 'plaintext' },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: 'Code',
      required: true,
    },
    {
      name: 'filename',
      type: 'text',
      label: 'Nom du fichier (optionnel)',
    },
    {
      name: 'showLineNumbers',
      type: 'checkbox',
      label: 'Afficher les numéros de ligne',
      defaultValue: true,
    },
  ],
}
