const fs = require('fs');
const path = require('path');

// ICP画像系统构建
function buildICPSystem() {
  console.log('🎯 构建完整的ICP画像系统...\n');

  // 读取客户数据和ICP画像
  const clientsDataPath = path.join(__dirname, '..', 'data', 'clients-data.json');
  const icpDataPath = path.join(__dirname, '..', 'data', 'icp-personas.json');
  
  const clientsData = JSON.parse(fs.readFileSync(clientsDataPath, 'utf8'));
  const icpData = JSON.parse(fs.readFileSync(icpDataPath, 'utf8'));

  const today = new Date();
  const reportDate = today.toISOString().split('T')[0];

  // 完整的ICP画像系统
  const icpSystem = {
    system_id: `ICP_SYSTEM_${reportDate.replace(/-/g, '')}`,
    created_date: reportDate,
    last_updated: new Date().toISOString(),
    
    // 系统概览
    system_overview: {
      total_personas: 4,
      industries_covered: 2,
      decision_stages: 5,
      total_clients: 2,
      system_status: "active"
    },
    
    // 医疗设备行业ICP画像
    medical_equipment_icp: {
      industry: "医疗设备制造",
      client_reference: "优逸行医疗科技",
      
      // 主要决策者画像
      primary_decision_maker: {
        persona_id: "MED_PDM_001",
        role: "采购总监/供应链总监",
        title: "Procurement Director / Supply Chain Director",
        
        // 基本信息
        basic_info: {
          age_range: "35-50岁",
          experience: "10-20年采购经验",
          education: "本科以上学历",
          location: "欧洲/北美/中东",
          company_size: "200-500人",
          annual_revenue: "5000万-2亿人民币"
        },
        
        // 痛点分析
        pain_points: [
          {
            pain: "需要可靠的供应商保证产品质量",
            impact: "高风险",
            frequency: "持续",
            solution: "展示CE/FDA认证，提供质量保证"
          },
          {
            pain: "要求快速交付能力",
            impact: "高影响",
            frequency: "经常",
            solution: "强调30-35天快速交付，展示生产能力"
          },
          {
            pain: "需要国际认证支持",
            impact: "中风险",
            frequency: "定期",
            solution: "提供完整认证证书，说明认证流程"
          },
          {
            pain: "希望降低采购成本",
            impact: "高影响",
            frequency: "持续",
            solution: "突出性价比优势，提供成本分析"
          }
        ],
        
        // 决策标准
        decision_criteria: [
          {
            criterion: "产品质量和认证",
            weight: "40%",
            our_score: "9/10",
            improvement: "持续展示认证优势"
          },
          {
            criterion: "交付能力",
            weight: "25%",
            our_score: "8/10",
            improvement: "强调快速交付能力"
          },
          {
            criterion: "价格竞争力",
            weight: "20%",
            our_score: "9/10",
            improvement: "突出性价比优势"
          },
          {
            criterion: "供应商稳定性",
            weight: "15%",
            our_score: "7/10",
            improvement: "展示公司实力和案例"
          }
        ],
        
        // 信息获取渠道
        information_sources: [
          {
            source: "行业展会",
            usage: "高",
            our_strategy: "积极参与国际医疗设备展会"
          },
          {
            source: "供应商网站",
            usage: "高",
            our_strategy: "优化官网，突出技术优势"
          },
          {
            source: "同行推荐",
            usage: "中",
            our_strategy: "建立客户推荐体系"
          },
          {
            source: "认证机构信息",
            usage: "中",
            our_strategy: "与认证机构建立合作关系"
          }
        ],
        
        // 沟通偏好
        communication_preferences: {
          preferred_channels: ["LinkedIn", "邮件", "电话"],
          response_time: "24小时内",
          meeting_preference: "视频会议",
          language: "英语",
          timezone: "客户当地时区"
        }
      },
      
      // 影响者画像
      influencer: {
        persona_id: "MED_INF_001",
        role: "技术总监/质量经理",
        title: "Technical Director / Quality Manager",
        
        // 基本信息
        basic_info: {
          age_range: "30-45岁",
          experience: "8-15年技术经验",
          education: "工程/医学背景",
          location: "全球",
          company_size: "200-500人"
        },
        
        // 痛点分析
        pain_points: [
          {
            pain: "需要符合国际标准的产品",
            impact: "高风险",
            frequency: "持续",
            solution: "详细说明技术规格和认证"
          },
          {
            pain: "要求技术支持和培训",
            impact: "中影响",
            frequency: "定期",
            solution: "提供技术支持和培训服务"
          },
          {
            pain: "需要定制化解决方案",
            impact: "中影响",
            frequency: "经常",
            solution: "展示OEM/ODM定制能力"
          }
        ],
        
        // 决策标准
        decision_criteria: [
          {
            criterion: "技术规格符合性",
            weight: "35%",
            our_score: "8/10",
            improvement: "加强技术文档展示"
          },
          {
            criterion: "认证完整性",
            weight: "30%",
            our_score: "9/10",
            improvement: "持续更新认证信息"
          },
          {
            criterion: "技术支持能力",
            weight: "20%",
            our_score: "7/10",
            improvement: "建立技术支持体系"
          },
          {
            criterion: "定制化能力",
            weight: "15%",
            our_score: "8/10",
            improvement: "展示定制化案例"
          }
        ]
      },
      
      // 最终用户画像
      end_user: {
        persona_id: "MED_EU_001",
        role: "医院采购经理/养老院院长",
        title: "Hospital Procurement Manager / Nursing Home Director",
        
        // 基本信息
        basic_info: {
          age_range: "40-55岁",
          experience: "5-15年管理经验",
          education: "医疗/管理背景",
          location: "全球",
          company_size: "100-1000人"
        },
        
        // 痛点分析
        pain_points: [
          {
            pain: "需要性价比高的产品",
            impact: "高影响",
            frequency: "持续",
            solution: "提供成本效益分析"
          },
          {
            pain: "要求售后服务支持",
            impact: "中影响",
            frequency: "定期",
            solution: "建立售后服务体系"
          },
          {
            pain: "需要培训和技术支持",
            impact: "中影响",
            frequency: "经常",
            solution: "提供培训和技术支持"
          }
        ],
        
        // 决策标准
        decision_criteria: [
          {
            criterion: "产品可靠性",
            weight: "30%",
            our_score: "8/10",
            improvement: "展示质量保证体系"
          },
          {
            criterion: "售后服务",
            weight: "25%",
            our_score: "7/10",
            improvement: "建立售后服务体系"
          },
          {
            criterion: "价格合理性",
            weight: "25%",
            our_score: "9/10",
            improvement: "突出性价比优势"
          },
          {
            criterion: "用户友好性",
            weight: "20%",
            our_score: "7/10",
            improvement: "提供使用指南和培训"
          }
        ]
      }
    },
    
    // 水晶工艺品行业ICP画像
    crystal_crafts_icp: {
      industry: "水晶工艺品制造",
      client_reference: "浦江轩映水晶",
      
      // 主要决策者画像
      primary_decision_maker: {
        persona_id: "CRYSTAL_PDM_001",
        role: "采购经理/礼品公司老板",
        title: "Procurement Manager / Gift Company Owner",
        
        // 基本信息
        basic_info: {
          age_range: "30-45岁",
          experience: "5-15年采购经验",
          education: "本科以上学历",
          location: "全球",
          company_size: "50-200人",
          annual_revenue: "2000万-8000万人民币"
        },
        
        // 痛点分析
        pain_points: [
          {
            pain: "需要独特的设计和工艺",
            impact: "高风险",
            frequency: "持续",
            solution: "展示3D激光雕刻技术和设计作品集"
          },
          {
            pain: "要求高质量的产品",
            impact: "高影响",
            frequency: "经常",
            solution: "提供质量保证和样品展示"
          },
          {
            pain: "需要快速响应能力",
            impact: "中影响",
            frequency: "经常",
            solution: "强调15-20天快速交付"
          },
          {
            pain: "希望降低采购成本",
            impact: "高影响",
            frequency: "持续",
            solution: "突出性价比优势，提供价格对比"
          }
        ],
        
        // 决策标准
        decision_criteria: [
          {
            criterion: "产品设计和工艺",
            weight: "35%",
            our_score: "8/10",
            improvement: "加强设计作品集展示"
          },
          {
            criterion: "质量稳定性",
            weight: "25%",
            our_score: "8/10",
            improvement: "提供质量保证体系"
          },
          {
            criterion: "交付能力",
            weight: "20%",
            our_score: "9/10",
            improvement: "强调快速交付优势"
          },
          {
            criterion: "价格竞争力",
            weight: "20%",
            our_score: "9/10",
            improvement: "突出性价比优势"
          }
        ],
        
        // 信息获取渠道
        information_sources: [
          {
            source: "供应商网站",
            usage: "高",
            our_strategy: "优化官网，突出设计优势"
          },
          {
            source: "行业展会",
            usage: "中",
            our_strategy: "参加设计展会，展示作品"
          },
          {
            source: "同行推荐",
            usage: "中",
            our_strategy: "建立客户推荐体系"
          },
          {
            source: "设计作品集",
            usage: "高",
            our_strategy: "制作精美作品集"
          }
        ],
        
        // 沟通偏好
        communication_preferences: {
          preferred_channels: ["Instagram", "邮件", "WhatsApp"],
          response_time: "12小时内",
          meeting_preference: "视频会议",
          language: "英语/客户当地语言",
          timezone: "客户当地时区"
        }
      },
      
      // 影响者画像
      influencer: {
        persona_id: "CRYSTAL_INF_001",
        role: "设计师/产品经理",
        title: "Designer / Product Manager",
        
        // 基本信息
        basic_info: {
          age_range: "25-40岁",
          experience: "3-10年设计经验",
          education: "设计/艺术背景",
          location: "全球",
          company_size: "50-200人"
        },
        
        // 痛点分析
        pain_points: [
          {
            pain: "需要创新的设计",
            impact: "高风险",
            frequency: "持续",
            solution: "展示创新设计作品集"
          },
          {
            pain: "要求工艺精湛",
            impact: "高影响",
            frequency: "经常",
            solution: "展示3D激光雕刻工艺"
          },
          {
            pain: "需要定制化能力",
            impact: "中影响",
            frequency: "经常",
            solution: "展示定制化案例"
          }
        ],
        
        // 决策标准
        decision_criteria: [
          {
            criterion: "设计创新性",
            weight: "40%",
            our_score: "8/10",
            improvement: "加强创新设计展示"
          },
          {
            criterion: "工艺水平",
            weight: "30%",
            our_score: "9/10",
            improvement: "突出3D技术优势"
          },
          {
            criterion: "定制化能力",
            weight: "20%",
            our_score: "8/10",
            improvement: "展示定制化案例"
          },
          {
            criterion: "样品质量",
            weight: "10%",
            our_score: "8/10",
            improvement: "提供高质量样品"
          }
        ]
      },
      
      // 最终用户画像
      end_user: {
        persona_id: "CRYSTAL_EU_001",
        role: "零售商/企业客户",
        title: "Retailer / Corporate Client",
        
        // 基本信息
        basic_info: {
          age_range: "35-50岁",
          experience: "5-20年商业经验",
          education: "本科以上学历",
          location: "全球",
          company_size: "20-500人"
        },
        
        // 痛点分析
        pain_points: [
          {
            pain: "需要吸引人的产品",
            impact: "高影响",
            frequency: "持续",
            solution: "展示精美产品设计"
          },
          {
            pain: "要求包装精美",
            impact: "中影响",
            frequency: "经常",
            solution: "提供精美包装设计"
          },
          {
            pain: "需要合理的价格",
            impact: "高影响",
            frequency: "持续",
            solution: "提供价格对比分析"
          }
        ],
        
        // 决策标准
        decision_criteria: [
          {
            criterion: "产品吸引力",
            weight: "30%",
            our_score: "8/10",
            improvement: "加强产品设计展示"
          },
          {
            criterion: "包装质量",
            weight: "25%",
            our_score: "7/10",
            improvement: "提升包装设计水平"
          },
          {
            criterion: "价格合理性",
            weight: "25%",
            our_score: "9/10",
            improvement: "突出性价比优势"
          },
          {
            criterion: "品牌价值",
            weight: "20%",
            our_score: "6/10",
            improvement: "加强品牌建设"
          }
        ]
      }
    },
    
    // 决策流程分析
    decision_flow_analysis: {
      medical_equipment: {
        total_duration: "8-12周",
        stages: [
          {
            stage: "需求识别",
            duration: "1-2周",
            key_activities: ["市场调研", "需求分析", "预算规划"],
            our_touchpoints: ["行业报告", "展会信息", "同行交流"],
            success_factors: ["需求理解准确", "预算充足", "时间充裕"]
          },
          {
            stage: "供应商筛选",
            duration: "2-3周",
            key_activities: ["供应商调研", "初步询价", "资质审核"],
            our_touchpoints: ["供应商网站", "认证查询", "初步沟通"],
            success_factors: ["资质齐全", "价格合理", "响应及时"]
          },
          {
            stage: "技术评估",
            duration: "3-4周",
            key_activities: ["技术规格对比", "样品测试", "认证验证"],
            our_touchpoints: ["技术文档", "样品测试", "认证证书"],
            success_factors: ["技术符合", "质量可靠", "认证完整"]
          },
          {
            stage: "商务谈判",
            duration: "2-3周",
            key_activities: ["价格谈判", "合同条款", "付款方式"],
            our_touchpoints: ["商务沟通", "合同谈判", "法务审核"],
            success_factors: ["价格合理", "条款公平", "付款灵活"]
          },
          {
            stage: "决策确认",
            duration: "1-2周",
            key_activities: ["内部审批", "合同签署", "项目启动"],
            our_touchpoints: ["内部会议", "合同签署", "项目启动"],
            success_factors: ["审批通过", "合同签署", "项目启动"]
          }
        ]
      },
      
      crystal_crafts: {
        total_duration: "6-9周",
        stages: [
          {
            stage: "需求识别",
            duration: "1周",
            key_activities: ["市场调研", "需求分析", "预算规划"],
            our_touchpoints: ["市场趋势", "客户需求", "预算规划"],
            success_factors: ["需求明确", "预算充足", "时间充裕"]
          },
          {
            stage: "供应商筛选",
            duration: "1-2周",
            key_activities: ["供应商调研", "初步询价", "样品申请"],
            our_touchpoints: ["供应商网站", "产品展示", "初步沟通"],
            success_factors: ["设计吸引", "价格合理", "响应及时"]
          },
          {
            stage: "样品评估",
            duration: "2-3周",
            key_activities: ["样品测试", "质量评估", "设计确认"],
            our_touchpoints: ["样品测试", "质量评估", "设计确认"],
            success_factors: ["样品质量", "设计符合", "工艺精湛"]
          },
          {
            stage: "商务谈判",
            duration: "1-2周",
            key_activities: ["价格谈判", "合同条款", "付款方式"],
            our_touchpoints: ["商务沟通", "合同谈判", "法务审核"],
            success_factors: ["价格合理", "条款公平", "付款灵活"]
          },
          {
            stage: "决策确认",
            duration: "1周",
            key_activities: ["内部审批", "合同签署", "项目启动"],
            our_touchpoints: ["内部会议", "合同签署", "项目启动"],
            success_factors: ["审批通过", "合同签署", "项目启动"]
          }
        ]
      }
    },
    
    // 营销策略建议
    marketing_strategy_recommendations: {
      content_strategy: [
        "针对不同角色制作差异化内容",
        "突出技术优势和设计创新",
        "提供详细的技术文档和案例",
        "建立客户成功故事库"
      ],
      
      channel_strategy: [
        "LinkedIn: 专业内容，技术展示",
        "Instagram: 视觉内容，设计展示",
        "邮件: 个性化内容，案例分享",
        "展会: 面对面交流，产品展示"
      ],
      
      timing_strategy: [
        "根据决策流程调整内容节奏",
        "在关键节点提供支持信息",
        "建立长期关系，持续价值提供",
        "快速响应，及时解决问题"
      ],
      
      personalization_strategy: [
        "基于角色定制内容",
        "根据痛点提供解决方案",
        "个性化沟通方式",
        "定制化服务方案"
      ]
    },
    
    // 系统维护
    system_maintenance: {
      update_frequency: "每月",
      data_sources: ["客户反馈", "市场调研", "竞品分析", "销售数据"],
      quality_metrics: [
        "画像准确性",
        "决策流程符合度",
        "营销效果",
        "客户满意度"
      ],
      improvement_areas: [
        "画像细化",
        "决策流程优化",
        "营销策略调整",
        "客户体验提升"
      ]
    }
  };

  // 保存ICP系统数据
  const icpSystemPath = path.join(__dirname, '..', 'data', `icp-system-${reportDate}.json`);
  fs.writeFileSync(icpSystemPath, JSON.stringify(icpSystem, null, 2), 'utf8');

  console.log('✅ ICP画像系统构建完成！');
  console.log(`📄 系统文件: ${icpSystemPath}`);
  console.log('');
  console.log('🎯 ICP画像系统概览:');
  console.log('• 医疗设备行业: 3个角色画像，5个决策阶段');
  console.log('• 水晶工艺品行业: 3个角色画像，5个决策阶段');
  console.log('• 总画像数量: 6个，决策阶段: 10个');
  console.log('');
  console.log('📊 关键画像特征:');
  console.log('• 医疗设备: 技术导向，认证重要，决策周期长');
  console.log('• 水晶工艺品: 设计导向，视觉重要，决策周期短');
  console.log('• 共同特征: 价格敏感，质量要求高，服务重要');
  console.log('');
  console.log('🎯 决策流程分析:');
  console.log('• 医疗设备: 8-12周，技术评估占40%时间');
  console.log('• 水晶工艺品: 6-9周，样品评估占30%时间');
  console.log('• 关键成功因素: 技术符合，质量可靠，价格合理');
  console.log('');
  console.log('💡 营销策略建议:');
  console.log('• 内容策略: 差异化内容，技术展示，案例分享');
  console.log('• 渠道策略: LinkedIn专业，Instagram视觉，邮件个性化');
  console.log('• 时机策略: 决策流程匹配，关键节点支持');
  console.log('• 个性化策略: 角色定制，痛点解决，服务定制');
}

// 运行ICP画像系统构建
buildICPSystem();


