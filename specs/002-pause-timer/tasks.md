---

description: "Task list for pause timer feature"
---

# Tasks: 暂停计时功能

**Input**: Design documents from `/Users/bytedance/workspace/count-number/specs/002-pause-timer/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md
**Tests**: 未要求自动化测试，仅手动验收；`pnpm lint` 与 `pnpm build` 为必选质量门禁。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 了解现有计时与状态逻辑，避免重复实现

- [x] T001 盘点计时与状态流转实现（阅读 `/Users/bytedance/workspace/count-number/src/App.tsx`、`/Users/bytedance/workspace/count-number/src/hooks/useGameTimer.ts`、`/Users/bytedance/workspace/count-number/src/state/useGameState.ts`、`/Users/bytedance/workspace/count-number/src/utils/storage.ts`）

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 为暂停状态提供基础类型与持久化兼容

- [x] T002 在 `/Users/bytedance/workspace/count-number/src/utils/storage.ts` 中扩展 `GameStatus` 支持 `paused` 并同步更新快照校验逻辑
- [x] T003 在 `/Users/bytedance/workspace/count-number/src/state/useGameState.ts` 中支持 `paused` 状态流转与快照写入规则

**Checkpoint**: 基础状态完成，用户故事实现可开始

---

## Phase 3: User Story 1 - 暂停与恢复计时 (Priority: P1) 🎯 MVP

**Goal**: 游戏中可暂停计时，恢复后继续递增且不重置进度

**Independent Test**: 开始游戏后点击“暂停/恢复”，计时停止并从暂停前继续

### Implementation for User Story 1

- [x] T004 [US1] 在 `/Users/bytedance/workspace/count-number/src/App.tsx` 中新增暂停/恢复处理逻辑（暂停停止计时、恢复继续计时）
- [x] T005 [US1] 在 `/Users/bytedance/workspace/count-number/src/App.tsx` 中限制暂停状态下的点击行为（避免继续游戏进度）

**Checkpoint**: 暂停/恢复功能可独立运行并通过手动验证

---

## Phase 4: User Story 2 - 暂停按钮状态与位置 (Priority: P2)

**Goal**: 按钮文案与位置清晰，且与“重新开始”风格一致

**Independent Test**: 按钮位于“重新开始”下方，文案在“暂停/恢复”间切换

### Implementation for User Story 2

- [x] T006 [US2] 在 `/Users/bytedance/workspace/count-number/src/components/GameHeader.tsx` 中新增暂停/恢复按钮并放置在“重新开始”下方
- [x] T007 [US2] 在 `/Users/bytedance/workspace/count-number/src/styles/game.css` 中补充暂停按钮样式或复用现有按钮样式，确保视觉一致
- [x] T008 [US2] 在 `/Users/bytedance/workspace/count-number/src/App.tsx` 中传递按钮文案与禁用状态（未开始或已结束时不可用）

**Checkpoint**: 按钮位置固定、文案切换正确、风格一致

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 质量门禁与验收

- [x] T009 在 `/Users/bytedance/workspace/count-number/specs/002-pause-timer/quickstart.md` 中核对手动验收步骤与实际一致
- [x] T010 运行 `pnpm lint`
- [x] T011 运行 `pnpm build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖
- **Foundational (Phase 2)**: 依赖 Phase 1 完成
- **User Stories (Phase 3-4)**: 依赖 Phase 2 完成
- **Polish (Phase 5)**: 依赖所选用户故事完成

### User Story Dependencies

- **US1 (P1)**: 依赖 Phase 2，无需依赖其他故事
- **US2 (P2)**: 依赖 Phase 2，建议在 US1 完成后进行以复用状态逻辑

### Parallel Opportunities

- Phase 2 内部任务可顺序执行（同一文件修改）
- US2 的样式与 UI 结构任务可与 US1 并行（不同文件）

---

## Parallel Example: User Story 2

```text
Task: "在 /Users/bytedance/workspace/count-number/src/components/GameHeader.tsx 中新增暂停/恢复按钮并放置在“重新开始”下方"
Task: "在 /Users/bytedance/workspace/count-number/src/styles/game.css 中补充暂停按钮样式或复用现有按钮样式"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1 与 Phase 2
2. 完成 Phase 3（US1）
3. 停止并验证：暂停/恢复计时是否正确

### Incremental Delivery

1. 完成基础阶段 → 交付可运行的暂停能力（US1）
2. 增加 UI 文案与位置（US2）
3. 完成质量门禁（lint/build）

---

## Notes

- 任务均为手动验收，不新增自动化测试
- 任务描述包含明确文件路径，便于直接执行
