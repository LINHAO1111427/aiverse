import Link from "next/link"
import { Search, Sparkles, Zap, Shield, Cpu, Brain, Code, Palette } from "lucide-react"

export default function HomePage() {
  const categories = [
    { name: "AI Assistants", icon: Brain, count: 124, slug: "ai-assistants" },
    { name: "Image Generation", icon: Palette, count: 89, slug: "image-generation" },
    { name: "Code & Development", icon: Code, count: 76, slug: "code-development" },
    { name: "Writing Tools", icon: Zap, count: 112, slug: "writing-tools" },
    { name: "Productivity", icon: Sparkles, count: 95, slug: "productivity" },
    { name: "Data Analysis", icon: Cpu, count: 68, slug: "data-analysis" },
    { name: "Security", icon: Shield, count: 45, slug: "security" },
    { name: "Marketing", icon: Zap, count: 103, slug: "marketing" },
  ]

  const featuredTools = [
    {
      name: "ChatGPT",
      tagline: "Advanced AI language model for conversation and content creation",
      logo: "🤖",
      rating: 4.8,
      reviews: 2341,
      pricing: "Free / $20/mo",
      slug: "chatgpt"
    },
    {
      name: "Midjourney",
      tagline: "AI-powered image generation from text descriptions",
      logo: "🎨",
      rating: 4.7,
      reviews: 1892,
      pricing: "$10/mo",
      slug: "midjourney"
    },
    {
      name: "GitHub Copilot",
      tagline: "AI pair programmer that helps you write code faster",
      logo: "👨‍💻",
      rating: 4.6,
      reviews: 1567,
      pricing: "$10/mo",
      slug: "github-copilot"
    },
    {
      name: "Jasper AI",
      tagline: "AI writing assistant for marketing content",
      logo: "✍️",
      rating: 4.5,
      reviews: 987,
      pricing: "$49/mo",
      slug: "jasper-ai"
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover the Best AI Tools to
              <span className="text-blue-600"> Supercharge</span> Your Productivity
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore 500+ carefully curated AI tools to transform your workflow. 
              Find the perfect AI solution for your needs.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for AI tools..."
                className="w-full px-6 py-4 pr-12 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500">Popular:</span>
              {["ChatGPT", "Image Generation", "Code Assistant", "Writing Tools", "Video Editor"].map((term) => (
                <Link
                  key={term}
                  href={`/tools?search=${encodeURIComponent(term)}`}
                  className="text-sm px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.slug}
                  href={`/tools?category=${category.slug}`}
                  className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{category.count} tools</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured AI Tools</h2>
            <p className="text-gray-600">Hand-picked tools that are making waves in the AI community</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{tool.logo}</div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {tool.pricing}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.tagline}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{tool.rating}</span>
                    <span className="text-gray-500 text-sm">({tool.reviews})</span>
                  </div>
                  <span className="text-blue-600 text-sm font-medium">View →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Explore All Tools
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 mt-2">AI Tools</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600 mt-2">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600 mt-2">User Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">Daily</div>
              <div className="text-gray-600 mt-2">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest AI Tools
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get weekly updates about new AI tools, exclusive deals, and industry insights delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}