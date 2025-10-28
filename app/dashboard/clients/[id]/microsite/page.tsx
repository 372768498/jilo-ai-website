'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ClientMicrositePage() {
  const params = useParams()
  const router = useRouter()
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchClient(params.id as string)
    }
  }, [params.id])

  const fetchClient = async (id: string) => {
    try {
      const response = await fetch(`/api/clients/${id}`)
      const data = await response.json()
      setClient(data.client)
    } catch (error) {
      console.error('Failed to fetch client:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">客户不存在</h2>
          <Link href="/dashboard/clients" className="text-blue-600 hover:text-blue-700">
            返回列表
          </Link>
        </div>
      </div>
    )
  }

  // 根据客户ID路由到对应的微站
  const micrositeRoutes: Record<string, string> = {
    'C001_YOYICARE': '/microsite/yoyicare',
    'C002_SHININGCRYSTAL': '/microsite/shiningcrystal',
  }

  const micrositeUrl = micrositeRoutes[client.client_id] || micrositeRoutes[client.id]

  if (micrositeUrl) {
    router.push(micrositeUrl)
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">{client.company_name} 微站</h1>
          <p className="text-gray-600 mb-6">该客户暂无微站页面</p>
          <Link
            href="/dashboard/clients"
            className="text-blue-600 hover:text-blue-700"
          >
            返回客户列表
          </Link>
        </div>
      </div>
    </div>
  )
}

