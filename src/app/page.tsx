export const metadata = {
  title: 'AIverse - AI Tools Discovery Platform',
  description: 'Discover the best AI tools for your needs',
}

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">Welcome to AIverse</h1>
        <div className="space-y-4">
          <a 
            href="/en" 
            className="block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue in English
          </a>
          <a 
            href="/zh" 
            className="block px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            继续使用中文
          </a>
        </div>
      </div>
    </div>
  )
}