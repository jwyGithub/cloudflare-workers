# npm-proxy

## 支持的命令

-   [x] npm info
-   [x] npm login
-   [x] npm publish
-   [x] npm adduser
-   [x] npm install

## 环境变量配置

| 变量KEY      | 说明                                                           | 默认值 | 是否必填 |
| ------------ | -------------------------------------------------------------- | ------ | -------- |
| IP_WHITELIST | 允许的IP白名单,多个规则以，分隔，例如：`192.168.*.*,202.*.*.*` | \*     | 否       |

## IP匹配规则

-   \* 允许所有ip访问
-   192.\*.\*.\* 允许192开头的ip访问
-   192.168.\*.\* 允许192.168开头的ip访问
-   192.168.1.\* 允许192.168.1开头的ip访问
-   192.168.1.1 只允许192.168.1.1访问
-   192.\*.1.\* 允许192开头1结尾的ip访问
-   192.\*.1.1 允许192开头1结尾的ip访问
-   192.168.\*.1 允许192.168开头1结尾的ip访问

## 使用

1. 命令行直接使用

```bash
npm install vue --registry=https://npm-proxy.pages.dev
```

2. .npmrc 配置

```yml
registry=https://npm-proxy.pages.dev
```

3. nrm 配置

```bash
nrm add npmjs https://npm-proxy.pages.dev
nrm use npmjs
```

4. 全局配置

```bash
npm config set registry https://npm-proxy.pages.dev
```
