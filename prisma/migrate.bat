@echo off
echo 🔄 开始数据库迁移...

REM 1. 生成 Prisma Client
echo 📦 生成 Prisma Client...
call npx prisma generate

REM 2. 创建迁移（如果有更改）
echo 🔨 创建迁移...
call npx prisma migrate dev --name init

REM 3. 运行种子数据（可选）
set /p seed="🌱 是否要运行种子数据？(y/n): "
if /i "%seed%"=="y" (
    echo 🌱 运行种子数据...
    call npx prisma db seed
)

REM 4. 打开 Prisma Studio（可选）
set /p studio="🎨 是否要打开 Prisma Studio？(y/n): "
if /i "%studio%"=="y" (
    echo 🎨 打开 Prisma Studio...
    start npx prisma studio
)

echo ✅ 数据库迁移完成！
pause