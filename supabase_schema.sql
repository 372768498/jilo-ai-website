-- AI营销中台 Supabase 数据库架构
-- 敏感数据存储层

-- 1. ICP详细画像表
CREATE TABLE icp_details (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id TEXT NOT NULL,
    role_name TEXT NOT NULL,
    department TEXT,
    seniority_level TEXT,
    key_pain_points TEXT[],
    decision_weight INTEGER CHECK (decision_weight >= 0 AND decision_weight <= 100),
    common_objections TEXT[],
    contact_preferences JSONB,
    verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 竞品情报表
CREATE TABLE competitor_intelligence (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id TEXT NOT NULL,
    competitor_name TEXT NOT NULL,
    domain TEXT,
    intelligence_data JSONB, -- 存储完整的抓取数据
    strategy_analysis TEXT,
    sensitive_notes TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 策略决策历史表
CREATE TABLE strategy_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id TEXT NOT NULL,
    trigger_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    root_cause_hypothesis TEXT,
    selected_solution TEXT,
    execution_result TEXT,
    budget_impact DECIMAL(10,2),
    roi_achieved DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 客户能力清单表
CREATE TABLE client_capabilities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id TEXT NOT NULL,
    product_list JSONB, -- 产品型号/规格/认证
    production_capacity JSONB, -- 产能/库存/交期
    target_markets TEXT[],
    competitive_advantages TEXT[],
    constraints JSONB, -- MOQ/付款方式等限制
    certifications TEXT[],
    special_capabilities TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. API调用日志表
CREATE TABLE api_usage_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id TEXT NOT NULL,
    content_id TEXT,
    call_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    model_name TEXT NOT NULL,
    cost_usd DECIMAL(10,4),
    input_tokens INTEGER,
    output_tokens INTEGER,
    success BOOLEAN DEFAULT true,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 市场信号表
CREATE TABLE market_signals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    signal_id TEXT UNIQUE NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    signal_type TEXT NOT NULL CHECK (signal_type IN ('demand_surge', 'policy_change', 'competitor_move', 'buyer_inquiry')),
    industry TEXT NOT NULL,
    geo TEXT NOT NULL,
    signal_data JSONB NOT NULL,
    confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
    urgency TEXT CHECK (urgency IN ('high', 'medium', 'low')),
    processed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 账号健康度监控表
CREATE TABLE account_health_monitoring (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('linkedin', 'facebook', 'tiktok', 'youtube')),
    account_id TEXT NOT NULL,
    connection_acceptance_rate DECIMAL(5,2),
    message_reply_rate DECIMAL(5,2),
    content_engagement_rate DECIMAL(5,2),
    account_restriction_status TEXT,
    behavior_pattern_score DECIMAL(5,2), -- 行为模式异常检测分数
    health_status TEXT DEFAULT 'good' CHECK (health_status IN ('good', 'warning', 'critical')),
    last_checked TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. 应急响应记录表
CREATE TABLE emergency_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id TEXT NOT NULL,
    anomaly_type TEXT NOT NULL,
    evidence_chain JSONB,
    root_cause_hypotheses JSONB,
    selected_solution TEXT,
    budget_adjustment JSONB,
    execution_status TEXT DEFAULT 'pending' CHECK (execution_status IN ('pending', 'executing', 'completed', 'cancelled')),
    expected_result TEXT,
    actual_result TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX idx_icp_details_client_id ON icp_details(client_id);
CREATE INDEX idx_competitor_intelligence_client_id ON competitor_intelligence(client_id);
CREATE INDEX idx_strategy_history_client_id ON strategy_history(client_id);
CREATE INDEX idx_client_capabilities_client_id ON client_capabilities(client_id);
CREATE INDEX idx_api_usage_logs_client_id ON api_usage_logs(client_id);
CREATE INDEX idx_api_usage_logs_call_time ON api_usage_logs(call_time);
CREATE INDEX idx_market_signals_timestamp ON market_signals(timestamp);
CREATE INDEX idx_market_signals_processed ON market_signals(processed);
CREATE INDEX idx_account_health_client_platform ON account_health_monitoring(client_id, platform);
CREATE INDEX idx_emergency_responses_client_id ON emergency_responses(client_id);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_icp_details_updated_at BEFORE UPDATE ON icp_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_capabilities_updated_at BEFORE UPDATE ON client_capabilities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emergency_responses_updated_at BEFORE UPDATE ON emergency_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 启用行级安全策略 (RLS)
ALTER TABLE icp_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_health_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_responses ENABLE ROW LEVEL SECURITY;

-- 创建基础安全策略（可根据实际需求调整）
CREATE POLICY "Users can view their own data" ON icp_details FOR SELECT USING (auth.uid()::text = client_id);
CREATE POLICY "Users can insert their own data" ON icp_details FOR INSERT WITH CHECK (auth.uid()::text = client_id);
CREATE POLICY "Users can update their own data" ON icp_details FOR UPDATE USING (auth.uid()::text = client_id);

-- 重复上述策略到其他表...
CREATE POLICY "Users can view their own competitor data" ON competitor_intelligence FOR SELECT USING (auth.uid()::text = client_id);
CREATE POLICY "Users can insert their own competitor data" ON competitor_intelligence FOR INSERT WITH CHECK (auth.uid()::text = client_id);
CREATE POLICY "Users can update their own competitor data" ON competitor_intelligence FOR UPDATE USING (auth.uid()::text = client_id);

-- 创建实时订阅（用于监控数据变化）
-- 这些订阅可以在应用代码中监听
-- 例如：监听市场信号变化、API使用情况等

