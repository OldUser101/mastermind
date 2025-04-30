"use client";

import { Peg } from "./Peg";

const colors: string[] = [
    "bg-gradient-to-br from-zinc-600 to-zinc-500 hover:from-zinc-500 active:from-zinc-600 shadow-inner disabled:hover:from-zinc-600",
    "bg-red-600 hover:bg-red-500 active:bg-red-600 shadow-lg disabled:hover:bg-red-600",
    "bg-blue-700 hover:bg-blue-600 active:bg-blue-700 shadow-lg disabled:hover:bg-blue-700",
    "bg-green-700 hover:bg-green-600 active:bg-green-700 shadow-lg disabled:hover:bg-green-700", 
    "bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-600 shadow-lg disabled:hover:bg-yellow-600",
    "bg-neutral-300 hover:bg-neutral-200 active:bg-neutral-300 shadow-lg disabled:hover:bg-neutral-300",
    "bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900 shadow-lg disabled:hover:bg-neutral-900"];

interface Props {
    pegPress: (index: number) => void,
    pegs: Peg[],
    peg: number,
    disabled: boolean
}

export function GridCell({ pegPress, pegs, peg, disabled }: Props) {
    return (
        <button disabled={disabled} className={`${colors[pegs[peg].state]} cursor-pointer disabled:cursor-default rounded-full aspect-square duration-100 transition`}
        onMouseDown={()=> (pegPress(peg))}/>
    );
}