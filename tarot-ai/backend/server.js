require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const divinationRouter = require('./routes/divination');

const app = express();
const PORT = process.env.PORT || 3000;
const USE_MOCK_MODE = process.env.USE_MOCK_MODE === 'true';

// 中间件配置
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 静态文件服务（前端）
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// 路由配置
app.use('/api', divinationRouter);

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Tarot AI Backend is running',
    mode: USE_MOCK_MODE ? '🎭 Mock Mode (本地模拟)' : '🤖 Real API Mode (真实 API)'
  });
});

// 根路由重定向到前端
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🔮 AI 塔罗牌占卜服务已启动！');
  console.log('='.repeat(60));
  console.log(`🚀 后端服务: http://localhost:${PORT}`);
  console.log(`📍 前端网页: http://localhost:${PORT}`);
  console.log(`🎯 占卜 API: http://localhost:${PORT}/api/divination`);
  
  if (USE_MOCK_MODE) {
    console.log('\n🎭 当前运行模式: 本地模拟 (Mock Mode)');
    console.log('   📝 占卜解读使用本地生成，不调用真实 API');
    console.log('   ✅ 立即可用，无需 API Key');
  } else {
    console.log('\n🤖 当前运行模式: 真实 API 模式');
    console.log('   ✨ 占卜解读由 Deepseek AI 生成');
    console.log('   🔑 已配置 Deepseek API Key');
  }
  
  console.log('\n📖 查看详细指南: http://localhost:' + PORT);
  console.log('='.repeat(60) + '\n');
});
