import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jilo.ai - AI驱动的B2B营销自动化平台',
  description: '为B2B制造企业提供24小时不下班的AI营销团队，智能内容生产、市场洞察分析、多渠道运营',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
