# sub-convert

a small tool that provides confusion conversion subscriptions

## ✨ 功能特点

### 📌 在线体验

体验地址：[https://convert.looby.us.kg/](https://convert.looby.us.kg/)

### 📌 支持的协议类型

| 协议         | 状态 | 说明     |
| ------------ | ---- | -------- |
| VLESS        | ✅   | 完全支持 |
| VMess        | ✅   | 完全支持 |
| Trojan       | ✅   | 完全支持 |
| Shadowsocks  | ✅   | 完全支持 |
| ShadowsocksR | ✅   | 完全支持 |
| Hysteria     | ✅   | 完全支持 |
| Hysteria2    | ✅   | 完全支持 |
| HY2          | ✅   | 完全支持 |

### 📦 订阅格式转换支持

- ✅ Base64 编码
- 🚧 YAML 配置
- 🚧 JSON 配置

### 🔄 支持转换的客户端

- ✅ Clash
- ✅ ClashR
- ✅ sing-box

## ⚙️ 配置说明

### 环境变量配置

| 变量名          | 说明                             | 默认值              | 必填 |
| --------------- | -------------------------------- | ------------------- | ---- |
| `BACKEND`       | 转换后端服务地址                 | `https://url.v1.mk` | ❌   |
| `LOCK_BACKEND`  | 是否锁定后端服务                 | `false`             | ❌   |
| `REMOTE_CONFIG` | 自定义远程配置<br>(支持多行配置) | `https://xxxxx1`    | ❌   |

## 📝 使用说明

### ☁️ 部署方式

#### 方式一：Cloudflare Worker

1. 登录到 Cloudflare Dashboard
2. 进入 Workers & Pages
3. 创建新的 Worker
4. 从 Release 分支下载 `_worker.js`
5. 将代码复制到 Worker 编辑器中
6. 点击"保存并部署"

#### 方式二：Cloudflare Pages

1. 登录到 Cloudflare Dashboard
2. 进入 Workers & Pages
3. 创建新的 Pages 项目
4. 选择"直接上传"方式
5. 从 Release 分支下载 `_worker.zip`
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
    - 部署分支：`release`
8. 点击"保存并部署"

### 🔗 访问地址

- Worker 部署：`https://your-worker-name.your-subdomain.workers.dev`
- Pages 部署：`https://your-project-name.pages.dev`

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## ⚠️ 免责声明

在使用此项目时均被视为已经仔细阅读并完全同意以下条款：

- 此项目仅供个人学习与交流使用，严禁用于商业以及不良用途。
- 如有发现任何商业行为以及不良用途，此项目作者有权撤销使用权。
- 使用本软件所存在的风险将完全由其本人承担，此项目作者不承担任何责任。
- 此项目注明之服务条款外，其它因不当使用本软件而导致的任何意外、疏忽、合约毁坏、诽谤、版权或其他知识产权侵犯及其所造成的任何损失，本软件作者概不负责，亦不承担任何法律责任。
- 对于因不可抗力或因黑客攻击、通讯线路中断等不能控制的原因造成的服务中断或其他缺陷，导致用户不能正常使用，此项目作者不承担任何责任，但将尽力减少因此给用户造成的损失或影响。
- 本声明未涉及的问题请参见国家有关法律法规，当本声明与国家有关法律法规冲突时，以国家法律法规为准。
- 本软件相关声明版权及其修改权、更新权和最终解释权均属此项目作者所有。

## 📄 开源协议

本项目遵循 [LICENSE](./LICENSE) 开源协议。

## 🚀 开发计划

- 📱 页面重构

    - 优化用户界面

- 🔗 短链功能

    - 支持订阅链接转短链
    - 自定义短链别名

- 🔄 更多客户端支持
    - Surge
    - ....
