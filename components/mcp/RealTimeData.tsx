'use client'

import { useState, useEffect } from 'react'
import { apiService, NewsItem } from '@/lib/api/apiService'

interface RealTimeDataProps {
  industry: string;
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
  const [error, setError] = useState<string | null>(null);

  // 获取实时数据
  const fetchRealTimeData = async () => {
    if (!industry) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching real-time data for industry: ${industry}`);
      const data = await apiService.getRealTimeMarketData(industry);
      
      setMarketData(data.marketData);
      setNews(data.news);
      setLastUpdate(new Date().toLocaleTimeString());
      
      console.log('Real-time data fetched successfully:', data);
    } catch (error) {
      console.error('Error fetching real-time data:', error);
      setError('获取实时数据失败，使用缓存数据');
      
      // 使用降级数据
      const fallbackData = await apiService.getRealTimeMarketData(industry);
      setMarketData(fallbackData.marketData);
      setNews(fallbackData.news);
      setLastUpdate(new Date().toLocaleTimeString());
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
          {error && (
            <span className="text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
              ⚠️ {error}
            </span>
          )}
          <span className="text-sm text-gray-500">最后更新: {lastUpdate}</span>
          <button
            onClick={fetchRealTimeData}
            disabled={isLoading}
            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            title="刷新数据"
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
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">加载中...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {news.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 rounded-r-lg">
                <h6 className="text-sm font-medium text-gray-800 mb-1">{item.title}</h6>
                <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{item.source}</span>
                  <span>•</span>
                  <span>{new Date(item.publishedAt).toLocaleString()}</span>
                  {item.url !== '#' && (
                    <>
                      <span>•</span>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        查看原文
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API状态指示器 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${error ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
            <span>{error ? '使用缓存数据' : '实时数据'}</span>
          </div>
          <span>数据来源: Alpha Vantage, NewsAPI</span>
        </div>
      </div>
    </div>
  )
}
