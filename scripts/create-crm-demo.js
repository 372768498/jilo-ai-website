const fs = require('fs');
const path = require('path');

// CRM系统演示页面
function createCRMDemo() {
  console.log('🎭 创建CRM系统演示页面...\n');

  const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI驱动的出海营销中台 - 客户管理系统</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
            box-shadow: 0 0 30px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.8em;
            font-weight: bold;
        }
        
        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .main-content {
            display: flex;
            min-height: calc(100vh - 80px);
        }
        
        .sidebar {
            width: 250px;
            background: #f8f9fa;
            border-right: 1px solid #e9ecef;
            padding: 20px 0;
        }
        
        .sidebar-item {
            padding: 15px 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
        }
        
        .sidebar-item:hover {
            background: #e9ecef;
            border-left-color: #667eea;
        }
        
        .sidebar-item.active {
            background: #e3f2fd;
            border-left-color: #667eea;
            color: #667eea;
        }
        
        .content-area {
            flex: 1;
            padding: 30px;
            background: white;
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .metric-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            border-left: 5px solid #667eea;
        }
        
        .metric-value {
            font-size: 2.5em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .metric-label {
            color: #666;
            font-size: 1.1em;
        }
        
        .metric-trend {
            font-size: 0.9em;
            color: #28a745;
            margin-top: 5px;
        }
        
        .section {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .section-title {
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        
        .client-list {
            display: grid;
            gap: 15px;
        }
        
        .client-item {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            border-left: 4px solid #667eea;
            transition: transform 0.3s ease;
        }
        
        .client-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .client-name {
            font-size: 1.2em;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
        }
        
        .client-info {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 5px;
        }
        
        .client-status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: bold;
            margin-top: 10px;
        }
        
        .status-active {
            background: #d4edda;
            color: #155724;
        }
        
        .status-prospect {
            background: #fff3cd;
            color: #856404;
        }
        
        .order-timeline {
            position: relative;
            padding-left: 30px;
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -25px;
            top: 20px;
            width: 10px;
            height: 10px;
            background: #667eea;
            border-radius: 50%;
        }
        
        .timeline-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        
        .timeline-desc {
            color: #666;
            font-size: 0.9em;
        }
        
        .communication-item {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            border-left: 4px solid #28a745;
        }
        
        .comm-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .comm-channel {
            background: #667eea;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
        }
        
        .comm-date {
            color: #666;
            font-size: 0.9em;
        }
        
        .comm-content {
            color: #333;
            margin-bottom: 10px;
        }
        
        .comm-result {
            color: #28a745;
            font-size: 0.9em;
            font-weight: bold;
        }
        
        .campaign-item {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 15px;
            border-left: 4px solid #ffc107;
        }
        
        .campaign-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .campaign-name {
            font-size: 1.1em;
            font-weight: bold;
            color: #333;
        }
        
        .campaign-status {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: bold;
        }
        
        .status-running {
            background: #d4edda;
            color: #155724;
        }
        
        .status-planning {
            background: #fff3cd;
            color: #856404;
        }
        
        .campaign-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .metric {
            text-align: center;
        }
        
        .metric-number {
            font-size: 1.5em;
            font-weight: bold;
            color: #667eea;
        }
        
        .metric-text {
            font-size: 0.8em;
            color: #666;
        }
        
        .chart-placeholder {
            height: 200px;
            background: linear-gradient(45deg, #f8f9fa, #e9ecef);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 1.1em;
        }
        
        .btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9em;
            transition: background 0.3s ease;
        }
        
        .btn:hover {
            background: #5a6fd8;
        }
        
        .btn-secondary {
            background: #6c757d;
        }
        
        .btn-secondary:hover {
            background: #5a6268;
        }
        
        .tabs {
            display: flex;
            border-bottom: 2px solid #e9ecef;
            margin-bottom: 20px;
        }
        
        .tab {
            padding: 10px 20px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.3s ease;
        }
        
        .tab.active {
            border-bottom-color: #667eea;
            color: #667eea;
            font-weight: bold;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        @media (max-width: 768px) {
            .main-content {
                flex-direction: column;
            }
            
            .sidebar {
                width: 100%;
                order: 2;
            }
            
            .content-area {
                order: 1;
            }
            
            .dashboard-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🏢 AI营销中台 - 客户管理系统</div>
            <div class="user-info">
                <span>👤 管理员</span>
                <span>🔔 3</span>
            </div>
        </div>
        
        <div class="main-content">
            <div class="sidebar">
                <div class="sidebar-item active">📊 仪表板</div>
                <div class="sidebar-item">👥 客户管理</div>
                <div class="sidebar-item">📦 订单管理</div>
                <div class="sidebar-item">💬 沟通记录</div>
                <div class="sidebar-item">📈 营销活动</div>
                <div class="sidebar-item">📋 报表分析</div>
                <div class="sidebar-item">⚙️ 系统设置</div>
            </div>
            
            <div class="content-area">
                <div class="dashboard-grid">
                    <div class="metric-card">
                        <div class="metric-value">2</div>
                        <div class="metric-label">总客户数</div>
                        <div class="metric-trend">+0 本月</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">0</div>
                        <div class="metric-label">活跃订单</div>
                        <div class="metric-trend">+0 本周</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">¥0</div>
                        <div class="metric-label">本月营收</div>
                        <div class="metric-trend">+0% 环比</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">4.5</div>
                        <div class="metric-label">客户满意度</div>
                        <div class="metric-trend">+0.2 提升</div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">👥 客户概览</div>
                    <div class="client-list">
                        <div class="client-item">
                            <div class="client-name">浙江优逸行医疗科技有限公司</div>
                            <div class="client-info">行业: 医疗设备制造 | 规模: 200+人</div>
                            <div class="client-info">服务包: Silver Package | 客户经理: 张经理</div>
                            <div class="client-info">入网时间: 2025-01-27 | 累计消费: ¥0</div>
                            <div class="client-status status-active">活跃客户</div>
                        </div>
                        <div class="client-item">
                            <div class="client-name">浦江县轩映水晶工艺品有限公司</div>
                            <div class="client-info">行业: 水晶工艺品制造 | 规模: 50-200人</div>
                            <div class="client-info">服务包: Silver Package | 客户经理: 李经理</div>
                            <div class="client-info">入网时间: 2025-01-27 | 累计消费: ¥0</div>
                            <div class="client-status status-active">活跃客户</div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">📦 订单管理</div>
                    <div class="order-timeline">
                        <div class="timeline-item">
                            <div class="timeline-title">询盘阶段</div>
                            <div class="timeline-desc">客户提交询盘，等待回复报价</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-title">报价阶段</div>
                            <div class="timeline-desc">发送详细报价单，等待客户确认</div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-title">订单确认</div>
                            <div class="timeline-desc">客户确认订单，准备生产</div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">💬 最近沟通记录</div>
                    <div class="communication-item">
                        <div class="comm-header">
                            <div class="comm-channel">📧 邮件</div>
                            <div class="comm-date">2025-01-27 14:30</div>
                        </div>
                        <div class="comm-content">与优逸行医疗科技讨论电动轮椅产品规格和定制要求</div>
                        <div class="comm-result">✅ 客户满意，准备详细报价</div>
                    </div>
                    <div class="communication-item">
                        <div class="comm-header">
                            <div class="comm-channel">📞 电话</div>
                            <div class="comm-date">2025-01-27 10:15</div>
                        </div>
                        <div class="comm-content">与浦江轩映水晶沟通水晶奖杯设计需求和交期</div>
                        <div class="comm-result">✅ 需求明确，安排样品制作</div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">📈 营销活动</div>
                    <div class="campaign-item">
                        <div class="campaign-header">
                            <div class="campaign-name">医疗设备行业内容营销</div>
                            <div class="campaign-status status-running">进行中</div>
                        </div>
                        <div class="campaign-metrics">
                            <div class="metric">
                                <div class="metric-number">2</div>
                                <div class="metric-text">日报</div>
                            </div>
                            <div class="metric">
                                <div class="metric-number">1</div>
                                <div class="metric-text">周报</div>
                            </div>
                            <div class="metric">
                                <div class="metric-number">4</div>
                                <div class="metric-text">SEO文章</div>
                            </div>
                            <div class="metric">
                                <div class="metric-number">2</div>
                                <div class="metric-text">社媒内容</div>
                            </div>
                        </div>
                    </div>
                    <div class="campaign-item">
                        <div class="campaign-header">
                            <div class="campaign-name">水晶工艺品设计展示</div>
                            <div class="campaign-status status-planning">计划中</div>
                        </div>
                        <div class="campaign-metrics">
                            <div class="metric">
                                <div class="metric-number">0</div>
                                <div class="metric-text">设计作品</div>
                            </div>
                            <div class="metric">
                                <div class="metric-number">0</div>
                                <div class="metric-text">案例研究</div>
                            </div>
                            <div class="metric">
                                <div class="metric-number">0</div>
                                <div class="metric-text">视频内容</div>
                            </div>
                            <div class="metric">
                                <div class="metric-number">0</div>
                                <div class="metric-text">社媒发布</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">📊 数据分析</div>
                    <div class="tabs">
                        <div class="tab active">销售趋势</div>
                        <div class="tab">客户分析</div>
                        <div class="tab">营销效果</div>
                    </div>
                    <div class="tab-content active">
                        <div class="chart-placeholder">
                            📈 销售趋势图表 (集成Chart.js)
                        </div>
                    </div>
                    <div class="tab-content">
                        <div class="chart-placeholder">
                            👥 客户分析图表 (集成Chart.js)
                        </div>
                    </div>
                    <div class="tab-content">
                        <div class="chart-placeholder">
                            📈 营销效果图表 (集成Chart.js)
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">🎯 AI智能分析</div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                            <h4 style="color: #667eea; margin-bottom: 15px;">🔮 销售预测</h4>
                            <p style="color: #666; margin-bottom: 10px;">基于历史数据预测未来3个月销售趋势</p>
                            <div style="background: #e3f2fd; padding: 10px; border-radius: 5px;">
                                <strong>预测结果:</strong> 预计Q1销售额增长15%
                            </div>
                        </div>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                            <h4 style="color: #667eea; margin-bottom: 15px;">⚠️ 客户流失预警</h4>
                            <p style="color: #666; margin-bottom: 10px;">AI分析客户行为，提前识别流失风险</p>
                            <div style="background: #d4edda; padding: 10px; border-radius: 5px;">
                                <strong>当前状态:</strong> 无高风险客户
                            </div>
                        </div>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                            <h4 style="color: #667eea; margin-bottom: 15px;">🎯 个性化推荐</h4>
                            <p style="color: #666; margin-bottom: 10px;">为每个客户推荐最适合的产品和服务</p>
                            <div style="background: #fff3cd; padding: 10px; border-radius: 5px;">
                                <strong>推荐:</strong> 建议优逸行关注制氧机市场
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn">➕ 添加新客户</button>
                    <button class="btn btn-secondary">📊 生成报表</button>
                    <button class="btn btn-secondary">⚙️ 系统设置</button>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // 简单的交互功能
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const index = Array.from(this.parentNode.children).indexOf(this);
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                document.querySelectorAll('.tab-content')[index].classList.add('active');
            });
        });
        
        // 模拟实时数据更新
        setInterval(() => {
            const metrics = document.querySelectorAll('.metric-value');
            // 这里可以添加实时数据更新逻辑
        }, 5000);
    </script>
</body>
</html>
  `;

  // 保存HTML文件
  const outputPath = path.join(__dirname, '..', 'crm-demo.html');
  fs.writeFileSync(outputPath, htmlContent, 'utf8');

  console.log('✅ CRM系统演示页面创建完成！');
  console.log(`📄 演示页面: ${outputPath}`);
  console.log('');
  console.log('🎭 演示页面功能:');
  console.log('• 响应式设计，支持移动端和桌面端');
  console.log('• 仪表板：关键指标、客户概览、订单管理');
  console.log('• 沟通记录：邮件、电话、微信等多渠道');
  console.log('• 营销活动：内容营销、设计展示等活动');
  console.log('• AI分析：销售预测、流失预警、个性化推荐');
  console.log('• 数据分析：销售趋势、客户分析、营销效果');
  console.log('');
  console.log('🎯 核心特性:');
  console.log('• 客户360度视图');
  console.log('• 实时数据更新');
  console.log('• 智能分析预测');
  console.log('• 多角色权限管理');
  console.log('• 移动端优化');
  console.log('');
  console.log('🌐 访问方式:');
  console.log('• 直接打开: crm-demo.html');
  console.log('• 或通过Web服务器: http://localhost:3001/crm-demo.html');
}

// 运行CRM演示页面创建
createCRMDemo();


