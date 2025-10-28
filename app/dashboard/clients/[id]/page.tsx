'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Client } from '@/lib/types/client'

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

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

  const tabs = [
    { id: 'overview', name: '概览', icon: '📊' },
    { id: 'microsite', name: '微站', icon: '🌐' },
    { id: 'icp', name: 'ICP 画像', icon: '👥' },
    { id: 'competitors', name: '竞品分析', icon: '🎯' },
    { id: 'knowledge', name: '知识库', icon: '📚' },
    { id: 'reports', name: '报告', icon: '📈' },
    { id: 'content', name: '内容', icon: '🎨' },
    { id: 'social', name: '社媒', icon: '💬' },
    { id: 'monitoring', name: '监控', icon: '📡' },
    { id: 'settings', name: '设置', icon: '⚙️' },
  ]

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
            返回客户列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <Link href="/dashboard/clients" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
                ← 返回列表
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{client.company_name}</h1>
              <p className="mt-2 text-gray-600">{client.english_name || client.industry}</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                编辑
              </button>
              <button
                onClick={() => router.push(`/dashboard/clients/${client.id}/microsite`)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                查看微站
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                    ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">基本信息</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">公司名称</dt>
                      <dd className="text-sm font-medium">{client.company_name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">行业</dt>
                      <dd className="text-sm font-medium">{client.industry}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">邮箱</dt>
                      <dd className="text-sm font-medium">{client.contact_email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">电话</dt>
                      <dd className="text-sm font-medium">{client.contact_phone || '-'}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">服务信息</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">服务包</dt>
                      <dd className="text-sm font-medium">{client.service_package}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">状态</dt>
                      <dd className="text-sm font-medium">{client.relationship_status}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">入网时间</dt>
                      <dd className="text-sm font-medium">
                        {client.onboarding_date || '-'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === 'microsite' && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">微站展示</h3>
                <p className="text-gray-600 mb-6">
                  为客户创建的独立展示页面，包含产品信息、认证资质等
                </p>
                <button
                  onClick={() => router.push(`/dashboard/clients/${client.id}/microsite`)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  查看微站
                </button>
              </div>
            )}

            {activeTab === 'icp' && <ICPContent clientId={client.id} />}
            {activeTab === 'competitors' && <CompetitorsContent clientId={client.id} />}
            {activeTab === 'knowledge' && <KnowledgeContent clientId={client.id} />}
            {activeTab === 'reports' && <ReportsContent clientId={client.id} />}
            {activeTab === 'content' && <ContentContent clientId={client.id} />}
            {activeTab === 'social' && <SocialContent clientId={client.id} />}
            {activeTab === 'monitoring' && <MonitoringContent clientId={client.id} />}
            {activeTab === 'settings' && <SettingsContent client={client} />}
          </div>
        </div>
      </div>
    </div>
  )
}

// Placeholder components
function ICPContent({ clientId }: { clientId: string }) {
  return <div className="text-center py-12 text-gray-600">ICP 画像功能开发中...</div>
}

function CompetitorsContent({ clientId }: { clientId: string }) {
  return <div className="text-center py-12 text-gray-600">竞品分析功能开发中...</div>
}

function KnowledgeContent({ clientId }: { clientId: string }) {
  return <div className="text-center py-12 text-gray-600">知识库功能开发中...</div>
}

function ReportsContent({ clientId }: { clientId: string }) {
  return <div className="text-center py-12 text-gray-600">报告功能开发中...</div>
}

function ContentContent({ clientId }: { clientId: string }) {
  return <div className="text-center py-12 text-gray-600">内容管理功能开发中...</div>
}

function SocialContent({ clientId }: { clientId: string }) {
  return <div className="text-center py-12 text-gray-600">社媒运营功能开发中...</div>
}

function MonitoringContent({ clientId }: { clientId: string }) {
  return <div className="text-center py-12 text-gray-600">数据监控功能开发中...</div>
}

function SettingsContent({ client }: { client: Client }) {
  return <div className="text-center py-12 text-gray-600">设置功能开发中...</div>
}

