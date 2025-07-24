import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Users, Target, Zap, Shield, Globe, Award } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' })
  
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' })

  const values = [
    {
      icon: Target,
      title: t('values.accuracy.title'),
      description: t('values.accuracy.description'),
    },
    {
      icon: Shield,
      title: t('values.trust.title'),
      description: t('values.trust.description'),
    },
    {
      icon: Zap,
      title: t('values.innovation.title'),
      description: t('values.innovation.description'),
    },
    {
      icon: Globe,
      title: t('values.accessibility.title'),
      description: t('values.accessibility.description'),
    },
  ]

  const team = [
    {
      name: "Alex Chen",
      role: t('team.ceo'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      name: "Sarah Williams",
      role: t('team.cto'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Mike Johnson",
      role: t('team.productLead'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    {
      name: "Emily Zhang",
      role: t('team.designLead'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
  ]

  const stats = [
    { label: t('stats.tools'), value: "500+" },
    { label: t('stats.users'), value: "100K+" },
    { label: t('stats.reviews'), value: "50K+" },
    { label: t('stats.countries'), value: "120+" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('hero.title')}</h1>
            <p className="text-xl text-gray-600 mb-8">{t('hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t('mission.title')}</h2>
            <p className="text-lg text-gray-600 text-center mb-6">
              {t('mission.description1')}
            </p>
            <p className="text-lg text-gray-600 text-center">
              {t('mission.description2')}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('values.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('team.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-100"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-lg text-gray-600 mb-8">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tools"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t('cta.browseTools')}
              </a>
              <a
                href="/submit"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                {t('cta.submitTool')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}