"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, X, Star, DollarSign, Calendar, Building, ExternalLink } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Tool } from "@/types"

// Mock data - replace with API calls
const mockTools: Record<string, Tool> = {
  chatgpt: {
    id: 1,
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "Advanced AI language model for conversation and content creation",
    description: "ChatGPT is a large language model developed by OpenAI.",
    websiteUrl: "https://chat.openai.com",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    pricingType: "freemium",
    startingPrice: 20,
    categoryId: 1,
    category: { id: 1, name: "AI Assistants", slug: "ai-assistants", sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    features: ["Natural language processing", "Code generation", "Creative writing", "Problem solving", "API access", "Plugins support"],
    apiAvailable: true,
    companyName: "OpenAI",
    foundedYear: 2022,
    status: "active",
    viewCount: 50000,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  claude: {
    id: 2,
    slug: "claude",
    name: "Claude",
    tagline: "Anthropic's helpful, harmless, and honest AI assistant",
    description: "Claude is an AI assistant created by Anthropic.",
    websiteUrl: "https://claude.ai",
    logoUrl: "https://claude.ai/images/claude-ai-icon.svg",
    pricingType: "freemium",
    startingPrice: 20,
    categoryId: 1,
    category: { id: 1, name: "AI Assistants", slug: "ai-assistants", sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    features: ["100K+ context window", "Code analysis", "Document understanding", "Multi-language support", "Constitutional AI", "File uploads"],
    apiAvailable: true,
    companyName: "Anthropic",
    foundedYear: 2023,
    status: "active",
    viewCount: 25000,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  gemini: {
    id: 3,
    slug: "gemini",
    name: "Gemini",
    tagline: "Google's most capable AI model",
    description: "Gemini is Google's multimodal AI model.",
    websiteUrl: "https://gemini.google.com",
    logoUrl: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    pricingType: "freemium",
    startingPrice: 0,
    categoryId: 1,
    category: { id: 1, name: "AI Assistants", slug: "ai-assistants", sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    features: ["Multimodal understanding", "Advanced reasoning", "Code generation", "Long context", "Integration with Google services", "Real-time information"],
    apiAvailable: true,
    companyName: "Google",
    foundedYear: 2023,
    status: "active",
    viewCount: 30000,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}

export default function ComparePage() {
  const searchParams = useSearchParams()
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const toolSlugs = searchParams.get("tools")?.split(",") || []
    const loadedTools = toolSlugs
      .map(slug => mockTools[slug])
      .filter(Boolean)
      .slice(0, 4) // Max 4 tools
    
    setTools(loadedTools)
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading comparison...</p>
      </div>
    )
  }

  if (tools.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Select at least 2 tools to compare
          </h1>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Tools
          </Link>
        </div>
      </div>
    )
  }

  // Comparison features
  const comparisonFeatures = [
    { key: "pricing", label: "Pricing", icon: DollarSign },
    { key: "rating", label: "User Rating", icon: Star },
    { key: "company", label: "Company", icon: Building },
    { key: "founded", label: "Founded", icon: Calendar },
    { key: "api", label: "API Available", icon: Check },
    { key: "features", label: "Key Features", icon: Check },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Compare AI Tools
          </h1>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-700 bg-gray-50 sticky left-0 z-10">
                    Feature
                  </th>
                  {tools.map((tool) => (
                    <th key={tool.id} className="p-4 text-center min-w-[200px]">
                      <div className="flex flex-col items-center gap-3">
                        {tool.logoUrl ? (
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={tool.logoUrl}
                              alt={tool.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">
                              {tool.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
                          <p className="text-sm text-gray-500">{tool.companyName}</p>
                        </div>
                        <a
                          href={tool.websiteUrl || undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          Visit Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Pricing */}
                <tr className="border-b">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Pricing
                    </div>
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="p-4 text-center">
                      <div className="font-medium">
                        {tool.pricingType === "free" && (
                          <span className="text-green-600">Free</span>
                        )}
                        {tool.pricingType === "freemium" && (
                          <div>
                            <span className="text-blue-600">Freemium</span>
                            {tool.startingPrice && (
                              <p className="text-sm text-gray-500 mt-1">
                                From {formatCurrency(tool.startingPrice)}/mo
                              </p>
                            )}
                          </div>
                        )}
                        {tool.pricingType === "paid" && (
                          <div>
                            <span className="text-purple-600">Paid</span>
                            {tool.startingPrice && (
                              <p className="text-sm text-gray-500 mt-1">
                                {formatCurrency(tool.startingPrice)}/mo
                              </p>
                            )}
                          </div>
                        )}
                        {tool.pricingType === "custom" && (
                          <span className="text-gray-600">Custom</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr className="border-b">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      User Rating
                    </div>
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">4.5</span>
                        <span className="text-sm text-gray-500">(234)</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Company */}
                <tr className="border-b">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Company
                    </div>
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="p-4 text-center">
                      {tool.companyName}
                    </td>
                  ))}
                </tr>

                {/* Founded */}
                <tr className="border-b">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Founded
                    </div>
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="p-4 text-center">
                      {tool.foundedYear || "N/A"}
                    </td>
                  ))}
                </tr>

                {/* API Available */}
                <tr className="border-b">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                    API Available
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="p-4 text-center">
                      {tool.apiAvailable ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Features */}
                <tr>
                  <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0 align-top">
                    Key Features
                  </td>
                  {tools.map((tool) => (
                    <td key={tool.id} className="p-4">
                      <ul className="space-y-2">
                        {tool.features?.slice(0, 6).map((feature: any, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Compare Other Tools
          </Link>
        </div>
      </div>
    </div>
  )
}