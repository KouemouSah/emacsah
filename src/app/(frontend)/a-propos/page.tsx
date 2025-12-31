import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'

export const metadata = {
  title: 'À propos',
  description: 'En savoir plus sur mon parcours et mes compétences',
}

async function getBio() {
  const payload = await getPayload({ config })
  const bios = await payload.find({
    collection: 'bio',
    limit: 1,
  })
  return bios.docs[0] || null
}

async function getExperiences() {
  const payload = await getPayload({ config })
  const experiences = await payload.find({
    collection: 'experiences',
    sort: '-start_date',
    limit: 50,
  })
  return experiences.docs
}

async function getSocialLinks() {
  const payload = await getPayload({ config })
  const links = await payload.find({
    collection: 'social-links',
    where: {
      active: { equals: true },
    },
    sort: 'order',
    limit: 20,
  })
  return links.docs
}

export default async function AboutPage() {
  const [bio, experiences, socialLinks] = await Promise.all([
    getBio(),
    getExperiences(),
    getSocialLinks(),
  ])

  const socialIcons: Record<string, string> = {
    github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    twitter: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    website: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    email: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {bio?.avatar && typeof bio.avatar === 'object' && bio.avatar.url ? (
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl">
                  <Image
                    src={bio.avatar.url}
                    alt={bio.full_name || 'Avatar'}
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                  ES
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                {bio?.full_name || 'Emacsah'}
              </h1>
              {bio?.headline_fr && (
                <p className="text-xl text-amber-600 font-medium mb-4">
                  {bio.headline_fr}
                </p>
              )}
              {bio?.location && (
                <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {bio.location}
                </p>
              )}

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                  {socialLinks.map((link: any) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-600 rounded-full transition-colors"
                      title={link.platform}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={socialIcons[link.platform.toLowerCase()] || socialIcons.website} />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      {bio?.bio_fr && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">À propos de moi</h2>
            <div className="prose prose-slate prose-lg max-w-none">
              {typeof bio.bio_fr === 'string' ? (
                <p className="text-slate-600 leading-relaxed">{bio.bio_fr}</p>
              ) : (
                <p className="text-slate-600">Biographie disponible...</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {bio?.skills && bio.skills.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Compétences</h2>
            <div className="flex flex-wrap gap-3">
              {bio.skills.map((skillObj: any, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-amber-300 hover:shadow-sm transition-all"
                >
                  {skillObj.skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experiences */}
      {experiences.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Expériences</h2>
            <div className="space-y-8">
              {experiences.map((exp: any) => (
                <div
                  key={exp.id}
                  className="relative pl-8 border-l-2 border-amber-200 hover:border-amber-400 transition-colors"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 -ml-2 bg-amber-400 rounded-full" />

                  <div className="text-sm text-slate-500 mb-1">
                    {exp.start_date && new Date(exp.start_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    {' - '}
                    {exp.end_date
                      ? new Date(exp.end_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                      : 'Présent'
                    }
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {exp.title_fr}
                  </h3>

                  <p className="text-amber-600 font-medium">
                    {exp.company}
                    {exp.location && <span className="text-slate-400"> • {exp.location}</span>}
                  </p>

                  {exp.description_fr && (
                    <div className="mt-2 text-slate-600 text-sm">
                      {typeof exp.description_fr === 'string' ? (
                        <p>{exp.description_fr}</p>
                      ) : (
                        <p>Description disponible...</p>
                      )}
                    </div>
                  )}

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech: any) => {
                        const techData = typeof tech === 'object' ? tech : null
                        if (!techData) return null
                        return (
                          <span
                            key={techData.id}
                            className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                          >
                            {techData.name}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-500 to-orange-500">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Intéressé par une collaboration ?
          </h2>
          <p className="text-amber-100 mb-8">
            N&apos;hésitez pas à me contacter pour discuter de vos projets.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
          >
            Me contacter
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}
