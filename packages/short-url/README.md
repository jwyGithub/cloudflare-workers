# 🔗 Short URL Service

一个基于 Cloudflare Workers 的短链接服务，支持短链接的创建、查询、删除等功能。

## ✨ 功能特点

- 🚀 基于 Cloudflare Workers 和 D1 数据库
- 🔄 支持短链接的增删改查
- 📡 提供 RESTful API
- 🎯 内置管理界面
- 🌓 支持亮色/暗色主题

## 📚 API 接口说明

<details>
<summary>📝 1. 创建短链接</summary>

```http
POST /api/add
Content-Type: application/json

{
    "long_url": "https://www.example.com",
    "serve": "https://custom-domain.com"
}
```

响应示例：

```json
{
    "code": 0,
    "data": {
        "id": 1,
        "short_code": "a1b2c3d4",
        "short_url": "https://custom-domain.com/a1b2c3d4",
        "long_url": "https://www.example.com"
    }
}
```

</details>

<details>
<summary>🗑️ 2. 删除短链接</summary>

```http
DELETE /api/delete?code=a1b2c3d4
```

响应示例：

```json
{
    "code": 0,
    "data": {
        "deleted": true
    }
}
```

</details>

<details>
<summary>📋 3. 查询短链接列表</summary>

```http
GET /api/queryList?page=1&pageSize=10
```

响应示例：

```json
{
    "code": 0,
    "data": {
        "total": 100,
        "items": [
            {
                "id": 1,
                "short_code": "a1b2c3d4",
                "short_url": "http://localhost:8787/a1b2c3d4",
                "long_url": "https://www.example.com"
            }
        ]
    }
}
```

</details>

<details>
<summary>🔍 4. 根据短码查询</summary>

```http
GET /api/queryByCode?code=a1b2c3d4
```

响应示例：

```json
{
    "code": 0,
    "data": {
        "id": 1,
        "short_code": "a1b2c3d4",
        "short_url": "http://localhost:8787/a1b2c3d4",
        "long_url": "https://www.example.com"
    }
}
```

</details>

<details>
<summary>↪️ 5. 短链接重定向</summary>

```http
GET /:code
```

当访问短链接时，会自动重定向到原始链接。

</details>

## ❌ 错误响应

当发生错误时，API 会返回以下格式的响应：

```json
{
    "code": 1,
    "error": "错误信息描述"
}
```

## ☁️ 部署方式

### 🚀 方式一：Cloudflare Worker

1. 登录到 Cloudflare Dashboard
2. 进入 Workers & Pages
3. 创建新的 Worker
4. 从 Release 分支下载 `_worker.js`
5. 将代码复制到 Worker 编辑器中
6. 点击"保存并部署"

### 📦 方式二：Cloudflare Pages

1. 登录到 Cloudflare Dashboard
2. 进入 Workers & Pages
3. 创建新的 Pages 项目
4. 选择"直接上传"方式
5. 从 Release 分支下载 `_worker.zip`
6. 上传压缩包
7. 等待部署完成

### 🔄 方式三：通过 Git 仓库部署

1. Fork 本仓库到您的 GitHub 账号
2. 登录到 Cloudflare Dashboard
3. 进入 Workers & Pages
4. 创建新的 Pages 项目
5. 选择"连接到 Git"
6. 选择您 Fork 的仓库
7. 设置部署配置：
    - 构建命令：留空
    - 构建输出目录：留空
    - 部署分支：`release`
8. 点击"保存并部署"

## 💾 数据库结构

```sql
CREATE TABLE IF NOT EXISTS short_url (
    id INTEGER PRIMARY KEY,
    short_code TEXT,
    short_url TEXT,
    long_url TEXT
);
```

## 🛠️ 技术栈

- ⚡ Cloudflare Workers
- 🗄️ Cloudflare D1 Database
- 📝 TypeScript
- ⚙️ Vite
