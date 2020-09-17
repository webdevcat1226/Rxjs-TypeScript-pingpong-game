import { Observable } from 'rxjs'

import { ApplicationStates } from './ApplicationStates'
import { GameSettings } from '../GameSettings'
import { RendererSettings } from '../RendererSettings'
import { Messages } from '../Messages'
import { Direction } from './Direction'
import { InputListener } from '../InputListener'
import { ApplicationState } from './ApplicationState'
import { GameState } from './GameState'
import { Clock } from './Clock'
import { Renderer } from './Renderer'
import { Engine } from './Engine'

export class Game {
    constructor(inputListener: InputListener, canvas: HTMLCanvasElement, gameSettings: GameSettings, rendererSettings: RendererSettings, messages: Messages) {
        var gameState: GameState = new GameState(gameSettings),
            clock: Clock = new Clock(gameSettings.clockInterval),
            applicationState: ApplicationState = new ApplicationState(ApplicationStates.ready, gameState),
            renderer: Renderer = new Renderer(applicationState, canvas, rendererSettings, messages),
            engine: Engine = new Engine(gameState, gameSettings);
        const gamer = new Observable(applicationstater => {
            inputListener.onStartPlayerOneMovingUp(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.leftPaddle.direction = Direction.up;
                }
            })
        })
        gamer.subscribe().unsubscribe()
        const stater = new Observable(applicationStater => {
            inputListener.onStartPlayerOneMovingDown(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.leftPaddle.direction = Direction.down;
                }
            })
        })
        stater.subscribe();
        new Observable(applicationStater => {
            inputListener.onStopPlayerOneMoving(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.leftPaddle.direction = Direction.none;
                }
            })
        }).subscribe()
        new Observable(applicationStater => {
            inputListener.onStartPlayerTwoMovingUp(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.rightPaddle.direction = Direction.up;
                }
            })
        }).subscribe()
        new Observable(gameStater => {
            inputListener.onStartPlayerTwoMovingDown(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.rightPaddle.direction = Direction.down;
                }
            })
        }).subscribe()
        new Observable(stopPlayer => {
            inputListener.onStopPlayerTwoMoving(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    gameState.rightPaddle.direction = Direction.none;
                }
            })
        }).subscribe()
        new Observable(newer => {
            inputListener.onPause(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    clock.stop();
                    applicationState.state = ApplicationStates.paused;
                    renderer.render();
                }
                else if (applicationState.state === ApplicationStates.paused) {
                    clock.start();
                    applicationState.state = ApplicationStates.playing;
                    renderer.render();
                }
            })
        }).subscribe()
        new Observable(subscriber => {
            inputListener.onStart(() => {
                if (applicationState.state === ApplicationStates.ready ||
                    applicationState.state === ApplicationStates.gameOver) {
                    gameState.init();
                    applicationState.state = ApplicationStates.playing;
                    renderer.render();
                    clock.start()
                }
            })
        }).subscribe()
        new Observable(subscriber => {
            clock.onTick(() => {
                if (applicationState.state === ApplicationStates.playing) {
                    engine.step();
                }
                renderer.render()
            })
        }).subscribe()
        new Observable(subscriber => {
            engine.onPlayerOneConcede(() => {
                gameState.rightPoints++;
                if (gameState.rightPoints === gameSettings.winningScore) {
                    applicationState.state = ApplicationStates.gameOver;
                    clock.stop();
                } else { gameState.ball.reset() }
            })
        }).subscribe()

        new Observable(subscriber => {
            engine.onPlayerTwoConcede(() => {
                gameState.leftPoints++;
                if (gameState.leftPoints === gameSettings.winningScore) {
                    applicationState.state = ApplicationStates.gameOver;
                    clock.stop();
                } else { gameState.ball.reset() }
            })
        }).subscribe();

        renderer.render();
    }
}