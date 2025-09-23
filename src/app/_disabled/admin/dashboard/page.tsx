"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  BarChart3, 
  Users, 
  Package, 
  Star, 
  TrendingUp, 
  Settings,
  LogOut,
  Plus,
  Eye,
  MessageSquare
} from "lucide-react"

interface DashboardStats {
  totalTools: number
  totalUsers: number
  totalRatings: number
  totalViews: number
  recentTools: Array<{
    id: number
    name: string
    createdAt: string
    status: string
  }>
  recentRatings: Array<{
    id: number
    toolName: string
    rating: number
    createdAt: string
  }>
}

// Mock data
const mockStats: DashboardStats = {
  totalTools: 156,
  totalUsers: 12543,
  totalRatings: 3421,
  totalViews: 543210,
  recentTools: [
    { id: 1, name: "ChatGPT", createdAt: "2024-01-20", status: "active" },
    { id: 2, name: "Claude", createdAt: "2024-01-19", status: "active" },
    { id: 3, name: "Midjourney", createdAt: "2024-01-18", status: "pending" },
  ],
  recentRatings: [
    { id: 1, toolName: "ChatGPT", rating: 5, createdAt: "2024-01-20" },
    { id: 2, toolName: "Claude", rating: 4, createdAt: "2024-01-19" },
    { id: 3, toolName: "Stable Diffusion", rating: 5, createdAt: "2024-01-18" },
  ],
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>(mockStats)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check admin auth
    const isAdmin = sessionStorage.getItem("isAdmin")
    if (!isAdmin) {
      router.push("/admin")
      return
    }

    // Load dashboard data
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin")
    router.push("/admin")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  const statCards = [
    { 
      title: "Total Tools", 
      value: stats.totalTools, 
      icon: Package, 
      color: "bg-blue-500",
      change: "+12%"
    },
    { 
      title: "Total Users", 
      value: stats.totalUsers.toLocaleString(), 
      icon: Users, 
      color: "bg-green-500",
      change: "+8%"
    },
    { 
      title: "Total Ratings", 
      value: stats.totalRatings.toLocaleString(), 
      icon: Star, 
      color: "bg-yellow-500",
      change: "+15%"
    },
    { 
      title: "Total Views", 
      value: stats.totalViews.toLocaleString(), 
      icon: Eye, 
      color: "bg-purple-500",
      change: "+23%"
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-gray-900">
                AIverse Admin
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to AIverse admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/tools/new"
            className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition flex items-center gap-4"
          >
            <Plus className="w-8 h-8" />
            <div>
              <h3 className="font-semibold">Add New Tool</h3>
              <p className="text-sm opacity-90">Add a new AI tool to the directory</p>
            </div>
          </Link>
          
          <Link
            href="/admin/tools"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition flex items-center gap-4"
          >
            <Settings className="w-8 h-8 text-gray-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Manage Tools</h3>
              <p className="text-sm text-gray-600">Edit or remove existing tools</p>
            </div>
          </Link>
          
          <Link
            href="/admin/reviews"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition flex items-center gap-4"
          >
            <MessageSquare className="w-8 h-8 text-gray-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Moderate Reviews</h3>
              <p className="text-sm text-gray-600">Manage user reviews and ratings</p>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tools */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tools</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats.recentTools.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{tool.name}</p>
                      <p className="text-sm text-gray-500">{tool.createdAt}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tool.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {tool.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Ratings */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Ratings</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats.recentRatings.map((rating) => (
                  <div key={rating.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{rating.toolName}</p>
                      <p className="text-sm text-gray-500">{rating.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}