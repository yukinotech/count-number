# Data Model: H5 数字点击游戏

## Entity: 游戏局 (GameSession)

- **Fields**
  - id: 会话唯一标识
  - status: 未开始 | 进行中 | 已完成
  - startTime: 首次正确点击时间
  - endTime: 点击 100 的时间
  - elapsedMs: 用时（毫秒）
  - currentTarget: 当前应点击的数字（1–100）
  - grade: 白金 | 黄金 | 白银 | 青铜
- **Validation Rules**
  - status 为已完成时必须有 endTime 与 elapsedMs
  - currentTarget 仅在 1–100 范围内递增
- **State Transitions**
  - 未开始 → 进行中：首次正确点击 1
  - 进行中 → 已完成：正确点击 100

## Entity: 数字格 (NumberTile)

- **Fields**
  - value: 数字值（1–100）
  - state: 未点击 | 已点击 | 当前目标
- **Validation Rules**
  - 每局中 value 不重复
  - 同一时刻仅一个 tile 处于“当前目标”

## Entity: 等级规则 (GradeRule)

- **Fields**
  - name: 白金 | 黄金 | 白银 | 青铜
  - minSeconds: 最小阈值（含）
  - maxSeconds: 最大阈值（含，青铜可为无上限）
- **Validation Rules**
  - 阈值区间不重叠且覆盖所有正整数秒
