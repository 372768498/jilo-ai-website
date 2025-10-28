-- 插入初始数据的补充SQL
-- 这个脚本用于插入示例数据

-- 插入系统配置数据
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
('error_threshold', '5', 'decimal', '错误阈值')
ON CONFLICT (config_key) DO NOTHING;

-- 插入示例客户数据
INSERT INTO clients (company_name, english_name, industry, company_size, annual_revenue, contact_email, service_package, relationship_status) VALUES
('浙江优逸行医疗科技有限公司', 'Zhejiang Youyi Medical Technology Co., Ltd.', '医疗设备制造', '200+', 50000000, 'cheelin@yoyicare.com', 'Silver Package', 'active'),
('浦江县轩映水晶工艺品有限公司', 'Pujiang Shining Crystal Crafts Co., Ltd.', '水晶工艺品制造', '50-200', 30000000, 'info@cnshiningcrystal.com', 'Silver Package', 'active')
ON CONFLICT (contact_email) DO NOTHING;

-- 插入示例用户数据
INSERT INTO users (username, email, password_hash, full_name, role, department) VALUES
('admin', 'admin@jilo-ai.com', '$2a$10$example_hash', '系统管理员', 'admin', 'IT'),
('sales_manager', 'sales@jilo-ai.com', '$2a$10$example_hash', '销售经理', 'sales_manager', '销售部'),
('marketing_manager', 'marketing@jilo-ai.com', '$2a$10$example_hash', '营销经理', 'marketing_manager', '营销部')
ON CONFLICT (email) DO NOTHING;
