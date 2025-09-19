# 测试AI工具监控系统

## 1. 初始化数据库
```bash
# 安装pg包（如果还没安装）
npm install pg

# 运行数据库初始化
npm run setup:monitoring
```

## 2. 启动开发服务器
```bash
npm run dev
```

## 3. 测试用户评分功能

1. 访问任意工作流详情页，例如：
   - http://localhost:3000/zh/workflows/content-powerhouse
   - http://localhost:3000/en/workflows/developer-toolkit

2. 点击展开任意工具（如ChatGPT）

3. 在展开区域底部找到评分组件

4. 提交评分：
   - 选择星级（1-5星）
   - 选择是否推荐
   - 可选：添加详细反馈
   - 可选：建议替代工具

## 4. 访问管理后台

### 查看监控仪表板
访问：http://localhost:3000/zh/admin
- 默认密码：`aiverse-admin-2024`
- 可以看到工具性能指标
- 查看替换建议

### 审批工具替换
访问：http://localhost:3000/zh/admin/suggestions
- 查看待审批的替换建议
- 批准或拒绝建议

## 5. 手动触发监控（测试用）

### 方法1：使用npm脚本
```bash
npm run test:monitor
```

### 方法2：使用curl
```bash
curl -X POST http://localhost:3000/api/cron/monitor-tools
```

### 方法3：使用Postman或浏览器插件
- URL: http://localhost:3000/api/cron/monitor-tools
- Method: POST
- Headers: 无需特殊header（开发环境）

## 6. 查看数据库数据

### 使用Prisma Studio（如果已配置）
```bash
npm run prisma:studio
```

### 使用SQL查询
```sql
-- 查看所有评分
SELECT * FROM tool_ratings ORDER BY created_at DESC;

-- 查看工具平均评分
SELECT * FROM tool_average_ratings;

-- 查看待处理的替换建议
SELECT * FROM tool_replacement_suggestions WHERE status = 'pending';

-- 查看发现的新工具
SELECT * FROM discovered_tools ORDER BY evaluation_score DESC;
```

## 7. 测试流程示例

### 模拟低评分触发替换建议：

1. 给某个工具（如Grammarly）打低分（1-2星）
2. 选择"不推荐"
3. 在反馈中写明原因
4. 建议替代工具（如QuillBot）
5. 提交评分
6. 系统会记录并在下次监控时生成替换建议

### 测试外部数据源（需要API密钥）：

1. 在`.env.local`添加至少一个API密钥
2. 运行监控任务
3. 查看`discovered_tools`表中的新发现

## 8. 常见问题

### 数据库连接失败
- 检查`.env.local`中的DATABASE_URL
- 确保Supabase项目正在运行
- 检查网络连接

### 评分提交失败
- 打开浏览器控制台查看错误
- 检查API路由是否正常
- 确认数据库表已创建

### 管理后台无法访问
- 开发环境应该自动允许访问
- 生产环境需要正确的密码
- 检查中间件配置

## 9. 性能优化建议

- 首次运行可能较慢（创建连接池）
- 建议配置Redis缓存（可选）
- 监控任务建议在低峰期运行
- 定期清理旧的评估数据

## 10. 下一步

1. **获取外部API密钥**
   - Product Hunt
   - GitHub
   - Reddit（可选）

2. **部署到生产**
   - 使用Vercel部署
   - 配置环境变量
   - 启用定时任务

3. **监控和调优**
   - 观察用户反馈
   - 调整评分算法
   - 优化数据源

祝测试顺利！如有问题请查看错误日志或联系开发团队。