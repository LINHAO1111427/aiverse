-- 插入分类数据
INSERT INTO "Category" (slug, name, description, icon, "sortOrder", "createdAt", "updatedAt") VALUES
('ai-assistants', 'AI Assistants', 'AI-powered virtual assistants and chatbots', 'Bot', 1, NOW(), NOW()),
('image-generation', 'Image Generation', 'Create images, art, and graphics with AI', 'Image', 2, NOW(), NOW()),
('writing-tools', 'Writing Tools', 'AI tools for content creation and writing', 'PenTool', 3, NOW(), NOW()),
('code-development', 'Code & Development', 'AI tools for coding and software development', 'Code', 4, NOW(), NOW()),
('video-audio', 'Video & Audio', 'AI tools for video and audio processing', 'Video', 5, NOW(), NOW()),
('productivity', 'Productivity', 'AI tools to boost productivity', 'Zap', 6, NOW(), NOW()),
('data-analysis', 'Data Analysis', 'AI tools for data analysis and insights', 'BarChart', 7, NOW(), NOW()),
('marketing', 'Marketing', 'AI tools for marketing and sales', 'TrendingUp', 8, NOW(), NOW());

-- 插入标签数据
INSERT INTO "Tag" (name, slug) VALUES
('Chatbot', 'chatbot'),
('Image AI', 'image-ai'),
('Content Writing', 'content-writing'),
('Code Assistant', 'code-assistant'),
('Video Editor', 'video-editor'),
('Automation', 'automation'),
('Analytics', 'analytics'),
('SEO', 'seo');

-- 插入工具数据
INSERT INTO "Tool" (slug, name, tagline, description, "websiteUrl", "logoUrl", "pricingType", "startingPrice", "categoryId", "apiAvailable", "companyName", "foundedYear", featured, status, "createdAt", "updatedAt") VALUES
-- AI Assistants
('chatgpt', 'ChatGPT', 'Advanced AI chatbot by OpenAI', 'ChatGPT is an AI language model that can assist with a wide range of tasks including answering questions, creative writing, coding, and analysis.', 'https://chat.openai.com', 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', 'freemium', 20.00, 1, true, 'OpenAI', 2015, true, 'active', NOW(), NOW()),
('claude', 'Claude', 'AI assistant by Anthropic', 'Claude is an AI assistant created by Anthropic that can help with analysis, writing, math, coding, and creative tasks.', 'https://claude.ai', 'https://www.anthropic.com/images/claude-icon.png', 'freemium', 20.00, 1, true, 'Anthropic', 2021, true, 'active', NOW(), NOW()),
('gemini', 'Google Gemini', 'Google''s multimodal AI', 'Gemini is Google''s most capable AI model, designed to be multimodal and able to understand text, images, audio, and more.', 'https://gemini.google.com', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', 'freemium', 19.99, 1, true, 'Google', 1998, true, 'active', NOW(), NOW()),

-- Image Generation
('midjourney', 'Midjourney', 'AI art generator', 'Midjourney is an AI art generator that creates images from natural language descriptions called prompts.', 'https://www.midjourney.com', 'https://cdn.dribbble.com/users/9685999/screenshots/19394012/media/e6a0d3d7b82a5b5e9e1e2e1e2e1e2e1e.png', 'paid', 10.00, 2, false, 'Midjourney Inc.', 2021, true, 'active', NOW(), NOW()),
('dall-e-3', 'DALL-E 3', 'OpenAI''s image generator', 'DALL-E 3 is OpenAI''s most advanced image generation model, capable of creating detailed images from text descriptions.', 'https://openai.com/dall-e-3', 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', 'paid', 20.00, 2, true, 'OpenAI', 2015, true, 'active', NOW(), NOW()),
('stable-diffusion', 'Stable Diffusion', 'Open-source image AI', 'Stable Diffusion is an open-source deep learning model that generates detailed images from text descriptions.', 'https://stability.ai', 'https://stability.ai/favicon.ico', 'freemium', 10.00, 2, true, 'Stability AI', 2020, true, 'active', NOW(), NOW()),

-- Writing Tools
('jasper', 'Jasper', 'AI content creator', 'Jasper is an AI writing assistant that helps create high-quality content for blogs, social media, and marketing.', 'https://www.jasper.ai', 'https://assets.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b8652d8c30e1a_Jasper%20Logo.svg', 'paid', 49.00, 3, true, 'Jasper AI', 2021, true, 'active', NOW(), NOW()),
('copy-ai', 'Copy.ai', 'AI copywriting tool', 'Copy.ai uses AI to help write marketing copy, blog posts, social media content, and more in seconds.', 'https://www.copy.ai', 'https://assets-global.website-files.com/628288c5cd3e8411b90a36a4/628288c5cd3e8469890a3b3c_Copy.ai%20Logo.svg', 'freemium', 36.00, 3, true, 'Copy.ai', 2020, false, 'active', NOW(), NOW()),

-- Code Development
('github-copilot', 'GitHub Copilot', 'AI pair programmer', 'GitHub Copilot is an AI pair programmer that helps you write code faster with AI-powered code suggestions.', 'https://github.com/features/copilot', 'https://github.githubassets.com/images/modules/site/copilot/copilot.png', 'paid', 10.00, 4, true, 'GitHub', 2008, true, 'active', NOW(), NOW()),
('cursor', 'Cursor', 'AI-first code editor', 'Cursor is an AI-powered code editor designed to help developers write code faster with AI assistance.', 'https://cursor.sh', 'https://cursor.sh/favicon.ico', 'freemium', 20.00, 4, false, 'Cursor', 2022, true, 'active', NOW(), NOW());

-- 插入工具标签关联
INSERT INTO "ToolTag" ("toolId", "tagId") VALUES
(1, 1), -- ChatGPT - Chatbot
(2, 1), -- Claude - Chatbot
(3, 1), -- Gemini - Chatbot
(4, 2), -- Midjourney - Image AI
(5, 2), -- DALL-E 3 - Image AI
(6, 2), -- Stable Diffusion - Image AI
(7, 3), -- Jasper - Content Writing
(8, 3), -- Copy.ai - Content Writing
(9, 4), -- GitHub Copilot - Code Assistant
(10, 4); -- Cursor - Code Assistant

-- 插入一些评分数据
INSERT INTO "Rating" ("toolId", "userEmail", rating, review, "isVerified") VALUES
(1, 'user1@example.com', 5, 'ChatGPT is amazing for brainstorming and getting quick answers!', true),
(1, 'user2@example.com', 4, 'Very helpful but sometimes gives outdated information.', true),
(2, 'user3@example.com', 5, 'Claude is great for coding and detailed analysis.', true),
(4, 'user4@example.com', 5, 'Midjourney creates stunning artwork!', true),
(9, 'user5@example.com', 4, 'GitHub Copilot saves me so much time coding.', true);

-- 插入定价计划
INSERT INTO "PricingPlan" ("toolId", "planName", price, "billingCycle", features, "sortOrder", "createdAt", "updatedAt") VALUES
(1, 'Free', 0, 'monthly', '{"features": ["Limited messages", "GPT-3.5 access"]}', 1, NOW(), NOW()),
(1, 'Plus', 20, 'monthly', '{"features": ["Unlimited messages", "GPT-4 access", "DALL-E access", "Advanced data analysis"]}', 2, NOW(), NOW()),
(2, 'Free', 0, 'monthly', '{"features": ["Limited messages", "Claude 2 access"]}', 1, NOW(), NOW()),
(2, 'Pro', 20, 'monthly', '{"features": ["Unlimited messages", "Claude 3 access", "Priority access"]}', 2, NOW(), NOW());

-- 插入工作流分类
INSERT INTO "WorkflowCategory" (slug, name, name_zh, description, description_zh, icon, "sortOrder", "createdAt", "updatedAt") VALUES
('content-creation', 'Content Creation', '内容创作', 'Workflows for creating various types of content', '用于创建各种类型内容的工作流程', 'PenTool', 1, NOW(), NOW()),
('marketing', 'Marketing', '市场营销', 'Marketing and promotional workflows', '市场营销和推广工作流程', 'TrendingUp', 2, NOW(), NOW()),
('development', 'Development', '开发', 'Software development workflows', '软件开发工作流程', 'Code', 3, NOW(), NOW()),
('design', 'Design', '设计', 'Design and creative workflows', '设计和创意工作流程', 'Palette', 4, NOW(), NOW());

-- 插入工作流
INSERT INTO "Workflow" (slug, name, name_zh, description, description_zh, "categoryId", difficulty, estimated_time_learning, estimated_time_execution, monthly_cost, featured, status, "createdAt", "updatedAt") VALUES
('blog-post-creation', 'Complete Blog Post Creation', '完整博客文章创作', 'Create SEO-optimized blog posts from idea to publication', '从想法到发布创建SEO优化的博客文章', 1, 'beginner', 30, 60, 56.00, true, 'published', NOW(), NOW()),
('youtube-video-script', 'YouTube Video Script Writer', 'YouTube视频脚本编写', 'Generate engaging YouTube video scripts with AI', '使用AI生成吸引人的YouTube视频脚本', 1, 'intermediate', 45, 30, 40.00, true, 'published', NOW(), NOW()),
('ai-powered-coding', 'AI-Powered Full-Stack Development', 'AI驱动的全栈开发', 'Build applications faster with AI coding assistants', '使用AI编码助手更快地构建应用程序', 3, 'advanced', 120, 180, 30.00, true, 'published', NOW(), NOW());

-- 插入工作流步骤
INSERT INTO "WorkflowStep" ("workflowId", step_order, title, title_zh, description, description_zh, estimated_time, primary_tool_id, primary_tool_name, primary_tool_slug, "createdAt", "updatedAt") VALUES
-- Blog Post Creation Workflow
(1, 1, 'Research and Ideation', '研究和构思', 'Use AI to research topics and generate blog post ideas', '使用AI研究主题并生成博客文章创意', 15, 1, 'ChatGPT', 'chatgpt', NOW(), NOW()),
(1, 2, 'Create Outline', '创建大纲', 'Generate a detailed blog post outline', '生成详细的博客文章大纲', 10, 1, 'ChatGPT', 'chatgpt', NOW(), NOW()),
(1, 3, 'Write First Draft', '撰写初稿', 'Use AI to write the complete blog post', '使用AI撰写完整的博客文章', 20, 7, 'Jasper', 'jasper', NOW(), NOW()),
(1, 4, 'Generate Images', '生成图片', 'Create custom images for your blog post', '为您的博客文章创建自定义图片', 15, 5, 'DALL-E 3', 'dall-e-3', NOW(), NOW()),

-- YouTube Video Script Workflow
(2, 1, 'Topic Research', '主题研究', 'Research trending topics and keywords', '研究热门话题和关键词', 10, 1, 'ChatGPT', 'chatgpt', NOW(), NOW()),
(2, 2, 'Script Writing', '脚本撰写', 'Write engaging video script', '撰写吸引人的视频脚本', 15, 2, 'Claude', 'claude', NOW(), NOW()),
(2, 3, 'Thumbnail Creation', '缩略图创建', 'Design eye-catching thumbnail', '设计吸引眼球的缩略图', 5, 4, 'Midjourney', 'midjourney', NOW(), NOW()),

-- AI-Powered Coding Workflow
(3, 1, 'Project Planning', '项目规划', 'Plan project architecture with AI', '使用AI规划项目架构', 30, 1, 'ChatGPT', 'chatgpt', NOW(), NOW()),
(3, 2, 'Code Implementation', '代码实现', 'Write code with AI assistance', '在AI协助下编写代码', 120, 9, 'GitHub Copilot', 'github-copilot', NOW(), NOW()),
(3, 3, 'Code Review', '代码审查', 'Review and optimize code with AI', '使用AI审查和优化代码', 30, 10, 'Cursor', 'cursor', NOW(), NOW());

-- 插入工作流工具成本
INSERT INTO "WorkflowToolCost" ("workflowId", "toolId", tool_name, plan_name, plan_name_zh, monthly_price, usage_limit, usage_limit_zh, is_required) VALUES
-- Blog Post Creation costs
(1, 1, 'ChatGPT', 'Plus', 'Plus版', 20.00, 'Unlimited messages', '无限消息', true),
(1, 7, 'Jasper', 'Creator', '创作者版', 49.00, '50,000 words/month', '每月50,000字', true),
(1, 5, 'DALL-E 3', 'ChatGPT Plus', 'ChatGPT Plus', 0.00, 'Included with ChatGPT Plus', '包含在ChatGPT Plus中', true),

-- YouTube Video Script costs
(2, 1, 'ChatGPT', 'Plus', 'Plus版', 20.00, 'Unlimited messages', '无限消息', true),
(2, 2, 'Claude', 'Pro', 'Pro版', 20.00, 'Unlimited messages', '无限消息', false),
(2, 4, 'Midjourney', 'Basic', '基础版', 10.00, '200 images/month', '每月200张图片', true),

-- AI-Powered Coding costs
(3, 1, 'ChatGPT', 'Plus', 'Plus版', 20.00, 'Unlimited messages', '无限消息', false),
(3, 9, 'GitHub Copilot', 'Individual', '个人版', 10.00, 'Unlimited suggestions', '无限建议', true),
(3, 10, 'Cursor', 'Pro', 'Pro版', 20.00, 'Unlimited AI edits', '无限AI编辑', false);

-- 插入一些工作流评论
INSERT INTO "WorkflowReview" ("workflowId", user_id, rating, success, time_taken, review_text) VALUES
(1, 'user123', 5, true, 55, 'This workflow helped me create amazing blog posts in half the time!'),
(1, 'user456', 4, true, 70, 'Great workflow, but took a bit longer than expected to learn.'),
(2, 'user789', 5, true, 25, 'Perfect for YouTube content creation. Saved me hours!'),
(3, 'user101', 4, true, 200, 'Very powerful but requires some coding knowledge.');