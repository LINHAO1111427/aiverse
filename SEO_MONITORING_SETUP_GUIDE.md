# AIverse SEO监控系统配置指南

## 📋 系统概述

AIverse SEO监控系统是一个完整的SEO数据收集、分析和警报系统，包含以下核心功能：

- 关键词排名监控
- 流量数据分析
- 技术SEO健康检查
- 竞争对手分析
- 外链监控
- 实时警报系统
- 可视化仪表板

## 🗄️ 数据库设置

### 1. 创建MySQL数据库

```sql
CREATE DATABASE aiverse_seo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'seo_user'@'%' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON aiverse_seo.* TO 'seo_user'@'%';
FLUSH PRIVILEGES;
```

### 2. 导入数据库表结构

```bash
mysql -u seo_user -p aiverse_seo < src/config/database/seo-monitoring-schema.sql
```

### 3. 验证表创建

```sql
USE aiverse_seo;
SHOW TABLES;

-- 应该看到以下表：
-- keyword_rankings
-- traffic_data  
-- technical_seo
-- competitor_tracking
-- backlink_monitoring
-- seo_alerts
-- sitemap_monitoring
-- content_quality
-- performance_monitoring
-- search_console_data
-- data_collection_jobs
```

## 🔧 环境变量配置

在项目根目录创建 `.env.local` 文件（或更新现有文件）：

```bash
# SEO监控数据库配置
SEO_DB_HOST=localhost
SEO_DB_PORT=3306
SEO_DB_USER=seo_user
SEO_DB_PASSWORD=your_secure_password
SEO_DB_NAME=aiverse_seo

# SEO API安全密钥
SEO_API_SECRET=your_random_secret_key_here

# Google APIs
GOOGLE_PAGESPEED_API_KEY=your_google_pagespeed_api_key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"

# Google Analytics & Search Console
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GOOGLE_ANALYTICS_PROPERTY_ID=properties/123456789
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://aiverse.com

# 第三方SEO工具APIs
AHREFS_API_KEY=your_ahrefs_api_key
SEMRUSH_API_KEY=your_semrush_api_key
MOZ_ACCESS_ID=your_moz_access_id
MOZ_SECRET_KEY=your_moz_secret_key

# 通知服务
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
EMAIL_API_KEY=your_email_service_api_key
SMS_API_KEY=your_sms_service_api_key

# 监控配置
MONITORING_ENABLED=true
ALERT_WEBHOOK_URL=https://your-webhook-service.com/alerts
DATA_RETENTION_DAYS=365
```

## 📦 依赖安装

确保已安装必要的npm包：

```bash
npm install mysql2 react-markdown remark-gfm
```

## 🚀 系统启动

### 1. 运行初始化脚本

```bash
# 生成SEO监控配置文件
node src/scripts/seo-monitoring-setup.js

# 这将创建以下配置文件：
# - src/config/seo-monitoring/keywords.json
# - src/config/seo-monitoring/monitoring.json
# - src/config/seo-monitoring/competitors.json
# - src/config/seo-monitoring/analytics.json
# - 等等...
```

### 2. 测试数据库连接

创建测试脚本 `test-seo-db.js`：

```javascript
const { seoDb } = require('./src/lib/seo-database')

async function testConnection() {
  try {
    const isConnected = await seoDb.testConnection()
    if (isConnected) {
      console.log('✅ SEO数据库连接成功')
      
      // 测试插入数据
      const testKeyword = {
        keyword: 'test keyword',
        search_engine: 'google',
        country: 'US',
        language: 'en',
        ranking_position: 50,
        previous_position: 55,
        url: '/test',
        search_volume: 1000,
        difficulty: 60,
        competition: 0.5,
        ctr: 2.5,
        traffic_estimate: 25,
        featured_snippet: false,
        date: new Date().toISOString().split('T')[0]
      }
      
      const id = await seoDb.insertKeywordRanking(testKeyword)
      console.log(`✅ 测试数据插入成功, ID: ${id}`)
      
    } else {
      console.log('❌ SEO数据库连接失败')
    }
  } catch (error) {
    console.error('❌ 测试失败:', error)
  } finally {
    await seoDb.close()
  }
}

testConnection()
```

运行测试：

```bash
node test-seo-db.js
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问SEO监控仪表板：
- http://localhost:3000/zh/admin/seo-monitoring
- http://localhost:3000/en/admin/seo-monitoring

## 📊 API端点

### 关键词排名
- `GET /api/seo/keywords` - 获取关键词排名数据
- `POST /api/seo/keywords` - 批量更新关键词数据
- `PUT /api/seo/keywords` - 更新单个关键词

### SEO指标
- `GET /api/seo/metrics?period=7d` - 获取SEO指标概览
- `POST /api/seo/metrics` - 手动触发数据更新

### 警报管理
- `GET /api/seo/alerts?active=true` - 获取活跃警报
- `POST /api/seo/alerts` - 创建新警报
- `PUT /api/seo/alerts` - 解决警报

### 竞争对手
- `GET /api/seo/competitors?limit=10` - 获取竞争对手数据
- `POST /api/seo/competitors` - 更新竞争对手数据

## 🔧 数据收集配置

### 1. Google Search Console API设置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用Search Console API
4. 创建服务账号并下载JSON密钥文件
5. 在Search Console中添加服务账号邮箱为用户

### 2. Google Analytics 4 API设置

1. 在Google Cloud Console中启用Analytics Reporting API
2. 使用相同的服务账号
3. 在GA4中添加服务账号为用户

### 3. 第三方工具API配置

#### Ahrefs API
1. 注册Ahrefs账号并购买API计划
2. 获取API密钥并添加到环境变量

#### SEMrush API
1. 注册SEMrush账号并购买API计划
2. 获取API密钥并添加到环境变量

#### Moz API
1. 注册Moz Pro账号
2. 获取Access ID和Secret Key

## 📅 定时任务配置

### 1. 使用Vercel Cron Jobs

在 `vercel.json` 中配置：

```json
{
  "crons": [
    {
      "path": "/api/seo/cron/collect-keywords",
      "schedule": "0 */4 * * *"
    },
    {
      "path": "/api/seo/cron/collect-traffic",
      "schedule": "0 6 * * *"
    },
    {
      "path": "/api/seo/cron/collect-backlinks",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/seo/cron/technical-audit",
      "schedule": "0 3 * * 1"
    }
  ]
}
```

### 2. 本地开发定时任务

使用node-cron创建 `src/scripts/cron-scheduler.js`：

```javascript
const cron = require('node-cron')

// 每4小时收集关键词数据
cron.schedule('0 */4 * * *', () => {
  console.log('Starting keyword collection...')
  // 调用关键词收集逻辑
})

// 每天早上6点收集流量数据
cron.schedule('0 6 * * *', () => {
  console.log('Starting traffic data collection...')
  // 调用流量数据收集逻辑
})

// 每周一凌晨3点进行技术SEO审计
cron.schedule('0 3 * * 1', () => {
  console.log('Starting technical SEO audit...')
  // 调用技术审计逻辑
})
```

## 🔔 警报配置

### 1. Slack通知

创建Slack Webhook：
1. 访问 https://api.slack.com/apps
2. 创建新应用
3. 启用Incoming Webhooks
4. 创建Webhook URL并添加到环境变量

### 2. 邮件通知

推荐使用SendGrid或类似服务：
1. 注册SendGrid账号
2. 获取API密钥
3. 配置发送邮箱和模板

### 3. 警报规则

默认警报规则：
- 关键词排名下降超过5位
- 有机流量下降超过20%
- Core Web Vitals分数低于75
- 网站可用性低于99.5%
- 新增高质量外链
- 发现爬取错误

## 🧪 数据示例

### 插入关键词数据示例

```javascript
const keywordData = {
  keyword: 'AI工具',
  search_engine: 'google',
  country: 'CN',
  language: 'zh',
  ranking_position: 12,
  previous_position: 15,
  url: '/zh',
  search_volume: 18100,
  difficulty: 78,
  competition: 0.8,
  ctr: 2.8,
  traffic_estimate: 506,
  featured_snippet: false,
  date: '2024-01-20'
}

await seoDb.insertKeywordRanking(keywordData)
```

### 插入流量数据示例

```javascript
const trafficData = {
  date: '2024-01-20',
  source: 'google',
  medium: 'organic',
  campaign: null,
  device_type: 'desktop',
  country: 'CN',
  sessions: 1250,
  users: 980,
  new_users: 756,
  page_views: 3200,
  bounce_rate: 42.5,
  avg_session_duration: 187,
  pages_per_session: 2.8,
  conversion_rate: 3.2,
  goal_completions: 40,
  revenue: 0
}

await seoDb.insertTrafficData(trafficData)
```

## 📈 性能优化

### 1. 数据库索引

确保关键字段已建立索引：

```sql
-- 关键词排名表索引
CREATE INDEX idx_keyword_date ON keyword_rankings(keyword, date);
CREATE INDEX idx_ranking_position ON keyword_rankings(ranking_position);
CREATE INDEX idx_search_engine_country ON keyword_rankings(search_engine, country);

-- 流量数据表索引
CREATE INDEX idx_date_source ON traffic_data(date, source);
CREATE INDEX idx_country_device ON traffic_data(country, device_type);

-- 技术SEO表索引
CREATE INDEX idx_url_type_date ON technical_seo(url(255), check_type, date);
```

### 2. 数据清理

定期清理旧数据：

```sql
-- 调用清理存储过程
CALL cleanup_old_data();

-- 或手动清理
DELETE FROM keyword_rankings WHERE created_at < DATE_SUB(NOW(), INTERVAL 365 DAY);
DELETE FROM traffic_data WHERE created_at < DATE_SUB(NOW(), INTERVAL 730 DAY);
```

### 3. 缓存策略

使用Redis缓存频繁查询的数据：

```javascript
// 缓存关键词概览数据
const cacheKey = `seo:keywords:overview:${period}`
const cachedData = await redis.get(cacheKey)

if (!cachedData) {
  const data = await seoDb.getKeywordRankingsOverview()
  await redis.setex(cacheKey, 3600, JSON.stringify(data)) // 缓存1小时
}
```

## 🔒 安全考虑

### 1. API访问控制

- 使用强随机字符串作为SEO_API_SECRET
- 定期轮换API密钥
- 限制API访问频率

### 2. 数据库安全

- 使用专用数据库用户
- 限制数据库用户权限
- 启用SSL连接
- 定期备份数据

### 3. 敏感信息保护

- 不在代码中硬编码密钥
- 使用环境变量存储敏感配置
- 生产环境禁用调试信息

## 🚨 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查数据库服务是否运行
   - 验证连接配置和凭据
   - 检查防火墙设置

2. **API权限错误**
   - 验证SEO_API_SECRET配置
   - 检查请求头中的Authorization

3. **数据收集失败**
   - 检查第三方API密钥
   - 验证API配额和限制
   - 查看错误日志

4. **性能问题**
   - 检查数据库索引
   - 监控查询执行时间
   - 考虑添加缓存

### 日志和监控

启用详细日志记录：

```javascript
// 在开发环境中启用调试日志
if (process.env.NODE_ENV === 'development') {
  console.log('SEO Debug Info:', debugData)
}

// 记录API调用
console.log(`SEO API Call: ${method} ${endpoint} - ${statusCode}`)
```

## 📞 技术支持

如果遇到问题，请检查：

1. 环境变量配置是否正确
2. 数据库表是否正确创建
3. API密钥是否有效
4. 网络连接是否正常

记录详细的错误信息以便调试和支持。

---

## ✅ 完整配置检查清单

- [ ] MySQL数据库已创建
- [ ] 数据库表已导入
- [ ] 环境变量已配置
- [ ] npm依赖已安装
- [ ] 数据库连接测试通过
- [ ] Google APIs已配置
- [ ] 第三方API密钥已获取
- [ ] 定时任务已设置
- [ ] 警报通知已配置
- [ ] 仪表板可正常访问
- [ ] 数据收集正常运行

配置完成后，SEO监控系统将开始自动收集和分析数据，为AIverse网站提供全面的SEO洞察。