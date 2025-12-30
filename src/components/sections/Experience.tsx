const experiences = [
  {
    title: 'Développeur Full Stack',
    company: 'Freelance',
    period: '2023 - Présent',
    description: 'Développement d\'applications web modernes.',
  },
]

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="heading-2 text-center mb-12">
          Mon <span className="text-gradient">parcours</span>
        </h2>
        <div className="max-w-2xl mx-auto space-y-8">
          {experiences.map((exp) => (
            <div key={exp.title} className="card p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="font-semibold">{exp.title}</h3>
                <span className="text-sm text-primary-600">@ {exp.company}</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{exp.period}</p>
              <p className="text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
