import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale })
  
  return {
    title: t('footer.cookies') + ' - AIverse',
    description: 'Cookie Policy for AIverse - Learn how we use cookies to improve your experience.',
  }
}

export default async function CookiesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t('footer.cookies')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Last updated: January 15, 2024</p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the owners of the site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Necessary Cookies</h3>
            <p>These cookies are essential for you to browse the website and use its features.</p>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Performance Cookies</h3>
            <p>These cookies collect information about how you use our website, such as which pages you visit most often.</p>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Functionality Cookies</h3>
            <p>These cookies allow the website to remember choices you make and provide enhanced features.</p>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Targeting Cookies</h3>
            <p>These cookies are used to deliver advertisements more relevant to you and your interests.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, 
              deliver advertisements on and through the Service, and so on. These third parties include:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Google Analytics</li>
              <li>Facebook Pixel</li>
              <li>LinkedIn Insight Tag</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability 
              of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you.
            </p>
            <p className="mt-4">
              To opt out of being tracked by Google Analytics across all websites, visit: 
              <a href="http://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline ml-1">
                http://tools.google.com/dlpage/gaoptout
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy 
              on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
            </p>
            <p className="mt-4">
              Email: privacy@aiverse.com<br />
              Address: 123 AI Street, Tech City, TC 12345
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}