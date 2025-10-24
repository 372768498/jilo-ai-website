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
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 页面布局和SEO配置
│   └── page.tsx             # 主页面（组合所有组件）
├── components/              # 网站组件
│   ├── HeroSection.tsx      # 首屏（Hero区域）
│   ├── CapabilityMatrix.tsx # 核心能力矩阵
│   ├── ServicePackages.tsx  # 服务方案
│   ├── CoreAdvantages.tsx   # 核心优势
│   ├── CTASection.tsx       # 行动号召区域
│   ├── WeChatQRModal.tsx    # 微信二维码弹窗
│   └── Footer.tsx           # 页脚
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
└── README.md               # 项目说明
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

### 场景6: 添加新的服务包

**文件**: `components/ServicePackages.tsx`

在 `packages` 数组中添加新对象:

```typescript
const packages = [
  // 现有的包...
  {
    name: '企业定制版',
    price: '¥19,999',
    period: '/月',
    description: '适合大型企业，完全定制化解决方案',
    features: [
      '专属AI模型训练',
      '独立私有化部署',
      '7x24专属技术支持',
      // 添加更多特性...
    ],
    highlight: false,
    badge: '旗舰版'
  }
]
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
- **邮箱**: 372768498@qq.com

### 相关账号
- **GitHub**: 372768498
- **Vercel**: 372768498's projects
- **域名**: NameSilo

---

## 版本历史

### v1.0 (2025-10-24)
- ✅ 初始版本上线
- ✅ 完整的5屏落地页设计
- ✅ 响应式设计
- ✅ 部署到Vercel
- ✅ 绑定域名 jilo.ai

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

# Git操作
git status              # 查看状态
git add .               # 添加所有修改
git commit -m "msg"     # 提交
git push origin main    # 推送
git pull origin main    # 拉取

# 常用导航
cd D:\jilo-ai-website   # 进入项目
code .                  # 用VS Code打开
```

---

## 更新日志

| 日期 | 修改内容 | 修改人 |
|------|---------|--------|
| 2025-10-24 | 创建文档 | Claude & thirteenxb |
| - | - | - |

---

**文档结束**

如有问题或需要补充，请随时更新此文档。
