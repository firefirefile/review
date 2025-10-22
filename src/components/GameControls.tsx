import type {GameControlsProps} from '../types/game.types'
import Button from './Button'

export default function GameControls ({
    handleRetryButton, 
    handleMenuButton,
    handleUndoButton,
    handleRedoButton,
    handleValidator
}:GameControlsProps
) {
    return (
        <div className="menu__container">
            <Button onClick={handleRetryButton} value='Retry'/>
            <Button onClick={handleMenuButton} value='Menu'/>
            <Button onClick={handleUndoButton} value='Undo' />
            <Button onClick={handleRedoButton} value='Redo' />
            <Button onClick={handleValidator} value='validator'/>
       </div>
    )
}