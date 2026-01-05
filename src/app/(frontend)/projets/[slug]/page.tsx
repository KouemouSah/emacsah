import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

// Composant pour afficher le contenu rich text de Payload (Lexical)
function RichTextContent({ content }: { content: any }) {
  if (!content) return null

  if (typeof content === 'string') {
    return <p>{content}</p>
  }

  if (content.root?.children) {
    return (
      <div className="prose prose-slate max-w-none">
        {content.root.children.map((node: any, index: number) => {
          if (node.type === 'paragraph') {
            const text = node.children?.map((child: any) => child.text || '').join('') || ''
            return text ? <p key={index}>{text}</p> : null
          }
          if (node.type === 'heading') {
            const text = node.children?.map((child: any) => child.text || '').join('') || ''
            const level = node.tag || 2
            if (level === 1) return <h1 key={index}>{text}</h1>
            if (level === 2) return <h2 key={index}>{text}</h2>
            if (level === 3) return <h3 key={index}>{text}</h3>
            if (level === 4) return <h4 key={index}>{text}</h4>
            return <h5 key={index}>{text}</h5>
          }
          if (node.type === 'list') {
            if (node.listType === 'bullet') {
              return (
                <ul key={index}>
                  {node.children?.map((item: any, itemIndex: number) => (
                    <li key={itemIndex}>
                      {item.children?.map((child: any) => child.text || '').join('')}
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <ol key={index}>
                {node.children?.map((item: any, itemIndex: number) => (
                  <li key={itemIndex}>
                    {item.children?.map((child: any) => child.text || '').join('')}
                  </li>
                ))}
              </ol>
            )
          }
          return null
        })}
      </div>
    )
  }

  return null
}

interface Props {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  const payload = await getPayload({ config })
  const projects = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })
  return projects.docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: 'Projet non trouvé' }
  }

  return {
    title: project.meta_title_fr || project.title_fr,
    description: project.meta_description_fr || project.summary_fr,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projets"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux projets
          </Link>

          <div className="flex items-center gap-3 mb-4">
            {project.domain && (
              <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {project.domain}
              </span>
            )}
            {project.featured && (
              <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {project.title_fr}
          </h1>

          <p className="text-xl text-slate-600">
            {project.summary_fr}
          </p>

          {project.publishedAt && (
            <p className="text-sm text-slate-500 mt-6">
              Publié le {new Date(project.publishedAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {project.featuredImage && typeof project.featuredImage === 'object' && project.featuredImage.url && (
        <section className="py-8">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={project.featuredImage.url}
                alt={project.title_fr}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Description */}
          {project.description_fr && (
            <div className="mb-12">
              <RichTextContent content={project.description_fr} />
            </div>
          )}

          {/* Business Context */}
          {project.business_context_fr && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contexte métier</h2>
              <RichTextContent content={project.business_context_fr} />
            </div>
          )}

          {/* Problem Solved */}
          {project.problem_solved_fr && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Problème résolu</h2>
              <RichTextContent content={project.problem_solved_fr} />
            </div>
          )}

          {/* Architecture */}
          {project.architecture_fr && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Architecture technique</h2>
              <RichTextContent content={project.architecture_fr} />
              {project.architecture_diagram && typeof project.architecture_diagram === 'object' && project.architecture_diagram.url && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <Image
                    src={project.architecture_diagram.url}
                    alt="Diagramme architecture"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          )}

          {/* Benefits */}
          {project.benefits && project.benefits.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Bénéfices</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.benefits.map((benefit: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl"
                  >
                    <h3 className="font-bold text-slate-900 mb-2">{benefit.title_fr}</h3>
                    {benefit.description_fr && (
                      <p className="text-slate-600 text-sm">{benefit.description_fr}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact sections */}
          {(project.societal_impact_fr || project.environmental_impact_fr) && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Impact</h2>
              <div className="space-y-8">
                {project.societal_impact_fr && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Impact sociétal</h3>
                    <RichTextContent content={project.societal_impact_fr} />
                  </div>
                )}
                {project.environmental_impact_fr && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Impact environnemental</h3>
                    <RichTextContent content={project.environmental_impact_fr} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Technologies utilisées</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: any) => {
                  const techData = typeof tech === 'object' ? tech : null
                  if (!techData) return null
                  return (
                    <span
                      key={techData.id}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      style={techData.color ? { borderLeft: `3px solid ${techData.color}` } : {}}
                    >
                      {techData.name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Stakeholders */}
          {project.stakeholders && project.stakeholders.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Parties prenantes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.stakeholders.map((stakeholder: any, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                    {stakeholder.logo && typeof stakeholder.logo === 'object' && stakeholder.logo.url && (
                      <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={stakeholder.logo.url}
                          alt={stakeholder.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900">{stakeholder.name}</h3>
                      <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {stakeholder.role}
                      </span>
                      {stakeholder.description_fr && (
                        <p className="text-slate-600 text-sm mt-2">{stakeholder.description_fr}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Galerie</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.gallery.map((item: any, index: number) => {
                  const image = typeof item.image === 'object' ? item.image : null
                  if (!image?.url) return null
                  return (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={item.caption_fr || `Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {item.caption_fr && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
                          {item.caption_fr}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Links */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Voir le projet
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Code source
              </a>
            )}
            {project.links && project.links.length > 0 && project.links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {link.label_fr || link.type}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
