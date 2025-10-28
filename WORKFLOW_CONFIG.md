# 工作流配置环境变量模板
# 复制到 .env.local 文件中

# ===========================================
# 工作流调度配置 (Cron格式)
# ===========================================

# 日报生成调度
DAILY_REPORT_SCHEDULE=0 9 * * *

# 周报生成调度  
WEEKLY_REPORT_SCHEDULE=0 10 * * 1

# SEO内容生成调度
SEO_CONTENT_SCHEDULE=0 11 * * *

# 社媒内容生成调度
SOCIAL_CONTENT_SCHEDULE=0 14 * * *

# 市场信号处理调度
MARKET_SIGNALS_SCHEDULE=*/30 * * * *

# 竞品监控调度
COMPETITOR_MONITORING_SCHEDULE=0 8 * * *

# 成本监控调度
COST_MONITORING_SCHEDULE=0 18 * * *

# 应急响应调度
EMERGENCY_RESPONSE_SCHEDULE=*/15 * * * *

# ===========================================
# 工作流参数配置
# ===========================================

# 成本控制参数
DAILY_COST_LIMIT_PER_CLIENT=100
MONTHLY_COST_LIMIT_PER_CLIENT=2000
EMERGENCY_COST_THRESHOLD=150

# 内容生成参数
AI_PRE_REVIEW_MIN_SCORE=70
HUMAN_REVIEW_REQUIRED=true
MAX_RETRY_ATTEMPTS=3
FALLBACK_TO_HUMAN=true

# 时间配置
WORKFLOW_TIMEZONE=Asia/Shanghai
MAINTENANCE_WINDOW_START=02:00
MAINTENANCE_WINDOW_END=04:00

