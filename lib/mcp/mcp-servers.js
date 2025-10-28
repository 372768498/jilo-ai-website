// MCP 服务器配置
// lib/mcp/mcp-servers.js

import { SupabaseService } from '../supabase/supabase-config'
import { AirtableService } from '../airtable/airtable-config'

// MCP 1: 市场情报服务器
export class MarketIntelligenceServer {
  constructor() {
    this.dataSources = {
      googleTrends: process.env.GOOGLE_TRENDS_API_KEY,
      newsAPI: process.env.NEWS_API_KEY,
      linkedinScraper: process.env.LINKEDIN_SCRAPER_KEY,
      redditAPI: process.env.REDDIT_API_KEY,
      alibabaAPI: process.env.ALIBABA_API_KEY
    }
    this.isRunning = false
  }

  async start() {
    console.log('🚀 启动市场情报服务器...')
    this.isRunning = true
    
    // 每小时执行一次数据采集
    setInterval(async () => {
      if (this.isRunning) {
        await this.collectMarketSignals()
      }
    }, 60 * 60 * 1000) // 1小时

    // 立即执行一次
    await this.collectMarketSignals()
  }

  async stop() {
    console.log('⏹️ 停止市场情报服务器')
    this.isRunning = false
  }

  async collectMarketSignals() {
    try {
      console.log('📊 开始采集市场信号...')
      
      // 获取所有活跃客户
      const clients = await AirtableService.getAllClients()
      const activeClients = clients.filter(client => client['状态'] === 'active')
      
      for (const client of activeClients) {
        await this.collectClientSignals(client)
      }
      
      console.log('✅ 市场信号采集完成')
    } catch (error) {
      console.error('❌ 市场信号采集失败:', error)
    }
  }

  async collectClientSignals(client) {
    const clientId = client['客户ID']
    const industry = client['行业']
    const geo = client['GEO']
    
    try {
      // 1. Google Trends 监控
      const trendsSignals = await this.collectGoogleTrendsSignals(clientId, industry, geo)
      
      // 2. 新闻监控
      const newsSignals = await this.collectNewsSignals(clientId, industry, geo)
      
      // 3. LinkedIn 监控
      const linkedinSignals = await this.collectLinkedInSignals(clientId, industry, geo)
      
      // 4. Reddit 监控
      const redditSignals = await this.collectRedditSignals(clientId, industry, geo)
      
      // 5. Alibaba RFQ 监控（如果有）
      const alibabaSignals = await this.collectAlibabaSignals(clientId, industry, geo)
      
      // 合并所有信号
      const allSignals = [
        ...trendsSignals,
        ...newsSignals,
        ...linkedinSignals,
        ...redditSignals,
        ...alibabaSignals
      ]
      
      // 存储到 Supabase
      for (const signal of allSignals) {
        await SupabaseService.storeMarketSignal(signal)
      }
      
    } catch (error) {
      console.error(`客户 ${clientId} 信号采集失败:`, error)
    }
  }

  async collectGoogleTrendsSignals(clientId, industry, geo) {
    if (!this.dataSources.googleTrends) return []
    
    try {
      // 获取客户产品关键词
      const products = await AirtableService.getClientProducts(clientId)
      const keywords = products.map(p => p['产品名']).slice(0, 5) // 限制5个关键词
      
      const signals = []
      
      for (const keyword of keywords) {
        const response = await fetch(`https://trends.googleapis.com/trends/api/interestOverTime?q=${encodeURIComponent(keyword)}&geo=${geo}&time=now 7-d`, {
          headers: {
            'Authorization': `Bearer ${this.dataSources.googleTrends}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          const trendData = data.default?.timelineData || []
          
          if (trendData.length >= 2) {
            const latest = trendData[trendData.length - 1]
            const previous = trendData[trendData.length - 2]
            
            const growthRate = ((latest.value[0] - previous.value[0]) / previous.value[0]) * 100
            
            if (growthRate >= 20) { // 增长超过20%触发信号
              signals.push({
                signalId: `SIG_${Date.now()}_TRENDS_${keyword.replace(/\s+/g, '_')}`,
                type: 'demand_surge',
                industry: industry,
                geo: geo,
                data: {
                  trigger_event: `关键词 "${keyword}" 搜索量激增`,
                  keyword: keyword,
                  search_volume_7d: latest.value[0],
                  growth_rate: `+${growthRate.toFixed(1)}%`,
                  source: 'Google Trends'
                },
                confidence: Math.min(growthRate / 100, 1),
                urgency: growthRate >= 50 ? 'high' : 'medium'
              })
            }
          }
        }
      }
      
      return signals
    } catch (error) {
      console.error('Google Trends 采集失败:', error)
      return []
    }
  }

  async collectNewsSignals(clientId, industry, geo) {
    if (!this.dataSources.newsAPI) return []
    
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(industry)}&language=en&sortBy=publishedAt&pageSize=10`, {
        headers: {
          'X-API-Key': this.dataSources.newsAPI
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        const articles = data.articles || []
        
        const signals = []
        
        for (const article of articles) {
          // 使用 Claude 分析新闻对客户业务的影响
          const analysis = await this.analyzeNewsImpact(article, industry)
          
          if (analysis.impact > 0.3) { // 影响度超过30%
            signals.push({
              signalId: `SIG_${Date.now()}_NEWS_${article.url.split('/').pop()}`,
              type: 'policy_change',
              industry: industry,
              geo: geo,
              data: {
                trigger_event: article.title,
                source_url: article.url,
                published_at: article.publishedAt,
                impact_analysis: analysis.summary,
                relevance_score: analysis.impact
              },
              confidence: analysis.impact,
              urgency: analysis.impact >= 0.7 ? 'high' : 'medium'
            })
          }
        }
        
        return signals
      }
      
      return []
    } catch (error) {
      console.error('新闻采集失败:', error)
      return []
    }
  }

  async collectLinkedInSignals(clientId, industry, geo) {
    // LinkedIn 信号采集（需要 LinkedIn API 或第三方服务）
    // 这里使用模拟数据
    return []
  }

  async collectRedditSignals(clientId, industry, geo) {
    // Reddit 信号采集
    // 这里使用模拟数据
    return []
  }

  async collectAlibabaSignals(clientId, industry, geo) {
    // Alibaba RFQ 监控
    // 这里使用模拟数据
    return []
  }

  async analyzeNewsImpact(article, industry) {
    // 使用 Claude 分析新闻影响
    try {
      const prompt = `
分析以下新闻对${industry}行业的影响：

标题: ${article.title}
内容: ${article.description}
发布时间: ${article.publishedAt}

请评估：
1. 对行业的影响程度（0-1分）
2. 影响类型（正面/负面/中性）
3. 影响摘要（2-3句话）

返回JSON格式：
{
  "impact": 0.7,
  "type": "positive",
  "summary": "影响摘要"
}
      `
      
      // 这里应该调用 Claude API
      // 暂时返回模拟数据
      return {
        impact: 0.5,
        type: 'neutral',
        summary: '新闻对行业有中等影响'
      }
    } catch (error) {
      console.error('新闻影响分析失败:', error)
      return { impact: 0, type: 'neutral', summary: '分析失败' }
    }
  }
}

// MCP 2: 客户能力服务器
export class CustomerCapabilityServer {
  constructor() {
    this.capabilities = new Map()
  }

  async getClientCapabilities(clientId) {
    try {
      // 先从缓存获取
      if (this.capabilities.has(clientId)) {
        return this.capabilities.get(clientId)
      }
      
      // 从 Supabase 获取
      const capabilities = await SupabaseService.getClientCapabilities(clientId)
      
      // 缓存结果
      this.capabilities.set(clientId, capabilities)
      
      return capabilities
    } catch (error) {
      console.error(`获取客户 ${clientId} 能力失败:`, error)
      return null
    }
  }

  async updateClientCapabilities(clientId, capabilities) {
    try {
      await SupabaseService.updateClientCapabilities(clientId, capabilities)
      
      // 更新缓存
      this.capabilities.set(clientId, capabilities)
      
      return true
    } catch (error) {
      console.error(`更新客户 ${clientId} 能力失败:`, error)
      return false
    }
  }

  async validateCapabilityClaim(clientId, claim) {
    const capabilities = await this.getClientCapabilities(clientId)
    if (!capabilities) return false
    
    // 验证声明是否与客户能力匹配
    // 例如：客户声称"30天交期"，但能力清单显示"45天交期"
    return this._validateClaim(capabilities, claim)
  }

  _validateClaim(capabilities, claim) {
    // 简化的验证逻辑
    // 实际实现需要更复杂的匹配算法
    return true
  }
}

// MCP 3: 竞品监控服务器
export class CompetitorMonitoringServer {
  constructor() {
    this.monitoringInterval = 24 * 60 * 60 * 1000 // 24小时
    this.isRunning = false
  }

  async start() {
    console.log('🔍 启动竞品监控服务器...')
    this.isRunning = true
    
    // 每24小时执行一次竞品监控
    setInterval(async () => {
      if (this.isRunning) {
        await this.monitorAllCompetitors()
      }
    }, this.monitoringInterval)
    
    // 立即执行一次
    await this.monitorAllCompetitors()
  }

  async stop() {
    console.log('⏹️ 停止竞品监控服务器')
    this.isRunning = false
  }

  async monitorAllCompetitors() {
    try {
      console.log('🔍 开始竞品监控...')
      
      const clients = await AirtableService.getAllClients()
      
      for (const client of clients) {
        if (client['状态'] === 'active') {
          await this.monitorClientCompetitors(client['客户ID'])
        }
      }
      
      console.log('✅ 竞品监控完成')
    } catch (error) {
      console.error('❌ 竞品监控失败:', error)
    }
  }

  async monitorClientCompetitors(clientId) {
    try {
      const competitors = await AirtableService.getClientCompetitors(clientId)
      
      for (const competitor of competitors) {
        await this.monitorCompetitor(competitor)
      }
    } catch (error) {
      console.error(`客户 ${clientId} 竞品监控失败:`, error)
    }
  }

  async monitorCompetitor(competitor) {
    try {
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
      
    } catch (error) {
      console.error(`竞品 ${competitor['竞品名称']} 监控失败:`, error)
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
      console.error('更新竞品数据失败:', error)
    }
  }
}

// MCP 服务器管理器
export class MCPServerManager {
  constructor() {
    this.servers = {
      marketIntelligence: new MarketIntelligenceServer(),
      customerCapability: new CustomerCapabilityServer(),
      competitorMonitoring: new CompetitorMonitoringServer()
    }
    this.isRunning = false
  }

  async startAll() {
    console.log('🚀 启动所有 MCP 服务器...')
    this.isRunning = true
    
    try {
      await this.servers.marketIntelligence.start()
      await this.servers.competitorMonitoring.start()
      
      console.log('✅ 所有 MCP 服务器启动成功')
    } catch (error) {
      console.error('❌ MCP 服务器启动失败:', error)
    }
  }

  async stopAll() {
    console.log('⏹️ 停止所有 MCP 服务器...')
    this.isRunning = false
    
    try {
      await this.servers.marketIntelligence.stop()
      await this.servers.competitorMonitoring.stop()
      
      console.log('✅ 所有 MCP 服务器已停止')
    } catch (error) {
      console.error('❌ MCP 服务器停止失败:', error)
    }
  }

  async getServerStatus() {
    return {
      marketIntelligence: this.servers.marketIntelligence.isRunning,
      customerCapability: true, // 静态服务
      competitorMonitoring: this.servers.competitorMonitoring.isRunning,
      overall: this.isRunning
    }
  }
}

// 单例模式
export const mcpServerManager = new MCPServerManager()

export default MCPServerManager

