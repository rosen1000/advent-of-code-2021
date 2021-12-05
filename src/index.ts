import axios from 'axios';
import { config } from 'dotenv';
config();

(async () => {
    console.time('task');
    let day = new Date().getDate();
    let data = (
        await axios.get(`https://adventofcode.com/2021/day/${day}/input`, {
            headers: {
                Cookie: `session=${process.env.SESSION}`,
            },
        })
    ).data
        .trim()
        .split('\n');

    let task = await import(`./day${day}`);

    if (task.part2) console.log(task.part2(data));
    else console.log(task.part1(data));
    console.timeEnd('task');
})();
