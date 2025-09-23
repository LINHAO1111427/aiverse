export const metadata = {
  title: 'Onboarding - AIverse',
  description: 'Get started with AIverse',
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to AIverse</h1>
          <p className="text-gray-600 mb-6">
            Get started with discovering the best AI tools for your needs.
          </p>
          <a 
            href="/en"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  )
}