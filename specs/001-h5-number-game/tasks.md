---

description: "Task list for implementing H5 数字点击游戏"
---

# Tasks: H5 数字点击游戏

**Input**: Design documents from `/specs/001-h5-number-game/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: 未要求新增自动化测试；保留 `pnpm lint` 与 `pnpm build` 作为质量门禁。

**Organization**: Tasks grouped by user story for independent delivery.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 项目初始化与结构搭建

- [x] T001 创建目录与占位文件：`src/components/`, `src/hooks/`, `src/state/`, `src/utils/`, `src/styles/`
- [x] T002 [P] 新增基础样式文件 `src/styles/game.css` 并在 `src/App.tsx` 引入
- [x] T003 [P] 清理 `src/App.tsx` 与 `src/main.tsx` 的默认模板内容，保留应用入口

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 所有用户故事的共享基础逻辑

- [x] T004 实现随机工具 `src/utils/shuffle.ts`（打乱 1–100 数组）
- [x] T005 实现评分规则 `src/utils/grading.ts`（白金/黄金/白银/青铜阈值）
- [x] T006 实现游戏状态管理 `src/state/useGameState.ts`（currentTarget、tiles、status、progress、reset）
- [x] T007 实现计时 Hook `src/hooks/useGameTimer.ts`（start/stop/reset，毫秒计时）
- [x] T008 实现本地存储工具 `src/utils/storage.ts`（保存/读取/清除进度快照）
- [x] T009 扩展 `src/state/useGameState.ts`：提供进度序列化与恢复能力（依赖 T008）

**Checkpoint**: 基础逻辑完成后，进入用户故事实现

---

## Phase 3: User Story 1 - 依序点击完成挑战 (Priority: P1) 🎯 MVP

**Goal**: 玩家按 1–100 顺序点击完成挑战并获得完成提示

**Independent Test**: 页面显示 1–100，正确点击推进进度，点击 100 后显示完成提示

### Implementation for User Story 1

- [x] T010 [P] [US1] 实现单个数字组件 `src/components/GameTile.tsx`（显示数字、当前目标样式、点击回调）
- [x] T011 [P] [US1] 实现棋盘布局组件 `src/components/GameBoard.tsx`（渲染 1–100 网格）
- [x] T012 [US1] 实现顶部信息组件 `src/components/GameHeader.tsx`（当前目标/进度展示）
- [x] T013 [US1] 在 `src/App.tsx` 组装游戏页面（状态驱动、点击校验、错误反馈）
- [x] T014 [US1] 在 `src/styles/game.css` 补充棋盘布局与样式（不提供“已点击”高亮）

**Checkpoint**: 用户故事 1 可独立完成与验收

---

## Phase 4: User Story 2 - 计时与等级评定 (Priority: P2)

**Goal**: 完成后显示用时与等级

**Independent Test**: 完成 1–100 后显示总用时与等级

### Implementation for User Story 2

- [x] T015 [P] [US2] 实现结果面板 `src/components/ResultPanel.tsx`（用时与等级展示）
- [x] T016 [US2] 在 `src/App.tsx` 接入计时与评分逻辑（完成后计算用时与等级）
- [x] T017 [US2] 在 `src/styles/game.css` 增加结果面板样式

**Checkpoint**: 用户故事 2 可独立完成与验收

---

## Phase 5: User Story 3 - 重新开始一局 (Priority: P3)

**Goal**: 支持一键重开

**Independent Test**: 点击“重新开始”后进度与计时重置，重新开始新局

### Implementation for User Story 3

- [x] T018 [US3] 在 `src/components/GameHeader.tsx` 增加“重新开始”按钮
- [x] T019 [US3] 在 `src/App.tsx` 实现重置逻辑（随机布局、状态与计时清零，并清除存档）
- [x] T020 [US3] 在 `src/styles/game.css` 增加按钮样式与交互反馈

**Checkpoint**: 用户故事 3 可独立完成与验收

---

## Phase 6: User Story 4 - 继续上次进度 (Priority: P4)

**Goal**: 刷新后可提示继续或重开

**Independent Test**: 进入页面时检测到存档并弹窗选择，继续可恢复进度与计时

### Implementation for User Story 4

- [x] T021 [P] [US4] 实现继续提示弹窗 `src/components/ResumeDialog.tsx`（继续/重新开始）
- [x] T022 [US4] 在 `src/App.tsx` 接入存档检测与弹窗流程（进入时提示、选择分支）
- [x] T023 [US4] 在 `src/state/useGameState.ts` 接入自动保存触发（每次有效点击后保存）

**Checkpoint**: 用户故事 4 可独立完成与验收

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 跨故事体验优化与门禁验证

- [x] T024 [P] 优化移动端触控体验与可点击面积（`src/styles/game.css`）
- [x] T025 [P] 增加错误点击的反馈动画或提示（`src/styles/game.css` + `src/components/GameTile.tsx`）
- [x] T026 运行 `pnpm lint`
- [x] T027 运行 `pnpm build`
- [ ] T028 按 `specs/001-h5-number-game/quickstart.md` 完成手工验收

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1) → Foundational (Phase 2) → User Stories (Phase 3-6) → Polish (Phase 7)

### User Story Dependencies

- US1 可在 Phase 2 后独立开展
- US2 可在 Phase 2 后开展，依赖 US1 的基础页面结构
- US3 可在 Phase 2 后开展，依赖 US1/US2 的状态与结果展示
- US4 可在 Phase 2 后开展，依赖 US1/US3 的状态与重置逻辑

### Parallel Opportunities

- Phase 1 中 T002、T003 可并行
- Phase 2 中 T004、T005、T007、T008 可并行
- US1 中 T010、T011 可并行
- US2 中 T015 可与 T016 并行准备（不同文件）

---

## Parallel Example: User Story 1

```bash
Task: "实现单个数字组件 src/components/GameTile.tsx"
Task: "实现棋盘布局组件 src/components/GameBoard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1 与 Phase 2
2. 完成 User Story 1
3. 独立验收（点击顺序 + 错误反馈 + 完成提示）

### Incremental Delivery

1. US1 完成 → 验收
2. US2 完成 → 验收
3. US3 完成 → 验收
4. US4 完成 → 验收
5. 最后统一体验优化与门禁检查
