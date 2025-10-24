'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  
  // 用户数据
  const users = [
    { username: 'admin', password: 'admin123', reportType: 'yoyicare' },
    { username: 'user1', password: 'user123', reportType: 'shiningcrystal' }
  ]
  
  // 登录验证
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 查找匹配的用户
    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
      setIsLoggedIn(true)
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userReportType', user.reportType)
      setError('')
      loadReport(user.reportType)
    } else {
      setError('用户名或密码错误')
    }
  }
  
  // 加载报告数据
  const loadReport = async (reportType = '') => {
    setLoading(true)
    
    // 如果没有指定报告类型，从localStorage获取
    if (!reportType) {
      reportType = localStorage.getItem('userReportType') || 'yoyicare'
    }
    
    try {
      // 跳过API调用，直接使用静态数据
      const staticData = require(`../../data/${reportType}-report.json`)
      setReport(staticData)
    } catch (error) {
      console.error('加载报告失败:', error)
      setError('无法加载报告数据')
    } finally {
      setLoading(false)
    }
  }
  
  // 检查登录状态
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      loadReport()
    }
  }, [])
  
  // 登出功能
  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
    setReport(null)
  }
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Jilo.ai 控制台</h1>
            <p className="text-gray-600 mt-2">请登录查看行业报告</p>
          </div>
          
          <form onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                用户名
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                密码
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              登录
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>提示: 用户名 admin, 密码 admin123 (优逸行报告)</p>
            <p>或: 用户名 user1, 密码 user123 (轩映水晶报告)</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Jilo.ai 控制台</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            退出登录
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-lg text-gray-600">加载报告中...</p>
          </div>
        ) : report ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">{report.title}</h2>
              <p className="text-gray-600 mt-2">公司: {report.company}</p>
              <p className="text-gray-600">日期: {report.date}</p>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">摘要</h3>
                <p className="text-gray-700">{report.summary}</p>
              </div>
              
              {report.sections.map((section: any, index: number) => (
                <div key={index} className="mb-8 pb-8 border-b border-gray-200 last:border-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h3>
                  
                  {section.content && (
                    <p className="text-gray-700 mb-4">{section.content}</p>
                  )}
                  
                  {section.keyFindings && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">关键发现</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {section.keyFindings.map((finding: string, i: number) => (
                          <li key={i} className="text-gray-700">{finding}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {section.products && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">产品分析</h4>
                      {section.products.map((product: any, i: number) => (
                        <div key={i} className="mb-4 bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-800 mb-2">{product.name}</h5>
                          {product.issues ? (
                            <ul className="list-disc pl-5 space-y-1">
                              {product.issues.map((issue: string, j: number) => (
                                <li key={j} className="text-gray-700">{issue}</li>
                              ))}
                            </ul>
                          ) : product.features ? (
                            <ul className="list-disc pl-5 space-y-1">
                              {product.features.map((feature: string, j: number) => (
                                <li key={j} className="text-gray-700">{feature}</li>
                              ))}
                            </ul>
                          ) : null}
                          {product.marketPosition && (
                            <p className="mt-2 text-gray-600">市场定位: {product.marketPosition}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.strategies && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">市场策略</h4>
                      {section.strategies.map((strategy: any, i: number) => (
                        <div key={i} className="mb-3">
                          <h5 className="font-medium text-gray-800">{strategy.name}</h5>
                          <p className="text-gray-700">{strategy.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.advantages && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">竞争优势</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {section.advantages.map((advantage: string, i: number) => (
                          <li key={i} className="text-gray-700">{advantage}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {section.disadvantages && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">竞争劣势</h4>
                      <ul className="list-disc pl-5 space-y-1 text-red-600">
                        {section.disadvantages.map((disadvantage: string, i: number) => (
                          <li key={i}>{disadvantage}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {section.risks && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">风险评估</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.risks.map((risk: any, i: number) => (
                          <div key={i} className="bg-red-50 p-4 rounded-lg">
                            <h5 className="font-medium text-red-800">{risk.type}</h5>
                            <p className="text-gray-700 mb-2">{risk.description}</p>
                            <div className="flex items-center">
                              <span className="text-gray-700 mr-2">严重程度:</span>
                              <span className={`font-medium ${
                                risk.severity === '高' ? 'text-red-600' : 
                                risk.severity === '中' ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {risk.severity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {section.opportunities && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">市场机会</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.opportunities.map((opportunity: any, i: number) => (
                          <div key={i} className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-medium text-green-800">{opportunity.market}</h5>
                            <p className="text-gray-700 mb-2">{opportunity.description}</p>
                            <div className="flex items-center">
                              <span className="text-gray-700 mr-2">潜力:</span>
                              <span className={`font-medium ${
                                opportunity.potential === '高' ? 'text-green-600' : 
                                opportunity.potential === '中' ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {opportunity.potential}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {section.competitors && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">竞争对手分析</h4>
                      <div className="space-y-4">
                        {section.competitors.map((competitor: any, i: number) => (
                          <div key={i} className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-medium text-blue-800">{competitor.name}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                              <div>
                                <p className="text-gray-700"><span className="font-medium">优势:</span> {competitor.strengths}</p>
                              </div>
                              <div>
                                <p className="text-gray-700"><span className="font-medium">劣势:</span> {competitor.weaknesses}</p>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center">
                              <span className="text-gray-700 mr-2">威胁程度:</span>
                              <span className={`font-medium ${
                                competitor.threat_level === '高' ? 'text-red-600' : 
                                competitor.threat_level === '中' ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {competitor.threat_level}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {section.conclusions && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">结论</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {section.conclusions.map((conclusion: string, i: number) => (
                          <li key={i} className="text-gray-700">{conclusion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {section.recommendations && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">建议</h4>
                      <ul className="list-disc pl-5 space-y-1 text-blue-600">
                        {section.recommendations.map((recommendation: string, i: number) => (
                          <li key={i}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">无法加载报告数据</p>
          </div>
        )}
      </main>
    </div>
  )
}