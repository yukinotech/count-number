<!--
Sync Impact Report
- Version change: N/A → 0.1.0
- Modified principles: N/A (initial constitution)
- Added sections: Core Principles, 技术栈与工具链约束, 开发流程与交付规范, Governance
- Removed sections: N/A
- Templates requiring updates:
  - ✅ /Users/bytedance/workspace/count-number/.specify/templates/plan-template.md
  - ✅ /Users/bytedance/workspace/count-number/.specify/templates/spec-template.md
  - ✅ /Users/bytedance/workspace/count-number/.specify/templates/tasks-template.md
  - ✅ /Users/bytedance/workspace/count-number/.specify/templates/agent-file-template.md
  - ✅ /Users/bytedance/workspace/count-number/.specify/templates/checklist-template.md
- Follow-up TODOs: TODO(RATIFICATION_DATE) 需要确认首次通过日期
-->
# count-number Constitution

## Core Principles

### I. 技术栈锁定与一致性
项目必须使用 React 19.2.0、TypeScript ~5.9.3、Vite ^7.2.4 与 pnpm。
不得引入替代框架或构建工具（如 Next.js、Webpack、npm/yarn）。
若需要变更技术栈或主要版本，必须先修改宪章并记录理由与迁移计划。

### II. TypeScript 优先与类型安全
所有应用代码必须使用 TypeScript（.ts/.tsx），禁止新增 .js 文件。
避免 `any`，必要时需在 PR 中说明并补充替代方案或类型改进计划。
公共 API 与组件 props 必须显式类型化，确保可维护性与可推断性。

### III. 结构清晰与可维护性
源代码必须位于 `src/` 下，保持组件、hooks、样式与工具的合理分层。
新增模块应遵循就近组织与低耦合原则，避免跨层直接依赖。

### IV. 质量门禁
提交前必须通过 `pnpm lint` 与 `pnpm build`。
若引入测试体系（如 Vitest），新增功能必须包含对应测试并与构建门禁一致。

### V. 依赖与版本治理
依赖应最小化，新增依赖需说明必要性与替代方案对比。
锁定文件与依赖范围必须由 pnpm 维护，禁止手动篡改锁文件结构。

## 技术栈与工具链约束

- 运行环境：Node.js（由项目实际执行环境决定，需与 Vite/TS 兼容）
- 包管理器：pnpm
- 构建与开发：Vite（`pnpm dev` / `pnpm build` / `pnpm preview`）
- 语言与框架：TypeScript + React
- 代码质量：ESLint（`pnpm lint`）

## 开发流程与交付规范

- 所有变更必须在功能分支进行，并附带清晰的变更说明。
- PR/代码评审需明确确认宪章合规：技术栈、质量门禁、结构约束。
- 任何偏离宪章的实现都必须在计划或规范中注明，并给出审批记录。

## Governance

- 本宪章高于所有项目流程与模板；与之冲突的文档必须更新。
- 宪章修改必须通过 PR，包含版本号变更、理由与迁移影响说明。
- 计划与规范产出必须引用本宪章进行合规检查。
- 运行时开发指导文件为 `agent.md`，如有不一致，以本宪章为准。

**Version**: 0.1.0 | **Ratified**: TODO(RATIFICATION_DATE) 需要确认首次通过日期 | **Last Amended**: 2026-01-26
