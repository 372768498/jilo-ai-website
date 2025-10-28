# Jilo.ai 网站完整文档

> **创建日期**: 2025年10月24日  
> **最后更新**: 2025年10月24日  
> **文档版本**: v1.0

---

## 📋 目录

1. [项目概览](#项目概览)
2. [在线访问](#在线访问)
3. [技术架构](#技术架构)
4. [文件结构](#文件结构)
5. [本地开发环境](#本地开发环境)
6. [部署信息](#部署信息)
7. [DNS配置](#dns配置)
8. [如何修改网站](#如何修改网站)
9. [常见修改场景](#常见修改场景)
10. [故障排除](#故障排除)
11. [备份与恢复](#备份与恢复)

---

## 项目概览

### 项目名称
**Jilo.ai** - AI驱动的B2B营销自动化平台官方网站

### 项目描述
为B2B制造企业提供24小时不下班的AI营销团队，涵盖智能内容生产、市场洞察分析、多渠道运营和风险合规管理。

### 网站类型
营销型落地页（Landing Page）

### 目标用户
- 中国制造业工厂老板
- B2B企业营销负责人
- 寻求海外市场拓展的制造企业

---

## 在线访问

### 生产环境
- **主域名**: https://jilo.ai
- **备用域名**: https://www.jilo.ai
- **Vercel域名**: https://jilo-ai-website.vercel.app

### 管理后台
- **Vercel控制台**: https://vercel.com/372768498s-projects/jilo-ai-website
- **GitHub仓库**: https://github.com/372768498/jilo-ai-website
- **域名管理**: NameSilo (https://www.namesilo.com)

---

## 技术架构

### 前端框架
- **Next.js 16.0.0** - React框架
- **React 19** - UI库
- **TypeScript** - 类型安全

### 样式方案
- **Tailwind CSS 4** - 原子化CSS框架
- **PostCSS** - CSS处理器

### 部署平台
- **Vercel** - 前端部署平台
  - 自动CI/CD
  - 全球CDN加速
  - 自动HTTPS证书

### 版本控制
- **Git** - 版本控制系统
- **GitHub** - 代码托管平台

---

## 文件结构

```
jilo-ai-website/
├── .next/                    # Next.js构建输出（自动生成，不要修改）
├── app/                      # 应用核心目录
│   ├── dashboard/           # 控制台页面
│   │   └── page.tsx         # 控制台主页面
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 页面布局和SEO配置
│   └── page.tsx             # 主页面（组合所有组件）
├── components/              # 网站组件
│   ├── HeroSection.tsx      # 首屏（Hero区域）
│   ├── CapabilityMatrix.tsx # 核心能力矩阵
│   ├── CoreAdvantages.tsx   # 核心优势
│   ├── CTASection.tsx       # 行动号召区域
│   ├── WeChatQRModal.tsx    # 微信二维码弹窗
│   ├── Footer.tsx           # 页脚
│   ├── Navbar.tsx           # 导航栏
│   └── mcp/                 # MCP组件目录
│       ├── IndustryResearchMCP.tsx  # 主MCP组件
│       ├── IndustryCharts.tsx       # 数据可视化图表
│       ├── ExportReport.tsx         # 报告导出功能
│       ├── ReportHistory.tsx        # 历史记录管理
│       └── RealTimeData.tsx         # 实时数据更新
├── lib/                     # 工具库和API集成
│   └── api/                 # API集成层
│       ├── marketData.ts    # 市场数据API封装
│       └── apiService.ts    # API服务层和缓存管理
├── data/                    # 数据文件
│   ├── shiningcrystal-report.json  # 水晶行业报告数据
│   └── yoyicare-report.json        # 电动轮椅行业报告数据
├── public/                  # 静态资源（图片、字体等）
├── node_modules/            # 依赖包（自动生成）
├── .git/                    # Git版本控制（隐藏文件夹）
├── .gitignore              # Git忽略规则
├── package.json            # 项目配置和依赖
├── package-lock.json       # 依赖锁定文件
├── tsconfig.json           # TypeScript配置
├── tailwind.config.ts      # Tailwind CSS配置
├── postcss.config.mjs      # PostCSS配置
├── next.config.ts          # Next.js配置
├── deploy.js               # 部署脚本
├── README.md               # 项目说明
├── DOCUMENTATION.md        # 完整文档
├── PROJECT_STATUS.md       # 项目状态文档
└── API_INTEGRATION.md      # API集成说明文档
```

---

## 本地开发环境

### 系统要求
- **操作系统**: Windows 10/11, macOS, Linux
- **Node.js**: v18.17.0 或更高版本
- **包管理器**: npm（随Node.js安装）
- **编辑器**: VS Code（推荐）

### 本地项目位置
```
D:\jilo-ai-website
```

### 安装步骤

#### 1. 克隆项目
```bash
# 如果还没有克隆
cd D:\
git clone https://github.com/372768498/jilo-ai-website.git
cd jilo-ai-website
```

#### 2. 安装依赖
```bash
npm install
```

#### 3. 启动开发服务器
```bash
npm run dev
```

访问: http://localhost:3000

#### 4. 构建生产版本（测试用）
```bash
npm run build
npm start
```

### 常用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器（需先build）
npm start

# 代码检查
npm run lint

# 查看所有可用命令
npm run
```

---

## 部署信息

### 部署平台详情

**平台**: Vercel  
**项目ID**: 372768498s-projects/jilo-ai-website  
**GitHub账号**: 372768498  
**GitHub邮箱**: 372768498@qq.com

### 自动部署流程

1. **开发**: 在本地修改代码
2. **提交**: 
   ```bash
   git add .
   git commit -m "描述你的修改"
   git push origin main
   ```
3. **自动部署**: GitHub推送后，Vercel自动检测并部署
4. **上线**: 2-3分钟后自动上线到 https://jilo.ai

### 部署配置

```yaml
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

### 环境变量
当前无需配置环境变量。如果未来需要添加（如API密钥），在Vercel控制台:
1. 进入项目
2. Settings → Environment Variables
3. 添加变量

---

## DNS配置

### 域名信息
- **域名**: jilo.ai
- **注册商**: NameSilo
- **账号**: [你的NameSilo账号]

### DNS记录

在NameSilo的DNS管理页面配置：

| 类型 | 主机名 | 值 | TTL |
|------|--------|-----|-----|
| A | @ | 76.76.21.21 | 7207 |
| CNAME | www | cname.vercel-dns.com | 7207 |

### DNS管理访问
1. 登录 https://www.namesilo.com
2. 点击域名 jilo.ai
3. 选择 DNS 管理

---

## API集成

### 集成概述

Jilo.ai网站集成了多个真实市场数据API，为MCP组件提供实时行业分析数据。

### 已集成的API服务

| API服务 | 用途 | 状态 | 免费限制 | 配置状态 |
|---------|------|------|----------|----------|
| **Alpha Vantage** | 股票报价、金融市场数据 | ✅ 已集成 | 5 calls/min, 500 calls/day | 🔄 待配置密钥 |
| **NewsAPI** | 行业新闻、实时资讯 | ✅ 已集成 | 1000 requests/month | 🔄 待配置密钥 |
| **Polygon.io** | 市场数据、交易信息 | ✅ 已集成 | 5 calls/min | 🔄 待配置密钥 |
| **Finnhub** | 金融数据、市场概览 | ✅ 已集成 | 60 calls/min | 🔄 待配置密钥 |

### API配置说明

要启用真实API数据，需要：

1. **注册API服务**：
   - Alpha Vantage: https://www.alphavantage.co/support/#api-key
   - NewsAPI: https://newsapi.org/register
   - Polygon.io: https://polygon.io/pricing
   - Finnhub: https://finnhub.io/register

2. **配置环境变量**：
   在Vercel控制台添加以下环境变量：
   ```
   ALPHA_VANTAGE_API_KEY=your_key_here
   NEWS_API_KEY=your_key_here
   POLYGON_API_KEY=your_key_here
   FINNHUB_API_KEY=your_key_here
   ```

3. **重启应用**：
   配置完成后，Vercel会自动重新部署应用。

### 智能缓存机制

- **行业数据缓存**: 5分钟
- **股票数据缓存**: 1分钟
- **新闻数据缓存**: 5分钟
- **降级机制**: API失败时自动使用预设数据

### API服务层架构

```
lib/api/
├── marketData.ts    # 各API的原始调用封装
└── apiService.ts    # 统一服务层，包含缓存和降级逻辑
```

### 当前数据源

- **主要数据源**: 真实API（需配置密钥）
- **备用数据源**: 预设行业数据库
- **降级策略**: API失败时自动切换到备用数据

---

## 如何修改网站

### 修改流程

```
1. 克隆/更新代码
   ↓
2. 本地修改并测试
   ↓
3. 提交到GitHub
   ↓
4. Vercel自动部署
   ↓
5. 验证线上效果
```

### 详细步骤

#### 步骤1: 准备环境

```bash
# 进入项目目录
cd D:\jilo-ai-website

# 拉取最新代码
git pull origin main

# 确保依赖是最新的
npm install
```

#### 步骤2: 启动开发服务器

```bash
npm run dev
```

在浏览器打开: http://localhost:3000

#### 步骤3: 修改代码

用VS Code或其他编辑器打开项目文件夹，修改对应文件。

#### 步骤4: 测试修改

在浏览器中查看修改效果（开发服务器支持热重载，保存文件后自动刷新）。

#### 步骤5: 提交代码

```bash
# 查看修改了哪些文件
git status

# 添加所有修改
git add .

# 提交修改（写清楚修改内容）
git commit -m "修改了XXX功能"

# 推送到GitHub
git push origin main
```

#### 步骤6: 等待部署

- 推送后，Vercel自动开始部署
- 在 https://vercel.com 查看部署进度
- 2-3分钟后访问 https://jilo.ai 查看效果

---

## 常见修改场景

### 场景1: 修改文案

#### 修改标题和副标题
**文件**: `components/HeroSection.tsx`

```typescript
// 找到这部分代码
<h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
  为B2B企业接入
  <br />
  <span className="text-yellow-300">24小时不下班</span>
  <br />
  的AI营销团队
</h2>
```

修改引号内的文字即可。

#### 修改服务包价格
**文件**: `components/ServicePackages.tsx`

```typescript
const packages = [
  {
    name: '内容版',
    price: '¥2,999',  // 修改这里
    period: '/月',
    // ...
  },
  // ...
]
```

### 场景2: 修改颜色主题

#### 修改主色调
**文件**: `tailwind.config.ts`

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        // 添加自定义颜色
        'brand-blue': '#2563eb',
        'brand-purple': '#7c3aed',
      }
    }
  }
}
```

然后在组件中使用: `bg-brand-blue` 或 `text-brand-purple`

#### 修改渐变背景
**文件**: `components/HeroSection.tsx`

```typescript
// 找到这行
className="... bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 ..."

// 修改颜色
className="... bg-gradient-to-br from-green-600 via-teal-700 to-blue-800 ..."
```

### 场景3: 替换微信二维码

#### 方法1: 使用本地图片

1. 准备微信二维码图片（推荐256x256px，PNG格式）
2. 命名为 `wechat-qr.png`
3. 放到 `public/` 目录

4. 修改 `components/WeChatQRModal.tsx`:

```typescript
// 找到占位图部分，替换为:
<Image
  src="/wechat-qr.png"
  alt="微信二维码"
  width={256}
  height={256}
  className="mx-auto mb-6 rounded-lg"
/>

// 需要在文件顶部添加导入:
import Image from 'next/image'
```

#### 方法2: 使用在线图片

```typescript
<img
  src="https://你的图片链接.com/qr.png"
  alt="微信二维码"
  className="w-64 h-64 mx-auto mb-6 rounded-lg"
/>
```

### 场景4: 添加Logo

1. 准备Logo文件（推荐SVG或PNG）
2. 放到 `public/` 目录，如: `public/logo.png`

3. 修改 `components/HeroSection.tsx`:

```typescript
// 找到这部分
<div className="mb-8">
  <h1 className="text-3xl font-bold tracking-wider">Jilo.ai</h1>
</div>

// 替换为:
<div className="mb-8">
  <Image
    src="/logo.png"
    alt="Jilo.ai"
    width={200}
    height={60}
    priority
  />
</div>

// 需要在文件顶部添加导入:
import Image from 'next/image'
```

### 场景5: 修改联系邮箱

**文件**: `components/Footer.tsx`

```typescript
// 找到这行
<a href="mailto:contact@jilo.ai" ...>
  contact@jilo.ai
</a>

// 修改为你的邮箱
<a href="mailto:support@jilo.ai" ...>
  support@jilo.ai
</a>
```

### 场景6: 服务方案组件管理

> **注意**: ServicePackages组件已在v1.2版本中删除，如需重新添加服务方案，请参考以下步骤：

#### 重新添加服务方案组件

1. **创建ServicePackages.tsx文件**:
```typescript
'use client'

export default function ServicePackages() {
  const packages = [
    {
      name: '内容版',
      price: '¥2,999',
      period: '/月',
      description: '适合初创企业，建立基础线上存在',
      features: [
        '每周5篇行业内容',
        'LinkedIn自动发布',
        '基础数据分析报告',
        '邮件支持',
        '内容合规审核'
      ],
      highlight: false,
      badge: null
    },
    {
      name: '增长版',
      price: '¥5,999',
      period: '/月',
      description: '适合快速增长期企业，全面市场覆盖',
      features: [
        '每周10篇多平台内容',
        'LinkedIn + Reddit运营',
        '潜在客户追踪系统',
        '月度策略报告',
        '专属客户经理',
        '竞品监测分析',
        'A/B测试优化'
      ],
      highlight: true,
      badge: '最受欢迎'
    },
    {
      name: '全渠道版',
      price: '¥9,999',
      period: '/月',
      description: '适合成熟企业，打造行业影响力',
      features: [
        '无限内容生产',
        '全平台自动化运营',
        'AI外联开发客户',
        '实时市场洞察看板',
        '定制化AI模型训练',
        '7x24技术支持',
        '季度战略规划会议',
        '独立品牌建设方案'
      ],
      highlight: false,
      badge: '企业首选'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            选择适合你的服务方案
          </h2>
          <p className="text-xl text-gray-600">
            灵活的服务包，随企业成长而升级
          </p>
        </div>
        {/* 组件内容... */}
      </div>
    </section>
  )
}
```

2. **在主页面中引入**:
```typescript
// app/page.tsx
import ServicePackages from '@/components/ServicePackages'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <CapabilityMatrix />
      <ServicePackages />  {/* 添加这行 */}
      <CoreAdvantages />
      <IndustryResearchMCP />
      <CTASection />
      <Footer />
    </main>
  )
}
```

### 场景7: 修改SEO信息

**文件**: `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Jilo.ai - 新标题',  // 修改标题
  description: '新的描述文字',  // 修改描述
  
  // 可以添加更多SEO字段
  keywords: 'AI营销, B2B, 制造业',
  openGraph: {
    title: 'Jilo.ai',
    description: '描述',
    url: 'https://jilo.ai',
    siteName: 'Jilo.ai',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}
```

### 场景8: 添加Google Analytics

1. 在 `app/layout.tsx` 的 `<head>` 中添加:

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

### 场景9: 修改手机端适配

**使用Tailwind响应式前缀**:
- `sm:` - 小屏幕 (≥640px)
- `md:` - 中等屏幕 (≥768px)
- `lg:` - 大屏幕 (≥1024px)
- `xl:` - 超大屏幕 (≥1280px)

例如:
```typescript
<div className="text-2xl md:text-4xl lg:text-6xl">
  // 手机2xl，平板4xl，桌面6xl
</div>
```

### 场景10: 修复导航链接

#### 添加页面锚点ID
为各个组件添加ID以便导航跳转：

**文件**: `components/CapabilityMatrix.tsx`
```typescript
// 添加ID锚点
<section id="features" className="py-20 bg-gray-50">
```

**文件**: `components/CoreAdvantages.tsx`
```typescript
// 添加ID锚点
<section id="advantages" className="py-20 bg-gradient-to-b from-gray-50 to-white">
```

**文件**: `components/mcp/IndustryResearchMCP.tsx`
```typescript
// 添加ID锚点
<section id="services" className="py-16 bg-gray-50">
```

#### 修复底部链接
**文件**: `components/Footer.tsx`

```typescript
// 将底部链接指向正确的内容
<li><a href="#features" className="hover:text-white transition-colors">功能特性</a></li>
<li><a href="#services" className="hover:text-white transition-colors">服务方案</a></li>
<li><a href="#advantages" className="hover:text-white transition-colors">案例展示</a></li>
<li><a href="/dashboard" className="hover:text-white transition-colors">价格说明</a></li>
```

### 场景11: 自定义MCP组件

#### MCP组件架构
MCP (Modular Cognitive Process) 组件是Jilo.ai的核心功能，提供智能行业分析：

```
components/mcp/
├── IndustryResearchMCP.tsx  # 主组件，包含行业识别和报告生成
├── IndustryCharts.tsx        # 数据可视化图表（使用recharts）
├── ExportReport.tsx          # 多格式报告导出（PDF/Excel/Text）
├── ReportHistory.tsx         # 历史记录管理（localStorage）
└── RealTimeData.tsx          # 实时数据更新（API集成）
```

#### 核心功能特性
- **智能行业识别**: 基于关键词自动识别行业类型
- **真实API数据**: 集成Alpha Vantage、NewsAPI等市场数据
- **数据可视化**: 使用recharts展示市场趋势和竞争分析
- **多格式导出**: 支持PDF、Excel、文本格式
- **历史记录**: 本地存储用户查询历史和报告
- **实时更新**: 每5分钟自动刷新市场数据

#### 添加新的行业类型
**文件**: `components/mcp/IndustryResearchMCP.tsx`

在 `industryDatabase` 数组中添加新行业:

```typescript
const industryDatabase: IndustryData[] = [
  // 现有行业...
  {
    name: '新能源汽车',
    keywords: ['电动车', '新能源汽车', '电池', '充电桩', '特斯拉'],
    marketData: {
      size: '全球市场规模约$8000亿美元',
      growthRate: '年增长率15.2%',
      keyPlayers: ['特斯拉', '比亚迪', '蔚来', '理想']
    },
    regulations: ['碳排放标准', '电池安全认证', '充电标准'],
    trends: ['自动驾驶', '电池技术', '充电网络', '智能网联']
  }
];
```

#### 修改图表样式
**文件**: `components/mcp/IndustryCharts.tsx`

```typescript
// 修改图表颜色主题
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

// 修改图表类型
<BarChart data={data}>
  <Bar dataKey="value" fill="#FF6B6B" />
</BarChart>

// 添加新的图表类型
<LineChart data={trendData}>
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
</LineChart>
```

#### 添加新的导出格式
**文件**: `components/mcp/ExportReport.tsx`

```typescript
const exportToCSV = () => {
  // 添加CSV导出逻辑
  const csvContent = convertToCSV(report);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${report.title}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// 添加Word文档导出
const exportToWord = async () => {
  const doc = new Document();
  // 添加Word导出逻辑...
};
```

#### 自定义API数据源
**文件**: `lib/api/apiService.ts`

```typescript
// 添加新的API服务
const fetchCustomData = async (industry: string) => {
  try {
    const response = await fetch(`https://api.example.com/data/${industry}`);
    return await response.json();
  } catch (error) {
    console.error('Custom API error:', error);
    return null;
  }
};

// 集成到主服务
export const getIndustryData = async (industry: string) => {
  const [alphaData, customData] = await Promise.all([
    fetchAlphaVantageData(industry),
    fetchCustomData(industry)
  ]);
  
  return {
    ...alphaData,
    customMetrics: customData
  };
};
```

#### 修改缓存策略
**文件**: `lib/api/apiService.ts`

```typescript
// 自定义缓存时间
const CACHE_DURATION = {
  INDUSTRY_DATA: 10 * 60 * 1000,  // 10分钟
  STOCK_DATA: 2 * 60 * 1000,      // 2分钟
  NEWS_DATA: 15 * 60 * 1000,     // 15分钟
};

// 添加缓存清理功能
const clearCache = () => {
  localStorage.removeItem('industryCache');
  localStorage.removeItem('stockCache');
  localStorage.removeItem('newsCache');
};
```

---

## 故障排除

### 问题1: 本地启动失败

**现象**: `npm run dev` 报错

**解决方案**:
```bash
# 删除node_modules和lock文件
rm -rf node_modules package-lock.json

# 重新安装
npm install

# 再次启动
npm run dev
```

### 问题2: Git推送失败

**现象**: `git push` 提示认证失败

**解决方案**:
```bash
# 使用Token推送
git remote set-url origin https://YOUR_TOKEN@github.com/372768498/jilo-ai-website.git

# 或者配置SSH密钥（一次配置，永久使用）
```

### 问题3: Vercel部署失败

**检查步骤**:
1. 登录 https://vercel.com
2. 查看部署日志
3. 常见原因:
   - 构建错误: 检查代码语法
   - 依赖问题: 确保package.json正确
   - 环境变量缺失: 检查配置

**解决方法**:
```bash
# 本地测试构建
npm run build

# 如果本地构建成功，重新部署
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

### 问题4: 网站访问慢

**可能原因**:
- DNS未完全生效
- 浏览器缓存

**解决方案**:
```bash
# 清除DNS缓存 (Windows)
ipconfig /flushdns

# 清除DNS缓存 (Mac)
sudo dscacheutil -flushcache

# 使用无痕模式测试
```

### 问题5: 修改不生效

**检查清单**:
1. ✓ 文件已保存
2. ✓ 代码已提交到Git
3. ✓ 已推送到GitHub
4. ✓ Vercel已完成部署
5. ✓ 清除浏览器缓存

### 问题6: TypeScript类型错误

**解决方案**:
```bash
# 检查TypeScript错误
npx tsc --noEmit

# 如果是依赖问题，重新安装类型定义
npm install --save-dev @types/react @types/node
```

### 问题7: API数据获取失败

**现象**: MCP组件显示"获取实时数据失败，使用缓存数据"

**可能原因**:
- API密钥未配置
- API调用超限
- 网络连接问题

**解决方案**:
1. **检查API密钥配置**:
   ```bash
   # 在Vercel控制台检查环境变量
   # 确保以下变量已设置:
   # ALPHA_VANTAGE_API_KEY
   # NEWS_API_KEY
   # POLYGON_API_KEY
   # FINNHUB_API_KEY
   ```

2. **检查API调用限制**:
   - Alpha Vantage: 5 calls/min, 500 calls/day
   - NewsAPI: 1000 requests/month
   - Polygon.io: 5 calls/min
   - Finnhub: 60 calls/min

3. **测试API连接**:
   ```bash
   # 本地测试API调用
   npm run dev
   # 在浏览器控制台查看API错误信息
   ```

### 问题8: 导航链接不工作

**现象**: 点击导航栏或底部链接无法跳转

**解决方案**:
1. **检查组件ID**:
   ```typescript
   // 确保各组件有正确的ID
   <section id="features" className="...">  // CapabilityMatrix
   <section id="services" className="...">  // IndustryResearchMCP
   <section id="advantages" className="..."> // CoreAdvantages
   ```

2. **检查链接格式**:
   ```typescript
   // 导航栏链接
   <Link href="#features">功能</Link>
   <Link href="#services">服务</Link>
   <Link href="#advantages">优势</Link>
   ```

3. **清除浏览器缓存**:
   ```bash
   # 强制刷新页面
   Ctrl + F5 (Windows) 或 Cmd + Shift + R (Mac)
   ```

### 问题9: MCP组件报告生成失败

**现象**: 点击"开始分析"后无反应或报错

**解决方案**:
1. **检查输入内容**:
   - 确保输入框不为空
   - 输入内容长度适中（1-50字符）

2. **检查API服务**:
   ```bash
   # 查看浏览器控制台错误
   # 检查网络请求是否成功
   ```

3. **重置组件状态**:
   ```bash
   # 刷新页面重新加载组件
   # 或清除localStorage缓存
   localStorage.clear()
   ```

---

## 备份与恢复

### 备份策略

#### 1. 代码备份
代码已托管在GitHub，自动备份。

**手动备份到本地**:
```bash
cd D:\
git clone https://github.com/372768498/jilo-ai-website.git jilo-ai-website-backup-$(date +%Y%m%d)
```

#### 2. 定期快照
Vercel自动保存每次部署，可以随时回滚。

#### 3. 导出静态文件
```bash
npm run build
# 构建产物在 .next 目录
```

### 恢复步骤

#### 恢复到特定版本

```bash
# 查看提交历史
git log --oneline

# 恢复到指定提交
git checkout <commit-hash>

# 创建新分支保存这个版本
git checkout -b restore-<date>

# 推送到远程
git push origin restore-<date>
```

#### 在Vercel回滚

1. 登录 Vercel
2. 进入项目
3. 点击 Deployments
4. 找到想要恢复的版本
5. 点击 "Promote to Production"

---

## 联系信息

### 技术支持
- **GitHub Issues**: https://github.com/372768498/jilo-ai-website/issues
- **邮箱**: contact@jilo.ai
- **项目文档**: https://github.com/372768498/jilo-ai-website/blob/main/DOCUMENTATION.md
- **API集成文档**: https://github.com/372768498/jilo-ai-website/blob/main/API_INTEGRATION.md

### 相关账号
- **GitHub**: 372768498
- **Vercel**: 372768498's projects
- **域名**: NameSilo (jilo.ai)
- **在线网站**: https://jilo.ai

### 开发团队
- **主要开发者**: Claude & thirteenxb
- **项目创建日期**: 2025年10月24日
- **最后更新**: 2025年10月24日
- **当前版本**: v1.2

### 获取帮助
1. **查看文档**: 首先阅读本DOCUMENTATION.md文件
2. **检查故障排除**: 查看"故障排除"章节
3. **GitHub Issues**: 提交技术问题
4. **邮件联系**: 发送邮件到contact@jilo.ai

---

## 版本历史

### v1.0 (2025-10-24)
- ✅ 初始版本上线
- ✅ 完整的5屏落地页设计
- ✅ 响应式设计
- ✅ 部署到Vercel
- ✅ 绑定域名 jilo.ai

### v1.1 (2025-10-24)
- ✅ MCP组件功能增强
- ✅ 智能行业识别系统
- ✅ 数据可视化图表集成
- ✅ 多格式报告导出功能
- ✅ 报告历史记录管理
- ✅ 实时数据更新功能

### v1.2 (2025-10-24)
- ✅ 真实API数据集成
- ✅ Alpha Vantage股票数据API
- ✅ NewsAPI新闻数据集成
- ✅ 智能缓存和降级机制
- ✅ 错误处理和性能优化
- ✅ API密钥管理和环境变量配置
- ✅ 导航链接修复和锚点跳转
- ✅ 服务方案组件删除
- ✅ 底部链接功能完善

---

## 附录

### A. 有用的资源

- **Next.js官方文档**: https://nextjs.org/docs
- **Tailwind CSS文档**: https://tailwindcss.com/docs
- **Vercel文档**: https://vercel.com/docs
- **React文档**: https://react.dev

### B. 推荐的VS Code插件

- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Tailwind CSS IntelliSense** - Tailwind智能提示
- **GitLens** - Git增强

### C. 快速参考命令

```bash
# 项目管理
npm install              # 安装依赖
npm run dev             # 开发模式
npm run build           # 构建生产版本
npm start               # 运行生产版本
npm run lint            # 代码检查

# Git操作
git status              # 查看状态
git add .               # 添加所有修改
git commit -m "msg"     # 提交
git push origin main    # 推送
git pull origin main    # 拉取
git log --oneline       # 查看提交历史

# 常用导航
cd D:\jilo-ai-website   # 进入项目
code .                  # 用VS Code打开

# API测试
# 检查环境变量
echo $ALPHA_VANTAGE_API_KEY
echo $NEWS_API_KEY
echo $POLYGON_API_KEY
echo $FINNHUB_API_KEY

# 清除缓存
npm run build -- --no-cache  # 清除构建缓存
localStorage.clear()          # 清除浏览器缓存（在控制台执行）

# 故障排除
npx tsc --noEmit       # 检查TypeScript错误
npm audit              # 检查安全漏洞
npm outdated           # 检查过时依赖
```

---

## 更新日志

| 日期 | 修改内容 | 修改人 |
|------|---------|--------|
| 2025-10-24 | 创建文档 | Claude & thirteenxb |
| 2025-10-24 | 更新到v1.1 - MCP组件增强 | Claude & thirteenxb |
| 2025-10-24 | 更新到v1.2 - API集成和导航修复 | Claude & thirteenxb |
| - | - | - |

---

**文档结束**

如有问题或需要补充，请随时更新此文档。
