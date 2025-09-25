const mysql = require('mysql2/promise')
const fs = require('fs')
const path = require('path')

// 数据库配置
const dbConfig = {
  host: process.env.SEO_DB_HOST || 'localhost',
  port: parseInt(process.env.SEO_DB_PORT || '3306'),
  user: process.env.SEO_DB_USER || 'root',
  password: process.env.SEO_DB_PASSWORD || '',
  database: process.env.SEO_DB_NAME || 'aiverse_seo',
  multipleStatements: true
}

async function initializeLLMConfigDatabase() {
  let connection = null
  
  try {
    console.log('正在连接数据库...')
    connection = await mysql.createConnection(dbConfig)
    
    console.log('数据库连接成功！')
    
    // 读取SQL文件
    const sqlPath = path.join(__dirname, '..', 'config', 'database', 'llm-config-schema.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')
    
    console.log('正在执行数据库初始化脚本...')
    
    // 执行SQL脚本
    await connection.execute(sqlContent)
    
    console.log('✅ 大模型配置数据库初始化完成！')
    console.log('')
    console.log('已创建的表：')
    console.log('- llm_configs: 大模型配置表')
    console.log('- llm_usage_logs: 使用日志表')
    console.log('')
    console.log('已创建的视图：')
    console.log('- active_llm_configs: 活跃模型配置视图')
    console.log('- llm_usage_stats: 使用统计视图')
    console.log('')
    console.log('预置模型配置：')
    console.log('- OpenAI GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo')
    console.log('- Anthropic Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku')
    console.log('- Google Gemini Pro, Gemini Pro Vision')
    console.log('- Azure GPT-4, Ollama Llama 2')
    console.log('')
    console.log('默认模型已设置为: Claude 3.5 Sonnet')
    console.log('')
    console.log('🎯 请在管理员后台配置相应的API密钥以启用模型')
    
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      console.log('')
      console.log('解决方案：')
      console.log('1. 确保MySQL服务正在运行')
      console.log('2. 检查数据库连接信息是否正确')
      console.log('3. 确保数据库已创建')
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('')
      console.log('解决方案：')
      console.log('1. 检查数据库用户名和密码')
      console.log('2. 确保用户有足够的权限')
    }
    
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

// 检查环境变量
function checkEnvironmentVariables() {
  const requiredVars = ['SEO_DB_HOST', 'SEO_DB_USER', 'SEO_DB_PASSWORD', 'SEO_DB_NAME']
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.log('⚠️  警告: 以下环境变量未设置，将使用默认值:')
    missingVars.forEach(varName => {
      const defaultValue = {
        'SEO_DB_HOST': 'localhost',
        'SEO_DB_USER': 'root', 
        'SEO_DB_PASSWORD': '(空)',
        'SEO_DB_NAME': 'aiverse_seo'
      }[varName]
      console.log(`  ${varName}: ${defaultValue}`)
    })
    console.log('')
  }
}

// 主函数
async function main() {
  console.log('🚀 正在初始化AIverse大模型配置数据库...')
  console.log('')
  
  // 检查环境变量
  checkEnvironmentVariables()
  
  // 初始化数据库
  await initializeLLMConfigDatabase()
}

// 如果直接运行此脚本
if (require.main === module) {
  main()
}

module.exports = { initializeLLMConfigDatabase }