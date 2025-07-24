import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Star, Check, X, Globe, Calendar, Building, Tag } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { RatingSection } from "@/components/tools/RatingSection"
import { CompareButton } from "@/components/tools/CompareButton"
import type { Tool } from "@/types"

// Mock data - replace with API call
const mockTool: Tool = {
  id: 1,
  slug: "chatgpt",
  name: "ChatGPT",
  tagline: "Advanced AI language model for conversation and content creation",
  description: "ChatGPT is a large language model developed by OpenAI that can engage in conversational dialogue and assist with a wide range of tasks including writing, analysis, coding, math, creative work, and more. It's trained on a diverse range of internet text and can understand and generate human-like responses.",
  websiteUrl: "https://chat.openai.com",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  pricingType: "freemium",
  startingPrice: 20,
  categoryId: 1,
  category: { id: 1, name: "AI Assistants", slug: "ai-assistants", sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  features: [
    "Natural language processing",
    "Code generation and debugging",
    "Creative writing and brainstorming",
    "Problem solving and analysis",
    "Multi-language support",
    "Context retention in conversations",
    "Image understanding (GPT-4)",
    "Web browsing capabilities"
  ],
  prosAndCons: {
    pros: [
      "Highly versatile and capable across many domains",
      "User-friendly conversational interface",
      "Continuous improvements and updates",
      "Strong context understanding",
      "Available API for developers"
    ],
    cons: [
      "Can occasionally generate incorrect information",
      "Knowledge cutoff date limitations",
      "Token limits in conversations",
      "Premium features require subscription"
    ]
  },
  apiAvailable: true,
  companyName: "OpenAI",
  foundedYear: 2022,
  lastUpdated: new Date("2024-01-15"),
  status: "active",
  viewCount: 50000,
  featured: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Fetch tool data
  const tool = mockTool // Replace with API call
  
  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  return {
    title: `${tool.name} - AI Tool Review & Pricing`,
    description: tool.tagline || tool.description,
  }
}

export default async function ToolDetailPage({ params }: PageProps) {
  // Fetch tool data - replace with API call
  const tool = params.slug === "chatgpt" ? mockTool : null

  if (!tool) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/tools" className="text-gray-500 hover:text-gray-700">
              Tools
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/tools?category=${tool.category.slug}`} className="text-gray-500 hover:text-gray-700">
              {tool.category.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{tool.name}</span>
          </nav>
        </div>
      </div>

      {/* Tool Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              {tool.logoUrl ? (
                <div className="relative w-24 h-24 bg-gray-100 rounded-xl overflow-hidden">
                  <Image
                    src={tool.logoUrl}
                    alt={`${tool.name} logo`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">
                    {tool.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Tool Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
                  <p className="text-lg text-gray-600 mb-4">{tool.tagline}</p>
                  
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    {tool.companyName && (
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{tool.companyName}</span>
                      </div>
                    )}
                    {tool.foundedYear && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Founded {tool.foundedYear}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span>{tool.category.name}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Badge */}
                <div className="text-right">
                  <div className="mb-2">
                    {tool.pricingType === "free" && (
                      <span className="text-2xl font-bold text-green-600">Free</span>
                    )}
                    {tool.pricingType === "freemium" && (
                      <div>
                        <span className="text-sm text-gray-500">Starting at</span>
                        <span className="block text-2xl font-bold text-blue-600">
                          {formatCurrency(tool.startingPrice)}/mo
                        </span>
                      </div>
                    )}
                    {tool.pricingType === "paid" && (
                      <div>
                        <span className="text-sm text-gray-500">From</span>
                        <span className="block text-2xl font-bold text-purple-600">
                          {formatCurrency(tool.startingPrice)}/mo
                        </span>
                      </div>
                    )}
                    {tool.pricingType === "custom" && (
                      <span className="text-2xl font-bold text-gray-600">Custom Pricing</span>
                    )}
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex gap-3 mt-4">
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <CompareButton tool={tool} className="px-6 py-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {tool.name}</h2>
              <p className="text-gray-600 whitespace-pre-line">{tool.description}</p>
            </section>

            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Pros and Cons */}
            {tool.prosAndCons && (
              <section className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pros & Cons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros */}
                  <div>
                    <h3 className="font-medium text-green-600 mb-3">Pros</h3>
                    <div className="space-y-2">
                      {tool.prosAndCons.pros?.map((pro, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Cons */}
                  <div>
                    <h3 className="font-medium text-red-600 mb-3">Cons</h3>
                    <div className="space-y-2">
                      {tool.prosAndCons.cons?.map((con, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Ratings & Reviews */}
            <RatingSection
              toolId={tool.id}
              toolName={tool.name}
              averageRating={4.5}
              totalRatings={234}
              ratings={[
                {
                  id: 1,
                  rating: 5,
                  review: "ChatGPT has revolutionized how I work. The ability to get instant help with coding, writing, and problem-solving is incredible.",
                  userId: "user1",
                  userName: "John Doe",
                  createdAt: new Date("2024-01-10"),
                  helpful: 12,
                },
                {
                  id: 2,
                  rating: 4,
                  review: "Great tool overall, but sometimes provides outdated information. The premium features are worth it though.",
                  userId: "user2",
                  userName: "Jane Smith",
                  createdAt: new Date("2024-01-08"),
                  helpful: 8,
                },
              ]}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">API Available</span>
                  <span className="font-medium">
                    {tool.apiAvailable ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="font-medium">
                    {tool.lastUpdated ? formatDate(tool.lastUpdated) : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Views</span>
                  <span className="font-medium">{tool.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">User Rating</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">4.5</span>
              </div>
              <p className="text-gray-500 text-sm">Based on 234 reviews</p>
            </div>

            {/* Similar Tools */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Similar Tools</h3>
              <div className="space-y-3">
                <Link href="/tools/claude" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition">
                  <p className="font-medium text-gray-900">Claude</p>
                  <p className="text-sm text-gray-500">AI assistant by Anthropic</p>
                </Link>
                <Link href="/tools/gemini" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition">
                  <p className="font-medium text-gray-900">Gemini</p>
                  <p className="text-sm text-gray-500">Google's multimodal AI</p>
                </Link>
                <Link href="/tools/perplexity" className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition">
                  <p className="font-medium text-gray-900">Perplexity</p>
                  <p className="text-sm text-gray-500">AI-powered search engine</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}