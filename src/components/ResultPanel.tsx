type ResultPanelProps = {
  visible: boolean
  elapsedLabel: string
  grade: string
}

export function ResultPanel({ visible, elapsedLabel, grade }: ResultPanelProps) {
  if (!visible) return null

  return (
    <section className="result">
      <div className="result-card">
        <p className="result-title">挑战完成</p>
        <div className="result-row">
          <span>用时</span>
          <strong>{elapsedLabel}</strong>
        </div>
        <div className="result-row">
          <span>等级</span>
          <strong>{grade}</strong>
        </div>
        <p className="result-hint">想更快？再来一局冲刺白金。</p>
      </div>
    </section>
  )
}
