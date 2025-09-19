# AI工具监控系统 - 配置清单

## 🔴 必需配置（系统运行的最低要求）

### 1. Supabase配置
你已经有了数据库连接，但还需要：
- **Anon Key**（公开密钥）
- **Service Role Key**（服务密钥）

获取方式：
1. 登录 https://app.supabase.com
2. 选择你的项目（sazjomdhzodvelpfwcwy）
3. 左侧菜单 Settings → API
4. 复制这两个密钥给我

## 🟡 推荐配置（增强功能）

### 2. Product Hunt API
获取方式：
1. 访问 https://www.producthunt.com/v2/oauth/applications
2. 点击 "Add an application"
3. 填写：
   - Name: AIverse Monitor
   - Redirect URI: http://localhost:3000
4. 创建后，点击 "Create Token"
5. 复制 Access Token 给我

### 3. GitHub Token（可选）
获取方式：
1. 访问 https://github.com/settings/tokens
2. Generate new token (classic)
3. 填写：
   - Note: AIverse Monitor
   - Expiration: 90 days
   - Scopes: 勾选 `public_repo`
4. 生成后复制 token 给我

### 4. OpenAI API Key（可选，用于智能分析）
如果你有的话可以提供，用于：
- 分析用户反馈情感
- 生成更智能的替换建议

## 🟢 可选配置

### 5. 通知配置
如果你想接收重要通知：
- **Slack Webhook URL**
- **Discord Webhook URL**
- **邮箱地址**

### 6. Reddit API（可选）
比较复杂，可以后续再配置

---

## 📋 快速配置模板

请按以下格式提供信息：

```
Supabase Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Supabase Service Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Product Hunt Token: (如果有)
GitHub Token: (如果有)
OpenAI Key: (如果有)
通知方式: (Slack/Discord/Email)
```

---

## ⚡ 快速启动（无外部API）

如果你暂时不想配置外部API，系统仍可运行：
1. 只需提供 Supabase 密钥
2. 系统会使用模拟数据进行演示
3. 用户评分功能正常工作
4. 管理后台正常显示

---

## 🛠 我会帮你做什么

收到你的配置后，我会：
1. 更新 `.env.local` 文件
2. 验证所有连接是否正常
3. 初始化数据库表
4. 创建测试数据
5. 确保所有功能正常运行

请提供你能获取到的配置信息，我来帮你完成设置！