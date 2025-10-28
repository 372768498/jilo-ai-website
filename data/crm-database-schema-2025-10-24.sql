-- CRM系统数据库架构
-- 生成时间: 2025-10-24T14:42:31.312Z
-- 数据库类型: Supabase (PostgreSQL)

-- 启用UUID扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建更新时间戳函数

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';
        

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
CREATE INDEX idx_clients_industry ON clients(industry)
CREATE INDEX idx_clients_status ON clients(relationship_status)
CREATE INDEX idx_clients_manager ON clients(account_manager)
CREATE INDEX idx_clients_created_at ON clients(created_at)
CREATE INDEX idx_orders_client_id ON orders(client_id)
CREATE INDEX idx_orders_status ON orders(order_status)
CREATE INDEX idx_orders_date ON orders(order_date)
CREATE INDEX idx_orders_value ON orders(order_value)
CREATE INDEX idx_communications_client_id ON communications(client_id)
CREATE INDEX idx_communications_order_id ON communications(order_id)
CREATE INDEX idx_communications_date ON communications(communication_date)
CREATE INDEX idx_communications_channel ON communications(channel)
CREATE INDEX idx_campaigns_type ON campaigns(campaign_type)
CREATE INDEX idx_campaigns_status ON campaigns(status)
CREATE INDEX idx_campaigns_date ON campaigns(start_date)
CREATE INDEX idx_campaigns_roi ON campaigns(roi)
CREATE INDEX idx_users_role ON users(role)
CREATE INDEX idx_users_department ON users(department)
CREATE INDEX idx_users_active ON users(is_active)
CREATE INDEX idx_users_last_login ON users(last_login)
CREATE INDEX idx_system_config_key ON system_config(config_key)
CREATE INDEX idx_system_config_active ON system_config(is_active)
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id)
CREATE INDEX idx_audit_logs_action ON audit_logs(action)
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name)
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at)

-- 创建触发器
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
CREATE TRIGGER update_communications_updated_at BEFORE UPDATE ON communications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
CREATE TRIGGER update_system_config_updated_at BEFORE UPDATE ON system_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()

-- 创建函数

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
        

-- 创建视图

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
        

-- 启用行级安全
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- 创建角色
CREATE ROLE admin;
CREATE ROLE sales_manager;
CREATE ROLE sales_rep;
CREATE ROLE marketing_manager;
CREATE ROLE customer_service;
CREATE ROLE analyst;

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
