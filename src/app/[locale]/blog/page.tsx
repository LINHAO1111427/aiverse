import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blog' })
  
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    slug: 'future-of-ai-tools-2024',
    title: 'The Future of AI Tools in 2024: Trends and Predictions',
    excerpt: 'Explore the emerging trends in AI tools and what to expect in the coming year.',
    author: 'Alex Chen',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Trends',
    image: 'https://picsum.photos/seed/blog1/400/250',
  },
  {
    id: 2,
    slug: 'how-to-choose-right-ai-tool',
    title: 'How to Choose the Right AI Tool for Your Business',
    excerpt: 'A comprehensive guide to evaluating and selecting AI tools that match your needs.',
    author: 'Sarah Williams',
    date: '2024-01-10',
    readTime: '8 min read',
    category: 'Guide',
    image: 'https://picsum.photos/seed/blog2/400/250',
  },
  {
    id: 3,
    slug: 'ai-tools-for-small-businesses',
    title: 'Top 10 AI Tools Every Small Business Should Know',
    excerpt: 'Discover affordable and powerful AI tools that can transform your small business.',
    author: 'Mike Johnson',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Tools',
    image: 'https://picsum.photos/seed/blog3/400/250',
  },
  {
    id: 4,
    slug: 'ai-ethics-considerations',
    title: 'Ethical Considerations When Using AI Tools',
    excerpt: 'Understanding the ethical implications and best practices for responsible AI usage.',
    author: 'Emily Zhang',
    date: '2023-12-28',
    readTime: '7 min read',
    category: 'Ethics',
    image: 'https://picsum.photos/seed/blog4/400/250',
  },
  {
    id: 5,
    slug: 'ai-productivity-tips',
    title: '5 Ways AI Tools Can Boost Your Productivity',
    excerpt: 'Learn how to leverage AI tools to streamline your workflow and save time.',
    author: 'Alex Chen',
    date: '2023-12-20',
    readTime: '4 min read',
    category: 'Productivity',
    image: 'https://picsum.photos/seed/blog5/400/250',
  },
  {
    id: 6,
    slug: 'ai-creative-industries',
    title: 'AI Tools Revolutionizing Creative Industries',
    excerpt: 'How AI is transforming design, music, writing, and other creative fields.',
    author: 'Sarah Williams',
    date: '2023-12-15',
    readTime: '6 min read',
    category: 'Creative',
    image: 'https://picsum.photos/seed/blog6/400/250',
  },
]

const categories = ['All', 'Trends', 'Guide', 'Tools', 'Ethics', 'Productivity', 'Creative']

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'blog' })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-xl text-gray-600 mb-8">{t('hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  category === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <Link href={`/blog/${post.slug}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString(locale)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {t('readMore')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t('newsletter.title')}</h2>
            <p className="text-lg text-gray-600 mb-8">{t('newsletter.subtitle')}</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t('newsletter.subscribe')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}