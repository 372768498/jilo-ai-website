// 测试客户数据创建脚本
// scripts/create-test-client.js

const { AirtableService } = require('../lib/airtable/airtable-config')
const { SupabaseService } = require('../lib/supabase/supabase-config')
const { modelGateway } = require('../lib/mal/model-gateway')

class TestClientCreator {
  constructor() {
    this.testClientId = 'test-client-' + Date.now()
  }

  async createTestClient() {
    console.log('👤 创建测试客户...')
    console.log('=' * 40)
    
    try {
      // 1. 创建客户基础信息
      const client = await this.createClient()
      
      // 2. 创建产品信息
      const products = await this.createProducts()
      
      // 3. 创建ICP画像
      const personas = await this.createPersonas()
      
      // 4. 创建竞品信息
      const competitors = await this.createCompetitors()
      
      // 5. 同步到Supabase
      await this.syncToSupabase()
      
      // 6. 测试内容生成
      await this.testContentGeneration()
      
      console.log('\n✅ 测试客户创建完成！')
      console.log(`客户ID: ${this.testClientId}`)
      
      return {
        clientId: this.testClientId,
        client: client,
        products: products,
        personas: personas,
        competitors: competitors
      }
      
    } catch (error) {
      console.error('❌ 测试客户创建失败:', error.message)
      throw error
    }
  }

  async createClient() {
    console.log('📝 创建客户基础信息...')
    
    const clientData = {
      clientId: this.testClientId,
      companyName: '测试机械制造公司',
      industry: '机械制造',
      geo: '美国',
      serviceLevel: '青铜包',
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
      contactPerson: '张经理',
      email: 'test@example.com',
      phone: '+86-138-0000-0000',
      targetMarkets: '美国, 欧洲, 东南亚',
      annualRevenue: '5000万人民币',
      employeeCount: '200人'
    }
    
    const client = await AirtableService.createClient(clientData)
    console.log('✅ 客户信息创建成功')
    
    return client
  }

  async createProducts() {
    console.log('📦 创建产品信息...')
    
    const products = [
      {
        productId: 'PROD-001',
        productName: '工业泵',
        sku: 'PUMP-001',
        usp: '高效节能，使用寿命长',
        targetMarkets: '美国, 欧洲',
        forbiddenWords: '便宜, 低价, 山寨',
        certifications: 'ISO 9001, CE认证',
        priceRange: '$500-2000',
        moq: '10台',
        deliveryTime: '30天',
        specialCapabilities: '定制化设计, 快速交付'
      },
      {
        productId: 'PROD-002',
        productName: '阀门',
        sku: 'VALVE-001',
        usp: '耐高压，密封性好',
        targetMarkets: '美国, 欧洲',
        forbiddenWords: '便宜, 低价',
        certifications: 'ISO 9001, CE认证',
        priceRange: '$100-500',
        moq: '50个',
        deliveryTime: '20天',
        specialCapabilities: '多种规格, 批量生产'
      }
    ]
    
    const createdProducts = []
    for (const productData of products) {
      const product = await AirtableService.createProduct(this.testClientId, productData)
      createdProducts.push(product)
    }
    
    console.log(`✅ 创建了 ${createdProducts.length} 个产品`)
    return createdProducts
  }

  async createPersonas() {
    console.log('👥 创建ICP画像...')
    
    const personas = [
      {
        roleId: 'ICP-001',
        roleName: '采购经理',
        seniorityLevel: '中级',
        department: '采购部',
        decisionWeight: 40,
        keyPainPoints: '价格敏感, 交期要求严格, 质量要求高',
        commonObjections: '价格太高, 交期太长, 质量不确定',
        verificationStatus: 'verified'
      },
      {
        roleId: 'ICP-002',
        roleName: '技术工程师',
        seniorityLevel: '高级',
        department: '技术部',
        decisionWeight: 30,
        keyPainPoints: '技术参数匹配, 集成难度, 维护便利性',
        commonObjections: '技术文档不够详细, 集成复杂, 维护困难',
        verificationStatus: 'verified'
      },
      {
        roleId: 'ICP-003',
        roleName: '运营总监',
        seniorityLevel: '高级',
        department: '运营部',
        decisionWeight: 30,
        keyPainPoints: '供应商稳定性, 长期合作, 风险控制',
        commonObjections: '供应商规模小, 合作历史短, 风险较高',
        verificationStatus: 'pending'
      }
    ]
    
    const createdPersonas = []
    for (const personaData of personas) {
      const persona = await AirtableService.createPersona(this.testClientId, personaData)
      createdPersonas.push(persona)
    }
    
    console.log(`✅ 创建了 ${createdPersonas.length} 个ICP画像`)
    return createdPersonas
  }

  async createCompetitors() {
    console.log('🏢 创建竞品信息...')
    
    const competitors = [
      {
        competitorId: 'COMP-001',
        competitorName: '竞品A',
        domain: 'competitor-a.com',
        monitoringMetrics: '月访问量, 域名评分, 反链数',
        monthlyVisits: '50000',
        domainRating: '75',
        backlinks: '5000',
        strategyTips: '分析其SEO策略，加强内容营销'
      },
      {
        competitorId: 'COMP-002',
        competitorName: '竞品B',
        domain: 'competitor-b.com',
        monitoringMetrics: '月访问量, 域名评分, 反链数',
        monthlyVisits: '30000',
        domainRating: '65',
        backlinks: '3000',
        strategyTips: '关注其产品更新，优化差异化定位'
      }
    ]
    
    const createdCompetitors = []
    for (const competitorData of competitors) {
      const competitor = await AirtableService.addCompetitor(this.testClientId, competitorData)
      createdCompetitors.push(competitor)
    }
    
    console.log(`✅ 创建了 ${createdCompetitors.length} 个竞品`)
    return createdCompetitors
  }

  async syncToSupabase() {
    console.log('🔄 同步数据到Supabase...')
    
    try {
      // 同步客户能力清单
      await SupabaseService.updateClientCapabilities(this.testClientId, {
        products: [
          {
            name: '工业泵',
            sku: 'PUMP-001',
            usp: '高效节能，使用寿命长',
            certifications: ['ISO 9001', 'CE认证'],
            priceRange: '$500-2000',
            moq: '10台',
            deliveryTime: '30天',
            specialCapabilities: ['定制化设计', '快速交付']
          },
          {
            name: '阀门',
            sku: 'VALVE-001',
            usp: '耐高压，密封性好',
            certifications: ['ISO 9001', 'CE认证'],
            priceRange: '$100-500',
            moq: '50个',
            deliveryTime: '20天',
            specialCapabilities: ['多种规格', '批量生产']
          }
        ],
        capacity: {
          monthlyProduction: 1000,
          inventory: 500,
          deliveryTime: '30天'
        },
        markets: ['美国', '欧洲', '东南亚'],
        advantages: ['质量稳定', '交期准时', '价格合理'],
        constraints: {
          moq: 10,
          paymentTerms: 'T/T'
        },
        certifications: ['ISO 9001', 'CE认证'],
        specialCapabilities: ['定制化设计', '快速交付', '批量生产']
      })
      
      console.log('✅ 数据同步到Supabase成功')
      
    } catch (error) {
      console.error('❌ 数据同步失败:', error.message)
    }
  }

  async testContentGeneration() {
    console.log('📝 测试内容生成...')
    
    try {
      // 测试日报生成
      const dailyReportPrompt = `
生成一份每日行业洞察报告：

客户信息：
- 公司：测试机械制造公司
- 行业：机械制造
- 地区：美国

今日市场信号：
- 美国制造业PMI指数上升
- 工业泵需求增长15%
- 新环保政策影响

请生成包含以下部分的报告：
1. 今日要闻（3-5条重要新闻）
2. 对我们的影响（1-2段分析）
3. 建议下一步（A/B两个方案）

要求：总字数300-500词，专业且实用。
      `
      
      const reportResult = await modelGateway.generateText(dailyReportPrompt, this.testClientId)
      
      if (reportResult.success) {
        console.log('✅ 日报生成测试成功')
        console.log(`📄 生成内容预览: ${reportResult.data.substring(0, 200)}...`)
        
        // 添加到内容队列
        await AirtableService.addToContentQueue({
          contentId: `TEST_DAILY_${this.testClientId}_${Date.now()}`,
          clientId: this.testClientId,
          type: '日报',
          title: '测试日报 - 机械制造行业洞察',
          content: reportResult.data,
          status: 'AI预审中',
          publishAt: new Date().toISOString()
        })
        
        console.log('✅ 内容已添加到队列')
      } else {
        console.log('❌ 日报生成测试失败')
      }
      
    } catch (error) {
      console.error('❌ 内容生成测试失败:', error.message)
    }
  }

  async cleanup() {
    console.log('🧹 清理测试数据...')
    
    try {
      // 清理 Airtable 数据
      // 注意：这里需要根据实际的 Airtable 表结构来清理
      
      // 清理 Supabase 数据
      await SupabaseService.supabase
        .from('icp_details')
        .delete()
        .eq('client_id', this.testClientId)
      
      await SupabaseService.supabase
        .from('client_capabilities')
        .delete()
        .eq('client_id', this.testClientId)
      
      console.log('✅ 测试数据清理完成')
      
    } catch (error) {
      console.log('⚠️ 测试数据清理失败:', error.message)
    }
  }
}

// 运行测试客户创建
async function createTestClient() {
  const creator = new TestClientCreator()
  
  try {
    const result = await creator.createTestClient()
    
    console.log('\n🎉 测试客户创建成功！')
    console.log('📊 创建的数据:')
    console.log(`- 客户: ${result.client['公司名']}`)
    console.log(`- 产品: ${result.products.length} 个`)
    console.log(`- ICP画像: ${result.personas.length} 个`)
    console.log(`- 竞品: ${result.competitors.length} 个`)
    
    // 询问是否清理测试数据
    console.log('\n💡 测试完成后，可以运行以下命令清理数据:')
    console.log('node scripts/cleanup-test-data.js')
    
    return result
    
  } catch (error) {
    console.error('❌ 测试客户创建失败:', error.message)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  createTestClient().catch(console.error)
}

module.exports = { TestClientCreator, createTestClient }


