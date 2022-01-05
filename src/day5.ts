import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

export function part1(rawData: string[]) {
    let diagram: number[][] = [[]];

    for (let line of rawData) {
        let [start, end] = line.split(' -> ');
        let [x1, y1] = start.split(',').map((v) => parseInt(v));
        let [x2, y2] = end.split(',').map((v) => parseInt(v));

        if (x1 != x2 && y1 != y2) continue;

        let i: number;
        let goal: number;

        if (y1 != y2) {
            for (let i = Math.min(y1, y2); i < Math.max(y1, y2); i++) {
                if (diagram[x1] == undefined) diagram[x1] = [];
                if (diagram[x1][i] == undefined) diagram[x1][i] = 1;
                else diagram[x1][i]++;
            }
        } else if (x1 != x2) {
            for (let i = Math.min(x1, x2); i < Math.max(x1, x2); i++) {
                if (diagram[i] == undefined) diagram[i] = [];
                if (diagram[i][y1] == undefined) diagram[i][y1] = 1;
                else diagram[i][y1]++;
            }
        }

        let width = 0,
            height = 0;
        let crosses = 0;
        for (let i = 0; i < diagram.length; i++) {
            width = Math.max(width, diagram.length);
            if (diagram[i] == undefined) continue;
            for (let j = 0; j < diagram[i].length; j++) {
                height = Math.max(height, diagram[i].length);
                // if (diagram[i][j] > 2) crosses++;
            }
        }

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const concat = (xs:any[], ys:any[]) => xs.concat(ys);
        

        writeFileSync('img.png', canvas.toBuffer('image/png'));

        return { width, height };
    }
}
