# API集成配置说明

## 🚀 真实API集成完成

MCP组件已成功集成真实的市场数据API，替换了原有的模拟数据。

## 📊 集成的API服务

### 1. Alpha Vantage API
- **用途**: 股票报价、金融市场数据
- **免费限制**: 5 calls/minute, 500 calls/day
- **注册地址**: https://www.alphavantage.co/support/#api-key
- **环境变量**: `NEXT_PUBLIC_ALPHA_VANTAGE_KEY`

### 2. NewsAPI
- **用途**: 行业新闻、实时资讯
- **免费限制**: 1000 requests/month
- **注册地址**: https://newsapi.org/register
- **环境变量**: `NEXT_PUBLIC_NEWS_API_KEY`

### 3. Polygon.io
- **用途**: 市场数据、交易信息
- **免费限制**: 5 calls/minute
- **注册地址**: https://polygon.io/
- **环境变量**: `NEXT_PUBLIC_POLYGON_KEY`

### 4. Finnhub
- **用途**: 金融数据、市场概览
- **免费限制**: 60 calls/minute
- **注册地址**: https://finnhub.io/register
- **环境变量**: `NEXT_PUBLIC_FINNHUB_KEY`

## 🔧 配置步骤

### 本地开发环境
1. 创建 `.env.local` 文件
2. 添加API密钥：
```bash
NEXT_PUBLIC_ALPHA_VANTAGE_KEY=your_alpha_vantage_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_POLYGON_KEY=your_polygon_key
NEXT_PUBLIC_FINNHUB_KEY=your_finnhub_key
```
3. 重启开发服务器：`npm run dev`

### 生产环境 (Vercel)
1. 登录 Vercel 控制台
2. 进入项目设置
3. 添加环境变量
4. 重新部署

## 🛡️ 降级机制

当API不可用时，系统会自动降级到：
- 缓存的历史数据
- 预设的行业数据
- 模拟数据作为最后备选

## 📈 功能特性

### 实时数据更新
- 每5分钟自动刷新
- 手动刷新按钮
- 缓存机制优化性能

### 智能错误处理
- API错误自动降级
- 用户友好的错误提示
- 数据状态指示器

### 性能优化
- 智能缓存策略
- 并行数据获取
- 请求去重

## 🔍 使用示例

```typescript
import { apiService } from '@/lib/api/apiService';

// 获取行业数据
const industryData = await apiService.getIndustryData('医疗设备');

// 获取新闻
const news = await apiService.getNews('新能源', 5);

// 获取实时市场数据
const realTimeData = await apiService.getRealTimeMarketData('人工智能');
```

## 📊 数据格式

### 行业数据
```typescript
interface IndustryData {
  name: string;
  marketCap: number;
  avgPrice: number;
  changePercent: number;
  volume: number;
  news: NewsItem[];
}
```

### 新闻数据
```typescript
interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}
```

## 🚨 注意事项

1. **API限制**: 注意各API的调用限制
2. **密钥安全**: 不要将API密钥提交到代码仓库
3. **错误处理**: 系统已内置降级机制
4. **缓存策略**: 合理利用缓存减少API调用

## 🔄 更新日志

- ✅ 集成Alpha Vantage API
- ✅ 集成NewsAPI
- ✅ 实现智能缓存机制
- ✅ 添加错误处理和降级
- ✅ 优化性能和用户体验
