import React from 'react'

interface OrganizationSchema {
  "@context": "https://schema.org"
  "@type": "Organization"
  name: string
  url: string
  logo: string
  description: string
  contactPoint: {
    "@type": "ContactPoint"
    telephone?: string
    contactType: string
    email: string
  }
  sameAs: string[]
}

interface WebsiteSchema {
  "@context": "https://schema.org"
  "@type": "WebSite"
  name: string
  url: string
  description: string
  publisher: {
    "@type": "Organization"
    name: string
  }
  potentialAction: {
    "@type": "SearchAction"
    target: string
    "query-input": string
  }
}

interface BreadcrumbSchema {
  "@context": "https://schema.org"
  "@type": "BreadcrumbList"
  itemListElement: Array<{
    "@type": "ListItem"
    position: number
    name: string
    item?: string
  }>
}

interface ProductSchema {
  "@context": "https://schema.org"
  "@type": "Product" | "SoftwareApplication"
  name: string
  description: string
  url: string
  image?: string
  brand?: {
    "@type": "Brand"
    name: string
  }
  offers?: {
    "@type": "Offer"
    price?: string
    priceCurrency?: string
    availability: string
    url: string
  }
  aggregateRating?: {
    "@type": "AggregateRating"
    ratingValue: number
    reviewCount: number
    bestRating: number
    worstRating: number
  }
  applicationCategory?: string
  operatingSystem?: string
}

interface ReviewSchema {
  "@context": "https://schema.org"
  "@type": "Review"
  itemReviewed: {
    "@type": "Product" | "SoftwareApplication"
    name: string
    description: string
    url: string
  }
  reviewRating: {
    "@type": "Rating"
    ratingValue: number
    bestRating: number
    worstRating: number
  }
  author: {
    "@type": "Organization"
    name: string
  }
  datePublished: string
  reviewBody: string
}

interface FAQSchema {
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity: Array<{
    "@type": "Question"
    name: string
    acceptedAnswer: {
      "@type": "Answer"
      text: string
    }
  }>
}

interface HowToSchema {
  "@context": "https://schema.org"
  "@type": "HowTo"
  name: string
  description: string
  image?: string
  estimatedCost?: {
    "@type": "MonetaryAmount"
    currency: string
    value: string
  }
  supply?: Array<{
    "@type": "HowToSupply"
    name: string
  }>
  tool?: Array<{
    "@type": "HowToTool"
    name: string
  }>
  step: Array<{
    "@type": "HowToStep"
    name: string
    text: string
    image?: string
    url?: string
  }>
}

interface ComparisonSchema {
  "@context": "https://schema.org"
  "@type": "Article"
  headline: string
  description: string
  author: {
    "@type": "Organization"
    name: string
  }
  publisher: {
    "@type": "Organization"
    name: string
    logo: {
      "@type": "ImageObject"
      url: string
    }
  }
  datePublished: string
  dateModified: string
  mainEntityOfPage: {
    "@type": "WebPage"
    "@id": string
  }
  keywords: string
  articleSection: string
  wordCount?: number
}

interface StructuredDataProps {
  data: OrganizationSchema | WebsiteSchema | BreadcrumbSchema | ProductSchema | ReviewSchema | FAQSchema | HowToSchema | ComparisonSchema | any
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0)
      }}
    />
  )
}

// 预定义的结构化数据模板
export const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AIverse",
  url: "https://aiverse.com",
  logo: "https://aiverse.com/logo.png",
  description: "Ultimate AI tools directory and comparison platform. Discover, compare, and choose the best AI tools for your workflow.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "support@aiverse.com"
  },
  sameAs: [
    "https://twitter.com/aiverse",
    "https://linkedin.com/company/aiverse",
    "https://github.com/aiverse"
  ]
}

export const websiteSchema: WebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AIverse",
  url: "https://aiverse.com",
  description: "Ultimate AI tools directory and comparison platform. Discover, compare, and choose the best AI tools for your workflow.",
  publisher: {
    "@type": "Organization",
    name: "AIverse"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://aiverse.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

// 生成产品结构化数据
export function generateProductSchema(tool: any): ProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: tool.website,
    brand: {
      "@type": "Brand",
      name: tool.name
    },
    offers: {
      "@type": "Offer",
      price: tool.pricing.starting || "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: tool.website
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.5,
      reviewCount: 1250,
      bestRating: 5,
      worstRating: 1
    },
    applicationCategory: "AI Tool",
    operatingSystem: "Web Browser"
  }
}

// 生成面包屑结构化数据
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url?: string }>): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.url && { item: crumb.url })
    }))
  }
}

// 生成FAQ结构化数据
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }
}

// 生成对比文章结构化数据
export function generateComparisonSchema(comparison: any): ComparisonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.metaDescription,
    author: {
      "@type": "Organization",
      name: "AIverse"
    },
    publisher: {
      "@type": "Organization",
      name: "AIverse",
      logo: {
        "@type": "ImageObject",
        url: "https://aiverse.com/logo.png"
      }
    },
    datePublished: comparison.publishedAt,
    dateModified: comparison.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aiverse.com/compare/${comparison.slug}`
    },
    keywords: comparison.keywords.join(", "),
    articleSection: "AI Tools Comparison",
    wordCount: 2500
  }
}

// 生成How-To结构化数据
export function generateHowToSchema(workflow: any): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to ${workflow.title}`,
    description: workflow.description,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0"
    },
    supply: workflow.tools.map((tool: any) => ({
      "@type": "HowToSupply",
      name: tool.name
    })),
    step: workflow.steps.map((step: any, index: number) => ({
      "@type": "HowToStep",
      name: `Step ${index + 1}: ${step.title}`,
      text: step.description,
      url: `https://aiverse.com/workflows/${workflow.id}#step-${index + 1}`
    }))
  }
}