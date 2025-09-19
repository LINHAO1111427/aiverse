// SEO监控系统设置脚本
// 用于配置关键词排名和流量监控

const fs = require('fs').promises;
const path = require('path');

// 核心关键词配置
const keywordConfig = {
  // 主要品牌词
  brand: [
    'AIverse',
    'AI工具发现平台',
    'AIverse AI tools'
  ],
  
  // 核心关键词
  primary: [
    'AI工具',
    'AI tools',
    'AI工具推荐', 
    'best AI tools',
    'AI工具对比',
    'AI tools comparison',
    '人工智能工具',
    'artificial intelligence tools'
  ],
  
  // 长尾关键词
  longTail: [
    '2024年最佳AI工具',
    'best AI tools 2024',
    'AI工具选择指南',
    'how to choose AI tools',
    'ChatGPT vs Claude',
    '免费AI工具',
    'free AI tools',
    'AI工具评测',
    'AI tools review',
    'AI写作工具',
    'AI writing tools',
    'AI设计工具',
    'AI design tools',
    'AI编程工具',
    'AI coding tools',
    'AI视频工具',
    'AI video tools'
  ],
  
  // 竞争对手关键词
  competitor: [
    'Product Hunt AI',
    'There\'s An AI For That',
    'AI工具网站',
    'AI工具大全',
    'AI tools directory'
  ],
  
  // 地域关键词
  geo: [
    '中国AI工具',
    'China AI tools',
    '国外AI工具',
    'international AI tools'
  ]
};

// 监控配置
const monitoringConfig = {
  // 搜索引擎配置
  searchEngines: [
    {
      name: 'Google',
      domain: 'google.com',
      countryCode: 'US',
      language: 'en'
    },
    {
      name: 'Google CN',
      domain: 'google.com.hk',
      countryCode: 'CN', 
      language: 'zh'
    },
    {
      name: 'Baidu',
      domain: 'baidu.com',
      countryCode: 'CN',
      language: 'zh'
    },
    {
      name: 'Bing',
      domain: 'bing.com',
      countryCode: 'US',
      language: 'en'
    }
  ],
  
  // 监控频率
  frequency: {
    keywords: 'daily',        // 关键词排名
    traffic: 'hourly',        // 流量监控
    backlinks: 'weekly',      // 外链监控
    competitors: 'weekly',    // 竞争对手
    technical: 'daily'        // 技术SEO
  },
  
  // 报警阈值
  alerts: {
    rankingDrop: 5,           // 排名下降超过5位
    trafficDrop: 20,          // 流量下降超过20%
    coreWebVitals: 0.75,      // CWV分数低于0.75
    uptimeBelow: 99.5,        // 可用性低于99.5%
    pageSpeedBelow: 80        // 页面速度分数低于80
  }
};

// 竞争对手配置
const competitorConfig = {
  direct: [
    {
      name: 'Product Hunt',
      domain: 'producthunt.com',
      focus: 'AI product discovery'
    },
    {
      name: 'There\'s An AI For That',
      domain: 'theresanaiforthat.com', 
      focus: 'AI tools directory'
    },
    {
      name: 'AI Tool Report',
      domain: 'aitoolreport.com',
      focus: 'AI tools reviews'
    }
  ],
  
  indirect: [
    {
      name: '36氪',
      domain: '36kr.com',
      focus: 'Tech news and AI'
    },
    {
      name: 'VentureBeat',
      domain: 'venturebeat.com',
      focus: 'AI industry news'
    }
  ]
};

// Google Analytics 4 配置
const ga4Config = {
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  events: [
    'page_view',
    'search',
    'tool_view',
    'tool_click',
    'workflow_view',
    'blog_read',
    'newsletter_signup',
    'share',
    'download'
  ],
  
  // 自定义维度
  customDimensions: [
    { name: 'user_type', index: 1 },
    { name: 'tool_category', index: 2 },
    { name: 'search_term', index: 3 },
    { name: 'traffic_source', index: 4 },
    { name: 'locale', index: 5 }
  ],
  
  // 转化目标
  goals: [
    {
      name: 'tool_engagement',
      description: '用户与AI工具的互动',
      events: ['tool_view', 'tool_click']
    },
    {
      name: 'content_engagement', 
      description: '内容阅读和分享',
      events: ['blog_read', 'share']
    },
    {
      name: 'user_activation',
      description: '用户激活',
      events: ['newsletter_signup', 'download']
    }
  ]
};

// Search Console配置
const searchConsoleConfig = {
  siteUrl: 'https://aiverse.com',
  
  // 监控的查询类型
  queryTypes: [
    'web',      // 网页搜索
    'image',    // 图片搜索
    'video',    // 视频搜索
    'news'      // 新闻搜索
  ],
  
  // 数据维度
  dimensions: [
    'query',    // 搜索查询
    'page',     // 页面URL
    'country',  // 国家
    'device',   // 设备类型
    'date'      // 日期
  ],
  
  // 指标
  metrics: [
    'clicks',       // 点击次数
    'impressions',  // 展现次数
    'ctr',         // 点击率
    'position'     // 平均排名
  ]
};

// 技术SEO监控配置
const technicalSEOConfig = {
  // Core Web Vitals
  coreWebVitals: {
    lcp: { good: 2.5, needsImprovement: 4.0 },      // LCP (秒)
    fid: { good: 0.1, needsImprovement: 0.3 },      // FID (秒)
    cls: { good: 0.1, needsImprovement: 0.25 },     // CLS
    fcp: { good: 1.8, needsImprovement: 3.0 },      // FCP (秒)
    ttfb: { good: 0.8, needsImprovement: 1.8 }      // TTFB (秒)
  },
  
  // 页面检查项目
  pageChecks: [
    'title_length',       // 标题长度
    'meta_description',   // 描述标签
    'h1_tag',            // H1标签
    'internal_links',    // 内链数量
    'image_alt',         // 图片alt属性
    'canonical_tag',     // 规范化标签
    'schema_markup',     // 结构化数据
    'mobile_friendly',   // 移动友好性
    'page_speed',        // 页面速度
    'https_status'       // HTTPS状态
  ],
  
  // 网站健康检查
  siteHealth: [
    'crawl_errors',      // 爬取错误
    'broken_links',      // 断链
    'duplicate_content', // 重复内容
    'thin_content',      // 内容稀薄页面
    'orphaned_pages',    // 孤立页面
    'redirect_chains',   // 重定向链
    'sitemap_errors',    // 网站地图错误
    'robots_txt'         // robots.txt状态
  ]
};

// 数据库架构
const monitoringSchema = {
  // 关键词排名表
  keyword_rankings: {
    id: 'SERIAL PRIMARY KEY',
    keyword: 'VARCHAR(255) NOT NULL',
    search_engine: 'VARCHAR(50) NOT NULL',
    country: 'VARCHAR(10)',
    language: 'VARCHAR(10)',
    ranking_position: 'INTEGER',
    url: 'TEXT',
    search_volume: 'INTEGER',
    competition: 'DECIMAL(3,2)',
    date: 'DATE NOT NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  },
  
  // 流量数据表
  traffic_data: {
    id: 'SERIAL PRIMARY KEY',
    date: 'DATE NOT NULL',
    source: 'VARCHAR(100)',
    medium: 'VARCHAR(100)', 
    campaign: 'VARCHAR(255)',
    sessions: 'INTEGER',
    users: 'INTEGER',
    page_views: 'INTEGER',
    bounce_rate: 'DECIMAL(5,2)',
    avg_session_duration: 'INTEGER',
    conversion_rate: 'DECIMAL(5,2)',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  },
  
  // 技术SEO监控表
  technical_seo: {
    id: 'SERIAL PRIMARY KEY',
    url: 'TEXT NOT NULL',
    check_type: 'VARCHAR(100) NOT NULL',
    status: 'VARCHAR(50)',
    score: 'DECIMAL(5,2)',
    details: 'JSONB',
    date: 'DATE NOT NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  },
  
  // 竞争对手监控表
  competitor_tracking: {
    id: 'SERIAL PRIMARY KEY',
    competitor_domain: 'VARCHAR(255) NOT NULL',
    keyword: 'VARCHAR(255) NOT NULL',
    ranking_position: 'INTEGER',
    estimated_traffic: 'INTEGER',
    backlinks_count: 'INTEGER',
    domain_rating: 'DECIMAL(5,2)',
    date: 'DATE NOT NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  },
  
  // 外链监控表
  backlink_monitoring: {
    id: 'SERIAL PRIMARY KEY',
    source_domain: 'VARCHAR(255) NOT NULL',
    source_url: 'TEXT',
    target_url: 'TEXT NOT NULL',
    anchor_text: 'TEXT',
    link_type: 'VARCHAR(50)', // dofollow/nofollow
    domain_rating: 'DECIMAL(5,2)',
    first_seen: 'DATE',
    last_seen: 'DATE',
    status: 'VARCHAR(50)', // active/lost/new
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
  }
};

// API集成配置
const apiConfig = {
  // Google APIs
  google: {
    searchConsole: {
      credentials: 'google-credentials.json',
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
    },
    analytics: {
      credentials: 'google-credentials.json',
      scopes: ['https://www.googleapis.com/auth/analytics.readonly']
    },
    pagespeedInsights: {
      apiKey: process.env.GOOGLE_PAGESPEED_API_KEY
    }
  },
  
  // 第三方SEO工具
  tools: {
    ahrefs: {
      apiKey: process.env.AHREFS_API_KEY,
      endpoints: {
        backlinks: 'https://apiv2.ahrefs.com',
        keywords: 'https://apiv2.ahrefs.com'
      }
    },
    semrush: {
      apiKey: process.env.SEMRUSH_API_KEY,
      endpoints: {
        rankings: 'https://api.semrush.com',
        traffic: 'https://api.semrush.com'
      }
    },
    moz: {
      accessId: process.env.MOZ_ACCESS_ID,
      secretKey: process.env.MOZ_SECRET_KEY,
      endpoints: {
        linkMetrics: 'https://lsapi.seomoz.com/v2'
      }
    }
  }
};

// 报告配置
const reportingConfig = {
  // 报告类型
  reports: {
    daily: {
      schedule: '0 9 * * *', // 每天上午9点
      recipients: ['seo@aiverse.com'],
      template: 'daily-seo-report',
      data: ['keyword_rankings', 'traffic_summary', 'technical_issues']
    },
    
    weekly: {
      schedule: '0 9 * * 1', // 每周一上午9点
      recipients: ['team@aiverse.com'],
      template: 'weekly-seo-report', 
      data: ['ranking_changes', 'traffic_trends', 'competitor_analysis', 'backlink_summary']
    },
    
    monthly: {
      schedule: '0 9 1 * *', // 每月1号上午9点
      recipients: ['management@aiverse.com'],
      template: 'monthly-seo-report',
      data: ['full_analysis', 'goal_progress', 'roi_analysis', 'strategy_recommendations']
    }
  },
  
  // 预警配置
  alerts: {
    immediate: {
      triggers: ['site_down', 'major_ranking_drop', 'traffic_crash'],
      channels: ['email', 'slack', 'sms']
    },
    
    daily: {
      triggers: ['ranking_changes', 'technical_errors', 'crawl_issues'],
      channels: ['email', 'slack']
    },
    
    weekly: {
      triggers: ['trend_analysis', 'competitor_movements', 'backlink_changes'],
      channels: ['email']
    }
  }
};

// 创建监控系统设置函数
async function setupMonitoring() {
  try {
    console.log('🚀 开始设置SEO监控系统...');
    
    // 创建配置文件目录
    const configDir = path.join(__dirname, '../config/seo-monitoring');
    await fs.mkdir(configDir, { recursive: true });
    
    // 保存配置文件
    await fs.writeFile(
      path.join(configDir, 'keywords.json'),
      JSON.stringify(keywordConfig, null, 2)
    );
    
    await fs.writeFile(
      path.join(configDir, 'monitoring.json'),
      JSON.stringify(monitoringConfig, null, 2)
    );
    
    await fs.writeFile(
      path.join(configDir, 'competitors.json'),
      JSON.stringify(competitorConfig, null, 2)
    );
    
    await fs.writeFile(
      path.join(configDir, 'analytics.json'),
      JSON.stringify(ga4Config, null, 2)
    );
    
    await fs.writeFile(
      path.join(configDir, 'search-console.json'),
      JSON.stringify(searchConsoleConfig, null, 2)
    );
    
    await fs.writeFile(
      path.join(configDir, 'technical-seo.json'),
      JSON.stringify(technicalSEOConfig, null, 2)
    );
    
    await fs.writeFile(
      path.join(configDir, 'apis.json'),
      JSON.stringify(apiConfig, null, 2)
    );
    
    await fs.writeFile(
      path.join(configDir, 'reporting.json'),
      JSON.stringify(reportingConfig, null, 2)
    );
    
    // 创建数据库初始化SQL
    const sqlCommands = Object.entries(monitoringSchema)
      .map(([tableName, columns]) => {
        const columnDefs = Object.entries(columns)
          .map(([colName, colType]) => `  ${colName} ${colType}`)
          .join(',\n');
        
        return `CREATE TABLE IF NOT EXISTS ${tableName} (\n${columnDefs}\n);`;
      })
      .join('\n\n');
    
    await fs.writeFile(
      path.join(configDir, 'init-monitoring-db.sql'),
      sqlCommands
    );
    
    // 创建环境变量模板
    const envTemplate = `
# Google APIs
GOOGLE_PAGESPEED_API_KEY=your_google_pagespeed_api_key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key

# SEO Tools APIs
AHREFS_API_KEY=your_ahrefs_api_key
SEMRUSH_API_KEY=your_semrush_api_key
MOZ_ACCESS_ID=your_moz_access_id
MOZ_SECRET_KEY=your_moz_secret_key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_measurement_id

# Notifications
SLACK_WEBHOOK_URL=your_slack_webhook
EMAIL_API_KEY=your_email_service_api_key
SMS_API_KEY=your_sms_service_api_key

# Database
MONITORING_DATABASE_URL=postgresql://user:password@localhost:5432/aiverse_monitoring
`;
    
    await fs.writeFile(
      path.join(configDir, '.env.monitoring.template'),
      envTemplate.trim()
    );
    
    console.log('✅ SEO监控系统配置完成!');
    console.log(`📁 配置文件保存在: ${configDir}`);
    console.log('📝 请根据.env.monitoring.template创建环境变量配置');
    console.log('🗄️ 请运行init-monitoring-db.sql初始化数据库');
    
  } catch (error) {
    console.error('❌ 设置SEO监控系统失败:', error);
    throw error;
  }
}

// 导出配置和设置函数
module.exports = {
  keywordConfig,
  monitoringConfig,
  competitorConfig,
  ga4Config,
  searchConsoleConfig,
  technicalSEOConfig,
  apiConfig,
  reportingConfig,
  setupMonitoring
};

// 如果直接运行此脚本，执行设置
if (require.main === module) {
  setupMonitoring().catch(console.error);
}