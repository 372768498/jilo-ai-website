# Supabase 配置指南

## 🚀 快速开始

### 1. 创建 Supabase 项目
1. 访问 [supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 选择 "New project"
4. 填写项目信息：
   - 项目名称：`ai-marketing-platform`
   - 数据库密码：设置强密码
   - 地区：选择离您最近的地区

### 2. 获取配置信息
在 Supabase 项目仪表板中：
- **Project URL**: `https://your-project-id.supabase.co`
- **API Keys** → **anon public**: 用于客户端
- **API Keys** → **service_role**: 用于服务端（敏感操作）

### 3. 执行数据库初始化
1. 在 Supabase 仪表板中，进入 **SQL Editor**
2. 复制 `supabase_schema.sql` 文件内容
3. 粘贴并执行 SQL 脚本
4. 验证表创建成功

### 4. 配置环境变量
创建 `.env.local` 文件：
```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# 其他 API 配置...
```

## 📊 数据库表说明

### 核心表结构
- **icp_details**: ICP详细画像（敏感数据）
- **competitor_intelligence**: 竞品情报（敏感数据）
- **strategy_history**: 策略决策历史
- **client_capabilities**: 客户能力清单
- **api_usage_logs**: API调用日志（成本追踪）
- **market_signals**: 市场信号（实时数据）
- **account_health_monitoring**: 账号健康度监控
- **emergency_responses**: 应急响应记录

### 安全特性
- ✅ 行级安全策略 (RLS) 已启用
- ✅ 用户只能访问自己的数据
- ✅ 自动更新时间戳
- ✅ 数据完整性约束

## 🔧 集成步骤

### 1. 安装依赖
```bash
npm install @supabase/supabase-js
```

### 2. 导入配置
```javascript
import { SupabaseService } from './lib/supabase/supabase-config'
```

### 3. 使用示例
```javascript
// 创建 ICP 画像
const icpData = {
  roleName: '采购经理',
  department: '采购部',
  seniorityLevel: '中级',
  keyPainPoints: ['价格敏感', '交期要求'],
  decisionWeight: 40,
  commonObjections: ['价格太高', '交期太长']
}

const icp = await SupabaseService.createICPDetail('client-123', icpData)

// 记录 API 使用
await SupabaseService.logAPIUsage('client-123', {
  modelName: 'claude-3-sonnet',
  cost: 0.05,
  inputTokens: 1000,
  outputTokens: 500,
  success: true
})

// 订阅实时数据
const subscription = SupabaseService.subscribeToMarketSignals((payload) => {
  console.log('新市场信号:', payload.new)
})
```

## 📈 监控和优化

### 1. 数据库监控
- 在 Supabase 仪表板查看 **Database** → **Logs**
- 监控查询性能和错误

### 2. API 使用统计
```javascript
// 获取客户月度统计
const metrics = await SupabaseService.getClientMetrics(
  'client-123',
  '2025-01-01',
  '2025-01-31'
)
console.log('总成本:', metrics.totalCost)
console.log('成功率:', metrics.successRate)
```

### 3. 实时数据流
- 市场信号自动推送到前端
- API 使用情况实时更新
- 账号健康度变化告警

## 🛡️ 安全最佳实践

1. **API 密钥管理**
   - 服务端密钥永远不要暴露给客户端
   - 定期轮换 API 密钥

2. **数据访问控制**
   - 使用 RLS 策略限制数据访问
   - 敏感操作使用服务端密钥

3. **监控和告警**
   - 设置异常使用量告警
   - 监控数据库性能

## 💰 成本控制

### Supabase 免费额度
- 数据库：500MB
- 带宽：2GB/月
- API 请求：无限制
- 实时连接：200个

### 预估成本
- **初期（10个客户）**: 免费额度足够
- **成长期（50个客户）**: ~$25/月
- **规模化（200个客户）**: ~$100/月

## 🔄 与 Airtable 的协同

### 数据流向
```
Airtable (非敏感) ←→ Supabase (敏感)
     ↓                    ↓
   客户门户              内部系统
```

### 同步策略
- Airtable 存储客户基本信息、产品列表
- Supabase 存储详细画像、策略历史
- 通过 client_id 关联两套数据

## 📞 技术支持

如遇到问题：
1. 查看 Supabase 官方文档
2. 检查 SQL 脚本执行日志
3. 验证环境变量配置
4. 测试 API 连接


