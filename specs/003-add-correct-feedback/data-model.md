# Data Model: 正确点击反馈交互

## Entities

### FeedbackDisplayState

- **说明**: 反馈显示的临时 UI 状态，仅存在于内存
- **关键字段**:
  - `isActive`: 是否正在显示反馈
  - `startedAt`: 反馈开始时间（用于控制自动结束）
  - `durationMs`: 反馈持续时间
- **关系**: 与具体按钮点击事件关联，但不持久化

## Validation Rules

- `durationMs` 必须落在 600–1200ms 范围内
- `isActive = true` 时应忽略新的反馈触发（直到结束）

## State Transitions

- `idle` → `active`: 正确点击触发反馈
- `active` → `idle`: 反馈计时结束自动恢复
