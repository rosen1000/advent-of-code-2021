export function part1(data: string[]) {
    let parsed = data.map((d) => d.split(''));

    let gammaArray = parsed.reduce((bits, current) => bits.map((b, i) => +b + +current[i] + ''));
    let gamma = parseInt(gammaArray.map((b) => (+b > data.length / 2 ? 1 : 0)).join(''), 2);
    let epsilon =
        parseInt(
            gamma
                .toString(2)
                .split('')
                .map((b) => +!+b)
                .join(''),
            2,
        ) +
        (1 << (parsed[0].length - 1));

    return gamma * epsilon;
}

export function part2(data: string[]) {
    let parsed = data.map((d) => d.split(''));
    let common = parsed
        .reduce((bits, current) => bits.map((b, i) => +b + +current[i] + ''))
        .map((b) => (+b >= data.length / 2 ? 1 : 0));

    let o2Array = parsed;
    for (let i = 0; i < parsed[0].length; i++) {
        if (o2Array.length == 1) break;
        if (!o2Array.filter((bits) => +bits[i] == +common[i]).length) continue;
        o2Array = o2Array.filter((bits) => +bits[i] == common[i]);
    }
    let o2 = parseInt(o2Array.map((a) => a.join('')).join(''), 2);

    let co2Array = parsed;
    for (let i = 0; i < parsed[0].length; i++) {
        if (co2Array.length == 1) break;
        if (!co2Array.filter((bits) => +bits[i] == +!common[i]).length) continue;
        co2Array = co2Array.filter((bits) => +bits[i] == +!common[i]);
    }
    let co2 = parseInt(co2Array.map((a) => a.join('')).join(''), 2);

    console.log(o2Array, o2, co2Array, co2);

    return o2 * co2;
}
