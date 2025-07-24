import { Metadata } from "next"
import Link from "next/link"
import { Brain, Palette, Code, PenTool, Mic, Video, BarChart3, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Tool Categories - Browse by Type",
  description: "Explore AI tools organized by category. Find the perfect AI solution for your specific use case.",
}

// Icon mapping
const iconMap = {
  Brain,
  Palette,
  Code,
  PenTool,
  Mic,
  Video,
  BarChart3,
  Zap,
}

// Mock data - replace with API call
const categories = [
  {
    id: 1,
    name: "AI Assistants",
    slug: "ai-assistants",
    description: "AI-powered conversational assistants and chatbots for various tasks",
    icon: "Brain",
    color: "#3B82F6",
    toolCount: 124,
    popularTools: ["ChatGPT", "Claude", "Gemini"],
  },
  {
    id: 2,
    name: "Image Generation",
    slug: "image-generation",
    description: "Create stunning images and artwork using AI technology",
    icon: "Palette",
    color: "#8B5CF6",
    toolCount: 89,
    popularTools: ["Midjourney", "DALL-E", "Stable Diffusion"],
  },
  {
    id: 3,
    name: "Code & Development",
    slug: "code-development",
    description: "AI tools for coding, debugging, and software development",
    icon: "Code",
    color: "#10B981",
    toolCount: 76,
    popularTools: ["GitHub Copilot", "Cursor", "Tabnine"],
  },
  {
    id: 4,
    name: "Writing Tools",
    slug: "writing-tools",
    description: "AI-powered writing assistants for content creation and editing",
    icon: "PenTool",
    color: "#F59E0B",
    toolCount: 65,
    popularTools: ["Jasper", "Copy.ai", "Writesonic"],
  },
  {
    id: 5,
    name: "Voice & Audio",
    slug: "voice-audio",
    description: "Voice synthesis, transcription, and audio processing tools",
    icon: "Mic",
    color: "#EF4444",
    toolCount: 43,
    popularTools: ["ElevenLabs", "Murf", "Descript"],
  },
  {
    id: 6,
    name: "Video Editing",
    slug: "video-editing",
    description: "AI-powered video creation, editing, and enhancement tools",
    icon: "Video",
    color: "#14B8A6",
    toolCount: 38,
    popularTools: ["Synthesia", "Runway", "Pictory"],
  },
  {
    id: 7,
    name: "Data Analysis",
    slug: "data-analysis",
    description: "AI tools for data analysis, visualization, and insights",
    icon: "BarChart3",
    color: "#F97316",
    toolCount: 52,
    popularTools: ["Julius AI", "DataRobot", "H2O.ai"],
  },
  {
    id: 8,
    name: "Productivity",
    slug: "productivity",
    description: "AI tools to enhance productivity and streamline workflows",
    icon: "Zap",
    color: "#6366F1",
    toolCount: 91,
    popularTools: ["Notion AI", "Otter.ai", "Motion"],
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore our AI tools organized by use case. Each category contains carefully selected tools to help you achieve your goals.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            
            return (
              <Link
                key={category.id}
                href={`/tools?category=${category.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-200 group"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: category.color }}
                  />
                </div>

                {/* Category Info */}
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {category.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {category.toolCount} tools
                  </span>
                  <span className="text-blue-600 font-medium group-hover:underline">
                    View all →
                  </span>
                </div>

                {/* Popular Tools */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Popular:</p>
                  <div className="flex flex-wrap gap-1">
                    {category.popularTools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Explore 500+ AI Tools Across All Categories
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              From creative tools to productivity enhancers, find the perfect AI solution for your needs.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-75">Total Tools</div>
              </div>
              <div>
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm opacity-75">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm opacity-75">Monthly Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm opacity-75">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}