# Research Findings: H5 数字点击游戏

## Decision 1: 客户端纯前端实现（无后端）

- **Decision**: 所有游戏逻辑、计时与评分均在前端内存中完成
- **Rationale**: 需求仅涉及单人计时与结果展示，无跨设备或历史记录需求，纯前端可降低复杂度
- **Alternatives considered**: 引入后端存储排行榜或历史记录（增加成本且超出范围）

## Decision 2: 计时策略为“首次正确点击开始，点击 100 结束”

- **Decision**: 计时从第一次点击正确数字开始，到点击 100 结束
- **Rationale**: 对应题目描述与用户预期，避免用户进入页面未开始就被计时
- **Alternatives considered**: 页面加载即开始计时（会惩罚阅读与理解时间）

## Decision 3: 随机布局提升挑战性

- **Decision**: 每局随机排列 1–100 的显示位置
- **Rationale**: 增加可玩性与挑战性，符合“训练反应能力”目标
- **Alternatives considered**: 固定排序网格（可玩性下降，反复挑战意义有限）

## Decision 4: 评分档位固定为四档

- **Decision**: 白金/黄金/白银/青铜四档，阈值采用规范中的 60/120/180 秒
- **Rationale**: 规则清晰且与用户输入一致，易于理解与对比
- **Alternatives considered**: 自定义档位或动态分位（需要额外设置与解释）
