# AI工具监控系统 - 完整设置指南

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install pg
npm install @supabase/supabase-js  # 可选，如果要使用Supabase客户端
```

### 2. 设置数据库
```bash
# 运行数据库初始化脚本
npm run setup:monitoring
```

这将创建以下表：
- `tool_ratings` - 用户评分
- `tool_evaluations` - 工具评估历史
- `tool_replacement_suggestions` - 替换建议
- `discovered_tools` - 发现的新工具
- `monitoring_logs` - 监控日志

### 3. 获取API密钥

#### 必需的：
1. **Supabase密钥**
   - 访问你的Supabase项目仪表板
   - 找到Settings > API
   - 复制`anon`和`service_role`密钥

#### 可选但推荐的：
1. **Product Hunt** (https://www.producthunt.com/v2/oauth/applications)
   - 创建新应用
   - 获取Access Token

2. **GitHub** (https://github.com/settings/tokens)
   - 生成新token
   - 勾选`public_repo`权限

3. **Reddit** (https://www.reddit.com/prefs/apps)
   - 创建"script"类型应用
   - 获取Client ID和Secret

### 4. 更新环境变量
在`.env.local`中填入你的密钥：
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon密钥
SUPABASE_SERVICE_KEY=你的service密钥
PRODUCT_HUNT_ACCESS_TOKEN=你的PH token
GITHUB_TOKEN=你的GitHub token
```

## 📊 使用功能

### 1. 查看监控仪表板
访问：`http://localhost:3000/[locale]/admin`

### 2. 手动触发监控（开发环境）
```bash
npm run test:monitor
```

### 3. 测试评分功能
在任何工作流详情页，集成评分组件后即可使用

## 🔧 功能说明

### 已实现的功能：

1. **多数据源监控**
   - Product Hunt热门AI工具
   - GitHub趋势项目
   - Reddit社区讨论

2. **智能评估系统**
   - 自动评分算法
   - 工具对比分析
   - 替换建议生成

3. **用户反馈收集**
   - 5星评分系统
   - 推荐意愿调查
   - 详细反馈和建议

4. **管理仪表板**
   - 实时性能指标
   - 趋势可视化
   - 高优先级提醒

5. **自动化监控**
   - 每日定时任务
   - 异常检测提醒
   - 自动评估流程

## 🛠 自定义配置

### 调整监控频率
修改`vercel.json`中的cron表达式：
```json
{
  "crons": [
    {
      "path": "/api/cron/monitor-tools",
      "schedule": "0 */6 * * *"  // 每6小时运行一次
    }
  ]
}
```

### 添加新的数据源
在`src/services/external-sources/`下创建新文件：
```typescript
export async function fetchYourSource() {
  // 实现数据抓取逻辑
  return transformedData
}
```

### 自定义评分权重
修改`src/services/tool-evaluation/analyzer.ts`中的评分逻辑

## 📈 监控指标

系统会自动追踪：
- 工具平均评分
- 用户推荐率
- 使用趋势
- 社区活跃度
- 更新频率

## 🔔 通知配置

### Slack通知
在`.env.local`添加：
```
NOTIFICATION_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 邮件通知
可以集成SendGrid或其他邮件服务

## 🐛 故障排除

### 数据库连接错误
- 检查DATABASE_URL格式
- 确保IP白名单包含你的IP
- 验证密码中的特殊字符是否正确编码

### API请求失败
- 检查API密钥是否正确
- 注意rate limits
- 查看`monitoring_logs`表中的错误信息

### 定时任务不运行
- 确保已部署到Vercel
- 检查cron配置语法
- 查看Vercel函数日志

## 📊 数据分析查询

### 查看工具平均评分
```sql
SELECT * FROM tool_average_ratings ORDER BY average_rating DESC;
```

### 查看待处理建议
```sql
SELECT * FROM pending_high_priority_suggestions;
```

### 查看最新发现的工具
```sql
SELECT * FROM discovered_tools 
WHERE evaluation_score > 70 
ORDER BY discovered_at DESC 
LIMIT 20;
```

## 🚀 下一步

1. **完善API密钥** - 获取所有外部服务的API访问权限
2. **部署到生产** - 使用Vercel部署并启用定时任务
3. **优化算法** - 根据实际使用调整评分权重
4. **扩展功能** - 添加更多数据源和分析维度

有任何问题，请查看项目文档或提交issue！