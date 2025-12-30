# Design System - Portfolio EMACSAH

## Style : Moderne Tech

Caractéristiques :
- Dégradés subtils
- Glassmorphism (effets de verre)
- Animations fluides
- Contrastes équilibrés
- Accents vibrants sur fond sobre

---

## 1. Palette de Couleurs

### 1.1 Couleurs Principales

```css
:root {
  /* ══════════════════════════════════════════════════════════════
     PRIMARY - Bleu-Violet Tech
     ══════════════════════════════════════════════════════════════ */
  --primary-50:  #f0f0ff;
  --primary-100: #e0e0ff;
  --primary-200: #c7c7fe;
  --primary-300: #a5a5fc;
  --primary-400: #8484f8;
  --primary-500: #6366f1;  /* ← Couleur principale */
  --primary-600: #5558e3;
  --primary-700: #4547c9;
  --primary-800: #3939a3;
  --primary-900: #323381;
  --primary-950: #1e1e4b;

  /* ══════════════════════════════════════════════════════════════
     SECONDARY - Cyan/Teal Tech
     ══════════════════════════════════════════════════════════════ */
  --secondary-50:  #ecfeff;
  --secondary-100: #cffafe;
  --secondary-200: #a5f3fc;
  --secondary-300: #67e8f9;
  --secondary-400: #22d3ee;
  --secondary-500: #06b6d4;  /* ← Couleur secondaire */
  --secondary-600: #0891b2;
  --secondary-700: #0e7490;
  --secondary-800: #155e75;
  --secondary-900: #164e63;
  --secondary-950: #083344;

  /* ══════════════════════════════════════════════════════════════
     ACCENT - Rose/Magenta pour highlights
     ══════════════════════════════════════════════════════════════ */
  --accent-50:  #fdf2f8;
  --accent-100: #fce7f3;
  --accent-200: #fbcfe8;
  --accent-300: #f9a8d4;
  --accent-400: #f472b6;
  --accent-500: #ec4899;  /* ← Accent */
  --accent-600: #db2777;
  --accent-700: #be185d;
  --accent-800: #9d174d;
  --accent-900: #831843;
  --accent-950: #500724;
}
```

### 1.2 Couleurs Neutres

```css
:root {
  /* ══════════════════════════════════════════════════════════════
     NEUTRAL - Gris avec légère teinte bleue
     ══════════════════════════════════════════════════════════════ */
  --neutral-50:  #f8fafc;
  --neutral-100: #f1f5f9;
  --neutral-200: #e2e8f0;
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1e293b;
  --neutral-900: #0f172a;
  --neutral-950: #020617;
}
```

### 1.3 Couleurs Sémantiques

```css
:root {
  /* Success - Vert */
  --success-50:  #f0fdf4;
  --success-500: #22c55e;
  --success-700: #15803d;

  /* Warning - Jaune/Orange */
  --warning-50:  #fffbeb;
  --warning-500: #f59e0b;
  --warning-700: #b45309;

  /* Error - Rouge */
  --error-50:  #fef2f2;
  --error-500: #ef4444;
  --error-700: #b91c1c;

  /* Info - Bleu */
  --info-50:  #eff6ff;
  --info-500: #3b82f6;
  --info-700: #1d4ed8;
}
```

### 1.4 Mode Light vs Dark

```css
/* ══════════════════════════════════════════════════════════════
   LIGHT MODE (défaut)
   ══════════════════════════════════════════════════════════════ */
:root {
  --background: #ffffff;
  --background-secondary: #f8fafc;
  --background-tertiary: #f1f5f9;
  
  --foreground: #0f172a;
  --foreground-secondary: #475569;
  --foreground-muted: #94a3b8;
  
  --border: #e2e8f0;
  --border-hover: #cbd5e1;
  
  --card-bg: #ffffff;
  --card-bg-hover: #f8fafc;
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* ══════════════════════════════════════════════════════════════
   DARK MODE
   ══════════════════════════════════════════════════════════════ */
[data-theme="dark"] {
  --background: #0a0a0f;
  --background-secondary: #111118;
  --background-tertiary: #18181f;
  
  --foreground: #f8fafc;
  --foreground-secondary: #cbd5e1;
  --foreground-muted: #64748b;
  
  --border: #1e293b;
  --border-hover: #334155;
  
  --card-bg: #111118;
  --card-bg-hover: #18181f;
  
  /* Glassmorphism - Dark */
  --glass-bg: rgba(17, 17, 24, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

### 1.5 Dégradés

```css
:root {
  /* Dégradé principal (hero, CTA) */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  
  /* Dégradé secondaire (cards, highlights) */
  --gradient-secondary: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  
  /* Dégradé accent (badges, tags) */
  --gradient-accent: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  
  /* Dégradé de fond subtil */
  --gradient-background: radial-gradient(ellipse at top, #1e1e4b 0%, #0a0a0f 50%);
  
  /* Dégradé texte (titres spéciaux) */
  --gradient-text: linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #ec4899 100%);
  
  /* Dégradé glow (effets lumineux) */
  --gradient-glow: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
}
```

---

## 2. Typographie

### 2.1 Polices

```css
:root {
  /* Police principale (texte) */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Police titres (optionnel: plus distinctive) */
  --font-display: 'Cal Sans', 'Inter', sans-serif;
  
  /* Police code */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

**Chargement Next.js :**
```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

// Optionnel: Cal Sans (local)
const calSans = localFont({
  src: '../fonts/CalSans-SemiBold.woff2',
  variable: '--font-display',
})
```

### 2.2 Échelle Typographique

```css
:root {
  /* Tailles */
  --text-xs:   0.75rem;    /* 12px */
  --text-sm:   0.875rem;   /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg:   1.125rem;   /* 18px */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.5rem;     /* 24px */
  --text-3xl:  1.875rem;   /* 30px */
  --text-4xl:  2.25rem;    /* 36px */
  --text-5xl:  3rem;       /* 48px */
  --text-6xl:  3.75rem;    /* 60px */
  --text-7xl:  4.5rem;     /* 72px */
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Letter spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}
```

### 2.3 Styles Typographiques

```css
/* Titre Hero */
.text-hero {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Titre Section */
.text-section {
  font-family: var(--font-display);
  font-size: clamp(1.875rem, 5vw, 2.5rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

/* Titre Card */
.text-card-title {
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}

/* Texte corps */
.text-body {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}

/* Texte large (articles) */
.text-body-lg {
  font-family: var(--font-sans);
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75;
}

/* Code inline */
.text-code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  padding: 0.2em 0.4em;
  background: var(--background-tertiary);
  border-radius: 0.25rem;
}

/* Label/Caption */
.text-caption {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 3. Espacements

### 3.1 Échelle d'espacement

```css
:root {
  --space-0:   0;
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */
}
```

### 3.2 Container & Layout

```css
:root {
  /* Container max-widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* Padding horizontal container */
  --container-padding: 1.5rem;
  
  /* Section vertical spacing */
  --section-padding: clamp(4rem, 10vw, 8rem);
}
```

---

## 4. Effets Visuels

### 4.1 Ombres

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Ombres colorées (hover) */
  --shadow-primary: 0 10px 40px -10px rgba(99, 102, 241, 0.4);
  --shadow-secondary: 0 10px 40px -10px rgba(6, 182, 212, 0.4);
  --shadow-accent: 0 10px 40px -10px rgba(236, 72, 153, 0.4);
  
  /* Glow effects */
  --glow-primary: 0 0 20px rgba(99, 102, 241, 0.3), 0 0 40px rgba(99, 102, 241, 0.1);
  --glow-secondary: 0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1);
}

/* Dark mode shadows */
[data-theme="dark"] {
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
}
```

### 4.2 Glassmorphism

```css
/* Glass Card */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

/* Glass Card - Variante forte */
.glass-strong {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

[data-theme="dark"] .glass-strong {
  background: rgba(17, 17, 24, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 4.3 Border Radius

```css
:root {
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-3xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;  /* Pill */
}
```

---

## 5. Composants

### 5.1 Boutons

```css
/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}

/* Primary Button */
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary);
}

/* Secondary Button */
.btn-secondary {
  background: var(--background-tertiary);
  color: var(--foreground);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--background-secondary);
  border-color: var(--border-hover);
}

/* Outline Button */
.btn-outline {
  background: transparent;
  color: var(--primary-500);
  border: 1px solid var(--primary-500);
}

.btn-outline:hover {
  background: var(--primary-500);
  color: white;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--foreground-secondary);
}

.btn-ghost:hover {
  background: var(--background-tertiary);
  color: var(--foreground);
}

/* Sizes */
.btn-sm { padding: 0.5rem 1rem; font-size: 0.75rem; }
.btn-lg { padding: 1rem 2rem; font-size: 1rem; }
```

### 5.2 Cards

```css
/* Base Card */
.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-lg);
}

/* Card Project */
.card-project {
  position: relative;
}

.card-project::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.card-project:hover::before {
  opacity: 0.05;
}

.card-project:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

/* Card Glass */
.card-glass {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
}
```

### 5.3 Badges & Tags

```css
/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: var(--radius-full);
  background: var(--background-tertiary);
  color: var(--foreground-secondary);
}

/* Badge coloré */
.badge-primary {
  background: var(--primary-100);
  color: var(--primary-700);
}

[data-theme="dark"] .badge-primary {
  background: var(--primary-950);
  color: var(--primary-300);
}

/* Tech Tag */
.tag-tech {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  background: var(--background-tertiary);
  color: var(--foreground-secondary);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.tag-tech:hover {
  border-color: var(--primary-500);
  color: var(--primary-500);
}

.tag-tech-icon {
  width: 16px;
  height: 16px;
}
```

### 5.4 Inputs

```css
/* Input */
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  color: var(--foreground);
  transition: all 0.2s ease;
}

.input::placeholder {
  color: var(--foreground-muted);
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input:invalid:not(:placeholder-shown) {
  border-color: var(--error-500);
}

/* Textarea */
.textarea {
  min-height: 120px;
  resize: vertical;
}

/* Select */
.select {
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* Chevron */
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

/* Label */
.label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--foreground);
}

/* Helper text */
.helper {
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: var(--foreground-muted);
}

.helper-error {
  color: var(--error-500);
}
```

### 5.5 Navigation

```css
/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

/* Nav Link */
.nav-link {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--foreground-secondary);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--foreground);
  background: var(--background-tertiary);
}

.nav-link.active {
  color: var(--primary-500);
}

/* Language Switch */
.lang-switch {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: var(--background-tertiary);
  border-radius: var(--radius-full);
}

.lang-switch-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: var(--radius-full);
  color: var(--foreground-muted);
  transition: all 0.2s ease;
}

.lang-switch-btn.active {
  background: var(--background);
  color: var(--foreground);
  box-shadow: var(--shadow-sm);
}

/* Theme Toggle */
.theme-toggle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background: var(--background-tertiary);
  color: var(--foreground-secondary);
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  color: var(--foreground);
}
```

---

## 6. Animations

### 6.1 Transitions de base

```css
:root {
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
  --transition-slower: 500ms ease;
  
  /* Easing */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### 6.2 Animations Keyframes

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade In Down */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Slide In Right */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Float */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Pulse Glow */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.5); }
}

/* Gradient Shift */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Typing Cursor */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

### 6.3 Classes d'animation

```css
/* Animation utilities */
.animate-fade-in {
  animation: fadeIn 0.5s var(--ease-out) forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s var(--ease-out) forwards;
}

.animate-scale-in {
  animation: scaleIn 0.4s var(--ease-out) forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}

/* Stagger delays */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }

/* Scroll reveal (initial state) */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s var(--ease-out);
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 7. Tailwind CSS Config

```javascript
// tailwind.config.js
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c7c7fe',
          300: '#a5a5fc',
          400: '#8484f8',
          500: '#6366f1',
          600: '#5558e3',
          700: '#4547c9',
          800: '#3939a3',
          900: '#323381',
          950: '#1e1e4b',
        },
        secondary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
```

---

## 8. Icônes

Utiliser **Lucide React** pour la cohérence.

```bash
pnpm add lucide-react
```

```tsx
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink,
  ArrowRight,
  Moon,
  Sun,
  Menu,
  X,
  Search,
  Filter,
  Code,
  Database,
  Cloud,
  Cpu,
  Globe,
  Calendar,
  Clock,
  Eye,
  MessageCircle,
  Download,
  ChevronRight,
} from 'lucide-react'
```

---

## 9. Responsive Breakpoints

```css
/* Mobile First */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

| Breakpoint | Grille | Container |
|------------|--------|-----------|
| Mobile (<640px) | 1 col | 100% - 24px |
| Tablet (640-1024px) | 2 cols | 640px |
| Desktop (1024-1280px) | 3 cols | 1024px |
| Large (>1280px) | 3-4 cols | 1280px |

---

## 10. Exemples visuels

### Hero Section

```
┌─────────────────────────────────────────────────────────────────┐
│                     ╔═══════════════════╗                       │
│                     ║   [Dégradé BG]    ║                       │
│                     ╚═══════════════════╝                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  ╭─────────╮                                             │   │
│  │  │  ◯◯◯   │  Bonjour, je suis                           │   │
│  │  │ Avatar  │                                             │   │
│  │  │         │  EMACSAH ← [Texte gradient animé]          │   │
│  │  ╰─────────╯                                             │   │
│  │                                                          │   │
│  │  Développeur Full-Stack & Data/IA                       │   │
│  │  ─────────────────────────────────                      │   │
│  │  Je crée des solutions innovantes...                    │   │
│  │                                                          │   │
│  │  ┌──────────────────┐  ┌──────────────────┐            │   │
│  │  │ ✨ Voir projets  │  │ 💬 Me contacter  │            │   │
│  │  │ [Gradient + Glow]│  │ [Outline]        │            │   │
│  │  └──────────────────┘  └──────────────────┘            │   │
│  │                                                          │   │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ← [Floating icons] │   │
│  │  │ ⚛️ │ │ 🐍 │ │ 🐳 │ │ 🤖 │ │ ☁️ │                    │   │
│  │  └────┘ └────┘ └────┘ └────┘ └────┘                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Project Card

```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │       [Image Projet]               │ │
│ │       avec overlay gradient        │ │
│ │       au hover                     │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│  Titre du Projet                        │
│  ─────────────────                      │
│  Description courte du projet qui       │
│  donne envie d'en savoir plus...       │
│                                         │
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │React │ │Node  │ │Docker│ ← Tags     │
│  └──────┘ └──────┘ └──────┘            │
│                                         │
│  [🔗 Demo]  [📂 GitHub]  [→]           │
│                                         │
└─────────────────────────────────────────┘
  ↑ Glass effect + shadow on hover
```
