const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// 简单的Supabase连接测试
async function testSupabaseConnection() {
  console.log('🧪 测试Supabase连接...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ 错误: 环境变量未配置');
    console.error('请确保 .env.local 文件已正确配置');
    return;
  }

  console.log('✅ 环境变量已加载');
  console.log(`• URL: ${supabaseUrl}`);
  console.log(`• Key: ${supabaseKey.substring(0, 20)}...\n`);

  // 创建Supabase客户端
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 测试查询clients表
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('company_name, industry, relationship_status')
      .limit(5);

    if (error) {
      console.error('❌ 查询失败:', error.message);
      console.error('错误代码:', error.code);
      
      if (error.code === 'PGRST116') {
        console.log('\n💡 提示: clients表可能尚未创建');
        console.log('请执行SQL脚本创建表结构');
      }
    } else {
      console.log('✅ Supabase连接成功！');
      console.log(`\n📊 查询结果 (${data.length} 条记录):`);
      
      if (data.length === 0) {
        console.log('⚠️  表为空，需要插入初始数据');
      } else {
        data.forEach((client, index) => {
          console.log(`${index + 1}. ${client.company_name}`);
          console.log(`   行业: ${client.industry}`);
          console.log(`   状态: ${client.relationship_status}`);
        });
      }
    }
  } catch (err) {
    console.error('❌ 连接异常:', err.message);
  }

  console.log('\n🎯 下一步:');
  console.log('• 查看Supabase Dashboard: https://yydbhdozewmptrgevytr.supabase.co');
  console.log('• 运行健康检查: npm run health-check');
  console.log('• 启动CRM演示: 在浏览器打开 crm-demo.html');
}

// 运行测试
testSupabaseConnection().catch(console.error);


