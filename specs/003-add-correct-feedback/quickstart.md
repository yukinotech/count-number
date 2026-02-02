# Quickstart: 正确点击反馈交互

## 前置条件

- Node.js 与 pnpm 已安装

## 本地运行

```bash
pnpm dev
```

## 质量检查

```bash
pnpm lint
pnpm build
```

## 手动验证要点

- 正确点击后 200ms 内出现绿色反馈
- 反馈在 1.2 秒内恢复默认状态
- 反馈显示期内再次正确点击不重复触发
