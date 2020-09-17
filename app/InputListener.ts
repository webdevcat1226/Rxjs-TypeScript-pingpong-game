import { Observable, Subject } from 'rxjs'
import { Event } from './Event'

export class InputListener {
    startPlayerOneMovingUp: Event = new Event();
    startPlayerOneMovingDown: Event = new Event();
    startPlayerTwoMovingUp: Event = new Event();
    startPlayerTwoMovingDown: Event = new Event();
    stopPlayerOneMoving: Event = new Event();
    stopPlayerTwoMoving: Event = new Event();
    pause: Event = new Event();
    start: Event = new Event();

    onStartPlayerOneMovingUp(callback: () => void) {
        new Observable(subscriber => { this.startPlayerOneMovingUp.register(callback) }).subscribe()
    }

    onStartPlayerOneMovingDown(callback: () => void) {
        const subject = new Subject();
        subject.subscribe(subscriber => { this.startPlayerOneMovingDown.register(callback) });
        subject.next();
    }

    onStartPlayerTwoMovingUp(callback: () => void) {
        new Observable(subscriber => { this.startPlayerTwoMovingUp.register(callback) }).subscribe()
    }

    onStartPlayerTwoMovingDown(callback: () => void) {
        new Observable(subscriber => { this.startPlayerTwoMovingDown.register(callback) }).subscribe()
    }

    onStopPlayerOneMoving(callback: () => void) {
        const subject = new Subject();
        subject.subscribe(subscriber => { this.stopPlayerOneMoving.register(callback) });
        subject.next();
    }

    onStopPlayerTwoMoving(callback: () => void) {
        new Observable(subscriber => { this.stopPlayerTwoMoving.register(callback) }).subscribe()
    }

    onPause(callback: () => void) {
        new Observable(subscriber => { this.pause.register(callback) }).subscribe()
    }

    onStart(callBack: () => void) {
        new Observable(subscriber => { this.start.register(callBack) }).subscribe()
    }
}