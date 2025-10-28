// 工作流配置界面
// components/WorkflowConfigPanel.jsx

import React, { useState, useEffect } from 'react'

const WorkflowConfigPanel = () => {
  const [workflows, setWorkflows] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // 默认工作流配置
  const defaultWorkflows = {
    dailyReport: {
      name: '日报生成',
      enabled: true,
      schedule: '0 9 * * *',
      timezone: 'Asia/Shanghai',
      retryAttempts: 3,
      timeout: 300000,
      priority: 'high',
      description: '每天上午9点生成行业日报'
    },
    weeklyReport: {
      name: '周报生成',
      enabled: true,
      schedule: '0 10 * * 1',
      timezone: 'Asia/Shanghai',
      retryAttempts: 3,
      timeout: 600000,
      priority: 'high',
      description: '每周一上午10点生成行业周报'
    },
    seoContent: {
      name: 'SEO内容生成',
      enabled: true,
      schedule: '0 11 * * *',
      timezone: 'Asia/Shanghai',
      retryAttempts: 2,
      timeout: 900000,
      priority: 'medium',
      maxContentPerDay: 2,
      description: '每天上午11点生成SEO文章'
    },
    socialContent: {
      name: '社媒内容生成',
      enabled: true,
      schedule: '0 14 * * *',
      timezone: 'Asia/Shanghai',
      retryAttempts: 2,
      timeout: 600000,
      priority: 'medium',
      platforms: ['LinkedIn', 'Facebook'],
      description: '每天下午2点生成社媒内容'
    },
    marketSignals: {
      name: '市场信号处理',
      enabled: true,
      schedule: '*/30 * * * *',
      timezone: 'Asia/Shanghai',
      retryAttempts: 5,
      timeout: 120000,
      priority: 'critical',
      description: '每30分钟处理市场信号'
    },
    competitorMonitoring: {
      name: '竞品监控',
      enabled: true,
      schedule: '0 8 * * *',
      timezone: 'Asia/Shanghai',
      retryAttempts: 2,
      timeout: 1800000,
      priority: 'medium',
      description: '每天上午8点监控竞品动态'
    },
    costMonitoring: {
      name: '成本监控',
      enabled: true,
      schedule: '0 18 * * *',
      timezone: 'Asia/Shanghai',
      retryAttempts: 3,
      timeout: 300000,
      priority: 'high',
      description: '每天下午6点监控成本情况'
    },
    emergencyResponse: {
      name: '应急响应',
      enabled: true,
      schedule: '*/15 * * * *',
      timezone: 'Asia/Shanghai',
      retryAttempts: 5,
      timeout: 60000,
      priority: 'critical',
      description: '每15分钟检查应急条件'
    }
  }

  useEffect(() => {
    loadWorkflowConfig()
  }, [])

  const loadWorkflowConfig = async () => {
    try {
      setLoading(true)
      // 这里应该从API获取实际配置
      setWorkflows(defaultWorkflows)
    } catch (error) {
      console.error('加载工作流配置失败:', error)
      setMessage('加载配置失败')
    } finally {
      setLoading(false)
    }
  }

  const updateWorkflowConfig = async (workflowId, newConfig) => {
    try {
      setLoading(true)
      
      // 更新本地状态
      setWorkflows(prev => ({
        ...prev,
        [workflowId]: { ...prev[workflowId], ...newConfig }
      }))
      
      // 这里应该调用API更新配置
      // await updateWorkflowConfigAPI(workflowId, newConfig)
      
      setMessage('配置更新成功')
      setTimeout(() => setMessage(''), 3000)
      
    } catch (error) {
      console.error('更新工作流配置失败:', error)
      setMessage('配置更新失败')
    } finally {
      setLoading(false)
    }
  }

  const toggleWorkflow = async (workflowId) => {
    const currentConfig = workflows[workflowId]
    await updateWorkflowConfig(workflowId, {
      enabled: !currentConfig.enabled
    })
  }

  const updateSchedule = async (workflowId, newSchedule) => {
    await updateWorkflowConfig(workflowId, {
      schedule: newSchedule
    })
  }

  const updateRetryAttempts = async (workflowId, newAttempts) => {
    await updateWorkflowConfig(workflowId, {
      retryAttempts: parseInt(newAttempts)
    })
  }

  const updateTimeout = async (workflowId, newTimeout) => {
    await updateWorkflowConfig(workflowId, {
      timeout: parseInt(newTimeout)
    })
  }

  const updateMaxContentPerDay = async (workflowId, newMax) => {
    await updateWorkflowConfig(workflowId, {
      maxContentPerDay: parseInt(newMax)
    })
  }

  const updatePlatforms = async (workflowId, newPlatforms) => {
    await updateWorkflowConfig(workflowId, {
      platforms: newPlatforms
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getScheduleDescription = (schedule) => {
    const scheduleMap = {
      '0 9 * * *': '每天上午9点',
      '0 10 * * 1': '每周一上午10点',
      '0 11 * * *': '每天上午11点',
      '0 14 * * *': '每天下午2点',
      '*/30 * * * *': '每30分钟',
      '0 8 * * *': '每天上午8点',
      '0 18 * * *': '每天下午6点',
      '*/15 * * * *': '每15分钟'
    }
    return scheduleMap[schedule] || schedule
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">工作流配置</h1>
          <p className="text-gray-600 mt-2">管理AI营销中台的自动化工作流</p>
        </div>

        {message && (
          <div className="mx-6 mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(workflows).map(([workflowId, config]) => (
              <div key={workflowId} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{config.name}</h3>
                    <p className="text-sm text-gray-600">{config.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(config.priority)}`}>
                      {config.priority}
                    </span>
                    <button
                      onClick={() => toggleWorkflow(workflowId)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        config.enabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          config.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* 调度配置 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      执行时间
                    </label>
                    <select
                      value={config.schedule}
                      onChange={(e) => updateSchedule(workflowId, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="0 9 * * *">每天上午9点</option>
                      <option value="0 10 * * 1">每周一上午10点</option>
                      <option value="0 11 * * *">每天上午11点</option>
                      <option value="0 14 * * *">每天下午2点</option>
                      <option value="*/30 * * * *">每30分钟</option>
                      <option value="0 8 * * *">每天上午8点</option>
                      <option value="0 18 * * *">每天下午6点</option>
                      <option value="*/15 * * * *">每15分钟</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      当前: {getScheduleDescription(config.schedule)}
                    </p>
                  </div>

                  {/* 重试次数 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      重试次数
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={config.retryAttempts}
                      onChange={(e) => updateRetryAttempts(workflowId, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* 超时时间 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      超时时间 (毫秒)
                    </label>
                    <input
                      type="number"
                      min="1000"
                      max="3600000"
                      value={config.timeout}
                      onChange={(e) => updateTimeout(workflowId, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* 特殊配置 */}
                  {workflowId === 'seoContent' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        每日最大内容数
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={config.maxContentPerDay}
                        onChange={(e) => updateMaxContentPerDay(workflowId, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {workflowId === 'socialContent' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        目标平台
                      </label>
                      <div className="space-y-2">
                        {['LinkedIn', 'Facebook', 'Twitter', 'Instagram'].map(platform => (
                          <label key={platform} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={config.platforms.includes(platform)}
                              onChange={(e) => {
                                const newPlatforms = e.target.checked
                                  ? [...config.platforms, platform]
                                  : config.platforms.filter(p => p !== platform)
                                updatePlatforms(workflowId, newPlatforms)
                              }}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-700">{platform}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              共 {Object.keys(workflows).length} 个工作流
            </div>
            <div className="space-x-3">
              <button
                onClick={loadWorkflowConfig}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                刷新配置
              </button>
              <button
                onClick={() => {
                  // 保存所有配置
                  setMessage('配置保存成功')
                  setTimeout(() => setMessage(''), 3000)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                保存配置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkflowConfigPanel


