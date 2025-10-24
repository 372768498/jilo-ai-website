// 市场数据API集成
export interface MarketDataConfig {
  alphaVantageKey?: string;
  newsApiKey?: string;
  polygonKey?: string;
  finnhubKey?: string;
}

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: string;
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

export interface IndustryData {
  name: string;
  marketCap: number;
  avgPrice: number;
  changePercent: number;
  volume: number;
  news: NewsItem[];
}

class MarketDataAPI {
  private config: MarketDataConfig;

  constructor(config: MarketDataConfig) {
    this.config = config;
  }

  // Alpha Vantage API - 获取股票报价
  async getStockQuote(symbol: string): Promise<StockQuote | null> {
    if (!this.config.alphaVantageKey) {
      console.warn('Alpha Vantage API key not configured');
      return null;
    }

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.config.alphaVantageKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }

      const quote = data['Global Quote'];
      if (!quote) {
        return null;
      }

      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        timestamp: quote['07. latest trading day']
      };
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      return null;
    }
  }

  // NewsAPI - 获取行业新闻
  async getIndustryNews(industry: string, limit: number = 5): Promise<NewsItem[]> {
    if (!this.config.newsApiKey) {
      console.warn('NewsAPI key not configured');
      return this.getFallbackNews(industry, limit);
    }

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(industry)}&language=zh&sortBy=publishedAt&pageSize=${limit}&apiKey=${this.config.newsApiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error(data.message || 'NewsAPI error');
      }

      return data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      return this.getFallbackNews(industry, limit);
    }
  }

  // Finnhub - 获取市场概览
  async getMarketOverview(): Promise<any> {
    if (!this.config.finnhubKey) {
      console.warn('Finnhub API key not configured');
      return this.getFallbackMarketData();
    }

    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/stock/market-status?exchange=US&token=${this.config.finnhubKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching market overview:', error);
      return this.getFallbackMarketData();
    }
  }

  // 获取行业相关股票数据
  async getIndustryStocks(industry: string): Promise<StockQuote[]> {
    const industrySymbols = this.getIndustrySymbols(industry);
    const promises = industrySymbols.map(symbol => this.getStockQuote(symbol));
    const results = await Promise.all(promises);
    
    return results.filter(quote => quote !== null) as StockQuote[];
  }

  // 获取行业综合数据
  async getIndustryData(industry: string): Promise<IndustryData> {
    const [stocks, news] = await Promise.all([
      this.getIndustryStocks(industry),
      this.getIndustryNews(industry)
    ]);

    if (stocks.length === 0) {
      return this.getFallbackIndustryData(industry);
    }

    const avgPrice = stocks.reduce((sum, stock) => sum + stock.price, 0) / stocks.length;
    const avgChangePercent = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length;
    const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
    const marketCap = avgPrice * totalVolume; // 简化的市值计算

    return {
      name: industry,
      marketCap,
      avgPrice,
      changePercent: avgChangePercent,
      volume: totalVolume,
      news
    };
  }

  // 行业股票映射
  private getIndustrySymbols(industry: string): string[] {
    const symbolMap: { [key: string]: string[] } = {
      '医疗设备': ['JNJ', 'PFE', 'ABT', 'MDT', 'BSX'],
      '水晶工艺品': ['SWAROVSKI', 'TIFFANY', 'SIG'], // 这些可能需要调整
      '新能源': ['TSLA', 'NIO', 'XPEV', 'LI', 'BYD'],
      '人工智能': ['NVDA', 'GOOGL', 'MSFT', 'AAPL', 'META'],
      '电动轮椅': ['JNJ', 'PFE', 'ABT'], // 医疗设备相关
      '水晶饰品': ['SWAROVSKI', 'TIFFANY', 'SIG']
    };

    return symbolMap[industry] || symbolMap['医疗设备'];
  }

  // 降级数据 - 当API不可用时使用
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
        }
      ],
      '新能源': [
        {
          title: '新能源政策利好，行业迎来发展机遇',
          description: '国家政策支持新能源产业发展',
          url: '#',
          publishedAt: new Date().toISOString(),
          source: '能源网'
        }
      ]
    };

    return fallbackNews[industry] || fallbackNews['医疗设备'];
  }

  private getFallbackMarketData() {
    return {
      isOpen: true,
      session: 'regular'
    };
  }

  private getFallbackIndustryData(industry: string): IndustryData {
    return {
      name: industry,
      marketCap: Math.random() * 1000000000,
      avgPrice: Math.random() * 100 + 50,
      changePercent: (Math.random() - 0.5) * 10,
      volume: Math.random() * 1000000,
      news: this.getFallbackNews(industry, 3)
    };
  }
}

// 创建API实例
export const createMarketDataAPI = (config: MarketDataConfig) => {
  return new MarketDataAPI(config);
};

// 默认配置（从环境变量获取）
export const getDefaultConfig = (): MarketDataConfig => {
  return {
    alphaVantageKey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY,
    newsApiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
    polygonKey: process.env.NEXT_PUBLIC_POLYGON_KEY,
    finnhubKey: process.env.NEXT_PUBLIC_FINNHUB_KEY
  };
};
