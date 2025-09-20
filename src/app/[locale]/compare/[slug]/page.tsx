import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { toolComparisons } from '@/data/tool-comparisons'
import ToolComparisonPage from '@/components/comparison/ToolComparisonPage'

interface ComparisonPageProps {
  params: {
    locale: string
    slug: string
  }
}

// 静态路径生成
export function generateStaticParams() {
  return [
    { locale: 'en', slug: 'chatgpt-vs-claude' },
    { locale: 'zh', slug: 'chatgpt-vs-claude' },
    { locale: 'en', slug: 'midjourney-vs-dalle' },
    { locale: 'zh', slug: 'midjourney-vs-dalle' },
    { locale: 'en', slug: 'github-copilot-vs-cursor' },
    { locale: 'zh', slug: 'github-copilot-vs-cursor' }
  ]
}

// 动态生成SEO元数据
export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { locale, slug } = params
  const comparison = toolComparisons.find(c => c.slug === slug)
  
  if (!comparison) {
    return {
      title: 'Comparison Not Found',
      description: 'The requested tool comparison was not found.'
    }
  }
  
  const isZh = locale === 'zh'
  const title = isZh ? comparison.titleZh : comparison.title
  const description = isZh ? comparison.metaDescriptionZh : comparison.metaDescription
  const keywords = isZh ? comparison.keywordsZh : comparison.keywords
  
  // 生成面包屑结构化数据
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://aiverse.com/${locale}`
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Compare Tools",
        "item": `https://aiverse.com/${locale}/compare`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://aiverse.com/${locale}/compare/${slug}`
      }
    ]
  }
  
  // 生成文章结构化数据
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "AIverse"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AIverse",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aiverse.com/logo.png"
      }
    },
    "datePublished": comparison.publishedAt,
    "dateModified": comparison.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://aiverse.com/${locale}/compare/${slug}`
    },
    "keywords": keywords.join(", "),
    "articleSection": "AI Tools Comparison",
    "wordCount": 2000, // 估算字数
    "genre": "Technology"
  }
  
  // FAQ结构化数据
  const faqSchema = comparison.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": comparison.faqs.map(faq => ({
      "@type": "Question",
      "name": isZh ? faq.questionZh : faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": isZh ? faq.answerZh : faq.answer
      }
    }))
  } : null
  
  // 产品比较结构化数据
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "category": comparison.category,
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "AIverse"
      }
    }
  }
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'AIverse Team' }],
    category: 'AI Tools Comparison',
    
    // Open Graph标签
    openGraph: {
      title,
      description,
      type: 'article',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: `https://aiverse.com/${locale}/compare/${slug}`,
      siteName: 'AIverse',
      images: [
        {
          url: `https://aiverse.com/og-images/compare-${slug}.png`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      publishedTime: comparison.publishedAt,
      modifiedTime: comparison.updatedAt,
      section: 'AI Tools',
      tags: keywords,
    },
    
    // Twitter卡片
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://aiverse.com/og-images/compare-${slug}.png`],
      creator: '@aiverse',
    },
    
    // 规范URL
    alternates: {
      canonical: `https://aiverse.com/${locale}/compare/${slug}`,
      languages: {
        'en': `https://aiverse.com/en/compare/${slug}`,
        'zh': `https://aiverse.com/zh/compare/${slug}`,
      }
    },
    
    // 机器人指令
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // 结构化数据
    other: {
      'script:ld+json': JSON.stringify([
        breadcrumbSchema,
        articleSchema,
        comparisonSchema,
        ...(faqSchema ? [faqSchema] : [])
      ])
    }
  }
}

export default function ComparisonPage({ params }: ComparisonPageProps) {
  const { locale, slug } = params
  
  // Enable static rendering for next-intl
  setRequestLocale(locale)
  
  const comparison = toolComparisons.find(c => c.slug === slug)
  
  if (!comparison) {
    notFound()
  }
  
  return <ToolComparisonPage comparison={comparison} locale={locale} />
}