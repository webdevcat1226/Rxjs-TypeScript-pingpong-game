import { Event } from '../Event'
export class Clock {
    private intervalId: any;
    private interval: number;
    private tick: Event;
    constructor(interval: number) {
        this.interval = interval;
        this.tick = new Event();
    }
    stop() {
        clearInterval(this.intervalId);
    }
    start() {
        this.intervalId = setInterval(() => {
            this.tick.fire();
        }, this.interval)
    }
    onTick(callback: () => void) {
        this.tick.register(callback);
    }
}