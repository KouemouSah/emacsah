import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Blog',
  description: 'Articles et réflexions sur le développement, la data et l\'IA',
}

async function getArticles() {
  const payload = await getPayload({ config })
  const articles = await payload.find({
    collection: 'articles',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 50,
  })
  return articles.docs
}

export default async function BlogPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Blog
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Articles, tutoriels et réflexions sur le développement web,
            la data science et l'intelligence artificielle.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <p className="text-center text-slate-500 py-12">
              Aucun article publié pour le moment.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    {article.featuredImage ? (
                      <Image
                        src={typeof article.featuredImage === 'object' ? article.featuredImage.url : ''}
                        alt={article.title_fr}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                    {article.featured && (
                      <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
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
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {article.title_fr}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-2">
                      {article.excerpt_fr}
                    </p>

                    {/* Categories */}
                    {article.categories && article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {article.categories.slice(0, 2).map((cat: any) => {
                          const catData = typeof cat === 'object' ? cat : null
                          if (!catData) return null
                          return (
                            <span
                              key={catData.id}
                              className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded"
                            >
                              {catData.name_fr}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
