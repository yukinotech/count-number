import { useCallback, useEffect, useRef, useState } from 'react'
import { shuffleNumbers } from '../utils/shuffle'
import type { GameSnapshot, GameStatus } from '../utils/storage'

const TOTAL_NUMBERS = 100

type UseGameStateOptions = {
  elapsedMs?: number
  onAutoSave?: (snapshot: GameSnapshot) => void
}

export function useGameState(options: UseGameStateOptions = {}) {
  const { elapsedMs = 0, onAutoSave } = options
  const [order, setOrder] = useState<number[]>(() => shuffleNumbers(TOTAL_NUMBERS))
  const [currentTarget, setCurrentTarget] = useState(1)
  const [status, setStatus] = useState<GameStatus>('idle')
  const elapsedRef = useRef(elapsedMs)

  useEffect(() => {
    elapsedRef.current = elapsedMs
  }, [elapsedMs])

  const resetGame = useCallback(() => {
    setOrder(shuffleNumbers(TOTAL_NUMBERS))
    setCurrentTarget(1)
    setStatus('idle')
  }, [])

  const restoreGame = useCallback((snapshot: GameSnapshot) => {
    setOrder(snapshot.order)
    setCurrentTarget(snapshot.currentTarget)
    setStatus(snapshot.status)
  }, [])

  useEffect(() => {
    if (!onAutoSave || (status !== 'playing' && status !== 'paused')) return
    const snapshot: GameSnapshot = {
      order,
      currentTarget,
      status,
      elapsedMs: elapsedRef.current,
      savedAt: Date.now(),
    }
    onAutoSave(snapshot)
  }, [currentTarget, order, status, onAutoSave])

  return {
    order,
    currentTarget,
    status,
    setOrder,
    setCurrentTarget,
    setStatus,
    resetGame,
    restoreGame,
  }
}
