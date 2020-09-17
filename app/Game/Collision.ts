export class Collision {
    stepAmount: number; // how many steps until the collision happens
    private resolveCallback: () => void;

    constructor(stepAmount: number, resolveCallback: () => void) {
        this.stepAmount = stepAmount;
        this.resolveCallback = resolveCallback;
    }

    resolve() {
        this.resolveCallback();
    }
}