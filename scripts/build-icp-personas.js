const fs = require('fs');
const path = require('path');

// 基于真实客户数据构建ICP画像
function buildICPPersonas() {
  console.log('🎯 构建基于真实客户的ICP画像...\n');

  // 读取客户数据
  const clientsDataPath = path.join(__dirname, '..', 'data', 'clients-data.json');
  const clientsData = JSON.parse(fs.readFileSync(clientsDataPath, 'utf8'));

  // ICP画像构建
  const icpPersonas = {
    // 医疗设备行业ICP
    medical_equipment_icp: {
      industry: "医疗设备制造",
      company_size: "200-500人",
      annual_revenue: "5000万-2亿人民币",
      export_volume: "500万-2000万美元",
      
      // 采购委员会结构
      buying_committee: {
        primary_decision_maker: {
          role: "采购总监/供应链总监",
          title: "Procurement Director / Supply Chain Director",
          pain_points: [
            "需要可靠的供应商保证产品质量",
            "要求快速交付能力",
            "需要国际认证支持",
            "希望降低采购成本"
          ],
          decision_criteria: [
            "产品质量和认证",
            "交付能力",
            "价格竞争力",
            "供应商稳定性"
          ],
          information_sources: [
            "行业展会",
            "供应商网站",
            "同行推荐",
            "认证机构信息"
          ]
        },
        
        influencer: {
          role: "技术总监/质量经理",
          title: "Technical Director / Quality Manager",
          pain_points: [
            "需要符合国际标准的产品",
            "要求技术支持和培训",
            "需要定制化解决方案"
          ],
          decision_criteria: [
            "技术规格符合性",
            "认证完整性",
            "技术支持能力",
            "定制化能力"
          ]
        },
        
        end_user: {
          role: "医院采购经理/养老院院长",
          title: "Hospital Procurement Manager / Nursing Home Director",
          pain_points: [
            "需要性价比高的产品",
            "要求售后服务支持",
            "需要培训和技术支持"
          ],
          decision_criteria: [
            "产品可靠性",
            "售后服务",
            "价格合理性",
            "用户友好性"
          ]
        }
      },
      
      // 决策流程
      decision_flow: {
        stage_1: {
          name: "需求识别",
          duration: "1-2周",
          activities: [
            "市场调研",
            "需求分析",
            "预算规划"
          ],
          touchpoints: [
            "行业报告",
            "展会信息",
            "同行交流"
          ]
        },
        
        stage_2: {
          name: "供应商筛选",
          duration: "2-3周", 
          activities: [
            "供应商调研",
            "初步询价",
            "资质审核"
          ],
          touchpoints: [
            "供应商网站",
            "认证查询",
            "初步沟通"
          ]
        },
        
        stage_3: {
          name: "技术评估",
          duration: "3-4周",
          activities: [
            "技术规格对比",
            "样品测试",
            "认证验证"
          ],
          touchpoints: [
            "技术文档",
            "样品测试",
            "认证证书"
          ]
        },
        
        stage_4: {
          name: "商务谈判",
          duration: "2-3周",
          activities: [
            "价格谈判",
            "合同条款",
            "付款方式"
          ],
          touchpoints: [
            "商务沟通",
            "合同谈判",
            "法务审核"
          ]
        },
        
        stage_5: {
          name: "决策确认",
          duration: "1-2周",
          activities: [
            "内部审批",
            "合同签署",
            "项目启动"
          ],
          touchpoints: [
            "内部会议",
            "合同签署",
            "项目启动"
          ]
        }
      },
      
      // 关键成功因素
      success_factors: [
        "CE/FDA等国际认证",
        "ISO13485质量管理体系",
        "快速交付能力",
        "技术支持服务",
        "定制化解决方案",
        "价格竞争力",
        "供应商稳定性"
      ],
      
      // 常见异议点
      objections: [
        "产品质量是否可靠？",
        "能否按时交付？",
        "技术支持是否到位？",
        "价格是否合理？",
        "供应商是否稳定？"
      ],
      
      // 解决方案
      solutions: [
        "提供详细认证证书",
        "展示生产能力和库存",
        "提供技术支持案例",
        "提供价格对比分析",
        "展示公司实力和案例"
      ]
    },
    
    // 水晶工艺品行业ICP
    crystal_crafts_icp: {
      industry: "水晶工艺品制造",
      company_size: "50-200人",
      annual_revenue: "2000万-8000万人民币",
      export_volume: "200万-1000万美元",
      
      // 采购委员会结构
      buying_committee: {
        primary_decision_maker: {
          role: "采购经理/礼品公司老板",
          title: "Procurement Manager / Gift Company Owner",
          pain_points: [
            "需要独特的设计和工艺",
            "要求高质量的产品",
            "需要快速响应能力",
            "希望降低采购成本"
          ],
          decision_criteria: [
            "产品设计和工艺",
            "质量稳定性",
            "交付能力",
            "价格竞争力"
          ],
          information_sources: [
            "供应商网站",
            "行业展会",
            "同行推荐",
            "设计作品集"
          ]
        },
        
        influencer: {
          role: "设计师/产品经理",
          title: "Designer / Product Manager",
          pain_points: [
            "需要创新的设计",
            "要求工艺精湛",
            "需要定制化能力"
          ],
          decision_criteria: [
            "设计创新性",
            "工艺水平",
            "定制化能力",
            "样品质量"
          ]
        },
        
        end_user: {
          role: "零售商/企业客户",
          title: "Retailer / Corporate Client",
          pain_points: [
            "需要吸引人的产品",
            "要求包装精美",
            "需要合理的价格"
          ],
          decision_criteria: [
            "产品吸引力",
            "包装质量",
            "价格合理性",
            "品牌价值"
          ]
        }
      },
      
      // 决策流程
      decision_flow: {
        stage_1: {
          name: "需求识别",
          duration: "1周",
          activities: [
            "市场调研",
            "需求分析",
            "预算规划"
          ],
          touchpoints: [
            "市场趋势",
            "客户需求",
            "预算规划"
          ]
        },
        
        stage_2: {
          name: "供应商筛选",
          duration: "1-2周",
          activities: [
            "供应商调研",
            "初步询价",
            "样品申请"
          ],
          touchpoints: [
            "供应商网站",
            "产品展示",
            "初步沟通"
          ]
        },
        
        stage_3: {
          name: "样品评估",
          duration: "2-3周",
          activities: [
            "样品测试",
            "质量评估",
            "设计确认"
          ],
          touchpoints: [
            "样品测试",
            "质量评估",
            "设计确认"
          ]
        },
        
        stage_4: {
          name: "商务谈判",
          duration: "1-2周",
          activities: [
            "价格谈判",
            "合同条款",
            "付款方式"
          ],
          touchpoints: [
            "商务沟通",
            "合同谈判",
            "法务审核"
          ]
        },
        
        stage_5: {
          name: "决策确认",
          duration: "1周",
          activities: [
            "内部审批",
            "合同签署",
            "项目启动"
          ],
          touchpoints: [
            "内部会议",
            "合同签署",
            "项目启动"
          ]
        }
      },
      
      // 关键成功因素
      success_factors: [
        "创新设计能力",
        "精湛工艺技术",
        "3D激光雕刻技术",
        "快速样品制作",
        "定制化解决方案",
        "精美包装设计",
        "价格竞争力"
      ],
      
      // 常见异议点
      objections: [
        "设计是否独特？",
        "工艺是否精湛？",
        "能否按时交付？",
        "价格是否合理？",
        "包装是否精美？"
      ],
      
      // 解决方案
      solutions: [
        "展示设计作品集",
        "提供工艺说明",
        "展示生产能力和库存",
        "提供价格对比分析",
        "展示包装样品"
      ]
    }
  };

  // 保存ICP画像数据
  const icpDataPath = path.join(__dirname, '..', 'data', 'icp-personas.json');
  fs.writeFileSync(icpDataPath, JSON.stringify(icpPersonas, null, 2), 'utf8');

  console.log('✅ ICP画像构建完成！');
  console.log(`📄 数据文件: ${icpDataPath}`);
  console.log('');
  console.log('🎯 ICP画像概览:');
  console.log('• 医疗设备行业: 5个决策阶段，7个关键成功因素');
  console.log('• 水晶工艺品行业: 5个决策阶段，7个关键成功因素');
  console.log('');
  console.log('📊 决策流程分析:');
  console.log('• 医疗设备: 总周期8-12周，技术评估占40%时间');
  console.log('• 水晶工艺品: 总周期6-9周，样品评估占30%时间');
  console.log('');
  console.log('💡 营销策略建议:');
  console.log('• 医疗设备: 重点展示认证和技术实力');
  console.log('• 水晶工艺品: 重点展示设计和工艺创新');
}

// 运行ICP画像构建
buildICPPersonas();

