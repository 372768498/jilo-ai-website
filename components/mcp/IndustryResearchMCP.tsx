'use client'

import { useState, useEffect, useRef } from 'react'
import IndustryCharts from './IndustryCharts'
import ExportReport from './ExportReport'
import ReportHistory from './ReportHistory'
import RealTimeData from './RealTimeData'
import { apiService } from '@/lib/api/apiService'

interface ResearchReport {
  title: string;
  industry: string;
  date: string;
  highlights: string[];
  opportunities: string[];
  risks: string[];
  recommendations: string[];
  marketSize?: string;
  growthRate?: string;
  keyPlayers?: string[];
  regulations?: string[];
  trends?: string[];
}

interface IndustryData {
  name: string;
  keywords: string[];
  marketData: {
    size: string;
    growthRate: string;
    keyPlayers: string[];
  };
  regulations: string[];
  trends: string[];
}

export default function IndustryResearchMCP() {
  const [isLoading, setIsLoading] = useState(false);
  const [industry, setIndustry] = useState('');
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const reportElementRef = useRef<HTMLDivElement>(null);
  
  // 行业数据库
  const industryDatabase: IndustryData[] = [
    {
      name: '医疗设备',
      keywords: ['轮椅', '医疗', '医疗器械', '康复', '护理', '制氧机', '医疗辅助'],
      marketData: {
        size: '全球市场规模约$5000亿美元',
        growthRate: '年增长率8.5%',
        keyPlayers: ['Invacare', 'Sunrise Medical', '江苏鱼跃', '优逸行']
      },
      regulations: ['FDA认证', 'CE认证', 'ISO13485', 'MDR法规'],
      trends: ['智能化', '轻量化', '远程监控', '个性化定制']
    },
    {
      name: '水晶工艺品',
      keywords: ['水晶', '饰品', '工艺品', '奖杯', '纪念品', '礼品', '摆件'],
      marketData: {
        size: '全球市场规模约$200亿美元',
        growthRate: '年增长率5.2%',
        keyPlayers: ['浦江轩映水晶', '诺贝尔水晶', '捷克波希米亚水晶']
      },
      regulations: ['环保标准', '出口认证', '质量检测'],
      trends: ['定制化', '文化创意', '可持续发展', '数字化营销']
    },
    {
      name: '新能源',
      keywords: ['新能源', '太阳能', '风能', '电池', '储能', '电动车', '清洁能源'],
      marketData: {
        size: '全球市场规模约$1.2万亿美元',
        growthRate: '年增长率12.3%',
        keyPlayers: ['特斯拉', '比亚迪', '宁德时代', '隆基绿能']
      },
      regulations: ['碳达峰政策', 'REACH法规', '电池安全标准'],
      trends: ['储能技术', '智能电网', '氢能源', '碳中和']
    },
    {
      name: '人工智能',
      keywords: ['AI', '人工智能', '机器学习', '深度学习', '算法', '智能系统'],
      marketData: {
        size: '全球市场规模约$4000亿美元',
        growthRate: '年增长率25.8%',
        keyPlayers: ['OpenAI', 'Google', '百度', '腾讯', '阿里巴巴']
      },
      regulations: ['AI伦理准则', '数据保护法', '算法透明度'],
      trends: ['大模型', '多模态AI', '边缘计算', 'AI芯片']
    }
  ];

  // 智能行业识别
  const identifyIndustry = (input: string): IndustryData | null => {
    const lowerInput = input.toLowerCase();
    for (const industry of industryDatabase) {
      if (industry.keywords.some(keyword => lowerInput.includes(keyword.toLowerCase()))) {
        return industry;
      }
    }
    return null;
  };

  // 获取行业建议
  const getSuggestions = (input: string) => {
    if (input.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const matchedIndustries = industryDatabase.filter(industry =>
      industry.keywords.some(keyword => 
        keyword.toLowerCase().includes(input.toLowerCase())
      )
    );
    
    const suggestions = matchedIndustries.map(industry => industry.name);
    setSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0);
  };

  // 加载历史报告
  const loadHistoryReport = (historyReport: any) => {
    setReport(historyReport);
  };

  // 增强的行业调研过程 - 使用真实API数据
  const generateReport = async () => {
    if (!industry.trim()) return;
    
    setIsLoading(true);
    setShowSuggestions(false);
    
    try {
      console.log(`Generating report for industry: ${industry}`);
      
      // 获取真实的市场数据
      const [industryData, news] = await Promise.all([
        apiService.getIndustryData(industry),
        apiService.getNews(industry, 5)
      ]);
      
      const identifiedIndustry = identifyIndustry(industry);
      let newReport: ResearchReport;
      
      if (identifiedIndustry) {
        // 基于真实API数据和识别的行业生成详细报告
        newReport = {
          title: `${identifiedIndustry.name}行业深度分析报告`,
          industry: industry,
          date: new Date().toISOString().split('T')[0],
          marketSize: `全球市场规模约$${(industryData.marketCap / 1000000000).toFixed(1)}万亿美元`,
          growthRate: `年增长率${industryData.changePercent.toFixed(1)}%`,
          keyPlayers: identifiedIndustry.marketData.keyPlayers,
          regulations: identifiedIndustry.regulations,
          trends: identifiedIndustry.trends,
          highlights: [
            `${identifiedIndustry.name}行业正处于快速发展期`,
            `市场规模约$${(industryData.marketCap / 1000000000).toFixed(1)}万亿美元，年增长率${industryData.changePercent.toFixed(1)}%`,
            `主要趋势：${identifiedIndustry.trends.slice(0, 3).join('、')}`,
            `平均股价${industryData.avgPrice.toFixed(2)}，交易量${industryData.volume.toFixed(0)}`
          ],
          opportunities: [
            `${identifiedIndustry.name}市场需求持续增长`,
            '技术创新带来新的商业机会',
            '政策支持为行业发展提供动力',
            '新兴市场开拓空间巨大',
            `当前市场表现${industryData.changePercent > 0 ? '积极' : '谨慎'}，为投资提供参考`
          ],
          risks: [
            '市场竞争加剧，利润空间压缩',
            '技术更新换代速度快，投资风险增加',
            '监管政策变化可能影响市场准入',
            '原材料价格波动影响成本控制',
            `市场波动性${Math.abs(industryData.changePercent) > 5 ? '较高' : '适中'}，需谨慎投资`
          ],
          recommendations: [
            '加强技术创新投入，提升核心竞争力',
            '建立多元化市场布局，降低单一市场风险',
            '关注政策变化，确保合规经营',
            '与产业链上下游建立战略合作关系',
            `建议${industryData.changePercent > 0 ? '积极' : '谨慎'}布局，关注市场动态`
          ]
        };
      } else {
        // 通用行业报告 - 使用真实数据
        newReport = {
          title: `${industry}行业分析报告`,
          industry: industry,
          date: new Date().toISOString().split('T')[0],
          marketSize: `市场规模约$${(industryData.marketCap / 1000000000).toFixed(1)}万亿美元`,
          growthRate: `年增长率${industryData.changePercent.toFixed(1)}%`,
          highlights: [
            '全球供应链重构，区域化趋势明显',
            '数字化转型成为行业共识',
            '可持续发展要求提高',
            `当前市场表现${industryData.changePercent > 0 ? '积极' : '谨慎'}`
          ],
          opportunities: [
            '区域全面经济伙伴关系协定(RCEP)降低贸易壁垒',
            '工业互联网应用创造新的商业模式',
            '绿色制造认证可提升国际竞争力',
            `市场交易活跃，交易量达${industryData.volume.toFixed(0)}`
          ],
          risks: [
            '地缘政治因素影响市场准入',
            '技术标准差异增加合规成本',
            '人才短缺限制创新能力',
            `市场波动性${Math.abs(industryData.changePercent) > 5 ? '较高' : '适中'}`
          ],
          recommendations: [
            '建立多区域生产基地，降低贸易风险',
            '投资数字化系统，提高运营效率',
            '加强行业协会合作，共同应对合规挑战',
            `建议${industryData.changePercent > 0 ? '积极' : '谨慎'}投资策略`
          ]
        };
      }
      
      console.log('Report generated successfully:', newReport);
      setReport(newReport);
    } catch (error) {
      console.error('Error generating report:', error);
      
      // 降级到模拟数据
      const identifiedIndustry = identifyIndustry(industry);
      let fallbackReport: ResearchReport;
      
      if (identifiedIndustry) {
        fallbackReport = {
          title: `${identifiedIndustry.name}行业深度分析报告`,
          industry: industry,
          date: new Date().toISOString().split('T')[0],
          marketSize: identifiedIndustry.marketData.size,
          growthRate: identifiedIndustry.marketData.growthRate,
          keyPlayers: identifiedIndustry.marketData.keyPlayers,
          regulations: identifiedIndustry.regulations,
          trends: identifiedIndustry.trends,
          highlights: [
            `${identifiedIndustry.name}行业正处于快速发展期`,
            `市场规模${identifiedIndustry.marketData.size}，${identifiedIndustry.marketData.growthRate}`,
            `主要趋势：${identifiedIndustry.trends.slice(0, 3).join('、')}`
          ],
          opportunities: [
            `${identifiedIndustry.name}市场需求持续增长`,
            '技术创新带来新的商业机会',
            '政策支持为行业发展提供动力',
            '新兴市场开拓空间巨大'
          ],
          risks: [
            '市场竞争加剧，利润空间压缩',
            '技术更新换代速度快，投资风险增加',
            '监管政策变化可能影响市场准入',
            '原材料价格波动影响成本控制'
          ],
          recommendations: [
            '加强技术创新投入，提升核心竞争力',
            '建立多元化市场布局，降低单一市场风险',
            '关注政策变化，确保合规经营',
            '与产业链上下游建立战略合作关系'
          ]
        };
      } else {
        fallbackReport = {
          title: `${industry}行业分析报告`,
          industry: industry,
          date: new Date().toISOString().split('T')[0],
          highlights: [
            '全球供应链重构，区域化趋势明显',
            '数字化转型成为行业共识',
            '可持续发展要求提高'
          ],
          opportunities: [
            '区域全面经济伙伴关系协定(RCEP)降低贸易壁垒',
            '工业互联网应用创造新的商业模式',
            '绿色制造认证可提升国际竞争力'
          ],
          risks: [
            '地缘政治因素影响市场准入',
            '技术标准差异增加合规成本',
            '人才短缺限制创新能力'
          ],
          recommendations: [
            '建立多区域生产基地，降低贸易风险',
            '投资数字化系统，提高运营效率',
            '加强行业协会合作，共同应对合规挑战'
          ]
        };
      }
      
      setReport(fallbackReport);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">行业调研MCP</h2>
            <p className="text-lg text-gray-600">
              由AI驱动的行业分析引擎，为您的全球营销决策提供数据支持
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-6">
              <label htmlFor="industry" className="block text-gray-700 font-medium mb-2">
                输入您的行业或产品
              </label>
              <div className="relative">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      id="industry"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="例如：电动轮椅、水晶饰品、新能源..."
                      value={industry}
                      onChange={(e) => {
                        setIndustry(e.target.value);
                        getSuggestions(e.target.value);
                      }}
                      onFocus={() => {
                        if (suggestions.length > 0) setShowSuggestions(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowSuggestions(false), 200);
                      }}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                            onClick={() => {
                              setIndustry(suggestion);
                              setShowSuggestions(false);
                            }}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={generateReport}
                    disabled={isLoading || !industry.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? '分析中...' : '开始分析'}
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  💡 支持智能识别：医疗设备、水晶工艺品、新能源、人工智能等行业
                </div>
              </div>
            </div>
            
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-lg text-gray-600">AI正在分析行业数据，请稍候...</p>
              </div>
            )}
            
            {report && !isLoading && (
              <div ref={reportElementRef} className="mt-8 border-t pt-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">{report.title}</h3>
                  <span className="text-gray-500">{report.date}</span>
                </div>
                
                {/* 市场概览 */}
                {(report.marketSize || report.growthRate || report.keyPlayers) && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4">📊 市场概览</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {report.marketSize && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{report.marketSize}</div>
                          <div className="text-sm text-gray-600">市场规模</div>
                        </div>
                      )}
                      {report.growthRate && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{report.growthRate}</div>
                          <div className="text-sm text-gray-600">增长率</div>
                        </div>
                      )}
                      {report.keyPlayers && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{report.keyPlayers.length}</div>
                          <div className="text-sm text-gray-600">主要玩家</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 行业趋势和法规 */}
                {(report.trends || report.regulations) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {report.trends && (
                      <div className="bg-orange-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-orange-800 mb-4">🚀 行业趋势</h4>
                        <div className="flex flex-wrap gap-2">
                          {report.trends.map((trend, index) => (
                            <span key={index} className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm">
                              {trend}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {report.regulations && (
                      <div className="bg-yellow-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-yellow-800 mb-4">📋 重要法规</h4>
                        <div className="flex flex-wrap gap-2">
                          {report.regulations.map((regulation, index) => (
                            <span key={index} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                              {regulation}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4">行业亮点</h4>
                    <ul className="space-y-2">
                      {report.highlights.map((item, index) => (
                        <li key={`highlight-${index}`} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-green-800 mb-4">市场机会</h4>
                    <ul className="space-y-2">
                      {report.opportunities.map((item, index) => (
                        <li key={`opportunity-${index}`} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-red-800 mb-4">潜在风险</h4>
                    <ul className="space-y-2">
                      {report.risks.map((item, index) => (
                        <li key={`risk-${index}`} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-800 mb-4">策略建议</h4>
                    <ul className="space-y-2">
                      {report.recommendations.map((item, index) => (
                        <li key={`recommendation-${index}`} className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 主要玩家 */}
                {report.keyPlayers && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">🏢 主要玩家</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {report.keyPlayers.map((player, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg text-center shadow-sm">
                          <div className="font-medium text-gray-800">{player}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 数据可视化图表 */}
                {(report.marketSize || report.growthRate || report.keyPlayers || report.trends) && (
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-6">📊 数据可视化分析</h4>
                    <IndustryCharts 
                      data={{
                        marketSize: report.marketSize || '',
                        growthRate: report.growthRate || '',
                        keyPlayers: report.keyPlayers || [],
                        trends: report.trends || []
                      }}
                      industryName={report.industry}
                    />
                  </div>
                )}

                {/* 实时数据 */}
                <RealTimeData industry={report.industry} />
                
                <div className="flex justify-between items-center border-t pt-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">这份报告对您有帮助吗？</span>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                      </button>
                      <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 10.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ReportHistory onLoadReport={loadHistoryReport} currentReport={report} />
                    <ExportReport report={report} reportElementRef={reportElementRef} />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center text-gray-600">
            <p>此MCP由Jilo.ai的AI营销中台提供支持</p>
            <p className="text-sm mt-2">数据来源：全球贸易数据库、政策法规库、行业报告</p>
          </div>
        </div>
      </div>
    </section>
  )
}