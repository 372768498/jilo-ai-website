# Supabase CRM系统部署检查清单

## ✅ 部署前准备

### 1. Supabase项目准备
- [ ] 访问 https://supabase.com/dashboard
- [ ] 创建新项目: `ai-marketing-crm`
- [ ] 选择区域: `Asia Pacific (Singapore)` 或 `Asia Pacific (Tokyo)`
- [ ] 设置强密码 (保存好密码)
- [ ] 等待项目状态变为 "Active"

### 2. 获取连接信息
- [ ] 复制 Project URL: `https://your-project-id.supabase.co`
- [ ] 复制 anon public key: `eyJ...` (长字符串)
- [ ] 复制 service_role key: `eyJ...` (长字符串)
- [ ] 复制 Database URL: `postgresql://postgres:[PASSWORD]@db.your-project-id.supabase.co:5432/postgres`

## 🚀 数据库部署

### 3. 执行SQL脚本
- [ ] 打开项目仪表板
- [ ] 点击左侧菜单 "SQL Editor"
- [ ] 点击 "New query"
- [ ] 复制 `data/supabase-crm-deployment.sql` 文件内容
- [ ] 粘贴到SQL编辑器中
- [ ] 点击 "Run" 执行脚本
- [ ] 等待执行完成 (约30秒)

### 4. 验证部署结果
执行以下查询验证部署:

```sql
-- 检查表创建
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
-- 预期结果: 7个表 (clients, orders, communications, campaigns, users, system_config, audit_logs)

-- 检查索引创建
SELECT COUNT(*) as index_count
FROM pg_indexes 
WHERE schemaname = 'public' 
AND indexname LIKE 'idx_%';
-- 预期结果: 20+个索引

-- 检查函数创建
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public';
-- 预期结果: 2个函数 (update_updated_at_column, get_client_summary)

-- 检查视图创建
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public';
-- 预期结果: 2个视图 (client_overview, sales_performance)

-- 检查示例数据
SELECT company_name, industry, relationship_status 
FROM clients;
-- 预期结果: 2条客户记录 (优逸行医疗科技, 浦江轩映水晶)
```

## ⚙️ 环境配置

### 5. 配置环境变量
- [ ] 在项目根目录创建 `.env.local` 文件
- [ ] 添加以下配置:

```env
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key

# 数据库连接
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project-id.supabase.co:5432/postgres
```

### 6. 测试连接
- [ ] 运行连接测试: `npm run test-system`
- [ ] 运行健康检查: `npm run health-check`
- [ ] 检查所有组件状态为 "connected"

## 🔒 安全配置

### 7. 权限设置
- [ ] 确认行级安全已启用
- [ ] 检查用户角色已创建
- [ ] 验证API密钥权限正确

### 8. 数据安全
- [ ] 确认数据加密存储
- [ ] 检查审计日志功能
- [ ] 验证备份策略

## 📊 功能验证

### 9. 核心功能测试
- [ ] 客户表CRUD操作
- [ ] 订单表CRUD操作
- [ ] 沟通记录表CRUD操作
- [ ] 营销活动表CRUD操作
- [ ] 用户表CRUD操作
- [ ] 系统配置表CRUD操作

### 10. 高级功能测试
- [ ] 触发器自动更新时间戳
- [ ] 客户汇总信息函数
- [ ] 客户概览视图查询
- [ ] 销售业绩视图查询
- [ ] 审计日志记录

## 🎯 部署完成验证

### 最终检查清单
- [ ] 所有7个表创建成功
- [ ] 所有20+个索引创建成功
- [ ] 所有6个触发器创建成功
- [ ] 所有2个函数创建成功
- [ ] 所有2个视图创建成功
- [ ] 示例数据插入成功
- [ ] 环境变量配置正确
- [ ] 连接测试通过
- [ ] 权限配置正确
- [ ] 安全策略启用

## 🚨 故障排除

### 常见问题解决
1. **UUID扩展未启用**
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

2. **权限不足**
   - 确保使用service_role key
   - 检查RLS策略配置

3. **表已存在**
   - 脚本使用 IF NOT EXISTS，不会重复创建
   - 如需重新创建，先删除现有表

4. **连接超时**
   - 检查网络连接
   - 验证连接字符串格式

5. **执行失败**
   - 检查SQL语法
   - 查看错误日志
   - 分段执行脚本

## 📞 技术支持

如果遇到问题:
1. 查看Supabase官方文档: https://supabase.com/docs
2. 检查项目GitHub Issues
3. 联系技术支持团队

---

**部署完成后，您的CRM系统数据库将完全就绪！** 🎉

## 📋 部署总结

- **数据库**: Supabase (PostgreSQL)
- **表数量**: 7个核心表
- **索引数量**: 20+个优化索引
- **触发器**: 6个自动触发器
- **函数**: 2个业务函数
- **视图**: 2个业务视图
- **安全**: 行级安全策略
- **角色**: 6个用户角色
- **数据**: 示例客户数据
- **验证**: 自动部署验证

