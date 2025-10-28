import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yydbhdozewmptrgevytr.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZGJoZG96ZXdtcHRyZ2V2eXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MjQ3ODAsImV4cCI6MjA3NzEwMDc4MH0.o_VnaZRH9kBBeyE-Q7qb08CxbfFX_N8INnYW1Zg_BkU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

