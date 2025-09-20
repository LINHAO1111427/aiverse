-- 大模型配置数据库表结构
-- 用于存储和管理各种AI大模型的配置信息

-- 1. 大模型配置主表
CREATE TABLE IF NOT EXISTS llm_configs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    provider VARCHAR(50) NOT NULL COMMENT '模型提供商 (openai, anthropic, google, etc.)',
    model_name VARCHAR(100) NOT NULL COMMENT '模型名称',
    model_id VARCHAR(100) NOT NULL COMMENT '模型ID/标识符',
    display_name VARCHAR(100) NOT NULL COMMENT '显示名称',
    description TEXT COMMENT '模型描述',
    
    -- API配置
    api_endpoint VARCHAR(500) COMMENT 'API端点URL',
    api_key_encrypted TEXT COMMENT '加密的API密钥',
    api_version VARCHAR(20) COMMENT 'API版本',
    
    -- 模型参数
    max_tokens INT DEFAULT 4096 COMMENT '最大token数',
    temperature DECIMAL(3,2) DEFAULT 0.7 COMMENT '温度参数',
    top_p DECIMAL(3,2) DEFAULT 1.0 COMMENT 'top_p参数',
    frequency_penalty DECIMAL(3,2) DEFAULT 0.0 COMMENT '频率惩罚',
    presence_penalty DECIMAL(3,2) DEFAULT 0.0 COMMENT '存在惩罚',
    
    -- 模型能力
    supports_streaming BOOLEAN DEFAULT TRUE COMMENT '是否支持流式输出',
    supports_function_calling BOOLEAN DEFAULT FALSE COMMENT '是否支持函数调用',
    supports_vision BOOLEAN DEFAULT FALSE COMMENT '是否支持视觉理解',
    supports_code_generation BOOLEAN DEFAULT TRUE COMMENT '是否支持代码生成',
    
    -- 成本和限制
    cost_per_1k_input_tokens DECIMAL(10,6) COMMENT '每1K输入token成本(USD)',
    cost_per_1k_output_tokens DECIMAL(10,6) COMMENT '每1K输出token成本(USD)',
    rate_limit_rpm INT COMMENT '每分钟请求限制',
    rate_limit_tpm INT COMMENT '每分钟token限制',
    
    -- 状态和设置
    is_enabled BOOLEAN DEFAULT TRUE COMMENT '是否启用',
    is_default BOOLEAN DEFAULT FALSE COMMENT '是否为默认模型',
    priority INT DEFAULT 0 COMMENT '优先级(数字越大优先级越高)',
    
    -- 使用统计
    total_requests INT DEFAULT 0 COMMENT '总请求数',
    total_tokens_used BIGINT DEFAULT 0 COMMENT '总使用token数',
    total_cost DECIMAL(10,4) DEFAULT 0.0000 COMMENT '总成本',
    last_used_at TIMESTAMP NULL COMMENT '最后使用时间',
    
    -- 时间戳
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- 索引
    UNIQUE KEY unique_provider_model (provider, model_id),
    INDEX idx_provider (provider),
    INDEX idx_enabled (is_enabled),
    INDEX idx_default (is_default),
    INDEX idx_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 模型使用日志表
CREATE TABLE IF NOT EXISTS llm_usage_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    config_id INT NOT NULL,
    
    -- 请求信息
    request_type VARCHAR(50) NOT NULL COMMENT '请求类型 (chat, completion, embedding, etc.)',
    user_id VARCHAR(100) COMMENT '用户ID',
    session_id VARCHAR(100) COMMENT '会话ID',
    
    -- Token使用
    input_tokens INT NOT NULL COMMENT '输入token数',
    output_tokens INT NOT NULL COMMENT '输出token数',
    total_tokens INT NOT NULL COMMENT '总token数',
    
    -- 成本计算
    cost DECIMAL(10,6) NOT NULL COMMENT '本次请求成本',
    
    -- 响应信息
    response_time_ms INT COMMENT '响应时间(毫秒)',
    success BOOLEAN NOT NULL DEFAULT TRUE COMMENT '是否成功',
    error_message TEXT COMMENT '错误信息',
    
    -- 请求参数
    temperature DECIMAL(3,2) COMMENT '使用的温度参数',
    max_tokens INT COMMENT '请求的最大token数',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (config_id) REFERENCES llm_configs(id) ON DELETE CASCADE,
    INDEX idx_config_id (config_id),
    INDEX idx_created_at (created_at),
    INDEX idx_user_id (user_id),
    INDEX idx_success (success)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 预置的模型配置数据
INSERT INTO llm_configs (
    provider, model_name, model_id, display_name, description,
    max_tokens, temperature, supports_streaming, supports_function_calling,
    cost_per_1k_input_tokens, cost_per_1k_output_tokens,
    rate_limit_rpm, is_enabled, priority
) VALUES
-- OpenAI模型
('openai', 'GPT-4o', 'gpt-4o', 'GPT-4o', '最新的GPT-4优化模型，平衡性能和成本', 128000, 0.7, TRUE, TRUE, 0.005, 0.015, 500, TRUE, 90),
('openai', 'GPT-4 Turbo', 'gpt-4-turbo', 'GPT-4 Turbo', '高性能GPT-4模型，支持128k上下文', 128000, 0.7, TRUE, TRUE, 0.01, 0.03, 500, TRUE, 80),
('openai', 'GPT-3.5 Turbo', 'gpt-3.5-turbo', 'GPT-3.5 Turbo', '快速且经济的模型，适合大多数任务', 16384, 0.7, TRUE, TRUE, 0.0005, 0.0015, 3500, TRUE, 70),

-- Anthropic模型
('anthropic', 'Claude 3.5 Sonnet', 'claude-3-5-sonnet-20241022', 'Claude 3.5 Sonnet', '最新的Claude模型，在推理和代码能力上表现出色', 200000, 0.7, TRUE, FALSE, 0.003, 0.015, 1000, TRUE, 95),
('anthropic', 'Claude 3 Opus', 'claude-3-opus-20240229', 'Claude 3 Opus', 'Claude最强大的模型，适合复杂任务', 200000, 0.7, TRUE, FALSE, 0.015, 0.075, 1000, TRUE, 85),
('anthropic', 'Claude 3 Haiku', 'claude-3-haiku-20240307', 'Claude 3 Haiku', 'Claude最快速的模型，适合简单任务', 200000, 0.7, TRUE, FALSE, 0.00025, 0.00125, 2000, TRUE, 60),

-- Google模型
('google', 'Gemini Pro', 'gemini-pro', 'Gemini Pro', 'Google的高性能多模态模型', 32768, 0.7, TRUE, TRUE, 0.0005, 0.0015, 60, TRUE, 75),
('google', 'Gemini Pro Vision', 'gemini-pro-vision', 'Gemini Pro Vision', 'Google的视觉理解模型', 16384, 0.7, TRUE, FALSE, 0.0005, 0.0015, 60, TRUE, 65),

-- 其他模型提供商
('azure', 'Azure GPT-4', 'gpt-4', 'Azure GPT-4', '通过Azure提供的GPT-4服务', 8192, 0.7, TRUE, TRUE, 0.03, 0.06, 240, FALSE, 70),
('ollama', 'Llama 2 7B', 'llama2:7b', 'Llama 2 7B', '本地部署的开源模型', 4096, 0.7, TRUE, FALSE, 0, 0, 999999, FALSE, 50);

-- 设置默认模型
UPDATE llm_configs SET is_default = TRUE WHERE model_id = 'claude-3-5-sonnet-20241022' LIMIT 1;

-- 创建视图：活跃模型配置
CREATE VIEW active_llm_configs AS
SELECT 
    id, provider, model_name, model_id, display_name, description,
    max_tokens, temperature, top_p, frequency_penalty, presence_penalty,
    supports_streaming, supports_function_calling, supports_vision, supports_code_generation,
    cost_per_1k_input_tokens, cost_per_1k_output_tokens,
    rate_limit_rpm, rate_limit_tpm, is_default, priority,
    total_requests, total_tokens_used, total_cost, last_used_at
FROM llm_configs 
WHERE is_enabled = TRUE 
ORDER BY priority DESC, model_name;

-- 创建视图：使用统计
CREATE VIEW llm_usage_stats AS
SELECT 
    c.id, c.provider, c.model_name, c.display_name,
    COUNT(l.id) as request_count,
    SUM(l.input_tokens) as total_input_tokens,
    SUM(l.output_tokens) as total_output_tokens,
    SUM(l.total_tokens) as total_tokens,
    SUM(l.cost) as total_cost,
    AVG(l.response_time_ms) as avg_response_time,
    MAX(l.created_at) as last_used
FROM llm_configs c
LEFT JOIN llm_usage_logs l ON c.id = l.config_id
WHERE c.is_enabled = TRUE
GROUP BY c.id, c.provider, c.model_name, c.display_name
ORDER BY total_cost DESC;