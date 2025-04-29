export enum CodePegState {
    None,
    White,
    Black
}

export class CodePeg {
    public state: CodePegState;

    constructor(state: CodePegState) {
        this.state = state;
    }
}