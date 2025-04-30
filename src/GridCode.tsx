"use client";

import { CodePeg } from "./CodePeg";

interface Props {
    code: CodePeg[]
}

const colors: string[] = [
    "bg-gradient-to-br from-zinc-600 to-zinc-500 shadow-inner",
    "bg-neutral-300 shadow-lg",
    "bg-neutral-900 shadow-lg"
];

export function GridCode({ code }: Props) {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className={`${colors[code[i].state]} rounded-full`} />
            ))}
        </div>
    );
}