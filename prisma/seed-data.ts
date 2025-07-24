import { PricingType, ToolStatus } from "@prisma/client"

export const mainCategories = [
  {
    name: "AI Assistants",
    slug: "ai-assistants",
    description: "AI-powered conversational assistants and chatbots",
    icon: "MessageSquare",
    color: "#3B82F6",
    sortOrder: 1,
  },
  {
    name: "Image Generation",
    slug: "image-generation",
    description: "AI tools for creating and editing images",
    icon: "Image",
    color: "#8B5CF6",
    sortOrder: 2,
  },
  {
    name: "Code & Development",
    slug: "code-development",
    description: "AI tools for coding and software development",
    icon: "Code",
    color: "#10B981",
    sortOrder: 3,
  },
  {
    name: "Writing Tools",
    slug: "writing-tools",
    description: "AI-powered writing and content creation tools",
    icon: "PenTool",
    color: "#F59E0B",
    sortOrder: 4,
  },
  {
    name: "Voice & Audio",
    slug: "voice-audio",
    description: "AI tools for voice synthesis and audio processing",
    icon: "Mic",
    color: "#EF4444",
    sortOrder: 5,
  },
  {
    name: "Video Editing",
    slug: "video-editing",
    description: "AI-powered video creation and editing tools",
    icon: "Video",
    color: "#14B8A6",
    sortOrder: 6,
  },
  {
    name: "Data Analysis",
    slug: "data-analysis",
    description: "AI tools for data analysis and visualization",
    icon: "BarChart",
    color: "#F97316",
    sortOrder: 7,
  },
  {
    name: "Productivity",
    slug: "productivity",
    description: "AI tools to enhance productivity and workflow",
    icon: "Zap",
    color: "#6366F1",
    sortOrder: 8,
  },
]

export const mainTools = [
  // AI Assistants
  {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "Advanced AI language model for conversation and content creation",
    description: "ChatGPT is a large language model developed by OpenAI that can engage in conversational dialogue and assist with a wide range of tasks including writing, analysis, coding, math, creative work, and more.",
    websiteUrl: "https://chat.openai.com",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    pricingType: PricingType.freemium,
    startingPrice: 20,
    categorySlug: "ai-assistants",
    features: [
      "Natural language processing",
      "Code generation and debugging",
      "Creative writing and brainstorming",
      "Problem solving and analysis",
      "Multi-language support",
      "Context retention in conversations",
      "Image understanding (GPT-4)",
      "Web browsing capabilities",
      "Custom GPTs creation",
      "Voice conversations"
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
    viewCount: 150000,
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
    categorySlug: "ai-assistants",
    features: [
      "100K+ token context window",
      "Advanced code analysis and generation",
      "Document understanding and summarization",
      "Multi-language support",
      "Strong reasoning capabilities",
      "File upload support",
      "Constitutional AI training",
      "API access available",
      "Artifacts for creating content",
      "Project organization"
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
    viewCount: 80000,
  },
  {
    slug: "gemini",
    name: "Gemini",
    tagline: "Google's most capable AI model family",
    description: "Gemini is Google's multimodal AI model that can understand and generate text, code, audio, image, and video. It comes in multiple sizes optimized for different tasks.",
    websiteUrl: "https://gemini.google.com",
    logoUrl: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    pricingType: PricingType.freemium,
    startingPrice: 0,
    categorySlug: "ai-assistants",
    features: [
      "Multimodal understanding",
      "Advanced reasoning",
      "Code generation",
      "1 million token context window (Pro)",
      "Integration with Google services",
      "Real-time information",
      "Image understanding",
      "Multiple model sizes",
      "API access",
      "Mobile app available"
    ],
    prosAndCons: {
      pros: [
        "Free tier available",
        "Excellent multimodal capabilities",
        "Large context window",
        "Google ecosystem integration",
        "Fast response times"
      ],
      cons: [
        "Newer to market",
        "Limited availability in some regions",
        "Pro features require payment",
        "Some features still in development"
      ]
    },
    apiAvailable: true,
    companyName: "Google",
    foundedYear: 2023,
    status: ToolStatus.active,
    featured: true,
    viewCount: 60000,
  },
  {
    slug: "copilot",
    name: "Microsoft Copilot",
    tagline: "Your AI companion powered by GPT-4",
    description: "Microsoft Copilot is an AI assistant that combines the power of GPT-4 with Bing search to provide accurate, up-to-date answers and creative content.",
    websiteUrl: "https://copilot.microsoft.com",
    logoUrl: "https://www.microsoft.com/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 20,
    categorySlug: "ai-assistants",
    features: [
      "GPT-4 powered responses",
      "Real-time web search",
      "Image generation with DALL-E 3",
      "Document analysis",
      "Code generation",
      "Microsoft 365 integration",
      "Multiple conversation styles",
      "Voice input support",
      "Mobile and desktop apps",
      "Plugin support"
    ],
    prosAndCons: {
      pros: [
        "Free access to GPT-4",
        "Real-time information",
        "Image generation included",
        "Microsoft ecosystem integration",
        "No message limits in free tier"
      ],
      cons: [
        "Requires Microsoft account",
        "Less customizable than ChatGPT",
        "Limited API access",
        "Conversation history not saved"
      ]
    },
    apiAvailable: false,
    companyName: "Microsoft",
    foundedYear: 2023,
    status: ToolStatus.active,
    featured: true,
    viewCount: 70000,
  },
  {
    slug: "perplexity",
    name: "Perplexity AI",
    tagline: "AI-powered answer engine with real-time search",
    description: "Perplexity is an AI-powered search engine that provides accurate answers with cited sources. It combines large language models with real-time web search.",
    websiteUrl: "https://perplexity.ai",
    logoUrl: "https://www.perplexity.ai/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 20,
    categorySlug: "ai-assistants",
    features: [
      "Real-time web search",
      "Source citations",
      "Multiple AI models",
      "Follow-up questions",
      "Collection organization",
      "Image search",
      "Academic search mode",
      "API access",
      "Mobile apps",
      "Chrome extension"
    ],
    prosAndCons: {
      pros: [
        "Always up-to-date information",
        "Transparent source citations",
        "Good for research",
        "Clean interface",
        "Free tier generous"
      ],
      cons: [
        "Limited creative capabilities",
        "No image generation",
        "Focused on search, not conversation",
        "Pro features expensive"
      ]
    },
    apiAvailable: true,
    companyName: "Perplexity AI",
    foundedYear: 2022,
    status: ToolStatus.active,
    featured: false,
    viewCount: 45000,
  },

  // Image Generation
  {
    slug: "midjourney",
    name: "Midjourney",
    tagline: "AI-powered image generation from text descriptions",
    description: "Midjourney is an AI art generator that creates stunning, artistic images from text prompts. Known for its distinctive aesthetic style and high-quality outputs.",
    websiteUrl: "https://midjourney.com",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/midjourney.svg",
    pricingType: PricingType.paid,
    startingPrice: 10,
    categorySlug: "image-generation",
    features: [
      "Text-to-image generation",
      "Multiple artistic styles",
      "High resolution outputs",
      "Discord integration",
      "Image variations and upscaling",
      "Aspect ratio control",
      "Negative prompting",
      "Community gallery",
      "Blend mode",
      "Style references"
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
    viewCount: 120000,
  },
  {
    slug: "dall-e-3",
    name: "DALL-E 3",
    tagline: "OpenAI's most advanced image generation model",
    description: "DALL-E 3 is OpenAI's latest image generation model that creates highly detailed and accurate images from text descriptions with better prompt adherence.",
    websiteUrl: "https://openai.com/dall-e-3",
    logoUrl: "https://openai.com/favicon.ico",
    pricingType: PricingType.paid,
    startingPrice: 20,
    categorySlug: "image-generation",
    features: [
      "High-quality image generation",
      "Better prompt understanding",
      "ChatGPT integration",
      "Safety features built-in",
      "Multiple aspect ratios",
      "Style consistency",
      "Text rendering in images",
      "API access",
      "Bing Image Creator integration",
      "HD quality option"
    ],
    prosAndCons: {
      pros: [
        "Excellent prompt adherence",
        "High quality outputs",
        "Integrated with ChatGPT",
        "Good at text in images",
        "Strong safety features"
      ],
      cons: [
        "Limited free usage",
        "No inpainting/outpainting",
        "Slower than some competitors",
        "Style less distinctive than Midjourney"
      ]
    },
    apiAvailable: true,
    companyName: "OpenAI",
    foundedYear: 2023,
    status: ToolStatus.active,
    featured: true,
    viewCount: 90000,
  },
  {
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    tagline: "Open-source AI image generation model",
    description: "Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images. Being open-source, it has spawned a large ecosystem.",
    websiteUrl: "https://stability.ai",
    logoUrl: "https://stability.ai/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 0,
    categorySlug: "image-generation",
    features: [
      "Open source model",
      "Text-to-image generation",
      "Image-to-image transformation",
      "Inpainting and outpainting",
      "ControlNet support",
      "Multiple model versions",
      "Community models",
      "Local installation possible",
      "API available",
      "SDXL for higher quality"
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
    viewCount: 100000,
  },
  {
    slug: "leonardo-ai",
    name: "Leonardo AI",
    tagline: "AI art generator with fine-tuned models",
    description: "Leonardo AI specializes in creating game assets and artistic content with custom-trained models for specific styles and use cases.",
    websiteUrl: "https://leonardo.ai",
    logoUrl: "https://leonardo.ai/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 10,
    categorySlug: "image-generation",
    features: [
      "Custom model training",
      "Game asset generation",
      "Multiple style models",
      "Image to image",
      "Canvas editor",
      "Prompt enhancement",
      "Negative prompts",
      "Batch generation",
      "API access",
      "Community models"
    ],
    prosAndCons: {
      pros: [
        "Great for game assets",
        "Custom model training",
        "Good free tier",
        "Intuitive interface",
        "Strong community"
      ],
      cons: [
        "Less artistic than Midjourney",
        "Limited resolution in free tier",
        "Slower generation times",
        "Some features behind paywall"
      ]
    },
    apiAvailable: true,
    companyName: "Leonardo Interactive",
    foundedYear: 2022,
    status: ToolStatus.active,
    featured: false,
    viewCount: 40000,
  },

  // Code & Development
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    tagline: "Your AI pair programmer",
    description: "GitHub Copilot uses AI to suggest code and entire functions in real-time, right from your editor. Trained on billions of lines of code.",
    websiteUrl: "https://github.com/features/copilot",
    logoUrl: "https://github.githubassets.com/images/modules/site/copilot/copilot.png",
    pricingType: PricingType.paid,
    startingPrice: 10,
    categorySlug: "code-development",
    features: [
      "Real-time code suggestions",
      "Multiple programming languages",
      "IDE integration",
      "Context-aware completions",
      "Generate tests and docs",
      "Code explanation",
      "Chat interface",
      "Enterprise features",
      "Command line support",
      "Pull request summaries"
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
    viewCount: 110000,
  },
  {
    slug: "cursor",
    name: "Cursor",
    tagline: "The AI-first code editor",
    description: "Cursor is an AI-powered code editor built on VSCode that integrates AI deeply into the coding experience with advanced features.",
    websiteUrl: "https://cursor.sh",
    logoUrl: "https://cursor.sh/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 20,
    categorySlug: "code-development",
    features: [
      "AI chat in editor",
      "Code generation",
      "Multi-file editing",
      "Codebase understanding",
      "Natural language edits",
      "Terminal integration",
      "Multiple AI models",
      "Import VSCode settings",
      "Privacy mode",
      "Team features"
    ],
    prosAndCons: {
      pros: [
        "Deep AI integration",
        "Understands entire codebase",
        "Natural language editing",
        "VSCode compatible",
        "Privacy-focused options"
      ],
      cons: [
        "Separate editor to learn",
        "Premium features expensive",
        "Still in development",
        "Limited extension ecosystem"
      ]
    },
    apiAvailable: false,
    companyName: "Anysphere",
    foundedYear: 2023,
    status: ToolStatus.active,
    featured: true,
    viewCount: 50000,
  },
  {
    slug: "codeium",
    name: "Codeium",
    tagline: "Free AI code completion and chat",
    description: "Codeium offers free AI-powered code completion, search, and chat across 70+ languages and 40+ IDEs.",
    websiteUrl: "https://codeium.com",
    logoUrl: "https://codeium.com/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 0,
    categorySlug: "code-development",
    features: [
      "Code autocomplete",
      "AI chat assistant",
      "Multi-language support",
      "IDE integration",
      "Function generation",
      "Unit test generation",
      "Code explanation",
      "Refactoring suggestions",
      "Enterprise features",
      "Self-hosting option"
    ],
    prosAndCons: {
      pros: [
        "Generous free tier",
        "Wide IDE support",
        "Fast completions",
        "No telemetry in free tier",
        "Good for individuals"
      ],
      cons: [
        "Less accurate than Copilot",
        "Limited context understanding",
        "Enterprise features paid",
        "Smaller training dataset"
      ]
    },
    apiAvailable: false,
    companyName: "Exafunction",
    foundedYear: 2022,
    status: ToolStatus.active,
    featured: false,
    viewCount: 35000,
  },
  {
    slug: "tabnine",
    name: "Tabnine",
    tagline: "AI assistant for software developers",
    description: "Tabnine is an AI code assistant that provides intelligent code completions based on your code patterns and millions of programs.",
    websiteUrl: "https://tabnine.com",
    logoUrl: "https://tabnine.com/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 12,
    categorySlug: "code-development",
    features: [
      "Code completion",
      "Multiple languages",
      "IDE support",
      "Team learning",
      "Private model training",
      "Code privacy",
      "Offline mode",
      "Chat assistant",
      "Code generation",
      "Enterprise security"
    ],
    prosAndCons: {
      pros: [
        "Strong privacy features",
        "Can work offline",
        "Team model training",
        "Good free tier",
        "Learns from your code"
      ],
      cons: [
        "Less powerful than newer tools",
        "Limited chat features",
        "Slower adoption of new models",
        "Premium features expensive"
      ]
    },
    apiAvailable: false,
    companyName: "Tabnine",
    foundedYear: 2019,
    status: ToolStatus.active,
    featured: false,
    viewCount: 40000,
  },

  // Writing Tools
  {
    slug: "jasper",
    name: "Jasper",
    tagline: "AI copilot for enterprise marketing teams",
    description: "Jasper is an AI writing assistant designed for marketing teams. It helps create high-quality content with brand voice consistency.",
    websiteUrl: "https://jasper.ai",
    logoUrl: "https://assets-global.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b867d94c30df5_Jasper%20Logo.svg",
    pricingType: PricingType.paid,
    startingPrice: 49,
    categorySlug: "writing-tools",
    features: [
      "50+ content templates",
      "Brand voice customization",
      "SEO optimization",
      "Team collaboration",
      "Chrome extension",
      "Plagiarism checker",
      "Multi-language support",
      "API access",
      "Campaign creation",
      "Knowledge base"
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
    featured: true,
    viewCount: 60000,
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    tagline: "AI-powered copywriting for marketers",
    description: "Copy.ai uses AI to help create marketing copy, blog posts, social media content, and more with various templates and tools.",
    websiteUrl: "https://copy.ai",
    logoUrl: "https://assets-global.website-files.com/628288c5cd3e8411b90a36a4/6282893dfc1c5f36745370d4_logo%20icon.png",
    pricingType: PricingType.freemium,
    startingPrice: 36,
    categorySlug: "writing-tools",
    features: [
      "90+ copy templates",
      "Blog post wizard",
      "Social media tools",
      "Email templates",
      "Product descriptions",
      "Tone adjustment",
      "Multi-language",
      "Team workspace",
      "Chrome extension",
      "Workflow automation"
    ],
    prosAndCons: {
      pros: [
        "Easy to use interface",
        "Good template variety",
        "Affordable pricing",
        "Free tier available",
        "Quick generation"
      ],
      cons: [
        "Output needs editing",
        "Limited long-form content",
        "No brand voice training",
        "Basic analytics"
      ]
    },
    apiAvailable: true,
    companyName: "Copy.ai",
    foundedYear: 2020,
    status: ToolStatus.active,
    featured: false,
    viewCount: 45000,
  },
  {
    slug: "writesonic",
    name: "Writesonic",
    tagline: "AI writer, SEO optimizer, and chatbot",
    description: "Writesonic is an AI writing tool that helps create SEO-optimized content, from blog posts to ad copy, with built-in optimization features.",
    websiteUrl: "https://writesonic.com",
    logoUrl: "https://writesonic.com/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 16,
    categorySlug: "writing-tools",
    features: [
      "Article writer",
      "SEO optimizer",
      "Chatbot builder",
      "Image generation",
      "Voice generation",
      "Chrome extension",
      "WordPress plugin",
      "Bulk generation",
      "API access",
      "Fact checking"
    ],
    prosAndCons: {
      pros: [
        "All-in-one platform",
        "SEO features built-in",
        "Competitive pricing",
        "Regular updates",
        "Good for blogs"
      ],
      cons: [
        "Quality inconsistent",
        "Complex interface",
        "Limited customization",
        "Credit system confusing"
      ]
    },
    apiAvailable: true,
    companyName: "Writesonic",
    foundedYear: 2021,
    status: ToolStatus.active,
    featured: false,
    viewCount: 40000,
  },

  // Voice & Audio
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    tagline: "The most realistic AI voice generator",
    description: "ElevenLabs offers cutting-edge AI voice synthesis technology that creates natural-sounding speech in any voice and language.",
    websiteUrl: "https://elevenlabs.io",
    logoUrl: "https://elevenlabs.io/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 5,
    categorySlug: "voice-audio",
    features: [
      "Voice cloning",
      "Text to speech",
      "29 languages",
      "Voice library",
      "Emotion control",
      "Projects workspace",
      "Audio native",
      "API access",
      "Long-form synthesis",
      "Voice design"
    ],
    prosAndCons: {
      pros: [
        "Most realistic voices",
        "Easy voice cloning",
        "Multiple languages",
        "Good free tier",
        "Fast generation"
      ],
      cons: [
        "Ethical concerns",
        "Limited free usage",
        "Expensive for high usage",
        "No live streaming"
      ]
    },
    apiAvailable: true,
    companyName: "ElevenLabs",
    foundedYear: 2022,
    status: ToolStatus.active,
    featured: true,
    viewCount: 80000,
  },
  {
    slug: "murf-ai",
    name: "Murf AI",
    tagline: "AI voice generator for professional use",
    description: "Murf AI provides studio-quality voiceovers with 120+ AI voices across 20+ languages for videos, presentations, and more.",
    websiteUrl: "https://murf.ai",
    logoUrl: "https://murf.ai/favicon.ico",
    pricingType: PricingType.paid,
    startingPrice: 19,
    categorySlug: "voice-audio",
    features: [
      "120+ AI voices",
      "Voice customization",
      "Multi-language support",
      "Voice changer",
      "Team collaboration",
      "Video sync",
      "Grammar check",
      "Commercial rights",
      "API access",
      "Custom pronunciations"
    ],
    prosAndCons: {
      pros: [
        "Professional quality",
        "Good voice variety",
        "Easy to use",
        "Team features",
        "Video integration"
      ],
      cons: [
        "No free tier",
        "Less realistic than ElevenLabs",
        "Limited voice cloning",
        "Higher price point"
      ]
    },
    apiAvailable: true,
    companyName: "Murf Inc.",
    foundedYear: 2020,
    status: ToolStatus.active,
    featured: false,
    viewCount: 35000,
  },

  // Video Editing
  {
    slug: "runway",
    name: "Runway",
    tagline: "AI-powered creative tools for video",
    description: "Runway offers a suite of AI-powered tools for video editing, including Gen-2 for text/image to video generation and various editing features.",
    websiteUrl: "https://runwayml.com",
    logoUrl: "https://runwayml.com/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 12,
    categorySlug: "video-editing",
    features: [
      "Text to video",
      "Image to video",
      "Video to video",
      "Green screen",
      "Motion tracking",
      "Color grading",
      "Audio cleaning",
      "Super slow-mo",
      "Frame interpolation",
      "Magic tools"
    ],
    prosAndCons: {
      pros: [
        "Cutting-edge AI features",
        "Professional tools",
        "Regular updates",
        "Good for creatives",
        "Web-based"
      ],
      cons: [
        "Expensive for individuals",
        "Steep learning curve",
        "Limited free credits",
        "Requires fast internet"
      ]
    },
    apiAvailable: true,
    companyName: "Runway",
    foundedYear: 2018,
    status: ToolStatus.active,
    featured: true,
    viewCount: 65000,
  },
  {
    slug: "synthesia",
    name: "Synthesia",
    tagline: "AI video generation with digital avatars",
    description: "Synthesia creates professional videos with AI avatars that speak your text in 120+ languages, perfect for training and marketing videos.",
    websiteUrl: "https://synthesia.io",
    logoUrl: "https://synthesia.io/favicon.ico",
    pricingType: PricingType.paid,
    startingPrice: 22,
    categorySlug: "video-editing",
    features: [
      "140+ AI avatars",
      "120+ languages",
      "Custom avatars",
      "Screen recording",
      "Brand kit",
      "Video templates",
      "Team collaboration",
      "API access",
      "Closed captions",
      "SCORM export"
    ],
    prosAndCons: {
      pros: [
        "No filming needed",
        "Professional results",
        "Great for training",
        "Multiple languages",
        "Easy to use"
      ],
      cons: [
        "Avatars can look artificial",
        "Expensive",
        "Limited customization",
        "No free tier"
      ]
    },
    apiAvailable: true,
    companyName: "Synthesia",
    foundedYear: 2017,
    status: ToolStatus.active,
    featured: true,
    viewCount: 55000,
  },

  // Data Analysis
  {
    slug: "julius-ai",
    name: "Julius AI",
    tagline: "Your AI data analyst",
    description: "Julius is an AI-powered data analysis tool that helps you analyze data, create visualizations, and build models using natural language.",
    websiteUrl: "https://julius.ai",
    logoUrl: "https://julius.ai/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 20,
    categorySlug: "data-analysis",
    features: [
      "Natural language analysis",
      "Data visualization",
      "Statistical analysis",
      "Machine learning",
      "Code generation",
      "Report creation",
      "File support",
      "Python/R execution",
      "Collaboration",
      "Export options"
    ],
    prosAndCons: {
      pros: [
        "No coding required",
        "Supports many file types",
        "Interactive analysis",
        "Good visualizations",
        "Explains its work"
      ],
      cons: [
        "Limited free tier",
        "Can be slow",
        "Occasional errors",
        "Not for big data"
      ]
    },
    apiAvailable: false,
    companyName: "Julius AI",
    foundedYear: 2023,
    status: ToolStatus.active,
    featured: true,
    viewCount: 30000,
  },

  // Productivity
  {
    slug: "notion-ai",
    name: "Notion AI",
    tagline: "AI-powered workspace for your notes and tasks",
    description: "Notion AI integrates artificial intelligence directly into your Notion workspace to help with writing, summarizing, and organizing information.",
    websiteUrl: "https://notion.so/product/ai",
    logoUrl: "https://www.notion.so/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 8,
    categorySlug: "productivity",
    features: [
      "Writing assistance",
      "Summarization",
      "Translation",
      "Q&A on docs",
      "Action items extraction",
      "Meeting notes",
      "Content generation",
      "Tone adjustment",
      "Database autofill",
      "Custom AI blocks"
    ],
    prosAndCons: {
      pros: [
        "Seamless integration",
        "Context-aware",
        "Multiple use cases",
        "Affordable add-on",
        "Works with existing data"
      ],
      cons: [
        "Requires Notion subscription",
        "Limited compared to dedicated AI",
        "No API access",
        "Basic features only"
      ]
    },
    apiAvailable: false,
    companyName: "Notion Labs",
    foundedYear: 2022,
    status: ToolStatus.active,
    featured: true,
    viewCount: 70000,
  },
  {
    slug: "otter-ai",
    name: "Otter.ai",
    tagline: "AI meeting assistant that records and transcribes",
    description: "Otter.ai automatically records, transcribes, and summarizes meetings with AI-powered notes and action items extraction.",
    websiteUrl: "https://otter.ai",
    logoUrl: "https://otter.ai/favicon.ico",
    pricingType: PricingType.freemium,
    startingPrice: 8.33,
    categorySlug: "productivity",
    features: [
      "Real-time transcription",
      "Meeting summaries",
      "Action items extraction",
      "Speaker identification",
      "Zoom/Teams integration",
      "Searchable transcripts",
      "Collaboration features",
      "Mobile apps",
      "Export options",
      "Custom vocabulary"
    ],
    prosAndCons: {
      pros: [
        "Accurate transcription",
        "Great for meetings",
        "Good integrations",
        "Generous free tier",
        "Easy to use"
      ],
      cons: [
        "English-focused",
        "Privacy concerns",
        "Occasional errors",
        "Limited editing features"
      ]
    },
    apiAvailable: true,
    companyName: "Otter.ai",
    foundedYear: 2016,
    status: ToolStatus.active,
    featured: false,
    viewCount: 50000,
  },
]