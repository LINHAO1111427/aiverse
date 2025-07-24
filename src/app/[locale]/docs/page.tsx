import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Book, Code, Zap, Shield, Search, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale })
  
  return {
    title: t('footer.documentation') + ' - AIverse',
    description: 'Documentation and guides for using AIverse platform and API.',
  }
}

export default async function DocsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale })

  const sections = [
    {
      icon: Zap,
      title: 'Getting Started',
      description: 'Learn the basics of using AIverse',
      links: [
        { title: 'Platform Overview', href: '#overview' },
        { title: 'Creating an Account', href: '#account' },
        { title: 'Finding AI Tools', href: '#finding-tools' },
        { title: 'Writing Reviews', href: '#reviews' },
      ],
    },
    {
      icon: Code,
      title: 'API Documentation',
      description: 'Integrate AIverse data into your apps',
      links: [
        { title: 'Authentication', href: '#auth' },
        { title: 'Endpoints Reference', href: '#endpoints' },
        { title: 'Rate Limits', href: '#rate-limits' },
        { title: 'Code Examples', href: '#examples' },
      ],
    },
    {
      icon: Book,
      title: 'User Guides',
      description: 'Detailed guides for platform features',
      links: [
        { title: 'Tool Comparison', href: '#comparison' },
        { title: 'Advanced Search', href: '#search' },
        { title: 'Submitting Tools', href: '#submit' },
        { title: 'Managing Reviews', href: '#manage-reviews' },
      ],
    },
    {
      icon: Shield,
      title: 'Best Practices',
      description: 'Tips for getting the most from AIverse',
      links: [
        { title: 'Choosing AI Tools', href: '#choosing' },
        { title: 'Security Guidelines', href: '#security' },
        { title: 'API Best Practices', href: '#api-best' },
        { title: 'Community Guidelines', href: '#community' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('footer.documentation')}</h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about using AIverse
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.title} className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Popular Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Popular Articles</h2>
          <div className="bg-white rounded-lg shadow-sm divide-y">
            <a href="#" className="block p-6 hover:bg-gray-50 transition">
              <h3 className="font-semibold mb-2">How to Choose the Right AI Tool for Your Business</h3>
              <p className="text-gray-600 text-sm">
                A comprehensive guide to evaluating AI tools based on your specific needs and requirements.
              </p>
            </a>
            <a href="#" className="block p-6 hover:bg-gray-50 transition">
              <h3 className="font-semibold mb-2">Getting Started with the AIverse API</h3>
              <p className="text-gray-600 text-sm">
                Learn how to authenticate and make your first API call to access our AI tools database.
              </p>
            </a>
            <a href="#" className="block p-6 hover:bg-gray-50 transition">
              <h3 className="font-semibold mb-2">Understanding AI Tool Categories</h3>
              <p className="text-gray-600 text-sm">
                Explore the different categories of AI tools and what each type can do for you.
              </p>
            </a>
          </div>
        </section>

        {/* Need Help */}
        <section className="bg-blue-50 rounded-lg p-8 text-center">
          <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Contact Support
            </Link>
            <Link
              href="/community"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Ask Community
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}