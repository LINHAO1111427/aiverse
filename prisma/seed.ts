import { PrismaClient, PricingType, ToolStatus } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "AI Assistants",
        slug: "ai-assistants",
        description: "AI-powered conversational assistants and chatbots",
        icon: "MessageSquare",
        color: "#3B82F6",
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Image Generation",
        slug: "image-generation",
        description: "AI tools for creating and editing images",
        icon: "Image",
        color: "#8B5CF6",
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "Code & Development",
        slug: "code-development",
        description: "AI tools for coding and software development",
        icon: "Code",
        color: "#10B981",
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Writing Tools",
        slug: "writing-tools",
        description: "AI-powered writing and content creation tools",
        icon: "PenTool",
        color: "#F59E0B",
        sortOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: "Voice & Audio",
        slug: "voice-audio",
        description: "AI tools for voice synthesis and audio processing",
        icon: "Mic",
        color: "#EF4444",
        sortOrder: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: "Video Editing",
        slug: "video-editing",
        description: "AI-powered video creation and editing tools",
        icon: "Video",
        color: "#14B8A6",
        sortOrder: 6,
      },
    }),
    prisma.category.create({
      data: {
        name: "Data Analysis",
        slug: "data-analysis",
        description: "AI tools for data analysis and visualization",
        icon: "BarChart",
        color: "#F97316",
        sortOrder: 7,
      },
    }),
    prisma.category.create({
      data: {
        name: "Productivity",
        slug: "productivity",
        description: "AI tools to enhance productivity and workflow",
        icon: "Zap",
        color: "#6366F1",
        sortOrder: 8,
      },
    }),
  ])

  console.log(`Created ${categories.length} categories`)

  // Create tools
  const tools = [
    {
      slug: "chatgpt",
      name: "ChatGPT",
      tagline: "Advanced AI language model for conversation and content creation",
      description: "ChatGPT is a large language model developed by OpenAI that can engage in conversational dialogue and assist with a wide range of tasks including writing, analysis, coding, math, creative work, and more.",
      websiteUrl: "https://chat.openai.com",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      pricingType: PricingType.freemium,
      startingPrice: 20,
      categoryId: categories[0].id,
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
      status: ToolStatus.active,
      featured: true,
      viewCount: 50000,
    },
    {
      slug: "claude",
      name: "Claude",
      tagline: "Anthropic's helpful, harmless, and honest AI assistant",
      description: "Claude is an AI assistant created by Anthropic to be helpful, harmless, and honest. It excels at analysis, writing, coding, and creative tasks with a focus on safety and reliability.",
      websiteUrl: "https://claude.ai",
      logoUrl: "https://claude.ai/images/claude-ai-icon.svg",
      pricingType: PricingType.freemium,
      startingPrice: 20,
      categoryId: categories[0].id,
      features: [
        "100K+ token context window",
        "Advanced code analysis and generation",
        "Document understanding and summarization",
        "Multi-language support",
        "Strong reasoning capabilities",
        "File upload support",
        "Constitutional AI training",
        "API access available"
      ],
      prosAndCons: {
        pros: [
          "Excellent at complex reasoning tasks",
          "Very large context window",
          "Strong coding capabilities",
          "Helpful and harmless by design",
          "Good at following instructions"
        ],
        cons: [
          "No image generation capabilities",
          "Limited availability in some regions",
          "No web browsing",
          "Subscription required for Pro features"
        ]
      },
      apiAvailable: true,
      companyName: "Anthropic",
      foundedYear: 2023,
      status: ToolStatus.active,
      featured: true,
      viewCount: 25000,
    },
    {
      slug: "midjourney",
      name: "Midjourney",
      tagline: "AI-powered image generation from text descriptions",
      description: "Midjourney is an AI art generator that creates stunning, artistic images from text prompts. Known for its distinctive aesthetic style and high-quality outputs.",
      websiteUrl: "https://midjourney.com",
      logoUrl: "https://cdn.worldvectorlogo.com/logos/midjourney.svg",
      pricingType: PricingType.paid,
      startingPrice: 10,
      categoryId: categories[1].id,
      features: [
        "Text-to-image generation",
        "Multiple artistic styles",
        "High resolution outputs",
        "Discord integration",
        "Image variations and upscaling",
        "Aspect ratio control",
        "Negative prompting",
        "Community gallery"
      ],
      prosAndCons: {
        pros: [
          "Exceptional artistic quality",
          "Unique aesthetic style",
          "Active community",
          "Regular updates and improvements",
          "Good at creative interpretations"
        ],
        cons: [
          "Discord-only interface",
          "Less photorealistic than competitors",
          "No API access",
          "Learning curve for prompting"
        ]
      },
      apiAvailable: false,
      companyName: "Midjourney Inc.",
      foundedYear: 2022,
      status: ToolStatus.active,
      featured: true,
      viewCount: 35000,
    },
    {
      slug: "github-copilot",
      name: "GitHub Copilot",
      tagline: "Your AI pair programmer",
      description: "GitHub Copilot uses AI to suggest code and entire functions in real-time, right from your editor. Trained on billions of lines of code, it helps you write code faster and with less effort.",
      websiteUrl: "https://github.com/features/copilot",
      logoUrl: "https://github.githubassets.com/images/modules/site/copilot/copilot.png",
      pricingType: PricingType.paid,
      startingPrice: 10,
      categoryId: categories[2].id,
      features: [
        "Real-time code suggestions",
        "Multiple programming languages",
        "IDE integration (VS Code, JetBrains, etc.)",
        "Context-aware completions",
        "Generate tests and documentation",
        "Code explanation",
        "Chat interface",
        "Enterprise features"
      ],
      prosAndCons: {
        pros: [
          "Seamless IDE integration",
          "Saves significant coding time",
          "Learns from your codebase",
          "Excellent for boilerplate code",
          "Regular updates and improvements"
        ],
        cons: [
          "Requires subscription",
          "May suggest incorrect code",
          "Privacy concerns for some",
          "Internet connection required"
        ]
      },
      apiAvailable: false,
      companyName: "GitHub/Microsoft",
      foundedYear: 2021,
      status: ToolStatus.active,
      featured: true,
      viewCount: 40000,
    },
    {
      slug: "stable-diffusion",
      name: "Stable Diffusion",
      tagline: "Open-source AI image generation model",
      description: "Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images from text descriptions. Being open-source, it has spawned a large ecosystem of tools and interfaces.",
      websiteUrl: "https://stability.ai",
      logoUrl: "https://stability.ai/favicon.ico",
      pricingType: PricingType.freemium,
      startingPrice: 0,
      categoryId: categories[1].id,
      features: [
        "Open source model",
        "Text-to-image generation",
        "Image-to-image transformation",
        "Inpainting and outpainting",
        "ControlNet support",
        "Multiple model versions",
        "Community models",
        "Local installation possible"
      ],
      prosAndCons: {
        pros: [
          "Completely open source",
          "Can run locally",
          "Huge community and ecosystem",
          "Very customizable",
          "No usage limits when self-hosted"
        ],
        cons: [
          "Requires technical knowledge",
          "Hardware requirements for local use",
          "Quality varies by implementation",
          "Less curated than commercial alternatives"
        ]
      },
      apiAvailable: true,
      companyName: "Stability AI",
      foundedYear: 2022,
      status: ToolStatus.active,
      featured: true,
      viewCount: 30000,
    },
    {
      slug: "jasper-ai",
      name: "Jasper AI",
      tagline: "AI content creator for marketing teams",
      description: "Jasper is an AI writing assistant specifically designed for marketing teams. It helps create high-quality content for blogs, ads, emails, and websites with brand voice consistency.",
      websiteUrl: "https://jasper.ai",
      logoUrl: "https://assets.jasper.ai/jasper-logo.svg",
      pricingType: PricingType.paid,
      startingPrice: 49,
      categoryId: categories[3].id,
      features: [
        "50+ content templates",
        "Brand voice customization",
        "SEO optimization",
        "Team collaboration",
        "Chrome extension",
        "Plagiarism checker",
        "Multi-language support",
        "API access"
      ],
      prosAndCons: {
        pros: [
          "Marketing-focused features",
          "Brand voice consistency",
          "Good template library",
          "Team collaboration tools",
          "Integration with marketing tools"
        ],
        cons: [
          "Higher price point",
          "Learning curve",
          "Output quality varies",
          "Limited free trial"
        ]
      },
      apiAvailable: true,
      companyName: "Jasper",
      foundedYear: 2021,
      status: ToolStatus.active,
      featured: false,
      viewCount: 20000,
    },
  ]

  // Create tools
  for (const toolData of tools) {
    const tool = await prisma.tool.create({
      data: toolData,
    })
    console.log(`Created tool: ${tool.name}`)
  }

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: "GPT-4", slug: "gpt-4" } }),
    prisma.tag.create({ data: { name: "Open Source", slug: "open-source" } }),
    prisma.tag.create({ data: { name: "API Available", slug: "api-available" } }),
    prisma.tag.create({ data: { name: "Free Plan", slug: "free-plan" } }),
    prisma.tag.create({ data: { name: "Enterprise", slug: "enterprise" } }),
  ])

  console.log(`Created ${tags.length} tags`)

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })