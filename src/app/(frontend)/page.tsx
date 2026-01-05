import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'EMACSAH - Portfolio',
  description: 'Portfolio de développeur full-stack - Projets, Articles et Contact',
}

async function getData() {
  const payload = await getPayload({ config })

  // Fetch projects and articles first (these should work)
  const [projects, articles] = await Promise.all([
    payload.find({
      collection: 'projects',
      where: { status: { equals: 'published' } },
      sort: '-featured,-order',
      limit: 6,
    }).catch(() => ({ docs: [] })),
    payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 3,
    }).catch(() => ({ docs: [] })),
  ])

  // Bio might fail if schema not yet pushed, handle gracefully
  let bio = null
  try {
    const bioResult = await payload.find({
      collection: 'bio',
      limit: 1,
    })
    bio = bioResult.docs[0] || null
  } catch {
    // Schema might not be ready yet, continue without bio
    bio = null
  }

  return {
    featuredProjects: projects.docs,
    recentArticles: articles.docs,
    bio,
  }
}

export default async function HomePage() {
  const { featuredProjects, recentArticles, bio } = await getData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {bio?.tagline_fr || 'Développeur Full-Stack'}
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                {bio?.intro_fr || 'Création d\'applications web modernes et performantes'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projets"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors"
                >
                  Voir mes projets
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
                >
                  Me contacter
                </Link>
              </div>
            </div>
            {bio?.avatar && typeof bio.avatar === 'object' && bio.avatar.url && (
              <div className="flex justify-center">
                <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-white/20">
                  <Image
                    src={bio.avatar.url}
                    alt="Photo de profil"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Projets récents</h2>
              <p className="text-slate-600 mt-2">Découvrez mes dernières réalisations</p>
            </div>
            <Link
              href="/projets"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Voir tous les projets →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project: any) => (
              <Link
                key={project.id}
                href={`/projets/${project.slug}`}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {project.featuredImage && typeof project.featuredImage === 'object' && (
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <Image
                      src={project.featuredImage.url || ''}
                      alt={project.title_fr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  {project.domain && (
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {project.domain}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 mt-3 group-hover:text-indigo-600 transition-colors">
                    {project.title_fr}
                  </h3>
                  <p className="text-slate-600 mt-2 line-clamp-2">
                    {project.summary_fr}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {featuredProjects.length === 0 && (
            <p className="text-center text-slate-500 py-12">
              Aucun projet publié pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Articles récents</h2>
              <p className="text-slate-600 mt-2">Pensées et tutoriels techniques</p>
            </div>
            <Link
              href="/blog"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Voir tous les articles →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentArticles.map((article: any) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {article.featuredImage && typeof article.featuredImage === 'object' && (
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <Image
                      src={article.featuredImage.url || ''}
                      alt={article.title_fr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {article.title_fr}
                  </h3>
                  <p className="text-slate-600 mt-2 text-sm line-clamp-2">
                    {article.excerpt_fr}
                  </p>
                  {article.publishedAt && (
                    <p className="text-slate-400 text-xs mt-4">
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {recentArticles.length === 0 && (
            <p className="text-center text-slate-500 py-12">
              Aucun article publié pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Un projet en tête ?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Je suis disponible pour discuter de vos projets et collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Contactez-moi
          </Link>
        </div>
      </section>
    </div>
  )
}
