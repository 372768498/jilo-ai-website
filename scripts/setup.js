// 快速设置脚本
// scripts/setup.js

const fs = require('fs')
const path = require('path')

class QuickSetup {
  constructor() {
    this.projectRoot = process.cwd()
    this.envPath = path.join(this.projectRoot, '.env.local')
    this.envExamplePath = path.join(this.projectRoot, '.env.example')
  }

  async run() {
    console.log('🚀 AI营销中台快速设置')
    console.log('=' * 40)
    
    try {
      // 1. 检查环境文件
      await this.checkEnvironmentFile()
      
      // 2. 检查依赖
      await this.checkDependencies()
      
      // 3. 创建必要的目录
      await this.createDirectories()
      
      // 4. 提供配置指导
      await this.provideConfigurationGuide()
      
      console.log('\n✅ 快速设置完成！')
      console.log('\n📋 下一步操作:')
      console.log('1. 配置 .env.local 文件中的API密钥')
      console.log('2. 创建 Supabase 项目并执行 SQL 脚本')
      console.log('3. 创建 Airtable Base 并配置表结构')
      console.log('4. 运行 npm run test 进行系统测试')
      console.log('5. 运行 npm start 启动系统')
      
    } catch (error) {
      console.error('❌ 设置失败:', error.message)
    }
  }

  async checkEnvironmentFile() {
    console.log('📄 检查环境配置文件...')
    
    if (!fs.existsSync(this.envPath)) {
      if (fs.existsSync(this.envExamplePath)) {
        // 复制示例文件
        fs.copyFileSync(this.envExamplePath, this.envPath)
        console.log('✅ 已创建 .env.local 文件')
        console.log('💡 请编辑 .env.local 文件，填入您的API密钥')
      } else {
        // 创建基础环境文件
        const basicEnv = `# AI营销中台环境配置
# 请填入您的实际配置

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Airtable 配置
AIRTABLE_API_KEY=your-airtable-api-key
AIRTABLE_BASE_ID=your-base-id

# Claude API 配置
CLAUDE_API_KEY=your-claude-api-key

# 系统配置
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
`
        fs.writeFileSync(this.envPath, basicEnv)
        console.log('✅ 已创建基础 .env.local 文件')
      }
    } else {
      console.log('✅ .env.local 文件已存在')
    }
  }

  async checkDependencies() {
    console.log('📦 检查项目依赖...')
    
    const packageJsonPath = path.join(this.projectRoot, 'package.json')
    
    if (!fs.existsSync(packageJsonPath)) {
      console.log('⚠️ 未找到 package.json 文件')
      console.log('💡 请先运行 npm init 初始化项目')
      return
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const requiredDeps = [
      '@supabase/supabase-js',
      'airtable',
      'axios',
      'dotenv',
      'express'
    ]
    
    const missingDeps = requiredDeps.filter(dep => 
      !packageJson.dependencies || !packageJson.dependencies[dep]
    )
    
    if (missingDeps.length > 0) {
      console.log('⚠️ 缺少依赖包:', missingDeps.join(', '))
      console.log('💡 请运行: npm install')
    } else {
      console.log('✅ 项目依赖检查通过')
    }
  }

  async createDirectories() {
    console.log('📁 创建必要的目录...')
    
    const directories = [
      'logs',
      'data',
      'temp',
      'backups'
    ]
    
    directories.forEach(dir => {
      const dirPath = path.join(this.projectRoot, dir)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
        console.log(`✅ 已创建目录: ${dir}`)
      }
    })
  }

  async provideConfigurationGuide() {
    console.log('\n📋 配置指导:')
    console.log('=' * 40)
    
    console.log('\n1. Supabase 配置:')
    console.log('   - 访问 https://supabase.com')
    console.log('   - 创建新项目')
    console.log('   - 获取 Project URL 和 API Keys')
    console.log('   - 在 SQL Editor 中执行 supabase_schema.sql')
    
    console.log('\n2. Airtable 配置:')
    console.log('   - 访问 https://airtable.com')
    console.log('   - 创建新的 Base')
    console.log('   - 按照 AIRTABLE_TABLES 配置创建表')
    console.log('   - 获取 API Key 和 Base ID')
    
    console.log('\n3. Claude API 配置:')
    console.log('   - 访问 https://console.anthropic.com')
    console.log('   - 创建 API Key')
    console.log('   - 确保有足够的额度')
    
    console.log('\n4. 可选API配置:')
    console.log('   - Google Trends API (用于市场信号)')
    console.log('   - News API (用于新闻监控)')
    console.log('   - SimilarWeb API (用于竞品分析)')
    console.log('   - Ahrefs API (用于SEO分析)')
    
    console.log('\n5. 测试系统:')
    console.log('   - 运行: npm run test')
    console.log('   - 运行: npm run health-check')
    console.log('   - 启动: npm start')
  }
}

// 运行设置
async function runSetup() {
  const setup = new QuickSetup()
  await setup.run()
}

// 如果直接运行此脚本
if (require.main === module) {
  runSetup().catch(console.error)
}

module.exports = { QuickSetup, runSetup }

