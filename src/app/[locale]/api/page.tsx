import { Metadata } from 'next'
import { Code, Key, Zap, Shield, Book } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = locale === 'zh'
  
  return {
    title: isZh ? 'API 文档 - AIverse' : 'API Documentation - AIverse',
    description: isZh ? '使用AIverse API访问AI工具数据' : 'Access AI tools data with AIverse API',
  }
}

// 为静态生成添加参数
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' }
  ]
}

export default function ApiPage({ params: { locale } }: { params: { locale: string } }) {
  const isZh = locale === 'zh'

  const features = [
    {
      icon: Zap,
      title: isZh ? '高性能' : 'High Performance',
      description: isZh ? '毫秒级响应时间，确保最佳用户体验' : 'Millisecond response times for the best user experience',
    },
    {
      icon: Shield,
      title: isZh ? '安全可靠' : 'Secure & Reliable',
      description: isZh ? '企业级安全保障，99.9% 正常运行时间' : 'Enterprise-grade security with 99.9% uptime',
    },
    {
      icon: Code,
      title: isZh ? 'RESTful API' : 'RESTful API',
      description: isZh ? '标准RESTful设计，易于集成' : 'Standard RESTful design, easy to integrate',
    },
    {
      icon: Book,
      title: isZh ? '完整文档' : 'Full Documentation',
      description: isZh ? '详细的API文档和示例代码' : 'Detailed API documentation with code examples',
    },
  ]

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/tools',
      description: isZh ? '获取AI工具列表' : 'List all AI tools',
    },
    {
      method: 'GET',
      path: '/api/v1/tools/{id}',
      description: isZh ? '获取单个工具详情' : 'Get tool details',
    },
    {
      method: 'GET',
      path: '/api/v1/categories',
      description: isZh ? '获取所有分类' : 'List all categories',
    },
    {
      method: 'GET',
      path: '/api/v1/search',
      description: isZh ? '搜索AI工具' : 'Search AI tools',
    },
    {
      method: 'POST',
      path: '/api/v1/ratings',
      description: isZh ? '提交工具评分' : 'Submit tool rating',
    },
  ]

  const codeExample = `// ${isZh ? '获取所有AI工具' : 'Fetch all AI tools'}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isZh ? 'AIverse API 文档' : 'AIverse API Documentation'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {isZh ? '强大的API，轻松集成AI工具到您的应用' : 'Powerful API to integrate AI tools into your application'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#get-started"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {isZh ? '开始使用' : 'Get Started'}
              </a>
              <a
                href="#documentation"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                {isZh ? '查看文档' : 'View Documentation'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {isZh ? 'API 特性' : 'API Features'}
          </h2>
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
            <h2 className="text-3xl font-bold text-center mb-12">
              {isZh ? 'API 端点' : 'API Endpoints'}
            </h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {isZh ? '方法' : 'Method'}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {isZh ? '端点' : 'Endpoint'}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {isZh ? '描述' : 'Description'}
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
            <h2 className="text-3xl font-bold text-center mb-12">
              {isZh ? '示例代码' : 'Code Example'}
            </h2>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-gray-300">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" id="get-started">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isZh ? '准备开始了吗？' : 'Ready to Get Started?'}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {isZh ? '立即获取您的API密钥，开始构建！' : 'Get your API key now and start building!'}
            </p>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">
                  {isZh ? 'API 密钥' : 'API Key'}
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  {isZh ? '生成新密钥' : 'Generate New Key'}
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
                  {isZh ? '复制' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}