// ========================
// 塔罗牌占卜前端应用
// ========================

// 完整的 78 张塔罗牌库（用于前端显示）

const tarotCards = [
  { id: 0, name: '愚者', suit: 'Major' },
  { id: 1, name: '魔术师', suit: 'Major' },
  { id: 2, name: '女祭司', suit: 'Major' },
  { id: 3, name: '皇后', suit: 'Major' },
  { id: 4, name: '皇帝', suit: 'Major' },
  { id: 5, name: '教皇', suit: 'Major' },
  { id: 6, name: '恋人', suit: 'Major' },
  { id: 7, name: '战车', suit: 'Major' },
  { id: 8, name: '力量', suit: 'Major' },
  { id: 9, name: '隐士', suit: 'Major' },
  { id: 10, name: '命运之轮', suit: 'Major' },
  { id: 11, name: '正义', suit: 'Major' },
  { id: 12, name: '吊人', suit: 'Major' },
  { id: 13, name: '死神', suit: 'Major' },
  { id: 14, name: '节制', suit: 'Major' },
  { id: 15, name: '恶魔', suit: 'Major' },
  { id: 16, name: '高塔', suit: 'Major' },
  { id: 17, name: '星辰', suit: 'Major' },
  { id: 18, name: '月亮', suit: 'Major' },
  { id: 19, name: '太阳', suit: 'Major' },
  { id: 20, name: '审判', suit: 'Major' },
  { id: 21, name: '世界', suit: 'Major' },
  // 小阿卡那省略，只用 ID 映射
];

let currentState = 'form'; // form, flipping, result
let selectedCardIds = [];

// ========================
// DOM 元素引用
// ========================
const divinationForm = document.getElementById('divinationForm');
const cardsSection = document.getElementById('cardsSection');
const resultSection = document.getElementById('resultSection');
const questionInput = document.getElementById('question');
const divinationBtn = document.getElementById('divinationBtn');
const restartBtn = document.getElementById('restartBtn');

// ========================
// 初始化
// ========================
document.addEventListener('DOMContentLoaded', () => {
  divinationBtn.addEventListener('click', handleDivination);
  restartBtn.addEventListener('click', handleRestart);
});

// ========================
// 事件处理函数
// ========================

/**
 * 处理占卜按钮点击
 */
async function handleDivination() {
  const question = questionInput.value.trim();

  if (!question) {
    alert('请输入你的问题');
    return;
  }

  // 隐藏表单，显示卡牌区域
  divinationForm.style.display = 'none';
  cardsSection.style.display = 'block';
  resultSection.style.display = 'none';

  // 禁用按钮防止重复提交
  divinationBtn.disabled = true;
  divinationBtn.classList.add('loading');

  // 随机选择 3 张卡牌
  selectedCardIds = selectRandomCards(3);

  // 执行翻牌动画
  await performCardFlip();

  // 调用后端 API 获取占卜解读
  await fetchDivination(question);

  // 启用按钮
  divinationBtn.disabled = false;
  divinationBtn.classList.remove('loading');
}

/**
 * 处理重新开始按钮点击
 */
function handleRestart() {
  // 重置状态
  currentState = 'form';
  selectedCardIds = [];

  // 重置 UI
  questionInput.value = '';
  divinationForm.style.display = 'block';
  resultSection.style.display = 'none';
  cardsSection.style.display = 'none';

  // 重置卡牌
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.classList.remove('flipped');
  });

  // 滚动回顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================
// 核心逻辑函数
// ========================

/**
 * 从 78 张牌中随机选择指定数量的牌
 */
function selectRandomCards(count) {
  const selected = [];
  const available = Array.from({ length: 78 }, (_, i) => i);

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    selected.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }

  return selected;
}

/**
 * 执行翻牌动画
 */
async function performCardFlip() {
  const cards = document.querySelectorAll('.card');

  // 依次翻每张牌，每张之间延时 600ms
  for (let i = 0; i < 3; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        const card = cards[i];
        card.classList.add('flipped');
        updateCardDisplay(card, selectedCardIds[i], i);
        resolve();
      }, 600 * (i + 1));
    });
  }
}

/**
 * 更新卡牌显示内容
 */
function updateCardDisplay(cardElement, cardId, position) {
  const cardFront = cardElement.querySelector('.card-front');
  const cardInner = cardFront.querySelector('.card-inner');

  // 根据卡牌 ID 获取卡牌信息
  const cardName = getCardName(cardId);
  
  // 更新卡牌显示
  cardInner.textContent = getCardEmoji(cardId);
  cardElement.setAttribute('data-card-id', cardId);
  
  // 更新卡牌信息区域
  const cardInfo = document.getElementById(`cardInfo-${position}`);
  cardInfo.innerHTML = `
    <h4>${cardName}</h4>
    <p>卡牌 ID: ${cardId}</p>
  `;
}

/**
 * 根据卡牌 ID 获取卡牌名称
 */
function getCardName(cardId) {
  const cardNames = [
    // 大阿卡那
    '愚者', '魔术师', '女祭司', '皇后', '皇帝', '教皇', '恋人', '战车',
    '力量', '隐士', '命运之轮', '正义', '吊人', '死神', '节制', '恶魔',
    '高塔', '星辰', '月亮', '太阳', '审判', '世界',
    // 权杖花色
    '权杖一', '权杖二', '权杖三', '权杖四', '权杖五', '权杖六', '权杖七', '权杖八', '权杖九', '权杖十',
    '权杖侍者', '权杖骑士', '权杖皇后', '权杖国王',
    // 圣杯花色
    '圣杯一', '圣杯二', '圣杯三', '圣杯四', '圣杯五', '圣杯六', '圣杯七', '圣杯八', '圣杯九', '圣杯十',
    '圣杯侍者', '圣杯骑士', '圣杯皇后', '圣杯国王',
    // 宝剑花色
    '宝剑一', '宝剑二', '宝剑三', '宝剑四', '宝剑五', '宝剑六', '宝剑七', '宝剑八', '宝剑九', '宝剑十',
    '宝剑侍者', '宝剑骑士', '宝剑皇后', '宝剑国王',
    // 五角星花色
    '五角星一', '五角星二', '五角星三', '五角星四', '五角星五', '五角星六', '五角星七', '五角星八', '五角星九', '五角星十',
    '五角星侍者', '五角星骑士', '五角星皇后', '五角星国王'
  ];

  return cardNames[cardId] || `牌片 ${cardId}`;
}

/**
 * 获取卡牌 emoji
 */
function getCardEmoji(cardId) {
  if (cardId < 22) {
    return '🌙'; // 大阿卡那
  } else if (cardId < 36) {
    return '🔥'; // 权杖
  } else if (cardId < 50) {
    return '💧'; // 圣杯
  } else if (cardId < 64) {
    return '⚔️'; // 宝剑
  } else {
    return '💰'; // 五角星
  }
}

/**
 * 调用后端 API 获取占卜解读
 */
async function fetchDivination(question) {
  try {
    const resultText = document.getElementById('resultText');

    // 显示加载状态
    resultText.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>AI 占卜师正在为你解读...</p>
      </div>
    `;

    // 显示结果区域
    resultSection.style.display = 'block';
    
    // 滚动到结果区域
    setTimeout(() => {
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);

    // 调用后端 API
    const response = await fetch('https://tarot-backend-c0ew.onrender.com/api/divination', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: question,
        cardIds: selectedCardIds
      })
    });

    if (!response.ok) {
      throw new Error(`API 错误: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || '获取占卜结果失败');
    }

    // 更新卡牌信息（从后端返回的完整数据）
    updateCardInfoFromBackend(data.cards);

    // 显示占卜结果，带有打字机效果
    displayDivinationResult(data.divination);

  } catch (error) {
    console.error('错误:', error);
    const resultText = document.getElementById('resultText');
    resultText.innerHTML = `
      <div style="color: #ff6b6b; text-align: center;">
        <p>⚠️ 获取占卜结果失败</p>
        <p style="font-size: 0.9rem; margin-top: 10px;">${error.message}</p>
        <p style="font-size: 0.85rem; color: #aaa; margin-top: 15px;">
          请确保：<br/>
          1. 后端服务已启动<br/>
          2. 已配置正确的 DEEPSEEK_API_KEY<br/>
          3. 网络连接正常
        </p>
      </div>
    `;
  }
}

/**
 * 从后端数据更新卡牌信息
 */
function updateCardInfoFromBackend(cardsData) {
  cardsData.forEach((card, index) => {
    const cardInfo = document.getElementById(`cardInfo-${index}`);
    if (cardInfo && card) {
      cardInfo.innerHTML = `
        <h4>${card.name}</h4>
        <p style="font-size: 0.85rem; color: #d4af37; margin: 5px 0;">
          ${card.englishName}
        </p>
        <p style="font-size: 0.8rem; margin-top: 8px;">
          <strong>正位：</strong> ${card.upright}
        </p>
      `;
    }
  });
}

/**
 * 显示占卜结果，带打字机效果
 */
function displayDivinationResult(text) {
  const resultText = document.getElementById('resultText');
  resultText.innerHTML = '';

  let index = 0;
  const speed = 30; // 毫秒

  function typeWriter() {
    if (index < text.length) {
      resultText.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
}

// ========================
// 辅助函数
// ========================

/**
 * 显示通知消息
 */
function showNotification(message, type = 'info') {
  console.log(`[${type}] ${message}`);
}
