-- 用户画像和个性化推荐系统表结构

-- 用户画像表
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    
    -- 基础画像
    job_role VARCHAR(100), -- 'marketing_manager', 'content_creator', 'developer', 'designer', 'analyst', 'entrepreneur'
    industry VARCHAR(100), -- 'tech', 'healthcare', 'finance', 'education', 'ecommerce', 'consulting'
    company_size VARCHAR(50), -- 'startup', 'small', 'medium', 'enterprise'
    experience_level VARCHAR(50), -- 'beginner', 'intermediate', 'advanced', 'expert'
    
    -- AI工具使用习惯
    budget_range VARCHAR(50), -- 'free_only', 'under_50', 'under_200', 'under_500', 'enterprise'
    preferred_tool_types TEXT[], -- ['writing', 'design', 'automation', 'analysis']
    current_tools_used TEXT[], -- 当前使用的工具列表
    
    -- 使用场景偏好
    primary_use_cases TEXT[], -- ['content_creation', 'data_analysis', 'automation', 'customer_service']
    workflow_complexity VARCHAR(50), -- 'simple', 'moderate', 'complex'
    time_investment VARCHAR(50), -- 'quick_wins', 'moderate_setup', 'long_term_investment'
    
    -- 学习偏好
    learning_style VARCHAR(50), -- 'visual', 'hands_on', 'documentation', 'video'
    support_needs VARCHAR(50), -- 'self_service', 'community', 'professional'
    
    -- 行为数据
    tools_viewed TEXT[],
    tools_bookmarked TEXT[],
    workflows_completed TEXT[],
    search_history TEXT[],
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 智能推荐表
CREATE TABLE smart_recommendations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    recommendation_type VARCHAR(50), -- 'tool', 'workflow', 'combination'
    item_id VARCHAR(255), -- tool_id 或 workflow_id
    score DECIMAL(3,2), -- 推荐分数 0-1
    reasoning TEXT, -- 推荐理由
    context_tags TEXT[], -- 推荐上下文标签
    created_at TIMESTAMP DEFAULT NOW(),
    clicked BOOLEAN DEFAULT FALSE,
    dismissed BOOLEAN DEFAULT FALSE
);

-- 工具使用场景映射表
CREATE TABLE tool_use_cases (
    id SERIAL PRIMARY KEY,
    tool_id INT REFERENCES tools(id),
    use_case VARCHAR(100),
    job_role VARCHAR(100),
    effectiveness_score INT, -- 1-10
    setup_complexity INT, -- 1-5
    learning_curve INT, -- 1-5
    roi_potential INT -- 1-10
);

-- 工具组合推荐表
CREATE TABLE tool_combinations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    name_zh VARCHAR(255),
    description TEXT,
    description_zh TEXT,
    target_job_roles TEXT[],
    target_use_cases TEXT[],
    primary_tool_ids INT[],
    supporting_tool_ids INT[],
    estimated_monthly_cost DECIMAL(10,2),
    setup_time_hours INT,
    effectiveness_rating DECIMAL(3,2),
    user_testimonials TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 用户行为追踪表
CREATE TABLE user_behavior_analytics (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    session_id VARCHAR(255),
    action_type VARCHAR(50), -- 'view_tool', 'search', 'filter', 'bookmark', 'rate'
    target_id VARCHAR(255), -- tool_id, workflow_id等
    context JSON, -- 额外上下文数据
    timestamp TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_user_profiles_job_role ON user_profiles(job_role);
CREATE INDEX idx_user_profiles_industry ON user_profiles(industry);
CREATE INDEX idx_smart_recommendations_user_score ON smart_recommendations(user_id, score DESC);
CREATE INDEX idx_tool_use_cases_role_case ON tool_use_cases(job_role, use_case);
CREATE INDEX idx_user_behavior_user_action ON user_behavior_analytics(user_id, action_type);