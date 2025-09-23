import { getTranslations } from '@/i18n/config'
import Link from 'next/link'

export const metadata = {
  title: 'AIverse - AI工具发现平台',
  description: '发现最适合您需求的AI工具',
}

export default function ChineseHomePage() {
  const t = getTranslations('zh')
  
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/zh" className="text-2xl font-bold text-blue-600">AIverse</Link>
            <div className="flex items-center space-x-6">
              <Link href="/zh/tools" className="text-gray-700 hover:text-blue-600">{t.nav.tools}</Link>
              <Link href="/zh/workflows" className="text-gray-700 hover:text-blue-600">{t.nav.workflows}</Link>
              <Link href="/zh/categories" className="text-gray-700 hover:text-blue-600">{t.nav.categories}</Link>
              <Link href="/en" className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">English</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.home.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t.home.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/zh/tools" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                {t.home.exploreTools}
              </Link>
              <Link href="/zh/workflows" className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                {t.home.viewWorkflows}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.home.whyChoose}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.home.fastDiscovery}</h3>
              <p className="text-gray-600">{t.home.fastDiscoveryDesc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.home.verifiedTools}</h3>
              <p className="text-gray-600">{t.home.verifiedToolsDesc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.home.communityDriven}</h3>
              <p className="text-gray-600">{t.home.communityDrivenDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1,000+</div>
              <div className="text-gray-600">{t.home.aiTools}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600">{t.home.happyUsers}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">{t.home.categories}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{t.home.footer}</p>
        </div>
      </footer>
    </div>
  )
}