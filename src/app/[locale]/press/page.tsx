import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Download, Mail, Phone, FileText } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale })
  
  return {
    title: t('footer.press') + ' - AIverse',
    description: 'Press resources and media kit for AIverse - Find logos, brand guidelines, and press releases.',
  }
}

export default async function PressPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale })

  const pressReleases = [
    {
      date: '2024-01-10',
      title: 'AIverse Reaches 100,000 Monthly Active Users',
      description: 'Leading AI tools directory celebrates major milestone in user growth.',
    },
    {
      date: '2023-12-15',
      title: 'AIverse Launches API for Developers',
      description: 'New API enables developers to integrate AI tools data into their applications.',
    },
    {
      date: '2023-11-20',
      title: 'AIverse Adds Support for 8 Languages',
      description: 'Platform now available in English, Chinese, Japanese, Korean, and more.',
    },
  ]

  const stats = [
    { label: 'AI Tools Listed', value: '500+' },
    { label: 'Monthly Users', value: '100K+' },
    { label: 'User Reviews', value: '50K+' },
    { label: 'API Calls/Month', value: '1M+' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">{t('footer.press')}</h1>
        <p className="text-xl text-gray-600 mb-12">
          Get the latest news, press releases, and media resources about AIverse.
        </p>

        {/* Press Contact */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Press Contact</h2>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:press@aiverse.com" className="text-blue-600 hover:underline">
                    press@aiverse.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+15551234567" className="text-blue-600 hover:underline">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Company Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Press Releases */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Press Releases</h2>
          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(release.date).toLocaleDateString(locale, { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <h3 className="text-lg font-semibold mb-1">{release.title}</h3>
                    <p className="text-gray-600">{release.description}</p>
                  </div>
                  <FileText className="w-5 h-5 text-gray-400 ml-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Assets */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Brand Assets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">AIverse</span>
              </div>
              <h3 className="font-semibold mb-2">Logo Package</h3>
              <p className="text-gray-600 text-sm mb-4">
                Includes PNG, SVG, and vector formats in various colors.
              </p>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Download className="w-4 h-4" />
                Download Logo Pack
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-2">Brand Guidelines</h3>
              <p className="text-gray-600 text-sm mb-4">
                Complete guide to using AIverse brand assets correctly.
              </p>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Download className="w-4 h-4" />
                Download Guidelines
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded"></div>
                  <div className="w-8 h-8 bg-blue-400 rounded"></div>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Color Palette</h3>
              <p className="text-gray-600 text-sm mb-4">
                Official AIverse colors for digital and print use.
              </p>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <Download className="w-4 h-4" />
                Download Colors
              </button>
            </div>
          </div>
        </section>

        {/* About AIverse */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">About AIverse</h2>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-600 mb-4">
              AIverse is the leading directory for AI tools, helping users discover and compare over 500 AI solutions 
              across various categories. Our platform provides comprehensive information, user reviews, and detailed 
              comparisons to help individuals and businesses find the perfect AI tools for their needs.
            </p>
            <p className="text-gray-600">
              Founded in 2023, AIverse has quickly grown to serve over 100,000 monthly users and has become a trusted 
              resource for the AI community. Our mission is to make AI technology accessible and understandable for everyone.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}