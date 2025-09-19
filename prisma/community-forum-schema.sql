-- 社区论坛和深度评价系统表结构

-- 论坛版块表
CREATE TABLE forum_categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    name_zh VARCHAR(255) NOT NULL,
    description TEXT,
    description_zh TEXT,
    icon VARCHAR(100),
    parent_id INT REFERENCES forum_categories(id),
    sort_order INT DEFAULT 0,
    post_count INT DEFAULT 0,
    last_post_id INT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 论坛帖子表
CREATE TABLE forum_posts (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES forum_categories(id),
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    
    -- 帖子类型
    post_type VARCHAR(50) DEFAULT 'discussion', -- 'discussion', 'question', 'showcase', 'review', 'comparison'
    
    -- 关联的工具/工作流
    related_tool_ids INT[],
    related_workflow_ids INT[],
    
    -- 统计数据
    view_count INT DEFAULT 0,
    reply_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    bookmark_count INT DEFAULT 0,
    
    -- 帖子状态
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_solved BOOLEAN DEFAULT FALSE, -- 对于问题类型帖子
    
    -- SEO相关
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_activity_at TIMESTAMP DEFAULT NOW()
);

-- 回复表
CREATE TABLE forum_replies (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES forum_posts(id) ON DELETE CASCADE,
    parent_reply_id INT REFERENCES forum_replies(id), -- 支持嵌套回复
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    content TEXT NOT NULL,
    
    -- 回复类型
    reply_type VARCHAR(50) DEFAULT 'normal', -- 'normal', 'solution', 'moderator'
    
    -- 统计数据
    like_count INT DEFAULT 0,
    
    -- 状态
    is_solution BOOLEAN DEFAULT FALSE, -- 是否为问题的解决方案
    is_deleted BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 深度工具评价表（扩展现有rating表）
CREATE TABLE detailed_tool_reviews (
    id SERIAL PRIMARY KEY,
    tool_id INT REFERENCES tools(id),
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    
    -- 详细评分（1-5分）
    overall_rating INT NOT NULL,
    ease_of_use_rating INT,
    value_for_money_rating INT,
    customer_support_rating INT,
    feature_richness_rating INT,
    
    -- 使用详情
    use_case VARCHAR(255), -- 具体使用场景
    job_role VARCHAR(100),
    experience_level VARCHAR(50),
    usage_duration VARCHAR(50), -- 'less_than_month', '1_3_months', '3_6_months', '6_months_plus'
    
    -- 详细评价内容
    title VARCHAR(255),
    pros TEXT,
    cons TEXT,
    detailed_review TEXT,
    
    -- 推荐相关
    would_recommend BOOLEAN,
    recommended_for TEXT, -- 推荐给哪类用户
    
    -- 对比
    previously_used_tools TEXT[],
    alternative_suggestions TEXT[],
    
    -- 证明材料
    screenshots_urls TEXT[],
    results_data JSON, -- 使用效果数据
    
    -- 互动数据
    helpful_count INT DEFAULT 0,
    not_helpful_count INT DEFAULT 0,
    reply_count INT DEFAULT 0,
    
    -- 审核状态
    is_verified BOOLEAN DEFAULT FALSE,
    verification_notes TEXT,
    moderation_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 工具对比讨论表
CREATE TABLE tool_comparison_discussions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tool_ids INT[], -- 参与对比的工具
    
    -- 对比维度
    comparison_criteria JSON, -- 自定义对比维度
    
    -- 社区投票结果
    community_votes JSON, -- 各工具在不同维度的得票
    
    -- 统计
    participant_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP -- 对比讨论截止时间
);

-- 用户互动表
CREATE TABLE user_interactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    target_type VARCHAR(50), -- 'post', 'reply', 'review', 'tool'
    target_id INT NOT NULL,
    interaction_type VARCHAR(50), -- 'like', 'bookmark', 'follow', 'share', 'helpful', 'not_helpful'
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, target_type, target_id, interaction_type)
);

-- 用户声誉系统表
CREATE TABLE user_reputation (
    user_id VARCHAR(255) PRIMARY KEY,
    total_points INT DEFAULT 0,
    level_name VARCHAR(50) DEFAULT 'Newcomer', -- 'Newcomer', 'Contributor', 'Expert', 'Guru'
    
    -- 积分明细
    post_points INT DEFAULT 0,
    reply_points INT DEFAULT 0,
    review_points INT DEFAULT 0,
    helpful_votes_received INT DEFAULT 0,
    solution_count INT DEFAULT 0, -- 解决问题数量
    
    -- 徽章
    badges JSON, -- 各种成就徽章
    
    -- 统计
    posts_count INT DEFAULT 0,
    replies_count INT DEFAULT 0,
    reviews_count INT DEFAULT 0,
    days_active INT DEFAULT 0,
    
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 工具使用案例分享表
CREATE TABLE tool_use_cases_showcase (
    id SERIAL PRIMARY KEY,
    tool_id INT REFERENCES tools(id),
    user_id VARCHAR(255) NOT NULL,
    
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    industry VARCHAR(100),
    job_role VARCHAR(100),
    
    -- 案例详情
    challenge_description TEXT, -- 遇到的挑战
    solution_approach TEXT, -- 解决方案
    results_achieved TEXT, -- 取得的成果
    
    -- 数据支撑
    metrics_before JSON, -- 使用前的数据
    metrics_after JSON, -- 使用后的数据
    time_saved_hours INT,
    cost_savings_amount DECIMAL(10,2),
    quality_improvement_percentage INT,
    
    -- 媒体材料
    images_urls TEXT[],
    video_url VARCHAR(255),
    
    -- 推荐度
    difficulty_level INT, -- 1-5 实施难度
    recommendation_score INT, -- 1-10 推荐度
    
    -- 互动数据
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    bookmark_count INT DEFAULT 0,
    
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 主题标签表
CREATE TABLE topic_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    name_zh VARCHAR(100),
    description TEXT,
    use_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 帖子标签关联表
CREATE TABLE post_tags (
    post_id INT REFERENCES forum_posts(id) ON DELETE CASCADE,
    tag_id INT REFERENCES topic_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- 创建索引
CREATE INDEX idx_forum_posts_category_activity ON forum_posts(category_id, last_activity_at DESC);
CREATE INDEX idx_forum_posts_type_created ON forum_posts(post_type, created_at DESC);
CREATE INDEX idx_forum_replies_post ON forum_replies(post_id, created_at);
CREATE INDEX idx_detailed_reviews_tool_rating ON detailed_tool_reviews(tool_id, overall_rating DESC);
CREATE INDEX idx_detailed_reviews_usecase ON detailed_tool_reviews(use_case, job_role);
CREATE INDEX idx_user_interactions_user_type ON user_interactions(user_id, target_type);
CREATE INDEX idx_showcase_tool_featured ON tool_use_cases_showcase(tool_id, is_featured, view_count DESC);

-- 初始化论坛版块数据
INSERT INTO forum_categories (slug, name, name_zh, description, description_zh, sort_order) VALUES
('general-discussion', 'General Discussion', '综合讨论', 'General discussions about AI tools and trends', '关于AI工具和趋势的综合讨论', 1),
('tool-reviews', 'Tool Reviews', '工具评测', 'In-depth reviews and comparisons of AI tools', '深度AI工具评测和对比', 2),
('workflow-sharing', 'Workflow Sharing', '工作流分享', 'Share your AI tool workflows and combinations', '分享AI工具工作流和组合方案', 3),
('questions-help', 'Questions & Help', '问题求助', 'Get help with AI tools and implementation', '获取AI工具使用和实施帮助', 4),
('showcase', 'Success Stories', '成功案例', 'Showcase your achievements with AI tools', '展示使用AI工具的成功案例', 5),
('news-updates', 'News & Updates', '新闻动态', 'Latest news and updates in AI tools space', 'AI工具领域的最新新闻和更新', 6);