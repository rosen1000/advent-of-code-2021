export function part1(data: string[]) {
    let navigations = data.map((d) => new Navigation(d));
    let depth = 0;
    let horizontal = 0;

    navigations.forEach((nav) => {
        if (nav.direction == Direction.FORWARD) {
            horizontal += nav.value;
        } else {
            depth += nav.direction == Direction.DOWN ? nav.value : -nav.value;
        }
    });

    return horizontal * depth;
}

export function part2(data: string[]) {
    let navigations = data.map((d) => new Navigation(d));
    let depth = 0;
    let horizontal = 0;
    let aim = 0;

    navigations.forEach((nav) => {
        if (nav.direction == Direction.FORWARD) {
            horizontal += nav.value;
            depth += aim * nav.value;
        } else if (nav.direction == Direction.DOWN) {
            aim += nav.value;
        } else if (nav.direction == Direction.UP) {
            aim -= nav.value;
        }
    });

    return horizontal * depth;
}

enum Direction {
    FORWARD,
    DOWN,
    UP,
}

class Navigation {
    direction: Direction;
    value: number;

    constructor(text: string) {
        let a = text.split(' ');
        switch (a[0]) {
            case 'forward':
                this.direction = Direction.FORWARD;
                break;
            case 'down':
                this.direction = Direction.DOWN;
                break;
            case 'up':
                this.direction = Direction.UP;
                break;
        }
        this.value = +a[1];
    }
}
