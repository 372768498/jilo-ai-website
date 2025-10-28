// 系统启动脚本
// scripts/start-system.js

const { systemInitializer, systemMonitor } = require('../lib/config/index')

async function startSystem() {
  console.log('🚀 启动AI营销中台系统...')
  
  try {
    // 启动系统监控
    systemMonitor.start()
    
    // 初始化系统
    await systemInitializer.initialize()
    
    console.log('✅ 系统启动成功！')
    console.log('📊 系统状态:', systemInitializer.getStatus())
    
    // 保持进程运行
    process.on('SIGINT', async () => {
      console.log('\n🛑 收到停止信号，正在安全关闭系统...')
      await systemInitializer.shutdown()
      systemMonitor.stop()
      process.exit(0)
    })
    
    process.on('SIGTERM', async () => {
      console.log('\n🛑 收到终止信号，正在安全关闭系统...')
      await systemInitializer.shutdown()
      systemMonitor.stop()
      process.exit(0)
    })
    
    // 定期输出系统状态
    setInterval(() => {
      const metrics = systemMonitor.getMetrics()
      console.log('📊 系统指标:', {
        memoryUsage: `${(metrics.memoryUsage * 100).toFixed(1)}%`,
        uptime: `${Math.floor(metrics.uptime / 60)}分钟`,
        requests: metrics.requests,
        errors: metrics.errors
      })
    }, 10 * 60 * 1000) // 每10分钟输出一次
    
  } catch (error) {
    console.error('❌ 系统启动失败:', error)
    process.exit(1)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  startSystem()
}

module.exports = { startSystem }

