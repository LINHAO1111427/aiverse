import mysql from 'mysql2/promise'
import crypto from 'crypto'

// 大模型配置数据库连接
const llmDbConfig = {
  host: process.env.LLM_DB_HOST || process.env.SEO_DB_HOST || 'localhost',
  port: parseInt(process.env.LLM_DB_PORT || process.env.SEO_DB_PORT || '3306'),
  user: process.env.LLM_DB_USER || process.env.SEO_DB_USER || 'root',
  password: process.env.LLM_DB_PASSWORD || process.env.SEO_DB_PASSWORD || '',
  database: process.env.LLM_DB_NAME || process.env.SEO_DB_NAME || 'aiverse_seo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  charset: 'utf8mb4'
}

let llmDbPool: mysql.Pool | null = null

export function getLLMDatabase(): mysql.Pool {
  if (!llmDbPool) {
    llmDbPool = mysql.createPool(llmDbConfig)
  }
  return llmDbPool
}

// 数据接口定义
export interface LLMConfig {
  id?: number
  provider: string
  model_name: string
  model_id: string
  display_name: string
  description: string | null
  
  // API配置
  api_endpoint: string | null
  api_key_encrypted: string | null
  api_key_decrypted?: string | null
  api_version: string | null
  
  // 模型参数
  max_tokens: number
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  
  // 模型能力
  supports_streaming: boolean
  supports_function_calling: boolean
  supports_vision: boolean
  supports_code_generation: boolean
  
  // 成本和限制
  cost_per_1k_input_tokens: number | null
  cost_per_1k_output_tokens: number | null
  rate_limit_rpm: number | null
  rate_limit_tpm: number | null
  
  // 状态和设置
  is_enabled: boolean
  is_default: boolean
  priority: number
  
  // 使用统计
  total_requests: number
  total_tokens_used: number
  total_cost: number
  last_used_at: Date | null
  
  // 时间戳
  created_at?: Date
  updated_at?: Date
}

export interface LLMUsageLog {
  id?: number
  config_id: number
  request_type: string
  user_id: string | null
  session_id: string | null
  input_tokens: number
  output_tokens: number
  total_tokens: number
  cost: number
  response_time_ms: number | null
  success: boolean
  error_message: string | null
  temperature: number | null
  max_tokens: number | null
  created_at?: Date
}

export interface LLMUsageStats {
  id: number
  provider: string
  model_name: string
  display_name: string
  request_count: number
  total_input_tokens: number
  total_output_tokens: number
  total_tokens: number
  total_cost: number
  avg_response_time: number | null
  last_used: Date | null
}

// 加密和解密工具
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'aiverse-default-key-change-in-production-32'
const ALGORITHM = 'aes-256-cbc'

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return iv.toString('hex') + ':' + encrypted
}

function decrypt(encryptedText: string): string {
  try {
    const parts = encryptedText.split(':')
    const iv = Buffer.from(parts[0], 'hex')
    const encrypted = parts[1]
    const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (error) {
    console.error('Decryption error:', error)
    return ''
  }
}

// 大模型配置管理类
export class LLMConfigManager {
  private db: mysql.Pool

  constructor() {
    this.db = getLLMDatabase()
  }

  // 测试数据库连接
  async testConnection(): Promise<boolean> {
    try {
      await this.db.execute('SELECT 1')
      return true
    } catch (error) {
      console.error('LLM Config DB connection failed:', error)
      return false
    }
  }

  // 获取所有模型配置
  async getAllConfigs(activeOnly: boolean = false): Promise<LLMConfig[]> {
    const query = activeOnly 
      ? 'SELECT * FROM active_llm_configs'
      : 'SELECT * FROM llm_configs ORDER BY priority DESC, model_name'
    
    const [rows] = await this.db.execute(query)
    const configs = rows as LLMConfig[]
    
    // 解密API密钥
    return configs.map(config => ({
      ...config,
      api_key_decrypted: config.api_key_encrypted ? decrypt(config.api_key_encrypted) : null
    } as LLMConfig))
  }

  // 根据ID获取单个配置
  async getConfigById(id: number): Promise<LLMConfig | null> {
    const query = 'SELECT * FROM llm_configs WHERE id = ?'
    const [rows] = await this.db.execute(query, [id])
    const configs = rows as LLMConfig[]
    
    if (configs.length === 0) return null
    
    const config = configs[0]
    return {
      ...config,
      api_key_decrypted: config.api_key_encrypted ? decrypt(config.api_key_encrypted) : null
    } as LLMConfig
  }

  // 根据provider和model_id获取配置
  async getConfigByModel(provider: string, modelId: string): Promise<LLMConfig | null> {
    const query = 'SELECT * FROM llm_configs WHERE provider = ? AND model_id = ? AND is_enabled = TRUE'
    const [rows] = await this.db.execute(query, [provider, modelId])
    const configs = rows as LLMConfig[]
    
    if (configs.length === 0) return null
    
    const config = configs[0]
    return {
      ...config,
      api_key_decrypted: config.api_key_encrypted ? decrypt(config.api_key_encrypted) : null
    } as LLMConfig
  }

  // 获取默认模型配置
  async getDefaultConfig(): Promise<LLMConfig | null> {
    const query = 'SELECT * FROM llm_configs WHERE is_default = TRUE AND is_enabled = TRUE LIMIT 1'
    const [rows] = await this.db.execute(query)
    const configs = rows as LLMConfig[]
    
    if (configs.length === 0) return null
    
    const config = configs[0]
    return {
      ...config,
      api_key_decrypted: config.api_key_encrypted ? decrypt(config.api_key_encrypted) : null
    } as LLMConfig
  }

  // 创建新的模型配置
  async createConfig(data: Omit<LLMConfig, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const apiKeyEncrypted = data.api_key_encrypted ? encrypt(data.api_key_encrypted) : null
    
    const query = `
      INSERT INTO llm_configs (
        provider, model_name, model_id, display_name, description,
        api_endpoint, api_key_encrypted, api_version,
        max_tokens, temperature, top_p, frequency_penalty, presence_penalty,
        supports_streaming, supports_function_calling, supports_vision, supports_code_generation,
        cost_per_1k_input_tokens, cost_per_1k_output_tokens,
        rate_limit_rpm, rate_limit_tpm,
        is_enabled, is_default, priority
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    const [result] = await this.db.execute(query, [
      data.provider, data.model_name, data.model_id, data.display_name, data.description,
      data.api_endpoint, apiKeyEncrypted, data.api_version,
      data.max_tokens, data.temperature, data.top_p, data.frequency_penalty, data.presence_penalty,
      data.supports_streaming, data.supports_function_calling, data.supports_vision, data.supports_code_generation,
      data.cost_per_1k_input_tokens, data.cost_per_1k_output_tokens,
      data.rate_limit_rpm, data.rate_limit_tpm,
      data.is_enabled, data.is_default, data.priority
    ])
    
    return (result as mysql.ResultSetHeader).insertId
  }

  // 更新模型配置
  async updateConfig(id: number, data: Partial<LLMConfig>): Promise<boolean> {
    const fields = []
    const values = []
    
    // 构建动态更新字段
    for (const [key, value] of Object.entries(data)) {
      if (key === 'id' || key === 'created_at') continue
      
      if (key === 'api_key_encrypted' && value) {
        fields.push('api_key_encrypted = ?')
        values.push(encrypt(value as string))
      } else {
        fields.push(`${key} = ?`)
        values.push(value)
      }
    }
    
    if (fields.length === 0) return false
    
    values.push(id)
    const query = `UPDATE llm_configs SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
    
    const [result] = await this.db.execute(query, values)
    return (result as mysql.ResultSetHeader).affectedRows > 0
  }

  // 删除模型配置
  async deleteConfig(id: number): Promise<boolean> {
    const query = 'DELETE FROM llm_configs WHERE id = ?'
    const [result] = await this.db.execute(query, [id])
    return (result as mysql.ResultSetHeader).affectedRows > 0
  }

  // 设置默认模型
  async setDefaultModel(id: number): Promise<boolean> {
    await this.db.beginTransaction()
    
    try {
      // 清除所有默认设置
      await this.db.execute('UPDATE llm_configs SET is_default = FALSE')
      
      // 设置新的默认模型
      const [result] = await this.db.execute(
        'UPDATE llm_configs SET is_default = TRUE WHERE id = ? AND is_enabled = TRUE',
        [id]
      )
      
      await this.db.commit()
      return (result as mysql.ResultSetHeader).affectedRows > 0
    } catch (error) {
      await this.db.rollback()
      throw error
    }
  }

  // 记录使用日志
  async logUsage(data: Omit<LLMUsageLog, 'id' | 'created_at'>): Promise<number> {
    const query = `
      INSERT INTO llm_usage_logs (
        config_id, request_type, user_id, session_id,
        input_tokens, output_tokens, total_tokens, cost,
        response_time_ms, success, error_message,
        temperature, max_tokens
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    const [result] = await this.db.execute(query, [
      data.config_id, data.request_type, data.user_id, data.session_id,
      data.input_tokens, data.output_tokens, data.total_tokens, data.cost,
      data.response_time_ms, data.success, data.error_message,
      data.temperature, data.max_tokens
    ])
    
    // 更新总使用统计
    await this.db.execute(`
      UPDATE llm_configs SET 
        total_requests = total_requests + 1,
        total_tokens_used = total_tokens_used + ?,
        total_cost = total_cost + ?,
        last_used_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [data.total_tokens, data.cost, data.config_id])
    
    return (result as mysql.ResultSetHeader).insertId
  }

  // 获取使用统计
  async getUsageStats(days: number = 30): Promise<LLMUsageStats[]> {
    const query = `
      SELECT * FROM llm_usage_stats
      WHERE last_used >= DATE_SUB(NOW(), INTERVAL ? DAY)
      ORDER BY total_cost DESC
    `
    
    const [rows] = await this.db.execute(query, [days])
    return rows as LLMUsageStats[]
  }

  // 获取使用日志
  async getUsageLogs(configId?: number, limit: number = 100): Promise<LLMUsageLog[]> {
    const query = configId 
      ? 'SELECT * FROM llm_usage_logs WHERE config_id = ? ORDER BY created_at DESC LIMIT ?'
      : 'SELECT * FROM llm_usage_logs ORDER BY created_at DESC LIMIT ?'
    
    const params = configId ? [configId, limit] : [limit]
    const [rows] = await this.db.execute(query, params)
    return rows as LLMUsageLog[]
  }

  // 测试模型连接
  async testModelConnection(config: LLMConfig): Promise<{ success: boolean; message: string; responseTime?: number }> {
    const startTime = Date.now()
    
    try {
      // 根据不同的provider实现连接测试
      switch (config.provider) {
        case 'openai':
          return await this.testOpenAIConnection(config)
        case 'anthropic':
          return await this.testAnthropicConnection(config)
        case 'google':
          return await this.testGoogleConnection(config)
        default:
          return { success: false, message: `Unsupported provider: ${config.provider}` }
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      return { 
        success: false, 
        message: `Connection failed: ${(error as Error).message}`,
        responseTime 
      }
    }
  }

  private async testOpenAIConnection(config: LLMConfig): Promise<{ success: boolean; message: string; responseTime?: number }> {
    const startTime = Date.now()
    const apiKey = config.api_key_encrypted ? decrypt(config.api_key_encrypted) : ''
    
    if (!apiKey) {
      return { success: false, message: 'API key is required for OpenAI' }
    }

    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      const responseTime = Date.now() - startTime
      
      if (response.ok) {
        return { success: true, message: 'Connection successful', responseTime }
      } else {
        const error = await response.text()
        return { success: false, message: `API error: ${error}`, responseTime }
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      return { success: false, message: `Network error: ${(error as Error).message}`, responseTime }
    }
  }

  private async testAnthropicConnection(config: LLMConfig): Promise<{ success: boolean; message: string; responseTime?: number }> {
    const startTime = Date.now()
    const apiKey = config.api_key_encrypted ? decrypt(config.api_key_encrypted) : ''
    
    if (!apiKey) {
      return { success: false, message: 'API key is required for Anthropic' }
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'content-type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: config.model_id,
          max_tokens: 10,
          messages: [
            { role: 'user', content: 'Test connection' }
          ]
        })
      })

      const responseTime = Date.now() - startTime
      
      if (response.ok) {
        return { success: true, message: 'Connection successful', responseTime }
      } else {
        const error = await response.text()
        return { success: false, message: `API error: ${error}`, responseTime }
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      return { success: false, message: `Network error: ${(error as Error).message}`, responseTime }
    }
  }

  private async testGoogleConnection(config: LLMConfig): Promise<{ success: boolean; message: string; responseTime?: number }> {
    const startTime = Date.now()
    const apiKey = config.api_key_encrypted ? decrypt(config.api_key_encrypted) : ''
    
    if (!apiKey) {
      return { success: false, message: 'API key is required for Google' }
    }

    // Google Gemini API测试
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${config.model_id}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Test connection'
            }]
          }]
        })
      })

      const responseTime = Date.now() - startTime
      
      if (response.ok) {
        return { success: true, message: 'Connection successful', responseTime }
      } else {
        const error = await response.text()
        return { success: false, message: `API error: ${error}`, responseTime }
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      return { success: false, message: `Network error: ${(error as Error).message}`, responseTime }
    }
  }
}

// 导出单例实例
export const llmConfigManager = new LLMConfigManager()