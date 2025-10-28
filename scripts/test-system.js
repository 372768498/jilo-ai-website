// 系统测试脚本
// scripts/test-system.js

const { systemInitializer, systemMonitor } = require('../lib/config/index')
const { SupabaseService } = require('../lib/supabase/supabase-config')
const { AirtableService } = require('../lib/airtable/airtable-config')
const { modelGateway } = require('../lib/mal/model-gateway')

class SystemTester {
  constructor() {
    this.testResults = {
      environment: false,
      supabase: false,
      airtable: false,
      modelGateway: false,
      workflows: false,
      overall: false
    }
  }

  async runAllTests() {
    console.log('🧪 开始系统测试...')
    console.log('=' * 50)
    
    try {
      // 1. 环境变量测试
      await this.testEnvironment()
      
      // 2. Supabase 连接测试
      await this.testSupabase()
      
      // 3. Airtable 连接测试
      await this.testAirtable()
      
      // 4. 模型网关测试
      await this.testModelGateway()
      
      // 5. 工作流测试
      await this.testWorkflows()
      
      // 6. 集成测试
      await this.testIntegration()
      
      // 输出测试结果
      this.printTestResults()
      
    } catch (error) {
      console.error('❌ 测试过程中发生错误:', error)
      this.printTestResults()
    }
  }

  async testEnvironment() {
    console.log('🔍 测试环境变量...')
    
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'AIRTABLE_API_KEY',
      'AIRTABLE_BASE_ID',
      'CLAUDE_API_KEY'
    ]
    
    const missingVars = requiredVars.filter(varName => !process.env[varName])
    
    if (missingVars.length === 0) {
      console.log('✅ 环境变量配置完整')
      this.testResults.environment = true
    } else {
      console.log('❌ 缺少环境变量:', missingVars.join(', '))
      console.log('💡 请检查 .env.local 文件配置')
    }
  }

  async testSupabase() {
    console.log('🔗 测试 Supabase 连接...')
    
    try {
      // 测试基本连接
      const { data, error } = await SupabaseService.supabase
        .from('icp_details')
        .select('count')
        .limit(1)
      
      if (error) {
        console.log('❌ Supabase 连接失败:', error.message)
        return
      }
      
      // 测试插入数据
      const testData = {
        client_id: 'test-client-001',
        role_name: '测试角色',
        department: '测试部门',
        seniority_level: '中级',
        key_pain_points: ['测试痛点1', '测试痛点2'],
        decision_weight: 50,
        common_objections: ['测试异议1'],
        verification_status: 'pending'
      }
      
      const insertResult = await SupabaseService.createICPDetail('test-client-001', testData)
      
      if (insertResult) {
        console.log('✅ Supabase 连接和写入测试通过')
        this.testResults.supabase = true
        
        // 清理测试数据
        await SupabaseService.supabase
          .from('icp_details')
          .delete()
          .eq('client_id', 'test-client-001')
      }
      
    } catch (error) {
      console.log('❌ Supabase 测试失败:', error.message)
    }
  }

  async testAirtable() {
    console.log('🔗 测试 Airtable 连接...')
    
    try {
      // 测试获取客户列表
      const clients = await AirtableService.getAllClients()
      
      if (Array.isArray(clients)) {
        console.log('✅ Airtable 连接测试通过')
        this.testResults.airtable = true
      } else {
        console.log('❌ Airtable 返回数据格式错误')
      }
      
    } catch (error) {
      console.log('❌ Airtable 测试失败:', error.message)
      console.log('💡 请检查 AIRTABLE_API_KEY 和 AIRTABLE_BASE_ID 配置')
    }
  }

  async testModelGateway() {
    console.log('🤖 测试模型网关...')
    
    try {
      // 健康检查
      const healthStatus = await modelGateway.healthCheck()
      
      const healthyModels = Object.values(healthStatus).flat().filter(model => 
        model.status === 'healthy'
      ).length
      
      const totalModels = Object.values(healthStatus).flat().length
      
      if (healthyModels > 0) {
        console.log(`✅ 模型网关测试通过 (${healthyModels}/${totalModels} 个模型可用)`)
        this.testResults.modelGateway = true
        
        // 测试文本生成
        await this.testTextGeneration()
      } else {
        console.log('❌ 没有可用的AI模型')
        console.log('💡 请检查 Claude API Key 配置')
      }
      
    } catch (error) {
      console.log('❌ 模型网关测试失败:', error.message)
    }
  }

  async testTextGeneration() {
    console.log('📝 测试文本生成...')
    
    try {
      const result = await modelGateway.generateText(
        '请用一句话介绍AI营销中台的价值',
        'test-client-001'
      )
      
      if (result.success && result.data) {
        console.log('✅ 文本生成测试通过')
        console.log(`📄 生成内容: ${result.data.substring(0, 100)}...`)
      } else {
        console.log('❌ 文本生成失败')
      }
      
    } catch (error) {
      console.log('❌ 文本生成测试失败:', error.message)
    }
  }

  async testWorkflows() {
    console.log('🔄 测试工作流引擎...')
    
    try {
      // 初始化工作流
      await systemInitializer.initialize()
      
      console.log('✅ 工作流引擎测试通过')
      this.testResults.workflows = true
      
    } catch (error) {
      console.log('❌ 工作流引擎测试失败:', error.message)
    }
  }

  async testIntegration() {
    console.log('🔗 测试系统集成...')
    
    try {
      // 测试完整的数据流
      const testClient = {
        clientId: 'integration-test-001',
        companyName: '测试公司',
        industry: '机械制造',
        geo: '美国',
        serviceLevel: '青铜包',
        status: 'active'
      }
      
      // 1. 创建客户
      const client = await AirtableService.createClient(testClient)
      
      // 2. 创建产品
      const product = await AirtableService.createProduct(testClient.clientId, {
        productId: 'PROD-001',
        productName: '测试产品',
        sku: 'TEST-SKU-001',
        usp: '高质量测试产品',
        targetMarkets: ['美国', '欧洲'],
        forbiddenWords: ['便宜', '低价']
      })
      
      // 3. 创建ICP画像
      const icp = await AirtableService.createPersona(testClient.clientId, {
        roleId: 'ICP-001',
        roleName: '采购经理',
        seniorityLevel: '中级',
        department: '采购部',
        decisionWeight: 40,
        keyPainPoints: ['价格敏感', '交期要求'],
        commonObjections: ['价格太高', '交期太长']
      })
      
      // 4. 同步到 Supabase
      const syncResult = await AirtableService.syncClientData(testClient.clientId)
      
      if (syncResult.success) {
        console.log('✅ 系统集成测试通过')
        this.testResults.overall = true
        
        // 清理测试数据
        await this.cleanupTestData(testClient.clientId)
      } else {
        console.log('❌ 数据同步失败:', syncResult.message)
      }
      
    } catch (error) {
      console.log('❌ 系统集成测试失败:', error.message)
    }
  }

  async cleanupTestData(clientId) {
    console.log('🧹 清理测试数据...')
    
    try {
      // 清理 Airtable 数据
      // 注意：这里需要根据实际的 Airtable 表结构来清理
      
      // 清理 Supabase 数据
      await SupabaseService.supabase
        .from('icp_details')
        .delete()
        .eq('client_id', clientId)
      
      await SupabaseService.supabase
        .from('client_capabilities')
        .delete()
        .eq('client_id', clientId)
      
      console.log('✅ 测试数据清理完成')
      
    } catch (error) {
      console.log('⚠️ 测试数据清理失败:', error.message)
    }
  }

  printTestResults() {
    console.log('\n' + '=' * 50)
    console.log('📊 测试结果汇总')
    console.log('=' * 50)
    
    const tests = [
      { name: '环境变量', result: this.testResults.environment },
      { name: 'Supabase', result: this.testResults.supabase },
      { name: 'Airtable', result: this.testResults.airtable },
      { name: '模型网关', result: this.testResults.modelGateway },
      { name: '工作流引擎', result: this.testResults.workflows },
      { name: '系统集成', result: this.testResults.overall }
    ]
    
    tests.forEach(test => {
      const status = test.result ? '✅ 通过' : '❌ 失败'
      console.log(`${test.name}: ${status}`)
    })
    
    const passedTests = Object.values(this.testResults).filter(Boolean).length
    const totalTests = Object.keys(this.testResults).length
    
    console.log('\n📈 总体结果:')
    console.log(`通过: ${passedTests}/${totalTests}`)
    
    if (passedTests === totalTests) {
      console.log('🎉 所有测试通过！系统可以正常使用。')
    } else {
      console.log('⚠️ 部分测试失败，请检查配置后重试。')
      console.log('\n💡 常见问题解决方案:')
      console.log('1. 检查 .env.local 文件中的API密钥配置')
      console.log('2. 确认 Supabase 项目已创建并执行了 SQL 脚本')
      console.log('3. 确认 Airtable Base 已创建并配置了表结构')
      console.log('4. 检查网络连接和API服务状态')
    }
  }
}

// 运行测试
async function runTests() {
  const tester = new SystemTester()
  await tester.runAllTests()
}

// 如果直接运行此脚本
if (require.main === module) {
  runTests().catch(console.error)
}

module.exports = { SystemTester, runTests }


