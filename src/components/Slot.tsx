import { useEffect, useState } from 'react'
import type {SlotProps} from '../types/game.types.ts'

export default function Slot ({
   value, 
   onClick
}: SlotProps) {
    const [isNew, setIsNew] = useState(false)

    useEffect(() => {
        if(value) {
            setIsNew(true)
            let timer = setTimeout(() => setIsNew(false), 500)
            return () => clearTimeout(timer)
        }
    }, [value])

    return (
        <div className={`game__container-item 
        ${value && (value === 'player_1' ? 'red' : 'yellow')|| 'empty'} 
        ${isNew ? 'falling' : ''}
        `} 
        onClick={onClick}>
                
        </div>
    )
}