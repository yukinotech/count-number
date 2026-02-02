# Feature Specification: 暂停计时功能

**Feature Branch**: `002-pause-timer`  
**Created**: 2026-02-02  
**Status**: Draft  
**Input**: User description: "希望增加一个暂停的功能，开始游戏后可以暂停，然后停止计时，暂停后，按钮状态变成恢复，点击后重新开始计时，按钮有变成暂停。按钮位置加在重新开始的下面，按钮风格保持一致"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 暂停与恢复计时 (Priority: P1)

玩家在游戏进行中需要暂时停止计时，并在准备好后继续计时，不影响当前游戏进度。

**Why this priority**: 暂停/恢复直接影响计时准确性，是用户核心需求。

**Independent Test**: 在游戏进行中点击暂停与恢复，观察计时是否停止与继续。

**Acceptance Scenarios**:

1. **Given** 游戏已开始且计时在运行，**When** 点击“暂停”，**Then** 计时显示保持不变
2. **Given** 计时已暂停，**When** 点击“恢复”，**Then** 计时继续递增且不中断当前游戏

---

### User Story 2 - 暂停按钮状态与位置 (Priority: P2)

玩家需要明确的按钮状态变化与稳定的位置，避免误操作。

**Why this priority**: 清晰的按钮状态与一致的位置提升可用性并降低误触。

**Independent Test**: 检查按钮在暂停/恢复间的文案切换与位置是否固定在“重新开始”下方。

**Acceptance Scenarios**:

1. **Given** 游戏进行中，**When** 点击“暂停”，**Then** 按钮文案变为“恢复”且位置不变
2. **Given** 计时暂停中，**When** 点击“恢复”，**Then** 按钮文案变回“暂停”且位置不变

### Edge Cases

- 游戏未开始时点击暂停会发生什么？
- 游戏已结束时点击暂停会发生什么？
- 用户快速连续切换暂停/恢复时是否保持计时准确？

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统必须在游戏开始后提供“暂停”按钮，允许用户暂停计时
- **FR-002**: 当用户点击“暂停”时，计时显示必须保持不变，直到点击“恢复”
- **FR-003**: 当用户点击“恢复”时，计时必须从暂停前的时间继续递增
- **FR-004**: 暂停状态下按钮文案必须显示为“恢复”，恢复后必须显示为“暂停”
- **FR-005**: 暂停/恢复按钮必须位于“重新开始”按钮下方，且视觉风格保持一致
- **FR-006**: 游戏未开始或已结束时，暂停/恢复按钮必须不可用（隐藏或禁用）以避免误操作
- **FR-007**: 连续多次切换暂停/恢复时，计时结果必须保持一致性，不得重置或跳变

### Technical Constraints *(mandatory)*

- 必须使用 React 19.2.0、TypeScript ~5.9.3、Vite ^7.2.4 与 pnpm
- 源码仅使用 .ts/.tsx，保持在 `src/` 目录下
- 变更需通过 `pnpm lint` 与 `pnpm build`

### Key Entities *(include if feature involves data)*

- **计时状态**: 计时是否运行或暂停，以及当前显示的时间值
- **游戏状态**: 游戏是否已开始或已结束，用于决定暂停按钮是否可用

### Assumptions

- “开始游戏”指计时开始运行的状态
- 暂停不会重置游戏进度，仅停止计时显示的递增
- 暂停按钮在不可用时以隐藏或禁用呈现，具体形式由现有界面风格决定

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 在暂停期间，计时显示在 60 秒内保持不变
- **SC-002**: 恢复后 3 秒内计时显示持续递增且不中断当前游戏
- **SC-003**: 95% 的测试用户在首次尝试内成功完成一次暂停与恢复
- **SC-004**: 在 100 次连续暂停/恢复切换中，计时显示无重置、无跳变
