# Vercel Environment Variables

在Vercel部署时需要配置以下环境变量：

## 必需的环境变量

### 1. 数据库配置
```
DATABASE_URL
```
值：`postgresql://postgres:liin745839%40@db.sazjomdhzodvelpfwcwy.supabase.co:5432/postgres?sslmode=require`

**注意事项**：
- 密码中的 @ 已经编码为 %40
- 这是Supabase的连接字符串
- 已包含SSL连接（?sslmode=require）

### 2. 站点配置
```
NEXT_PUBLIC_SITE_URL
```
值：你的Vercel部署URL，例如：`https://aiverse.vercel.app`

```
NEXT_PUBLIC_SITE_NAME
```
值：`AIverse`

```
NEXT_PUBLIC_SITE_DESCRIPTION
```
值：`Discover 500+ Best AI Tools to Boost Your Productivity`

## 可选的环境变量

### 3. 认证相关（如果实现了用户系统）
```
NEXTAUTH_URL
```
值：同 `NEXT_PUBLIC_SITE_URL`

```
NEXTAUTH_SECRET
```
值：使用以下命令生成：
```bash
openssl rand -base64 32
```

### 4. 分析和监控（可选）
```
NEXT_PUBLIC_GA_MEASUREMENT_ID
```
值：Google Analytics ID（格式：G-XXXXXXXXXX）

```
NEXT_PUBLIC_VERCEL_ANALYTICS_ID
```
值：Vercel Analytics会自动注入

### 5. 邮件服务（可选）
```
SENDGRID_API_KEY
```
值：SendGrid API密钥

```
EMAIL_FROM
```
值：发件人邮箱，例如：`noreply@aiverse.com`

### 6. 存储服务（可选）
```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_S3_BUCKET
```
或者使用Cloudinary：
```
CLOUDINARY_URL
```

### 7. Redis缓存（可选）
```
REDIS_URL
```
值：Redis连接字符串，例如：`redis://default:password@host:6379`

## 在Vercel中设置环境变量

1. 登录Vercel Dashboard
2. 选择你的项目
3. 进入 Settings → Environment Variables
4. 添加每个环境变量：
   - Key: 变量名
   - Value: 变量值
   - Environment: 选择 Production/Preview/Development

## 部署前检查清单

- [ ] 确保 `DATABASE_URL` 正确配置
- [ ] 确保 `NEXT_PUBLIC_SITE_URL` 设置为你的Vercel域名
- [ ] 如果有认证功能，设置 `NEXTAUTH_SECRET`
- [ ] 检查所有 `NEXT_PUBLIC_` 开头的变量（这些会暴露在客户端）
- [ ] 确保敏感信息（如API密钥）没有提交到Git仓库

## 本地测试部署配置

在本地测试生产构建：
```bash
npm run build
npm run start
```

如果构建成功，说明配置正确，可以部署到Vercel。