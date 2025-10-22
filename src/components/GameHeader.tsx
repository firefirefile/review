import type { HeaderProps } from "../types/game.types"

export default function Header({
    isGameOver,
    isRedNext,
    winner
}:HeaderProps) {
    return (
        <header className="main__header"><h1 className="game__title">Connect Four Game</h1>
        <p className="game__title"> 
            {winner && winner !== null ? (winner === 'player_1' ? 'Red player wins!' : 'Yellow player wins!') 
                 : !isGameOver ? `Next is ${isRedNext ? 'red' : 'yellow'}`
                 : 'Game over'
                }
        </p> </header>
    )
}