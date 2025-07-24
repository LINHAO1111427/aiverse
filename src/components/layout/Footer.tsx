"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations()
  const footerLinks = {
    product: [
      { name: t('footer.browseTools'), href: "/tools" },
      { name: t('footer.categories'), href: "/categories" },
      { name: t('footer.submitTool'), href: "/submit" },
      { name: t('footer.apiAccess'), href: "/api" },
    ],
    company: [
      { name: t('footer.aboutUs'), href: "/about" },
      { name: t('footer.blog'), href: "/blog" },
      { name: t('footer.contact'), href: "/contact" },
      { name: t('footer.press'), href: "/press" },
    ],
    legal: [
      { name: t('footer.privacy'), href: "/privacy" },
      { name: t('footer.terms'), href: "/terms" },
      { name: t('footer.cookies'), href: "/cookies" },
      { name: t('footer.dmca'), href: "/dmca" },
    ],
    resources: [
      { name: t('footer.documentation'), href: "/docs" },
      { name: t('footer.helpCenter'), href: "/help" },
      { name: t('footer.community'), href: "/community" },
      { name: t('footer.changelog'), href: "/changelog" },
    ],
  }

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/aiverse" },
    { name: "GitHub", icon: Github, href: "https://github.com/aiverse" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/aiverse" },
    { name: "Email", icon: Mail, href: "mailto:hello@aiverse.com" },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-white">AIverse</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">{t('footer.product')}</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">{t('footer.resources')}</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} AIverse. {t('footer.allRights')}
            </p>
            <p className="text-sm text-gray-400">
              {t('footer.madeWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}