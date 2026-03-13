# 🚀 AI 塔罗牌占卜网站 - 快速启动指南

## 5 分钟快速上手

### 第 1 步：获取 Deepseek API Key（2 分钟）

1. 访问 https://platform.deepseek.com
2. 注册账户并登录
3. 进入 API Keys 页面
4. 点击"Create New Key"生成新的 API Key
5. 复制 API Key（稍后会用到）

### 第 2 步：配置后端（1 分钟）

```bash
# 进入 backend 目录
cd backend

# 复制环境变量文件
cp .env.example .env

# 编辑 .env 文件，替换 YOUR_API_KEY_HERE
# 使用你喜欢的编辑器打开 .env，填入从 Deepseek 复制的 API Key
```

**Windows:**
```bash
notepad .env
```

**Mac/Linux:**
```bash
nano .env
```

然后找到这一行：
```env
DEEPSEEK_API_KEY=your_api_key_here
```

替换为：
```env
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxx
```

### 第 3 步：安装依赖并启动（2 分钟）

```bash
# 仍在 backend 目录中
npm install

# 启动服务器
npm start
```

你应该看到输出：
```
🚀 Tarot AI Backend running on http://localhost:3000
📍 Frontend available at http://localhost:3000
🔮 Divination API at http://localhost:3000/api/divination
```

### 第 4 步：打开网站

在浏览器中访问：**http://localhost:3000**

就这样！现在你可以开始体验 AI 塔罗牌占卜了！

---

## 🎯 完整功能流程

1. **输入问题** → 在文本框中输入你的占卜问题
2. **点击占卜** → 系统随机从 78 张牌中选 3 张
3. **看翻牌** → 观看神秘的 3D 翻牌动画
4. **获取解读** → AI 占卜师为你生成个性化解读
5. **重新占卜** → 点击按钮继续占卜

---

## ⚠️ 常见问题

### Q: 遇到"API Key 无效"错误？

A: 请检查：
- ✅ Deepseek API Key 是否正确复制（no 空格）
- ✅ `.env` 文件是否保存成功
- ✅ 后端服务是否重启过（修改 `.env` 后需要重启）

### Q: 卡牌不翻转？

A: 
- 使用现代浏览器（Chrome、Firefox、Safari、Edge）
- 清除浏览器缓存：Ctrl+Shift+Delete
- 按 F5 刷新页面

### Q: 无法连接到服务器？

A:
- 确保后端已启动（看到 `🚀` 的输出）
- 确保访问的是 `http://localhost:3000`（不是 https）
- 检查是否有防火墙阻止 3000 端口

### Q: 想换一个端口？

A: 编辑 `.env` 文件：
```env
PORT=8080
```
然后重启服务器，访问 `http://localhost:8080`

---

## 📂 项目文件说明

```
tarot-ai/
├── frontend/              # 🎨 前端应用
│   ├── index.html        # 网页主体
│   ├── css/style.css     # 样式文件（紫金主题、3D 效果等）
│   └── js/app.js         # 交互逻辑和 API 调用
│
├── backend/              # ⚙️ 后端服务
│   ├── server.js         # 服务器启动文件
│   ├── package.json      # 项目依赖配置
│   ├── .env.example      # 环境变量示例（复制成 .env）
│   ├── .env              # 你的本地配置（不要上传）
│   ├── routes/
│   │   └── divination.js # API 接口（调用 Deepseek）
│   └── config/
│       └── cards.json    # 78 张塔罗牌数据库
│
├── README.md             # 📖 详细文档
└── SETUP.md              # 本文件
```

---

## 🔧 项目结构说明

### 前端（HTML + CSS + JavaScript）
- **无需任何构建工具**，直接在浏览器运行
- **响应式设计**：在手机、平板、桌面都能用
- **3D 翻牌**：使用 CSS 3D Transform（很流畅）
- **打字机效果**：AI 占卜文本逐字显示

### 后端（Node.js + Express）
- **简单轻量**：Express 框架
- **调用 Deepseek API**：用于生成占卜解读
- **CORS 支持**：允许前端跨域请求
- **错误处理**：完善的异常捕获和提示

### 数据
- **78 张完整塔罗牌**：
  - 22 张大阿卡那（愚者、魔术师、女祭司等）
  - 56 张小阿卡那（分为 4 花色：权杖、圣杯、宝剑、五角星）
- 每张牌都有中英文名、正逆位含义

---

## 🎨 UI/UX 亮点

- **深紫 + 金色主题**：神秘、高级、易于聚焦
- **星空背景**：微妙闪烁，营造宇宙感
- **3D 翻牌效果**：CSS 透视变换，真实感强
- **流畅动画**：所有交互都有过渡效果，舒适的用户体验
- **响应式布局**：自动适应各种屏幕尺寸

---

## 💡 进阶用法

### 自定义端口

编辑 `backend/.env`：
```env
PORT=9000
```

然后访问 `http://localhost:9000`

### 调整 AI 占卜风格

编辑 `backend/routes/divination.js`，修改系统提示词：

```javascript
const systemPrompt = `你是一位...（自定义提示词）`;
```

### 添加更多卡牌快速查询

在 `frontend/js/app.js` 中的 `getCardName` 函数中添加自定义映射

---

## 🐛 调试技巧

### 查看网络请求

1. 打开浏览器开发者工具（F12）
2. 切换到"Network"标签
3. 进行占卜操作
4. 查看 `/api/divination` 请求的详情

### 查看控制台错误

1. 打开浏览器开发者工具（F12）
2. 切换到"Console"标签
3. 查看红色的错误信息

### 查看后端日志

后端服务器的输出会显示在你运行 `npm start` 的终端中

---

## ✅ 测试清单

- [ ] 后端成功启动（看到 🚀 的输出）
- [ ] 前端页面正确加载（http://localhost:3000）
- [ ] 输入问题并点击占卜
- [ ] 3 张卡牌依次翻转
- [ ] AI 占卜文本正确显示
- [ ] 可以点击"重新开始占卜"进行第二次占卜

---

## 🚀 下一步建议

### 本地测试完成后

- [ ] 增加占卜历史记录功能
- [ ] 添加不同的占卜类型（单牌、三张牌、凯尔特十字等）
- [ ] 集成用户注册和登录
- [ ] 保存占卜历史到数据库
- [ ] 部署到云服务（如 Heroku、Vercel、Railway）

### 部署到服务器

参考 [README.md](./README.md) 的部署建议部分

---

## 📞 快速参考

| 命令 | 说明 |
|-----|------|
| `npm install` | 安装依赖 |
| `npm start` | 启动后端服务 |
| `Ctrl+C` | 停止服务 |

| URL | 说明 |
|-----|------|
| `http://localhost:3000` | 前端网页 |
| `http://localhost:3000/api/health` | 健康检查 |
| `http://localhost:3000/api/divination` | 占卜 API |

---

**祝你使用愉快！如有问题，请参考 README.md 详细文档。** 🔮✨
