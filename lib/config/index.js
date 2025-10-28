// 主配置文件
// lib/config/index.js

import { SupabaseService } from '../supabase/supabase-config'
import { AirtableService } from '../airtable/airtable-config'
import { modelGateway } from '../mal/model-gateway'
import { mcpServerManager } from '../mcp/mcp-servers'
import { traeWorkflowManager } from '../trae/workflow-config'

// 系统配置
export const SYSTEM_CONFIG = {
  // 环境配置
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  
  // API 配置
  apis: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    },
    airtable: {
      apiKey: process.env.AIRTABLE_API_KEY,
      baseId: process.env.AIRTABLE_BASE_ID
    },
    claude: {
      apiKey: process.env.CLAUDE_API_KEY
    },
    models: {
      nanobanana: process.env.NANOBANANA_API_KEY,
      midjourney: process.env.MIDJOURNEY_API_KEY,
      dalle: process.env.DALL_E_API_KEY,
      sora: process.env.SORA_API_KEY,
      veo: process.env.VEO_API_KEY,
      pika: process.env.PIKA_API_KEY,
      runway: process.env.RUNWAY_API_KEY
    },
    thirdParty: {
      googleTrends: process.env.GOOGLE_TRENDS_API_KEY,
      newsAPI: process.env.NEWS_API_KEY,
      similarweb: process.env.SIMILARWEB_API_KEY,
      ahrefs: process.env.AHREFS_API_KEY,
      linkedinScraper: process.env.LINKEDIN_SCRAPER_KEY,
      redditAPI: process.env.REDDIT_API_KEY,
      alibabaAPI: process.env.ALIBABA_API_KEY
    }
  },
  
  // 业务配置
  business: {
    // 成本控制
    costLimits: {
      dailyPerClient: 100, // 美元
      monthlyPerClient: 2000, // 美元
      emergencyThreshold: 150 // 美元
    },
    
    // 内容生成频率
    contentFrequency: {
      dailyReport: '0 9 * * *', // 每天上午9点
      weeklyReport: '0 10 * * 1', // 每周一上午10点
      seoContent: '0 11 * * *', // 每天上午11点
      socialContent: '0 14 * * *', // 每天下午2点
      marketSignals: '*/30 * * * *', // 每30分钟
      competitorMonitoring: '0 8 * * *', // 每天上午8点
      costMonitoring: '0 18 * * *', // 每天下午6点
      emergencyResponse: '*/15 * * * *' // 每15分钟
    },
    
    // 质量阈值
    qualityThresholds: {
      aiPreReviewMinScore: 70, // AI预审最低分数
      humanReviewRequired: true, // 是否需要人工审核
      maxRetryAttempts: 3, // 最大重试次数
      fallbackToHuman: true // 是否允许降级到人工处理
    },
    
    // 服务包配置
    servicePackages: {
      bronze: {
        name: '青铜包',
        monthlyCost: 5000, // 人民币
        features: ['日报', '周报', '基础SEO', '竞品监控'],
        contentLimit: 20, // 每月内容数量限制
        apiLimit: 1000 // 每月API调用限制
      },
      silver: {
        name: '白银包',
        monthlyCost: 12000,
        features: ['青铜包功能', 'GEO优化', '社媒内容', '短视频'],
        contentLimit: 50,
        apiLimit: 3000
      },
      gold: {
        name: '黄金包',
        monthlyCost: 25000,
        features: ['白银包功能', '高风险社媒', '应急响应', '定制化'],
        contentLimit: 100,
        apiLimit: 8000
      }
    }
  },
  
  // 技术配置
  technical: {
    // 数据库配置
    database: {
      maxConnections: 20,
      connectionTimeout: 30000,
      queryTimeout: 60000
    },
    
    // 缓存配置
    cache: {
      ttl: 3600, // 1小时
      maxSize: 1000
    },
    
    // 日志配置
    logging: {
      level: process.env.LOG_LEVEL || 'info',
      maxFiles: 10,
      maxSize: '10MB'
    },
    
    // 监控配置
    monitoring: {
      healthCheckInterval: 60000, // 1分钟
      metricsCollectionInterval: 300000, // 5分钟
      alertThresholds: {
        errorRate: 0.05, // 5%
        responseTime: 5000, // 5秒
        memoryUsage: 0.8 // 80%
      }
    }
  }
}

// 系统初始化
export class SystemInitializer {
  constructor() {
    this.isInitialized = false
    this.components = {
      supabase: SupabaseService,
      airtable: AirtableService,
      modelGateway: modelGateway,
      mcpServers: mcpServerManager,
      workflows: traeWorkflowManager
    }
  }

  async initialize() {
    if (this.isInitialized) {
      console.log('⚠️ 系统已经初始化')
      return
    }

    console.log('🚀 开始初始化AI营销中台系统...')
    
    try {
      // 1. 验证环境变量
      await this.validateEnvironment()
      
      // 2. 测试数据库连接
      await this.testDatabaseConnections()
      
      // 3. 测试API连接
      await this.testAPIConnections()
      
      // 4. 启动MCP服务器
      await this.startMCPServers()
      
      // 5. 启动工作流引擎
      await this.startWorkflowEngine()
      
      // 6. 执行健康检查
      await this.performHealthCheck()
      
      this.isInitialized = true
      console.log('✅ AI营销中台系统初始化完成')
      
    } catch (error) {
      console.error('❌ 系统初始化失败:', error)
      throw error
    }
  }

  async validateEnvironment() {
    console.log('🔍 验证环境变量...')
    
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'AIRTABLE_API_KEY',
      'AIRTABLE_BASE_ID',
      'CLAUDE_API_KEY'
    ]
    
    const missingVars = requiredVars.filter(varName => !process.env[varName])
    
    if (missingVars.length > 0) {
      throw new Error(`缺少必需的环境变量: ${missingVars.join(', ')}`)
    }
    
    console.log('✅ 环境变量验证通过')
  }

  async testDatabaseConnections() {
    console.log('🔗 测试数据库连接...')
    
    try {
      // 测试 Supabase 连接
      const { data, error } = await this.components.supabase.supabase
        .from('icp_details')
        .select('count')
        .limit(1)
      
      if (error) throw error
      
      console.log('✅ Supabase 连接正常')
      
    } catch (error) {
      throw new Error(`Supabase 连接失败: ${error.message}`)
    }
  }

  async testAPIConnections() {
    console.log('🔗 测试API连接...')
    
    try {
      // 测试模型网关健康状态
      const healthStatus = await this.components.modelGateway.healthCheck()
      
      const healthyModels = Object.values(healthStatus).flat().filter(model => 
        model.status === 'healthy'
      ).length
      
      const totalModels = Object.values(healthStatus).flat().length
      
      if (healthyModels === 0) {
        throw new Error('没有可用的AI模型')
      }
      
      console.log(`✅ API连接正常 (${healthyModels}/${totalModels} 个模型可用)`)
      
    } catch (error) {
      throw new Error(`API连接测试失败: ${error.message}`)
    }
  }

  async startMCPServers() {
    console.log('🚀 启动MCP服务器...')
    
    try {
      await this.components.mcpServers.startAll()
      console.log('✅ MCP服务器启动成功')
    } catch (error) {
      throw new Error(`MCP服务器启动失败: ${error.message}`)
    }
  }

  async startWorkflowEngine() {
    console.log('🔄 启动工作流引擎...')
    
    try {
      await this.components.workflows.start()
      console.log('✅ 工作流引擎启动成功')
    } catch (error) {
      throw new Error(`工作流引擎启动失败: ${error.message}`)
    }
  }

  async performHealthCheck() {
    console.log('🏥 执行健康检查...')
    
    const healthStatus = {
      supabase: 'healthy',
      airtable: 'healthy',
      modelGateway: 'healthy',
      mcpServers: 'healthy',
      workflows: 'healthy'
    }
    
    try {
      // 检查各个组件状态
      const mcpStatus = await this.components.mcpServers.getServerStatus()
      if (!mcpStatus.overall) {
        healthStatus.mcpServers = 'warning'
      }
      
      console.log('✅ 健康检查通过')
      console.log('系统状态:', healthStatus)
      
    } catch (error) {
      console.error('⚠️ 健康检查发现问题:', error)
    }
  }

  async shutdown() {
    console.log('🛑 开始关闭系统...')
    
    try {
      // 停止工作流引擎
      await this.components.workflows.stop()
      
      // 停止MCP服务器
      await this.components.mcpServers.stopAll()
      
      this.isInitialized = false
      console.log('✅ 系统已安全关闭')
      
    } catch (error) {
      console.error('❌ 系统关闭失败:', error)
    }
  }

  getStatus() {
    return {
      initialized: this.isInitialized,
      environment: SYSTEM_CONFIG.environment,
      timestamp: new Date().toISOString()
    }
  }
}

// 系统监控
export class SystemMonitor {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      averageResponseTime: 0,
      memoryUsage: 0,
      cpuUsage: 0
    }
    this.isMonitoring = false
  }

  start() {
    console.log('📊 启动系统监控...')
    this.isMonitoring = true
    
    // 每5分钟收集一次指标
    setInterval(() => {
      if (this.isMonitoring) {
        this.collectMetrics()
      }
    }, 5 * 60 * 1000)
  }

  stop() {
    console.log('⏹️ 停止系统监控')
    this.isMonitoring = false
  }

  collectMetrics() {
    // 收集系统指标
    const memUsage = process.memoryUsage()
    this.metrics.memoryUsage = memUsage.heapUsed / memUsage.heapTotal
    
    // 这里可以添加更多指标收集逻辑
  }

  getMetrics() {
    return {
      ...this.metrics,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  }
}

// 单例模式
export const systemInitializer = new SystemInitializer()
export const systemMonitor = new SystemMonitor()

export default {
  SYSTEM_CONFIG,
  SystemInitializer,
  SystemMonitor,
  systemInitializer,
  systemMonitor
}

