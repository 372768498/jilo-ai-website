const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 加载环境变量
require('dotenv').config({ path: '.env.local' });

// Supabase自动化部署脚本
async function deploySupabaseCRM() {
  console.log('🚀 开始部署Supabase CRM系统...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ 错误: 环境变量未配置');
    console.error('请确保 .env.local 文件已正确配置');
    return;
  }

  console.log('✅ Supabase连接信息已加载');
  console.log(`• URL: ${supabaseUrl}`);
  console.log(`• Service Key: ${supabaseKey.substring(0, 20)}...`);
  console.log('');

  // 读取SQL脚本
  const sqlFilePath = path.join(__dirname, '..', 'data', 'supabase-crm-deployment.sql');
  
  if (!fs.existsSync(sqlFilePath)) {
    console.error('❌ 错误: SQL脚本文件不存在');
    console.error(`路径: ${sqlFilePath}`);
    return;
  }

  const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
  console.log('✅ SQL脚本已加载');
  console.log(`• 文件大小: ${(sqlScript.length / 1024).toFixed(2)} KB`);
  console.log('');

  // 创建Supabase客户端
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('📊 部署信息:');
  console.log('• 数据库: Supabase (PostgreSQL)');
  console.log('• 表数量: 7个核心表');
  console.log('• 索引数量: 20+个');
  console.log('• 触发器: 6个');
  console.log('• 函数: 2个');
  console.log('• 视图: 2个');
  console.log('');

  // 注意：Supabase JS客户端不直接支持执行自定义SQL
  // 需要使用Supabase Dashboard的SQL编辑器或REST API
  console.log('⚠️  注意: Supabase JavaScript客户端不直接支持执行自定义SQL脚本');
  console.log('');
  console.log('请按照以下步骤手动部署:');
  console.log('');
  console.log('📋 手动部署步骤:');
  console.log('1. 访问Supabase Dashboard: https://supabase.com/dashboard');
  console.log('2. 选择您的项目: yydbhdozewmptrgevytr');
  console.log('3. 点击左侧菜单 "SQL Editor"');
  console.log('4. 点击 "New query"');
  console.log('5. 复制以下文件内容:');
  console.log(`   ${sqlFilePath}`);
  console.log('6. 粘贴到SQL编辑器中');
  console.log('7. 点击 "Run" 执行脚本');
  console.log('');
  console.log('💡 或者，我可以为您生成一个简化的部署命令');
  console.log('');

  // 提供简化的SQL命令
  console.log('🔧 快速部署SQL命令（简化版）:');
  console.log('复制以下命令到Supabase SQL编辑器执行:');
  console.log('==========================================');
  
  // 提取并显示关键的SQL语句
  const keySQLStatements = [
    '-- 1. 启用UUID扩展',
    'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    '',
    '-- 2. 创建客户表',
    'CREATE TABLE IF NOT EXISTS clients (...)',
    '',
    '-- 3. 创建其他表...',
    '-- (完整SQL请查看 supabase-crm-deployment.sql)'
  ];

  keySQLStatements.forEach(stmt => console.log(stmt));
  
  console.log('==========================================');
  console.log('');
  console.log('📄 完整SQL脚本位置:');
  console.log(`   ${path.resolve(sqlFilePath)}`);
  console.log('');
  console.log('✅ 部署完成后，运行以下命令验证:');
  console.log('   npm run test-supabase');
  console.log('   npm run test-system');
}

// 运行部署脚本
deploySupabaseCRM().catch(console.error);
