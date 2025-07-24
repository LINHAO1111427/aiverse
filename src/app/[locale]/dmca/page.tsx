import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale })
  
  return {
    title: t('footer.dmca') + ' - AIverse',
    description: 'DMCA Policy for AIverse - Information about copyright infringement claims and procedures.',
  }
}

export default async function DmcaPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{t('footer.dmca')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Last updated: January 15, 2024</p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">DMCA Notice and Takedown Policy</h2>
            <p>
              AIverse respects the intellectual property rights of others and expects its users to do the same. 
              In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond expeditiously 
              to claims of copyright infringement committed using our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Filing a DMCA Notice</h2>
            <p>
              If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement 
              and is accessible on this site, please notify our copyright agent as set forth below. For your complaint 
              to be valid under the DMCA, you must provide the following information:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>An electronic or physical signature of a person authorized to act on behalf of the copyright owner</li>
              <li>Identification of the copyrighted work that you claim has been infringed</li>
              <li>Identification of the material that is claimed to be infringing and where it is located on the Service</li>
              <li>Your address, telephone number, and email address</li>
              <li>A statement that you have a good faith belief that use of the material is not authorized</li>
              <li>A statement, made under penalty of perjury, that the above information is accurate</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Counter-Notification</h2>
            <p>
              If you believe that your material has been removed by mistake or misidentification, you may submit 
              a counter-notification to our copyright agent with the following information:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Your physical or electronic signature</li>
              <li>Identification of the material that has been removed and the location where it appeared</li>
              <li>A statement under penalty of perjury that you have a good faith belief the material was removed by mistake</li>
              <li>Your name, address, and telephone number</li>
              <li>A statement that you consent to jurisdiction of Federal District Court and will accept service of process</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Designated Copyright Agent</h2>
            <p>
              All notices regarding copyright infringement claims should be sent to our designated agent:
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mt-4">
              <p className="font-semibold">AIverse Copyright Agent</p>
              <p>Email: dmca@aiverse.com</p>
              <p>Address: 123 AI Street, Tech City, TC 12345</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Repeat Infringers</h2>
            <p>
              AIverse will, in appropriate circumstances, terminate the accounts of users who are repeat infringers 
              of intellectual property rights. We reserve the right to terminate any user account at any time for any reason.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <p>
              AIverse reserves the right to modify this policy at any time. Any changes will be posted on this page 
              with an updated revision date. Users are encouraged to review this policy periodically.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">No Legal Advice</h2>
            <p>
              The information provided in this policy is not legal advice. We recommend consulting with legal counsel 
              for specific questions about DMCA compliance or copyright law.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}