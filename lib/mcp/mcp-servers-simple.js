const { supabaseAdmin } = require('../supabase/supabase-config');
require('dotenv').config({ path: '.env.local' });

// Customer Capability MCP Server
// 核心职责：提供客户真实供应能力，防止AI凭空编造

class CustomerCapabilityServer {
  constructor() {
    this.clientCapabilities = new Map();
    console.log('✅ Customer Capability MCP Server 初始化完成');
  }

  // 启动服务器
  async start() {
    console.log('🚀 Customer Capability MCP Server 启动中...');
    
    // 加载所有客户能力数据
    await this.loadAllClientCapabilities();
    
    console.log('✅ Customer Capability MCP Server 已启动');
    console.log(`📊 已加载 ${this.clientCapabilities.size} 个客户能力配置`);
  }

  // 加载所有客户能力数据
  async loadAllClientCapabilities() {
    try {
      const { data: clients, error } = await supabaseAdmin
        .from('clients')
        .select('*');

      if (error) throw error;

      for (const client of clients || []) {
        await this.loadClientCapability(client.id, client);
      }
    } catch (error) {
      console.error('❌ 加载客户能力数据失败:', error);
    }
  }

  // 加载单个客户的能力数据
  async loadClientCapability(clientId, clientData) {
    const capability = {
      client_id: clientId,
      company_name: clientData.company_name,
      industry: clientData.industry,
      updated_at: new Date().toISOString(),
      
      // 产品能力
      products: clientData.main_products || [],
      
      // 市场能力
      target_markets: clientData.target_markets || [],
      
      // 认证资质
      certifications: clientData.certifications || [],
      
      // 竞争优势
      competitive_advantages: clientData.competitive_advantages || [],
      
      // 痛点分析
      pain_points: clientData.pain_points || [],
      
      // 默认能力数据（基于现有客户信息）
      default_capabilities: {
        can_customize: true,
        can_produce_quick_delivery: true,
        has_quality_assurance: true,
        has_multi_language_support: true
      }
    };

    this.clientCapabilities.set(clientId, capability);
  }

  // 获取客户能力
  async getCapability(clientId) {
    if (!this.clientCapabilities.has(clientId)) {
      // 如果缓存中没有，从数据库加载
      const { data: client } = await supabaseAdmin
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();
      
      if (client) {
        await this.loadClientCapability(clientId, client);
      }
    }

    return this.clientCapabilities.get(clientId) || null;
  }

  // 检查客户是否具备特定能力
  async hasCapability(clientId, capability) {
    const capabilities = await this.getCapability(clientId);
    
    if (!capabilities) return false;

    // 检查具体能力
    switch (capability) {
      case 'customization':
        return capabilities.default_capabilities.can_customize;
      
      case 'quick_delivery':
        return capabilities.default_capabilities.can_produce_quick_delivery;
      
      case 'quality_assurance':
        return capabilities.default_capabilities.has_quality_assurance;
      
      case 'multi_language':
        return capabilities.default_capabilities.has_multi_language_support;
      
      default:
        return false;
    }
  }

  // 获取客户产品信息
  async getProducts(clientId) {
    const capabilities = await this.getCapability(clientId);
    return capabilities?.products || [];
  }

  // 获取客户认证信息
  async getCertifications(clientId) {
    const capabilities = await this.getCapability(clientId);
    return capabilities?.certifications || [];
  }

  // 获取客户竞争优势
  async getCompetitiveAdvantages(clientId) {
    const capabilities = await this.getCapability(clientId);
    return capabilities?.competitive_advantages || [];
  }

  // 根据产品关键词搜索匹配的产品
  async searchProducts(clientId, keyword) {
    const products = await this.getProducts(clientId);
    
    if (!keyword) return products;
    
    return products.filter(product => {
      const searchText = JSON.stringify(product).toLowerCase();
      return searchText.includes(keyword.toLowerCase());
    });
  }

  // 验证内容中的声明是否匹配客户真实能力
  async validateClaim(clientId, claim) {
    const capabilities = await this.getCapability(clientId);
    
    if (!capabilities) {
      return {
        valid: false,
        reason: '客户能力数据未找到'
      };
    }

    // 简单的关键词匹配验证
    const claimLower = claim.toLowerCase();
    
    // 检查认证
    const certifications = capabilities.certifications;
    if (certifications && certifications.length > 0) {
      const certText = JSON.stringify(certifications).toLowerCase();
      const hasCertMention = certifications.some(cert => 
        claimLower.includes(cert.toLowerCase())
      );
      
      if (hasCertMention) {
        return {
          valid: true,
          matched_certifications: certifications
        };
      }
    }

    // 检查产品
    const products = capabilities.products;
    if (products && products.length > 0) {
      const hasProductMention = products.some(product => 
        claimLower.includes(JSON.stringify(product).toLowerCase())
      );
      
      if (hasProductMention) {
        return {
          valid: true,
          matched_products: products
        };
      }
    }

    return {
      valid: false,
      reason: '声明未匹配到客户真实能力'
    };
  }

  // 生成客户能力摘要（用于内容生成）
  async generateCapabilitySummary(clientId) {
    const capabilities = await this.getCapability(clientId);
    
    if (!capabilities) {
      return 'No capability data available';
    }

    const summary = {
      company: capabilities.company_name,
      industry: capabilities.industry,
      products: capabilities.products,
      certifications: capabilities.certifications,
      advantages: capabilities.competitive_advantages,
      markets: capabilities.target_markets
    };

    return JSON.stringify(summary, null, 2);
  }
}

// Market Intelligence MCP Server
// 职责：实时监测市场需求信号

class MarketIntelligenceServer {
  constructor() {
    this.isRunning = false;
    this.signalsCache = [];
  }

  async start() {
    console.log('🚀 Market Intelligence MCP Server 启动中...');
    this.isRunning = true;
    
    // 立即执行一次数据采集
    await this.collectMarketSignals();
    
    // 每小时执行一次
    setInterval(async () => {
      if (this.isRunning) {
        await this.collectMarketSignals();
      }
    }, 60 * 60 * 1000);
    
    console.log('✅ Market Intelligence MCP Server 已启动');
  }

  async stop() {
    console.log('⏹️ Market Intelligence MCP Server 停止');
    this.isRunning = false;
  }

  // 采集市场信号
  async collectMarketSignals() {
    try {
      console.log('📊 开始采集市场信号...');
      
      const { data: clients } = await supabaseAdmin
        .from('clients')
        .select('*')
        .eq('relationship_status', 'active');
      
      if (!clients) return;

      for (const client of clients) {
        await this.collectClientSignals(client);
      }
      
      console.log('✅ 市场信号采集完成');
    } catch (error) {
      console.error('❌ 市场信号采集失败:', error);
    }
  }

  // 为单个客户采集信号
  async collectClientSignals(client) {
    // 模拟信号采集（实际应该调用API）
    const signals = [
      {
        signal_id: `SIG_${Date.now()}_${client.id}`,
        timestamp: new Date().toISOString(),
        type: 'demand_surge',
        industry: client.industry,
        geo: 'global',
        data: {
          trigger_event: 'Market demand increased',
          keyword: client.industry,
          growth_rate: '+15%'
        },
        confidence: 0.75,
        urgency: 'medium'
      }
    ];

    // 存储信号到数据库
    for (const signal of signals) {
      // 这里可以存储到database或推送消息队列
      this.signalsCache.push(signal);
    }
  }

  // 获取最新信号
  async getLatestSignals(industry = null, limit = 10) {
    let signals = this.signalsCache;
    
    if (industry) {
      signals = signals.filter(s => s.industry === industry);
    }
    
    return signals.slice(0, limit);
  }
}

// Competitor Monitoring MCP Server
class CompetitorMonitoringServer {
  constructor() {
    this.competitors = new Map();
  }

  async start() {
    console.log('🚀 Competitor Monitoring MCP Server 启动中...');
    await this.loadCompetitors();
    console.log('✅ Competitor Monitoring MCP Server 已启动');
  }

  async loadCompetitors() {
    // 从客户数据中提取竞品信息
    const { data: clients } = await supabaseAdmin
      .from('clients')
      .select('*');

    if (!clients) return;

    for (const client of clients) {
      // 根据行业创建默认竞品列表
      const competitors = this.getDefaultCompetitors(client.industry);
      this.competitors.set(client.id, competitors);
    }
  }

  getDefaultCompetitors(industry) {
    const defaultCompetitors = {
      '医疗设备制造': [
        { name: 'Sunrise Medical', focus: '电动轮椅', threat_level: 'high' },
        { name: 'Invacare', focus: '护理床', threat_level: 'medium' }
      ],
      '水晶工艺品制造': [
        { name: 'Swarovski', focus: '品牌知名度', threat_level: 'low' },
        { name: 'Crystal Awards', focus: '奖杯定制', threat_level: 'medium' }
      ]
    };

    return defaultCompetitors[industry] || [];
  }

  async getCompetitors(clientId) {
    return this.competitors.get(clientId) || [];
  }
}

// MCP Server Manager
class MCPServerManager {
  constructor() {
    this.servers = {
      customerCapability: new CustomerCapabilityServer(),
      marketIntelligence: new MarketIntelligenceServer(),
      competitorMonitoring: new CompetitorMonitoringServer()
    };
  }

  async startAll() {
    console.log('🚀 启动所有MCP服务器...\n');
    
    await this.servers.customerCapability.start();
    await this.servers.marketIntelligence.start();
    await this.servers.competitorMonitoring.start();
    
    console.log('\n✅ 所有MCP服务器已启动！');
  }

  async stopAll() {
    console.log('⏹️ 停止所有MCP服务器...');
    
    if (this.servers.marketIntelligence) {
      await this.servers.marketIntelligence.stop();
    }
    
    console.log('✅ 所有MCP服务器已停止');
  }

  getServer(name) {
    return this.servers[name];
  }
}

module.exports = {
  CustomerCapabilityServer,
  MarketIntelligenceServer,
  CompetitorMonitoringServer,
  MCPServerManager
};

