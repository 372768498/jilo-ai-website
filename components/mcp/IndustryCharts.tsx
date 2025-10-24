'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

interface ChartData {
  marketSize: string;
  growthRate: string;
  keyPlayers: string[];
  trends: string[];
}

interface IndustryChartsProps {
  data: ChartData;
  industryName: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function IndustryCharts({ data, industryName }: IndustryChartsProps) {
  // 市场增长数据
  const growthData = [
    { year: '2020', growth: 5.2 },
    { year: '2021', growth: 6.8 },
    { year: '2022', growth: 7.5 },
    { year: '2023', growth: 8.1 },
    { year: '2024', growth: 8.5 }
  ];

  // 竞争对手市场份额数据
  const competitorData = data.keyPlayers.map((player, index) => ({
    name: player,
    value: Math.floor(Math.random() * 30) + 10, // 模拟市场份额
    color: COLORS[index % COLORS.length]
  }));

  // 趋势热度数据
  const trendData = data.trends.map((trend, index) => ({
    trend,
    score: Math.floor(Math.random() * 100) + 50, // 模拟趋势热度
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="space-y-8">
      {/* 市场增长趋势图 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 市场增长趋势</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis label={{ value: '增长率 (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => [`${value}%`, '增长率']} />
            <Line type="monotone" dataKey="growth" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 竞争对手分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🏢 主要玩家市场份额</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={competitorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {competitorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🚀 行业趋势热度</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="trend" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value}`, '热度指数']} />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 市场预测 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🔮 未来5年市场预测</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { year: '2025', predicted: 9.2, actual: 8.5 },
            { year: '2026', predicted: 9.8, actual: null },
            { year: '2027', predicted: 10.5, actual: null },
            { year: '2028', predicted: 11.2, actual: null },
            { year: '2029', predicted: 12.0, actual: null }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis label={{ value: '增长率 (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value, name) => [`${value}%`, name === 'predicted' ? '预测' : '实际']} />
            <Bar dataKey="predicted" fill="#8884d8" name="预测增长率" />
            <Bar dataKey="actual" fill="#82ca9d" name="实际增长率" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
