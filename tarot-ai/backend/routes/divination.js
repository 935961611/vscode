const express = require('express');
const axios = require('axios');
const router = express.Router();
const cards = require('../config/cards.json');

// Deepseek API 配置
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const USE_MOCK_MODE = process.env.USE_MOCK_MODE === 'true' || DEEPSEEK_API_KEY === 'mock';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// ========================
// 本地模拟占卜文本生成函数
// ========================
function generateMockDivination(question, selectedCards) {
  const mockTexts = [
    `这道问题引起了塔罗牌的深思。${selectedCards[0].name}代表着${selectedCards[0].upright}，${selectedCards[1].name}预示着${selectedCards[1].upright}，而${selectedCards[2].name}则暗示${selectedCards[2].upright}。

综合这三张牌的含义，我感受到一种深层的启示。关于"${question}"，宇宙在向你传达：需要保持耐心和信心。眼前的困难只是暂时的，真正的机会正在逐渐靠近。

建议：不要急躁，用心感受周围的信号。把握每一个小的机会，它们会堆积成大的成功。相信直觉，因为现在的直觉特别准确。🌙`,
    
    `塔罗的智慧在此显露。${selectedCards[0].name}与${selectedCards[1].name}的组合暗示着一个转折点的到来。${selectedCards[2].name}则提醒你要保持警惕。

针对你的问题"${question}"，我感察到：变化正在酝酿中。这不是一个停滞的时期，而是一个充满可能性的时期。你需要做的是准备自己，因为机会青睐那些已经做好准备的人。

行动建议：整理思路，列出具体的行动计划。同时要开放心态，接纳新的可能性。✨`,
    
    `神秘的力量在这三张牌中交汇。${selectedCards[0].name}象征新的可能，${selectedCards[1].name}带来的是${selectedCards[1].upright}的能量，而${selectedCards[2].name}暗示着${selectedCards[2].reversed}的挑战。

对于"${question}"这个问题，我收到的讯息是：你正站在一个选择的十字路口。每条路上都有机遇，也都有挑战。但最重要的是，你有足够的力量去面对任何选择的后果。

灵性提示：聆听内心的声音，那往往比外界的建议更能指引你的方向。🔮`,
  ];
  
  return mockTexts[Math.floor(Math.random() * mockTexts.length)];
}

/**
 * 占卜接口
 * POST /api/divination
 * 
 * 请求体：
 * {
 *   question: string,        // 用户的问题
 *   cardIds: [number, number, number]  // 3 张选中卡牌的 ID
 * }
 * 
 * 响应：
 * {
 *   success: boolean,
 *   cards: Array,           // 选中卡牌的详细信息
 *   divination: string      // AI 占卜解读
 * }
 */
router.post('/divination', async (req, res) => {
  try {
    const { question, cardIds } = req.body;

    // 验证输入
    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        error: '问题不能为空'
      });
    }

    if (!Array.isArray(cardIds) || cardIds.length !== 3) {
      return res.status(400).json({
        success: false,
        error: '必须选择 3 张卡牌'
      });
    }

    // 验证卡牌 ID 有效性
    const selectedCards = [];
    for (const id of cardIds) {
      if (typeof id !== 'number' || id < 0 || id >= cards.length) {
        return res.status(400).json({
          success: false,
          error: `无效的卡牌 ID: ${id}`
        });
      }
      selectedCards.push(cards[id]);
    }

    // 检查是否使用模拟模式
    if (USE_MOCK_MODE) {
      console.log('🎭 使用本地模拟模式（Mock Mode）');
      const mockDivination = generateMockDivination(question, selectedCards);
      
      return res.json({
        success: true,
        cards: selectedCards,
        divination: mockDivination,
        mode: 'mock' // 标识这是模拟数据
      });
    }

    // 检查 API Key 是否配置
    if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'sk-your_actual_api_key_here') {
      return res.status(500).json({
        success: false,
        error: '❌ 未配置有效的 Deepseek API Key\n\n' +
               '解决方案：\n' +
               '1. 编辑 backend/.env 文件\n' +
               '2. 从 https://platform.deepseek.com 获取真实 API Key\n' +
               '3. 替换 DEEPSEEK_API_KEY=sk-your_actual_api_key_here\n' +
               '4. 重启后端服务\n\n' +
               '或者保留 USE_MOCK_MODE=true 使用本地模拟模式'
      });
    }

    // 生成占卜提示词
    const systemPrompt = `你是一位神秘的塔罗牌占卜师，具有深厚的灵性智慧。你用优雅、诗意、深思熟虑的语言为客户解读塔罗牌。

请根据以下信息为用户提供占卜解读：
- 保持回答在 200-300 字之间
- 使用温和、鼓励性的语言
- 结合塔罗牌的象征意义和用户的具体问题
- 提供洞察、建议和希望
- 语言应该是神秘而又现实的
- 用中文回答`;

    const userPrompt = `用户的问题：${question}

抽中的三张塔罗牌：
1. ${selectedCards[0].name}（${selectedCards[0].englishName}）
   - 正位含义：${selectedCards[0].upright}
   - 逆位含义：${selectedCards[0].reversed}

2. ${selectedCards[1].name}（${selectedCards[1].englishName}）
   - 正位含义：${selectedCards[1].upright}
   - 逆位含义：${selectedCards[1].reversed}

3. ${selectedCards[2].name}（${selectedCards[2].englishName}）
   - 正位含义：${selectedCards[2].upright}
   - 逆位含义：${selectedCards[2].reversed}

请综合这三张牌的含义，为用户提供深入的占卜解读。`;

    // 调用 Deepseek API
    console.log('调用 Deepseek API...');
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.95
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    // 提取 AI 响应
    const aiResponse = response.data.choices[0].message.content;

    // 返回结果
    res.json({
      success: true,
      cards: selectedCards,
      divination: aiResponse
    });

  } catch (error) {
    console.error('占卜 API 错误:', error.message);
    
    // 处理不同类型的错误
    if (error.response) {
      // API 响应错误
      console.error('Deepseek API 错误响应:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        return res.status(401).json({
          success: false,
          error: 'Deepseek API Key 无效，请检查环境变量配置'
        });
      }
      
      if (error.response.status === 429) {
        return res.status(429).json({
          success: false,
          error: '请求过于频繁，请稍后再试'
        });
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        error: 'AI 服务响应超时，请稍后重试'
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || '占卜过程中出错，请稍后重试'
    });
  }
});

module.exports = router;
