import { Peg, PegState } from "./Peg";
import { CodePeg, CodePegState } from "./CodePeg";

export class Code {
    private state: PegState[];
    public gameover: boolean;

    constructor() {
        this.state = Array.from({ length: 4 }, () => {
            return Math.floor(Math.random() * 6) + 1;
        })
        this.gameover = false;
    }

    public check(pegs: Peg[]) {
        let blacks: number = 0;
        let whites: number = 0;

        let markTarget: boolean[] = Array.from({ length: 4 }, () => false);
        let markPlaced: boolean[] = Array.from({ length: 4 }, () => false);

        for (let i: number = 0; i < this.state.length && i < pegs.length; i++) {
            if (pegs[i].state == this.state[i]) {
                blacks++;
                markTarget[i] = true;
                markPlaced[i] = true;
            }
        }

        for (let i: number = 0; i < this.state.length && i < pegs.length; i++) {
            if (!markPlaced[i]) {
                for (let j: number = 0; j < this.state.length && j < pegs.length; j++) {
                    if (!markTarget[j] && pegs[i].state == this.state[j]) {
                        whites++;
                        markTarget[j] = true;
                        break;
                    }
                }
            }
        }

        if (blacks === 4) {
            this.gameover = true;
        }

        let codePegs: CodePeg[] = [];

        for (let i = 0; i < blacks; i++) {
            codePegs.push(new CodePeg(CodePegState.Black));
        }
        for (let i = 0; i < whites; i++) {
            codePegs.push(new CodePeg(CodePegState.White));
        }
        while (codePegs.length < 4) {
            codePegs.push(new CodePeg(CodePegState.None));
        }

        return codePegs;
    }
}