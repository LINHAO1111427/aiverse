import { NextRequest, NextResponse } from 'next/server'
import { llmConfigManager } from '@/lib/llm-config'
import { getAdminSessionFromRequest } from '@/lib/admin-auth'

// 获取所有大模型配置
export async function GET(request: NextRequest) {
  try {
    // 验证管理员权限
    const session = getAdminSessionFromRequest(request)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    // 测试数据库连接
    const isConnected = await llmConfigManager.testConnection()
    if (!isConnected) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'
    const withStats = searchParams.get('stats') === 'true'

    // 获取模型配置
    const configs = await llmConfigManager.getAllConfigs(activeOnly)
    
    let response: any = {
      configs,
      total: configs.length,
      lastUpdated: new Date().toISOString()
    }

    // 如果需要统计信息
    if (withStats) {
      const stats = await llmConfigManager.getUsageStats(30)
      response.stats = stats
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error fetching LLM configs:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

// 创建新的大模型配置
export async function POST(request: NextRequest) {
  try {
    // 验证管理员权限
    const session = getAdminSessionFromRequest(request)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      provider,
      model_name,
      model_id,
      display_name,
      description,
      api_endpoint,
      api_key,
      api_version,
      max_tokens = 4096,
      temperature = 0.7,
      top_p = 1.0,
      frequency_penalty = 0.0,
      presence_penalty = 0.0,
      supports_streaming = true,
      supports_function_calling = false,
      supports_vision = false,
      supports_code_generation = true,
      cost_per_1k_input_tokens,
      cost_per_1k_output_tokens,
      rate_limit_rpm,
      rate_limit_tpm,
      is_enabled = true,
      is_default = false,
      priority = 0
    } = body

    // 验证必需字段
    if (!provider || !model_name || !model_id || !display_name) {
      return NextResponse.json(
        { error: 'Missing required fields: provider, model_name, model_id, display_name' },
        { status: 400 }
      )
    }

    // 检查是否已存在相同的provider和model_id
    const existingConfig = await llmConfigManager.getConfigByModel(provider, model_id)
    if (existingConfig) {
      return NextResponse.json(
        { error: 'Configuration with this provider and model_id already exists' },
        { status: 409 }
      )
    }

    // 创建配置
    const configId = await llmConfigManager.createConfig({
      provider,
      model_name,
      model_id,
      display_name,
      description,
      api_endpoint,
      api_key_encrypted: api_key,
      api_version,
      max_tokens,
      temperature,
      top_p,
      frequency_penalty,
      presence_penalty,
      supports_streaming,
      supports_function_calling,
      supports_vision,
      supports_code_generation,
      cost_per_1k_input_tokens,
      cost_per_1k_output_tokens,
      rate_limit_rpm,
      rate_limit_tpm,
      is_enabled,
      is_default,
      priority,
      total_requests: 0,
      total_tokens_used: 0,
      total_cost: 0,
      last_used_at: null
    })

    // 如果设置为默认模型，确保其他模型不是默认的
    if (is_default) {
      await llmConfigManager.setDefaultModel(configId)
    }

    return NextResponse.json({
      success: true,
      configId,
      message: 'LLM configuration created successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error creating LLM config:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create LLM configuration',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

// 更新大模型配置
export async function PUT(request: NextRequest) {
  try {
    // 验证管理员权限
    const session = getAdminSessionFromRequest(request)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Configuration ID is required' },
        { status: 400 }
      )
    }

    // 检查配置是否存在
    const existingConfig = await llmConfigManager.getConfigById(id)
    if (!existingConfig) {
      return NextResponse.json(
        { error: 'Configuration not found' },
        { status: 404 }
      )
    }

    // 更新配置
    const success = await llmConfigManager.updateConfig(id, updateData)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update configuration' },
        { status: 500 }
      )
    }

    // 如果设置为默认模型
    if (updateData.is_default === true) {
      await llmConfigManager.setDefaultModel(id)
    }

    return NextResponse.json({
      success: true,
      message: 'LLM configuration updated successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error updating LLM config:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update LLM configuration',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

// 删除大模型配置
export async function DELETE(request: NextRequest) {
  try {
    // 验证管理员权限
    const session = getAdminSessionFromRequest(request)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Configuration ID is required' },
        { status: 400 }
      )
    }

    // 检查是否为默认配置
    const config = await llmConfigManager.getConfigById(parseInt(id))
    if (!config) {
      return NextResponse.json(
        { error: 'Configuration not found' },
        { status: 404 }
      )
    }

    if (config.is_default) {
      return NextResponse.json(
        { error: 'Cannot delete the default configuration. Please set another model as default first.' },
        { status: 400 }
      )
    }

    // 删除配置
    const success = await llmConfigManager.deleteConfig(parseInt(id))
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete configuration' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'LLM configuration deleted successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error deleting LLM config:', error)
    return NextResponse.json(
      { 
        error: 'Failed to delete LLM configuration',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}