type ResumeDialogProps = {
  open: boolean
  onResume: () => void
  onRestart: () => void
}

export function ResumeDialog({ open, onResume, onRestart }: ResumeDialogProps) {
  if (!open) return null

  return (
    <div className="dialog-backdrop" role="dialog" aria-modal="true">
      <div className="dialog">
        <h2>继续上次进度？</h2>
        <p>检测到未完成的进度。要继续挑战还是重新开始？</p>
        <div className="dialog-actions">
          <button type="button" className="button ghost" onClick={onRestart}>
            重新开始
          </button>
          <button type="button" className="button primary" onClick={onResume}>
            继续挑战
          </button>
        </div>
      </div>
    </div>
  )
}
