import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Share2, Twitter, Facebook, Linkedin, Tag } from 'lucide-react'
import { getBlogPostBySlug, getRelatedPosts, BlogPost } from '@/data/blog-posts'
import { StructuredData } from '@/components/seo/StructuredData'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  const isZh = params.locale === 'zh'
  
  if (!post) {
    return {
      title: isZh ? '博客文章未找到 - AIverse' : 'Blog Post Not Found - AIverse',
      description: isZh ? '您查找的博客文章不存在。' : 'The blog post you are looking for could not be found.',
    }
  }
  
  const title = isZh ? post.titleZh : post.title
  const description = isZh ? post.excerptZh : post.excerpt
  const keywords = isZh ? post.keywordsZh : post.keywords
  
  return {
    title: `${title} | AIverse`,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: post.author }],
    category: isZh ? post.categoryZh : post.category,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    openGraph: {
      title: `${title} | AIverse`,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: isZh ? post.tagsZh : post.tags,
      images: [{
        url: post.image,
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | AIverse`,
      description,
      images: [post.image]
    },
    alternates: {
      canonical: `https://aiverse.com/${params.locale}/blog/${params.slug}`,
      languages: {
        'zh': `https://aiverse.com/zh/blog/${params.slug}`,
        'en': `https://aiverse.com/en/blog/${params.slug}`
      }
    }
  }
}

// 生成静态参数用于SEO
export function generateStaticParams() {
  // 这里可以返回所有已发布的博客文章slugs
  return [
    { slug: 'best-ai-tools-2024-comprehensive-guide' },
    { slug: 'chatgpt-vs-claude-comprehensive-comparison' },
    { slug: 'free-ai-tools-ultimate-guide-2024' }
  ]
}

export default async function BlogPostPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale })
  const post = getBlogPostBySlug(params.slug)
  const isZh = params.locale === 'zh'
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {isZh ? '文章未找到' : 'Post Not Found'}
          </h1>
          <p className="text-gray-600 mb-8">
            {isZh ? '您查找的博客文章不存在。' : "The blog post you're looking for doesn't exist."}
          </p>
          <Link
            href={`/${params.locale}/blog`}
            className="text-blue-600 hover:underline"
          >
            {isZh ? '返回博客' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    )
  }
  
  const relatedPosts = getRelatedPosts(post.id, 3)
  const title = isZh ? post.titleZh : post.title
  const content = isZh ? post.contentZh : post.content
  const category = isZh ? post.categoryZh : post.category
  const tags = isZh ? post.tagsZh : post.tags
  
  const shareUrl = `https://aiverse.com/${params.locale}/blog/${params.slug}`
  
  // 生成文章结构化数据
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: isZh ? post.excerptZh : post.excerpt,
    image: [post.image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author
    },
    publisher: {
      "@type": "Organization",
      name: "AIverse",
      logo: {
        "@type": "ImageObject",
        url: "https://aiverse.com/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": shareUrl
    },
    articleSection: category,
    keywords: (isZh ? post.keywordsZh : post.keywords).join(', '),
    wordCount: post.wordCount,
    timeRequired: `PT${post.readTime}M`,
    inLanguage: isZh ? 'zh-CN' : 'en-US'
  }
  
  return (
    <>
      <StructuredData data={articleSchema} />
      <article className="min-h-screen">
        {/* Hero Image */}
        <div className="relative h-96 bg-gray-900">
          <img
            src={post.image}
            alt={title}
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
            {isZh ? '返回博客' : 'Back to Blog'}
          </Link>
          
          {/* Category */}
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-4">
            {category}
          </span>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{title}</h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString(params.locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} {isZh ? '分钟阅读' : 'min read'}
            </span>
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {post.wordCount} {isZh ? '字' : 'words'}
            </span>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Content */}
          <div className="prose prose-lg prose-blue max-w-none mb-12 prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900">{children}</h3>,
                h4: ({ children }) => <h4 className="text-lg font-bold mt-3 mb-2 text-gray-900">{children}</h4>,
                p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="mb-4 space-y-2 text-gray-700">{children}</ul>,
                ol: ({ children }) => <ol className="mb-4 space-y-2 text-gray-700">{children}</ol>,
                li: ({ children }) => <li className="ml-4">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic text-gray-800">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                    {children}
                  </pre>
                )
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
          
          {/* Share */}
          <div className="border-t pt-8">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                {isZh ? '分享这篇文章' : 'Share this article'}
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                  aria-label={isZh ? '分享到Twitter' : 'Share on Twitter'}
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                  aria-label={isZh ? '分享到Facebook' : 'Share on Facebook'}
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                  aria-label={isZh ? '分享到LinkedIn' : 'Share on LinkedIn'}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              {isZh ? '相关文章' : 'Related Articles'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => {
                const relatedTitle = isZh ? relatedPost.titleZh : relatedPost.title
                const relatedExcerpt = isZh ? relatedPost.excerptZh : relatedPost.excerpt
                const relatedCategory = isZh ? relatedPost.categoryZh : relatedPost.category
                
                return (
                  <article key={relatedPost.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <img
                      src={relatedPost.image}
                      alt={relatedTitle}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded mb-2">
                        {relatedCategory}
                      </span>
                      <h3 className="font-semibold mb-2 text-gray-900">
                        <Link 
                          href={`/${params.locale}/blog/${relatedPost.slug}`} 
                          className="hover:text-blue-600 transition-colors"
                        >
                          {relatedTitle}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedExcerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime} {isZh ? '分钟' : 'min'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(relatedPost.publishedAt).toLocaleDateString(params.locale, {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        )}
      </div>
      </article>
    </>
  )
}