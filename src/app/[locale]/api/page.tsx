import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Code, Key, Zap, Shield, Book, Terminal } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'api' })
  
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

export default async function ApiPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'api' })

  const features = [
    {
      icon: Zap,
      title: t('features.fast.title'),
      description: t('features.fast.description'),
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.description'),
    },
    {
      icon: Code,
      title: t('features.restful.title'),
      description: t('features.restful.description'),
    },
    {
      icon: Book,
      title: t('features.documented.title'),
      description: t('features.documented.description'),
    },
  ]

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/tools',
      description: t('endpoints.listTools'),
    },
    {
      method: 'GET',
      path: '/api/v1/tools/{id}',
      description: t('endpoints.getTool'),
    },
    {
      method: 'GET',
      path: '/api/v1/categories',
      description: t('endpoints.listCategories'),
    },
    {
      method: 'GET',
      path: '/api/v1/search',
      description: t('endpoints.search'),
    },
    {
      method: 'POST',
      path: '/api/v1/ratings',
      description: t('endpoints.submitRating'),
    },
  ]

  const codeExample = `// ${t('example.comment')}
const response = await fetch('https://api.aiverse.com/v1/tools', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const tools = await response.json();
console.log(tools);`

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-xl text-gray-600 mb-8">{t('hero.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#get-started"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t('hero.getStarted')}
              </a>
              <a
                href="#documentation"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                {t('hero.viewDocs')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('endpoints.title')}</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('endpoints.method')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('endpoints.endpoint')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('endpoints.description')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {endpoints.map((endpoint, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                        {endpoint.path}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {endpoint.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('example.title')}</h2>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-gray-300">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('pricing.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold mb-4">{t('pricing.free.name')}</h3>
                <p className="text-4xl font-bold mb-4">
                  $0<span className="text-lg font-normal text-gray-600">/mo</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.free.feature1')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.free.feature2')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.free.feature3')}
                  </li>
                </ul>
                <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  {t('pricing.getStarted')}
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-blue-600 text-white rounded-lg shadow-sm p-8 relative">
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                  {t('pricing.popular')}
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('pricing.pro.name')}</h3>
                <p className="text-4xl font-bold mb-4">
                  $49<span className="text-lg font-normal opacity-80">/mo</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.pro.feature1')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.pro.feature2')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.pro.feature3')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-white mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.pro.feature4')}
                  </li>
                </ul>
                <button className="w-full py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition">
                  {t('pricing.getStarted')}
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-2xl font-bold mb-4">{t('pricing.enterprise.name')}</h3>
                <p className="text-4xl font-bold mb-4">
                  {t('pricing.enterprise.price')}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.enterprise.feature1')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.enterprise.feature2')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.enterprise.feature3')}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('pricing.enterprise.feature4')}
                  </li>
                </ul>
                <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  {t('pricing.contactSales')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" id="get-started">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-lg text-gray-600 mb-8">{t('cta.subtitle')}</p>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">{t('cta.apiKey')}</label>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  {t('cta.generate')}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value="sk_test_..."
                  readOnly
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg font-mono text-sm"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  {t('cta.copy')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}