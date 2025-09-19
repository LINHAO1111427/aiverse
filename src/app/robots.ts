import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 通用爬虫规则
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",           // API路由
          "/admin/",         // 管理员页面
          "/private/",       // 私有页面
          "/auth/",          // 认证页面
          "/login/",         // 登录页面
          "/signin/",        // 登录页面
          "/signup/",        // 注册页面
          "/onboarding/",    // 用户引导页面
          "/profile/",       // 用户资料页面
          "/dashboard/",     // 用户仪表板
          "/tmp/",           // 临时文件
          "/*.json$",        // JSON文件
          "/checkout/",      // 结账页面
          "/cart/",          // 购物车页面
          "/thank-you/",     // 感谢页面
          "/*?*utm_*",       // UTM参数页面
          "/*?*fbclid*",     // Facebook追踪参数
          "/*?*gclid*",      // Google广告追踪参数
          "/*/page/*",       // 分页参数
          "/print/",         // 打印版本
          "/amp/",           // AMP版本（如果不使用）
        ],
        crawlDelay: 1,       // 爬取延迟1秒
      },
      
      // Google爬虫特殊规则
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/auth/",
          "/onboarding/",
          "/profile/",
          "/dashboard/",
        ],
        crawlDelay: 0.5,     // Google爬虫可以更快
      },
      
      // Bing爬虫规则
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/auth/",
          "/onboarding/",
          "/profile/",
          "/dashboard/",
        ],
        crawlDelay: 1,
      },
      
      // 百度爬虫规则（中文市场重要）
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/auth/",
          "/onboarding/",
          "/profile/",
          "/dashboard/",
        ],
        crawlDelay: 2,       // 百度爬虫稍慢一些
      },
      
      // 其他主要搜索引擎
      {
        userAgent: ["YandexBot", "DuckDuckBot", "facebookexternalhit"],
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/auth/",
          "/onboarding/",
          "/profile/",
          "/dashboard/",
        ],
      },
      
      // 阻止有害爬虫
      {
        userAgent: [
          "AhrefsBot",       // SEO分析工具
          "SemrushBot",      // SEO分析工具
          "MJ12bot",         // Majestic爬虫
          "DotBot",          // Moz爬虫
          "LinkChecker",     // 链接检查器
          "SiteImprove",     // 网站分析
          "CCBot",           // 通用爬虫
          "GPTBot",          // OpenAI爬虫
          "ChatGPT-User",    // ChatGPT用户代理
          "CCBot",           // CommonCrawl
          "anthropic-ai",    // Anthropic爬虫
        ],
        disallow: "/",       // 完全阻止这些爬虫
      },
    ],
    
    // 多个站点地图
    sitemap: [
      "https://aiverse.com/sitemap.xml",
      "https://aiverse.com/sitemap-images.xml",    // 图片站点地图
      "https://aiverse.com/sitemap-news.xml",      // 新闻站点地图
    ],
    
    // 主机配置
    host: "https://aiverse.com",
  }
}