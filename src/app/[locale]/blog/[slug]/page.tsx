import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Share2, Twitter, Facebook, Linkedin } from 'lucide-react'

interface Props {
  params: {
    locale: string
    slug: string
  }
}

// Mock blog post data - in real app, this would come from database
const getBlogPost = (slug: string) => {
  const posts: Record<string, {
    title: string
    excerpt: string
    content: string
    author: string
    date: string
    readTime: string
    category: string
    image: string
  }> = {
    'future-of-ai-tools-2024': {
      title: 'The Future of AI Tools in 2024: Trends and Predictions',
      excerpt: 'Explore the emerging trends in AI tools and what to expect in the coming year.',
      content: `
        <p>As we move into 2024, the landscape of AI tools continues to evolve at a rapid pace. From enhanced natural language processing to more sophisticated image generation, the capabilities of AI are expanding in ways that were once thought impossible.</p>
        
        <h2>Key Trends Shaping the Future</h2>
        
        <h3>1. Multimodal AI Systems</h3>
        <p>The future of AI is multimodal. We're seeing a shift from specialized tools that excel at one task to comprehensive systems that can understand and generate text, images, audio, and even video. This convergence is creating more versatile and powerful tools.</p>
        
        <h3>2. Enhanced Personalization</h3>
        <p>AI tools are becoming increasingly adept at understanding individual user preferences and adapting their outputs accordingly. This personalization extends beyond simple recommendations to truly customized experiences.</p>
        
        <h3>3. Improved Accessibility</h3>
        <p>One of the most exciting trends is the democratization of AI. Tools that once required technical expertise are now accessible to anyone with an internet connection. This accessibility is driving innovation across all industries.</p>
        
        <h2>What This Means for You</h2>
        <p>Whether you're a developer, designer, writer, or business owner, these trends will impact how you work. The key is to stay informed and experiment with new tools as they emerge. The AI revolution is just beginning, and the opportunities are limitless.</p>
      `,
      author: 'Alex Chen',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Trends',
      image: 'https://picsum.photos/seed/blog1/1200/600',
    },
    'how-to-choose-right-ai-tool': {
      title: 'How to Choose the Right AI Tool for Your Business',
      excerpt: 'A comprehensive guide to evaluating and selecting AI tools that match your needs.',
      content: `
        <p>Choosing the right AI tool for your business can be overwhelming. With hundreds of options available, each promising to revolutionize your workflow, how do you make the right choice?</p>
        
        <h2>Understanding Your Needs</h2>
        <p>Before diving into the sea of AI tools, it's crucial to understand what you're trying to achieve. Are you looking to automate repetitive tasks? Enhance creativity? Improve customer service? Your specific needs will guide your selection.</p>
        
        <h2>Key Factors to Consider</h2>
        
        <h3>1. Integration Capabilities</h3>
        <p>The best AI tool is one that seamlessly integrates with your existing workflow. Look for tools that offer APIs, plugins, or native integrations with the software you already use.</p>
        
        <h3>2. Scalability</h3>
        <p>Your needs today might not be your needs tomorrow. Choose tools that can grow with your business, offering different tiers or capabilities as you expand.</p>
        
        <h3>3. Cost vs. Value</h3>
        <p>While free tools are attractive, they often come with limitations. Evaluate the true cost of a tool by considering the time it saves and the value it adds to your business.</p>
        
        <h3>4. Support and Community</h3>
        <p>A strong support system and active community can make the difference between success and frustration. Look for tools with comprehensive documentation, responsive support, and engaged user communities.</p>
        
        <h2>Making the Decision</h2>
        <p>Start with trials and free tiers to test tools in your actual workflow. Don't be swayed by hype – focus on tools that solve real problems for your business. Remember, the best AI tool is the one you'll actually use.</p>
      `,
      author: 'Sarah Williams',
      date: '2024-01-10',
      readTime: '8 min read',
      category: 'Guide',
      image: 'https://picsum.photos/seed/blog2/1200/600',
    },
  }
  
  return posts[slug] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - AIverse',
      description: 'The blog post you are looking for could not be found.',
    }
  }
  
  return {
    title: `${post.title} - AIverse Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale })
  const post = getBlogPost(params.slug)
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            href={`/${params.locale}/blog`}
            className="text-blue-600 hover:underline"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }
  
  const shareUrl = `https://aiverse.com/${params.locale}/blog/${params.slug}`
  
  return (
    <article className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Back to Blog */}
          <Link
            href={`/${params.locale}/blog`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          {/* Category */}
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-4">
            {post.category}
          </span>
          
          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString(params.locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Share */}
          <div className="border-t pt-8">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Share this article</h3>
              <div className="flex items-center gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        <section className="mt-16 mb-16">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/related${i}/400/250`}
                  alt="Related post"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold mb-2">
                    <Link href="#" className="hover:text-blue-600">
                      Getting Started with AI Tools for Beginners
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600">
                    Learn the basics of AI tools and how to integrate them into your workflow.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}