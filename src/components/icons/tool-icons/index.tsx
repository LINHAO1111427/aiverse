'use client'

import React from 'react'
import { 
  Brain, 
  Palette, 
  Code, 
  PenTool, 
  Mic, 
  Video, 
  BarChart3, 
  Zap,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Globe,
  Bot,
  Sparkles,
  Search,
  Database,
  Shield,
  Users,
  Briefcase,
  School,
  Heart,
  Camera,
  Music,
  Gamepad2,
  Cpu,
  Cloud,
  Lock,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Package,
  Settings,
  Wrench,
  Layers,
  Grid3x3,
  Type,
  Download,
  Upload,
  Share2,
  Copy,
  Edit,
  Trash,
  Save,
  FolderOpen,
  File,
  Link,
  ExternalLink,
  DollarSign
} from 'lucide-react'

// Tool icon mapping by category and common tool names
export const toolIcons: Record<string, React.ComponentType<any>> = {
  // Categories
  'ai-assistants': Brain,
  'image-generation': Palette,
  'code-development': Code,
  'writing-tools': PenTool,
  'voice-audio': Mic,
  'video-editing': Video,
  'data-analysis': BarChart3,
  'productivity': Zap,
  'chatbots': MessageSquare,
  'design': Palette,
  'marketing': Briefcase,
  'education': School,
  'healthcare': Heart,
  'gaming': Gamepad2,
  'security': Shield,
  'collaboration': Users,
  
  // Common AI tool names (case-insensitive matching)
  'chatgpt': MessageSquare,
  'gpt': Brain,
  'claude': Brain,
  'gemini': Brain,
  'bard': Brain,
  'midjourney': ImageIcon,
  'dall-e': ImageIcon,
  'stable-diffusion': ImageIcon,
  'github-copilot': Code,
  'copilot': Code,
  'cursor': Code,
  'replit': Code,
  'jasper': PenTool,
  'copy.ai': PenTool,
  'writesonic': PenTool,
  'grammarly': FileText,
  'notion': FileText,
  'canva': Palette,
  'figma': Palette,
  'adobe': Palette,
  'runway': Video,
  'synthesia': Video,
  'eleven-labs': Mic,
  'elevenlabs': Mic,
  'whisper': Mic,
  'hugging-face': Bot,
  'huggingface': Bot,
  'replicate': Cloud,
  'anthropic': Brain,
  'openai': Brain,
  'google': Globe,
  'microsoft': Globe,
  'meta': Globe,
  'stability-ai': ImageIcon,
  'cohere': Brain,
  'perplexity': Search,
  'you.com': Search,
  'phind': Search,
  'wolfram': Database,
  'tableau': BarChart3,
  'powerbi': BarChart3,
  'zapier': Zap,
  'make': Zap,
  'ifttt': Zap,
  'slack': MessageSquare,
  'discord': MessageSquare,
  'zoom': Video,
  'loom': Video,
  'miro': Grid3x3,
  'lucidchart': Layers,
  'asana': Briefcase,
  'trello': Briefcase,
  'monday': Calendar,
  'clickup': Briefcase,
  'airtable': Database,
  'sheets': Grid3x3,
  'excel': Grid3x3,
  'photoshop': ImageIcon,
  'illustrator': Palette,
  'premiere': Video,
  'aftereffects': Video,
  'blender': Video,
  'unity': Gamepad2,
  'unreal': Gamepad2,
  'tensorflow': Cpu,
  'pytorch': Cpu,
  'scikit': Database,
  'pandas': Database,
  'jupyter': Code,
  'colab': Code,
  'kaggle': Database,
  'databricks': Database,
  'snowflake': Database,
  'mongodb': Database,
  'firebase': Cloud,
  'aws': Cloud,
  'azure': Cloud,
  'gcp': Cloud,
  'vercel': Cloud,
  'netlify': Cloud,
  'heroku': Cloud,
  'docker': Package,
  'kubernetes': Package,
  'git': Code,
  'github': Code,
  'gitlab': Code,
  'bitbucket': Code,
  'jira': Briefcase,
  'confluence': FileText,
  'dropbox': FolderOpen,
  'drive': FolderOpen,
  'onedrive': FolderOpen,
  'box': Package,
  'salesforce': Briefcase,
  'hubspot': Briefcase,
  'mailchimp': Mail,
  'sendgrid': Mail,
  'twilio': Phone,
  'stripe': DollarSign,
  'paypal': DollarSign,
  'shopify': Briefcase,
  'wordpress': Globe,
  'wix': Globe,
  'squarespace': Globe,
  'webflow': Globe,
  'bubble': Globe,
  'retool': Wrench,
  'appsmith': Wrench,
  'n8n': Zap,
  'integromat': Zap,
  'automate': Zap,
  
  // Default
  'default': Wrench
}

// Get icon for a tool based on name or category
export function getToolIcon(toolName?: string, category?: string): React.ComponentType<any> {
  if (!toolName && !category) return toolIcons.default
  
  // Try exact match first
  if (toolName) {
    const normalizedName = toolName.toLowerCase().replace(/\s+/g, '-')
    if (toolIcons[normalizedName]) {
      return toolIcons[normalizedName]
    }
    
    // Try partial matches
    for (const [key, icon] of Object.entries(toolIcons)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return icon
      }
    }
  }
  
  // Try category
  if (category) {
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-')
    if (toolIcons[normalizedCategory]) {
      return toolIcons[normalizedCategory]
    }
  }
  
  return toolIcons.default
}

// Tool icon component with consistent styling
interface ToolIconProps {
  name?: string
  category?: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10'
}

export function ToolIcon({ name, category, className = '', size = 'md' }: ToolIconProps) {
  const Icon = getToolIcon(name, category)
  
  return <Icon className={`${sizeClasses[size]} ${className}`} />
}

// Default tool icon component (for fallbacks)
export function DefaultToolIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 64 64" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="12" fill="currentColor" fillOpacity="0.1"/>
      <path d="M32 16C32 14.8954 31.1046 14 30 14H18C16.8954 14 16 14.8954 16 16V28C16 29.1046 16.8954 30 18 30H30C31.1046 30 32 29.1046 32 28V16Z" fill="currentColor" fillOpacity="0.6"/>
      <path d="M48 36C48 34.8954 47.1046 34 46 34H34C32.8954 34 32 34.8954 32 36V48C32 49.1046 32.8954 50 34 50H46C47.1046 50 48 49.1046 48 48V36Z" fill="currentColor" fillOpacity="0.6"/>
      <path d="M32 36C32 34.8954 31.1046 34 30 34H18C16.8954 34 16 34.8954 16 36V48C16 49.1046 16.8954 50 18 50H30C31.1046 50 32 49.1046 32 48V36Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M48 16C48 14.8954 47.1046 14 46 14H34C32.8954 14 32 14.8954 32 16V28C32 29.1046 32.8954 30 34 30H46C47.1046 30 48 29.1046 48 28V16Z" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  )
}