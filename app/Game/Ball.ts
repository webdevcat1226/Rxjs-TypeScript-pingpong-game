import { Position } from './Position'

export class Ball {
    private startingCentrePosition: Position;

    centrePosition: Position;
    direction: number;
    radius: number;
    speed: number;
    colour: string;

    constructor(radius: number, speed: number, colour: string, startingCentrePosition: Position) {
        this.radius = radius;
        this.speed = speed;
        this.colour = colour;
        this.direction = this.getNewDirection();
        this.startingCentrePosition = startingCentrePosition;
        this.centrePosition = new Position(startingCentrePosition.x, startingCentrePosition.y);
    }

    reset(): void {
        this.centrePosition.x = this.startingCentrePosition.x;
        this.centrePosition.y = this.startingCentrePosition.y;
        this.direction = this.getNewDirection();
    }

    getVerticalSpeed(): number {
        return this.speed * Math.sin(this.direction);
    }

    getHorizontalSpeed(): number {
        return this.speed * Math.cos(this.direction);
    }

    move(stepAmount: any): void {
        this.centrePosition.x += this.getHorizontalSpeed() * stepAmount;
        this.centrePosition.y += this.getVerticalSpeed() * stepAmount;
    }

    reverseVerticalDirection(): void {
        this.direction *= -1;
    }

    public getNormalizedDirection(): number {
        var twoPi: number = 2 * Math.PI;
        return ((this.direction % twoPi) + twoPi) % twoPi;
    }

    public isMovingRight(): boolean {
        var normalizedDirection: number = this.getNormalizedDirection();
        return 0 <= normalizedDirection && normalizedDirection < 0.5 * Math.PI ||
            1.5 * Math.PI < normalizedDirection && normalizedDirection < 2 * Math.PI;
    }

    public isMovingLeft(): boolean {
        var normalizedDirection: number = this.getNormalizedDirection();
        return 0.5 * Math.PI < normalizedDirection && normalizedDirection < 1.5 * Math.PI;
    }

    public getLeftSideXPosition(): number {
        return this.centrePosition.x - this.radius;
    }

    public getRightSideXPosition(): number {
        return this.centrePosition.x + this.radius;
    }

    getProjectedPosition(stepAmount: number): Position {
        return new Position(
            this.centrePosition.x + this.getHorizontalSpeed() * stepAmount,
            this.centrePosition.y + this.getVerticalSpeed() * stepAmount
        );
    }

    private getNewDirection(): number {
        return Math.random() < 0.5 ? Math.PI : 0;
    }
}