const { MCPServerManager } = require('../lib/mcp/mcp-servers-simple');

// MCP服务器测试脚本
async function testMCPServers() {
  console.log('🧪 测试MCP服务器功能...\n');
  
  const manager = new MCPServerManager();
  
  // 启动服务器
  await manager.startAll();
  console.log('');

  try {
    // 1. 测试Customer Capability MCP
    console.log('📋 测试1: Customer Capability MCP');
    const capabilityServer = manager.getServer('customerCapability');
    
    // 获取第一个客户ID（从数据库）
    const { supabaseAdmin } = require('../lib/supabase/supabase-config');
    const { data: clients } = await supabaseAdmin
      .from('clients')
      .select('id')
      .limit(1);
    
    if (clients && clients.length > 0) {
      const clientId = clients[0].id;
      
      // 获取客户能力
      const capability = await capabilityServer.getCapability(clientId);
      console.log('✅ 客户能力数据:', JSON.stringify(capability, null, 2).substring(0, 200) + '...');
      
      // 验证能力
      const hasQuickDelivery = await capabilityServer.hasCapability(clientId, 'quick_delivery');
      console.log('✅ 快速交付能力:', hasQuickDelivery);
      
      // 生成能力摘要
      const summary = await capabilityServer.generateCapabilitySummary(clientId);
      console.log('✅ 能力摘要:', summary.substring(0, 200) + '...');
    }
    
    console.log('');
    
    // 2. 测试Market Intelligence MCP
    console.log('📊 测试2: Market Intelligence MCP');
    const intelligenceServer = manager.getServer('marketIntelligence');
    
    // 触发一次信号采集
    await intelligenceServer.collectMarketSignals();
    
    // 获取最新信号
    const signals = await intelligenceServer.getLatestSignals();
    console.log(`✅ 最新市场信号数量: ${signals.length}`);
    
    console.log('');
    
    // 3. 测试Competitor Monitoring MCP
    console.log('🔍 测试3: Competitor Monitoring MCP');
    const competitorServer = manager.getServer('competitorMonitoring');
    
    if (clients && clients.length > 0) {
      const competitors = await competitorServer.getCompetitors(clients[0].id);
      console.log(`✅ 竞品数量: ${competitors.length}`);
      console.log('竞品列表:', competitors);
    }
    
    console.log('\n✅ 所有MCP服务器测试通过！');
    
    // 关闭服务器
    await manager.stopAll();
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
    await manager.stopAll();
    process.exit(1);
  }
}

// 运行测试
testMCPServers();

