import type { BoardType, player } from "../types/game.types"

export default function validatorWinnerCheck(newBoard: BoardType, player: player) {
        const rows = newBoard.length
        const cols = newBoard[0].length
        let result = {}
// это проверка по горизонтали 
        for (let row = 0; row < rows; row++) {
            for (let col=0; col < cols - 3; col++) {
                if (newBoard[row][col] === player
                    && newBoard[row][col]=== newBoard[row][col+1] 
                    && newBoard[row][col] === newBoard[row][col+2]
                    && newBoard[row][col] === newBoard[row][col+3]
                )
                { result = { who:{player},positions: [
                    [row, col], 
                    [row, col+1],
                    [row, col+2],
                    [row, col+3]
            ] }
                    return result
                }}}

//  это проверка по вертикали 
        for (let col = 0; col < cols; col++) {
            for (let row=0; row < rows - 3; row++) {
                if (newBoard[row][col] === player
                    && newBoard[row][col]=== newBoard[row+1][col] 
                    && newBoard[row][col] === newBoard[row+2][col]
                    && newBoard[row][col] === newBoard[row+3][col]
                )
                { result = { who:{player},positions: [
                    [row, col], 
                    [row + 1, col],
                    [row + 2, col],
                    [row + 3, col] 
                ]}
                    return result
                }}}
    // а вот это проверка по диагонали слева-направо вниз 
        for (let col = 0; col < cols-3; col++) {
            for (let row=0; row < rows - 3; row++) {
                if (newBoard[row][col] === player
                    && newBoard[row][col]=== newBoard[row+1][col+1] 
                    && newBoard[row][col] === newBoard[row+2][col+2]
                    && newBoard[row][col] === newBoard[row+3][col+3]
                )
                {result = { who:{player},positions: [
                    [row, col], 
                    [row + 1, col+ 1],
                    [row + 2, col+ 2],
                    [row + 3, col+ 3] 
                ]}
                    return result
                }}}
    // проверяю оставшуюся диагональ 

        for (let col = 0; col < cols-3; col++) {
            for (let row=3; row < rows; row++) {
                if (newBoard[row][col] === player
                    && newBoard[row][col]=== newBoard[row-1][col+1] 
                    && newBoard[row][col] === newBoard[row-2][col+2]
                    && newBoard[row][col] === newBoard[row-3][col+3]
                )
                {result = { who:{player},positions: [
                    [row, col], 
                    [row - 1 , col+ 1],
                    [row - 2, col+ 2],
                    [row - 3, col+ 3] 
                ]}
                    return result
                }}}

        return null
    }