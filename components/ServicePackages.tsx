'use client'

export default function ServicePackages() {
  const packages = [
    {
      name: '内容版',
      price: '¥2,999',
      period: '/月',
      description: '适合初创企业，建立基础线上存在',
      features: [
        '每周5篇行业内容',
        'LinkedIn自动发布',
        '基础数据分析报告',
        '邮件支持',
        '内容合规审核'
      ],
      highlight: false,
      badge: null
    },
    {
      name: '增长版',
      price: '¥5,999',
      period: '/月',
      description: '适合快速增长期企业，全面市场覆盖',
      features: [
        '每周10篇多平台内容',
        'LinkedIn + Reddit运营',
        '潜在客户追踪系统',
        '月度策略报告',
        '专属客户经理',
        '竞品监测分析',
        'A/B测试优化'
      ],
      highlight: true,
      badge: '最受欢迎'
    },
    {
      name: '全渠道版',
      price: '¥9,999',
      period: '/月',
      description: '适合成熟企业，打造行业影响力',
      features: [
        '无限内容生产',
        '全平台自动化运营',
        'AI外联开发客户',
        '实时市场洞察看板',
        '定制化AI模型训练',
        '7x24技术支持',
        '季度战略规划会议',
        '独立品牌建设方案'
      ],
      highlight: false,
      badge: '企业首选'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            选择适合你的服务方案
          </h2>
          <p className="text-xl text-gray-600">
            灵活的服务包，随企业成长而升级
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                pkg.highlight
                  ? 'bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-2xl scale-105 relative'
                  : 'bg-gray-50 hover:shadow-xl'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${pkg.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm ${pkg.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                  {pkg.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className={`text-5xl font-bold ${pkg.highlight ? 'text-white' : 'text-blue-600'}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-lg ml-2 ${pkg.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                    {pkg.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg 
                      className={`w-6 h-6 flex-shrink-0 mt-0.5 ${pkg.highlight ? 'text-yellow-300' : 'text-blue-600'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={pkg.highlight ? 'text-white' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  pkg.highlight
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                立即开始
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            所有方案均包含14天免费试用，随时可以取消或升级
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold underline">
            查看详细功能对比 →
          </a>
        </div>
      </div>
    </section>
  )
}
