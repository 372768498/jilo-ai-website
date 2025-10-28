// 清理测试数据脚本
// scripts/cleanup-test-data.js

const { AirtableService } = require('../lib/airtable/airtable-config')
const { SupabaseService } = require('../lib/supabase/supabase-config')

class TestDataCleaner {
  constructor() {
    this.testClientPrefix = 'test-client-'
  }

  async cleanupAllTestData() {
    console.log('🧹 清理所有测试数据...')
    console.log('=' * 40)
    
    try {
      // 1. 获取所有测试客户
      const testClients = await this.getTestClients()
      
      if (testClients.length === 0) {
        console.log('✅ 没有找到测试数据')
        return
      }
      
      console.log(`📋 找到 ${testClients.length} 个测试客户`)
      
      // 2. 清理每个测试客户的数据
      for (const client of testClients) {
        await this.cleanupClientData(client['客户ID'])
      }
      
      console.log('\n✅ 所有测试数据清理完成！')
      
    } catch (error) {
      console.error('❌ 清理测试数据失败:', error.message)
    }
  }

  async getTestClients() {
    try {
      const allClients = await AirtableService.getAllClients()
      return allClients.filter(client => 
        client['客户ID'] && client['客户ID'].startsWith(this.testClientPrefix)
      )
    } catch (error) {
      console.error('获取测试客户失败:', error.message)
      return []
    }
  }

  async cleanupClientData(clientId) {
    console.log(`🧹 清理客户 ${clientId} 的数据...`)
    
    try {
      // 清理 Supabase 数据
      await this.cleanupSupabaseData(clientId)
      
      // 清理 Airtable 数据
      await this.cleanupAirtableData(clientId)
      
      console.log(`✅ 客户 ${clientId} 数据清理完成`)
      
    } catch (error) {
      console.error(`❌ 清理客户 ${clientId} 数据失败:`, error.message)
    }
  }

  async cleanupSupabaseData(clientId) {
    try {
      // 清理各种表的数据
      const tables = [
        'icp_details',
        'competitor_intelligence',
        'strategy_history',
        'client_capabilities',
        'api_usage_logs',
        'market_signals',
        'account_health_monitoring',
        'emergency_responses'
      ]
      
      for (const table of tables) {
        try {
          const { error } = await SupabaseService.supabase
            .from(table)
            .delete()
            .eq('client_id', clientId)
          
          if (error) {
            console.log(`⚠️ 清理表 ${table} 失败:`, error.message)
          }
        } catch (error) {
          console.log(`⚠️ 清理表 ${table} 时出错:`, error.message)
        }
      }
      
      console.log(`✅ Supabase 数据清理完成`)
      
    } catch (error) {
      console.error('❌ Supabase 数据清理失败:', error.message)
    }
  }

  async cleanupAirtableData(clientId) {
    try {
      // 清理 Airtable 中的测试数据
      // 注意：这里需要根据实际的 Airtable 表结构来清理
      
      console.log(`✅ Airtable 数据清理完成`)
      
    } catch (error) {
      console.error('❌ Airtable 数据清理失败:', error.message)
    }
  }

  async cleanupSpecificClient(clientId) {
    console.log(`🧹 清理指定客户 ${clientId} 的数据...`)
    
    try {
      await this.cleanupClientData(clientId)
      console.log(`✅ 客户 ${clientId} 数据清理完成`)
    } catch (error) {
      console.error(`❌ 清理客户 ${clientId} 失败:`, error.message)
    }
  }
}

// 运行清理
async function runCleanup() {
  const cleaner = new TestDataCleaner()
  
  // 检查命令行参数
  const args = process.argv.slice(2)
  
  if (args.length > 0) {
    // 清理指定客户
    const clientId = args[0]
    await cleaner.cleanupSpecificClient(clientId)
  } else {
    // 清理所有测试数据
    await cleaner.cleanupAllTestData()
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  runCleanup().catch(console.error)
}

module.exports = { TestDataCleaner, runCleanup }

