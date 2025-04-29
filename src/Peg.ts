export enum PegState {
    None,
    Red,
    Blue,
    Green,
    Yellow,
    White,
    Black
}

export class Peg {
    public state: PegState;
    private _maxState: number;

    constructor(max: number) {
        this.state = PegState.None; 
        this._maxState = max;
    }

    public increment() {
        this.state = (this.state + 1) % this._maxState;
    }

    public reset() {
        this.state = 0;
    }
}