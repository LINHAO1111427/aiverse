import { MetadataRoute } from "next"

// Mock data - replace with API call
const toolSlugs = [
  "chatgpt",
  "claude",
  "midjourney",
  "github-copilot",
  "stable-diffusion",
  "jasper-ai",
]

const categorySlugs = [
  "ai-assistants",
  "image-generation",
  "code-development",
  "writing-tools",
  "voice-audio",
  "video-editing",
  "data-analysis",
  "productivity",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aiverse.com"
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]
  
  // Tool pages
  const toolPages = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))
  
  // Category pages
  const categoryPages = categorySlugs.map((slug) => ({
    url: `${baseUrl}/tools?category=${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...toolPages, ...categoryPages]
}