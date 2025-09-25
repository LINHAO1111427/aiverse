import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, Tag, Search, Filter } from 'lucide-react'
import { blogPosts, getFeaturedPosts, getPostsByCategory } from '@/data/blog-posts'
import { StructuredData } from '@/components/seo/StructuredData'

interface Props {
  params: {
    locale: string
  }
  searchParams: {
    category?: string
    search?: string
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = params.locale === 'zh'
  
  const title = isZh ? 'AI工具评测博客 - 最新AI工具深度分析' : 'AI Tools Blog - Latest AI Tool Reviews and Analysis'
  const description = isZh 
    ? '深度评测最新AI工具，包含ChatGPT、Claude、Midjourney等热门工具对比分析，帮你选择最适合的AI工具组合。'
    : 'In-depth reviews of the latest AI tools, including comparisons of popular tools like ChatGPT, Claude, Midjourney, and more to help you choose the best AI tool combinations.'
    
  const keywords = isZh
    ? ['AI工具评测', 'AI工具博客', 'ChatGPT评测', 'AI工具对比', '人工智能工具', 'AI工具推荐', '最新AI工具']
    : ['AI tools review', 'AI tools blog', 'ChatGPT review', 'AI tools comparison', 'artificial intelligence tools', 'AI tools recommendation', 'latest AI tools']

  return {
    title: `${title} | AIverse`,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: `${title} | AIverse`,
      description,
      type: 'website',
      images: ['/blog-images/blog-og.jpg']
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | AIverse`,
      description,
      images: ['/blog-images/blog-og.jpg']
    },
    alternates: {
      canonical: `https://aiverse.com/${params.locale}/blog`,
      languages: {
        'zh': 'https://aiverse.com/zh/blog',
        'en': 'https://aiverse.com/en/blog'
      }
    }
  }
}

export default async function BlogPage({ params, searchParams }: Props) {
  const t = await getTranslations({ locale: params.locale })
  const isZh = params.locale === 'zh'
  
  // 获取博客文章
  let posts = blogPosts.filter(post => post.status === 'published')
  
  // 筛选功能
  if (searchParams.category) {
    posts = getPostsByCategory(searchParams.category)
  }
  
  if (searchParams.search) {
    const searchTerm = searchParams.search.toLowerCase()
    posts = posts.filter(post => {
      const title = isZh ? post.titleZh : post.title
      const excerpt = isZh ? post.excerptZh : post.excerpt
      const tags = isZh ? post.tagsZh : post.tags
      
      return title.toLowerCase().includes(searchTerm) ||
             excerpt.toLowerCase().includes(searchTerm) ||
             tags.some(tag => tag.toLowerCase().includes(searchTerm))
    })
  }
  
  const featuredPosts = getFeaturedPosts()
  const categories = [...new Set(blogPosts.map(post => isZh ? post.categoryZh : post.category))]
  
  // 生成博客页面结构化数据
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: isZh ? "AIverse AI工具评测博客" : "AIverse AI Tools Blog",
    description: isZh 
      ? "专业的AI工具评测和分析，帮助用户选择最适合的AI工具"
      : "Professional AI tools reviews and analysis to help users choose the best AI tools",
    url: `https://aiverse.com/${params.locale}/blog`,
    author: {
      "@type": "Organization",
      name: "AIverse"
    },
    blogPost: posts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      headline: isZh ? post.titleZh : post.title,
      description: isZh ? post.excerptZh : post.excerpt,
      url: `https://aiverse.com/${params.locale}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Person",
        name: post.author
      },
      image: post.image
    }))
  }

  return (
    <>
      <StructuredData data={blogSchema} />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {isZh ? 'AI工具评测博客' : 'AI Tools Blog'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isZh 
                  ? '深度评测最新AI工具，提供专业的分析和对比，帮你找到最适合的AI解决方案'
                  : 'In-depth reviews of the latest AI tools with professional analysis and comparisons to help you find the perfect AI solutions'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Featured Posts */}
          {!searchParams.category && !searchParams.search && featuredPosts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {isZh ? '精选文章' : 'Featured Articles'}
              </h2>
              <div className="grid lg:grid-cols-3 gap-8">
                {featuredPosts.slice(0, 3).map((post) => {
                  const title = isZh ? post.titleZh : post.title
                  const excerpt = isZh ? post.excerptZh : post.excerpt
                  const category = isZh ? post.categoryZh : post.category
                  
                  return (
                    <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                            {isZh ? '精选' : 'Featured'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded mb-3">
                          {category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          <Link 
                            href={`/${params.locale}/blog/${post.slug}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime} {isZh ? '分钟' : 'min'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString(params.locale, {
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

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                {/* Search */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {isZh ? '搜索文章' : 'Search Articles'}
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={isZh ? '搜索关键词...' : 'Search keywords...'}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {isZh ? '文章分类' : 'Categories'}
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href={`/${params.locale}/blog`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        !searchParams.category 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {isZh ? '全部文章' : 'All Articles'}
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/${params.locale}/blog?category=${encodeURIComponent(category)}`}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          searchParams.category === category
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {isZh ? '热门标签' : 'Popular Tags'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['ChatGPT', 'Claude', 'AI工具', 'Midjourney', '评测', 'Guide'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {searchParams.category 
                      ? `${searchParams.category} ${isZh ? '文章' : 'Articles'}`
                      : searchParams.search
                      ? `${isZh ? '搜索结果' : 'Search Results'}: "${searchParams.search}"`
                      : isZh ? '最新文章' : 'Latest Articles'
                    }
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {isZh ? `找到 ${posts.length} 篇文章` : `Found ${posts.length} articles`}
                  </p>
                </div>
              </div>

              {/* Articles Grid */}
              {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {posts.map((post) => {
                    const title = isZh ? post.titleZh : post.title
                    const excerpt = isZh ? post.excerptZh : post.excerpt
                    const category = isZh ? post.categoryZh : post.category
                    const tags = isZh ? post.tagsZh : post.tags
                    
                    return (
                      <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <img
                          src={post.image}
                          alt={title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                              {category}
                            </span>
                            {post.featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                                {isZh ? '精选' : 'Featured'}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                            <Link 
                              href={`/${params.locale}/blog/${post.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {excerpt}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tags.slice(0, 3).map((tag, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime} {isZh ? '分钟' : 'min'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.publishedAt).toLocaleDateString(params.locale, {
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
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isZh ? '没有找到相关文章' : 'No articles found'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {isZh ? '尝试调整搜索条件或查看其他分类' : 'Try adjusting your search criteria or browse other categories'}
                  </p>
                  <Link
                    href={`/${params.locale}/blog`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isZh ? '查看全部文章' : 'View All Articles'}
                  </Link>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}