export const metadata = {
  title: 'AIverse - AI Tools Discovery Platform',
  description: 'Discover the best AI tools for your needs',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-blue-600">AIverse</a>
            <div className="space-x-6">
              <a href="/tools" className="text-gray-700 hover:text-blue-600">Tools</a>
              <a href="/workflows" className="text-gray-700 hover:text-blue-600">Workflows</a>
              <a href="/categories" className="text-gray-700 hover:text-blue-600">Categories</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discover the Best AI Tools
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find the perfect AI tools for your workflow. Explore, compare, and get started with the latest AI technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/tools" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Explore Tools
              </a>
              <a href="/workflows" className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                View Workflows
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose AIverse?</h2>
            <p className="text-gray-600">The most comprehensive platform for AI tool discovery</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Discovery</h3>
              <p className="text-gray-600">Find the right AI tool in minutes, not hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Tools</h3>
              <p className="text-gray-600">All tools are tested and verified by our team</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Powered by a community of AI enthusiasts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AIverse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}