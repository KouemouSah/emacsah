const projects = [
  {
    title: 'Portfolio CMS',
    description: 'CMS personnalisé avec Payload et Next.js.',
    tags: ['Payload', 'Next.js', 'TypeScript'],
    github: 'https://github.com/emacsah/portfolio',
    live: 'https://emacsah.com',
  },
]

export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <h2 className="heading-2 text-center mb-12">
          Mes <span className="text-gradient">projets</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article key={project.title} className="card overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100" />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.github} className="text-sm text-gray-500 hover:text-primary-600">GitHub</a>
                  <a href={project.live} className="text-sm text-gray-500 hover:text-primary-600">Voir</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
