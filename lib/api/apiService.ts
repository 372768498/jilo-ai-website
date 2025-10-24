// API服务层 - 管理数据获取和缓存
import { createMarketDataAPI, getDefaultConfig, IndustryData, StockQuote, NewsItem } from './marketData';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class APIService {
  private marketAPI: any;
  private cache: Map<string, CacheItem<any>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5分钟缓存

  constructor() {
    this.marketAPI = createMarketDataAPI(getDefaultConfig());
  }

  // 通用缓存方法
  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCachedData<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  // 获取行业数据（带缓存）
  async getIndustryData(industry: string): Promise<IndustryData> {
    const cacheKey = `industry_${industry}`;
    const cached = this.getCachedData<IndustryData>(cacheKey);
    
    if (cached) {
      console.log(`Using cached data for ${industry}`);
      return cached;
    }

    try {
      console.log(`Fetching fresh data for ${industry}`);
      const data = await this.marketAPI.getIndustryData(industry);
      this.setCachedData(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Error fetching industry data for ${industry}:`, error);
      // 返回降级数据
      return this.getFallbackIndustryData(industry);
    }
  }

  // 获取股票报价（带缓存）
  async getStockQuote(symbol: string): Promise<StockQuote | null> {
    const cacheKey = `stock_${symbol}`;
    const cached = this.getCachedData<StockQuote>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const data = await this.marketAPI.getStockQuote(symbol);
      if (data) {
        this.setCachedData(cacheKey, data, 60000); // 1分钟缓存
      }
      return data;
    } catch (error) {
      console.error(`Error fetching stock quote for ${symbol}:`, error);
      return null;
    }
  }

  // 获取新闻（带缓存）
  async getNews(industry: string, limit: number = 5): Promise<NewsItem[]> {
    const cacheKey = `news_${industry}_${limit}`;
    const cached = this.getCachedData<NewsItem[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const data = await this.marketAPI.getIndustryNews(industry, limit);
      this.setCachedData(cacheKey, data, 10 * 60 * 1000); // 10分钟缓存
      return data;
    } catch (error) {
      console.error(`Error fetching news for ${industry}:`, error);
      return this.getFallbackNews(industry, limit);
    }
  }

  // 获取实时市场数据
  async getRealTimeMarketData(industry: string) {
    const cacheKey = `realtime_${industry}`;
    const cached = this.getCachedData<any>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const [industryData, news] = await Promise.all([
        this.getIndustryData(industry),
        this.getNews(industry, 3)
      ]);

      const realTimeData = {
        marketData: {
          price: `¥${industryData.avgPrice.toFixed(2)}`,
          change: industryData.changePercent > 0 ? `+${industryData.changePercent.toFixed(2)}` : industryData.changePercent.toFixed(2),
          changePercent: industryData.changePercent > 0 ? `+${industryData.changePercent.toFixed(2)}%` : `${industryData.changePercent.toFixed(2)}%`,
          volume: industryData.volume.toFixed(0)
        },
        news: news.slice(0, 3)
      };

      this.setCachedData(cacheKey, realTimeData, 30000); // 30秒缓存
      return realTimeData;
    } catch (error) {
      console.error(`Error fetching real-time data for ${industry}:`, error);
      return this.getFallbackRealTimeData(industry);
    }
  }

  // 清除缓存
  clearCache(): void {
    this.cache.clear();
  }

  // 清除特定缓存
  clearCacheForIndustry(industry: string): void {
    const keysToDelete = Array.from(this.cache.keys()).filter(key => 
      key.includes(industry)
    );
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  // 降级数据方法
  private getFallbackIndustryData(industry: string): IndustryData {
    const fallbackData: { [key: string]: IndustryData } = {
      '医疗设备': {
        name: '医疗设备',
        marketCap: 5000000000,
        avgPrice: 85.50,
        changePercent: 2.3,
        volume: 1500000,
        news: this.getFallbackNews('医疗设备', 3)
      },
      '新能源': {
        name: '新能源',
        marketCap: 12000000000,
        avgPrice: 120.75,
        changePercent: -1.2,
        volume: 2500000,
        news: this.getFallbackNews('新能源', 3)
      },
      '人工智能': {
        name: '人工智能',
        marketCap: 8000000000,
        avgPrice: 95.20,
        changePercent: 3.5,
        volume: 1800000,
        news: this.getFallbackNews('人工智能', 3)
      },
      '水晶工艺品': {
        name: '水晶工艺品',
        marketCap: 2000000000,
        avgPrice: 45.30,
        changePercent: 0.8,
        volume: 800000,
        news: this.getFallbackNews('水晶工艺品', 3)
      }
    };

    return fallbackData[industry] || fallbackData['医疗设备'];
  }

  private getFallbackNews(industry: string, limit: number): NewsItem[] {
    const fallbackNews: { [key: string]: NewsItem[] } = {
      '医疗设备': [
        {
          title: '医疗器械行业新政策发布，推动产业升级',
          description: '最新政策为医疗器械行业带来新的发展机遇',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: '医疗器械网'
        },
        {
          title: '全球老龄化加速，医疗辅助设备需求激增',
          description: '随着全球老龄化趋势，医疗辅助设备市场前景广阔',
          url: '#',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: '健康时报'
        },
        {
          title: '智能医疗设备技术突破，市场前景广阔',
          description: 'AI技术在医疗设备领域的应用越来越广泛',
          url: '#',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: '科技日报'
        }
      ],
      '新能源': [
        {
          title: '新能源政策利好，行业迎来发展机遇',
          description: '国家政策支持新能源产业发展',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: '能源网'
        },
        {
          title: '储能技术突破，新能源应用场景扩展',
          description: '储能技术的进步为新能源发展提供支撑',
          url: '#',
          publishedAt: new Date(Date.now() - 1800000).toISOString(),
          source: '科技前沿'
        },
        {
          title: '全球能源转型加速，清洁能源投资增长',
          description: '全球范围内清洁能源投资持续增长',
          url: '#',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: '财经网'
        }
      ],
      '人工智能': [
        {
          title: 'AI技术应用场景扩展，行业迎来新机遇',
          description: '人工智能在各行业的应用越来越广泛',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: 'AI科技'
        },
        {
          title: '大模型技术突破，AI应用门槛降低',
          description: '大模型技术的发展降低了AI应用的门槛',
          url: '#',
          publishedAt: new Date(Date.now() - 1800000).toISOString(),
          source: '人工智能网'
        },
        {
          title: 'AI伦理规范发布，行业发展更加规范',
          description: 'AI伦理规范的发布有助于行业健康发展',
          url: '#',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: '科技日报'
        }
      ],
      '水晶工艺品': [
        {
          title: '水晶工艺品出口增长，海外市场表现亮眼',
          description: '水晶工艺品在海外市场表现良好',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: '工艺品网'
        },
        {
          title: '定制化水晶产品受追捧，个性化需求上升',
          description: '个性化定制水晶产品市场需求增长',
          url: '#',
          publishedAt: new Date(Date.now() - 1800000).toISOString(),
          source: '时尚家居'
        },
        {
          title: '环保水晶工艺技术革新，可持续发展成趋势',
          description: '环保工艺技术在水晶制造中的应用',
          url: '#',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: '环保在线'
        }
      ]
    };

    return fallbackNews[industry]?.slice(0, limit) || fallbackNews['医疗设备'].slice(0, limit);
  }

  private getFallbackRealTimeData(industry: string) {
    return {
      marketData: {
        price: `¥${(Math.random() * 100 + 50).toFixed(2)}`,
        change: (Math.random() - 0.5) * 10 > 0 ? `+${((Math.random() - 0.5) * 10).toFixed(2)}` : `${((Math.random() - 0.5) * 10).toFixed(2)}`,
        changePercent: (Math.random() - 0.5) * 10 > 0 ? `+${((Math.random() - 0.5) * 10).toFixed(2)}%` : `${((Math.random() - 0.5) * 10).toFixed(2)}%`,
        volume: `${(Math.random() * 1000000).toFixed(0)}`
      },
      news: this.getFallbackNews(industry, 3)
    };
  }
}

// 创建单例实例
export const apiService = new APIService();

// 导出类型
export type { IndustryData, StockQuote, NewsItem };
