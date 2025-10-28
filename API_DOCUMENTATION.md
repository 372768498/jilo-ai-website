# 🚀 CRM API 接口文档

## API服务器

**基础URL**: `http://localhost:3001`

## 📋 接口列表

### 1. 健康检查
```
GET /api/health
```

**响应示例**:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-27T03:00:00.000Z",
  "database": "connected"
}
```

### 2. 客户管理

#### 获取所有客户
```
GET /api/clients
```

**响应示例**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "uuid",
      "company_name": "浙江优逸行医疗科技有限公司",
      "industry": "医疗设备制造",
      "relationship_status": "active",
      ...
    }
  ]
}
```

#### 获取单个客户
```
GET /api/clients/:id
```

#### 创建客户
```
POST /api/clients
Content-Type: application/json

{
  "company_name": "新客户公司",
  "industry": "医疗设备制造",
  "contact_email": "contact@example.com",
  "relationship_status": "prospect"
}
```

#### 更新客户
```
PUT /api/clients/:id
Content-Type: application/json

{
  "relationship_status": "active"
}
```

#### 删除客户
```
DELETE /api/clients/:id
```

### 3. 订单管理

#### 获取所有订单
```
GET /api/orders
```

#### 获取单个订单
```
GET /api/orders/:id
```

#### 创建订单
```
POST /api/orders
Content-Type: application/json

{
  "client_id": "uuid",
  "order_number": "ORD-001",
  "order_date": "2025-10-27",
  "order_value": 100000,
  "products": ["产品1", "产品2"]
}
```

### 4. 沟通记录

#### 获取所有沟通记录
```
GET /api/communications
```

#### 创建沟通记录
```
POST /api/communications
Content-Type: application/json

{
  "client_id": "uuid",
  "channel": "email",
  "communication_type": "consultation",
  "subject": "产品咨询",
  "summary": "客户询问产品详情"
}
```

### 5. 营销活动

#### 获取所有营销活动
```
GET /api/campaigns
```

#### 创建营销活动
```
POST /api/campaigns
Content-Type: application/json

{
  "campaign_name": "2025春季推广",
  "campaign_type": "content_marketing",
  "start_date": "2025-03-01",
  "budget": 50000
}
```

### 6. 统计分析

#### 获取仪表板数据
```
GET /api/stats/dashboard
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "total_clients": 2,
    "active_clients": 2,
    "total_orders": 0,
    augment: 0,
    "pending_orders": 0
  }
}
```

## 🧪 测试API

### 使用curl

```bash
# 健康检查
curl http://localhost:3001/api/health

# 获取客户列表
curl http://localhost:3001/api/clients

# 创建客户
curl -X POST http://localhost:3001/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "测试公司",
    "industry": "制造业",
    "contact_email": "test@example.com"
  }'

# 获取统计数据
curl http://localhost:3001/api/stats/dashboard
```

### 使用JavaScript

```javascript
// 获取客户列表
const response = await fetch('http://localhost:3001/api/clients');
const result = await response.json();
console.log(result.data);

// 创建客户
const response = await fetch('http://localhost:3001/api/clients', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    company_name: '新公司',
    industry: '制造业',
    contact_email: 'new@example.com'
  })
});
```

### 使用Python

```python
import requests

# 获取客户列表
response = requests.get('http://localhost:3001/api/clients')
print(response.json())

# 创建客户
response = requests.post(
    'http://localhost:3001/api/clients',
    json={
        'company_name': '新公司',
        'industry': '制造业',
        'contact_email': 'new@example.com'
    }
)
print(response.json())
```

## 🔒 认证

当前版本使用Supabase的service role key进行认证。在生产环境中，建议：

1. 实施JWT认证
2. 使用middleware验证token
3. 根据用户角色限制权限

## 📊 错误处理

所有API返回格式：
```json
{
  "success": true/false,
  "data": {...}  // 成功时
  "error": "error message"  // 失败时
}
```

常见错误码：
- `200`: 成功
- `201`: 创建成功
- `400`: 请求错误
- `404`: 资源不存在
- `500`: 服务器错误

## 🎯 下一步

1. ✅ 启动API服务器: `npm run api`
2. ✅ 测试API接口
3. ✅ 集成前端应用
4. ⏳ 添加认证机制
5. ⏳ 实现实时更新（WebSocket）


