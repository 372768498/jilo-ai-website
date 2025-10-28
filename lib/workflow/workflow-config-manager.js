// 工作流配置管理器
// lib/workflow/workflow-config-manager.js

const cron = require('node-cron')

// 工作流配置类
class WorkflowConfigManager {
  constructor() {
    this.workflows = new Map()
    this.schedules = new Map()
    this.isRunning = false
    this.config = {
      // 默认配置
      dailyReport: {
        enabled: true,
        schedule: '0 9 * * *', // 每天上午9点
        timezone: 'Asia/Shanghai',
        retryAttempts: 3,
        timeout: 300000, // 5分钟
        priority: 'high'
      },
      weeklyReport: {
        enabled: true,
        schedule: '0 10 * * 1', // 每周一上午10点
        timezone: 'Asia/Shanghai',
        retryAttempts: 3,
        timeout: 600000, // 10分钟
        priority: 'high'
      },
      seoContent: {
        enabled: true,
        schedule: '0 11 * * *', // 每天上午11点
        timezone: 'Asia/Shanghai',
        retryAttempts: 2,
        timeout: 900000, // 15分钟
        priority: 'medium',
        maxContentPerDay: 2
      },
      socialContent: {
        enabled: true,
        schedule: '0 14 * * *', // 每天下午2点
        timezone: 'Asia/Shanghai',
        retryAttempts: 2,
        timeout: 600000, // 10分钟
        priority: 'medium',
        platforms: ['LinkedIn', 'Facebook']
      },
      marketSignals: {
        enabled: true,
        schedule: '*/30 * * * *', // 每30分钟
        timezone: 'Asia/Shanghai',
        retryAttempts: 5,
        timeout: 120000, // 2分钟
        priority: 'critical'
      },
      competitorMonitoring: {
        enabled: true,
        schedule: '0 8 * * *', // 每天上午8点
        timezone: 'Asia/Shanghai',
        retryAttempts: 2,
        timeout: 1800000, // 30分钟
        priority: 'medium'
      },
      costMonitoring: {
        enabled: true,
        schedule: '0 18 * * *', // 每天下午6点
        timezone: 'Asia/Shanghai',
        retryAttempts: 3,
        timeout: 300000, // 5分钟
        priority: 'high'
      },
      emergencyResponse: {
        enabled: true,
        schedule: '*/15 * * * *', // 每15分钟
        timezone: 'Asia/Shanghai',
        retryAttempts: 5,
        timeout: 60000, // 1分钟
        priority: 'critical'
      }
    }
  }

  // 启动工作流配置
  async start() {
    console.log('🔧 启动工作流配置管理器...')
    this.isRunning = true
    
    // 加载配置
    await this.loadConfiguration()
    
    // 启动所有工作流
    await this.startAllWorkflows()
    
    console.log('✅ 工作流配置管理器启动成功')
  }

  // 停止工作流配置
  async stop() {
    console.log('⏹️ 停止工作流配置管理器...')
    this.isRunning = false
    
    // 停止所有定时任务
    for (const [workflowId, schedule] of this.schedules) {
      schedule.destroy()
      console.log(`⏹️ 已停止工作流: ${workflowId}`)
    }
    
    this.schedules.clear()
    console.log('✅ 工作流配置管理器已停止')
  }

  // 加载配置
  async loadConfiguration() {
    try {
      // 从环境变量或配置文件加载
      const configOverrides = this.getConfigOverrides()
      
      // 合并配置
      this.config = { ...this.config, ...configOverrides }
      
      console.log('✅ 工作流配置加载完成')
    } catch (error) {
      console.error('❌ 工作流配置加载失败:', error.message)
    }
  }

  // 获取配置覆盖
  getConfigOverrides() {
    const overrides = {}
    
    // 从环境变量读取配置
    if (process.env.DAILY_REPORT_SCHEDULE) {
      overrides.dailyReport = { ...overrides.dailyReport, schedule: process.env.DAILY_REPORT_SCHEDULE }
    }
    
    if (process.env.WEEKLY_REPORT_SCHEDULE) {
      overrides.weeklyReport = { ...overrides.weeklyReport, schedule: process.env.WEEKLY_REPORT_SCHEDULE }
    }
    
    if (process.env.SEO_CONTENT_SCHEDULE) {
      overrides.seoContent = { ...overrides.seoContent, schedule: process.env.SEO_CONTENT_SCHEDULE }
    }
    
    if (process.env.SOCIAL_CONTENT_SCHEDULE) {
      overrides.socialContent = { ...overrides.socialContent, schedule: process.env.SOCIAL_CONTENT_SCHEDULE }
    }
    
    if (process.env.MARKET_SIGNALS_SCHEDULE) {
      overrides.marketSignals = { ...overrides.marketSignals, schedule: process.env.MARKET_SIGNALS_SCHEDULE }
    }
    
    if (process.env.COMPETITOR_MONITORING_SCHEDULE) {
      overrides.competitorMonitoring = { ...overrides.competitorMonitoring, schedule: process.env.COMPETITOR_MONITORING_SCHEDULE }
    }
    
    if (process.env.COST_MONITORING_SCHEDULE) {
      overrides.costMonitoring = { ...overrides.costMonitoring, schedule: process.env.COST_MONITORING_SCHEDULE }
    }
    
    if (process.env.EMERGENCY_RESPONSE_SCHEDULE) {
      overrides.emergencyResponse = { ...overrides.emergencyResponse, schedule: process.env.EMERGENCY_RESPONSE_SCHEDULE }
    }
    
    return overrides
  }

  // 启动所有工作流
  async startAllWorkflows() {
    const workflowHandlers = {
      dailyReport: this.handleDailyReport.bind(this),
      weeklyReport: this.handleWeeklyReport.bind(this),
      seoContent: this.handleSEOContent.bind(this),
      socialContent: this.handleSocialContent.bind(this),
      marketSignals: this.handleMarketSignals.bind(this),
      competitorMonitoring: this.handleCompetitorMonitoring.bind(this),
      costMonitoring: this.handleCostMonitoring.bind(this),
      emergencyResponse: this.handleEmergencyResponse.bind(this)
    }

    for (const [workflowId, config] of Object.entries(this.config)) {
      if (config.enabled) {
        await this.startWorkflow(workflowId, config, workflowHandlers[workflowId])
      }
    }
  }

  // 启动单个工作流
  async startWorkflow(workflowId, config, handler) {
    try {
      console.log(`🔄 启动工作流: ${workflowId} (${config.schedule})`)
      
      const schedule = cron.schedule(config.schedule, async () => {
        if (this.isRunning) {
          await this.executeWorkflow(workflowId, config, handler)
        }
      }, {
        scheduled: false,
        timezone: config.timezone
      })
      
      this.schedules.set(workflowId, schedule)
      schedule.start()
      
      console.log(`✅ 工作流 ${workflowId} 启动成功`)
      
    } catch (error) {
      console.error(`❌ 工作流 ${workflowId} 启动失败:`, error.message)
    }
  }

  // 执行工作流
  async executeWorkflow(workflowId, config, handler) {
    const startTime = Date.now()
    let attempt = 0
    
    while (attempt < config.retryAttempts) {
      try {
        console.log(`🔄 执行工作流: ${workflowId} (尝试 ${attempt + 1}/${config.retryAttempts})`)
        
        // 设置超时
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('工作流执行超时')), config.timeout)
        })
        
        const handlerPromise = handler()
        
        await Promise.race([handlerPromise, timeoutPromise])
        
        const duration = Date.now() - startTime
        console.log(`✅ 工作流 ${workflowId} 执行成功 (耗时: ${duration}ms)`)
        
        // 记录成功执行
        await this.logWorkflowExecution(workflowId, 'success', duration, attempt + 1)
        
        return
        
      } catch (error) {
        attempt++
        console.error(`❌ 工作流 ${workflowId} 执行失败 (尝试 ${attempt}/${config.retryAttempts}):`, error.message)
        
        if (attempt >= config.retryAttempts) {
          // 记录最终失败
          await this.logWorkflowExecution(workflowId, 'failed', Date.now() - startTime, attempt)
          
          // 触发应急响应
          await this.triggerEmergencyResponse(workflowId, error)
        } else {
          // 等待重试
          await this.delay(1000 * attempt)
        }
      }
    }
  }

  // 工作流处理器
  async handleDailyReport() {
    console.log('📊 执行日报生成工作流...')
    
    const clients = await AirtableService.getAllClients()
    const activeClients = clients.filter(client => client['状态'] === 'active')
    
    for (const client of activeClients) {
      try {
        await this.generateClientDailyReport(client)
      } catch (error) {
        console.error(`客户 ${client['客户ID']} 日报生成失败:`, error.message)
      }
    }
  }

  async handleWeeklyReport() {
    console.log('📈 执行周报生成工作流...')
    
    const clients = await AirtableService.getAllClients()
    const activeClients = clients.filter(client => client['状态'] === 'active')
    
    for (const client of activeClients) {
      try {
        await this.generateClientWeeklyReport(client)
      } catch (error) {
        console.error(`客户 ${client['客户ID']} 周报生成失败:`, error.message)
      }
    }
  }

  async handleSEOContent() {
    console.log('📝 执行SEO内容生成工作流...')
    
    const clients = await AirtableService.getAllClients()
    const activeClients = clients.filter(client => client['状态'] === 'active')
    
    for (const client of activeClients) {
      try {
        await this.generateClientSEOContent(client)
      } catch (error) {
        console.error(`客户 ${client['客户ID']} SEO内容生成失败:`, error.message)
      }
    }
  }

  async handleSocialContent() {
    console.log('📱 执行社媒内容生成工作流...')
    
    const clients = await AirtableService.getAllClients()
    const activeClients = clients.filter(client => client['状态'] === 'active')
    
    for (const client of activeClients) {
      try {
        await this.generateClientSocialContent(client)
      } catch (error) {
        console.error(`客户 ${client['客户ID']} 社媒内容生成失败:`, error.message)
      }
    }
  }

  async handleMarketSignals() {
    console.log('📡 执行市场信号处理工作流...')
    
    try {
      const unprocessedSignals = await SupabaseService.getUnprocessedSignals()
      
      for (const signal of unprocessedSignals) {
        try {
          await this.processSignal(signal)
          await SupabaseService.markSignalAsProcessed(signal.id)
        } catch (error) {
          console.error(`信号 ${signal.signal_id} 处理失败:`, error.message)
        }
      }
    } catch (error) {
      console.error('市场信号处理失败:', error.message)
    }
  }

  async handleCompetitorMonitoring() {
    console.log('🔍 执行竞品监控工作流...')
    
    try {
      const clients = await AirtableService.getAllClients()
      const activeClients = clients.filter(client => client['状态'] === 'active')
      
      for (const client of activeClients) {
        try {
          await this.monitorClientCompetitors(client['客户ID'])
        } catch (error) {
          console.error(`客户 ${client['客户ID']} 竞品监控失败:`, error.message)
        }
      }
    } catch (error) {
      console.error('竞品监控失败:', error.message)
    }
  }

  async handleCostMonitoring() {
    console.log('💰 执行成本监控工作流...')
    
    try {
      const clients = await AirtableService.getAllClients()
      const activeClients = clients.filter(client => client['状态'] === 'active')
      
      for (const client of activeClients) {
        try {
          await this.monitorClientCosts(client['客户ID'])
        } catch (error) {
          console.error(`客户 ${client['客户ID']} 成本监控失败:`, error.message)
        }
      }
    } catch (error) {
      console.error('成本监控失败:', error.message)
    }
  }

  async handleEmergencyResponse() {
    console.log('🚨 执行应急响应工作流...')
    
    try {
      await this.checkEmergencyConditions()
    } catch (error) {
      console.error('应急响应检查失败:', error.message)
    }
  }

  // 具体工作流实现
  async generateClientDailyReport(client) {
    const clientId = client['客户ID']
    const industry = client['行业']
    const geo = client['GEO']
    
    // 获取今日市场信号
    const today = new Date().toISOString().split('T')[0]
    const signals = await SupabaseService.getMarketSignalsByDate(clientId, today)
    
    // 获取竞品动态
    const competitors = await AirtableService.getClientCompetitors(clientId)
    
    // 生成日报内容
    const reportContent = await this.generateReportContent('daily', {
      clientId,
      industry,
      geo,
      signals,
      competitors
    })
    
    // 添加到内容队列
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

  async generateClientWeeklyReport(client) {
    const clientId = client['客户ID']
    
    // 获取本周数据
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - 7)
    const weekEnd = new Date()
    
    const metrics = await this.getClientWeeklyMetrics(clientId, weekStart, weekEnd)
    const signals = await SupabaseService.getMarketSignalsByDateRange(clientId, weekStart.toISOString(), weekEnd.toISOString())
    
    // 生成周报内容
    const reportContent = await this.generateReportContent('weekly', {
      clientId,
      metrics,
      signals
    })
    
    // 添加到内容队列
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

  async generateClientSEOContent(client) {
    const clientId = client['客户ID']
    const products = await AirtableService.getClientProducts(clientId)
    
    // 限制每天生成的内容数量
    const maxContentPerDay = this.config.seoContent.maxContentPerDay || 2
    
    for (const product of products.slice(0, maxContentPerDay)) {
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
        console.error(`产品 ${product['产品名']} SEO内容生成失败:`, error.message)
      }
    }
  }

  async generateClientSocialContent(client) {
    const clientId = client['客户ID']
    const platforms = this.config.socialContent.platforms || ['LinkedIn']
    
    for (const platform of platforms) {
      try {
        const socialContent = await this.generateSocialPost(client, platform)
        
        await AirtableService.addToContentQueue({
          contentId: `SOCIAL_${clientId}_${platform}_${Date.now()}`,
          clientId: clientId,
          type: '社媒',
          title: socialContent.title,
          content: socialContent.content,
          targetPlatforms: [platform],
          status: 'AI预审中',
          publishAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // 2小时后发布
        })
      } catch (error) {
        console.error(`平台 ${platform} 社媒内容生成失败:`, error.message)
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

  async monitorClientCompetitors(clientId) {
    const competitors = await AirtableService.getClientCompetitors(clientId)
    
    for (const competitor of competitors) {
      try {
        await this.monitorCompetitor(competitor)
      } catch (error) {
        console.error(`竞品 ${competitor['竞品名称']} 监控失败:`, error.message)
      }
    }
  }

  async monitorCompetitor(competitor) {
    const domain = competitor['域名']
    if (!domain) return
    
    // 1. SimilarWeb 数据
    const similarWebData = await this.getSimilarWebData(domain)
    
    // 2. Ahrefs 数据
    const ahrefsData = await this.getAhrefsData(domain)
    
    // 3. 内容监控
    const contentData = await this.getContentData(domain)
    
    // 4. 生成策略提示
    const strategyTips = await this.generateStrategyTips(competitor, similarWebData, ahrefsData, contentData)
    
    // 5. 更新竞品数据
    await this.updateCompetitorData(competitor['竞品ID'], {
      monthlyVisits: similarWebData.monthlyVisits,
      domainRating: ahrefsData.domainRating,
      backlinks: ahrefsData.backlinks,
      strategyTips: strategyTips,
      lastUpdated: new Date().toISOString()
    })
  }

  async monitorClientCosts(clientId) {
    const today = new Date().toISOString().split('T')[0]
    const costs = await AirtableService.getClientCosts(clientId, today, today)
    
    const totalCost = costs.reduce((sum, cost) => sum + parseFloat(cost['成本']), 0)
    
    // 如果日成本超过阈值，触发告警
    const dailyLimit = process.env.DAILY_COST_LIMIT_PER_CLIENT || 100
    
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

  async checkEmergencyConditions() {
    // 检查各种异常条件
    await this.checkCostAnomalies()
    await this.checkPerformanceAnomalies()
    await this.checkAccountHealth()
  }

  async checkCostAnomalies() {
    // 检查成本异常
    console.log('检查成本异常...')
  }

  async checkPerformanceAnomalies() {
    // 检查性能异常
    console.log('检查性能异常...')
  }

  async checkAccountHealth() {
    // 检查账号健康度
    console.log('检查账号健康度...')
  }

  // 辅助方法
  async generateReportContent(type, data) {
    const prompt = this.buildReportPrompt(type, data)
    
    try {
      const result = await modelGateway.generateText(prompt, data.clientId)
      return result.data
    } catch (error) {
      console.error('报告内容生成失败:', error.message)
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
      console.error('SEO文章生成失败:', error.message)
      return {
        title: `${product['产品名']} - 专业供应商`,
        content: '文章生成失败，请稍后重试。',
        keywords: [product['产品名']]
      }
    }
  }

  async generateSocialPost(client, platform) {
    const prompt = `
生成一篇${platform}帖子：

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
      console.error(`${platform}帖子生成失败:`, error.message)
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

  async getSimilarWebData(domain) {
    // SimilarWeb API 调用
    // 这里使用模拟数据
    return {
      monthlyVisits: Math.floor(Math.random() * 100000),
      trafficSources: ['organic', 'direct', 'social'],
      topPages: ['/', '/products', '/about']
    }
  }

  async getAhrefsData(domain) {
    // Ahrefs API 调用
    // 这里使用模拟数据
    return {
      domainRating: Math.floor(Math.random() * 100),
      backlinks: Math.floor(Math.random() * 10000),
      organicKeywords: Math.floor(Math.random() * 5000)
    }
  }

  async getContentData(domain) {
    // 内容监控（爬虫）
    // 这里使用模拟数据
    return {
      recentPosts: [],
      newProducts: [],
      announcements: []
    }
  }

  async generateStrategyTips(competitor, similarWebData, ahrefsData, contentData) {
    // 使用 Claude 生成策略提示
    const tips = []
    
    if (similarWebData.monthlyVisits > 50000) {
      tips.push('竞品流量较高，建议分析其SEO策略')
    }
    
    if (ahrefsData.domainRating > 70) {
      tips.push('竞品域名权重较高，建议加强外链建设')
    }
    
    return tips.join('; ')
  }

  async updateCompetitorData(competitorId, data) {
    // 更新 Airtable 中的竞品数据
    try {
      await AirtableService.updateCompetitorData(competitorId, data)
    } catch (error) {
      console.error('更新竞品数据失败:', error.message)
    }
  }

  // 日志记录
  async logWorkflowExecution(workflowId, status, duration, attempts) {
    try {
      await SupabaseService.supabase
        .from('workflow_executions')
        .insert({
          workflow_id: workflowId,
          status: status,
          duration: duration,
          attempts: attempts,
          executed_at: new Date().toISOString()
        })
    } catch (error) {
      console.error('工作流执行日志记录失败:', error.message)
    }
  }

  // 应急响应
  async triggerEmergencyResponse(workflowId, error) {
    console.log(`🚨 触发应急响应: ${workflowId}`)
    
    try {
      await SupabaseService.createEmergencyResponse('system', {
        anomalyType: 'workflow_failure',
        evidence: {
          workflowId: workflowId,
          error: error.message,
          timestamp: new Date().toISOString()
        },
        hypotheses: [
          { hypothesis: '工作流执行失败', confidence: 100 }
        ],
        solution: 'manual_intervention',
        budgetAdjustment: { manualCost: 100 },
        expectedResult: '人工介入处理，24小时内解决'
      })
    } catch (error) {
      console.error('应急响应触发失败:', error.message)
    }
  }

  // 延迟函数
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // 获取工作流状态
  getWorkflowStatus() {
    const status = {}
    
    for (const [workflowId, schedule] of this.schedules) {
      status[workflowId] = {
        enabled: this.config[workflowId]?.enabled || false,
        schedule: this.config[workflowId]?.schedule || '',
        running: schedule.running || false,
        nextExecution: schedule.nextDate ? schedule.nextDate.toISOString() : null
      }
    }
    
    return status
  }

  // 更新工作流配置
  async updateWorkflowConfig(workflowId, newConfig) {
    try {
      // 更新配置
      this.config[workflowId] = { ...this.config[workflowId], ...newConfig }
      
      // 如果工作流正在运行，重启它
      if (this.schedules.has(workflowId)) {
        this.schedules.get(workflowId).destroy()
        this.schedules.delete(workflowId)
        
        if (newConfig.enabled) {
          const workflowHandlers = {
            dailyReport: this.handleDailyReport.bind(this),
            weeklyReport: this.handleWeeklyReport.bind(this),
            seoContent: this.handleSEOContent.bind(this),
            socialContent: this.handleSocialContent.bind(this),
            marketSignals: this.handleMarketSignals.bind(this),
            competitorMonitoring: this.handleCompetitorMonitoring.bind(this),
            costMonitoring: this.handleCostMonitoring.bind(this),
            emergencyResponse: this.handleEmergencyResponse.bind(this)
          }
          
          await this.startWorkflow(workflowId, this.config[workflowId], workflowHandlers[workflowId])
        }
      }
      
      console.log(`✅ 工作流 ${workflowId} 配置更新成功`)
      
    } catch (error) {
      console.error(`❌ 工作流 ${workflowId} 配置更新失败:`, error.message)
    }
  }
}

// 单例模式
const workflowConfigManager = new WorkflowConfigManager()

module.exports = { WorkflowConfigManager, workflowConfigManager }
