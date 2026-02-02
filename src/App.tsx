import { useEffect, useMemo, useState } from 'react'
import './styles/game.css'
import { GameBoard } from './components/GameBoard'
import { GameHeader } from './components/GameHeader'
import { ResultPanel } from './components/ResultPanel'
import { ResumeDialog } from './components/ResumeDialog'
import { useGameTimer } from './hooks/useGameTimer'
import { useGameState } from './state/useGameState'
import { getGrade } from './utils/grading'
import { clearSnapshot, loadSnapshot, saveSnapshot, type GameSnapshot } from './utils/storage'

const TOTAL_NUMBERS = 100

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centiseconds = Math.floor((ms % 1000) / 10)
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds
    .toString()
    .padStart(2, '0')}`
}

function App() {
  const timer = useGameTimer(0)
  const { order, currentTarget, status, setCurrentTarget, setStatus, resetGame, restoreGame } =
    useGameState({ elapsedMs: timer.elapsedMs, onAutoSave: saveSnapshot })
  const [wrongValue, setWrongValue] = useState<number | null>(null)
  const [resumeSnapshot, setResumeSnapshot] = useState<GameSnapshot | null>(() => {
    const snapshot = loadSnapshot()
    if (snapshot && snapshot.status !== 'completed') return snapshot
    return null
  })

  const elapsedLabel = useMemo(() => formatTime(timer.elapsedMs), [timer.elapsedMs])
  const completedCount = status === 'completed' ? TOTAL_NUMBERS : Math.max(0, currentTarget - 1)
  const grade = status === 'completed' ? getGrade(Math.floor(timer.elapsedMs / 1000)) : '—'

  useEffect(() => {
    if (status === 'completed') {
      clearSnapshot()
    }
  }, [status])

  const handleWrongClick = (value: number) => {
    setWrongValue(value)
    window.setTimeout(() => setWrongValue(null), 240)
  }

  const handleCorrectClick = () => {
    if (status === 'idle') {
      setStatus('playing')
      timer.start()
    }
    if (currentTarget >= TOTAL_NUMBERS) {
      setStatus('completed')
      timer.stop()
      return
    }
    setCurrentTarget(currentTarget + 1)
  }

  const handleTileClick = (value: number) => {
    if (status === 'completed') return
    if (value !== currentTarget) {
      handleWrongClick(value)
      return
    }
    handleCorrectClick()
  }

  const handleRestart = () => {
    clearSnapshot()
    timer.reset()
    resetGame()
  }

  const handleResume = () => {
    if (!resumeSnapshot) return
    restoreGame(resumeSnapshot)
    timer.setElapsed(resumeSnapshot.elapsedMs)
    if (resumeSnapshot.status === 'playing') {
      timer.start()
    }
    setResumeSnapshot(null)
  }

  const handleRestartFromDialog = () => {
    setResumeSnapshot(null)
    handleRestart()
  }

  return (
    <div className="page">
      <ResumeDialog open={Boolean(resumeSnapshot)} onResume={handleResume} onRestart={handleRestartFromDialog} />
      <GameHeader
        currentTarget={currentTarget}
        completedCount={completedCount}
        status={status}
        elapsedLabel={elapsedLabel}
        onRestart={handleRestart}
      />
      <main className="content">
        <GameBoard
          order={order}
          wrongValue={wrongValue}
          onTileClick={handleTileClick}
        />
        <ResultPanel visible={status === 'completed'} elapsedLabel={elapsedLabel} grade={grade} />
      </main>
    </div>
  )
}

export default App
