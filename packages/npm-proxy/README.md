# npm-proxy

## 特性

-   [x] npm info
-   [x] npm login
-   [x] npm publish
-   [x] npm adduser
-   [x] npm install

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
