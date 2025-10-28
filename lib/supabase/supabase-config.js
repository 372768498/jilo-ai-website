const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yydbhdozewmptrgevytr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZGJoZG96ZXdtcHRyZ2V2eXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MjQ3ODAsImV4cCI6MjA3NzEwMDc4MH0.o_VnaZRH9kBBeyE-Q7qb08CxbfFX_N8INnYW1Zg_BkU';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZGJoZG96ZXdtcHRyZ2V2eXRyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTUyNDc4MCwiZXhwIjoyMDc3MTAwNzgwfQ.zB2-TMgKEIBVUZ84gQ94Uj6FmpBzO_m8bVWcEfK8KNE';

// 创建Supabase客户端
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

// 使用service role key创建管理员客户端（用于需要高权限的操作）
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false
  }
});

module.exports = {
  supabase,
  supabaseAdmin,
  supabaseUrl,
  supabaseAnonKey,
  supabaseServiceKey
};