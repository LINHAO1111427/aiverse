export const metadata = {
  title: 'About Us - AIverse',
  description: 'Learn about AIverse mission to help you discover the best AI tools.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About AIverse
            </h1>
            <p className="text-xl text-gray-600">
              We are dedicated to helping you discover the best AI tools for your needs.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-gray-600 leading-relaxed">
                This page is under development. More features coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}