// 健康检查脚本
// scripts/health-check.js

const { systemInitializer } = require('../lib/config/index')

async function healthCheck() {
  console.log('🏥 AI营销中台健康检查')
  console.log('=' * 40)
  
  try {
    // 1. 检查环境变量
    console.log('🔍 检查环境变量...')
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'AIRTABLE_API_KEY',
      'AIRTABLE_BASE_ID',
      'CLAUDE_API_KEY'
    ]
    
    const missingVars = requiredVars.filter(varName => !process.env[varName])
    
    if (missingVars.length > 0) {
      console.log('❌ 缺少环境变量:', missingVars.join(', '))
      console.log('💡 请检查 .env.local 文件')
      return false
    }
    
    console.log('✅ 环境变量检查通过')
    
    // 2. 检查系统状态
    console.log('📊 检查系统状态...')
    const status = systemInitializer.getStatus()
    console.log('系统状态:', status)
    
    if (!status.initialized) {
      console.log('⚠️ 系统未初始化，正在初始化...')
      await systemInitializer.initialize()
    }
    
    console.log('✅ 系统状态检查通过')
    
    // 3. 检查数据库连接
    console.log('🔗 检查数据库连接...')
    const { SupabaseService } = require('../lib/supabase/supabase-config')
    
    try {
      const { data, error } = await SupabaseService.supabase
        .from('icp_details')
        .select('count')
        .limit(1)
      
      if (error) throw error
      console.log('✅ Supabase 连接正常')
    } catch (error) {
      console.log('❌ Supabase 连接失败:', error.message)
      return false
    }
    
    // 4. 检查 Airtable 连接
    console.log('🔗 检查 Airtable 连接...')
    const { AirtableService } = require('../lib/airtable/airtable-config')
    
    try {
      const clients = await AirtableService.getAllClients()
      console.log('✅ Airtable 连接正常')
    } catch (error) {
      console.log('❌ Airtable 连接失败:', error.message)
      return false
    }
    
    // 5. 检查模型网关
    console.log('🤖 检查模型网关...')
    const { modelGateway } = require('../lib/mal/model-gateway')
    
    try {
      const healthStatus = await modelGateway.healthCheck()
      const healthyModels = Object.values(healthStatus).flat().filter(model => 
        model.status === 'healthy'
      ).length
      
      if (healthyModels > 0) {
        console.log(`✅ 模型网关正常 (${healthyModels} 个模型可用)`)
      } else {
        console.log('⚠️ 没有可用的AI模型')
      }
    } catch (error) {
      console.log('❌ 模型网关检查失败:', error.message)
    }
    
    console.log('\n🎉 健康检查完成！')
    console.log('系统状态: 正常运行')
    
    return true
    
  } catch (error) {
    console.error('❌ 健康检查失败:', error.message)
    return false
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  healthCheck().catch(console.error)
}

module.exports = { healthCheck }


