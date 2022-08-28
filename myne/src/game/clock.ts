import { IClock } from "../@types";

export default class Clock implements IClock {

    public time: number;
    public timer: ReturnType<typeof setInterval> | undefined;

    constructor() {
        this.time = 0;
        this.timer = undefined;
    }

    run() {
        this.time++;
    }

    start() {
        if (this.timer)
            clearInterval(this.timer);

        this.timer = setInterval(this.run.bind(this), 1000);
    }

    stop(): number {
        if (this.timer)
            clearInterval(this.timer);

        return this.time;
    }
}