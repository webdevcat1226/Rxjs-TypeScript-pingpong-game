import { ApplicationStates } from './ApplicationStates'
import { GameState } from './GameState'

export class ApplicationState {
    public state: ApplicationStates;
    public gameState: GameState;

    constructor(state: ApplicationStates, gameState: GameState) {
        this.state = state;
        this.gameState = gameState;
    }
}