import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold text-gradient">
              Emacsah
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Portfolio personnel - Développeur Full Stack
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/emacsah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600">
              GitHub
            </a>
            <a href="https://linkedin.com/in/emacsah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Emacsah. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
