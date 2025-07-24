# 数据库设置指南

## 数据库结构

该项目使用 PostgreSQL 数据库，包含以下主要表：

### 核心表
- **Category** - AI工具分类
- **Tool** - AI工具信息
- **Rating** - 用户评分
- **Tag** - 标签
- **PricingPlan** - 定价计划

### 工作流相关表
- **WorkflowCategory** - 工作流分类
- **Workflow** - 工作流
- **WorkflowStep** - 工作流步骤
- **WorkflowToolCost** - 工作流工具成本
- **WorkflowReview** - 工作流评论
- **WorkflowResource** - 工作流资源

## 初始化数据库

### 1. 使用 Prisma 迁移（推荐）

```bash
# Windows
prisma\migrate.bat

# Linux/Mac
chmod +x prisma/migrate.sh
./prisma/migrate.sh
```

### 2. 手动执行 SQL

如果你想手动设置数据库：

```bash
# 1. 创建数据库结构
psql -U your_username -d your_database -f prisma/migrations/init.sql

# 2. 插入示例数据（可选）
psql -U your_username -d your_database -f prisma/seed.sql
```

### 3. 使用 Prisma 命令

```bash
# 生成 Prisma Client
npx prisma generate

# 创建并应用迁移
npx prisma migrate dev

# 重置数据库（慎用！会删除所有数据）
npx prisma migrate reset

# 查看数据库
npx prisma studio
```

## 环境变量配置

在 `.env` 或 `.env.local` 文件中设置数据库连接：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/aiverse?schema=public"
```

对于 Supabase：
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public"
```

## 种子数据

`seed.sql` 文件包含以下示例数据：
- 8个工具分类
- 10个AI工具（ChatGPT、Claude、Midjourney等）
- 4个工作流分类
- 3个完整的工作流示例
- 示例评分和评论

## 数据库备份

### 备份
```bash
pg_dump -U username -d aiverse > backup.sql
```

### 恢复
```bash
psql -U username -d aiverse < backup.sql
```

## 注意事项

1. 确保 PostgreSQL 版本 >= 12
2. 数据库使用 UTF-8 编码
3. 所有时间戳使用 UTC
4. 价格字段使用 DECIMAL(10,2) 类型
5. JSON 字段用于存储灵活的数据结构