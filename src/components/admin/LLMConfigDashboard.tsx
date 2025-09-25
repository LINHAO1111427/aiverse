'use client'

import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  TestTube, 
  Settings, 
  Zap, 
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Star,
  TrendingUp,
  BarChart3
} from 'lucide-react'

interface LLMConfig {
  id: number
  provider: string
  model_name: string
  model_id: string
  display_name: string
  description: string | null
  api_endpoint: string | null
  api_key_encrypted: string | null
  api_key_decrypted?: string
  api_version: string | null
  max_tokens: number
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  supports_streaming: boolean
  supports_function_calling: boolean
  supports_vision: boolean
  supports_code_generation: boolean
  cost_per_1k_input_tokens: number | null
  cost_per_1k_output_tokens: number | null
  rate_limit_rpm: number | null
  rate_limit_tpm: number | null
  is_enabled: boolean
  is_default: boolean
  priority: number
  total_requests: number
  total_tokens_used: number
  total_cost: number
  last_used_at: string | null
  created_at: string
  updated_at: string
}

interface LLMUsageStats {
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
  last_used: string | null
}

interface LLMStatsData {
  stats: LLMUsageStats[]
  totalStats: {
    totalRequests: number
    totalTokens: number
    totalCost: number
    avgResponseTime: number
    activeModels: number
    mostUsedModel: LLMUsageStats | null
  }
  trendData: Array<{
    date: string
    requests: number
    tokens: number
    cost: number
    errors: number
  }>
  costBreakdown: Array<{
    provider: string
    modelName: string
    cost: number
    percentage: number
  }>
}

export default function LLMConfigDashboard() {
  const [configs, setConfigs] = useState<LLMConfig[]>([])
  const [statsData, setStatsData] = useState<LLMStatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('configs')
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [editingConfig, setEditingConfig] = useState<LLMConfig | null>(null)
  const [testingConfig, setTestingConfig] = useState<number | null>(null)
  const [showApiKeys, setShowApiKeys] = useState<Set<number>>(new Set())

  // 表单状态
  const [formData, setFormData] = useState({
    provider: 'openai',
    model_name: '',
    model_id: '',
    display_name: '',
    description: '',
    api_endpoint: '',
    api_key: '',
    api_version: '',
    max_tokens: 4096,
    temperature: 0.7,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    supports_streaming: true,
    supports_function_calling: false,
    supports_vision: false,
    supports_code_generation: true,
    cost_per_1k_input_tokens: 0,
    cost_per_1k_output_tokens: 0,
    rate_limit_rpm: 1000,
    rate_limit_tpm: 1000000,
    is_enabled: true,
    is_default: false,
    priority: 0
  })

  useEffect(() => {
    loadConfigs()
    loadStats()
  }, [])

  const loadConfigs = async () => {
    try {
      const response = await fetch('/api/admin/llm-configs?stats=true', {
        credentials: 'include'
      })
      const data = await response.json()
      
      if (response.ok) {
        setConfigs(data.configs)
      } else {
        console.error('Failed to load configs:', data.error)
      }
    } catch (error) {
      console.error('Error loading configs:', error)
    }
  }

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/llm-stats?days=30', {
        credentials: 'include'
      })
      const data = await response.json()
      
      if (response.ok) {
        setStatsData(data)
      } else {
        console.error('Failed to load stats:', data.error)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveConfig = async () => {
    try {
      const url = editingConfig 
        ? '/api/admin/llm-configs'
        : '/api/admin/llm-configs'
      
      const method = editingConfig ? 'PUT' : 'POST'
      const payload = editingConfig 
        ? { id: editingConfig.id, ...formData }
        : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })

      const result = await response.json()
      
      if (response.ok) {
        setShowConfigModal(false)
        setEditingConfig(null)
        resetForm()
        await loadConfigs()
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Error saving config:', error)
      alert('Error saving configuration')
    }
  }

  const handleDeleteConfig = async (id: number) => {
    if (!confirm('Are you sure you want to delete this configuration?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/llm-configs?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      const result = await response.json()
      
      if (response.ok) {
        await loadConfigs()
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Error deleting config:', error)
      alert('Error deleting configuration')
    }
  }

  const handleTestConnection = async (config: LLMConfig) => {
    setTestingConfig(config.id)
    
    try {
      const response = await fetch('/api/admin/llm-configs/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ configId: config.id })
      })

      const result = await response.json()
      
      if (result.success) {
        alert(`Connection successful! Response time: ${result.responseTime}ms`)
      } else {
        alert(`Connection failed: ${result.message}`)
      }
    } catch (error) {
      console.error('Error testing connection:', error)
      alert('Error testing connection')
    } finally {
      setTestingConfig(null)
    }
  }

  const handleSetDefault = async (id: number) => {
    try {
      const response = await fetch('/api/admin/llm-configs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id, is_default: true })
      })

      if (response.ok) {
        await loadConfigs()
      }
    } catch (error) {
      console.error('Error setting default:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      provider: 'openai',
      model_name: '',
      model_id: '',
      display_name: '',
      description: '',
      api_endpoint: '',
      api_key: '',
      api_version: '',
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      supports_streaming: true,
      supports_function_calling: false,
      supports_vision: false,
      supports_code_generation: true,
      cost_per_1k_input_tokens: 0,
      cost_per_1k_output_tokens: 0,
      rate_limit_rpm: 1000,
      rate_limit_tpm: 1000000,
      is_enabled: true,
      is_default: false,
      priority: 0
    })
  }

  const handleEditConfig = (config: LLMConfig) => {
    setEditingConfig(config)
    setFormData({
      provider: config.provider,
      model_name: config.model_name,
      model_id: config.model_id,
      display_name: config.display_name,
      description: config.description || '',
      api_endpoint: config.api_endpoint || '',
      api_key: config.api_key_decrypted || '',
      api_version: config.api_version || '',
      max_tokens: config.max_tokens,
      temperature: config.temperature,
      top_p: config.top_p,
      frequency_penalty: config.frequency_penalty,
      presence_penalty: config.presence_penalty,
      supports_streaming: config.supports_streaming,
      supports_function_calling: config.supports_function_calling,
      supports_vision: config.supports_vision,
      supports_code_generation: config.supports_code_generation,
      cost_per_1k_input_tokens: config.cost_per_1k_input_tokens || 0,
      cost_per_1k_output_tokens: config.cost_per_1k_output_tokens || 0,
      rate_limit_rpm: config.rate_limit_rpm || 1000,
      rate_limit_tpm: config.rate_limit_tpm || 1000000,
      is_enabled: config.is_enabled,
      is_default: config.is_default,
      priority: config.priority
    })
    setShowConfigModal(true)
  }

  const toggleApiKeyVisibility = (configId: number) => {
    const newShowApiKeys = new Set(showApiKeys)
    if (newShowApiKeys.has(configId)) {
      newShowApiKeys.delete(configId)
    } else {
      newShowApiKeys.add(configId)
    }
    setShowApiKeys(newShowApiKeys)
  }

  const getProviderColor = (provider: string) => {
    const colors: { [key: string]: string } = {
      openai: 'bg-green-100 text-green-800',
      anthropic: 'bg-orange-100 text-orange-800',
      google: 'bg-blue-100 text-blue-800',
      azure: 'bg-indigo-100 text-indigo-800',
      ollama: 'bg-purple-100 text-purple-800'
    }
    return colors[provider] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">大模型配置管理</h2>
          <p className="text-gray-600">管理和配置AI大模型接入</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setEditingConfig(null)
            setShowConfigModal(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>添加模型</span>
        </button>
      </div>

      {/* 统计概览 */}
      {statsData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总请求数</p>
                <p className="text-2xl font-bold">{statsData.totalStats.totalRequests.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总Token数</p>
                <p className="text-2xl font-bold">{(statsData.totalStats.totalTokens / 1000000).toFixed(1)}M</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总成本</p>
                <p className="text-2xl font-bold">${statsData.totalStats.totalCost.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">活跃模型</p>
                <p className="text-2xl font-bold">{statsData.totalStats.activeModels}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      )}

      {/* 标签页 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('configs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'configs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            模型配置
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'stats'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            使用统计
          </button>
        </nav>
      </div>

      {/* 配置列表 */}
      {activeTab === 'configs' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    模型信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配置状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    使用统计
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    成本设置
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {configs.map((config) => (
                  <tr key={config.id} className={config.is_default ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-medium text-gray-900">
                              {config.display_name}
                            </div>
                            {config.is_default && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {config.model_id}
                          </div>
                          <div className="mt-1">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${getProviderColor(config.provider)}`}>
                              {config.provider}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {config.is_enabled ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm ${config.is_enabled ? 'text-green-600' : 'text-red-600'}`}>
                            {config.is_enabled ? '已启用' : '已禁用'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          最大Tokens: {config.max_tokens.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          温度: {config.temperature}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          {config.total_requests.toLocaleString()} 请求
                        </div>
                        <div className="text-sm text-gray-500">
                          {(config.total_tokens_used / 1000).toFixed(1)}K tokens
                        </div>
                        <div className="text-sm text-gray-500">
                          成本: ${config.total_cost.toFixed(4)}
                        </div>
                        {config.last_used_at && (
                          <div className="text-xs text-gray-400">
                            最后使用: {new Date(config.last_used_at).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {config.cost_per_1k_input_tokens !== null && (
                          <div className="text-xs text-gray-600">
                            输入: ${config.cost_per_1k_input_tokens}/1K
                          </div>
                        )}
                        {config.cost_per_1k_output_tokens !== null && (
                          <div className="text-xs text-gray-600">
                            输出: ${config.cost_per_1k_output_tokens}/1K
                          </div>
                        )}
                        {config.rate_limit_rpm && (
                          <div className="text-xs text-gray-500">
                            限制: {config.rate_limit_rpm}/分钟
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleTestConnection(config)}
                          disabled={testingConfig === config.id}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                          title="测试连接"
                        >
                          <TestTube className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleEditConfig(config)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="编辑配置"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        
                        {!config.is_default && (
                          <button
                            onClick={() => handleSetDefault(config.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="设为默认"
                          >
                            <Star className="h-4 w-4" />
                          </button>
                        )}
                        
                        {!config.is_default && (
                          <button
                            onClick={() => handleDeleteConfig(config.id)}
                            className="text-red-600 hover:text-red-900"
                            title="删除配置"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 使用统计 */}
      {activeTab === 'stats' && statsData && (
        <div className="space-y-6">
          {/* 成本分布 */}
          {statsData.costBreakdown.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">成本分布</h3>
              <div className="space-y-3">
                {statsData.costBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getProviderColor(item.provider)}`}></div>
                      <span className="text-sm text-gray-900">{item.modelName}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{item.percentage.toFixed(1)}%</span>
                      <span className="text-sm font-medium text-gray-900">${item.cost.toFixed(4)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 使用趋势 */}
          {statsData.trendData.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">使用趋势 (最近30天)</h3>
              <div className="space-y-2">
                {statsData.trendData.slice(-7).map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{item.date}</span>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-blue-600">{item.requests} 请求</span>
                      <span className="text-yellow-600">{(item.tokens / 1000).toFixed(1)}K tokens</span>
                      <span className="text-green-600">${item.cost.toFixed(4)}</span>
                      {item.errors > 0 && (
                        <span className="text-red-600">{item.errors} 错误</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 配置模态框 */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingConfig ? '编辑模型配置' : '添加模型配置'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 基础信息 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  提供商
                </label>
                <select
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="google">Google</option>
                  <option value="azure">Azure</option>
                  <option value="ollama">Ollama</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模型名称
                </label>
                <input
                  type="text"
                  value={formData.model_name}
                  onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="GPT-4o"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  模型ID
                </label>
                <input
                  type="text"
                  value={formData.model_id}
                  onChange={(e) => setFormData({ ...formData, model_id: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="gpt-4o"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  显示名称
                </label>
                <input
                  type="text"
                  value={formData.display_name}
                  onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="GPT-4o (最新模型)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={formData.api_key}
                  onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="sk-..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最大Tokens
                </label>
                <input
                  type="number"
                  value={formData.max_tokens}
                  onChange={(e) => setFormData({ ...formData, max_tokens: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  温度
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  输入成本 ($/1K tokens)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={formData.cost_per_1k_input_tokens}
                  onChange={(e) => setFormData({ ...formData, cost_per_1k_input_tokens: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  输出成本 ($/1K tokens)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={formData.cost_per_1k_output_tokens}
                  onChange={(e) => setFormData({ ...formData, cost_per_1k_output_tokens: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  优先级
                </label>
                <input
                  type="number"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              {/* 功能开关 */}
              <div className="md:col-span-2 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_enabled}
                    onChange={(e) => setFormData({ ...formData, is_enabled: e.target.checked })}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">启用此模型</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_default}
                    onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">设为默认模型</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.supports_streaming}
                    onChange={(e) => setFormData({ ...formData, supports_streaming: e.target.checked })}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">支持流式输出</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.supports_function_calling}
                    onChange={(e) => setFormData({ ...formData, supports_function_calling: e.target.checked })}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">支持函数调用</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.supports_vision}
                    onChange={(e) => setFormData({ ...formData, supports_vision: e.target.checked })}
                    className="rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">支持视觉理解</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowConfigModal(false)
                  setEditingConfig(null)
                  resetForm()
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                取消
              </button>
              <button
                onClick={handleSaveConfig}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {editingConfig ? '更新' : '创建'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}