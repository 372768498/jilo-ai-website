'use client'

export default function CoreAdvantages() {
  const advantages = [
    {
      title: '数据驱动决策',
      description: '基于实时市场数据和客户行为分析，而非主观判断',
      icon: '📈',
      features: [
        '实时市场趋势监测',
        '客户行为分析',
        'ROI精准追踪',
        '自动化报表生成'
      ]
    },
    {
      title: '效率提升10倍',
      description: 'AI自动化处理重复性工作，让团队专注战略决策',
      icon: '⚡',
      features: [
        '内容生产自动化',
        '多平台同步发布',
        '智能客户跟进',
        '24/7不间断运营'
      ]
    },
    {
      title: 'AI持续学习',
      description: '系统不断优化，效果随时间提升',
      icon: '🧠',
      features: [
        '自适应内容优化',
        '智能A/B测试',
        '用户反馈学习',
        '行业知识积累'
      ]
    },
    {
      title: '合规优先',
      description: '内置多国法规检查，避免营销风险',
      icon: '🔒',
      features: [
        '多国法规库',
        '自动合规审核',
        '品牌风险预警',
        '数据安全保护'
      ]
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            为什么选择 Jilo.ai
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们不只是工具，而是您的AI营销团队
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start gap-6">
                <div className="text-6xl flex-shrink-0">{advantage.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {advantage.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {advantage.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 对比表格 */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Jilo.ai vs 传统营销方式
          </h3>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">对比维度</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Jilo.ai</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">传统方式</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">内容生产速度</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600 font-semibold">分钟级</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">天级</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">运营成本</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600 font-semibold">1/10</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">全职团队</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">数据分析</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600 font-semibold">实时自动化</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">手动整理</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">效果优化</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600 font-semibold">AI持续学习</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">凭经验调整</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">工作时间</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600 font-semibold">24/7</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">工作时间</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
