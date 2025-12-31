import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  const payload = await getPayload({ config })
  const articles = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })
  return articles.docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return { title: 'Article non trouvé' }
  }

  return {
    title: article.meta_title_fr || article.title_fr,
    description: article.meta_description_fr || article.excerpt_fr,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-800 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour au blog
          </Link>

          {/* Categories */}
          {article.categories && article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map((cat: any) => {
                const catData = typeof cat === 'object' ? cat : null
                if (!catData) return null
                return (
                  <span
                    key={catData.id}
                    className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"
                  >
                    {catData.name_fr}
                  </span>
                )
              })}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {article.title_fr}
          </h1>

          {article.excerpt_fr && (
            <p className="text-xl text-slate-600 mb-6">
              {article.excerpt_fr}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            {article.author && typeof article.author === 'object' && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-medium">
                    {(article.author.name || article.author.email || 'A')[0].toUpperCase()}
                  </span>
                </div>
                <span>{article.author.name || article.author.email}</span>
              </div>
            )}
            {article.publishedAt && (
              <time>
                {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            )}
            {article.reading_time && (
              <span>{article.reading_time} min de lecture</span>
            )}
            {article.views_count > 0 && (
              <span>{article.views_count} vues</span>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.featuredImage && (
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={typeof article.featuredImage === 'object' ? article.featuredImage.url || '' : ''}
                alt={article.title_fr}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="prose prose-slate prose-lg max-w-none">
            {article.content_fr && (
              <div>
                {typeof article.content_fr === 'string' ? (
                  <p>{article.content_fr}</p>
                ) : (
                  <div className="rich-text-content">
                    {/* Lexical content would be rendered here */}
                    <p className="text-slate-600">Contenu de l'article...</p>
                  </div>
                )}
              </div>
            )}
          </article>
        </div>
      </section>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <section className="py-8 border-t border-slate-200">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Tags:</span>
              {article.tags.map((tagObj: any, index: number) => (
                <span
                  key={index}
                  className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-full"
                >
                  #{tagObj.tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share / Navigation */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voir tous les articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
