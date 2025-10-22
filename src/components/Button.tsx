import type { ButtonProps } from "../types/game.types";

export default function Button ({onClick, value}:ButtonProps) {
    return (
        <button className="button" onClick={()=>onClick()}> {value}</button>
    )
}