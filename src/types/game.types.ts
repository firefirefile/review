export interface SlotProps {
     value: 'player_1' | 'player_2' | null;
    onClick : () => void;
}

export interface BoardProps {
    gameBoard:BoardType;
    handleClick: (column:colIndex) => void;

}

export interface GameControlsProps {
    handleRetryButton:() => void;  
    handleMenuButton:() => void;
    handleUndoButton : () => void;
    handleRedoButton: () => void;
    handleValidator: () => void; 
}

export interface HeaderProps {
    isGameOver:boolean;
    isRedNext:boolean;
    winner:player
}

export interface ButtonProps{
    onClick: () => void;
    value: string;
}

export interface GameMenuProps {
    onPvp: () => void; 
    onPvc: () => void; 
    onCvc: () => void; 
    
}

export type rowIndex = number;
export type colIndex = number; 
export type cellValue = null | 'player_1' | 'player_2'
export type BoardType = cellValue[] []
export type player = 'player_1' | 'player_2' |null

