// CRM 系统类型定义

export interface Client {
  id: string
  company_name: string
  english_name?: string
  industry: string
  company_size?: string
  annual_revenue?: number
  founded_year?: number
  headquarters?: string
  website?: string
  contact_email: string
  contact_phone?: string
  wechat?: string
  linkedin?: string
  target_markets?: string[]
  main_products?: Product[]
  certifications?: string[]
  competitive_advantages?: string[]
  pain_points?: string[]
  account_manager?: string
  service_package: 'Basic' | 'Silver' | 'Gold' | 'Platinum'
  onboarding_date?: string
  relationship_status: 'prospect' | 'active' | 'inactive' | 'churned'
  satisfaction_score?: number
  total_spent?: number
  monthly_budget?: number
  payment_terms?: string
  credit_rating?: string
  microsite_url?: string
  created_at: string
  updated_at: string
}

export interface Product {
  product_id: string
  name: string
  english_name?: string
  category: string
  features?: string[]
  moq?: string
  lead_time?: string
  certifications?: string[]
  image_url?: string
  description?: string
}

export interface ClientSummary {
  total_clients: number
  active_clients: number
  total_revenue: number
  monthly_revenue: number
  top_industries: { industry: string; count: number }[]
}

export interface AIFunction {
  id: string
  client_id: string
  function_type: 'icp' | 'competitor' | 'content' | 'report' | 'social' | 'monitoring'
  function_name: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  result?: any
  metadata?: any
  created_at: string
  updated_at: string
}

export interface ContentAsset {
  id: string
  client_id: string
  asset_type: 'image' | 'video' | 'document' | 'template'
  title: string
  description?: string
  file_url: string
  metadata?: any
  created_at: string
}

