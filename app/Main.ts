import { Game } from './Game/Game'
import { KeyMap } from './KeyMap'
import { Messages } from './Messages'
import { GameSettings } from './GameSettings'
import { RendererSettings } from './RendererSettings'
import { InputListener } from './InputListener'
import { KeyboardAndMouseInputListener } from './KeyboardAndMouseInputListener'

module Ping {
    var canvas: HTMLCanvasElement,
        keyMap: KeyMap,
        inputListener: InputListener,
        gameSettings: GameSettings,
        rendererSettings: RendererSettings,
        messages: Messages,
        game: Game;
    canvas = <HTMLCanvasElement>document.getElementById('PingCanvas');
    keyMap = {
        playerOneMoveUp: 87, // 'a' key
        playerOneMoveDown: 83, // 'z' key
        playerTwoMoveUp: 38, // 'k' key
        playerTwoMoveDown: 40, // 'm' key
        pause: 32 // space
    };
    inputListener = new KeyboardAndMouseInputListener(canvas, keyMap);
    gameSettings = {
        gameAreaHeight: 400,
        gameAreaWidth: 600,
        gameAreaBackgroundColour: '#000000',
        paddleWidth: 10,
        paddleHeight: 50,
        paddleInset: 10,
        paddleSpeed: 10,
        paddleColour: '#FFFFFF',
        ballRadius: 5,
        ballSpeed: 18,
        ballColour: '#FFFFFF',
        winningScore: 10,
        clockInterval: 50
    };
    rendererSettings = {
        scoreTextStyle: '#FFFFFF',
        scoreTextFont: '20px Monospace',
        scoreTextTopMargin: 10,
        messageMaskStyle: 'rgba(0, 0, 0, 0.75)',
        messageTextFont: '20px Arial',
        messageTextStyle: '#FFFFFF'
    };
    messages = {
        ready: 'Click to play',
        paused: 'Paused',
        gameOver: 'Click to play again'
    };
    game = new Game(inputListener, canvas, gameSettings, rendererSettings, messages);
}