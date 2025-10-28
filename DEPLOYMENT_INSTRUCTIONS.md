# 🚀 Supabase CRM系统部署说明

## ✅ 环境配置已完成

### 您的Supabase信息
- **项目URL**: https://yydbhdozewmptrgevytr.supabase.co
- **数据库URL**: postgresql://postgres:1121@db.yydbhdozewmptrgevytr.supabase.co:5432/postgres
- **环境变量**: 已配置在 `.env.local` 文件

## 📋 手动部署步骤

由于Supabase JavaScript客户端限制，需要手动执行SQL脚本。请按照以下步骤操作：

### 步骤1: 访问Supabase Dashboard
1. 打开浏览器，访问: https://supabase.com/dashboard
2. 使用您的账户登录
3. 选择项目: **yydbhdozewmptrgevytr**

### 步骤2: 打开SQL编辑器
1. 点击左侧菜单 **"SQL Editor"** (SQL编辑器图标)
2. 点击 **"New query"** 按钮创建新查询

### 步骤3: 复制并执行SQL脚本
1. 打开文件: `data/supabase-crm-deployment.sql`
2. **复制全部内容** (Ctrl+A, Ctrl+C)
3. 粘贴到SQL编辑器中
4. 点击 **"Run"** 按钮执行脚本

### 步骤4: 等待执行完成
- 执行时间约 **30-60秒**
- 系统会显示执行进度
- 完成后会看到绿色成功提示

### 步骤5: 验证部署
在SQL编辑器中执行以下查询验证部署成功：

```sql
-- 检查表创建 (预期: 7个表)
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 检查示例客户数据 (预期: 2条记录)
SELECT company_name, industry, relationship_status 
FROM clients;

-- 检查视图创建 (预期: 2个视图)
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public';

-- 检查函数创建 (预期: 2个函数)
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public';
```

## 📊 预期结果

### 成功指标
✅ **7个表**: clients, orders, communications, campaigns, users, system_config, audit_logs  
✅ **2个视图**: client_overview, sales_performance  
✅ **2个函数**: update_updated_at_column, get_client_summary  
✅ **2条示例数据**: 优逸行医疗科技, 浦江轩映水晶  

### 如果看到以下错误

**1. UUID扩展错误**
```sql
-- 执行此命令
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

**2. 权限错误**
- 确保使用正确的项目
- 检查service_role key权限

**3. 表已存在**
- SQL脚本使用 `IF NOT EXISTS`，不会重复创建
- 如需重新创建，先删除现有表

## 🎯 部署完成后

### 运行测试
```bash
npm run test-supabase
npm run test-system
```

### 查看部署状态
在SQL编辑器中执行：
```sql
-- 查看CRM系统所有表
SELECT table_name, 
       (SELECT COUNT(*) FROM information_schema.columns 
        WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
AND table_name IN ('clients', 'orders', 'communications', 'campaigns', 'users', 'system_config', 'audit_logs')
ORDER BY table_name;
```

## 📞 技术支持

### 快速链接
- Supabase Dashboard: https://supabase.com/dashboard
- 项目URL: https://yydbhdozewmptrgevytr.supabase.co
- SQL脚本: `data/supabase-crm-deployment.sql`

### 常用SQL命令
```sql
-- 查看所有表
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- 查看索引
SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public';

-- 查看触发器
SELECT trigger_name, event_object_table FROM information_schema.triggers;

-- 重置数据库 (危险操作，谨慎使用)
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;
```

## 🎉 下一步

部署成功后，您可以：
1. ✅ 运行测试验证连接
2. ✅ 开始API开发
3. ✅ 集成前端应用
4. ✅ 配置用户认证
5. ✅ 导入真实数据

---

**祝您部署顺利！** 🚀


