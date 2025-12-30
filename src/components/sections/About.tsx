const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'Redis', 'Payload'] },
  { category: 'DevOps', items: ['Docker', 'GitHub Actions', 'Nginx', 'Linux'] },
]

export function About() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="heading-2 text-center mb-12">
          À propos de <span className="text-gradient">moi</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 mb-6">
              Développeur passionné avec une expertise en développement web full stack.
            </p>
            <p className="text-gray-600">
              Mon parcours me permet de maîtriser un large éventail de technologies modernes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {skills.map((skill) => (
              <div key={skill.category} className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="px-3 py-1 bg-gray-100 text-sm rounded-full">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
