import { Position } from './Position'
import { Direction } from './Direction'
import { VerticalPositionRange } from './VerticalPositionRange'

export class Paddle {
    direction: Direction;
    position: Position;
    width: number;
    height: number;
    speed: number;
    colour: string;
    private topLimit: number;
    private bottomLimit: number;
    constructor(width: number, height: number, speed: number, topLimit: number, bottomLimit: number, xPosition: number, colour: string) {
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.topLimit = topLimit;
        this.bottomLimit = bottomLimit;
        this.colour = colour;
        this.position = new Position(xPosition, this.getInitialYPosition());
    }
    reset(): void {
        this.position.y = this.getInitialYPosition();
        this.direction = Direction.none;
    }
    private getInitialYPosition(): number {
        return (this.bottomLimit - this.topLimit) / 2 - this.height / 2;
    }
    move(stepAmount: any): void {
        var distance: number = stepAmount * this.speed;

        switch (this.direction) {
            case Direction.down:
                if (this.position.y + this.height + distance >= this.bottomLimit) {
                    this.position.y = this.bottomLimit - this.height;
                } else {
                    this.position.y += distance;
                }
                break;
            case Direction.up:
                if (this.position.y - distance <= this.topLimit) {
                    this.position.y = this.topLimit;
                }
                else {
                    this.position.y -= distance;
                }
                break;
        }
    }
    getRightSideXPostion(): number {
        return this.position.x + this.width;
    }
    getLeftSideXPostion(): number {
        return this.position.x;
    }
    getProjectedYPositions(stepAmount: number): VerticalPositionRange {
        var distance: number = stepAmount * this.speed,
            result: VerticalPositionRange;
        // new Observable( subscriber => {this.startPlayerOneMovingUp.fire()} ).subscribe();
        switch (this.direction) {
            case Direction.up:
                result = {
                    top: this.position.y - distance,
                    bottom: this.position.y - distance + this.height
                };
                break;
            case Direction.down:
                result = {
                    top: this.position.y + distance,
                    bottom: this.position.y + distance + this.height
                };
                break;
            default:
                result = {
                    top: this.position.y,
                    bottom: this.position.y + this.height
                };
                break;
        }

        return result;
    }
    public getProjectedCentrePositionY(stepAmount: number): number {
        var distance: number = stepAmount * this.speed,
            projectedTopYPosition: number;
        switch (this.direction) {
            case Direction.up:
                projectedTopYPosition = this.position.y - distance;
                break;
            case Direction.down:
                projectedTopYPosition = this.position.y + distance;
                break;
            default:
                projectedTopYPosition = this.position.y;
                break;
        }
        return projectedTopYPosition + this.height / 2;
    }
}