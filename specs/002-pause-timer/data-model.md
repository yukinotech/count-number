# Phase 1 Data Model: 暂停计时功能

## Entities

### GameState
- **Purpose**: 表示当前游戏的生命周期状态
- **Fields**:
  - `status`: 未开始 | 进行中 | 暂停 | 已结束
- **Validation**:
  - 状态只能处于上述四种之一

### TimerState
- **Purpose**: 表示计时器当前显示与运行状态
- **Fields**:
  - `elapsedTime`: 当前显示的已用时间（以人类可读格式或数值表示）
  - `isRunning`: 是否在递增
- **Validation**:
  - 当 `status` 为“暂停”或“已结束”时，`isRunning` 必须为否
  - 当 `status` 为“进行中”时，`isRunning` 必须为是

## Relationships

- `TimerState` 依赖 `GameState`：计时运行状态受游戏状态驱动

## State Transitions

- 未开始 → 进行中（开始游戏）
- 进行中 → 暂停（点击暂停）
- 暂停 → 进行中（点击恢复）
- 进行中 → 已结束（游戏结束）
- 暂停 → 已结束（游戏结束时保持暂停的计时显示）
