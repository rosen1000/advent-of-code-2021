export function part1(data: string[]) {
    let increasesInDepth = 0;
    let newData = data.map((d) => +d);

    for (let i = 1; i < newData.length; i++) {
        if (newData[i] > newData[i - 1]) increasesInDepth++;
    }

    return increasesInDepth;
}

export function part2(data: string[]) {
    let numData = data.map((d) => +d);
    let parsed = [];

    for (let i = 0; i < data.length; i++) {
        parsed.push(numData[i] + numData[i + 1] + (numData[i + 2] ? numData[i + 2] : 0));
    }

    return part1(parsed);
}
