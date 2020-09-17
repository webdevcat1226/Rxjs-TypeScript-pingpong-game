export class Event {
    private callbacks: {() : void}[] = [];

    fire () {
        this.callbacks.forEach(func => {
            func();
        });
    }

    register (func : {() : void}) {
        this.callbacks.push(func);
    }
}