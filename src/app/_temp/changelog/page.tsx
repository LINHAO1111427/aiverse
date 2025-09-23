import { Metadata } from 'next'
import { Calendar, Tag, GitCommit } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  
  return {
    title: isZh ? '更新日志 - AIverse' : 'Changelog - AIverse',
    description: isZh 
      ? '查看 AIverse 的最新更新、功能和改进。' 
      : 'See what\'s new in AIverse - Latest updates, features, and improvements.',
  }
}

export default function ChangelogPage({ params: { locale } }: { params: { locale: string } }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const changelog = [
    {
      version: 'v2.5.0',
      date: '2024-01-15',
      tag: 'Latest',
      changes: {
        new: [
          'Added support for 8 languages including Chinese, Japanese, and Korean',
          'Introduced AI tool comparison feature',
          'New API endpoint for bulk tool data export',
          'Dark mode support (beta)',
        ],
        improved: [
          'Enhanced search algorithm for better relevance',
          'Faster page load times with optimized images',
          'Improved mobile responsiveness',
          'Better error handling in forms',
        ],
        fixed: [
          'Fixed issue with rating submission on mobile devices',
          'Resolved duplicate tools in search results',
          'Fixed pagination bug in tools listing',
        ],
      },
    },
    {
      version: 'v2.4.0',
      date: '2023-12-20',
      changes: {
        new: [
          'User authentication system',
          'Personal dashboard for managing reviews',
          'Email notifications for tool updates',
          'CSV export for tool comparisons',
        ],
        improved: [
          'Redesigned tool detail pages',
          'Better filtering options in search',
          'Improved SEO meta tags',
        ],
        fixed: [
          'Fixed broken links in footer',
          'Resolved issue with special characters in search',
        ],
      },
    },
    {
      version: 'v2.3.0',
      date: '2023-11-15',
      changes: {
        new: [
          'API access for developers',
          'Tool submission workflow',
          'Advanced search filters',
          'User profiles',
        ],
        improved: [
          'Homepage performance optimization',
          'Better category organization',
          'Enhanced tool cards with more information',
        ],
        fixed: [
          'Fixed sorting issues in tools list',
          'Resolved API rate limiting bugs',
        ],
      },
    },
    {
      version: 'v2.2.0',
      date: '2023-10-10',
      changes: {
        new: [
          'Rating and review system',
          'Tool categories with icons',
          'Newsletter subscription',
        ],
        improved: [
          'Search functionality enhancements',
          'Mobile UI improvements',
          'Loading states for better UX',
        ],
        fixed: [
          'Fixed navigation menu on tablet devices',
          'Resolved timezone issues in dates',
        ],
      },
    },
  ]

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'latest':
        return 'bg-green-100 text-green-700'
      case 'beta':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {isZh ? '更新日志' : 'Changelog'}
          </h1>
          <p className="text-xl text-gray-600">
            {isZh 
              ? '跟踪我们的进展，查看 AIverse 的最新功能' 
              : 'Track our progress and see what\'s new in AIverse'
            }
          </p>
        </div>

        {/* Version Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          {/* Changelog entries */}
          <div className="space-y-12">
            {changelog.map((release, index) => (
              <div key={release.version} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-8 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 mt-6">
                  <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Content */}
                <div className="ml-20">
                  <div className="bg-white rounded-lg shadow-sm p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold">{release.version}</h2>
                          {release.tag && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(release.tag)}`}>
                              {release.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(release.date).toLocaleDateString(locale, { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                      <GitCommit className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Changes */}
                    <div className="space-y-6">
                      {release.changes.new && release.changes.new.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs">
                              ✨
                            </span>
                            New Features
                          </h3>
                          <ul className="space-y-2">
                            {release.changes.new.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">•</span>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {release.changes.improved && release.changes.improved.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                              💪
                            </span>
                            Improvements
                          </h3>
                          <ul className="space-y-2">
                            {release.changes.improved.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {release.changes.fixed && release.changes.fixed.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs">
                              🐛
                            </span>
                            Bug Fixes
                          </h3>
                          <ul className="space-y-2">
                            {release.changes.fixed.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe to updates */}
        <section className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Get notified about new features and updates
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}