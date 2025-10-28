const express = require('express');
const cors = require('cors');
const { supabaseAdmin } = require('../lib/supabase/supabase-config');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// 客户管理API
app.get('/api/clients', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/clients/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('clients')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('clients')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.put('/api/clients/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('clients')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('clients')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    
    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 订单管理API
app.get('/api/orders', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        clients (company_name, industry)
      `)
      .order('order_date', { ascending: false });

    if (error) throw error;
    
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        clients (*)
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 沟通记录API
app.get('/api/communications', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('communications')
      .select(`
        *,
        clients (company_name),
        orders (order_number)
      `)
      .order('communication_date', { ascending: false });

    if (error) throw error;
    
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/communications', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('communications')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 营销活动API
app.get('/api/campaigns', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('campaigns')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) throw error;
    
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/campaigns', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('campaigns')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 统计分析API
app.get('/api/stats/dashboard', async (req, res) => {
  try {
    // 获取客户统计
    const { data: clients } = await supabaseAdmin
      .from('clients')
      .select('relationship_status');
    
    // 获取订单统计
    const { data: orders } = await supabaseAdmin
      .from('orders')
      .select('order_status, order_value');
    
    // 计算统计数据
    const stats = {
      total_clients: clients?.length || 0,
      active_clients: clients?.filter(c => c.relationship_status === 'active').length || 0,
      total_orders: orders?.length || 0,
      total_revenue: orders?.reduce((sum, o) => sum + (parseFloat(o.order_value) || 0), 0) || 0,
      pending_orders: orders?.filter(o => o.order_status === 'pending').length || 0
    };
    
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 CRM API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Clients API: http://localhost:${PORT}/api/clients`);
  console.log(`📦 Orders API: http://localhost:${PORT}/api/orders`);
  console.log(`💬 Communications API: http://localhost:${PORT}/api/communications`);
  console.log(`📈 Campaigns API: http://localhost:${PORT}/api/campaigns`);
  console.log(`📊 Stats API: http://localhost:${PORT}/api/stats/dashboard`);
});

module.exports = app;


