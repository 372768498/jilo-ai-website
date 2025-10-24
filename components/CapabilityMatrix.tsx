'use client'

export default function CapabilityMatrix() {
  const capabilities = [
    {
      icon: '🤖',
      title: '智能内容生产',
      description: 'AI自动生成产品文案、行业报告、社媒内容',
      features: ['多语言内容生成', '行业知识库', 'SEO优化']
    },
    {
      icon: '📊',
      title: '市场洞察分析',
      description: '实时追踪行业动态、竞品分析、需求预测',
      features: ['市场趋势监测', '竞品动态追踪', '客户需求分析']
    },
    {
      icon: '🎯',
      title: '多渠道运营',
      description: 'LinkedIn、Reddit自动化营销与互动',
      features: ['自动发布内容', '智能互动回复', '潜在客户追踪']
    },
    {
      icon: '🛡️',
      title: '风险合规管理',
      description: '内容审核、品牌保护、法律合规检查',
      features: ['自动内容审核', '品牌监测', '合规性检查']
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            核心能力矩阵
          </h2>
          <p className="text-xl text-gray-600">
            全方位AI营销能力，助力B2B企业快速成长
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{capability.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {capability.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {capability.description}
              </p>
              <ul className="space-y-2">
                {capability.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
