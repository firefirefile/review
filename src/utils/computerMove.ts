import type { BoardType, colIndex, player} from '../types/game.types'
import winnerCheck from './winnerCheck'

export default function computerMove(
    board:BoardType,
    player:player
): number{
    const avaliableColums = []
console.log('=== КОМПЬЮТЕР ХОДИТ ===');
    for (let col = 0; col < 7; col++) {
        if(board[0][col]=== null){
            avaliableColums.push(col)
        }
    }

    if (avaliableColums.length === 0) {
        return -1
        
    }  

    const opponent = player === 'player_1' ? 'player_2' : 'player_1'

    // проверка на то, может ли компьютер победить - 
    // для этого создаём копию доски и делаем там ход, если он выигрышный - возвращаем колонку
    for (let i = 0; i < avaliableColums.length; i ++) {
        const col = avaliableColums[i]
        const tempBoard = simulateMove(board, col, player)
        if(winnerCheck(tempBoard, player)){
            return col 
        }
    }
    //проверка на то, может ли победить второй игрок 
    for (let i = 0; i < avaliableColums.length; i++) {
        const col = avaliableColums[i]
        const tempBoard = simulateMove(board, col, opponent)
        if(winnerCheck(tempBoard, opponent)){
            return col 
        }
    }
    //в первую очередь занимаем центр
    const centralCol = 3; 
    if (avaliableColums.includes(centralCol)) {
        return (centralCol)
    }

    // если ниче не нашлось - делаем рандомный ход 
    const randomIndex = Math.floor(Math.random() * avaliableColums.length)
    console.log(avaliableColums[randomIndex])
    return avaliableColums[randomIndex]
    }
  
// для симуляции кода дублирую кусок кода игрока - ищем самую нижнюю ячейку, возвращаем игровое поле со сделанным ходом 
const simulateMove = (board: BoardType, colIndex: colIndex, player: player) => {
    const newBoard: BoardType = board.map(row => [...row])
       for (let row = 5; row >= 0; row--) {
            if (newBoard[row][colIndex] === null) {
                newBoard[row][colIndex] = player; 
            break;
            }     
}   return newBoard
}