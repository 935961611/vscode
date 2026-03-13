## 🚀 快速启动指南（无需真实 API Key）

### 你现在有两种选择：

---

## ✅ 方案 1：使用本地模拟模式（推荐新手）

这样你可以 **立即测试整个系统**，无需真实 API Key！

### 1️⃣ 启动后端

```bash
cd backend
npm start
```

你会看到：
```
🚀 Tarot AI Backend running on http://localhost:3000
```

### 2️⃣ 打开前端网页

访问：**http://localhost:3000**

### 3️⃣ 开始占卜

- 输入一个问题
- 点击「开始占卜」
- 3 张卡牌会翻转
- 你会看到 **🎭 Mock 模式** 生成的占卜结果

> **提示**：mock 模式每次都会随机生成不同的占卜解读，模拟一个真实的 AI 响应

---

## 🔑 方案 2：使用真实 Deepseek API（完整功能）

### 1️⃣ 获取 API Key

1. 访问 https://platform.deepseek.com
2. 注册账户并登录
3. 进入 **API Keys** 页面
4. 点击 **「Create New Key」** 生成新密钥
5. 复制完整的 API Key（以 `sk-` 开头）

### 2️⃣ 配置 API Key

编辑 `backend/.env` 文件：

```env
# Deepseek API Key - 替换你的真实 Key
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxx

# 改成 false 使用真实 API
USE_MOCK_MODE=false

# 服务器端口
PORT=3000
```

### 3️⃣ 重启后端

```bash
npm start
```

### 4️⃣ 开始占卜

现在你会看到 **真实 AI 生成的占卜解读**，而不是模拟数据！

---

## 📊 对比表

| 功能 | Mock 模式 | 真实 API |
|-----|---------|--------|
| **需要 API Key** | ❌ 不需要 | ✅ 需要 |
| **立即测试** | ✅ 可以 | ⏳ 需要配置 |
| **AI 占卜质量** | 🎭 模拟版本 | 🤖 真实 AI |
| **占卜创意** | 固定的几个模板 | 每次都不同 |
| **适合** | 前端/UI 测试 | 完整功能测试 |

---

## 🔄 在两种模式之间切换

### 切换到 Mock 模式
编辑 `backend/.env`：
```env
USE_MOCK_MODE=true
DEEPSEEK_API_KEY=mock
```

### 切换到真实 API
编辑 `backend/.env`：
```env
USE_MOCK_MODE=false
DEEPSEEK_API_KEY=sk-your_actual_key
```

然后重启后端：`npm start`

---

## ⚠️ 常见错误与解决

### ❌ "找不到 API Key"

**原因**：没有创建 `.env` 文件或 API Key 配置不正确

**解决**：
```bash
# 1. 检查是否有 .env 文件
ls backend/.env

# 2. 如果没有，使用下面的命令创建
cp backend/.env.example backend/.env

# 3. 编辑 .env 文件（Windows）
notepad backend\.env

# 3. 编辑 .env 文件（Mac/Linux）
nano backend/.env
```

### ❌ "API Key 无效"

**原因**：API Key 复制错误或账户过期

**解决**：
1. 重新从 https://platform.deepseek.com 复制 API Key
2. 确保是 `sk-` 开头的完整字符串
3. 不要多复制空格或特殊字符

### ❌ 仍然报错？

尝试：
```bash
# 1. 停止服务 (Ctrl+C)
# 2. 清除 node_modules
rm -rf node_modules package-lock.json

# 3. 重新安装
npm install

# 4. 重启
npm start
```

---

## ✨ 现在就开始！

**选择你的方式：**

👇 **我想立即测试（无需设置）**
```bash
cd backend
npm start
# 然后访问 http://localhost:3000
```

👇 **我想用完整功能（需要 API Key）**
```bash
# 1. 编辑 backend/.env 添加你的 API Key
# 2. npm start
# 3. http://localhost:3000
```

---

## 🎓 关键要点

1. **`.env` 文件很重要** — 系统在这里读取配置
2. **API Key 很敏感** — 不要上传到 Git
3. **Mock 模式很好用** — 用来快速测试 UI 和流程
4. **真实 API 更强大** — 生成的占卜更具创意

**现在所有问题都应该解决了！** 🎉

有任何问题，查看 [README.md](../README.md) 的故障排除部分。
