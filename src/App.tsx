import { useEffect, useMemo, useRef, useState } from 'react'
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
const CORRECT_FEEDBACK_DURATION_MS = 900

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
  const [correctValue, setCorrectValue] = useState<number | null>(null)
  const correctTimeoutRef = useRef<number | null>(null)
  const [resumeSnapshot, setResumeSnapshot] = useState<GameSnapshot | null>(() => {
    const snapshot = loadSnapshot()
    if (snapshot && snapshot.status !== 'completed') return snapshot
    return null
  })

  const elapsedLabel = useMemo(() => formatTime(timer.elapsedMs), [timer.elapsedMs])
  const completedCount = status === 'completed' ? TOTAL_NUMBERS : Math.max(0, currentTarget - 1)
  const grade = status === 'completed' ? getGrade(Math.floor(timer.elapsedMs / 1000)) : '—'
  const pauseDisabled = status === 'idle' || status === 'completed'
  const pauseLabel = status === 'paused' ? '恢复' : '暂停'

  useEffect(() => {
    if (status === 'completed') {
      clearSnapshot()
    }
  }, [status])

  useEffect(() => {
    return () => {
      if (correctTimeoutRef.current) {
        window.clearTimeout(correctTimeoutRef.current)
        correctTimeoutRef.current = null
      }
    }
  }, [])

  const triggerCorrectFeedback = (value: number) => {
    if (correctValue !== null) return
    setCorrectValue(value)
    if (correctTimeoutRef.current) {
      window.clearTimeout(correctTimeoutRef.current)
    }
    correctTimeoutRef.current = window.setTimeout(() => {
      setCorrectValue(null)
      correctTimeoutRef.current = null
    }, CORRECT_FEEDBACK_DURATION_MS)
  }

  const clearCorrectFeedback = () => {
    if (correctTimeoutRef.current) {
      window.clearTimeout(correctTimeoutRef.current)
      correctTimeoutRef.current = null
    }
    setCorrectValue(null)
  }

  const handleWrongClick = (value: number) => {
    setWrongValue(value)
    window.setTimeout(() => setWrongValue(null), 240)
  }

  const handleCorrectClick = (value: number) => {
    if (status === 'idle') {
      setStatus('playing')
      timer.start()
    }
    triggerCorrectFeedback(value)
    if (currentTarget >= TOTAL_NUMBERS) {
      setStatus('completed')
      timer.stop()
      return
    }
    setCurrentTarget(currentTarget + 1)
  }

  const handleTileClick = (value: number) => {
    if (status === 'completed' || status === 'paused') return
    if (value !== currentTarget) {
      handleWrongClick(value)
      return
    }
    handleCorrectClick(value)
  }

  const handleRestart = () => {
    clearSnapshot()
    timer.reset()
    resetGame()
    clearCorrectFeedback()
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

  const handlePauseToggle = () => {
    if (pauseDisabled) return
    if (status === 'playing') {
      setStatus('paused')
      timer.stop()
      return
    }
    if (status === 'paused') {
      setStatus('playing')
      timer.start()
    }
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
        onPauseToggle={handlePauseToggle}
        pauseLabel={pauseLabel}
        pauseDisabled={pauseDisabled}
      />
      <main className="content">
        <GameBoard
          order={order}
          wrongValue={wrongValue}
          correctValue={correctValue}
          onTileClick={handleTileClick}
        />
        <ResultPanel visible={status === 'completed'} elapsedLabel={elapsedLabel} grade={grade} />
      </main>
    </div>
  )
}

export default App
