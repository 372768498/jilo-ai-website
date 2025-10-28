# 🔧 AI营销中台 - 工作流配置指南

## 📋 概述

工作流配置是AI营销中台的核心功能，通过智能调度和自动化执行，实现内容生成、市场监控、成本控制等关键业务功能。

## 🎯 核心工作流

### 1. 日报生成工作流
- **功能**: 每天自动生成行业洞察日报
- **调度**: 每天上午9点
- **内容**: 市场信号分析、竞品动态、策略建议
- **输出**: 推送到客户门户

### 2. 周报生成工作流
- **功能**: 每周生成综合行业周报
- **调度**: 每周一上午10点
- **内容**: 数据回顾、趋势分析、下周重点
- **输出**: 推送到客户门户

### 3. SEO内容生成工作流
- **功能**: 自动生成SEO优化文章
- **调度**: 每天上午11点
- **内容**: 产品相关长文、GEO优化内容
- **输出**: 发布到客户网站

### 4. 社媒内容生成工作流
- **功能**: 生成社交媒体内容
- **调度**: 每天下午2点
- **内容**: LinkedIn帖子、Facebook内容
- **输出**: 发布到社媒平台

### 5. 市场信号处理工作流
- **功能**: 实时处理市场信号
- **调度**: 每30分钟
- **内容**: 需求激增、政策变化、竞品动态
- **输出**: 触发相应策略调整

### 6. 竞品监控工作流
- **功能**: 监控竞品动态
- **调度**: 每天上午8点
- **内容**: 流量变化、内容更新、策略分析
- **输出**: 竞品报告和策略建议

### 7. 成本监控工作流
- **功能**: 监控API使用成本
- **调度**: 每天下午6点
- **内容**: 日成本统计、超限告警
- **输出**: 成本报告和预算调整建议

### 8. 应急响应工作流
- **功能**: 检查异常条件
- **调度**: 每15分钟
- **内容**: 系统异常、性能问题、安全风险
- **输出**: 应急响应和自动修复

## ⚙️ 配置方法

### 方法1: 命令行配置

```bash
# 查看当前工作流状态
npm run workflow:status

# 配置青铜包工作流
npm run workflow:configure bronze

# 配置白银包工作流
npm run workflow:configure silver

# 配置黄金包工作流
npm run workflow:configure gold

# 为客户优化工作流
npm run workflow:optimize client-001

# 安排维护
npm run workflow:maintenance

# 紧急停止所有工作流
npm run workflow:emergency-stop

# 紧急启动所有工作流
npm run workflow:emergency-start
```

### 方法2: 环境变量配置

在 `.env.local` 文件中添加：

```bash
# 工作流调度配置
DAILY_REPORT_SCHEDULE=0 9 * * *
WEEKLY_REPORT_SCHEDULE=0 10 * * 1
SEO_CONTENT_SCHEDULE=0 11 * * *
SOCIAL_CONTENT_SCHEDULE=0 14 * * *
MARKET_SIGNALS_SCHEDULE=*/30 * * * *
COMPETITOR_MONITORING_SCHEDULE=0 8 * * *
COST_MONITORING_SCHEDULE=0 18 * * *
EMERGENCY_RESPONSE_SCHEDULE=*/15 * * * *

# 成本控制参数
DAILY_COST_LIMIT_PER_CLIENT=100
MONTHLY_COST_LIMIT_PER_CLIENT=2000
EMERGENCY_COST_THRESHOLD=150

# 内容生成参数
AI_PRE_REVIEW_MIN_SCORE=70
HUMAN_REVIEW_REQUIRED=true
MAX_RETRY_ATTEMPTS=3
FALLBACK_TO_HUMAN=true
```

### 方法3: 代码配置

```javascript
const { workflowConfigManager } = require('./lib/workflow/workflow-config-manager')

// 更新单个工作流配置
await workflowConfigManager.updateWorkflowConfig('dailyReport', {
  enabled: true,
  schedule: '0 9 * * *',
  retryAttempts: 3,
  timeout: 300000
})

// 获取工作流状态
const status = workflowConfigManager.getWorkflowStatus()
console.log(status)
```

## 📊 服务包配置

### 青铜包配置
```yaml
dailyReport: 
  enabled: true
  schedule: '0 9 * * *'
weeklyReport: 
  enabled: true
  schedule: '0 10 * * 1'
seoContent: 
  enabled: true
  schedule: '0 11 * * *'
  maxContentPerDay: 1
socialContent: 
  enabled: false
marketSignals: 
  enabled: true
  schedule: '*/60 * * * *'
competitorMonitoring: 
  enabled: true
  schedule: '0 8 * * *'
costMonitoring: 
  enabled: true
  schedule: '0 18 * * *'
emergencyResponse: 
  enabled: true
  schedule: '*/30 * * * *'
```

### 白银包配置
```yaml
dailyReport: 
  enabled: true
  schedule: '0 9 * * *'
weeklyReport: 
  enabled: true
  schedule: '0 10 * * 1'
seoContent: 
  enabled: true
  schedule: '0 11 * * *'
  maxContentPerDay: 2
socialContent: 
  enabled: true
  schedule: '0 14 * * *'
  platforms: ['LinkedIn']
marketSignals: 
  enabled: true
  schedule: '*/30 * * * *'
competitorMonitoring: 
  enabled: true
  schedule: '0 8 * * *'
costMonitoring: 
  enabled: true
  schedule: '0 18 * * *'
emergencyResponse: 
  enabled: true
  schedule: '*/15 * * * *'
```

### 黄金包配置
```yaml
dailyReport: 
  enabled: true
  schedule: '0 9 * * *'
weeklyReport: 
  enabled: true
  schedule: '0 10 * * 1'
seoContent: 
  enabled: true
  schedule: '0 11 * * *'
  maxContentPerDay: 3
socialContent: 
  enabled: true
  schedule: '0 14 * * *'
  platforms: ['LinkedIn', 'Facebook', 'Twitter']
marketSignals: 
  enabled: true
  schedule: '*/15 * * * *'
competitorMonitoring: 
  enabled: true
  schedule: '0 8 * * *'
costMonitoring: 
  enabled: true
  schedule: '0 18 * * *'
emergencyResponse: 
  enabled: true
  schedule: '*/10 * * * *'
```

## 🕐 Cron调度格式

```
* * * * *
│ │ │ │ │
│ │ │ │ └─── 星期几 (0-7, 0和7都表示星期日)
│ │ │ └───── 月份 (1-12)
│ │ └─────── 日期 (1-31)
│ └───────── 小时 (0-23)
└─────────── 分钟 (0-59)
```

### 常用调度示例

```bash
# 每天上午9点
0 9 * * *

# 每周一上午10点
0 10 * * 1

# 每30分钟
*/30 * * * *

# 每15分钟
*/15 * * * *

# 每天上午8点
0 8 * * *

# 每天下午6点
0 18 * * *

# 每2小时
0 */2 * * *

# 工作日每天上午9点
0 9 * * 1-5
```

## 🎯 客户优化配置

### 按行业优化

**机械制造行业**:
- SEO内容数量增加
- 竞品监控提前1小时
- 重点关注技术参数

**家电行业**:
- 增加TikTok平台
- SEO内容数量增加
- 重点关注用户体验

**轻工行业**:
- 增加Instagram平台
- 重点关注设计趋势
- 季节性内容调整

### 按地区优化

**美国市场**:
- 日报时间调整为上午8点
- 周报时间调整为上午9点
- 重点关注美国政策变化

**欧洲市场**:
- 日报时间调整为上午10点
- 周报时间调整为上午11点
- 重点关注欧盟法规

**东南亚市场**:
- 日报时间调整为上午9点
- 周报时间调整为上午10点
- 重点关注本地化内容

## 🔧 高级配置

### 重试机制
```javascript
{
  retryAttempts: 3,        // 最大重试次数
  timeout: 300000,         // 超时时间(毫秒)
  retryDelay: 1000,        // 重试延迟(毫秒)
  exponentialBackoff: true // 指数退避
}
```

### 并发控制
```javascript
{
  maxConcurrentWorkflows: 5,  // 最大并发工作流数
  queueSize: 100,             // 队列大小
  processingTimeout: 3600000  // 处理超时时间
}
```

### 监控配置
```javascript
{
  healthCheckInterval: 300000,    // 健康检查间隔
  metricsCollectionInterval: 60000, // 指标收集间隔
  alertThresholds: {
    errorRate: 0.05,           // 错误率阈值
    responseTime: 5000,        // 响应时间阈值
    memoryUsage: 0.8           // 内存使用率阈值
  }
}
```

## 🚨 应急处理

### 紧急停止
```bash
# 停止所有工作流
npm run workflow:emergency-stop
```

### 紧急启动
```bash
# 启动所有工作流
npm run workflow:emergency-start
```

### 维护模式
```bash
# 安排维护
npm run workflow:maintenance
```

## 📈 监控和告警

### 工作流状态监控
- 实时状态显示
- 执行历史记录
- 性能指标统计
- 错误率监控

### 告警机制
- 工作流执行失败
- 成本超限告警
- 性能异常告警
- 系统资源告警

### 通知方式
- Slack通知
- Discord通知
- 邮件通知
- 短信通知

## 🔍 故障排除

### 常见问题

1. **工作流不执行**
   - 检查调度配置
   - 验证时间设置
   - 确认工作流启用状态

2. **执行失败**
   - 查看错误日志
   - 检查API连接
   - 验证权限配置

3. **性能问题**
   - 调整并发数
   - 优化超时设置
   - 检查系统资源

4. **成本超限**
   - 调整成本阈值
   - 优化内容生成频率
   - 检查API使用情况

### 调试工具

```bash
# 查看工作流状态
npm run workflow:status

# 查看系统日志
tail -f logs/system.log

# 查看工作流日志
tail -f logs/workflow.log

# 健康检查
npm run health-check
```

## 📚 最佳实践

### 1. 调度优化
- 避免高峰期执行
- 分散工作流时间
- 考虑时区差异

### 2. 资源管理
- 合理设置并发数
- 监控内存使用
- 优化数据库连接

### 3. 错误处理
- 设置合理的重试次数
- 实现降级策略
- 记录详细日志

### 4. 成本控制
- 设置成本阈值
- 监控API使用
- 优化内容生成频率

### 5. 安全考虑
- 验证API权限
- 保护敏感数据
- 实现访问控制

---

**🎉 通过合理配置工作流，您可以实现AI营销中台的全自动化运行，大幅提升效率和降低成本！**

