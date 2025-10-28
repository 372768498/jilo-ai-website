# AI营销中台 - 快速启动指南

## 🚀 5分钟快速启动

### 1. 环境准备
```bash
# 确保 Node.js 版本 >= 18
node --version

# 克隆项目（如果还没有）
git clone <your-repo-url>
cd ai-marketing-platform

# 安装依赖
npm install
```

### 2. 配置 Supabase
1. 访问 [supabase.com](https://supabase.com) 创建项目
2. 在项目设置中获取：
   - Project URL
   - anon public key
   - service_role key
3. 在 SQL Editor 中执行 `supabase_schema.sql`

### 3. 配置 Airtable
1. 访问 [airtable.com](https://airtable.com) 创建 Base
2. 按照 `AIRTABLE_TABLES` 配置创建表结构
3. 获取 API Key 和 Base ID

### 4. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑配置文件
nano .env.local
```

**最少配置（必需）：**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
AIRTABLE_API_KEY=your-airtable-key
AIRTABLE_BASE_ID=your-base-id
CLAUDE_API_KEY=your-claude-key
```

### 5. 启动系统
```bash
# 开发模式启动
npm run dev

# 生产模式启动
npm start
```

### 6. 验证系统状态
```bash
# 健康检查
npm run health-check
```

## 📊 系统架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                    AI营销中台架构                            │
├─────────────────────────────────────────────────────────────┤
│  前端层: Next.js 客户门户 + Softr/Stacker 交付窗口          │
├─────────────────────────────────────────────────────────────┤
│  编排层: Trae 工作流引擎 (信号驱动 + 异常处理)               │
├─────────────────────────────────────────────────────────────┤
│  智能层: Claude API 集群 (内容生成 + 策略决策)               │
├─────────────────────────────────────────────────────────────┤
│  抽象层: MAL 模型网关 (多模型 + 自动降级)                   │
├─────────────────────────────────────────────────────────────┤
│  执行层: MCP 服务器集群 (市场情报 + 竞品监控)                │
├─────────────────────────────────────────────────────────────┤
│  数据层: Airtable (非敏感) + Supabase (敏感)                │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 核心组件说明

### 1. Supabase (敏感数据存储)
- **用途**: ICP详细画像、竞品情报、策略历史、API使用日志
- **优势**: 实时订阅、自动API生成、行级安全策略
- **成本**: 免费额度500MB，足够初期使用

### 2. Airtable (非敏感数据存储)
- **用途**: 客户信息、产品库、内容队列、竞品基础信息
- **优势**: 可视化界面、易于管理、API友好
- **成本**: 免费额度1200条记录/月

### 3. 模型抽象层 (MAL)
- **图像**: NANOBANANA → Midjourney → DALL-E
- **视频**: SORA2 → VEO3.1 → Pika → Runway
- **文本**: Claude-3-Sonnet → GPT-4 → Gemini-Pro
- **特性**: 自动降级、成本追踪、健康检查

### 4. MCP 服务器集群
- **市场情报**: Google Trends、新闻API、LinkedIn、Reddit
- **客户能力**: 供应能力验证、库存状态同步
- **竞品监控**: SimilarWeb、Ahrefs、内容爬虫

### 5. Trae 工作流引擎
- **定时任务**: 日报、周报、SEO内容、社媒内容
- **信号驱动**: 市场信号处理、应急响应
- **异常处理**: 成本监控、性能监控、账号健康度

## 📈 业务工作流

### 日报生成流程
```
1. MCP采集市场信号 → 2. Claude分析影响 → 3. 生成日报内容 → 
4. AI预审评分 → 5. 人工核验 → 6. 推送到客户门户
```

### SEO内容生成流程
```
1. 获取产品信息 → 2. 分析竞品内容 → 3. Claude生成SEO文章 → 
4. GEO优化处理 → 5. AI预审 → 6. 人工审核 → 7. 发布到网站
```

### 应急响应流程
```
1. 异常检测 → 2. 证据收集 → 3. Claude分析根因 → 
4. 生成A/B/C方案 → 5. 客户确认 → 6. 执行调整
```

## 💰 成本控制

### 免费额度
- **Supabase**: 500MB数据库 + 2GB带宽
- **Airtable**: 1200条记录/月
- **Claude**: 按使用量计费

### 预估成本（10个客户）
- **Supabase**: 免费
- **Airtable**: 免费
- **Claude API**: ~$50/月
- **其他API**: ~$30/月
- **总计**: ~$80/月

### 成本优化策略
1. **智能降级**: 优先使用低成本模型
2. **批量处理**: 减少API调用次数
3. **缓存机制**: 避免重复计算
4. **预算控制**: 设置日/月成本上限

## 🛡️ 安全最佳实践

### 1. API密钥管理
- 使用环境变量存储敏感信息
- 定期轮换API密钥
- 服务端密钥永远不暴露给客户端

### 2. 数据访问控制
- Supabase行级安全策略
- 用户只能访问自己的数据
- 敏感操作需要服务端密钥

### 3. 内容审核
- AI预审 + 人工核验双重保障
- 禁用词过滤
- 合规性检查

## 📞 技术支持

### 常见问题
1. **Supabase连接失败**: 检查URL和密钥配置
2. **Airtable同步失败**: 验证API Key和Base ID
3. **Claude API错误**: 确认API Key有效性和额度
4. **工作流不执行**: 检查定时任务配置

### 调试工具
```bash
# 查看系统状态
npm run health-check

# 查看日志
tail -f logs/system.log

# 测试API连接
node scripts/test-apis.js
```

### 联系方式
- 技术文档: [项目Wiki](https://github.com/your-org/ai-marketing-platform/wiki)
- 问题反馈: [GitHub Issues](https://github.com/your-org/ai-marketing-platform/issues)
- 技术支持: support@your-domain.com

## 🎯 下一步行动

1. **完成基础配置**: 按照本指南完成系统搭建
2. **添加测试客户**: 创建1-2个测试客户验证功能
3. **配置工作流**: 启用日报、周报等核心工作流
4. **监控系统**: 观察系统运行状态和成本
5. **扩展功能**: 根据需要添加更多API和功能

---

**🎉 恭喜！您已经成功搭建了AI营销中台的基础架构。现在可以开始为客户提供AI驱动的营销服务了！**


