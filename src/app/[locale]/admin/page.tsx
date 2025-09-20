'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLogin from '@/components/admin/AdminLogin'
import SEOMonitoringDashboard from '@/components/admin/SEOMonitoringDashboard'
import { ToolMonitoringDashboard } from '@/components/admin/ToolMonitoringDashboard'
import LLMConfigDashboard from '@/components/admin/LLMConfigDashboard'
import { Shield, LogOut, BarChart3, Users, Settings, Database, Wrench, Brain } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function AdminPage({ params }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('seo')
  const router = useRouter()

  // 检查管理员登录状态
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/check', {
        credentials: 'include'
      })
      
      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', {
        method: 'DELETE',
        credentials: 'include'
      })
      setIsAuthenticated(false)
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  const tabs = [
    { id: 'seo', name: 'SEO监控', icon: BarChart3 },
    { id: 'tools', name: '工具监控', icon: Wrench },
    { id: 'llm', name: '大模型配置', icon: Brain },
    { id: 'users', name: '用户管理', icon: Users },
    { id: 'database', name: '数据管理', icon: Database },
    { id: 'settings', name: '系统设置', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 管理员头部导航 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-xl font-bold text-gray-900">
                  AIverse 管理后台
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                管理员已登录
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                退出登录
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 标签页导航 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'seo' && <SEOMonitoringDashboard />}
        
        {activeTab === 'tools' && <ToolMonitoringDashboard />}
        
        {activeTab === 'llm' && <LLMConfigDashboard />}
        
        {activeTab === 'users' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">用户管理</h2>
            <p className="text-gray-600">用户管理功能正在开发中...</p>
          </div>
        )}
        
        {activeTab === 'database' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">数据管理</h2>
            <p className="text-gray-600">数据管理功能正在开发中...</p>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">系统设置</h2>
            <p className="text-gray-600">系统设置功能正在开发中...</p>
          </div>
        )}
      </main>
    </div>
  )
}