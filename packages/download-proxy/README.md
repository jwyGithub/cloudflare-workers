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

打开docker.YOUR_DOMAIN页面，查看使用说明页面
