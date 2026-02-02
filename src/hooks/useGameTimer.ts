import { useCallback, useEffect, useRef, useState } from 'react'

export function useGameTimer(initialElapsed = 0) {
  const [elapsedMs, setElapsedMs] = useState(initialElapsed)
  const [isRunning, setIsRunning] = useState(false)
  const startAtRef = useRef<number | null>(null)
  const elapsedRef = useRef(elapsedMs)

  useEffect(() => {
    elapsedRef.current = elapsedMs
  }, [elapsedMs])

  const start = useCallback(() => {
    if (isRunning) return
    startAtRef.current = performance.now() - elapsedRef.current
    setIsRunning(true)
  }, [isRunning])

  const stop = useCallback(() => {
    if (!isRunning) return
    setIsRunning(false)
  }, [isRunning])

  const reset = useCallback(() => {
    setIsRunning(false)
    startAtRef.current = null
    setElapsedMs(0)
  }, [])

  const setElapsed = useCallback((ms: number) => {
    setElapsedMs(ms)
    if (isRunning) {
      startAtRef.current = performance.now() - ms
    }
  }, [isRunning])

  useEffect(() => {
    if (!isRunning) return
    const id = window.setInterval(() => {
      if (startAtRef.current === null) return
      const nextElapsed = Math.max(0, performance.now() - startAtRef.current)
      setElapsedMs(nextElapsed)
    }, 50)
    return () => window.clearInterval(id)
  }, [isRunning])

  return {
    elapsedMs,
    isRunning,
    start,
    stop,
    reset,
    setElapsed,
  }
}
