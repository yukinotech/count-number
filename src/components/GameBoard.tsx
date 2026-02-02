import { GameTile } from './GameTile'

type GameBoardProps = {
  order: number[]
  wrongValue: number | null
  correctValue: number | null
  onTileClick: (value: number) => void
}

export function GameBoard({ order, wrongValue, correctValue, onTileClick }: GameBoardProps) {
  return (
    <div className="board" role="grid">
      {order.map((value) => (
        <GameTile
          key={value}
          value={value}
          isWrong={wrongValue === value}
          isCorrect={correctValue === value}
          onClick={onTileClick}
        />
      ))}
    </div>
  )
}
