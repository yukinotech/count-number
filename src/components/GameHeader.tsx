type GameHeaderProps = {
  currentTarget: number
  completedCount: number
  status: 'idle' | 'playing' | 'paused' | 'completed'
  elapsedLabel: string
  onRestart: () => void
  onPauseToggle: () => void
  pauseLabel: string
  pauseDisabled: boolean
}

export function GameHeader({
  currentTarget,
  completedCount,
  status,
  elapsedLabel,
  onRestart,
  onPauseToggle,
  pauseLabel,
  pauseDisabled,
}: GameHeaderProps) {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">数字追击</p>
        <h1 className="title">从 1 点到 100</h1>
        <p className="subtitle">只允许顺序点击，考验眼力与反应</p>
      </div>
      <div className="stats">
        <div>
          <span className="stat-label">下一步</span>
          <strong className="stat-value">{status === 'completed' ? '完成' : currentTarget}</strong>
        </div>
        <div>
          <span className="stat-label">进度</span>
          <strong className="stat-value">{completedCount} / 100</strong>
        </div>
        <div>
          <span className="stat-label">用时</span>
          <strong className="stat-value">{elapsedLabel}</strong>
        </div>
        <button className="control-button" type="button" onClick={onRestart}>
          重新开始
        </button>
        <button
          className="control-button"
          type="button"
          onClick={onPauseToggle}
          disabled={pauseDisabled}
        >
          {pauseLabel}
        </button>
      </div>
    </header>
  )
}
