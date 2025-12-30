export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container-custom">
        <div className="max-w-3xl">
          <p className="text-primary-600 font-medium mb-4">Bonjour, je suis</p>
          <h1 className="heading-1 text-gray-900 mb-6">
            <span className="text-gradient">Emacsah</span>
            <br />
            Développeur Full Stack
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Je crée des applications web modernes et performantes.
            Passionné par les nouvelles technologies.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">Voir mes projets</a>
            <a href="#contact" className="btn-secondary">Me contacter</a>
          </div>
        </div>
      </div>
    </section>
  )
}
