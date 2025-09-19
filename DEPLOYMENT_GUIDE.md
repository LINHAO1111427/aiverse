# AIverse 部署指南

## 🚀 部署前准备

### 1. 解决依赖锁定文件问题

如果在部署时遇到以下错误：
```
ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date
```

**解决方案：**

#### 方法一：更新本地依赖并提交新的锁定文件
```bash
# 1. 清理并重新安装依赖
rm -rf node_modules
rm pnpm-lock.yaml

# 2. 重新安装所有依赖
pnpm install

# 3. 确保构建成功
pnpm run build

# 4. 提交更新的锁定文件
git add pnpm-lock.yaml
git commit -m "Update pnpm-lock.yaml with latest dependencies"
git push
```

#### 方法二：在部署平台配置不使用frozen-lockfile
在您的部署平台（如Vercel、Netlify等）中设置构建命令：
```bash
# 替换默认的构建命令
pnpm install --no-frozen-lockfile && pnpm run build
```

### 2. 环境变量配置

确保在部署平台设置以下环境变量：

```env
# 数据库连接
DATABASE_URL="your_postgresql_connection_string"

# NextAuth配置
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth (可选)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# 应用配置
NODE_ENV="production"
```

### 3. 数据库设置

```bash
# 1. 运行Prisma迁移
npx prisma migrate deploy

# 2. 生成Prisma客户端
npx prisma generate

# 3. (可选) 添加种子数据
npx prisma db seed
```

## 📋 部署平台特定配置

### Vercel 部署

1. **项目配置文件** (`vercel.json`):
```json
{
  "buildCommand": "pnpm install --no-frozen-lockfile && pnpm run build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install --no-frozen-lockfile",
  "framework": "nextjs"
}
```

2. **构建设置**:
   - Build Command: `pnpm run build`
   - Install Command: `pnpm install --no-frozen-lockfile`
   - Output Directory: `.next`

### Netlify 部署

1. **netlify.toml**:
```toml
[build]
  command = "pnpm install --no-frozen-lockfile && pnpm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--no-frozen-lockfile"
```

### Railway/DigitalOcean App Platform

1. **Dockerfile** (如果需要):
```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制包文件
COPY package.json pnpm-lock.yaml ./

# 安装pnpm和依赖
RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile

# 复制源代码
COPY . .

# 生成Prisma客户端
RUN npx prisma generate

# 构建应用
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
```

## 🔧 构建优化

### 1. 依赖更新记录

最近添加的关键依赖：
- `@next-auth/prisma-adapter@^1.0.7` - NextAuth Prisma适配器
- `bcryptjs@^3.0.2` - 密码加密
- `next-auth@^4.24.11` - 身份验证
- `@radix-ui/react-progress@^1.1.0` - Progress组件

### 2. 版本更新记录

更新的依赖版本：
- `@hookform/resolvers`: `^3.3.4` → `^3.10.0`

### 3. 构建命令

**推荐的构建命令序列：**
```bash
# 1. 清理环境
rm -rf node_modules .next

# 2. 安装依赖
pnpm install --no-frozen-lockfile

# 3. 生成Prisma客户端
npx prisma generate

# 4. 构建应用
npx next build
```

## 🌍 部署清单

### 部署前检查
- [ ] 所有环境变量已配置
- [ ] 数据库连接正常
- [ ] pnpm-lock.yaml已更新并提交
- [ ] 本地构建测试通过
- [ ] Prisma schema已同步

### 首次部署后验证
- [ ] 首页加载正常
- [ ] 用户注册/登录功能正常
- [ ] 工具对比页面正常显示
- [ ] sitemap.xml可访问
- [ ] robots.txt配置正确
- [ ] 推荐系统正常工作

### SEO验证
- [ ] 所有对比页面URL正常：
  - `/en/compare/chatgpt-vs-claude-ai-writing-comparison-2024`
  - `/en/compare/canva-vs-figma-design-tool-comparison-2024`
  - `/en/compare/notion-vs-obsidian-note-taking-app-comparison-2024`
- [ ] 结构化数据正确渲染
- [ ] 元数据标签完整
- [ ] 多语言切换正常

## 🚨 常见问题解决

### 1. 依赖安装失败
```bash
# 清理npm/pnpm缓存
pnpm store prune
npm cache clean --force

# 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 2. Prisma相关错误
```bash
# 重新生成Prisma客户端
npx prisma generate

# 检查数据库连接
npx prisma db pull

# 重置数据库（开发环境）
npx prisma migrate reset
```

### 3. 构建内存不足
```bash
# 增加Node.js内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm run build
```

### 4. 国际化错误
工作流页面的count变量错误是正常的，不影响部署。如需修复：
```typescript
// 在相关组件中确保传递count参数
t('workflows.showingCount', { count: workflowsCount })
```

## 📊 部署后监控

### 性能监控
- 使用Vercel Analytics或Google Analytics监控页面性能
- 定期检查Core Web Vitals指标
- 监控SEO表现和排名变化

### 错误监控
- 配置Sentry或其他错误监控服务
- 监控API响应时间和错误率
- 关注数据库连接和查询性能

## 🔄 更新部署流程

每次更新部署时：
1. 确保本地测试通过
2. 更新版本号
3. 提交所有更改包括锁定文件
4. 推送到主分支触发自动部署
5. 验证部署结果
6. 监控关键功能

---

按照这个指南，您的AIverse项目应该能够成功部署到任何现代部署平台。记住关键是使用 `--no-frozen-lockfile` 参数来解决依赖锁定文件的问题。