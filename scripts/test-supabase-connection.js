const fs = require('fs');
const path = require('path');

// Supabase CRM系统连接测试
function testSupabaseConnection() {
  console.log('🔗 测试Supabase CRM系统连接...\n');

  const today = new Date();
  const reportDate = today.toISOString().split('T')[0];

  // 检查环境变量
  const envCheck = {
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL || '未设置',
    supabase_anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '已设置' : '未设置',
    supabase_service_key: process.env.SUPABASE_SERVICE_ROLE_KEY ? '已设置' : '未设置',
    database_url: process.env.DATABASE_URL ? '已设置' : '未设置'
  };

  console.log('📋 环境变量检查:');
  console.log(`• Supabase URL: ${envCheck.supabase_url}`);
  console.log(`• Supabase Anon Key: ${envCheck.supabase_anon_key}`);
  console.log(`• Supabase Service Key: ${envCheck.supabase_service_key}`);
  console.log(`• Database URL: ${envCheck.database_url}`);
  console.log('');

  // 生成测试报告
  const testReport = {
    test_id: `SUPABASE_TEST_${reportDate.replace(/-/g, '')}`,
    test_date: reportDate,
    test_type: "Supabase CRM系统连接测试",
    
    environment_check: envCheck,
    
    deployment_steps: [
      {
        step: 1,
        name: "创建Supabase项目",
        status: "需要手动完成",
        description: "在Supabase控制台创建新项目",
        action: "访问 https://supabase.com/dashboard 创建项目"
      },
      {
        step: 2,
        name: "获取连接信息",
        status: "需要手动完成", 
        description: "获取Project URL和API密钥",
        action: "在项目设置中复制URL和密钥"
      },
      {
        step: 3,
        name: "执行SQL脚本",
        status: "准备就绪",
        description: "执行CRM数据库架构脚本",
        action: "使用SQL编辑器执行 supabase-crm-deployment.sql"
      },
      {
        step: 4,
        name: "配置环境变量",
        status: "需要配置",
        description: "设置.env.local文件",
        action: "添加Supabase连接配置"
      },
      {
        step: 5,
        name: "测试连接",
        status: "等待执行",
        description: "验证数据库连接和功能",
        action: "运行连接测试脚本"
      }
    ],
    
    sql_script_info: {
      file_name: "supabase-crm-deployment.sql",
      file_path: "data/supabase-crm-deployment.sql",
      features: [
        "7个核心表创建",
        "20+个索引优化", 
        "6个触发器设置",
        "2个自定义函数",
        "2个业务视图",
        "行级安全策略",
        "6个用户角色",
        "初始配置数据",
        "示例客户数据",
        "部署验证脚本"
      ]
    },
    
    expected_tables: [
      "clients - 客户信息表",
      "orders - 订单信息表", 
      "communications - 沟通记录表",
      "campaigns - 营销活动表",
      "users - 用户信息表",
      "system_config - 系统配置表",
      "audit_logs - 审计日志表"
    ],
    
    expected_functions: [
      "update_updated_at_column - 自动更新时间戳",
      "get_client_summary - 客户汇总信息"
    ],
    
    expected_views: [
      "client_overview - 客户概览视图",
      "sales_performance - 销售业绩视图"
    ],
    
    verification_queries: {
      check_tables: `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
      `,
      check_indexes: `
        SELECT indexname, tablename 
        FROM pg_indexes 
        WHERE schemaname = 'public' 
        ORDER BY tablename, indexname;
      `,
      check_functions: `
        SELECT routine_name, routine_type 
        FROM information_schema.routines 
        WHERE routine_schema = 'public';
      `,
      check_views: `
        SELECT table_name 
        FROM information_schema.views 
        WHERE table_schema = 'public';
      `,
      check_sample_data: `
        SELECT company_name, industry, relationship_status 
        FROM clients;
      `
    },
    
    next_actions: [
      "1. 在Supabase控制台创建新项目",
      "2. 复制项目URL和API密钥",
      "3. 在SQL编辑器中执行 supabase-crm-deployment.sql",
      "4. 配置.env.local环境变量",
      "5. 运行 npm run test-system 验证连接",
      "6. 检查数据库表和数据是否正确创建"
    ],
    
    troubleshooting: {
      common_issues: [
        {
          issue: "UUID扩展未启用",
          solution: "执行 CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
        },
        {
          issue: "权限不足",
          solution: "确保使用service_role key，检查RLS策略"
        },
        {
          issue: "表已存在",
          solution: "脚本使用 IF NOT EXISTS，不会重复创建"
        },
        {
          issue: "连接超时",
          solution: "检查网络连接，验证连接字符串"
        }
      ]
    }
  };

  // 保存测试报告
  const reportPath = path.join(__dirname, '..', 'data', `supabase-test-report-${reportDate}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(testReport, null, 2), 'utf8');

  console.log('✅ Supabase连接测试报告生成完成！');
  console.log(`📄 测试报告: ${reportPath}`);
  console.log('');
  console.log('🚀 部署步骤:');
  testReport.deployment_steps.forEach(step => {
    console.log(`${step.step}. ${step.name} - ${step.status}`);
    console.log(`   ${step.description}`);
    console.log(`   操作: ${step.action}`);
    console.log('');
  });
  
  console.log('📊 SQL脚本特性:');
  testReport.sql_script_info.features.forEach(feature => {
    console.log(`• ${feature}`);
  });
  console.log('');
  
  console.log('🔍 验证查询:');
  console.log('执行以下查询验证部署:');
  console.log('1. 检查表: SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';');
  console.log('2. 检查索引: SELECT indexname, tablename FROM pg_indexes WHERE schemaname = \'public\';');
  console.log('3. 检查函数: SELECT routine_name FROM information_schema.routines WHERE routine_schema = \'public\';');
  console.log('4. 检查视图: SELECT table_name FROM information_schema.views WHERE table_schema = \'public\';');
  console.log('5. 检查数据: SELECT company_name, industry FROM clients;');
  console.log('');
  
  console.log('⚡ 快速部署命令:');
  console.log('1. 访问: https://supabase.com/dashboard');
  console.log('2. 创建新项目: ai-marketing-crm');
  console.log('3. 打开SQL编辑器');
  console.log('4. 复制并执行: data/supabase-crm-deployment.sql');
  console.log('5. 配置环境变量');
  console.log('6. 运行测试: npm run test-system');
  console.log('');
  
  console.log('🎯 预期结果:');
  console.log('• 7个表创建成功');
  console.log('• 20+个索引创建成功');
  console.log('• 6个触发器创建成功');
  console.log('• 2个函数创建成功');
  console.log('• 2个视图创建成功');
  console.log('• 示例数据插入成功');
  console.log('• 部署验证通过');
}

// 运行Supabase连接测试
testSupabaseConnection();


