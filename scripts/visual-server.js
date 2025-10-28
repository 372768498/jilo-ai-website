const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// 静态文件服务
app.use(express.static('.'));

// 主页路由
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI营销平台 - 可视化演示</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 20px;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .container {
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 600px;
            }
            h1 {
                color: #333;
                margin-bottom: 20px;
                font-size: 2.5em;
            }
            .subtitle {
                color: #666;
                margin-bottom: 30px;
                font-size: 1.2em;
            }
            .demo-links {
                display: grid;
                gap: 20px;
                margin-bottom: 30px;
            }
            .demo-link {
                display: block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                padding: 20px;
                border-radius: 15px;
                font-size: 1.2em;
                font-weight: bold;
                transition: transform 0.3s ease;
            }
            .demo-link:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
            .status {
                background: #d4edda;
                color: #155724;
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            .info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 AI营销平台</h1>
            <p class="subtitle">可视化演示中心</p>
            
            <div class="status">
                ✅ 系统运行正常 | 端口: ${PORT}
            </div>
            
            <div class="demo-links">
                <a href="/workflow-demo.html" class="demo-link">
                    📊 工作流效果演示
                </a>
                <a href="/api/status" class="demo-link">
                    🔍 系统状态检查
                </a>
                <a href="/api/metrics" class="demo-link">
                    📈 实时指标
                </a>
            </div>
            
            <div class="info">
                <p><strong>功能说明:</strong></p>
                <p>• 工作流效果演示 - 查看配置的工作流运行状态</p>
                <p>• 系统状态检查 - 检查各组件健康状态</p>
                <p>• 实时指标 - 查看系统性能数据</p>
            </div>
        </div>
    </body>
    </html>
  `);
});

// API路由 - 系统状态
app.get('/api/status', (req, res) => {
  const status = {
    timestamp: new Date().toISOString(),
    system: 'AI营销平台',
    version: '1.0.0',
    status: 'running',
    components: {
      supabase: { status: 'connected', latency: '45ms' },
      airtable: { status: 'connected', latency: '120ms' },
      mal: { status: 'active', models: 4 },
      workflows: { status: 'running', active: 8 },
      cron: { status: 'scheduled', jobs: 6 }
    },
    uptime: process.uptime(),
    memory: process.memoryUsage()
  };
  
  res.json(status);
});

// API路由 - 实时指标
app.get('/api/metrics', (req, res) => {
  const metrics = {
    timestamp: new Date().toISOString(),
    workflows: {
      daily_reports: { status: 'active', last_run: '2025-01-27T09:00:00Z', next_run: '2025-01-28T09:00:00Z' },
      weekly_reports: { status: 'scheduled', last_run: '2025-01-20T10:00:00Z', next_run: '2025-01-27T10:00:00Z' },
      seo_content: { status: 'active', last_run: '2025-01-27T14:00:00Z', next_run: '2025-01-28T14:00:00Z' },
      social_content: { status: 'active', last_run: '2025-01-27T16:00:00Z', next_run: '2025-01-28T16:00:00Z' },
      competitor_monitoring: { status: 'active', last_run: '2025-01-27T18:00:00Z', next_run: '2025-01-27T22:00:00Z' },
      cost_monitoring: { status: 'active', last_run: '2025-01-27T19:00:00Z', next_run: '2025-01-27T20:00:00Z' }
    },
    content: {
      generated_today: 15,
      quality_score: 87,
      cost_today: 42.50,
      api_calls: 156
    },
    clients: {
      total: 2,
      active: 2,
      silver_package: 2
    }
  };
  
  res.json(metrics);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🌐 可视化演示服务器已启动！`);
  console.log(`📱 访问地址: http://localhost:${PORT}`);
  console.log(`📊 工作流演示: http://localhost:${PORT}/workflow-demo.html`);
  console.log(`🔍 系统状态: http://localhost:${PORT}/api/status`);
  console.log(`📈 实时指标: http://localhost:${PORT}/api/metrics`);
  console.log('');
  console.log('💡 提示: 在浏览器中打开上述地址查看效果');
  console.log('⏹️  按 Ctrl+C 停止服务器');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭服务器...');
  process.exit(0);
});


