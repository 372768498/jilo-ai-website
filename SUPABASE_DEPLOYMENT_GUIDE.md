# Supabase CRM系统数据库部署指南

## 📋 部署概览

本指南将帮助您在Supabase中部署AI驱动的出海营销中台客户管理系统的完整数据库架构。

## 🚀 部署步骤

### 步骤1: 准备Supabase项目

1. **登录Supabase控制台**
   - 访问: https://supabase.com/dashboard
   - 使用您的账户登录

2. **创建新项目** (如果还没有)
   - 点击 "New Project"
   - 选择组织
   - 输入项目名称: `ai-marketing-crm`
   - 选择数据库密码
   - 选择区域: `Asia Pacific (Singapore)` 或 `Asia Pacific (Tokyo)`
   - 点击 "Create new project"

3. **等待项目初始化**
   - 项目创建需要2-3分钟
   - 等待状态变为 "Active"

### 步骤2: 获取连接信息

1. **获取项目URL和API密钥**
   - 在项目仪表板中，点击 "Settings" → "API"
   - 复制以下信息:
     - `Project URL`: `https://your-project-id.supabase.co`
     - `anon public key`: `eyJ...` (长字符串)
     - `service_role key`: `eyJ...` (长字符串)

2. **获取数据库连接信息**
   - 点击 "Settings" → "Database"
   - 复制 `Connection string`:
     - `postgresql://postgres:[YOUR-PASSWORD]@db.your-project-id.supabase.co:5432/postgres`

### 步骤3: 执行SQL脚本

#### 方法1: 使用Supabase SQL编辑器 (推荐)

1. **打开SQL编辑器**
   - 在项目仪表板中，点击左侧菜单 "SQL Editor"
   - 点击 "New query"

2. **执行SQL脚本**
   - 复制 `data/crm-database-schema-2025-10-24.sql` 文件内容
   - 粘贴到SQL编辑器中
   - 点击 "Run" 执行脚本

#### 方法2: 使用psql命令行

1. **安装PostgreSQL客户端**
   ```bash
   # Windows (使用Chocolatey)
   choco install postgresql
   
   # macOS (使用Homebrew)
   brew install postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql-client
   ```

2. **连接数据库**
   ```bash
   psql "postgresql://postgres:[YOUR-PASSWORD]@db.your-project-id.supabase.co:5432/postgres"
   ```

3. **执行SQL脚本**
   ```bash
   \i data/crm-database-schema-2025-10-24.sql
   ```

### 步骤4: 验证部署

1. **检查表创建**
   ```sql
   -- 在SQL编辑器中执行
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```

2. **检查索引创建**
   ```sql
   -- 检查索引
   SELECT indexname, tablename 
   FROM pg_indexes 
   WHERE schemaname = 'public' 
   ORDER BY tablename, indexname;
   ```

3. **检查函数创建**
   ```sql
   -- 检查函数
   SELECT routine_name, routine_type 
   FROM information_schema.routines 
   WHERE routine_schema = 'public';
   ```

4. **检查视图创建**
   ```sql
   -- 检查视图
   SELECT table_name 
   FROM information_schema.views 
   WHERE table_schema = 'public';
   ```

### 步骤5: 配置环境变量

1. **创建.env.local文件**
   ```bash
   # 在项目根目录创建.env.local文件
   touch .env.local
   ```

2. **添加Supabase配置**
   ```env
   # Supabase配置
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key
   
   # 数据库连接
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project-id.supabase.co:5432/postgres
   ```

### 步骤6: 测试连接

1. **运行连接测试**
   ```bash
   npm run test-system
   ```

2. **检查Supabase连接**
   ```bash
   npm run health-check
   ```

## 📊 数据库架构概览

### 核心表结构

| 表名 | 描述 | 主要字段 |
|------|------|----------|
| `clients` | 客户信息表 | id, company_name, industry, contact_email |
| `orders` | 订单信息表 | id, client_id, order_number, order_value |
| `communications` | 沟通记录表 | id, client_id, channel, communication_date |
| `campaigns` | 营销活动表 | id, campaign_name, campaign_type, status |
| `users` | 用户信息表 | id, username, email, role |
| `system_config` | 系统配置表 | id, config_key, config_value |
| `audit_logs` | 审计日志表 | id, user_id, action, table_name |

### 数据库特性

- ✅ **UUID主键**: 使用UUID作为主键，确保全局唯一性
- ✅ **自动时间戳**: 自动更新created_at和updated_at字段
- ✅ **JSONB支持**: 存储复杂数据结构
- ✅ **索引优化**: 为常用查询字段创建索引
- ✅ **触发器**: 自动更新时间戳
- ✅ **视图**: 客户概览和销售业绩视图
- ✅ **函数**: 客户汇总信息函数
- ✅ **行级安全**: 启用RLS策略
- ✅ **审计日志**: 记录所有数据变更

## 🔒 安全配置

### 行级安全策略 (RLS)

```sql
-- 启用行级安全
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
```

### 用户角色权限

```sql
-- 创建角色
CREATE ROLE admin;
CREATE ROLE sales_manager;
CREATE ROLE sales_rep;
CREATE ROLE marketing_manager;
CREATE ROLE customer_service;
CREATE ROLE analyst;
```

## 📈 性能优化

### 索引策略

- **主键索引**: 所有表都有UUID主键索引
- **外键索引**: 为所有外键创建索引
- **查询索引**: 为常用查询字段创建索引
- **复合索引**: 为多字段查询创建复合索引

### 查询优化

- **视图**: 预计算常用查询结果
- **函数**: 封装复杂业务逻辑
- **触发器**: 自动维护数据一致性

## 🚨 故障排除

### 常见问题

1. **UUID扩展未启用**
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

2. **权限不足**
   - 确保使用service_role key
   - 检查RLS策略配置

3. **连接超时**
   - 检查网络连接
   - 验证连接字符串

4. **表已存在**
   ```sql
   -- 删除现有表 (谨慎使用)
   DROP TABLE IF EXISTS clients CASCADE;
   ```

### 日志查看

1. **Supabase日志**
   - 在控制台中查看 "Logs"
   - 监控SQL执行情况

2. **错误日志**
   - 检查 "Database" → "Logs"
   - 查看错误详情

## ✅ 部署验证清单

- [ ] Supabase项目已创建
- [ ] SQL脚本已执行
- [ ] 所有表已创建
- [ ] 索引已创建
- [ ] 触发器已创建
- [ ] 视图已创建
- [ ] 函数已创建
- [ ] 初始数据已插入
- [ ] 环境变量已配置
- [ ] 连接测试通过
- [ ] 权限配置正确
- [ ] RLS策略已启用

## 🎯 下一步

1. **API开发**: 开发RESTful API接口
2. **前端集成**: 连接前端应用
3. **用户认证**: 实现JWT认证
4. **数据迁移**: 导入现有数据
5. **性能测试**: 进行压力测试

## 📞 技术支持

如果遇到问题，请检查：
1. Supabase官方文档: https://supabase.com/docs
2. PostgreSQL文档: https://www.postgresql.org/docs/
3. 项目GitHub Issues: [项目仓库链接]

---

**部署完成后，您的CRM系统数据库将完全就绪！** 🎉


