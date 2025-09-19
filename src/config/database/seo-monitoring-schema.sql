-- SEO监控系统数据库表结构

-- 关键词排名表
CREATE TABLE IF NOT EXISTS keyword_rankings (
    id SERIAL PRIMARY KEY,
    keyword VARCHAR(255) NOT NULL,
    search_engine VARCHAR(50) NOT NULL DEFAULT 'google',
    country VARCHAR(10) NOT NULL DEFAULT 'US',
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    ranking_position INTEGER,
    previous_position INTEGER,
    url TEXT,
    search_volume INTEGER DEFAULT 0,
    difficulty DECIMAL(5,2) DEFAULT 0,
    competition DECIMAL(3,2) DEFAULT 0,
    ctr DECIMAL(5,2) DEFAULT 0,
    traffic_estimate INTEGER DEFAULT 0,
    featured_snippet BOOLEAN DEFAULT FALSE,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(keyword, search_engine, country, date),
    INDEX idx_keyword_date (keyword, date),
    INDEX idx_search_engine_country (search_engine, country),
    INDEX idx_ranking_position (ranking_position),
    INDEX idx_date (date)
);

-- 流量数据表
CREATE TABLE IF NOT EXISTS traffic_data (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    source VARCHAR(100) NOT NULL,
    medium VARCHAR(100),
    campaign VARCHAR(255),
    device_type VARCHAR(50),
    country VARCHAR(10),
    sessions INTEGER DEFAULT 0,
    users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    bounce_rate DECIMAL(5,2) DEFAULT 0,
    avg_session_duration INTEGER DEFAULT 0,
    pages_per_session DECIMAL(5,2) DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0,
    goal_completions INTEGER DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(date, source, medium, device_type, country),
    INDEX idx_date_source (date, source),
    INDEX idx_country (country),
    INDEX idx_device_type (device_type)
);

-- 技术SEO监控表
CREATE TABLE IF NOT EXISTS technical_seo (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    check_type VARCHAR(100) NOT NULL,
    status VARCHAR(50),
    score DECIMAL(5,2),
    details JSONB,
    core_web_vitals JSONB,
    page_speed_score INTEGER,
    mobile_friendly_score INTEGER,
    accessibility_score INTEGER,
    seo_score INTEGER,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_url_type (url(255), check_type),
    INDEX idx_date_type (date, check_type),
    INDEX idx_status (status),
    INDEX idx_score (score)
);

-- 竞争对手监控表
CREATE TABLE IF NOT EXISTS competitor_tracking (
    id SERIAL PRIMARY KEY,
    competitor_domain VARCHAR(255) NOT NULL,
    competitor_name VARCHAR(255),
    keyword VARCHAR(255) NOT NULL,
    ranking_position INTEGER,
    previous_position INTEGER,
    estimated_traffic INTEGER DEFAULT 0,
    backlinks_count INTEGER DEFAULT 0,
    domain_rating DECIMAL(5,2) DEFAULT 0,
    visibility_score DECIMAL(5,2) DEFAULT 0,
    search_engine VARCHAR(50) NOT NULL DEFAULT 'google',
    country VARCHAR(10) NOT NULL DEFAULT 'US',
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(competitor_domain, keyword, search_engine, country, date),
    INDEX idx_competitor_keyword (competitor_domain, keyword),
    INDEX idx_date_competitor (date, competitor_domain),
    INDEX idx_ranking_position (ranking_position)
);

-- 外链监控表
CREATE TABLE IF NOT EXISTS backlink_monitoring (
    id SERIAL PRIMARY KEY,
    source_domain VARCHAR(255) NOT NULL,
    source_url TEXT,
    target_url TEXT NOT NULL,
    anchor_text TEXT,
    link_type VARCHAR(50) DEFAULT 'dofollow',
    domain_rating DECIMAL(5,2) DEFAULT 0,
    url_rating DECIMAL(5,2) DEFAULT 0,
    traffic_estimate INTEGER DEFAULT 0,
    link_placement VARCHAR(100),
    nofollow BOOLEAN DEFAULT FALSE,
    first_seen DATE,
    last_seen DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_source_domain (source_domain),
    INDEX idx_target_url (target_url(255)),
    INDEX idx_status (status),
    INDEX idx_first_seen (first_seen),
    INDEX idx_last_seen (last_seen)
);

-- SEO警报表
CREATE TABLE IF NOT EXISTS seo_alerts (
    id SERIAL PRIMARY KEY,
    alert_type VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL DEFAULT 'info',
    title VARCHAR(255) NOT NULL,
    message TEXT,
    url TEXT,
    metric_name VARCHAR(100),
    current_value DECIMAL(10,2),
    previous_value DECIMAL(10,2),
    threshold_value DECIMAL(10,2),
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP NULL,
    resolved_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_alert_type (alert_type),
    INDEX idx_severity (severity),
    INDEX idx_resolved (resolved),
    INDEX idx_created_at (created_at)
);

-- 站点地图监控表
CREATE TABLE IF NOT EXISTS sitemap_monitoring (
    id SERIAL PRIMARY KEY,
    sitemap_url TEXT NOT NULL,
    url TEXT NOT NULL,
    status_code INTEGER,
    indexed BOOLEAN DEFAULT FALSE,
    last_crawled DATE,
    crawl_frequency VARCHAR(50),
    priority DECIMAL(3,2) DEFAULT 0.5,
    error_message TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_sitemap_url (sitemap_url(255)),
    INDEX idx_url (url(255)),
    INDEX idx_status_code (status_code),
    INDEX idx_indexed (indexed),
    INDEX idx_date (date)
);

-- 内容质量监控表
CREATE TABLE IF NOT EXISTS content_quality (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    title VARCHAR(500),
    meta_description TEXT,
    content_length INTEGER DEFAULT 0,
    word_count INTEGER DEFAULT 0,
    readability_score DECIMAL(5,2),
    keyword_density JSONB,
    internal_links_count INTEGER DEFAULT 0,
    external_links_count INTEGER DEFAULT 0,
    images_count INTEGER DEFAULT 0,
    images_without_alt INTEGER DEFAULT 0,
    h1_count INTEGER DEFAULT 0,
    h2_count INTEGER DEFAULT 0,
    duplicate_content BOOLEAN DEFAULT FALSE,
    thin_content BOOLEAN DEFAULT FALSE,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_url_date (url(255), date),
    INDEX idx_word_count (word_count),
    INDEX idx_duplicate_content (duplicate_content),
    INDEX idx_thin_content (thin_content)
);

-- 性能监控表
CREATE TABLE IF NOT EXISTS performance_monitoring (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    device_type VARCHAR(50) NOT NULL DEFAULT 'desktop',
    location VARCHAR(100) NOT NULL DEFAULT 'global',
    lcp DECIMAL(6,3),
    fid DECIMAL(6,3),
    cls DECIMAL(6,3),
    fcp DECIMAL(6,3),
    ttfb DECIMAL(6,3),
    speed_index DECIMAL(8,3),
    total_blocking_time DECIMAL(8,3),
    largest_contentful_paint DECIMAL(8,3),
    performance_score INTEGER,
    accessibility_score INTEGER,
    best_practices_score INTEGER,
    seo_score INTEGER,
    date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_url_device (url(255), device_type),
    INDEX idx_date (date),
    INDEX idx_performance_score (performance_score)
);

-- 搜索控制台数据表
CREATE TABLE IF NOT EXISTS search_console_data (
    id SERIAL PRIMARY KEY,
    query VARCHAR(500) NOT NULL,
    page TEXT NOT NULL,
    country VARCHAR(10) NOT NULL DEFAULT 'total',
    device VARCHAR(50) NOT NULL DEFAULT 'total',
    search_type VARCHAR(50) NOT NULL DEFAULT 'web',
    clicks INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    ctr DECIMAL(8,6) DEFAULT 0,
    position DECIMAL(8,2) DEFAULT 0,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(query, page, country, device, search_type, date),
    INDEX idx_query_date (query(255), date),
    INDEX idx_page_date (page(255), date),
    INDEX idx_clicks (clicks),
    INDEX idx_impressions (impressions),
    INDEX idx_position (position)
);

-- 数据收集任务表
CREATE TABLE IF NOT EXISTS data_collection_jobs (
    id SERIAL PRIMARY KEY,
    job_type VARCHAR(100) NOT NULL,
    source VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    parameters JSONB,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    error_message TEXT,
    records_processed INTEGER DEFAULT 0,
    next_run_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_job_type (job_type),
    INDEX idx_status (status),
    INDEX idx_next_run_at (next_run_at),
    INDEX idx_created_at (created_at)
);

-- 创建视图以便快速查询常用统计数据

-- 关键词排名概览视图
CREATE OR REPLACE VIEW keyword_rankings_overview AS
SELECT 
    COUNT(*) as total_keywords,
    COUNT(CASE WHEN ranking_position <= 3 THEN 1 END) as top_3,
    COUNT(CASE WHEN ranking_position <= 10 THEN 1 END) as top_10,
    COUNT(CASE WHEN ranking_position = 1 THEN 1 END) as position_1,
    AVG(ranking_position) as avg_position,
    SUM(traffic_estimate) as total_traffic_estimate,
    COUNT(CASE WHEN featured_snippet = TRUE THEN 1 END) as featured_snippets,
    COUNT(CASE WHEN ranking_position < previous_position THEN 1 END) as improvements,
    COUNT(CASE WHEN ranking_position > previous_position THEN 1 END) as declines,
    search_engine,
    country,
    date
FROM keyword_rankings 
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY search_engine, country, date;

-- 流量趋势视图
CREATE OR REPLACE VIEW traffic_trends AS
SELECT 
    date,
    SUM(CASE WHEN source = 'google' THEN sessions ELSE 0 END) as organic_sessions,
    SUM(CASE WHEN source = 'google' THEN users ELSE 0 END) as organic_users,
    SUM(sessions) as total_sessions,
    SUM(users) as total_users,
    AVG(bounce_rate) as avg_bounce_rate,
    AVG(avg_session_duration) as avg_session_duration,
    AVG(pages_per_session) as avg_pages_per_session,
    AVG(conversion_rate) as avg_conversion_rate
FROM traffic_data 
WHERE date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY date
ORDER BY date;

-- 技术SEO健康度视图
CREATE OR REPLACE VIEW technical_seo_health AS
SELECT 
    date,
    AVG(CASE WHEN check_type = 'core_web_vitals' THEN score END) as core_web_vitals_score,
    AVG(CASE WHEN check_type = 'page_speed' THEN score END) as page_speed_score,
    AVG(CASE WHEN check_type = 'mobile_friendly' THEN score END) as mobile_friendly_score,
    COUNT(CASE WHEN status = 'error' THEN 1 END) as error_count,
    COUNT(CASE WHEN status = 'warning' THEN 1 END) as warning_count,
    COUNT(CASE WHEN status = 'success' THEN 1 END) as success_count
FROM technical_seo 
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY date
ORDER BY date;

-- 外链增长视图
CREATE OR REPLACE VIEW backlink_growth AS
SELECT 
    DATE(first_seen) as date,
    COUNT(*) as new_backlinks,
    COUNT(DISTINCT source_domain) as new_domains,
    AVG(domain_rating) as avg_domain_rating,
    COUNT(CASE WHEN link_type = 'dofollow' THEN 1 END) as dofollow_links,
    COUNT(CASE WHEN link_type = 'nofollow' THEN 1 END) as nofollow_links
FROM backlink_monitoring 
WHERE first_seen >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY DATE(first_seen)
ORDER BY date;

-- 竞争对手可见性对比视图
CREATE OR REPLACE VIEW competitor_visibility AS
SELECT 
    competitor_domain,
    competitor_name,
    date,
    COUNT(*) as total_keywords,
    AVG(ranking_position) as avg_position,
    AVG(visibility_score) as avg_visibility,
    SUM(estimated_traffic) as total_estimated_traffic,
    COUNT(CASE WHEN ranking_position <= 10 THEN 1 END) as top_10_keywords
FROM competitor_tracking 
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY competitor_domain, competitor_name, date
ORDER BY date, avg_visibility DESC;

-- 创建函数计算可见性分数
DELIMITER //
CREATE FUNCTION calculate_visibility_score(total_keywords INT, top_10 INT, top_3 INT, position_1 INT) 
RETURNS DECIMAL(5,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE visibility DECIMAL(5,2) DEFAULT 0;
    
    IF total_keywords > 0 THEN
        SET visibility = (
            (position_1 * 100) + 
            (top_3 * 50) + 
            (top_10 * 20) + 
            ((total_keywords - top_10) * 5)
        ) / total_keywords;
    END IF;
    
    RETURN LEAST(visibility, 100.00);
END//
DELIMITER ;

-- 创建存储过程用于数据清理
DELIMITER //
CREATE PROCEDURE cleanup_old_data()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE table_name VARCHAR(255);
    DECLARE retention_days INT;
    
    DECLARE cleanup_cursor CURSOR FOR
        SELECT 'keyword_rankings', 365
        UNION SELECT 'traffic_data', 730
        UNION SELECT 'technical_seo', 90
        UNION SELECT 'performance_monitoring', 30
        UNION SELECT 'search_console_data', 365
        UNION SELECT 'seo_alerts', 180;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cleanup_cursor;
    
    cleanup_loop: LOOP
        FETCH cleanup_cursor INTO table_name, retention_days;
        IF done THEN
            LEAVE cleanup_loop;
        END IF;
        
        SET @sql = CONCAT(
            'DELETE FROM ', table_name, 
            ' WHERE created_at < DATE_SUB(NOW(), INTERVAL ', retention_days, ' DAY)'
        );
        
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
        
    END LOOP;
    
    CLOSE cleanup_cursor;
END//
DELIMITER ;

-- 创建事件调度器用于自动数据清理（可选）
-- CREATE EVENT IF NOT EXISTS auto_cleanup
-- ON SCHEDULE EVERY 1 WEEK
-- DO CALL cleanup_old_data();