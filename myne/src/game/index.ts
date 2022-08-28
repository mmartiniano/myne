import { ICell, IGame, IClock } from "../@types";
import Clock from "./clock";

export enum Status {
    ready,
    loading,
    running
}

export default class Myne implements IGame {
    public size: number;
    public bombs: number;
    public range: number;
    public cells: ICell[][] | undefined;
    public status: number;
    public clock: IClock;
    public lost: boolean;
    public onGG: (lost: boolean, duration: number) => any;
    public onChange: () => any;

    constructor(size: number = 9, bombs: number = 10, range: number = 1) {
        this.size = size;
        this.bombs = bombs;
        this.range = range;
        this.status = Status.loading;
        this.clock = new Clock();
        this.lost = true;
        this.onGG = () => { };
        this.onChange = () => { };

        this.cells = this.initCells();
        this.deployBombs();
    }

    static sample(entries: number[], size: number): number[] {
        const result: number[] = [];
        const values = [...entries];

        for (let i = 0; i < size; i++) {
            let index = Math.floor(Math.random() * values.length);
            result.push(values.splice(index, 1)[0]);
        }

        return result.sort();
    }

    initCells(): ICell[][] {
        const dimensions = Array.from({ length: this.size });

        let default_cell = {
            visible: false,
            bomb: false,
            nearby: 0,
            flag: false
        };

        return dimensions.map((_, row) => (
            dimensions.map((_, col) => (
                {
                    x: row,
                    y: col,
                    ...default_cell
                }
            ))
        ))
    }

    deployWarnings(bomb_x: number, bomb_y: number): void {
        for (let x = bomb_x - this.range; x <= bomb_x + this.range; x++) {
            if (x < 0)
                continue;

            if (x >= this.size)
                break;

            for (let y = bomb_y - this.range; y <= bomb_y + this.range; y++) {
                if (y < 0)
                    continue;

                if (y >= this.size)
                    break;

                this.cells![x][y].nearby++;
            }
        }
    }

    deployBombs(): void {
        const available_positions = Array.from(Array(this.size ** 2).keys());
        const bombs_positions = Myne.sample(available_positions, this.bombs);

        loop_row:
        for (let row = 0; row < this.cells!.length; row++) {
            for (let col = 0; col < this.cells![row].length; col++) {
                const cell = this.cells![row][col];
                const position = cell.x * this.size + cell.y;

                if (position > available_positions[-1])
                    break loop_row;

                if (!bombs_positions.includes(position))
                    continue;

                this.cells![row][col].bomb = true;
                this.deployWarnings(row, col);

            }
        }

        this.status = Status.ready;
    }

    showCell(x: number, y: number) {
        const cell = this.cells![x][y];
        cell.visible = true;

        this.onChange();
    }

    flagCell(x: number, y: number) {
        const cell = this.cells![x][y];

        cell.flag = !cell.flag;
        this.onChange();
    }

    safeSpread(safe_x: number, safe_y: number): void {
        if ([safe_x, safe_y].some(value => value < 0 || value >= this.size))
            return

        const cell = this.cells![safe_x][safe_y];

        if (cell.bomb || cell.visible || cell.flag)
            return

        this.showCell(safe_x, safe_y);

        if (cell.nearby > 0)
            return

        this.safeSpread(safe_x - 1, safe_y);
        this.safeSpread(safe_x, safe_y - 1);
        this.safeSpread(safe_x, safe_y + 1);
        this.safeSpread(safe_x + 1, safe_y);
    }

    reset() {
        this.cells = this.initCells();
        this.deployBombs();
    }

    start() {
        this.status = Status.running;
        this.clock.start();
    }

    stop() {
        for (let row = 0; row < this.cells!.length; row++) {
            for (let col = 0; col < this.cells![row].length; col++) {
                this.showCell(row, col);
            }
        }

        this.status = Status.loading;
        const duration = this.clock.stop();

        this.onGG(this.lost, duration);
    }

    onlyBombsRemains() {
        return !this.cells!.some(
            arr => arr.some(
                cell => !cell.bomb && !cell.visible
            )
        );
    }

    handleCellView(x: number, y: number) {
        const cell = this.cells![x][y];

        if (cell.visible)
            return

        if (this.status !== Status.ready && this.status !== Status.running)
            return

        if (cell.bomb)
            return this.stop();

        if (cell.nearby === 0)
            return this.safeSpread(cell.x, cell.y);

        this.showCell(x, y);

        if (!this.onlyBombsRemains())
            return

        this.lost = false;
        this.stop();
    }

    handleCellFlag(x: number, y: number) {
        const cell = this.cells![x][y];

        if (cell.visible)
            return

        if (this.status !== Status.ready && this.status !== Status.running)
            return

        this.flagCell(x, y);
    }

}