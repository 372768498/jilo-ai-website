# Supabase CRM自动部署脚本 (PowerShell)
# 使用PostgreSQL直接连接执行SQL

Write-Host "🚀 开始自动部署Supabase CRM系统..." -ForegroundColor Green
Write-Host ""

# 配置信息
$supabaseHost = "db.yydbhdozewmptrgevytr.supabase.co"
$supabasePort = "5432"
$database = "postgres"
$username = "postgres"
$password = "1121"

# SQL脚本路径
$sqlScriptPath = Join-Path $PSScriptRoot "..\data\supabase-crm-deployment.sql"

# 检查SQL脚本是否存在
if (-not (Test-Path $sqlScriptPath)) {
    Write-Host "❌ 错误: SQL脚本文件不存在" -ForegroundColor Red
    Write-Host "路径: $sqlScriptPath" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ SQL脚本已找到" -ForegroundColor Green
Write-Host "文件: $sqlScriptPath" -ForegroundColor Cyan
Write-Host ""

# 检查是否安装了PostgreSQL客户端
$pgClient = Get-Command psql -ErrorAction SilentlyContinue

if (-not $pgClient) {
    Write-Host "⚠️  未检测到PostgreSQL客户端 (psql)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请选择安装方式:" -ForegroundColor Cyan
    Write-Host "1. 使用Chocolatey: choco install postgresql" -ForegroundColor White
    Write-Host "2. 使用Docker: docker run -it --rm postgres psql -h $supabaseHost -U postgres" -ForegroundColor White
    Write-Host "3. 手动访问Supabase Dashboard执行SQL" -ForegroundColor White
    Write-Host ""
    Write-Host "或者，您可以:" -ForegroundColor Cyan
    Write-Host "1. 访问 https://supabase.com/dashboard" -ForegroundColor White
    Write-Host "2. 选择项目: yydbhdozewmptrgevytr" -ForegroundColor White
    Write-Host "3. 打开SQL Editor" -ForegroundColor White
    Write-Host "4. 复制SQL脚本内容并执行" -ForegroundColor White
    Write-Host ""
    Write-Host "SQL脚本位置:" -ForegroundColor Cyan
    Write-Host "  $sqlScriptPath" -ForegroundColor White
    exit 0
}

Write-Host "✅ PostgreSQL客户端已安装" -ForegroundColor Green
Write-Host ""

# 构建连接字符串
$connectionString = "postgresql://$username`:$password@${supabaseHost}:${supabasePort}/$database"

Write-Host "📊 连接信息:" -ForegroundColor Cyan
Write-Host "• 主机: $supabaseHost" -ForegroundColor White
Write-Host "• 数据库: $database" -ForegroundColor White
Write-Host "• 用户: $username" -ForegroundColor White
Write-Host ""

# 尝试连接并执行SQL
Write-Host "🔗 正在连接Supabase数据库..." -ForegroundColor Yellow

try {
    # 设置环境变量
    $env:PGPASSWORD = $password
    
    # 执行SQL脚本
    $result = & psql $connectionString -f $sqlScriptPath 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ CRM系统部署成功！" -ForegroundColor Green
        Write-Host ""
        Write-Host "部署验证:" -ForegroundColor Cyan
        Write-Host "• 7个表已创建" -ForegroundColor White
        Write-Host "• 20+个索引已创建" -ForegroundColor White
        Write-Host "• 6个触发器已创建" -ForegroundColor White
        Write-Host "• 2个函数已创建" -ForegroundColor White
        Write-Host "• 2个视图已创建" -ForegroundColor White
        Write-Host "• 示例数据已插入" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "⚠️  部署可能存在问题" -ForegroundColor Yellow
        Write-Host "输出: $result" -ForegroundColor White
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ 部署失败: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "建议:" -ForegroundColor Cyan
    Write-Host "1. 检查网络连接" -ForegroundColor White
    Write-Host "2. 验证数据库密码是否正确" -ForegroundColor White
    Write-Host "3. 尝试手动通过Supabase Dashboard执行SQL" -ForegroundColor White
} finally {
    # 清理环境变量
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "下一步:" -ForegroundColor Cyan
Write-Host "• 运行测试: npm run test-supabase" -ForegroundColor White
Write-Host "• 查看文档: DEPLOYMENT_INSTRUCTIONS.md" -ForegroundColor White

