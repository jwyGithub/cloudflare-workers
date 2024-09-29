# 使用cloudflare代理各种镜像站

### 1. 代理镜像列表

<ol>
<li>npm - https://registry.npmjs.org/</li>
<li>docker - https://registry-1.docker.io</li>
</ol>

### 2. 开始部署

> **由于\*.workers.dev域名已被墙，推荐使用pages方式部署**.

#### 2.1 部署npmjs代理镜像

1. 在cloudflare worker中创建一个pages
2. 选择上传文件
3. 选择packages/npm-proxy目录下的pages文件夹

