// Tool logo URLs mapping
export const toolLogos: Record<string, string> = {
  'chatgpt': '/images/tools/chatgpt.svg',
  'openai': '/images/tools/chatgpt.svg',
  'gpt': '/images/tools/chatgpt.svg',
  'gpt-4': '/images/tools/chatgpt.svg',
  'gpt-3.5': '/images/tools/chatgpt.svg',
  
  'claude': '/images/tools/claude.svg',
  'anthropic': '/images/tools/claude.svg',
  'claude-3': '/images/tools/claude.svg',
  
  'midjourney': '/images/tools/midjourney.svg',
  'mj': '/images/tools/midjourney.svg',
  
  'stable-diffusion': '/images/tools/stable-diffusion.svg',
  'stability-ai': '/images/tools/stable-diffusion.svg',
  'sdxl': '/images/tools/stable-diffusion.svg',
  
  'github-copilot': '/images/tools/github-copilot.svg',
  'copilot': '/images/tools/github-copilot.svg',
  
  // Add more mappings as we create more icons
  'dall-e': '/images/tools/default-tool.svg',
  'dall-e-3': '/images/tools/default-tool.svg',
  'gemini': '/images/tools/default-tool.svg',
  'bard': '/images/tools/default-tool.svg',
  'canva': '/images/tools/default-tool.svg',
  'notion': '/images/tools/default-tool.svg',
  'notion-ai': '/images/tools/default-tool.svg',
  'grammarly': '/images/tools/default-tool.svg',
  'jasper': '/images/tools/default-tool.svg',
  'runway': '/images/tools/default-tool.svg',
  'eleven-labs': '/images/tools/default-tool.svg',
  'elevenlabs': '/images/tools/default-tool.svg',
  'pictory': '/images/tools/default-tool.svg',
  'ahrefs': '/images/tools/default-tool.svg',
  'semrush': '/images/tools/default-tool.svg',
  'surfer-seo': '/images/tools/default-tool.svg',
  'wordpress': '/images/tools/default-tool.svg',
  'figma': '/images/tools/default-tool.svg',
  'framer': '/images/tools/default-tool.svg',
  'bubble': '/images/tools/default-tool.svg',
  'vercel': '/images/tools/default-tool.svg',
  'v0': '/images/tools/default-tool.svg',
}

export function getToolLogo(toolName: string): string {
  // Normalize the tool name
  const normalized = toolName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
  
  // Try exact match first
  if (toolLogos[normalized]) {
    return toolLogos[normalized]
  }
  
  // Try partial matches
  for (const [key, value] of Object.entries(toolLogos)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value
    }
  }
  
  // Return default logo
  return '/images/tools/default-tool.svg'
}