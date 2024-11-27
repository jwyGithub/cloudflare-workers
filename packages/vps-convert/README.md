# vps-convert

## 支持解析的类型

- [x] [vless](vless)
- [x] [vmess](vmess)
- [x] [trojan](trojan)
- [x] [ss](ss)
- [x] [ssr](ssr)
- [] [hysteria]()
- [] [hysteria2]()
- [] [hy2]()
- [] [sub]()

## 环境变量配置

| 变量KEY       | 说明                     | 默认值            | 是否必填 |
| ------------- | ------------------------ | ----------------- | -------- |
| BACKEND       | 转换的后端服务           | https://url.v1.mk | 否       |
| LOCK_BACKEND  | 是否禁止更改后端         | false             | 否       |
| REMOTE_CONFIG | 自定义远端配置，多个换行 | https://xxxxx1    | 否       |

## 开源协议

[MIT](../../LICENSE)