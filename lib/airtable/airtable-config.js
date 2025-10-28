// Airtable 配置和集成
// lib/airtable/airtable-config.js

import Airtable from 'airtable'

// Airtable 配置
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
})

const base = airtable.base(process.env.AIRTABLE_BASE_ID)

// Airtable 表结构定义
export const AIRTABLE_TABLES = {
  CLIENTS: 'Clients',
  PRODUCTS: 'Products', 
  PERSONAS: 'Personas',
  CONTENT_QUEUE: 'Content_Queue',
  COMPETITORS: 'Competitors',
  METRICS: 'Metrics',
  COST_LEDGER: 'Cost_Ledger'
}

// Airtable 服务类
export class AirtableService {
  
  // 客户管理
  static async createClient(clientData) {
    const records = await base(AIRTABLE_TABLES.CLIENTS).create([
      {
        fields: {
          '客户ID': clientData.clientId,
          '公司名': clientData.companyName,
          '行业': clientData.industry,
          'GEO': clientData.geo,
          '服务包级别': clientData.serviceLevel,
          '开始日期': clientData.startDate,
          '状态': clientData.status || 'active',
          '联系人': clientData.contactPerson,
          '邮箱': clientData.email,
          '电话': clientData.phone,
          '目标市场': clientData.targetMarkets,
          '年营收': clientData.annualRevenue,
          '员工数': clientData.employeeCount
        }
      }
    ])
    return records[0]
  }

  static async getClient(clientId) {
    const records = await base(AIRTABLE_TABLES.CLIENTS)
      .select({
        filterByFormula: `{客户ID} = '${clientId}'`
      })
      .firstPage()
    
    return records[0]?.fields
  }

  static async getAllClients() {
    const records = await base(AIRTABLE_TABLES.CLIENTS)
      .select()
      .all()
    
    return records.map(record => record.fields)
  }

  // 产品管理
  static async createProduct(clientId, productData) {
    const records = await base(AIRTABLE_TABLES.PRODUCTS).create([
      {
        fields: {
          '产品ID': productData.productId,
          '客户ID': clientId,
          '产品名': productData.productName,
          'SKU': productData.sku,
          'USP': productData.usp,
          '目标市场': productData.targetMarkets,
          '禁用词': productData.forbiddenWords?.join(', '),
          '认证': productData.certifications?.join(', '),
          '价格区间': productData.priceRange,
          'MOQ': productData.moq,
          '交期': productData.deliveryTime,
          '特殊能力': productData.specialCapabilities?.join(', ')
        }
      }
    ])
    return records[0]
  }

  static async getClientProducts(clientId) {
    const records = await base(AIRTABLE_TABLES.PRODUCTS)
      .select({
        filterByFormula: `{客户ID} = '${clientId}'`
      })
      .all()
    
    return records.map(record => record.fields)
  }

  // ICP 画像管理（Airtable 存储基础信息，详细数据在 Supabase）
  static async createPersona(clientId, personaData) {
    const records = await base(AIRTABLE_TABLES.PERSONAS).create([
      {
        fields: {
          '角色ID': personaData.roleId,
          '客户ID': clientId,
          '角色名称': personaData.roleName,
          '职级': personaData.seniorityLevel,
          '部门': personaData.department,
          '决策权重': personaData.decisionWeight,
          '关键痛点': personaData.keyPainPoints?.join(', '),
          '常见异议': personaData.commonObjections?.join(', '),
          '验证状态': personaData.verificationStatus || 'pending'
        }
      }
    ])
    return records[0]
  }

  // 内容队列管理
  static async addToContentQueue(contentData) {
    const records = await base(AIRTABLE_TABLES.CONTENT_QUEUE).create([
      {
        fields: {
          '内容ID': contentData.contentId,
          '客户ID': contentData.clientId,
          '类型': contentData.type, // 日报/周报/SEO/社媒/视频
          '状态': contentData.status || '待生成',
          '创建时间': contentData.createdAt || new Date().toISOString(),
          '发布时间': contentData.publishAt,
          '标题': contentData.title,
          '关键词': contentData.keywords?.join(', '),
          '目标平台': contentData.targetPlatforms?.join(', '),
          'AI预审评分': contentData.aiScore,
          '人工审核状态': contentData.humanReviewStatus,
          '审核备注': contentData.reviewNotes
        }
      }
    ])
    return records[0]
  }

  static async updateContentStatus(contentId, status, additionalData = {}) {
    const records = await base(AIRTABLE_TABLES.CONTENT_QUEUE)
      .select({
        filterByFormula: `{内容ID} = '${contentId}'`
      })
      .firstPage()
    
    if (records.length > 0) {
      const record = records[0]
      await record.updateFields({
        '状态': status,
        ...additionalData
      })
      return record.fields
    }
    return null
  }

  // 竞品管理
  static async addCompetitor(clientId, competitorData) {
    const records = await base(AIRTABLE_TABLES.COMPETITORS).create([
      {
        fields: {
          '竞品ID': competitorData.competitorId,
          '客户ID': clientId,
          '竞品名称': competitorData.name,
          '域名': competitorData.domain,
          '监控指标': competitorData.monitoringMetrics?.join(', '),
          '最后更新时间': competitorData.lastUpdated || new Date().toISOString(),
          '月访问量': competitorData.monthlyVisits,
          '域名评分': competitorData.domainRating,
          '反链数': competitorData.backlinks,
          '策略提示': competitorData.strategyTips
        }
      }
    ])
    return records[0]
  }

  static async getClientCompetitors(clientId) {
    const records = await base(AIRTABLE_TABLES.COMPETITORS)
      .select({
        filterByFormula: `{客户ID} = '${clientId}'`
      })
      .all()
    
    return records.map(record => record.fields)
  }

  // 指标管理
  static async updateMetrics(clientId, month, metricsData) {
    // 先查找是否已存在该月的记录
    const existingRecords = await base(AIRTABLE_TABLES.METRICS)
      .select({
        filterByFormula: `AND({客户ID} = '${clientId}', {月份} = '${month}')`
      })
      .firstPage()
    
    if (existingRecords.length > 0) {
      // 更新现有记录
      const record = existingRecords[0]
      await record.updateFields({
        '自然流量': metricsData.organicTraffic,
        'MQL数': metricsData.mqlCount,
        'CPL': metricsData.cpl,
        '转化率': metricsData.conversionRate,
        '询盘数': metricsData.inquiries,
        '成交数': metricsData.deals,
        '成交金额': metricsData.dealValue,
        'ROI': metricsData.roi,
        '最后更新': new Date().toISOString()
      })
      return record.fields
    } else {
      // 创建新记录
      const records = await base(AIRTABLE_TABLES.METRICS).create([
        {
          fields: {
            '客户ID': clientId,
            '月份': month,
            '自然流量': metricsData.organicTraffic,
            'MQL数': metricsData.mqlCount,
            'CPL': metricsData.cpl,
            '转化率': metricsData.conversionRate,
            '询盘数': metricsData.inquiries,
            '成交数': metricsData.deals,
            '成交金额': metricsData.dealValue,
            'ROI': metricsData.roi,
            '创建时间': new Date().toISOString()
          }
        }
      ])
      return records[0].fields
    }
  }

  // 成本台账管理
  static async logCost(costData) {
    const records = await base(AIRTABLE_TABLES.COST_LEDGER).create([
      {
        fields: {
          '记录ID': costData.recordId,
          '客户ID': costData.clientId,
          '内容ID': costData.contentId,
          '调用时间': costData.callTime,
          '模型名称': costData.modelName,
          '成本': costData.cost,
          '输入tokens': costData.inputTokens,
          '输出tokens': costData.outputTokens,
          '成功': costData.success,
          '错误信息': costData.errorMessage
        }
      }
    ])
    return records[0]
  }

  static async getClientCosts(clientId, startDate, endDate) {
    const records = await base(AIRTABLE_TABLES.COST_LEDGER)
      .select({
        filterByFormula: `AND({客户ID} = '${clientId}', {调用时间} >= '${startDate}', {调用时间} <= '${endDate}')`
      })
      .all()
    
    return records.map(record => record.fields)
  }

  // 数据同步方法（Airtable ↔ Supabase）
  static async syncClientData(clientId) {
    try {
      // 从 Airtable 获取基础信息
      const clientData = await this.getClient(clientId)
      const products = await this.getClientProducts(clientId)
      const personas = await base(AIRTABLE_TABLES.PERSONAS)
        .select({
          filterByFormula: `{客户ID} = '${clientId}'`
        })
        .all()
      
      // 同步到 Supabase（需要导入 SupabaseService）
      const { SupabaseService } = await import('../supabase/supabase-config')
      
      // 更新客户能力清单
      await SupabaseService.updateClientCapabilities(clientId, {
        products: products.map(p => ({
          name: p['产品名'],
          sku: p['SKU'],
          usp: p['USP'],
          certifications: p['认证']?.split(', ') || [],
          priceRange: p['价格区间'],
          moq: p['MOQ'],
          deliveryTime: p['交期'],
          specialCapabilities: p['特殊能力']?.split(', ') || []
        })),
        capacity: {
          monthlyProduction: clientData['月产量'] || 0,
          inventory: clientData['库存'] || 0,
          deliveryTime: clientData['交期'] || '30天'
        },
        markets: clientData['目标市场']?.split(', ') || [],
        advantages: clientData['竞争优势']?.split(', ') || [],
        constraints: {
          moq: clientData['最小订单量'] || 0,
          paymentTerms: clientData['付款方式'] || 'T/T'
        },
        certifications: clientData['认证']?.split(', ') || [],
        specialCapabilities: clientData['特殊能力']?.split(', ') || []
      })
      
      return { success: true, message: '数据同步成功' }
    } catch (error) {
      console.error('数据同步失败:', error)
      return { success: false, message: error.message }
    }
  }

  // 批量操作
  static async batchCreateRecords(tableName, recordsData) {
    const batches = []
    const batchSize = 10 // Airtable 限制每批最多 10 条记录
    
    for (let i = 0; i < recordsData.length; i += batchSize) {
      const batch = recordsData.slice(i, i + batchSize)
      batches.push(
        base(tableName).create(batch.map(data => ({ fields: data })))
      )
    }
    
    const results = await Promise.all(batches)
    return results.flat()
  }
}

export default AirtableService

