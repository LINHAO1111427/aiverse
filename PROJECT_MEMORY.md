# 项目 Memory - AIverse AI工具发现平台

## 🔴 强制规则（用户严格要求）
<!-- 记录所有用户强调过的要求，每次开发前必看 -->
1. 静态导出配置不能改变（output: 'export'），确保部署兼容性
2. SEO优化是核心，任何改动不能影响搜索引擎排名
3. 多语言支持必须保持完整，新功能必须支持所有语言
4. AI工具数据必须准确，价格信息需要及时更新
5. 用户隐私数据必须加密，遵守GDPR等隐私法规
6. 性能优先，页面加载时间不能超过3秒
7. **必须彻底解决部署报错问题** - Admin 页面不能被静态预渲染（2025-01-12）

## 📋 项目快速理解
- **一句话描述**：全球领先的AI工具发现和推荐平台
- **核心价值**：帮助用户快速找到合适的AI工具，学习工具组合使用
- **目标用户**：AI工具使用者、开发者、企业决策者、创业者
- **技术特点**：静态生成、多语言、SEO优化、个性化推荐、工作流系统

## 🏗️ 技术架构
### 技术栈
- **框架**：Next.js 14 (App Router) + TypeScript
- **样式**：Tailwind CSS + Radix UI + Shadcn/ui
- **数据库**：PostgreSQL + Prisma ORM  
- **状态管理**：Zustand
- **API查询**：React Query (TanStack Query)
- **认证**：NextAuth.js
- **国际化**：next-intl (8种语言)
- **部署**：Vercel (静态导出)

### 项目结构
```
/src
  /app                    # Next.js App Router
    /[locale]            # 多语言路由
      /tools             # 工具页面
      /workflows         # 工作流页面
      /forum            # 社区论坛
    /api                # API路由
    /admin              # 管理后台
  /components           # React组件
    /ui                 # 基础UI组件
    /features           # 功能组件
      /tool-grid        # 工具展示网格
      /workflow-builder # 工作流构建器
      /search          # 搜索组件
    /layout            # 布局组件
    /seo               # SEO组件
  /lib                 # 工具库
  /hooks               # 自定义Hooks
  /services            # 业务服务
  /stores              # Zustand状态
  /types               # TypeScript类型
```

## 🚀 已实现功能
### AI工具管理
- 工具目录展示：`/components/features/tool-grid/`
- 高级搜索过滤：`/components/features/search/`
- 工具详情页：`/app/[locale]/tools/[id]/`
- 工具比较功能：`/components/features/tool-comparison/`

### 工作流系统
- 工作流构建器：`/components/features/workflow-builder/`
- 工作流模板：`/app/[locale]/workflows/templates/`
- 成本计算器：`/components/features/cost-calculator/`
- 可视化展示：`/components/features/workflow-visualizer/`

### 个性化推荐
- 用户画像：`/services/user-profile.service.ts`
- 智能推荐引擎：`/services/recommendation.service.ts`
- 场景匹配：`/components/features/scenario-matcher/`

### 社区功能
- 论坛系统：`/app/[locale]/forum/`
- 评分评论：`/components/features/rating-review/`
- 用户信誉：`/services/reputation.service.ts`

### SEO优化
- 结构化数据：`/components/seo/structured-data/`
- 站点地图：`/app/sitemap.ts`
- FAQ Schema：`/components/seo/faq-schema/`

## 🔧 可复用资源
### 组件
- `<ToolCard />` - AI工具卡片 - `/components/features/tool-card/`
- `<WorkflowNode />` - 工作流节点 - `/components/features/workflow-node/`
- `<SearchBar />` - 搜索栏 - `/components/features/search-bar/`
- `<LanguageSwitcher />` - 语言切换器 - `/components/layout/language-switcher/`

### Hooks
- `useTools()` - 工具数据管理 - `/hooks/use-tools.ts`
- `useWorkflow()` - 工作流状态 - `/hooks/use-workflow.ts`
- `useUserProfile()` - 用户画像 - `/hooks/use-user-profile.ts`
- `useRecommendations()` - 推荐数据 - `/hooks/use-recommendations.ts`

### 服务
- `ToolService` - 工具CRUD操作 - `/services/tool.service.ts`
- `WorkflowService` - 工作流管理 - `/services/workflow.service.ts`
- `SearchService` - 搜索功能 - `/services/search.service.ts`
- `LLMService` - AI模型集成 - `/services/llm.service.ts`

### API接口
- `GET /api/tools` - 获取工具列表
- `GET /api/workflows` - 获取工作流
- `POST /api/recommendations` - 获取推荐
- `POST /api/tools/compare` - 工具比较

## ⚡ 性能优化记录
- 静态生成所有工具页面
- 图片使用Next.js Image组件优化
- 实施React Query缓存策略
- 使用动态导入减少包大小
- Tailwind CSS按需加载
- 数据库查询优化索引

## ⚠️ 注意事项
### 常见坑点
1. 静态导出限制了动态路由使用
2. 多语言路由需要处理重定向
3. Prisma在静态导出时的限制
4. SEO元数据需要服务端生成
5. 第三方API调用需要处理CORS
6. **动态页面必须设置 `export const dynamic = 'force-dynamic'`** - 避免预渲染错误

### 待解决问题
1. 实时价格更新系统待优化
2. AI聊天助手功能规划中
3. 移动端体验需要改进
4. 工作流分享功能待实现

## 📝 开发规范
### 命名规范
- 组件：PascalCase（如 ToolCard）
- 函数：camelCase（如 getToolById）
- 文件名：kebab-case（如 tool-card.tsx）
- CSS类：Tailwind规范
- 类型：PascalCase + 后缀（如 ToolType）

### Git规范
- 提交格式：`feat/fix/docs(scope): description`
- 分支：`feature/`, `fix/`, `release/`
- PR必须通过类型检查和lint

### 测试规范
- 组件测试使用React Testing Library
- API测试使用Jest
- E2E测试使用Playwright
- 覆盖率目标：80%

## 🔄 更新记录
- 2025-01-21：初始创建，记录项目架构和核心功能
- 2025-01-21：添加技术栈详情和开发规范
- 2025-01-12：解决 admin 页面预渲染错误
  - 添加 `export const dynamic = 'force-dynamic'` 到以下文件：
    - `src/app/[locale]/admin/page.tsx`
    - `src/app/[locale]/admin/suggestions/page.tsx`