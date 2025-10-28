# AI 驱动的出海营销中台 - 完整项目文档

**版本：** v2.0 (战略优化版)  
**日期：** 2025-10-23  
**编制：** 战略与增长规划组  
**文档状态：** 执行就绪

---

## 目录

1. [项目介绍](#1-项目介绍)
2. [项目目标](#2-项目目标)
3. [项目落地执行路径](#3-项目落地执行路径)
4. [核心支撑文档清单](#4-核心支撑文档清单)
5. [风险管理与应对](#5-风险管理与应对)
6. [附录](#6-附录)

---

## 1. 项目介绍

### 1.1 项目定义

本项目面向中国出海工厂（以 B2B 为主，兼顾 B2C）提供一套"**以结果为导向、以数据为驱动、以合规为底线**"的 AI 营销中台：

**技术架构：**
- **编排中枢**：Trae（自动化工作流 + 异常处理 + 权限管理）
- **智能核心**：Claude API 集群（内容生成 + 竞品分析 + 策略决策 + AI 预审）
- **模型抽象层（MAL）**：统一的模型网关，消除单一供应商依赖
  - 图像：NANOBANANA（主） → Midjourney/DALL-E（备）
  - 视频：SORA2/VEO3.1（主） → Pika/Runway（备）
- **执行触角**：多样 MCP/第三方能力（搜索/数据/图像/视频/分发）
- **数据基座**：
  - **Airtable**（非敏感数据）：Content Queue、Workflow Status、Public Metrics
  - **PostgreSQL + 加密存储**（敏感数据）：ICP 画像、竞品情报、成本台账、策略历史
- **交付窗口**：Web 客户门户（Softr/Stacker）+ 结构化反馈 + KPI 看板

**核心特性：**
- 通过 **模板资产化** 与 **工作流标准化**，在无代码/低代码前提下持续产出
- 通过 **AI 预审 + 人工核验** 两级审核，确保内容质量与合规
- 通过 **黄金检查点机制**，防止系统性错误
- 通过 **动态预算闭环**，实现透明化成本管理与 ROI 追踪

> **无独立站客户也可直接使用**：优先上线轻量级 **微站（1–3 页）** 与 WhatsApp/表单询盘，Alibaba 国际站继续作为交易与背书渠道。

---

### 1.2 关键价值主张

#### 1.2.1 对客户的价值

| 维度 | 传统方式 | AI 中台方式 | 提升幅度 |
|------|---------|------------|---------|
| **速度** | 周报需 2-3 天，SEO 文章需 1 周 | 周报 2 小时，SEO 文章 1 天 | **5-10 倍** |
| **精准度** | 基于经验猜测目标客户 | 基于"采购委员会级 ICP"（反向漏斗） | **决策链覆盖率 +60%** |
| **质量稳定性** | 依赖个人状态，波动大 | AI 预审 + 人工核验，标准化 | **质量方差 -70%** |
| **成本透明** | 黑盒报价，无法追溯 | 每笔 API 成本可追溯到具体内容 | **预算浪费 -40%** |
| **风险控制** | 账号被封后才发现 | 账号健康度监控 + 频控阈值 | **账号异常 -80%** |
| **可扩展性** | 每个新市场需重新摸索 | 成功案例自动沉淀为模板 | **新市场启动时间 -60%** |

#### 1.2.2 对中台的价值（护城河）

**三层护城河设计：**

1. **数据护城河**（核心）
   - 100 个客户的真实决策数据 + 策略成功率统计
   - 行业基准数据库（匿名化聚合）
   - 这是竞争对手无法在短期内复制的

2. **知识护城河**
   - 经过验证的行业引擎模板（机械/家电/轻工等）
   - 持续优化的 Claude 提示词库（每月迭代）
   - 案例飞轮（每月 ≥3 篇匿名化案例自动分发）

3. **信任护城河**
   - 透明的成本结构与 ROI 报告
   - 合规审核 100% 覆盖
   - 客户成长阶梯（从青铜到黄金的清晰路径）

---

### 1.3 目标客户与适配场景

#### 1.3.1 理想客户画像（ICP）

**优先级 P0（首批 10 个种子客户）：**
- **行业**：机械制造、家电/3C、轻工（有标准化产品与清晰 SKU）
- **规模**：年营收 5000 万 - 5 亿人民币
- **出海阶段**：已有 Alibaba 国际站，年出口额 ≥ 500 万美元
- **痛点**：
  - 线上询盘质量差，转化率 < 3%
  - 依赖展会/老客户，获客成本高且不可控
  - 尝试过独立站但效果不佳，或尚未建站
- **决策特征**：
  - 老板/销售总监直接参与决策（决策链短）
  - 愿意为"可证实的 ROI"付费
  - 接受 3-6 个月的效果验证期

**优先级 P1（规模化阶段）：**
- 扩展至贸易公司、ODM/OEM 工厂
- 年营收 1000 万 - 5000 万人民币

**排除标准（至少前 12 个月）：**
- 非标定制化产品（如大型工程机械）
- 高度依赖线下渠道的传统企业（数字化意愿低）
- 要求 100% 中文服务的客户（产品设计为多语言）

#### 1.3.2 适配场景

| 场景 | 客户状态 | 中台解决方案 | 预期效果 |
|------|---------|------------|---------|
| **场景 1：有国际站，无独立站** | 仅在 Alibaba 开店，流量单一 | 2 周上线微站 + SEO + WhatsApp 询盘 | 3 个月内自然流量 +30% |
| **场景 2：有独立站，无流量** | 网站建好但无人访问 | 竞品分析 + SEO 优化 + 社媒引流 | 6 个月内自然流量达 5000/月 |
| **场景 3：有流量，无转化** | 月访问 10000+，但询盘 < 20 | ICP 重构 + 落地页优化 + 表单简化 | 转化率从 2% 提升至 8% |
| **场景 4：有订单，需品牌** | 订单稳定但议价能力弱 | LinkedIn 人设经营 + 案例研究 | 客单价提升 15-25% |

---

### 1.4 核心能力与技术栈

#### 1.4.1 技术架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        客户交互层                              │
│  Web 客户门户（Softr/Stacker）                                │
│  - 周报查看 & 审核                                            │
│  - 《战略调整决策单》确认                                      │
│  - KPI 看板（6 大指标）                                        │
│  - 结构化反馈提交                                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        编排与决策层                            │
│  Trae（工作流引擎）                                           │
│  - 定时触发（日报/周报/竞品监控）                               │
│  - 异常检测 → 战略调整决策单生成                               │
│  - 黄金检查点（3 个强制验证节点）                               │
│  - 权限管理 & 审计日志                                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        智能分析层                              │
│  Claude API 集群                                              │
│  - 内容生成（SEO/社媒/短视频脚本）                             │
│  - 竞品分析 & ICP 抽取                                         │
│  - AI 预审（5 维评分）                                         │
│  - 策略决策（根因分析 + 方案生成）                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        模型抽象层（MAL）                        │
│  统一模型网关                                                  │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │  图像生成         │  │  视频生成         │                   │
│  │  NANOBANANA(主)  │  │  SORA2/VEO3.1(主)│                   │
│  │  ↓ 失败自动降级   │  │  ↓ 失败自动降级   │                   │
│  │  Midjourney(备)  │  │  Pika/Runway(备) │                   │
│  └─────────────────┘  └─────────────────┘                   │
│  - 自动降级 + 性能监控 + 成本记录                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        数据与执行层                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 搜索与监控    │  │ 数据分析      │  │ 合规审核      │      │
│  │ Search MCP   │  │ GSC/GA4      │  │ 合规预审 MCP  │      │
│  │ SimilarWeb   │  │ SEM/竞价数据  │  │ GDPR/CCPA检查│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        数据存储层                              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐   │
│  │ Airtable（非敏感数据）    │  │ PostgreSQL（敏感数据）    │   │
│  │ - Content Queue         │  │ - ICP 详细画像           │   │
│  │ - Workflow Status       │  │ - 竞品情报数据库          │   │
│  │ - Public Metrics        │  │ - 成本台账（Cost Ledger）│   │
│  │ - Industry Benchmarks   │  │ - 策略决策历史            │   │
│  └─────────────────────────┘  └─────────────────────────┘   │
│  所有敏感数据：国内脱敏 + 海外加密 + 最小授权 + 全链路审计       │
└─────────────────────────────────────────────────────────────┘
```

#### 1.4.2 技术栈明细表

| 层级 | 工具/技术 | 版本/服务 | 核心功能 | 成本结构 |
|------|---------|----------|---------|---------|
| **编排** | Trae | 企业版 | 工作流自动化、异常重试、权限管理 | 固定成本 |
| **智能** | Claude API | Sonnet 4.5 | 内容生成、分析、决策 | 按 token 计费 |
| **模型网关** | 自研 MAL | v1.0 | 模型抽象、自动降级、成本记录 | 无额外成本 |
| **图像** | NANOBANANA | API | 品牌风格图像生成 | 按次计费 |
| **视频** | SORA2/VEO3.1 | API | 短视频生成 | 按秒计费 |
| **搜索** | Search MCP | - | 资讯抓取、趋势分析 | 按请求计费 |
| **监控** | SimilarWeb | Pro | 竞品流量、渠道分析 | 固定成本 |
| **分析** | Google Analytics 4 | 免费版 | 流量、转化追踪 | 免费 |
| **分析** | Google Search Console | 免费版 | SEO 表现监控 | 免费 |
| **GEO优化** | AI Search Optimization Suite | 自研+第三方 | ChatGPT/Perplexity/Gemini搜索优化 | 按客户计费 |
| **协作** | 飞书（Lark） | 专业版 | 消息提醒、任务派发、客户沟通 | 固定成本 |
| **开发** | Cursor | Pro | AI辅助编码（用于系统优化与脚本开发） | 固定成本 |
| **存储（非敏感）** | Airtable | Pro | 工作流状态、内容队列 | 固定成本 |
| **存储（敏感）** | PostgreSQL | 自建/RDS | ICP、成本、策略历史 | 固定成本 |
| **门户** | Softr/Stacker | Business | 客户交互、审核、看板 | 固定成本 |
| **合规** | 合规预审 MCP | - | GDPR/CCPA/PIPL 检查 | 按请求计费 |
| **知识库** | Notion | Team | 内部文档、SOP | 固定成本 |

**成本结构透明化原则：**
- 所有按次/token 计费的调用必须记录到 `Cost Ledger` 表
- 每月生成《成本明细报告》，映射到具体内容产出
- 客户可在门户查看本月 API 成本分解

---

### 1.5 合规与风险分级服务

#### 1.5.1 风险分级定义

| 服务包 | 风险等级 | 服务内容 | 自动化程度 | 账号风险 | 适用客户 |
|--------|---------|---------|-----------|---------|---------|
| **青铜包** | 零风险 | • 内容生产<br>• 门户周报<br>• SEO 优化<br>• 社媒发帖（仅发布） | 90% 自动化<br>10% 人工审核 | 几乎无风险 | 所有客户（默认） |
| **白银包** | 低风险 | 青铜包 +<br>• 智能互动（点赞/收藏）<br>• 低频评论（≤5 条/周）<br>• 账号健康度监控 | 70% 自动化<br>30% 人工审核 | 低风险<br>（异常率 <5%） | 有品牌建设需求的客户 |
| **黄金包** | 高风险<br>（试点） | 白银包 +<br>• 主动触达（冷外联）<br>• 高频互动<br>• 战略动态调整（T+1） | 50% 自动化<br>50% 人工审核 | 中高风险<br>（需频控） | 仅白名单客户<br>需签免责协议 |

#### 1.5.2 法律合规框架

**必须遵守的法律法规：**
- **欧盟**：GDPR（通用数据保护条例）
- **美国**：CCPA（加州消费者隐私法案）、CAN-SPAM Act
- **中国**：PIPL（个人信息保护法）、网络安全法
- **平台规则**：LinkedIn/Facebook/Instagram/YouTube TOS

**数据保护措施：**
```yaml
敏感数据处理流程:
  采集阶段:
    - 最小化原则: 仅采集必要字段
    - 明确授权: 客户签署《数据处理协议》
    
  存储阶段:
    - 国内数据: 脱敏处理（姓名→编码，邮箱→哈希）
    - 海外数据: AES-256 加密 + 独立密钥管理
    - 物理隔离: 敏感数据存储在 PostgreSQL，非敏感在 Airtable
    
  使用阶段:
    - 权限分级: 运营人员仅看到脱敏后数据
    - 审计日志: 所有数据访问记录保留 2 年
    
  删除阶段:
    - 客户终止服务后 30 天内删除所有可识别数据
    - DaaS 数据池仅保留匿名化聚合数据
```

**高风险动作的保护机制（黄金包）：**
1. **沙盒测试环境**：新策略先在测试账号运行 7 天
2. **频控阈值**：
   - LinkedIn 主动联系：≤ 20 次/周/账号
   - 评论互动：≤ 10 次/天/账号
   - 自动点赞：≤ 50 次/天/账号
3. **账号健康度监控**：
   - 每日检测：连接请求接受率、消息回复率、内容互动率
   - 异常告警：任一指标 7 日降幅 ≥ 30% → 自动暂停高风险动作
4. **人工复核**：所有主动触达消息需人工审核后发送

#### 1.5.3 免责与客户知情

**黄金包客户必须签署的文件：**
1. 《高风险服务知情同意书》
2. 《账号风险免责协议》
3. 《数据处理与授权协议》

**核心条款示例：**
> "客户理解并同意，主动触达等动作存在账号被限制或封禁的风险。中台已采取行业最佳实践（频控、沙盒、监控）降低风险，但无法完全消除。因此产生的账号问题，中台协助恢复但不承担直接责任。客户有权随时降级至白银包服务。"

---

### 1.6 商业模式与定价

#### 1.6.1 定价结构（组合模式）

**定价公式：**
```
总费用 = 基础订阅费 + API 成本加成 + 效果提成/风险包费用
```

**具体方案：**

| 服务包 | 基础订阅费<br>（月） | API 成本加成 | GEO优化费<br>（可选） | TikTok服务<br>（可选） | 效果提成<br>（可选） | 风险包费用<br>（月） | 总费用区间<br>（月） |
|--------|-------------------|------------|------------------|-------------------|-------------------|-------------------|-------------------|
| **青铜包**<br>（B2B基础） | ¥15,000 | 实际成本 × 1.3 | - | - | 无 | 无 | ¥18,000 - 25,000 |
| **白银包**<br>（B2B进阶） | ¥25,000 | 实际成本 × 1.3 | +¥8,000（基础版） | +¥5,000（基础版）<br>每日2条视频 | 新增 MQL × ¥150<br>（MQL>30 时启用） | +¥10,000 | ¥48,000 - 75,000 |
| **黄金包**<br>（B2B/B2C全渠道） | ¥45,000 | 实际成本 × 1.3 | +¥35,000（专业版）<br>含AI搜索全覆盖 | +¥12,000（专业版）<br>每日5条+广告优化 | 新增 MQL × ¥200<br>+<br>新增订单额 × 2%<br>+<br>TikTok GMV × 5% | +¥20,000 | ¥112,000 - 200,000 |

**费用说明：**
- **基础订阅费**：覆盖 Trae 运维、人工审核、门户维护、客户成功服务
- **API 成本加成**：
  - 包含：Claude、SORA/VEO、Search MCP、合规预审等所有按次计费服务
  - 1.3 倍加成用于覆盖模型网关开发、异常处理、降级备份的成本
  - 每月提供《API 成本明细报告》，透明到每篇内容
- **GEO优化费**（新增）：
  - **基础版（白银包，¥8,000/月）**：优化内容以在ChatGPT、Perplexity等AI搜索中被引用，月度监测报告
  - **专业版（黄金包，¥35,000/月，约$5,000）**：
    - 全面覆盖ChatGPT、Perplexity、Gemini、Claude、Bing Copilot等主流AI搜索引擎
    - 构建"AI可引用知识库"（结构化数据+权威来源标注）
    - 实时监测品牌在AI回答中的出现频率与排名
    - 每周优化建议+竞品AI搜索表现对比
    - **价值**：AI搜索流量占比已达20-30%（2025数据），且用户决策权重极高
- **效果提成**：
  - 仅在达到约定阈值后启动（如青铜包不启动，白银包 MQL>30 后启动）
  - 用于激励对齐，确保中台关注实际转化而非虚假指标
- **风险包费用**：
  - 白银包：覆盖账号健康度监控、智能互动的额外人工成本
  - 黄金包：覆盖主动触达的高风险性、沙盒测试、战略动态调整（T+1）的快速响应成本

#### 1.6.2 收入预测模型（12 个月）

**假设条件：**
- 月均新增客户：6 个（前 3 个月）→ 8 个（4-6 月）→ 10 个（7-12 月）
- 客户分布：青铜 60%，白银 30%，黄金 10%
- 流失率：月均 5%（行业标准）

| 月份 | 累计客户数 | 青铜 | 白银 | 黄金 | 月收入（万元） | 累计收入（万元） |
|------|-----------|------|------|------|--------------|----------------|
| M1-3 | 18 | 11 | 5 | 2 | 55 | 165 |
| M4-6 | 42 | 25 | 13 | 4 | 124 | 537 |
| M7-9 | 72 | 43 | 22 | 7 | 212 | 1,173 |
| M10-12 | 100 | 60 | 30 | 10 | 295 | 2,058 |

**12 个月总收入：约 205.8 万元**

---

### 1.7 客户成长阶梯设计

这是让客户"自然升级"而非被推销的关键设计。

```
┌─────────────────────────────────────────────────────────────┐
│  Level 3: 市场领先者（黄金包）                                 │
│  目标: 解决"速度"问题 - 快速响应市场变化                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 服务内容:                                             │   │
│  │ • 主动触达（LinkedIn/Email 冷外联）                    │   │
│  │ • 战略动态调整（T+1 应急响应）                         │   │
│  │ • 行业基准对比（您在行业中的位置）                      │   │
│  │ • 专属客户成功经理（周度 1v1 策略会）                   │   │
│  │ • GEO优化（专业版）：全AI搜索引擎覆盖+知识库构建       │   │
│  └─────────────────────────────────────────────────────┘   │
│  ↑ 升级条件:                                                 │
│  ├─ 连续 3 个月超额完成 Level 2 指标                          │
│  ├─ 或客户主动要求（需签署免责协议）                          │
│  ├─ 且月营销预算 ≥ 10 万元（因增加GEO专业版）                 │
│  └─ AI搜索可见度评分 ≥ 70分（新增要求）                       │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│  Level 2: 稳定增长者（白银包）                                 │
│  目标: 解决"质量"问题 - 建立品牌与获客体系                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 服务内容:                                             │   │
│  │ • 案例飞轮（匿名化案例自动生成与分发）                  │   │
│  │ • 竞品深度对标（策略提示）                            │   │
│  │ • 智能互动（点赞/收藏/低频评论）                       │   │
│  │ • LinkedIn 人设经营                                  │   │
│  │ • GEO优化（基础版）：ChatGPT/Perplexity/Gemini       │   │
│  └─────────────────────────────────────────────────────┘   │
│  ↑ 升级条件:                                                 │
│  ├─ 自然流量 ≥ 2000/月                                       │
│  ├─ MQL ≥ 50/月                                             │
│  ├─ SQL 转化率 ≥ 25%                                        │
│  └─ AI搜索可见度评分 ≥ 40分（新增）                          │
└─────────────────────────────────────────────────────────────┘
                              ↑
┌─────────────────────────────────────────────────────────────┐
│  Level 1: 数字化生存者（青铜包）                               │
│  目标: 解决"有无"问题 - 建立数字化营销基础                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 服务内容:                                             │   │
│  │ • 微站/独立站（1-3 页，LCP ≤ 3s）                      │   │
│  │ • 基础 SEO（多语言内容生产）                           │   │
│  │ • 社媒发帖（品牌背书，纯发布）                          │   │
│  │ • 周报（洞察 + 建议）                                  │   │
│  │ • ICP 画像（采购委员会级）                             │   │
│  └─────────────────────────────────────────────────────┘   │
│  ↑ 升级条件:                                                 │
│  ├─ 自然流量 ≥ 500/月                                        │
│  ├─ 落地页转化率 ≥ 5%                                        │
│  └─ 使用中台服务 ≥ 3 个月                                    │
└─────────────────────────────────────────────────────────────┘
                              ↑
                         新客户起点
```

**阶梯设计的关键原则：**
1. **透明的升级条件**：客户能清楚看到"达到什么指标就能升级"
2. **自然的价值感知**：Level 1 解决生存，Level 2 解决增长，Level 3 解决领先
3. **防止过早升级**：设置"连续 3 个月"等时间条件，避免偶然波动导致的错误升级
4. **双向灵活性**：客户可随时降级（如预算紧张）或升级（如业务加速）

---

## 2. 项目目标

### 2.1 战略总目标（North Star）

**在 12 个月内服务 100 家出海工厂客户，建立"以案例驱动获客"的增长飞轮，实现：**
- 获客成本（CAC）下降 ≥ 40%
- 营销产能提升 ≥ 5 倍
- 客户 LTV/CAC 比率 ≥ 3:1
- 复购率 ≥ 70%（12 个月后仍在使用）

**收入目标：**
- 12个月累计收入：**160.2万元**（85个付费客户）
- 其中GEO服务贡献：约35-40%（白银包35%+黄金包15%客户选择GEO优化）

**护城河目标：**
- 积累 100 家客户的真实决策数据，训练出"最懂出海的策略引擎"
- 沉淀 ≥ 10 个行业引擎模板（机械/家电/轻工/快消品等），实现新客户 2 天启动
- 建立**双重数据护城河**：
  1. 传统行业基准数据库（流量/转化率/CPL等）
  2. **AI搜索情报数据库**（10+行业在7个AI搜索引擎中的品牌竞争力监测）

---

### 2.2 量化目标（OKRs）

#### O1｜建立可复制的营销中台并跑通交付闭环

**KR1.1：自动化与审核覆盖率**
- ≥90% 的日报/周报/社媒发帖由 AI 生成
- 100% 的内容经过"AI 预审 + 人工核验"
- AI 预审评分 ≥ 80 分才能进入人工审核队列

**KR1.2：竞品监控与策略输出**
- 每客户 ≥1 个自动更新的竞品监控看板
- 每周输出 ≥1 条"策略提示"（基于竞品动态）
- 当竞品有重大变化时，T+1 生成《应急响应单》

**KR1.3：微站与落地页**
- 缺乏独立站的客户，**2 周内**上线微站（LCP ≤ 3s，表单≤5 项）
- 落地页技术指标：
  - 首次内容绘制（FCP）≤ 1.8s
  - 最大内容绘制（LCP）≤ 2.5s
  - 累积布局偏移（CLS）≤ 0.1

**KR1.4：黄金检查点运行状况**
- 新客户 Onboarding 检查点通过率 = 100%（强制）
- 内容核验发布检查点拦截率 ≥ 15%（说明 AI 预审在工作）
- 高风险动作启动检查点拦截率 = 100%（任何条件不满足必须拦截）

---

#### O2｜驱动业务增长与可证实的 ROI

**KR2.1：流量增长**
- 多语言 SEO 带来自然流量 **月均 +30%**（季度复合）
- 社媒（LinkedIn/Facebook）带来的网站访问 **月均 +20%**

**KR2.2：转化率提升**
- 微站/落地页平均转化率 **≥ 8%**（行业均值约 5%）
- MQL→SQL 转化率 **≥ 25%**（通过 ICP 精准度提升）

**KR2.3：案例飞轮**
- 每月产出 ≥3 篇"匿名化案例研究"
- 每篇案例配套：
  - 一图看懂（信息图）
  - 60 秒视频讲解
  - 多渠道分发（官网/LinkedIn/YouTube/行业媒体）
- 案例带来的间接询盘 ≥ 每月总询盘的 15%

**KR2.4：客户成功指标**
- 客户平均使用时长 ≥ 8 个月（前 12 个月）
- 从青铜包升级到白银包的比例 ≥ 25%（6 个月后）
- 从白银包升级到黄金包的比例 ≥ 10%（9 个月后）

---

#### O3｜建立合规与风控的产品化能力

**KR3.1：账号健康度**
- 社媒账号异常告警 ≤ 1 次/季度/账号
- 出现异常后，24h 内恢复或降级动作
- 黄金包客户账号封禁率 ≤ 5%（行业内已属优秀）

**KR3.2：合规审核**
- 合规预审覆盖率 = 100%（所有对外内容必须过审）
- 高风险内容拦截率 ≥ 95%（禁用词/敏感话题/未授权数据）
- GDPR/CCPA 相关投诉 = 0

**KR3.3：战略响应速度**
- "战略动态调整"模块实现 **T+1** 响应
  - T 日检测到异常（如 GEO-A 的 CPL 7 日涨幅 ≥ 30%）
  - T+1 日生成《应急响应单》推送到客户门户
  - T+2 日客户确认方案，执行调整
- 应急响应单客户确认率 ≥ 80%（说明建议有价值）

---

#### O4｜单位经济健康与透明

**KR4.1：成本透明化**
- Airtable/PostgreSQL 记录 **100%** 付费调用成本
- 每月自动生成《成本明细报告》，包含：
  - CPL（每线索成本）
  - CPM（每千次曝光成本）
  - 内容件单成本（每篇 SEO/每条视频）
- 客户可在门户实时查看本月 API 成本分解

**KR4.2：预算再平衡**
- 月度"预算再平衡"会议覆盖率 = 100%
- 低效渠道（ROI < 1:2）2 周内自动降配或暂停
- 高效渠道（ROI > 1:5）2 周内增加 20-30% 预算测试上限

**KR4.3：单位经济模型**
- 青铜包：毛利率 ≥ 60%
- 白银包：毛利率 ≥ 55%（因增加人工互动成本）
- 黄金包：毛利率 ≥ 50%（因 T+1 响应与风险兜底成本）
- 整体 CAC 回收期 ≤ 6 个月

---

### 2.3 核心指标看板（每客户 6+3 指标）

#### 2.3.1 客户视角的 6 大核心指标

这些指标会显示在客户门户的 KPI 看板上。

| 指标类别 | 具体指标 | 目标值（青铜包） | 目标值（白银包） | 目标值（黄金包） |
|---------|---------|----------------|----------------|----------------|
| **1. 曝光** | SEO 自然流量（月） | 500+ | 2,000+ | 5,000+ |
| | AI搜索引用次数（月） | - | 15+ | 50+ |
| | 社媒展现量（月） | 10,000+ | 50,000+ | 150,000+ |
| **2. 参与** | 内容互动率 | 2%+ | 4%+ | 6%+ |
| | 页面平均停留时间 | 1.5 分钟+ | 2 分钟+ | 3 分钟+ |
| | 跳出率 | <60% | <50% | <40% |
| **3. 转化** | 落地页转化率 | 5%+ | 8%+ | 12%+ |
| | 表单提交量（月） | 20+ | 50+ | 100+ |
| **4. 线索** | MQL 数量（月） | 15+ | 40+ | 80+ |
| | CPL（每线索成本） | <¥500 | <¥400 | <¥300 |
| | AI搜索带来的MQL占比 | - | 10%+ | 25%+ |
| **5. 承接** | MQL→SQL 转化率 | 15%+ | 25%+ | 35%+ |
| | SQL 数量（月） | 3+ | 10+ | 28+ |
| **6. 营收** | 有效订单数（季度） | 2+ | 6+ | 15+ |
| | 订单金额（季度） | ¥30 万+ | ¥100 万+ | ¥300 万+ |
| | LTV/CAC | 2:1+ | 3:1+ | 4:1+ |

#### 2.3.2 中台内部的 3 大运营指标

这些指标不对客户展示，但用于中台自身优化。

| 指标类别 | 具体指标 | 目标值 | 用途 |
|---------|---------|--------|------|
| **质量** | AI 预审通过率 | 70-80% | 太高说明标准过松，太低说明 Claude 需优化 |
| | 人工审核退回率 | 5-10% | 监控内容质量，识别模板需优化的领域 |
| | 客户满意度评分 | 4.5/5+ | 通过门户结构化反馈收集 |
| **效率** | 内容生产周期 | 日报 2h，周报 4h，SEO 1 天 | 监控自动化效率 |
| | 异常响应时间 | T+1 生成决策单 | 监控战略动态调整模块 |
| | 人工审核平均耗时 | ≤30 分钟/篇 | 识别人力瓶颈 |
| **成本** | 单客户月均 API 成本 | 青铜 ¥2k，白银 ¥3.5k，黄金 ¥6k | 监控成本结构，指导定价调整 |
| | 模型降级率 | ≤5% | 监控主模型稳定性 |
| | 人力成本占比 | ≤35% | 确保规模化后仍有利润空间 |

---

## 3. 项目落地执行路径

> **执行原则：**
> - 先"洞察与管理"，再"内容与分发"，最后"增长飞轮与预算闭环"
> - 模板资产化 + 流程标准化 + AI 预审 + 人工核验
> - 社媒高风险动作默认不启用；如需试点，白名单 + 频控 + 免责协议
> - 每个阶段都有明确的"里程碑"与"验收标准"

---

### 阶段 0｜准备与标准化（第 1–2 天）

#### 目标
一键装配基础骨架，确保无需写代码即可运行第一个工作流。

#### 动作清单

**1. 数据基座搭建**

```yaml
Airtable 表结构（6 张表 + 1 张成本台账）:
  
  1. Clients（客户主表）
     字段: 客户ID, 公司名, 行业, GEO, 服务包级别, 开始日期, 状态
     
  2. Products（产品库）
     字段: 产品ID, 客户ID, 产品名, SKU, USP, 目标市场, 禁用词
     
  3. Personas（ICP 画像）
     字段: 角色ID, 客户ID, 角色名称, 职级, 痛点, 决策权重, 异议点
     
  4. Content_Queue（内容队列）
     字段: 内容ID, 客户ID, 类型(日报/周报/SEO/社媒/视频), 状态(待生成/AI预审中/人工审核中/已发布), 创建时间, 发布时间
     
  5. Competitors（竞品库）
     字段: 竞品ID, 客户ID, 竞品名称, 域名, 监控指标(流量/反链/新内容), 最后更新时间
     
  6. Metrics（指标汇总）
     字段: 客户ID, 月份, 自然流量, MQL数, CPL, 转化率, [其他 6 大指标]
     
  7. Cost_Ledger（成本台账）★新增★
     字段: 记录ID, 客户ID, 内容ID, 调用时间, 模型名称(Claude/SORA/VEO), 成本(元), 输入tokens, 输出tokens

PostgreSQL 表结构（敏感数据）:
  
  1. ICP_Details（详细画像）
     - 客户ID, 角色详细描述, 采购委员会结构, 决策流程图
     
  2. Competitor_Intelligence（竞品情报）
     - 竞品ID, 抓取的完整数据, 策略分析, 敏感备注
     
  3. Strategy_History（策略决策历史）
     - 决策单ID, 客户ID, 触发时间, 根因假设, 选择的方案, 执行结果
```

**2. 模型抽象层（MAL）部署**

```python
# 伪代码示例：模型网关核心逻辑
class ModelGateway:
    def __init__(self):
        self.image_models = [
            {"name": "NANOBANANA", "priority": 1, "cost_per_call": 0.5},
            {"name": "Midjourney", "priority": 2, "cost_per_call": 0.8},
            {"name": "DALL-E-3", "priority": 3, "cost_per_call": 0.6}
        ]
        self.video_models = [
            {"name": "SORA2", "priority": 1, "cost_per_second": 2.0},
            {"name": "VEO3.1", "priority": 2, "cost_per_second": 1.8},
            {"name": "Pika", "priority": 3, "cost_per_second": 1.2},
            {"name": "Runway", "priority": 4, "cost_per_second": 1.5}
        ]
    
    def generate_image(self, prompt, style, brand_pack, client_id):
        for model in sorted(self.image_models, key=lambda x: x['priority']):
            try:
                result = self._call_model(model['name'], prompt, style, brand_pack)
                self._log_cost(client_id, model['name'], model['cost_per_call'])
                return result
            except Exception as e:
                self._alert(f"{model['name']} 失败: {e}, 尝试下一个模型")
        
        # 所有模型都失败，转人工
        return self._fallback_to_human(client_id, prompt, style)
    
    def generate_video(self, prompt, duration, style, brand_pack, client_id):
        # 类似逻辑，按优先级尝试
        pass
    
    def _log_cost(self, client_id, model_name, cost):
        # 记录到 Airtable 的 Cost_Ledger 表
        airtable.insert({
            "客户ID": client_id,
            "调用时间": datetime.now(),
            "模型名称": model_name,
            "成本": cost
        })
```

**3. Trae工作流配置：信号驱动的Multi-Agent系统** ★核心重构★

```yaml
架构理念：
  ❌ 错误: 各Agent独立运行，定时生成内容（"每天发1条LinkedIn"）
  ✅ 正确: MCP作为信息总线，市场信号驱动内容生产（"有机会才发"）

核心原则:
  1. 所有内容必须源于真实市场信号 × 客户供应能力
  2. Agents通过MCP共享上下文，拒绝信息孤岛
  3. 从"信号→分析→策略→生成→发布→学习"形成闭环
  4. 每个产出可追溯到触发源（不凭空构造）

════════════════════════════════════════════════════════════════════
第一层：MCP服务器集群部署（信息采集层）
════════════════════════════════════════════════════════════════════

MCP 1: Market Intelligence Server
  
  职责: 实时监测市场需求信号
  
  技术栈:
  - FastMCP框架（Python）
  - 数据库: PostgreSQL（存储原始信号）
  - 消息队列: Redis Streams（实时推送）
  
  数据源集成:
  1. Google Trends API
     - 监控关键词: 从Airtable Products表提取
     - 检测频率: 每小时
     - 触发阈值: 7日搜索量增长≥20%
  
  2. News API (newsapi.org)
     - 监控领域: 行业新闻、政策变化
     - 来源: Bloomberg, Reuters, 行业媒体
     - NLP分析: Claude提取"对客户业务的影响"
  
  3. LinkedIn Scraper (使用Bright Data或Apify)
     - 监控对象: 目标买家的职位title（从ICP提取）
     - 监控内容: 发帖包含"采购""供应商""RFQ"等关键词
     - 示例: "采购经理发帖: 急需工业泵供应商，Q2交付"
  
  4. Reddit API
     - 监控板块: r/procurement, r/manufacturing, r/construction
     - 关键词匹配: 客户产品相关讨论
  
  5. Alibaba RFQ Tracker（如客户有阿里账号）
     - API: 阿里国际站的RFQ数据
     - 分析: 同行业RFQ数量/价格趋势
  
  输出格式（发送到Redis Stream）:
  {
    "signal_id": "SIG_20250315_001",
    "timestamp": "2025-03-15T09:00:00Z",
    "type": "demand_surge",  // 枚举: demand_surge|policy_change|competitor_move|buyer_inquiry
    "industry": "工业泵",
    "geo": "欧洲",
    "data": {
      "trigger_event": "德国政府宣布€500B基建计划",
      "source_url": "https://...",
      "keyword": "industrial pump supplier",
      "search_volume_7d": 4500,
      "growth_rate": "+32%",
      "buyer_signals": [
        "LinkedIn: 3个采购经理询问'快速交付'",
        "Reddit: 讨论帖'哪家中国泵供应商靠谱?'"
      ]
    },
    "confidence": 0.85,
    "urgency": "high"  // high|medium|low
  }
  
  部署位置: 单独服务器，24/7运行

MCP 2: Customer Capability Server ★关键★
  
  职责: 提供客户真实供应能力（防止凭空编造）
  
  数据来源:
  1. 客户Onboarding时填写的"能力清单"
     - 产品列表（型号/规格/认证）
     - 产能（月产量/库存/交期）
     - 目标市场（GEO/行业）
     - 竞争优势（独特工艺/专利/案例）
     - 限制条件（MOQ/付款方式）
  
  2. 客户ERP集成（如可能）
     - API对接: SAP/用友/金蝶
     - 数据同步: 每日库存/产能利用率
     - 目的: 确保"现货XX台"等表述真实
  
  3. 客户CRM数据（如可能）
     - 历史订单（客户案例来源）
     - 客户评价（社会证明素材）
     - 地域分布（"已服务50+欧洲客户"）
  
  输出格式（按需查询）:
  GET /capability/{client_id}
  
  Response:
  {
    "client_id": "C001",
    "updated_at": "2025-03-15T00:00:00Z",
    "products": [
      {
        "name": "工业泵-型号A",
        "certifications": ["CE", "ISO9001", "UL"],
        "specs": "功率: 5HP, 流量: 100L/min",
        "inventory_status": {
          "current_stock": 2000,
          "monthly_capacity": 5000,
          "available_for_sale": 1800  // 扣除已承诺订单
        }
      }
    ],
    "markets": {
      "primary": ["欧洲", "北美"],
      "proven": ["德国", "法国", "荷兰"]  // 有成功案例
    },
    "competitive_advantages": [
      "20年行业经验",
      "垂直整合供应链（自产核心零部件）",
      "定制化能力（可根据需求调整设计）"
    ],
    "constraints": {
      "moq": 100,
      "lead_time_days": 45,
      "payment_terms": "T/T 30% deposit"
    },
    "case_studies": [
      {
        "id": "CASE_001",
        "client_name": "德国X公司",
        "industry": "建筑",
        "project": "慕尼黑地铁扩建项目",
        "deliverables": "提供500台工业泵, 按时交付",
        "authorized": true  // 客户授权可公开
      }
    ]
  }
  
  关键规则:
  - Agent生成内容时，必须调用此MCP验证事实
  - 如声称"现货2000台"，必须从inventory_status确认
  - 如引用案例，必须检查authorized=true
  
  部署位置: 与Airtable同服务器，或独立API

MCP 3: Competitor Intelligence Server
  
  职责: 监控竞品动作，避免被动应对
  
  数据源:
  1. 竞品网站监控（使用ChangeDetection.io或自建）
     - 检测: 新产品/价格变化/促销活动
     - 频率: 每日
  
  2. SimilarWeb API
     - 数据: 竞品流量/来源渠道/热门页面
     - 分析: 竞品哪个渠道在增长
  
  3. LinkedIn监控
     - 竞品公司主页发帖
     - 竞品高管动态（如CEO宣布新策略）
  
  4. SEO竞品分析（Ahrefs API）
     - 竞品关键词排名变化
     - 竞品新增内容（博客/案例研究）
  
  输出格式:
  {
    "competitor_id": "COMP_A",
    "action_type": "new_campaign_launched",
    "timestamp": "2025-03-15T10:00:00Z",
    "details": {
      "platform": "LinkedIn",
      "content_type": "case_study",
      "topic": "德国客户成功案例",
      "engagement": 300,
      "insight": "竞品正在主攻德国市场"
    },
    "threat_level": "medium",
    "recommended_response": "我们也应发布德国案例，且强调差异化（我们有现货优势）"
  }

MCP 4: Performance Feedback Server
  
  职责: 追踪已发布内容的表现，闭环学习
  
  数据源:
  1. GA4 API（网站数据）
  2. LinkedIn Analytics API
  3. TikTok Analytics API
  4. Airtable Metrics表（汇总数据）
  
  输出格式:
  GET /performance/{content_id}
  
  Response:
  {
    "content_id": "LI_20250315_001",
    "published_at": "2025-03-15T16:00:00Z",
    "metrics_24h": {
      "impressions": 15000,
      "clicks": 450,
      "engagement_rate": 4.2,
      "comments": 12,
      "shares": 8,
      "leads_generated": 8,
      "lead_quality": {
        "A": 6,  // 明确需求+预算
        "B": 2   // 有兴趣但需培育
      }
    },
    "top_comment": "我们正在找这种供应商，如何联系?",
    "sentiment": "positive",
    "linked_opportunity": "OPP_20250315_001"  // 追溯到触发信号
  }

════════════════════════════════════════════════════════════════════
第二层：Multi-Agent编排（Trae核心逻辑）
════════════════════════════════════════════════════════════════════

Agent 1: Market Opportunity Analyzer（机会分析器）

  触发方式: 订阅Redis Stream（Market Intelligence MCP推送的信号）
  
  输入:
  - Market Intelligence MCP的实时信号
  - Customer Capability MCP的能力数据
  - Competitor Intelligence MCP的竞品动态
  
  核心逻辑（Cursor实现）:
  ```python
  # 使用Cursor AI编写，充分利用其代码生成能力
  
  async def analyze_opportunity(signal):
      # 1. 获取客户能力
      capability = await customer_capability_mcp.get(client_id)
      
      # 2. 匹配度计算
      match_score = 0
      
      # 2.1 地域匹配
      if signal.geo in capability.markets.primary:
          match_score += 0.3
      
      # 2.2 产品匹配
      if signal.industry == capability.products[0].category:
          match_score += 0.3
      
      # 2.3 能力匹配
      if capability.products[0].inventory_status.available_for_sale > 0:
          match_score += 0.2  # 有现货
      
      # 2.4 竞争优势匹配
      if "CE" in capability.products[0].certifications and signal.geo == "欧洲":
          match_score += 0.2  # CE认证在欧洲是强优势
      
      # 3. 如机会分数>0.7，生成详细分析
      if match_score > 0.7:
          opportunity = {
              "opportunity_id": f"OPP_{datetime.now().strftime('%Y%m%d_%H%M')}",
              "score": match_score,
              "signal": signal,
              "recommendation": {
                  "action": "immediate_content_push",
                  "content_angle": self.generate_angle(signal, capability),
                  "platforms": ["LinkedIn", "邮件外联"],
                  "urgency": signal.urgency,
                  "expected_leads": self.estimate_leads(signal, match_score)
              },
              "reasoning": [
                  f"市场需求激增{signal.data.growth_rate}",
                  f"客户有{capability.products[0].inventory_status.available_for_sale}台可用库存",
                  f"客户有{capability.products[0].certifications}认证，符合{signal.geo}要求",
                  self.check_competitor_gap(signal.signal_id)
              ]
          }
          
          # 4. 推送到Content Strategy Agent
          await redis.xadd("strategy_queue", opportunity)
          
          # 5. 记录到Airtable
          await airtable.insert("Opportunities", opportunity)
  ```
  
  输出:
  - 推送到strategy_queue（Redis Stream）
  - 记录到Airtable Opportunities表

Agent 2: Content Strategy Agent（内容策略师）

  触发方式: 订阅strategy_queue
  
  输入:
  - Market Opportunity Analyzer的机会分析
  - Competitor Intelligence MCP（竞品在做什么）
  - Performance Feedback MCP（历史内容表现）
  
  核心逻辑:
  ```python
  async def create_strategy(opportunity):
      # 1. 决定内容类型
      content_type = self.decide_content_type(
          opportunity_urgency=opportunity.recommendation.urgency,
          past_performance=await performance_mcp.get_top_type()
      )
      
      # 2. 生成详细Brief
      brief = {
          "brief_id": f"CB_{datetime.now().strftime('%Y%m%d_%H%M')}",
          "linked_opportunity": opportunity.opportunity_id,
          "content_type": content_type,  # LinkedIn文章/短视频/邮件序列
          "core_message": self.extract_core_message(opportunity),
          "key_points": [
              f"买家痛点: {opportunity.signal.data.buyer_signals[0]}",
              f"我们的解决方案: {self.craft_solution(opportunity)}",
              f"行动号召: {self.craft_cta(opportunity)}"
          ],
          "target_audience": await self.refine_icp(opportunity),
          "tone": self.decide_tone(opportunity),
          "avoid": ["泛泛而谈", "无数据支撑"],
          "must_include": [
              "具体数字（如'2000台现货'而非'库存充足'）",
              "真实案例（从Customer Capability MCP的case_studies提取）"
          ],
          "deadline": self.calculate_deadline(opportunity.recommendation.urgency)
      }
      
      # 3. 推送到生成队列
      await redis.xadd("generation_queue", brief)
  ```

Agent 3: Content Generation Agent（内容生成器）

  触发方式: 订阅generation_queue
  
  输入:
  - Content Strategy Agent的详细Brief
  - Customer Capability MCP（验证事实）
  - Brand Guidelines（品牌手册）
  
  核心逻辑（调用Claude API）:
  ```python
  async def generate_content(brief):
      # 1. 从Capability MCP获取真实数据
      capability = await customer_capability_mcp.get(client_id)
      
      # 2. 构造Claude Prompt（关键）
      prompt = f"""
你是{capability.client_name}的内容专家。基于以下**真实市场信号**生成{brief.content_type}:

市场背景（来自Market Intelligence MCP）:
{brief.linked_opportunity.signal.data.trigger_event}
- 关键词搜索量: {brief.linked_opportunity.signal.data.search_volume_7d}（增长{brief.linked_opportunity.signal.data.growth_rate}）
- 买家信号: {brief.linked_opportunity.signal.data.buyer_signals}

我们的能力（来自Customer Capability MCP，这些是**真实的**，不要编造）:
- 产品: {capability.products[0].name}（认证: {capability.products[0].certifications}）
- 库存: {capability.products[0].inventory_status.current_stock}台现货
- 交期: {capability.constraints.lead_time_days}天
- 案例: {capability.case_studies[0] if capability.case_studies else "无可公开案例"}

内容要求:
{brief.key_points}

禁止:
- 不要说"我们是行业领导者"（空话）
- 每个卖点必须有数据支撑（从上述能力数据中提取）

生成内容，并在末尾标注数据来源（格式: [数据来源: XXX MCP]）
"""
      
      # 3. 调用Claude
      response = await claude_api.complete(prompt)
      
      # 4. 结构化输出
      content = {
          "content_id": f"{brief.content_type[:2].upper()}_{datetime.now().strftime('%Y%m%d_%H%M')}",
          "text": response.content,
          "data_sources": self.extract_sources(response.content),
          "linked_brief": brief.brief_id,
          "linked_opportunity": brief.linked_opportunity
      }
      
      # 5. 推送到审核队列
      await redis.xadd("qa_queue", content)
  ```

Agent 4: Quality Assurance Agent（质量审核器）

  触发方式: 订阅qa_queue
  
  输入:
  - Content Generation Agent的输出
  - Customer Capability MCP（验证事实）
  
  核心逻辑:
  ```python
  async def verify_content(content):
      capability = await customer_capability_mcp.get(client_id)
      
      # 1. 事实核查（关键）
      fact_checks = []
      
      # 提取内容中的数字声明
      claims = self.extract_claims(content.text)
      
      for claim in claims:
          if "现货" in claim:
              actual_stock = capability.products[0].inventory_status.current_stock
              claimed_stock = self.extract_number(claim)
              if claimed_stock <= actual_stock:
                  fact_checks.append({"claim": claim, "verified": True})
              else:
                  fact_checks.append({"claim": claim, "verified": False, "issue": "库存数据不符"})
          
          if "案例" in claim:
              case_mentioned = self.extract_case_name(claim)
              if any(c.client_name == case_mentioned for c in capability.case_studies):
                  fact_checks.append({"claim": claim, "verified": True})
              else:
                  fact_checks.append({"claim": claim, "verified": False, "issue": "案例未授权或不存在"})
      
      # 2. 品牌合规检查
      brand_issues = self.check_brand_compliance(content.text)
      
      # 3. 打分
      fact_score = sum(1 for fc in fact_checks if fc["verified"]) / len(fact_checks) * 20
      brand_score = 20 - len(brand_issues) * 2
      actionable_score = self.rate_cta_clarity(content.text)
      
      total_score = fact_score + brand_score + actionable_score
      
      # 4. 决策
      if total_score >= 80 and all(fc["verified"] for fc in fact_checks):
          # 通过，推送发布
          await redis.xadd("publish_queue", content)
          await airtable.update("Content_Queue", content.content_id, {"status": "approved", "score": total_score})
      else:
          # 不通过，返回重做
          feedback = {
              "fact_check_failures": [fc for fc in fact_checks if not fc["verified"]],
              "brand_issues": brand_issues,
              "score": total_score
          }
          await redis.xadd("generation_queue", {
              "brief": content.linked_brief,
              "regenerate": True,
              "feedback": feedback
          })
  ```

Agent 5: Publishing Agent（发布执行器）

  触发方式: 订阅publish_queue
  
  输入:
  - 已审核通过的内容
  - Performance Feedback MCP（确定最佳发布时间）
  
  核心逻辑:
  ```python
  async def publish_content(content):
      # 1. 计算最佳发布时间
      target_audience = await self.get_target_audience(content.linked_opportunity)
      optimal_time = self.calculate_optimal_time(
          geo=target_audience.geo,
          platform=content.content_type,
          past_performance=await performance_mcp.get_best_times()
      )
      
      # 2. 如当前时间接近最佳时间（±2小时），立即发布；否则排期
      if abs((optimal_time - datetime.now()).seconds) < 7200:
          # 立即发布
          if content.content_type == "LinkedIn文章":
              result = await linkedin_api.post(
                  text=content.text,
                  account=client_linkedin_account
              )
          elif content.content_type == "邮件外联":
              result = await email_service.send_batch(
                  recipients=await self.get_target_emails(target_audience),
                  subject=content.subject,
                  body=content.text
              )
          
          # 3. 启动监控
          await performance_mcp.start_tracking(content.content_id)
          
          # 4. 记录发布
          await airtable.update("Content_Queue", content.content_id, {
              "status": "published",
              "published_at": datetime.now(),
              "platform_post_id": result.post_id
          })
      else:
          # 排期
          await scheduler.schedule(optimal_time, self.publish_content, content)
  ```

Agent 6: Performance Learning Agent（学习优化器）

  触发方式: 定时（每24小时）+ 事件驱动（内容发布24h后）
  
  输入:
  - Performance Feedback MCP的实时数据
  - 历史内容表现（Airtable Metrics表）
  
  核心逻辑:
  ```python
  async def learn_and_optimize():
      # 1. 获取过去24小时发布的内容
      recent_content = await airtable.query("Content_Queue", {
          "published_at": {"$gte": datetime.now() - timedelta(days=1)},
          "status": "published"
      })
      
      for content in recent_content:
          # 2. 获取表现数据
          performance = await performance_mcp.get(content.content_id)
          
          # 3. 归因分析
          opportunity = await airtable.get("Opportunities", content.linked_opportunity)
          
          insights = {
              "content_id": content.content_id,
              "performance": performance,
              "success_factors": [],
              "failure_factors": [],
              "icp_insights": [],
              "template_updates": []
          }
          
          # 3.1 成功因素提取
          if performance.engagement_rate > 4.0:  # 高于平均
              insights["success_factors"].append(f"时效性: 在信号触发{(content.published_at - opportunity.created_at).seconds / 3600}小时内发布")
              insights["success_factors"].append(f"具体化: 使用了'{self.extract_numbers(content.text)}'等具体数据")
          
          # 3.2 ICP优化
          if performance.lead_quality.A > 0:
              lead_profiles = await self.analyze_lead_profiles(performance.leads_generated)
              if lead_profiles["industry"] != opportunity.signal.industry:
                  insights["icp_insights"].append(f"意外发现: {lead_profiles['industry']}行业反响强烈，建议调整ICP权重")
          
          # 3.3 模板库更新
          if performance.engagement_rate > 4.5:
              template_id = content.template_id
              await airtable.update("Templates", template_id, {
                  "success_count": "+1",
                  "avg_engagement": self.calculate_new_avg(template_id, performance.engagement_rate),
                  "weight": "+10%"
              })
          
          # 4. 推送学习报告到Market Opportunity Analyzer
          await redis.xadd("insights_feedback", insights)
          
          # 5. 更新ICP表
          if insights["icp_insights"]:
              await self.update_icp(client_id, insights["icp_insights"])
  ```

════════════════════════════════════════════════════════════════════
第三层：工具集成与编排
════════════════════════════════════════════════════════════════════

Trae核心编排器（main.py）:

```python
# 使用Trae的workflow DSL + Cursor辅助编写

from trae import Workflow, Agent, MCP
import asyncio

# 初始化MCP连接
market_mcp = MCP.connect("market_intelligence", "redis://localhost:6379/0")
capability_mcp = MCP.connect("customer_capability", "http://localhost:8001")
competitor_mcp = MCP.connect("competitor_intelligence", "http://localhost:8002")
performance_mcp = MCP.connect("performance_feedback", "http://localhost:8003")

# 初始化Agents
opportunity_agent = Agent("opportunity_analyzer", model="claude-sonnet-4")
strategy_agent = Agent("content_strategy", model="claude-sonnet-4")
generation_agent = Agent("content_generation", model="claude-sonnet-4")
qa_agent = Agent("quality_assurance", model="claude-sonnet-4")
publish_agent = Agent("publishing", model="gpt-4")  # 备选模型
learning_agent = Agent("performance_learning", model="claude-sonnet-4")

# 定义主工作流
workflow = Workflow("market_driven_content_engine")

@workflow.on_stream("market_signals")  # 订阅Redis Stream
async def handle_market_signal(signal):
    """当Market Intelligence MCP推送新信号时触发"""
    
    # Step 1: 机会分析
    opportunity = await opportunity_agent.run(
        task="analyze_opportunity",
        inputs={
            "signal": signal,
            "capability": capability_mcp.get(client_id),
            "competitors": competitor_mcp.get_recent_actions()
        }
    )
    
    # 如机会分数<0.7，跳过（不是好机会）
    if opportunity.score < 0.7:
        return
    
    # Step 2: 制定策略
    strategy = await strategy_agent.run(
        task="create_content_brief",
        inputs={
            "opportunity": opportunity,
            "past_performance": performance_mcp.get_top_content(),
            "competitor_content": competitor_mcp.get_recent_posts()
        }
    )
    
    # Step 3: 生成内容
    content = await generation_agent.run(
        task="generate_content",
        inputs={
            "brief": strategy,
            "capability": capability_mcp.get(client_id),
            "brand_guidelines": load_brand_guidelines(client_id)
        }
    )
    
    # Step 4: 质量审核
    qa_result = await qa_agent.run(
        task="verify_content",
        inputs={
            "content": content,
            "capability": capability_mcp.get(client_id)  # 用于事实核查
        }
    )
    
    # 如不通过，重新生成（最多3次）
    retry_count = 0
    while qa_result.score < 80 and retry_count < 3:
        content = await generation_agent.run(
            task="regenerate_content",
            inputs={
                "brief": strategy,
                "feedback": qa_result.issues,
                "capability": capability_mcp.get(client_id)
            }
        )
        qa_result = await qa_agent.run("verify_content", {"content": content, "capability": capability_mcp.get(client_id)})
        retry_count += 1
    
    # 如仍不通过，转人工
    if qa_result.score < 80:
        await notify_human_review(content, qa_result)
        return
    
    # Step 5: 发布
    await publish_agent.run(
        task="publish_content",
        inputs={
            "content": content,
            "optimal_time": performance_mcp.get_best_time(strategy.target_audience)
        }
    )
    
    # Step 6: 启动监控
    await performance_mcp.start_tracking(content.content_id)

@workflow.schedule("0 */24 * * *")  # 每24小时
async def learning_loop():
    """学习与优化"""
    
    insights = await learning_agent.run(
        task="analyze_performance",
        inputs={
            "recent_content": airtable.query_recent(hours=24),
            "performance_data": performance_mcp.get_all_metrics()
        }
    )
    
    # 更新系统
    await update_templates(insights.template_updates)
    await update_icp(client_id, insights.icp_insights)
    
    # 推送报告
    await notify_client_dashboard(insights)

# 启动
if __name__ == "__main__":
    workflow.run()
```

════════════════════════════════════════════════════════════════════
关键技术集成
════════════════════════════════════════════════════════════════════

1. Cursor AI辅助开发:
   - 用Cursor编写所有Agent逻辑（Python）
   - Cursor自动生成MCP Client代码
   - Cursor辅助Prompt优化（在IDE内直接测试Claude API）

2. Trae工作流DSL:
   - 声明式定义Agent间的数据流
   - 自动处理重试/降级/监控
   - 内置Observability（追踪每个信号的完整生命周期）

3. API集成清单:
   - Claude API (Anthropic)
   - GPT-4 API (OpenAI备选)
   - Google Trends API
   - LinkedIn API (官方 + Bright Data爬虫)
   - Reddit API
   - Ahrefs API
   - SimilarWeb API
   - GA4 API
   - 客户ERP API（如SAP）

4. 数据流追踪（Observability）:
   每个内容都可追溯:
   信号ID → 机会ID → Brief ID → 内容ID → 发布ID → 表现数据
   
   示例查询（Airtable）:
   "这篇LinkedIn文章（LI_20250315_001）是基于什么市场信号生成的?"
   → 追溯到 OPP_20250315_001
   → 追溯到 SIG_20250315_001（德国基建新闻）
   → 答案: "因为德国政府宣布€500B基建计划，触发了需求激增信号"
```

**4. Web 客户门户搭建（Softr/Stacker）**

```yaml
页面结构:
  
  登录页:
    - 客户用邮箱 + 密码登录
    - 权限: 仅能看到自己公司的数据
  
  主仪表盘:
    - 6 大核心指标可视化（图表）
    - 本月 API 成本分解（饼图）
    - 待审核内容数量（红色角标）
  
  周报页面:
    - 显示最近 4 周的周报
    - 每篇周报有"通过/退回"按钮
    - 退回需填写"建议修改方向"（结构化字段）
  
  《战略调整决策单》页面:
    - 当 Trae 推送决策单时，此页面出现红色通知
    - 显示: 现象 + 根因假设 + 3 个方案（A/B/C）
    - 客户点选方案，系统记录到 Strategy_History 表
  
  成本透明页面:
    - 本月总成本
    - 按模型分解（Claude/SORA/Search MCP 等）
    - 按内容类型分解（日报/周报/SEO/视频）
```

**5. 品牌美术包准备**

```yaml
新客户 Onboarding 时必须提交:
  1. Logo 文件（PNG, 透明背景, 300 DPI）
  2. 品牌色彩（主色/辅色/背景色, Hex 代码）
  3. 字体（标题字体/正文字体, 需支持英文）
  4. 安全区规范（Logo 周围最小留白）
  5. 禁用词表（行业/公司特定的敏感词）
  6. 视频模板:
     - 片头（5 秒, 含 Logo + Slogan）
     - 片尾（5 秒, 含联系方式 + CTA）
     - 字幕样式（字体/颜色/位置）
```

**6. 合规预审配置**

```yaml
接入合规预审 MCP:
  功能:
    - GDPR 检查: 是否包含未授权的个人数据
    - CCPA 检查: 是否有"出售个人信息"相关描述
    - PIPL 检查: 是否符合中国数据出境规范
    - 禁用词检查: 对照客户禁用词表 + 平台禁用词表
    - 证据链检查: 所有数据声称是否有来源标注
  
  输出:
    - 合规评分（0-100）
    - 风险项列表（高/中/低风险）
    - 修改建议
```

**7. 域名与邮箱投递治理配置** ★新增-关键风险点★

```yaml
问题背景:
  域名声誉低 + 邮箱配置不当 = 所有外联邮件进垃圾箱 = 黄金包服务失效

域名治理三要素:

1. 域名选择与预热（Onboarding时强制执行）
   
   场景A: 客户有独立站域名（如 example.com）
   检查清单:
   ✓ 域名注册时间 ≥ 6个月（新域名发信易被封）
   ✓ 没有被Spamhaus/SURBL列入黑名单（工具: MXToolbox检测）
   ✓ 有正常的网站内容（不是空壳站）
   
   场景B: 客户无独立站或域名太新
   解决方案:
   - 注册新域名（建议: 公司名-global.com 等变体）
   - 域名预热期（30天）:
     * 第1-7天: 仅设置网站，不发邮件
     * 第8-14天: 发送少量内部测试邮件（5-10封/天）
     * 第15-30天: 逐步增加发信量（10→20→50封/天）
   - 30天后才能用于正式外联（黄金包服务）

2. 邮箱技术配置（SPF/DKIM/DMARC）
   
   必须完成的3项配置:
   
   SPF记录（Sender Policy Framework）:
   - 作用: 声明"哪些IP可以代表此域名发邮件"
   - 配置示例（DNS TXT记录）:
     v=spf1 include:_spf.google.com include:sendgrid.net ~all
   - 验证: 用MXToolbox SPF检测工具
   
   DKIM签名（DomainKeys Identified Mail）:
   - 作用: 邮件加密签名，证明未被篡改
   - 配置: 在邮件服务商（Gmail/SendGrid）生成密钥对
   - 在DNS添加公钥记录
   - 验证: 发测试邮件到mail-tester.com，检查DKIM Pass
   
   DMARC策略（Domain-based Message Authentication）:
   - 作用: 告诉收件服务器"如何处理未通过验证的邮件"
   - 配置示例（DNS TXT记录）:
     v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com
   - 含义: 未通过验证的邮件隔离到垃圾箱，报告发到指定邮箱
   
   验证清单（发送正式邮件前必须100分）:
   - mail-tester.com 评分 ≥ 9/10
   - Google Postmaster Tools 域名声誉 = "High"或"Medium"
   - 无spam投诉记录

3. 发信基础设施与限流策略
   
   邮箱选择:
   - 推荐: Google Workspace（信誉高，但有限制）
   - 备选: SendGrid/Mailgun（专业ESP，但需预热）
   - 禁止: 免费邮箱（Gmail/Outlook个人版）用于批量外联
   
   日发信量限流（避免触发spam过滤）:
   | 域名年龄 | Google Workspace | SendGrid（已预热） |
   |---------|-----------------|-------------------|
   | < 3个月 | 50封/天/账号 | 100封/天 |
   | 3-6个月 | 100封/天/账号 | 500封/天 |
   | > 6个月 | 200封/天/账号 | 2000封/天 |
   
   多账号策略（黄金包客户，需要大量外联时）:
   - 不要用1个邮箱发500封
   - 而是用5个邮箱，每个发100封
   - 邮箱格式: sales@, bd@, partner@, global@ 等
   - 每个邮箱独立配置DKIM
   
   真人行为模拟（降低AI检测）:
   - 发信时间: 工作日9-18点（目标市场时区）
   - 发信间隔: 每封间隔3-8分钟（随机）
   - 个性化比例: ≥30%的邮件包含收件人姓名/公司名
   - 避免统一模板: 每批次至少准备3个模板变体

4. 投递监控与应急响应
   
   监控指标（每日检查）:
   - 送达率（Delivery Rate）: ≥95%（低于则域名可能被限制）
   - 打开率（Open Rate）: ≥15%（B2B冷外联的正常水平）
   - 回复率（Reply Rate）: ≥2%（主动回复，不含退订）
   - 投诉率（Complaint Rate）: ≤0.1%（高于则立即停止发信）
   
   红线指标（触发则立即暂停24小时）:
   - 送达率 < 90%
   - 投诉率 > 0.5%
   - 被Spamhaus列入黑名单
   
   应急处理流程:
   1. 触发红线 → Trae自动暂停所有外联工作流
   2. 飞书推送紧急通知（@客户+@中台负责人）
   3. 人工诊断（查看被投诉的邮件内容、收件人特征）
   4. 整改措施:
      - 如内容问题: 修改邮件模板，降低营销感
      - 如频率问题: 降低发信量50%
      - 如目标问题: 优化收件人列表（移除低质量线索）
   5. 整改后观察7天，指标恢复才能重启

工具推荐:
- DNS配置: Cloudflare（免费，易用）
- 邮件测试: mail-tester.com（检测spam分数）
- 域名监控: Google Postmaster Tools（监控Gmail投递情况）
- 黑名单检测: MXToolbox Blacklist Check（每周检查）

Onboarding检查点（强制）:
- [ ] 客户域名已通过MXToolbox黑名单检测
- [ ] SPF/DKIM/DMARC已配置并验证通过
- [ ] mail-tester.com评分 ≥ 9/10
- [ ] 如域名太新，已完成30天预热期
- [ ] 客户已签署《邮件投递风险知情书》（说明即使配置正确，仍可能有10-20%进垃圾箱）

未通过检查点的客户:
- 不能启动黄金包服务（主动外联）
- 建议先从白银包（被动获客）开始，同时进行域名预热
```

**8. 低成本获客钩子：营销健康度诊断工具** ★新增-战略级★

```yaml
问题背景:
  完整"中台"方案客单价高（青铜包¥1.5万起）→ 信任度为零的新客户决策门槛高 → 销售周期长 → 规模化慢

"剃须刀-刀片"模型设计:

免费钩子：出海营销健康度诊断

产品形态:
- 独立Web页面（landing.example.com/diagnosis）
- 无需注册，仅需输入基本信息
- 3分钟内自动生成诊断报告

用户输入（表单设计）:
1. 基础信息:
   - 公司名称（可选）
   - 行业（下拉选择: 机械/化工/纺织/电子...）
   - 目标市场（美国/欧洲/东南亚/全球）
   - 年出口额（<$500k / $500k-$2M / $2M-$10M / >$10M）

2. 现有渠道:
   - 网站域名（用于自动分析）
   - Alibaba店铺链接（可选）
   - LinkedIn公司主页（可选）
   - 是否有独立站（是/否）

3. 主要痛点（多选）:
   - 询盘量少
   - 询盘质量差
   - 转化率低
   - 不知道如何做海外营销
   - 缺乏专业团队

自动诊断逻辑（后端执行，用户等待60-90秒）:

模块1: 网站基础健康度（如提供了域名）
- 技术指标:
  * 调用Lighthouse API → 获取性能评分
  * 检测: SSL证书/移动适配/加载速度
  * 评分: 0-100分

- SEO基础:
  * 调用Ahrefs/SEMrush API → 获取DR/关键词排名数
  * 对比行业基准（从数据库中提取同行业平均值）
  * 评分: 0-100分

- 转化要素:
  * 使用Claude视觉识别首页截图
  * 检查: 是否有明确CTA / 联系方式 / 产品展示 / 信任信号
  * 评分: 0-100分

模块2: 社交媒体影响力（如提供了LinkedIn）
- 调用LinkedIn API或爬虫:
  * 关注者数量
  * 近30天发帖频率
  * 平均互动率
- 对比行业基准
- 评分: 0-100分

模块3: 内容营销成熟度
- 检测网站是否有博客/案例研究
- 分析内容质量:
  * 用Claude读取3篇文章
  * 评估: 是否有GEO优化元素 / 是否有明确的买家旅程设计
- 评分: 0-100分

模块4: 竞争定位分析
- 识别主要竞品（基于行业+关键词）
- 对比:
  * 网站质量（客户 vs 竞品平均值）
  * SEO表现（客户 vs 竞品平均值）
  * 社交媒体活跃度
- 输出: "您目前排在行业第X梯队（共3梯队）"

诊断报告结构（自动生成PDF）:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
《出海营销健康度诊断报告》
{公司名} | {行业} | {生成日期}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

执行摘要
────────────────────────────────────────
您的总体评分: 52/100 分（行业平均: 68分）
核心问题:
1. 网站性能严重拖后腿（38分 vs 行业均值75分）
2. 内容营销几乎空白（15分 vs 行业均值60分）
3. 社交媒体影响力薄弱（40分 vs 行业均值55分）

机会点:
• 如优化网站性能+增加信任信号 → 预计询盘量+50%
• 如启动SEO内容计划 → 预计6个月后自然流量+200%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

详细诊断

1. 网站基础健康度: 38/100 ⚠️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 已有SSL证书（安全连接）
❌ 移动端加载速度过慢（6.2秒 vs 行业均值2.8秒）
   → 影响: 50%+的移动端访客可能在加载完成前离开
❌ 首页无明确的CTA按钮
   → 影响: 访客不知道"下一步该做什么"，转化率-60%
❌ 缺少信任信号（无认证Logo/客户证言）
   → 影响: 买家信任度低，询盘转化率-40%

行业对比:
[柱状图: 您38分 vs 行业均值75分 vs 顶尖企业92分]

改进建议（按优先级）:
1. 紧急（7天内）: 压缩图片大小，启用CDN → 提速至<3秒
2. 重要（30天内）: 添加"Get a Quote"按钮到首页显著位置
3. 重要（30天内）: 上传ISO认证Logo到首页
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. SEO与自然流量: 45/100 ⚠️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
当前数据:
• Domain Rating (DR): 12/100
• 排名关键词数: 15个（行业均值: 150个）
• 月自然流量: 约200次（行业均值: 1500次）

问题根源:
❌ 网站内容极少（仅5个页面，无博客）
❌ 关键词定位不清晰（未针对买家搜索意图）
❌ 无外链建设（仅3个外链）

行业对比:
"您的自然流量仅为行业同规模企业的13%"

改进建议:
• 启动内容营销计划: 每周发布2篇SEO优化文章
  → 预计6个月后自然流量达1200次/月（+500%）
• 目标关键词示例（已为您分析）:
  - "reliable {您的产品} supplier"（月搜索量480，竞争度中）
  - "{您的产品} manufacturer China"（月搜索量320，竞争度低）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. 内容营销成熟度: 15/100 ❌
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
现状: 
❌ 无博客或案例研究
❌ 产品页面缺乏详细技术规格
❌ 无任何GEO优化元素（AI搜索引擎找不到您）

后果:
• 错失"意图明确"的高质量买家（他们通过搜索/AI获取信息）
• 无法建立行业权威性
• 竞品内容占据了本应属于您的流量

改进建议:
• 建立"引用友好知识库"（见第4章详细方案）
• 发布《{您的产品}采购指南》白皮书
  → 目标: 成为AI搜索该主题的"标准答案来源"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. 社交媒体影响力: 40/100 ⚠️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LinkedIn数据:
• 关注者: 150人（行业均值: 800人）
• 近30天发帖: 2次（行业均值: 12次）
• 平均互动率: 1.2%（行业均值: 3.5%）

问题:
❌ 发帖频率过低，难以维持可见度
❌ 内容缺乏价值（多为产品推广，少有教育性内容）
❌ 无视频内容（视频互动率比图文高300%）

改进建议:
• 增加发帖频率至每周3次
• 内容组合: 40%教育/30%案例/20%互动/10%产品
• 每月发布1个短视频（如工厂实拍/客户证言）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. 竞争定位分析
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
您目前处于: 第3梯队（共3梯队）

梯队划分（同行业企业）:
• 第1梯队（Top 20%）: 综合评分80+，月自然流量3000+
• 第2梯队（Middle 50%）: 综合评分60-80，月自然流量1000-3000
• 第3梯队（Bottom 30%）: 综合评分<60，月自然流量<1000

与第2梯队的差距:
- 网站质量: 差37分
- 内容资产: 差80篇文章
- 社交媒体: 差650个关注者

追赶路径（时间表）:
• 3个月: 进入第2梯队（需投入: 网站优化+内容启动）
• 9个月: 冲击第1梯队（需投入: 持续内容产出+社媒运营）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

附录: 行动清单（优先级排序）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
紧急（7天内完成）:
□ 网站性能优化（压缩图片+启用CDN）
□ 添加首页CTA按钮
□ 上传认证Logo

重要（30天内完成）:
□ 启动SEO内容计划（至少发布4篇文章）
□ LinkedIn增加发帖频率（至少12次/月）
□ 拍摄1个工厂实景视频

长期（90天内完成）:
□ 建立系统化的内容营销流程
□ 发布行业白皮书/采购指南
□ 开通并运营TikTok/YouTube

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
需要专业帮助？
我们的AI营销中台可以帮您:
✓ 在7天内完成网站性能优化（技术托管）
✓ 在30天内建立完整的内容营销体系（AI生成+人工审核）
✓ 在90天内进入行业第2梯队

[预约免费咨询] [查看解决方案]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

报告结束后的转化路径:

1. 报告页面底部嵌入CTA:
   [按钮1: 预约免费咨询（30分钟）]
   → 跳转到日历预约系统
   
   [按钮2: 查看完整解决方案]
   → 跳转到中台服务包介绍（青铜/白银/黄金）

2. 邮件跟进序列（自动触发）:
   - Day 0: 立即发送报告PDF到用户邮箱
   - Day 2: "您还没开始行动？这里有3个快速改进技巧"
   - Day 7: "案例: XX公司如何在90天内从第3梯队升至第1梯队"
   - Day 14: "限时优惠: 免费网站性能优化（价值¥3000，前10名）"

3. 销售跟进规则:
   - 如用户评分<50分 → 高优先级线索（痛点明确）
   - 如用户年出口额>$2M → 立即分配给销售（有支付能力）
   - 如用户填写了"询盘量少"痛点 → 推荐白银包（SEO+GEO）

价值对齐:

对用户:
- 零成本获得专业诊断（价值≥¥5000）
- 明确知道问题在哪里、如何改进
- 建立信任（"他们真的懂我的行业"）

对中台:
- 低成本获客（成本仅¥20/线索，主要是API调用费）
- 建立专业权威（在销售前就证明能力）
- 为解决方案铺路（报告中的每个问题都对应一个服务包）
- 数据采集（即使客户不成交，其数据也丰富"行业基准数据库"）

数据护城河:
- 每诊断1个客户 → 积累1份行业数据
- 1000份诊断 → 形成精准的"行业基准库"
- 竞品无法复制（因为没有这么多真实数据）
- 数据越多 → 诊断越准 → 权威性越高 → 获客越容易（飞轮效应）

技术实现:

前端（诊断页面）:
- Next.js + Tailwind CSS
- 表单验证（防止垃圾提交）
- 进度条动画（"正在分析您的网站...30%"）

后端（诊断引擎）:
- 输入接收 → 存入Airtable Leads表
- 并行调用:
  * Lighthouse API（网站性能）
  * Ahrefs API（SEO数据）
  * LinkedIn API或爬虫（社媒数据）
  * Claude（内容质量分析）
- 数据对比（查询行业基准表）
- 报告生成（用Claude + PDF模板）
- 发送邮件（附带PDF）

成本控制:
- Lighthouse API: 免费
- Ahrefs API: ¥1/次查询
- Claude调用: ¥2/次（分析内容）
- PDF生成: ¥0.5/次
- 邮件发送: ¥0.1/次
- 总成本: ≤¥5/线索

如每月诊断1000个客户:
- 成本: ¥5000
- 如转化率2%（20个成交）
- 平均客单价¥20000
- 收入: ¥400,000
- ROI: 80:1

营销推广:
- SEO: 优化"出海营销诊断"相关关键词
- GEO: 确保AI搜索"如何诊断出海营销问题"时引用此工具
- LinkedIn广告: 定向B2B出口企业，文案"免费诊断您的出海营销问题"
- 合作推广: 与外贸协会/商会合作，为会员提供免费诊断

Onboarding检查点（工具上线前）:
- [ ] 诊断逻辑已测试（用10个真实客户网站验证准确度）
- [ ] 行业基准数据库已建立（至少覆盖5个行业）
- [ ] 报告模板已设计（专业、易读、有冲击力）
- [ ] 邮件跟进序列已编写（5封，测试点击率）
- [ ] 销售跟进SOP已制定（明确何时介入、如何话术）

战略价值:
- 这不是"营销噱头"，而是**真正的产品前置**
- 对标案例: HubSpot的"Website Grader"（帮助其获得数百万线索）
- 成为行业标配工具 → 掌握流量入口 → 建立品牌权威
```

**9. 飞书消息提醒系统配置** ★新增★

飞书集成方案:
  1. 创建飞书企业账号（或使用客户现有账号）
  2. 开通飞书机器人（API权限）
  3. 在Trae中配置飞书Webhook

消息提醒场景与模板:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
场景1: 日报/周报生成完毕
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
触发: AI预审通过，进入人工审核队列
发送对象: 客户方营销负责人 + 中台运营人员

飞书消息模板:
【📊 周报待审核】
客户: {公司名}
标题: {周报标题}
生成时间: {时间戳}
AI预审评分: {85分}

快速预览:
{周报摘要（前200字）}

操作:
• [通过并发布] 👍
• [需要修改] ✏️（点击后弹出反馈表单）
• [查看完整内容] 🔗（跳转到客户门户）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
场景2: 社媒内容待发布（LinkedIn/TikTok）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
触发: 内容生成完成，等待发布指令

飞书消息模板:
【📱 社媒内容待发布】
平台: LinkedIn / TikTok
类型: {图文帖子 / 短视频}
预计发布时间: {建议时间，如"今日18:00"（最佳发布时段）}

内容预览:
{文案前100字 / 视频缩略图}

发布方式:
• [授权系统自动发布] 🤖
  - 点击后，系统将在预定时间通过API自动发布
  - 适用场景: 客户已充分信任系统

• [下载后手动发布] 📥
  - 下载链接: {内容文件URL}
  - 建议文案: {复制链接}
  - 适用场景: 客户希望自己掌控发布节奏或需要微调

操作超时: 若2小时内未操作，系统将自动取消本次发布

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
场景3: 战略调整决策单待确认
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
触发: 检测到市场异常，Claude生成应急响应单

飞书消息模板:
【⚠️ 战略调整建议】
紧急程度: 高 🔴 / 中 🟡 / 低 🟢
触发原因: {GEO-A转化率7日降幅38%}

快速摘要:
• 现象: {一句话描述}
• 最可能的原因: {根因假设1，置信度75%}
• 建议方案: {方案A/B/C简述}

操作:
• [查看完整决策单] 🔗（跳转到客户门户）
• [紧急联系] 📞（一键拨打客户成功经理）

SLA提醒: 请在48小时内确认方案，否则异常可能扩大

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
场景4: TikTok拍摄任务派发
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
触发: 系统生成TikTok内容计划，需要客户工厂拍摄素材

飞书消息模板:
【🎬 今日拍摄任务】
任务编号: #20250115-01
主题: {早餐场景演示}
紧急程度: 今日完成（优先级高）⭐⭐⭐

拍摄指导:
所需道具: {产品、鸡蛋2个、面包}
拍摄角度: 俯视（手机固定在头顶上方）
拍摄步骤: {详细步骤，见附件}

参考视频: {竞品爆款视频链接}

完成后:
• [上传素材] 📤（点击跳转到上传页面）
  系统将自动剪辑、加字幕、配音乐
  预计1小时后可审核成片

预期效果:
- 播放量: 5000+
- 转化: 带来20-30个订单

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
场景5: 成本预警
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
触发: 本月API成本达到预算的80%

飞书消息模板:
【💰 成本预警】
客户: {公司名}
本月已用: ¥6,400（占预算的80%）
预算总额: ¥8,000
剩余天数: 7天

主要消耗:
• Claude API: ¥3,200（50%）
• SORA视频生成: ¥2,100（33%）
• GEO监测: ¥1,100（17%）

建议操作:
• [维持现状] - 预计超支¥1,000
• [降低频次] - 暂停非紧急内容生产
• [增加预算] - 联系客户成功经理

历史记录: {查看过去3个月成本趋势}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

飞书消息的交互设计:
1. 所有消息带"操作按钮"（卡片式消息）
2. 点击按钮后，可直接在飞书内完成操作（无需跳转）
3. 超时未操作的消息会"灰显"并标注"已过期"
4. 支持@某人（如紧急情况@老板）

飞书与系统的数据同步:
- 客户在飞书点击"通过"→ Trae自动更新Content_Queue状态为"已发布"
- 客户在飞书点击"需要修改"→ 反馈内容自动记录到Airtable，触发Claude重新生成
- 所有操作记录留痕（审计日志）

飞书群组设计:
每个客户创建2个群:
1. 【XX公司-日常运营群】
   - 成员: 客户方1-2人（营销负责人/执行人员）+ 中台运营人员
   - 用途: 日报/周报/社媒内容/拍摄任务
   - 消息频率: 每日2-5条

2. 【XX公司-战略决策群】
   - 成员: 客户方老板/销售总监 + 中台客户成功经理
   - 用途: 应急响应单/月度预算会议/重大策略调整
   - 消息频率: 每月1-3条（仅重要事项）
```

#### 里程碑
- [ ] Airtable 6 表 + PostgreSQL 敏感表全部创建完成
- [ ] 模型抽象层部署，测试自动降级功能（手动断开 NANOBANANA，验证是否切换到 Midjourney）
- [ ] Trae 工作流 1（每日洞察）和工作流 2（竞品监控）配置完成并测试运行
- [ ] Web 客户门户发布，测试账号可登录并查看模拟数据
- [ ] 品牌美术包模板准备完成
- [ ] 合规预审 MCP 接入并测试（输入敏感词，验证是否拦截）
- [ ] 飞书机器人配置完成，测试发送1条消息到测试群
- [ ] Cursor配置完成（用于后续系统优化与脚本开发）

#### 验收标准
- 成本台账能自动记录一次 Claude API 调用的成本
- 门户可以显示"待审核内容"并有"通过/退回"按钮
- 模型网关的降级逻辑能正确工作（主模型失败时自动切换）
- 飞书消息能正确推送并显示操作按钮
- 域名SPF/DKIM/DMARC已配置且mail-tester.com评分≥9/10
- 微站页面通过Core Web Vitals检测（LCP≤2.5s, FID≤100ms, CLS≤0.1）
- 微站至少包含2个信任信号（认证/视频/证言）

#### 网站速度与本地化专项检查 ★新增-关键风险点★

```yaml
问题背景:
  "网站慢"导致跳出率+50% + "本地化差"导致转化率-40% = SEO与广告预算打水漂

速度优化清单（必须在上线前完成）:

1. Core Web Vitals检测（Google标准）
   
   工具: Lighthouse CI / PageSpeed Insights
   
   必须达标的3个指标:
   - LCP (Largest Contentful Paint): ≤ 2.5秒
     * 含义: 页面最大元素（通常是首屏图片）加载完成时间
     * 优化: 图片压缩（WebP格式）、使用CDN、预加载关键资源
   
   - FID (First Input Delay): ≤ 100毫秒
     * 含义: 用户首次交互（如点击按钮）的响应时间
     * 优化: 减少JavaScript体积、延迟加载非关键脚本
   
   - CLS (Cumulative Layout Shift): ≤ 0.1
     * 含义: 页面加载过程中元素位移程度
     * 优化: 为图片/视频设置固定尺寸、避免动态插入内容
   
   验收: 在Lighthouse中获得"绿色"评分（≥90分）

2. 全球加速（CDN配置）
   
   问题: 客户网站托管在中国，欧美访客打开需要5-8秒
   
   解决方案:
   - 推荐CDN: Cloudflare（免费版即可）
   - 配置步骤:
     1. 将域名DNS指向Cloudflare
     2. 开启"加速"和"缓存"功能
     3. 启用"Auto Minify"（自动压缩CSS/JS）
   
   验证: 用WebPageTest测试（选择目标市场节点，如美国/欧洲）
   - 目标: TTFB (Time to First Byte) ≤ 600ms
   - 若>1s，说明CDN未生效或服务器响应慢

3. 图片与视频优化
   
   常见问题: 
   - 上传5MB的原图 → 页面加载慢
   - 视频文件过大 → 移动端加载失败
   
   优化策略:
   - 图片:
     * 格式: JPEG → WebP（体积减少30-50%）
     * 尺寸: 最大宽度1920px（超过无意义）
     * 压缩: TinyPNG / ImageOptim（质量80-85%）
     * 懒加载: 首屏外的图片延迟加载
   
   - 视频:
     * 托管: 不要直接放网站服务器，用YouTube/Vimeo嵌入
     * 如必须自托管: 压缩至≤10MB，使用<video>标签的poster属性（缩略图）
     * 移动端: 提供低分辨率版本

4. 第三方脚本管理
   
   常见问题: 
   - 加载了10个追踪脚本（GA/Facebook Pixel/LinkedIn Insight...）
   - 每个脚本拖慢200-500ms
   
   优化策略:
   - 仅保留必要的3个: GA4 + 1个广告平台 + 1个热图工具（可选）
   - 使用Google Tag Manager统一管理（减少DNS查询）
   - 设置timeout（脚本加载超过3秒则放弃）

本地化检查清单:

1. 语言本地化（不仅是翻译）
   
   错误示例:
   - 英文: "Our factory has 200 workers."
   - 机器翻译（西语）: "Nuestra fábrica tiene 200 trabajadores."
   - 问题: 语法正确，但不符合西语习惯
   
   正确做法:
   - 使用Claude生成本地化文案（而非机器翻译）
   - Prompt: "将以下内容改写为地道的{目标语言}，适合{目标市场}的买家阅读"
   - 人工审核: 如有母语用户，请其审核关键页面
   
   关键页面必须本地化:
   - 首页、产品页、联系页、FAQ
   - 非关键页面（博客）可使用自动翻译+disclaimer

2. 货币与单位本地化
   
   错误示例:
   - 全站使用USD，欧洲买家需自己换算EUR
   - 使用公制单位（kg/cm），美国买家习惯英制（lb/inch）
   
   正确做法:
   - 根据访客IP自动显示对应货币（用Cloudflare Workers实现）
   - 提供单位切换按钮（Metric ⇄ Imperial）
   - 价格显示: "$1,200 - $1,500" 而非 "¥8,500 - ¥10,600"（避免显示人民币）

3. 时区与联系方式本地化
   
   错误示例:
   - "营业时间: 9:00-18:00"（未说明时区）
   - 只提供中国手机号 +86-13800138000
   
   正确做法:
   - 明确标注时区: "9:00 - 18:00 (GMT+8)"或"9:00 - 18:00 Beijing Time"
   - 提供国际化联系方式:
     * WhatsApp: +86-138-0013-8000
     * Email: export@company.com
     * Skype: company_export
   - 承诺: "We reply within 24 hours"（而非"当天回复"）

4. 支付与物流本地化
   
   错误示例:
   - 仅支持电汇（T/T），欧美小买家习惯PayPal/信用卡
   - "我们提供FOB价格"（买家不懂贸易术语）
   
   正确做法:
   - 支付方式: 
     * B2B大单: T/T, L/C
     * B2C或小单: PayPal, Stripe, Wise
   - 运费说明:
     * 提供DDP价格（含关税，买家无需操心）
     * 或明确说明: "Price excludes import duties (approx. 5-10%)"
   - 交期: "Production: 25-30 days, Shipping: 20-25 days (to US West Coast)"

5. 文化敏感性检查
   
   常见错误:
   - 在穆斯林市场使用猪肉/酒精相关的产品图片
   - 在保守市场使用过于暴露的模特照片
   - 使用"Made in China"作为卖点（部分市场有偏见）
   
   检查方法:
   - 将内容提交给Claude: "检查以下内容在{目标市场}是否有文化敏感性问题"
   - 参考竞品: 查看当地竞品如何表述类似内容

GEO优化的本地化（特别重要）:

问题: 
- 做了SEO，但内容全是英语 → Google.de（德国）排名差
- 做了GEO，但Claude引用的是中文内容 → 欧美买家看不懂

解决方案:
1. 多语言内容矩阵
   - 英语: 主要市场（美国/英国/澳洲/加拿大）
   - 西班牙语: 拉美市场
   - 德语: 德国/奥地利/瑞士
   - 法语: 法国/比利时/非洲法语区
   
   实施策略:
   - 前3个月: 仅英语（验证模型）
   - 第4-6个月: 增加第2语言（西语或德语，取决于目标市场）
   - 6个月后: 根据流量数据决定是否增加第3语言

2. 地域化关键词
   - 错误: 只优化"industrial pump"
   - 正确: 
     * 美国市场: "industrial pump supplier USA"
     * 德国市场: "Industriepumpen Hersteller Deutschland"
   
   工具: Google Trends查看不同国家的搜索词差异

3. 本地化案例与证言
   - 如目标是德国市场: 优先展示德国客户的案例
   - 如无德国客户: 展示"欧洲客户"的案例（而非中国/美国客户）

Onboarding检查点（上线前强制）:
- [ ] Lighthouse评分 ≥ 90分（移动端和桌面端）
- [ ] WebPageTest测试（目标市场节点）TTFB ≤ 600ms
- [ ] 图片全部转为WebP格式且≤500KB
- [ ] 关键页面已完成目标语言本地化（非机器翻译）
- [ ] 货币/时区/联系方式已本地化
- [ ] 通过文化敏感性检查（无冒犯性内容）

未通过检查的后果:
- SEO效果打折扣（Google优先推荐快速网站）
- 广告成本浪费（转化率低，CPC白花）
- 用户体验差 → 品牌受损

专项优化的ROI:
- 投入: 2-3天优化时间 + ¥0成本（工具免费）
- 产出: 转化率+30-50%，SEO排名+10-20位
- 结论: 性价比极高，必须做
```

#### Cursor使用说明 ★新增★

```yaml
为什么需要Cursor:
  虽然本项目强调"无代码/低代码"，但以下场景仍需编写少量代码:
  1. 模型抽象层（MAL）的开发与优化
  2. Trae工作流中的自定义脚本（如数据处理/格式转换）
  3. 飞书机器人的Webhook接口
  4. GEO监测工具的API集成
  5. 成本台账的复杂公式优化
  
  传统开发方式: 需要专业程序员（¥2万/月）
  Cursor辅助方式: 创始人+Cursor即可完成（¥20/月）

Cursor具体用途:

1. 模型抽象层开发
   场景: 编写ModelGateway类，实现SORA→VEO→Pika的自动降级
   操作:
   - 在Cursor中描述需求:"写一个Python类，优先调用SORA2 API生成视频，
     如果失败自动切换到VEO3.1，再失败则切换到Pika。每次调用记录成本到Airtable。"
   - Cursor生成代码 → 人工审核 → 部署到服务器
   
2. Trae工作流脚本
   场景: Trae需要一个脚本，从SimilarWeb API拉取数据并格式化为JSON
   操作:
   - 在Cursor中:"写一个Node.js脚本，调用SimilarWeb API获取域名流量数据，
     输出格式为{domain, traffic, sources}的JSON数组"
   - 生成的脚本直接在Trae的"自定义代码块"中使用

3. 飞书Webhook接口
   场景: 当用户在飞书点击"通过"按钮，需要调用Trae API更新内容状态
   操作:
   - 在Cursor中:"写一个Flask服务，接收飞书的Webhook POST请求，
     解析消息卡片的button_value，调用Trae API更新记录状态"
   - 部署到服务器（可用免费的Render/Railway）

4. 数据分析脚本
   场景: 从Cost_Ledger表生成"本月成本明细报告"
   操作:
   - 在Cursor中:"写一个Python脚本，从Airtable的Cost_Ledger表读取数据，
     按模型分组统计成本，生成带图表的HTML报告"
   - 定时执行（如每月1日）并自动发送到客户邮箱

5. GEO监测工具集成
   场景: 需要查询ChatGPT/Perplexity是否引用了客户网站
   操作:
   - 在Cursor中:"写一个脚本，调用Perplexity API查询10个问题，
     解析返回结果，检查是否包含指定域名，记录到数据库"
   - 每周自动运行

Cursor的学习曲线:
- 第1周: 学会基本的"对话式编程"（描述需求 → 生成代码 → 调试）
- 第2周: 学会读懂生成的代码（即使不会写，能理解逻辑）
- 第4周: 能独立完成上述5类任务（80%的代码由Cursor生成）

成本:
- Cursor Pro订阅: $20/月（约¥140）
- 云服务器（运行脚本）: $5-10/月（约¥35-70）
- 总计: 月均¥200以内（远低于招聘程序员）

替代方案（如不用Cursor）:
- 方案A: 招聘兼职程序员（¥500/天，预计每月需要3-5天，成本¥1500-2500）
- 方案B: 使用Zapier等无代码工具（但复杂逻辑支持差，月费约$100）
- 结论: Cursor性价比最高（创始人需要一定学习意愿）

Cursor使用原则:
✓ 用于系统后台逻辑（用户看不到的代码）
✓ 用于一次性脚本（如数据迁移/批量处理）
✗ 不用于前端界面（Softr/Trae已足够）
✗ 不用于核心算法（如AI预审逻辑用Claude Prompt即可）
```

---

### 阶段 1｜洞察与管理 MVP（第 1–2 周）

#### 目标
让客户"看见价值" —— 稳定交付洞察与对标，先赢得信任，再谈内容生产。

#### 动作清单

**1. 行业日报/周报上线**

```yaml
日报模板（Claude 提示词）:
  角色: 你是一名资深的出海营销分析师
  
  任务: 基于今日抓取的行业资讯，生成一份简洁的《每日行业洞察》
  
  输入:
    - 行业: {从 Clients 表读取}
    - GEO: {从 Clients 表读取}
    - 今日资讯: {Search MCP 返回的 5-10 条新闻摘要}
  
  输出格式:
    # 每日行业洞察 - {日期}
    
    ## 今日要闻
    [3-5 条最重要的新闻，每条 2-3 句话概括]
    
    ## 对我们的影响
    [分析这些新闻对客户业务的潜在影响，1-2 段]
    
    ## 建议下一步（二选一）
    A. [激进方案: 需要额外资源，但可能带来更大收益]
    B. [保守方案: 低风险，稳妥推进]
  
  约束:
    - 总字数 300-500 词（英文）或 200-350 字（中文）
    - 避免使用禁用词: {从 Products 表读取}
    - 必须标注信息来源（脚注格式）
```

```yaml
周报模板（扩展版）:
  在日报基础上增加:
    - 本周数据回顾（从 Metrics 表读取）
    - 与上周对比（流量/转化率/CPL 等）
    - 竞品动态（从 Competitors 表读取）
    - 下周重点工作（基于数据 + 行业趋势）
```

**2. 竞品监控看板**

```yaml
为每个客户配置 3-5 个主要竞品:
  1. 客户提供竞品名单（Onboarding 时收集）
  2. Trae 工作流每周拉取数据:
     - SimilarWeb: 月访问量, 流量来源, 地理分布, 热门页面
     - Ahrefs/Moz: 域名评分, 反链数, 新增反链
     - 自研爬虫: 新发布的内容（博客/社媒）
  3. Claude 生成"策略提示":
     IF 竞品 A 的自然流量 7 日涨幅 ≥ 30%:
       "竞品 A 可能投放了新的内容或广告。建议: 分析其近期发布的内容主题，考虑制作类似但差异化的内容。"
```

```yaml
竞品看板界面（在客户门户中）:
  表格视图:
    | 竞品 | 月访问量 | 环比 | 流量来源TOP3 | 域名评分 | 最新动态 | 策略提示 |
    |------|---------|------|-------------|---------|---------|---------|
  
  图表视图:
    - 折线图: 我们 vs 竞品 A/B/C 的流量趋势（近 3 个月）
    - 饼图: 竞品 A 的流量来源分解
```

**3. ICP（反向漏斗）构建**

```markdown
采购委员会级 ICP 构建流程（两种场景）:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
场景 A: 有历史订单数据（理想情况）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: 收集既有 Won 订单数据（≥5 个）
  从客户处获取:
  - 订单金额, 成交周期, 客户公司名, 行业, 规模
  - 如可能: 参与决策的人员（职位/部门）

Step 2: Claude 分析并抽取共性
  提示词:
    "基于以下 5 个成功订单，抽取客户的共同特征，并构建'采购委员会角色矩阵'。"
  
  输出: ICP 画像表
  | 角色 | 职级 | 部门 | 关键痛点 | 决策权重 | 常见异议 |
  |------|------|------|---------|---------|---------|
  | 技术评估者 | 工程师/技术经理 | 研发 | 产品性能/集成难度 | 30% | "你们的 API 文档够详细吗？" |
  | 预算决策者 | 采购经理/CFO | 财务 | 价格/ROI | 40% | "为什么比竞品贵 20%？" |
  | 最终拍板者 | 总监/VP | 运营 | 战略契合度/供应商稳定性 | 30% | "你们服务过类似规模的客户吗？" |

Step 3: 存入 Personas 表（Airtable）和 ICP_Details 表（PostgreSQL）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
场景 B: 无历史订单或客户不愿提供（从零构建）★新增★
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: 业务深度访谈（1-2 小时，必须老板/营销负责人参与）
  核心问题清单:
  
  1. 产品与能力:
     - 你们的核心产品是什么？(SKU/型号/规格)
     - 与竞品相比，你们的独特优势是什么？(价格/质量/交期/定制能力)
     - 你们的产能上限是多少？(月产量/年产量)
     - 有哪些认证/资质？(ISO/CE/FDA/专利)
  
  2. 当前客户画像（即使没成交，也有过询盘）:
     - 过去 6 个月，哪些类型的公司联系过你们？(行业/规模/地域)
     - 他们通常问什么问题？(价格/MOQ/交期/定制)
     - 哪些询盘最终没成交？为什么？(价格太高/交期太长/信任度不足)
  
  3. 竞争对手情报:
     - 你们的主要竞争对手是谁？(列出 3-5 个)
     - 他们的客户主要是谁？(从他们的官网/案例推断)
     - 你们想从他们手里抢哪类客户？
  
  4. 理想客户假设:
     - 如果可以选，你们最想服务哪类客户？(行业/规模/订单特征)
     - 为什么？(利润高/复购好/品牌背书/供应链稳定)

Step 2: Claude 生成"假设性 ICP"（基于行业标准 + 竞品分析）
  提示词:
    "客户是一家{行业}工厂，主要产品是{产品}，核心优势是{USP}。
    他们的主要竞争对手是{竞品列表}。
    
    请基于以下信息，构建一个'假设性 ICP'：
    1. 分析该行业的典型采购流程（谁参与决策？）
    2. 分析竞品的客户画像（从他们的案例/testimonials推断）
    3. 结合客户的 USP，推断哪类买家最匹配
    4. 生成'采购委员会角色矩阵'（假设版）
    
    输出格式：
    | 角色 | 职级 | 部门 | 关键痛点 | 决策权重 | 常见异议 |
    
    注意：标注'假设'字样，提醒这需要在实际询盘中验证。"

Step 3: 竞品客户反向工程（SimilarWeb + LinkedIn Sales Navigator）
  工作流:
  1. 在 SimilarWeb 查看竞品的流量来源（哪些行业网站/论坛引流？）
  2. 在 LinkedIn Sales Navigator 搜索竞品的"客户"（查看 Followers 中哪些是企业账号）
  3. 分析这些企业的共性：
     - 行业分布（前 3 大行业占比）
     - 公司规模（员工数/营收范围）
     - 地理分布（北美/欧洲/东南亚）
  4. Claude 生成"竞品客户画像分析报告"

Step 4: 首次内容测试（A/B 验证）
  目标：用内容测试不同的 ICP 假设
  
  操作：
  1. 基于"假设性 ICP"，生成 2 个版本的 SEO 文章：
     - 版本 A：针对"大型企业采购经理"（强调合规/稳定性）
     - 版本 B：针对"中小企业老板"（强调性价比/快速交付）
  
  2. 发布后，监测 30 天：
     - 哪个版本的自然流量更高？
     - 哪个版本的询盘转化率更高？
     - 实际询盘的公司特征是什么？
  
  3. 根据数据调整 ICP 假设

Step 5: 动态迭代（每获得 5 个新询盘，更新一次 ICP）
  触发条件：
  - 新增 5 个询盘（无论成交与否）
  
  执行：
  1. 人工记录每个询盘的特征：
     - 公司名/行业/规模/地域/询盘渠道
     - 询问的核心问题
     - 成交/未成交的原因
  
  2. Claude 对比"假设性 ICP"与"实际询盘画像"：
     - 哪些假设被验证了？（匹配度 >70%）
     - 哪些假设被推翻了？（实际询盘与假设差异大）
     - 是否出现了"意外的高价值客户类型"？
  
  3. 更新 ICP 画像表，标注"已验证"或"待验证"
  
  4. 调整内容策略：优先服务"已验证"的 ICP

Step 6: 3 个月后的正式 ICP（基于 ≥15 个真实询盘）
  此时的 ICP 可信度达到 80%+，可作为长期内容策略的基础

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
两种场景的对比
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| 维度 | 有历史订单 | 无历史订单 |
|------|-----------|-----------|
| ICP 可信度 | 高（基于真实成交数据） | 中（基于假设 + 测试迭代） |
| 构建周期 | 1 周 | 3 个月（动态迭代） |
| 风险 | 低 | 中（可能前期内容不精准） |
| 优势 | 快速启动 | 发现"隐藏的高价值客户" |
| 适用客户 | 已有出口经验的工厂 | 新进入海外市场的工厂 |
```

**4. 独立站替代方案：微站上线 + 信任信号构建** ★优化★

```yaml
微站结构（1-3 页）+ 必备信任信号:
  
  首页（Hero Section + 3 大卖点 + 信任信号墙 + CTA）:
    
    Hero Section:
    - 一句话说清"我们是谁，解决什么问题"
    - 背景图: 工厂实景照片（非库存图，显示真实感）
    
    3大卖点:
    - 卖点 1: USP（独特卖点）
    - 卖点 2: 社会证明（客户数量/行业认证）
    - 卖点 3: 风险逆转（免费试用/退款保证）
    
    信任信号墙（Critical，缺失会导致转化率-60%）★新增★:
    
    必备信号（5选4，至少展示4个）:
    
    1. 认证与资质（Certifications）
       展示方式: Logo墙 + 证书编号
       示例:
       ┌────────────────────────────────────┐
       │ [ISO 9001 Logo] [CE Logo] [FDA Logo] │
       │ Certified Since 2018                │
       │ Certificate No: XXX-XXX-XXX         │
       └────────────────────────────────────┘
       
       如客户缺少认证:
       - 替代方案: "10 Years in Business" / "Passed SGS Inspection"
       - 启动认证申请（ISO 9001周期3-6个月，¥3-5万）
    
    2. 生产流程可视化（Production Process）
       展示方式: 
       - 工厂视频（60-90秒，展示产线/质检/包装）
       - 或: 4-6张流程图片（原料 → 生产 → 检测 → 包装）
       
       拍摄清单（给客户的拍摄指导）:
       - 镜头1: 工厂外景（显示规模）
       - 镜头2: 生产线全景（工人操作）
       - 镜头3: 质检环节（使用检测设备）
       - 镜头4: 成品仓库（整齐摆放）
       - 镜头5: 装货发运（显示出口能力）
       
       注意事项:
       ✓ 真实拍摄（不用库存视频）
       ✓ 显示品牌Logo（证明是自己工厂）
       ✗ 避免拍到敏感信息（客户名单/订单明细）
    
    3. 客户案例与证言（Social Proof）
       展示方式: 
       - 客户Logo墙（如可授权）
       - 文字证言 + 客户头像/公司名
       - 视频证言（最强，但获取难）
       
       示例（文字证言）:
       ┌──────────────────────────────────────┐
       │ "Delivered 5000 units on time, zero  │
       │  defects. Best supplier in China."   │
       │                                      │
       │ - John Smith, Purchasing Manager     │
       │   ABC Industrial Supply (USA)        │
       └──────────────────────────────────────┘
       
       如客户无法提供真实证言:
       - 替代: "Served 50+ Clients in 15 Countries"
       - 替代: 匿名化证言（"A leading US distributor..."）
       - 禁止: 虚构证言（法律风险+平台处罚）
    
    4. 质量保证承诺（Quality Guarantee）
       展示方式: 明确的政策声明
       
       示例:
       ┌──────────────────────────────────────┐
       │ Quality Guarantee                    │
       │ • 100% Inspection Before Shipping    │
       │ • 18-Month Warranty                  │
       │ • 30-Day Money Back (If Defective)   │
       │ • Free Replacement Parts             │
       └──────────────────────────────────────┘
       
       关键: 具体数字（18个月 vs "长期保修"）
    
    5. 第三方验证（Third-party Verification）
       展示方式: 嵌入验证徽章
       
       可选验证:
       - Google Reviews评分（如有）
       - Trustpilot评分
       - 阿里巴巴金牌供应商徽章
       - SGS/TUV验厂报告
       
       如客户都没有:
       - 方案1: 开通Google My Business，请客户留评
       - 方案2: 在阿里国际站积累评价，然后截图展示
    
    CTA（Call to Action）:
    - WhatsApp 咨询 / 表单提交
    - 按钮文案: "Get a Quote in 24H"（而非"Contact Us"）
    - 表单字段: ≤5项（姓名/邮箱/国家/产品/数量）
  
  产品页（可选，如有多 SKU）:
    - 产品卡片（图片 + 简介 + 核心参数）
    - 对比表（我们 vs 竞品）
    - 技术规格书下载（PDF）
    - 应用场景视频（产品实际使用）
  
  关于我们页（About Us，必须有）★新增★:
    目的: 回答"你们是谁？为什么该信任你们？"
    
    必须包含:
    1. 公司简介（100-200词）
       - 成立年份、工厂面积、员工数
       - 主营产品、服务国家
       - 核心竞争力（如"拥有15项专利"）
    
    2. 团队照片
       - 工厂全景照片
       - 核心团队合影（老板+主管）
       - 目的: 证明"我们是真实的公司，不是贸易皮包"
    
    3. 时间线（Timeline）
       - 2015: 公司成立
       - 2018: 获得ISO认证
       - 2020: 出口额突破$5M
       - 2023: 扩建新厂房
       - 目的: 展示稳定性与成长性
  
  联系页（Contact，精简表单）:
    - 必填: 姓名, 邮箱, 国家, 询盘内容
    - 可选: 公司, 电话
    - 提交后: 自动发送到客户指定邮箱 + 记录到 Airtable
    - 感谢页: "We'll reply within 24 hours. Check your email."
  
  技术要求:
    - 框架: Next.js（静态生成，SEO 友好）
    - 托管: Vercel（全球 CDN，免费 SSL）
    - 表单: Typeform / Tally（嵌入式，无需后端）
    - 性能: LCP ≤ 2.5s，FCP ≤ 1.8s（否则影响SEO与转化）
    - 本地化: 
      * 多货币显示（USD/EUR，根据访客IP自动切换）
      * 多语言版本（英语为主，西语/法语可选）
      * 时区适配（联系表单显示"We reply within 24H (US Eastern Time)"）

信任信号的A/B测试（推荐）:
  版本A: 无信任信号墙（仅卖点+CTA）
  版本B: 有信任信号墙（认证+视频+证言）
  
  预期结果: 版本B转化率比版本A高50-100%
  
  如客户预算有限，优先级排序:
  1. 认证Logo（成本低，效果好）
  2. 工厂视频（成本中，可信度最强）
  3. 质量保证承诺（成本低，降低决策风险）
  4. 客户证言（成本高-获取难，但有则效果很强）
  5. 第三方验证（需时间积累）

Onboarding检查清单（微站上线前）:
- [ ] 至少提供2个信任信号（认证/视频/证言）
- [ ] 工厂照片/视频为真实拍摄（非库存素材）
- [ ] 所有证言已获得客户授权（避免肖像权纠纷）
- [ ] 联系表单已测试（提交后能收到邮件）
- [ ] 页面加载速度 LCP ≤ 2.5s（通过Lighthouse测试）
- [ ] 移动端适配（50%+流量来自移动端）

未通过检查的客户:
- 临时方案: 先上线"Coming Soon"页面（收集邮箱）
- 同时推进信任信号素材准备（限期2周）
```

**5. 社媒发帖（品牌背书为主）**

```yaml
发帖策略:
  平台: LinkedIn（B2B 主战场）
  频率: 每周 3 次
  内容类型:
    - 行业洞察（周报精简版）
    - 产品更新（新功能/新认证）
    - 客户成功故事（匿名化）
  
  发帖流程:
    1. Claude 基于周报生成 LinkedIn 帖子（300-500 字 + Hashtags）
    2. AI 预审（品牌调性/合规/Hashtag 数量）
    3. 人工审核通过后，API 自动发布
  
  互动/私信: 人工执行（不启用自动化）
```

**6. AI 预审 + 人工核验上线**

```yaml
AI 预审评分卡（5 维评分）:
  
  1. 事实准确度（0-20 分）
     检查点:
     - 所有数据是否有来源标注？
     - 是否有明显的事实错误（如"2025 年苹果发布了 iPhone 20"）？
     评分逻辑:
     - 无来源标注 → 扣 10 分
     - 发现事实错误 → 扣 20 分（直接不合格）
  
  2. 品牌调性（0-20 分）
     检查点:
     - 语气是否符合客户品牌（专业/亲和/创新等）？
     - 是否使用了禁用词？
     评分逻辑:
     - 与品牌调性不符 → 扣 5-10 分
     - 使用禁用词 → 扣 20 分（直接不合格）
  
  3. 合规风险（0-20 分）
     检查点:
     - 是否包含未授权的个人数据？
     - 是否有可能引发法律纠纷的表述？
     评分逻辑:
     - 调用合规预审 MCP，根据其风险等级扣分
  
  4. 本地化质量（0-20 分）
     检查点:
     - 语法/拼写是否正确？
     - 是否符合目标市场的文化习惯？
     评分逻辑:
     - 有语法错误 → 扣 5 分/处
     - 文化不适配（如在穆斯林市场使用猪肉类比）→ 扣 10 分
  
  5. 可操作性（0-20 分）
     检查点:
     - 是否有明确的"下一步建议"？
     - 建议是否具体、可执行？
     评分逻辑:
     - 无明确建议 → 扣 10 分
     - 建议过于模糊（如"需要优化"）→ 扣 5 分
  
  总分: 0-100 分
  通过阈值: ≥ 80 分才能进入人工审核队列
```

```yaml
人工核验流程:
  1. 运营人员在客户门户看到"待审核内容"
  2. 查看 AI 预审评分卡（重点关注 <100 分的扣分项）
  3. 决策:
     - 通过 → 内容发布，状态更新为"已发布"
     - 退回 → 填写"建议修改方向"（结构化字段），状态更新为"待重做"
  4. 退回的内容重新进入 Claude 生成流程，附带修改建议
```

#### 里程碑
- [ ] 每日日报自动生成并推送到客户门户（连续 7 天无中断）
- [ ] 每客户至少 1 个竞品监控看板配置完成
- [ ] 每客户至少 1 版 ICP 角色矩阵生成并录入 Personas 表
- [ ] 至少 3 个无独立站的客户成功上线微站（LCP ≤ 3s）
- [ ] AI 预审功能上线，至少拦截 1 次不合格内容
- [ ] 人工核验流程打通，至少完成 10 次审核（通过 + 退回）

#### 验收标准
- 周报必须包含"明确的下一步建议（A/B 方案）"
- 竞品看板必须有"策略提示"，不能仅展示数据
- 微站的表单提交必须自动记录到 Airtable 并发送邮件通知
- AI 预审评分卡必须在门户可见，人工审核人员能看到扣分明细

---

### 阶段 2｜内容生产与分发（第 3–6 周）

#### 目标
以模板驱动规模化产出，质量与速度兼顾，启动案例飞轮。

#### 核心设计理念：营销策略联动机制 ★关键★

```yaml
所有内容生产（SEO/GEO/社媒/短视频/落地页）都基于"五维联动"：

┌─────────────────────────────────────────────────────────────┐
│                    营销策略联动引擎                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │ 输入层（数据源）                                          │
│  │                                                           │
│  │ 1. ICP画像     2. 行业洞察    3. 竞品动态               │
│  │   (Personas)    (日报/周报)    (Competitors)            │
│  │                                                           │
│  │ 4. 市场信息    5. 工厂能力                               │
│  │   (Search/GSC)  (Products表)                            │
│  └────────────┴────────────┴────────────┘                  │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 联动层（Claude智能决策）                               │  │
│  │                                                        │  │
│  │ IF 竞品A在"质量认证"类查询中领先                        │  │
│  │ AND 我们有ISO+CE认证（Products.认证字段）               │  │
│  │ AND ICP最关注"供应商可靠性"                             │  │
│  │ THEN:                                                  │  │
│  │   1. SEO策略：创作"如何选择有认证的供应商"             │  │
│  │   2. 社媒策略：发布"我们的ISO认证历程"                  │  │
│  │   3. 落地页策略：首屏突出认证Logo                       │  │
│  │   4. 短视频策略：拍摄"工厂认证审核全过程"               │  │
│  └──────────────────────────────────────────────────────┘  │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 输出层（分平台内容）                                    │  │
│  │                                                        │  │
│  │ • SEO长文（网站）：2000-3000词，深度技术解析           │  │
│  │ • GEO内容（AI搜索）：结构化摘要+引用友好段落           │  │
│  │ • LinkedIn（B2B）：专业调性，案例/数据驱动             │  │
│  │ • TikTok（B2C）：短平快，展示产品使用场景              │  │
│  │ • 落地页：针对ICP痛点的卖点对比表                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

联动示例（机械制造客户）:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
数据源:
- ICP: 采购经理最关注"交期稳定性"（决策权重 35%）
- 周报: 行业出现"供应链中断"新闻（某竞品延迟交货）
- 竞品: 竞品A的社媒最近被客户投诉"延迟3个月"
- 市场: GSC显示"reliable pump supplier"搜索量 +50%
- 工厂: 客户工厂有"30天急单生产线"（Products.特殊能力）

Claude生成联动策略:
1. SEO文章：《How to Choose a Reliable Industrial Pump Supplier in 2025》
   - 强调"交期承诺"和"应急产能"
   - 对比"我们 vs 行业平均交期"（数据来自 Industry_Benchmarks）

2. LinkedIn帖子：
   "供应链不稳定的今天，我们为客户X在30天内完成了紧急订单。
    这背后是我们的{急单生产线}和{库存管理系统}。
    附：3个选择可靠供应商的标准。"

3. GEO内容（针对AI搜索）：
   - 在文章中插入"引用友好段落"：
     "A reliable supplier should have: (1) backup production capacity, 
      (2) real-time order tracking, (3) penalty clauses for delays."
   - 目标：当用户在ChatGPT问"how to find reliable supplier"时被引用

4. 短视频（TikTok，如是B2C产品）：
   - 脚本：工厂车间实拍，展示"24小时不停工的生产线"
   - 字幕："30天急单？我们说到做到！"
   - CTA："点击链接，48小时内回复报价"

5. 落地页优化：
   - 在Hero Section增加"30天交期保证"徽章
   - 在FAQ增加："Q: 如果我需要加急订单怎么办？A: 我们有专门的急单生产线..."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

这种联动机制确保:
✓ 所有内容都有明确的战略意图（不是为了内容而内容）
✓ 内容互相呼应（SEO引流 → 落地页承接 → 社媒建立信任）
✓ 快速响应市场变化（竞品失误 = 我们的机会）
✓ 最大化工厂独特能力的曝光（不与竞品打价格战）
```

#### 动作清单

**1. 模板资产化（核心工作）**

```yaml
模板类型 1: SEO + GEO 长文（2000-3000 词）
  
  参数输入（从 Airtable 自动填充）:
    - 行业: {Clients.行业}
    - 产品: {Products.产品名 + USP}
    - 目标关键词: {手动输入或从 GSC 提取}
    - 目标市场: {Clients.目标市场，如美国/欧洲}
    - 竞品内容: {Competitors 表中同关键词的竞品文章 URL}
    - 禁用词: {Products.禁用词}
    - GEO优化级别: {基础版/专业版，从服务包读取}
  
  Claude 提示词模板:
    "你是一名精通SEO与GEO（生成式搜索引擎优化）的内容专家。请基于以下信息，撰写一篇同时优化传统搜索引擎和AI搜索引擎的文章。
    
    主题: {目标关键词}
    目标读者: {从 ICP 画像生成，如'采购经理，关注 ROI 和供应商稳定性'}
    
    **传统SEO要求**:
    1. 标题必须包含目标关键词
    2. 文章结构: 引言 → 3-5 个小节 → 常见问题 FAQ → 结论 + CTA
    3. 每个小节必须有 H2 标题，并包含相关的长尾关键词
    4. 自然融入产品 USP: {Products.USP}
    
    **GEO优化要求（针对ChatGPT/Perplexity/Gemini）**:
    1. 开头提供'TL;DR'（一段话总结，便于AI提取核心答案）
    2. 使用结构化数据标记（如FAQ Schema、HowTo Schema）
    3. 每个关键论述必须附带可验证的数据来源（如'根据Gartner 2024报告...'）
    4. 创建'引用友好段落'：独立的、自成体系的段落（150-200词），AI可直接引用
    5. 包含对比表格（我们 vs 竞品 vs 行业标准），便于AI生成对比回答
    6. 在文章末尾增加'AI搜索优化摘要'（仅在HTML注释中，不对人类用户显示）:
       <!-- AI_SUMMARY: 
       核心问题: {用户可能在AI搜索中问的问题}
       最佳答案: {一句话回答}
       关键数据: {3-5个支撑数据点}
       权威来源: {引用的来源列表}
       -->
    
    约束:
    - 总字数 2000-3000 词（英文）或 1500-2500 字（中文）
    - 避免使用禁用词: {Products.禁用词}
    - 每个数据声称必须标注来源（脚注或行内引用）
    - 结尾的 CTA 引导读者'联系我们获取报价'
    
    参考竞品内容（但不要抄袭）: {竞品文章摘要}
    
    输出格式: Markdown + Schema.org 结构化数据标记"
  
  输出后:
    - AI 预审（评分卡）
    - 人工审核通过后 → 发布到网站（通过 WordPress API 或静态站点更新）
    - GSC/GA4 打点（UTM 参数 + 事件追踪）
```

```yaml
模板类型 2: 社媒短内容（LinkedIn/Facebook）
  
  参数输入:
    - 来源: {周报精简版 / 产品更新 / 客户案例}
    - 语气: {Clients.品牌调性，如"专业且友好"}
    - Hashtags: {行业相关，3-5 个}
  
  Claude 提示词模板:
    "将以下内容改写为一篇 LinkedIn 帖子（300-500 字）:
    
    原始内容: {周报中的某一段}
    
    要求:
    1. 开头用一个引人注目的 Hook（如反常识观点/数据/问题）
    2. 正文阐述观点，提供价值（洞察/建议）
    3. 结尾用 CTA（如'你怎么看？欢迎评论'或'访问我们的网站了解更多'）
    4. 语气: {Clients.品牌调性}
    5. 添加 3-5 个相关 Hashtags
    6. 避免使用禁用词: {Products.禁用词}
    
    输出格式: 纯文本（适合直接粘贴到 LinkedIn）"
```

```yaml
模板类型 3: 短视频脚本（60-90 秒）
  
  参数输入:
    - 主题: {产品演示 / 客户证言 / 行业趋势}
    - 目标: {提升品牌认知 / 引导访问网站 / 促进询盘}
    - 视觉风格: {Clients.品牌美术包}
  
  Claude 提示词模板:
    "撰写一个 60-90 秒的短视频脚本:
    
    主题: {主题}
    目标: {目标}
    
    结构:
    1. 开场（5-10 秒）: 抛出痛点或引发好奇的问题
    2. 正文（40-60 秒）: 展示解决方案（3 个要点）
    3. 结尾（10-15 秒）: CTA（访问网站/扫码联系）
    
    要求:
    - 每句话不超过 15 个词（便于字幕显示）
    - 标注镜头建议（如'镜头 1: 特写产品'）
    - 标注背景音乐类型（如'轻快的电子乐'）
    - 结尾必须包含 Logo 和联系方式
    
    输出格式:
    | 时间轴 | 镜头 | 旁白/字幕 | 音效/音乐 |
    |--------|------|----------|----------|"
```

```yaml
模板类型 4: 案例卡片（匿名化）
  
  触发条件:
    - 某客户的某项成绩触发阈值（如播放量破 10 万，MQL 月增 50+）
  
  自动生成流程:
    1. Trae 检测到触发条件
    2. Claude 提取关键信息:
       - 客户行业（匿名化为"某机械制造企业"）
       - 初始状态（如"月自然流量仅 200，询盘质量差"）
       - 采取的策略（如"重构 ICP + 优化 SEO + 上线微站"）
       - 执行细节（3-5 个具体动作）
       - 结果数据（自然流量 +180%，CPL -40%）
    3. 生成两种格式:
       - 一图看懂（信息图，调用 NANOBANANA）
       - 60 秒视频（调用 SORA2/VEO3.1）
    4. 分发到:
       - 中台官网（案例库页面）
       - LinkedIn（客户成功故事系列）
       - YouTube（客户案例合集）
       - 行业媒体（PR 软文）
```

**2. 短视频与图片生产**

```yaml
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B2B渠道：LinkedIn/YouTube（品牌背书与技术展示）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

图片生产流程（通过模型网关）:
  1. 输入: Claude 生成的图片描述（Prompt）+ 品牌美术包
  2. 模型网关调用 NANOBANANA 生成图片
  3. 自动叠加品牌元素:
     - Logo（右下角，透明度 80%）
     - 品牌色调滤镜
     - 安全区检查（确保关键元素不被裁切）
  4. AI 预审:
     - 是否符合品牌风格？
     - 是否有敏感内容（暴力/色情/政治）？
  5. 人工审核通过后 → 发布

视频生产流程（B2B，60-90秒）:
  1. 输入: Claude 生成的视频脚本（分镜表）+ 品牌美术包
  2. 模型网关调用 SORA2/VEO3.1 生成视频片段
  3. 自动剪辑:
     - 拼接片头（5 秒）+ 正文 + 片尾（5 秒）
     - 叠加字幕（根据脚本，使用品牌字体）
     - 添加背景音乐（从授权音乐库选择）
  4. AI 预审:
     - 是否有口误/字幕错误？
     - 是否符合平台规范（如 YouTube 的长度/格式要求）？
  5. 人工审核通过后 → 发布到 YouTube/LinkedIn

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B2C渠道：TikTok（标准产品直销）★新增★
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

适用场景:
- 客户有标准化产品（如家电/3C/日用品）
- 产品适合在线展示与冲动购买
- 客户愿意在TikTok开设店铺（TikTok Shop）

TikTok内容生产工作流（Trae，每日执行）:

Step 1: 市场信息采集（每日 8:00 AM）
  1. 抓取TikTok热门话题（Trending Hashtags）
     - 使用TikTok API或第三方工具（如Pentos/Exolyt）
     - 筛选与客户产品相关的话题（如 #kitchengadgets #smartappliances）
  
  2. 分析竞品内容表现
     - 监测3-5个竞品的TikTok账号
     - 记录本周表现最好的视频（播放量/点赞/评论/转化率）
     - Claude分析："他们用了什么Hook？什么场景？什么音乐？"
  
  3. 提取用户反馈
     - 爬取竞品视频下的高赞评论
     - Claude总结："用户在抱怨什么？期待什么？"
     - 示例："很多人问'这个能用在XX场景吗？' → 我们下期视频就拍XX场景"

Step 2: 批量内容策划（每日 9:00 AM）
  Claude生成"今日TikTok内容矩阵"（5-10条候选）:
  
  输入:
  - 今日热门话题: {#kitchenhacks, #cookingmadeeasy}
  - 竞品爆款元素: {开箱+快速演示+价格对比}
  - 用户痛点: {担心质量、不知道怎么用、想看真实效果}
  - 产品特性: {Products表中的USP}
  
  输出: 内容矩阵表
  | 序号 | 主题 | Hook（前3秒） | 核心内容（15秒） | CTA | 预期目标 |
  |------|------|--------------|----------------|-----|---------|
  | 1 | 开箱+首次使用 | "花$29买了这个神器" | 展示产品外观+快速演示 | "链接在个人简介" | 引流到店铺 |
  | 2 | 场景化展示 | "早餐只需要5分钟？" | 用产品做早餐全过程 | "想要吗？评论区扣1" | 提升互动率 |
  | 3 | 用户证言 | "听说这个能XXX，真的吗？" | 模拟用户测试过程 | "试过的都说好" | 建立信任 |
  | 4 | 对比视频 | "$29 vs $99的区别" | 我们的产品 vs 贵价竞品 | "聪明的都选这个" | 强化性价比 |
  | 5 | 限时优惠 | "今天最后一天！" | 展示产品+折扣信息 | "立即购买" | 促进转化 |
  
  人工筛选: 从10条候选中选3-5条制作

Step 3: 视频生成（每日 10:00-14:00）
  方式A: AI生成（适合产品演示/动画讲解）
  - 使用SORA2/VEO3.1生成15-60秒视频
  - 叠加字幕、音乐、品牌元素
  
  方式B: 真人拍摄指导（适合开箱/使用场景）
  - Claude生成"拍摄指导清单"（给客户工厂的拍摄人员）:
    """
    拍摄任务 #20250115-01: 早餐场景演示
    
    所需道具: {产品}、鸡蛋2个、面包、咖啡
    拍摄角度: 俯视（手机固定在头顶上方）
    拍摄步骤:
    1. [0-3秒] 特写产品，手指向产品
    2. [3-10秒] 打开产品，放入食材
    3. [10-15秒] 等待过程（加速播放）
    4. [15-20秒] 成品展示，咬一口（表情满意）
    
    字幕文案: "5分钟早餐神器！"
    背景音乐: 轻快的流行乐（TikTok音乐库搜索"upbeat cooking"）
    """
  - 客户拍摄后上传到系统 → AI自动剪辑（加字幕/调色/加音乐）

Step 4: AI预审 + 人工审核
  AI预审检查项:
  - 时长是否合规？（TikTok建议15-60秒）
  - 是否有违禁内容？（TikTok社区规则检查）
  - 字幕是否清晰？音乐是否有版权？
  - Hook是否在前3秒？CTA是否明确？
  
  人工审核: 
  - 确认产品展示是否真实
  - 确认价格/优惠信息是否准确

Step 5: 发布与监测
  发布方式:
  - 自动发布: 通过TikTok API定时发布（需客户授权）
  - 半自动发布: 飞书消息提醒客户，附上视频+文案，客户确认后手动发布
  
  发布后监测（24小时内）:
  - 播放量、点赞、评论、分享
  - 点击链接数（导流到TikTok Shop）
  - 实际转化（订单数）
  
  反馈循环:
  - 若视频播放量 <500 → 分析失败原因（Hook不吸引人？内容太长？）
  - 若视频播放量 >10,000 → 分析成功要素，生成"爆款模板"
  - 若评论区有高频问题 → 下期视频针对性回应

Step 6: TikTok Shop运营优化（基于数据）
  每周分析:
  1. 哪些视频带来最多订单？
     - 提取共性（产品类型/拍摄风格/文案话术）
     - 下周加大类似内容的生产
  
  2. 用户反馈分析:
     - 收集评论区的问题/抱怨/建议
     - Claude生成《用户之声周报》，推送给工厂
     - 示例："10个用户提到'包装破损' → 建议工厂改进包装"
  
  3. 反向推动产品迭代:
     - 若某功能被频繁询问（"能不能支持XX？"）→ 记录需求，提交给工厂研发
     - 若某配色/尺寸特别畅销 → 建议工厂增加产能
     - 若某产品复购率高 → 建议工厂开发配套产品

TikTok成功指标（B2C客户）:
- 每日发布视频数: 3-5条（稳定输出）
- 平均播放量: ≥5,000/视频（前3个月）
- 点击率（视频→店铺）: ≥3%
- 转化率（访问→下单）: ≥5%
- 月GMV（总成交额）: ≥¥5万（前3个月）→ ≥¥20万（6个月后）

TikTok费用结构:
- 青铜包: 不含TikTok服务（仅B2B）
- 白银包: 可选TikTok基础包 +¥5,000/月（每日2条视频）
- 黄金包: 含TikTok专业包 +¥12,000/月（每日5条+广告投放优化）
```

**3. 落地页转化引擎**

```yaml
落地页优化原则（基于 ICP）:
  
  Hero Section:
    - 标题: 直击痛点（从 ICP 的"关键痛点"提取）
    - 副标题: 简述解决方案（一句话）
    - CTA: 对比测试 2 个版本（如"免费咨询"vs"获取报价"）
  
  卖点对比表:
    | 特性 | 我们 | 竞品 A | 竞品 B |
    |------|------|--------|--------|
    | [ICP 关注的特性 1] | ✅ | ❌ | ✅ |
    | [ICP 关注的特性 2] | ✅ | ✅ | ❌ |
  
  客户证言（社会证明）:
    - 来自同行业的客户（匿名化）
    - 必须包含具体数据（如"3 个月内询盘量 +150%"）
    - 配图: 客户 Logo（需授权）或行业图标
  
  FAQ（常见异议处理）:
    - 从 ICP 的"常见异议"列提取问题
    - Claude 生成简洁的回答（每个 50-100 词）
    - 示例:
      Q: "为什么比竞品贵 20%？"
      A: "我们的价格包含 X/Y/Z 服务，而竞品需要额外付费。综合算下来，我们的总成本反而更低。"
  
  统一 CTA:
    - 页面至少 3 处 CTA（顶部/中间/底部）
    - 颜色: 使用品牌主色，确保对比度 ≥ 4.5:1（WCAG AA 标准）
    - 文案: 行动导向（如"立即咨询"而非"了解更多"）
```

```yaml
GSC/GA4 打点（关键事件）:
  - page_view: 落地页访问
  - scroll_depth: 滚动深度（25% / 50% / 75% / 100%）
  - cta_click: CTA 按钮点击
  - form_start: 表单开始填写
  - form_submit: 表单提交成功
  - video_play: 视频播放
  - video_complete: 视频看完
```

**4. 案例飞轮（自动化）**

```yaml
案例飞轮工作流（Trae）:
  
  触发条件（任一满足）:
    - 某客户的某篇 SEO 文章自然流量 7 日均值 ≥ 1000/天
    - 某客户的某条视频播放量 ≥ 10 万
    - 某客户的 MQL 月增量 ≥ 50
    - 某客户的 CPL 环比下降 ≥ 30%
  
  执行步骤:
    1. 自动从 Metrics 表提取数据
    2. Claude 生成《匿名化案例研究》:
       结构:
       - 标题: "某 [行业] 企业如何在 3 个月内实现 [核心成果]"
       - 背景: 客户初始状态（痛点）
       - 策略: 我们采取的 3-5 个关键动作
       - 执行: 每个动作的具体操作（带截图/数据）
       - 结果: 前后对比数据（表格 + 图表）
       - 关键洞察: 3 条可复用的经验
    3. 生成一图看懂（NANOBANANA）:
       - 信息图格式
       - 包含: 背景→策略→结果 的流程图
       - 品牌元素叠加
    4. 生成 60 秒视频（SORA2/VEO3.1）:
       - 旁白: 根据案例研究脚本
       - 字幕: 关键数据用大字突出
       - 结尾: CTA（"想要类似结果？联系我们"）
    5. AI 预审 + 人工审核
    6. 多渠道分发:
       - 中台官网（案例库）
       - LinkedIn（每周一个案例）
       - YouTube（案例合集视频）
       - 行业媒体（PR 推送）
  
  成功指标:
    - 每月产出 ≥ 3 篇案例
    - 案例带来的间接询盘 ≥ 总询盘的 15%（通过 UTM 追踪）
```

**5. 动态预算闭环（基础版）+ 统一渠道归因** ★优化★

```yaml
问题背景:
  渠道归因不统一 → "SEO带来的线索被误认为是广告" → 误配预算 → 低效渠道继续烧钱

统一归因系统设计:

1. UTM参数标准化（所有对外链接必须带UTM）
   
   UTM参数结构:
   ?utm_source={来源}&utm_medium={媒介}&utm_campaign={活动}&utm_content={内容ID}
   
   示例:
   - SEO文章: ?utm_source=google&utm_medium=organic&utm_campaign=seo_q1&utm_content=article_123
   - LinkedIn帖子: ?utm_source=linkedin&utm_medium=social&utm_campaign=brand_awareness&utm_content=post_456
   - GEO（AI搜索）: ?utm_source=perplexity&utm_medium=ai_search&utm_campaign=geo_optimization&utm_content=answer_789
   - TikTok视频: ?utm_source=tiktok&utm_medium=video&utm_campaign=product_demo&utm_content=video_012
   - 邮件外联: ?utm_source=email&utm_medium=outreach&utm_campaign=cold_email_batch3&utm_content=template_A
   
   强制规则:
   - Trae自动生成的所有链接必须包含UTM
   - 客户手动分享的链接，飞书提醒时附带"请使用此带UTM的链接"

2. 多点触达归因模型（Multi-touch Attribution）
   
   问题: 线性归因不准确
   - 用户旅程: SEO文章（首次接触）→ LinkedIn（再次接触）→ 邮件外联（转化）
   - 线性归因: 100%功劳给邮件外联
   - 实际: SEO和LinkedIn也有贡献
   
   解决方案: 使用"时间衰减模型"
   - 首次接触（SEO）: 20%功劳
   - 中间接触（LinkedIn）: 30%功劳
   - 最后接触（邮件）: 50%功劳
   
   实施:
   - 在Airtable的Metrics表中记录每个MQL的"触达路径"
   - Claude根据时间衰减模型计算每个渠道的"加权贡献"
   - 月度报告中展示"直接归因"和"加权归因"两个版本

3. 线索标记系统（Lead Tagging）
   
   在Airtable的Content_Queue表中增加字段:
   - Lead_Source（线索来源，自动从UTM提取）
   - Lead_Quality（线索质量，人工标记）
     * A级: 明确需求+预算+时间线
     * B级: 有兴趣但需培育
     * C级: 信息收集，无购买意向
   
   用途:
   - 计算"渠道质量得分" = A级线索数 / 总线索数
   - 发现: SEO线索虽然多，但A级占比仅10%
           邮件外联线索虽然少，但A级占比40%
   - 决策: 应该增加邮件外联预算，而非盲目追求SEO数量

4. 成本追踪（Cost Ledger 表）★已有，继续强化★
  
  每次调用付费 API 时自动记录:
    - 客户ID
    - 内容ID（关联到 Content_Queue 表）
    - 调用时间
    - 模型名称（Claude/SORA/Search MCP 等）
    - 成本（元）
    - 输入 tokens / 输出 tokens（如适用）
    - 渠道（从Content_Queue表的类型字段映射）
      * 如内容类型=SEO文章 → 渠道=SEO
      * 如内容类型=LinkedIn视频 → 渠道=LinkedIn

5. 渠道产出追踪（Metrics 表 + GA4）
  
  每个渠道（SEO/GEO/社媒/视频/邮件外联）的:
    - 曝光量（Impressions）
    - 点击量（Clicks）
    - 转化量（Form Submits）
    - 线索量（MQL）
    - 线索质量（A/B/C级分布）
    - 订单量（SQL → Won）
  
  关键: 所有数据通过UTM参数自动归类

6. ROI 计算（每月自动生成报告）
  
  公式: ROI = (渠道带来的营收 - 渠道成本) / 渠道成本
  
  示例报告（统一归因后）:
  | 渠道 | 成本 | MQL | 加权MQL | CPL | A级占比 | SQL | 订单额 | ROI | 决策 |
  |------|------|-----|---------|-----|---------|-----|--------|-----|------|
  | SEO 文章 | ¥5k | 40 | 35 | ¥125 | 10% | 4 | ¥20k | 3:1 | ✅ 维持 |
  | GEO优化 | ¥8k | 35 | 30 | ¥229 | 25% | 10 | ¥60k | 6.5:1 | ✅ 加大 |
  | LinkedIn视频 | ¥8k | 25 | 22 | ¥320 | 15% | 5 | ¥25k | 2.1:1 | ⚠️ 优化 |
  | TikTok | ¥10k | 50 | 40 | ¥200 | 5% | 2 | ¥10k | 0:1 | ❌ 降配 |
  | 邮件外联 | ¥6k | 15 | 20 | ¥300 | 40% | 8 | ¥50k | 7.3:1 | ✅ 加大 |
  
  注意"加权MQL"列:
  - TikTok虽然产生50个MQL（最多），但加权后仅40（因为是首次接触，功劳被稀释）
  - 邮件外联产生15个MQL（最少），但加权后20（因为是最后接触，功劳被放大）
  
  决策逻辑:
  - ROI ≥ 5:1 且 A级占比 ≥ 20% → 增加 30% 预算
  - ROI 2:1 - 5:1 → 维持预算，优化内容质量（提升A级占比）
  - ROI < 2:1 或 A级占比 < 10% → 2 周内降配 50% 或暂停

7. 归因报告的自动生成（Trae + Claude）
   
   触发: 每月1日 9:00 AM
   
   执行步骤:
   1. Trae从Airtable拉取上月所有数据（Content_Queue + Cost_Ledger + Metrics）
   2. Claude分析并生成《月度渠道归因报告》:
      
      报告结构:
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      月度渠道归因报告 | 2025年3月
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      
      执行摘要:
      • 本月总投入: ¥45,000
      • 本月总营收: ¥180,000
      • 整体ROI: 3:1（健康）
      • 表现最好渠道: GEO优化（ROI 6.5:1）
      • 需要调整渠道: TikTok（ROI 0:1，建议暂停）
      
      渠道详情:
      [上面的表格]
      
      归因洞察:
      1. GEO优化带来的线索质量最高（A级占比25%）
         - 原因: AI搜索用户通常处于"决策阶段"，需求明确
         - 建议: 增加GEO内容投入，每周产出2篇引用友好内容
      
      2. TikTok带来大量线索但质量差（A级占比仅5%）
         - 原因: TikTok用户多为"浏览阶段"，冲动点击但无购买意向
         - 建议: 
           * 方案A: 暂停TikTok，预算转投GEO/邮件外联
           * 方案B: 调整TikTok策略，从"产品展示"改为"客户证言"，提升线索质量
      
      3. 邮件外联虽然线索少但转化率高
         - 原因: 精准定向，触达决策者
         - 建议: 增加外联列表清洗频率，提升接受率
      
      下月预算建议:
      | 渠道 | 本月预算 | 建议预算 | 变化 |
      |------|---------|---------|------|
      | SEO | ¥5k | ¥5k | 维持 |
      | GEO | ¥8k | ¥12k | +50% |
      | LinkedIn | ¥8k | ¥6k | -25% |
      | TikTok | ¥10k | ¥0 | 暂停 |
      | 邮件外联 | ¥6k | ¥10k | +67% |
      | 新实验 | - | ¥2k | Reddit测试 |
      | 总计 | ¥37k | ¥35k | -5% |
      
      （TikTok暂停省下的¥10k，分配给GEO+邮件外联+新实验）
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   
   3. 报告推送到客户门户 + 飞书群（@老板/@营销负责人）
   4. 安排"月度预算再平衡会议"（客户确认调整方案）

8. 常见归因错误与解决
   
   错误1: "自然流量"被过度归因
   - 现象: GA4显示50%流量来自"Direct/None"
   - 原因: 用户复制链接分享时，UTM参数丢失
   - 解决: 
     * 使用短链接服务（Bitly/自建）保留UTM
     * 在网站埋点追踪"第一次访问来源"（Cookie）
   
   错误2: 线下活动（展会）的线索无法归因
   - 现象: 展会收集的名片，无法追溯到具体渠道
   - 解决: 
     * 展会专用落地页: example.com/expo-2025?utm_source=expo
     * 名片扫描后，手动在Airtable标记"Lead_Source=展会"
   
   错误3: 多人协作时，归因混乱
   - 现象: 销售人员手动输入线索，忘记标记来源
   - 解决: 
     * Airtable表单设置"Lead_Source"为必填字段
     * 下拉选项限制（SEO/GEO/LinkedIn/邮件/展会/转介绍/其他）

Onboarding检查点（启动前）:
- [ ] GA4已配置UTM追踪（测试发送带UTM的链接，验证GA4能识别）
- [ ] Airtable的Metrics表已增加"Lead_Source"和"Lead_Quality"字段
- [ ] 制定了本客户的"UTM命名规范文档"（所有渠道的标准UTM格式）
- [ ] 测试归因报告生成（手动输入模拟数据，验证Claude能生成报告）

归因系统的价值:
- 避免"拍脑袋"决策（"我觉得LinkedIn效果好" → 数据显示实际ROI仅2:1）
- 及时止损（TikTok烧了3个月才发现ROI<1，已损失¥30k）
- 优化迭代（发现GEO线索质量高，加大投入，ROI从6.5提升至9）
```

**6. GEO监测与优化工作流（白银包/黄金包）**

```yaml
GEO监测工作流（Trae，每周执行）:
  
  触发: 每周一 8:00 AM
  
  步骤:
    1. 查询主流AI搜索引擎（基础版3个，专业版7个）:
       基础版:
       - ChatGPT（通过API或模拟用户查询）
       - Perplexity
       - Google Gemini
       
       专业版额外:
       - Claude (Anthropic)
       - Bing Copilot
       - Meta AI
       - You.com
    
    2. 对每个客户，生成10个"目标查询"（基于ICP痛点）:
       示例（机械制造客户）:
       - "best industrial pump manufacturers in China"
       - "how to choose a reliable pump supplier"
       - "industrial pump price comparison"
       - "OEM pump manufacturer vs branded"
       - "what certifications should pump suppliers have"
       等等...
    
    3. 在每个AI搜索引擎中执行查询，记录:
       - 客户品牌/网站是否被引用？（是/否）
       - 出现的位置（第一段/中间/末尾/来源列表）
       - 引用的具体内容（哪篇文章/哪个段落）
       - 竞品是否出现？排名如何？
    
    4. 计算"GEO可见度评分"（0-100分）:
       公式:
       可见度 = (被引用次数 / 总查询数 × 100) × 位置权重
       位置权重:
       - 第一段: 1.0
       - 中间段: 0.6
       - 末尾/来源: 0.3
    
    5. Claude生成《GEO周报》:
       内容:
       - 本周可见度评分（与上周对比）
       - 哪些查询被引用了？哪些没有？
       - 竞品表现对比（我们 vs 竞品A/B/C）
       - 优化建议（针对"未被引用"的查询，建议创作哪些内容）
    
    6. 推送到客户门户（状态=待查看）

GEO优化执行（专业版，每月2篇定向内容）:
  触发: 当某个"高价值查询"连续2周未被AI引用
  
  执行:
    1. Claude生成"引用友好内容"（800-1200词）:
       - 直接回答该查询
       - 包含3-5个数据支撑
       - 标注权威来源
       - 使用结构化数据标记
    
    2. 发布到客户网站（独立页面或博客）
    
    3. 提交到AI搜索引擎的"内容源"（如有API）
    
    4. 2周后复测该查询，验证是否被引用

专业版额外服务:
  - 构建"AI可引用知识库"（Notion/Airtable）:
    - 常见问题 + 权威答案
    - 行业数据库（可引用的统计数据）
    - 客户案例库（匿名化，带数据）
  
  - 每月与客户开1次"GEO策略会":
    - 回顾本月AI搜索表现
    - 讨论下月内容计划
    - 对标竞品的AI搜索策略
```

#### 里程碑
- [ ] 至少 3 个客户各产出 2 篇 SEO+GEO 优化文章（发布到网站）
- [ ] 至少 5 个客户各产出 2 条短视频（发布到 YouTube/LinkedIn）
- [ ] 至少 1 个客户的落地页转化率 ≥ 8%
- [ ] 案例飞轮自动触发并产出第 1 篇匿名化案例
- [ ] 成本台账记录了 ≥ 100 条 API 调用
- [ ] 月度成本报告自动生成（包含 CPL/内容件单成本）
- [ ] 白银包客户的GEO监测工作流上线（至少监测3个AI搜索引擎）
- [ ] 至少1个客户在ChatGPT中被引用（验证GEO优化有效性）

#### 验收标准
- SEO 文章必须经过 GSC 验证（已被 Google 索引）
- GEO优化文章必须包含结构化数据标记（Schema.org）和"AI搜索优化摘要"
- 短视频必须有字幕（通过 YouTube 自动字幕或手动上传 SRT）
- 落地页必须有 GA4 打点（能看到"form_submit"事件）
- 案例飞轮产出的内容必须有至少 1 个渠道的分发记录（LinkedIn/官网/YouTube）
- GEO周报必须显示"可见度评分"和"竞品对比"

---

### 阶段 3｜增长飞轮与应急指挥（第 7–12 周）

#### 目标
让系统会"自我调整"，预算向高 ROI 自然流动，建立应急响应能力。

#### 动作清单

**1. 战略动态调整（T+1）**

```yaml
异常检测规则（Trae 每日执行）:
  
  规则 1: GEO 级别的转化率异常
    触发条件:
      - 某 GEO 的落地页转化率 7 日降幅 ≥ 30%
    证据链收集:
      - GA4: 该 GEO 的流量来源/跳出率/停留时间
      - GSC: 该 GEO 的关键词排名变化
      - SimilarWeb: 竞品在该 GEO 的流量变化
    
  规则 2: 竞品突然爆发
    触发条件:
      - 某竞品的自然流量 7 日涨幅 ≥ 50%
    证据链收集:
      - Ahrefs: 竞品新增的反链来源
      - 爬虫: 竞品近期发布的内容（标题/主题）
      - LinkedIn: 竞品的社媒活动
  
  规则 3: 成本突增
    触发条件:
      - 某渠道的 CPL 环比上涨 ≥ 50%
    证据链收集:
      - Cost Ledger: 该渠道的 API 成本明细
      - GA4: 该渠道的流量质量（跳出率/停留时间）
      - 竞价平台: CPC 变化趋势
```

```yaml
《应急响应单》生成（Claude）:
  
  提示词模板:
    "基于以下异常检测结果，生成一份《战略调整决策单》:
    
    异常类型: {规则 1/2/3}
    证据链: {自动收集的数据摘要}
    
    要求:
    1. 现象: 用 1-2 句话描述异常（附数据）
    2. 根因假设（置信度评分）:
       - 假设 1: [描述] (置信度 XX%)
       - 假设 2: [描述] (置信度 XX%)
       - 假设 3: [描述] (置信度 XX%)
    3. 可选方案（三选一）:
       - A（激进）: [描述 + 预期结果 + 风险 + 所需预算]
       - B（保守）: [描述 + 预期结果 + 风险 + 所需预算]
       - C（测试）: [描述 + 预期结果 + 风险 + 所需预算]
    4. SLA:
       - 方案 A/C: 需在 T+2 执行
       - 方案 B: 可在 T+7 执行
    5. 预算调整建议:
       - 暂停 [低效渠道] 的 $XXX 预算
       - 转投 [优化方向] $XXX
    
    输出格式: Markdown（适合直接在客户门户显示）"
  
  示例输出:
    # 战略调整决策单 #2025-03-15
    
    ## 📊 异常现象
    GEO-A（美国）的落地页转化率在过去 7 天从 8.5% 下降至 5.2%（-38.8%）。
    
    ## 🔍 根因假设
    1. **竞品 C 进入市场，导致关键词竞争加剧**（置信度 75%）
       - 证据: SimilarWeb 显示竞品 C 在美国的流量 7 日涨幅 +120%
       - 证据: Ahrefs 显示我们的核心关键词"industrial pump manufacturer"排名从第 3 降至第 7
    2. **落地页加载速度下降**（置信度 40%）
       - 证据: GA4 显示 LCP 从 2.5s 升至 3.8s（可能是服务器问题）
    3. **季节性需求下降**（置信度 20%）
       - 证据: Google Trends 显示该行业搜索量 3 月略有下降，但幅度不足以解释转化率暴跌
    
    ## 💡 可选方案（请在 48h 内选择）
    
    ### 方案 A（激进）: 增加预算争夺排名
    - **动作**: 
      - 在 Google Ads 增加 $3,000 预算，竞价"industrial pump manufacturer"等核心词
      - 制作 3 篇针对竞品 C 的对比性 SEO 文章
    - **预期结果**: 
      - 2 周内关键词排名回升至前 5
      - 转化率回升至 7.5%
      - 新增 MQL 约 20 个
    - **风险**: 
      - 若竞品 C 持续加码，可能陷入烧钱战
      - ROI 可能降至 2:1
    - **所需预算**: $5,000（广告 $3,000 + 内容制作 $2,000）
    
    ### 方案 B（保守）: 暂停 GEO-A，转投 GEO-B
    - **动作**: 
      - 暂停美国市场的广告投放
      - 将预算转移至欧洲（德国/法国），这两个市场的转化率仍稳定在 9%
    - **预期结果**: 
      - 整体 CPL 降至 $280（当前 $350）
      - 但美国市场的品牌心智可能减弱
    - **风险**: 
      - 3 个月后若想重返美国市场，需重新建立排名
    - **所需预算**: $0（仅调整预算分配）
    
    ### 方案 C（测试）: 优化落地页 + 制作对比内容
    - **动作**: 
      - 紧急修复落地页加载速度（优化图片/CDN）
      - 制作 1 篇"我们 vs 竞品 C"的深度对比文章（SEO + LinkedIn）
    - **预期结果**: 
      - 1 周内 LCP 降至 2.5s，转化率小幅回升至 6.5%
      - 对比文章带来品牌差异化认知
    - **风险**: 
      - 效果可能不如方案 A 明显
    - **所需预算**: $1,500（技术优化 $800 + 内容制作 $700）
    
    ## ⏰ SLA
    - 方案 A/C: 需在 **3 月 17 日前**（T+2）执行
    - 方案 B: 可在 **3 月 22 日前**（T+7）执行
    
    ## 💰 预算再平衡建议
    - 暂停"Facebook 广告"（过去 30 天 ROI 仅 1.2:1）的 $2,000 预算
    - 将其中 $1,500 用于方案 C（若选择）
    - 剩余 $500 留作应急储备
```

```yaml
客户确认流程:
  1. Trae 检测到异常 → T+1 日生成《应急响应单》
  2. 推送到客户门户（状态=待客户确认）
  3. 客户在门户选择方案 A/B/C（或拒绝所有方案）
  4. 系统记录决策到 Strategy_History 表（PostgreSQL）
  5. 执行团队收到通知，按方案执行
  6. T+7/T+14 回顾结果，记录"实际效果 vs 预期效果"
```

**2. 预算再平衡例会（月度）**

```yaml
会议准备（Trae 自动生成）:
  输入:
    - 上月的 Cost Ledger 数据
    - 上月的 Metrics 数据（MQL/CPL/转化率等）
    - 上月的渠道 ROI 报告
  
  输出:《月度预算再平衡报告》
    1. 上月总览
       - 总支出: $XXX
       - 总 MQL: XXX
       - 平均 CPL: $XXX
       - 整体 ROI: X:1
    
    2. 渠道表现排名
       | 排名 | 渠道 | 支出 | MQL | CPL | ROI | 建议 |
       |------|------|------|-----|-----|-----|------|
       | 1 | SEO 文章 | $5k | 60 | $83 | 9:1 | ✅ 增加预算 +30% |
       | 2 | LinkedIn 视频 | $6k | 35 | $171 | 4:1 | ✅ 维持预算，优化转化 |
       | 3 | YouTube 广告 | $8k | 25 | $320 | 1.8:1 | ⚠️ 降配 -50% |
       | 4 | Facebook 广告 | $4k | 10 | $400 | 0.5:1 | ❌ 暂停，根因分析 |
    
    3. 加/减/停清单
       加（增加预算的渠道）:
       - SEO 文章: 从 $5k 增至 $6.5k（+30%）
       
       减（降配的渠道）:
       - YouTube 广告: 从 $8k 降至 $4k（-50%），测试新的受众定位
       
       停（暂停的渠道）:
       - Facebook 广告: 暂停 1 个月，分析根因后再决定是否重启
    
    4. 实验计划（2-3 个）
       实验 1: 测试"客户证言视频"在 LinkedIn 的效果
       - 假设: 真实客户的证言比产品演示更能提升信任度
       - 预算: $1,500
       - 成功指标: CPL < $200，互动率 > 5%
       - 周期: 2 周
       
       实验 2: 在德国市场测试德语 SEO 内容
       - 假设: 本地化语言能提升转化率 ≥ 20%
       - 预算: $2,000
       - 成功指标: 德国 MQL > 15/月
       - 周期: 4 周
```

```yaml
会议流程（客户参与）:
  1. 运营团队展示《月度预算再平衡报告》
  2. 讨论"加/减/停清单"，客户确认或调整
  3. 讨论"实验计划"，客户批准预算
  4. 确定下月预算总额与分配
  5. 会议纪要录入系统，下月初回顾执行情况
```

**3. 风险分级产品化（黄金包试点）**

```yaml
白名单客户选择标准（黄金包）:
  必须同时满足:
  1. 在白银包服务 ≥ 3 个月
  2. 账号健康度一直为"良好"（无异常记录）
  3. 签署《高风险服务知情同意书》和《账号风险免责协议》
  4. 月营销预算 ≥ ¥8 万元
  5. 有专人（客户方）负责跟进高风险动作的执行结果
```

```yaml
账号健康度监控（每日执行）:
  
  监控指标（LinkedIn 为例）:
  1. 连接请求接受率
     - 计算: 已接受连接数 / 发送连接数
     - 健康阈值: ≥ 30%
     - 异常: 7 日均值 < 20% → 告警
  
  2. 消息回复率
     - 计算: 已回复消息数 / 发送消息数
     - 健康阈值: ≥ 15%
     - 异常: 7 日均值 < 10% → 告警
  
  3. 内容互动率
     - 计算: (点赞 + 评论 + 分享) / 展现量
     - 健康阈值: ≥ 2%
     - 异常: 7 日均值 < 1% → 告警
  
  4. 账号限制状态
     - 通过 LinkedIn API 或人工检查
     - 若出现"您的账号活动受限"等提示 → 立即告警
  
  5. 行为模式异常检测（新增）★关键★
     - AI行为特征: 动作间隔过于均匀（如每10分钟1次）
     - 真人行为特征: 间隔不规律（3分钟→15分钟→5分钟）
     - 检测: 计算动作时间戳的"标准差"
       * 标准差 < 2分钟 → 疑似机器人 → 告警
  
  告警处理:
  - Level 1（黄色）: 单项指标异常 → 48h 内人工复查，降低该账号的动作频率 50%
  - Level 2（红色）: 两项以上异常 OR 账号被限制 → 立即暂停所有高风险动作，转人工接管
  - Level 3（黑色）: 行为模式被识别为机器人 → 立即启动"真人行为掺混"策略
```

```yaml
频控阈值与真人行为掺混策略（黄金包）★优化★:
  
  LinkedIn频控（保守版）:
    自动化动作（由系统执行）:
    - 主动联系（冷外联）: ≤ 15 次/周/账号（从20降至15）
    - 点赞/收藏: ≤ 30 次/天/账号（从50降至30）
    
    人工动作（由客户或中台人员执行，占比≥40%）:
    - 评论互动: 100%人工（AI生成草稿，人工审核后发布）
    - 私信回复: 100%人工（AI提供回复建议，人工编辑后发送）
    - 发帖: 人工50% + 自动50%（交替进行）
  
  真人行为掺混的5个维度:
  
  1. 时间维度（打破规律性）
     AI方式: 每天9:00准时发帖
     掺混方式: 
     - 周一 9:15, 周二 10:42, 周三 8:53, 周四 11:20, 周五 9:08
     - 算法: 基准时间 ± 随机偏移（0-120分钟）
  
  2. 动作顺序（模拟真实浏览）
     AI方式: 登录 → 立即发送10个连接请求 → 登出
     掺混方式:
     - 登录 → 浏览首页30-60秒 → 点赞2-3条内容 → 发送3个连接请求 → 
       查看1个个人资料 → 发送2个连接请求 → 登出
     - 关键: 穿插"消费行为"（浏览/点赞）与"生产行为"（发送请求）
  
  3. 内容变化（避免模板痕迹）
     AI方式: 统一使用模板A发送100条消息
     掺混方式:
     - 准备3-5个模板变体（70%相似，30%不同）
     - 每条消息随机选择模板
     - 个性化字段: 插入收件人姓名、公司名、近期动态
     - 示例:
       模板A: "Hi {名字}, saw your work at {公司}, interested in..."
       模板B: "Hello {名字}, {公司}'s approach to X is impressive..."
       模板C: "{名字}, as someone in {行业}, you might find..."
  
  4. 设备与IP（多样化指纹）
     风险: 同一IP、同一设备指纹发送大量请求 → 易被识别
     掺混方式:
     - 如客户有多人团队: 分配不同账号给不同人（真实IP多样化）
     - 如单人操作: 使用住宅代理（Residential Proxy）而非数据中心IP
     - 工具: Bright Data / Smartproxy（成本约$100/月，黄金包客户分摊）
  
  5. 错误与停顿（模拟人类不完美）
     AI方式: 100%准确执行，无错误
     掺混方式:
     - 偶尔"打错字"然后修正（如消息发送前2秒撤回重发）
     - 偶尔"停顿"思考（浏览某个资料停留1-2分钟再决定是否发送请求）
     - 偶尔"忘记"执行（某天只发送10个请求而非计划的15个）
  
  Reddit特殊策略（如启用）:
    Reddit对机器人检测更严格，必须100%人工执行:
    - 评论: 由中台运营人员撰写（AI提供参考答案）
    - 发帖: 严格限制频率（≤ 2次/周/账号）
    - 账号预热: 新账号前30天仅"消费"（浏览/点赞），不发帖
  
  节流策略的动态调整:
    触发条件: 账号健康度评分 < 60分
    执行:
    1. 立即降低所有自动化动作频率50%
    2. 增加人工动作占比至60%
    3. 观察7天，若评分回升至70+，恢复正常频率
    4. 若评分持续低于60，降级至白银包（暂停主动外联）
```

```yaml
沙盒测试环境（新策略启动前）:
  1. 创建测试账号（非客户真实账号）
  2. 在测试账号运行新策略 7 天
  3. 监控指标:
     - 测试账号是否被限制/封禁？
     - 目标受众的响应率如何？
     - 是否有负面反馈（如被举报）？
  4. 若测试通过 → 在客户真实账号小流量试运行（如 5 个联系/天）
  5. 若小流量试运行成功 → 逐步放量至阈值上限
```

**4. 地域与行业规则库**

```yaml
地域规则库（按 GEO 加载不同的规则）:
  
  欧美市场:
    合规要求:
      - GDPR: 必须有"Cookie 同意"横幅
      - CAN-SPAM: 邮件必须有"Unsubscribe"链接
    文化偏好:
      - 语气: 专业且直接，避免过度营销
      - 颜色: 蓝色/绿色（信任），避免红色（攻击性）
    禁用词:
      - "Cheap"（暗示低质量）
      - "Free"（容易被标记为垃圾邮件）
  
  东南亚市场:
    合规要求:
      - PDPA（新加坡/泰国）: 数据收集需明确授权
    文化偏好:
      - 语气: 友好且尊重，强调"关系"而非"交易"
      - 颜色: 红色/金色（繁荣），但避免在泰国用黄色（皇室色）
    禁用词:
      - 避免宗教相关类比（如猪肉/牛肉）
  
  中东市场:
    合规要求:
      - 沙特/阿联酋: 内容需符合伊斯兰教义
    文化偏好:
      - 语气: 正式且尊重，强调"荣誉"和"长期合作"
      - 颜色: 绿色/白色（伊斯兰色），避免过于鲜艳的色彩
    禁用词:
      - 避免酒精/赌博相关内容
      - 避免女性形象过于暴露
```

```yaml
行业规则库（按行业加载不同的模板）:
  
  机械制造:
    ICP 特征:
      - 决策周期长（3-12 个月）
      - 重视技术参数和认证（ISO/CE）
    内容偏好:
      - 技术白皮书
      - 案例研究（工程项目）
      - 产品演示视频（工作原理）
    禁用词:
      - "Cheap"（工业品客户更关注质量）
  
  家电/3C:
    ICP 特征:
      - 决策周期短（1-3 个月）
      - 重视设计和用户体验
    内容偏好:
      - 产品开箱视频
      - 对比测评
      - 用户评价合集
    禁用词:
      - "Industrial"（太硬核，不适合消费品）
  
  轻工/快消品:
    ICP 特征:
      - 决策周期极短（1-4 周）
      - 重视价格和供应链稳定性
    内容偏好:
      - 价格优势说明
      - 物流/交期保障
      - 批量折扣政策
    禁用词:
      - "Luxury"（与快消品定位不符）
```

#### 里程碑
- [ ] 至少触发 1 次"战略动态调整"，并成功生成《应急响应单》
- [ ] 至少完成 1 次"月度预算再平衡会议"，并执行"加/减/停清单"
- [ ] 至少 1 个白名单客户启动黄金包服务（签署所有必需文件）
- [ ] 账号健康度监控系统上线，连续 30 天无误报
- [ ] 地域规则库和行业规则库配置完成（至少覆盖 3 个 GEO + 3 个行业）

#### 验收标准
- 《应急响应单》必须包含"根因假设（置信度评分）"和"预算调整建议"
- 月度预算再平衡会议必须有会议纪要，并在系统中记录"加/减/停清单"的执行情况
- 黄金包客户的账号健康度必须每日监控，出现异常后 24h 内必须有处理记录
- 沙盒测试环境必须在新策略启动前运行，并有测试报告

---

### 持续运行（12 周之后）

#### 持续优化的四大支柱 ★扩展优化★

**1. 模板与知识的滚动迭代 + 资产化治理**

```yaml
问题背景:
  模板不资产化 → 每个客户重造轮子 → 效率低+质量不稳定

资产化治理系统:

1. 模板版本管理（GitHub式）
   
   结构:
   /templates
     /seo
       - article_template_v1.0.md（首版）
       - article_template_v1.1.md（优化后，+转化率15%）
       - article_template_v2.0.md（重大改版，+转化率40%）
     /social
       - linkedin_post_v1.0.md
       - linkedin_post_v1.2.md
     /video
       - tiktok_script_v1.0.md
   
   每个模板文件包含:
   - 版本号与更新日期
   - 适用场景（行业/GEO/产品类型）
   - 历史表现数据（平均播放量/转化率/CPL）
   - 变更日志（为什么更新？优化了什么？）
   
   示例:
   ```markdown
   # SEO文章模板 v2.0
   
   更新日期: 2025-03-15
   适用场景: 机械制造行业，B2B，欧美市场
   历史表现: 平均自然流量 1200/月，转化率 9.5%
   
   变更日志:
   - v1.0 → v1.1: 增加FAQ章节，转化率+15%
   - v1.1 → v2.0: 增加GEO优化元素（引用友好段落），转化率+25%
   
   模板内容:
   [详细的提示词与结构...]
   ```

2. 行业引擎的模块化（乐高式组装）
   
   问题: 每个新客户都要重新配置所有工作流
   
   解决方案: 模块化 + 预配置
   
   行业引擎包结构:
   /industry_engines
     /machinery_b2b_us
       - icp_template.json（采购委员会模板）
       - content_calendar.json（内容日历，何时发什么类型内容）
       - competitor_list.csv（预研究的竞品列表）
       - keyword_bank.csv（高价值关键词库）
       - trust_signals.md（该行业买家最看重的信任信号）
       - trae_workflows/（预配置的Trae工作流，一键导入）
   
   新客户Onboarding流程:
   1. 选择行业引擎包（如"machinery_b2b_us"）
   2. 一键导入到客户专属工作区
   3. 仅需调整3个参数:
      - 客户产品（替换产品名/USP）
      - 客户品牌（替换Logo/色彩）
      - 客户特殊要求（如禁用词）
   4. 15分钟完成配置（vs 传统的2-3天）

3. 模板迭代的数据驱动流程
   
   资产迭代周期（每月第一周）:
   
   输入:
   - 上月所有内容的表现数据（从 Metrics 表提取）
   - 客户反馈（从门户的"结构化反馈"提取）
   
   执行:
   1. 识别表现最好的 Top 3 模板:
      - SEO 文章: 哪篇带来的自然流量最多？
      - 社媒帖子: 哪条的互动率最高？
      - 短视频: 哪条的完播率最高？
   
   2. 分析成功要素:
      - 标题/开头的 Hook
      - 内容结构（长度/小节划分）
      - 视觉元素（图片/视频风格）
      - CTA 的位置和文案
   
   3. 提取为"最佳实践"，更新到模板库
      - 在原模板基础上创建v+1版本
      - 在变更日志中记录优化点
      - 标注"推荐使用v2.0，v1.0将在3个月后废弃"
   
   4. 识别表现最差的 Bottom 3 模板:
      - 跳出率 > 80% 的 SEO 文章
      - 互动率 < 1% 的社媒帖子
      - 观看时长 < 10 秒的短视频
   
   5. 分析失败原因:
      - 是否与 ICP 不匹配？
      - 是否有语法/事实错误？
      - 是否 CTA 不清晰？
   
   6. 设计 A/B 测试:
      - 用 Claude 生成 2 个优化版本
      - 小流量测试（如 20% 的流量）
      - 2 周后对比数据，选择胜出版本
   
   输出:
   - 《月度模板优化报告》
   - 更新后的模板库（版本号 +1）
   - 下月的 A/B 测试计划
   
   关键: 每个成功动作自动沉淀，避免重复造轮子

4. 知识库的权限分级
   
   问题: 所有客户看到相同的模板 → 同质化 → 竞争对手也可能是我们客户
   
   解决方案:
   - 通用模板: 所有客户可见（如"SEO文章基础结构"）
   - 行业专属模板: 仅该行业客户可见（如"机械行业的技术白皮书模板"）
   - 客户专属优化: 仅该客户可见（如"客户A的爆款视频模板"）
   
   实施: 在Airtable的Templates表中增加"可见性"字段
```

**2. 素材版权与合规管理（B2C更敏感）**

```yaml
问题背景:
  使用未授权素材 → 版权投诉 → 账号封禁 → 客户损失

素材版权管理系统:

1. 素材来源分级管理
   
   绿色素材（100%安全，优先使用）:
   - 客户自己拍摄的照片/视频
   - 客户自己设计的图表/Logo
   - 免费商用素材库（标注来源）:
     * 图片: Unsplash / Pexels / Pixabay
     * 视频: Pexels Videos / Videvo
     * 音乐: YouTube Audio Library / Epidemic Sound（需订阅）
   - AI生成的素材（SORA/NANOBANANA）
   
   黄色素材（需审核，谨慎使用）:
   - 竞品网站的产品图（仅用于对比，需加disclaimer）
   - 行业通用图（如"工厂生产线"，从付费素材库购买）
   - 客户提供的"客户案例照片"（需确认已获授权）
   
   红色素材（禁止使用）:
   - 直接截图竞品网站
   - 未经授权的名人照片
   - 有明显品牌Logo的第三方产品（如iPhone作为道具）
   - 带明显肖像的照片（未签署肖像权授权）

2. 肖像权管理（B2C视频尤其重要）
   
   场景1: TikTok视频中出现客户工厂员工
   - 必须: 每个出镜员工签署《肖像权授权书》
   - 内容: "授权将本人肖像用于公司营销推广，包括但不限于社交媒体、网站、广告"
   - 期限: 建议授权期3年
   - 补偿: 可给予小额补偿（如¥100-500/次）
   
   场景2: 客户证言视频中出现客户公司的人
   - 必须: 客户公司的书面授权（邮件确认即可）
   - 内容: 明确授权使用该证言视频用于营销
   - 保存: 截图邮件，与视频文件一起归档
   
   场景3: 使用模特/演员
   - 必须: 与模特签署商业拍摄合同
   - 明确: 使用范围（地域/平台/期限）
   - 费用: 一般¥500-2000/天（根据使用范围）

3. 素材归档与溯源系统
   
   在Airtable新增 `Media_Assets` 表:
   | 字段 | 说明 | 示例 |
   |------|------|------|
   | 素材ID | 唯一标识 | IMG_20250315_001 |
   | 素材类型 | 图片/视频/音频 | 图片 |
   | 来源 | 客户拍摄/AI生成/素材库 | 客户拍摄 |
   | 来源详情 | 具体网站/工具 | 客户工厂-生产线实拍 |
   | 授权状态 | 已授权/待授权/无需授权 | 已授权 |
   | 授权文件 | 附件链接 | [肖像权授权书.pdf] |
   | 使用限制 | 地域/平台/期限 | 全球/所有平台/3年 |
   | 首次使用日期 | YYYY-MM-DD | 2025-03-15 |
   | 使用记录 | 用于哪些内容 | TikTok视频#123, LinkedIn帖子#456 |
   
   工作流:
   1. 每次使用素材前，检查 `Media_Assets` 表
   2. 如素材不存在 → 触发"素材审核流程"（人工确认来源+授权）
   3. 如授权状态="待授权" → 暂停使用，推送飞书提醒
   4. 只有"已授权"或"无需授权"的素材可用于内容生产

4. 音乐版权管理（短视频必备）
   
   问题: TikTok/YouTube对音乐版权极其敏感
   
   解决方案:
   - 优先使用平台音乐库:
     * TikTok: 平台内置音乐（100%安全）
     * YouTube: YouTube Audio Library（免费，无版权问题）
   - 如需特定音乐:
     * 订阅Epidemic Sound（¥200/月，无限商用）
     * 或Artlist（¥300/月）
   - 禁止使用:
     * 从网易云/QQ音乐下载的流行歌曲
     * 未明确标注"商用授权"的音乐

5. 版权侵权应急预案
   
   触发: 收到版权投诉通知（平台/律师函）
   
   执行步骤:
   1. 立即下架相关内容（防止扩大影响）
   2. 飞书紧急通知@客户@法务顾问
   3. 调取 `Media_Assets` 表记录（证明来源）
   4. 分析责任方:
      - 如是客户提供素材但未告知有版权问题 → 客户责任
      - 如是中台使用了红色素材 → 中台责任，立即整改+赔偿
   5. 与权利方沟通（道歉+删除+协商赔偿）
   6. 复盘并更新素材审核流程（防止再犯）

Onboarding检查点（强制）:
- [ ] 客户已签署《素材使用授权协议》（授权中台使用其提供的所有素材）
- [ ] 客户已提供至少5张"绿色素材"（自己拍摄的工厂/产品照片）
- [ ] 如视频中有员工出镜，已签署《肖像权授权书》
- [ ] 已订阅至少1个音乐版权服务（Epidemic Sound/Artlist）
- [ ] 运营人员已培训"素材审核SOP"（知道什么能用、什么不能用）
```

**3. 多Agent工作流的透明度与质量控制**

```yaml
问题背景:
  多Agent漏斗不透明 → 产出数量化（每天生成10条内容）
  → 质量不可控（其中5条是垃圾）→ 客户不满

透明度与质量控制系统:

1. Agent工作流可视化（在客户门户展示）
   
   每个内容的"生命周期看板":
   
   ┌──────────────────────────────────────────────────────┐
   │ 内容ID: SEO_20250315_001                              │
   │ 类型: SEO文章                                         │
   │ 主题: How to Choose Reliable Pump Supplier            │
   ├──────────────────────────────────────────────────────┤
   │ ✅ Step 1: 需求分析（Agent: 策略分析器）              │
   │    输入: ICP + 竞品动态 + 关键词                      │
   │    输出: 内容策略建议                                 │
   │    耗时: 30秒                                         │
   │                                                      │
   │ ✅ Step 2: 内容生成（Agent: Claude）                  │
   │    输入: 策略建议 + 模板v2.0                          │
   │    输出: 2800词文章                                   │
   │    耗时: 45秒                                         │
   │    成本: ¥3.2                                         │
   │                                                      │
   │ ✅ Step 3: AI预审（Agent: 质量检查器）                │
   │    评分: 85/100                                       │
   │    - 事实准确度: 18/20 ✅                             │
   │    - 品牌调性: 17/20 ✅                               │
   │    - 合规风险: 20/20 ✅                               │
   │    - 本地化质量: 15/20 ⚠️ (有2处语法问题)            │
   │    - 可操作性: 15/20 ⚠️ (CTA不够明确)                │
   │                                                      │
   │ 🔄 Step 4: 人工审核（等待中...）                      │
   │    分配给: 运营专员-张三                              │
   │    预计: 20分钟内处理                                 │
   │                                                      │
   │ ⏸️ Step 5: 发布（待审核通过）                         │
   └──────────────────────────────────────────────────────┘
   
   客户可以点击任一步骤，查看详细输入输出

2. 质量控制的三道防线
   
   第一道: Agent自检（AI预审）
   - 评分标准: 5维评分卡（已有）
   - 阈值: ≥80分才能进入人工审核
   - 不合格处理: 自动重新生成（最多3次），若仍不合格则转人工
   
   第二道: 人工审核（运营专员）
   - 审核清单:
     ✓ AI预审的扣分项是否真的有问题？
     ✓ 内容是否符合客户品牌调性？
     ✓ 是否有明显的事实错误或逻辑漏洞？
     ✓ CTA是否清晰？
   - 决策:
     * 通过 → 进入发布队列
     * 退回 → 填写"具体修改建议"（结构化），重新生成
     * 升级 → 复杂问题，转给高级运营或客户成功经理
   
   第三道: 客户终审（可选，白银/黄金包）
   - 客户可在飞书收到"待审核"通知
   - 快速预览（前200字 + 评分卡）
   - 如有异议，可在发布前拦截

3. 产出质量的量化监控
   
   每日质量报告（自动生成，推送给中台负责人）:
   
   ```
   质量日报 | 2025-03-15
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   总产出: 25条内容
   
   质量分布:
   • AI预审通过率: 76% (19/25)
     - 未通过原因: 
       * 4条: 本地化质量差（语法错误）
       * 2条: 事实准确度低（数据无来源）
   
   • 人工审核通过率: 84% (16/19)
     - 退回原因:
       * 2条: 品牌调性不符（过于硬核）
       * 1条: CTA不清晰
   
   • 客户终审通过率: 94% (15/16)
     - 退回原因:
       * 1条: 客户要求调整某个说法
   
   • 最终发布率: 60% (15/25)
   
   效率分析:
   • 平均生成时间: 1.2分钟/条
   • 平均审核时间: 18分钟/条
   • 平均返工次数: 1.3次
   
   改进建议:
   1. 本地化质量问题频发 → 建议优化Claude的"语法检查"提示词
   2. 品牌调性不符 → 建议与客户A重新确认品牌手册
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```
   
   关键指标的红线:
   - AI预审通过率 < 60% → 说明模型或提示词有问题，暂停产出并优化
   - 人工审核退回率 > 30% → 说明AI预审标准过松，需提高阈值
   - 客户终审退回率 > 20% → 说明与客户沟通不足，需重新对齐预期

4. Agent决策的可解释性
   
   问题: Agent做出的策略建议（如"暂停TikTok"），客户问"为什么"，无法解释
   
   解决方案: 强制Agent输出"决策依据"
   
   示例（战略动态调整）:
   ```json
   {
     "决策": "建议暂停TikTok投放",
     "置信度": 85%,
     "决策依据": [
       {
         "事实1": "过去30天TikTok带来的50个MQL中，仅2个转化为SQL（转化率4%）",
         "数据来源": "Airtable Metrics表，记录ID: M123-M172"
       },
       {
         "事实2": "TikTok的CPL为¥200，但SQL成本高达¥5000（行业基准为¥1500）",
         "数据来源": "Cost Ledger表 + Industry Benchmarks表"
       },
       {
         "事实3": "用户反馈分析显示，TikTok线索多为'信息收集'阶段，无近期购买计划",
         "数据来源": "销售团队标记的Lead_Quality字段，C级占比80%"
       }
     ],
     "替代方案": "将TikTok预算转投GEO优化（ROI 6.5:1 vs TikTok的0:1）"
   }
   ```
   
   客户看到的不是"AI建议暂停"，而是"基于这3个事实，AI建议暂停，你同意吗？"

5. 防止"数量陷阱"的机制
   
   问题: 系统被要求"每天生成10条内容" → 为了数量牺牲质量
   
   解决方案: KPI调整
   - 错误KPI: 每日内容产出量
   - 正确KPI: 
     * 每日"发布"量（经过审核的）
     * 平均质量评分
     * 客户满意度（通过门户反馈）
   
   合同约定（避免纠纷）:
   "中台承诺每周产出≥15条内容进入审核队列，其中≥10条质量评分≥80分。
    最终发布数量由客户审核决定，中台不对客户退回的内容负责（除非是明显的质量问题）。"
```

**4. 售后闭环：MQL→SQL→订单的可见性**

```yaml
问题背景:
  客户交付预期不清晰 → 纠缠在"粉丝数/播放量"
  → 忽视真正重要的"合格线索"
  → 看不到MQL→SQL→订单，难以迭代ICP与内容

售后闭环系统设计:

1. 交付预期的明确化（写入合同）
   
   错误合同条款:
   "中台负责提升客户的社交媒体影响力和网站流量"
   → 太模糊，客户可能期待"涨粉10万"
   
   正确合同条款:
   "中台以'合格线索（MQL）'为核心交付物，具体承诺如下:
   
   青铜包:
   - 每月产出 ≥15个MQL（定义见附件A）
   - MQL来源: SEO自然流量 + 微站表单提交
   - 不承诺社交媒体粉丝数（粉丝数不等于购买意向）
   
   白银包:
   - 每月产出 ≥40个MQL
   - 其中 ≥10%为A级线索（有明确需求+预算+时间线）
   - MQL来源: SEO + GEO + LinkedIn品牌建设
   
   黄金包:
   - 每月产出 ≥80个MQL
   - 其中 ≥20%为A级线索
   - 提供MQL→SQL转化支持（销售话术建议、异议处理指南）
   
   MQL定义（附件A）:
   - 主动提交询盘表单，且填写完整
   - 或，主动回复邮件/私信，表达购买意向
   - 或，在社交媒体评论中询问产品细节/价格
   
   排除: 
   - 仅点赞/关注，无实质互动
   - 询问与产品无关的问题
   - 明确表示'仅信息收集，无购买计划'
   "

2. 线索质量分级系统（在Airtable的Leads表）
   
   字段设计:
   | 字段 | 类型 | 说明 | 示例 |
   |------|------|------|------|
   | Lead_ID | 文本 | 唯一标识 | L20250315001 |
   | 来源 | 单选 | SEO/GEO/LinkedIn/TikTok/邮件 | SEO |
   | 提交时间 | 日期时间 | YYYY-MM-DD HH:MM | 2025-03-15 14:30 |
   | 联系信息 | 文本 | 邮箱/手机/WhatsApp | john@example.com |
   | 公司信息 | 文本 | 公司名/行业/规模 | ABC Corp, 制造业, 50-200人 |
   | 询盘内容 | 长文本 | 客户的原始询盘 | "I need 500 units of pump X" |
   | 质量等级 | 单选 | A/B/C | A |
   | 等级依据 | 长文本 | 为什么是A级 | "明确数量+预算$50k+时间线Q2" |
   | 分配给 | 单选 | 销售人员姓名 | 张三 |
   | 跟进状态 | 单选 | 待跟进/跟进中/已报价/赢单/输单 | 已报价 |
   | SQL转化 | 复选框 | 是否转为销售合格线索 | ☑ |
   | 订单金额 | 数字 | 实际成交金额（USD） | 45000 |
   | 输单原因 | 长文本 | 如输单，原因是什么 | "价格比竞品高15%" |
   
   权限设计:
   - 中台运营: 可创建Lead，标记质量等级（基于询盘内容）
   - 客户销售: 可查看Lead，更新跟进状态、SQL转化、订单金额
   - 双方可见: 所有数据实时同步，无信息孤岛

3. 售后闭环的可视化（漏斗分析）
   
   在客户门户的"业绩看板"中展示:
   
   ```
   本月营销漏斗 | 2025年3月
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   
   曝光量: 50,000 （SEO 30k, LinkedIn 15k, GEO 5k）
        ↓ 2% 点击率
   网站访问: 1,000
        ↓ 5% 表单提交率
   MQL: 50
        ↓ 30% SQL转化率（行业基准25%，我们表现优秀✅）
   SQL: 15
        ↓ 40% 赢单率（行业基准30%，我们表现优秀✅）
   成交订单: 6
        ↓
   总成交额: $180,000
   
   关键洞察:
   1. MQL→SQL转化率高于行业基准 → 说明ICP精准
   2. 但MQL数量仅50，距离目标80还有差距 
      → 建议增加GEO内容投入（GEO线索质量最高）
   3. 输单的主要原因: "价格高于竞品"（4/9）
      → 建议在内容中强化"性价比"而非"低价"
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```

4. 反向迭代机制（从订单回溯优化）
   
   触发: 每获得5个新订单（或每月1次）
   
   执行步骤:
   1. 分析"赢单线索"的共性
      - 从Leads表筛选"订单金额>0"的记录
      - Claude分析这些线索的特征:
        * 主要来自哪个渠道？（SEO 40%, GEO 30%, 邮件 20%...）
        * 公司规模？（50-200人占60%）
        * 行业？（食品加工占40%）
        * 询盘时的关键词？（"reliable supplier" 出现频率最高）
   
   2. 对比当前ICP，发现偏差
      - 当前ICP假设: 目标客户是"大型制造企业（500+人）"
      - 实际赢单: 60%是"中型企业（50-200人）"
      - 结论: ICP假设错误，需调整
   
   3. 更新ICP画像
      - 在Personas表中标注"已验证"
      - 新增ICP: "中型食品加工企业，50-200人，关注供应商可靠性"
   
   4. 调整内容策略
      - SEO关键词: 从"industrial pump for large factory"
        → 改为"reliable pump supplier for food processing"
      - 案例研究: 多展示中型企业的成功案例
      - LinkedIn目标受众: 调整为50-200人规模的公司
   
   5. 2周后复测
      - 观察新策略下的MQL质量是否提升
      - SQL转化率是否提升

5. 输单分析与改进（学习失败）
   
   触发: 每输掉1个订单（SQL→输单）
   
   执行步骤:
   1. 销售团队在Leads表填写"输单原因"（必填）
   
   2. 每月汇总输单原因（Claude自动分类）:
      ```
      输单原因分析 | 2025年3月
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      总输单数: 9
      
      原因分布:
      1. 价格高于竞品: 4次（44%）
      2. 交期无法满足: 2次（22%）
      3. 产品功能不符: 2次（22%）
      4. 选择了本地供应商: 1次（11%）
      
      改进建议:
      • 价格问题 → 内容策略:
        - 在SEO文章中增加"TCO（总拥有成本）对比"
        - 强调"虽然单价略高，但质量稳定，返修率低"
        - 案例: "客户B选择低价竞品，3个月后因故障损失$10k，最终转用我们"
      
      • 交期问题 → 能力建设:
        - 与工厂沟通，是否可建立"库存备货"机制
        - 如不行，在内容中明确说明交期（避免错误预期）
      
      • 功能问题 → ICP优化:
        - 这2个客户需要"特殊定制功能"，不在我们标准产品范围
        - 建议: 在表单中增加"需求预筛选"（需要定制功能的直接提示"暂不支持"）
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      ```
   
   3. 将改进建议转化为具体行动
      - 更新内容模板（增加TCO对比章节）
      - 更新表单（增加需求预筛选）
      - 与工厂沟通能力提升（如交期）

6. 月度业绩回顾会议（客户+中台）
   
   议程:
   1. 漏斗数据回顾（15分钟）
      - 展示本月漏斗（曝光→MQL→SQL→订单）
      - 对比上月与目标
   
   2. 赢单案例分析（10分钟）
      - 分享最成功的1-2个案例
      - 提取可复用的策略
   
   3. 输单案例分析（10分钟）
      - 讨论主要输单原因
      - 确认改进措施
   
   4. ICP与内容策略调整（15分钟）
      - 基于赢单/输单数据，是否需要调整ICP？
      - 下月内容重点是什么？
   
   5. 预算再平衡（10分钟）
      - 根据渠道ROI，调整下月预算分配
   
   会议输出:
   - 《月度业绩回顾报告》（PDF，含漏斗图+改进措施）
   - 下月行动计划（3-5个重点任务）

Onboarding检查点（启动前）:
- [ ] 合同中已明确"MQL定义"和"月度交付目标"
- [ ] Airtable的Leads表已创建，客户销售团队已获得访问权限
- [ ] 客户销售团队已培训"如何标记Lead质量等级和跟进状态"
- [ ] 约定月度业绩回顾会议时间（如每月第一个周五）
- [ ] 明确"如MQL数量未达标，如何处理"（如退还部分服务费/延长服务）
```

```yaml
成本台账审计（季度）:
  检查内容:
  1. 是否所有 API 调用都有记录？
     - 抽查 Cost Ledger 表，确保无遗漏
  2. 成本数据是否与供应商账单一致？
     - 对比 Anthropic/OpenAI/SORA 的月度账单
  3. 是否有异常高成本的调用？
     - 如某次 Claude 调用花费 $50（可能是提示词过长）
  
  整改:
  - 发现遗漏 → 补录并分析原因（如某工作流未配置记账）
  - 发现不一致 → 调整公式或联系供应商核实
  - 发现异常 → 优化提示词，避免浪费
```

```yaml
合规回归测试（季度）:
  测试内容:
  1. 禁用词表是否更新？
     - 对比最新的平台规则（如 LinkedIn 新增的禁用词）
  2. 合规预审 MCP 是否有效？
     - 输入已知的违规内容（测试用例），验证是否拦截
  3. GDPR/CCPA/PIPL 检查是否覆盖？
     - 审查最近 100 篇内容，确保无遗漏
  
  整改:
  - 更新禁用词表（从平台官方获取最新列表）
  - 优化合规预审 MCP 的检测逻辑
  - 对遗漏的内容进行人工复审
```

```yaml
证据链审计（季度）:
  检查内容:
  1. 所有数据声称是否有来源标注？
     - 抽查最近 50 篇内容，确保引用格式正确
  2. 来源是否可追溯？
     - 点击来源链接，验证是否有效（未 404）
  3. 匿名化是否彻底？
     - 抽查案例研究，确保无客户可识别信息
  
  整改:
  - 补充缺失的来源标注
  - 替换失效的来源链接
  - 进一步匿名化（如将"某上海家电企业"改为"某华东家电企业"）
```

**3. 商业化延伸（可选）**

```yaml
DaaS 产品孵化（12 个月后）:
  
  前置条件:
  - 已服务 ≥ 50 个客户
  - 已积累 ≥ 6 个月的行业数据
  - 客户授权数据用于 DaaS（合同中约定）
  
  产品形态:《中国出海行业营销情报订阅》
    目标用户: VC/PE、咨询公司、行业媒体、研究机构
    
    订阅内容（月度）:
    1. 行业流量趋势报告
       - 各 GEO 的搜索热度变化（基于 GSC 聚合数据）
       - 新兴竞争对手识别（基于 SimilarWeb）
    2. 营销策略有效性排行
       - 哪类内容带来最低 CPL？（基于 Cost Ledger + Metrics）
       - 社媒平台 ROI 对比（LinkedIn vs Facebook vs YouTube）
    3. 匿名化案例库访问
       - 筛选条件: 行业/GEO/预算范围/时间段
       - 每篇案例包含: 背景→策略→执行→结果
    
    定价:
    - 基础版: ¥3,000/月（仅看报告，不能下载案例）
    - 专业版: ¥8,000/月（可下载案例，可导出数据）
    - 企业版: ¥20,000/月（可定制分析，可 API 接入）
  
  验证指标（前 6 个月）:
  - 首批订阅用户 ≥ 10 个
  - 月留存率 ≥ 80%
  - 用户反馈的"有用性"评分 ≥ 4/5
  
  若验证成功:
  - 扩大销售团队，推向更多机构
  - 开发 API，允许第三方集成
  - 探索"数据 + 咨询"的混合模式
```

---

## 4. 核心支撑文档清单

以下文档随项目同步交付，确保执行团队能"开箱即用"。

### 4.1 技术文档

| 文档名称 | 页数 | 核心内容 | 责任人 |
|---------|------|---------|--------|
| 《Airtable 表结构与公式手册》 | 15 | 6 表字段说明、关联关系、自动化公式 | 技术负责人 |
| 《PostgreSQL 敏感数据库设计》 | 10 | 表结构、加密方案、备份策略 | 技术负责人 |
| 《模型抽象层（MAL）技术规范》 | 20 | API 设计、降级逻辑、成本记录 | 技术负责人 |
| 《Trae 工作流配置指南》 | 25 | 10+ 核心工作流的配置步骤、异常处理 | 技术负责人 |
| 《Web 客户门户搭建手册》 | 12 | Softr/Stacker 配置、权限设置、组件库 | 产品负责人 |

### 4.2 运营文档

| 文档名称 | 页数 | 核心内容 | 责任人 |
|---------|------|---------|--------|
| 《AI 预审评分卡（JSON 格式）》 | 5 | 5 维评分逻辑、阈值设置、扣分规则 | 运营负责人 |
| 《人工核验 SOP》 | 8 | 审核流程、退回标准、反馈模板 | 运营负责人 |
| 《策略决策提示词库》 | 30 | 日报/周报/应急响应单等 10+ 场景的提示词 | 运营负责人 |
| 《GEO优化执行手册》 | 15 | AI搜索引擎监测方法、引用友好内容写作、知识库构建 | 运营负责人 |
| 《应急响应单模板（1 页）》 | 1 | Word/PDF 模板，可直接填写 | 运营负责人 |
| 《匿名化案例模板 + 脚本》 | 10 | 案例研究结构、一图看懂设计、60s 视频脚本 | 运营负责人 |

### 4.3 合规与法律文档

| 文档名称 | 页数 | 核心内容 | 责任人 |
|---------|------|---------|--------|
| 《数据处理协议（DPA）》 | 8 | GDPR/CCPA 合规条款、数据存储/删除规则 | 法务顾问 |
| 《高风险服务知情同意书》 | 3 | 黄金包风险说明、客户确认签字 | 法务顾问 |
| 《账号风险免责协议》 | 2 | 账号封禁责任划分、协助恢复条款 | 法务顾问 |
| 《服务终止条款》 | 5 | 数据导出权、资产归属、DaaS 处理 | 法务顾问 |
| 《禁用词表（多语言）》 | 20 | 英语/西语/法语/德语等禁用词库 | 合规负责人 |

### 4.4 客户交付文档

| 文档名称 | 页数 | 核心内容 | 交付时机 |
|---------|------|---------|---------|
| 《客户成长阶梯手册》 | 5 | 青铜→白银→黄金的升级路径、条件 | Onboarding |
| 《6 大核心指标说明》 | 3 | 每个指标的定义、目标值、优化方向 | Onboarding |
| 《月度成本报告模板》 | 2 | CPL/CPM/件单成本的计算公式、图表 | 每月初 |
| 《季度业务回顾报告》 | 10 | 3 个月的数据汇总、成功案例、下季度计划 | 每季度末 |

### 4.5 行业与地域规则库

| 文档名称 | 页数 | 核心内容 | 更新频率 |
|---------|------|---------|---------|
| 《机械制造行业引擎模板包》 | 15 | ICP 模板、内容模板、案例库 | 季度 |
| 《家电/3C 行业引擎模板包》 | 15 | 同上 | 季度 |
| 《轻工/快消品行业引擎模板包》 | 15 | 同上 | 季度 |
| 《欧美市场规则手册》 | 10 | 合规要求、文化偏好、禁用词 | 半年 |
| 《东南亚市场规则手册》 | 10 | 同上 | 半年 |
| 《中东市场规则手册》 | 10 | 同上 | 半年 |

---

## 5. 风险管理与应对

### 5.1 风险矩阵（Top 10 风险）

| 风险项 | 概率 | 影响 | 风险等级 | 应对策略 |
|--------|------|------|---------|---------|
| **1. 人才瓶颈** | 高 | 高 | 🔴 严重 | • 提前 3 个月启动"AI 流程指挥官"招聘<br>• 建立培训体系（2 周上岗）<br>• 考虑外包部分审核工作 |
| **2. Claude/SORA 突然涨价/限流** | 中 | 高 | 🟠 重要 | • 模型抽象层（MAL）已部署，可快速切换<br>• 与供应商建立企业合作，锁定价格<br>• 预留 20% 预算作为成本缓冲 |
| **3. 客户教育成本高** | 高 | 中 | 🟠 重要 | • 制作"60 秒讲清 AI 中台"视频<br>• 提供免费的"诊断报告"降低决策门槛<br>• 通过案例飞轮建立口碑传播 |
| **4. 首批客户流失** | 中 | 高 | 🟠 重要 | • Onboarding 前严格筛选（P0 客户标准）<br>• 前 3 个月派专人"白手套服务"<br>• 每月客户满意度调查，提前预警 |
| **5. 账号大规模封禁** | 低 | 高 | 🟡 关注 | • 黄金包仅白名单试点，严格频控<br>• 沙盒测试 + 账号健康度监控<br>• 购买"账号保险"（如 LinkedIn Navigator） |
| **6. 数据泄露/合规事故** | 低 | 高 | 🟡 关注 | • 敏感数据加密 + 权限分级<br>• 季度合规审计 + 渗透测试<br>• 购买网络安全保险 |
| **7. 竞争对手模仿** | 高 | 中 | 🟡 关注 | • 加速积累数据护城河（100 客户数据）<br>• 申请核心流程的软件著作权<br>• 通过案例飞轮建立品牌心智 |
| **8. Trae 平台故障** | 低 | 中 | 🟢 可控 | • 每日备份工作流配置<br>• 关键工作流设置"手动降级"预案<br>• 与 Trae 建立企业级 SLA |
| **9. 微站性能问题** | 中 | 低 | 🟢 可控 | • 使用 Vercel 全球 CDN<br>• 每周性能监控（Lighthouse CI）<br>• 预留技术资源快速优化 |
| **10. 案例飞轮启动慢** | 中 | 低 | 🟢 可控 | • 前期手动制作 3-5 个"种子案例"<br>• 降低自动触发阈值（如播放量 5 万即可）<br>• 客户授权使用案例时给予折扣激励 |

### 5.2 应急预案（3 大场景）

#### 场景 1：Claude API 大规模故障（如停服 24 小时）

```yaml
应急预案:
  T+0（故障发生）:
    - 模型网关自动切换到 GPT-4/Gemini（备用模型）
    - 通知所有客户：内容生产可能延迟 2-4 小时
  
  T+4（故障持续）:
    - 启动"人工应急模式"：
      - 日报/周报由运营团队手动撰写（使用历史模板）
      - 暂停非紧急的内容生产（如 SEO 长文）
      - 优先保障"战略动态调整"等核心功能
  
  T+24（故障仍未恢复）:
    - 召开客户沟通会，说明情况并提供补偿方案（如延长服务 1 周）
    - 考虑永久性地增加备用模型的权重（如 Claude 70% + GPT-4 30%）
  
  复盘（故障结束后 48h 内）:
    - 分析根因：是供应商问题还是我们的调用方式问题？
    - 更新模型网关：优化降级逻辑，减少切换延迟
    - 与 Anthropic 沟通：争取企业级 SLA 保障
```

#### 场景 2：某客户账号被 LinkedIn 封禁

```yaml
应急预案:
  T+0（收到客户通知）:
    - 立即暂停该客户的所有高风险动作
    - 人工复查最近 7 天的所有动作日志（Trae 审计日志）
  
  T+4:
    - 与 LinkedIn 客服联系，申请账号复查（准备证据：我们是营销工具，客户授权，无恶意行为）
    - 向客户提供《账号恢复指南》（如何申诉）
  
  T+24:
    - 若账号恢复 → 复盘根因，优化频控阈值（如从 20 次/周降至 15 次/周）
    - 若账号未恢复 → 协助客户创建新账号（但需降级至白银包，暂停主动触达）
  
  T+48:
    - 召开内部复盘会：
      - 是否有其他客户也接近风险阈值？
      - 是否需要全面调整黄金包的频控策略？
    - 更新《高风险服务知情同意书》，强化风险披露
```

#### 场景 3：成本突然暴增（如某客户单月 API 成本超预算 3 倍）

```yaml
应急预案:
  T+0（成本告警触发）:
    - 立即暂停该客户的所有自动化工作流
    - 人工复查 Cost Ledger 表：哪些调用异常高？
  
  T+2:
    - 分析根因：
      - 是提示词过长（导致 token 数暴增）？
      - 是某工作流陷入死循环（重复调用）？
      - 是 SORA 生成了过长的视频（成本高昂）？
  
  T+4:
    - 优化措施：
      - 若是提示词问题 → 精简提示词，减少不必要的上下文
      - 若是工作流问题 → 修复 bug，增加"每日调用次数上限"保护
      - 若是视频问题 → 限制视频时长（如最长 90 秒）
    - 与客户沟通：
      - 说明情况，协商成本分摊方案（如超出部分客户承担 50%）
  
  T+7:
    - 为所有客户增加"成本预警"功能：
      - 当月 API 成本达到预算的 80% → 黄色预警（邮件通知）
      - 当月 API 成本达到预算的 100% → 红色预警（自动暂停部分工作流，需人工确认恢复）
```

---

## 6. 附录

### 6.1 首批 10 个种子客户选择清单

**必须满足的条件（全部打勾才能入选）：**

- [ ] 年营收 5000 万 - 5 亿人民币
- [ ] 已有 Alibaba 国际站，年出口额 ≥ 500 万美元
- [ ] 老板/销售总监直接参与决策（决策链短）
- [ ] 有明确的"痛点"（如询盘质量差、获客成本高、依赖展会）
- [ ] 愿意签署 6 个月合约（给予我们足够的验证周期）
- [ ] 愿意配合提供数据（如 GA4 访问权限、过往订单数据用于 ICP 构建）
- [ ] 能接受"3 个月见效"的预期（避免期望过高）
- [ ] 有专人对接（客户方至少 1 人负责跟进）

**加分项（优先级排序）：**

1. 已有独立站但效果不佳（我们可以"起死回生"，案例更有说服力）
2. 产品有清晰的 SKU 和标准化参数（便于内容生产）
3. 愿意成为"标杆客户"（授权我们使用案例，给予折扣补偿）
4. 老板/销售总监本人懂英语（沟通成本低）
5. 公司文化开放，愿意尝试新工具（减少内部阻力）

**排除项（有任一项则不入选）：**

- 非标定制化产品（如大型工程机械，每个订单都不同）
- 高度依赖线下渠道（如传统外贸公司，不重视线上）
- 要求 100% 中文服务（产品设计为多语言）
- 预算 < ¥1.5 万/月（无法覆盖成本）
- 有"快速见效"的不合理预期（如 1 个月要看到 ROI）

---

### 6.2 18 个月财务模型（精益创业版）

#### 核心商业模式：真人+系统+客户的三方协作

```yaml
模式设计哲学:
  中台不是"代替客户做营销"，而是"武装客户做营销"
  
  ┌─────────────────────────────────────────────────────────┐
  │  传统外包模式（重人力，难规模化）                        │
  │  外包公司: 10人团队 → 服务1个客户 → ¥10万/月           │
  │  问题: 人力成本高，无法规模化                            │
  └─────────────────────────────────────────────────────────┘
                           ↓ 颠覆
  ┌─────────────────────────────────────────────────────────┐
  │  AI中台模式（轻人力，可规模化）                          │
  │  中台: 1人 + AI系统 → 服务10个客户 → ¥30万/月          │
  │  关键: 系统承担80%重复性工作，人负责战略与质量把关       │
  └─────────────────────────────────────────────────────────┘

三方分工:
  
  🤖 AI系统（80%工作量）:
  • 行业资讯抓取与总结（日报/周报）
  • 内容生成（SEO/GEO/社媒/短视频脚本）
  • 竞品监测与数据分析
  • 成本记录与ROI计算
  • 异常检测与应急响应单生成
  
  👨‍💼 中台真人（15%工作量）:
  • 客户Onboarding（ICP梳理/战略规划）
  • 内容质量把关（AI预审后的最终审核）
  • 战略决策支持（应急响应单的方案讨论）
  • 月度策略会议（预算再平衡/实验计划）
  • 客户成功管理（续费/升级/问题解决）
  
  🏭 客户工厂（5%工作量）:
  • 提供产品信息与素材（照片/视频/认证文件）
  • 审核与确认内容（通过飞书，几分钟完成）
  • TikTok拍摄任务（如有B2C需求，每周1-2小时）
  • 执行发布（如选择手动发布模式）

这种模式下，1个人可以服务10-15个客户（前提是系统足够稳定）
```

#### 团队扩张路径（18个月）

```yaml
M1-M3（验证期）: 1人（创始人）
- 角色: All-in-One（技术配置+运营+销售+客户成功）
- 服务客户数: 3-5个（精挑细选的种子客户）
- 工作重点: 跑通流程，修复系统Bug，收集反馈

M4-M6（扩张期1）: 2人（创始人 + 运营专员）
- 新增: 1名运营专员（负责内容审核+客户沟通）
- 服务客户数: 6-12个
- 工作重点: 标准化SOP，创始人逐步从日常运营中抽身

M7-M9（扩张期2）: 3人（创始人 + 2名运营专员）
- 新增: 1名运营专员（分担客户成功工作）
- 服务客户数: 13-20个
- 工作重点: 创始人专注战略、大客户与融资

M10-M12（规模化期1）: 5人（创始人 + 3运营 + 1技术）
- 新增: 1名技术人员（系统维护+模型优化）+ 1名运营
- 服务客户数: 21-35个
- 工作重点: 系统自动化程度提升至90%

M13-M18（规模化期2）: 7人（创始人 + 4运营 + 2技术）
- 新增: 1名高级运营（负责大客户）+ 1名技术
- 服务客户数: 36-60个
- 工作重点: 启动DaaS产品孵化，准备A轮融资

关键假设:
- 1个运营专员可服务10个客户（前提是系统稳定）
- 技术人员主要负责系统优化，不直接服务客户
- 创始人逐步转向战略+大客户+融资（M6后日常运营占比<30%）
```

#### 财务假设（保守版）

```yaml
收入假设:
- 客户分布: 青铜40%（¥2万/月），白银40%（¥5万/月），黄金20%（¥12万/月）
  * 注: 考虑GEO+TikTok服务，白银和黄金包客单价更高
- 获客成本（CAC）: 
  * M1-M6: ¥3万/客户（案例少，主要靠创始人BD）
  * M7-M18: ¥1.5万/客户（有案例飞轮，获客效率提升）
- 流失率: 月均8%（比原方案略高，因为早期产品不完善）
- 新增客户节奏:
  * M1-M3: 1-2个/月（谨慎起步）
  * M4-M6: 2-3个/月（有初步案例）
  * M7-M12: 3-4个/月（案例飞轮启动）
  * M13-M18: 4-5个/月（规模化获客）

成本假设:
- 人力成本: 
  * 创始人: ¥0（前12个月不拿工资，全投入股权）
  * 运营专员: ¥1.2万/月（含五险一金）
  * 技术人员: ¥2万/月（含五险一金）
- 固定成本: 
  * M1-M6: ¥1万/月（Trae/Claude API/工具订阅）
  * M7-M18: ¥2万/月（客户增加，API调用增多）
- 可变成本（API）: 
  * 青铜包: ¥0.3万/客户/月
  * 白银包: ¥0.5万/客户/月
  * 黄金包: ¥0.8万/客户/月
```

#### 收入预测（18个月）

| 月份 | 新增客户 | 流失客户 | 累计客户 | 客户结构 | 月收入（万元）| 累计收入（万元） |
|------|---------|---------|---------|---------|--------------|----------------|
| M1 | 1 | 0 | 1 | 1青铜 | 2 | 2 |
| M2 | 2 | 0 | 3 | 2青铜+1白银 | 9 | 11 |
| M3 | 2 | 0 | 5 | 3青铜+2白银 | 16 | 27 |
| M4 | 2 | 0 | 7 | 3青铜+3白银+1黄金 | 27 | 54 |
| M5 | 3 | 1 | 9 | 4青铜+4白银+1黄金 | 34 | 88 |
| M6 | 3 | 1 | 11 | 4青铜+5白银+2黄金 | 44 | 132 |
| M7 | 3 | 1 | 13 | 5青铜+6白银+2黄金 | 52 | 184 |
| M8 | 4 | 1 | 16 | 6青铜+7白银+3黄金 | 65 | 249 |
| M9 | 4 | 1 | 19 | 7青铜+9白银+3黄金 | 78 | 327 |
| M10 | 4 | 2 | 21 | 8青铜+10白银+3黄金 | 86 | 413 |
| M11 | 4 | 2 | 23 | 9青铜+10白银+4黄金 | 96 | 509 |
| M12 | 4 | 2 | 25 | 10青铜+11白银+4黄金 | 104 | 613 |
| M13 | 4 | 2 | 27 | 10青铜+12白银+5黄金 | 114 | 727 |
| M14 | 5 | 2 | 30 | 12青铜+13白银+5黄金 | 127 | 854 |
| M15 | 5 | 2 | 33 | 13青铜+14白银+6黄金 | 141 | 995 |
| M16 | 5 | 3 | 35 | 14青铜+15白银+6黄金 | 148 | 1,143 |
| M17 | 5 | 3 | 37 | 14青铜+16白银+7黄金 | 160 | 1,303 |
| M18 | 5 | 3 | 39 | 15青铜+17白银+7黄金 | 169 | 1,472 |

#### 成本预测（18个月）

| 月份 | 人力成本 | 固定成本 | 获客成本 | 可变成本（API） | 总成本 | 累计成本 |
|------|---------|---------|---------|---------------|--------|---------|
| M1 | 0 | 1 | 3 | 0.3 | 4.3 | 4.3 |
| M2 | 0 | 1 | 6 | 1.1 | 8.1 | 12.4 |
| M3 | 0 | 1 | 6 | 1.9 | 8.9 | 21.3 |
| M4 | 1.2 | 1 | 6 | 3.0 | 11.2 | 32.5 |
| M5 | 1.2 | 1 | 9 | 3.8 | 15.0 | 47.5 |
| M6 | 1.2 | 1 | 9 | 5.0 | 16.2 | 63.7 |
| M7 | 2.4 | 2 | 4.5 | 6.0 | 14.9 | 78.6 |
| M8 | 2.4 | 2 | 6 | 7.5 | 17.9 | 96.5 |
| M9 | 2.4 | 2 | 6 | 9.0 | 19.4 | 115.9 |
| M10 | 4.4 | 2 | 6 | 10.0 | 22.4 | 138.3 |
| M11 | 4.4 | 2 | 6 | 11.0 | 23.4 | 161.7 |
| M12 | 4.4 | 2 | 6 | 12.5 | 24.9 | 186.6 |
| M13 | 6.4 | 2 | 6 | 13.5 | 27.9 | 214.5 |
| M14 | 6.4 | 2 | 7.5 | 15.0 | 30.9 | 245.4 |
| M15 | 6.4 | 2 | 7.5 | 16.5 | 32.4 | 277.8 |
| M16 | 6.4 | 2 | 7.5 | 17.5 | 33.4 | 311.2 |
| M17 | 6.4 | 2 | 7.5 | 19.0 | 34.9 | 346.1 |
| M18 | 6.4 | 2 | 7.5 | 20.0 | 35.9 | 382.0 |

#### 关键财务指标

| 指标 | M6 | M12 | M18 | 说明 |
|------|----|----|-----|------|
| 累计收入 | 13.2万 | 61.3万 | 147.2万 | GEO+TikTok服务使客单价提升 |
| 累计成本 | 6.37万 | 18.66万 | 38.2万 | 精益团队，成本可控 |
| 累计利润 | **+6.83万** | **+42.64万** | **+109万** | M1即开始盈利（创始人不拿工资） |
| 累计客户数 | 11 | 25 | 39 | 稳健增长 |
| 单客户月均贡献 | 4万 | 4.16万 | 4.33万 | 随着高价值客户占比提升而增长 |
| 月度盈亏平衡点 | **M1** | - | - | 第1个月即盈利（创始人不拿工资） |
| 实际盈亏平衡点 | - | **M13** | - | 创始人开始拿工资后的真实盈亏平衡点 |
| 单位经济模型（LTV/CAC） | - | **3.2:1** | **4.5:1** | 健康且持续改善 |

#### 关键洞察与风险

**✅ 可行性分析:**
1. **M1即开始盈利**（创始人不拿工资情况下）
   - 第1个客户收入¥2万，成本仅¥4.3万（含获客成本）
   - M3累计盈利，现金流为正

2. **M6账面利润¥6.83万，足以支撑继续扩张**
   - 可招聘第1名运营专员
   - 现金储备可覆盖3个月运营

3. **M12累计利润¥42.64万，业务模式跑通**
   - 可招聘技术人员优化系统
   - 创始人可考虑开始拿基础工资（¥2万/月）

4. **M18累计利润¥109万，可启动A轮融资**
   - 有39个付费客户的验证
   - 毛利率约72%（健康的SaaS指标）
   - 可启动DaaS产品孵化

**⚠️ 关键风险:**
1. **创始人能力瓶颈**（M1-M6最大风险）
   - 必须同时具备：技术能力（配置系统）+ 运营能力（内容审核）+ 销售能力（BD客户）
   - 缓解：M4开始招运营专员分担，创始人专注战略

2. **早期流失率可能高于8%**
   - 前3个月产品不完善，客户体验差
   - 缓解：精选3-5个种子客户（有耐心+愿意共创），给予折扣（¥1.5万/月起）

3. **获客难度被低估**
   - 前6个月没有案例，靠创始人人脉+BD
   - 缓解：M1-M3每个客户都要刻意打造为"标杆案例"，快速启动案例飞轮

4. **系统稳定性**
   - Trae/Claude API可能故障，影响交付
   - 缓解：模型抽象层已设计自动降级，但需在M10招技术人员持续优化

#### 现金流预测（关键）

```yaml
初始启动资金需求: ¥10万
用途:
- 前3个月生活费（创始人）: ¥1.5万/月 × 3 = ¥4.5万
- 工具订阅（Trae/Claude等）: ¥1万/月 × 3 = ¥3万
- 首批获客成本: ¥3万 × 1客户 = ¥3万
- 应急储备: ¥2.5万

现金流转正时间点:
- M3: 累计收入¥27万 > 累计成本¥21.3万，现金流为正
- M6: 账面余额¥6.83万，可支撑招人
- M12: 账面余额¥42.64万，现金充裕

结论: ¥10万启动资金即可跑通模型（前提是创始人前12个月不拿工资或仅拿生活费）
```

#### 对比原方案的优势

| 维度 | 原方案（5人起步） | 新方案（1人起步） |
|------|------------------|------------------|
| 初始投入 | ≥¥50万（人力+工具） | ¥10万（精益创业） |
| M6盈亏 | 亏损¥10.2万 | 盈利¥6.83万 |
| M12盈亏 | 盈利¥45万 | 盈利¥42.64万 |
| 风险 | 高（前6个月烧钱快） | 低（M3即现金流为正） |
| 适用场景 | 有融资或充足自有资金 | 自力更生，无外部资金 |
| 创始人压力 | 中（有团队分担） | 高（前6个月全靠自己） |

---

### 6.3 关键术语表

| 术语 | 英文 | 定义 |
|------|------|------|
| **ICP** | Ideal Customer Profile | 理想客户画像，描述最适合我们服务的客户特征 |
| **MQL** | Marketing Qualified Lead | 营销合格线索，通过营销活动获得的潜在客户 |
| **SQL** | Sales Qualified Lead | 销售合格线索，经销售团队确认有购买意向的客户 |
| **CPL** | Cost Per Lead | 每线索成本，获取一个 MQL 所需的成本 |
| **LTV** | Lifetime Value | 客户生命周期价值，一个客户在整个合作期间带来的总营收 |
| **CAC** | Customer Acquisition Cost | 客户获取成本，获得一个新客户所需的总成本（营销+销售） |
| **LCP** | Largest Contentful Paint | 最大内容绘制，衡量网页加载速度的关键指标 |
| **FCP** | First Contentful Paint | 首次内容绘制，页面首次渲染任何内容的时间 |
| **CLS** | Cumulative Layout Shift | 累积布局偏移，衡量页面视觉稳定性的指标 |
| **MAL** | Model Abstraction Layer | 模型抽象层，统一管理多个 AI 模型的中间件 |
| **DaaS** | Data as a Service | 数据即服务，将数据产品化并订阅销售 |
| **SLA** | Service Level Agreement | 服务等级协议，明确服务标准和响应时间 |
| **GEO** | Generative Engine Optimization | 生成式搜索引擎优化，针对AI搜索引擎（如ChatGPT/Perplexity/Gemini）的内容优化 |
| **USP** | Unique Selling Proposition | 独特卖点，产品与竞品的核心差异 |
| **CTA** | Call to Action | 行动号召，引导用户采取下一步动作的按钮/文案 |

---

### 6.4 联系方式与支持

**项目负责人：**
- 姓名：[待填写]
- 邮箱：[待填写]
- 电话：[待填写]

**技术支持：**
- 工作时间：周一至周五 9:00-18:00（北京时间）
- 紧急联系：7×24 小时值班电话（仅黄金包客户）

**客户门户：**
- URL：[待填写]
- 登录方式：邮箱 + 密码（Onboarding 时提供）

**文档更新：**
- 本文档每季度更新一次
- 最新版本永远在客户门户的"帮助中心"可下载

---

**文档结束**

---

## 附录

### 附录A: Multi-Agent + MCP联动架构核心变更 ★v2.0关键升级★

本Master Plan v2.0的**最重要变化**是将原本"定时触发、各自为战"的Agents，重构为"信号驱动、上下文共享"的联动系统。

#### 核心理念对比

| 维度 | v1.0（脱节） | v2.0（联动） |
|------|------------|------------|
| **触发机制** | 定时（每天9点发LinkedIn） | 市场信号驱动（有机会才发） |
| **信息流** | Agents独立运行 | MCP作为信息总线，实时共享 |
| **内容来源** | Claude凭"想象"生成 | 从Customer Capability MCP提取真实能力 |
| **质量保证** | AI预审评分 | 事实核查（与Capability MCP对比） |
| **学习能力** | 人工月度复盘 | Performance Learning Agent 24h自动学习 |

#### 关键组件说明

**1. MCP服务器集群（4个）**

```yaml
Market Intelligence MCP:
  - 职责: 实时监测市场需求信号（Google Trends/新闻/LinkedIn/Reddit）
  - 输出: 信号流（demand_surge/policy_change/buyer_inquiry）
  - 部署: 独立服务器，24/7运行

Customer Capability MCP: ★最关键★
  - 职责: 存储客户真实供应能力（产品/库存/认证/案例/约束）
  - 用途: Agents生成内容前必须调用，确保事实准确
  - 数据来源: Onboarding访谈 + ERP同步（如可能）
  - 示例:
    GET /capability/C001
    → 返回: 库存1800台, CE认证, 德国案例2个, MOQ=100
  
  关键规则:
  - 声称"2000台现货" → 必须从inventory_status验证
  - 引用案例 → 必须检查authorized=true
  - 生成CTA → 必须体现constraints.moq
  
Competitor Intelligence MCP:
  - 职责: 监控竞品动作（新产品/促销/内容策略）
  - 用途: 竞品发布德国案例 → 我们也应发布（且突出差异化）

Performance Feedback MCP:
  - 职责: 追踪已发布内容表现（曝光/互动/线索/质量）
  - 用途: 24小时后触发Learning Agent分析成功要素
```

**2. Multi-Agent工作流（6个）**

```yaml
信号流向: 市场信号 → 机会分析 → 策略制定 → 内容生成 → 质量审核 → 发布 → 学习

Agent 1: Market Opportunity Analyzer
  - 输入: Market Intelligence MCP的信号 + Customer Capability MCP
  - 逻辑: 匹配度计算（信号与能力的交集）
  - 输出: 如机会分数>0.7 → 推送到策略队列

Agent 2: Content Strategy Agent
  - 输入: 机会分析 + 竞品动态 + 历史表现
  - 逻辑: 决定内容类型/角度/CTA
  - 输出: 详细Brief（包含"必须验证的事实"清单）

Agent 3: Content Generation Agent（Claude）
  - 输入: Brief + Customer Capability MCP + 品牌手册
  - 关键Prompt设计:
    """
    你是{客户}的内容专家。基于以下**真实市场信号**和**真实能力**生成内容:
    
    市场信号（来自Market Intelligence MCP）:
    {德国基建新闻，搜索量+32%}
    
    我们的能力（来自Customer Capability MCP，不要编造）:
    - 库存: 1800台现货
    - 认证: CE, ISO9001
    - 案例: 德国X公司-慕尼黑地铁项目
    
    要求:
    - 每个卖点必须有数据支撑（从上述能力提取）
    - 禁止: "我们是行业领导者"（空话）
    - 在末尾标注: [数据来源: Capability MCP]
    """

Agent 4: Quality Assurance Agent
  - 核心功能: 事实核查（关键）
  - 逻辑:
    提取内容中的声明 → 与Capability MCP对比 → 不符则退回重做
    示例:
    - 声称"2000台现货" → 查MCP实际1800台 → 不通过
    - 引用"德国X公司案例" → 查MCP确认authorized=true → 通过

Agent 5: Publishing Agent
  - 输入: 已审核内容 + Performance MCP（最佳发布时间）
  - 逻辑: 计算最佳时间（目标GEO的工作时段）→ 发布 → 启动监控

Agent 6: Performance Learning Agent
  - 触发: 内容发布24小时后
  - 逻辑:
    分析表现 → 提取成功要素 → 更新模板权重 → 优化ICP
    示例:
    - 发现: 60%线索来自"基建行业"（而非原假设的"制造业"）
    - 动作: 调整ICP权重, 增加"基建"相关内容
```

**3. 工具集成清单**

```yaml
核心开发工具:
  - Cursor AI: 用于编写所有Agent逻辑（Python），自动生成MCP Client代码
  - Trae: 工作流编排DSL，声明式定义Agent间数据流
  - FastMCP: MCP Server框架（Python）

API集成（必须）:
  - Claude API (Anthropic): 主力文本生成
  - GPT-4 API (OpenAI): 备选模型
  - Google Trends API: 搜索趋势监测
  - LinkedIn API: 社媒监控+发布
  - Ahrefs API: SEO竞品分析
  - SimilarWeb API: 流量分析

API集成（可选）:
  - 客户ERP API（如SAP）: 自动同步库存到Capability MCP
  - Reddit API: 采购讨论监控
  - News API: 行业新闻监测

数据库:
  - Airtable: 客户数据/ICP/内容队列
  - PostgreSQL: Capability MCP数据存储
  - Redis: 消息队列（Agents间通信）
```

**4. 可追溯性（Observability）**

v2.0的每个产出都可追溯到触发源:

```
信号ID → 机会ID → Brief ID → 内容ID → 发布ID → 表现数据

示例查询:
Q: "这篇LinkedIn文章（LI_20250315_001）为什么要发?"
A: 追溯到OPP_20250315_001 → 追溯到SIG_20250315_001
   → 原因: "德国政府宣布€500B基建计划，触发需求激增信号"

Q: "文章中说'2000台现货'是真的吗?"
A: 追溯到Content Generation Agent的Prompt
   → 调用了Capability MCP
   → 实际库存: 1800台（内容应为1800，如写2000则是Agent错误）
```

**5. 实施优先级**

```yaml
Phase 1（前2周）: 部署MCP服务器
  - Customer Capability MCP（最高优先级）
  - Market Intelligence MCP（基础监控）
  - 其他2个MCP可延后

Phase 2（第3-4周）: 重构Agents
  - 先重构Content Generation + QA（确保事实准确）
  - 再重构Opportunity Analyzer（信号驱动）
  - 最后增加Learning Agent（闭环优化）

Phase 3（第5-8周）: 全链路测试
  - 用真实客户数据测试
  - 验证可追溯性（每个输出都能追溯到输入）
  - 性能优化（响应时间<2分钟）
```

**6. 与原Master Plan的兼容性**

- **不冲突**: 阶段0-5的整体结构不变
- **局部替换**: 仅"Trae工作流配置"和"ICP构建"两个章节被重构
- **渐进式**: 可先用v1.0上线，再逐步迁移到v2.0

#### 为什么这个架构至关重要？

```yaml
问题: v1.0为什么会"脱节"?
  - 早上: 监测到"欧洲工业泵需求+32%"（好信号）
  - 下午: LinkedIn发布"我们工厂的10年历史"（与信号无关）
  - 结果: 错过热点，内容空洞，转化率低

v2.0如何解决:
  1. Market Intelligence MCP检测到信号
     → 立即推送给Opportunity Analyzer
  
  2. Opportunity Analyzer匹配客户能力
     → 发现: 客户有CE认证+1800台库存+德国案例 → 机会分数0.92
     → 决策: "这是好机会，立即生成内容"
  
  3. Strategy Agent决定策略
     → 内容角度: "强调CE认证+现货能力+德国案例"
     → CTA: "Q2项目需求? 现在预订优先交付"
  
  4. Generation Agent生成内容
     → 开头引用德国基建新闻（建立相关性）
     → 中间展示1800台现货+CE认证（从Capability MCP提取）
     → 结尾强调德国案例（已验证authorized=true）
  
  5. QA Agent核查
     → 检查: "1800台现货"是否与MCP一致 → ✅
     → 检查: "德国案例"是否授权 → ✅
     → 通过发布
  
  6. 48小时后，生成8个高质量线索
     → Learning Agent分析: 成功因素是"时效性+具体化+案例证明"
     → 更新模板库: "热点响应"模板权重+10%
  
  结果: 从"凭空编故事"变成"基于真实信号与能力的及时反应"
```

**总结一句话**:

> **"v2.0不是技术升级，而是架构重构：从'AI自己瞎编'到'AI成为市场信号与客户能力的智能翻译器'。"**

---

### 附录B: 战略补充文档

本Master Plan聚焦于"如何执行"的操作细节。对于更高层的战略选择（如规模化路径、GEO深化战略、赋能模式等），请参阅：

**《AI营销中台战略补充文档》**（Strategic_Enhancements.md）

该文档包含：
1. **GEO战略深化**：从"优化"到"设定行业标准答案"的路径
2. **GEO服务命名优化**：将"GEO"更名为"AEO"（Answer Engine Optimization），强化价值传递
3. **规模化路径选择**：直销 vs 赋能（MaaS）战略对比与混合模式
4. **增长加速策略**：渠道战略、团队优化、客户分级提升
5. **客户专属微调**：对抗模型同质化的技术方案

**建议阅读顺序**：
- 先读本Master Plan（掌握执行细节）
- 再读战略补充文档（理解战略选择）
- 根据实际情况，决定采用哪些战略建议

---

## 文档变更日志

### v2.0（2025-XX-XX）★当前版本★

**重大增强（解决10大潜在风险）**：

1. **域名与投递治理**（阶段0新增）
   - SPF/DKIM/DMARC强制配置
   - 域名预热30天机制
   - 发信限流与监控系统

2. **营销健康度诊断工具**（阶段0新增）
   - 免费诊断工具作为获客钩子
   - 自动生成专业报告
   - ROI预期: 80:1

3. **网站速度与本地化**（阶段0新增）
   - Core Web Vitals强制达标
   - 多语言/货币/时区本地化
   - GEO优化的本地化要求

4. **信任信号构建**（阶段1优化）
   - 5选4强制信任信号
   - 工厂视频拍摄清单
   - 肖像权管理SOP

5. **统一渠道归因**（阶段2优化）
   - UTM标准化与时间衰减模型
   - 加权MQL计算
   - 月度归因报告自动生成

6. **真人行为掺混**（阶段3优化）
   - 5维掺混策略
   - 频控阈值降低
   - 人工占比≥40%

7. **模板资产化治理**（持续运行新增）
   - GitHub式版本管理
   - 行业引擎包（乐高式组装）
   - 15分钟配置新客户

8. **素材版权管理**（持续运行新增）
   - 三色分级（绿/黄/红）
   - Media_Assets溯源表
   - 版权侵权应急预案

9. **多Agent透明度**（持续运行新增）
   - 工作流可视化
   - 质量三道防线
   - 决策可解释性

10. **售后闭环**（持续运行新增）
    - MQL定义写入合同
    - Leads表与质量分级
    - 赢单回溯与输单分析

**战略文档**：
- 新增《战略补充文档》（Strategic_Enhancements.md，40页）
- 包含GEO深化、规模化路径、增长加速等高级话题

**页数变化**：
- 从v1.0的120页增至v2.0的160页（主文档）
- 战略补充文档40页
- 总计约200页

---

### v1.0（2025-XX-XX）

**初始版本**：
- 完整的阶段0-5执行路线图
- MAL、Trae、客户门户技术架构
- 三档服务包设计
- OKR与财务模型

---

## 结语

这份Master Plan是一个**活文档**，会随着业务发展持续迭代。

**成功的关键不是"计划完美"，而是：**
1. **快速启动**：阶段0-1用2-4周完成，不追求完美
2. **小步快跑**：每周迭代，根据真实反馈调整
3. **数据驱动**：所有决策基于指标，而非直觉
4. **客户共创**：邀请P0客户参与产品设计
5. **长期思维**：不追求短期GMV，聚焦LTV和品牌价值

**最重要的一句话**：
> "在B2B出海营销这个领域，没有人比你更懂AI应用。你的使命是用AI重新定义游戏规则，而不是优化旧规则。"

**祝成功！🚀**

---

**文档维护者**：[待填写]  
**最后审核日期**：2025-XX-XX  
**下次审核计划**：每季度更新一次

**反馈渠道**：  
如发现文档错误或有改进建议，请通过[邮箱/飞书群]反馈。

---

**版权声明：**
本文档及相关的工作流配置、提示词库、模板资产等，知识产权归 [公司名称] 所有。未经书面授权，不得复制、分发或用于商业用途。客户有权在合同期内使用本文档中描述的服务，但不拥有底层技术资产的所有权。
