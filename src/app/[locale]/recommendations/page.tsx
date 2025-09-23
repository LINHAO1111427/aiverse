export const metadata = {
  title: 'AI Tool Recommendations - AIverse',
  description: 'Get personalized AI tool recommendations',
}

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Tool Recommendations
            </h1>
            <p className="text-xl text-gray-600">
              Discover personalized AI tools based on your needs
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <p className="text-gray-600 leading-relaxed">
                Recommendation features are coming soon. Stay tuned for personalized AI tool suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}