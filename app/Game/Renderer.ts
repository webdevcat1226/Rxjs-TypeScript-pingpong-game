import { RendererSettings } from '../RendererSettings'
import { ApplicationState } from './ApplicationState'
import { Messages } from '../Messages'
import { ApplicationStates } from './ApplicationStates'
import { GameArea } from './GameArea'
import { Paddle } from './Paddle'
import {Ball} from './Ball'


export class Renderer {
    private settings: RendererSettings;
    private context: CanvasRenderingContext2D;
    private applicationState: ApplicationState;
    private messages: Messages;
    constructor(applicationState: ApplicationState, canvas: HTMLCanvasElement, settings: RendererSettings, messages: Messages) {
        this.applicationState = applicationState;
        this.context = canvas.getContext('2d');
        this.settings = settings;
        this.messages = messages;
    }
    render() {
        this.renderGameArea();
        this.renderScore();
        this.renderPaddle(this.applicationState.gameState.leftPaddle);
        this.renderPaddle(this.applicationState.gameState.rightPaddle);
        this.renderBall();
        if (this.applicationState.state !== ApplicationStates.playing) {
            this.renderMask();

            switch (this.applicationState.state) {
                case ApplicationStates.ready:
                    this.renderReadyMessage();
                    break;
                case ApplicationStates.paused:
                    this.renderPausedMessage();
                    break;
                case ApplicationStates.gameOver:
                    this.renderGameOverMessage();
                    break;
            }
        }
    }
    private renderGameArea() {
        var gameArea: GameArea = this.applicationState.gameState.gameArea;

        this.context.fillStyle = gameArea.backgroundColour;
        this.context.fillRect(0, 0, gameArea.width, gameArea.height);
    }
    private renderScore() {
        var centreXOffset: number = Math.floor(this.applicationState.gameState.gameArea.width / 2);

        this.context.fillStyle = this.settings.scoreTextStyle;
        this.context.font = this.settings.scoreTextFont;
        this.context.textBaseline = 'top';

        this.context.textAlign = 'center';
        this.context.fillText(this.applicationState.gameState.leftPoints.toString() + ' - ' + this.applicationState.gameState.rightPoints.toString(), centreXOffset, this.settings.scoreTextTopMargin);
    }
    private renderPaddle(paddle: Paddle) {
        this.context.fillStyle = paddle.colour;
        this.context.fillRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height);
    }
    private renderBall() {
        var ball: Ball = this.applicationState.gameState.ball;
        this.context.beginPath();
        this.context.arc(ball.centrePosition.x, ball.centrePosition.y, ball.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = ball.colour;
        this.context.fill();
    }
    private renderMask() {
        var gameArea: GameArea = this.applicationState.gameState.gameArea;
        this.context.fillStyle = this.settings.messageMaskStyle;
        this.context.fillRect(0, 0, gameArea.width, gameArea.height);
    }
    private renderReadyMessage() {
        this.renderMessage(this.messages.ready);
    }
    private renderPausedMessage() {
        this.renderMessage(this.messages.paused);
    }
    private renderGameOverMessage() {
        this.renderMessage(this.messages.gameOver);
    }
    private renderMessage(message: string) {
        var centreXOffset: number = Math.floor(this.applicationState.gameState.gameArea.width / 2),
            centreYOffset: number = Math.floor(this.applicationState.gameState.gameArea.height / 2);
        this.context.fillStyle = this.settings.messageTextStyle;
        this.context.font = this.settings.messageTextFont;
        this.context.textBaseline = 'middle';
        this.context.textAlign = 'center';
        this.context.fillText(
            message,
            centreXOffset,
            centreYOffset);
    }
}