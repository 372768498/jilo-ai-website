'use client'

import { useState, useEffect } from 'react'

interface ReportHistory {
  id: string;
  title: string;
  industry: string;
  date: string;
  timestamp: number;
}

interface ReportHistoryProps {
  onLoadReport: (report: any) => void;
  currentReport: any;
}

export default function ReportHistory({ onLoadReport, currentReport }: ReportHistoryProps) {
  const [history, setHistory] = useState<ReportHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // 从localStorage加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('industryReportHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 保存历史记录到localStorage
  const saveToHistory = (report: any) => {
    const newHistoryItem: ReportHistory = {
      id: Date.now().toString(),
      title: report.title,
      industry: report.industry,
      date: report.date,
      timestamp: Date.now()
    };

    const updatedHistory = [newHistoryItem, ...history.slice(0, 9)]; // 保留最近10条记录
    setHistory(updatedHistory);
    localStorage.setItem('industryReportHistory', JSON.stringify(updatedHistory));
  };

  // 当有新报告时自动保存
  useEffect(() => {
    if (currentReport) {
      saveToHistory(currentReport);
    }
  }, [currentReport]);

  // 加载历史报告
  const loadHistoryReport = (historyItem: ReportHistory) => {
    // 这里应该从localStorage或服务器加载完整报告数据
    // 为了演示，我们创建一个模拟的完整报告
    const mockReport = {
      title: historyItem.title,
      industry: historyItem.industry,
      date: historyItem.date,
      highlights: ['历史报告数据'],
      opportunities: ['历史机会数据'],
      risks: ['历史风险数据'],
      recommendations: ['历史建议数据']
    };
    
    onLoadReport(mockReport);
    setShowHistory(false);
  };

  // 删除历史记录
  const deleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('industryReportHistory', JSON.stringify(updatedHistory));
  };

  // 清空所有历史记录
  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem('industryReportHistory');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
      >
        📚 历史记录 ({history.length})
      </button>

      {showHistory && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">报告历史</h3>
              {history.length > 0 && (
                <button
                  onClick={clearAllHistory}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  清空
                </button>
              )}
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {history.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                暂无历史记录
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {history.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.industry} • {item.date}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <button
                          onClick={() => loadHistoryReport(item)}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                        >
                          加载
                        </button>
                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              历史记录保存在本地浏览器中
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
