export interface ICell {
    visible: boolean,
    nearby: number,
    bomb: boolean,
    flag: boolean,
    x: number,
    y: number
};

export interface IField {
    size: number,
    bombs: number
};

export interface IClock {
    time: number;
    timer: ReturnType<typeof setInterval> | undefined;
    run: () => void;
    start: () => void;
    stop: () => number;
}

export interface IGame extends IField {
    range: number;
    cells: ICell[][] | undefined;
    status: number;
    clock: IClock;
    lost: boolean;
    onGG(lost: boolean, duration: number): any;
    onChange(): any;
}