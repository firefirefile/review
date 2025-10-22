// Реализовать функцию validator:

// Входные данные:

// Входные данные в виде массива чисел - последовательности шагов.

// Если ходов еще не было - приходит пустой массив.

// На четных индексах шаги первого игрока, на нечетных - второго, потому что начинает всегда первый игрок.

// Каждое число в последовательности - это номер столбца, в который текущий игрок бросает фишку. Номера столбцов (как и числа в массиве) находятся в диапазоне 0 <= x <= 6.

// Пример входных данных:

// \[1, 2, 1, 2, 3, 2, ...\]

// Выходные данные:

// Выходные данные в виде объекта с подробным описанием хода игры по шагам.

// Ключи объекта - steo_0 (игра еще не началась), step_1, step_2, step_3 и т.д. - порядковый номер шага.

// Значения для каждого ключа - это объект со следующими данными:

// \- player_1 - массив кортежей длины 2. В этом массиве находятся все координаты фишек первого игрока на поле на текущем шаге. На первом месте в кортеже стоит координата по x, на втором - координата по y. Например, \[0, 0\] означает первую строку и первый столбец. Все числа на первой позиции находятся в диапазоне 0 <= x <= 5, на второй - 0 <= x <= 6.

// \- player_2 - то же самое, что для player_1, но для второго игрока.

// \- board_state - состояние доски: либо 'waiting', когда игра не началась, либо 'pending', когда игра в процессе, либо 'win', когда есть победа какого-то игрока, либо 'draw', когда ничья.

// \- winner - опциональное поле с информацией о победившем игроке. Это поле должно быть в выходных данных только при победе какого-то игрока. В этом поле объект с двумя ключами:
// 1\. who: 'player_1' или 'player_2' - кто победил.
// 2\. positions - массив длины 4 с кортежами длины 2. Показывает позиции 4 фишек победившего игрока, с которыми он как раз победил. Каждый кортеж - это координаты фишки по аналогии с кортежами в player_1 и player_2.

import validatorWinnerCheck from './validatorWinnerCheck';

interface winResult {
            who: 'player_1' | 'player_2';
            positions:[number, number][];
        };

interface StepResult {
    [key:`step_${number}`] : {
        player_1:[number, number][];
        player_2:[number, number][];
        board_state: 'waiting'| 'pending' | 'win' | 'draw';
        winner?:{
            who: 'player_1' | 'player_2';
            positions:[number, number][];
        };
    };
}
type column = number;
type boardType = ('player_1' | 'player_2' | null)[][];
type player = 'player_1' | 'player_2'



export default function validator (moves:number[]) {
    const result:StepResult = {}
    let board = createNewBoard();
    let stepNumber = 0

    result['step_0'] = {
        player_1: [],
        player_2: [],
        board_state: 'waiting'
    }

   for (let i = 0; i < moves.length; i++){

    const column = moves[i]
    const row = findRow(board, column)
        if(row === -1) {
            continue
        }
        stepNumber++ 
         
    const player = i % 2 === 0? 'player_1' : 'player_2'
        board[row][column] = player
        
        const player_1Moves = countChips(board, 'player_1')
        const player_2Moves = countChips(board, 'player_2')

         const winResult = validatorWinnerCheck(board, player) as winResult |null
        const isDraw = board.every(row => row.every(cell => cell !== null)) && !winResult
       
        if(winResult) {
             result[`step_${stepNumber}`] = {
            player_1:player_1Moves,
            player_2:player_2Moves,
            board_state : 'win',
            winner : {
                who: winResult.who,
                positions: winResult.positions
            }}
        }   else if (isDraw) {
            result[`step_${stepNumber}`] = {
            player_1:player_1Moves,
            player_2:player_2Moves,
            board_state : 'draw'}
        } else { 
        result[`step_${stepNumber}`] = {
            player_1:player_1Moves,
            player_2:player_2Moves,
            board_state: 'pending'
            
        }} 

   }
   return result
}

const createNewBoard = () => Array(6).fill(null).map(() => Array(7).fill(null));

function findRow (board : boardType, column: column){
    for (let row = 5; row >= 0; row--) {
        if(board[row][column] === null){
            return row
        }
    }
    return -1
}

function countChips (board: boardType, player: player) {
    const chips:[number, number] [] = []
    for (let row = 0; row < 6; row++) {
        for(let col = 0; col < 7; col++) {
            if (board[row][col] === player) {
                chips.push([row,col])
            }
        }
    } 
    return chips
}

// function winnerCheck(board: boardType, player: player) {

// }
