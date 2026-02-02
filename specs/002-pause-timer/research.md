# Phase 0 Research: 暂停计时功能

## Decision 1: 测试方式
- **Decision**: 采用手动验证（无自动化测试框架）
- **Rationale**: 现有项目未配置测试框架，且功能为 UI 与本地状态变更，可通过交互验证满足需求
- **Alternatives considered**: 引入测试框架进行单元/集成测试（增加依赖与配置成本）

## Decision 2: 性能目标
- **Decision**: 暂停/恢复后 100ms 内完成计时显示更新
- **Rationale**: 该目标可保障用户感知到即时反馈，符合前端交互常规体验
- **Alternatives considered**: 放宽到 300ms 或不设定明确目标

## Decision 3: 规模与范围
- **Decision**: 单人本地会话、单局游戏内状态切换，不涉及持久化
- **Rationale**: 当前功能需求仅涉及本地计时与 UI 状态，无后端或多用户场景
- **Alternatives considered**: 引入多会话或历史记录（超出需求范围）

## Decision 4: 暂停按钮可用性
- **Decision**: 游戏未开始或已结束时，暂停/恢复按钮不可用（隐藏或禁用）
- **Rationale**: 与规格要求一致，可减少误操作
- **Alternatives considered**: 始终可点击但弹提示
