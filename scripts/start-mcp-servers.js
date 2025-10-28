const { MCPServerManager } = require('../lib/mcp/mcp-servers-simple');

// MCP服务器启动脚本
async function startMCPServers() {
  console.log('🚀 启动MCP服务器集群...\n');
  
  const manager = new MCPServerManager();
  
  try {
    // 启动所有MCP服务器
    await manager.startAll();
    
    console.log('\n📊 MCP服务器状态:');
    console.log('✅ Customer Capability MCP: 运行中');
    console.log('✅ Market Intelligence MCP: 运行中');
    console.log('✅ Competitor Monitoring MCP: 运行中');
    
    console.log('\n🎯 可用功能:');
    console.log('• 客户能力查询和验证');
    console.log('• 市场信号监测');
    console.log('• 竞品监控');
    
    console.log('\n💡 测试命令:');
    console.log('• 测试客户能力: node scripts/test-mcp.js');
    console.log('• 查看服务器状态: 检查日志输出');
    
    // 保持进程运行
    process.on('SIGINT', async () => {
      console.log('\n\n⏹️  正在关闭MCP服务器...');
      await manager.stopAll();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ MCP服务器启动失败:', error);
    process.exit(1);
  }
}

// 运行
startMCPServers();


