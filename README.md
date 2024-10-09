# 使用cloudflare代理镜像站

## 支持代理的镜像列表

-   [x] npmjs: [https://registry.npmjs.org/](https://registry.npmjs.org/)
-   [x] dockerhub [https://registry-1.docker.io](https://registry-1.docker.io)
-   [ ] cargo [https://crates.io](https://crates.io)

## 镜像对应的分支

| 镜像      | 分支           | 部署代码                                                                                      |
| --------- | -------------- | --------------------------------------------------------------------------------------------- |
| npmjs     | release-npm    | [\_worker.js](https://github.com/jwyGithub/cloudflare-workers/blob/release-npm/_worker.js)    |
| dockerhub | release-docker | [\_worker.js](https://github.com/jwyGithub/cloudflare-workers/blob/release-docker/_worker.js) |
| cargo     | release-cargo  | [\_worker.js](https://github.com/jwyGithub/cloudflare-workers/blob/release-cargo/_worker.js)  |

## 开始部署

> **由于\*.workers.dev域名已被墙，推荐使用pages方式部署**.

> ### worker部署

1. 切换到对应代理镜像分支，比如release-docker
2. 复制\_worker.js文件内容
3. 在cloudflare workers控制台新建worker，将复制的内容粘贴到编辑器中
4. 点击保存并部署

> ### pages部署-fork

1. fork本项目
2. 在cloudflare中创建pages应用，选择刚刚fork的项目
3. 选择分支，比如release-docker
4. 点击部署

> ### pages部署-手动

1. 进入[release](https://github.com/jwyGithub/cloudflare-workers/releases)页面下载对应代理镜像的zip包
2. 进入cloudflare pages，新建pages应用
3. 上传zip包
4. 点击部署

## 3. 绑定自定义域名

打开部署好的pages，选择自定义域绑定自己的域名

## 4. 使用

**点击查看使用方式**

-   [npmjs](https://github.com/jwyGithub/cloudflare-workers/tree/main/packages/npm-proxy)

    -   示例镜像地址：https://npm-proxy.pages.dev/

-   [docker](https://github.com/jwyGithub/cloudflare-workers/tree/main/packages/docker-proxy)

    -   示例镜像地址：https://docker-proxy.vev.us.kg/

## 免责声明

在使用此项目时均被视为已经仔细阅读并完全同意以下条款：

-   此项目仅供个人学习与交流使用，严禁用于商业以及不良用途。
-   如有发现任何商业行为以及不良用途，此项目作者有权撤销使用权。
-   使用本软件所存在的风险将完全由其本人承担，此项目作者不承担任何责任。
-   此项目注明之服务条款外，其它因不当使用本软件而导致的任何意外、疏忽、合约毁坏、诽谤、版权或其他知识产权侵犯及其所造成的任何损失，本软件作者概不负责，亦不承担任何法律责任。
-   对于因不可抗力或因黑客攻击、通讯线路中断等不能控制的原因造成的服务中断或其他缺陷，导致用户不能正常使用，此项目作者不承担任何责任，但将尽力减少因此给用户造成的损失或影响。
-   本声明未涉及的问题请参见国家有关法律法规，当本声明与国家有关法律法规冲突时，以国家法律法规为准。
-   本软件相关声明版权及其修改权、更新权和最终解释权均属此项目作者所有。
