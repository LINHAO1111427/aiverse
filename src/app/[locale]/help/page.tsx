import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale })
  
  return {
    title: t('footer.helpCenter') + ' - AIverse',
    description: 'Get help with using AIverse platform.',
  }
}

export default function HelpPage({ params: { locale } }: { params: { locale: string } }) {
  // Redirect to docs page as they serve similar purposes
  redirect(`/${locale}/docs`)
}