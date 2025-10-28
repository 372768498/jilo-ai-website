// 工作流配置脚本
// scripts/configure-workflows.js

const { workflowConfigManager } = require('../lib/workflow/workflow-config-manager')

class WorkflowConfigurator {
  constructor() {
    this.configurations = {
      // 青铜包配置
      bronze: {
        dailyReport: { enabled: true, schedule: '0 9 * * *' },
        weeklyReport: { enabled: true, schedule: '0 10 * * 1' },
        seoContent: { enabled: true, schedule: '0 11 * * *', maxContentPerDay: 1 },
        socialContent: { enabled: false },
        marketSignals: { enabled: true, schedule: '*/60 * * * *' },
        competitorMonitoring: { enabled: true, schedule: '0 8 * * *' },
        costMonitoring: { enabled: true, schedule: '0 18 * * *' },
        emergencyResponse: { enabled: true, schedule: '*/30 * * * *' }
      },
      
      // 白银包配置
      silver: {
        dailyReport: { enabled: true, schedule: '0 9 * * *' },
        weeklyReport: { enabled: true, schedule: '0 10 * * 1' },
        seoContent: { enabled: true, schedule: '0 11 * * *', maxContentPerDay: 2 },
        socialContent: { enabled: true, schedule: '0 14 * * *', platforms: ['LinkedIn'] },
        marketSignals: { enabled: true, schedule: '*/30 * * * *' },
        competitorMonitoring: { enabled: true, schedule: '0 8 * * *' },
        costMonitoring: { enabled: true, schedule: '0 18 * * *' },
        emergencyResponse: { enabled: true, schedule: '*/15 * * * *' }
      },
      
      // 黄金包配置
      gold: {
        dailyReport: { enabled: true, schedule: '0 9 * * *' },
        weeklyReport: { enabled: true, schedule: '0 10 * * 1' },
        seoContent: { enabled: true, schedule: '0 11 * * *', maxContentPerDay: 3 },
        socialContent: { enabled: true, schedule: '0 14 * * *', platforms: ['LinkedIn', 'Facebook', 'Twitter'] },
        marketSignals: { enabled: true, schedule: '*/15 * * * *' },
        competitorMonitoring: { enabled: true, schedule: '0 8 * * *' },
        costMonitoring: { enabled: true, schedule: '0 18 * * *' },
        emergencyResponse: { enabled: true, schedule: '*/10 * * * *' }
      }
    }
  }

  async configureWorkflows(packageType = 'silver') {
    console.log(`🔧 配置工作流 - ${packageType} 包`)
    console.log('=' * 50)
    
    try {
      const config = this.configurations[packageType]
      if (!config) {
        throw new Error(`不支持的服务包类型: ${packageType}`)
      }
      
      // 应用配置
      for (const [workflowId, workflowConfig] of Object.entries(config)) {
        console.log(`📝 配置工作流: ${workflowId}`)
        await workflowConfigManager.updateWorkflowConfig(workflowId, workflowConfig)
      }
      
      console.log(`✅ ${packageType} 包工作流配置完成`)
      
      // 显示配置摘要
      this.showConfigurationSummary(packageType, config)
      
    } catch (error) {
      console.error('❌ 工作流配置失败:', error.message)
    }
  }

  async configureCustomWorkflow(workflowId, customConfig) {
    console.log(`🔧 配置自定义工作流: ${workflowId}`)
    
    try {
      await workflowConfigManager.updateWorkflowConfig(workflowId, customConfig)
      console.log(`✅ 工作流 ${workflowId} 配置完成`)
    } catch (error) {
      console.error(`❌ 工作流 ${workflowId} 配置失败:`, error.message)
    }
  }

  async showWorkflowStatus() {
    console.log('📊 当前工作流状态')
    console.log('=' * 50)
    
    try {
      const status = workflowConfigManager.getWorkflowStatus()
      
      for (const [workflowId, workflowStatus] of Object.entries(status)) {
        console.log(`\n🔄 ${workflowId}:`)
        console.log(`   状态: ${workflowStatus.enabled ? '启用' : '禁用'}`)
        console.log(`   调度: ${workflowStatus.schedule}`)
        console.log(`   运行: ${workflowStatus.running ? '是' : '否'}`)
        console.log(`   下次执行: ${workflowStatus.nextExecution || '未计划'}`)
      }
      
    } catch (error) {
      console.error('❌ 获取工作流状态失败:', error.message)
    }
  }

  showConfigurationSummary(packageType, config) {
    console.log(`\n📋 ${packageType} 包配置摘要:`)
    console.log('=' * 30)
    
    for (const [workflowId, workflowConfig] of Object.entries(config)) {
      const status = workflowConfig.enabled ? '✅ 启用' : '❌ 禁用'
      console.log(`${workflowId}: ${status} (${workflowConfig.schedule})`)
      
      if (workflowConfig.maxContentPerDay) {
        console.log(`  - 每日最大内容数: ${workflowConfig.maxContentPerDay}`)
      }
      
      if (workflowConfig.platforms) {
        console.log(`  - 目标平台: ${workflowConfig.platforms.join(', ')}`)
      }
    }
  }

  async optimizeForClient(clientId) {
    console.log(`🎯 为客户 ${clientId} 优化工作流配置`)
    
    try {
      // 获取客户信息
      const { AirtableService } = require('../lib/airtable/airtable-config')
      const client = await AirtableService.getClient(clientId)
      
      if (!client) {
        throw new Error(`客户 ${clientId} 不存在`)
      }
      
      const serviceLevel = client['服务包级别']
      const industry = client['行业']
      const geo = client['GEO']
      
      console.log(`客户信息: ${serviceLevel} 包, ${industry} 行业, ${geo} 地区`)
      
      // 根据客户特征优化配置
      const optimizedConfig = this.getOptimizedConfig(serviceLevel, industry, geo)
      
      // 应用优化配置
      for (const [workflowId, workflowConfig] of Object.entries(optimizedConfig)) {
        await workflowConfigManager.updateWorkflowConfig(workflowId, workflowConfig)
      }
      
      console.log(`✅ 客户 ${clientId} 工作流优化完成`)
      
    } catch (error) {
      console.error(`❌ 客户 ${clientId} 工作流优化失败:`, error.message)
    }
  }

  getOptimizedConfig(serviceLevel, industry, geo) {
    const baseConfig = this.configurations[serviceLevel] || this.configurations.silver
    
    // 根据行业优化
    if (industry === '机械制造') {
      return {
        ...baseConfig,
        seoContent: { ...baseConfig.seoContent, maxContentPerDay: (baseConfig.seoContent.maxContentPerDay || 1) + 1 },
        competitorMonitoring: { ...baseConfig.competitorMonitoring, schedule: '0 7 * * *' } // 提前1小时
      }
    }
    
    if (industry === '家电') {
      return {
        ...baseConfig,
        socialContent: { ...baseConfig.socialContent, platforms: ['LinkedIn', 'Facebook', 'TikTok'] },
        seoContent: { ...baseConfig.seoContent, maxContentPerDay: (baseConfig.seoContent.maxContentPerDay || 1) + 1 }
      }
    }
    
    // 根据地区优化
    if (geo === '美国') {
      return {
        ...baseConfig,
        dailyReport: { ...baseConfig.dailyReport, schedule: '0 8 * * *' }, // 美国时间
        weeklyReport: { ...baseConfig.weeklyReport, schedule: '0 9 * * 1' }
      }
    }
    
    if (geo === '欧洲') {
      return {
        ...baseConfig,
        dailyReport: { ...baseConfig.dailyReport, schedule: '0 10 * * *' }, // 欧洲时间
        weeklyReport: { ...baseConfig.weeklyReport, schedule: '0 11 * * 1' }
      }
    }
    
    return baseConfig
  }

  async scheduleMaintenance() {
    console.log('🔧 安排工作流维护')
    
    try {
      // 禁用所有工作流
      const workflows = ['dailyReport', 'weeklyReport', 'seoContent', 'socialContent', 'marketSignals', 'competitorMonitoring', 'costMonitoring', 'emergencyResponse']
      
      for (const workflowId of workflows) {
        await workflowConfigManager.updateWorkflowConfig(workflowId, { enabled: false })
      }
      
      console.log('✅ 所有工作流已禁用，开始维护...')
      
      // 等待维护完成
      console.log('⏳ 维护中... (30秒)')
      await this.delay(30000)
      
      // 重新启用工作流
      for (const workflowId of workflows) {
        await workflowConfigManager.updateWorkflowConfig(workflowId, { enabled: true })
      }
      
      console.log('✅ 维护完成，所有工作流已重新启用')
      
    } catch (error) {
      console.error('❌ 工作流维护失败:', error.message)
    }
  }

  async emergencyStop() {
    console.log('🚨 紧急停止所有工作流')
    
    try {
      const workflows = ['dailyReport', 'weeklyReport', 'seoContent', 'socialContent', 'marketSignals', 'competitorMonitoring', 'costMonitoring', 'emergencyResponse']
      
      for (const workflowId of workflows) {
        await workflowConfigManager.updateWorkflowConfig(workflowId, { enabled: false })
      }
      
      console.log('✅ 所有工作流已紧急停止')
      
    } catch (error) {
      console.error('❌ 紧急停止失败:', error.message)
    }
  }

  async emergencyStart() {
    console.log('🚨 紧急启动所有工作流')
    
    try {
      const workflows = ['dailyReport', 'weeklyReport', 'seoContent', 'socialContent', 'marketSignals', 'competitorMonitoring', 'costMonitoring', 'emergencyResponse']
      
      for (const workflowId of workflows) {
        await workflowConfigManager.updateWorkflowConfig(workflowId, { enabled: true })
      }
      
      console.log('✅ 所有工作流已紧急启动')
      
    } catch (error) {
      console.error('❌ 紧急启动失败:', error.message)
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// 命令行接口
async function main() {
  const configurator = new WorkflowConfigurator()
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('🔧 工作流配置工具')
    console.log('=' * 30)
    console.log('用法:')
    console.log('  node scripts/configure-workflows.js <command> [options]')
    console.log('')
    console.log('命令:')
    console.log('  configure <package>     - 配置工作流 (bronze/silver/gold)')
    console.log('  status                  - 显示工作流状态')
    console.log('  optimize <clientId>     - 为客户优化工作流')
    console.log('  maintenance             - 安排维护')
    console.log('  emergency-stop          - 紧急停止')
    console.log('  emergency-start         - 紧急启动')
    console.log('')
    console.log('示例:')
    console.log('  node scripts/configure-workflows.js configure silver')
    console.log('  node scripts/configure-workflows.js status')
    console.log('  node scripts/configure-workflows.js optimize client-001')
    return
  }
  
  const command = args[0]
  
  try {
    switch (command) {
      case 'configure':
        const packageType = args[1] || 'silver'
        await configurator.configureWorkflows(packageType)
        break
        
      case 'status':
        await configurator.showWorkflowStatus()
        break
        
      case 'optimize':
        const clientId = args[1]
        if (!clientId) {
          console.error('❌ 请提供客户ID')
          return
        }
        await configurator.optimizeForClient(clientId)
        break
        
      case 'maintenance':
        await configurator.scheduleMaintenance()
        break
        
      case 'emergency-stop':
        await configurator.emergencyStop()
        break
        
      case 'emergency-start':
        await configurator.emergencyStart()
        break
        
      default:
        console.error(`❌ 未知命令: ${command}`)
    }
  } catch (error) {
    console.error('❌ 执行失败:', error.message)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { WorkflowConfigurator, main }

