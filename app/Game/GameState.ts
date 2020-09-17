import { Ball } from './Ball'
import { Paddle } from './Paddle'
import { Position } from './Position'
import { GameArea } from './GameArea'
import { Collision } from './Collision'
import { GameSettings } from '../GameSettings'
import { VerticalPositionRange } from './VerticalPositionRange'

export class GameState {
    ball: Ball;
    leftPaddle: Paddle;
    rightPaddle: Paddle;
    gameArea: GameArea;
    leftPoints: number;
    rightPoints: number;

    constructor(settings: GameSettings) {
        this.gameArea = new GameArea(
            settings.gameAreaWidth,
            settings.gameAreaHeight,
            settings.gameAreaBackgroundColour);

        this.leftPaddle = new Paddle(
            settings.paddleWidth,
            settings.paddleHeight,
            settings.paddleSpeed,
            0,
            settings.gameAreaHeight,
            settings.paddleInset,
            settings.paddleColour);

        this.rightPaddle = new Paddle(
            settings.paddleWidth,
            settings.paddleHeight,
            settings.paddleSpeed,
            0,
            settings.gameAreaHeight,
            settings.gameAreaWidth - settings.paddleInset - settings.paddleWidth,
            settings.paddleColour);

        this.ball = new Ball(
            settings.ballRadius,
            settings.ballSpeed,
            settings.ballColour,
            new Position(Math.floor(settings.gameAreaWidth / 2), Math.floor(settings.gameAreaHeight / 2)));

        this.leftPoints = 0;
        this.rightPoints = 0;
    }

    init(): void {
        this.ball.reset();
        this.leftPaddle.reset();
        this.rightPaddle.reset();
        this.leftPoints = 0;
        this.rightPoints = 0;
    }

    ballIsLeftOfPlayingArea(): boolean {
        return this.ball.centrePosition.x <= this.ball.radius * -1;
    }

    ballIsRightOfPlayingArea(): boolean {
        return this.ball.centrePosition.x >= this.gameArea.width + this.ball.radius;
    }

    move(stepAmount: any) {
        this.ball.move(stepAmount);
        this.leftPaddle.move(stepAmount);
        this.rightPaddle.move(stepAmount);
    }

    getNearestCollision(): Collision {
        var collisions: Collision[] = [];

        collisions.push(this.getNearestTopWallCollision());
        collisions.push(this.getNearestBottomWallCollision());
        collisions.push(this.getNearestPaddleCollision());

        return collisions.filter((collision: Collision) => {
            return collision != null;
        }).reduce((previousCollision: Collision, currentCollision: Collision) => {
            return previousCollision && (previousCollision.stepAmount < currentCollision.stepAmount) ? previousCollision : currentCollision;
        }, null);
    }

    private getNearestTopWallCollision(): Collision {
        var result: Collision = null,
            verticalGap: number = this.ball.centrePosition.y - this.ball.radius,
            verticalSpeed: number = this.ball.getVerticalSpeed(),
            steps: number;

        if (verticalSpeed < 0) {
            steps = verticalGap / verticalSpeed * -1;
            result = new Collision(steps, () => {
                this.ball.reverseVerticalDirection();
            });
        }

        return result;
    }

    private getNearestBottomWallCollision(): Collision {
        var result: Collision = null,
            verticalGap: number = this.gameArea.height - this.ball.centrePosition.y - this.ball.radius,
            verticalSpeed: number = this.ball.getVerticalSpeed(),
            steps: number;

        if (verticalSpeed > 0) {
            steps = verticalGap / verticalSpeed;

            result = new Collision(steps, () => {
                this.ball.reverseVerticalDirection();
            });
        }

        return result;
    }

    private getNearestPaddleCollision(): Collision {
        var ballHorizontalSpeed: number = this.ball.getHorizontalSpeed(),
            paddle: Paddle,
            paddleBallRelativeHorizontalPosition: number,
            steps: number,
            projectedPaddlePositionRange: VerticalPositionRange,
            projectedBallCentreYPosition: number,
            result: Collision = null;

        if (ballHorizontalSpeed != 0) {
            if (this.ball.isMovingLeft()) {
                paddle = this.leftPaddle;
                paddleBallRelativeHorizontalPosition = paddle.getRightSideXPostion() - this.ball.getLeftSideXPosition();
            }
            else {
                paddle = this.rightPaddle;
                paddleBallRelativeHorizontalPosition = paddle.getLeftSideXPostion() - this.ball.getRightSideXPosition();
            }

            steps = paddleBallRelativeHorizontalPosition / ballHorizontalSpeed;

            projectedPaddlePositionRange = paddle.getProjectedYPositions(steps);
            projectedBallCentreYPosition = this.ball.getProjectedPosition(steps).y;

            if (projectedPaddlePositionRange.top <= projectedBallCentreYPosition &&
                projectedPaddlePositionRange.bottom >= projectedBallCentreYPosition) {
                var projectedPaddleCentrePositionY: number = paddle.getProjectedCentrePositionY(steps),
                    impactRelativeYPositionFromPaddleCentre: number = projectedBallCentreYPosition - projectedPaddleCentrePositionY,
                    getNewDirectionRight: (range: number, angleProportion: number) => number =
                        (angleRange, angleAmountAsProportion) => {
                            return angleRange / 2 * angleAmountAsProportion;
                        },
                    getNewDirectionLeft: (angleRange: number, angleAmountAsProportion: number) => number =
                        (angleRange, angleAmountAsProportion) => {
                            return Math.PI + angleRange / 2 * angleAmountAsProportion * -1;
                        },
                    resolveCollisionCallback: () => void = this.ball.isMovingRight() ?
                        () => {
                            this.ball.direction = getNewDirectionLeft(Math.PI / 2, impactRelativeYPositionFromPaddleCentre / (paddle.height / 2));
                        } :
                        () => {
                            this.ball.direction = getNewDirectionRight(Math.PI / 2, impactRelativeYPositionFromPaddleCentre / (paddle.height / 2));
                        };

                result = new Collision(steps, resolveCollisionCallback);
            }
        }

        return result;
    }
}