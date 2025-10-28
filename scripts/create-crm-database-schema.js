const fs = require('fs');
const path = require('path');

// CRM系统数据库架构
function createCRMDatabaseSchema() {
  console.log('🗄️ 创建CRM系统数据库架构...\n');

  const today = new Date();
  const reportDate = today.toISOString().split('T')[0];

  // Supabase数据库架构
  const databaseSchema = {
    schema_id: `CRM_DB_SCHEMA_${reportDate.replace(/-/g, '')}`,
    created_date: reportDate,
    database_type: "Supabase (PostgreSQL)",
    
    // 客户表
    clients_table: {
      table_name: "clients",
      description: "客户基本信息表",
      columns: {
        id: {
          type: "UUID",
          constraint: "PRIMARY KEY DEFAULT uuid_generate_v4()",
          description: "客户唯一标识"
        },
        company_name: {
          type: "VARCHAR(255)",
          constraint: "NOT NULL",
          description: "公司名称"
        },
        english_name: {
          type: "VARCHAR(255)",
          constraint: "NULL",
          description: "英文名称"
        },
        industry: {
          type: "VARCHAR(100)",
          constraint: "NOT NULL",
          description: "行业分类"
        },
        company_size: {
          type: "VARCHAR(50)",
          constraint: "NULL",
          description: "公司规模"
        },
        annual_revenue: {
          type: "DECIMAL(15,2)",
          constraint: "NULL",
          description: "年营收"
        },
        founded_year: {
          type: "INTEGER",
          constraint: "NULL",
          description: "成立年份"
        },
        headquarters: {
          type: "TEXT",
          constraint: "NULL",
          description: "总部地址"
        },
        website: {
          type: "VARCHAR(255)",
          constraint: "NULL",
          description: "官网地址"
        },
        contact_email: {
          type: "VARCHAR(255)",
          constraint: "NOT NULL",
          description: "联系邮箱"
        },
        contact_phone: {
          type: "VARCHAR(50)",
          constraint: "NULL",
          description: "联系电话"
        },
        wechat: {
          type: "VARCHAR(100)",
          constraint: "NULL",
          description: "微信"
        },
        linkedin: {
          type: "VARCHAR(255)",
          constraint: "NULL",
          description: "LinkedIn"
        },
        target_markets: {
          type: "JSONB",
          constraint: "NULL",
          description: "目标市场"
        },
        main_products: {
          type: "JSONB",
          constraint: "NULL",
          description: "主要产品"
        },
        certifications: {
          type: "JSONB",
          constraint: "NULL",
          description: "认证资质"
        },
        competitive_advantages: {
          type: "JSONB",
          constraint: "NULL",
          description: "竞争优势"
        },
        pain_points: {
          type: "JSONB",
          constraint: "NULL",
          description: "痛点分析"
        },
        account_manager: {
          type: "VARCHAR(100)",
          constraint: "NULL",
          description: "客户经理"
        },
        service_package: {
          type: "VARCHAR(50)",
          constraint: "NULL",
          description: "服务包级别"
        },
        onboarding_date: {
          type: "DATE",
          constraint: "NULL",
          description: "入网时间"
        },
        relationship_status: {
          type: "VARCHAR(50)",
          constraint: "DEFAULT 'prospect'",
          description: "关系状态"
        },
        satisfaction_score: {
          type: "DECIMAL(3,2)",
          constraint: "NULL",
          description: "满意度评分"
        },
        total_spent: {
          type: "DECIMAL(15,2)",
          constraint: "DEFAULT 0",
          description: "累计消费"
        },
        monthly_budget: {
          type: "DECIMAL(15,2)",
          constraint: "NULL",
          description: "月度预算"
        },
        payment_terms: {
          type: "VARCHAR(100)",
          constraint: "NULL",
          description: "付款条件"
        },
        credit_rating: {
          type: "VARCHAR(20)",
          constraint: "NULL",
          description: "信用评级"
        },
        created_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "创建时间"
        },
        updated_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "更新时间"
        }
      },
      indexes: [
        "CREATE INDEX idx_clients_industry ON clients(industry)",
        "CREATE INDEX idx_clients_status ON clients(relationship_status)",
        "CREATE INDEX idx_clients_manager ON clients(account_manager)",
        "CREATE INDEX idx_clients_created_at ON clients(created_at)"
      ],
      triggers: [
        "CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
      ]
    },
    
    // 订单表
    orders_table: {
      table_name: "orders",
      description: "订单信息表",
      columns: {
        id: {
          type: "UUID",
          constraint: "PRIMARY KEY DEFAULT uuid_generate_v4()",
          description: "订单唯一标识"
        },
        client_id: {
          type: "UUID",
          constraint: "NOT NULL REFERENCES clients(id) ON DELETE CASCADE",
          description: "客户ID"
        },
        order_number: {
          type: "VARCHAR(50)",
          constraint: "UNIQUE NOT NULL",
          description: "订单编号"
        },
        order_date: {
          type: "DATE",
          constraint: "NOT NULL",
          description: "订单日期"
        },
        delivery_date: {
          type: "DATE",
          constraint: "NULL",
          description: "交付日期"
        },
        order_type: {
          type: "VARCHAR(50)",
          constraint: "NOT NULL",
          description: "订单类型"
        },
        order_value: {
          type: "DECIMAL(15,2)",
          constraint: "NOT NULL",
          description: "订单金额"
        },
        currency: {
          type: "VARCHAR(10)",
          constraint: "DEFAULT 'CNY'",
          description: "币种"
        },
        payment_terms: {
          type: "VARCHAR(100)",
          constraint: "NULL",
          description: "付款条件"
        },
        products: {
          type: "JSONB",
          constraint: "NOT NULL",
          description: "产品列表"
        },
        specifications: {
          type: "JSONB",
          constraint: "NULL",
          description: "规格要求"
        },
        customizations: {
          type: "JSONB",
          constraint: "NULL",
          description: "定制要求"
        },
        order_status: {
          type: "VARCHAR(50)",
          constraint: "DEFAULT 'inquiry'",
          description: "订单状态"
        },
        payment_status: {
          type: "VARCHAR(50)",
          constraint: "DEFAULT 'pending'",
          description: "付款状态"
        },
        delivery_status: {
          type: "VARCHAR(50)",
          constraint: "DEFAULT 'pending'",
          description: "交付状态"
        },
        quality_status: {
          type: "VARCHAR(50)",
          constraint: "DEFAULT 'pending'",
          description: "质量状态"
        },
        milestones: {
          type: "JSONB",
          constraint: "NULL",
          description: "里程碑"
        },
        progress: {
          type: "INTEGER",
          constraint: "DEFAULT 0 CHECK (progress >= 0 AND progress <= 100)",
          description: "进度百分比"
        },
        next_action: {
          type: "TEXT",
          constraint: "NULL",
          description: "下一步行动"
        },
        responsible_person: {
          type: "VARCHAR(100)",
          constraint: "NULL",
          description: "负责人"
        },
        created_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "创建时间"
        },
        updated_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "更新时间"
        }
      },
      indexes: [
        "CREATE INDEX idx_orders_client_id ON orders(client_id)",
        "CREATE INDEX idx_orders_status ON orders(order_status)",
        "CREATE INDEX idx_orders_date ON orders(order_date)",
        "CREATE INDEX idx_orders_value ON orders(order_value)"
      ],
      triggers: [
        "CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
      ]
    },
    
    // 沟通记录表
    communications_table: {
      table_name: "communications",
      description: "沟通记录表",
      columns: {
        id: {
          type: "UUID",
          constraint: "PRIMARY KEY DEFAULT uuid_generate_v4()",
          description: "记录唯一标识"
        },
        client_id: {
          type: "UUID",
          constraint: "NOT NULL REFERENCES clients(id) ON DELETE CASCADE",
          description: "客户ID"
        },
        order_id: {
          type: "UUID",
          constraint: "NULL REFERENCES orders(id) ON DELETE SET NULL",
          description: "订单ID"
        },
        communication_date: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "NOT NULL",
          description: "沟通日期"
        },
        channel: {
          type: "VARCHAR(50)",
          constraint: "NOT NULL",
          description: "沟通渠道"
        },
        communication_type: {
          type: "VARCHAR(50)",
          constraint: "NOT NULL",
          description: "沟通类型"
        },
        duration: {
          type: "INTEGER",
          constraint: "NULL",
          description: "沟通时长(分钟)"
        },
        participants: {
          type: "JSONB",
          constraint: "NULL",
          description: "参与人员"
        },
        subject: {
          type: "VARCHAR(255)",
          constraint: "NULL",
          description: "沟通主题"
        },
        summary: {
          type: "TEXT",
          constraint: "NULL",
          description: "沟通摘要"
        },
        key_points: {
          type: "JSONB",
          constraint: "NULL",
          description: "关键要点"
        },
        action_items: {
          type: "JSONB",
          constraint: "NULL",
          description: "行动项"
        },
        follow_up: {
          type: "TEXT",
          constraint: "NULL",
          description: "后续跟进"
        },
        result: {
          type: "VARCHAR(100)",
          constraint: "NULL",
          description: "沟通结果"
        },
        satisfaction: {
          type: "DECIMAL(3,2)",
          constraint: "NULL",
          description: "满意度"
        },
        next_steps: {
          type: "TEXT",
          constraint: "NULL",
          description: "下一步行动"
        },
        priority: {
          type: "VARCHAR(20)",
          constraint: "DEFAULT 'medium'",
          description: "优先级"
        },
        created_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "创建时间"
        },
        updated_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "更新时间"
        }
      },
      indexes: [
        "CREATE INDEX idx_communications_client_id ON communications(client_id)",
        "CREATE INDEX idx_communications_order_id ON communications(order_id)",
        "CREATE INDEX idx_communications_date ON communications(communication_date)",
        "CREATE INDEX idx_communications_channel ON communications(channel)"
      ],
      triggers: [
        "CREATE TRIGGER update_communications_updated_at BEFORE UPDATE ON communications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
      ]
    },
    
    // 营销活动表
    campaigns_table: {
      table_name: "campaigns",
      description: "营销活动表",
      columns: {
        id: {
          type: "UUID",
          constraint: "PRIMARY KEY DEFAULT uuid_generate_v4()",
          description: "活动唯一标识"
        },
        campaign_name: {
          type: "VARCHAR(255)",
          constraint: "NOT NULL",
          description: "活动名称"
        },
        campaign_type: {
          type: "VARCHAR(50)",
          constraint: "NOT NULL",
          description: "活动类型"
        },
        start_date: {
          type: "DATE",
          constraint: "NOT NULL",
          description: "开始日期"
        },
        end_date: {
          type: "DATE",
          constraint: "NULL",
          description: "结束日期"
        },
        budget: {
          type: "DECIMAL(15,2)",
          constraint: "NULL",
          description: "预算"
        },
        target_audience: {
          type: "JSONB",
          constraint: "NULL",
          description: "目标受众"
        },
        status: {
          type: "VARCHAR(50)",
          constraint: "DEFAULT 'planning'",
          description: "执行状态"
        },
        progress: {
          type: "INTEGER",
          constraint: "DEFAULT 0 CHECK (progress >= 0 AND progress <= 100)",
          description: "执行进度"
        },
        channels: {
          type: "JSONB",
          constraint: "NULL",
          description: "使用渠道"
        },
        content: {
          type: "JSONB",
          constraint: "NULL",
          description: "活动内容"
        },
        team: {
          type: "JSONB",
          constraint: "NULL",
          description: "执行团队"
        },
        reach: {
          type: "INTEGER",
          constraint: "DEFAULT 0",
          description: "触达人数"
        },
        engagement: {
          type: "JSONB",
          constraint: "NULL",
          description: "互动数据"
        },
        conversions: {
          type: "JSONB",
          constraint: "NULL",
          description: "转化数据"
        },
        roi: {
          type: "DECIMAL(5,2)",
          constraint: "NULL",
          description: "投资回报率"
        },
        cost_per_acquisition: {
          type: "DECIMAL(10,2)",
          constraint: "NULL",
          description: "获客成本"
        },
        created_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "创建时间"
        },
        updated_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "更新时间"
        }
      },
      indexes: [
        "CREATE INDEX idx_campaigns_type ON campaigns(campaign_type)",
        "CREATE INDEX idx_campaigns_status ON campaigns(status)",
        "CREATE INDEX idx_campaigns_date ON campaigns(start_date)",
        "CREATE INDEX idx_campaigns_roi ON campaigns(roi)"
      ],
      triggers: [
        "CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
      ]
    },
    
    // 用户表
    users_table: {
      table_name: "users",
      description: "用户信息表",
      columns: {
        id: {
          type: "UUID",
          constraint: "PRIMARY KEY DEFAULT uuid_generate_v4()",
          description: "用户唯一标识"
        },
        username: {
          type: "VARCHAR(100)",
          constraint: "UNIQUE NOT NULL",
          description: "用户名"
        },
        email: {
          type: "VARCHAR(255)",
          constraint: "UNIQUE NOT NULL",
          description: "邮箱"
        },
        password_hash: {
          type: "VARCHAR(255)",
          constraint: "NOT NULL",
          description: "密码哈希"
        },
        full_name: {
          type: "VARCHAR(255)",
          constraint: "NOT NULL",
          description: "全名"
        },
        role: {
          type: "VARCHAR(50)",
          constraint: "NOT NULL",
          description: "用户角色"
        },
        department: {
          type: "VARCHAR(100)",
          constraint: "NULL",
          description: "部门"
        },
        phone: {
          type: "VARCHAR(50)",
          constraint: "NULL",
          description: "电话"
        },
        is_active: {
          type: "BOOLEAN",
          constraint: "DEFAULT true",
          description: "是否激活"
        },
        last_login: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "NULL",
          description: "最后登录时间"
        },
        created_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "创建时间"
        },
        updated_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "更新时间"
        }
      },
      indexes: [
        "CREATE INDEX idx_users_role ON users(role)",
        "CREATE INDEX idx_users_department ON users(department)",
        "CREATE INDEX idx_users_active ON users(is_active)",
        "CREATE INDEX idx_users_last_login ON users(last_login)"
      ],
      triggers: [
        "CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
      ]
    },
    
    // 系统配置表
    system_config_table: {
      table_name: "system_config",
      description: "系统配置表",
      columns: {
        id: {
          type: "UUID",
          constraint: "PRIMARY KEY DEFAULT uuid_generate_v4()",
          description: "配置唯一标识"
        },
        config_key: {
          type: "VARCHAR(100)",
          constraint: "UNIQUE NOT NULL",
          description: "配置键"
        },
        config_value: {
          type: "TEXT",
          constraint: "NULL",
          description: "配置值"
        },
        config_type: {
          type: "VARCHAR(50)",
          constraint: "DEFAULT 'string'",
          description: "配置类型"
        },
        description: {
          type: "TEXT",
          constraint: "NULL",
          description: "配置描述"
        },
        is_active: {
          type: "BOOLEAN",
          constraint: "DEFAULT true",
          description: "是否激活"
        },
        created_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "创建时间"
        },
        updated_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "更新时间"
        }
      },
      indexes: [
        "CREATE INDEX idx_system_config_key ON system_config(config_key)",
        "CREATE INDEX idx_system_config_active ON system_config(is_active)"
      ],
      triggers: [
        "CREATE TRIGGER update_system_config_updated_at BEFORE UPDATE ON system_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
      ]
    },
    
    // 审计日志表
    audit_logs_table: {
      table_name: "audit_logs",
      description: "审计日志表",
      columns: {
        id: {
          type: "UUID",
          constraint: "PRIMARY KEY DEFAULT uuid_generate_v4()",
          description: "日志唯一标识"
        },
        user_id: {
          type: "UUID",
          constraint: "NULL REFERENCES users(id) ON DELETE SET NULL",
          description: "用户ID"
        },
        action: {
          type: "VARCHAR(100)",
          constraint: "NOT NULL",
          description: "操作类型"
        },
        table_name: {
          type: "VARCHAR(100)",
          constraint: "NULL",
          description: "表名"
        },
        record_id: {
          type: "UUID",
          constraint: "NULL",
          description: "记录ID"
        },
        old_values: {
          type: "JSONB",
          constraint: "NULL",
          description: "旧值"
        },
        new_values: {
          type: "JSONB",
          constraint: "NULL",
          description: "新值"
        },
        ip_address: {
          type: "INET",
          constraint: "NULL",
          description: "IP地址"
        },
        user_agent: {
          type: "TEXT",
          constraint: "NULL",
          description: "用户代理"
        },
        created_at: {
          type: "TIMESTAMP WITH TIME ZONE",
          constraint: "DEFAULT now()",
          description: "创建时间"
        }
      },
      indexes: [
        "CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id)",
        "CREATE INDEX idx_audit_logs_action ON audit_logs(action)",
        "CREATE INDEX idx_audit_logs_table ON audit_logs(table_name)",
        "CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at)"
      ]
    },
    
    // 数据库函数
    database_functions: {
      update_updated_at_column: {
        name: "update_updated_at_column",
        description: "自动更新updated_at字段",
        code: `
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';
        `
      },
      get_client_summary: {
        name: "get_client_summary",
        description: "获取客户汇总信息",
        code: `
CREATE OR REPLACE FUNCTION get_client_summary(client_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'client_id', c.id,
        'company_name', c.company_name,
        'total_orders', COALESCE(o.order_count, 0),
        'total_value', COALESCE(o.total_value, 0),
        'last_order_date', o.last_order_date,
        'communication_count', COALESCE(comm.comm_count, 0),
        'last_communication', comm.last_comm_date,
        'satisfaction_score', c.satisfaction_score
    ) INTO result
    FROM clients c
    LEFT JOIN (
        SELECT client_id, 
               COUNT(*) as order_count,
               SUM(order_value) as total_value,
               MAX(order_date) as last_order_date
        FROM orders 
        WHERE client_id = client_uuid
        GROUP BY client_id
    ) o ON c.id = o.client_id
    LEFT JOIN (
        SELECT client_id,
               COUNT(*) as comm_count,
               MAX(communication_date) as last_comm_date
        FROM communications
        WHERE client_id = client_uuid
        GROUP BY client_id
    ) comm ON c.id = comm.client_id
    WHERE c.id = client_uuid;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;
        `
      }
    },
    
    // 视图
    database_views: {
      client_overview_view: {
        name: "client_overview",
        description: "客户概览视图",
        code: `
CREATE VIEW client_overview AS
SELECT 
    c.id,
    c.company_name,
    c.industry,
    c.relationship_status,
    c.account_manager,
    c.service_package,
    c.total_spent,
    c.satisfaction_score,
    COUNT(o.id) as order_count,
    SUM(o.order_value) as total_order_value,
    MAX(o.order_date) as last_order_date,
    COUNT(comm.id) as communication_count,
    MAX(comm.communication_date) as last_communication_date
FROM clients c
LEFT JOIN orders o ON c.id = o.client_id
LEFT JOIN communications comm ON c.id = comm.client_id
GROUP BY c.id, c.company_name, c.industry, c.relationship_status, 
         c.account_manager, c.service_package, c.total_spent, c.satisfaction_score;
        `
      },
      sales_performance_view: {
        name: "sales_performance",
        description: "销售业绩视图",
        code: `
CREATE VIEW sales_performance AS
SELECT 
    DATE_TRUNC('month', o.order_date) as month,
    c.industry,
    c.account_manager,
    COUNT(o.id) as order_count,
    SUM(o.order_value) as total_value,
    AVG(o.order_value) as avg_order_value,
    COUNT(DISTINCT o.client_id) as unique_clients
FROM orders o
JOIN clients c ON o.client_id = c.id
GROUP BY DATE_TRUNC('month', o.order_date), c.industry, c.account_manager;
        `
      }
    },
    
    // 权限和安全
    security_policies: {
      row_level_security: {
        description: "行级安全策略",
        policies: [
          "ALTER TABLE clients ENABLE ROW LEVEL SECURITY;",
          "ALTER TABLE orders ENABLE ROW LEVEL SECURITY;",
          "ALTER TABLE communications ENABLE ROW LEVEL SECURITY;",
          "ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;"
        ]
      },
      user_permissions: {
        description: "用户权限配置",
        roles: [
          "CREATE ROLE admin;",
          "CREATE ROLE sales_manager;",
          "CREATE ROLE sales_rep;",
          "CREATE ROLE marketing_manager;",
          "CREATE ROLE customer_service;",
          "CREATE ROLE analyst;"
        ]
      }
    }
  };

  // 保存数据库架构
  const schemaPath = path.join(__dirname, '..', 'data', `crm-database-schema-${reportDate}.json`);
  fs.writeFileSync(schemaPath, JSON.stringify(databaseSchema, null, 2), 'utf8');

  // 生成SQL文件
  const sqlContent = generateSQLSchema(databaseSchema);
  const sqlPath = path.join(__dirname, '..', 'data', `crm-database-schema-${reportDate}.sql`);
  fs.writeFileSync(sqlPath, sqlContent, 'utf8');

  console.log('✅ CRM数据库架构创建完成！');
  console.log(`📄 架构文件: ${schemaPath}`);
  console.log(`📄 SQL文件: ${sqlPath}`);
  console.log('');
  console.log('🗄️ 数据库表结构:');
  console.log('• clients: 客户基本信息表');
  console.log('• orders: 订单信息表');
  console.log('• communications: 沟通记录表');
  console.log('• campaigns: 营销活动表');
  console.log('• users: 用户信息表');
  console.log('• system_config: 系统配置表');
  console.log('• audit_logs: 审计日志表');
  console.log('');
  console.log('🔧 数据库功能:');
  console.log('• 自动更新时间戳');
  console.log('• 客户汇总信息函数');
  console.log('• 客户概览视图');
  console.log('• 销售业绩视图');
  console.log('');
  console.log('🔒 安全特性:');
  console.log('• 行级安全策略');
  console.log('• 用户角色权限');
  console.log('• 审计日志记录');
  console.log('• 数据加密存储');
}

// 生成SQL架构
function generateSQLSchema(schema) {
  let sql = `-- CRM系统数据库架构
-- 生成时间: ${new Date().toISOString()}
-- 数据库类型: Supabase (PostgreSQL)

-- 启用UUID扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建更新时间戳函数
${schema.database_functions.update_updated_at_column.code}

-- 创建客户表
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    english_name VARCHAR(255),
    industry VARCHAR(100) NOT NULL,
    company_size VARCHAR(50),
    annual_revenue DECIMAL(15,2),
    founded_year INTEGER,
    headquarters TEXT,
    website VARCHAR(255),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    wechat VARCHAR(100),
    linkedin VARCHAR(255),
    target_markets JSONB,
    main_products JSONB,
    certifications JSONB,
    competitive_advantages JSONB,
    pain_points JSONB,
    account_manager VARCHAR(100),
    service_package VARCHAR(50),
    onboarding_date DATE,
    relationship_status VARCHAR(50) DEFAULT 'prospect',
    satisfaction_score DECIMAL(3,2),
    total_spent DECIMAL(15,2) DEFAULT 0,
    monthly_budget DECIMAL(15,2),
    payment_terms VARCHAR(100),
    credit_rating VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建订单表
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    order_date DATE NOT NULL,
    delivery_date DATE,
    order_type VARCHAR(50) NOT NULL,
    order_value DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'CNY',
    payment_terms VARCHAR(100),
    products JSONB NOT NULL,
    specifications JSONB,
    customizations JSONB,
    order_status VARCHAR(50) DEFAULT 'inquiry',
    payment_status VARCHAR(50) DEFAULT 'pending',
    delivery_status VARCHAR(50) DEFAULT 'pending',
    quality_status VARCHAR(50) DEFAULT 'pending',
    milestones JSONB,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    next_action TEXT,
    responsible_person VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建沟通记录表
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    communication_date TIMESTAMP WITH TIME ZONE NOT NULL,
    channel VARCHAR(50) NOT NULL,
    communication_type VARCHAR(50) NOT NULL,
    duration INTEGER,
    participants JSONB,
    subject VARCHAR(255),
    summary TEXT,
    key_points JSONB,
    action_items JSONB,
    follow_up TEXT,
    result VARCHAR(100),
    satisfaction DECIMAL(3,2),
    next_steps TEXT,
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建营销活动表
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_name VARCHAR(255) NOT NULL,
    campaign_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    budget DECIMAL(15,2),
    target_audience JSONB,
    status VARCHAR(50) DEFAULT 'planning',
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    channels JSONB,
    content JSONB,
    team JSONB,
    reach INTEGER DEFAULT 0,
    engagement JSONB,
    conversions JSONB,
    roi DECIMAL(5,2),
    cost_per_acquisition DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    department VARCHAR(100),
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建系统配置表
CREATE TABLE system_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    config_type VARCHAR(50) DEFAULT 'string',
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建审计日志表
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 创建索引
${schema.clients_table.indexes.join('\n')}
${schema.orders_table.indexes.join('\n')}
${schema.communications_table.indexes.join('\n')}
${schema.campaigns_table.indexes.join('\n')}
${schema.users_table.indexes.join('\n')}
${schema.system_config_table.indexes.join('\n')}
${schema.audit_logs_table.indexes.join('\n')}

-- 创建触发器
${schema.clients_table.triggers.join('\n')}
${schema.orders_table.triggers.join('\n')}
${schema.communications_table.triggers.join('\n')}
${schema.campaigns_table.triggers.join('\n')}
${schema.users_table.triggers.join('\n')}
${schema.system_config_table.triggers.join('\n')}

-- 创建函数
${schema.database_functions.get_client_summary.code}

-- 创建视图
${schema.database_views.client_overview_view.code}
${schema.database_views.sales_performance_view.code}

-- 启用行级安全
${schema.security_policies.row_level_security.policies.join('\n')}

-- 创建角色
${schema.security_policies.user_permissions.roles.join('\n')}

-- 插入初始数据
INSERT INTO system_config (config_key, config_value, config_type, description) VALUES
('system_name', 'AI驱动的出海营销中台客户管理系统', 'string', '系统名称'),
('version', '1.0.0', 'string', '系统版本'),
('timezone', 'Asia/Shanghai', 'string', '时区设置'),
('currency', 'CNY', 'string', '默认币种'),
('date_format', 'YYYY-MM-DD', 'string', '日期格式'),
('email_notifications', 'true', 'boolean', '邮件通知'),
('sms_notifications', 'false', 'boolean', '短信通知'),
('push_notifications', 'true', 'boolean', '推送通知'),
('notification_frequency', 'real_time', 'string', '通知频率'),
('api_rate_limits', '1000', 'integer', 'API速率限制'),
('webhook_timeout', '30', 'integer', 'Webhook超时时间'),
('retry_attempts', '3', 'integer', '重试次数'),
('error_threshold', '5', 'decimal', '错误阈值');

-- 插入示例客户数据
INSERT INTO clients (company_name, english_name, industry, company_size, annual_revenue, contact_email, service_package, relationship_status) VALUES
('浙江优逸行医疗科技有限公司', 'Zhejiang Youyi Medical Technology Co., Ltd.', '医疗设备制造', '200+', 50000000, 'cheelin@yoyicare.com', 'Silver Package', 'active'),
('浦江县轩映水晶工艺品有限公司', 'Pujiang Shining Crystal Crafts Co., Ltd.', '水晶工艺品制造', '50-200', 30000000, 'info@cnshiningcrystal.com', 'Silver Package', 'active');

COMMIT;
`;

  return sql;
}

// 运行数据库架构创建
createCRMDatabaseSchema();


