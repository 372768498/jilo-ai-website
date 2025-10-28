# 🧪 AI营销中台 - 完整测试指南

## 🚀 快速开始测试

### 1. 环境准备
```bash
# 确保在项目根目录
cd ai-marketing-platform

# 安装依赖
npm install

# 运行快速设置
npm run setup
```

### 2. 配置检查
```bash
# 检查环境变量配置
npm run health-check
```

### 3. 系统测试
```bash
# 运行完整系统测试
npm run test
```

### 4. 创建测试数据
```bash
# 创建测试客户和内容
npm run create-test-client
```

### 5. 启动系统
```bash
# 启动完整系统
npm start
```

## 📋 测试步骤详解

### 步骤1：环境变量配置

创建 `.env.local` 文件并配置以下必需变量：

```bash
# Supabase 配置 (必需)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Airtable 配置 (必需)
AIRTABLE_API_KEY=your-airtable-api-key
AIRTABLE_BASE_ID=your-base-id

# Claude API 配置 (必需)
CLAUDE_API_KEY=your-claude-api-key

# 系统配置
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
```

### 步骤2：Supabase 项目设置

1. **创建项目**
   - 访问 [supabase.com](https://supabase.com)
   - 点击 "Start your project"
   - 选择 "New project"
   - 填写项目信息

2. **执行数据库脚本**
   - 在项目仪表板中，进入 **SQL Editor**
   - 复制 `supabase_schema.sql` 文件内容
   - 粘贴并执行 SQL 脚本
   - 验证表创建成功

3. **获取配置信息**
   - **Project URL**: `https://your-project-id.supabase.co`
   - **API Keys** → **anon public**: 用于客户端
   - **API Keys** → **service_role**: 用于服务端

### 步骤3：Airtable Base 设置

1. **创建 Base**
   - 访问 [airtable.com](https://airtable.com)
   - 创建新的 Base
   - 命名为 "AI营销中台"

2. **配置表结构**
   按照以下结构创建表：

   ```
   📊 Clients (客户主表)
   - 客户ID (Single line text)
   - 公司名 (Single line text)
   - 行业 (Single select)
   - GEO (Single select)
   - 服务包级别 (Single select)
   - 开始日期 (Date)
   - 状态 (Single select)
   - 联系人 (Single line text)
   - 邮箱 (Email)
   - 电话 (Phone number)
   - 目标市场 (Long text)
   - 年营收 (Single line text)
   - 员工数 (Single line text)

   📦 Products (产品库)
   - 产品ID (Single line text)
   - 客户ID (Single line text)
   - 产品名 (Single line text)
   - SKU (Single line text)
   - USP (Long text)
   - 目标市场 (Long text)
   - 禁用词 (Long text)
   - 认证 (Long text)
   - 价格区间 (Single line text)
   - MOQ (Single line text)
   - 交期 (Single line text)
   - 特殊能力 (Long text)

   👥 Personas (ICP画像)
   - 角色ID (Single line text)
   - 客户ID (Single line text)
   - 角色名称 (Single line text)
   - 职级 (Single select)
   - 部门 (Single line text)
   - 决策权重 (Number)
   - 关键痛点 (Long text)
   - 常见异议 (Long text)
   - 验证状态 (Single select)

   📝 Content_Queue (内容队列)
   - 内容ID (Single line text)
   - 客户ID (Single line text)
   - 类型 (Single select)
   - 状态 (Single select)
   - 创建时间 (Date)
   - 发布时间 (Date)
   - 标题 (Single line text)
   - 关键词 (Long text)
   - 目标平台 (Long text)
   - AI预审评分 (Number)
   - 人工审核状态 (Single select)
   - 审核备注 (Long text)

   🏢 Competitors (竞品库)
   - 竞品ID (Single line text)
   - 客户ID (Single line text)
   - 竞品名称 (Single line text)
   - 域名 (Single line text)
   - 监控指标 (Long text)
   - 最后更新时间 (Date)
   - 月访问量 (Number)
   - 域名评分 (Number)
   - 反链数 (Number)
   - 策略提示 (Long text)

   📈 Metrics (指标汇总)
   - 客户ID (Single line text)
   - 月份 (Date)
   - 自然流量 (Number)
   - MQL数 (Number)
   - CPL (Number)
   - 转化率 (Number)
   - 询盘数 (Number)
   - 成交数 (Number)
   - 成交金额 (Number)
   - ROI (Number)
   - 创建时间 (Date)
   - 最后更新 (Date)

   💰 Cost_Ledger (成本台账)
   - 记录ID (Single line text)
   - 客户ID (Single line text)
   - 内容ID (Single line text)
   - 调用时间 (Date)
   - 模型名称 (Single line text)
   - 成本 (Number)
   - 输入tokens (Number)
   - 输出tokens (Number)
   - 成功 (Checkbox)
   - 错误信息 (Long text)
   ```

3. **获取配置信息**
   - **API Key**: 在 Account 设置中获取
   - **Base ID**: 在 Base 的 API 文档中获取

### 步骤4：Claude API 配置

1. **获取 API Key**
   - 访问 [console.anthropic.com](https://console.anthropic.com)
   - 创建 API Key
   - 确保有足够的额度

2. **测试 API 连接**
   ```bash
   # 运行健康检查
   npm run health-check
   ```

## 🧪 测试流程

### 1. 基础连接测试
```bash
# 运行健康检查
npm run health-check
```

**预期结果：**
- ✅ 环境变量检查通过
- ✅ Supabase 连接正常
- ✅ Airtable 连接正常
- ✅ 模型网关正常

### 2. 完整系统测试
```bash
# 运行完整测试
npm run test
```

**预期结果：**
- ✅ 环境变量配置完整
- ✅ Supabase 连接和写入测试通过
- ✅ Airtable 连接测试通过
- ✅ 模型网关测试通过 (至少1个模型可用)
- ✅ 工作流引擎测试通过
- ✅ 系统集成测试通过

### 3. 测试数据创建
```bash
# 创建测试客户
npm run create-test-client
```

**预期结果：**
- ✅ 创建测试客户基础信息
- ✅ 创建2个产品信息
- ✅ 创建3个ICP画像
- ✅ 创建2个竞品信息
- ✅ 同步数据到Supabase
- ✅ 测试内容生成成功

### 4. 系统启动测试
```bash
# 启动系统
npm start
```

**预期结果：**
- ✅ 系统初始化成功
- ✅ MCP服务器启动成功
- ✅ 工作流引擎启动成功
- ✅ 系统监控启动成功
- ✅ 系统状态显示正常运行

## 🔍 测试验证点

### 1. 数据库连接验证
- Supabase 表创建成功
- 数据插入和查询正常
- 实时订阅功能正常

### 2. API 连接验证
- Airtable API 调用成功
- Claude API 文本生成正常
- 模型网关健康检查通过

### 3. 工作流验证
- 日报生成工作流正常
- 周报生成工作流正常
- SEO内容生成工作流正常
- 社媒内容生成工作流正常

### 4. 数据同步验证
- Airtable 到 Supabase 同步正常
- 客户能力清单同步成功
- ICP画像数据同步成功

### 5. 内容生成验证
- Claude 文本生成正常
- 日报内容生成成功
- 内容队列添加成功

## 🚨 常见问题解决

### 1. Supabase 连接失败
**问题**: `Supabase 连接失败: Invalid API key`
**解决**: 
- 检查 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- 确认 Supabase 项目已创建
- 验证 API Key 权限

### 2. Airtable 连接失败
**问题**: `Airtable 连接失败: Unauthorized`
**解决**:
- 检查 `AIRTABLE_API_KEY` 和 `AIRTABLE_BASE_ID`
- 确认 Airtable Base 已创建
- 验证 API Key 权限

### 3. Claude API 错误
**问题**: `Claude API 错误: Invalid API key`
**解决**:
- 检查 `CLAUDE_API_KEY` 配置
- 确认 API Key 有效
- 检查账户额度

### 4. 工作流不执行
**问题**: 定时任务不运行
**解决**:
- 检查系统时间设置
- 确认工作流配置正确
- 查看系统日志

### 5. 数据同步失败
**问题**: Airtable 和 Supabase 数据不同步
**解决**:
- 检查表结构是否匹配
- 确认字段名称正确
- 验证数据类型匹配

## 📊 测试结果评估

### 成功标准
- ✅ 所有基础连接测试通过
- ✅ 系统完整测试通过
- ✅ 测试数据创建成功
- ✅ 系统正常启动运行
- ✅ 内容生成功能正常

### 性能指标
- 系统启动时间 < 30秒
- API 响应时间 < 5秒
- 内容生成时间 < 60秒
- 内存使用率 < 80%

### 成本控制
- 日API调用成本 < $10
- 月总成本 < $100
- 单次内容生成成本 < $0.50

## 🎯 下一步行动

测试通过后，您可以：

1. **添加真实客户**: 替换测试数据为真实客户信息
2. **配置工作流**: 调整定时任务频率和内容
3. **监控系统**: 观察系统运行状态和成本
4. **扩展功能**: 根据需要添加更多API和功能
5. **优化性能**: 根据使用情况调整配置

---

**🎉 恭喜！如果所有测试都通过，您的AI营销中台已经可以正常使用了！**

