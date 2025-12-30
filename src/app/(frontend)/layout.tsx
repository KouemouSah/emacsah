import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Portfolio | Emacsah',
    template: '%s | Emacsah',
  },
  description: 'Portfolio personnel - Développeur Full Stack',
  keywords: ['portfolio', 'développeur', 'full stack', 'web', 'react', 'next.js'],
  authors: [{ name: 'Emacsah' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://emacsah.com',
    siteName: 'Emacsah Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
