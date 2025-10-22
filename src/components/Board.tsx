import Slot from "./Slot"
import type {rowIndex, colIndex, BoardProps} from '../types/game.types'

export default function Board({
    gameBoard,
    handleClick
}:BoardProps) {

    return (
       <div className="game__container">
        {gameBoard.map((row, rowIndex: rowIndex) => (
                <div className="game__container-row" 
                key={rowIndex}>
                    {row.map((value, colIndex: colIndex) => (
                    <Slot 
                    key={`${rowIndex}-${colIndex}-${value}`}
                    value={value}
                    onClick={() => handleClick(colIndex)}
            >
            </Slot>))}
        </div>)
        
    )}
    </div>
    
    )
}

