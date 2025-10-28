const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// 使用 service role key 绕过 RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yydbhdozewmptrgevytr.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZGJoZG96ZXdtcHRyZ2V2eXRyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTUyNDc4MCwiZXhwIjoyMDc3MTAwNzgwfQ.zB2-TMgKEIBVUZ84gQ94Uj6FmpBzO_m8bVWcEfK8KNE';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sampleClients = [
  {
    company_name: '浙江优逸行医疗科技有限公司',
    english_name: 'Zhejiang Youyi Medical Technology Co., Ltd.',
    industry: '医疗设备制造',
    company_size: '200+',
    annual_revenue: 50000000,
    founded_year: 2013,
    headquarters: '浙江省金华市永康市东城街道九龙北路640号',
    website: 'https://yoyicare.com/',
    contact_email: 'cheelin@yoyicare.com',
    contact_phone: '+86 18905797831',
    target_markets: ['欧洲', '北美', '中东'],
    main_products: ['电动轮椅', '制氧机', '护理床'],
    certifications: ['ISO13485:2016', 'CE', 'FDA'],
    competitive_advantages: ['12年行业经验', '60+专利技术', '国家高新技术企业'],
    service_package: 'Silver Package',
    relationship_status: 'active',
    total_spent: 50000,
    credit_rating: 'A'
  },
  {
    company_name: '浦江县轩映水晶工艺品有限公司',
    english_name: 'Pujiang Shining Crystal Crafts Co., Ltd.',
    industry: '水晶工艺品制造',
    company_size: '50-200',
    annual_revenue: 30000000,
    founded_year: 2010,
    headquarters: '浙江省金华市浦江县西山北路183号',
    website: 'https://www.cnshiningcrystal.com/',
    contact_email: 'info@cnshiningcrystal.com',
    contact_phone: '+86-15267980528',
    target_markets: ['欧洲', '北美', '中东'],
    main_products: ['水晶奖杯', '水晶工艺品', '水晶礼品'],
    certifications: ['质量认证', '出口许可'],
    competitive_advantages: ['3D激光雕刻技术', '15年行业经验', '1件起订'],
    service_package: 'Silver Package',
    relationship_status: 'active',
    total_spent: 30000,
    credit_rating: 'A-'
  }
];

async function createSampleClients() {
  console.log('🚀 开始创建示例客户数据（使用 admin key）...\n');

  for (const client of sampleClients) {
    try {
      console.log(`📝 创建客户: ${client.company_name}`);
      
      const { data, error } = await supabase
        .from('clients')
        .insert([client])
        .select()
        .single();

      if (error) {
        console.error(`   ❌ 创建失败:`, error.message);
      } else {
        console.log(`   ✅ 创建成功! ID: ${data.id}`);
      }
    } catch (err) {
      console.error(`   ❌ 错误:`, err.message);
    }
  }

  console.log('\n✅ 示例客户数据创建完成!\n');
  
  const { data: clients } = await supabase
    .from('clients')
    .select('id, company_name, industry, service_package, relationship_status')
    .order('created_at', { ascending: false });

  console.log(`📊 当前数据库中共有 ${clients?.length || 0} 个客户:\n`);
  clients?.forEach((client, index) => {
    console.log(`${index + 1}. ${client.company_name} (${client.industry})`);
  });
}

createSampleClients().catch(console.error);

