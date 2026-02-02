# Tasks: 正确点击反馈交互

**Input**: Design documents from `/specs/003-add-correct-feedback/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: 未要求新增自动化测试，仅保留 `pnpm lint` 与 `pnpm build` 质量门禁。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 项目已存在，仅进行必要的上下文检查

- [x] T001 确认现有项目结构与入口文件，记录目标修改点在 `src/App.tsx` 与样式文件

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 统一反馈状态与时间配置，避免跨故事重复定义

- [x] T002 定义正确反馈的持续时间常量与状态字段位置（在 `src/App.tsx` 内或提取到 `src/state/`）

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 正确点击获得即时反馈 (Priority: P1) 🎯 MVP

**Goal**: 正确点击后立即出现绿色正向反馈，并在短时间内恢复默认状态

**Independent Test**: 单次正确点击观察是否出现反馈并自动恢复

### Implementation for User Story 1

- [x] T003 [US1] 在 `src/App.tsx` 中添加正确点击反馈状态控制（触发显示、自动结束）
- [x] T004 [US1] 在 `src/App.css` 或 `src/styles/` 中新增绿色反馈样式（勾或背景）
- [x] T005 [US1] 将反馈样式绑定到正确按钮渲染逻辑（确保仅正确点击触发）

**Checkpoint**: User Story 1 should be functional and testable independently

---

## Phase 4: User Story 2 - 连续点击仅触发一次反馈 (Priority: P2)

**Goal**: 反馈显示期内的再次正确点击不重复触发

**Independent Test**: 在反馈显示期内多次点击，仅首次触发，最终恢复默认状态

### Implementation for User Story 2

- [x] T006 [US2] 在 `src/App.tsx` 中加保护逻辑，反馈激活时忽略新的触发
- [x] T007 [US2] 校验反馈结束后恢复到可再次触发状态（不留残留样式）

**Checkpoint**: User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 质量门禁与手动验证

- [ ] T008 在 `specs/003-add-correct-feedback/quickstart.md` 对应的手动验证要点完成自检记录
- [ ] T009 运行 `pnpm lint`
- [ ] T010 运行 `pnpm build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Depends on User Story 1 completion

### Parallel Opportunities

- 本功能修改集中在 `src/App.tsx` 与样式文件，避免并行以免冲突

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. STOP and validate User Story 1 independently

### Incremental Delivery

1. Add User Story 2 after User Story 1 validated
2. Complete Polish phase and run quality gates
