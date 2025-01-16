# Registry Proxy

一个基于 Cloudflare Workers 的高性能镜像仓库代理服务，支持 Docker 和 NPM 仓库。

## ✨ 功能特点

- 🚀 基于 Cloudflare Workers，全球节点加速
- 🔄 支持多种镜像仓库代理
    - Docker Registry
    - NPM Registry
- 🛡️ 自动处理认证和授权
- 💾 智能缓存机制
- 🌐 CORS 跨域支持
- ⚡ 零配置部署

## 🎯 支持的仓库

### Docker 相关

- Docker Hub (`docker.io`)
- GitHub Container Registry (`ghcr.io`)
- Google Container Registry (`gcr.io`)

### NPM 相关

- NPM Registry (`registry.npmjs.org`)

## 📖 使用说明

### 自定义域名配置

#### Docker 镜像代理

1. Docker 官方镜像代理

    - 域名: `docker.xx.xx`
    - 使用示例:
        ```bash
        docker pull docker.xx.xx/library/nginx
        # 或者
        docker pull docker.xx.xx/nginx
        ```

2. GitHub Container Registry 代理

    - 域名: `ghcr.xx.xx`
    - 使用示例:
        ```bash
        docker pull ghcr.xx.xx/open-webui/open-webui
        ```

3. Google Container Registry 代理
    - 域名: `gcr.xx.xx`
    - 使用示例:
        ```bash
        docker pull gcr.xx.xx/cadvisor/cadvisor
        ```

#### NPM 镜像代理

- 域名: `npm.xx.xx`
- 支持的命令:
    - `npm install`
    - `npm publish`
    - `npm info`
    - `npm search`
    - `npm login`
    - `npm adduser`

### 配置说明

1. Docker 配置

    ```json
    {
        "registry-mirrors": ["https://docker.xx.xx"]
    }
    ```

2. NPM 配置

    ```bash
    # 设置镜像
    npm config set registry https://npm.xx.xx

    # 或者在项目的 .npmrc 文件中添加
    registry=https://npm.xx.xx
    ```

## 📝 使用说明

### ☁️ 部署方式

#### 方式一：Cloudflare Worker

1. 登录到 Cloudflare Dashboard
2. 进入 Workers & Pages
3. 创建新的 Worker
4. 从 release-registry 分支下载 `_worker.js`
5. 将代码复制到 Worker 编辑器中
6. 点击"保存并部署"

#### 方式二：Cloudflare Pages

1. 登录到 Cloudflare Dashboard
2. 进入 Workers & Pages
3. 创建新的 Pages 项目
4. 选择"直接上传"方式
5. 从 release-registry 分支下载 `_worker.zip`
6. 上传压缩包
7. 等待部署完成

#### 方式三：通过 Git 仓库部署

1. Fork 本仓库到您的 GitHub 账号
2. 登录到 Cloudflare Dashboard
3. 进入 Workers & Pages
4. 创建新的 Pages 项目
5. 选择"连接到 Git"
6. 选择您 Fork 的仓库
7. 设置部署配置：
    - 构建命令：留空
    - 构建输出目录：留空
    - 部署分支：`release-registry`
8. 点击"保存并部署"

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request

## 许可证

MIT License
