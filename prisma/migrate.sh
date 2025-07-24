#!/bin/bash

# 生成 Prisma 迁移和更新数据库的脚本

echo "🔄 开始数据库迁移..."

# 1. 生成 Prisma Client
echo "📦 生成 Prisma Client..."
npx prisma generate

# 2. 创建迁移（如果有更改）
echo "🔨 创建迁移..."
npx prisma migrate dev --name init

# 3. 运行种子数据（可选）
echo "🌱 是否要运行种子数据？(y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "🌱 运行种子数据..."
    npx prisma db seed
fi

# 4. 打开 Prisma Studio（可选）
echo "🎨 是否要打开 Prisma Studio？(y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "🎨 打开 Prisma Studio..."
    npx prisma studio
fi

echo "✅ 数据库迁移完成！"