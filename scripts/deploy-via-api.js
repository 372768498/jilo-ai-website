const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 加载环境变量
require('dotenv').config({ path: '.env.local' });

// 使用Supabase REST API执行SQL
async function deployViaSupabaseAPI() {
  console.log('🚀 开始通过Supabase API部署CRM系统...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ 错误: 环境变量未配置');
    return;
  }

  console.log('✅ Supabase连接信息已加载');
  console.log(`• URL: ${supabaseUrl}`);
  console.log('');

  // 读取SQL脚本
  const sqlFilePath = path.join(__dirname, '..', 'data', 'supabase-crm-deployment.sql');
  
  if (!fs.existsSync(sqlFilePath)) {
    console.error('❌ 错误: SQL脚本文件不存在');
    return;
  }

  const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
  console.log('✅ SQL脚本已加载');
  console.log(`• 文件大小: ${(sqlScript.length / 1024).toFixed(2)} KB`);
  console.log('');

  // 创建Supabase客户端
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false
    }
  });

  console.log('📊 部署信息:');
  console.log('• 数据库: Supabase (PostgreSQL)');
  console.log('• 方法: Supabase REST API');
  console.log('');

  // 注意：Supabase JS客户端没有直接执行SQL的API
  // 我们需要使用PostgREST API或者指导用户使用SQL编辑器
  console.log('⚠️  重要提示:');
  console.log('');
  console.log('Supabase JavaScript客户端不提供执行原生SQL的API。');
  console.log('需要通过以下方式部署:');
  console.log('');
  console.log('方案1: 使用Supabase Dashboard (推荐)');
  console.log('  1. 访问 https://supabase.com/dashboard');
  console.log('  2. 选择项目: yydbhdozewmptrgevytr');
  console.log('  3. 打开 SQL Editor');
 possibility.');

  // 使用PostgREST查询参数的方式无法执行DDL语句
  console.log('');
  console.log('方案2: 使用PostgreSQL客户端工具');
  console.log('  使用psql或pgAdmin等工具连接数据库执行SQL脚本');
  console.log('  连接字符串: postgresql://postgres:1121@db.yydbhdozewmptrgevytr.supabase.co:5432/postgres');
  console.log('');

  console.log('方案3: 使用Supabase CLI');
  console.log('  1. 安装: npm install -g supabase');
  console.log('  2. 登录: supabase login');
  console.log('   caption: supabase link --project-ref yydbhdozewmptrgevytr');
  console.log('  4. 执行: supabase db push < supabase-crm-deployment.sql');
  console.log('');

  // 提供快速测试连接的方法
  console.log('🔍 测试Supabase连接:');
  try {
    const { data, error } = await supabase.from('clients').select('count');
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('✅ Supabase连接成功');
        console.log('⚠️  clients表尚未创建，需要执行SQL脚本');
      } else {
        console.log('⚠️  连接测试结果:', error.message);
      }
    } else {
      console.log('✅ Supabase连接成功，clients表已存在');
    }
  } catch (err) {
    console.log('⚠️  连接测试异常:', err.message);
  }

  console.log('');
  console.log('📄 SQL脚本位置:');
  console.log(`   ${path.resolve(sqlFilePath)}`);
  console.log('');
  console.log('💡 建议操作:');
  console.log('   1. 访问 https://yydbhdozewmptrgevytr.supabase.co');
  console.log('   2. 登录Dashboard');
  console.log('   3. 打开SQL Editor');
  console.log('   4. 复制SQL脚本内容并执行');
  console.log('');
}

// 运行部署脚本
deployViaSupabaseAPI().catch(console.error);

