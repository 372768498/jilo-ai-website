const http = require('http');

// 测试可视化服务器
function testVisualServer() {
  console.log('🧪 测试可视化服务器...\n');

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`✅ 服务器响应状态: ${res.statusCode}`);
    console.log(`📱 主页访问: http://localhost:${res.socket.localPort}`);
    console.log(`📊 工作流演示: http://localhost:${res.socket.localPort}/workflow-demo.html`);
    console.log(`🔍 系统状态: http://localhost:${res.socket.localPort}/api/status`);
    console.log(`📈 实时指标: http://localhost:${res.socket.localPort}/api/metrics`);
    console.log('');
    console.log('🎉 可视化演示已准备就绪！');
    console.log('💡 请在浏览器中打开上述地址查看效果');
  });

  req.on('error', (e) => {
    console.log('❌ 服务器未运行，正在启动...');
    console.log('🚀 请运行: npm run visual-server');
  });

  req.end();
}

// 运行测试
testVisualServer();

