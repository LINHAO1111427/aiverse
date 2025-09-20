import { NextRequest, NextResponse } from 'next/server'
import { llmConfigManager } from '@/lib/llm-config'
import { getAdminSessionFromRequest } from '@/lib/admin-auth'

// 测试大模型连接
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
    const { configId, testConfig } = body

    let config
    if (configId) {
      // 测试现有配置
      config = await llmConfigManager.getConfigById(configId)
      if (!config) {
        return NextResponse.json(
          { error: 'Configuration not found' },
          { status: 404 }
        )
      }
    } else if (testConfig) {
      // 测试临时配置
      config = testConfig
    } else {
      return NextResponse.json(
        { error: 'Either configId or testConfig is required' },
        { status: 400 }
      )
    }

    // 执行连接测试
    const testResult = await llmConfigManager.testModelConnection(config)

    return NextResponse.json({
      success: testResult.success,
      message: testResult.message,
      responseTime: testResult.responseTime,
      provider: config.provider,
      modelId: config.model_id,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error testing LLM connection:', error)
    return NextResponse.json(
      { 
        error: 'Failed to test connection',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}