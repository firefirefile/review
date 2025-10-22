import { useState } from 'react'
import './Game.css'
import Board from './components/Board'
import GameControls from './components/GameControls'
import GameHeader from './components/GameHeader'
import type { colIndex, BoardType, player} from './types/game.types'
import winnerCheck from "./utils/winnerCheck"
import GameMenu from './components/GameMenu'
import computerMove from './utils/computerMove'
import validator from './utils/validator'


function Game() {
  const emptyBoard = Array(6).fill(null).map(() => Array(7).fill(null))
  const [gameHistory, setGameHistory] = useState<BoardType[]>([])
  const [currentMove, setCurrentMove] = useState(0)
  const [turnHistory, setTurnHistory] = useState<number[]>([])

  const [gameBoard, setGameBoard] = useState(emptyBoard);
  const [isRedNext, setRedNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<player | null>(null);
  const [gameMode, setGameMode] = useState<'pvp' | 'pvc' | 'cvc'>('pvp')
  const [currentScreen, setCurrentScreen] = useState('menu')

     
// оформление хода такое: вначале срабатывает хендлмув 
// -> он вызывает мейкмув, а мейкмув делает ход и отдает тру/фолс
const makeMove = (colIndex:colIndex, currentPlayer:player) => { 
   const newBoard =[...gameBoard].map(row => [...row])
       let moveMade = false;
       if(isGameOver) return moveMade
       for (let row = 5; row >= 0; row--) {
            if (newBoard[row][colIndex] === null) {
                newBoard[row][colIndex] = currentPlayer; 
                moveMade = true
                //сохраняю историю игры чтобы работали кнопки undo/redo 
                const nextHistory = [...gameHistory.slice(0, currentMove + 1), newBoard]
                setGameHistory(nextHistory)
                //сохраняю историю ходов, чтобы по кнопке validator получать из них объект (в utils функция)
              setTurnHistory((prev) => [...prev, colIndex])
              
                setCurrentMove(nextHistory.length - 1)
                setGameBoard(newBoard);

                 if (winnerCheck(newBoard, currentPlayer)){ 
                    setWinner(currentPlayer)
                    setIsGameOver(true);
                } else if (drawCheck(newBoard)) {
                        setIsGameOver(true);
                    }    
                break;
            }
        }
        return moveMade
    };


   

    const handleMove = (colIndex: colIndex) => {
      if(isGameOver) {
        return;}
      const currentPlayer = isRedNext ? 'player_1' : 'player_2'
        const moveMade  = makeMove(colIndex, currentPlayer);
      if(moveMade && !isGameOver){
        
        setRedNext(!isRedNext)
       
        if (gameMode === 'pvc') {
       setTimeout(() => {
        handleComputerMove()
       }, 800);
        
      }
      }
    }
//хендлекстурн - нужна для хода компьютера и смены очереди игрока (не работает)
    const handleNextTurn = () => {
      if(isGameOver) return;
        const nextPlayer = isRedNext ? 'player_1' : 'player_2'
          const boardCopy = gameBoard.map(row => [...row])
          const computerCol = computerMove(boardCopy, nextPlayer)
          if (computerCol !== -1) {
            const moveMade  = makeMove(computerCol, nextPlayer)
            if(moveMade && !isGameOver) {
              
              setRedNext(!isRedNext)

            }
          }
      }

     const handleComputerMove = () => {
      const computerPlayer = isRedNext ? 'player_1' :'player_2';
      const computerCol = computerMove(gameBoard, computerPlayer)

      if (computerCol !== -1 ) {

        const  moveMade  = makeMove(computerCol, computerPlayer)
        if(moveMade && !isGameOver) {
          setRedNext(!isRedNext)
        }
      }
    }

    const handleRetryButton = () => {
      setWinner(null);
        setGameBoard(emptyBoard);
        setRedNext(true);
        setIsGameOver(false);
        setCurrentMove(0)
        setGameHistory([])

        
    }
    const drawCheck = (board: BoardType) => {
        for (let col = 0; col < 7; col++) {
            if(board[0][col] === null) {
                return false
            }
        }
        return true
    }

    const startGame = (mode:typeof gameMode) => {
      setGameMode(mode)
      setCurrentScreen('game')
      if (mode === 'cvc') {
        setTimeout(() => {handleNextTurn()}, 800)
      }
    }

    const handleMenuButton =() => {
      setCurrentScreen('menu')
       setGameBoard(emptyBoard)
        setRedNext(true)
        setIsGameOver(false)
        setWinner(null)
        setCurrentMove(0)
        setGameHistory([])

    }
   const handleUndoButton = () => {
      if(currentMove > 0 ) {
        setCurrentMove(currentMove - 1);
        setGameBoard(gameHistory[currentMove-1])
        setRedNext(!isRedNext)
        setIsGameOver(false)
      } else if (currentMove === 0) {
    setGameBoard(emptyBoard);
    setGameHistory([]);
    setCurrentMove(0);
    setRedNext(true);
    setIsGameOver(false);
      }
   }

   const handleRedoButton = () => {
    if(currentMove < gameHistory.length -1 ) {
        setCurrentMove(currentMove + 1);
        setGameBoard(gameHistory[currentMove + 1])
        setRedNext(!isRedNext)
        
      }
   }

   const handleValidator = () => {
    console.log(validator(turnHistory))
   }
  return (
    <>
    {currentScreen === 'menu' && <GameMenu 
    onPvp={() => startGame('pvp')}
    onPvc={() => startGame('pvc')}
    onCvc={() => startGame('cvc')}
    
    />}

    {currentScreen === 'game' && (
      <>
      <div className="game">
      <div className="game__info">
    <GameHeader isGameOver={isGameOver}
    isRedNext={isRedNext}
    winner= {winner}/>
    <GameControls 
    handleRetryButton={handleRetryButton}
    handleMenuButton={handleMenuButton}
    handleUndoButton={handleUndoButton}
    handleRedoButton={handleRedoButton}
    handleValidator={handleValidator}/>
    </div>
      <Board gameBoard={gameBoard}
    handleClick={handleMove}/>
  </div>
    </>
    )}
      </>
)}

export default Game

