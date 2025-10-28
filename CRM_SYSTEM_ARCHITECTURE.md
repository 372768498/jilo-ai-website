# CRM 系统架构设计文档

## 1. 系统概述

### 1.1 目标
构建一个功能完善的客户管理平台，整合客户信息、微站展示和 AI 营销功能。

### 1.2 核心功能
- **客户管理**: 完整的客户信息管理和分类
- **微站展示**: 每个客户独立的展示页面
- **AI 功能集成**: ICP 画像、竞品分析、内容生成等
- **数据分析**: 营销数据监控和分析
- **权限管理**: 多角色权限控制

---

## 2. 架构设计

### 2.1 技术栈

**前端**:
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI (组件库)
- Recharts (图表)

**后端**:
- Next.js API Routes
- Supabase (PostgreSQL + Auth + Storage)
- Claude API (AI 功能)

**部署**:
- Vercel (前端 + API)
- Supabase Cloud (数据库)

### 2.2 路由结构

```
/dashboard                    # 客户列表页
/dashboard/clients            # 客户管理
/dashboard/clients/[id]       # 客户详情页
  ├── overview               # 概览
  ├── microsite              # 微站
  ├── icp                    # ICP 画像
  ├── competitors            # 竞品分析
  ├── knowledge              # 企业知识库
  ├── reports                # 周报/日报
  ├── content                # 内容管理
  │   ├── images             # SKU 图片优化
  │   └── videos             # 短视频生成
  ├── social                 # 社媒运营
  │   ├── linkedin           # LinkedIn
  │   └── reddit             # Reddit
  ├── monitoring             # 数据监控
  └── settings               # 设置
```

### 2.3 数据库设计

#### 客户表 (clients)
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255) NOT NULL,
  english_name VARCHAR(255),
  industry VARCHAR(100) NOT NULL,
  service_package VARCHAR(50),
  relationship_status VARCHAR(50) DEFAULT 'active',
  microsite_url VARCHAR(255),  -- 微站链接
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### AI 功能记录表 (ai_functions)
```sql
CREATE TABLE ai_functions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  function_type VARCHAR(50) NOT NULL,  -- icp, competitor, content, etc.
  function_name VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  result JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

#### 内容资产表 (content_assets)
```sql
CREATE TABLE content_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  asset_type VARCHAR(50) NOT NULL,  -- image, video, document, etc.
  title VARCHAR(255),
  description TEXT,
  file_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

## 3. 功能模块设计

### 3.1 客户列表页 (/dashboard)

**功能**:
- 显示所有客户
- 搜索和筛选
- 快速操作（查看、编辑、删除）
- 新增客户

**组件**:
```tsx
<ClientListPage>
  <ClientSearch />
  <ClientFilters />
  <ClientTable />
  <ClientActions />
</ClientListPage>
```

### 3.2 客户详情页 (/dashboard/clients/[id])

**导航结构**:
```tsx
<Tabs defaultValue="overview">
  <Tab value="overview">概览</Tab>
  <Tab value="microsite">微站</Tab>
  <Tab value="icp">ICP 画像</Tab>
  <Tab value="competitors">竞品分析</Tab>
  <Tab value="knowledge">知识库</Tab>
  <Tab value="reports">报告</Tab>
  <Tab value="content">内容</Tab>
  <Tab value="social">社媒</Tab>
  <Tab value="monitoring">监控</Tab>
  <Tab value="settings">设置</Tab>
</Tabs>
```

### 3.3 AI 功能模块

#### ICP 画像
- **输入**: 客户基本信息、行业数据
- **处理**: Claude API 分析
- **输出**: 理想客户画像、特征分析
- **存储**: ai_functions 表

#### 竞品分析
- **输入**: 行业关键词、目标市场
- **处理**: Search MCP + Claude
- **输出**: 竞品列表、对比分析
- **存储**: ai_functions 表

#### 内容生成
- **SKU 图片优化**: Image MCP (Stable Diffusion)
- **短视频生成**: Video MCP (Pika/Runway)
- **存储**: content_assets 表

#### 自动化运营
- **LinkedIn**: PhantomBuster MCP
- **Reddit**: Reddit API
- **定时任务**: Vercel Cron Jobs

---

## 4. 实现计划

### 阶段 1: 基础架构 (本次完成)
- [x] 创建项目结构
- [ ] 配置 Supabase
- [ ] 实现客户列表页
- [ ] 实现客户详情页框架
- [ ] 集成微站展示

### 阶段 2: AI 功能集成 (下一阶段)
- [ ] ICP 画像功能
- [ ] 竞品分析功能
- [ ] 内容生成功能
- [ ] 社媒自动化

### 阶段 3: 数据和分析 (后续)
- [ ] 数据监控
- [ ] 报表生成
- [ ] 数据可视化

---

## 5. API 设计

### 客户相关
```
GET    /api/clients              # 获取客户列表
POST   /api/clients              # 创建客户
GET    /api/clients/:id          # 获取客户详情
PUT    /api/clients/:id          # 更新客户
DELETE /api/clients/:id          # 删除客户
```

### AI 功能相关
```
POST   /api/ai/icp               # 生成 ICP 画像
POST   /api/ai/competitor        # 竞品分析
POST   /api/ai/content           # 内容生成
GET    /api/ai/tasks/:id         # 获取任务状态
```

### 内容相关
```
GET    /api/content/:clientId    # 获取客户内容
POST   /api/content/upload       # 上传内容
DELETE /api/content/:id          # 删除内容
```

---

## 6. 组件库设计

使用 Shadcn UI 作为基础组件库:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input table tabs card
```

常用组件:
- `Button` - 按钮
- `Input` - 输入框
- `Table` - 表格
- `Tabs` - 标签页
- `Card` - 卡片
- `Dialog` - 对话框
- `Select` - 选择器

---

## 7. 状态管理

**简单场景**: React State
**复杂场景**: Zustand (轻量级状态管理)

```typescript
// stores/clientStore.ts
import create from 'zustand'

interface ClientStore {
  clients: Client[]
  selectedClient: Client | null
  setClients: (clients: Client[]) => void
  setSelectedClient: (client: Client) => void
}

const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  selectedClient: null,
  setClients: (clients) => set({ clients }),
  setSelectedClient: (client) => set({ selectedClient: client }),
}))
```

---

## 8. 部署和运维

### 环境变量
```
.env.local:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
```

### CI/CD
- GitHub → Vercel (自动部署)
- 环境隔离 (development, preview, production)

---

## 9. 安全性

- **认证**: Supabase Auth
- **授权**: Row Level Security (RLS)
- **数据加密**: Supabase Encryption
- **API 限流**: Vercel Rate Limiting

---

## 10. 下一步行动

1. 安装 Shadcn UI
2. 配置 Supabase 数据库
3. 创建 EVN 文件夹结构
4. 实现客户列表页
5. 实现客户详情页
6. 集成微站展示
7. 测试和优化

