// 简化的工作流配置脚本
// scripts/simple-workflow-config.js

class SimpleWorkflowConfigurator {
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
      
      console.log(`📋 ${packageType} 包配置:`)
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
      
      console.log(`\n✅ ${packageType} 包工作流配置完成`)
      
      // 生成环境变量配置
      this.generateEnvConfig(config)
      
    } catch (error) {
      console.error('❌ 工作流配置失败:', error.message)
    }
  }

  generateEnvConfig(config) {
    console.log('\n📝 环境变量配置 (添加到 .env.local):')
    console.log('=' * 40)
    
    const envConfig = []
    
    for (const [workflowId, workflowConfig] of Object.entries(config)) {
      if (workflowConfig.enabled) {
        const envKey = workflowId.toUpperCase() + '_SCHEDULE'
        envConfig.push(`${envKey}=${workflowConfig.schedule}`)
      }
    }
    
    envConfig.push('')
    envConfig.push('# 成本控制参数')
    envConfig.push('DAILY_COST_LIMIT_PER_CLIENT=100')
    envConfig.push('MONTHLY_COST_LIMIT_PER_CLIENT=2000')
    envConfig.push('EMERGENCY_COST_THRESHOLD=150')
    envConfig.push('')
    envConfig.push('# 内容生成参数')
    envConfig.push('AI_PRE_REVIEW_MIN_SCORE=70')
    envConfig.push('HUMAN_REVIEW_REQUIRED=true')
    envConfig.push('MAX_RETRY_ATTEMPTS=3')
    envConfig.push('FALLBACK_TO_HUMAN=true')
    
    console.log(envConfig.join('\n'))
    
    console.log('\n💡 配置说明:')
    console.log('- 将上述环境变量添加到 .env.local 文件中')
    console.log('- 重启系统以应用新配置')
    console.log('- 使用 npm run workflow:status 检查配置状态')
  }

  showScheduleHelp() {
    console.log('\n📚 Cron调度格式说明:')
    console.log('=' * 30)
    console.log('* * * * *')
    console.log('│ │ │ │ │')
    console.log('│ │ │ │ └─── 星期几 (0-7, 0和7都表示星期日)')
    console.log('│ │ │ └───── 月份 (1-12)')
    console.log('│ │ └─────── 日期 (1-31)')
    console.log('│ └───────── 小时 (0-23)')
    console.log('└─────────── 分钟 (0-59)')
    console.log('')
    console.log('常用调度示例:')
    console.log('0 9 * * *     - 每天上午9点')
    console.log('0 10 * * 1    - 每周一上午10点')
    console.log('*/30 * * * *  - 每30分钟')
    console.log('*/15 * * * *  - 每15分钟')
    console.log('0 8 * * *     - 每天上午8点')
    console.log('0 18 * * *    - 每天下午6点')
  }
}

// 命令行接口
async function main() {
  const configurator = new SimpleWorkflowConfigurator()
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('🔧 工作流配置工具')
    console.log('=' * 30)
    console.log('用法:')
    console.log('  node scripts/simple-workflow-config.js <command> [options]')
    console.log('')
    console.log('命令:')
    console.log('  configure <package>     - 配置工作流 (bronze/silver/gold)')
    console.log('  help                    - 显示调度格式帮助')
    console.log('')
    console.log('示例:')
    console.log('  node scripts/simple-workflow-config.js configure silver')
    console.log('  node scripts/simple-workflow-config.js configure gold')
    return
  }
  
  const command = args[0]
  
  try {
    switch (command) {
      case 'configure':
        const packageType = args[1] || 'silver'
        await configurator.configureWorkflows(packageType)
        break
        
      case 'help':
        configurator.showScheduleHelp()
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

module.exports = { SimpleWorkflowConfigurator, main }

