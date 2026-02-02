export type GameStatus = 'idle' | 'playing' | 'completed'

export type GameSnapshot = {
  order: number[]
  currentTarget: number
  status: GameStatus
  elapsedMs: number
  savedAt: number
}

const STORAGE_KEY = 'count-number-progress-v1'

export function saveSnapshot(snapshot: GameSnapshot) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // Ignore storage errors (quota, privacy modes)
  }
}

export function loadSnapshot(): GameSnapshot | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as GameSnapshot
    if (!Array.isArray(parsed.order) || parsed.order.length !== 100) return null
    if (typeof parsed.currentTarget !== 'number') return null
    if (parsed.currentTarget < 1 || parsed.currentTarget > 100) return null
    if (!['idle', 'playing', 'completed'].includes(parsed.status)) return null
    if (typeof parsed.elapsedMs !== 'number' || parsed.elapsedMs < 0) return null
    return parsed
  } catch {
    return null
  }
}

export function clearSnapshot() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors
  }
}
