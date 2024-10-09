# docker-proxy

## 介绍

-   [x] [dockerHub](https://registry-1.docker.io)
-   [x] [ghcr.io](https://ghcr.io)
-   [x] [gcr.io](https://gcr.io)
-   [x] [quay.io](https://quay.io)
-   [x] [k8s.gcr.io](https://registry.k8s.io)
-   [x] [k8s-gcr](https://k8s.gcr.io)

## 配置

> 需要配置如下自定义域:

    - docker.YOUR_DOMAIN
    - gcr.YOUR_DOMAIN
    - ghcr.YOUR_DOMAIN
    - k8s-gcr.YOUR_DOMAIN
    - k8s.YOUR_DOMAIN
    - quay.YOUR_DOMAIN

## 环境变量配置

| 变量KEY      | 说明                                                        | 默认值 | 是否必填 |
| ------------ | ----------------------------------------------------------- | ------ | -------- |
| IP_WHITELIST | 允许的IP白名单，\*代码允许所有ip访问,配置多个ip时，换行输入 | \*     | 否       |

## 使用

打开docker.YOUR_DOMAIN页面，查看使用说明页面
