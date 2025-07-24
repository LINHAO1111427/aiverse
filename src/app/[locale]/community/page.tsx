import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Users, MessageSquare, Github, Twitter, Youtube, Award } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale })
  
  return {
    title: t('footer.community') + ' - AIverse',
    description: 'Join the AIverse community - Connect with AI enthusiasts, share experiences, and learn together.',
  }
}

export default async function CommunityPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale })

  const channels = [
    {
      icon: MessageSquare,
      name: 'Discord',
      description: 'Join our Discord server for real-time discussions',
      members: '5,000+ members',
      link: 'https://discord.gg/aiverse',
      color: 'bg-indigo-500',
    },
    {
      icon: Github,
      name: 'GitHub',
      description: 'Contribute to our open-source projects',
      members: '1,000+ stars',
      link: 'https://github.com/aiverse',
      color: 'bg-gray-800',
    },
    {
      icon: Twitter,
      name: 'Twitter',
      description: 'Follow us for the latest updates and news',
      members: '10,000+ followers',
      link: 'https://twitter.com/aiverse',
      color: 'bg-blue-500',
    },
    {
      icon: Youtube,
      name: 'YouTube',
      description: 'Watch tutorials and AI tool reviews',
      members: '2,000+ subscribers',
      link: 'https://youtube.com/@aiverse',
      color: 'bg-red-600',
    },
  ]

  const topContributors = [
    { name: 'Sarah Chen', avatar: 'SC', contributions: 234, badge: 'gold' },
    { name: 'Mike Johnson', avatar: 'MJ', contributions: 189, badge: 'silver' },
    { name: 'Emma Wilson', avatar: 'EW', contributions: 156, badge: 'bronze' },
    { name: 'David Lee', avatar: 'DL', contributions: 142, badge: null },
    { name: 'Lisa Wang', avatar: 'LW', contributions: 128, badge: null },
    { name: 'Tom Brown', avatar: 'TB', contributions: 115, badge: null },
  ]

  const events = [
    {
      date: '2024-02-15',
      title: 'AI Tools Workshop',
      description: 'Learn how to effectively use AI tools in your workflow',
      type: 'workshop',
    },
    {
      date: '2024-02-20',
      title: 'Community Meetup #5',
      description: 'Monthly virtual meetup to discuss latest AI trends',
      type: 'meetup',
    },
    {
      date: '2024-03-01',
      title: 'AI Hackathon 2024',
      description: 'Build innovative solutions using AI tools',
      type: 'hackathon',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('footer.community')}</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of AI enthusiasts, developers, and professionals in our growing community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/aiverse"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Join Discord
            </a>
            <a
              href="#channels"
              className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition font-medium"
            >
              Explore Channels
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Community Channels */}
        <section id="channels" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Connect With Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <a
                  key={channel.name}
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
                >
                  <div className={`w-12 h-12 ${channel.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{channel.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{channel.description}</p>
                  <p className="text-blue-600 text-sm font-medium">{channel.members}</p>
                </a>
              )
            })}
          </div>
        </section>

        {/* Top Contributors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Contributors</h2>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topContributors.map((contributor, index) => (
                <div key={contributor.name} className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {contributor.avatar}
                    </div>
                    {contributor.badge && (
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                        contributor.badge === 'gold' ? 'bg-yellow-400' :
                        contributor.badge === 'silver' ? 'bg-gray-300' :
                        'bg-orange-400'
                      }`}>
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{contributor.name}</p>
                    <p className="text-sm text-gray-600">{contributor.contributions} contributions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.type === 'workshop' ? 'bg-green-100 text-green-700' :
                        event.type === 'meetup' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {event.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString(locale, { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Community Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Be Respectful</h3>
              <p className="text-gray-600">
                Treat all community members with respect. We celebrate diversity and welcome people from all backgrounds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Share Knowledge</h3>
              <p className="text-gray-600">
                Help others learn and grow. Share your experiences with AI tools and learn from others.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Stay On Topic</h3>
              <p className="text-gray-600">
                Keep discussions relevant to AI tools and technology. Use appropriate channels for different topics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">No Spam</h3>
              <p className="text-gray-600">
                Don't promote products or services without permission. Focus on providing value to the community.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}