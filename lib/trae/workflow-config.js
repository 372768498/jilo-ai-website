// Trae 工作流配置
// lib/trae/workflow-config.js

import { SupabaseService } from '../supabase/supabase-config'
import { AirtableService } from '../airtable/airtable-config'
import { modelGateway } from '../mal/model-gateway'
import { mcpServerManager } from '../mcp/mcp-servers'

// Trae 工作流配置
export class TraeWorkflowManager {
  constructor() {
    this.workflows = new Map()
    this.isRunning = false
    this.executionQueue = []
  }

  // 初始化所有工作流
  async initializeWorkflows() {
    console.log('🔧 初始化 Trae 工作流...')
    
    // 1. 日报生成工作流
    this.workflows.set('daily_report', {
      name: '日报生成工作流',
      schedule: '0 9 * * *', // 每天上午9点
      enabled: true,
      handler: this.generateDailyReport.bind(this)
    })

    // 2. 周报生成工作流
    this.workflows.set('weekly_report', {
      name: '周报生成工作流',
      schedule: '0 10 * * 1', // 每周一上午10点
      enabled: true,
      handler: this.generateWeeklyReport.bind(this)
    })

    // 3. SEO内容生成工作流
    this.workflows.set('seo_content', {
      name: 'SEO内容生成工作流',
      schedule: '0 11 * * *', // 每天上午11点
      enabled: true,
      handler: this.generateSEOContent.bind(this)
    })

    // 4. 社媒内容生成工作流
    this.workflows.set('social_content', {
      name: '社媒内容生成工作流',
      schedule: '0 14 * * *', // 每天下午2点
      enabled: true,
      handler: this.generateSocialContent.bind(this)
    })

    // 5. 市场信号处理工作流
    this.workflows.set('market_signals', {
      name: '市场信号处理工作流',
      schedule: '*/30 * * * *', // 每30分钟
      enabled: true,
      handler: this.processMarketSignals.bind(this)
    })

    // 6. 竞品监控工作流
    this.workflows.set('competitor_monitoring', {
      name: '竞品监控工作流',
      schedule: '0 8 * * *', // 每天上午8点
      enabled: true,
      handler: this.monitorCompetitors.bind(this)
    })

    // 7. 成本监控工作流
    this.workflows.set('cost_monitoring', {
      name: '成本监控工作流',
      schedule: '0 18 * * *', // 每天下午6点
      enabled: true,
      handler: this.monitorCosts.bind(this)
    })

    // 8. 应急响应工作流
    this.workflows.set('emergency_response', {
      name: '应急响应工作流',
      schedule: '*/15 * * * *', // 每15分钟
      enabled: true,
      handler: this.checkEmergencyConditions.bind(this)
    })

    console.log(`✅ 已初始化 ${this.workflows.size} 个工作流`)
  }

  // 启动工作流引擎
  async start() {
    console.log('🚀 启动 Trae 工作流引擎...')
    this.isRunning = true
    
    // 初始化工作流
    await this.initializeWorkflows()
    
    // 启动定时任务
    this.startScheduledTasks()
    
    // 启动信号驱动的任务处理
    this.startSignalDrivenTasks()
    
    console.log('✅ Trae 工作流引擎启动成功')
  }

  // 停止工作流引擎
  async stop() {
    console.log('⏹️ 停止 Trae 工作流引擎...')
    this.isRunning = false
    
    // 停止所有定时器
    if (this.timers) {
      Object.values(this.timers).forEach(timer => clearInterval(timer))
    }
    
    console.log('✅ Trae 工作流引擎已停止')
  }

  // 启动定时任务
  startScheduledTasks() {
    this.timers = {}
    
    for (const [workflowId, workflow] of this.workflows) {
      if (workflow.enabled) {
        // 简化的定时任务实现（实际应该使用 cron 库）
        const interval = this.parseSchedule(workflow.schedule)
        if (interval > 0) {
          this.timers[workflowId] = setInterval(async () => {
            try {
              await this.executeWorkflow(workflowId)
            } catch (error) {
              console.error(`工作流 ${workflowId} 执行失败:`, error)
            }
          }, interval)
        }
      }
    }
  }

  // 启动信号驱动的任务处理
  startSignalDrivenTasks() {
    // 监听市场信号
    SupabaseService.subscribeToMarketSignals(async (payload) => {
      console.log('📡 收到市场信号:', payload.new)
      await this.handleMarketSignal(payload.new)
    })
  }

  // 执行工作流
  async executeWorkflow(workflowId) {
    const workflow = this.workflows.get(workflowId)
    if (!workflow || !workflow.enabled) return

    console.log(`🔄 执行工作流: ${workflow.name}`)
    
    try {
      await workflow.handler()
      console.log(`✅ 工作流 ${workflow.name} 执行成功`)
    } catch (error) {
      console.error(`❌ 工作流 ${workflow.name} 执行失败:`, error)
    }
  }

  // 日报生成工作流
  async generateDailyReport() {
    console.log('📊 开始生成日报...')
    
    const clients = await AirtableService.getAllClients()
    const activeClients = clients.filter(client => client['状态'] === 'active')
    
    for (const client of activeClients) {
      try {
        await this.generateClientDailyReport(client)
      } catch (error) {
        console.error(`客户 ${client['客户ID']} 日报生成失败:`, error)
      }
    }
  }

  async generateClientDailyReport(client) {
    const clientId = client['客户ID']
    const industry = client['行业']
    const geo = client['GEO']
    
    // 1. 获取今日市场信号
    const today = new Date().toISOString().split('T')[0]
    const signals = await SupabaseService.getMarketSignalsByDate(clientId, today)
    
    // 2. 获取竞品动态
    const competitors = await AirtableService.getClientCompetitors(clientId)
    
    // 3. 生成日报内容
    const reportContent = await this.generateReportContent('daily', {
      clientId,
      industry,
      geo,
      signals,
      competitors
    })
    
    // 4. 添加到内容队列
    await AirtableService.addToContentQueue({
      contentId: `DAILY_${clientId}_${today}`,
      clientId: clientId,
      type: '日报',
      title: `每日行业洞察 - ${today}`,
      content: reportContent,
      status: 'AI预审中',
      publishAt: new Date().toISOString()
    })
  }

  // 周报生成工作流
  async generateWeeklyReport() {
    console.log('📈 开始生成周报...')
    
    const clients = await AirtableService.getAllClients()
    const activeClients = clients.filter(client => client['状态'] === 'active')
    
    for (const client of activeClients) {
      try {
        await this.generateClientWeeklyReport(client)
      } catch (error) {
        console.error(`客户 ${client['客户ID']} 周报生成失败:`, error)
      }
    }
  }

  async generateClientWeeklyReport(client) {
    const clientId = client['客户ID']
    
    // 1. 获取本周数据
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - 7)
    const weekEnd = new Date()
    
    const metrics = await this.getClientWeeklyMetrics(clientId, weekStart, weekEnd)
    const signals = await SupabaseService.getMarketSignalsByDateRange(clientId, weekStart.toISOString(), weekEnd.toISOString())
    
    // 2. 生成周报内容
    const reportContent = await this.generateReportContent('weekly', {
      clientId,
      metrics,
      signals
    })
    
    // 3. 添加到内容队列
    const today = new Date().toISOString().split('T')[0]
    await AirtableService.addToContentQueue({
      contentId: `WEEKLY_${clientId}_${today}`,
      clientId: clientId,
      type: '周报',
      title: `每周行业洞察 - ${today}`,
      content: reportContent,
      status: 'AI预审中',
      publishAt: new Date().toISOString()
    })
  }

  // SEO内容生成工作流
  async generateSEOContent() {
    console.log('📝 开始生成SEO内容...')
    
    const clients = await AirtableService.getAllClients()
    const activeClients = clients.filter(client => client['状态'] === 'active')
    
    for (const client of activeClients) {
      try {
        await this.generateClientSEOContent(client)
      } catch (error) {
        console.error(`客户 ${client['客户ID']} SEO内容生成失败:`, error)
      }
    }
  }

  async generateClientSEOContent(client) {
    const clientId = client['客户ID']
    const products = await AirtableService.getClientProducts(clientId)
    
    // 为每个产品生成SEO内容
    for (const product of products.slice(0, 2)) { // 限制每天2篇
      try {
        const seoContent = await this.generateSEOArticle(client, product)
        
        await AirtableService.addToContentQueue({
          contentId: `SEO_${clientId}_${product['产品ID']}_${Date.now()}`,
          clientId: clientId,
          type: 'SEO',
          title: seoContent.title,
          content: seoContent.content,
          keywords: seoContent.keywords,
          status: 'AI预审中',
          publishAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 明天发布
        })
      } catch (error) {
        console.error(`产品 ${product['产品名']} SEO内容生成失败:`, error)
      }
    }
  }

  // 社媒内容生成工作流
  async generateSocialContent() {
    console.log('📱 开始生成社媒内容...')
    
    const clients = await AirtableService.getAllClients()
    const activeClients = clients.filter(client => client['状态'] === 'active')
    
    for (const client of activeClients) {
      try {
        await this.generateClientSocialContent(client)
      } catch (error) {
        console.error(`客户 ${client['客户ID']} 社媒内容生成失败:`, error)
      }
    }
  }

  async generateClientSocialContent(client) {
    const clientId = client['客户ID']
    
    // 生成LinkedIn内容
    const linkedinContent = await this.generateLinkedInPost(client)
    
    await AirtableService.addToContentQueue({
      contentId: `SOCIAL_${clientId}_LINKEDIN_${Date.now()}`,
      clientId: clientId,
      type: '社媒',
      title: linkedinContent.title,
      content: linkedinContent.content,
      targetPlatforms: ['LinkedIn'],
      status: 'AI预审中',
      publishAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // 2小时后发布
    })
  }

  // 市场信号处理工作流
  async processMarketSignals() {
    console.log('📡 处理市场信号...')
    
    const unprocessedSignals = await SupabaseService.getUnprocessedSignals()
    
    for (const signal of unprocessedSignals) {
      try {
        await this.processSignal(signal)
        
        // 标记为已处理
        await SupabaseService.markSignalAsProcessed(signal.id)
      } catch (error) {
        console.error(`信号 ${signal.signal_id} 处理失败:`, error)
      }
    }
  }

  async processSignal(signal) {
    console.log(`处理信号: ${signal.signal_id}`)
    
    // 根据信号类型采取不同行动
    switch (signal.signal_type) {
      case 'demand_surge':
        await this.handleDemandSurge(signal)
        break
      case 'policy_change':
        await this.handlePolicyChange(signal)
        break
      case 'competitor_move':
        await this.handleCompetitorMove(signal)
        break
      case 'buyer_inquiry':
        await this.handleBuyerInquiry(signal)
        break
    }
  }

  async handleDemandSurge(signal) {
    // 需求激增处理逻辑
    console.log(`处理需求激增信号: ${signal.signal_id}`)
    
    // 1. 生成相关内容
    // 2. 调整营销策略
    // 3. 通知相关人员
  }

  async handlePolicyChange(signal) {
    // 政策变化处理逻辑
    console.log(`处理政策变化信号: ${signal.signal_id}`)
  }

  async handleCompetitorMove(signal) {
    // 竞品动态处理逻辑
    console.log(`处理竞品动态信号: ${signal.signal_id}`)
  }

  async handleBuyerInquiry(signal) {
    // 买家询盘处理逻辑
    console.log(`处理买家询盘信号: ${signal.signal_id}`)
  }

  // 竞品监控工作流
  async monitorCompetitors() {
    console.log('🔍 开始竞品监控...')
    
    // 启动竞品监控服务器
    await mcpServerManager.servers.competitorMonitoring.monitorAllCompetitors()
  }

  // 成本监控工作流
  async monitorCosts() {
    console.log('💰 开始成本监控...')
    
    const clients = await AirtableService.getAllClients()
    const activeClients = clients.filter(client => client['状态'] === 'active')
    
    for (const client of activeClients) {
      try {
        await this.monitorClientCosts(client['客户ID'])
      } catch (error) {
        console.error(`客户 ${client['客户ID']} 成本监控失败:`, error)
      }
    }
  }

  async monitorClientCosts(clientId) {
    const today = new Date().toISOString().split('T')[0]
    const costs = await AirtableService.getClientCosts(clientId, today, today)
    
    const totalCost = costs.reduce((sum, cost) => sum + parseFloat(cost['成本']), 0)
    
    // 如果日成本超过阈值，触发告警
    const dailyLimit = 100 // 美元
    if (totalCost > dailyLimit) {
      console.warn(`⚠️ 客户 ${clientId} 日成本超限: $${totalCost}`)
      
      // 创建应急响应
      await SupabaseService.createEmergencyResponse(clientId, {
        anomalyType: 'cost_exceeded',
        evidence: {
          dailyCost: totalCost,
          limit: dailyLimit,
          date: today
        },
        hypotheses: [
          { hypothesis: '日成本超过预设阈值', confidence: 100 }
        ],
        solution: 'cost_review',
        budgetAdjustment: { dailyLimit: dailyLimit },
        expectedResult: '成本控制在合理范围内'
      })
    }
  }

  // 应急响应工作流
  async checkEmergencyConditions() {
    console.log('🚨 检查应急条件...')
    
    // 检查各种异常条件
    await this.checkCostAnomalies()
    await this.checkPerformanceAnomalies()
    await this.checkAccountHealth()
  }

  async checkCostAnomalies() {
    // 检查成本异常
  }

  async checkPerformanceAnomalies() {
    // 检查性能异常
  }

  async checkAccountHealth() {
    // 检查账号健康度
  }

  // 辅助方法
  parseSchedule(schedule) {
    // 简化的调度解析（实际应该使用 cron 库）
    if (schedule.includes('*/30')) return 30 * 60 * 1000 // 30分钟
    if (schedule.includes('*/15')) return 15 * 60 * 1000 // 15分钟
    if (schedule.includes('0 9')) return 24 * 60 * 60 * 1000 // 24小时
    return 0
  }

  async generateReportContent(type, data) {
    // 使用 Claude 生成报告内容
    const prompt = this.buildReportPrompt(type, data)
    
    try {
      const result = await modelGateway.generateText(prompt, data.clientId)
      return result.data
    } catch (error) {
      console.error('报告内容生成失败:', error)
      return '报告生成失败，请稍后重试。'
    }
  }

  buildReportPrompt(type, data) {
    if (type === 'daily') {
      return `
生成一份每日行业洞察报告：

客户信息：
- 行业：${data.industry}
- 地区：${data.geo}

今日市场信号：
${JSON.stringify(data.signals, null, 2)}

竞品动态：
${JSON.stringify(data.competitors, null, 2)}

请生成包含以下部分的报告：
1. 今日要闻（3-5条重要新闻）
2. 对我们的影响（1-2段分析）
3. 建议下一步（A/B两个方案）

要求：总字数300-500词，专业且实用。
      `
    }
    
    if (type === 'weekly') {
      return `
生成一份每周行业洞察报告：

本周数据回顾：
${JSON.stringify(data.metrics, null, 2)}

本周市场信号：
${JSON.stringify(data.signals, null, 2)}

请生成包含以下部分的报告：
1. 本周数据回顾
2. 与上周对比
3. 竞品动态
4. 下周重点工作

要求：总字数500-800词，数据驱动。
      `
    }
    
    return '请生成报告内容。'
  }

  async generateSEOArticle(client, product) {
    const prompt = `
生成一篇SEO优化文章：

产品信息：
- 产品名：${product['产品名']}
- USP：${product['USP']}
- 目标市场：${product['目标市场']}

客户信息：
- 行业：${client['行业']}
- 地区：${client['GEO']}

要求：
1. 标题包含目标关键词
2. 文章结构：引言 → 3-5个小节 → FAQ → 结论
3. 自然融入产品USP
4. 包含GEO优化元素
5. 总字数2000-3000词

输出格式：返回JSON，包含title、content、keywords字段。
    `
    
    try {
      const result = await modelGateway.generateText(prompt, client['客户ID'])
      return JSON.parse(result.data)
    } catch (error) {
      console.error('SEO文章生成失败:', error)
      return {
        title: `${product['产品名']} - 专业供应商`,
        content: '文章生成失败，请稍后重试。',
        keywords: [product['产品名']]
      }
    }
  }

  async generateLinkedInPost(client) {
    const prompt = `
生成一篇LinkedIn帖子：

客户信息：
- 公司：${client['公司名']}
- 行业：${client['行业']}

要求：
1. 开头用引人注目的Hook
2. 正文提供价值（洞察/建议）
3. 结尾用CTA
4. 300-500字
5. 添加3-5个相关Hashtags

输出格式：返回JSON，包含title、content字段。
    `
    
    try {
      const result = await modelGateway.generateText(prompt, client['客户ID'])
      return JSON.parse(result.data)
    } catch (error) {
      console.error('LinkedIn帖子生成失败:', error)
      return {
        title: '行业洞察分享',
        content: '帖子生成失败，请稍后重试。'
      }
    }
  }

  async getClientWeeklyMetrics(clientId, startDate, endDate) {
    // 获取客户周度指标
    // 这里使用模拟数据
    return {
      organicTraffic: 1500,
      mqlCount: 25,
      cpl: 120,
      conversionRate: 8.5,
      inquiries: 15,
      deals: 3,
      dealValue: 45000,
      roi: 3.2
    }
  }
}

// 单例模式
export const traeWorkflowManager = new TraeWorkflowManager()

export default TraeWorkflowManager


