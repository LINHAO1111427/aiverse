-- AI工具监控系统数据库初始化脚本

-- 1. 工具评分表
CREATE TABLE IF NOT EXISTS tool_ratings (
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

-- 2. 工具评估历史
CREATE TABLE IF NOT EXISTS tool_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id VARCHAR(100) NOT NULL,
  evaluation_date DATE DEFAULT CURRENT_DATE,
  overall_score DECIMAL(3,2),
  feature_scores JSONB DEFAULT '{}',
  user_feedback_score DECIMAL(3,2),
  market_trend_score DECIMAL(3,2),
  source VARCHAR(50), -- producthunt, github, reddit等
  source_data JSONB, -- 原始数据
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 工具替换建议
CREATE TABLE IF NOT EXISTS tool_replacement_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  current_tool_id VARCHAR(100) NOT NULL,
  suggested_tool_id VARCHAR(100) NOT NULL,
  suggested_tool_name VARCHAR(200),
  suggested_tool_url TEXT,
  workflow_id VARCHAR(100),
  reason TEXT,
  improvements JSONB DEFAULT '[]', -- 改进点列表
  risks JSONB DEFAULT '[]', -- 风险点列表
  improvement_percentage DECIMAL(5,2),
  status VARCHAR(20) DEFAULT 'pending',
  reviewed_by VARCHAR(100),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  implemented_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT status_check CHECK (status IN ('pending', 'approved', 'rejected', 'implemented'))
);

-- 4. 外部工具发现记录
CREATE TABLE IF NOT EXISTS discovered_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source VARCHAR(50) NOT NULL, -- producthunt, github, reddit
  source_id VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  url TEXT,
  category VARCHAR(50),
  metadata JSONB DEFAULT '{}', -- 存储源特定数据(votes, stars等)
  evaluation_score INTEGER,
  discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(source, source_id)
);

-- 5. 监控任务日志
CREATE TABLE IF NOT EXISTS monitoring_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_type VARCHAR(50) NOT NULL, -- monitor, evaluate, notify
  status VARCHAR(20) NOT NULL, -- success, failed, partial
  stats JSONB DEFAULT '{}',
  error_message TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_tool_ratings_tool_id ON tool_ratings(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_ratings_created_at ON tool_ratings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tool_ratings_rating ON tool_ratings(rating);

CREATE INDEX IF NOT EXISTS idx_tool_evaluations_tool_id ON tool_evaluations(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_evaluations_date ON tool_evaluations(evaluation_date DESC);
CREATE INDEX IF NOT EXISTS idx_tool_evaluations_score ON tool_evaluations(overall_score DESC);

CREATE INDEX IF NOT EXISTS idx_suggestions_status ON tool_replacement_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_suggestions_created ON tool_replacement_suggestions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_discovered_tools_source ON discovered_tools(source);
CREATE INDEX IF NOT EXISTS idx_discovered_tools_category ON discovered_tools(category);
CREATE INDEX IF NOT EXISTS idx_discovered_tools_score ON discovered_tools(evaluation_score DESC);

CREATE INDEX IF NOT EXISTS idx_monitoring_logs_created ON monitoring_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_monitoring_logs_task ON monitoring_logs(task_type);

-- 创建视图：工具平均评分
CREATE OR REPLACE VIEW tool_average_ratings AS
SELECT 
  tool_id,
  COUNT(*) as total_ratings,
  AVG(rating) as average_rating,
  SUM(CASE WHEN would_recommend = true THEN 1 ELSE 0 END)::FLOAT / 
    NULLIF(SUM(CASE WHEN would_recommend IS NOT NULL THEN 1 ELSE 0 END), 0) * 100 as recommendation_rate,
  MAX(created_at) as last_rated
FROM tool_ratings
GROUP BY tool_id;

-- 创建视图：待处理的高优先级建议
CREATE OR REPLACE VIEW pending_high_priority_suggestions AS
SELECT 
  s.*,
  r.average_rating as current_tool_rating,
  r.total_ratings as current_tool_ratings_count
FROM tool_replacement_suggestions s
LEFT JOIN tool_average_ratings r ON s.current_tool_id = r.tool_id
WHERE s.status = 'pending'
  AND (s.improvement_percentage > 30 OR r.average_rating < 3.5)
ORDER BY s.improvement_percentage DESC;

-- 添加一些初始测试数据（可选）
-- INSERT INTO tool_ratings (tool_id, rating, would_recommend, feedback) VALUES
-- ('chatgpt', 5, true, 'Excellent tool for content creation'),
-- ('grammarly', 3, false, 'Too expensive for the features offered'),
-- ('canva', 4, true, 'Great for quick designs');

-- 输出创建结果
SELECT 
  'Tool monitoring database initialized successfully!' as message,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'tool_%' OR table_name LIKE 'discovered_%' OR table_name = 'monitoring_logs') as tables_created,
  (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public' AND indexname LIKE 'idx_%') as indexes_created;