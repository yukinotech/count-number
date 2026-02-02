import type { MouseEvent } from 'react'

type GameTileProps = {
  value: number
  isWrong: boolean
  isCorrect: boolean
  onClick: (value: number) => void
}

export function GameTile({ value, isWrong, isCorrect, onClick }: GameTileProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onClick(value)
  }

  return (
    <button
      className={`tile${isWrong ? ' tile--wrong' : ''}${isCorrect ? ' tile--correct' : ''}`}
      onClick={handleClick}
      type="button"
      aria-label={`数字 ${value}`}
    >
      {value}
    </button>
  )
}
