# 设置AI工具优化系统

## 1. 安装依赖包

```bash
# Supabase客户端
npm install @supabase/supabase-js

# 用于定时任务
npm install node-cron
npm install @types/node-cron --save-dev

# 用于抓取GitHub trending（可选）
npm install @huchenme/github-trending-api

# 用于分析用户反馈（可选）
npm install openai
```

## 2. 设置环境变量

创建或更新 `.env.local` 文件：

```bash
# === 数据库 ===
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# === 外部API ===
# Product Hunt (https://www.producthunt.com/v2/oauth/applications)
PRODUCT_HUNT_ACCESS_TOKEN=

# GitHub (https://github.com/settings/tokens)
GITHUB_TOKEN=

# OpenAI (https://platform.openai.com/api-keys)
OPENAI_API_KEY=

# === 可选API ===
# Reddit (https://www.reddit.com/prefs/apps)
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=

# Twitter/X (https://developer.twitter.com)
TWITTER_BEARER_TOKEN=
```

## 3. 创建数据库表

在Supabase SQL编辑器中运行：

```sql
-- 工具评分表
CREATE TABLE tool_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id VARCHAR(100) NOT NULL,
  workflow_id VARCHAR(100),
  user_id VARCHAR(100),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  would_recommend BOOLEAN,
  feedback TEXT,
  suggested_alternatives TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 工具评估历史
CREATE TABLE tool_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id VARCHAR(100) NOT NULL,
  evaluation_date DATE DEFAULT CURRENT_DATE,
  overall_score DECIMAL(3,2),
  feature_scores JSONB,
  user_feedback_score DECIMAL(3,2),
  market_trend_score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 工具替换建议
CREATE TABLE tool_replacement_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  current_tool_id VARCHAR(100) NOT NULL,
  suggested_tool_id VARCHAR(100) NOT NULL,
  workflow_id VARCHAR(100),
  reason TEXT,
  improvement_percentage DECIMAL(5,2),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT status_check CHECK (status IN ('pending', 'approved', 'rejected', 'implemented'))
);

-- 创建索引
CREATE INDEX idx_tool_ratings_tool_id ON tool_ratings(tool_id);
CREATE INDEX idx_tool_ratings_created_at ON tool_ratings(created_at DESC);
CREATE INDEX idx_tool_evaluations_tool_id ON tool_evaluations(tool_id);
CREATE INDEX idx_suggestions_status ON tool_replacement_suggestions(status);
```

## 4. 配置定时任务

### 使用Vercel Cron Jobs（推荐）

在 `vercel.json` 中添加：

```json
{
  "crons": [
    {
      "path": "/api/cron/monitor-tools",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/evaluate-tools", 
      "schedule": "0 12 * * 1"
    }
  ]
}
```

### 或使用GitHub Actions

创建 `.github/workflows/tool-monitor.yml`：

```yaml
name: Monitor AI Tools
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger monitoring
        run: |
          curl -X POST ${{ secrets.API_URL }}/api/cron/monitor-tools \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

## 5. 实现监控API

创建 `src/app/api/cron/monitor-tools/route.ts`：

```typescript
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  // 验证是否是Vercel Cron调用
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    // 1. 从Product Hunt获取新工具
    const newTools = await fetchProductHuntTools()
    
    // 2. 从GitHub获取趋势项目
    const trendingTools = await fetchGitHubTrending()
    
    // 3. 分析并存储
    await analyzeAndStore(newTools, trendingTools)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Monitoring error:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
```

## 6. 测试系统

### 手动测试评分功能
```bash
# 提交评分
curl -X POST http://localhost:3000/api/tools/rating \
  -H "Content-Type: application/json" \
  -d '{
    "toolId": "chatgpt",
    "rating": 5,
    "wouldRecommend": true,
    "feedback": "Great tool!"
  }'
```

### 访问管理面板
1. 启动开发服务器：`npm run dev`
2. 访问：`http://localhost:3000/admin/tools`

## 7. 外部数据源获取指南

### Product Hunt
1. 访问 https://www.producthunt.com/v2/oauth/applications
2. 创建新应用
3. 获取Access Token

### GitHub
1. 访问 https://github.com/settings/tokens
2. 生成新token，需要权限：`public_repo`

### Reddit (可选)
1. 访问 https://www.reddit.com/prefs/apps
2. 创建"script"类型应用
3. 获取Client ID和Secret

### OpenAI
1. 访问 https://platform.openai.com/api-keys
2. 创建新的API密钥

## 8. 注意事项

- 开始时使用免费API额度测试
- Product Hunt API有rate limit，注意控制请求频率
- GitHub API未认证每小时60次，认证后5000次
- 建议先实现基础功能，再逐步添加数据源
- 保护好API密钥，不要提交到Git

完成以上设置后，你的AI工具优化系统就可以开始运行了！