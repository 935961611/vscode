# 🔮 AI 塔罗牌占卜网站

一个结合 AI（Deepseek）的神秘塔罗牌占卜网站。用户输入问题，系统随机抽取 3 张塔罗牌，并通过 AI 为用户生成深入的占卜解读。

## ✨ 功能特性

- **3D 翻牌动画**：流畅的 CSS 3D 变换效果，呈现神秘的翻牌体验
- **完整 78 张牌库**：包含所有大阿卡那和小阿卡那牌（权杖、圣杯、宝剑、五角星）
- **AI 智能解读**：通过 Deepseek API 进行自然语言生成，提供个性化的占卜建议
- **神秘华丽的 UI**：深紫色主题 + 金色纹理，星空背景，营造神秘氛围
- **响应式设计**：完美支持桌面、平板、手机设备
- **打字机效果**：AI 占卜解读文本逐字显示，增强代入感

## 🏗️ 项目结构

```
tarot-ai/
├── frontend/                 # 前端应用
│   ├── index.html           # HTML 主页面
│   ├── css/
│   │   └── style.css        # 样式表（星空、紫金主题、动画）
│   └── js/
│       └── app.js           # 交互逻辑、3D 翻牌、API 调用
├── backend/                  # 后端服务
│   ├── server.js            # Express 服务器启动
│   ├── package.json         # Node.js 依赖
│   ├── .env.example         # 环境变量示例
│   ├── routes/
│   │   └── divination.js    # 占卜 API 接口
│   └── config/
│       └── cards.json       # 78 张塔罗牌数据库
└── README.md                # 本文件
```

## 🚀 快速开始

### 前置需求

- **Node.js** (v14 或更高版本)
- **npm** 或 **yarn**
- **Deepseek API Key**（从 https://platform.deepseek.com 获取）

### 安装步骤

#### 1. 后端安装

```bash
cd backend
npm install
```

#### 2. 配置 API Key

复制 `.env.example` 为 `.env`，并填入你的 Deepseek API Key：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
DEEPSEEK_API_KEY=your_api_key_here
PORT=3000
```

#### 3. 启动后端服务

```bash
npm start
```

你应该看到如下输出：

```
🚀 Tarot AI Backend running on http://localhost:3000
📍 Frontend available at http://localhost:3000
🔮 Divination API at http://localhost:3000/api/divination
```

#### 4. 打开网站

在浏览器中访问：**http://localhost:3000**

## 📖 使用说明

1. **输入问题**：在文本框中输入你的问题，例如"我最近的事业运如何？"
2. **点击占卜**：点击"开始占卜"按钮
3. **观看翻牌**：欣赏 3 张卡牌的 3D 翻牌动画
4. **查看解读**：AI 占卜师将为你生成详细的占卜解读
5. **重新占卜**：点击"重新开始占卜"再来一次

## 🎨 设计特色

### 颜色方案

- **主色调**：深紫色（`#2a1a4e`）
- **强调色**：金色（`#d4af37`）
- **背景**：深紫渐变 + 星空效果

### 动画效果

- **星空闪烁**：背景星点渐进式闪烁
- **3D 翻牌**：CSS `perspective` + `rotateY` 变换
- **打字机效果**：占卜文本逐字显示
- **平滑过渡**：所有交互都采用流畅的动画过渡

## 🔌 API 参考

### 占卜接口

**端点**：`POST /api/divination`

**请求体**：

```json
{
  "question": "我最近的事业运如何？",
  "cardIds": [5, 19, 45]
}
```

**响应**：

```json
{
  "success": true,
  "cards": [
    {
      "id": 5,
      "name": "教皇",
      "englishName": "The Hierophant",
      "suit": "Major",
      "upright": "信仰、灵性、传统、教导、仪式",
      "reversed": "固执、教条、反叛、非理性信仰"
    },
    // ... 其他两张牌
  ],
  "divination": "AI 生成的占卜解读文本..."
}
```

**错误响应**：

```json
{
  "success": false,
  "error": "错误描述信息"
}
```

### 健康检查

**端点**：`GET /api/health`

**响应**：

```json
{
  "status": "ok",
  "message": "Tarot AI Backend is running"
}
```

## 📊 塔罗牌数据结构

每张牌包含以下信息：

```json
{
  "id": 0,
  "name": "愚者",
  "englishName": "The Fool",
  "suit": "Major",
  "number": 0,
  "upright": "冒险、新开始、纯真、跳跃信心",
  "reversed": "犯错、粗心、缺乏方向感"
}
```

### 牌花色分类

- **大阿卡那 (Major)**：0-21 号（共 22 张）- 代表人生的重大转折
- **权杖花色 (Wands)**：22-35 号（共 14 张）- 代表行动、创意、激情
- **圣杯花色 (Cups)**：36-49 号（共 14 张）- 代表情感、关系、直觉
- **宝剑花色 (Swords)**：50-63 号（共 14 张）- 代表思想、冲突、智慧
- **五角星花色 (Pentacles)**：64-77 号（共 14 张）- 代表物质、财富、实践

## ⚙️ 环境变量

| 变量名 | 说明 | 示例 |
|-------|------|------|
| `DEEPSEEK_API_KEY` | Deepseek API 密钥 | `sk-xxxxxxxxxxxxx` |
| `PORT` | 服务器监听端口 | `3000` |

## 🔐 安全建议

1. **不要在代码中硬编码 API Key**，使用 `.env` 文件管理
2. **将 `.env` 添加到 `.gitignore`**，防止密钥泄露
3. **在生产环境中使用反向代理**，如 Nginx 或 Apache
4. **启用 HTTPS**，保护用户数据传输安全
5. **实施请求速率限制**，防止 API 滥用

## 🐛 故障排除

### 问题：显示"服务器未配置 API Key"

**解决方案**：
- 检查 `.env` 文件是否存在
- 确认 `DEEPSEEK_API_KEY` 值是否正确填写
- 确保后端已重启（修改 `.env` 后需要重启）

### 问题：卡牌不翻转

**解决方案**：
- 检查浏览器是否支持 CSS 3D Transforms（Chrome、Firefox、Safari 都支持）
- 打开浏览器控制台（F12）检查是否有 JavaScript 错误
- 清除浏览器缓存后重新加载

### 问题：AI 占卜返回错误

**解决方案**：
- 检查网络连接是否正常
- 验证 Deepseek API Key 是否有效且有足够配额
- 查看后端控制台输出的错误信息
- 确保问题输入不为空且长度合理

## 📱 浏览器兼容性

| 浏览器 | 支持状态 |
|--------|---------|
| Chrome | ✅ 完全支持 |
| Firefox | ✅ 完全支持 |
| Safari | ✅ 完全支持 |
| Edge | ✅ 完全支持 |
| IE 11 | ❌ 不支持 |

## 🎓 技术栈

### 前端

- **HTML5**：语义化标签
- **CSS3**：Flexbox、Grid、CSS 3D Transforms、动画
- **Vanilla JavaScript**：无框架依赖，原生 API

### 后端

- **Node.js**：JavaScript 运行环境
- **Express.js**：Web 框架
- **Axios**：HTTP 客户端（调用 Deepseek API）
- **CORS**：跨域资源共享
- **dotenv**：环境变量管理

### API

- **Deepseek API**：AI 文本生成（`deepseek-chat` 模型）

## 📈 性能优化

- **前端优化**：
  - 使用 CSS 3D 变换而非 JavaScript 动画，提高性能
  - 采用 Flexbox 布局，避免复杂计算

- **后端优化**：
  - 使用连接池管理 HTTP 请求
  - 实施请求超时机制（30 秒）
  - 适当的错误处理和日志记录

## 🚀 部署建议

### 本地开发

```bash
npm start
```

### 生产环境部署（使用 PM2）

```bash
npm install -g pm2
pm2 start server.js --name "tarot-ai"
pm2 save
pm2 startup
```

### Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
COPY frontend/ ../frontend
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
```

构建和运行：

```bash
docker build -t tarot-ai .
docker run -p 3000:3000 -e DEEPSEEK_API_KEY=your_key tarot-ai
```
 
## 📝 许可证

MIT License

## 💬 联系与支持

如遇问题或有建议，欢迎提出 Issue 或 Pull Request。

---

**现在就开始体验神秘的塔罗牌占卜吧！** 🔮✨
