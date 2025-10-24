'use client'

import { useState, useEffect } from 'react'

interface RealTimeDataProps {
  industry: string;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  url?: string;
}

interface MarketData {
  price: string;
  change: string;
  changePercent: string;
  volume: string;
}

export default function RealTimeData({ industry }: RealTimeDataProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // 模拟实时新闻数据
  const generateMockNews = (industryName: string): NewsItem[] => {
    const newsTemplates = {
      '医疗设备': [
        { title: '医疗器械行业新政策发布，推动产业升级', source: '医疗器械网', time: '2小时前' },
        { title: '全球老龄化加速，医疗辅助设备需求激增', source: '健康时报', time: '4小时前' },
        { title: '智能医疗设备技术突破，市场前景广阔', source: '科技日报', time: '6小时前' }
      ],
      '水晶工艺品': [
        { title: '水晶工艺品出口增长，海外市场表现亮眼', source: '工艺品网', time: '1小时前' },
        { title: '定制化水晶产品受追捧，个性化需求上升', source: '时尚家居', time: '3小时前' },
        { title: '环保水晶工艺技术革新，可持续发展成趋势', source: '环保在线', time: '5小时前' }
      ],
      '新能源': [
        { title: '新能源政策利好，行业迎来发展机遇', source: '能源网', time: '1小时前' },
        { title: '储能技术突破，新能源应用场景扩展', source: '科技前沿', time: '2小时前' },
        { title: '全球能源转型加速，清洁能源投资增长', source: '财经网', time: '4小时前' }
      ],
      '人工智能': [
        { title: 'AI技术应用场景扩展，行业迎来新机遇', source: 'AI科技', time: '30分钟前' },
        { title: '大模型技术突破，AI应用门槛降低', source: '人工智能网', time: '1小时前' },
        { title: 'AI伦理规范发布，行业发展更加规范', source: '科技日报', time: '2小时前' }
      ]
    };

    const industryKey = Object.keys(newsTemplates).find(key => 
      industryName.includes(key) || key.includes(industryName)
    ) || '医疗设备';

    return newsTemplates[industryKey as keyof typeof newsTemplates] || newsTemplates['医疗设备'];
  };

  // 模拟市场数据
  const generateMockMarketData = (industryName: string): MarketData => {
    const basePrice = Math.random() * 100 + 50;
    const change = (Math.random() - 0.5) * 10;
    const changePercent = ((change / basePrice) * 100).toFixed(2);
    
    return {
      price: `¥${basePrice.toFixed(2)}`,
      change: change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
      changePercent: change > 0 ? `+${changePercent}%` : `${changePercent}%`,
      volume: `${(Math.random() * 1000000).toFixed(0)}`
    };
  };

  // 获取实时数据
  const fetchRealTimeData = async () => {
    setIsLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockNews = generateMockNews(industry);
      const mockMarketData = generateMockMarketData(industry);
      
      setNews(mockNews);
      setMarketData(mockMarketData);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('获取实时数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载和定时更新
  useEffect(() => {
    if (industry) {
      fetchRealTimeData();
      
      // 每5分钟更新一次数据
      const interval = setInterval(fetchRealTimeData, 5 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [industry]);

  if (!industry) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-800">📡 实时数据</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">最后更新: {lastUpdate}</span>
          <button
            onClick={fetchRealTimeData}
            disabled={isLoading}
            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* 市场数据 */}
      {marketData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{marketData.price}</div>
            <div className="text-sm text-gray-600">平均价格</div>
          </div>
          <div className={`p-4 rounded-lg text-center ${marketData.change.startsWith('+') ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-2xl font-bold ${marketData.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {marketData.change}
            </div>
            <div className="text-sm text-gray-600">价格变化</div>
          </div>
          <div className={`p-4 rounded-lg text-center ${marketData.changePercent.startsWith('+') ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-2xl font-bold ${marketData.changePercent.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {marketData.changePercent}
            </div>
            <div className="text-sm text-gray-600">涨跌幅</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{marketData.volume}</div>
            <div className="text-sm text-gray-600">交易量</div>
          </div>
        </div>
      )}

      {/* 行业新闻 */}
      <div>
        <h5 className="text-md font-semibold text-gray-800 mb-3">📰 行业动态</h5>
        <div className="space-y-3">
          {news.map((item, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 rounded-r-lg">
              <h6 className="text-sm font-medium text-gray-800 mb-1">{item.title}</h6>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{item.source}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
