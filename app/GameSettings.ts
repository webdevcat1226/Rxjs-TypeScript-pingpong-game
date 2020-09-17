export interface GameSettings {
    gameAreaHeight: number;
    gameAreaWidth: number;
    gameAreaBackgroundColour: string;
    paddleWidth: number;
    paddleHeight: number;
    paddleInset: number;
    paddleSpeed: number;
    paddleColour: string;
    ballRadius: number;
    ballSpeed: number;
    ballColour: string;
    winningScore: number;
    clockInterval: number
}

export enum ApplicationStates {
    ready,
    playing,
    paused,
    gameOver
}



