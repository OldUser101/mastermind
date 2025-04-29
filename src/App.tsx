import './App.css'
import { Code } from './Code';
import { CodePeg, CodePegState } from './CodePeg';
import { GridCell } from './GridCell';
import { GridCode } from './GridCode';
import { Peg, PegState } from './Peg';
import React, { useState, useEffect } from 'react';

const rows = 10;
const cols = 5;
const max = 7;

export default function App() {
    const [pegs, setPegs] = useState<Peg[]>(() => 
        Array.from({length: rows * 4}, () => new Peg(max))
    );

    const [disabled, setDisabled] = useState<boolean[]>(() =>
        Array.from({length: rows * 4}, () => true)
    );

    const [currentRow, setCurrentRow] = useState<number>(9);

    const [currentCode, setCurrentCode] = useState<Code>(new Code());

    const [playingGame, setPlayingGame] = useState<boolean>(false);

    const [codePegs, setCodePegs] = useState<CodePeg[][]>(() => 
        Array.from({ length: rows }, () => (
            Array.from({ length: cols }, () => new CodePeg(CodePegState.None))
        ))
    );

    const [checkAllowed, setCheckAllowed] = useState<boolean>(false);

    const handlePegPress = (index: number) => {
        pegs[index].increment();
        setPegs([...pegs])
    };

    const handleCheck = () => {
        let newCodePegs = [...codePegs];
        currentCode.check(pegs.slice(currentRow * 4, (currentRow + 1) * 4)).map((c, i) => {
            newCodePegs[currentRow][i] = c;
        })
        setCodePegs(newCodePegs);

        if (currentRow === 0 || currentCode.gameover) {
            setPlayingGame(false);
        } else {
            setCurrentRow(currentRow - 1);
        }

        setCheckAllowed(false);
    };

    const newGame = () => {
        setCurrentCode(new Code());
        setPegs(Array.from({length: rows * 4}, () => new Peg(max)));
        setCodePegs(Array.from({ length: rows }, () => (
            Array.from({ length: cols }, () => new CodePeg(CodePegState.None))
        )));
        setDisabled(Array.from({length: rows * 4}, () => true));
        setCurrentRow(9);
        setCheckAllowed(false);
        setPlayingGame(true);
        setDisabled(() => {
            const newDisabled = Array.from({length: rows * 4}, () => true);
            for (let i = currentRow * 4; i < (currentRow + 1) * 4; i++) {
                newDisabled[i] = false;
            }
            return newDisabled;
        });
    };

    useEffect(() => {
        if (!playingGame) {
            const newDisabled = Array.from({length: rows * 4}, () => true);
            setDisabled(newDisabled);
            console.log("all disabled")
            return;
        }
        setDisabled(() => {
            const newDisabled = Array.from({length: rows * 4}, () => true);
            for (let i = currentRow * 4; i < (currentRow + 1) * 4; i++) {
                newDisabled[i] = false;
            }
            return newDisabled;
        });
    }, [currentRow, playingGame]);

    useEffect(() => {
        let allowCheck: boolean = true;
        for (let i = currentRow * 4; i < (currentRow + 1) * 4; i++) {
            if (pegs[i].state === PegState.None) {
                allowCheck = false;
                break;
            }
        }

        if (allowCheck != checkAllowed) {
            setCheckAllowed(allowCheck);
        }
    }, [pegs]);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-950 to-indigo-950">
            <h1 className="font-bold text-3xl mb-5">
                Mastermind
            </h1>
            <div className="bg-gradient-to-tr from-neutral-400 to-neutral-300 p-4 rounded-xl text-black shadow-2xl">
                <div id="game-container" className="grid gap-4 p-2">
                    {Array.from({length: rows}).map((_, row) => (
                        <React.Fragment key={row}>
                            <GridCode key={`${row}-0`} code={codePegs[row]} />
                            {Array.from({length: 4}).map((_, col) => {
                                const pegIndex = row * 4 + col;
                                return (
                                    <GridCell key={`${row}-${col}`} disabled={disabled[pegIndex]} peg={pegIndex} pegPress={handlePegPress} pegs={pegs} />
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div id="controls" className="flex justify-between mt-2" style={{
                width: "33vmin"
            }}>
                <button className="rounded-full p-2 bg-white/0 hover:bg-white/25 active:bg-white/35 transition" onClick={() => newGame()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
                <button disabled={!checkAllowed} onClick={() => handleCheck()} className="rounded-full p-2 bg-white/0 hover:bg-white/25 active:bg-white/35 transition disabled:text-gray-500 disabled:hover:bg-white/0 disabled:active:bg-white/0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                </button>
            </div>

            <p>Copyright © 2025, Nathan Gill</p>
            <a className="underline" href="https://nathanjgill.uk">Website</a>
            <a className="underline" href="https://github.com/OldUser101/mastermind">GitHub</a>
        </div>
    );
}
