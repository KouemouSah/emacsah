# Configuration Formulaire de Contact et Email

## Description
Configure un formulaire de contact complet avec :
- Collection pour stocker les messages
- Envoi d'email automatique via Resend (3000 emails/mois gratuits)
- Notifications en temps réel
- Protection anti-spam (honeypot + rate limiting)
- API endpoint sécurisé

## Prérequis
- Compte Resend (gratuit) : https://resend.com
- Domaine vérifié pour l'envoi d'emails (ou utiliser l'email de test Resend)

## Instructions

1. Crée un compte Resend et obtiens ta clé API :
   - Va sur https://resend.com/signup
   - Crée un compte gratuit
   - Va dans API Keys → Create API Key
   - Copie la clé (commence par `re_`)

2. Installe les dépendances :

```bash
pnpm add resend
```

3. Ajoute les variables d'environnement dans `.env` :

```env
# Email - Resend
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=contact@emacsah.com
EMAIL_TO=ton-email@gmail.com
```

4. Crée le fichier `src/collections/ContactMessages.ts` - Collection des messages :

```typescript
import { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Contact',
    description: 'Messages reçus via le formulaire de contact',
  },
  access: {
    // Seuls les admins peuvent lire/modifier
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Tout le monde peut créer (formulaire public)
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    // Informations de l'expéditeur
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
      required: true,
      maxLength: 100,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Téléphone',
      admin: {
        description: 'Optionnel',
      },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Entreprise',
      admin: {
        description: 'Optionnel',
      },
    },
    
    // Message
    {
      name: 'subject',
      type: 'select',
      label: 'Sujet',
      required: true,
      options: [
        { label: '💼 Opportunité professionnelle', value: 'job' },
        { label: '🤝 Collaboration / Partenariat', value: 'collaboration' },
        { label: '💡 Projet freelance', value: 'freelance' },
        { label: '❓ Question technique', value: 'technical' },
        { label: '💬 Autre', value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
      maxLength: 5000,
    },
    
    // Métadonnées
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      defaultValue: 'new',
      options: [
        { label: '🆕 Nouveau', value: 'new' },
        { label: '📖 Lu', value: 'read' },
        { label: '↩️ Répondu', value: 'replied' },
        { label: '📁 Archivé', value: 'archived' },
        { label: '🚫 Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes internes',
      admin: {
        position: 'sidebar',
        description: 'Notes privées (non visibles par l\'expéditeur)',
      },
    },
    
    // Anti-spam
    {
      name: 'ipAddress',
      type: 'text',
      label: 'Adresse IP',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    
    // Honeypot (champ caché anti-bot)
    {
      name: 'website',
      type: 'text',
      label: 'Website (honeypot)',
      admin: {
        hidden: true, // Caché dans l'admin
      },
    },
    
    // Email envoyé
    {
      name: 'emailSent',
      type: 'checkbox',
      label: 'Email de notification envoyé',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'emailError',
      type: 'text',
      label: 'Erreur email',
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (data) => data?.emailError,
      },
    },
  ],
  
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Envoyer l'email uniquement à la création
        if (operation === 'create' && !doc.website) { // Honeypot vide = humain
          try {
            const { sendContactNotification } = await import('../services/email/contact')
            await sendContactNotification(doc)
            
            // Mettre à jour le statut d'envoi
            await req.payload.update({
              collection: 'contact-messages',
              id: doc.id,
              data: {
                emailSent: true,
              },
            })
          } catch (error) {
            console.error('Erreur envoi email:', error)
            await req.payload.update({
              collection: 'contact-messages',
              id: doc.id,
              data: {
                emailError: error instanceof Error ? error.message : 'Erreur inconnue',
              },
            })
          }
        }
        return doc
      },
    ],
  },
  
  timestamps: true,
}
```

5. Crée le dossier `src/services/email/` et le fichier `src/services/email/contact.ts` :

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  createdAt: string
}

const subjectLabels: Record<string, string> = {
  job: '💼 Opportunité professionnelle',
  collaboration: '🤝 Collaboration / Partenariat',
  freelance: '💡 Projet freelance',
  technical: '❓ Question technique',
  other: '💬 Autre',
}

/**
 * Envoie une notification email pour un nouveau message de contact
 */
export async function sendContactNotification(message: ContactMessage): Promise<void> {
  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev'
  const toEmail = process.env.EMAIL_TO || ''

  if (!toEmail) {
    throw new Error('EMAIL_TO non configuré')
  }

  const subjectLabel = subjectLabels[message.subject] || message.subject
  const emailSubject = `[Portfolio] Nouveau message: ${subjectLabel}`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message de contact</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 10px 10px;
    }
    .field {
      margin-bottom: 20px;
    }
    .field-label {
      font-weight: 600;
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .field-value {
      background: white;
      padding: 12px 15px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .message-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      white-space: pre-wrap;
    }
    .badge {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 14px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #9ca3af;
      font-size: 12px;
    }
    .button {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📬 Nouveau message</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Via le formulaire de contact</p>
  </div>
  
  <div class="content">
    <div class="field">
      <div class="field-label">Sujet</div>
      <div class="field-value">
        <span class="badge">${subjectLabel}</span>
      </div>
    </div>
    
    <div class="field">
      <div class="field-label">De</div>
      <div class="field-value">
        <strong>${escapeHtml(message.name)}</strong><br>
        <a href="mailto:${message.email}">${message.email}</a>
        ${message.phone ? `<br>📞 ${escapeHtml(message.phone)}` : ''}
        ${message.company ? `<br>🏢 ${escapeHtml(message.company)}` : ''}
      </div>
    </div>
    
    <div class="field">
      <div class="field-label">Message</div>
      <div class="message-box">${escapeHtml(message.message)}</div>
    </div>
    
    <div style="text-align: center;">
      <a href="mailto:${message.email}?subject=Re: ${encodeURIComponent(subjectLabel)}" class="button">
        ↩️ Répondre directement
      </a>
    </div>
  </div>
  
  <div class="footer">
    <p>Message reçu le ${new Date(message.createdAt).toLocaleString('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short',
    })}</p>
    <p>ID: ${message.id}</p>
  </div>
</body>
</html>
`

  const textContent = `
Nouveau message de contact
==========================

Sujet: ${subjectLabel}

De: ${message.name}
Email: ${message.email}
${message.phone ? `Téléphone: ${message.phone}` : ''}
${message.company ? `Entreprise: ${message.company}` : ''}

Message:
--------
${message.message}

---
Reçu le ${new Date(message.createdAt).toLocaleString('fr-FR')}
ID: ${message.id}
`

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: emailSubject,
    html: htmlContent,
    text: textContent,
    replyTo: message.email,
  })
}

/**
 * Envoie un email de confirmation à l'expéditeur
 */
export async function sendContactConfirmation(message: ContactMessage): Promise<void> {
  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev'

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>✅ Message bien reçu !</h1>
  </div>
  <div class="content">
    <p>Bonjour ${escapeHtml(message.name)},</p>
    <p>Merci pour votre message ! Je l'ai bien reçu et je vous répondrai dans les plus brefs délais.</p>
    <p>À bientôt,<br>
    <strong>EMACSAH</strong></p>
  </div>
</body>
</html>
`

  await resend.emails.send({
    from: fromEmail,
    to: message.email,
    subject: '✅ Message bien reçu - EMACSAH',
    html: htmlContent,
  })
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
```

6. Crée le fichier `src/endpoints/contact.ts` - Endpoint API public :

```typescript
import { Endpoint } from 'payload'

// Rate limiting simple en mémoire
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5 // Max 5 messages
const RATE_WINDOW = 60 * 60 * 1000 // Par heure (en ms)

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

export const contactEndpoint: Endpoint = {
  path: '/contact',
  method: 'post',
  handler: async (req) => {
    try {
      // Récupérer l'IP
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                 req.headers.get('x-real-ip') || 
                 'unknown'
      
      // Vérifier le rate limit
      if (!checkRateLimit(ip)) {
        return Response.json(
          { 
            success: false, 
            error: 'Trop de messages envoyés. Veuillez réessayer plus tard.' 
          },
          { status: 429 }
        )
      }

      const body = await req.json()
      const { name, email, phone, company, subject, message, website } = body

      // Validation basique
      if (!name || !email || !subject || !message) {
        return Response.json(
          { success: false, error: 'Tous les champs obligatoires doivent être remplis.' },
          { status: 400 }
        )
      }

      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return Response.json(
          { success: false, error: 'Adresse email invalide.' },
          { status: 400 }
        )
      }

      // Validation longueur
      if (name.length > 100) {
        return Response.json(
          { success: false, error: 'Le nom est trop long (max 100 caractères).' },
          { status: 400 }
        )
      }

      if (message.length > 5000) {
        return Response.json(
          { success: false, error: 'Le message est trop long (max 5000 caractères).' },
          { status: 400 }
        )
      }

      // Honeypot - si rempli, c'est un bot
      if (website) {
        // On fait semblant que c'est OK pour ne pas alerter le bot
        return Response.json({ success: true, message: 'Message envoyé avec succès.' })
      }

      // Créer le message dans la base
      const contactMessage = await req.payload.create({
        collection: 'contact-messages',
        data: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || undefined,
          company: company?.trim() || undefined,
          subject,
          message: message.trim(),
          ipAddress: ip,
          userAgent: req.headers.get('user-agent') || 'unknown',
          website, // Pour détecter les bots a posteriori
        },
      })

      return Response.json({
        success: true,
        message: 'Merci pour votre message ! Je vous répondrai rapidement.',
        id: contactMessage.id,
      })

    } catch (error) {
      console.error('Erreur endpoint contact:', error)
      return Response.json(
        { success: false, error: 'Une erreur est survenue. Veuillez réessayer.' },
        { status: 500 }
      )
    }
  },
}
```

7. Mets à jour `src/payload.config.ts` pour ajouter la collection et l'endpoint :

Dans les imports, ajoute :
```typescript
import { ContactMessages } from './collections/ContactMessages'
import { contactEndpoint } from './endpoints/contact'
```

Dans `collections`, ajoute :
```typescript
ContactMessages,
```

Dans `endpoints`, ajoute :
```typescript
contactEndpoint,
```

8. Crée le fichier `src/globals/Contact.ts` - Page de contact configurable :

```typescript
import { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Page Contact',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la page',
      defaultValue: 'Me contacter',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Sous-titre / Introduction',
      defaultValue: 'Une question, une opportunité, un projet ? N\'hésitez pas à me contacter !',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de la page',
    },
    
    // Informations de contact directes
    {
      name: 'directContact',
      type: 'group',
      label: 'Contact direct',
      fields: [
        {
          name: 'showEmail',
          type: 'checkbox',
          label: 'Afficher l\'email',
          defaultValue: true,
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          admin: {
            condition: (data, siblingData) => siblingData?.showEmail,
          },
        },
        {
          name: 'showPhone',
          type: 'checkbox',
          label: 'Afficher le téléphone',
          defaultValue: false,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Téléphone',
          admin: {
            condition: (data, siblingData) => siblingData?.showPhone,
          },
        },
        {
          name: 'showLocation',
          type: 'checkbox',
          label: 'Afficher la localisation',
          defaultValue: true,
        },
        {
          name: 'location',
          type: 'text',
          label: 'Localisation',
          admin: {
            condition: (data, siblingData) => siblingData?.showLocation,
            description: 'Ex: Paris, France',
          },
        },
      ],
    },
    
    // Configuration du formulaire
    {
      name: 'formConfig',
      type: 'group',
      label: 'Configuration du formulaire',
      fields: [
        {
          name: 'showCompanyField',
          type: 'checkbox',
          label: 'Afficher le champ "Entreprise"',
          defaultValue: true,
        },
        {
          name: 'showPhoneField',
          type: 'checkbox',
          label: 'Afficher le champ "Téléphone"',
          defaultValue: true,
        },
        {
          name: 'subjects',
          type: 'array',
          label: 'Sujets disponibles',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Valeur',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Libellé affiché',
              required: true,
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Emoji/Icône',
            },
          ],
        },
        {
          name: 'successMessage',
          type: 'textarea',
          label: 'Message de succès',
          defaultValue: 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.',
        },
      ],
    },
    
    // Réseaux sociaux
    {
      name: 'socialLinks',
      type: 'relationship',
      relationTo: 'social-links',
      hasMany: true,
      label: 'Liens réseaux sociaux à afficher',
    },
    
    // Disponibilité
    {
      name: 'availability',
      type: 'group',
      label: 'Disponibilité',
      fields: [
        {
          name: 'showAvailability',
          type: 'checkbox',
          label: 'Afficher le statut de disponibilité',
          defaultValue: true,
        },
        {
          name: 'isAvailable',
          type: 'checkbox',
          label: 'Actuellement disponible',
          defaultValue: true,
        },
        {
          name: 'availabilityText',
          type: 'text',
          label: 'Texte personnalisé',
          admin: {
            description: 'Ex: "Disponible pour missions freelance"',
          },
        },
        {
          name: 'responseTime',
          type: 'text',
          label: 'Temps de réponse moyen',
          admin: {
            description: 'Ex: "Réponse sous 24-48h"',
          },
        },
      ],
    },
  ],
}
```

9. Crée le dossier `documentations/email/` et le fichier `documentations/email/setup_resend.md` :

```markdown
# Configuration Email avec Resend

## Création du compte Resend

1. Aller sur https://resend.com/signup
2. Créer un compte gratuit (3000 emails/mois)
3. Confirmer l'email

## Obtenir la clé API

1. Aller dans **API Keys** dans le dashboard
2. Cliquer sur **Create API Key**
3. Donner un nom (ex: "Portfolio CMS")
4. Copier la clé (format: `re_xxxxxxxxxxxx`)

## Configuration du domaine (optionnel mais recommandé)

Pour envoyer depuis `contact@emacsah.com` au lieu de `onboarding@resend.dev` :

1. Aller dans **Domains** → **Add Domain**
2. Entrer `emacsah.com`
3. Ajouter les enregistrements DNS indiqués :
   - SPF (TXT)
   - DKIM (TXT)
   - DMARC (TXT)
4. Attendre la vérification (~5-30 min)

## Variables d'environnement

```env
# .env
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=contact@emacsah.com
EMAIL_TO=ton-email-perso@gmail.com
```

## Test

```bash
# Tester l'envoi avec curl
curl -X POST https://folio.emacsah.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "subject": "technical",
    "message": "Ceci est un test"
  }'
```

## Limites du plan gratuit

| Limite | Valeur |
|--------|--------|
| Emails/mois | 3000 |
| Domaines | 1 |
| API calls/sec | 2 |

## Troubleshooting

### Email non reçu
- Vérifier les spams
- Vérifier que EMAIL_TO est correct
- Consulter les logs dans le dashboard Resend

### Erreur "Domain not verified"
- Utiliser `onboarding@resend.dev` temporairement
- Ou attendre la vérification du domaine
```

10. Mets à jour `.env.example` :

```env
# ... autres variables ...

# Email - Resend (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=contact@emacsah.com
EMAIL_TO=votre-email@gmail.com
```

11. Affiche un résumé avec :
    - Comment créer le compte Resend
    - Les variables d'environnement à configurer
    - Comment tester le formulaire
    - Les limites du plan gratuit
