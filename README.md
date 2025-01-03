# cloudflare workers

## Packages

- 代理
    - [x] npmjs: [https://registry.npmjs.org/](https://registry.npmjs.org/)
    - [x] dockerhub [https://registry-1.docker.io](https://registry-1.docker.io)
    - [ ] cargo [https://crates.io](https://crates.io)
- 工具
    - [x] convert
    - [x] parse

## 镜像对应的分支以及代码

| 镜像 | 分支 | worker部署代码 | pages部署代码 |
| --- | --- | --- | --- |
| npmjs | release-npm | [\_worker.js](https://github.com/jwyGithub/cloudflare-workers/blob/release-npm/_worker.js) | [\_worker.zip](https://github.com/jwyGithub/cloudflare-workers/blob/release-npm/_worker.zip) |
| dockerhub | release-docker | [\_worker.js](https://github.com/jwyGithub/cloudflare-workers/blob/release-docker/_worker.js) | [\_worker.zip](https://github.com/jwyGithub/cloudflare-workers/blob/release-docker/_worker.zip) |
| cargo | release-cargo | [\_worker.js](https://github.com/jwyGithub/cloudflare-workers/blob/release-cargo/_worker.js) | [\_worker.zip](https://github.com/jwyGithub/cloudflare-workers/blob/release-cargo/_worker.zip) |
| parse | release-vps | [\_worker.js](https://github.com/jwyGithub/cloudflare-workers/blob/release-vps/_worker.js) | [\_worker.zip](https://github.com/jwyGithub/cloudflare-workers/blob/release-vps/_worker.zip) |
| convert | release-convert | [\_worker.js](https://github.com/jwyGithub/cloudflare-workers/blob/release-convert/_worker.js) | [\_worker.zip](https://github.com/jwyGithub/cloudflare-workers/blob/release-convert/_worker.zip) |

## 部署方式

> [!TIP] > **由于\*.workers.dev域名已被墙，推荐使用pages方式部署**.

### worker部署

1. 复制对应分支的\_worker.js文件内容
2. 在cloudflare workers控制台新建worker，将复制的内容粘贴到编辑器中
3. 点击保存并部署

### pages部署

1. 下载对应分支的\_worker.zip文件
2. 进入cloudflare pages，新建pages应用
3. 上传zip包
4. 点击部署

## 配置说明

- [npmjs](https://github.com/jwyGithub/cloudflare-workers/tree/main/packages/npm-proxy/README.md)
    - [文档](https://github.com/jwyGithub/cloudflare-workers/tree/main/packages/npm-proxy/README.md)
- [dockerhub](https://github.com/jwyGithub/cloudflare-workers/blob/main/packages/docker-proxy/README.md)
    - [文档](https://github.com/jwyGithub/cloudflare-workers/blob/main/packages/docker-proxy/README.md)
- [cargo](https://github.com/jwyGithub/cloudflare-workers/blob/main/packages/cargo-proxy/README.md)
    - [文档](https://github.com/jwyGithub/cloudflare-workers/blob/main/packages/cargo-proxy/README.md)
- [parse](https://github.com/jwyGithub/cloudflare-workers/blob/main/packages/vps-parse/README.md)
    - [文档](https://github.com/jwyGithub/cloudflare-workers/blob/main/packages/vps-parse/README.md)
- [parse](https://github.com/jwyGithub/cloudflare-workers/blob/main/packages/vps-convert/README.md)
    - [文档](https://github.com/jwyGithub/cloudflare-workers/blob/main/packages/vps-convert/README.md)

## 免责声明

在使用此项目时均被视为已经仔细阅读并完全同意以下条款：

- 此项目仅供个人学习与交流使用，严禁用于商业以及不良用途。
- 如有发现任何商业行为以及不良用途，此项目作者有权撤销使用权。
- 使用本软件所存在的风险将完全由其本人承担，此项目作者不承担任何责任。
- 此项目注明之服务条款外，其它因不当使用本软件而导致的任何意外、疏忽、合约毁坏、诽谤、版权或其他知识产权侵犯及其所造成的任何损失，本软件作者概不负责，亦不承担任何法律责任。
- 对于因不可抗力或因黑客攻击、通讯线路中断等不能控制的原因造成的服务中断或其他缺陷，导致用户不能正常使用，此项目作者不承担任何责任，但将尽力减少因此给用户造成的损失或影响。
- 本声明未涉及的问题请参见国家有关法律法规，当本声明与国家有关法律法规冲突时，以国家法律法规为准。
- 本软件相关声明版权及其修改权、更新权和最终解释权均属此项目作者所有。
