export function part1(rawData: string[]) {
    let parsed = rawData
        .join('\n')
        .split('\n\n')
        .map((line) => line.split('\n'));
    let pulled = parsed
        .shift()[0]
        .split(',')
        .map((v) => parseInt(v));
    let boards = parsed.map((v) => new Board(v.map((i) => i.split(/  ?/).map((v) => +v))));

    for (let pull of pulled) {
        for (let board of boards) {
            board.addComplete(pull);
            if (board.isCompleted()) return board.getUnmarkedSum() * pull;
        }
    }

    // Fail safe
    return null;
}

export function part2(rawData: string[]) {
    let parsed = rawData
        .join('\n')
        .split('\n\n')
        .map((line) => line.split('\n'));
    let pulled = parsed
        .shift()[0]
        .split(',')
        .map((v) => parseInt(v));
    let boards = parsed.map((v) => new Board(v.map((i) => i.split(/  ?/).map((v) => +v))));

    for (let pull of pulled) {
        for (let board of boards) {
            if (!board) continue;
            board.addComplete(pull);
            if (board.isCompleted() && boards.length > 1) boards.splice(boards.indexOf(board), 1);
            if (boards.length == 1) return {board, boards};
        }
    }

    // Fail safe
    return null;
}

class Board {
    values: number[][];
    completed: boolean[][];

    constructor(data: number[][]) {
        this.values = data;
        this.completed = [];
        for (let i = 0; i < 5; i++) this.completed.push([false, false, false, false, false]);
    }

    addComplete(completed: number): void {
        for (let i = 0; i < this.values.length; i++) {
            for (let j = 0; j < this.values[i].length; j++) {
                if (this.values[i][j] == completed) {
                    this.completed[i][j] = true;
                }
            }
        }
    }

    isCompleted(): null | number[] {
        // Horizontal check
        for (let i = 0; i < this.completed.length; i++) {
            if (this.completed[i][0] == false) continue;
            if (this.completed[i].every((v) => v)) return this.values[i];
        }

        // Rotate board
        let temp = transpose(this.completed);
        let tempValues = transpose(this.values);

        // Vertical check
        for (let i = 0; i < temp.length; i++) {
            if (temp[i][0] == false) continue;
            if (temp[i].every((v) => v)) return tempValues[i];
        }

        return null;
    }

    getUnmarkedSum() {
        let sum = 0;
        for (let i = 0; i < this.values.length; i++) {
            for (let j = 0; j < this.values[i].length; j++) {
                if (!this.completed[i][j]) sum += this.values[i][j];
            }
        }
        return sum;
    }
}

const transpose = (m: any[][]) => m[0].map((_, i) => m.map((x) => x[i]));
