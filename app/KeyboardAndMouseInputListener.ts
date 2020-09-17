import { fromEvent, Observable } from 'rxjs'

import { InputListener } from './InputListener'
import { KeyMap } from './KeyMap'

export class KeyboardAndMouseInputListener extends InputListener {
    constructor(element: HTMLCanvasElement, keyMap: KeyMap) {
        super()

        const startObservable = <T>(e: any) => fromEvent<KeyboardEvent>(document, e);
        startObservable('click').subscribe(() => {
            this.start.fire();
        });

        const pauseObservable = <T>(e: any, k: any) => fromEvent<KeyboardEvent>(document, e)
        pauseObservable('keypress', keyMap.pause).subscribe(() => {
            this.pause.fire();
        });

        element.addEventListener('keydown', (e) => {
            switch (e.which) {
                case keyMap.playerOneMoveUp:
                    e.preventDefault();
                    new Observable(subscriber => { this.startPlayerOneMovingUp.fire() }).subscribe();
                    break;
                case keyMap.playerOneMoveDown:
                    e.preventDefault();
                    new Observable(subscriber => { this.startPlayerOneMovingDown.fire() }).subscribe();
                    break;
                case keyMap.playerTwoMoveUp:
                    e.preventDefault();
                    new Observable(subscriber => { this.startPlayerTwoMovingUp.fire() }).subscribe();
                    break;
                case keyMap.playerTwoMoveDown:
                    e.preventDefault();
                    new Observable(subscriber => { this.startPlayerTwoMovingDown.fire() }).subscribe();
                    break;
            }
        });

        element.addEventListener('keyup', (e) => {
            switch (e.which) {
                case keyMap.playerOneMoveUp:
                case keyMap.playerOneMoveDown:
                    e.preventDefault();
                    new Observable(subscriber => { this.stopPlayerOneMoving.fire() }).subscribe();
                    break;
                case keyMap.playerTwoMoveUp:
                case keyMap.playerTwoMoveDown:
                    e.preventDefault();
                    new Observable(subscriber => { this.stopPlayerTwoMoving.fire() }).subscribe();
                    break;
            }
        });

    }
}