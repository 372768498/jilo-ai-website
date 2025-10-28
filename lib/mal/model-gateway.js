// 模型抽象层 (Model Abstraction Layer)
// lib/mal/model-gateway.js

import { SupabaseService } from '../supabase/supabase-config'

// 模型配置
const MODEL_CONFIG = {
  image: [
    { name: 'NANOBANANA', priority: 1, costPerCall: 0.5, apiKey: 'NANOBANANA_API_KEY' },
    { name: 'Midjourney', priority: 2, costPerCall: 0.8, apiKey: 'MIDJOURNEY_API_KEY' },
    { name: 'DALL-E-3', priority: 3, costPerCall: 0.6, apiKey: 'DALL_E_API_KEY' }
  ],
  video: [
    { name: 'SORA2', priority: 1, costPerSecond: 2.0, apiKey: 'SORA_API_KEY' },
    { name: 'VEO3.1', priority: 2, costPerSecond: 1.8, apiKey: 'VEO_API_KEY' },
    { name: 'Pika', priority: 3, costPerSecond: 1.2, apiKey: 'PIKA_API_KEY' },
    { name: 'Runway', priority: 4, costPerSecond: 1.5, apiKey: 'RUNWAY_API_KEY' }
  ],
  text: [
    { name: 'Claude-3-Sonnet', priority: 1, costPer1kTokens: 0.003, apiKey: 'CLAUDE_API_KEY' },
    { name: 'GPT-4', priority: 2, costPer1kTokens: 0.03, apiKey: 'OPENAI_API_KEY' },
    { name: 'Gemini-Pro', priority: 3, costPer1kTokens: 0.001, apiKey: 'GEMINI_API_KEY' }
  ]
}

// 模型网关核心类
export class ModelGateway {
  constructor() {
    this.models = MODEL_CONFIG
    this.fallbackEnabled = true
    this.costTracking = true
  }

  // 图像生成
  async generateImage(prompt, style, brandPack, clientId, options = {}) {
    const startTime = Date.now()
    let lastError = null

    for (const model of this.models.image.sort((a, b) => a.priority - b.priority)) {
      try {
        console.log(`尝试使用 ${model.name} 生成图像...`)
        
        const result = await this._callImageModel(model, prompt, style, brandPack, options)
        
        // 记录成功调用
        if (this.costTracking) {
          await this._logCost(clientId, null, model.name, model.costPerCall, 0, 0, true)
        }
        
        console.log(`✅ ${model.name} 图像生成成功`)
        return {
          success: true,
          model: model.name,
          data: result,
          cost: model.costPerCall,
          processingTime: Date.now() - startTime
        }
        
      } catch (error) {
        console.error(`❌ ${model.name} 失败:`, error.message)
        lastError = error
        
        // 记录失败调用
        if (this.costTracking) {
          await this._logCost(clientId, null, model.name, 0, 0, 0, false, error.message)
        }
        
        // 如果不是最后一个模型，继续尝试下一个
        if (model.priority < this.models.image.length) {
          console.log(`尝试下一个模型...`)
          continue
        }
      }
    }

    // 所有模型都失败，转人工处理
    if (this.fallbackEnabled) {
      return await this._fallbackToHuman(clientId, 'image', prompt, style, lastError)
    }

    throw new Error(`所有图像模型都失败了。最后错误: ${lastError?.message}`)
  }

  // 视频生成
  async generateVideo(prompt, duration, style, brandPack, clientId, options = {}) {
    const startTime = Date.now()
    let lastError = null

    for (const model of this.models.video.sort((a, b) => a.priority - b.priority)) {
      try {
        console.log(`尝试使用 ${model.name} 生成视频...`)
        
        const result = await this._callVideoModel(model, prompt, duration, style, brandPack, options)
        const cost = model.costPerSecond * duration
        
        // 记录成功调用
        if (this.costTracking) {
          await this._logCost(clientId, null, model.name, cost, 0, 0, true)
        }
        
        console.log(`✅ ${model.name} 视频生成成功`)
        return {
          success: true,
          model: model.name,
          data: result,
          cost: cost,
          processingTime: Date.now() - startTime
        }
        
      } catch (error) {
        console.error(`❌ ${model.name} 失败:`, error.message)
        lastError = error
        
        // 记录失败调用
        if (this.costTracking) {
          await this._logCost(clientId, null, model.name, 0, 0, 0, false, error.message)
        }
        
        if (model.priority < this.models.video.length) {
          console.log(`尝试下一个模型...`)
          continue
        }
      }
    }

    // 所有模型都失败，转人工处理
    if (this.fallbackEnabled) {
      return await this._fallbackToHuman(clientId, 'video', prompt, duration, lastError)
    }

    throw new Error(`所有视频模型都失败了。最后错误: ${lastError?.message}`)
  }

  // 文本生成
  async generateText(prompt, clientId, options = {}) {
    const startTime = Date.now()
    let lastError = null

    for (const model of this.models.text.sort((a, b) => a.priority - b.priority)) {
      try {
        console.log(`尝试使用 ${model.name} 生成文本...`)
        
        const result = await this._callTextModel(model, prompt, options)
        const inputTokens = this._estimateTokens(prompt)
        const outputTokens = this._estimateTokens(result)
        const cost = (inputTokens + outputTokens) / 1000 * model.costPer1kTokens
        
        // 记录成功调用
        if (this.costTracking) {
          await this._logCost(clientId, null, model.name, cost, inputTokens, outputTokens, true)
        }
        
        console.log(`✅ ${model.name} 文本生成成功`)
        return {
          success: true,
          model: model.name,
          data: result,
          cost: cost,
          inputTokens: inputTokens,
          outputTokens: outputTokens,
          processingTime: Date.now() - startTime
        }
        
      } catch (error) {
        console.error(`❌ ${model.name} 失败:`, error.message)
        lastError = error
        
        // 记录失败调用
        if (this.costTracking) {
          await this._logCost(clientId, null, model.name, 0, 0, 0, false, error.message)
        }
        
        if (model.priority < this.models.text.length) {
          console.log(`尝试下一个模型...`)
          continue
        }
      }
    }

    throw new Error(`所有文本模型都失败了。最后错误: ${lastError?.message}`)
  }

  // 私有方法：调用图像模型
  async _callImageModel(model, prompt, style, brandPack, options) {
    const apiKey = process.env[model.apiKey]
    if (!apiKey) {
      throw new Error(`未配置 ${model.name} API 密钥`)
    }

    switch (model.name) {
      case 'NANOBANANA':
        return await this._callNANOBANANA(apiKey, prompt, style, brandPack, options)
      case 'Midjourney':
        return await this._callMidjourney(apiKey, prompt, style, brandPack, options)
      case 'DALL-E-3':
        return await this._callDALLE(apiKey, prompt, style, brandPack, options)
      default:
        throw new Error(`不支持的图像模型: ${model.name}`)
    }
  }

  // 私有方法：调用视频模型
  async _callVideoModel(model, prompt, duration, style, brandPack, options) {
    const apiKey = process.env[model.apiKey]
    if (!apiKey) {
      throw new Error(`未配置 ${model.name} API 密钥`)
    }

    switch (model.name) {
      case 'SORA2':
        return await this._callSORA(apiKey, prompt, duration, style, brandPack, options)
      case 'VEO3.1':
        return await this._callVEO(apiKey, prompt, duration, style, brandPack, options)
      case 'Pika':
        return await this._callPika(apiKey, prompt, duration, style, brandPack, options)
      case 'Runway':
        return await this._callRunway(apiKey, prompt, duration, style, brandPack, options)
      default:
        throw new Error(`不支持的视频模型: ${model.name}`)
    }
  }

  // 私有方法：调用文本模型
  async _callTextModel(model, prompt, options) {
    const apiKey = process.env[model.apiKey]
    if (!apiKey) {
      throw new Error(`未配置 ${model.name} API 密钥`)
    }

    switch (model.name) {
      case 'Claude-3-Sonnet':
        return await this._callClaude(apiKey, prompt, options)
      case 'GPT-4':
        return await this._callGPT4(apiKey, prompt, options)
      case 'Gemini-Pro':
        return await this._callGemini(apiKey, prompt, options)
      default:
        throw new Error(`不支持的文本模型: ${model.name}`)
    }
  }

  // 具体的模型调用实现
  async _callNANOBANANA(apiKey, prompt, style, brandPack, options) {
    const response = await fetch('https://api.nanobanana.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: `${prompt}, ${style}`,
        brand_pack: brandPack,
        ...options
      })
    })

    if (!response.ok) {
      throw new Error(`NANOBANANA API 错误: ${response.statusText}`)
    }

    const data = await response.json()
    return data.image_url
  }

  async _callMidjourney(apiKey, prompt, style, brandPack, options) {
    // Midjourney API 调用实现
    const response = await fetch('https://api.midjourney.com/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: `${prompt}, ${style}`,
        brand_pack: brandPack,
        ...options
      })
    })

    if (!response.ok) {
      throw new Error(`Midjourney API 错误: ${response.statusText}`)
    }

    const data = await response.json()
    return data.image_url
  }

  async _callDALLE(apiKey, prompt, style, brandPack, options) {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: `${prompt}, ${style}`,
        model: 'dall-e-3',
        size: options.size || '1024x1024',
        quality: options.quality || 'standard',
        n: 1
      })
    })

    if (!response.ok) {
      throw new Error(`DALL-E API 错误: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data[0].url
  }

  async _callSORA(apiKey, prompt, duration, style, brandPack, options) {
    // SORA API 调用实现
    const response = await fetch('https://api.openai.com/v1/video/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: `${prompt}, ${style}`,
        model: 'sora-2',
        duration: duration,
        ...options
      })
    })

    if (!response.ok) {
      throw new Error(`SORA API 错误: ${response.statusText}`)
    }

    const data = await response.json()
    return data.video_url
  }

  async _callClaude(apiKey, prompt, options) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: options.maxTokens || 4000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Claude API 错误: ${response.statusText}`)
    }

    const data = await response.json()
    return data.content[0].text
  }

  // 人工处理降级
  async _fallbackToHuman(clientId, contentType, prompt, additionalData, error) {
    console.log(`🔄 转人工处理: ${contentType}`)
    
    // 记录到 Supabase 的人工处理队列
    await SupabaseService.createEmergencyResponse(clientId, {
      anomalyType: 'model_failure',
      evidence: {
        contentType: contentType,
        prompt: prompt,
        additionalData: additionalData,
        error: error.message,
        timestamp: new Date().toISOString()
      },
      hypotheses: [
        { hypothesis: '所有AI模型都失败', confidence: 100 }
      ],
      solution: 'manual_processing',
      budgetAdjustment: { manualCost: 50 }, // 人工处理成本
      expectedResult: '人工生成内容，24小时内交付'
    })

    return {
      success: false,
      fallback: true,
      message: '已转人工处理，24小时内交付',
      estimatedCost: 50,
      processingTime: '24小时'
    }
  }

  // 成本记录
  async _logCost(clientId, contentId, modelName, cost, inputTokens, outputTokens, success, errorMessage = null) {
    try {
      await SupabaseService.logAPIUsage(clientId, {
        contentId: contentId,
        modelName: modelName,
        cost: cost,
        inputTokens: inputTokens,
        outputTokens: outputTokens,
        success: success,
        errorMessage: errorMessage
      })
    } catch (error) {
      console.error('成本记录失败:', error)
    }
  }

  // Token 估算（简化版）
  _estimateTokens(text) {
    return Math.ceil(text.length / 4) // 粗略估算
  }

  // 模型健康检查
  async healthCheck() {
    const results = {}
    
    for (const category of Object.keys(this.models)) {
      results[category] = {}
      
      for (const model of this.models[category]) {
        try {
          const apiKey = process.env[model.apiKey]
          if (!apiKey) {
            results[category][model.name] = { status: 'no_key', message: '未配置API密钥' }
            continue
          }
          
          // 简单的健康检查（根据具体API调整）
          results[category][model.name] = { status: 'healthy', message: 'API密钥已配置' }
          
        } catch (error) {
          results[category][model.name] = { status: 'error', message: error.message }
        }
      }
    }
    
    return results
  }
}

// 单例模式
export const modelGateway = new ModelGateway()

export default ModelGateway

