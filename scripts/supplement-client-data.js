const fs = require('fs');
const path = require('path');

// 客户信息补充脚本
function supplementClientData() {
  console.log('📊 补充客户信息到系统...\n');

  // 客户1：优逸行医疗科技
  const yoyicareClient = {
    client_id: "C001_YOYICARE",
    company_name: "浙江优逸行医疗科技有限公司",
    english_name: "Zhejiang Youyi Medical Technology Co., Ltd.",
    industry: "医疗设备制造",
    founded_year: 2013,
    employee_count: "200+",
    patent_count: "60+",
    website: "https://yoyicare.com/",
    contact_email: "cheelin@yoyicare.com",
    contact_phone: "+86 18905797831",
    address: "浙江省金华市永康市东城街道九龙北路640号",
    
    // 产品信息
    products: [
      {
        product_id: "P001",
        name: "电动轮椅",
        english_name: "Electric Wheelchair",
        category: "医疗设备",
        features: ["智能控制", "定制化", "CE认证", "FDA认证"],
        moq: "1件起订",
        lead_time: "30-35天",
        certifications: ["CE", "FDA", "ISO13485:2016", "中国医疗器械生产许可证"]
      },
      {
        product_id: "P002", 
        name: "制氧机",
        english_name: "Oxygen Concentrator",
        category: "医疗设备",
        features: ["高原机型", "静音设计", "全球电压适配"],
        moq: "1件起订",
        lead_time: "30-35天",
        certifications: ["CE", "FDA", "ISO13485:2016"]
      },
      {
        product_id: "P003",
        name: "护理床", 
        english_name: "Nursing Bed",
        category: "医疗设备",
        features: ["手动/电动", "升降功能", "前后倾斜", "语音控制"],
        moq: "1件起订",
        lead_time: "30-35天",
        certifications: ["CE", "FDA", "ISO13485:2016"]
      }
    ],
    
    // 目标市场
    target_markets: {
      primary: ["欧洲", "北美", "中东"],
      secondary: ["东南亚", "南美"],
      proven: ["德国", "美国", "阿联酋"]
    },
    
    // 竞争优势
    competitive_advantages: [
      "12年行业经验",
      "60+专利技术",
      "国家高新技术企业",
      "ISO13485:2016质量管理体系",
      "CE/FDA国际认证",
      "OEM/ODM定制服务",
      "200+专业团队"
    ],
    
    // 商业模式
    business_model: {
      moq: "1件起订",
      payment_terms: "30%定金，70%见提单付款",
      lead_time: "30-35天",
      oem_service: true,
      brand_customization: true,
      global_shipping: true
    },
    
    // 服务包级别
    service_package: "Silver Package",
    onboarding_date: "2025-01-27",
    status: "active"
  };

  // 客户2：浦江轩映水晶
  const shiningCrystalClient = {
    client_id: "C002_SHININGCRYSTAL",
    company_name: "浦江县轩映水晶工艺品有限公司",
    english_name: "Pujiang Shining Crystal Crafts Co., Ltd.",
    industry: "水晶工艺品制造",
    website: "https://www.cnshiningcrystal.com/",
    contact_email: "info@cnshiningcrystal.com",
    contact_phone: "+86-15267980528",
    address: "浙江省金华市浦江县西山北路183号43-1",
    
    // 产品信息
    products: [
      {
        product_id: "P004",
        name: "水晶奖杯",
        english_name: "Crystal Trophy",
        category: "水晶工艺品",
        features: ["3D激光雕刻", "定制化", "精美包装"],
        moq: "1件起订",
        lead_time: "15-20天",
        certifications: ["质量认证"]
      },
      {
        product_id: "P005",
        name: "水晶立方体",
        english_name: "Crystal Cube", 
        category: "水晶工艺品",
        features: ["3D激光雕刻", "多面切割", "光学效果"],
        moq: "1件起订",
        lead_time: "15-20天",
        certifications: ["质量认证"]
      },
      {
        product_id: "P006",
        name: "水晶工艺品",
        english_name: "Crystal Craft",
        category: "水晶工艺品", 
        features: ["手工制作", "精美设计", "礼品包装"],
        moq: "1件起订",
        lead_time: "15-20天",
        certifications: ["质量认证"]
      },
      {
        product_id: "P007",
        name: "水晶烛台",
        english_name: "Crystal Candle Holder",
        category: "家居装饰",
        features: ["精美切割", "家居装饰", "礼品用途"],
        moq: "1件起订", 
        lead_time: "15-20天",
        certifications: ["质量认证"]
      },
      {
        product_id: "P008",
        name: "水晶烟灰缸",
        english_name: "Crystal Ashtray",
        category: "办公用品",
        features: ["实用设计", "办公装饰", "商务礼品"],
        moq: "1件起订",
        lead_time: "15-20天", 
        certifications: ["质量认证"]
      },
      {
        product_id: "P009",
        name: "水晶时钟",
        english_name: "Crystal Clock",
        category: "计时装饰",
        features: ["计时功能", "装饰效果", "办公用品"],
        moq: "1件起订",
        lead_time: "15-20天",
        certifications: ["质量认证"]
      },
      {
        product_id: "P010",
        name: "水晶捕梦网",
        english_name: "Crystal Sun Catcher",
        category: "装饰挂件",
        features: ["装饰效果", "光线折射", "家居装饰"],
        moq: "1件起订",
        lead_time: "15-20天",
        certifications: ["质量认证"]
      },
      {
        product_id: "P011",
        name: "水晶吊坠",
        english_name: "Crystal Pendant",
        category: "首饰配件",
        features: ["首饰设计", "精美切割", "个性化定制"],
        moq: "1件起订",
        lead_time: "15-20天",
        certifications: ["质量认证"]
      }
    ],
    
    // 目标市场
    target_markets: {
      primary: ["欧洲", "北美", "中东"],
      secondary: ["东南亚", "南美", "非洲"],
      proven: ["美国", "英国", "法国", "德国"]
    },
    
    // 竞争优势
    competitive_advantages: [
      "3D激光雕刻技术",
      "持续研发投入",
      "经验丰富的专业团队",
      "高标准质量控制",
      "30+种语言支持",
      "全球市场覆盖",
      "OEM/ODM定制服务",
      "创新设计能力"
    ],
    
    // 商业模式
    business_model: {
      moq: "1件起订",
      payment_terms: "TT/D/P/D/A/L/C",
      lead_time: "15-20天",
      oem_service: true,
      brand_customization: true,
      global_shipping: true,
      multi_language: true
    },
    
    // 服务包级别
    service_package: "Silver Package",
    onboarding_date: "2025-01-27",
    status: "active"
  };

  // 保存客户数据
  const clientsData = {
    clients: [yoyicareClient, shiningCrystalClient],
    total_clients: 2,
    last_updated: new Date().toISOString(),
    summary: {
      yoyicare: {
        industry: "医疗设备制造",
        products: 3,
        certifications: 4,
        target_markets: 3
      },
      shining_crystal: {
        industry: "水晶工艺品制造", 
        products: 8,
        certifications: 1,
        target_markets: 3
      }
    }
  };

  // 保存到文件
  const outputPath = path.join(__dirname, '..', 'data', 'clients-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(clientsData, null, 2), 'utf8');

  console.log('✅ 客户信息已补充完成！');
  console.log(`📄 数据文件: ${outputPath}`);
  console.log('');
  console.log('📊 客户概览:');
  console.log(`• 优逸行医疗科技: ${yoyicareClient.products.length}个产品，${yoyicareClient.competitive_advantages.length}个竞争优势`);
  console.log(`• 浦江轩映水晶: ${shiningCrystalClient.products.length}个产品，${shiningCrystalClient.competitive_advantages.length}个竞争优势`);
  console.log('');
  console.log('🎯 符合P0目标客户画像:');
  console.log('• 行业: 医疗设备制造 + 水晶工艺品制造');
  console.log('• 规模: 200+员工，60+专利');
  console.log('• 出海阶段: 已有国际认证，支持全球销售');
  console.log('• 痛点: 需要提升线上询盘质量和转化率');
  console.log('• 决策特征: 支持定制化，接受OEM/ODM服务');
}

// 运行客户信息补充
supplementClientData();


